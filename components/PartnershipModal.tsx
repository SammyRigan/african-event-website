"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/LanguageContext"
import PartnershipTerms from "@/components/PartnershipTerms"
import { Upload, Send, CheckCircle, X } from "lucide-react"
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { sendPartnershipEmails } from '@/lib/firebaseService'

interface PartnershipFormData {
  // Section 1: Organisation/Individual Details
  fullName: string
  contactPerson: string
  position: string
  email: string
  phone: string
  website: string
  instagram: string
  linkedin: string
  twitter: string
  
  // Section 2: Partnership Type
  partnershipTypes: string[]
  otherPartnershipType: string
  
  // Section 3: About Brand/Organisation
  description: string
  keyMarkets: string
  previousPartnerships: string
  
  // Section 4: Partnership Goals
  whyPartner: string
  howCollaborate: string
  valueGain: string
  
  // Section 5: Additional Information
  upcomingEvents: string
  
  // Consent
  consentAccurate: boolean
  consentContact: boolean
  consentTerms: boolean
  signature: string
  date: string
}

interface PartnershipModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PartnershipModal({ open, onOpenChange, onSuccess, onError }: PartnershipModalProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<PartnershipFormData>({
    fullName: '',
    contactPerson: '',
    position: '',
    email: '',
    phone: '',
    website: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    partnershipTypes: [],
    otherPartnershipType: '',
    description: '',
    keyMarkets: '',
    previousPartnerships: '',
    whyPartner: '',
    howCollaborate: '',
    valueGain: '',
    upcomingEvents: '',
    consentAccurate: false,
    consentContact: false,
    consentTerms: false,
    signature: '',
    date: new Date().toISOString().split('T')[0]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentSection, setCurrentSection] = useState(1)
  const totalSections = 5

  const translations = {
    en: {
      title: "Become a Partner",
      subtitle: "Join our network of visionary organizations driving Africa's creative economy forward",
      section1: "Organisation / Individual Details",
      section2: "Partnership Type",
      section3: "About Your Brand/Organisation",
      section4: "Partnership Goals",
      section5: "Additional Information",
      consent: "Consent & Confirmation",
      fullName: "Full Name / Organisation Name",
      contactPerson: "Contact Person (if organisation)",
      position: "Position / Title",
      email: "Email Address",
      phone: "Phone Number (WhatsApp preferred)",
      website: "Website",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      twitter: "X (Twitter)",
      partnershipTypes: "Please select the type(s) of partnership you are interested in:",
      sponsorship: "Sponsorship",
      mediaPartner: "Media & Publicity Partner",
      eventCollaboration: "Event / Festival Collaboration",
      industryPartner: "Industry Association / Network Partner",
      creativeInstitution: "Creative Institution / Training Partner",
      contentPartner: "Content Partner (Film, Fashion, Music, etc.)",
      other: "Other (please specify)",
      description: "Brief Description (What do you do? Core mission or area of focus)",
      keyMarkets: "Key Markets / Regions of Operation",
      previousPartnerships: "Previous Partnerships or Relevant Collaborations (if any)",
      whyPartner: "Why do you want to partner with Creatives Connect Afrika?",
      howCollaborate: "How do you wish to collaborate or contribute?",
      valueGain: "What value do you hope to gain or create through this partnership?",
      upcomingEvents: "Do you have upcoming events, initiatives or campaigns we should know about?",
      uploadLogo: "Upload Logo / Media Kit (optional)",
      consentAccurate: "I confirm that the information provided is accurate and I am authorised to submit this form on behalf of my organisation (if applicable).",
      consentContact: "I agree to be contacted by Creatives Connect Afrika regarding partnership opportunities.",
      consentTerms: "I have read and agree to the Terms & Conditions of Partnership",
      signature: "Signature / Name",
      date: "Date",
      submit: "Submit Partnership Application",
      submitting: "Submitting...",
      success: "Application Submitted Successfully!",
      successMessage: "Thank you for your interest in partnering with Creatives Connect Afrika. We will review your application and get back to you soon.",
      next: "Next",
      previous: "Previous",
      close: "Close"
    },
    fr: {
      title: "Devenir Partenaire",
      subtitle: "Rejoignez notre réseau d'organisations visionnaires qui font avancer l'économie créative africaine",
      section1: "Détails de l'Organisation / Individu",
      section2: "Type de Partenariat",
      section3: "À Propos de Votre Marque/Organisation",
      section4: "Objectifs de Partenariat",
      section5: "Informations Supplémentaires",
      consent: "Consentement et Confirmation",
      fullName: "Nom Complet / Nom de l'Organisation",
      contactPerson: "Personne de Contact (si organisation)",
      position: "Poste / Titre",
      email: "Adresse Email",
      phone: "Numéro de Téléphone (WhatsApp préféré)",
      website: "Site Web",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      twitter: "X (Twitter)",
      partnershipTypes: "Veuillez sélectionner le(s) type(s) de partenariat qui vous intéresse(nt) :",
      sponsorship: "Sponsoring",
      mediaPartner: "Partenaire Médias et Publicité",
      eventCollaboration: "Collaboration Événement / Festival",
      industryPartner: "Association d'Industrie / Partenaire Réseau",
      creativeInstitution: "Institution Créative / Partenaire Formation",
      contentPartner: "Partenaire Contenu (Film, Mode, Musique, etc.)",
      other: "Autre (veuillez préciser)",
      description: "Brève Description (Que faites-vous ? Mission principale ou domaine d'activité)",
      keyMarkets: "Marchés Clés / Régions d'Opération",
      previousPartnerships: "Partenariats Précédents ou Collaborations Pertinentes (le cas échéant)",
      whyPartner: "Pourquoi voulez-vous vous associer à Creatives Connect Afrika ?",
      howCollaborate: "Comment souhaitez-vous collaborer ou contribuer ?",
      valueGain: "Quelle valeur espérez-vous gagner ou créer grâce à ce partenariat ?",
      upcomingEvents: "Avez-vous des événements, initiatives ou campagnes à venir que nous devrions connaître ?",
      uploadLogo: "Télécharger Logo / Kit Médias (optionnel)",
      consentAccurate: "Je confirme que les informations fournies sont exactes et que je suis autorisé à soumettre ce formulaire au nom de mon organisation (le cas échéant).",
      consentContact: "J'accepte d'être contacté par Creatives Connect Afrika concernant les opportunités de partenariat.",
      consentTerms: "J'ai lu et accepte les Termes et Conditions de Partenariat",
      signature: "Signature / Nom",
      date: "Date",
      submit: "Soumettre la Demande de Partenariat",
      submitting: "Soumission...",
      success: "Demande Soumise avec Succès !",
      successMessage: "Merci pour votre intérêt à vous associer à Creatives Connect Afrika. Nous examinerons votre demande et vous répondrons bientôt.",
      next: "Suivant",
      previous: "Précédent",
      close: "Fermer"
    }
  }

  const t = translations[language as keyof typeof translations]

  const partnershipTypeOptions = [
    { key: 'sponsorship', label: t.sponsorship },
    { key: 'mediaPartner', label: t.mediaPartner },
    { key: 'eventCollaboration', label: t.eventCollaboration },
    { key: 'industryPartner', label: t.industryPartner },
    { key: 'creativeInstitution', label: t.creativeInstitution },
    { key: 'contentPartner', label: t.contentPartner }
  ]

  const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePartnershipTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      partnershipTypes: checked 
        ? [...prev.partnershipTypes, type]
        : prev.partnershipTypes.filter(t => t !== type)
    }))
  }

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate partnership types
    if (formData.partnershipTypes.length === 0) {
      if (onError) {
        onError('Please select at least one partnership type')
      }
      return
    }
    
    // Validate required consent checkboxes
    if (!formData.consentAccurate || !formData.consentContact || !formData.consentTerms) {
      if (onError) {
        onError('Please accept all required terms and conditions')
      }
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Save to Firebase
      const partnershipData = {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'pending'
      }
      
      await addDoc(collection(db, 'partnership-submissions'), partnershipData)
      
      // Send emails using Firebase Trigger Email extension
      try {
        await sendPartnershipEmails(formData, language as 'en' | 'fr')
        console.log('Partnership emails sent successfully')
      } catch (emailError) {
        console.error('Error sending emails:', emailError)
        // Don't fail the entire submission if email fails
        // The partnership data is still saved
      }
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error submitting partnership application:', error)
      setIsSubmitting(false)
      if (onError) {
        onError('Failed to submit partnership application')
      }
    }
  }

  const handleClose = () => {
    setCurrentSection(1)
    setIsSubmitted(false)
    setFormData({
      fullName: '',
      contactPerson: '',
      position: '',
      email: '',
      phone: '',
      website: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      partnershipTypes: [],
      otherPartnershipType: '',
      description: '',
      keyMarkets: '',
      previousPartnerships: '',
      whyPartner: '',
      howCollaborate: '',
      valueGain: '',
      upcomingEvents: '',
      consentAccurate: false,
      consentContact: false,
      consentTerms: false,
      signature: '',
      date: new Date().toISOString().split('T')[0]
    })
    onOpenChange(false)
  }

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black mb-4">Section 1: {t.section1}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-black">{t.fullName} <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPerson" className="text-black">{t.contactPerson} <span className="text-red-500">*</span></Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="position" className="text-black">{t.position} <span className="text-red-500">*</span></Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-black">{t.email} <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-black">{t.phone} <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-white border-gray-300 text-black"
                required
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-black mb-4">Website / Social Media Handles:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="website" className="text-black">{t.website}</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram" className="text-black">{t.instagram}</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-black">{t.linkedin}</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter" className="text-black">{t.twitter}</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black mb-4">Section 2: {t.section2}</h3>
            <p className="text-gray-600 mb-6">{t.partnershipTypes} <span className="text-red-500">*</span></p>
            <div className="space-y-4">
              {partnershipTypeOptions.map((option) => (
                <div key={option.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.key}
                    checked={formData.partnershipTypes.includes(option.key)}
                    onCheckedChange={(checked) => handlePartnershipTypeChange(option.key, checked as boolean)}
                    className="border-gray-300"
                  />
                  <Label htmlFor={option.key} className="text-black">{option.label}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="other"
                  checked={formData.partnershipTypes.includes('other')}
                  onCheckedChange={(checked) => handlePartnershipTypeChange('other', checked as boolean)}
                  className="border-gray-300"
                />
                <Label htmlFor="other" className="text-black">{t.other}</Label>
              </div>
              {formData.partnershipTypes.includes('other') && (
                <Input
                  value={formData.otherPartnershipType}
                  onChange={(e) => handleInputChange('otherPartnershipType', e.target.value)}
                  placeholder="Please specify..."
                  className="bg-white border-gray-300 text-black ml-6"
                />
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black mb-4">Section 3: {t.section3}</h3>
            <div>
              <Label htmlFor="description" className="text-black">{t.description} <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[120px]"
                required
              />
            </div>
            <div>
              <Label htmlFor="keyMarkets" className="text-black">{t.keyMarkets} <span className="text-red-500">*</span></Label>
              <Textarea
                id="keyMarkets"
                value={formData.keyMarkets}
                onChange={(e) => handleInputChange('keyMarkets', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[100px]"
                required
              />
            </div>
            <div>
              <Label htmlFor="previousPartnerships" className="text-black">{t.previousPartnerships} <span className="text-red-500">*</span></Label>
              <Textarea
                id="previousPartnerships"
                value={formData.previousPartnerships}
                onChange={(e) => handleInputChange('previousPartnerships', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[120px]"
                required
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black mb-4">Section 4: {t.section4}</h3>
            <div>
              <Label htmlFor="whyPartner" className="text-black">{t.whyPartner} <span className="text-red-500">*</span></Label>
              <Textarea
                id="whyPartner"
                value={formData.whyPartner}
                onChange={(e) => handleInputChange('whyPartner', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[120px]"
                required
              />
            </div>
            <div>
              <Label htmlFor="howCollaborate" className="text-black">{t.howCollaborate} <span className="text-red-500">*</span></Label>
              <Textarea
                id="howCollaborate"
                value={formData.howCollaborate}
                onChange={(e) => handleInputChange('howCollaborate', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[120px]"
                required
              />
            </div>
            <div>
              <Label htmlFor="valueGain" className="text-black">{t.valueGain} <span className="text-red-500">*</span></Label>
              <Textarea
                id="valueGain"
                value={formData.valueGain}
                onChange={(e) => handleInputChange('valueGain', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[120px]"
                required
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black mb-4">Section 5: {t.section5}</h3>
            <div>
              <Label htmlFor="upcomingEvents" className="text-black">{t.upcomingEvents} <span className="text-red-500">*</span></Label>
              <Textarea
                id="upcomingEvents"
                value={formData.upcomingEvents}
                onChange={(e) => handleInputChange('upcomingEvents', e.target.value)}
                className="bg-white border-gray-300 text-black min-h-[100px]"
                required
              />
            </div>
            <div>
              <Label className="text-black">{t.uploadLogo}</Label>
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-100"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </div>

            {/* Consent & Confirmation */}
            <div className="border-t border-gray-300 pt-6">
              <h4 className="text-lg font-semibold text-black mb-4">{t.consent}</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentAccurate"
                    checked={formData.consentAccurate}
                    onCheckedChange={(checked) => handleInputChange('consentAccurate', checked as boolean)}
                    className="border-gray-300 mt-1"
                    required
                  />
                  <Label htmlFor="consentAccurate" className="text-black text-sm">{t.consentAccurate}</Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentContact"
                    checked={formData.consentContact}
                    onCheckedChange={(checked) => handleInputChange('consentContact', checked as boolean)}
                    className="border-gray-300 mt-1"
                    required
                  />
                  <Label htmlFor="consentContact" className="text-black text-sm">{t.consentContact}</Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentTerms"
                    checked={formData.consentTerms}
                    onCheckedChange={(checked) => handleInputChange('consentTerms', checked as boolean)}
                    className="border-gray-300 mt-1"
                    required
                  />
                  <Label htmlFor="consentTerms" className="text-black text-sm">{t.consentTerms}</Label>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="signature" className="text-black">{t.signature} <span className="text-red-500">*</span></Label>
                  <Input
                    id="signature"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-black">{t.date} <span className="text-red-500">*</span></Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="bg-white border-gray-300 text-black"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl bg-white border-gray-200 text-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-black">
              {t.success}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <p className="text-gray-600 text-lg">{t.successMessage}</p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-[#E19D2B] hover:bg-[#D18A1A] text-white"
            >
              {t.close}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-white border-gray-200 text-black overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            {t.title}
          </DialogTitle>
          <p className="text-gray-600">{t.subtitle}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: totalSections }, (_, i) => (
                <div
                  key={i + 1}
                  className={`w-8 h-2 rounded ${
                    i + 1 <= currentSection ? 'bg-[#E19D2B]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {currentSection} / {totalSections}
            </span>
          </div>

          {/* Terms & Conditions Link */}
          <div className="text-center mb-6">
            <PartnershipTerms />
          </div>

          {/* Current Section Content */}
          <div className="min-h-[400px]">
            {renderSection()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-300">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSection === 1}
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              {t.previous}
            </Button>
            
            {currentSection < totalSections ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white"
              >
                {t.next}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.submit}
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
