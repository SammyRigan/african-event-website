"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import AdminLayout from '../../../components/AdminLayout';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: any;
}

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactQuery = query(
          collection(db, 'contact-submissions'),
          orderBy('timestamp', 'desc')
        );
        const contactSnapshot = await getDocs(contactQuery);
        const contactData = contactSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactSubmission[];

        setContacts(contactData);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
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
      contacts={contacts}
      partnerships={[]}
      speakers={[]}
      galleryImages={[]}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onExport={() => exportToCSV(filteredContacts, 'contact-submissions.csv')}
      showExport={contacts.length > 0}
      title="Contact Submissions"
    >
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
    </AdminLayout>
  );
}
