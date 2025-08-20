"use client"

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestFirebasePage() {
  const [status, setStatus] = useState<string>('Ready to test');
  const [testData, setTestData] = useState<any[]>([]);

  const testConnection = async () => {
    try {
      setStatus('Testing connection...');
      
      // Test adding a document
      const docRef = await addDoc(collection(db, 'test-collection'), {
        message: 'Firebase connection test',
        timestamp: new Date().toISOString(),
        testId: Math.random().toString(36).substr(2, 9)
      });
      
      setStatus(`✅ Connection successful! Document added with ID: ${docRef.id}`);
      
      // Test reading documents
      const querySnapshot = await getDocs(collection(db, 'test-collection'));
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setTestData(documents);
      
    } catch (error) {
      console.error('Firebase test error:', error);
      setStatus(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Firebase Connection Test</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{status}</p>
            <Button onClick={testConnection} className="bg-blue-600 hover:bg-blue-700">
              Test Firebase Connection
            </Button>
          </CardContent>
        </Card>

        {testData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Data ({testData.length} documents)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {testData.map((doc, index) => (
                  <div key={doc.id} className="p-3 bg-white rounded border">
                    <p><strong>ID:</strong> {doc.id}</p>
                    <p><strong>Message:</strong> {doc.message}</p>
                    <p><strong>Timestamp:</strong> {doc.timestamp}</p>
                    <p><strong>Test ID:</strong> {doc.testId}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
