"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { updateBlogPost, uploadGalleryImage } from '@/lib/firebaseService';
import BlogEditor from '../../../components/BlogEditor';

interface EditBlogClientProps {
  blogId: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function EditBlogClient({ blogId, onClose, onSuccess }: EditBlogClientProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    date: '',
    author: '',
    readTime: '',
    category: 'News',
    image: '',
    content: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const docRef = doc(db, 'blog-posts', blogId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentImageUrl(data.image || '');
          
          // Convert structured content array to HTML for editor
          const contentHTML = data.content?.map((block: any) => {
            if (block.type === 'heading') {
              return `<h2>${block.text || ''}</h2>`;
            }
            if (block.type === 'quote') {
              return `<blockquote>${block.text || ''}</blockquote>`;
            }
            if (block.type === 'list' && block.items) {
              const listItems = block.items.map((item: string) => `<li>${item}</li>`).join('');
              return `<ul>${listItems}</ul>`;
            }
            return `<p>${block.text || ''}</p>`;
          }).join('') || '';
          
          setFormData({
            slug: data.slug || '',
            title: data.title || '',
            excerpt: data.excerpt || '',
            date: data.date || '',
            author: data.author || '',
            readTime: data.readTime || '',
            category: data.category || 'News',
            image: data.image || '',
            content: contentHTML,
            order: data.order || 0,
            isActive: data.isActive !== undefined ? data.isActive : true
          });
        } else {
          alert('Blog post not found');
          onClose?.();
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        alert('Failed to load blog post data');
      } finally {
        setFetching(false);
      }
    };

    fetchBlogPost();
  }, [blogId, onClose]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
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
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
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
    setLoading(true);

    try {
      let imageUrl = currentImageUrl;
      
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadGalleryImage(imageFile, formData.title);
        setUploading(false);
      }
      
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

      await updateBlogPost(blogId, blogPostData);
      alert('Blog post updated successfully!');
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Failed to update blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Blog Post</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Update the blog post details below.
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
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleChange('slug', e.target.value)}
                      required
                    />
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
                    rows={3}
                  />
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
                    />
                  </div>
                  <div>
                    <Label htmlFor="readTime">Read Time *</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => handleChange('readTime', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Featured Image</h3>
                
                {currentImageUrl && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Current Image</h4>
                    <div className="relative inline-block">
                      <Image
                        src={currentImageUrl}
                        alt="Current"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover max-h-96"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="image">New Image (Optional)</Label>
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
                  onClick={onClose}
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
                      Update Blog Post
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

