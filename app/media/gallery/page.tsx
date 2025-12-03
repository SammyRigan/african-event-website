"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { X, Download, Share2, Heart, Eye } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { GalleryCategory } from "@/lib/firebaseService"

interface GalleryImage {
  src: string
  category: string
  alt: string
}

export default function MediaPage() {
  const { language, setLanguage } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  const translations = {
    en: {
      title: "Media Gallery",
      subtitle: "Capturing the essence of African creativity through film, music, and fashion",
      description: "Explore our collection of images showcasing the vibrant energy, cultural richness, and creative excellence of Africa's creative industries.",
      categories: {
        all: "All"
      },
      viewImage: "View Image",
      downloadImage: "Download",
      shareImage: "Share",
      closeModal: "Close",
      imageCount: "images",
      noImages: "No images found in this category"
    },
    fr: {
      title: "Galerie Médias",
      subtitle: "Capturer l'essence de la créativité africaine à travers le cinéma, la musique et la mode",
      description: "Explorez notre collection d'images mettant en valeur l'énergie vibrante, la richesse culturelle et l'excellence créative des industries créatives africaines.",
      categories: {
        all: "Tout"
      },
      viewImage: "Voir l'image",
      downloadImage: "Télécharger",
      shareImage: "Partager",
      closeModal: "Fermer",
      imageCount: "images",
      noImages: "Aucune image trouvée dans cette catégorie"
    }
  }

  const t = translations[language as keyof typeof translations]

  // Fetch uploaded images from Firebase
  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const galleryQuery = query(
          collection(db, 'gallery-images'),
          orderBy('order', 'asc')
        )
        const gallerySnapshot = await getDocs(galleryQuery)
        const images = gallerySnapshot.docs
          .map(doc => ({
            src: doc.data().src,
            category: doc.data().category,
            alt: doc.data().alt,
            isActive: doc.data().isActive !== false // Default to true if not set
          }))
          .filter(img => img.isActive && img.src && img.category && img.alt) // Only include active images with required fields
          .map(({ isActive, ...img }) => img) // Remove isActive from final object
        
        setUploadedImages(images)
      } catch (error) {
        console.error('Error fetching gallery images:', error)
      } finally {
        setLoadingImages(false)
      }
    }

    fetchUploadedImages()
  }, [])

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesQuery = query(
          collection(db, 'gallery-categories'),
          orderBy('order', 'asc')
        )
        const snapshot = await getDocs(categoriesQuery)
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryCategory[]
        setCategories(data.filter(c => c.isActive))
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback to default categories if Firebase fails
        setCategories([
          { id: '1', key: 'fashion', label: 'Fashion', labelFr: 'Mode', order: 1, isActive: true, timestamp: null },
          { id: '2', key: 'music', label: 'Music', labelFr: 'Musique', order: 2, isActive: true, timestamp: null },
          { id: '3', key: 'film', label: 'Film', labelFr: 'Cinéma', order: 3, isActive: true, timestamp: null },
          { id: '4', key: 'events', label: 'Events', labelFr: 'Événements', order: 4, isActive: true, timestamp: null },
          { id: '5', key: 'behindScenes', label: 'Behind the Scenes', labelFr: 'Coulisses', order: 5, isActive: true, timestamp: null }
        ])
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  // Hardcoded gallery images with categories
  const hardcodedImages = [
    // Fashion images
    { src: "/22.jpeg", category: "fashion", alt: "African Fashion Showcase" },
    { src: "/1.jpeg", category: "fashion", alt: "Traditional African Fashion" },
    { src: "/2.jpeg", category: "fashion", alt: "Contemporary African Design" },
    { src: "/3.jpeg", category: "fashion", alt: "African Textile Art" },
    
    // Music images
    { src: "/4.jpeg", category: "music", alt: "African Music Performance" },
    { src: "/5.jpeg", category: "music", alt: "Traditional African Instruments" },
    { src: "/6.jpeg", category: "music", alt: "Modern African Music" },
    { src: "/7.jpeg", category: "music", alt: "African Musicians" },
    
    // Film images
    { src: "/8.jpeg", category: "film", alt: "African Cinema" },
    { src: "/9.jpeg", category: "film", alt: "Film Production" },
    { src: "/10.jpeg", category: "film", alt: "African Storytelling" },
    { src: "/11.jpeg", category: "film", alt: "Film Industry" },
    
    // Event images
    { src: "/12.jpeg", category: "events", alt: "Creatives Connect Afrika Event" },
    { src: "/13.jpeg", category: "events", alt: "Cultural Festival" },
    { src: "/14.jpeg", category: "events", alt: "Creative Industry Forum" },
    { src: "/15.jpeg", category: "events", alt: "African Arts Exhibition" },
    { src: "/Nairobi-1.jpeg", category: "events", alt: "MKTE 2025 Delegation at Magical Kenya Travel Expo" },
    { src: "/Nairobi-2.jpeg", category: "events", alt: "Creatives Connect Afrika Leaders at MKTE" },
    
    // Behind the scenes
    { src: "/17.jpeg", category: "behindScenes", alt: "Behind the Scenes" },
    { src: "/18.jpeg", category: "behindScenes", alt: "Event Preparation" },
    { src: "/19.jpeg", category: "behindScenes", alt: "Creative Process" },
    { src: "/20.jpeg", category: "behindScenes", alt: "Team Collaboration" },
    { src: "/21.jpeg", category: "behindScenes", alt: "Production Setup" },
    { src: "/23.jpeg", category: "behindScenes", alt: "Event Coordination" },
    { src: "/24.jpeg", category: "behindScenes", alt: "Creative Workshop" },
    { src: "/25.jpeg", category: "behindScenes", alt: "Cultural Exchange" },
    { src: "/26.jpeg", category: "behindScenes", alt: "African Heritage" }
  ]

  // Combine uploaded images first, then hardcoded images
  const galleryImages = [...uploadedImages, ...hardcodedImages]

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  // Build categories list from Firebase data
  const categoryList: Array<{ key: string; label: string; count: number }> = [
    { key: "all", label: t.categories.all, count: galleryImages.length }
  ]
  
  if (!loadingCategories && categories.length > 0) {
    categories.forEach(cat => {
      const count = galleryImages.filter(img => img.category === cat.key).length
      categoryList.push({
        key: cat.key,
        label: language === 'fr' && cat.labelFr ? cat.labelFr : cat.label,
        count: count
      })
    })
  } else if (loadingCategories) {
    // Show loading state
    categoryList.push({ key: "loading", label: "Loading...", count: 0 })
  }

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
  }

  const handleDownload = (src: string) => {
    const link = document.createElement('a')
    link.href = src
    link.download = `creatives-connect-afrika-${src.split('/').pop()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (src: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creatives Connect Afrika',
          text: 'Check out this amazing image from Creatives Connect Afrika!',
          url: window.location.origin + src
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + src)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/1.jpeg')`}} className="bg-cover bg-top bg-no-repeat">
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

      {/* Category Filter */}
      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categoryList.map((category) => (
              category.key !== "loading" && (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-3 rounded-none font-semibold transition-all ${
                    selectedCategory === category.key
                      ? "bg-[#E19D2B] hover:bg-[#D18A1A] text-white"
                      : "border-white/30 text-black hover:bg-white/10"
                  }`}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 bg-black/20 text-black">
                    {category.count}
                  </Badge>
                </Button>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-none cursor-pointer bg-gray-800"
                  onClick={() => handleImageClick(image.src)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 hover:bg-white/30 text-white border-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleImageClick(image.src)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 hover:bg-white/30 text-white border-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(image.src)
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 hover:bg-white/30 text-white border-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShare(image.src)
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#E19D2B] text-white border-0">
                      {(() => {
                        if (loadingCategories) return image.category
                        const cat = categories.find(c => c.key === image.category)
                        if (cat) {
                          return language === 'fr' && cat.labelFr ? cat.labelFr : cat.label
                        }
                        // Fallback: capitalize first letter
                        return image.category.charAt(0).toUpperCase() + image.category.slice(1)
                      })()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">{t.noImages}</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-black border-0 p-0">
          {selectedImage && (
            <>
              <DialogHeader className="p-6 pb-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-white text-xl font-bold">
                    {t.viewImage}
                  </DialogTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-black/30 text-black hover:bg-white/10"
                      onClick={() => handleDownload(selectedImage)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.downloadImage}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-black/30 text-black hover:bg-white/10"
                      onClick={() => handleShare(selectedImage)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {t.shareImage}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="p-6 pt-0">
                <div className="relative w-full h-[60vh]">
                  <Image
                    src={selectedImage}
                    alt="Gallery Image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer language={language} />
    </div>
  )
}
