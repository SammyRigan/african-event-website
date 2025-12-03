"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"

export default function ProgrammePage() {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);

  const translations = {
    en: {
      nav: {
        about: "About Us",
        programme: "Programme",
        register: "Register",
        activities: "Activities",
        media: "Media",
        partners: "Partners",
        contact: "Contact"
      },
      hero: {
        title: "Programme",
        subtitle: "AfCFTA Tourism, Creatives, and Cultural Industries Forum & Festival | Theme: Creatives Connect Afrika | 24-26 November 2025 | La Palm Beach Hotel, Accra, Ghana"
      },
      programme: {
        title: "Event Schedule",
        subtitle: "Join us for an immersive experience across three dynamic days",
        downloadLabel: "Download Full Programme (PDF)",
        dailyBulletinDay1Label: "Download Day 1 Daily Bulletin (PDF)",
        dailyBulletinDay2Label: "Download Day 2 Daily Bulletin (PDF)"
      },
      cta: {
        title: "Ready to Join?",
        subtitle: "Be part of the inaugural Creatives Connect Afrika Festival & Forum 2025",
        registerNow: "Register Now",
        contactUs: "Contact Us",
        registerAsExhibitor: "Register as Exhibitor"
      },
      footer: {
        description: "Uniting Africa's creative minds to build a prosperous future through innovation, cultural exchange, and economic integration.",
        copyright: "© 2025 Creatives Connect Afrika. All rights reserved."
      },
      days: {
        day1: "Day 1",
        day2: "Day 2",
        day3: "Day 3"
      }
    },
    fr: {
      nav: {
        about: "À Propos",
        programme: "Programme",
        register: "S'inscrire",
        activities: "Activités",
        media: "Médias",
        partners: "Partenaires",
        contact: "Contact"
      },
      hero: {
        title: "Programme",
        subtitle: "Forum et Festival AfCFTA sur le Tourisme, les Industries Créatives et Culturelles | Thème: Creatives Connect Afrika | 24-26 Novembre 2025 | La Palm Beach Hotel, Accra, Ghana"
      },
      programme: {
        title: "Calendrier de l'Événement",
        subtitle: "Rejoignez-nous pour une expérience immersive sur trois jours dynamiques",
        downloadLabel: "Télécharger le Programme Complet (PDF)",
        dailyBulletinDay1Label: "Télécharger le Bulletin Quotidien Jour 1 (PDF)",
        dailyBulletinDay2Label: "Télécharger le Bulletin Quotidien Jour 2 (PDF)"
      },
      cta: {
        title: "Prêt à Participer?",
        subtitle: "Soyez partie du Festival et Forum inaugural Creatives Connect Afrika 2025",
        registerNow: "S'inscrire Maintenant",
        contactUs: "Contactez-Nous",
        registerAsExhibitor: "S'inscrire en tant qu'Exposant"
      },
      footer: {
        description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique.",
        copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés."
      },
      days: {
        day1: "Jour 1",
        day2: "Jour 2",
        day3: "Jour 3"
      }
    }
  };

  const t = translations[language];

  const getProgrammeDays = (lang: 'en' | 'fr') => {
    const programmeTranslations = {
      en: {
        day1: {
          day: "Day 1",
          date: "24 November 2025",
          title: "Masterclasses",
          activities: [
            {
              time: "08:00 AM – 09:00 AM",
              description: "Registration and Accreditation of participants"
            },
            {
              time: "09:00 AM – 09:30 AM",
              description: "Opening session\n\nProgramme Director: Mr. Samuel Agyeman, Communications Unit, AfCFTA Secretariat\n\n- Introduction and Welcome Message by AfCFTA Secretariat\n- Message by Africa Tourism Partners\n- Message by Black Star Experience\n\nSpeakers:\n- Ms. Emily Mburu-Ndoria - Director of Trade in Services, Investment, Intellectual Property Rights & Digital Trade (DTIID), AfCFTA Secretariat, Ghana\n- Mr. Kwakye Donkor - Chief Executive Officer, Africa Tourism Partners, South Africa\n- Mr. Rex Owusu Marfo - Coordinator, Black Star Experience, Ghana"
            },
            {
              time: "09:35 AM – 10:00 AM",
              description: "SESSION 1 · Masterclass on Film\n\nScene Setting Presentation: Boosting Africa’s film production through the AfCFTA – from audio-visual services to live-events (MICE, tourism and conferencing services), recreational services, artist mobility, carnet schemes/customs, and the evolving policy and regulatory landscape.\n\nSpeaker: Mr. Fela Oke – Founder & CEO, Hyphen8 Media Partners, Nigeria"
            },
            {
              time: "10:00 AM – 10:25 AM",
              description: "Presentation 1: Deep dive into the business of Africa’s film industry – film trade, infrastructure, cross-border production, content development, financing vehicles, and digital streaming & distribution opportunities.\n\nSpeaker: Mr. Joel 'Kachi Benson – Award-winning Documentary Filmmaker / VR Creator, Nigeria"
            },
            {
              time: "10:25 AM – 10:50 AM",
              description: "Presentation 2: Spotlight on Intellectual Property Rights – harnessing IPR for African creative and cultural industries commercialisation.\n\nSpeaker: Ms. Maureen Esther Fondo – Head, Copyright and Related Rights, ARIPO, Zimbabwe"
            },
            {
              time: "10:50 AM – 11:20 AM",
              description: "Questions and Answers\n\nProgramme Director: Mr. Emmanuel Sarpong, Film Producers Association of Ghana"
            },
            {
              time: "11:20 AM – 11:35 AM",
              description: "Networking Tea Break"
            },
            {
              time: "11:40 AM – 12:05 PM",
              description: "SESSION 2 · Masterclass on Fashion\n\nScene Setting Presentation: Fashioning intra-African trade – growing from emerging to industry power players, exploiting cross-border trade in garments, and strategies for market access within the AfCFTA framework.\n\nSpeaker: Ms. Makeba Boateng – Fashion Designer & Founder, Fashion Forum Africa, Ghana"
            },
            {
              time: "12:05 PM – 12:30 PM",
              description: "Presentation 1: Shaping tomorrow’s fashion industry in Africa – examining commercial viability and the interconnectedness of African fashion, cultural heritage, film, music, and tourism value chains.\n\nSpeaker: Ms. Koketso Chiepe – Fashion Designer, Botswana"
            },
            {
              time: "12:30 PM – 12:50 PM",
              description: "Presentation 2: AfCFTA – the gateway to business growth and pathways through a unified and diversified market for Africa’s fashion industry.\n\nSpeaker: Ms. Daphine Lekipaika – Trade in Services Expert, AfCFTA Secretariat, Ghana"
            },
            {
              time: "12:50 PM – 13:20 PM",
              description: "Questions and Answers\n\nProgramme Director: Ms. Briggette Harrington – CEO, Igire & AfCFTA Trading Company, Rwanda"
            },
            {
              time: "13:20 PM – 14:30 PM",
              description: "Networking Lunch"
            },
            {
              time: "14:30 PM – 14:55 PM",
              description: "SESSION 3 · Masterclass on Music\n\nScene Setting Presentation: AfCFTA – an unexplored unified and larger market for digital distribution and cross-border collaboration for Africa’s music industry.\n\nSpeaker: Ms. Khadijat El-Alawa – Head of Music & Talent, AfroFuture, Ghana"
            },
            {
              time: "14:55 PM – 15:15 PM",
              description: "Presentation 1: The value of digital platforms – strategic pathways for global reach, brand equity, and commercialisation.\n\nSpeaker: Mr. Ruddy Kwakye – CEO, Republic of Amusement, Ghana"
            },
            {
              time: "15:15 PM – 15:40 PM",
              description: "Questions and Answers\n\nProgramme Director: Ms. Huguette Umutoni – Creative Economy & Global Partnerships Leader, Rwanda"
            },
            {
              time: "15:40 PM – 16:05 PM",
              description: "SESSION 4 · Masterclass on Fintech Revolution & Financial Inclusion\n\nScene Setting Presentation: Fintech revolution – new revenue streams and transparent payments for the African creatives ecosystem.\n\nSpeaker: Mr. Owureku Asare – Director, Fintech and Innovation, Bank of Ghana"
            },
            {
              time: "16:05 PM – 16:25 PM",
              description: "Presentation 1: Financial inclusion – supporting accessible finance for Africa’s creative economy.\n\nSpeaker: Mr. John Sande – Chief Operating Officer, Mediakits.io, Kenya"
            },
            {
              time: "16:25 PM – 16:45 PM",
              description: "Presentation 2: Digital payments – delivering innovative digital financial services to unlock the global creative economy.\n\nSpeaker: Ms. Mariam K. A-Buahin – Chief Operating Officer, Akuna Group"
            },
            {
              time: "16:45 PM – 17:15 PM",
              description: "Questions and Answers\n\nProgramme Director: Mr. Francis Doku – West Africa Director, Africa Tourism Partners"
            },
            {
              time: "17:30 PM – 17:40 PM",
              description: "Concluding Remarks\n\nSpeaker: Mr. Rex Owusu Marfo – Coordinator, Black Star Experience, Office of the Presidency, Ghana"
            },
            {
              time: "17:40 PM – 17:55 PM",
              description: "Call-to-Action and Way Forward\n\nSpeaker: Ms. Emily Mburu-Ndoria – Director, DTIID, AfCFTA Secretariat"
            },
            {
              time: "17:55 PM – 19:30 PM",
              description: "Accra By Night"
            }
          ]
        },
        day2: {
          day: "Day 2",
          date: "25 November 2025",
          title: "Opening Ceremony & Thought-Leadership Dialogues",
          activities: [
            {
              time: "08:00 AM – 09:00 AM",
              description: "Registration and Accreditation of participants"
            },
            {
              time: "09:00 AM – 09:45 AM",
              description: "OPENING CEREMONY\n\n- Message by Black Star Experience, Office of the President of the Republic of Ghana (Mr. Rex Owusu Marfo)\n- Message by Africa Tourism Partners, South Africa (Mr. Kwakye Donkor)\n- Message by the European Union (Ambassador Rune Skinnebach)\n- Welcome Message by Ministry of Tourism, Culture, and Creative Arts, Ghana (Hon. Abla Dzifa Gomashie)\n- Solidarity Message by Ministry of Trade, Agribusiness & Industry, Ghana (Hon. Elizabeth Ofosu-Adjare)"
            },
            {
              time: "09:45 AM – 10:00 AM",
              description: "Cultural Performance / Video"
            },
            {
              time: "10:00 AM – 10:15 AM",
              description: "Keynote Address\n\nH.E. Wamkele Mene – Secretary-General, AfCFTA Secretariat, Ghana"
            },
            {
              time: "10:15 AM – 10:20 AM",
              description: "Welcoming the Guest of Honour\n\nHon. Abla Dzifa Gomashie – Minister of Tourism, Culture, and Creative Arts, Ghana"
            },
            {
              time: "10:20 AM – 11:00 AM",
              description: "Official Opening by Guest of Honour\n\nHis Excellency John Dramani Mahama – President of the Republic of Ghana"
            },
            {
              time: "11:00 AM – 11:30 AM",
              description: "Photo Session"
            },
            {
              time: "11:30 AM – 12:30 PM",
              description: "Thought-Leadership Dialogue: Expanding Africa’s Creative Economy through Tourism, Film, Media, and Digital Innovation Linkages\n\nPanelists:\n- Hon. Abla Dzifa Gomashie – Minister of Tourism, Culture, and Creative Arts, Ghana\n- Ms. Emily Mburu-Ndoria – Director of Trade in Services, Investment, Intellectual Property Rights & Digital Trade (DTIID), AfCFTA Secretariat\n- Mr. Temwa Gondwe – Director, Creatives and Diaspora, Afreximbank, Egypt\n- Hon. Abdoulie Jobe – Minister of Tourism, The Gambia\n- Ms. Otsetswe K. Koboyankwe – Acting CEO, National Arts Council of Botswana\n\nModerator: Ms. Ama Konadu – Project Manager, Producer, and Facilitator"
            },
            {
              time: "12:30 PM – 13:30 PM",
              description: "Film Screening – Selected Filmmakers and Producers"
            },
            {
              time: "13:30 PM – 14:30 PM",
              description: "Networking Lunch & Exhibition Tours"
            },
            {
              time: "14:30 PM – 15:30 PM",
              description: "Thought-Leadership Dialogue: Harnessing the AfCFTA for Film, Fashion, and Music – addressing trade barriers, policy gaps, and investment opportunities to grow Africa’s creative economy.\n\nPanelists:\n- Ms. Theresa Oparebea Ayoade – Co-founder & CEO, Charterhouse Productions, Ghana\n- Ms. Marie Chantal Mazoume – Director, Creatives and Cultural Industries, Cameroon\n- Ms. Rita Ngenzi – Founding Director, Africa Creatives Alliance, Uganda\n- Mr. Gideon Aryeequaye – CEO, Creative Arts Agency, Ghana\n- Ms. Kefa Hussein Igilo – Filmmaker & TV Producer, Tanzania\n- Mr. Munyaradzi ‘Munya’ Chidzonga – Actor and Filmmaker, Zimbabwe\n\nModerator: Ms. Marielle Barrow Maignan, PhD – President & Editor-in-Chief, Caribbean InTransit, Trinidad and Tobago"
            },
            {
              time: "15:30 PM – 15:40 PM",
              description: "Cultural Performance / Video"
            },
            {
              time: "15:45 PM – 16:15 PM",
              description: "Fireside Chat: Unleashing the Power of Storytelling – driving result-oriented intra-African trade through Africa’s creatives content (film, music, fashion, digital content, tourism).\n\nSpeaker: Mr. Mike Otieno – Co-Founder & President, Wowzi, Kenya\nModerator: Ms. Mariam K. A-Buahin – Chief Operating Officer, Akuna Group, Ghana"
            },
            {
              time: "16:15 PM – 17:00 PM",
              description: "Inspiring Global Attraction: Exploiting African films, music, fashion, and culture to bolster Brand Africa’s soft power in the global marketplace.\n\nPanelists:\n- Mr. Melchy Obiang – Film Director and Screen Writer, Gabon\n- Mr. Xavier Edwards – Artist, Trinidad and Tobago\n- Mr. Joel 'Kachi Benson – Emmy Award-Winning Documentary Filmmaker / VR Creator, Nigeria\n- Mr. Kevin Okeya – Co-founder & CEO, Mediakits.io, Kenya\n\nModerator: Mr. Sam Larra – Programs Lead, 24-hour Economy Secretariat, Ghana"
            },
            {
              time: "19:00 PM – 22:00 PM",
              description: "Film Screenings"
            }
          ]
        },
        day3: {
          day: "Day 3",
          date: "26 November 2025",
          title: "Panel Sessions & Showcase",
          activities: [
            {
              time: "09:00 AM – 09:15 AM",
              description: "Creative / Cultural / Musical Performance"
            },
            {
              time: "09:15 AM – 10:30 AM",
              description: "Panel: Facilitating Mobility for Tourism, Cultural and Creatives Professionals\n\nPanelists:\n- Mr. Jermaine Tumelo Besten – CEO, WWP Group, South Africa\n- Ms. Keitumetse Setlang – CEO, Botswana Tourism Organisation\n- Mr. Olayiwola Awakan – Nigerian Tourism Development Authority (NTDA)\n- Mr. Frank Murangwa – Regional Director: Africa, ICCA – International Congress and Convention Association, Rwanda\n- Ms. Maame Afua Houadjeto – CEO, Ghana Tourism Authority\n- Mr. Tshifhiwa Tshivhengwa – CEO, Tourism Business Council South Africa & Interim Chairperson, Africa Tourism Private Sector Alliance\n\nModerator: Prof. Kobby Mensah – CEO, Ghana Tourism Development Company"
            },
            {
              time: "10:30 AM – 11:30 AM",
              description: "Panel: Financing Africa’s Creative Businesses (Film, Music, Fashion) Revolution\n\nPanelists:\n- Mr. Felix Chege – CEO, Real Sources Africa and AfCFTA Trading Company, Kenya\n- Mr. Simon Madjie – CEO, Ghana Investment Promotion Centre\n- Mr. Ivan Quashigah – Board Chairman, National Film Authority, Ghana\n- Ms. Ana Ballo – Filmmaker and Director, RTI Distribution, Côte d’Ivoire\n- Ms. Zodwa Msimang Kansibande – Founder & Creative Director, Zulu Madame, South Africa\n\nModerator: Ms. Laura Ekumbo – Co-Director, LAM Sisterhood, Kenya"
            },
            {
              time: "10:30 AM – 10:45 AM",
              description: "Tea Break & Film Screen"
            },
            {
              time: "10:45 AM – 12:00 PM",
              description: "Panel: Digital Transformation – Embracing the potential of AI, virtual reality, streaming platforms, and the gig economy.\n\nPanelists:\n- Ms. JudySheila N. Mugo – Director of Content Pulse, East Africa\n- Ms. Margareth Geddy – Tanzanian television journalist and wildlife filmmaker, Tanzania\n- Ms. Chadzanso Mwenda – International Actress and Film Distributor, Zambia\n- Mr. Taye Balogun – Founder, The NGO International Film & Knowledge Forum, Kenya\n- Mr. Jiire Smith – Artist & Young Talent, Nigeria / Abu Dhabi\n- Mr. Kevin Okeya – Co-founder & CEO, Mediakits.io, Kenya\n\nModerator: Mr. Boniface Mwalii – Chairman, Entertainment & Arts Journalist Association of Kenya"
            },
            {
              time: "12:20 PM – 14:20 PM",
              description: "Creatives Connect Afrika Fashion Runway"
            },
            {
              time: "14:30 PM – 14:45 PM",
              description: "Presentations of Outcomes, Call to Action, and Closing Remarks\n\nSpeakers:\n- Mr. Rex Omar – Coordinator, Black Star Experience, Ghana\n- Ms. Emily Mburu-Ndoria – Director of Trade in Services, Investment, Intellectual Property Rights & Digital Trade (DTIID), AfCFTA Secretariat, Ghana"
            },
            {
              time: "14:45 PM – 15:00 PM",
              description: "Networking Lunch, Business-to-Business, and Matchmaking Sessions"
            },
            {
              time: "19:00 PM – 23:00 PM",
              description: "Cultural Night & Musical Festival (Traditional Attire)"
            }
          ]
        }
      },
      fr: {
        day1: {
          day: "Jour 1",
          date: "24 Novembre 2025",
          title: "Masterclasses",
          activities: [
            {
              time: "08:00 AM – 09:00 AM",
              description: "Inscription et accréditation des participants"
            },
            {
              time: "09:00 AM – 09:30 AM",
              description: "Session d’ouverture\n\nMaître de cérémonie : M. Samuel Agyeman, Unité de communication, Secrétariat de la ZLECAf\n\n- Introduction et message de bienvenue du Secrétariat de la ZLECAf\n- Message d’Africa Tourism Partners\n- Message de Black Star Experience\n\nIntervenants :\n- Mme Emily Mburu-Ndoria – Directrice du Commerce des Services, de l’Investissement, des DPI et du Commerce numérique (DTIID), Secrétariat de la ZLECAf, Ghana\n- M. Kwakye Donkor – Directeur général, Africa Tourism Partners, Afrique du Sud\n- M. Rex Owusu Marfo – Coordinateur, Black Star Experience, Ghana"
            },
            {
              time: "09:35 AM – 10:00 AM",
              description: "SESSION 1 · Masterclass Cinéma\n\nPrésentation de cadrage : Dynamiser la production cinématographique africaine grâce à la ZLECAf – des services audiovisuels aux événements live (MICE, tourisme et conférences), services récréatifs, mobilité des artistes, carnets/douanes et cadre politique & réglementaire en évolution.\n\nIntervenant : M. Fela Oke – Fondateur & CEO, Hyphen8 Media Partners, Nigeria"
            },
            {
              time: "10:00 AM – 10:25 AM",
              description: "Présentation 1 : Plongée au cœur du business du cinéma africain – commerce, infrastructures, coproductions transfrontalières, développement de contenu, financements et opportunités de streaming & distribution numériques.\n\nIntervenant : M. Joel 'Kachi Benson – Documentariste primé / créateur VR, Nigeria"
            },
            {
              time: "10:25 AM – 10:50 AM",
              description: "Présentation 2 : Focus sur les droits de propriété intellectuelle – valoriser les DPI pour la commercialisation des industries créatives et culturelles africaines.\n\nIntervenante : Mme Maureen Esther Fondo – Cheffe, Droits d’auteur et droits connexes, ARIPO, Zimbabwe"
            },
            {
              time: "10:50 AM – 11:20 AM",
              description: "Questions / réponses\n\nMaître de cérémonie : M. Emmanuel Sarpong, Film Producers Association of Ghana"
            },
            {
              time: "11:20 AM – 11:35 AM",
              description: "Pause thé & réseautage"
            },
            {
              time: "11:40 AM – 12:05 PM",
              description: "SESSION 2 · Masterclass Mode\n\nPrésentation de cadrage : De la fibre au podium – devenir un acteur majeur en exploitant le commerce transfrontalier des vêtements et les stratégies d’accès aux marchés dans le cadre de la ZLECAf.\n\nIntervenante : Mme Makeba Boateng – Créatrice de mode & fondatrice, Fashion Forum Africa, Ghana"
            },
            {
              time: "12:05 PM – 12:30 PM",
              description: "Présentation 1 : Façonner l’industrie de la mode africaine de demain – viabilité commerciale et interconnexion des chaînes de valeur mode, patrimoine, cinéma, musique et tourisme.\n\nIntervenante : Mme Koketso Chiepe – Créatrice de mode, Botswana"
            },
            {
              time: "12:30 PM – 12:50 PM",
              description: "Présentation 2 : La ZLECAf – porte d’entrée vers la croissance et un marché unifié pour la mode africaine.\n\nIntervenante : Mme Daphine Lekipaika – Experte du Commerce des Services, Secrétariat de la ZLECAf, Ghana"
            },
            {
              time: "12:50 PM – 13:20 PM",
              description: "Questions / réponses\n\nMaître de cérémonie : Mme Briggette Harrington – PDG, Igire & AfCFTA Trading Company, Rwanda"
            },
            {
              time: "13:20 PM – 14:30 PM",
              description: "Déjeuner de réseautage"
            },
            {
              time: "14:30 PM – 14:55 PM",
              description: "SESSION 3 · Masterclass Musique\n\nPrésentation de cadrage : La ZLECAf – un marché unifié et encore inexploité pour la distribution numérique et la collaboration transfrontalière de la musique africaine.\n\nIntervenante : Mme Khadijat El-Alawa – Head of Music & Talent, AfroFuture, Ghana"
            },
            {
              time: "14:55 PM – 15:15 PM",
              description: "Présentation 1 : La valeur des plateformes numériques – feuille de route stratégique pour la portée mondiale, l’équité de marque et la monétisation.\n\nIntervenant : M. Ruddy Kwakye – CEO, Republic of Amusement, Ghana"
            },
            {
              time: "15:15 PM – 15:40 PM",
              description: "Questions / réponses\n\nMaître de cérémonie : Mme Huguette Umutoni – Experte économie créative et partenariats mondiaux, Rwanda"
            },
            {
              time: "15:40 PM – 16:05 PM",
              description: "SESSION 4 · Masterclass Fintech & Inclusion financière\n\nPrésentation de cadrage : Révolution fintech – nouveaux revenus et paiements transparents pour l’écosystème des créatifs africains.\n\nIntervenant : M. Owureku Asare – Directeur Fintech & Innovation, Banque du Ghana"
            },
            {
              time: "16:05 PM – 16:25 PM",
              description: "Présentation 1 : Inclusion financière – favoriser l’accès aux services financiers pour l’économie créative africaine.\n\nIntervenant : M. John Sande – COO, Mediakits.io, Kenya"
            },
            {
              time: "16:25 PM – 16:45 PM",
              description: "Présentation 2 : Paiements numériques – offrir des services financiers innovants pour connecter l’économie créative mondiale.\n\nIntervenante : Mme Mariam K. A-Buahin – COO, Akuna Group"
            },
            {
              time: "16:45 PM – 17:15 PM",
              description: "Questions / réponses\n\nMaître de cérémonie : M. Francis Doku – Directeur Afrique de l’Ouest, Africa Tourism Partners"
            },
            {
              time: "17:30 PM – 17:40 PM",
              description: "Remarques de clôture\n\nIntervenant : M. Rex Owusu Marfo – Coordinateur, Black Star Experience, Présidence du Ghana"
            },
            {
              time: "17:40 PM – 17:55 PM",
              description: "Appel à l’action & perspectives\n\nIntervenante : Mme Emily Mburu-Ndoria – Directrice, DTIID, Secrétariat de la ZLECAf"
            },
            {
              time: "17:55 PM – 19:30 PM",
              description: "Accra By Night"
            }
          ]
        },
        day2: {
          day: "Jour 2",
          date: "25 Novembre 2025",
          title: "Cérémonie d’ouverture & Dialogues de haut niveau",
          activities: [
            {
              time: "08:00 AM – 09:00 AM",
              description: "Inscription et accréditation des participants"
            },
            {
              time: "09:00 AM – 09:45 AM",
              description: "CÉRÉMONIE D’OUVERTURE\n\n- Message de Black Star Experience, Présidence de la République du Ghana (M. Rex Owusu Marfo)\n- Message d’Africa Tourism Partners, Afrique du Sud (M. Kwakye Donkor)\n- Message de l’Union européenne (Ambassadeur Rune Skinnebach)\n- Message de bienvenue du Ministère du Tourisme, de la Culture et des Arts créatifs, Ghana (Hon. Abla Dzifa Gomashie)\n- Message de solidarité du Ministère du Commerce, de l’Agribusiness et de l’Industrie, Ghana (Hon. Elizabeth Ofosu-Adjare)"
            },
            {
              time: "09:45 AM – 10:00 AM",
              description: "Performance / capsule culturelle"
            },
            {
              time: "10:00 AM – 10:15 AM",
              description: "Discours programme\n\nS.E. Wamkele Mene – Secrétaire général, Secrétariat de la ZLECAf, Ghana"
            },
            {
              time: "10:15 AM – 10:20 AM",
              description: "Accueil de l’invité d’honneur\n\nHon. Abla Dzifa Gomashie – Ministre du Tourisme, de la Culture et des Arts créatifs, Ghana"
            },
            {
              time: "10:20 AM – 11:00 AM",
              description: "Ouverture officielle par l’invité d’honneur\n\nSon Excellence John Dramani Mahama – Président de la République du Ghana"
            },
            {
              time: "11:00 AM – 11:30 AM",
              description: "Séance photo"
            },
            {
              time: "11:30 AM – 12:30 PM",
              description: "Dialogue de haut niveau : Étendre l’économie créative africaine via les synergies tourisme, cinéma, médias et innovation numérique.\n\nPanélistes :\n- Hon. Abla Dzifa Gomashie – Ministre du Tourisme, de la Culture et des Arts créatifs, Ghana\n- Mme Emily Mburu-Ndoria – Directrice DTIID, Secrétariat de la ZLECAf\n- M. Temwa Gondwe – Directeur, Creatives and Diaspora, Afreximbank, Égypte\n- Hon. Abdoulie Jobe – Ministre du Tourisme, Gambie\n- Mme Otsetswe K. Koboyankwe – PDG par intérim, National Arts Council of Botswana\n\nModératrice : Mme Ama Konadu – Cheffe de projet, productrice et facilitatrice"
            },
            {
              time: "12:30 PM – 13:30 PM",
              description: "Projection ciné – réalisateurs et producteurs sélectionnés"
            },
            {
              time: "13:30 PM – 14:30 PM",
              description: "Déjeuner de réseautage & visites d’exposition"
            },
            {
              time: "14:30 PM – 15:30 PM",
              description: "Dialogue de haut niveau : Tirer parti de la ZLECAf pour le cinéma, la mode et la musique – lever les barrières commerciales, combler les lacunes politiques et stimuler l’investissement.\n\nPanélistes :\n- Mme Theresa Oparebea Ayoade – Cofondatrice & PDG, Charterhouse Productions, Ghana\n- Mme Marie Chantal Mazoume – Directrice, Industries créatives et culturelles, Cameroun\n- Mme Rita Ngenzi – Fondatrice, Africa Creatives Alliance, Ouganda\n- M. Gideon Aryeequaye – CEO, Creative Arts Agency, Ghana\n- Mme Kefa Hussein Igilo – Réalisatrice & productrice TV, Tanzanie\n- M. Munyaradzi « Munya » Chidzonga – Acteur & réalisateur, Zimbabwe\n\nModératrice : Mme Marielle Barrow Maignan, PhD – Présidente & rédactrice en chef, Caribbean InTransit, Trinité-et-Tobago"
            },
            {
              time: "15:30 PM – 15:40 PM",
              description: "Performance / capsule culturelle"
            },
            {
              time: "15:45 PM – 16:15 PM",
              description: "Conversation au coin du feu : Libérer le pouvoir du storytelling pour un commerce intra-africain performant (cinéma, musique, mode, contenus numériques, tourisme).\n\nIntervenant : M. Mike Otieno – Cofondateur & Président, Wowzi, Kenya\nModératrice : Mme Mariam K. A-Buahin – COO, Akuna Group, Ghana"
            },
            {
              time: "16:15 PM – 17:00 PM",
              description: "Attirer le monde : capitaliser sur les films, la musique, la mode et la culture africains pour renforcer le soft power de la marque Afrique.\n\nPanélistes :\n- M. Melchy Obiang – Réalisateur & scénariste, Gabon\n- M. Xavier Edwards – Artiste, Trinité-et-Tobago\n- M. Joel 'Kachi Benson – Documentariste Emmy, Nigeria\n- M. Kevin Okeya – Cofondateur & CEO, Mediakits.io, Kenya\n\nModérateur : M. Sam Larra – Responsable programmes, Secrétariat de l’économie 24 h, Ghana"
            },
            {
              time: "19:00 PM – 22:00 PM",
              description: "Projections ciné"
            }
          ]
        },
        day3: {
          day: "Jour 3",
          date: "26 Novembre 2025",
          title: "Sessions de panels & vitrines",
          activities: [
            {
              time: "09:00 AM – 09:15 AM",
              description: "Performance créative / culturelle / musicale"
            },
            {
              time: "09:15 AM – 10:30 AM",
              description: "Panel : Faciliter la mobilité des professionnels du tourisme, de la culture et des industries créatives.\n\nPanélistes :\n- M. Jermaine Tumelo Besten – CEO, WWP Group, Afrique du Sud\n- Mme Keitumetse Setlang – CEO, Botswana Tourism Organisation\n- M. Olayiwola Awakan – Nigerian Tourism Development Authority (NTDA)\n- M. Frank Murangwa – Directeur régional Afrique, ICCA, Rwanda\n- Mme Maame Afua Houadjeto – CEO, Ghana Tourism Authority\n- M. Tshifhiwa Tshivhengwa – CEO, Tourism Business Council South Africa & président intérimaire, Africa Tourism Private Sector Alliance\n\nModérateur : Pr Kobby Mensah – CEO, Ghana Tourism Development Company"
            },
            {
              time: "10:30 AM – 11:30 AM",
              description: "Panel : Financer la révolution des entreprises créatives africaines (cinéma, musique, mode).\n\nPanélistes :\n- M. Felix Chege – CEO, Real Sources Africa & AfCFTA Trading Company, Kenya\n- M. Simon Madjie – CEO, Ghana Investment Promotion Centre\n- M. Ivan Quashigah – Président du conseil, National Film Authority, Ghana\n- Mme Ana Ballo – Réalisatrice & directrice, RTI Distribution, Côte d’Ivoire\n- Mme Zodwa Msimang Kansibande – Fondatrice & directrice créative, Zulu Madame, Afrique du Sud\n\nModératrice : Mme Laura Ekumbo – Codirectrice, LAM Sisterhood, Kenya"
            },
            {
              time: "10:30 AM – 10:45 AM",
              description: "Pause-café & projection film"
            },
            {
              time: "10:45 AM – 12:00 PM",
              description: "Panel : Transformation numérique – potentiel de l’IA, de la réalité virtuelle, des plateformes de streaming et de l’économie des talents indépendants.\n\nPanélistes :\n- Mme JudySheila N. Mugo – Directrice de Content Pulse, Afrique de l’Est\n- Mme Margareth Geddy – Journaliste TV & réalisatrice spécialisée faune, Tanzanie\n- Mme Chadzanso Mwenda – Actrice internationale & distributrice de films, Zambie\n- M. Taye Balogun – Fondateur, The NGO International Film & Knowledge Forum, Kenya\n- M. Jiire Smith – Artiste & jeune talent, Nigeria / Abu Dhabi\n- M. Kevin Okeya – Cofondateur & CEO, Mediakits.io, Kenya\n\nModérateur : M. Boniface Mwalii – Président, Entertainment & Arts Journalist Association of Kenya"
            },
            {
              time: "12:20 PM – 14:20 PM",
              description: "Défilé Creatives Connect Afrika Fashion Runway"
            },
            {
              time: "14:30 PM – 14:45 PM",
              description: "Présentation des résultats, appel à l’action et remarques de clôture\n\nIntervenants :\n- M. Rex Omar – Coordinateur, Black Star Experience, Ghana\n- Mme Emily Mburu-Ndoria – Directrice DTIID, Secrétariat de la ZLECAf, Ghana"
            },
            {
              time: "14:45 PM – 15:00 PM",
              description: "Déjeuner de réseautage, rencontres B2B et matchmaking"
            },
            {
              time: "19:00 PM – 23:00 PM",
              description: "Soirée culturelle & festival musical (tenue traditionnelle)"
            }
          ]
        }
      }
    };
    return [
      programmeTranslations[lang].day1,
      programmeTranslations[lang].day2,
      programmeTranslations[lang].day3
    ];
  };

  const programmeDays = getProgrammeDays(language);

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/2.jpeg')`}} className="bg-cover bg-top bg-no-repeat">
      <div className="bg-gradient-to-b from-gray-900/50 to-black">
        <Header language={language} setLanguage={setLanguage} currentPage="programme" />

        {/* Hero Section */}
        <section className="py-28 md:pb-44 md:pt-52 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E19D2B]/20 to-transparent"></div>
          </div>
        </section>
        </div>
        </div>

        {/* Programme Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
                  {t.programme.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t.programme.subtitle}
                </p>
                <Link
                  href="/FINAL%20AfCFTA%20PROVISIONAL%20PROGRAM.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#E19D2B] text-[#E19D2B] hover:bg-[#E19D2B] hover:text-black transition-colors font-bold uppercase tracking-wide text-sm md:text-base rounded-none"
                >
                  {t.programme.downloadLabel}
                </Link>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
                {programmeDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 md:px-6 py-3 md:py-4 rounded-none font-bold text-sm md:text-base transition-all duration-300 ${
                      activeTab === index
                        ? 'text-[#E19D2B]'
                        : 'text-gray-600 hover:text-white'
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className=" rounded-none min-h-[400px]">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    {/* <div className="bg-[#E19D2B] text-black px-4 py-2 rounded-none font-bold text-lg mr-4">
                      {programmeDays[activeTab].day}
                    </div> */}
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {programmeDays[activeTab].date}: {programmeDays[activeTab].title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {programmeDays[activeTab].activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 md:p-6 bg-gray-900/50 rounded-none border-l-4 border-[#E19D2B]">
                      <div className="w-3 h-3 bg-[#E19D2B] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-2 md:mb-3 text-base md:text-lg">{activity.time}</p>
                        {activity.description && (
                          <p className="text-gray-300 text-sm md:text-base whitespace-pre-line leading-relaxed">{activity.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Daily Bulletin Download - Show based on active day */}
            {activeTab === 0 && (
              <div className="text-center mt-10">
                <Link
                  href="/DAY%201%20DAILY%20BULLETIN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 text-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-wide text-sm md:text-base rounded-none"
                >
                  {t.programme.dailyBulletinDay1Label}
                </Link>
              </div>
            )}
            {activeTab === 1 && (
              <div className="text-center mt-10">
                <Link
                  href="/DAY%202%20DAILY%20BULLETIN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 text-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-wide text-sm md:text-base rounded-none"
                >
                  {t.programme.dailyBulletinDay2Label}
                </Link>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-16 md:py-36 bg-black text-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Left Content Panel */}
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 leading-tight font-heading">{t.cta.title}</h2>
                    <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                      {t.cta.subtitle}
                    </p>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="space-y-4 md:space-y-6">
                    <Button 
                      onClick={() => setParticipantModalOpen(true)}
                      className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] text-white px-6 md:px-8 h-12 md:h-16 text-base md:text-lg font-bold rounded-none"
                    >
                      {t.cta.registerNow}
                    </Button>
                    <Button 
                      onClick={() => setExhibitorModalOpen(true)}
                      className="w-full bg-[#E91F28] hover:bg-[#D10F1F] text-white px-6 md:px-8 h-12 md:h-16 text-base md:text-lg font-bold rounded-none"
                    >
                      {t.cta.registerAsExhibitor}
                    </Button>
                  </div>
                </div>

                {/* Right Illustration Panel */}
                <div className="relative order-first lg:order-last">
                  <div className="relative rounded-none overflow-hidden shadow-2xl">
                    <Image
                      src="/26.jpeg"
                      alt="Creatives Connect Afrika Event"
                      width={500}
                      height={600}
                      className="w-full h-auto object-cover rounded-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Atmospheric Elements */}
                    <div className="absolute inset-0">
                      {/* Moon-like glow effect */}
                      <div className="absolute top-8 right-8 w-16 md:w-24 h-16 md:h-24 bg-white/20 rounded-full blur-sm"></div>
                      
                      {/* Silhouette elements */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      {/* Small figure silhouette */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 md:w-8 h-12 md:h-16 bg-black/60 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer language={language} />

      {/* Registration Modals */}
      <ParticipantRegistrationModal
        open={participantModalOpen}
        onOpenChange={setParticipantModalOpen}
        onSuccess={() => {
          console.log('Participant registration successful')
        }}
        onError={(error: string) => {
          console.error('Participant registration error:', error)
        }}
      />

      <ExhibitorRegistrationModal
        open={exhibitorModalOpen}
        onOpenChange={setExhibitorModalOpen}
        onSuccess={() => {
          console.log('Exhibitor registration successful')
        }}
        onError={(error: string) => {
          console.error('Exhibitor registration error:', error)
        }}
      />
    </div>
  );
}
