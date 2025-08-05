import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Mail, Play, ArrowRight, Clock, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CreativeConnectAfricaLanding() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      {/* Header */}
      <header className="absolute top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/creatives-connect-africa-logo.png"
                alt="Creatives Connect Africa Logo"
                width={180}
                height={40}
                className="rounded-none"
              />
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </Link>
                <Link href="#themes" className="text-gray-300 hover:text-white transition-colors">
                  Pillars
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-gray-300 text-sm">
                {/* <span className="cursor-pointer hover:text-white transition-colors">EN</span>
                <span className="text-gray-500">|</span>
                <span className="opacity-50 cursor-not-allowed">FR</span> */}
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 font-semibold rounded-none">
                <Link href="#contact">
                  Get updates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {/* <iframe
            // src="https://player.vimeo.com/video/1101868991?byline=0&portrait=0&title=0&autoplay=1&controls=0&loop=1&muted=1"
            src="https://www.youtube.com/embed/sV1wHxxm9iQ?autoplay=1&mute=1&loop=1&playlist=sV1wHxxm9iQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full pointer-events-none"
            title="Creative Connect Africa Background Video"
          ></iframe> */}
          <iframe 
            src="https://www.youtube.com/embed/sV1wHxxm9iQ?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=sV1wHxxm9iQ&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;disablekb=1&amp;fs=0&amp;cc_load_policy=0&amp;playsinline=1&amp;enablejsapi=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full pointer-events-none"
            title="Creative Connect Africa Background Video"
          ></iframe>
          <div className="absolute inset-0 bg-purple-900/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>


        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-6xl mx-auto">

            {/* Event Details - No Box */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto mb-5">
              <div className="flex items-center gap-3 text-white">
                {/* <Calendar className="w-6 h-6" /> */}
                <div>
                  <p className="text-xl font-bold font-heading">10 – 12 DECEMBER</p>
                </div>
              </div>
              <div className="w-1 h-7 bg-white"></div>
              <div className="flex items-center gap-3 text-white">
                {/* <MapPin className="w-6 h-6" /> */}
                <div>
                  <p className="text-xl font-bold font-heading">ACCRA, GHANA</p>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-tight font-heading">
              <span className="block text-white">
                CREATIVES <span className="block text-orange-400 inline">CONNECT</span> AFRICA</span>
            </h1>

            {/* Subtitle */}
            <div className="mb-8">
              <p className="text-xl lg:text-2xl font-bold text-gray-200 mb-4 font-heading max-w-2xl mx-auto">The AfCFA Forum & Festival on Tourism, Creatives & Cultural Industries</p>
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-6 mb-8">
              <Link 
                href="https://twitter.com/creativeconnectafrica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://facebook.com/creativeconnectafrica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://instagram.com/creativeconnectafrica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* About Section with Images */}
      <section id="about" className="py-20 bg-black text-white relative">
        <div className="container mx-auto px-5">
          <div className="max-w-5xl mx-auto">
            {/* new section here */}
            <div className="text-center py-11">
              <p className="font-medium text-4xl text-gray-300  text-gray-600">Creatives Connect Africa is the inaugural Festival & Forum designed to spotlight Africa's creative industries as catalysts for trade and continental integration. Hosted in <b className="text-white">Accra, Ghana</b> from <b className="text-white">10 – 12 December 2025</b>, this groundbreaking event brings together, creatives investors, and industry leaders for dialogue, deal-making, and celebration.</p>
            </div>


            <div className="grid lg:grid-cols-2 gap-16 items-center hidden">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight font-heading">
                  ABOUT THE <span className="text-purple-600">EVENT</span>
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-xl font-bold text-gray-200">
                    Creative Connect Africa 2025 is the inaugural Festival & Forum designed to spotlight Africa's
                    creative industries as catalysts for trade and continental integration.
                  </p>
                  <p className="font-medium text-gray-300">
                    Hosted in Accra, Ghana from 10 – 12 December 2025, this groundbreaking event brings together
                    policymakers, creatives, investors, and industry leaders for dialogue, deal-making, and celebration.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Creative Connect Africa Event"
                  width={600}
                  height={500}
                  className="rounded-none shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gray-900/80 rounded-none p-8 max-w-sm border border-white/20">
                  <h3 className="text-2xl font-black mb-6 font-heading text-white">A PLATFORM FOR:</h3>
                  <div className="space-y-4">
                    {[
                      "Advancing policy frameworks for creative services",
                      "Enabling cross-border partnerships and co-productions",
                      "Elevating Africa's global narrative through creativity",
                      "Showcasing cultural heritage and innovation",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-none mt-2 flex-shrink-0"></div>
                        <p className="font-semibold text-sm text-gray-200">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 rotate-[180deg] -bottom-[500px]"></div> */}
      </section>

      <section id="pillars" className="bg-white pt-36 relative">
        <div className="">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            <h2 className="text-5xl lg:text-5xl font-black text-black mb-6 leading-tight font-heading">
                Celebrating Africa's Fashion, Film and Music
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-600">
              Creative Connect Africa is a premier platform celebrating African creativity across film, music, and fashion. It brings together industry leaders, artists, and innovators for showcases, workshops, and collaborations that shape Africa’s global cultural impact.
                </p>
          </div>
            {/* Image Grid */}
            <div className="w-full mt-16">
              <div className="grid grid-cols-3 w-full">
                <div className="relative overflow-hidden rounded-none h-[500px]">
                  <Image
                    src="https://indepthnews.net/wp-content/uploads/2018/12/mandela100_crowd-1.jpg"
                    alt="African Fashion"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-none hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300"></div>
                  {/* <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">FASHION</h3>
                  </div> */}
                </div>
                
                <div className="relative overflow-hidden rounded-none h-[500px]">
                  <Image
                    src="https://i0.wp.com/efsinc.org/wp-content/uploads/2019/01/50917005_614548135653353_3170554388439629824_o.jpg"
                    alt="African Film"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-none hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300"></div>
                  {/* <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">FILM</h3>
                  </div> */}
                </div>
                
                <div className="relative overflow-hidden rounded-none h-[500px]">
                  <Image
                    src="https://www.gcbbank.com.gh/images/news/2019/GCB-Sponsors-SWIFT-African-Regional-Conference-.jpeg"
                    alt="African Music"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-none hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300"></div>
                  {/* <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">MUSIC</h3>
                  </div> */}
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-36 bg-black text-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content Panel */}
              <div className="space-y-8">
                <div>
                <h2 className="text-5xl lg:text-5xl font-black mb-6 leading-tight font-heading">Register your interest</h2>
                  <p className="text-lg text-gray-300 font-medium leading-relaxed">
                    Creative Connect Africa is more than an event - it's a movement that celebrates the power of African creativity. Join us in this transformative experience where tradition meets innovation.
                  </p>
                </div>

                {/* Information Block */}
                <div className="bg-gray-900/80 border border-white/20 rounded-none p-8 hidden">
                  <div className="flex items-start space-x-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-orange-400">10-12</div>
                      <div className="text-sm font-bold text-gray-300">DECEMBER</div>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-orange-400" />
                        <span className="font-medium text-gray-200">La Palm Beach Hotel, Accra, Ghana</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">👥</span>
                        </div>
                        <span className="font-medium text-gray-200">500+ Attendees Expected</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">⚠</span>
                        </div>
                        <span className="font-medium text-gray-200">Registration Required</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                  <div className="">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-none bg-gray-900/80 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                    />
                  </div>
                  
                  {/* Call to Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 h-16 text-lg font-bold rounded-none flex-1">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Illustration Panel */}
              <div className="relative">
                <div className="relative rounded-none overflow-hidden shadow-2xl">
                  <Image
                    src="https://au-afcfta.org/wp-content/uploads/2025/07/Gva0nk9WgAAF4of.jpeg"
                    alt="Creative Connect Africa Event"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover rounded-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Atmospheric Elements */}
                  <div className="absolute inset-0">
                    {/* Moon-like glow effect */}
                    <div className="absolute top-8 right-8 w-24 h-24 bg-white/20 rounded-full blur-sm"></div>
                    
                    {/* Silhouette elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    {/* Small figure silhouette */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-16 bg-black/60 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="themes" className="bg-gray-200 text-black py-36">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl lg:text-5xl font-black mb-1 leading-tight font-heading">
              The 3 Pillars
            </h2>
            <p className="mb-11">Celebrating Africa’s Creative Excellence in Film, Music, and Fashion</p>

            <div className="grid">
              <div className="flex gap-4 px-8 py-11 border-t border-t-gray-300">
                <div className="w-1/5">
                <h2 className="text-6xl text-orange-500">01</h2>
                </div>
                <div className="w-2/5">
                <p className="text-2xl">Film: Reshaping African Narratives</p>
                </div>
                <div className="w-2/5">
                <p className="text-sm text-gray-400">Creative Connect Africa showcases African cinema through film screenings, masterclasses, and industry networking, empowering filmmakers to collaborate, share stories, and shape the future of the continent’s film industry.</p>
                </div>
              </div>

              <div className="flex gap-4 px-8 py-11 border-t border-t-gray-300">
                <div className="w-1/5">
                <h2 className="text-6xl text-blue-500">02</h2>
                </div>
                <div className="w-2/5">
                <p className="text-2xl">Fashion: Blending heritage with global trends</p>
                </div>
                <div className="w-2/5">
                <p className="text-sm text-gray-400">African fashion blends tradition and innovation, with designers, models, and textile artists showcasing collections, forging partnerships, and driving conversations on sustainability, ethical production, and market growth.</p>
                </div>
              </div>

              <div className="flex gap-4 px-8 py-11 border-y border-y-gray-300">
                <div className="w-1/5">
                <h2 className="text-6xl text-green-500">03</h2>
                </div>
                <div className="w-2/5">
                <p className="text-2xl">Music: The global heartbeat of Africa</p>
                </div>
                <div className="w-2/5">
                <p className="text-sm text-gray-400">African music’s global influence comes alive through electrifying performances, collaborative workshops, and industry networking, fostering cross-continental partnerships and innovation in the thriving music scene.</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Film Pillar Section */}
      <section id="film" className="py-20 bg-gradient-to-br from-black to-red-900 text-white hidden">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-none overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=450&width=800"
                alt="African Film Festival"
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-none"
                >
                  <Play className="w-6 h-6 mr-3" />
                  WATCH HIGHLIGHTS
                </Button>
              </div>
            </div>
            <div className="space-y-6">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              FILM: <span className="text-red-400">RESHAPING AFRICAN NARRATIVES</span>
            </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                The African film industry is a powerhouse of storytelling. Creative Connect Africa provides a platform
                for filmmakers to showcase their work, engage in co-production deals, and discuss the future of African
                cinema.
              </p>
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                Explore masterclasses on screenwriting, directing, and distribution. Witness exclusive film screenings
                and network with industry leaders elevating Africa's global image through compelling visual narratives.
              </p>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold rounded-none transition-all bg-transparent"
              >
                EXPLORE FILM TRACK <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Music Pillar Section */}
      <section id="music" className="py-20 bg-black text-white hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              MUSIC: <span className="text-purple-600">THE GLOBAL HEARTBEAT OF AFRICA</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              From Afrobeats to traditional rhythms, showcasing the sounds that have captivated the world.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                African music has transcended borders, becoming a dominant force in global culture. Creative Connect
                Africa celebrates this, bringing together artists, producers, and executives to explore the business of
                music and cross-continental collaborations.
              </p>
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                Experience electrifying live performances and participate in workshops on music production and digital
                distribution. Connect with the rhythm and soul of Africa's thriving music industry.
              </p>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold rounded-none transition-all bg-transparent"
              >
                EXPLORE MUSIC TRACK <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="relative rounded-none overflow-hidden shadow-2xl order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=450&width=800"
                alt="Afrobeats Concert"
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-none"
                >
                  <Play className="w-6 h-6 mr-3" />
                  SEE LIVE PERFORMANCES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fashion Pillar Section */}
      <section id="fashion" className="py-20 bg-gradient-to-br from-black to-green-900 text-white hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              FASHION: <span className="text-green-400">BLENDING HERITAGE WITH GLOBAL TRENDS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Highlighting designers who fuse traditional African aesthetics with contemporary style, influencing global
              trends.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-none overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=450&width=800"
                alt="African Fashion Runway"
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-none"
                >
                  <Play className="w-6 h-6 mr-3" />
                  VIEW SHOWCASES
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                African fashion is a vibrant tapestry of tradition and innovation. Creative Connect Africa provides a
                platform for designers, models, and textile artists to showcase collections and forge partnerships.
              </p>
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                African fashion blends tradition and innovation, with designers, models, and textile artists showcasing collections, forging partnerships, and driving conversations on sustainability, ethical production, and market growth. </p>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold rounded-none transition-all bg-transparent"
              >
                EXPLORE FASHION TRACK <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers/Lineup */}
      <section id="lineup" className="py-20 bg-gradient-to-br from-black to-purple-900 hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              FEATURED <span className="text-orange-400">LINEUP</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Industry leaders, visionaries, and cultural icons shaping Africa's creative future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                name: "Amara Okafor",
                title: "Film Director & Producer",
                category: "Film",
                image: "african woman film director with camera equipment professional portrait",
                color: "bg-red-500",
              },
              {
                name: "Kwame Asante",
                title: "Grammy-Winning Producer",
                category: "Music",
                image: "african man music producer in recording studio professional portrait",
                color: "bg-purple-500",
              },
              {
                name: "Zara Mensah",
                title: "Fashion Designer",
                category: "Fashion",
                image: "african woman fashion designer with colorful fabrics professional portrait",
                color: "bg-green-500",
              },
              {
                name: "Dr. Kofi Adjei",
                title: "AfCFTA Trade Expert",
                category: "Policy",
                image: "african man economist in professional setting business portrait",
                color: "bg-blue-500",
              },
            ].map((speaker, index) => (
              <Card
                key={index}
                className="group bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden rounded-none"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=250&query=${speaker.image}`}
                      alt={speaker.name}
                      width={250}
                      height={300}
                      className="w-full h-64 object-cover rounded-none"
                    />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <Button
                        variant="secondary"
                        className="bg-white text-black hover:bg-gray-100 font-bold rounded-none w-full"
                      >
                        VIEW PROFILE
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className={`${speaker.color} text-white mb-2 rounded-none`}>{speaker.category}</Badge>
                      <h3 className="text-xl font-bold text-white mb-1 font-heading">{speaker.name}</h3>
                      <p className="text-gray-300 text-sm font-medium">{speaker.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold rounded-none bg-transparent"
            >
              VIEW FULL LINEUP <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Program Schedule */}
      <section id="program" className="py-20 bg-black text-white hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              EVENT <span className="text-purple-600">PROGRAM</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Three days of forums, festivals, and networking opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                day: "DAY 1",
                date: "December 10",
                title: "FORUM OPENING",
                highlights: ["Opening Ceremony", "Policy Keynotes", "Trade Discussions", "Welcome Reception"],
                color: "bg-purple-600",
              },
              {
                day: "DAY 2",
                date: "December 11",
                title: "FESTIVAL SHOWCASE",
                highlights: ["Film Screenings", "Music Performances", "Fashion Shows", "Cultural Exhibitions"],
                color: "bg-orange-600",
              },
              {
                day: "DAY 3",
                date: "December 12",
                title: "COLLABORATION",
                highlights: ["Masterclasses", "Business Matchmaking", "Partnership Signings", "Closing Gala"],
                color: "bg-green-600",
              },
            ].map((day, index) => (
              <Card
                key={index}
                className="group bg-gray-900/80 border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-none"
              >
                <CardContent className="p-0">
                  <div className={`${day.color} text-white p-8 rounded-none`}>
                    <div className="text-center mb-6">
                      <p className="text-sm font-bold opacity-80">{day.day}</p>
                      <h3 className="text-3xl font-black font-heading">{day.date}</h3>
                      <p className="text-xl font-bold mt-2 font-heading">{day.title}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-lg font-bold mb-4 font-heading text-white">Key Highlights:</h4>
                    <ul className="space-y-3">
                      {day.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-200">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-900 to-black hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              CREATIVE <span className="text-orange-400">GALLERY</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Celebrating Africa's vibrant creative industries and cultural heritage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "african film festival red carpet glamour",
              "afrobeats concert crowd dancing celebration",
              "african fashion runway colorful designs",
              "traditional african music instruments performance",
              "nollywood movie production behind scenes",
              "african textile patterns vibrant colors",
            ].map((query, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-none hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={`/placeholder.svg?height=300&width=400&query=${query}`}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-none"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-black text-white hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight font-heading">
              OUR <span className="text-purple-600">PARTNERS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "AfCFTA Secretariat",
                color: "bg-purple-500",
                desc: "African Continental Free Trade Area",
              },
              {
                name: "Africa Tourism Partners",
                color: "bg-orange-500",
                desc: "Tourism & Cultural Development",
              },
              {
                name: "Black Star Experience",
                color: "bg-green-500",
                desc: "Cultural Events & Experiences",
              },
            ].map((partner, index) => (
              <Card
                key={index}
                className="text-center p-8 bg-gray-900/80 border border-white/20 hover:shadow-lg transition-shadow rounded-none"
              >
                <CardContent className="p-0">
                  <div
                    className={`w-20 h-20 ${partner.color} rounded-none flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white font-black text-xl font-heading">
                      {partner.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading text-white">{partner.name}</h3>
                  <p className="text-gray-300 font-medium">{partner.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-black via-purple-900 to-black hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight font-heading">
              JOIN THE <span className="text-orange-400">MOVEMENT</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-medium">
              Be part of Africa's most significant creative economy gathering. Get exclusive updates on speakers,
              programming, and opportunities.
            </p>

            <div className="bg-white/10 rounded-none p-8 border border-white/20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                />
                <select className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium">
                  <option>I'm interested as...</option>
                  <option>Industry Professional</option>
                  <option>Policymaker</option>
                  <option>Investor</option>
                  <option>Creative/Artist</option>
                  <option>Media</option>
                  <option>Development Partner</option>
                  <option>Diaspora Representative</option>
                  <option>Other</option>
                </select>
                <Button
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-xl font-bold rounded-none transform hover:scale-105 transition-all"
                >
                  <Mail className="w-6 h-6 mr-3" />
                  GET EXCLUSIVE UPDATES
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="/creatives-connect-africa-logo.png"
                  alt="Creative Connect Africa Logo"
                  width={180}
                  height={40}
                  className="rounded-none"
                />
              </div>
              <p className="text-gray-400 max-w-md text-lg font-medium">
                The inaugural Festival & Forum spotlighting Africa's creative industries as catalysts for continental
                integration under the AfCFTA.
              </p>
              <div className="text-gray-400">
                <p className="font-medium">
                  Contact:{" "}
                  <Link
                    href="mailto:info@creativeconnectAfrica.com"
                    className="text-orange-400 hover:text-white transition-colors font-semibold"
                  >
                    info@creativeconnectAfrica.com
                  </Link>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-white mb-6 font-heading">EVENT DETAILS</h4>
              <div className="space-y-3 text-gray-400">
                <p className="font-bold text-orange-400">DECEMBER 10-12, 2025</p>
                <p className="font-medium">La Palm Beach Hotel</p>
                <p className="font-medium">Accra, Ghana</p>
                <Badge className="bg-orange-500 text-white mt-4 rounded-none">Coming Soon</Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-white mb-6 font-heading">ORGANIZING PARTNERS</h4>
              <div className="space-y-4">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://au-afcfta.org/wp-content/uploads/2023/09/AfCFTA-Logo-1.svg"
                        alt="AfCFTA Secretariat Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-400 font-semibold text-sm">AfCFTA Secretariat</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-none flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://ml8qqhkhe4g3.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://africatourismpartners.com/wp-content/uploads/2020/02/ATP-1_trans_0-1.png"
                        alt="Africa Tourism Partners Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-400 font-semibold text-sm">Africa Tourism Partners</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-none flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://blackstarexperience.org/wp-content/uploads/2025/04/TBSE-logo-04.png"
                        alt="Black Star Experience Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-400 font-semibold text-sm">Black Star Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-medium">
              &copy; 2025 Creative Connect Africa. A collaboration between AfCFTA Secretariat, Africa Tourism Partners,
              and Black Star Experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
