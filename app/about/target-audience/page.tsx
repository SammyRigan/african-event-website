"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building2, Briefcase, Globe2, Users2, Award, Heart, GraduationCap, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"

export default function TargetAudiencePage() {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);

  const translations = {
    en: {
      nav: {
        about: "About Us",
        programme: "Programme",
        register: "Register",
        activities: "Activities",
        media: "Media",
        partners: "Partners",
        contact: "Contact"
      },
      hero: {
        title: "Target Audience",
        subtitle: "Join the most significant gathering of Africa's creative economy. Connect with industry leaders, policymakers, and innovators driving continental integration through creativity.",
        registerNow: "Register Now"
      },
      audience: {
        title: "Who Should Attend",
        subtitle: "Our event brings together key stakeholders from across Africa's creative industries and beyond."
      },
      cta: {
        title: "Ready to Join?",
        subtitle: "Be part of the inaugural Creatives Connect Afrika Festival & Forum 2025",
        registerNow: "Register Now",
        contactUs: "Contact Us"
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
        register: "S'inscrire",
        activities: "Activités",
        media: "Médias",
        partners: "Partenaires",
        contact: "Contact"
      },
      hero: {
        title: "Public Cible",
        subtitle: "Rejoignez le rassemblement le plus important de l'économie créative africaine. Connectez-vous avec les leaders de l'industrie, les décideurs politiques et les innovateurs qui stimulent l'intégration continentale à travers la créativité.",
        registerNow: "S'inscrire Maintenant"
      },
      audience: {
        title: "Qui Devrait Participer",
        subtitle: "Notre événement réunit les principales parties prenantes des industries créatives africaines et au-delà."
      },
      cta: {
        title: "Prêt à Participer?",
        subtitle: "Soyez partie du Festival et Forum inaugural Creatives Connect Afrika 2025",
        registerNow: "S'inscrire Maintenant",
        contactUs: "Contactez-Nous"
      },
      footer: {
        description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique.",
        copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés."
      }
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/26.jpeg')`}}>
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
       <Header language={language} setLanguage={setLanguage} currentPage="target-audience" />

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
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E19D2B]/20 to-transparent"></div>
        </div>
      </section>
      </div>
      </div>

      {/* Target Audience Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">{t.audience.title}</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.audience.subtitle}</p>
            </div>
            
            {/* Target Audience List */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Policymakers */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Building2 className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Policymakers, AU/REC representatives
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• Ministers of Tourism & Culture</p>
                    <p className="text-gray-300">• AU/REC Representatives</p>
                    <p className="text-gray-300">• Directors of Tourism</p>
                    <p className="text-gray-300">• Development Agencies</p>
                    <p className="text-gray-300">• Policy Makers</p>
                  </div>
                </div>

                {/* Private Sector */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Briefcase className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Private sector players in Film, Fashion, and Music
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• Film Production Companies</p>
                    <p className="text-gray-300">• Fashion Design Houses</p>
                    <p className="text-gray-300">• Music Labels & Studios</p>
                    <p className="text-gray-300">• Creative Agencies</p>
                    <p className="text-gray-300">• Entertainment Companies</p>
                  </div>
                </div>

                {/* Tourism Boards */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Globe2 className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Tourism boards
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• National Tourism Boards</p>
                    <p className="text-gray-300">• Regional Tourism Authorities</p>
                    <p className="text-gray-300">• Destination Marketing Organizations</p>
                  </div>
                </div>

                {/* Startups */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Users2 className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Startups
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• Creative Tech Startups</p>
                    <p className="text-gray-300">• Digital Platforms</p>
                    <p className="text-gray-300">• E-commerce Solutions</p>
                    <p className="text-gray-300">• Content Creation Platforms</p>
                  </div>
                </div>

                {/* Investors */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Award className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Investors
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• Venture Capitalists</p>
                    <p className="text-gray-300">• Angel Investors</p>
                    <p className="text-gray-300">• Investment Banks</p>
                    <p className="text-gray-300">• Development Finance Institutions</p>
                  </div>
                </div>

                {/* Cultural Institutions */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Heart className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Cultural institutions
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• Museums & Galleries</p>
                    <p className="text-gray-300">• Cultural Centers</p>
                    <p className="text-gray-300">• Heritage Organizations</p>
                    <p className="text-gray-300">• Arts Foundations</p>
                  </div>
                </div>

                {/* Academics */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <GraduationCap className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Academics
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• University Professors</p>
                    <p className="text-gray-300">• Research Institutions</p>
                    <p className="text-gray-300">• Cultural Studies Experts</p>
                    <p className="text-gray-300">• Creative Economy Scholars</p>
                  </div>
                </div>

                {/* Media */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Newspaper className="w-8 h-8 text-[#E19D2B] mr-3" />
                    Media
                  </h3>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-300">• Journalists & Reporters</p>
                    <p className="text-gray-300">• Media Houses</p>
                    <p className="text-gray-300">• Content Creators</p>
                    <p className="text-gray-300">• PR & Communications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 md:py-36 bg-black text-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Content Panel */}
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 leading-tight font-heading">{t.cta.title}</h2>
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
                    Register as Exhibitor
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
                  
                  {/* Atmospheric Elements */}
                  <div className="absolute inset-0">
                    {/* Moon-like glow effect */}
                    <div className="absolute top-8 right-8 w-16 md:w-24 h-16 md:h-24 bg-white/20 rounded-full blur-sm"></div>
                    
                    {/* Silhouette elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    {/* Small figure silhouette */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 md:w-8 h-12 md:h-16 bg-black/60 rounded-full"></div>
                    </div>
                  </div>
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
          // You can add success handling here
          console.log('Participant registration successful')
        }}
        onError={(error) => {
          // You can add error handling here
          console.error('Participant registration error:', error)
        }}
      />

      <ExhibitorRegistrationModal
        open={exhibitorModalOpen}
        onOpenChange={setExhibitorModalOpen}
        onSuccess={() => {
          // You can add success handling here
          console.log('Exhibitor registration successful')
        }}
        onError={(error) => {
          // You can add error handling here
          console.error('Exhibitor registration error:', error)
        }}
      />
    </div>
  );
}
