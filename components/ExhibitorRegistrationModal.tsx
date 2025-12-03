"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { submitExhibitorRegistration, sendExhibitorConfirmationEmail } from "@/lib/firebaseService"

interface ExhibitorRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function ExhibitorRegistrationModal({
  open,
  onOpenChange,
  onSuccess,
  onError
}: ExhibitorRegistrationModalProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    website: '',
    aboutCompany: '',
    productsServices: '',
    category: '',
    boothNeeds: '',
    logoUpload: null,
    shippingAssistance: '',
    accommodationAssistance: '',
    additionalAssistance: '',
    consent: false,
    includeInHandbook: ''
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
      const result = await submitExhibitorRegistration(formData)
      
      if (result.success) {
        // Send confirmation email
        try {
          await sendExhibitorConfirmationEmail({
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
          organizationName: '',
          contactPerson: '',
          email: '',
          phone: '',
          country: '',
          website: '',
          aboutCompany: '',
          productsServices: '',
          category: '',
          boothNeeds: '',
          logoUpload: null,
          shippingAssistance: '',
          accommodationAssistance: '',
          additionalAssistance: '',
          consent: false,
          includeInHandbook: ''
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      onError?.('There was an error submitting your exhibitor registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form when closing
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      website: '',
      aboutCompany: '',
      productsServices: '',
      category: '',
      boothNeeds: '',
      logoUpload: null,
      shippingAssistance: '',
      accommodationAssistance: '',
      additionalAssistance: '',
      consent: false,
      includeInHandbook: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-none border-0">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-black text-center mb-4 md:mb-6">
            Exhibitor Registration Form
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">1. Organization Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orgName" className="text-sm font-semibold">Organization/Company Name *</Label>
                <Input
                  id="orgName"
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => handleFormChange('organizationName', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson" className="text-sm font-semibold">Contact Person (Full Name) *</Label>
                <Input
                  id="contactPerson"
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exhibitorEmail" className="text-sm font-semibold">Email Address *</Label>
                <Input
                  id="exhibitorEmail"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
              
              <div>
                <Label htmlFor="exhibitorPhone" className="text-sm font-semibold">Phone Number *</Label>
                <Input
                  id="exhibitorPhone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exhibitorCountry" className="text-sm font-semibold">Country of Operation *</Label>
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
              
              <div>
                <Label htmlFor="website" className="text-sm font-semibold">Website/Social Media Handles</Label>
                <Input
                  id="website"
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleFormChange('website', e.target.value)}
                  className="mt-1 rounded-none"
                  placeholder="e.g., www.company.com or @company"
                />
              </div>
            </div>
          </div>

          {/* Exhibition Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">2. Exhibition Details</h3>
            
            <div>
              <Label htmlFor="aboutCompany" className="text-sm font-semibold">About your company</Label>
              <Textarea
                id="aboutCompany"
                value={formData.aboutCompany}
                onChange={(e) => handleFormChange('aboutCompany', e.target.value)}
                className="mt-1 rounded-none"
                placeholder="Brief description of your company and what you do..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="productsServices" className="text-sm font-semibold">Type of Products/Services to Exhibit</Label>
              <Textarea
                id="productsServices"
                value={formData.productsServices}
                onChange={(e) => handleFormChange('productsServices', e.target.value)}
                className="mt-1 rounded-none"
                placeholder="Describe the products or services you plan to showcase..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="category" className="text-sm font-semibold">Which category best describes you?</Label>
              <Select value={formData.category} onValueChange={(value) => handleFormChange('category', value)}>
                <SelectTrigger className="mt-1 rounded-none">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourism-operator">Tourism Operator</SelectItem>
                  <SelectItem value="creative-entrepreneur">Creative Entrepreneur</SelectItem>
                  <SelectItem value="artist-performer">Artist/Performer</SelectItem>
                  <SelectItem value="cultural-institution">Cultural Institution</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="boothNeeds" className="text-sm font-semibold">Booth/Display Needs</Label>
              <Select value={formData.boothNeeds} onValueChange={(value) => handleFormChange('boothNeeds', value)}>
                <SelectTrigger className="mt-1 rounded-none">
                  <SelectValue placeholder="Select booth requirements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-booth">Standard Booth (3m x 3m)</SelectItem>
                  <SelectItem value="large-booth">Large Booth (6m x 3m)</SelectItem>
                  <SelectItem value="custom-display">Custom Display Space</SelectItem>
                  <SelectItem value="outdoor-space">Outdoor Exhibition Space</SelectItem>
                  <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">3. Additional Services & Support</h3>
            
            <div>
              <Label className="text-sm font-semibold">Do you require shipping assistance for your materials?</Label>
              <RadioGroup 
                value={formData.shippingAssistance} 
                onValueChange={(value) => handleFormChange('shippingAssistance', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="shipping-yes" />
                  <Label htmlFor="shipping-yes">Yes, I need help with shipping</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="shipping-no" />
                  <Label htmlFor="shipping-no">No, I'll handle shipping myself</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm font-semibold">Do you need accommodation assistance?</Label>
              <RadioGroup 
                value={formData.accommodationAssistance} 
                onValueChange={(value) => handleFormChange('accommodationAssistance', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="accommodation-yes" />
                  <Label htmlFor="accommodation-yes">Yes, I need accommodation help</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="accommodation-no" />
                  <Label htmlFor="accommodation-no">No, I'll arrange my own accommodation</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="additionalAssistance" className="text-sm font-semibold">Any other specific assistance needed?</Label>
              <Textarea
                id="additionalAssistance"
                value={formData.additionalAssistance}
                onChange={(e) => handleFormChange('additionalAssistance', e.target.value)}
                className="mt-1 rounded-none"
                placeholder="Please describe any other support or services you may need..."
                rows={2}
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold">Would you like to be included in the event handbook?</Label>
              <RadioGroup 
                value={formData.includeInHandbook} 
                onValueChange={(value) => handleFormChange('includeInHandbook', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="handbook-yes" />
                  <Label htmlFor="handbook-yes">Yes, include my company information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="handbook-no" />
                  <Label htmlFor="handbook-no">No, don't include in handbook</Label>
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
                I agree for my organization's details to be used for event coordination and exhibition purposes only. *
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
              {isSubmitting ? 'Submitting...' : 'Submit Exhibitor Registration'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
