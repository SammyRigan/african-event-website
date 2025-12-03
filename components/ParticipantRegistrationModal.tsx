"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { submitParticipantRegistration, sendParticipantConfirmationEmail } from "@/lib/firebaseService"

interface ParticipantRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function ParticipantRegistrationModal({
  open,
  onOpenChange,
  onSuccess,
  onError
}: ParticipantRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    identificationNumber: '',
    organization: '',
    designation: '',
    visaSupport: '',
    futureUpdates: '',
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Countries list
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ]

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Submit registration data
      const result = await submitParticipantRegistration(formData)
      
      if (result.success) {
        // Send confirmation email
        try {
          await sendParticipantConfirmationEmail({
            ...formData,
            timestamp: new Date()
          })
          console.log('Confirmation email sent successfully')
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError)
          // Show warning to user but don't fail the registration
          alert('Registration successful, but there was an issue sending the confirmation email. Please check your email or contact us if you don\'t receive it within a few minutes.')
        }
        
        onSuccess?.()
        onOpenChange(false)
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          identificationNumber: '',
          organization: '',
          designation: '',
          visaSupport: '',
          futureUpdates: '',
          consent: false
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      onError?.('There was an error submitting your registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form when closing
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      identificationNumber: '',
      organization: '',
      designation: '',
      visaSupport: '',
      futureUpdates: '',
      consent: false
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-none border-0">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-black text-center mb-4 md:mb-6">
            Participant Registration Form
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">1. Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleFormChange('fullName', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
              
              <div>
                <Label htmlFor="country" className="text-sm font-semibold">Country of Origin *</Label>
                <Select value={formData.country} onValueChange={(value) => handleFormChange('country', value)}>
                  <SelectTrigger className="mt-1 rounded-none">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="identificationNumber" className="text-sm font-semibold">Identification Number *</Label>
                <Input
                  id="identificationNumber"
                  type="text"
                  required
                  value={formData.identificationNumber}
                  onChange={(e) => handleFormChange('identificationNumber', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
              
              <div>
                <Label htmlFor="organization" className="text-sm font-semibold">Organization / Institution / Freelance *</Label>
                <Input
                  id="organization"
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => handleFormChange('organization', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="designation" className="text-sm font-semibold">Designation / Role *</Label>
              <Input
                id="designation"
                type="text"
                required
                value={formData.designation}
                onChange={(e) => handleFormChange('designation', e.target.value)}
                className="mt-1 rounded-none"
              />
            </div>
          </div>

          {/* Additional Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">2. Additional Information</h3>
            
            <div>
              <Label className="text-sm font-semibold">Do you require a visa support letter?</Label>
              <RadioGroup 
                value={formData.visaSupport} 
                onValueChange={(value) => handleFormChange('visaSupport', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="visa-yes" />
                  <Label htmlFor="visa-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="visa-no" />
                  <Label htmlFor="visa-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm font-semibold">Would you like to receive updates about future AfCFTA events?</Label>
              <RadioGroup 
                value={formData.futureUpdates} 
                onValueChange={(value) => handleFormChange('futureUpdates', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="updates-yes" />
                  <Label htmlFor="updates-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="updates-no" />
                  <Label htmlFor="updates-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Consent */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => handleFormChange('consent', checked)}
                className="mt-1"
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed">
                I agree for my details to be used for event coordination purposes only. *
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6 rounded-none"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-6 rounded-none"
              disabled={!formData.consent || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
