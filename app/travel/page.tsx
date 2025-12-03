"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Plane, MapPin, Clock, Globe, CheckCircle, Hotel } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function TravelPage() {
  const { language, setLanguage } = useLanguage();

  const translations = {
    en: {
      title: "Travel Information",
      subtitle: "Your Journey to Creatives Connect Afrika",
      description: "Plan your trip to Accra, Ghana for the Creatives Connect Afrika Festival & Forum. We've partnered with leading airlines to provide convenient travel options from across Africa and beyond.",
      bookingTitle: "Official Travel Partner",
      bookingDescription: "Book your stay through our official travel partner for special rates and seamless travel experience.",
      bookingButton: "Book Your Stay",
      airlinesTitle: "Partner Airlines",
      airlinesDescription: "Choose from our network of partner airlines offering flights to Accra, Ghana.",
      airportTitle: "Arrival Information",
      airportName: "Kotoka International Airport (ACC)",
      airportDescription: "Located in Accra, Ghana's capital city, Kotoka International Airport serves as the main gateway to Ghana and West Africa.",
      airportFeatures: [
        "Modern terminal facilities",
        "24/7 customs and immigration services",
        "Currency exchange and banking services",
        "Duty-free shopping",
        "Restaurants and cafes",
        "Free WiFi throughout the terminal"
      ],
      visaTitle: "Visa Information",
      visaDescription: "Check visa requirements for Ghana based on your nationality.",
      visaButton: "Check Visa Requirements",
      accommodationTitle: "Accommodation",
      accommodationDescription: "Stay at the official event venue or choose from nearby hotels.",
      accommodationButton: "View Accommodation Options",
      tipsTitle: "Travel Tips",
      tips: [
        "Book your flights early for the best rates",
        "Check visa requirements well in advance",
        "Consider travel insurance for your trip",
        "Pack light for easier mobility",
        "Bring adapters for Ghana's electrical outlets (Type D and G)",
        "Download offline maps of Accra",
        "Learn basic Twi phrases for local interaction"
      ],
      // Additional translations for hardcoded strings
      popularRoutes: "Popular Routes:",
      visitWebsite: "Visit Website",
      distanceFromCity: "Distance from City Center",
      approximately: "Approximately",
      minutesByCar: "minutes by car",
      airlineDescriptions: {
        saa: "South Africa's flag carrier offering connections from Johannesburg and Cape Town",
        kenya: "Kenya's national airline with direct flights from Nairobi",
        ethiopian: "Africa's largest airline with extensive connections through Addis Ababa",
        asky: "West African regional carrier connecting major cities",
        emirates: "Global airline with connections through Dubai",
        qatar: "Award-winning airline with connections through Doha"
      },
      airlineRoutes: {
        saa: ["Johannesburg → Accra", "Cape Town → Accra"],
        kenya: ["Nairobi → Accra"],
        ethiopian: ["Addis Ababa → Accra", "Multiple African cities → Accra"],
        asky: ["Lagos → Accra", "Abidjan → Accra", "Dakar → Accra"],
        emirates: ["Dubai → Accra"],
        qatar: ["Doha → Accra"]
      }
    },
    fr: {
      title: "Informations de Voyage",
      subtitle: "Votre Voyage vers Creatives Connect Afrika",
      description: "Planifiez votre voyage à Accra, Ghana pour le Festival et Forum Creatives Connect Afrika. Nous avons établi des partenariats avec des compagnies aériennes de premier plan pour offrir des options de voyage pratiques depuis toute l'Afrique et au-delà.",
      bookingTitle: "Partenaire de Voyage Officiel",
      bookingDescription: "Réservez vos hébergements via notre partenaire de voyage officiel pour des tarifs spéciaux et une expérience de voyage sans tracas.",
      bookingButton: "Réserver Votre Hébergement",
      airlinesTitle: "Compagnies Aériennes Partenaires",
      airlinesDescription: "Choisissez parmi notre réseau de compagnies aériennes partenaires offrant des vols vers Accra, Ghana.",
      airportTitle: "Informations d'Arrivée",
      airportName: "Aéroport International de Kotoka (ACC)",
      airportDescription: "Situé à Accra, capitale du Ghana, l'Aéroport International de Kotoka sert de principale porte d'entrée vers le Ghana et l'Afrique de l'Ouest.",
      airportFeatures: [
        "Installations de terminal modernes",
        "Services de douane et d'immigration 24h/24",
        "Services de change et bancaires",
        "Shopping duty-free",
        "Restaurants et cafés",
        "WiFi gratuit dans tout le terminal"
      ],
      visaTitle: "Informations Visa",
      visaDescription: "Vérifiez les exigences de visa pour le Ghana selon votre nationalité.",
      visaButton: "Vérifier les Exigences de Visa",
      accommodationTitle: "Hébergement",
      accommodationDescription: "Séjournez sur le site officiel de l'événement ou choisissez parmi les hôtels à proximité.",
      accommodationButton: "Voir les Options d'Hébergement",
      tipsTitle: "Conseils de Voyage",
      tips: [
        "Réservez vos vols tôt pour les meilleurs tarifs",
        "Vérifiez les exigences de visa bien à l'avance",
        "Considérez une assurance voyage pour votre voyage",
        "Voyagez léger pour une mobilité plus facile",
        "Apportez des adaptateurs pour les prises électriques du Ghana (Type D et G)",
        "Téléchargez des cartes hors ligne d'Accra",
        "Apprenez des phrases de base en Twi pour l'interaction locale"
      ],
      // Additional translations for hardcoded strings
      popularRoutes: "Routes Populaires:",
      visitWebsite: "Visiter le Site Web",
      distanceFromCity: "Distance du Centre-Ville",
      approximately: "Environ",
      minutesByCar: "minutes en voiture",
      airlineDescriptions: {
        saa: "Compagnie aérienne nationale d'Afrique du Sud offrant des connexions depuis Johannesburg et Le Cap",
        kenya: "Compagnie aérienne nationale du Kenya avec des vols directs depuis Nairobi",
        ethiopian: "Plus grande compagnie aérienne d'Afrique avec des connexions étendues via Addis-Abeba",
        asky: "Compagnie aérienne régionale d'Afrique de l'Ouest connectant les principales villes",
        emirates: "Compagnie aérienne mondiale avec des connexions via Dubaï",
        qatar: "Compagnie aérienne primée avec des connexions via Doha"
      },
      airlineRoutes: {
        saa: ["Johannesburg → Accra", "Le Cap → Accra"],
        kenya: ["Nairobi → Accra"],
        ethiopian: ["Addis-Abeba → Accra", "Plusieurs villes africaines → Accra"],
        asky: ["Lagos → Accra", "Abidjan → Accra", "Dakar → Accra"],
        emirates: ["Dubaï → Accra"],
        qatar: ["Doha → Accra"]
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const airlines = [
    {
      name: "South African Airways",
      code: "SAA",
      website: "https://www.flysaa.com/",
      description: t.airlineDescriptions.saa,
      routes: t.airlineRoutes.saa,
      logo: "/placeholder-logo.png"
    },
    {
      name: "Kenya Airways",
      code: "KQ",
      website: "https://www.kenya-airways.com/",
      description: t.airlineDescriptions.kenya,
      routes: t.airlineRoutes.kenya,
      logo: "/placeholder-logo.png"
    },
    {
      name: "Ethiopian Airlines",
      code: "ET",
      website: "https://www.ethiopianairlines.com/",
      description: t.airlineDescriptions.ethiopian,
      routes: t.airlineRoutes.ethiopian,
      logo: "/placeholder-logo.png"
    },
    {
      name: "ASKY Airlines",
      code: "KP",
      website: "https://www.flyasky.com/",
      description: t.airlineDescriptions.asky,
      routes: t.airlineRoutes.asky,
      logo: "/placeholder-logo.png"
    },
    {
      name: "Emirates",
      code: "EK",
      website: "https://www.emirates.com/",
      description: t.airlineDescriptions.emirates,
      routes: t.airlineRoutes.emirates,
      logo: "/placeholder-logo.png"
    },
    {
      name: "Qatar Airways",
      code: "QR",
      website: "https://www.qatarairways.com/",
      description: t.airlineDescriptions.qatar,
      routes: t.airlineRoutes.qatar,
      logo: "/placeholder-logo.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/air.png')`}} className="bg-cover bg-bottom bg-no-repeat">
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
          <Header language={language} setLanguage={setLanguage} currentPage="travel" />

          {/* Hero Section */}
          <section className="py-28 md:pb-44 md:pt-52 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {t.title}
                </h1>
                {/* <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t.subtitle}
                </p> */}
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">{t.bookingDescription}</p>
                <Button 
                  asChild
                  className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-8 py-4 text-lg font-bold rounded-none"
                >
                  <Link 
                    href="https://bookings.streamline-travel.com/events/creatives-connect-afrika"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t.bookingButton}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Official Booking Partner */}
      <section className="py-12 bg-white text-black hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[#E19D2B] rounded-none">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-black text-[#E19D2B] mb-4">
                  {t.bookingTitle}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {t.bookingDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  asChild
                  className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-8 py-4 text-lg font-bold rounded-none"
                >
                  <Link 
                    href="https://bookings.streamline-travel.com/events/creatives-connect-afrika"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t.bookingButton}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Airlines */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading">
                {t.airlinesTitle}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {t.airlinesDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airlines.map((airline, index) => (
                <Card key={index} className="bg-black border border-transparent rounded-none hover:border-[#E19D2B] transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <Plane className="w-6 h-6 text-[#E19D2B]" />
                      </div>
                      <Badge variant="outline" className="text-xs text-white">
                        {airline.code}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-white">
                      {airline.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {airline.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">{t.popularRoutes}</h4>
                        <ul className="space-y-1">
                          {airline.routes.map((route, routeIndex) => (
                            <li key={routeIndex} className="text-sm text-gray-400 flex items-center">
                              <MapPin className="w-3 h-3 mr-2 text-[#E19D2B]" />
                              {route}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        asChild
                        // variant="outline"
                        className="w-full text-[#E19D2B] hover:bg-[#E19D2B] hover:text-black rounded-none"
                      >
                        <Link 
                          href={airline.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t.visitWebsite}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Airport Information */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 font-heading">
                  {t.airportTitle}
                </h2>
                <h3 className="text-xl font-bold text-[#E19D2B] mb-4">
                  {t.airportName}
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {t.airportDescription}
                </p>
                <div className="space-y-3">
                  {t.airportFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#E19D2B] mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-800 rounded-none p-8 text-center">
                  <Globe className="w-16 h-16 text-[#E19D2B] mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{t.distanceFromCity}</h4>
                  <p className="text-2xl font-black text-[#E19D2B] mb-2">10 km</p>
                  <p className="text-gray-400">{t.approximately} 30 {t.minutesByCar}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa & Accommodation */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Visa Information */}
              <Card className="bg-black border border-transparent rounded-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <MapPin className="w-6 h-6 text-[#E19D2B] mr-3" />
                    {t.visaTitle}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t.visaDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    asChild
                    className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] text-white rounded-none"
                  >
                    <Link 
                      href="https://gtdc.gov.gh/service/ghana-tourism-marketplace-gtm/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.visaButton}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Accommodation */}
              <Card className="bg-black border border-transparent rounded-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Hotel className="w-6 h-6 text-[#E19D2B] mr-3" />
                    {t.accommodationTitle}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t.accommodationDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    asChild
                    className="w-full bg-[#E91F28] hover:bg-[#D10F1F] text-white rounded-none"
                  >
                    <Link href="https://bookings.streamline-travel.com/events/creatives-connect-afrika" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.accommodationButton}
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full border-[#E19D2B] text-[#E19D2B] hover:bg-[#E19D2B] hover:text-black rounded-none"
                  >
                    <Link href="https://gtm.com.gh/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Ghana Tourism Marketplace' : 'Marché du Tourisme du Ghana'}
                    </Link>
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {language === 'en' ? 'Accommodation & Rentals' : 'Hébergement et Locations'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center font-heading">
              {t.tipsTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-900 rounded-none">
                  <div className="w-6 h-6 bg-[#E19D2B] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
