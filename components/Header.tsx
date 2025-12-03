"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  language: 'en' | 'fr'
  setLanguage: (language: 'en' | 'fr') => void
  currentPage?: string
}

export default function Header({ language, setLanguage, currentPage = "home" }: HeaderProps) {
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        travel: "Travel",
        contact: "Contact"
      },
      cta: {
        registerNow: "Register Now"
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
        travel: "Voyage",
        contact: "Contact"
      },
      cta: {
        registerNow: "S'inscrire Maintenant"
      }
    }
  }

  const t = translations[language]

  const isActivePage = (page: string) => currentPage === page

  return (
    <header className="absolute top-0 w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Creatives Connect Afrika Logo"
                width={isMobile ? 100 : 180}
                height={isMobile ? 24 : 40}
                className="rounded-none"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex items-center space-x-4 text-sm font-medium">
              <div className="relative group">
                <Link 
                  href="/about" 
                  className={`transition-colors ${isActivePage('about') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                >
                  {t.nav.about}
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 border border-white/20 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link href="/about" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10">
                      {t.nav.about}
                    </Link>
                    <Link href="/about/target-audience" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10">
                      Target Audience
                    </Link>
                  </div>
                </div>
              </div>
              <Link 
                href="/programme" 
                className={`transition-colors ${isActivePage('programme') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.programme}
              </Link>
              <Link 
                href="/speakers" 
                className={`transition-colors ${isActivePage('speakers') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.speakers}
              </Link>
              <Link 
                href="/#register" 
                className={`transition-colors ${isActivePage('register') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.register}
              </Link>
              <Link 
                href="/activities" 
                className={`transition-colors ${isActivePage('activities') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.activities}
              </Link>
              <div className="relative group">
                <Link 
                  href="/media" 
                  className={`transition-colors ${isActivePage('media') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                >
                  {t.nav.media}
                </Link>
                {/* Media Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 border border-white/20 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link href="/media/gallery" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10">
                      Gallery
                    </Link>
                    <Link href="/media/blog" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10">
                      Blog
                    </Link>
                    <Link href="/media/videos" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10">
                      Videos
                    </Link>
                  </div>
                </div>
              </div>
              <Link 
                href="/partners" 
                className={`transition-colors ${isActivePage('partners') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.partners}
              </Link>
              <Link 
                href="/travel" 
                className={`transition-colors ${isActivePage('travel') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.travel}
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors ${isActivePage('contact') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Medium Screen Navigation - Fewer items */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <nav className="flex items-center space-x-3 text-xs font-medium">
              <Link 
                href="/about" 
                className={`transition-colors ${isActivePage('about') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.about}
              </Link>
              <Link 
                href="/programme" 
                className={`transition-colors ${isActivePage('programme') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.programme}
              </Link>
              <Link 
                href="/speakers" 
                className={`transition-colors ${isActivePage('speakers') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.speakers}
              </Link>
              <Link 
                href="/activities" 
                className={`transition-colors ${isActivePage('activities') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.activities}
              </Link>
              <Link 
                href="/travel" 
                className={`transition-colors ${isActivePage('travel') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.travel}
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors ${isActivePage('contact') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {t.nav.contact}
              </Link>
            </nav>
            {/* Register Button - Medium Screen */}
            <Button className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-4 py-2 text-xs font-semibold rounded-none ml-3">
              <Link href="/#register">
                {t.cta.registerNow}
              </Link>
            </Button>
            {/* Language Selector - Medium Screen */}
            <div className="hidden md:flex lg:hidden items-center space-x-2 text-gray-300 text-xs ml-3">
              <span 
                className={`cursor-pointer transition-colors ${language === 'en' ? 'text-white' : 'hover:text-white'}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </span>
              <span className="text-gray-500">|</span>
              <span 
                className={`cursor-pointer transition-colors ${language === 'fr' ? 'text-white' : 'hover:text-white'}`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
            {/* Language Selector - Desktop */}
            <div className="hidden lg:flex items-center space-x-4 text-gray-300 text-sm">
              <span 
                className={`cursor-pointer transition-colors ${language === 'en' ? 'text-white' : 'hover:text-white'}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </span>
              <span className="text-gray-500">|</span>
              <span 
                className={`cursor-pointer transition-colors ${language === 'fr' ? 'text-white' : 'hover:text-white'}`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </span>
            </div>
            
            {/* Register Button - Desktop */}
            <Button className="hidden lg:block bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-6 py-2 font-semibold rounded-none">
              <Link href="/#register">
                {t.cta.registerNow}
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mobile-menu lg:hidden text-white hover:bg-white/10 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu lg:hidden mt-4 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <div className="space-y-2">
                <Link 
                  href="/about" 
                  className={`transition-colors py-2 block ${isActivePage('about') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.about}
                </Link>
                <Link 
                  href="/about/target-audience" 
                  className="text-gray-300 hover:text-white transition-colors py-2 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Target Audience
                </Link>
              </div>
              <Link 
                href="/programme" 
                className={`transition-colors py-2 ${isActivePage('programme') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.programme}
              </Link>
              <Link 
                href="/speakers" 
                className={`transition-colors py-2 ${isActivePage('speakers') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.speakers}
              </Link>
              <Link 
                href="/#register" 
                className={`transition-colors py-2 ${isActivePage('register') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.register}
              </Link>
              <Link 
                href="/activities" 
                className={`transition-colors py-2 ${isActivePage('activities') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.activities}
              </Link>
              <div className="space-y-2">
                <Link 
                  href="/media" 
                  className={`transition-colors py-2 block ${isActivePage('media') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.media}
                </Link>
                <Link 
                  href="/media/gallery" 
                  className="text-gray-300 hover:text-white transition-colors py-2 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  href="/media/blog" 
                  className="text-gray-300 hover:text-white transition-colors py-2 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/media/videos" 
                  className="text-gray-300 hover:text-white transition-colors py-2 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Videos
                </Link>
              </div>
              <Link 
                href="/partners" 
                className={`transition-colors py-2 ${isActivePage('partners') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.partners}
              </Link>
              <Link 
                href="/travel" 
                className={`transition-colors py-2 ${isActivePage('travel') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.travel}
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors py-2 ${isActivePage('contact') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
              
              {/* Language Selector - Mobile */}
              <div className="flex items-center space-x-4 text-gray-300 text-sm pt-2 border-t border-white/20">
                <span 
                  className={`cursor-pointer transition-colors ${language === 'en' ? 'text-white' : 'hover:text-white'}`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </span>
                <span className="text-gray-500">|</span>
                <span 
                  className={`cursor-pointer transition-colors ${language === 'fr' ? 'text-white' : 'hover:text-white'}`}
                  onClick={() => setLanguage('fr')}
                >
                  FR
                </span>
              </div>
              
              {/* Register Button - Mobile */}
              <Button className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] text-white py-3 font-semibold rounded-none mt-4">
                <Link href="/#register" onClick={() => setMobileMenuOpen(false)}>
                  {t.cta.registerNow}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
