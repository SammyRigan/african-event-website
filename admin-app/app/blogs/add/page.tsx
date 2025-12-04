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
import Image from 'next/image';
import { addBlogPost, uploadGalleryImage } from '@/lib/firebaseService';
import BlogEditor from '../../../components/BlogEditor';

export default function AddBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Creatives Connect Afrika Team',
    readTime: '5 min read',
    category: 'News',
    image: '',
    content: '', // HTML content from editor
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

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

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

  const clearNewImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  // Convert HTML content to structured content array
  const parseHTMLContent = (htmlContent: string) => {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const content: Array<{ type: string; text?: string; items?: string[] }> = [];
    const nodes = Array.from(tempDiv.childNodes);
    
    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          content.push({
            type: 'paragraph',
            text: text
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const text = element.textContent?.trim();
        
        if (!text) continue;
        
        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
          content.push({
            type: 'heading',
            text: text
          });
        } else if (tagName === 'blockquote') {
          content.push({
            type: 'quote',
            text: text
          });
        } else if (tagName === 'ul' || tagName === 'ol') {
          const items: string[] = [];
          const listItems = element.querySelectorAll('li');
          listItems.forEach(li => {
            const itemText = li.textContent?.trim();
            if (itemText) items.push(itemText);
          });
          if (items.length > 0) {
            content.push({
              type: 'list',
              items: items
            });
          }
        } else if (tagName === 'p') {
          content.push({
            type: 'paragraph',
            text: text
          });
        }
      }
    }
    
    // If no structured content was found, create a paragraph from the HTML
    if (content.length === 0 && htmlContent.trim()) {
      const text = tempDiv.textContent?.trim();
      if (text) {
        content.push({
          type: 'paragraph',
          text: text
        });
      }
    }
    
    return content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile && !formData.image) {
      alert('Please select an image for the blog post');
      return;
    }
    
    setLoading(true);

    try {
      let imageUrl = formData.image;
      
      // Upload image if one was selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadGalleryImage(imageFile, formData.title);
        setUploading(false);
      }
      
      // Parse HTML content into structured format
      const structuredContent = parseHTMLContent(formData.content);
      
      const blogPostData = {
        slug: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        date: formData.date,
        author: formData.author,
        readTime: formData.readTime,
        category: formData.category,
        image: imageUrl,
        content: structuredContent,
        order: formData.order,
        isActive: formData.isActive
      };

      await addBlogPost(blogPostData);
      alert('Blog post added successfully!');
      router.push('/dashboard/blogs');
    } catch (error) {
      console.error('Error adding blog post:', error);
      alert('Failed to add blog post. Please try again.');
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
            <CardTitle className="text-2xl">Add New Blog Post</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Create a new blog post. All fields with * are required.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    placeholder="e.g., From Nairobi to Accra: MKTE Sets the Stage"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Slug will be auto-generated from title
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleChange('slug', e.target.value)}
                      required
                      placeholder="e.g., nairobi-to-accra-mkte-sets-stage"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL-friendly identifier (auto-generated from title)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E19D2B]"
                    >
                      <option value="News">News</option>
                      <option value="Events">Events</option>
                      <option value="Updates">Updates</option>
                      <option value="Stories">Stories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    required
                    placeholder="A brief summary of the blog post..."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Short description shown on blog listing page
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleChange('author', e.target.value)}
                      required
                      placeholder="e.g., Creatives Connect Afrika Team"
                    />
                  </div>
                  <div>
                    <Label htmlFor="readTime">Read Time *</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => handleChange('readTime', e.target.value)}
                      required
                      placeholder="e.g., 5 min read"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Featured Image</h3>
                
                <div>
                  <Label htmlFor="image">Blog Post Image *</Label>
                  <div className="mt-2 space-y-4">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={600}
                          height={400}
                          className="rounded-lg object-cover max-h-96"
                        />
                        <Button
                          type="button"
                          onClick={clearNewImage}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : formData.image ? (
                      <div className="relative inline-block">
                        <Image
                          src={formData.image}
                          alt="Current"
                          width={600}
                          height={400}
                          className="rounded-lg object-cover max-h-96"
                        />
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
                    Or enter image URL:
                  </p>
                  <Input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="/image.jpg or https://..."
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Content</h3>
                
                <div>
                  <Label htmlFor="content">Blog Content *</Label>
                  <div className="mt-2">
                    <BlogEditor
                      value={formData.content}
                      onChange={(value: string) => handleChange('content', value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use the toolbar to format your content. Headings, lists, quotes, and links are supported.
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
                      Add Blog Post
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

