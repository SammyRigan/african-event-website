"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Users, Target, Award, Globe, Heart, Star, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"

export default function AboutUsPage() {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);

  const translations = {
    en: {
      nav: {
        about: "About Us",
        register: "Register",
        activities: "Activities",
        media: "Media",
        partners: "Partners",
        contact: "Contact"
      },
      backToHome: "Back to Home",
      aboutUs: "About Us",
      hero: {
        title: "About Creatives Connect Afrika",
        subtitle: "We are the catalyst for Africa's creative renaissance, uniting the continent's most innovative minds to shape the future of global creative economy through the power of AfCFTA.",
        festival: "Festival & Forum 2025",
        afcfta: "AfCFTA Protocol",
        creativeIndustries: "Creative Industries",
        registerNow: "Register Now"
      },
      story: {
        title: "Our Story",
        description: "AfCFTA aims to eliminate trade barriers and foster intra-African trade. Tourism and creatives are among the first service sectors earmarked for liberalisation. CCA is therefore a timely initiative that positions Africa's creative wealth as a catalyst for inclusive economic growth."
      },
      vision: {
        title: "Our Vision",
        description: "A unified African creative economy that leads global innovation, preserves cultural heritage, and creates sustainable wealth for generations to come."
      },
      highlights: {
        title: "Event Highlights",
        subtitle: "Join us for an unprecedented gathering of Africa's creative minds"
      },
      values: {
        title: "Our Core Values",
        subtitle: "The principles that guide our mission and shape our impact",
        culturalHeritage: {
          title: "Cultural Heritage",
          description: "Celebrating and preserving Africa's rich cultural traditions while embracing modern innovation."
        },
        economicGrowth: {
          title: "Economic Growth",
          description: "Driving sustainable economic development through creative industries and cross-border trade."
        },
        excellence: {
          title: "Excellence",
          description: "Showcasing the highest standards of African creativity and professional achievement."
        },
        globalImpact: {
          title: "Global Impact",
          description: "Positioning Africa as a global leader in creative economy and cultural exchange."
        }
      },
      objectives: {
        title: "Our Objectives",
        subtitle: "Strategic goals driving Africa's creative economy forward",
        objective1: "Advance continental integration in the creative industries by unlocking cross-border trade in Film, Fashion, and Music.",
        objective2: "Build capacity of industry players to access financing, co-production opportunities, and distribution platforms.",
        objective3: "Address key barriers such as market access, digital infrastructure, copyright protection, and creative mobility.",
        objective4: "Facilitate business matchmaking, co-productions, and investment linkages.",
        objective5: "Celebrate Africa's cultural identity and showcase its potential to global markets."
      },
      team: {
        title: "Our Team",
        subtitle: "Dedicated professionals committed to advancing Africa's creative economy",
        creativeDirectors: {
          name: "Creative Directors",
          role: "Event Curation & Programming",
          description: "Leading the artistic vision and program development for the festival."
        },
        industryExperts: {
          name: "Industry Experts",
          role: "Policy & Business Development",
          description: "Shaping the future of Africa's creative economy through strategic partnerships."
        },
        culturalAmbassadors: {
          name: "Cultural Ambassadors",
          role: "Heritage & Innovation",
          description: "Bridging traditional African culture with contemporary creative expression."
        }
      },
      journey: {
        title: "Our Journey",
        subtitle: "From concept to continental impact - our roadmap to success"
      },
      cta: {
        title: "Join the Movement",
        subtitle: "Be part of Africa's most significant creative economy gathering. Together, we're building the future of African creativity.",
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
        register: "S'inscrire",
        activities: "Activités",
        media: "Médias",
        partners: "Partenaires",
        contact: "Contact"
      },
      backToHome: "Retour à l'Accueil",
      aboutUs: "À Propos de Nous",
      hero: {
        title: "À Propos de Creatives Connect Afrika",
        subtitle: "Nous sommes le catalyseur de la renaissance créative africaine, unissant les esprits les plus innovants du continent pour façonner l'avenir de l'économie créative mondiale grâce à la puissance de l'AfCFTA.",
        festival: "Festival & Forum 2025",
        afcfta: "Protocole AfCFTA",
        creativeIndustries: "Industries Créatives",
        registerNow: "S'inscrire Maintenant"
      },
      story: {
        title: "Notre Histoire",
        description: "L'AfCFTA vise à éliminer les barrières commerciales et à favoriser le commerce intra-africain. Le tourisme et les créatifs font partie des premiers secteurs de services identifiés pour la libéralisation. CCA est donc une initiative opportune qui positionne la richesse créative africaine comme un catalyseur de la croissance économique inclusive."
      },
      vision: {
        title: "Notre Vision",
        description: "Une économie créative africaine unifiée qui mène l'innovation mondiale, préserve le patrimoine culturel et crée une richesse durable pour les générations à venir."
      },
      highlights: {
        title: "Points Forts de l'Événement",
        subtitle: "Rejoignez-nous pour un rassemblement sans précédent des esprits créatifs africains"
      },
      values: {
        title: "Nos Valeurs Fondamentales",
        subtitle: "Les principes qui guident notre mission et façonnent notre impact",
        culturalHeritage: {
          title: "Patrimoine Culturel",
          description: "Célébrer et préserver les riches traditions culturelles africaines tout en embrassant l'innovation moderne."
        },
        economicGrowth: {
          title: "Croissance Économique",
          description: "Stimuler le développement économique durable à travers les industries créatives et le commerce transfrontalier."
        },
        excellence: {
          title: "Excellence",
          description: "Montrer les plus hauts standards de créativité africaine et de réussite professionnelle."
        },
        globalImpact: {
          title: "Impact Mondial",
          description: "Positionner l'Afrique comme un leader mondial de l'économie créative et des échanges culturels."
        }
      },
      objectives: {
        title: "Nos Objectifs",
        subtitle: "Objectifs stratégiques pour faire avancer l'économie créative africaine",
        objective1: "Faire avancer l'intégration continentale dans les industries créatives en débloquant le commerce transfrontalier dans le Cinéma, la Mode et la Musique.",
        objective2: "Renforcer la capacité des acteurs de l'industrie à accéder au financement, aux opportunités de coproduction et aux plateformes de distribution.",
        objective3: "Aborder les obstacles clés tels que l'accès au marché, l'infrastructure numérique, la protection des droits d'auteur et la mobilité créative.",
        objective4: "Faciliter l'appariement commercial, les coproductions et les liens d'investissement.",
        objective5: "Célébrer l'identité culturelle africaine et présenter son potentiel aux marchés mondiaux."
      },
      team: {
        title: "Notre Équipe",
        subtitle: "Professionnels dédiés engagés à faire avancer l'économie créative africaine",
        creativeDirectors: {
          name: "Directeurs Créatifs",
          role: "Curatelle & Programmation d'Événements",
          description: "Diriger la vision artistique et le développement de programmes pour le festival."
        },
        industryExperts: {
          name: "Experts de l'Industrie",
          role: "Politique & Développement Commercial",
          description: "Façonner l'avenir de l'économie créative africaine à travers des partenariats stratégiques."
        },
        culturalAmbassadors: {
          name: "Ambassadeurs Culturels",
          role: "Patrimoine & Innovation",
          description: "Faire le pont entre la culture africaine traditionnelle et l'expression créative contemporaine."
        }
      },
      journey: {
        title: "Notre Parcours",
        subtitle: "Du concept à l'impact continental - notre feuille de route vers le succès"
      },
      cta: {
        title: "Rejoignez le Mouvement",
        subtitle: "Soyez partie du rassemblement le plus important de l'économie créative africaine. Ensemble, nous construisons l'avenir de la créativité africaine.",
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

  const stats = [
    { number: "50+", label: "Countries Represented", icon: Globe },
    { number: "1000+", label: "Expected Attendees", icon: Users },
    { number: "100+", label: "Industry Speakers", icon: Star },
    { number: "4", label: "Days of Innovation", icon: Calendar },
  ];

  const values = [
    {
      icon: Heart,
      title: t.values.culturalHeritage.title,
      description: t.values.culturalHeritage.description
    },
    {
      icon: Target,
      title: t.values.economicGrowth.title,
      description: t.values.economicGrowth.description
    },
    {
      icon: Award,
      title: t.values.excellence.title,
      description: t.values.excellence.description
    },
    {
      icon: Globe,
      title: t.values.globalImpact.title,
      description: t.values.globalImpact.description
    }
  ];

  const team = [
    {
      name: t.team.creativeDirectors.name,
      role: t.team.creativeDirectors.role,
      description: t.team.creativeDirectors.description
    },
    {
      name: t.team.industryExperts.name,
      role: t.team.industryExperts.role,
      description: t.team.industryExperts.description
    },
    {
      name: t.team.culturalAmbassadors.name,
      role: t.team.culturalAmbassadors.role,
      description: t.team.culturalAmbassadors.description
        }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Concept Development",
      description: "Initial planning and stakeholder engagement for the inaugural event."
    },
    {
      year: "2025",
      title: "Launch Year",
      description: "The first Creatives Connect Afrika Festival & Forum in La Palm Royal Beach Hotel, Accra, Ghana."
    },
    {
      year: "2026+",
      title: "Continental Expansion",
      description: "Expanding to other African cities and building lasting partnerships."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
        <div  style={{backgroundImage: `url('/1.jpeg')`}}>
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
      <Header language={language} setLanguage={setLanguage} currentPage="about" />

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
      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  {t.story.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {t.story.description}
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#E19D2B] to-[#D18A1A] p-[1px] rounded-none">
                  <div className="bg-black p-8 rounded-none">
                    <h3 className="text-2xl font-bold mb-6 text-white">{t.vision.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {t.vision.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Our Objectives */}
      <section className="py-16 md:py-24 bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900">
                {t.objectives.title}
              </h2>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                {t.objectives.subtitle}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#E19D2B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">{t.objectives.objective1}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#E19D2B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">{t.objectives.objective2}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#E19D2B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">{t.objectives.objective3}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#E19D2B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">{t.objectives.objective4}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#E19D2B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">{t.objectives.objective5}</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Creatives Connect Afrika"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-none"
                />
                <div className="absolute -bottom-6 -right-6 bg-black/90 border border-[#E19D2B] p-6 rounded-none max-w-sm hidden">
                  <h4 className="text-lg font-bold text-[#E19D2B] mb-2">Our Impact</h4>
                  <p className="text-gray-300 text-sm">
                    Driving continental integration through creativity, innovation, and cultural exchange.
                  </p>
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
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 leading-tight font-heading">Register Now</h2>
                  <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                    Join us for the inaugural Creatives Connect Afrika Festival & Forum 2025. Be part of the most significant gathering of Africa's creative economy.
                  </p>
                </div>

                {/* Call to Action Buttons */}
                <div className="space-y-4 md:space-y-6">
                  <Button 
                    onClick={() => setParticipantModalOpen(true)}
                    className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-6 md:px-8 h-12 md:h-16 text-base md:text-lg font-bold rounded-none"
                  >
                    Register to Attend Event
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
          console.log('Participant registration successful')
        }}
        onError={(error: string) => {
          console.error('Participant registration error:', error)
        }}
      />

      <ExhibitorRegistrationModal
        open={exhibitorModalOpen}
        onOpenChange={setExhibitorModalOpen}
        onSuccess={() => {
          console.log('Exhibitor registration successful')
        }}
        onError={(error: string) => {
          console.error('Exhibitor registration error:', error)
        }}
      />
    </div>
  );
}
