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
import { addSpeaker, uploadSpeakerImage } from '@/lib/firebaseService';

export default function AddSpeakerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    titleFr: '',
    image: '',
    bio: '',
    bioFr: '',
    achievements: '',
    achievementsFr: '',
    education: '',
    educationFr: '',
    expertise: '',
    expertiseFr: '',
    impact: '',
    impactFr: '',
    initiatives: '',
    initiativesFr: '',
    experience: '',
    experienceFr: '',
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
  }, [router]);

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
      alert('Please select an image for the speaker');
      return;
    }
    
    setLoading(true);

    try {
      // Upload image first
      setUploading(true);
      const imageUrl = await uploadSpeakerImage(imageFile, formData.name);
      setUploading(false);
      
      // Convert comma-separated strings to arrays
      const speakerData = {
        name: formData.name,
        title: formData.title,
        titleFr: formData.titleFr,
        image: imageUrl,
        bio: formData.bio,
        bioFr: formData.bioFr,
        achievements: formData.achievements ? formData.achievements.split('\n').filter(a => a.trim()) : undefined,
        achievementsFr: formData.achievementsFr ? formData.achievementsFr.split('\n').filter(a => a.trim()) : undefined,
        education: formData.education ? formData.education.split('\n').filter(e => e.trim()) : undefined,
        educationFr: formData.educationFr ? formData.educationFr.split('\n').filter(e => e.trim()) : undefined,
        expertise: formData.expertise ? formData.expertise.split('\n').filter(e => e.trim()) : undefined,
        expertiseFr: formData.expertiseFr ? formData.expertiseFr.split('\n').filter(e => e.trim()) : undefined,
        impact: formData.impact ? formData.impact.split('\n').filter(i => i.trim()) : undefined,
        impactFr: formData.impactFr ? formData.impactFr.split('\n').filter(i => i.trim()) : undefined,
        initiatives: formData.initiatives ? formData.initiatives.split('\n').filter(i => i.trim()) : undefined,
        initiativesFr: formData.initiativesFr ? formData.initiativesFr.split('\n').filter(i => i.trim()) : undefined,
        experience: formData.experience ? formData.experience.split('\n').filter(e => e.trim()) : undefined,
        experienceFr: formData.experienceFr ? formData.experienceFr.split('\n').filter(e => e.trim()) : undefined,
        order: formData.order,
        isActive: formData.isActive
      };

      await addSpeaker(speakerData);
      alert('Speaker added successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error adding speaker:', error);
      alert('Failed to add speaker. Please try again.');
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
            <CardTitle className="text-2xl">Add New Speaker</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Fill in the speaker details below. All fields with * are required.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="e.g., Dr. Jane Smith"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title (English) *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                      placeholder="e.g., CEO, Africa Tourism Partners"
                    />
                  </div>
                  <div>
                    <Label htmlFor="titleFr">Title (French) *</Label>
                    <Input
                      id="titleFr"
                      value={formData.titleFr}
                      onChange={(e) => handleChange('titleFr', e.target.value)}
                      required
                      placeholder="e.g., PDG, Africa Tourism Partners"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Speaker Image *</Label>
                  <div className="mt-2 space-y-4">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="rounded-lg object-cover"
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
                    Upload a professional photo of the speaker. Image will be stored in Firebase Storage.
                  </p>
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Biography</h3>
                
                <div>
                  <Label htmlFor="bio">Bio (English) *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    required
                    rows={4}
                    placeholder="Enter speaker biography in English..."
                  />
                </div>

                <div>
                  <Label htmlFor="bioFr">Bio (French) *</Label>
                  <Textarea
                    id="bioFr"
                    value={formData.bioFr}
                    onChange={(e) => handleChange('bioFr', e.target.value)}
                    required
                    rows={4}
                    placeholder="Enter speaker biography in French..."
                  />
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Achievements (Optional)</h3>
                
                <div>
                  <Label htmlFor="achievements">Achievements (English)</Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => handleChange('achievements', e.target.value)}
                    rows={5}
                    placeholder="One achievement per line..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter each achievement on a new line</p>
                </div>

                <div>
                  <Label htmlFor="achievementsFr">Achievements (French)</Label>
                  <Textarea
                    id="achievementsFr"
                    value={formData.achievementsFr}
                    onChange={(e) => handleChange('achievementsFr', e.target.value)}
                    rows={5}
                    placeholder="One achievement per line..."
                  />
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Education (Optional)</h3>
                
                <div>
                  <Label htmlFor="education">Education (English)</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                    rows={3}
                    placeholder="One institution per line..."
                  />
                </div>

                <div>
                  <Label htmlFor="educationFr">Education (French)</Label>
                  <Textarea
                    id="educationFr"
                    value={formData.educationFr}
                    onChange={(e) => handleChange('educationFr', e.target.value)}
                    rows={3}
                    placeholder="One institution per line..."
                  />
                </div>
              </div>

              {/* Expertise */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Expertise (Optional)</h3>
                
                <div>
                  <Label htmlFor="expertise">Expertise (English)</Label>
                  <Textarea
                    id="expertise"
                    value={formData.expertise}
                    onChange={(e) => handleChange('expertise', e.target.value)}
                    rows={3}
                    placeholder="One area per line..."
                  />
                </div>

                <div>
                  <Label htmlFor="expertiseFr">Expertise (French)</Label>
                  <Textarea
                    id="expertiseFr"
                    value={formData.expertiseFr}
                    onChange={(e) => handleChange('expertiseFr', e.target.value)}
                    rows={3}
                    placeholder="One area per line..."
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Experience (Optional)</h3>
                
                <div>
                  <Label htmlFor="experience">Experience (English)</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    rows={3}
                    placeholder="One area per line..."
                  />
                </div>

                <div>
                  <Label htmlFor="experienceFr">Experience (French)</Label>
                  <Textarea
                    id="experienceFr"
                    value={formData.experienceFr}
                    onChange={(e) => handleChange('experienceFr', e.target.value)}
                    rows={3}
                    placeholder="One area per line..."
                  />
                </div>
              </div>

              {/* Impact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Impact (Optional)</h3>
                
                <div>
                  <Label htmlFor="impact">Impact (English)</Label>
                  <Textarea
                    id="impact"
                    value={formData.impact}
                    onChange={(e) => handleChange('impact', e.target.value)}
                    rows={3}
                    placeholder="One impact item per line..."
                  />
                </div>

                <div>
                  <Label htmlFor="impactFr">Impact (French)</Label>
                  <Textarea
                    id="impactFr"
                    value={formData.impactFr}
                    onChange={(e) => handleChange('impactFr', e.target.value)}
                    rows={3}
                    placeholder="One impact item per line..."
                  />
                </div>
              </div>

              {/* Initiatives */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Key Initiatives (Optional)</h3>
                
                <div>
                  <Label htmlFor="initiatives">Initiatives (English)</Label>
                  <Textarea
                    id="initiatives"
                    value={formData.initiatives}
                    onChange={(e) => handleChange('initiatives', e.target.value)}
                    rows={3}
                    placeholder="One initiative per line..."
                  />
                </div>

                <div>
                  <Label htmlFor="initiativesFr">Initiatives (French)</Label>
                  <Textarea
                    id="initiativesFr"
                    value={formData.initiativesFr}
                    onChange={(e) => handleChange('initiativesFr', e.target.value)}
                    rows={3}
                    placeholder="One initiative per line..."
                  />
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
                      Add Speaker
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

