"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Upload, CheckCircle, XCircle, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { addGalleryImage, uploadGalleryImage, GalleryCategory } from '@/lib/firebaseService';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface UploadResult {
  filename: string;
  success: boolean;
  error?: string;
}

export default function BatchUploadGalleryPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([]);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [category, setCategory] = useState('events');
  const [order, setOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const authToken = sessionStorage.getItem('cca_admin_auth');
    if (!authToken) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Validate file sizes (max 5MB each)
    const validFiles = imageFiles.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, { file, preview: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    const fileToRemove = selectedFiles[index];
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter(p => p.file !== fileToRemove));
  };

  const clearAll = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setResults([]);
    setUploadComplete(false);
  };

  // Generate alt text from filename (remove extension and format)
  const generateAltText = (filename: string): string => {
    // Remove extension
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    // Replace underscores and hyphens with spaces
    const formatted = nameWithoutExt.replace(/[_-]/g, ' ');
    // Capitalize first letter of each word
    return formatted
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleBatchUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image to upload');
      return;
    }

    setUploading(true);
    setResults([]);
    setUploadComplete(false);

    const uploadResults: UploadResult[] = [];
    let currentOrder = order;

    for (const file of selectedFiles) {
      try {
        // Generate alt text from filename
        const altText = generateAltText(file.name);
        
        // Upload image
        const imageUrl = await uploadGalleryImage(file, altText);
        
        // Add to gallery
        const galleryImageData = {
          src: imageUrl,
          category: category,
          alt: altText,
          order: currentOrder++,
          isActive: isActive
        };

        await addGalleryImage(galleryImageData);
        uploadResults.push({ filename: file.name, success: true });
        console.log(`✅ Uploaded: ${file.name}`);
      } catch (error) {
        uploadResults.push({
          filename: file.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        console.error(`❌ Failed to upload ${file.name}:`, error);
      }
    }

    setResults(uploadResults);
    setUploading(false);
    setUploadComplete(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
            <CardTitle className="text-2xl">Batch Upload Gallery Images</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Upload multiple images at once. Alt text will be automatically generated from filenames.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Settings */}
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="category">Category *</Label>
                {loadingCategories ? (
                  <div className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 animate-pulse">
                    Loading categories...
                  </div>
                ) : categories.length === 0 ? (
                  <div className="w-full mt-1 px-3 py-2 border border-yellow-300 rounded-md bg-yellow-50 text-yellow-800">
                    No categories available. <Link href="/admin/gallery/categories" className="underline">Create categories first</Link>
                  </div>
                ) : (
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E19D2B]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <Label htmlFor="order">Starting Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                  min="1"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Images will be numbered sequentially from this value
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Active (visible on website)
                </Label>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="batch-upload">Select Images</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <Label
                  htmlFor="batch-upload"
                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                >
                  <span className="text-[#E19D2B] font-semibold">Click to select multiple images</span>
                  <br />
                  <span className="text-xs">PNG, JPG, GIF up to 5MB each</span>
                </Label>
                <Input
                  id="batch-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selected images: {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Preview Grid */}
            {previews.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Selected Images ({previews.length})
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    disabled={uploading}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={preview.preview}
                          alt={preview.file.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                        <Button
                          type="button"
                          onClick={() => removeFile(index)}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={uploading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 truncate" title={preview.file.name}>
                        {preview.file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Alt: {generateAltText(preview.file.name)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            {selectedFiles.length > 0 && !uploadComplete && (
              <div className="flex gap-4 pt-4 border-t">
                <Link href="/admin" className="flex-1">
                  <Button type="button" variant="outline" className="w-full" disabled={uploading}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  onClick={handleBatchUpload}
                  disabled={uploading || selectedFiles.length === 0}
                  className="flex-1 bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading {selectedFiles.length} images...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload {selectedFiles.length} Image{selectedFiles.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Upload Results</h3>
                  {uploadComplete && (
                    <div className={`px-4 py-2 rounded-lg ${
                      successCount === totalCount ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
                    }`}>
                      {successCount} of {totalCount} uploaded successfully
                    </div>
                  )}
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.success
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        {result.success ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                        )}
                        <span className={`truncate ${
                          result.success ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {result.filename}
                        </span>
                      </div>
                      {!result.success && result.error && (
                        <span className="text-xs text-red-600 ml-2 flex-shrink-0">
                          {result.error}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {uploadComplete && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 mb-4">
                      ✅ Upload complete! {successCount} of {totalCount} images uploaded successfully.
                    </p>
                    <div className="flex gap-4">
                      <Link href="/admin" className="flex-1">
                        <Button className="w-full">
                          Go to Admin Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={clearAll}
                        className="flex-1"
                      >
                        Upload More
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
