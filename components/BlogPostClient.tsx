"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ShareButtons from "@/components/ShareButtons"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
  image: string
  content: Array<{
    type: string
    text?: string
    items?: string[]
  }>
}

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { language, setLanguage } = useLanguage()

  const translations = {
    en: {
      backToBlog: "Back to Blog",
      share: "Share Article",
      relatedPosts: "Related Posts",
      readMore: "Read More"
    },
    fr: {
      backToBlog: "Retour au Blog",
      share: "Partager l'Article",
      relatedPosts: "Articles Connexes",
      readMore: "Lire Plus"
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('${post.image}')`}} className="bg-cover bg-center bg-no-repeat">
        <div className="bg-gradient-to-b from-gray-900/80 to-black">
          <Header language={language} setLanguage={setLanguage} currentPage="media" />

          {/* Hero Section */}
          <section className="py-28 md:pb-44 md:pt-52 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-row items-center mb-4 gap-4">
                  <Link href="/media/blog">
                    <div 
                      className="flex items-center text-gray-300 hover:bg-transparent p-0"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>{t.backToBlog}</span>
                    </div>
                  </Link>

                  <Badge className="bg-[#E19D2B] text-white border-0">
                    {post.category}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">{t.share}:</span>
                  <ShareButtons 
                    title={post.title}
                    url={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://creativesconnectafrika.com'}/media/blog/${post.slug}`}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case 'heading':
                    return (
                      <h2 key={index} className="text-3xl font-bold text-white mt-12 mb-6">
                        {block.text}
                      </h2>
                    )
                  case 'paragraph':
                    return (
                      <p key={index} className="text-gray-300 text-lg leading-relaxed mb-6">
                        {block.text}
                      </p>
                    )
                  case 'quote':
                    return (
                      <blockquote key={index} className="border-l-4 border-[#E19D2B] pl-6 my-8 italic text-xl text-gray-200">
                        {block.text}
                      </blockquote>
                    )
                  case 'list':
                    return (
                      <ul key={index} className="list-disc list-inside space-y-3 mb-6 text-gray-300 text-lg">
                        {block.items?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )
                  default:
                    return null
                }
              })}
            </article>

            {/* Social Share Section */}
            <div className="border-t border-white/10 mt-12 pt-8">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.share}:</span>
                <ShareButtons 
                  title={post.title}
                  url={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://creativesconnectafrika.com'}/media/blog/${post.slug}`}
                  variant="outline"
                  size="default"
                  showLabels={true}
                />
              </div>
            </div>

            {/* Back to Blog Button */}
            <div className="mt-12 text-right">
              <Link href="/media/blog">
                <Button className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-8 py-3">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToBlog}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
