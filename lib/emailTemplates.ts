interface PartnershipFormData {
  fullName: string
  contactPerson: string
  position: string
  email: string
  phone: string
  website: string
  instagram: string
  linkedin: string
  twitter: string
  partnershipTypes: string[]
  otherPartnershipType: string
  description: string
  keyMarkets: string
  previousPartnerships: string
  whyPartner: string
  howCollaborate: string
  valueGain: string
  upcomingEvents: string
  signature: string
  date: string
}

interface ParticipantRegistrationData {
  fullName: string
  email: string
  phone?: string
  country: string
  identificationNumber: string
  organization: string
  designation: string
  visaSupport: string
  futureUpdates: string
  consent: boolean
  timestamp: any
}

interface ExhibitorRegistrationData {
  organizationName: string
  contactPerson: string
  email: string
  phone: string
  country: string
  website?: string
  aboutCompany?: string
  productsServices?: string
  category: string
  boothNeeds: string
  logoUpload?: File | null
  shippingAssistance: string
  accommodationAssistance: string
  additionalAssistance?: string
  consent: boolean
  includeInHandbook: string
  timestamp: any
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  timestamp: any
}

interface EmailTemplate {
  to: string
  message: {
    subject: string
    html: string
    text: string
  }
}

const partnershipTypeLabels = {
  en: {
    sponsorship: "Sponsorship",
    mediaPartner: "Media & Publicity Partner",
    eventCollaboration: "Event / Festival Collaboration",
    industryPartner: "Industry Association / Network Partner",
    creativeInstitution: "Creative Institution / Training Partner",
    contentPartner: "Content Partner (Film, Fashion, Music, etc.)",
    other: "Other"
  },
  fr: {
    sponsorship: "Sponsoring",
    mediaPartner: "Partenaire Médias et Publicité",
    eventCollaboration: "Collaboration Événement / Festival",
    industryPartner: "Association d'Industrie / Partenaire Réseau",
    creativeInstitution: "Institution Créative / Partenaire Formation",
    contentPartner: "Partenaire Contenu (Film, Mode, Musique, etc.)",
    other: "Autre"
  }
}

export const generateUserConfirmationEmail = (
  formData: PartnershipFormData,
  language: 'en' | 'fr' = 'en'
): EmailTemplate => {
  const t = language === 'en' ? {
    subject: "Partnership Application Received - Creatives Connect Afrika",
    greeting: "Dear",
    thankYou: "Thank you for your interest in partnering with Creatives Connect Afrika!",
    confirmation: "We have successfully received your partnership application.",
    nextSteps: "What happens next?",
    review: "Our team will review your application and assess how we can best collaborate.",
    timeline: "We aim to respond within 5-7 business days.",
    contact: "If you have any questions, please don't hesitate to reach out to us.",
    signature: "Best regards,<br>The Creatives Connect Afrika Team",
    applicationDetails: "Application Details",
    organization: "Organization",
    contactPerson: "Contact Person",
    email: "Email",
    phone: "Phone",
    partnershipTypes: "Partnership Types",
    submittedOn: "Submitted on"
  } : {
    subject: "Demande de Partenariat Reçue - Creatives Connect Afrika",
    greeting: "Cher/Chère",
    thankYou: "Merci pour votre intérêt à vous associer à Creatives Connect Afrika !",
    confirmation: "Nous avons bien reçu votre demande de partenariat.",
    nextSteps: "Que se passe-t-il ensuite ?",
    review: "Notre équipe examinera votre demande et évaluera comment nous pouvons mieux collaborer.",
    timeline: "Nous nous efforçons de répondre dans les 5-7 jours ouvrables.",
    contact: "Si vous avez des questions, n'hésitez pas à nous contacter.",
    signature: "Cordialement,<br>L'équipe Creatives Connect Afrika",
    applicationDetails: "Détails de la Demande",
    organization: "Organisation",
    contactPerson: "Personne de Contact",
    email: "Email",
    phone: "Téléphone",
    partnershipTypes: "Types de Partenariat",
    submittedOn: "Soumis le"
  }

  const partnershipTypesText = formData.partnershipTypes
    .map(type => partnershipTypeLabels[language][type as keyof typeof partnershipTypeLabels.en] || type)
    .join(', ')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #E19D2B; margin: 0; font-size: 24px;">Creatives Connect Afrika</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">${t.subject}</h2>
        
        <p>${t.greeting} ${formData.contactPerson},</p>
        
        <p>${t.thankYou}</p>
        
        <p>${t.confirmation}</p>
        
        <h3 style="color: #E19D2B; margin-top: 30px;">${t.nextSteps}</h3>
        <ul>
          <li>${t.review}</li>
          <li>${t.timeline}</li>
        </ul>
        
        <p>${t.contact}</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.applicationDetails}</h3>
          <p><strong>${t.organization}:</strong> ${formData.fullName}</p>
          <p><strong>${t.contactPerson}:</strong> ${formData.contactPerson}</p>
          <p><strong>${t.email}:</strong> ${formData.email}</p>
          <p><strong>${t.phone}:</strong> ${formData.phone}</p>
          <p><strong>${t.partnershipTypes}:</strong> ${partnershipTypesText}</p>
          <p><strong>${t.submittedOn}:</strong> ${new Date(formData.date).toLocaleDateString()}</p>
        </div>
        
        <p style="margin-top: 30px;">${t.signature}</p>
        
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
          <p>This email was sent to ${formData.email} because you submitted a partnership application on our website.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
${t.subject}

${t.greeting} ${formData.contactPerson},

${t.thankYou}

${t.confirmation}

${t.nextSteps}
- ${t.review}
- ${t.timeline}

${t.contact}

${t.applicationDetails}
${t.organization}: ${formData.fullName}
${t.contactPerson}: ${formData.contactPerson}
${t.email}: ${formData.email}
${t.phone}: ${formData.phone}
${t.partnershipTypes}: ${partnershipTypesText}
${t.submittedOn}: ${new Date(formData.date).toLocaleDateString()}

${t.signature}

This email was sent to ${formData.email} because you submitted a partnership application on our website.
  `

  return {
    to: formData.email,
    message: {
      subject: t.subject,
      html,
      text
    }
  }
}

export const generateAdminNotificationEmail = (
  formData: PartnershipFormData,
  language: 'en' | 'fr' = 'en',
  adminEmail: string = 'admin@creativesconnectafrika.com'
): EmailTemplate => {
  const t = language === 'en' ? {
    subject: "New Partnership Application - Creatives Connect Afrika",
    newApplication: "New Partnership Application Received",
    organization: "Organization",
    contactPerson: "Contact Person",
    position: "Position",
    email: "Email",
    phone: "Phone",
    website: "Website",
    socialMedia: "Social Media",
    partnershipTypes: "Partnership Types",
    description: "Description",
    keyMarkets: "Key Markets",
    previousPartnerships: "Previous Partnerships",
    whyPartner: "Why Partner with Us",
    howCollaborate: "How They Want to Collaborate",
    valueGain: "Expected Value",
    upcomingEvents: "Upcoming Events",
    signature: "Signature",
    submittedOn: "Submitted on",
    reviewApplication: "Please review this application in the Firebase console.",
    actionRequired: "Action Required"
  } : {
    subject: "Nouvelle Demande de Partenariat - Creatives Connect Afrika",
    newApplication: "Nouvelle Demande de Partenariat Reçue",
    organization: "Organisation",
    contactPerson: "Personne de Contact",
    position: "Poste",
    email: "Email",
    phone: "Téléphone",
    website: "Site Web",
    socialMedia: "Médias Sociaux",
    partnershipTypes: "Types de Partenariat",
    description: "Description",
    keyMarkets: "Marchés Clés",
    previousPartnerships: "Partenariats Précédents",
    whyPartner: "Pourquoi Partenariat avec Nous",
    howCollaborate: "Comment Ils Veulent Collaborer",
    valueGain: "Valeur Attendue",
    upcomingEvents: "Événements à Venir",
    signature: "Signature",
    submittedOn: "Soumis le",
    reviewApplication: "Veuillez examiner cette demande dans la console Firebase.",
    actionRequired: "Action Requise"
  }

  const partnershipTypesText = formData.partnershipTypes
    .map(type => partnershipTypeLabels[language][type as keyof typeof partnershipTypeLabels.en] || type)
    .join(', ')

  const socialMediaLinks = []
  if (formData.website) socialMediaLinks.push(`Website: ${formData.website}`)
  if (formData.instagram) socialMediaLinks.push(`Instagram: ${formData.instagram}`)
  if (formData.linkedin) socialMediaLinks.push(`LinkedIn: ${formData.linkedin}`)
  if (formData.twitter) socialMediaLinks.push(`Twitter: ${formData.twitter}`)

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #dc3545; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">${t.actionRequired}</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">${t.newApplication}</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.organization}: ${formData.fullName}</h3>
          <p><strong>${t.contactPerson}:</strong> ${formData.contactPerson}</p>
          <p><strong>${t.position}:</strong> ${formData.position}</p>
          <p><strong>${t.email}:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          <p><strong>${t.phone}:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
          ${socialMediaLinks.length > 0 ? `<p><strong>${t.socialMedia}:</strong><br>${socialMediaLinks.join('<br>')}</p>` : ''}
        </div>
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">${t.partnershipTypes}</h3>
          <p>${partnershipTypesText}</p>
          ${formData.otherPartnershipType ? `<p><strong>Other:</strong> ${formData.otherPartnershipType}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.description}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.description}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.keyMarkets}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.keyMarkets}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.previousPartnerships}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.previousPartnerships}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.whyPartner}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.whyPartner}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.howCollaborate}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.howCollaborate}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.valueGain}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.valueGain}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #E19D2B;">${t.upcomingEvents}</h3>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${formData.upcomingEvents}</p>
        </div>
        
        <div style="background-color: #d1ecf1; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #0c5460; margin-top: 0;">Application Details</h3>
          <p><strong>${t.signature}:</strong> ${formData.signature}</p>
          <p><strong>${t.submittedOn}:</strong> ${new Date(formData.date).toLocaleDateString()}</p>
        </div>
        
        <div style="background-color: #d4edda; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <p><strong>${t.reviewApplication}</strong></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
${t.subject}

${t.newApplication}

${t.organization}: ${formData.fullName}
${t.contactPerson}: ${formData.contactPerson}
${t.position}: ${formData.position}
${t.email}: ${formData.email}
${t.phone}: ${formData.phone}
${socialMediaLinks.length > 0 ? `${t.socialMedia}: ${socialMediaLinks.join(', ')}` : ''}

${t.partnershipTypes}: ${partnershipTypesText}
${formData.otherPartnershipType ? `Other: ${formData.otherPartnershipType}` : ''}

${t.description}:
${formData.description}

${t.keyMarkets}:
${formData.keyMarkets}

${t.previousPartnerships}:
${formData.previousPartnerships}

${t.whyPartner}:
${formData.whyPartner}

${t.howCollaborate}:
${formData.howCollaborate}

${t.valueGain}:
${formData.valueGain}

${t.upcomingEvents}:
${formData.upcomingEvents}

Application Details:
${t.signature}: ${formData.signature}
${t.submittedOn}: ${new Date(formData.date).toLocaleDateString()}

${t.reviewApplication}
  `

  return {
    to: adminEmail,
    message: {
      subject: `${t.subject} - ${formData.fullName}`,
      html,
      text
    }
  }
}

// Participant Registration Confirmation Email
export const generateParticipantConfirmationEmail = (
  formData: ParticipantRegistrationData,
  language: 'en' | 'fr' = 'en'
): EmailTemplate => {
  const t = language === 'en' ? {
    subject: "Registration Confirmed - Creatives Connect Afrika 2025",
    greeting: "Dear",
    thankYou: "Thank you for registering for Creatives Connect Afrika 2025!",
    confirmation: "Your participant registration has been successfully confirmed.",
    nextSteps: "What happens next?",
    review: "Our team will review your registration and send you additional event details.",
    timeline: "You will receive event updates and important information via email.",
    contact: "If you have any questions, please don't hesitate to reach out to us.",
    signature: "Best regards,<br>The Creatives Connect Afrika Team",
    registrationDetails: "Registration Details",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    country: "Country",
    organization: "Organization",
    designation: "Designation",
    visaSupport: "Visa Support Required",
    futureUpdates: "Future Updates",
    submittedOn: "Submitted on",
    eventInfo: "Event Information",
    eventDate: "Event Dates",
    eventLocation: "Event Location",
    eventDates: "24 – 26 November 2025",
    eventLocationValue: "La Palm Royal Beach Hotel, Accra, Ghana"
  } : {
    subject: "Inscription Confirmée - Creatives Connect Afrika 2025",
    greeting: "Cher/Chère",
    thankYou: "Merci de vous être inscrit(e) à Creatives Connect Afrika 2025 !",
    confirmation: "Votre inscription de participant a été confirmée avec succès.",
    nextSteps: "Que se passe-t-il ensuite ?",
    review: "Notre équipe examinera votre inscription et vous enverra des détails supplémentaires sur l'événement.",
    timeline: "Vous recevrez des mises à jour sur l'événement et des informations importantes par email.",
    contact: "Si vous avez des questions, n'hésitez pas à nous contacter.",
    signature: "Cordialement,<br>L'équipe Creatives Connect Afrika",
    registrationDetails: "Détails de l'Inscription",
    fullName: "Nom Complet",
    email: "Email",
    phone: "Téléphone",
    country: "Pays",
    organization: "Organisation",
    designation: "Poste",
    visaSupport: "Support Visa Requis",
    futureUpdates: "Mises à Jour Futures",
    submittedOn: "Soumis le",
    eventInfo: "Informations sur l'Événement",
    eventDate: "Dates de l'Événement",
    eventLocation: "Lieu de l'Événement",
    eventDates: "24 – 26 Novembre 2025",
    eventLocationValue: "La Palm Royal Beach Hotel, Accra, Ghana"
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #E19D2B; margin: 0; font-size: 24px;">Creatives Connect Afrika</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">${t.subject}</h2>
        
        <p>${t.greeting} ${formData.fullName},</p>
        
        <p>${t.thankYou}</p>
        
        <p>${t.confirmation}</p>
        
        <h3 style="color: #E19D2B; margin-top: 30px;">${t.nextSteps}</h3>
        <ul>
          <li>${t.review}</li>
          <li>${t.timeline}</li>
        </ul>
        
        <p>${t.contact}</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.registrationDetails}</h3>
          <p><strong>${t.fullName}:</strong> ${formData.fullName}</p>
          <p><strong>${t.email}:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>${t.phone}:</strong> ${formData.phone}</p>` : ''}
          <p><strong>${t.country}:</strong> ${formData.country}</p>
          <p><strong>${t.organization}:</strong> ${formData.organization}</p>
          <p><strong>${t.designation}:</strong> ${formData.designation}</p>
          <p><strong>${t.visaSupport}:</strong> ${formData.visaSupport === 'yes' ? 'Yes' : 'No'}</p>
          <p><strong>${t.futureUpdates}:</strong> ${formData.futureUpdates === 'yes' ? 'Yes' : 'No'}</p>
          <p><strong>${t.submittedOn}:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="background-color: #e8f4fd; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.eventInfo}</h3>
          <p><strong>${t.eventDate}:</strong> ${t.eventDates}</p>
          <p><strong>${t.eventLocation}:</strong> ${t.eventLocationValue}</p>
        </div>
        
        <p style="margin-top: 30px;">${t.signature}</p>
        
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
          <p>This email was sent to ${formData.email} because you registered for Creatives Connect Afrika 2025.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
${t.subject}

${t.greeting} ${formData.fullName},

${t.thankYou}

${t.confirmation}

${t.nextSteps}
- ${t.review}
- ${t.timeline}

${t.contact}

${t.registrationDetails}
${t.fullName}: ${formData.fullName}
${t.email}: ${formData.email}
${formData.phone ? `${t.phone}: ${formData.phone}` : ''}
${t.country}: ${formData.country}
${t.organization}: ${formData.organization}
${t.designation}: ${formData.designation}
${t.visaSupport}: ${formData.visaSupport === 'yes' ? 'Yes' : 'No'}
${t.futureUpdates}: ${formData.futureUpdates === 'yes' ? 'Yes' : 'No'}
${t.submittedOn}: ${new Date().toLocaleDateString()}

${t.eventInfo}
${t.eventDate}: ${t.eventDates}
${t.eventLocation}: ${t.eventLocationValue}

${t.signature}

This email was sent to ${formData.email} because you registered for Creatives Connect Afrika 2025.
  `

  return {
    to: formData.email,
    message: {
      subject: t.subject,
      html,
      text
    }
  }
}

// Exhibitor Registration Confirmation Email
export const generateExhibitorConfirmationEmail = (
  formData: ExhibitorRegistrationData,
  language: 'en' | 'fr' = 'en'
): EmailTemplate => {
  const t = language === 'en' ? {
    subject: "Exhibitor Registration Confirmed - Creatives Connect Afrika 2025",
    greeting: "Dear",
    thankYou: "Thank you for registering as an exhibitor for Creatives Connect Afrika 2025!",
    confirmation: "Your exhibitor registration has been successfully confirmed.",
    nextSteps: "What happens next?",
    review: "Our team will review your registration and contact you with exhibition details.",
    timeline: "You will receive booth assignment and setup information via email.",
    contact: "If you have any questions about your exhibition space, please don't hesitate to reach out.",
    signature: "Best regards,<br>The Creatives Connect Afrika Team",
    registrationDetails: "Exhibition Registration Details",
    organizationName: "Organization Name",
    contactPerson: "Contact Person",
    email: "Email",
    phone: "Phone",
    country: "Country",
    website: "Website",
    category: "Category",
    boothNeeds: "Booth Requirements",
    shippingAssistance: "Shipping Assistance",
    accommodationAssistance: "Accommodation Assistance",
    includeInHandbook: "Include in Handbook",
    submittedOn: "Submitted on",
    eventInfo: "Event Information",
    eventDate: "Event Dates",
    eventLocation: "Event Location",
    eventDates: "24 – 26 November 2025",
    eventLocationValue: "La Palm Royal Beach Hotel, Accra, Ghana"
  } : {
    subject: "Inscription Exposant Confirmée - Creatives Connect Afrika 2025",
    greeting: "Cher/Chère",
    thankYou: "Merci de vous être inscrit(e) comme exposant pour Creatives Connect Afrika 2025 !",
    confirmation: "Votre inscription d'exposant a été confirmée avec succès.",
    nextSteps: "Que se passe-t-il ensuite ?",
    review: "Notre équipe examinera votre inscription et vous contactera avec les détails de l'exposition.",
    timeline: "Vous recevrez l'attribution de stand et les informations d'installation par email.",
    contact: "Si vous avez des questions sur votre espace d'exposition, n'hésitez pas à nous contacter.",
    signature: "Cordialement,<br>L'équipe Creatives Connect Afrika",
    registrationDetails: "Détails de l'Inscription d'Exposition",
    organizationName: "Nom de l'Organisation",
    contactPerson: "Personne de Contact",
    email: "Email",
    phone: "Téléphone",
    country: "Pays",
    website: "Site Web",
    category: "Catégorie",
    boothNeeds: "Besoins de Stand",
    shippingAssistance: "Assistance Expédition",
    accommodationAssistance: "Assistance Hébergement",
    includeInHandbook: "Inclure dans le Manuel",
    submittedOn: "Soumis le",
    eventInfo: "Informations sur l'Événement",
    eventDate: "Dates de l'Événement",
    eventLocation: "Lieu de l'Événement",
    eventDates: "24 – 26 Novembre 2025",
    eventLocationValue: "La Palm Royal Beach Hotel, Accra, Ghana"
  }

  const categoryLabels = {
    en: {
      'tourism-operator': 'Tourism Operator',
      'creative-entrepreneur': 'Creative Entrepreneur',
      'artist-performer': 'Artist/Performer',
      'cultural-institution': 'Cultural Institution',
      'other': 'Other'
    },
    fr: {
      'tourism-operator': 'Opérateur Touristique',
      'creative-entrepreneur': 'Entrepreneur Créatif',
      'artist-performer': 'Artiste/Interprète',
      'cultural-institution': 'Institution Culturelle',
      'other': 'Autre'
    }
  }

  const boothLabels = {
    en: {
      'standard-booth': 'Standard Booth (3m x 3m)',
      'large-booth': 'Large Booth (6m x 3m)',
      'custom-display': 'Custom Display Space',
      'outdoor-space': 'Outdoor Exhibition Space',
      'not-sure': 'Not Sure Yet'
    },
    fr: {
      'standard-booth': 'Stand Standard (3m x 3m)',
      'large-booth': 'Grand Stand (6m x 3m)',
      'custom-display': 'Espace d\'Affichage Personnalisé',
      'outdoor-space': 'Espace d\'Exposition Extérieur',
      'not-sure': 'Pas Encore Sûr'
    }
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #E19D2B; margin: 0; font-size: 24px;">Creatives Connect Afrika</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">${t.subject}</h2>
        
        <p>${t.greeting} ${formData.contactPerson},</p>
        
        <p>${t.thankYou}</p>
        
        <p>${t.confirmation}</p>
        
        <h3 style="color: #E19D2B; margin-top: 30px;">${t.nextSteps}</h3>
        <ul>
          <li>${t.review}</li>
          <li>${t.timeline}</li>
        </ul>
        
        <p>${t.contact}</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.registrationDetails}</h3>
          <p><strong>${t.organizationName}:</strong> ${formData.organizationName}</p>
          <p><strong>${t.contactPerson}:</strong> ${formData.contactPerson}</p>
          <p><strong>${t.email}:</strong> ${formData.email}</p>
          <p><strong>${t.phone}:</strong> ${formData.phone}</p>
          <p><strong>${t.country}:</strong> ${formData.country}</p>
          ${formData.website ? `<p><strong>${t.website}:</strong> ${formData.website}</p>` : ''}
          <p><strong>${t.category}:</strong> ${categoryLabels[language][formData.category as keyof typeof categoryLabels.en] || formData.category}</p>
          <p><strong>${t.boothNeeds}:</strong> ${boothLabels[language][formData.boothNeeds as keyof typeof boothLabels.en] || formData.boothNeeds}</p>
          <p><strong>${t.shippingAssistance}:</strong> ${formData.shippingAssistance === 'yes' ? 'Yes' : 'No'}</p>
          <p><strong>${t.accommodationAssistance}:</strong> ${formData.accommodationAssistance === 'yes' ? 'Yes' : 'No'}</p>
          <p><strong>${t.includeInHandbook}:</strong> ${formData.includeInHandbook === 'yes' ? 'Yes' : 'No'}</p>
          <p><strong>${t.submittedOn}:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="background-color: #e8f4fd; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.eventInfo}</h3>
          <p><strong>${t.eventDate}:</strong> ${t.eventDates}</p>
          <p><strong>${t.eventLocation}:</strong> ${t.eventLocationValue}</p>
        </div>
        
        <p style="margin-top: 30px;">${t.signature}</p>
        
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
          <p>This email was sent to ${formData.email} because you registered as an exhibitor for Creatives Connect Afrika 2025.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
${t.subject}

${t.greeting} ${formData.contactPerson},

${t.thankYou}

${t.confirmation}

${t.nextSteps}
- ${t.review}
- ${t.timeline}

${t.contact}

${t.registrationDetails}
${t.organizationName}: ${formData.organizationName}
${t.contactPerson}: ${formData.contactPerson}
${t.email}: ${formData.email}
${t.phone}: ${formData.phone}
${t.country}: ${formData.country}
${formData.website ? `${t.website}: ${formData.website}` : ''}
${t.category}: ${categoryLabels[language][formData.category as keyof typeof categoryLabels.en] || formData.category}
${t.boothNeeds}: ${boothLabels[language][formData.boothNeeds as keyof typeof boothLabels.en] || formData.boothNeeds}
${t.shippingAssistance}: ${formData.shippingAssistance === 'yes' ? 'Yes' : 'No'}
${t.accommodationAssistance}: ${formData.accommodationAssistance === 'yes' ? 'Yes' : 'No'}
${t.includeInHandbook}: ${formData.includeInHandbook === 'yes' ? 'Yes' : 'No'}
${t.submittedOn}: ${new Date().toLocaleDateString()}

${t.eventInfo}
${t.eventDate}: ${t.eventDates}
${t.eventLocation}: ${t.eventLocationValue}

${t.signature}

This email was sent to ${formData.email} because you registered as an exhibitor for Creatives Connect Afrika 2025.
  `

  return {
    to: formData.email,
    message: {
      subject: t.subject,
      html,
      text
    }
  }
}

// Contact Form Confirmation Email
export const generateContactConfirmationEmail = (
  formData: ContactFormData,
  language: 'en' | 'fr' = 'en'
): EmailTemplate => {
  const t = language === 'en' ? {
    subject: "Message Received - Creatives Connect Afrika",
    greeting: "Dear",
    thankYou: "Thank you for contacting Creatives Connect Afrika!",
    confirmation: "We have successfully received your message and will get back to you as soon as possible.",
    nextSteps: "What happens next?",
    review: "Our team will review your inquiry and respond within 24-48 hours.",
    timeline: "We typically respond to all inquiries within 1-2 business days.",
    contact: "If this is urgent, please don't hesitate to call us directly.",
    signature: "Best regards,<br>The Creatives Connect Afrika Team",
    messageDetails: "Message Details",
    name: "Name",
    email: "Email",
    phone: "Phone",
    subjectField: "Subject",
    messageField: "Message",
    submittedOn: "Submitted on",
    contactInfo: "Contact Information",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    location: "Location",
    emailValue: "rejoice@africatourismpartners.com",
    phoneValue: "Contact us for phone number",
    locationValue: "La Palm Royal Beach Hotel, Accra, Ghana"
  } : {
    subject: "Message Reçu - Creatives Connect Afrika",
    greeting: "Cher/Chère",
    thankYou: "Merci d'avoir contacté Creatives Connect Afrika !",
    confirmation: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
    nextSteps: "Que se passe-t-il ensuite ?",
    review: "Notre équipe examinera votre demande et répondra dans les 24-48 heures.",
    timeline: "Nous répondons généralement à toutes les demandes dans les 1-2 jours ouvrables.",
    contact: "Si c'est urgent, n'hésitez pas à nous appeler directement.",
    signature: "Cordialement,<br>L'équipe Creatives Connect Afrika",
    messageDetails: "Détails du Message",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    subjectField: "Sujet",
    messageField: "Message",
    submittedOn: "Soumis le",
    contactInfo: "Informations de Contact",
    emailAddress: "Adresse Email",
    phoneNumber: "Numéro de Téléphone",
    location: "Lieu",
    emailValue: "rejoice@africatourismpartners.com",
    phoneValue: "Contactez-nous pour le numéro de téléphone",
    locationValue: "La Palm Royal Beach Hotel, Accra, Ghana"
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #E19D2B; margin: 0; font-size: 24px;">Creatives Connect Afrika</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">${t.subject}</h2>
        
        <p>${t.greeting} ${formData.name},</p>
        
        <p>${t.thankYou}</p>
        
        <p>${t.confirmation}</p>
        
        <h3 style="color: #E19D2B; margin-top: 30px;">${t.nextSteps}</h3>
        <ul>
          <li>${t.review}</li>
          <li>${t.timeline}</li>
        </ul>
        
        <p>${t.contact}</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.messageDetails}</h3>
          <p><strong>${t.name}:</strong> ${formData.name}</p>
          <p><strong>${t.email}:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>${t.phone}:</strong> ${formData.phone}</p>` : ''}
          <p><strong>${t.subjectField}:</strong> ${formData.subject}</p>
          <p><strong>${t.messageField}:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #E19D2B;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
          <p><strong>${t.submittedOn}:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="background-color: #e8f4fd; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <h3 style="color: #E19D2B; margin-top: 0;">${t.contactInfo}</h3>
          <p><strong>${t.emailAddress}:</strong> <a href="mailto:${t.emailValue}">${t.emailValue}</a></p>
          <p><strong>${t.location}:</strong> ${t.locationValue}</p>
        </div>
        
        <p style="margin-top: 30px;">${t.signature}</p>
        
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
          <p>This email was sent to ${formData.email} because you contacted Creatives Connect Afrika.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
${t.subject}

${t.greeting} ${formData.name},

${t.thankYou}

${t.confirmation}

${t.nextSteps}
- ${t.review}
- ${t.timeline}

${t.contact}

${t.messageDetails}
${t.name}: ${formData.name}
${t.email}: ${formData.email}
${formData.phone ? `${t.phone}: ${formData.phone}` : ''}
${t.subjectField}: ${formData.subject}
${t.messageField}:
${formData.message}
${t.submittedOn}: ${new Date().toLocaleDateString()}

${t.contactInfo}
${t.emailAddress}: ${t.emailValue}
${t.location}: ${t.locationValue}

${t.signature}

This email was sent to ${formData.email} because you contacted Creatives Connect Afrika.
  `

  return {
    to: formData.email,
    message: {
      subject: t.subject,
      html,
      text
    }
  }
}
