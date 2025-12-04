"use client"

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, RefreshCw, ArrowLeft, Mail, Users, Briefcase, LayoutDashboard, Menu, X, LogOut, Mic, Plus, Edit, Trash2, Handshake, Image as ImageIcon, Upload, FileText, Video, Building2 } from 'lucide-react';
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
  const pathname = usePathname();
  const [participants, setParticipants] = useState<ParticipantRegistration[]>([]);
  const [exhibitors, setExhibitors] = useState<ExhibitorRegistration[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const authToken = sessionStorage.getItem('cca_admin_auth');
      const email = sessionStorage.getItem('cca_admin_email');
      
      if (!authToken || !email) {
        router.push('/login');
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
    router.push('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'participants', label: 'Participants', icon: Users, count: participants.length, href: '/dashboard/participants' },
    { id: 'exhibitors', label: 'Exhibitors', icon: Briefcase, count: exhibitors.length, href: '/dashboard/exhibitors' },
    { id: 'contacts', label: 'Contact Submissions', icon: Mail, count: contacts.length, href: '/dashboard/contacts' },
    { id: 'partnerships', label: 'Partnership Applications', icon: Handshake, count: partnerships.length, href: '/dashboard/partnerships' },
    { id: 'speakers', label: 'Speakers', icon: Mic, count: speakers.length, href: '/dashboard/speakers' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: galleryImages.length, href: '/dashboard/gallery' },
    { id: 'blogs', label: 'Blogs', icon: FileText, count: 0, href: '/dashboard/blogs' },
    { id: 'videos', label: 'Videos', icon: Video, count: 0, href: '/dashboard/videos' },
    { id: 'partners', label: 'Partners', icon: Building2, count: 0, href: '/dashboard/partners' },
  ];

  // Determine active tab from pathname
  const activeTab = navItems.find(item => pathname === item.href)?.id || 'dashboard';

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
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
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
              </Link>
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
            <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </a>
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
                  {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">Creatives Connect Afrika Admin</p>
              </div>
            </div>
            
          </div>

        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Dashboard View - Only show on /dashboard route */}
          {pathname === '/dashboard' && (
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
                      <Link href="/dashboard/contacts">
                        <Button
                          variant="ghost"
                          className="w-full mt-4"
                        >
                          View All Contacts →
                        </Button>
                      </Link>
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
                      <Link href="/dashboard/partnerships">
                        <Button
                          variant="ghost"
                          className="w-full mt-4"
                        >
                          View All Partnerships →
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
