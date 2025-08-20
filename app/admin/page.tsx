"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

export default function AdminPage() {
  const [participants, setParticipants] = useState<ParticipantRegistration[]>([]);
  const [exhibitors, setExhibitors] = useState<ExhibitorRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'participants' | 'exhibitors'>('all');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // Fetch participant registrations
        const participantQuery = query(
          collection(db, 'participant-registrations'),
          orderBy('timestamp', 'desc')
        );
        const participantSnapshot = await getDocs(participantQuery);
        const participantData = participantSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ParticipantRegistration[];

        // Fetch exhibitor registrations
        const exhibitorQuery = query(
          collection(db, 'exhibitor-registrations'),
          orderBy('timestamp', 'desc')
        );
        const exhibitorSnapshot = await getDocs(exhibitorQuery);
        const exhibitorData = exhibitorSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ExhibitorRegistration[];

        setParticipants(participantData);
        setExhibitors(exhibitorData);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredParticipants = participants.filter(participant =>
    participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading registrations...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Registration Dashboard</h1>
          </div>
                      <div className="flex gap-2">
              {/* <Link href="/test-firebase">
                <Button variant="outline" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800">
                  Test Firebase
                </Button>
              </Link> */}
              <Button 
                onClick={() => exportToCSV(participants, 'participant-registrations.csv')}
                disabled={participants.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Participants
              </Button>
              <Button 
                onClick={() => exportToCSV(exhibitors, 'exhibitor-registrations.csv')}
                disabled={exhibitors.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Exhibitors
              </Button>
            </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, organization, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              All ({participants.length + exhibitors.length})
            </Button>
            <Button
              variant={filterType === 'participants' ? 'default' : 'outline'}
              onClick={() => setFilterType('participants')}
            >
              Participants ({participants.length})
            </Button>
            <Button
              variant={filterType === 'exhibitors' ? 'default' : 'outline'}
              onClick={() => setFilterType('exhibitors')}
            >
              Exhibitors ({exhibitors.length})
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Participant Registrations */}
          {(filterType === 'all' || filterType === 'participants') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Participant Registrations
                  <Badge variant="secondary">{filteredParticipants.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredParticipants.map((participant) => (
                  <div key={participant.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{participant.fullName}</h3>
                      <Badge variant="outline">{participant.country}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{participant.email}</p>
                    <p className="text-sm text-gray-600 mb-1">{participant.organization}</p>
                    <p className="text-sm text-gray-600 mb-2">{participant.designation}</p>
                    <div className="flex gap-2">
                      <Badge variant={participant.visaSupport === 'yes' ? 'default' : 'secondary'}>
                        Visa: {participant.visaSupport}
                      </Badge>
                      <Badge variant={participant.futureUpdates === 'yes' ? 'default' : 'secondary'}>
                        Updates: {participant.futureUpdates}
                      </Badge>
                    </div>
                  </div>
                ))}
                                  {filteredParticipants.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      {searchTerm ? 'No participants match your search' : 'No participant registrations yet'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exhibitor Registrations */}
          {(filterType === 'all' || filterType === 'exhibitors') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Exhibitor Registrations
                  <Badge variant="secondary">{filteredExhibitors.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredExhibitors.map((exhibitor) => (
                  <div key={exhibitor.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{exhibitor.organizationName}</h3>
                      <Badge variant="outline">{exhibitor.country}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Contact: {exhibitor.contactPerson}</p>
                    <p className="text-sm text-gray-600 mb-1">{exhibitor.email}</p>
                    <p className="text-sm text-gray-600 mb-2">{exhibitor.phone}</p>
                    <div className="flex gap-2">
                      <Badge variant="default">{exhibitor.category}</Badge>
                      <Badge variant="secondary">{exhibitor.boothNeeds}</Badge>
                    </div>
                  </div>
                ))}
                                  {filteredExhibitors.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      {searchTerm ? 'No exhibitors match your search' : 'No exhibitor registrations yet'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Summary
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{participants.length}</div>
                <div className="text-sm text-gray-600">Total Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{exhibitors.length}</div>
                <div className="text-sm text-gray-600">Total Exhibitors</div>
              </div>
            </div>
            {searchTerm && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Showing {filteredParticipants.length + filteredExhibitors.length} results for "{searchTerm}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
