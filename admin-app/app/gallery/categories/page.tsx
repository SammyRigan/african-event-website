"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { addGalleryCategory, updateGalleryCategory, deleteGalleryCategory, GalleryCategory } from '@/lib/firebaseService';

export default function GalleryCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    key: '',
    label: '',
    labelFr: '',
    order: 1,
    isActive: true
  });

  useEffect(() => {
    const authToken = sessionStorage.getItem('cca_admin_auth');
    if (!authToken) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const categoriesQuery = query(
        collection(db, 'gallery-categories'),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(categoriesQuery);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryCategory[];
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (category: GalleryCategory) => {
    setFormData({
      key: category.key,
      label: category.label,
      labelFr: category.labelFr || '',
      order: category.order,
      isActive: category.isActive
    });
    setEditingId(category.id || null);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      key: '',
      label: '',
      labelFr: '',
      order: categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1,
      isActive: true
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.key.trim() || !formData.label.trim()) {
      alert('Key and Label are required');
      return;
    }

    // Validate key format (lowercase, no spaces, alphanumeric and underscores only)
    const keyRegex = /^[a-z0-9_]+$/;
    if (!keyRegex.test(formData.key)) {
      alert('Key must be lowercase, contain only letters, numbers, and underscores, with no spaces');
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await updateGalleryCategory(editingId, formData);
        alert('Category updated successfully!');
      } else {
        // Check if key already exists
        const keyExists = categories.some(c => c.key === formData.key && c.id !== editingId);
        if (keyExists) {
          alert('A category with this key already exists');
          setSaving(false);
          return;
        }
        await addGalleryCategory(formData);
        alert('Category added successfully!');
      }
      await fetchCategories();
      handleCancel();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, key: string) => {
    if (!confirm(`Are you sure you want to delete the category "${key}"? This will not delete images, but images using this category may need to be updated.`)) {
      return;
    }

    try {
      await deleteGalleryCategory(id);
      alert('Category deleted successfully!');
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  const initializeDefaultCategories = async () => {
    if (!confirm('This will create default categories if they don\'t exist. Continue?')) {
      return;
    }

    setSaving(true);
    const defaultCategories = [
      { key: 'fashion', label: 'Fashion', labelFr: 'Mode', order: 1 },
      { key: 'music', label: 'Music', labelFr: 'Musique', order: 2 },
      { key: 'film', label: 'Film', labelFr: 'Cinéma', order: 3 },
      { key: 'events', label: 'Events', labelFr: 'Événements', order: 4 },
      { key: 'behindScenes', label: 'Behind the Scenes', labelFr: 'Coulisses', order: 5 }
    ];

    try {
      for (const cat of defaultCategories) {
        const exists = categories.some(c => c.key === cat.key);
        if (!exists) {
          await addGalleryCategory({
            ...cat,
            isActive: true
          });
        }
      }
      alert('Default categories initialized!');
      await fetchCategories();
    } catch (error) {
      console.error('Error initializing categories:', error);
      alert('Failed to initialize categories. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Gallery Categories</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Manage categories for gallery images. Categories are used to organize and filter images.
                </p>
              </div>
              <div className="flex gap-2">
                {categories.length === 0 && (
                  <Button
                    variant="outline"
                    onClick={initializeDefaultCategories}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Initialize Default Categories
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingId(null);
                    setFormData({
                      key: '',
                      label: '',
                      labelFr: '',
                      order: categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1,
                      isActive: true
                    });
                  }}
                  className="bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add/Edit Form */}
            {showAddForm && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {editingId ? 'Edit Category' : 'Add New Category'}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="key">Key *</Label>
                        <Input
                          id="key"
                          value={formData.key}
                          onChange={(e) => handleChange('key', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                          required
                          placeholder="e.g., fashion, music"
                          disabled={!!editingId}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Unique identifier (lowercase, no spaces, letters/numbers/underscores only)
                          {editingId && ' (cannot be changed)'}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="order">Order</Label>
                        <Input
                          id="order"
                          type="number"
                          value={formData.order}
                          onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Lower numbers appear first
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="label">Label (English) *</Label>
                        <Input
                          id="label"
                          value={formData.label}
                          onChange={(e) => handleChange('label', e.target.value)}
                          required
                          placeholder="e.g., Fashion"
                        />
                      </div>
                      <div>
                        <Label htmlFor="labelFr">Label (French)</Label>
                        <Input
                          id="labelFr"
                          value={formData.labelFr}
                          onChange={(e) => handleChange('labelFr', e.target.value)}
                          placeholder="e.g., Mode"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isActive" className="cursor-pointer">
                        Active (visible on website)
                      </Label>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-[#E19D2B] hover:bg-[#D18A1A]"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            {editingId ? 'Update' : 'Add'} Category
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Categories List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">
                Categories ({categories.length})
              </h3>
              {categories.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No categories yet. Click "Add Category" or "Initialize Default Categories" to get started.</p>
                </div>
              ) : (
                categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={category.isActive ? 'default' : 'secondary'} className="text-xs">
                              {category.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <span className="font-mono text-xs text-gray-500">{category.key}</span>
                            <span className="text-xs text-gray-400">Order: {category.order}</span>
                          </div>
                          <h4 className="font-semibold">{category.label}</h4>
                          {category.labelFr && (
                            <p className="text-sm text-gray-600">FR: {category.labelFr}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(category.id!, category.key)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
