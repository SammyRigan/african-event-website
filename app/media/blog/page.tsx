"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"

// Blog post data
const blogPosts = [
  {
    id: "nairobi-to-accra",
    slug: "nairobi-to-accra-mkte-sets-stage",
    title: "From Nairobi to Accra: MKTE Sets the Stage for Creatives Connect Afrika",
    excerpt: "The 15th Magical Kenya Travel Expo (MKTE 2025) offered more than exhibitions and meetings. It provided a glimpse into the future of African tourism – one increasingly shaped by culture, creativity and continental collaboration.",
    date: "2025-10-01",
    author: "Creatives Connect Afrika Team",
    readTime: "5 min read",
    category: "Events",
    image: "/Nairobi-1.jpeg",
    content: `The 15th Magical Kenya Travel Expo (MKTE 2025), held from 1 to 3 October at Uhuru Gardens in Nairobi, offered more than exhibitions and meetings. It provided a glimpse into the future of African tourism – one increasingly shaped by culture, creativity and continental collaboration. Among the attendees was a delegation aligned with the forthcoming Creatives Connect Afrika Forum and Festival, travelling to Kenya with a wider purpose: to build relationships, gather insight and champion a new direction for African tourism.

From the opening sessions, it became clear that Africa's tourism discourse is evolving. While wildlife and landscapes remain central, discussions at MKTE focused strongly on identity, storytelling and the creative economy. The continent is beginning to position culture not as a supporting feature, but as a driving force for economic growth and regional integration.

## A Vision Beyond Destinations

It was during these exchanges that a wider mission came into focus. Led by Emily Mburu-Ndoria of the AfCFTA Secretariat, Rex Omar and Edward Owusu of the Black Star Experience Secretariat, and Kwakye Donkor of Africa Tourism Partners, key conversations shifted away from brochures and booths to focus on deeper themes – music, stories, festivals, fashion, film and the power of Africans travelling to experience one another.

Rather than promoting destinations in isolation, the delegation emphasised the importance of aligning tourism with the creative industries, positioning Africa's cultural assets as core pillars of its tourism strategy.

## Nairobi as Prelude to Accra

Throughout MKTE, stakeholders across East, West and Southern Africa echoed a common question: how can Africa move from fragmented promotion to united collaboration? The answer pointed towards Accra, 24 to 26 November, where the Creatives Connect Afrika Forum and Festival will convene cultural leaders, policymakers and investors under the AfCFTA framework.

There was strong interest in Accra as a platform not just for celebration, but for structured dialogue, investment planning and policy development – a space where creativity is treated as strategy.

## Key Insights Taken Forward

The Nairobi experience reinforced several essential truths:

- Africa must first market Africa to Africans, building intra-continental pride and mobility.
- Culture and creativity are not entertainment – they are economic assets with export value.
- Tourism needs policy backing, particularly in areas such as visa reform, mobility frameworks and creative industry investment.

## From Inspiration to Action

MKTE served as an important catalyst, highlighting both progress and the work yet to be done. It confirmed that Africa is ready to redefine how it presents itself to the world, not solely through landscapes, but through the richness of its living cultures.

As preparations intensify for Accra, Creatives Connect Afrika is emerging not simply as an event, but as a continental commitment – to reimagine African tourism through creativity, collaboration and cultural ownership.

Nairobi opened the conversation. Accra will carry it forward. The story of African tourism is turning a new page.`
  },
  {
    id: "launched-in-accra",
    slug: "creatives-connect-afrika-launched-accra",
    title: "Creatives Connect Afrika Launched in Accra to Champion Culture in Continental Tourism",
    excerpt: "The Creatives Connect Afrika initiative was officially launched at the Ghana Trade House in Accra, signalling a new Pan-African platform dedicated to positioning culture and creativity at the centre of the continent's tourism and economic agenda.",
    date: "2025-10-15",
    author: "Creatives Connect Afrika Team",
    readTime: "6 min read",
    category: "News",
    image: "/4.jpeg",
    content: `The Creatives Connect Afrika initiative was officially launched at the Ghana Trade House in Accra, signalling a new Pan-African platform dedicated to positioning culture and creativity at the centre of the continent's tourism and economic agenda.

Hosted under the auspices of the AfCFTA framework, the launch brought together leaders from government, the cultural sector and the tourism industry to outline a vision where Africa's stories, heritage and creative industries drive trade, mobility and integration across borders.

## A Cultural Shift Within AfCFTA

Speaking at the launch, Emily Mburu-Ndoria, Director of Trade in Services, Investment, Intellectual Property and Digital Trade at the AfCFTA Secretariat, emphasised the strategic importance of creative industries within continental policy.

"Africa can no longer treat culture as seasonal entertainment. It is a serious economic sector that must be integrated into tourism, trade and investment policies. Creatives Connect Afrika is a step towards building an ecosystem where our artists, producers, designers and storytellers can operate across borders with purpose and protection."

She highlighted ongoing work to establish frameworks for mobility, intellectual property and digital platforms that will allow cultural products and experiences to move freely across the continent.

## Ownership of Africa's Story

Renowned cultural advocate and Presidential Adviser at the Black Star Experience Secretariat, Rex Omar, spoke passionately about the need for Africans to take control of their narrative.

"For too long, Africa has been packaged for the world by outsiders. Our music, food, festivals and fashion are not add-ons. They are the essence of our identity. If we are serious about tourism, we must first sell Africa to Africans – proudly, boldly and authentically."

He stressed that Creatives Connect Afrika must go beyond conferences and become a long-term platform for creative empowerment, helping African artists access markets, funding and visibility.

## Tourism Beyond Landscapes

Media and tourism strategist Francis Doku underscored the connection between tourism and the creative economy, calling for a continental approach to brand Africa through culture.

"Tourism in Africa has leaned heavily on wildlife and landscapes. That chapter is not closing, but a new chapter is opening – one written with music, film, fashion, literature and festivals. The African visitor of tomorrow is not only seeking scenery, but a sense of self, story and belonging."

He noted that Creatives Connect Afrika will serve as a marketplace of ideas, partnerships and policies, ensuring that creatives are not spectators but central architects of Africa's tourism future.

## The Road Ahead – Accra in November

The launch event also confirmed that the first full edition of Creatives Connect Afrika will take place from 24 to 26 November in Accra, bringing together policymakers, investors, cultural institutions and creators from across the continent.

With panels, showcases, exhibitions and policy dialogues, the forum and festival aim to reshape how Africa presents itself to the world – not as a destination of sights, but as a destination of stories.

Creatives Connect Afrika has begun not as an event, but as a continental commitment. From Accra to Nairobi and back again, the movement is gaining momentum. Africa is ready not only to welcome visitors, but to invite the world into its imagination.`
  }
]

export default function BlogPage() {
  const { language, setLanguage } = useLanguage()

  const translations = {
    en: {
      title: "Blog",
      subtitle: "Stories, insights and news from the heart of African creativity",
      description: "Explore our latest articles covering African tourism, creative industries, and continental collaboration.",
      readMore: "Read More",
      allPosts: "All Posts",
      filterBy: "Filter by Category"
    },
    fr: {
      title: "Blog",
      subtitle: "Histoires, perspectives et actualités du cœur de la créativité africaine",
      description: "Explorez nos derniers articles sur le tourisme africain, les industries créatives et la collaboration continentale.",
      readMore: "Lire Plus",
      allPosts: "Tous les Articles",
      filterBy: "Filtrer par Catégorie"
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/3.jpeg')`}} className="bg-cover bg-center bg-no-repeat">
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

      {/* Blog Posts Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-gray-900 border border-white/10 hover:border-[#E19D2B]/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Featured Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#E19D2B] text-white border-0">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#E19D2B] transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/media/blog/${post.slug}`}>
                        <Button 
                          variant="ghost" 
                          className="text-[#E19D2B] hover:text-white hover:bg-[#E19D2B] group/btn"
                        >
                          {t.readMore}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}

