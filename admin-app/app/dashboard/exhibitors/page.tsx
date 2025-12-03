"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';
import AdminLayout from '../../../components/AdminLayout';

interface ExhibitorRegistration {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  boothNeeds: string;
  timestamp: any;
}

export default function ExhibitorsPage() {
  const router = useRouter();
  const [exhibitors, setExhibitors] = useState<ExhibitorRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const exhibitorQuery = query(
          collection(db, 'exhibitor-registrations'),
          orderBy('timestamp', 'desc')
        );
        const exhibitorSnapshot = await getDocs(exhibitorQuery);
        const exhibitorData = exhibitorSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ExhibitorRegistration[];

        setExhibitors(exhibitorData);
      } catch (error) {
        console.error('Error fetching exhibitors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);

  const filteredExhibitors = exhibitors.filter(exhibitor =>
    exhibitor.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exhibitor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exhibitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exhibitor.country.toLowerCase().includes(searchTerm.toLowerCase())
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
      exhibitors={exhibitors}
      contacts={[]}
      partnerships={[]}
      speakers={[]}
      galleryImages={[]}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onExport={() => exportToCSV(filteredExhibitors, 'exhibitor-registrations.csv')}
      showExport={exhibitors.length > 0}
      title="Exhibitors"
    >
      <div className="space-y-4">
        {filteredExhibitors.map((exhibitor) => (
          <Card key={exhibitor.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{exhibitor.organizationName}</h3>
                  <p className="text-sm text-gray-600">Contact: {exhibitor.contactPerson}</p>
                  <p className="text-sm text-gray-600">{exhibitor.email}</p>
                  <p className="text-sm text-gray-600">{exhibitor.phone}</p>
                </div>
                <Badge variant="outline" className="text-base px-3 py-1">{exhibitor.country}</Badge>
              </div>
              <div className="flex gap-2">
                <Badge variant="default">{exhibitor.category}</Badge>
                <Badge variant="secondary">{exhibitor.boothNeeds}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredExhibitors.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No exhibitors match your search' : 'No exhibitor registrations yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
