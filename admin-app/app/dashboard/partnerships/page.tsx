"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake } from 'lucide-react';
import AdminLayout from '../../../components/AdminLayout';

interface PartnershipSubmission {
  id: string;
  fullName: string;
  contactPerson: string;
  position: string;
  email: string;
  phone: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  partnershipTypes: string[];
  otherPartnershipType?: string;
  description: string;
  keyMarkets: string;
  previousPartnerships: string;
  whyPartner: string;
  howCollaborate: string;
  valueGain: string;
  upcomingEvents: string;
  consentAccurate: boolean;
  consentContact: boolean;
  consentTerms: boolean;
  signature: string;
  date: string;
  status: string;
  timestamp: any;
}

export default function PartnershipsPage() {
  const router = useRouter();
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const partnershipsQuery = query(
          collection(db, 'partnership-submissions'),
          orderBy('timestamp', 'desc')
        );
        const partnershipsSnapshot = await getDocs(partnershipsQuery);
        const partnershipsData = partnershipsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as PartnershipSubmission[];

        setPartnerships(partnershipsData);
      } catch (error) {
        console.error('Error fetching partnerships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerships();
  }, []);

  const filteredPartnerships = partnerships.filter(partnership =>
    partnership.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.partnershipTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {}).filter(key => key !== 'id' && key !== 'timestamp');
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
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
      partnerships={partnerships}
      speakers={[]}
      galleryImages={[]}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onExport={() => exportToCSV(filteredPartnerships, 'partnership-submissions.csv')}
      showExport={partnerships.length > 0}
      title="Partnership Applications"
    >
      <div className="space-y-4">
        {filteredPartnerships.map((partnership) => (
          <Card key={partnership.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{partnership.fullName}</h3>
                  <p className="text-sm text-gray-600">Contact: {partnership.contactPerson}</p>
                  <p className="text-sm text-gray-600">{partnership.email}</p>
                  <p className="text-sm text-gray-600">{partnership.phone}</p>
                  {partnership.position && <p className="text-sm text-gray-600">Position: {partnership.position}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant={partnership.status === 'pending' ? 'secondary' : partnership.status === 'approved' ? 'default' : 'destructive'}>
                    {partnership.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {new Date(partnership.timestamp?.toDate?.() || Date.now()).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Partnership Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {partnership.partnershipTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Key Markets</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{partnership.keyMarkets}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Description</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{partnership.description}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Why Partner</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{partnership.whyPartner}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">How to Collaborate</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{partnership.howCollaborate}</p>
                </div>
              </div>

              {/* Social Media Links */}
              {(partnership.website || partnership.instagram || partnership.linkedin || partnership.twitter) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-2">Social Media & Website</p>
                  <div className="flex flex-wrap gap-2">
                    {partnership.website && (
                      <a href={partnership.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                        Website
                      </a>
                    )}
                    {partnership.instagram && (
                      <a href={`https://instagram.com/${partnership.instagram}`} target="_blank" rel="noopener noreferrer" className="text-xs text-pink-600 hover:underline">
                        Instagram
                      </a>
                    )}
                    {partnership.linkedin && (
                      <a href={`https://linkedin.com/in/${partnership.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline">
                        LinkedIn
                      </a>
                    )}
                    {partnership.twitter && (
                      <a href={`https://twitter.com/${partnership.twitter}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Signature and Date */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                <span>Signed: {partnership.signature}</span>
                <span>Date: {partnership.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPartnerships.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Handshake className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No partnership applications match your search' : 'No partnership applications yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
