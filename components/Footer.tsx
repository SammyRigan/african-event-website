"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface FooterProps {
  language: 'en' | 'fr'
}

export default function Footer({ language }: FooterProps) {
  const translations = {
    en: {
      eventDetails: "EVENT DETAILS",
      comingSoon: "Coming Soon",
      organizingPartners: "ORGANIZING PARTNERS",
      copyright: "© 2025 Creatives Connect Afrika. All rights reserved.",
      description: "Uniting Africa's creative minds to build a prosperous future through innovation, cultural exchange, and economic integration."
    },
    fr: {
      eventDetails: "DÉTAILS DE L'ÉVÉNEMENT",
      comingSoon: "Bientôt Disponible",
      organizingPartners: "PARTENAIRES ORGANISATEURS",
      copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés.",
      description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique."
    }
  }

  const t = translations[language]

  return (
    <footer className="bg-black border-t border-white/10 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Creatives Connect Afrika Logo"
                width={180}
                height={40}
                className="rounded-none"
              />
            </div>
            <p className="text-gray-400 max-w-md text-base md:text-lg font-medium">
              {t.description}
            </p>
            <div className="text-gray-400">
              <p className="font-medium text-sm md:text-base mb-2">Contact:</p>
              <div className="space-y-1 text-xs md:text-sm">
                <p>
                  <Link
                    href="mailto:rejoice@africatourismpartners.com"
                    className="text-[#E19D2B] hover:text-white transition-colors font-semibold"
                  >
                    rejoice@africatourismpartners.com
                  </Link>
                </p>
                <p>
                  <Link
                    href="mailto:blackstarexperience@presidency.gov.gh"
                    className="text-[#E19D2B] hover:text-white transition-colors font-semibold"
                  >
                    blackstarexperience@presidency.gov.gh
                  </Link>
                </p>
                <p>
                  <Link
                    href="mailto:Ohene.Kofi@au-afcfta.org"
                    className="text-[#E19D2B] hover:text-white transition-colors font-semibold"
                  >
                    Ohene.Kofi@au-afcfta.org
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-black text-white mb-4 md:mb-6 font-heading">{t.eventDetails}</h4>
            <div className="space-y-2 md:space-y-3 text-gray-400">
              <p className="font-bold text-[#E19D2B] text-sm md:text-base">24-26 November 2025</p>
              <p className="font-medium text-sm md:text-base">La Palm Royal Beach Hotel, Accra, Ghana</p>
            </div>

            <div className="flex justify-start space-x-3 mt-4">
              <Link 
                href="https://www.facebook.com/share/1YkKMwaJsT/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://x.com/CreativesAfrika" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://www.linkedin.com/company/creatives-connect-afrika/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://www.instagram.com/creativesconnectafrika" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link 
                href="https://vm.tiktok.com/ZMA6Dersg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-black text-white mb-4 md:mb-6 font-heading">{t.organizingPartners}</h4>
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://au-afcfta.org/wp-content/uploads/2023/09/AfCFTA-Logo-1.svg"
                      alt="AfCFTA Secretariat Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-400 font-semibold text-xs md:text-sm">AfCFTA Secretariat</span>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-none flex items-center justify-center overflow-hidden">
                    <Image
                      src="/ATP.png"
                      alt="Africa Tourism Partners Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-400 font-semibold text-xs md:text-sm">Africa Tourism Partners</span>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-none flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://blackstarexperience.org/wp-content/uploads/2025/04/TBSE-logo-04.png"
                      alt="Black Star Experience Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-gray-400 font-semibold text-xs md:text-sm">Black Star Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 font-medium text-sm md:text-base">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
