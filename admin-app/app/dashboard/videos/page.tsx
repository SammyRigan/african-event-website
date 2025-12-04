"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteVideo } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';
import EditVideoModal from '../../videos/edit/EditVideoModal';

interface VideoItem {
  id: string;
  title: string;
  titleFr: string;
  url: string;
  location: string;
  locationFr: string;
  order?: number;
  isActive?: boolean;
  timestamp: any;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosQuery = query(
          collection(db, 'videos'),
          orderBy('order', 'asc')
        );
        const videosSnapshot = await getDocs(videosQuery);
        const videosData = videosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as VideoItem[];

        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.location.toLowerCase().includes(searchTerm.toLowerCase())
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
      galleryImages={[]}
      blogPosts={[]}
      videos={videos}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showExport={false}
      title="Videos"
    >
      <div className="space-y-6">
        {/* Add Video Button */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <Link href="/videos/add">
              <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </Link>
          </div>
        </div>

        {/* Videos List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  <video
                    className="w-full h-full object-cover rounded-t-lg"
                    controls
                    preload="metadata"
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-2 right-2">
                    <Badge variant={(video.isActive ?? true) ? 'default' : 'secondary'} className="text-xs">
                      {(video.isActive ?? true) ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{video.location}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 w-full hover:bg-blue-50"
                      onClick={() => {
                        setEditingVideoId(video.id);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this video?')) {
                          try {
                            await deleteVideo(video.id);
                            setVideos(videos.filter(v => v.id !== video.id));
                          } catch (error) {
                            console.error('Error deleting video:', error);
                            alert('Failed to delete video');
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
          {filteredVideos.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No videos match your search' : 'No videos yet'}
                </p>
                {!searchTerm && (
                  <Link href="/videos/add">
                    <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Video
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <EditVideoModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        videoId={editingVideoId}
        onSuccess={() => {
          // Refetch videos after successful edit
          const fetchVideos = async () => {
            try {
              const videosQuery = query(
                collection(db, 'videos'),
                orderBy('order', 'asc')
              );
              const videosSnapshot = await getDocs(videosQuery);
              const videosData = videosSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })) as VideoItem[];

              setVideos(videosData);
            } catch (error) {
              console.error('Error fetching videos:', error);
            }
          };
          fetchVideos();
        }}
      />
    </AdminLayout>
  );
}

