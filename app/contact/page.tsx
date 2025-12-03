"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"
import { submitContactForm, sendContactConfirmationEmail } from "@/lib/firebaseService"

export default function ContactPage() {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const translations = {
    en: {
      nav: {
        about: "About Us",
        programme: "Programme",
        speakers: "Speakers",
        register: "Register",
        activities: "Activities",
        media: "Media",
        partners: "Partners",
        contact: "Contact"
      },
      hero: {
        title: "Get in Touch",
        subtitle: "Have questions about Creatives Connect Afrika? We'd love to hear from you. Reach out to our team and let's connect."
      },
      contactInfo: {
        title: "Contact Information",
        subtitle: "Connect with us through any of these channels",
        email: {
          title: "Email Us",
          description: "For general inquiries and support",
          value: "rejoice@africatourismpartners.com | blackstarexperience@presidency.gov.gh | ohene.kofi@au-afcfta.org"
        },
        location: {
          title: "Event Location",
          description: "Where the magic happens",
          value: "La Palm Royal Beach Hotel, Accra, Ghana"
        },
        social: {
          title: "Social Media",
          description: "Follow us for updates and announcements"
        },
        eventDate: {
          title: "Event Dates",
          description: "Save the date for this historic event",
          value: "24 – 26 November 2025"
        }
      },
      contactForm: {
        title: "Send Us a Message",
        subtitle: "Fill out the form below and we'll get back to you as soon as possible",
        name: "Full Name",
        namePlaceholder: "John Doe",
        email: "Email Address",
        emailPlaceholder: "john@example.com",
        phone: "Phone Number",
        phonePlaceholder: "+233 XXX XXX XXX",
        subject: "Subject",
        subjectPlaceholder: "How can we help you?",
        message: "Message",
        messagePlaceholder: "Tell us more about your inquiry...",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Thank you! Your message has been sent successfully.",
        error: "Sorry, there was an error sending your message. Please try again."
      },
      cta: {
        title: "Ready to Join Us?",
        subtitle: "Register now for the inaugural Creatives Connect Afrika Festival & Forum 2025",
        registerNow: "Register to Attend",
        registerAsExhibitor: "Register as Exhibitor"
      },
      footer: {
        description: "Uniting Africa's creative minds to build a prosperous future through innovation, cultural exchange, and economic integration.",
        copyright: "© 2025 Creatives Connect Afrika. All rights reserved."
      }
    },
    fr: {
      nav: {
        about: "À Propos",
        programme: "Programme",
        speakers: "Intervenants",
        register: "S'inscrire",
        activities: "Activités",
        media: "Médias",
        partners: "Partenaires",
        contact: "Contact"
      },
      hero: {
        title: "Contactez-nous",
        subtitle: "Vous avez des questions sur Creatives Connect Afrika? Nous serions ravis de vous entendre. Contactez notre équipe et connectons-nous."
      },
      contactInfo: {
        title: "Informations de Contact",
        subtitle: "Connectez-vous avec nous via l'un de ces canaux",
        email: {
          title: "Envoyez-nous un Email",
          description: "Pour les demandes générales et le support",
          value: "rejoice@africatourismpartners.com, blackstarexperience@presidency.gov.gh, Ohene.Kofi@au-afcfta.org"
        },
        location: {
          title: "Lieu de l'Événement",
          description: "Où la magie opère",
          value: "La Palm Royal Beach Hotel, Accra, Ghana"
        },
        social: {
          title: "Réseaux Sociaux",
          description: "Suivez-nous pour les mises à jour et annonces"
        },
        eventDate: {
          title: "Dates de l'Événement",
          description: "Réservez la date pour cet événement historique",
          value: "24 – 26 Novembre 2025"
        }
      },
      contactForm: {
        title: "Envoyez-nous un Message",
        subtitle: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais",
        name: "Nom Complet",
        namePlaceholder: "Jean Dupont",
        email: "Adresse Email",
        emailPlaceholder: "jean@exemple.com",
        phone: "Numéro de Téléphone",
        phonePlaceholder: "+233 XXX XXX XXX",
        subject: "Sujet",
        subjectPlaceholder: "Comment pouvons-nous vous aider?",
        message: "Message",
        messagePlaceholder: "Parlez-nous de votre demande...",
        submit: "Envoyer le Message",
        submitting: "Envoi en cours...",
        success: "Merci! Votre message a été envoyé avec succès.",
        error: "Désolé, une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer."
      },
      cta: {
        title: "Prêt à Nous Rejoindre?",
        subtitle: "Inscrivez-vous maintenant pour le Festival et Forum inaugural Creatives Connect Afrika 2025",
        registerNow: "S'inscrire pour Participer",
        registerAsExhibitor: "S'inscrire comme Exposant"
      },
      footer: {
        description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique.",
        copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés."
      }
    }
  };

  const t = translations[language];

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Firebase
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message
      });
      
      if (result.success) {
        // Send confirmation email
        try {
          await sendContactConfirmationEmail({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            subject: formData.subject,
            message: formData.message,
            timestamp: new Date()
          }, language);
          console.log('Confirmation email sent successfully');
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't fail the form submission if email fails
        }
        
        setSubmitStatus('success');
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const emailAddresses = [
    { email: "rejoice@africatourismpartners.com", label: "Africa Tourism Partners" },
    { email: "blackstarexperience@presidency.gov.gh", label: "Black Star Experience" },
    { email: "ohene.kofi@au-afcfta.org", label: "AfCFTA" }
  ];

  const contactMethods = [
    {
      icon: Mail,
      color: "from-blue-600 to-purple-600",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-500/30",
      title: t.contactInfo.email.title,
      description: t.contactInfo.email.description,
      value: null, // Will render custom email list
      link: null,
      isEmailCard: true
    },
    {
      icon: MapPin,
      color: "from-green-600 to-yellow-600",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-500/30",
      title: t.contactInfo.location.title,
      description: t.contactInfo.location.description,
      value: t.contactInfo.location.value,
      link: "https://maps.google.com/?q=La+Palm+Royal+Beach+Hotel+Accra+Ghana"
    },
    {
      icon: Clock,
      color: "from-pink-600 to-orange-600",
      bgColor: "bg-pink-600/20",
      borderColor: "border-pink-500/30",
      title: t.contactInfo.eventDate.title,
      description: t.contactInfo.eventDate.description,
      value: t.contactInfo.eventDate.value,
      link: null
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1YkKMwaJsT/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495V14.708h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.919.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
        </svg>
      )
    },
    {
      name: "Twitter/X",
      url: "https://x.com/CreativesAfrika",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/creatives-connect-afrika/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/creativesconnectafrika",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: "TikTok",
      url: "https://vm.tiktok.com/ZMA6Dersg/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/7.jpeg')`}} className="bg-cover bg-center bg-no-repeat">
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
          <Header language={language} setLanguage={setLanguage} currentPage="contact" />

          {/* Hero Section */}
          <section className="py-28 md:pb-44 md:pt-52 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                {t.contactInfo.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t.contactInfo.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-black border border-white/10 rounded-none overflow-hidden backdrop-blur-sm hover:border-[#E19D2B]/50 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`mb-6 inline-flex p-4 rounded-full bg-gradient-to-r ${method.color} shadow-lg`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-2 text-white">{method.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                    {method.isEmailCard ? (
                      <div className="space-y-2">
                        {emailAddresses.map((item, idx) => (
                          <div key={idx}>
                            <Link
                              href={`mailto:${item.email}`}
                              className="text-[#E19D2B] hover:text-white font-semibold text-sm break-words transition-colors block"
                            >
                              {item.email}
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : method.link ? (
                      <Link 
                        href={method.link}
                        target={method.link.startsWith('http') ? '_blank' : undefined}
                        rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[#E19D2B] hover:text-white font-semibold break-words transition-colors"
                      >
                        {method.value}
                      </Link>
                    ) : (
                      <p className="text-[#E19D2B] font-semibold">{method.value}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media Section */}
            <div className="text-center">
              <div className="mb-6">
                <Globe className="w-12 h-12 text-[#E19D2B] mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">{t.contactInfo.social.title}</h3>
                <p className="text-gray-400">{t.contactInfo.social.description}</p>
              </div>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-[#E19D2B] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    title={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <MessageCircle className="w-12 h-12 text-[#E19D2B] mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                {t.contactForm.title}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t.contactForm.subtitle}
              </p>
            </div>

            <Card className="bg-black border border-white/10 rounded-none">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white font-semibold mb-2 block">
                        {t.contactForm.name} *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder={t.contactForm.namePlaceholder}
                        className="bg-white/5 border-white/10 text-white rounded-none h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white font-semibold mb-2 block">
                        {t.contactForm.email} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        placeholder={t.contactForm.emailPlaceholder}
                        className="bg-white/5 border-white/10 text-white rounded-none h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-white font-semibold mb-2 block">
                        {t.contactForm.phone}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                        placeholder={t.contactForm.phonePlaceholder}
                        className="bg-white/5 border-white/10 text-white rounded-none h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-white font-semibold mb-2 block">
                        {t.contactForm.subject} *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => handleFormChange('subject', e.target.value)}
                        placeholder={t.contactForm.subjectPlaceholder}
                        className="bg-white/5 border-white/10 text-white rounded-none h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white font-semibold mb-2 block">
                      {t.contactForm.message} *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleFormChange('message', e.target.value)}
                      placeholder={t.contactForm.messagePlaceholder}
                      rows={6}
                      className="bg-white/5 border-white/10 text-white rounded-none"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-600/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-none">
                      {t.contactForm.success}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-600/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-none">
                      {t.contactForm.error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-8 h-14 text-lg font-bold rounded-none flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? t.contactForm.submitting : t.contactForm.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section id="register" className="py-16 md:py-36 bg-black text-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Content Panel */}
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 leading-tight font-heading">
                    {t.cta.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                    {t.cta.subtitle}
                  </p>
                </div>

                {/* Call to Action Buttons */}
                <div className="space-y-4 md:space-y-6">
                  <Button 
                    onClick={() => setParticipantModalOpen(true)}
                    className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-6 md:px-8 h-12 md:h-16 text-base md:text-lg font-bold rounded-none"
                  >
                    {t.cta.registerNow}
                  </Button>
                  <Button 
                    onClick={() => setExhibitorModalOpen(true)}
                    className="w-full bg-[#E91F28] hover:bg-[#D10F1F] text-white px-6 md:px-8 h-12 md:h-16 text-base md:text-lg font-bold rounded-none"
                  >
                    {t.cta.registerAsExhibitor}
                  </Button>
                </div>
              </div>

              {/* Right Illustration Panel */}
              <div className="relative order-first lg:order-last">
                <div className="relative rounded-none overflow-hidden shadow-2xl">
                  <Image
                    src="/26.jpeg"
                    alt="Creatives Connect Afrika Event"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover rounded-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />

      {/* Registration Modals */}
      <ParticipantRegistrationModal
        open={participantModalOpen}
        onOpenChange={setParticipantModalOpen}
        onSuccess={() => {
          setParticipantModalOpen(false);
        }}
        onError={(error) => {
          console.error('Registration error:', error);
        }}
      />
      
      <ExhibitorRegistrationModal
        open={exhibitorModalOpen}
        onOpenChange={setExhibitorModalOpen}
        onSuccess={() => {
          setExhibitorModalOpen(false);
        }}
        onError={(error) => {
          console.error('Registration error:', error);
        }}
      />
    </div>
  );
}

