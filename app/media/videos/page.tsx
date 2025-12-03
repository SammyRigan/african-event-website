"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Play, Calendar, Eye } from "lucide-react"

export default function VideosPage() {
  const { language, setLanguage } = useLanguage()

  const translations = {
    en: {
      title: "Videos",
      subtitle: "Watch highlights and moments from Creatives Connect Afrika",
      description: "Explore our collection of videos showcasing the vibrant energy, cultural richness, and creative excellence of Africa's creative industries.",
      comingSoon: "Coming Soon",
      comingSoonMessage: "We're curating an exciting collection of videos from our events, interviews with speakers, and highlights from across the African creative landscape.",
      stayTuned: "Stay tuned for updates!",
      exploreOther: "In the meantime, explore our other media:",
      gallery: "View Gallery",
      blog: "Read Blog"
    },
    fr: {
      title: "Vidéos",
      subtitle: "Regardez les moments forts de Creatives Connect Afrika",
      description: "Explorez notre collection de vidéos mettant en valeur l'énergie vibrante, la richesse culturelle et l'excellence créative des industries créatives africaines.",
      comingSoon: "Bientôt Disponible",
      comingSoonMessage: "Nous préparons une collection passionnante de vidéos de nos événements, d'interviews avec des intervenants et de moments forts du paysage créatif africain.",
      stayTuned: "Restez à l'écoute pour les mises à jour!",
      exploreOther: "En attendant, explorez nos autres médias:",
      gallery: "Voir la Galerie",
      blog: "Lire le Blog"
    }
  }

  const t = translations[language as keyof typeof translations]

  const videos = [
    {
      id: 1,
      title: "Creative Connect Afrika - Kumasi Roadshow",
      titleFr: "Creative Connect Afrika - Roadshow de Kumasi",
      url: "https://firebasestorage.googleapis.com/v0/b/creatives-connect-afrika.firebasestorage.app/o/Creative%20Connect%20Afrika%20-%20Kumasi%20Roadshow.mp4?alt=media&token=5b0aba85-9a76-431d-aa06-3d513664d0c2",
      location: "Kumasi, Ghana",
      locationFr: "Kumasi, Ghana"
    },
    {
      id: 2,
      title: "Creative Connect Afrika - Tamale Roadshow",
      titleFr: "Creative Connect Afrika - Roadshow de Tamale",
      url: "https://firebasestorage.googleapis.com/v0/b/creatives-connect-afrika.firebasestorage.app/o/Creative%20Connect%20Afrika%20-%20Tamale%20Roadshow.mp4?alt=media&token=5b543bdf-50b5-441d-b2a0-f9d755575f54",
      location: "Tamale, Ghana",
      locationFr: "Tamale, Ghana"
    },
    {
      id: 3,
      title: "Creative Connect Afrika - Nigeria Roadshow",
      titleFr: "Creative Connect Afrika - Roadshow du Nigeria",
      url: "https://firebasestorage.googleapis.com/v0/b/creatives-connect-afrika.firebasestorage.app/o/Creative%20Connect%20Afrika%20_%20Nigeria%20Roadshow.mp4?alt=media&token=db41883b-7df8-473d-aeb8-fd1f7c348c10",
      location: "Nigeria",
      locationFr: "Nigeria"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/4.jpeg')`}} className="bg-cover bg-center bg-no-repeat">
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
          <Header language={language} setLanguage={setLanguage} currentPage="media" />

          {/* Hero Section */}
          <section className="py-28 md:pb-44 md:pt-52 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  {t.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Videos Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="bg-gray-900 border border-white/10 rounded-lg overflow-hidden hover:border-[#E19D2B]/50 transition-colors">
                  <div className="aspect-video bg-black relative group">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      poster=""
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#E19D2B]" />
                      <span className="text-sm text-gray-400">
                        {language === 'fr' ? video.locationFr : video.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {language === 'fr' ? video.titleFr : video.title}
                    </h3>
                  </div>
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

