"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sendParticipantConfirmationEmail, sendExhibitorConfirmationEmail, sendContactConfirmationEmail } from "@/lib/firebaseService"

export default function TestEmailPage() {
  const [testEmail, setTestEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const testParticipantEmail = async () => {
    if (!testEmail) {
      setResult({ type: 'error', message: 'Please enter an email address' })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const testData = {
        fullName: "Test User",
        email: testEmail,
        phone: "+1234567890",
        country: "Ghana",
        identificationNumber: "TEST123456",
        organization: "Test Organization",
        designation: "Test Role",
        visaSupport: "no",
        futureUpdates: "yes",
        consent: true,
        timestamp: new Date()
      }

      const result = await sendParticipantConfirmationEmail(testData)
      setResult({ type: 'success', message: `Participant email sent successfully! Email ID: ${result.emailId}` })
    } catch (error) {
      console.error('Test email error:', error)
      setResult({ type: 'error', message: `Error sending participant email: ${error instanceof Error ? error.message : 'Unknown error'}` })
    } finally {
      setIsLoading(false)
    }
  }

  const testExhibitorEmail = async () => {
    if (!testEmail) {
      setResult({ type: 'error', message: 'Please enter an email address' })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const testData = {
        organizationName: "Test Organization",
        contactPerson: "Test Contact",
        email: testEmail,
        phone: "+1234567890",
        country: "Ghana",
        website: "https://test.com",
        aboutCompany: "Test company description",
        productsServices: "Test products and services",
        category: "creative-entrepreneur",
        boothNeeds: "standard-booth",
        shippingAssistance: "no",
        accommodationAssistance: "no",
        additionalAssistance: "None",
        consent: true,
        includeInHandbook: "yes",
        timestamp: new Date()
      }

      const result = await sendExhibitorConfirmationEmail(testData)
      setResult({ type: 'success', message: `Exhibitor email sent successfully! Email ID: ${result.emailId}` })
    } catch (error) {
      console.error('Test email error:', error)
      setResult({ type: 'error', message: `Error sending exhibitor email: ${error instanceof Error ? error.message : 'Unknown error'}` })
    } finally {
      setIsLoading(false)
    }
  }

  const testContactEmail = async () => {
    if (!testEmail) {
      setResult({ type: 'error', message: 'Please enter an email address' })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const testData = {
        name: "Test User",
        email: testEmail,
        phone: "+1234567890",
        subject: "Test Contact Form",
        message: "This is a test message from the contact form.",
        timestamp: new Date()
      }

      const result = await sendContactConfirmationEmail(testData, 'en')
      setResult({ type: 'success', message: `Contact email sent successfully! Email ID: ${result.emailId}` })
    } catch (error) {
      console.error('Test contact email error:', error)
      setResult({ type: 'error', message: `Error sending contact email: ${error instanceof Error ? error.message : 'Unknown error'}` })
    } finally {
      setIsLoading(false)
    }
  }

  const checkFirestoreMailCollection = async () => {
    try {
      const { db } = await import('@/lib/firebase')
      const { collection, getDocs, orderBy, limit, query } = await import('firebase/firestore')
      
      const mailQuery = query(collection(db, 'mail'), orderBy('timestamp', 'desc'), limit(5))
      const snapshot = await getDocs(mailQuery)
      
      const emails = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log('Recent emails in mail collection:', emails)
      setResult({ 
        type: 'success', 
        message: `Found ${emails.length} recent emails in mail collection. Check console for details.` 
      })
    } catch (error) {
      console.error('Error checking mail collection:', error)
      setResult({ type: 'error', message: `Error checking mail collection: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Email Testing Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="testEmail" className="text-sm font-semibold">Test Email Address</Label>
              <Input
                id="testEmail"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter email address to test"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={testParticipantEmail}
                disabled={isLoading || !testEmail}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Sending...' : 'Test Participant Email'}
              </Button>

              <Button
                onClick={testExhibitorEmail}
                disabled={isLoading || !testEmail}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Sending...' : 'Test Exhibitor Email'}
              </Button>

              <Button
                onClick={testContactEmail}
                disabled={isLoading || !testEmail}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Sending...' : 'Test Contact Email'}
              </Button>

              <Button
                onClick={checkFirestoreMailCollection}
                disabled={isLoading}
                variant="outline"
              >
                Check Mail Collection
              </Button>
            </div>

            {result && (
              <div className={`p-4 rounded-md ${
                result.type === 'success' 
                  ? 'bg-green-100 border border-green-300 text-green-800' 
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}>
                <p className="font-semibold">{result.type === 'success' ? 'Success!' : 'Error!'}</p>
                <p>{result.message}</p>
              </div>
            )}

            <div className="bg-yellow-100 border border-yellow-300 rounded-md p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
                <li>Make sure Firebase Trigger Email extension is installed</li>
                <li>Check SMTP configuration in Firebase Console → Extensions</li>
                <li>Verify Firestore rules allow writes to 'mail' collection</li>
                <li>Check Firebase Console → Extensions → Logs for errors</li>
                <li>Test with a simple email first</li>
              </ol>
            </div>

            <div className="bg-blue-100 border border-blue-300 rounded-md p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Expected Behavior:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                <li>Emails should be created in Firestore 'mail' collection</li>
                <li>Firebase Trigger Email extension should process them automatically</li>
                <li>You should receive actual emails at the test address</li>
                <li>Check spam folder if emails don't arrive</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
