"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Loader2, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { addGalleryImage, uploadGalleryImage, GalleryCategory } from '@/lib/firebaseService';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AddGalleryImagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [formData, setFormData] = useState({
    alt: '',
    category: '',
    order: 1,
    isActive: true
  });

  useEffect(() => {
    const authToken = sessionStorage.getItem('cca_admin_auth');
    if (!authToken) {
      router.push('/admin/login');
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
      const activeCategories = data.filter(c => c.isActive);
      setCategories(activeCategories);
      if (activeCategories.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: activeCategories[0].key }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('Please select an image');
      return;
    }
    
    if (!formData.alt.trim()) {
      alert('Please enter an alt text for the image');
      return;
    }
    
    setLoading(true);

    try {
      // Upload image first
      setUploading(true);
      const imageUrl = await uploadGalleryImage(imageFile, formData.alt);
      setUploading(false);
      
      const galleryImageData = {
        src: imageUrl,
        category: formData.category,
        alt: formData.alt,
        order: formData.order,
        isActive: formData.isActive
      };

      await addGalleryImage(galleryImageData);
      alert('Gallery image added successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error adding gallery image:', error);
      alert('Failed to add gallery image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Gallery Image</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Upload an image to the gallery. All fields with * are required.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Image</h3>
                
                <div>
                  <Label htmlFor="image">Gallery Image *</Label>
                  <div className="mt-2 space-y-4">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={400}
                          height={400}
                          className="rounded-lg object-cover max-h-96"
                        />
                        <Button
                          type="button"
                          onClick={clearImage}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <Label
                          htmlFor="image"
                          className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                        >
                          <span className="text-[#E19D2B] font-semibold">Click to upload</span> or drag and drop
                          <br />
                          <span className="text-xs">PNG, JPG, GIF up to 5MB</span>
                        </Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload an image for the gallery. Image will be stored in Firebase Storage.
                  </p>
                </div>
              </div>

              {/* Image Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Image Details</h3>
                
                <div>
                  <Label htmlFor="alt">Alt Text *</Label>
                  <Input
                    id="alt"
                    value={formData.alt}
                    onChange={(e) => handleChange('alt', e.target.value)}
                    required
                    placeholder="e.g., African Fashion Showcase"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A descriptive text for the image (used for accessibility and SEO)
                  </p>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  {loadingCategories ? (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 animate-pulse">
                      Loading categories...
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="w-full px-3 py-2 border border-yellow-300 rounded-md bg-yellow-50 text-yellow-800">
                      No categories available. <Link href="/admin/gallery/categories" className="underline">Create categories first</Link>
                    </div>
                  ) : (
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E19D2B]"
                    >
                      {categories.map((category) => (
                        <option key={category.key} value={category.key}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Select the category this image belongs to
                  </p>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Settings</h3>
                
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                    min="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first (1, 2, 3, etc.)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active (visible on website)
                  </Label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Link href="/admin" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex-1 bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading Image...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Image
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
