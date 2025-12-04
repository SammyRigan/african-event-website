"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { addVideo } from '@/lib/firebaseService';

export default function AddVideoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    titleFr: '',
    url: '',
    location: '',
    locationFr: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    const authToken = sessionStorage.getItem('cca_admin_auth');
    if (!authToken) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addVideo(formData);
      alert('Video added successfully!');
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Failed to add video. Please try again.');
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
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Video</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Add a new video to the collection. All fields with * are required.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title (English) *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                      placeholder="e.g., Creative Connect Afrika - Kumasi Roadshow"
                    />
                  </div>
                  <div>
                    <Label htmlFor="titleFr">Title (French) *</Label>
                    <Input
                      id="titleFr"
                      value={formData.titleFr}
                      onChange={(e) => handleChange('titleFr', e.target.value)}
                      required
                      placeholder="e.g., Creative Connect Afrika - Roadshow de Kumasi"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location (English) *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                      placeholder="e.g., Kumasi, Ghana"
                    />
                  </div>
                  <div>
                    <Label htmlFor="locationFr">Location (French) *</Label>
                    <Input
                      id="locationFr"
                      value={formData.locationFr}
                      onChange={(e) => handleChange('locationFr', e.target.value)}
                      required
                      placeholder="e.g., Kumasi, Ghana"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="url">Video URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleChange('url', e.target.value)}
                    required
                    placeholder="https://firebasestorage.googleapis.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Full URL to the video file (Firebase Storage or other hosting)
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
                    onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first (0, 1, 2, etc.)
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
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 w-full"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Video
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

