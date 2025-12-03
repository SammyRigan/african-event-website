"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mic, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteSpeaker } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';

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

export default function SpeakersPage() {
  const router = useRouter();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
        <div className="space-y-4">
          {filteredSpeakers.map((speaker) => (
            <Card key={speaker.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
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
                        <Link href={`/speakers/edit/${speaker.id}`}>
                          <Button size="sm" variant="outline" className="hover:bg-blue-50">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={async () => {
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
      </div>
    </AdminLayout>
  );
}
