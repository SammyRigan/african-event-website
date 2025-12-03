"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Plus, Edit, Trash2, Upload, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteGalleryImage } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';

interface GalleryImage {
  id: string;
  src: string;
  category: string;
  alt: string;
  order: number;
  isActive: boolean;
  timestamp: any;
}

interface GalleryCategory {
  id: string;
  key: string;
  label: string;
  labelFr?: string;
  order: number;
  isActive: boolean;
  timestamp: any;
}

export default function GalleryPage() {
  const router = useRouter();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Fetch gallery images
        const galleryQuery = query(
          collection(db, 'gallery-images'),
          orderBy('order', 'asc')
        );
        const gallerySnapshot = await getDocs(galleryQuery);
        const galleryData = gallerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryImage[];

        // Fetch gallery categories
        const categoriesQuery = query(
          collection(db, 'gallery-categories'),
          orderBy('order', 'asc')
        );
        const categoriesSnapshot = await getDocs(categoriesQuery);
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryCategory[];

        setGalleryImages(galleryData);
        setGalleryCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredGalleryImages = galleryImages.filter(image =>
    image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout
      participants={[]}
      exhibitors={[]}
      contacts={[]}
      partnerships={[]}
      speakers={[]}
      galleryImages={galleryImages}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showExport={false}
      title="Gallery"
    >
      <div className="space-y-6">
        {/* Add Gallery Image Buttons */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredGalleryImages.length} image{filteredGalleryImages.length !== 1 ? 's' : ''} • {galleryCategories.filter(c => c.isActive).length} categor{galleryCategories.filter(c => c.isActive).length !== 1 ? 'ies' : 'y'}
          </p>
          <div className="flex gap-2">
            <Link href="/gallery/categories">
              <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Manage Categories
              </Button>
            </Link>
            <Link href="/gallery/batch-upload">
              <Button variant="outline" className="border-[#E19D2B] text-[#E19D2B] hover:bg-[#E19D2B] hover:text-white">
                <Upload className="w-4 h-4 mr-2" />
                Batch Upload
              </Button>
            </Link>
            <Link href="/gallery/add">
              <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </Link>
          </div>
        </div>

        {/* Gallery Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGalleryImages.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={image.isActive ? 'default' : 'secondary'} className="text-xs">
                      {image.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="text-xs bg-black/50 text-white border-white/30">
                      {image.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{image.alt}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Order: {image.order}</span>
                    <span>Added: {new Date(image.timestamp?.toDate?.() || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/gallery/edit/${image.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full hover:bg-blue-50">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this image?')) {
                          try {
                            await deleteGalleryImage(image.id);
                            setGalleryImages(galleryImages.filter(img => img.id !== image.id));
                          } catch (error) {
                            console.error('Error deleting gallery image:', error);
                            alert('Failed to delete image');
                          }
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredGalleryImages.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No images match your search' : 'No gallery images yet'}
                </p>
                {!searchTerm && (
                  <Link href="/gallery/add">
                    <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Image
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
