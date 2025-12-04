"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addPartner } from '@/lib/firebaseService';
import { CheckCircle, XCircle, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { partners } from '../../../app/partners/page';

export default function UploadAllPartnersPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{name: string, success: boolean, error?: string}[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUpload = async () => {
    setUploading(true);
    setResults([]);
    setUploadComplete(false);
    setCurrentIndex(0);

    const uploadResults = [];

    for (let i = 0; i < partners.length; i++) {
      const partner = partners[i];
      setCurrentIndex(i + 1);
      
      try {
        const result = await addPartner({
          ...partner,
          order: i + 1,
          isActive: true
        });
        uploadResults.push({ name: partner.name, success: true });
        console.log(`✅ Uploaded: ${partner.name}`);
        
        // Update results in real-time
        setResults([...uploadResults]);
      } catch (error) {
        uploadResults.push({ 
          name: partner.name, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        console.error(`❌ Failed to upload ${partner.name}:`, error);
        
        // Update results in real-time
        setResults([...uploadResults]);
      }
      
      // Small delay to avoid overwhelming Firebase
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setUploading(false);
    setUploadComplete(true);
  };

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upload All Partners to Firebase</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              This will upload all {partners.length} partners from the frontend to Firebase. 
              Once uploaded, they will automatically appear on the public partners page.
            </p>
          </CardHeader>
          <CardContent>
            {!uploadComplete && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Warning:</strong> This will create new partner entries in Firebase. 
                    If partners already exist, this may create duplicates. Check Firebase first if you're unsure.
                  </p>
                </div>

                {uploading && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800">
                          Uploading... {currentIndex} of {partners.length}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {results.length > 0 && `Success: ${successCount} | Failed: ${failCount}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] h-14 text-lg"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Uploading... ({currentIndex}/{partners.length})
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload All {partners.length} Partners
                    </>
                  )}
                </Button>
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Upload Results:</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-semibold">
                      ✅ {successCount} Success
                    </span>
                    {failCount > 0 && (
                      <span className="text-red-600 font-semibold">
                        ❌ {failCount} Failed
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        {result.success ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                        )}
                        <span className={result.success ? 'text-green-800' : 'text-red-800'}>
                          {result.name}
                        </span>
                      </div>
                      {!result.success && result.error && (
                        <span className="text-xs text-red-600 ml-2">{result.error}</span>
                      )}
                    </div>
                  ))}
                </div>

                {uploadComplete && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 font-semibold mb-2">
                      ✅ Upload complete! {successCount} of {results.length} partners uploaded successfully.
                    </p>
                    {failCount > 0 && (
                      <p className="text-blue-700 text-sm mb-4">
                        {failCount} partners failed to upload. Check the error messages above.
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => router.push('/dashboard/partners')}
                      >
                        Go to Partners Dashboard
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setResults([]);
                          setUploadComplete(false);
                          setCurrentIndex(0);
                        }}
                      >
                        Upload Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

