"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Award, Globe, Briefcase, GraduationCap, Star, Users, Building2, ExternalLink, Film, Music, Palette, Play, Camera, Mic, Zap, Clock, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"

export default function ActivitiesPage() {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);

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
        title: "Creative Activities",
        subtitle: "Experience the transformative power of Africa's creative industries through film, fashion, and music at Creatives Connect Afrika 2025."
      },
      activities: {
        title: "Creative Pillars",
        subtitle: "Three dynamic sectors driving Africa's creative economy forward",
        film: {
          title: "Film: Reshaping African Narratives",
          subtitle: "Celebrating the power of African cinema as a tool for storytelling, cultural preservation, and global influence.",
          description: "Through curated film screenings, masterclasses with seasoned directors, and industry networking sessions, the platform creates opportunities for filmmakers to collaborate, access new markets, and amplify authentic African voices. This pillar focuses on empowering emerging talent, encouraging co-productions across borders, and positioning Africa as a hub for bold, innovative narratives that challenge stereotypes and reshape the continent's image on the world stage.",
          features: ["Film Screenings", "Director Masterclasses", "Industry Networking", "Co-production Forums", "Talent Development"]
        },
        fashion: {
          title: "Fashion: Blending Heritage with Global Trends",
          subtitle: "Africa's fashion industry is a dynamic intersection of heritage, artistry, and innovation.",
          description: "At Creatives Connect Afrika, designers, textile creators, stylists, and models showcase collections that honour cultural traditions while embracing contemporary global trends. The fashion pillar promotes dialogue on sustainability, ethical production, and the expansion of African brands into international markets. By hosting runway showcases, business-to-business forums, and workshops, Creatives Connect Afrika creates a fertile ground for collaborations that elevate African fashion, strengthen supply chains, and spotlight Africa's unique aesthetic as a driver of soft power and economic growth.",
          features: ["Runway Showcases", "B2B Forums", "Sustainability Workshops", "Textile Innovation", "Brand Development"]
        },
        music: {
          title: "Music: The Global Heartbeat of Africa",
          subtitle: "Music is Africa's most universal language and one of its strongest cultural exports.",
          description: "The music pillar of Creatives Connect Afrika captures this energy through electrifying live performances, collaborative workshops, and industry networking sessions. From Highlife to Afrobeats to Amapiano, traditional rhythms to contemporary fusions, the platform highlights the diversity and global resonance of African music. By fostering partnerships between artists, producers, distributors, and digital platforms, Creatives Connect Afrika strengthens Africa's role as a trendsetter in the global music economy while supporting innovation, talent development, and monetisation opportunities for creatives across the continent.",
          features: ["Live Performances", "Collaborative Workshops", "Industry Networking", "Digital Platforms", "Talent Development"]
        }
      },
      tour: {
        title: "Accra Night Tour Experience",
        subtitle: "Explore Accra's Rich Culture and Nightlife",
        description: "Join us for an immersive nighttime cultural tour of Accra, visiting historical landmarks, experiencing local markets, and enjoying Accra's vibrant nightlife.",
        date: "November 2025",
        departure: "7:00pm",
        end: "2:00am",
        cost: "GHS 600",
        perPerson: "per person",
        startLocation: "Conference venue / Hotel",
        endLocation: "Conference venue / Hotel",
        bookNow: "Book This Tour"
      },
      cta: {
        title: "Join the Creative Revolution",
        subtitle: "Be part of the inaugural Creatives Connect Afrika Festival & Forum 2025",
        registerNow: "Register Now",
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
        title: "Activités Créatives",
        subtitle: "Vivez le pouvoir transformateur des industries créatives africaines à travers le cinéma, la mode et la musique lors de Creatives Connect Afrika 2025."
      },
      activities: {
        title: "Piliers Créatifs",
        subtitle: "Trois secteurs dynamiques qui font avancer l'économie créative africaine",
        film: {
          title: "Cinéma : Refaçonner les Narratifs Africains",
          subtitle: "Célébrer le pouvoir du cinéma africain comme outil de narration, de préservation culturelle et d'influence mondiale.",
          description: "À travers des projections de films organisées, des masterclasses avec des réalisateurs expérimentés et des sessions de réseautage industriel, la plateforme crée des opportunités pour les cinéastes de collaborer, d'accéder à de nouveaux marchés et d'amplifier les voix africaines authentiques. Ce pilier se concentre sur l'autonomisation des talents émergents, l'encouragement des coproductions transfrontalières et le positionnement de l'Afrique comme un centre de narratifs audacieux et innovants qui défient les stéréotypes et refaçonnent l'image du continent sur la scène mondiale.",
          features: ["Projections de Films", "Masterclasses de Réalisateurs", "Réseautage Industriel", "Forums de Coproduction", "Développement des Talents"]
        },
        fashion: {
          title: "Mode : Mélanger l'Héritage avec les Tendances Mondiales",
          subtitle: "L'industrie de la mode africaine est une intersection dynamique d'héritage, d'art et d'innovation.",
          description: "À Creatives Connect Afrika, les designers, créateurs de textiles, stylistes et mannequins présentent des collections qui honorent les traditions culturelles tout en embrassant les tendances mondiales contemporaines. Le pilier de la mode promeut le dialogue sur la durabilité, la production éthique et l'expansion des marques africaines sur les marchés internationaux. En organisant des défilés, des forums B2B et des ateliers, Creatives Connect Afrika crée un terrain fertile pour les collaborations qui élèvent la mode africaine, renforcent les chaînes d'approvisionnement et mettent en valeur l'esthétique unique de l'Afrique comme moteur de soft power et de croissance économique.",
          features: ["Défilés", "Forums B2B", "Ateliers de Durabilité", "Innovation Textile", "Développement de Marques"]
        },
        music: {
          title: "Musique : Le Battement de Cœur Mondial de l'Afrique",
          subtitle: "La musique est le langage le plus universel de l'Afrique et l'une de ses exportations culturelles les plus fortes.",
          description: "Le pilier musical de Creatives Connect Afrika capture cette énergie à travers des performances live électrisantes, des ateliers collaboratifs et des sessions de réseautage industriel. Du Highlife à l'Afrobeats en passant par l'Amapiano, des rythmes traditionnels aux fusions contemporaines, la plateforme met en valeur la diversité et la résonance mondiale de la musique africaine. En favorisant les partenariats entre artistes, producteurs, distributeurs et plateformes numériques, Creatives Connect Afrika renforce le rôle de l'Afrique comme précurseur de tendances dans l'économie musicale mondiale tout en soutenant l'innovation, le développement des talents et les opportunités de monétisation pour les créatifs à travers le continent.",
          features: ["Performances Live", "Ateliers Collaboratifs", "Réseautage Industriel", "Plateformes Numériques", "Développement des Talents"]
        }
      },
      tour: {
        title: "Expérience de Visite Nocturne d'Accra",
        subtitle: "Explorez la Culture et la Vie Nocturne d'Accra",
        description: "Rejoignez-nous pour une visite culturelle immersive de nuit à Accra, visitant des monuments historiques, découvrant les marchés locaux et profitant de la vie nocturne animée d'Accra.",
        date: "Novembre 2025",
        departure: "19h00",
        end: "02h00",
        cost: "600 GHS",
        perPerson: "par personne",
        startLocation: "Lieu de conférence / Hôtel",
        endLocation: "Lieu de conférence / Hôtel",
        bookNow: "Réserver cette Visite"
      },
      cta: {
        title: "Rejoignez la Révolution Créative",
        subtitle: "Soyez partie du Festival et Forum inaugural Creatives Connect Afrika 2025",
        registerNow: "S'inscrire Maintenant",
        registerAsExhibitor: "S'inscrire comme Exposant"
      },
      footer: {
        description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique.",
        copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés."
      }
    }
  };

  const t = translations[language];

  const activities = [
    {
      icon: Film,
      color: "from-blue-600 to-purple-600",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-500/30",
      ...t.activities.film
    },
    {
      icon: Palette,
      color: "from-pink-600 to-orange-600",
      bgColor: "bg-pink-600/20",
      borderColor: "border-pink-500/30",
      ...t.activities.fashion
    },
    {
      icon: Music,
      color: "from-green-600 to-yellow-600",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-500/30",
      ...t.activities.music
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <div style={{backgroundImage: `url('/26.jpeg')`}} className="bg-cover bg-top bg-no-repeat"> */}
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
        <div style={{backgroundImage: `url('/4.jpeg')`}} className="bg-cover bg-center bg-no-repeat">
            <div className="bg-gradient-to-b from-gray-900/50 to-black">
            <Header language={language} setLanguage={setLanguage} currentPage="activities" />

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

          {/* Activities Section */}
          <section className="py-16 md:py-24 relative bg-black">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                  {t.activities.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t.activities.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12 max-w-6xl mx-auto">
                {activities.map((activity, index) => (
                  <Card key={index} className={`bg-black border-none rounded-none overflow-hidden backdrop-blur-sm`}>
                    <CardContent className="py-8">
                      <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Icon and Title */}
                        <div className="text-center md:text-left">
                          <div className={`mb-6 inline-flex p-4 rounded-full bg-gradient-to-r ${activity.color} shadow-lg`}>
                            <activity.icon className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{activity.title}</h3>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                            {activity.subtitle}
                          </p>
                        </div>

                        {/* Description and Features */}
                        <div className="md:col-span-2">
                          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                            {activity.description}
                          </p>
                          
                          {/* Key Features */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                              <Zap className="w-5 h-5 mr-2 text-[#E19D2B]" />
                              {language === 'en' ? 'Key Features' : 'Caractéristiques Clés'}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {activity.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center text-gray-300">
                                  <div className="w-2 h-2 bg-[#E19D2B] rounded-full mr-3"></div>
                                  <span className="text-sm md:text-base">{feature}</span>
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
        {/* </div> */}
      </div>

      {/* Accra Night Tour Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                {t.tour.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-2">
                {t.tour.subtitle}
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {t.tour.description}
              </p>
            </div>

            <Card className="bg-black border border-[#E19D2B] rounded-none">
              <CardContent className="p-6 md:p-8">
                {/* Tour Details Header */}
                <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-800">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-5 h-5 text-[#E19D2B] mr-3" />
                      <span className="font-semibold">{t.tour.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-5 h-5 text-[#E19D2B] mr-3" />
                      <span><strong>{language === 'en' ? 'Departure:' : 'Départ:'}</strong> {t.tour.departure}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-5 h-5 text-[#E19D2B] mr-3" />
                      <span><strong>{language === 'en' ? 'End:' : 'Fin:'}</strong> {t.tour.end}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 text-[#E19D2B] mr-3" />
                      <span className="text-sm"><strong>{language === 'en' ? 'Start:' : 'Début:'}</strong> {t.tour.startLocation}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 text-[#E19D2B] mr-3" />
                      <span className="text-sm"><strong>{language === 'en' ? 'End:' : 'Fin:'}</strong> {t.tour.endLocation}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-[#E19D2B] text-black text-lg font-bold px-4 py-2 rounded-none">
                        {t.tour.cost} {t.tour.perPerson}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Navigation className="w-6 h-6 text-[#E19D2B] mr-3" />
                    {language === 'en' ? 'Itinerary' : 'Itinéraire'}
                  </h3>
                  
                  <div className="space-y-6">
                    {/* 6:30pm */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        6:30pm
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-[#E19D2B] pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'Registration & Meet-up' : 'Inscription et Rendez-vous'}</h4>
                        <ul className="text-gray-300 space-y-1 text-sm md:text-base">
                          <li>• {language === 'en' ? 'Registration & meet-up' : 'Inscription et rencontre'}</li>
                          <li>• {language === 'en' ? 'Engagement / socialization' : 'Engagement / socialisation'}</li>
                          <li>• {language === 'en' ? 'Quick briefing of the tour\'s vibe and stops ahead' : 'Brève présentation de l\'ambiance de la visite et des arrêts à venir'}</li>
                        </ul>
                      </div>
                    </div>

                    {/* 7:00pm */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        7:00pm
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-[#E19D2B] pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'Departure' : 'Départ'}</h4>
                      </div>
                    </div>

                    {/* 7:30pm */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        7:30pm
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-[#E19D2B] pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'Despite Auto Museum' : 'Musée Despite Auto'}</h4>
                        <p className="text-gray-300 text-sm md:text-base">{language === 'en' ? 'Explore a world of vintage cars' : 'Explorez un monde de voitures vintage'}</p>
                      </div>
                    </div>

                    {/* 9:00pm */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        9:00pm
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-[#E19D2B] pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'Kwame Nkrumah Memorial Park' : 'Mémorial Kwame Nkrumah'}</h4>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          {language === 'en' 
                            ? 'A guided tour of the Kwame Nkrumah Memorial Park, located in the heart of Accra, is a significant historical and cultural landmark dedicated to Dr. Kwame Nkrumah, the first President and founding father of Ghana. The Park was established to honour his pivotal role in leading the country to independence from British colonial rule in 1957. Set on the site where Nkrumah declared Ghana\'s independence, the park features a striking mausoleum where his remains rest, as well as a museum showcasing personal artifacts, photographs, and memorabilia from his life and political journey. Surrounded by beautiful gardens, fountains, and symbolic sculptures, the park serves as a serene and reflective space for both Ghanaians and visitors to pay tribute to a key figure in Africa\'s liberation movement.'
                            : 'Une visite guidée du Mémorial Kwame Nkrumah, situé au cœur d\'Accra, est un monument historique et culturel majeur dédié au Dr Kwame Nkrumah, premier président et père fondateur du Ghana. Le parc a été établi pour honorer son rôle central dans l\'indépendance du pays de la domination coloniale britannique en 1957. Situé sur le site où Nkrumah a déclaré l\'indépendance du Ghana, le parc comprend un mausolée où reposent ses restes, ainsi qu\'un musée présentant des artefacts personnels, des photographies et des souvenirs de sa vie et de son parcours politique. Entouré de magnifiques jardins, de fontaines et de sculptures symboliques, le parc sert d\'espace serein et réfléchi pour les Ghanéens et les visiteurs afin de rendre hommage à une figure clé du mouvement de libération africain.'}
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mt-3 font-semibold">
                          • {language === 'en' ? 'Stopover at the Black Star Square' : 'Arrêt à la Place de l\'Étoile Noire'}
                        </p>
                      </div>
                    </div>

                    {/* 10:30pm */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        10:30pm
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-[#E19D2B] pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'Osu Night Market' : 'Marché Nocturne d\'Osu'}</h4>
                        <p className="text-gray-300 text-sm md:text-base">
                          {language === 'en' 
                            ? 'Experience the local nightlife vibe. Street food tasting, interaction with local vendors and soak in Accra\'s energy'
                            : 'Découvrez l\'ambiance de la vie nocturne locale. Dégustation de street food, interaction avec les vendeurs locaux et imprégnez-vous de l\'énergie d\'Accra'}
                        </p>
                      </div>
                    </div>

                    {/* 11:30pm */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        11:30pm
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-[#E19D2B] pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'Alley Bar / Polo Beach Club' : 'Alley Bar / Polo Beach Club'}</h4>
                        <p className="text-gray-300 text-sm md:text-base">
                          {language === 'en' 
                            ? 'Entertainment – Good Vibe'
                            : 'Divertissement – Bonne Ambiance'}
                        </p>
                      </div>
                    </div>

                    {/* 2:00am */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-[#E19D2B] font-bold text-right pt-1">
                        2:00am
                      </div>
                      <div className="flex-1 pb-2 border-l-2 border-transparent pl-6 relative">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 bg-[#E19D2B] rounded-full"></div>
                        <h4 className="font-semibold text-white mb-2">{language === 'en' ? 'End of Tour' : 'Fin de la Visite'}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
