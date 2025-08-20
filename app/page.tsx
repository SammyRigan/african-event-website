"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Mail, Play, ArrowRight, Clock, ChevronDown, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitParticipantRegistration, submitExhibitorRegistration } from "@/lib/firebaseService"
import { SuccessToast, ErrorToast } from "@/components/ui/success-toast"

export default function CreativeConnectAfricaLanding() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });
  
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  
  // Modal states
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);
  
  // Form states
  const [participantForm, setParticipantForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    identificationNumber: '',
    organization: '',
    designation: '',
    visaSupport: '',
    futureUpdates: '',
    consent: false
  });
  
  const [exhibitorForm, setExhibitorForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    website: '',
    aboutCompany: '',
    productsServices: '',
    category: '',
    boothNeeds: '',
    logoUpload: null,
    shippingAssistance: '',
    accommodationAssistance: '',
    additionalAssistance: '',
    consent: false,
    includeInHandbook: ''
  });

  // Countries list
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  // Form handlers
  const handleParticipantFormChange = (field: string, value: any) => {
    setParticipantForm(prev => ({ ...prev, [field]: value }));
  };

  const handleExhibitorFormChange = (field: string, value: any) => {
    setExhibitorForm(prev => ({ ...prev, [field]: value }));
  };

  const handleParticipantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await submitParticipantRegistration(participantForm);
      
      if (result.success) {
        setToastMessage({
          title: "🎉 Registration Successful!",
          description: "Thank you for registering for Creatives Connect Afrika Festival & Forum 2025. We've received your application and will be in touch soon with further details."
        });
        setShowSuccessToast(true);
        setParticipantModalOpen(false);
        // Reset form
        setParticipantForm({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          identificationNumber: '',
          organization: '',
          designation: '',
          visaSupport: '',
          futureUpdates: '',
          consent: false
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setToastMessage({
        title: "❌ Registration Failed",
        description: "There was an error submitting your registration. Please try again or contact support if the problem persists."
      });
      setShowErrorToast(true);
    }
  };

  const handleExhibitorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await submitExhibitorRegistration(exhibitorForm);
      
      if (result.success) {
        setToastMessage({
          title: "🎉 Exhibitor Registration Successful!",
          description: "Thank you for registering as an exhibitor for Creatives Connect Afrika Festival & Forum 2025. Our team will review your application and contact you with exhibition details."
        });
        setShowSuccessToast(true);
        setExhibitorModalOpen(false);
        // Reset form
        setExhibitorForm({
          organizationName: '',
          contactPerson: '',
          email: '',
          phone: '',
          country: '',
          website: '',
          aboutCompany: '',
          productsServices: '',
          category: '',
          boothNeeds: '',
          logoUpload: null,
          shippingAssistance: '',
          accommodationAssistance: '',
          additionalAssistance: '',
          consent: false,
          includeInHandbook: ''
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setToastMessage({
        title: "❌ Registration Failed",
        description: "There was an error submitting your exhibitor registration. Please try again or contact support if the problem persists."
      });
      setShowErrorToast(true);
    }
  };

  const translations = {
    en: {
      nav: {
        about: "About Us",
        register: "Register",
        activities: "Activities",
        media: "Media",
        partners: "Partners",
        contact: "Contact"
      },
      hero: {
        title: "Creatives Connect Afrika",
        subtitle: "The AfCFTA Forum & Festival on Tourism, Creatives & Cultural Industries",
        registerNow: "Register Now",
        date: "26 – 28 NOVEMBER",
        location: "ACCRA, GHANA"
      },
      countdown: {
        title: "COUNTDOWN TO EVENT",
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        dateLocation: "November 26-28, 2025 • Accra, Ghana"
      },
      about: {
        title: "ABOUT THE EVENT",
        description: "Creatives Connect Afrika is the inaugural Festival & Forum designed to spotlight Africa's creative industries as catalysts for trade and continental integration. Hosted in Accra, Ghana from 10 – 12 December 2025, this groundbreaking event brings together, creatives investors, and industry leaders for dialogue, deal-making, and celebration."
      },
      activities: {
        title: "ACTIVITIES",
        subtitle: "Explore the three pillars of African creativity through immersive experiences",
        fashion: {
          title: "Fashion",
          description: "Experience the vibrant world of African fashion through runway shows, designer showcases, and textile exhibitions that blend tradition with contemporary innovation.",
          button: "Explore Fashion"
        },
        music: {
          title: "Music",
          description: "Immerse yourself in the global heartbeat of Africa through live performances, music workshops, and industry networking sessions.",
          button: "Explore Music"
        },
        film: {
          title: "Film",
          description: "Discover African cinema through film screenings, masterclasses, and industry discussions that reshape global narratives.",
          button: "Explore Film"
        }
      },
      partners: {
        title: "Our Partners",
        subtitle: "Meet the organizations driving Africa's creative economy forward",
        description: "Creatives Connect Afrika brings together leading organizations from across the continent to drive innovation, cultural exchange, and economic growth through Africa's creative industries.",
        becomePartner: "BECOME A PARTNER"
      },
      register: {
        title: "Register Now",
        description: "Creatives Connect Afrika is more than an event - it's a movement that celebrates the power of African creativity. Join us in this transformative experience where tradition meets innovation.",
        attendEvent: "Register to Attend Event",
        exhibitor: "Register as Exhibitor"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Get in touch with us for more information about Creatives Connect Afrika",
        email: {
          title: "Email",
          description: "For general inquiries and registration support"
        },
        phone: {
          title: "Phone",
          description: "Call us for immediate assistance"
        }
      },
      pillars: {
        title: "The 3 Pillars",
        subtitle: "Celebrating Africa's Creative Excellence in Film, Music, and Fashion",
        film: {
          title: "Film: Reshaping African Narratives",
          description: "Creatives Connect Afrika showcases African cinema through film screenings, masterclasses, and industry networking, empowering filmmakers to collaborate, share stories, and shape the future of the continent's film industry."
        },
        fashion: {
          title: "Fashion: Blending heritage with global trends",
          description: "African fashion blends tradition and innovation, with designers, models, and textile artists showcasing collections, forging partnerships, and driving conversations on sustainability, ethical production, and market growth."
        },
        music: {
          title: "Music: The global heartbeat of Africa",
          description: "African music's global influence comes alive through electrifying performances, collaborative workshops, and industry networking, fostering cross-continental partnerships and innovation in the thriving music scene."
        }
      },
      newsletter: {
        title: "JOIN THE MOVEMENT",
        subtitle: "Be part of Africa's most significant creative economy gathering. Get exclusive updates on speakers, programming, and opportunities.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        interest: "I'm interested as...",
        options: {
          professional: "Industry Professional",
          policymaker: "Policymaker",
          investor: "Investor",
          creative: "Creative/Artist",
          media: "Media",
          partner: "Development Partner",
          diaspora: "Diaspora Representative",
          other: "Other"
        },
        button: "GET EXCLUSIVE UPDATES"
      },
      footer: {
        description: "The inaugural Festival & Forum spotlighting Africa's creative industries as catalysts for continental integration under the AfCFTA.",
        contact: "Contact:",
        eventDetails: "EVENT DETAILS",
        comingSoon: "Coming Soon"
      },
      imageGrid: {
        title: "Celebrating Africa's Fashion, Film and Music",
        description: "Creatives Connect Afrika is a premier platform celebrating African creativity across film, music, and fashion. It brings together industry leaders, artists, and innovators for showcases, workshops, and collaborations that shape Africa's global cultural impact."
      },
    },
    fr: {
      nav: {
        about: "À Propos",
        register: "S'inscrire",
        activities: "Activités",
        media: "Médias",
        partners: "Partenaires",
        contact: "Contact"
      },
      hero: {
        title: "Creatives Connect Afrika",
        subtitle: "Le Forum et Festival AfCFTA sur le Tourisme, les Industries Créatives et Culturelles",
        registerNow: "S'inscrire Maintenant",
        date: "26 – 28 NOVEMBRE",
        location: "ACCRA, GHANA"
      },
      countdown: {
        title: "COMPTE À REBOURS VERS L'ÉVÉNEMENT",
        days: "JOURS",
        hours: "HEURES",
        minutes: "MINUTES",
        seconds: "SECONDES",
        dateLocation: "26-28 novembre 2025 • Accra, Ghana"
      },
      about: {
        title: "À PROPOS DE L'ÉVÉNEMENT",
        description: "Creatives Connect Afrika est le Festival et Forum inaugural conçu pour mettre en lumière les industries créatives africaines comme catalyseurs du commerce et de l'intégration continentale. Organisé à Accra, Ghana du 26 au 28 novembre 2025, cet événement révolutionnaire réunit créateurs, investisseurs et leaders de l'industrie pour le dialogue, la conclusion d'accords et la célébration."
      },
      activities: {
        title: "ACTIVITÉS",
        subtitle: "Explorez les trois piliers de la créativité africaine à travers des expériences immersives",
        fashion: {
          title: "Mode",
          description: "Découvrez le monde vibrant de la mode africaine à travers des défilés, des présentations de designers et des expositions textiles qui allient tradition et innovation contemporaine.",
          button: "Explorer la Mode"
        },
        music: {
          title: "Musique",
          description: "Plongez-vous dans le rythme global de l'Afrique à travers des performances live, des ateliers musicaux et des sessions de réseautage industriel.",
          button: "Explorer la Musique"
        },
        film: {
          title: "Cinéma",
          description: "Découvrez le cinéma africain à travers des projections de films, des masterclass et des discussions industrielles qui redéfinissent les récits mondiaux.",
          button: "Explorer le Cinéma"
        }
      },
      partners: {
        title: "Nos Partenaires",
        subtitle: "Découvrez les organisations qui font avancer l'économie créative africaine",
        description: "Creatives Connect Afrika réunit les principales organisations du continent pour stimuler l'innovation, les échanges culturels et la croissance économique à travers les industries créatives africaines.",
        becomePartner: "DEVENIR PARTENAIRE"
      },
      register: {
        title: "S'inscrire Maintenant",
        description: "Creatives Connect Afrika est plus qu'un événement - c'est un mouvement qui célèbre le pouvoir de la créativité africaine. Rejoignez-nous dans cette expérience transformative où tradition et innovation se rencontrent.",
        attendEvent: "S'inscrire pour Participer",
        exhibitor: "S'inscrire comme Exposant"
      },
      contact: {
        title: "Contactez-nous",
        subtitle: "Contactez-nous pour plus d'informations sur Creatives Connect Afrika",
        email: {
          title: "Email",
          description: "Pour les demandes générales et le support d'inscription"
        },
        phone: {
          title: "Téléphone",
          description: "Appelez-nous pour une assistance immédiate"
        }
      },
      pillars: {
        title: "Les 3 Piliers",
        subtitle: "Célébrer l'Excellence Créative Africaine en Cinéma, Musique et Mode",
        film: {
          title: "Cinéma: Redéfinir les Récits Africains",
          description: "Creatives Connect Afrika présente le cinéma africain à travers des projections, des masterclass et du réseautage industriel, permettant aux cinéastes de collaborer, partager des histoires et façonner l'avenir de l'industrie cinématographique du continent."
        },
        fashion: {
          title: "Mode: Allier patrimoine et tendances mondiales",
          description: "La mode africaine allie tradition et innovation, avec des designers, mannequins et artistes textiles présentant des collections, forgeant des partenariats et animant des conversations sur la durabilité, la production éthique et la croissance du marché."
        },
        music: {
          title: "Musique: Le rythme global de l'Afrique",
          description: "L'influence mondiale de la musique africaine prend vie à travers des performances électrisantes, des ateliers collaboratifs et du réseautage industriel, favorisant les partenariats transcontinentaux et l'innovation dans la scène musicale florissante."
        }
      },
      newsletter: {
        title: "REJOIGNEZ LE MOUVEMENT",
        subtitle: "Faites partie du rassemblement le plus important de l'économie créative africaine. Recevez des mises à jour exclusives sur les conférenciers, la programmation et les opportunités.",
        firstName: "Prénom",
        lastName: "Nom de famille",
        email: "Adresse email",
        interest: "Je suis intéressé en tant que...",
        options: {
          professional: "Professionnel de l'industrie",
          policymaker: "Décideur politique",
          investor: "Investisseur",
          creative: "Créatif/Artiste",
          media: "Médias",
          partner: "Partenaire de développement",
          diaspora: "Représentant de la diaspora",
          other: "Autre"
        },
        button: "OBTENIR DES MISES À JOUR EXCLUSIVES"
      },
      footer: {
        description: "Le Festival et Forum inaugural mettant en lumière les industries créatives africaines comme catalyseurs de l'intégration continentale sous l'AfCFTA.",
        contact: "Contact :",
        eventDetails: "DÉTAILS DE L'ÉVÉNEMENT",
        comingSoon: "Bientôt Disponible"
      },
      imageGrid: {
        title: "Célébrer la Mode, le Cinéma et la Musique Africains",
        description: "Creatives Connect Afrika est une plateforme de premier plan qui célèbre la créativité africaine à travers le cinéma, la musique et la mode. Elle réunit les leaders de l'industrie, les artistes et les innovateurs pour des présentations, des ateliers et des collaborations qui façonnent l'impact culturel global de l'Afrique."
      },
    }
  };

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    const eventDate = new Date('November 26, 2025 09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      {/* Header */}
      <header className="absolute top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/creatives-connect-africa-logo.png"
                alt="Creatives Connect Afrika Logo"
                width={180}
                height={40}
                className="rounded-none"
              />
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
                <Link href="#register" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.register}
                </Link>
                <Link href="#act-grid" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.activities}
                </Link>
                <Link href="#media" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.media}
                </Link>
                <Link href="#partners" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.partners}
                </Link>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
                {/* <Link href="/admin" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">
                  Admin Dashboard
                </Link> */}
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-gray-300 text-sm">
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
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 font-semibold rounded-none">
                <Link href="#register">
                  {t.hero.registerNow}
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
            title="Creatives Connect Afrika Background Video"
          ></iframe> */}
          <iframe 
            src="https://www.youtube.com/embed/sV1wHxxm9iQ?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=sV1wHxxm9iQ&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;disablekb=1&amp;fs=0&amp;cc_load_policy=0&amp;playsinline=1&amp;enablejsapi=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full pointer-events-none"
            title="Creatives Connect Afrika Background Video"
          ></iframe>
          <div className="absolute inset-0 bg-purple-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70"></div>
        </div>


        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto mb-5">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/800px-Coat_of_arms_of_Ghana.svg.png"
                alt="Ghana Coat of Arms"
                width={100}
                height={100}
                className="object-contain"
              />
              <Image
                src="https://au-afcfta.org/wp-content/uploads/2023/09/AfCFTA-Logo-1.svg"
                alt="AfCFTA Secretariat"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            {/* Event Details - No Box */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto mb-5">
              <div className="flex items-center gap-3 text-white">
                {/* <Calendar className="w-6 h-6" /> */}
                <div>
                  <p className="text-xl font-bold font-heading">THE GOVERNMENT OF GHANA IN PARTNERSHIP WITH AfCFTA PRESENTS</p>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight font-heading">
              <span className="block text-white">
                CREATIVES <span className="block text-orange-400 inline">CONNECT</span> AFRIKA</span>
            </h1>

            {/* Subtitle */}
            <div className="mb-8">
              <p className="text-xl lg:text-2xl font-bold text-gray-200 mb-4 font-heading max-w-2xl mx-auto">{t.hero.subtitle}</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto mb-5">
              <div className="flex items-center gap-3 text-white">
                {/* <Calendar className="w-6 h-6" /> */}
                <div>
                  <p className="text-xl font-bold font-heading">{t.hero.date}</p>
                </div>
              </div>
              <div className="w-1 h-7 bg-white"></div>
              <div className="flex items-center gap-3 text-white">
                {/* <MapPin className="w-6 h-6" /> */}
                <div>
                  <p className="text-xl font-bold font-heading">{t.hero.location}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto mb-5">
              <Image
                src="https://au-afcfta.org/wp-content/uploads/2023/09/AfCFTA-Logo-1.svg"
                alt="AfCFTA Secretariat"
                width={70}
                height={70}
                className="object-contain"
              />
              <Image
                src="https://blackstarexperience.org/wp-content/uploads/2025/04/TBSE-logo-02-1024x969.png"
                alt="TBSE Logo"
                width={70}
                height={70}
                className="object-contain"
              />
              <Image
                src="https://ml8qqhkhe4g3.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://africatourismpartners.com/wp-content/uploads/2020/02/ATP-1_trans_0-1.png"
                alt="ATP Logo"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-6 mb-8">
              <Link 
                href="https://twitter.com/creativeconnectafrica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://facebook.com/creativeconnectafrica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://instagram.com/creativeconnectafrica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
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

      {/* Countdown Section */}
      <section className="py-16 bg-black text-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-tight font-heading">{t.countdown.title}</h2>
            <p className="text-xl text-gray-300 font-medium">{t.countdown.dateLocation}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: t.countdown.days, value: countdown.days },
              { label: t.countdown.hours, value: countdown.hours },
              { label: t.countdown.minutes, value: countdown.minutes },
              { label: t.countdown.seconds, value: countdown.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className=" border border-white/15 rounded-none p-6 mb-4">
                  <div className="text-4xl lg:text-6xl font-black text-orange-400 mb-2">{item.value}</div>
                  <div className="text-sm font-bold text-gray-300">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Images */}
      <section id="about" className="py-20 bg-black text-white relative">
        <div className="container mx-auto px-5">
          <div className="max-w-5xl mx-auto">
            {/* new section here */}
            <div className="text-center py-11">
              <p className="font-medium text-4xl text-gray-300  text-gray-600">{t.about.description}</p>
            </div>


            <div className="grid lg:grid-cols-2 gap-16 items-center hidden">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight font-heading">
                  {t.activities.title}
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-xl font-bold text-gray-200">
                    Creatives Connect Afrika 2025 is the inaugural Festival & Forum designed to spotlight Africa's
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
                  alt="Creatives Connect Afrika Event"
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

      {/* Image Grid Section */}
      <section id="act-grid" className="bg-white pt-36 relative">
        <div className="">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            <h2 className="text-5xl lg:text-5xl font-black text-black mb-6 leading-tight font-heading">
                {t.imageGrid.title}
              </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-600">
                {t.imageGrid.description}
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
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-white text-black relative hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight font-heading">
              {t.activities.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              {t.activities.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Fashion Activity */}
            <Card className="group bg-white border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 overflow-hidden rounded-none">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="https://indepthnews.net/wp-content/uploads/2018/12/mandela100_crowd-1.jpg"
                    alt="African Fashion"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-none"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-black mb-4 font-heading">{t.activities.fashion.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    {t.activities.fashion.description}
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-bold rounded-none w-full">{t.activities.fashion.button}</Button>
                </div>
              </CardContent>
            </Card>

            {/* Music Activity */}
            <Card className="group bg-white border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 overflow-hidden rounded-none">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="https://www.gcbbank.com.gh/images/news/2019/GCB-Sponsors-SWIFT-African-Regional-Conference-.jpeg"
                    alt="African Music"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-none"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-black mb-4 font-heading">{t.activities.music.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    {t.activities.music.description}
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-bold rounded-none w-full">{t.activities.music.button}</Button>
                </div>
              </CardContent>
            </Card>

            {/* Film Activity */}
            <Card className="group bg-white border-2 border-gray-200 hover:border-green-400 transition-all duration-300 overflow-hidden rounded-none">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="https://i0.wp.com/efsinc.org/wp-content/uploads/2019/01/50917005_614548135653353_3170554388439629824_o.jpg"
                    alt="African Film"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-none"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-black mb-4 font-heading">{t.activities.film.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    {t.activities.film.description}
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-bold rounded-none w-full">{t.activities.film.button}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Partners Section */}
      <section id="partners" className="py-20 bg-white text-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight font-heading">
                    {t.partners.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    {t.partners.description}
                  </p>
                </div>
                <Button className="border-2 border-black text-white hover:bg-black hover:text-white px-8 py-7 font-bold rounded-none transition-all">
                  {t.partners.becomePartner}
                </Button>
              </div>

              {/* Right Column - Partner Logos Grid */}
              <div className="grid grid-cols-2 gap-8">
                                 {/* Government of Ghana */}
                 <div className="bg-gray-100 rounded-none p-8 flex items-center justify-center hover:bg-gray-200 transition-colors">
                   <div className="text-center">
                     <div className="w-40 h-40 flex items-center justify-center mx-auto mb-4 group">
                       <Image
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/800px-Coat_of_arms_of_Ghana.svg.png"
                         alt="Government of Ghana"
                         width={100}
                         height={100}
                         className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                       />
                     </div>
                     {/* <div className="text-sm font-bold text-gray-700">GOVERNMENT OF</div>
                     <div className="text-lg font-black text-gray-900">GHANA</div> */}
                   </div>
                 </div>

                                 {/* AfCFTA Secretariat */}
                 <div className="bg-gray-100 rounded-none p-8 flex items-center justify-center hover:bg-gray-200 transition-colors">
                   <div className="text-center">
                     <div className="w-40 h-40 flex items-center justify-center mx-auto mb-4 group">
                       <Image
                         src="https://au-afcfta.org/wp-content/uploads/2023/09/AfCFTA-Logo-1.svg"
                         alt="AfCFTA Secretariat"
                         width={90}
                         height={90}
                         className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                       />
                     </div>
                     {/* <div className="text-sm font-bold text-gray-700">AFCFTA</div>
                     <div className="text-lg font-black text-gray-900">SECRETARIAT</div> */}
                   </div>
                 </div>

                                 {/* Black Star Experience */}
                 <div className="bg-gray-100 rounded-none p-8 flex items-center justify-center hover:bg-gray-200 transition-colors">
                   <div className="text-center">
                     <div className="w-40 h-40 flex items-center justify-center mx-auto mb-4 group">
                       <Image
                         src="https://blackstarexperience.org/wp-content/uploads/2025/04/TBSE-logo-02-1024x969.png"
                         alt="Black Star Experience"
                         width={90}
                         height={90}
                         className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                       />
                     </div>
                     {/* <div className="text-sm font-bold text-gray-700">BLACK STAR</div>
                     <div className="text-lg font-black text-gray-900">EXPERIENCE</div> */}
                   </div>
                 </div>

                                 {/* Africa Tourism Partners */}
                 <div className="bg-gray-100 rounded-none p-8 flex items-center justify-center hover:bg-gray-200 transition-colors">
                   <div className="text-center">
                     <div className="w-40 h-40 flex items-center justify-center mx-auto mb-4 group">
                       <Image
                         src="https://ml8qqhkhe4g3.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://africatourismpartners.com/wp-content/uploads/2020/02/ATP-1_trans_0-1.png"
                         alt="Africa Tourism Partners"
                         width={90}
                         height={90}
                         className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                       />
                     </div>
                     {/* <div className="text-sm font-bold text-gray-700">AFRICA TOURISM</div>
                     <div className="text-lg font-black text-gray-900">PARTNERS</div> */}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section id="pillars" className="bg-gray-200 text-black py-36">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl lg:text-5xl font-black mb-1 leading-tight font-heading">
            {t.pillars.title}
          </h2>
          <p className="mb-11">{t.pillars.subtitle}</p>

          <div className="grid">
            <div className="flex gap-4 px-8 py-11 border-t border-t-gray-300">
              <div className="w-1/5">
                <h2 className="text-6xl text-orange-500">01</h2>
              </div>
              <div className="w-2/5">
                <p className="text-2xl">{t.pillars.film.title}</p>
              </div>
              <div className="w-2/5">
                <p className="text-sm text-gray-400">{t.pillars.film.description}</p>
              </div>
            </div>

            <div className="flex gap-4 px-8 py-11 border-t border-t-gray-300">
              <div className="w-1/5">
                <h2 className="text-6xl text-blue-500">02</h2>
              </div>
              <div className="w-2/5">
                <p className="text-2xl">{t.pillars.fashion.title}</p>
              </div>
              <div className="w-2/5">
                <p className="text-sm text-gray-400">{t.pillars.fashion.description}</p>
              </div>
            </div>

            <div className="flex gap-4 px-8 py-11 border-y border-y-gray-300">
              <div className="w-1/5">
                <h2 className="text-6xl text-green-500">03</h2>
              </div>
              <div className="w-2/5">
                <p className="text-2xl">{t.pillars.music.title}</p>
              </div>
              <div className="w-2/5">
                <p className="text-sm text-gray-400">{t.pillars.music.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-36 bg-black text-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content Panel */}
              <div className="space-y-8">
                <div>
                <h2 className="text-5xl lg:text-5xl font-black mb-6 leading-tight font-heading">{t.register.title}</h2>
                  <p className="text-lg text-gray-300 font-medium leading-relaxed">
                    {t.register.description}
                  </p>
                </div>

                {/* Call to Action Buttons */}
                <div className="space-y-6">
                  <Button 
                    onClick={() => setParticipantModalOpen(true)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 h-16 text-lg font-bold rounded-none"
                  >
                    {t.register.attendEvent}
                  </Button>
                  <Button 
                    onClick={() => setExhibitorModalOpen(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 h-16 text-lg font-bold rounded-none"
                  >
                    {t.register.exhibitor}
                  </Button>
                </div>
              </div>

              {/* Right Illustration Panel */}
              <div className="relative">
                <div className="relative rounded-none overflow-hidden shadow-2xl">
                  <Image
                    src="https://au-afcfta.org/wp-content/uploads/2025/07/Gva0nk9WgAAF4of.jpeg"
                    alt="Creatives Connect Afrika Event"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white relative hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight font-heading">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-medium">
              {t.contact.subtitle}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-white/20 rounded-none p-8">
                <Mail className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">{t.contact.email.title}</h3>
                <p className="text-gray-300 mb-4">{t.contact.email.description}</p>
                <Link 
                  href="mailto:info@creativeconnectAfrica.com"
                  className="text-orange-400 hover:text-white transition-colors font-semibold text-lg"
                >
                  info@creativeconnectAfrica.com
                </Link>
              </div>
              
              <div className="bg-black/50 border border-white/20 rounded-none p-8">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📞</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t.contact.phone.title}</h3>
                <p className="text-gray-300 mb-4">{t.contact.phone.description}</p>
                <Link 
                  href="tel:+233244123456"
                  className="text-orange-400 hover:text-white transition-colors font-semibold text-lg"
                >
                  +233 24 412 3456
                </Link>
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
              {t.pillars.film.title}
            </h2>
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                The African film industry is a powerhouse of storytelling. Creatives Connect Afrika provides a platform
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
              {t.pillars.music.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              From Afrobeats to traditional rhythms, showcasing the sounds that have captivated the world.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-lg leading-relaxed font-medium text-gray-300">
                African music has transcended borders, becoming a dominant force in global culture. Creatives Connect
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
              {t.pillars.fashion.title}
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
                African fashion is a vibrant tapestry of tradition and innovation. Creatives Connect Afrika provides a
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
              {t.newsletter.title}
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-medium">
              {t.newsletter.subtitle}
            </p>

            <div className="bg-white/10 rounded-none p-8 border border-white/20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t.newsletter.firstName}
                    className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                  />
                  <input
                    type="text"
                    placeholder={t.newsletter.lastName}
                    className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                  />
                </div>
                <input
                  type="email"
                  placeholder={t.newsletter.email}
                  className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                />
                <select className="w-full px-6 py-4 rounded-none bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium">
                  <option>{t.newsletter.interest}</option>
                  <option>{t.newsletter.options.professional}</option>
                  <option>{t.newsletter.options.policymaker}</option>
                  <option>{t.newsletter.options.investor}</option>
                  <option>{t.newsletter.options.creative}</option>
                  <option>{t.newsletter.options.media}</option>
                  <option>{t.newsletter.options.partner}</option>
                  <option>{t.newsletter.options.diaspora}</option>
                  <option>{t.newsletter.options.other}</option>
                </select>
                <Button
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-xl font-bold rounded-none transform hover:scale-105 transition-all"
                >
                  <Mail className="w-6 h-6 mr-3" />
                  {t.newsletter.button}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      
             {/* Media Section */}
       <section id="media" className="bg-black text-white relative overflow-hidden">
         <div className="">

           {/* Marquee Gallery */}
           <div className="">
             {/* First Row - Scrolling Left */}
             <div className="flex overflow-hidden">
               <div className="flex animate-scroll-left">
                 {[
                   "https://static01.nyt.com/images/2022/12/13/multimedia/13dc-african-summit-1-5f84/13dc-african-summit-1-5f84-videoSixteenByNineJumbo1600.jpg",
                   "https://images.squarespace-cdn.com/content/v1/5f075d33e4ac9c3b05ca695e/1608135598073-SP8USL4632R82D136QQO/19264733_690328184505668_6606660888089315828_o.jpg",
                   "https://2021-2025.state.gov/wp-content/uploads/2022/12/52565517956_a94eb34769_5k-1024x683.jpg",
                   "https://africacdc.org/wp-content/uploads/2024/01/The-Third-International-Conference-on-Public-Health-in-Africa-CPHIA-2023-1024x623.jpg",
                   "https://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/s3/field/field_image_main/oxford_africa_conference-152.jpg?itok=d_zfbFLA",
                   "https://moderndiplomacy.eu/wp-content/uploads/2024/11/russia-africa.jpg",
                   "https://gsmn.co.za/wp-content/uploads/2024/11/russiaaa-1.jpg",
                   "https://www.un.org/ohrlls/sites/www.un.org.ohrlls/files/styles/panopoly_image_original/public/news_articles/lldc3-regional_meeting.png?itok=bJBZY9eP"
                 ].map((src, index) => (
                   <div key={index} className="flex-shrink-0 group">
                                           <div className="relative overflow-hidden rounded-none w-85 h-96">
                        <Image
                          src={src}
                          alt={`Media gallery image ${index + 1}`}
                          width={350}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Second Row - Scrolling Right */}
             <div className="flex overflow-hidden">
             <div className="flex animate-scroll-right">
                 {[
                   "https://static01.nyt.com/images/2022/12/13/multimedia/13dc-african-summit-1-5f84/13dc-african-summit-1-5f84-videoSixteenByNineJumbo1600.jpg",
                   "https://images.squarespace-cdn.com/content/v1/5f075d33e4ac9c3b05ca695e/1608135598073-SP8USL4632R82D136QQO/19264733_690328184505668_6606660888089315828_o.jpg",
                   "https://2021-2025.state.gov/wp-content/uploads/2022/12/52565517956_a94eb34769_5k-1024x683.jpg",
                   "https://africacdc.org/wp-content/uploads/2024/01/The-Third-International-Conference-on-Public-Health-in-Africa-CPHIA-2023-1024x623.jpg",
                   "https://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/s3/field/field_image_main/oxford_africa_conference-152.jpg?itok=d_zfbFLA",
                   "https://moderndiplomacy.eu/wp-content/uploads/2024/11/russia-africa.jpg",
                   "https://gsmn.co.za/wp-content/uploads/2024/11/russiaaa-1.jpg",
                   "https://www.un.org/ohrlls/sites/www.un.org.ohrlls/files/styles/panopoly_image_original/public/news_articles/lldc3-regional_meeting.png?itok=bJBZY9eP"
                 ].map((src, index) => (
                   <div key={index} className="flex-shrink-0 group">
                                           <div className="relative overflow-hidden rounded-none w-85 h-96">
                        <Image
                          src={src}
                          alt={`Media gallery image ${index + 1}`}
                          width={350}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                     </div>
                   </div>
                 ))}
               </div>
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
                  alt="Creatives Connect Afrika Logo"
                  width={180}
                  height={40}
                  className="rounded-none"
                />
              </div>
              <p className="text-gray-400 max-w-md text-lg font-medium">
                {t.footer.description}
              </p>
              <div className="text-gray-400">
                <p className="font-medium">
                  {t.footer.contact}:{" "}
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
              <h4 className="text-xl font-black text-white mb-6 font-heading">{t.footer.eventDetails}</h4>
              <div className="space-y-3 text-gray-400">
                <p className="font-bold text-orange-400">{t.hero.date}</p>
                <p className="font-medium">{t.hero.location}</p>
                <Badge className="bg-orange-500 text-white mt-4 rounded-none">{t.footer.comingSoon}</Badge>
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
              &copy; 2025 Creatives Connect Afrika. A collaboration between AfCFTA Secretariat, Africa Tourism Partners,
              and Black Star Experience.
            </p>
          </div>
        </div>
      </footer>

      {/* Participant Registration Modal */}
      <Dialog open={participantModalOpen} onOpenChange={setParticipantModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-none border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center mb-6">
              Participant Registration Form
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleParticipantSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">1. Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={participantForm.fullName}
                    onChange={(e) => handleParticipantFormChange('fullName', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={participantForm.email}
                    onChange={(e) => handleParticipantFormChange('email', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={participantForm.phone}
                    onChange={(e) => handleParticipantFormChange('phone', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="country" className="text-sm font-semibold">Country of Origin *</Label>
                  <Select value={participantForm.country} onValueChange={(value) => handleParticipantFormChange('country', value)}>
                    <SelectTrigger className="mt-1 rounded-none">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="identificationNumber" className="text-sm font-semibold">Identification Number *</Label>
                  <Input
                    id="identificationNumber"
                    type="text"
                    required
                    value={participantForm.identificationNumber}
                    onChange={(e) => handleParticipantFormChange('identificationNumber', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="organization" className="text-sm font-semibold">Organization / Institution / Freelance *</Label>
                  <Input
                    id="organization"
                    type="text"
                    required
                    value={participantForm.organization}
                    onChange={(e) => handleParticipantFormChange('organization', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="designation" className="text-sm font-semibold">Designation / Role *</Label>
                <Input
                  id="designation"
                  type="text"
                  required
                  value={participantForm.designation}
                  onChange={(e) => handleParticipantFormChange('designation', e.target.value)}
                  className="mt-1 rounded-none"
                />
              </div>
            </div>

            {/* Additional Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">2. Additional Information</h3>
              
              <div>
                <Label className="text-sm font-semibold">Do you require a visa support letter?</Label>
                <RadioGroup 
                  value={participantForm.visaSupport} 
                  onValueChange={(value) => handleParticipantFormChange('visaSupport', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="visa-yes" />
                    <Label htmlFor="visa-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="visa-no" />
                    <Label htmlFor="visa-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="text-sm font-semibold">Would you like to receive updates about future AfCFTA events?</Label>
                <RadioGroup 
                  value={participantForm.futureUpdates} 
                  onValueChange={(value) => handleParticipantFormChange('futureUpdates', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="updates-yes" />
                    <Label htmlFor="updates-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="updates-no" />
                    <Label htmlFor="updates-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={participantForm.consent}
                  onCheckedChange={(checked) => handleParticipantFormChange('consent', checked)}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I agree for my details to be used for event coordination purposes only. *
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setParticipantModalOpen(false)}
                className="px-6 rounded-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-none"
                disabled={!participantForm.consent}
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Exhibitor Registration Modal */}
      <Dialog open={exhibitorModalOpen} onOpenChange={setExhibitorModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-none border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center mb-6">
              Exhibitor Registration Form
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleExhibitorSubmit} className="space-y-6">
            {/* Organization Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">1. Organization Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgName" className="text-sm font-semibold">Organization/Company Name *</Label>
                  <Input
                    id="orgName"
                    type="text"
                    required
                    value={exhibitorForm.organizationName}
                    onChange={(e) => handleExhibitorFormChange('organizationName', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactPerson" className="text-sm font-semibold">Contact Person (Full Name) *</Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    required
                    value={exhibitorForm.contactPerson}
                    onChange={(e) => handleExhibitorFormChange('contactPerson', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exhibitorEmail" className="text-sm font-semibold">Email Address *</Label>
                  <Input
                    id="exhibitorEmail"
                    type="email"
                    required
                    value={exhibitorForm.email}
                    onChange={(e) => handleExhibitorFormChange('email', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="exhibitorPhone" className="text-sm font-semibold">Phone Number *</Label>
                  <Input
                    id="exhibitorPhone"
                    type="tel"
                    required
                    value={exhibitorForm.phone}
                    onChange={(e) => handleExhibitorFormChange('phone', e.target.value)}
                    className="mt-1 rounded-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exhibitorCountry" className="text-sm font-semibold">Country of Operation *</Label>
                  <Select value={exhibitorForm.country} onValueChange={(value) => handleExhibitorFormChange('country', value)}>
                    <SelectTrigger className="mt-1 rounded-none">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="website" className="text-sm font-semibold">Website/Social Media Handles</Label>
                  <Input
                    id="website"
                    type="text"
                    value={exhibitorForm.website}
                    onChange={(e) => handleExhibitorFormChange('website', e.target.value)}
                    className="mt-1 rounded-none"
                    placeholder="e.g., www.company.com or @company"
                  />
                </div>
              </div>
            </div>

            {/* Exhibition Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">2. Exhibition Details</h3>
              
              <div>
                <Label htmlFor="aboutCompany" className="text-sm font-semibold">About your company</Label>
                <Textarea
                  id="aboutCompany"
                  value={exhibitorForm.aboutCompany}
                  onChange={(e) => handleExhibitorFormChange('aboutCompany', e.target.value)}
                  className="mt-1 rounded-none"
                  placeholder="Brief description of your company and what you do..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="productsServices" className="text-sm font-semibold">Type of Products/Services to Exhibit</Label>
                <Textarea
                  id="productsServices"
                  value={exhibitorForm.productsServices}
                  onChange={(e) => handleExhibitorFormChange('productsServices', e.target.value)}
                  className="mt-1 rounded-none"
                  placeholder="Describe the products or services you plan to showcase..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-sm font-semibold">Which category best describes you?</Label>
                <Select value={exhibitorForm.category} onValueChange={(value) => handleExhibitorFormChange('category', value)}>
                  <SelectTrigger className="mt-1 rounded-none">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourism-operator">Tourism Operator</SelectItem>
                    <SelectItem value="creative-entrepreneur">Creative Entrepreneur</SelectItem>
                    <SelectItem value="artist-performer">Artist/Performer</SelectItem>
                    <SelectItem value="cultural-institution">Cultural Institution</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="boothNeeds" className="text-sm font-semibold">Booth/Display Needs</Label>
                <Select value={exhibitorForm.boothNeeds} onValueChange={(value) => handleExhibitorFormChange('boothNeeds', value)}>
                  <SelectTrigger className="mt-1 rounded-none">
                    <SelectValue placeholder="Select booth requirements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table-only">Table only</SelectItem>
                    <SelectItem value="booth-electricity">Booth with electricity</SelectItem>
                    <SelectItem value="booth-av">Booth with AV equipment</SelectItem>
                    <SelectItem value="other-specify">Other – specify</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="logoUpload" className="text-sm font-semibold">Upload Logo/Brand Materials</Label>
                <Input
                  id="logoUpload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleExhibitorFormChange('logoUpload', e.target.files?.[0])}
                  className="mt-1 rounded-none"
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>

            {/* Logistics & Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">3. Logistics & Support</h3>
              
              <div>
                <Label className="text-sm font-semibold">Will you need assistance with shipping/transportation of materials?</Label>
                <RadioGroup 
                  value={exhibitorForm.shippingAssistance} 
                  onValueChange={(value) => handleExhibitorFormChange('shippingAssistance', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="shipping-yes" />
                    <Label htmlFor="shipping-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="shipping-no" />
                    <Label htmlFor="shipping-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="text-sm font-semibold">Will you need assistance with accommodation booking?</Label>
                <RadioGroup 
                  value={exhibitorForm.accommodationAssistance} 
                  onValueChange={(value) => handleExhibitorFormChange('accommodationAssistance', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="accommodation-yes" />
                    <Label htmlFor="accommodation-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="accommodation-no" />
                    <Label htmlFor="accommodation-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="additionalAssistance" className="text-sm font-semibold">Any additional assistance required</Label>
                <Textarea
                  id="additionalAssistance"
                  value={exhibitorForm.additionalAssistance}
                  onChange={(e) => handleExhibitorFormChange('additionalAssistance', e.target.value)}
                  className="mt-1 rounded-none"
                  placeholder="Please specify any other assistance you may need..."
                  rows={3}
                />
              </div>
            </div>

            {/* Consent & Communication */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">4. Consent & Communication</h3>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="exhibitorConsent"
                  checked={exhibitorForm.consent}
                  onCheckedChange={(checked) => handleExhibitorFormChange('consent', checked)}
                  className="mt-1"
                />
                <Label htmlFor="exhibitorConsent" className="text-sm leading-relaxed">
                  I agree for my information to be shared with the AfCFTA Forum Organising Team for exhibition purposes. *
                </Label>
              </div>
              
              <div>
                <Label className="text-sm font-semibold">Would you like to be included in the official exhibition handbook?</Label>
                <RadioGroup 
                  value={exhibitorForm.includeInHandbook} 
                  onValueChange={(value) => handleExhibitorFormChange('includeInHandbook', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="handbook-yes" />
                    <Label htmlFor="handbook-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="handbook-no" />
                    <Label htmlFor="handbook-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setExhibitorModalOpen(false)}
                className="px-6 rounded-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-none"
                disabled={!exhibitorForm.consent}
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Custom Toast Notifications */}
      {showSuccessToast && (
        <SuccessToast
          title={toastMessage.title}
          description={toastMessage.description}
          onClose={() => setShowSuccessToast(false)}
          duration={6000}
        />
      )}
      
      {showErrorToast && (
        <ErrorToast
          title={toastMessage.title}
          description={toastMessage.description}
          onClose={() => setShowErrorToast(false)}
          duration={6000}
        />
      )}
    </div>
  )
}
