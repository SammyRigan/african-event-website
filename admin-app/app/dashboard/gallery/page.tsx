"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Plus, Edit, Trash2, Upload, LayoutDashboard, GripVertical } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteGalleryImage, updateGalleryImage } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';
import EditGalleryImageModal from '../../gallery/edit/EditGalleryImageModal';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

function SortableGalleryImageItem({ 
  image, 
  onEdit, 
  onDelete 
}: { 
  image: GalleryImage; 
  onEdit: () => void; 
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card>
        <CardContent className="p-0">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing bg-black/50 hover:bg-black/70 rounded p-1"
          >
            <GripVertical className="w-4 h-4 text-white" />
          </div>
          
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
            <div className="absolute top-2 left-12">
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
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 w-full hover:bg-blue-50"
                onClick={onEdit}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GalleryPage() {
  const router = useRouter();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = filteredGalleryImages.findIndex((img) => img.id === active.id);
      const newIndex = filteredGalleryImages.findIndex((img) => img.id === over.id);

      const newImages = arrayMove(filteredGalleryImages, oldIndex, newIndex);
      
      // Update local state immediately for better UX
      setGalleryImages((prev) => {
        const updated = [...prev];
        const reordered = arrayMove(
          prev.filter(img => filteredGalleryImages.some(fimg => fimg.id === img.id)),
          oldIndex,
          newIndex
        );
        // Merge back with images not in filtered list
        const filteredIds = new Set(filteredGalleryImages.map(img => img.id));
        const notFiltered = prev.filter(img => !filteredIds.has(img.id));
        return [...reordered, ...notFiltered].sort((a, b) => {
          const aIndex = newImages.findIndex(img => img.id === a.id);
          const bIndex = newImages.findIndex(img => img.id === b.id);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.order - b.order;
        });
      });

      // Update order values in Firebase
      setIsUpdating(true);
      try {
        const updates = newImages.map((image, index) => {
          const newOrder = index + 1;
          if (image.order !== newOrder) {
            return updateGalleryImage(image.id, { order: newOrder });
          }
          return Promise.resolve();
        });

        await Promise.all(updates);
        
        // Refresh to get updated data
        const fetchGallery = async () => {
          try {
            const galleryQuery = query(
              collection(db, 'gallery-images'),
              orderBy('order', 'asc')
            );
            const gallerySnapshot = await getDocs(galleryQuery);
            const galleryData = gallerySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as GalleryImage[];
            setGalleryImages(galleryData);
          } catch (error) {
            console.error('Error fetching gallery:', error);
          }
        };
        await fetchGallery();
      } catch (error) {
        console.error('Error updating gallery image order:', error);
        alert('Failed to update order. Please try again.');
        // Reload on error
        window.location.reload();
      } finally {
        setIsUpdating(false);
      }
    }
  };

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
        {isUpdating && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">Updating order...</p>
          </div>
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredGalleryImages.map(img => img.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGalleryImages.map((image) => (
                <SortableGalleryImageItem
                  key={image.id}
                  image={image}
                  onEdit={() => {
                    setEditingImageId(image.id);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={async () => {
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
                />
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
          </SortableContext>
        </DndContext>
      </div>

      {/* Edit Gallery Image Modal */}
      <EditGalleryImageModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        imageId={editingImageId}
        onSuccess={() => {
          // Refresh gallery images after successful edit
          const fetchGallery = async () => {
            try {
              const galleryQuery = query(
                collection(db, 'gallery-images'),
                orderBy('order', 'asc')
              );
              const gallerySnapshot = await getDocs(galleryQuery);
              const galleryData = gallerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })) as GalleryImage[];
              setGalleryImages(galleryData);
            } catch (error) {
              console.error('Error fetching gallery:', error);
            }
          };
          fetchGallery();
        }}
      />
    </AdminLayout>
  );
}
