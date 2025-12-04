"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mic, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteSpeaker, updateSpeaker } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';
import EditSpeakerModal from '../../speakers/edit/EditSpeakerModal';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Speaker {
  id: string;
  name: string;
  title: string;
  titleFr: string;
  image: string;
  bio: string;
  bioFr: string;
  order: number;
  isActive: boolean;
  timestamp: any;
}

function SortableSpeakerItem({ speaker, onEdit, onDelete }: { speaker: Speaker; onEdit: () => void; onDelete: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: speaker.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="flex-shrink-0 cursor-grab active:cursor-grabbing flex items-center justify-center w-8 text-gray-400 hover:text-gray-600"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Speaker Image */}
            <div className="flex-shrink-0">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={120}
                height={120}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>

            {/* Speaker Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{speaker.title}</p>
                  <Badge variant={speaker.isActive ? 'default' : 'secondary'} className="text-xs">
                    {speaker.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover:bg-blue-50"
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
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Bio (English)</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{speaker.bio}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Bio (French)</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{speaker.bioFr}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Order: {speaker.order}</span>
                  <span>•</span>
                  <span>Added: {new Date(speaker.timestamp?.toDate?.() || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SpeakersPage() {
  const router = useRouter();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSpeakerId, setEditingSpeakerId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersQuery = query(
          collection(db, 'speakers'),
          orderBy('order', 'asc')
        );
        const speakersSnapshot = await getDocs(speakersQuery);
        const speakersData = speakersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Speaker[];

        setSpeakers(speakersData);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = filteredSpeakers.findIndex((s) => s.id === active.id);
      const newIndex = filteredSpeakers.findIndex((s) => s.id === over.id);

      const newSpeakers = arrayMove(filteredSpeakers, oldIndex, newIndex);
      
      // Update local state immediately for better UX
      setSpeakers((prev) => {
        const updated = [...prev];
        const reordered = arrayMove(
          prev.filter(s => filteredSpeakers.some(fs => fs.id === s.id)),
          oldIndex,
          newIndex
        );
        // Merge back with speakers not in filtered list
        const filteredIds = new Set(filteredSpeakers.map(s => s.id));
        const notFiltered = prev.filter(s => !filteredIds.has(s.id));
        return [...reordered, ...notFiltered].sort((a, b) => {
          const aIndex = newSpeakers.findIndex(s => s.id === a.id);
          const bIndex = newSpeakers.findIndex(s => s.id === b.id);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.order - b.order;
        });
      });

      // Update order values in Firebase
      setIsUpdating(true);
      try {
        const updates = newSpeakers.map((speaker, index) => {
          const newOrder = index + 1;
          if (speaker.order !== newOrder) {
            return updateSpeaker(speaker.id, { order: newOrder });
          }
          return Promise.resolve();
        });

        await Promise.all(updates);
        
        // Refresh to get updated data
        const fetchSpeakers = async () => {
          try {
            const speakersQuery = query(
              collection(db, 'speakers'),
              orderBy('order', 'asc')
            );
            const speakersSnapshot = await getDocs(speakersQuery);
            const speakersData = speakersSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Speaker[];
            setSpeakers(speakersData);
          } catch (error) {
            console.error('Error fetching speakers:', error);
          }
        };
        await fetchSpeakers();
      } catch (error) {
        console.error('Error updating speaker order:', error);
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
      speakers={speakers}
      galleryImages={[]}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showExport={false}
      title="Speakers"
    >
      <div className="space-y-6">
        {/* Add Speaker Button */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredSpeakers.length} speaker{filteredSpeakers.length !== 1 ? 's' : ''}
          </p>
          <Link href="/speakers/add">
            <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
              <Plus className="w-4 h-4 mr-2" />
              Add Speaker
            </Button>
          </Link>
        </div>

        {/* Speakers List */}
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
            items={filteredSpeakers.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {filteredSpeakers.map((speaker) => (
                <SortableSpeakerItem
                  key={speaker.id}
                  speaker={speaker}
                  onEdit={() => {
                    setEditingSpeakerId(speaker.id);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={async () => {
                    if (confirm('Are you sure you want to delete this speaker?')) {
                      try {
                        await deleteSpeaker(speaker.id);
                        setSpeakers(speakers.filter(s => s.id !== speaker.id));
                      } catch (error) {
                        console.error('Error deleting speaker:', error);
                        alert('Failed to delete speaker');
                      }
                    }
                  }}
                />
              ))}
              {filteredSpeakers.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Mic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      {searchTerm ? 'No speakers match your search' : 'No speakers yet'}
                    </p>
                    {!searchTerm && (
                      <Link href="/speakers/add">
                        <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Speaker
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

      {/* Edit Speaker Modal */}
      <EditSpeakerModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        speakerId={editingSpeakerId}
        onSuccess={() => {
          // Refresh speakers after successful edit
          const fetchSpeakers = async () => {
            try {
              const speakersQuery = query(
                collection(db, 'speakers'),
                orderBy('order', 'asc')
              );
              const speakersSnapshot = await getDocs(speakersQuery);
              const speakersData = speakersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })) as Speaker[];
              setSpeakers(speakersData);
            } catch (error) {
              console.error('Error fetching speakers:', error);
            }
          };
          fetchSpeakers();
        }}
      />
    </AdminLayout>
  );
}
