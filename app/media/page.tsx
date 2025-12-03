"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ImageIcon, BookOpen, Video, ArrowRight } from "lucide-react"

export default function MediaPage() {
  const { language, setLanguage } = useLanguage()

  const translations = {
    en: {
      title: "Media Hub",
      subtitle: "Discover the vibrant world of African creativity",
      description: "Explore our collection of galleries, blog posts, and videos showcasing the essence of African creativity through film, music, fashion, and cultural events.",
      gallery: {
        title: "Gallery",
        description: "Browse our curated collection of images capturing the energy and cultural richness of Africa's creative industries.",
        cta: "View Gallery"
      },
      blog: {
        title: "Blog",
        description: "Read stories, insights, and news from the heart of African creativity and continental collaboration.",
        cta: "Read Blog"
      },
      videos: {
        title: "Videos",
        description: "Watch highlights and moments from Creatives Connect Afrika events and interviews.",
        cta: "Watch Videos"
      }
    },
    fr: {
      title: "Centre Médias",
      subtitle: "Découvrez le monde vibrant de la créativité africaine",
      description: "Explorez notre collection de galeries, d'articles de blog et de vidéos mettant en valeur l'essence de la créativité africaine à travers le cinéma, la musique, la mode et les événements culturels.",
      gallery: {
        title: "Galerie",
        description: "Parcourez notre collection d'images capturant l'énergie et la richesse culturelle des industries créatives africaines.",
        cta: "Voir la Galerie"
      },
      blog: {
        title: "Blog",
        description: "Lisez des histoires, des perspectives et des actualités du cœur de la créativité africaine et de la collaboration continentale.",
        cta: "Lire le Blog"
      },
      videos: {
        title: "Vidéos",
        description: "Regardez les moments forts des événements Creatives Connect Afrika et des interviews.",
        cta: "Regarder les Vidéos"
      }
    }
  }

  const t = translations[language as keyof typeof translations]

  const mediaCategories = [
    {
      icon: ImageIcon,
      title: t.gallery.title,
      description: t.gallery.description,
      cta: t.gallery.cta,
      href: "/media/gallery",
      image: "/Nairobi-1.jpeg",
      color: "from-purple-600/20 to-pink-600/20"
    },
    {
      icon: BookOpen,
      title: t.blog.title,
      description: t.blog.description,
      cta: t.blog.cta,
      href: "/media/blog",
      image: "/2.jpeg",
      color: "from-blue-600/20 to-cyan-600/20"
    },
    {
      icon: Video,
      title: t.videos.title,
      description: t.videos.description,
      cta: t.videos.cta,
      href: "/media/videos",
      image: "/3.jpeg",
      color: "from-orange-600/20 to-red-600/20"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/back.jpg')`}} className="bg-cover bg-center bg-no-repeat">
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
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  {t.description}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Media Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Link key={index} href={category.href}>
                    <div className="group relative overflow-hidden bg-gray-900 border border-white/10 hover:border-[#E19D2B]/50 transition-all duration-300 h-full">
                      {/* Background Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b ${category.color} to-black/80`} />
                        
                        {/* Icon */}
                        <div className="absolute top-6 left-6">
                          <div className="w-16 h-16 bg-[#E19D2B] rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#E19D2B] transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 mb-6 line-clamp-3">
                          {category.description}
                        </p>
                        <Button 
                          variant="ghost" 
                          className="text-[#E19D2B] hover:text-white hover:bg-[#E19D2B] group/btn p-0"
                        >
                          {category.cta}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience African Creativity
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From vibrant fashion shows to powerful musical performances, explore the rich tapestry of African creative expression.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['/5.jpeg', '/6.jpeg', '/7.jpeg', '/8.jpeg'].map((img, i) => (
                <div key={i} className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`Featured ${i + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
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
