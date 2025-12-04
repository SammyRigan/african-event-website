"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deletePartner } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';
import EditPartnerModal from '../../partners/edit/EditPartnerModal';

interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  website: string;
  location: string;
  description: {
    en: string;
    fr: string;
  };
  keyAreas: {
    en: string[];
    fr: string[];
  };
  order?: number;
  isActive?: boolean;
  timestamp: any;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersQuery = query(
          collection(db, 'partners'),
          orderBy('order', 'asc')
        );
        const partnersSnapshot = await getDocs(partnersQuery);
        const partnersData = partnersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as PartnerItem[];

        setPartners(partnersData);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.location.toLowerCase().includes(searchTerm.toLowerCase())
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
      videos={[]}
      partners={partners}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showExport={false}
      title="Partners"
    >
      <div className="space-y-6">
        {/* Add Partner Button */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredPartners.length} partner{filteredPartners.length !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <Link href="/partners/add">
              <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            </Link>
          </div>
        </div>

        {/* Partners List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{partner.location}</p>
                      </div>
                      <Badge variant={(partner.isActive ?? true) ? 'default' : 'secondary'} className="text-xs">
                        {(partner.isActive ?? true) ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {partner.description.en}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="hover:bg-blue-50"
                        onClick={() => {
                          setEditingPartnerId(partner.id);
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
                          if (confirm('Are you sure you want to delete this partner?')) {
                            try {
                              await deletePartner(partner.id);
                              setPartners(partners.filter(p => p.id !== partner.id));
                            } catch (error) {
                              console.error('Error deleting partner:', error);
                              alert('Failed to delete partner');
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredPartners.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No partners match your search' : 'No partners yet'}
                </p>
                {!searchTerm && (
                  <Link href="/partners/add">
                    <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Partner
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <EditPartnerModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        partnerId={editingPartnerId}
        onSuccess={() => {
          // Refetch partners after successful edit
          const fetchPartners = async () => {
            try {
              const partnersQuery = query(
                collection(db, 'partners'),
                orderBy('order', 'asc')
              );
              const partnersSnapshot = await getDocs(partnersQuery);
              const partnersData = partnersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })) as PartnerItem[];

              setPartners(partnersData);
            } catch (error) {
              console.error('Error fetching partners:', error);
            }
          };
          fetchPartners();
        }}
      />
    </AdminLayout>
  );
}

