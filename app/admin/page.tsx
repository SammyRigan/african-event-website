"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, RefreshCw, ArrowLeft, Mail, Users, Briefcase, LayoutDashboard, Menu, X, LogOut, Mic, Plus, Edit, Trash2, Handshake, Image as ImageIcon, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: any;
}

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

export default function AdminPage() {
  const router = useRouter();
  const [participants, setParticipants] = useState<ParticipantRegistration[]>([]);
  const [exhibitors, setExhibitors] = useState<ExhibitorRegistration[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'participants' | 'exhibitors' | 'contacts' | 'speakers' | 'partnerships' | 'gallery'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const authToken = sessionStorage.getItem('cca_admin_auth');
      const email = sessionStorage.getItem('cca_admin_email');
      
      if (!authToken || !email) {
        router.push('/admin/login');
        return false;
      }
      
      setIsAuthenticated(true);
      setAdminEmail(email);
      return true;
    };

    if (!checkAuth()) return;

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

        // Fetch contact submissions
        const contactQuery = query(
          collection(db, 'contact-submissions'),
          orderBy('timestamp', 'desc')
        );
        const contactSnapshot = await getDocs(contactQuery);
        const contactData = contactSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactSubmission[];

        // Fetch speakers
        const speakersQuery = query(
          collection(db, 'speakers'),
          orderBy('order', 'asc')
        );
        const speakersSnapshot = await getDocs(speakersQuery);
        const speakersData = speakersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Speaker[];

        // Fetch partnership submissions
        const partnershipsQuery = query(
          collection(db, 'partnership-submissions'),
          orderBy('timestamp', 'desc')
        );
        const partnershipsSnapshot = await getDocs(partnershipsQuery);
        const partnershipsData = partnershipsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as PartnershipSubmission[];

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

        setParticipants(participantData);
        setExhibitors(exhibitorData);
        setContacts(contactData);
        setSpeakers(speakersData);
        setPartnerships(partnershipsData);
        setGalleryImages(galleryData);
        setGalleryCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [router]);

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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPartnerships = partnerships.filter(partnership =>
    partnership.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.partnershipTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGalleryImages = galleryImages.filter(image =>
    image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleLogout = () => {
    sessionStorage.removeItem('cca_admin_auth');
    sessionStorage.removeItem('cca_admin_email');
    router.push('/admin/login');
  };

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'participants' as const, label: 'Participants', icon: Users, count: participants.length },
    { id: 'exhibitors' as const, label: 'Exhibitors', icon: Briefcase, count: exhibitors.length },
    { id: 'contacts' as const, label: 'Contact Submissions', icon: Mail, count: contacts.length },
    { id: 'partnerships' as const, label: 'Partnership Applications', icon: Handshake, count: partnerships.length },
    { id: 'speakers' as const, label: 'Speakers', icon: Mic, count: speakers.length },
    { id: 'gallery' as const, label: 'Gallery', icon: ImageIcon, count: galleryImages.length },
  ];

  // Don't render anything until auth check is complete
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Loading dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-b.png"
                alt="Logo"
                width={120}
                height={30}
                className="object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#E19D2B] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <Badge variant={activeTab === item.id ? 'secondary' : 'outline'}>
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">Logged in as</p>
              <p className="text-sm text-gray-900 font-medium truncate">{adminEmail}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {navItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-gray-500">Creatives Connect Afrika Admin</p>
              </div>
            </div>
            
            {activeTab !== 'dashboard' && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    if (activeTab === 'participants') exportToCSV(filteredParticipants, 'participant-registrations.csv');
                    if (activeTab === 'exhibitors') exportToCSV(filteredExhibitors, 'exhibitor-registrations.csv');
                    if (activeTab === 'contacts') exportToCSV(filteredContacts, 'contact-submissions.csv');
                    if (activeTab === 'partnerships') exportToCSV(filteredPartnerships, 'partnership-submissions.csv');
                  }}
                  disabled={
                    (activeTab === 'participants' && participants.length === 0) ||
                    (activeTab === 'exhibitors' && exhibitors.length === 0) ||
                    (activeTab === 'contacts' && contacts.length === 0) ||
                    (activeTab === 'partnerships' && partnerships.length === 0)
                  }
                  className="bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar - Only show on list views */}
          {activeTab !== 'dashboard' && (
            <div className="px-6 pb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Participants</p>
                        <h3 className="text-4xl font-bold mt-2">{participants.length}</h3>
                      </div>
                      <Users className="w-12 h-12 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Total Exhibitors</p>
                        <h3 className="text-4xl font-bold mt-2">{exhibitors.length}</h3>
                      </div>
                      <Briefcase className="w-12 h-12 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Contact Submissions</p>
                        <h3 className="text-4xl font-bold mt-2">{contacts.length}</h3>
                      </div>
                      <Mail className="w-12 h-12 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Partnership Applications</p>
                        <h3 className="text-4xl font-bold mt-2">{partnerships.length}</h3>
                      </div>
                      <Handshake className="w-12 h-12 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      onClick={() => exportToCSV(participants, 'participant-registrations.csv')}
                      disabled={participants.length === 0}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Participants
                    </Button>
                    <Button
                      onClick={() => exportToCSV(exhibitors, 'exhibitor-registrations.csv')}
                      disabled={exhibitors.length === 0}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Exhibitors
                    </Button>
                    <Button
                      onClick={() => exportToCSV(contacts, 'contact-submissions.csv')}
                      disabled={contacts.length === 0}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Contacts
                    </Button>
                    <Button
                      onClick={() => exportToCSV(partnerships, 'partnership-submissions.csv')}
                      disabled={partnerships.length === 0}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Partnerships
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {participants.slice(0, 5).map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-sm">{participant.fullName}</p>
                            <p className="text-xs text-gray-600">{participant.organization}</p>
                          </div>
                          <Badge variant="outline">{participant.country}</Badge>
                        </div>
                      ))}
                      {participants.length === 0 && (
                        <p className="text-gray-500 text-center py-4 text-sm">No participants yet</p>
                      )}
                    </div>
                    {participants.length > 5 && (
                      <Button
                        variant="ghost"
                        className="w-full mt-4"
                        onClick={() => setActiveTab('participants')}
                      >
                        View All Participants →
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Contact Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{contact.name}</p>
                            <p className="text-xs text-gray-600 truncate">{contact.subject}</p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {new Date(contact.timestamp?.toDate?.() || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </Badge>
                        </div>
                      ))}
                      {contacts.length === 0 && (
                        <p className="text-gray-500 text-center py-4 text-sm">No contact submissions yet</p>
                      )}
                    </div>
                    {contacts.length > 5 && (
                      <Button
                        variant="ghost"
                        className="w-full mt-4"
                        onClick={() => setActiveTab('contacts')}
                      >
                        View All Contacts →
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Partnership Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {partnerships.slice(0, 5).map((partnership) => (
                        <div key={partnership.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{partnership.fullName}</p>
                            <p className="text-xs text-gray-600 truncate">{partnership.contactPerson}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge variant={partnership.status === 'pending' ? 'secondary' : partnership.status === 'approved' ? 'default' : 'destructive'} className="text-xs">
                              {partnership.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {new Date(partnership.timestamp?.toDate?.() || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {partnerships.length === 0 && (
                        <p className="text-gray-500 text-center py-4 text-sm">No partnership applications yet</p>
                      )}
                    </div>
                    {partnerships.length > 5 && (
                      <Button
                        variant="ghost"
                        className="w-full mt-4"
                        onClick={() => setActiveTab('partnerships')}
                      >
                        View All Partnerships →
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Participants View */}
          {activeTab === 'participants' && (
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
          )}

          {/* Exhibitors View */}
          {activeTab === 'exhibitors' && (
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
          )}

          {/* Contact Submissions View */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                      </div>
                      <Badge variant="outline" className="bg-purple-50">
                        {new Date(contact.timestamp?.toDate?.() || Date.now()).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Subject</p>
                        <p className="text-sm font-medium">{contact.subject}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Message</p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredContacts.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'No contact submissions match your search' : 'No contact submissions yet'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Partnership Submissions View */}
          {activeTab === 'partnerships' && (
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
          )}

          {/* Speakers View */}
          {activeTab === 'speakers' && (
            <div className="space-y-6">
              {/* Add Speaker Button */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {filteredSpeakers.length} speaker{filteredSpeakers.length !== 1 ? 's' : ''}
                </p>
                <Link href="/admin/speakers/add">
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
                              <Link href={`/admin/speakers/edit/${speaker.id}`}>
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
                                      const { deleteSpeaker } = await import('@/lib/firebaseService');
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
                        <Link href="/admin/speakers/add">
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
          )}

          {/* Gallery View */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add Gallery Image Buttons */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {filteredGalleryImages.length} image{filteredGalleryImages.length !== 1 ? 's' : ''} • {galleryCategories.filter(c => c.isActive).length} categor{galleryCategories.filter(c => c.isActive).length !== 1 ? 'ies' : 'y'}
                </p>
                <div className="flex gap-2">
                  <Link href="/admin/gallery/categories">
                    <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Manage Categories
                    </Button>
                  </Link>
                  <Link href="/admin/gallery/batch-upload">
                    <Button variant="outline" className="border-[#E19D2B] text-[#E19D2B] hover:bg-[#E19D2B] hover:text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Batch Upload
                    </Button>
                  </Link>
                  <Link href="/admin/gallery/add">
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
                          <Link href={`/admin/gallery/edit/${image.id}`} className="flex-1">
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
                                  const { deleteGalleryImage } = await import('@/lib/firebaseService');
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
                        <Link href="/admin/gallery/add">
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
          )}
        </div>
      </main>
    </div>
  );
}
