"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Award, Globe, Briefcase, GraduationCap, Star, Users, Building2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PartnershipModal from "@/components/PartnershipModal"

export default function PartnersPage() {
  const { language, setLanguage } = useLanguage();
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);

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
        title: "Our Partners",
        subtitle: "Meet the visionary organizations driving Africa's creative economy forward through collaboration, innovation, and continental integration."
      },
      partners: {
        title: "Strategic Partners",
        subtitle: "Leading organizations shaping Africa's creative future",
        learnMore: "Learn More",
        visitWebsite: "Visit Website"
      },
      partnership: {
        title: "Become a Partner",
        subtitle: "Join our network of visionary organizations driving Africa's creative economy forward through collaboration, innovation, and continental integration.",
        description: "We welcome partnerships with organizations, institutions, and individuals who share our vision of positioning culture and creativity at the center of Africa's tourism and economic agenda.",
        applyNow: "Apply Now"
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
        title: "Nos Partenaires",
        subtitle: "Rencontrez les organisations visionnaires qui font avancer l'économie créative africaine grâce à la collaboration, l'innovation et l'intégration continentale."
      },
      partners: {
        title: "Partenaires Stratégiques",
        subtitle: "Organisations de premier plan façonnant l'avenir créatif de l'Afrique",
        learnMore: "En Savoir Plus",
        visitWebsite: "Visiter le Site Web"
      },
      partnership: {
        title: "Devenir Partenaire",
        subtitle: "Rejoignez notre réseau d'organisations visionnaires qui font avancer l'économie créative africaine grâce à la collaboration, l'innovation et l'intégration continentale.",
        description: "Nous accueillons les partenariats avec des organisations, des institutions et des individus qui partagent notre vision de positionner la culture et la créativité au centre de l'agenda touristique et économique de l'Afrique.",
        applyNow: "Postuler Maintenant"
      },
      footer: {
        description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique.",
        copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés."
      }
    }
  };

  const t = translations[language];

  const partners = [
    {
      name: "AfCFTA Secretariat",
      logo: "https://au-afcfta.org/wp-content/uploads/2023/09/AfCFTA-Logo-1.svg",
      website: "https://au-afcfta.org",
      location: "Accra, Ghana",
      description: {
        en: "The African Continental Free Trade Area (AfCFTA) Secretariat, headquartered in Accra, Ghana, is the administrative and technical body responsible for coordinating the implementation of the AfCFTA Agreement. The AfCFTA is the largest free trade area in the world by membership, bringing together 55 African Union member states with a combined GDP of over $3 trillion and a market of 1.4 billion people. The Secretariat drives policies, negotiations, and frameworks that remove barriers to intra-African trade, harmonise regulations, and create opportunities for businesses and creatives to scale across the continent. By promoting industrialisation, services, and investment, the AfCFTA is shaping Africa into a single market and positioning the creative industries as a driver of growth, jobs, and cultural exchange.",
        fr: "Le Secrétariat de la Zone de Libre-Échange Continentale Africaine (ZLECAf), basé à Accra, au Ghana, est l'organe administratif et technique responsable de la coordination de la mise en œuvre de l'Accord ZLECAf. La ZLECAf est la plus grande zone de libre-échange au monde par le nombre de membres, réunissant 55 États membres de l'Union africaine avec un PIB combiné de plus de 3 000 milliards de dollars et un marché de 1,4 milliard de personnes. Le Secrétariat pilote les politiques, négociations et cadres qui éliminent les obstacles au commerce intra-africain, harmonisent les réglementations et créent des opportunités pour les entreprises et les créatifs de se développer sur le continent. En promouvant l'industrialisation, les services et l'investissement, la ZLECAf façonne l'Afrique en un marché unique et positionne les industries créatives comme un moteur de croissance, d'emplois et d'échanges culturels."
      },
      keyAreas: {
        en: ["Free Trade Area Coordination", "Policy Development", "Trade Negotiations", "Regulatory Harmonization", "Creative Industries Support"],
        fr: ["Coordination de la Zone de Libre-Échange", "Développement des Politiques", "Négociations Commerciales", "Harmonisation Réglementaire", "Soutien aux Industries Créatives"]
      }
    },
    {
      name: "Black Star Experience Secretariat",
      logo: "https://blackstarexperience.org/wp-content/uploads/2025/04/TBSE-logo-01-1024x969.png",
      website: "https://blackstarexperience.org",
      location: "Accra, Ghana",
      description: {
        en: "The Black Star Experience Secretariat is a pioneering platform designed to harness the global power of the African diaspora by connecting them to cultural, creative, and economic opportunities in Ghana and across Africa. Based in Accra, the Secretariat builds on the momentum of landmark initiatives such as the Year of Return and Beyond the Return, offering structured programmes that promote diaspora tourism, creative exchanges, and investment partnerships. Through curated experiences, cultural festivals, heritage trails, and business forums, the Black Star Experience Secretariat acts as a bridge between Africa and its global diaspora. Its mission is to deepen connections, foster innovation in the creative sector, and amplify Africa's place as a home for culture, creativity, and commerce.",
        fr: "Le Secrétariat de l'Expérience Black Star est une plateforme pionnière conçue pour exploiter la puissance mondiale de la diaspora africaine en la connectant aux opportunités culturelles, créatives et économiques au Ghana et à travers l'Afrique. Basé à Accra, le Secrétariat s'appuie sur l'élan d'initiatives historiques telles que l'Année du Retour et Au-delà du Retour, offrant des programmes structurés qui promeuvent le tourisme de la diaspora, les échanges créatifs et les partenariats d'investissement. À travers des expériences organisées, des festivals culturels, des parcours patrimoniaux et des forums d'affaires, le Secrétariat de l'Expérience Black Star agit comme un pont entre l'Afrique et sa diaspora mondiale. Sa mission est d'approfondir les connexions, favoriser l'innovation dans le secteur créatif et amplifier la place de l'Afrique comme foyer de culture, de créativité et de commerce."
      },
      keyAreas: {
        en: ["Diaspora Tourism", "Cultural Exchanges", "Heritage Preservation", "Creative Partnerships", "Investment Facilitation"],
        fr: ["Tourisme de la Diaspora", "Échanges Culturels", "Préservation du Patrimoine", "Partenariats Créatifs", "Facilitation des Investissements"]
      }
    },
    {
      name: "Africa Tourism Partners (ATP)",
      logo: "/ATP.png",
      website: "https://africatourismpartners.com",
      location: "Johannesburg, South Africa",
      description: {
        en: "Africa Tourism Partners (ATP) is a Pan-African tourism advisory, strategy, and investment facilitation firm headquartered in Johannesburg, South Africa. ATP specialises in tourism development, destination marketing, MICE (Meetings, Incentives, Conferences, and Exhibitions), and training programmes for governments, private sector, and tourism boards across the continent. Widely recognised for convening the annual Africa Tourism Leadership Forum (ATLF) and Awards, ATP creates platforms for thought leadership, policy dialogue, and business networking within Africa's tourism and creative industries. Its work empowers destinations and brands to leverage Africa's unique cultural and natural assets, enhance competitiveness, and foster inclusive growth.",
        fr: "Africa Tourism Partners (ATP) est une firme panafricaine de conseil en tourisme, de stratégie et de facilitation des investissements basée à Johannesburg, en Afrique du Sud. ATP se spécialise dans le développement du tourisme, le marketing des destinations, les MICE (Réunions, Incitations, Conférences et Expositions) et les programmes de formation pour les gouvernements, le secteur privé et les offices de tourisme à travers le continent. Reconnue pour organiser le Forum de Leadership du Tourisme Africain (ATLF) et les Prix annuels, ATP crée des plateformes pour le leadership intellectuel, le dialogue politique et le réseautage commercial dans les industries du tourisme et créatives africaines. Son travail permet aux destinations et aux marques d'exploiter les atouts culturels et naturels uniques de l'Afrique, d'améliorer la compétitivité et de favoriser une croissance inclusive."
      },
      keyAreas: {
        en: ["Tourism Development", "Destination Marketing", "MICE Services", "Training Programs", "Investment Facilitation"],
        fr: ["Développement du Tourisme", "Marketing des Destinations", "Services MICE", "Programmes de Formation", "Facilitation des Investissements"]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
        <div style={{backgroundImage: `url('/1.jpeg')`}} className="bg-cover bg-top bg-no-repeat">
            <div className="bg-gradient-to-b from-gray-900/50 to-black">
            <Header language={language} setLanguage={setLanguage} currentPage="partners" />

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

          {/* Partners Section */}
          <section className="pb-16 md:pb-24 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                  {t.partners.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t.partners.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12 max-w-6xl mx-auto ">
                {partners.map((partner, index) => (
                  <Card key={index} className="bg-black border-none rounded-none overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Logo and Basic Info */}
                        <div className="text-center md:text-left">
                          <div className="mb-6">
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} Logo`}
                              width={200}
                              height={100}
                              className="mx-auto md:mx-0 h-40 w-auto object-contain"
                            />
                          </div>
                          <h3 className="text-2xl font-black mb-2 text-white">{partner.name}</h3>
                          <div className="flex items-center justify-center md:justify-start text-gray-400 mb-4">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{partner.location}</span>
                          </div>
                          <div className="space-y-3">
                            <Link 
                              href={partner.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[#E19D2B] hover:text-white transition-colors font-semibold"
                            >
                              {t.partners.visitWebsite}
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                            {partner.description[language]}
                          </p>
                          
                          {/* Key Areas */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                              <Star className="w-5 h-5 mr-2 text-[#E19D2B]" />
                              {language === 'en' ? 'Key Areas of Focus' : 'Domaines Clés de Concentration'}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {partner.keyAreas[language].map((area, areaIndex) => (
                                <div key={areaIndex} className="flex items-center text-gray-300">
                                  <div className="w-2 h-2 bg-[#E19D2B] rounded-full mr-3"></div>
                                  <span className="text-sm md:text-base">{area}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

      {/* Partnership Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-white">
                {t.partnership.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t.partnership.subtitle}
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                {t.partnership.description}
              </p>
              
              {/* Apply Now Button */}
              <Button
                onClick={() => setPartnershipModalOpen(true)}
                className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-12 py-4 text-lg font-semibold"
              >
                {t.partnership.applyNow}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />

      {/* Partnership Modal */}
      <PartnershipModal
        open={partnershipModalOpen}
        onOpenChange={setPartnershipModalOpen}
        onSuccess={() => {
          setPartnershipModalOpen(false);
        }}
        onError={(error) => {
          console.error('Partnership application error:', error);
        }}
      />
    </div>
  );
}
