"use client"

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Search, ArrowLeft, Mail, Users, Briefcase, LayoutDashboard, Menu, X, LogOut, Mic, Handshake, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AdminLayoutProps {
  children: React.ReactNode;
  participants: any[];
  exhibitors: any[];
  contacts: any[];
  partnerships: any[];
  speakers: any[];
  galleryImages: any[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onExport?: () => void;
  showExport?: boolean;
  title: string;
}

export default function AdminLayout({
  children,
  participants,
  exhibitors,
  contacts,
  partnerships,
  speakers,
  galleryImages,
  searchTerm,
  onSearchChange,
  onExport,
  showExport = false,
  title
}: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

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

    checkAuth();
  }, [router]);

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
  ];

  const activeTab = navItems.find(item => pathname === item.href)?.id || 'dashboard';

  if (!isAuthenticated) {
    return null;
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
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">Creatives Connect Afrika Admin</p>
              </div>
            </div>
            
            {showExport && onExport && (
              <div className="flex gap-2">
                <Button 
                  onClick={onExport}
                  className="bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          {searchTerm !== undefined && (
            <div className="px-6 pb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E19D2B]"
                />
              </div>
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
