"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Users } from 'lucide-react';
import AdminLayout from '../../../components/AdminLayout';

interface ParticipantRegistration {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  organization: string;
  designation: string;
  visaSupport: string;
  futureUpdates: string;
  timestamp: any;
}

export default function ParticipantsPage() {
  const router = useRouter();
  const [participants, setParticipants] = useState<ParticipantRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantQuery = query(
          collection(db, 'participant-registrations'),
          orderBy('timestamp', 'desc')
        );
        const participantSnapshot = await getDocs(participantQuery);
        const participantData = participantSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ParticipantRegistration[];

        setParticipants(participantData);
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const filteredParticipants = participants.filter(participant =>
    participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.country.toLowerCase().includes(searchTerm.toLowerCase())
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
      participants={participants}
      exhibitors={[]}
      contacts={[]}
      partnerships={[]}
      speakers={[]}
      galleryImages={[]}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onExport={() => exportToCSV(filteredParticipants, 'participant-registrations.csv')}
      showExport={participants.length > 0}
      title="Participants"
    >
      <div className="space-y-4">
        {filteredParticipants.map((participant) => (
          <Card key={participant.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{participant.fullName}</h3>
                  <p className="text-sm text-gray-600">{participant.email}</p>
                  {participant.phone && <p className="text-sm text-gray-600">{participant.phone}</p>}
                </div>
                <Badge variant="outline" className="text-base px-3 py-1">{participant.country}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Organization</p>
                  <p className="text-sm">{participant.organization}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Designation</p>
                  <p className="text-sm">{participant.designation}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={participant.visaSupport === 'yes' ? 'default' : 'secondary'}>
                  Visa: {participant.visaSupport}
                </Badge>
                <Badge variant={participant.futureUpdates === 'yes' ? 'default' : 'secondary'}>
                  Updates: {participant.futureUpdates}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredParticipants.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No participants match your search' : 'No participant registrations yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
