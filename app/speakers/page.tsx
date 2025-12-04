"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MapPin, Calendar, Award, Globe, Briefcase, GraduationCap, Star, Users, Building2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Speaker } from '@/lib/firebaseService'

export const initialSpeakers = [
  {
    id: 'initial-president-ghana',
    name: "H.E. John Dramani Mahama",
    title: "President of the Republic of Ghana",
    titleFr: "Président de la République du Ghana",
    image: "/President.jpg",
    bio: "",
    bioFr: "",
    achievements: [],
    achievementsFr: [],
    education: [],
    educationFr: [],
    expertise: [],
    expertiseFr: [],
    impact: [],
    impactFr: [],
    initiatives: [],
    initiativesFr: [],
    experience: [],
    experienceFr: [],
    order: 0,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-1',
    name: "H.E. Wamkele Keabetswe Mene",
    title: "Secretary-General, African Continental Free Trade Area (AfCFTA) Secretariat",
    titleFr: "Secrétaire Général, Secrétariat de la Zone de Libre-Échange Continentale Africaine (ZLECAf)",
    image: "/Wamkele photo.jpg",
    bio: "H.E. Wamkele Mene is the first Secretary-General of the AfCFTA Secretariat, elected in February 2020 and sworn in on 19 March 2020. A seasoned trade negotiator and lawyer, he has played a central role in advancing Africa's integration agenda.",
    bioFr: "S.E. Wamkele Mene est le premier Secrétaire Général du Secrétariat de la ZLECAf, élu en février 2020 et assermenté le 19 mars 2020. Négociateur commercial et avocat expérimenté, il a joué un rôle central dans la promotion de l'agenda d'intégration africaine.",
    achievements: [
      "First Secretary-General of the AfCFTA Secretariat",
      "Former South Africa's Head of Mission to the WTO in Geneva",
      "Chaired the WTO Committee on International Trade in Financial Services",
      "Chief Director for Africa Economic Relations at South Africa's Department of Trade and Industry",
      "Led negotiations for the AfCFTA and the Tripartite Free Trade Area"
    ],
    achievementsFr: [
      "Premier Secrétaire Général du Secrétariat de la ZLECAf",
      "Ancien Chef de Mission de l'Afrique du Sud auprès de l'OMC à Genève",
      "Présidé le Comité de l'OMC sur le Commerce International des Services Financiers",
      "Directeur Principal des Relations Économiques Africaines au Département du Commerce et de l'Industrie de l'Afrique du Sud",
      "Dirigé les négociations pour la ZLECAf et la Zone de Libre-Échange Tripartite"
    ],
    education: [
      "Rhodes University",
      "School of Oriental & African Studies (SOAS), University of London",
      "London School of Economics (LSE)"
    ],
    educationFr: [
      "Université Rhodes",
      "École des Études Orientales et Africaines (SOAS), Université de Londres",
      "London School of Economics (LSE)"
    ],
    initiatives: [
      "Protocol on Women and Youth in Trade",
      "Guided Trade Initiative",
      "Positioning trade as a catalyst for inclusive growth"
    ],
    initiativesFr: [
      "Protocole sur les Femmes et les Jeunes dans le Commerce",
      "Initiative de Commerce Guidé",
      "Positionner le commerce comme catalyseur de croissance inclusive"
    ],
    order: 1,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-elizabeth-ofosu-adjare',
    name: "Hon. Elizabeth Ofosu-Adjare",
    title: "Minister for Trade, Agribusiness & Industry, Republic of Ghana",
    titleFr: "Ministre du Commerce, de l'Agribusiness et de l'Industrie, République du Ghana",
    image: "/Elizabeth.png",
    bio: "Hon. Elizabeth Ofosu-Adjare (Mrs.) is Ghana's Minister for Trade, Agribusiness and Industry and the Member of Parliament for the Techiman North Constituency. A distinguished lawyer, legislator, and policy advocate, she has dedicated her career to governance, legal advocacy, and economic development. As Minister, she is committed to strengthening Ghana's trade and industrial sectors, promoting agribusiness, and driving economic transformation through strategic policies and private-sector partnerships. She previously served as Ghana's Minister for Tourism, Culture, and Creative Arts, where she advanced cultural policy, promoted the tourism industry, and spearheaded flagship initiatives including the Marine Drive Project and Homofest.\n\nHon. Ofosu-Adjare is the founder of the Elizabeth Law Centre and has an extensive legal background, serving as a Notary Public and working with the Legal Aid Scheme. She holds an LLM in Alternative Dispute Resolution and an LLB from the University of Ghana, an MA in International Relations from Webster University, and a BA in Social Science from KNUST. She completed her Professional Law Course at the Ghana School of Law and was called to the Bar in 2004.\n\nShe has held key board roles, including former Board Chair of Cocoa Merchant Company Limited, board member of Multi Trust Financial Services, and former board member of Phoenix Life Assurance Limited. Passionate about mentorship, human rights, and governance, she continues to champion trade expansion, industrial growth, and business development in Ghana, while nurturing interests in reading, music, and culinary arts.",
    bioFr: "L'honorable Elizabeth Ofosu-Adjare est la ministre ghanéenne du Commerce, de l'Agribusiness et de l'Industrie et la députée de la circonscription de Techiman North. Avocate, législatrice et défenseure des politiques publiques, elle consacre sa carrière à la gouvernance, à la promotion juridique et au développement économique. À ce poste ministériel, elle œuvre pour renforcer les secteurs du commerce et de l'industrie du Ghana, promouvoir l'agribusiness et impulser une transformation économique à travers des politiques stratégiques et des partenariats avec le secteur privé. Elle a précédemment servi comme ministre du Tourisme, de la Culture et des Arts créatifs, menant des politiques culturelles, dynamisant l'industrie touristique et pilotant des initiatives phares telles que le Marine Drive Project et Homofest.\n\nFondatrice du Elizabeth Law Centre, elle possède une solide expérience juridique en tant que notaire public et juriste au sein du Legal Aid Scheme. Elle est titulaire d'un LLM en règlement alternatif des différends et d'un LLB de l'Université du Ghana, d'un MA en relations internationales de Webster University et d'un BA en sciences sociales de la KNUST. Elle a achevé le Professional Law Course à la Ghana School of Law et a été admise au barreau en 2004.\n\nElle a occupé d'importantes fonctions au sein de conseils d'administration, notamment présidente du conseil de Cocoa Merchant Company Limited, membre du conseil de Multi Trust Financial Services et de Phoenix Life Assurance Limited. Passionnée par le mentorat, les droits humains et la gouvernance, elle continue de défendre l'expansion commerciale, la croissance industrielle et le développement des entreprises au Ghana, tout en cultivant ses intérêts pour la lecture, la musique et les arts culinaires.",
    achievements: [
      "Minister for Trade, Agribusiness & Industry, Republic of Ghana",
      "Former Minister for Tourism, Culture and Creative Arts of Ghana",
      "Member of Parliament for Techiman North Constituency",
      "Founder of the Elizabeth Law Centre and seasoned legal practitioner",
      "Leadership of flagship tourism and cultural projects including the Marine Drive Project and Homofest",
      "Former Board Chair, Cocoa Merchant Company Limited",
      "Board service with Multi Trust Financial Services and Phoenix Life Assurance Limited"
    ],
    achievementsFr: [
      "Ministre ghanéenne du Commerce, de l'Agribusiness et de l'Industrie",
      "Ancienne ministre du Tourisme, de la Culture et des Arts créatifs du Ghana",
      "Députée pour la circonscription de Techiman North",
      "Fondatrice du Elizabeth Law Centre et avocate chevronnée",
      "Leadership d'initiatives phares telles que le Marine Drive Project et Homofest",
      "Ancienne présidente du conseil de Cocoa Merchant Company Limited",
      "Membre de conseils d'administration chez Multi Trust Financial Services et Phoenix Life Assurance Limited"
    ],
    expertise: [
      "Trade and industrial policy",
      "Agribusiness development",
      "Economic transformation and private-sector partnerships",
      "Tourism and cultural policy",
      "Legal advocacy and governance",
      "Alternative dispute resolution",
      "Mentorship and human rights advocacy"
    ],
    expertiseFr: [
      "Politiques commerciales et industrielles",
      "Développement de l'agribusiness",
      "Transformation économique et partenariats avec le secteur privé",
      "Politiques du tourisme et de la culture",
      "Plaidoyer juridique et gouvernance",
      "Règlement alternatif des différends",
      "Mentorat et promotion des droits humains"
    ],
    education: [
      "LLM in Alternative Dispute Resolution, University of Ghana",
      "LLB, University of Ghana",
      "MA in International Relations, Webster University",
      "BA in Social Science, Kwame Nkrumah University of Science and Technology (KNUST)",
      "Professional Law Course (PLC), Ghana School of Law"
    ],
    educationFr: [
      "LLM en règlement alternatif des différends, Université du Ghana",
      "LLB, Université du Ghana",
      "MA en relations internationales, Webster University",
      "BA en sciences sociales, Université des sciences et technologies Kwame Nkrumah (KNUST)",
      "Professional Law Course, Ghana School of Law"
    ],
    order: 2,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-abla-dzifa-gomashie',
    name: "Hon. Abla Dzifa Gomashie",
    title: "Minister of Tourism, Culture and Creative Arts, Republic of Ghana",
    titleFr: "Ministre du Tourisme, de la Culture et des Arts créatifs, République du Ghana",
    image: "/Abla.jpg",
    bio: "Hon. Abla Dzifa Gomashie (MP) is Ghana's Minister of Tourism, Culture and Creative Arts and a two-term Member of Parliament for the Ketu South constituency. A veteran actress, producer, scriptwriter, and cultural advocate with over three decades of experience, she has dedicated her life to promoting Ghanaian and African heritage. Dzifa is renowned for pioneering projects such as the beloved storytelling programme 'By the Fireside,' and for providing strategic guidance to civil society organisations, public agencies, and international partners across the creative arts ecosystem. She is the founder and Chief Executive of Values for Life, a non-governmental organisation that promotes creative arts, culture, traditional heritage, tourism, and digital innovation among youth.\n\nHon. Gomashie holds a Master of Philosophy in African Studies and a Bachelor of Fine Arts (First Class Honours) from the University of Ghana, and is an alumna of St. Louis Senior High School in Kumasi. A celebrated performer with credits spanning stage and screen—including Blackstar Mambo, Chaka, Jojo, The Third Woman, Ghost Tears, House of Pain, and Heart of Gold—she has received numerous accolades for her artistic contributions. She also served as Deputy Minister for Tourism, Arts and Culture (2013–2017) and returned to the Ministry in 2025.\n\nBeyond politics, she is the Queen Mother in charge of protocol for the Aflao Traditional Area, known by the stool name Mama Dzramedo. A consensus-builder and passionate community advocate, she has served on parliamentary committees covering poverty reduction, trade, industry, tourism, and public accounts. Hon. Abla Dzifa Gomashie is committed to leveraging her creative, political, and diplomatic experience to advance Ghana's tourism and creative sectors, drive inclusive economic growth, and deepen cultural pride.",
    bioFr: "L'honorable Abla Dzifa Gomashie est ministre ghanéenne du Tourisme, de la Culture et des Arts créatifs et députée pour la circonscription de Ketu South, forte de deux mandats. Actrice, productrice, scénariste et militante culturelle depuis plus de trois décennies, elle consacre sa vie à promouvoir le patrimoine ghanéen et africain. Elle est l'initiatrice du programme emblématique « By the Fireside » et fournit une expertise stratégique à des organisations de la société civile, des institutions publiques et des partenaires internationaux au sein de l'écosystème des industries créatives. Elle est fondatrice et directrice exécutive de Values for Life, une ONG qui promeut les arts créatifs, la culture, le patrimoine traditionnel, le tourisme et l'innovation numérique auprès des jeunes.\n\nElle est titulaire d'un Master of Philosophy en études africaines et d'un Bachelor of Fine Arts (mention très bien) de l'Université du Ghana, et est ancienne élève du St. Louis Senior High School de Kumasi. Interprète célébrée, elle a joué sur scène et à l'écran dans Blackstar Mambo, Chaka, Jojo, The Third Woman, Ghost Tears, House of Pain ou encore Heart of Gold, recevant de nombreuses distinctions. Elle fut vice-ministre du Tourisme, des Arts et de la Culture (2013–2017) avant de retrouver le ministère en 2025.\n\nAu-delà de la politique, elle est reine-mère chargée du protocole pour la zone traditionnelle d'Aflao, sous le nom de règne Mama Dzramedo. Bâtisseuse de consensus et défenseure engagée des communautés, elle a siégé aux commissions parlementaires sur la réduction de la pauvreté, le commerce, l'industrie, le tourisme et les comptes publics. L'honorable Abla Dzifa Gomashie met à profit son expérience créative, politique et diplomatique pour dynamiser les secteurs du tourisme et de la création, stimuler une croissance économique inclusive et renforcer la fierté culturelle ghanéenne.",
    achievements: [
      "Minister of Tourism, Culture and Creative Arts, Republic of Ghana",
      "Member of Parliament for Ketu South constituency (two terms)",
      "Former Deputy Minister for Tourism, Arts and Culture (2013–2017)",
      "Founder and CEO, Values for Life NGO",
      "Creator and producer of the storytelling programme 'By the Fireside'",
      "Award-winning actress and cultural advocate with 30+ years of experience",
      "Queen Mother (Mama Dzramedo) responsible for protocol, Aflao Traditional Area"
    ],
    achievementsFr: [
      "Ministre du Tourisme, de la Culture et des Arts créatifs du Ghana",
      "Députée de la circonscription de Ketu South (deux mandats)",
      "Ancienne vice-ministre du Tourisme, des Arts et de la Culture (2013–2017)",
      "Fondatrice et directrice exécutive de l'ONG Values for Life",
      "Créatrice et productrice du programme « By the Fireside »",
      "Actrice primée et militante culturelle avec plus de 30 ans d'expérience",
      "Reine-mère (Mama Dzramedo) chargée du protocole de la zone traditionnelle d'Aflao"
    ],
    expertise: [
      "Tourism and cultural policy leadership",
      "Creative arts advocacy and programme development",
      "Legislative process and public administration",
      "Community engagement and consensus building",
      "Media production, storytelling, and performance",
      "Youth empowerment through culture and education",
      "Strategic partnerships and stakeholder collaboration"
    ],
    expertiseFr: [
      "Leadership en politiques du tourisme et de la culture",
      "Plaidoyer et développement de programmes pour les arts créatifs",
      "Processus législatif et administration publique",
      "Mobilisation communautaire et construction du consensus",
      "Production audiovisuelle, narration et interprétation",
      "Autonomisation des jeunes par la culture et l'éducation",
      "Partenariats stratégiques et collaboration avec les parties prenantes"
    ],
    education: [
      "MPhil in African Studies, University of Ghana",
      "Bachelor of Fine Arts (First Class Honours), University of Ghana",
      "St. Louis Senior High School, Kumasi"
    ],
    educationFr: [
      "Master of Philosophy en études africaines, Université du Ghana",
      "Bachelor of Fine Arts (mention très bien), Université du Ghana",
      "St. Louis Senior High School, Kumasi"
    ],
    order: 3,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-2',
    name: "Emily Njeri Mburu-Ndoria",
    title: "Director, Trade in Services, Investment, IPR & Digital Trade, AfCFTA Secretariat",
    titleFr: "Directrice, Commerce des Services, Investissement, DPI et Commerce Numérique, Secrétariat ZLECAf",
    image: "/Emily Mburu photo.png",
    bio: "Ms. Emily Njeri Mburu-Ndoria is a senior trade expert with over two decades of experience in international trade negotiations and policy development.",
    bioFr: "Mme Emily Njeri Mburu-Ndoria est une experte commerciale senior avec plus de deux décennies d'expérience dans les négociations commerciales internationales et le développement de politiques.",
    achievements: [
      "Over two decades of experience in international trade negotiations",
      "Technical assistance to developing countries at UNCTAD in Geneva for over ten years",
      "Managed trade in services negotiations at COMESA",
      "Supported private sector development and investment initiatives",
      "Positions at SADC and EAC Secretariats"
    ],
    achievementsFr: [
      "Plus de deux décennies d'expérience dans les négociations commerciales internationales",
      "Assistance technique aux pays en développement à la CNUCED à Genève pendant plus de dix ans",
      "Géré les négociations sur le commerce des services au COMESA",
      "Soutenu le développement du secteur privé et les initiatives d'investissement",
      "Postes aux Secrétariats de la SADC et de l'EAC"
    ],
    expertise: [
      "Trade in Services",
      "Investment",
      "Intellectual Property Rights (IPR)",
      "Digital Trade",
      "Regional Trade Policy"
    ],
    expertiseFr: [
      "Commerce des Services",
      "Investissement",
      "Droits de Propriété Intellectuelle (DPI)",
      "Commerce Numérique",
      "Politique Commerciale Régionale"
    ],
    order: 4,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-3',
    name: "Kwakye Donkor",
    title: "Chief Executive Officer, Africa Tourism Partners (ATP)",
    titleFr: "Directeur Général, Partenaires du Tourisme Africain (ATP)",
    image: "/Kwakye-Donkor.jpg",
    bio: "Kwakye Donkor is the CEO of Africa Tourism Partners (ATP), a Pan African tourism advisory firm and a UN Tourism award-winning firm. He is a renowned Pan-African strategist and expert in areas of tourism development, strategic and destination marketing, destination brand management and MICE (Meetings, Incentives, Conferences and Exhibition/Events). He is a recognised and highly respected personality in Africa tourism space, and speaks at global conferences, seminars and think tank fora. Kwakye has demonstrated expertise in destination master planning as well as strategy formulation and execution, business transactional advisory and leadership development worldwide across education, finance, and hotel development.",
    bioFr: "Kwakye Donkor est le PDG d'Africa Tourism Partners (ATP), un cabinet de conseil en tourisme panafricain et une entreprise primée par l'UN Tourism. Il est un stratège panafricain renommé et expert en développement du tourisme, marketing stratégique et de destination, gestion de marque de destination et MICE (Meetings, Incentives, Conferences and Exhibition/Events). Il est une personnalité reconnue et hautement respectée dans l'espace du tourisme africain, et intervient lors de conférences mondiales, séminaires et forums de groupes de réflexion. Kwakye a démontré son expertise en planification directrice de destination ainsi qu'en formulation et exécution de stratégies, conseil en transactions commerciales et développement du leadership dans le monde entier dans les domaines de l'éducation, de la finance et du développement hôtelier.",
    achievements: [
      "CEO of UN Tourism award-winning Pan African tourism advisory firm ATP",
      "Renowned Pan-African strategist in tourism development",
      "Convenor of the annual Africa Tourism Leadership Forum & Awards",
      "Convenor of Africa MICE Masterclass",
      "Convenor of Africa Youth in Tourism Summit",
      "Convenor of Africa Women in Tourism Summit",
      "Regular panelist on expert panels and think tank fora facilitated by international organizations",
      "Recognition from UN Tourism, AfCFTA, AU, SADC, The World Bank Group, GIZ, BBC, CNBC Africa, Channel Africa, ENCA, SABC"
    ],
    achievementsFr: [
      "PDG du cabinet de conseil en tourisme panafricain ATP primé par l'UN Tourism",
      "Stratège panafricain renommé en développement du tourisme",
      "Organisateur du Forum et des Prix annuels de Leadership du Tourisme Africain",
      "Organisateur de la Masterclass MICE Afrique",
      "Organisateur du Sommet de la Jeunesse Africaine dans le Tourisme",
      "Organisateur du Sommet des Femmes Africaines dans le Tourisme",
      "Paneliste régulier sur des panels d'experts et des forums de groupes de réflexion facilités par des organisations internationales",
      "Reconnaissance de l'UN Tourism, de la ZLECAf, de l'UA, de la SADC, du Groupe de la Banque mondiale, de la GIZ, de la BBC, de CNBC Africa, de Channel Africa, d'ENCA, de la SABC"
    ],
    expertise: [
      "Tourism development",
      "Strategic and destination marketing",
      "Destination brand management",
      "MICE (Meetings, Incentives, Conferences and Exhibition/Events)",
      "Destination master planning",
      "Strategy formulation and execution",
      "Business transactional advisory",
      "Leadership development"
    ],
    expertiseFr: [
      "Développement du tourisme",
      "Marketing stratégique et de destination",
      "Gestion de marque de destination",
      "MICE (Meetings, Incentives, Conferences and Exhibition/Events)",
      "Planification directrice de destination",
      "Formulation et exécution de stratégies",
      "Conseil en transactions commerciales",
      "Développement du leadership"
    ],
    experience: [
      "Tourism development across Africa",
      "Destination marketing and brand management",
      "MICE sector expertise",
      "Education, finance, and hotel development",
      "Global conference speaking and panel participation",
      "Think tank facilitation and expert panels"
    ],
    experienceFr: [
      "Développement du tourisme à travers l'Afrique",
      "Marketing et gestion de marque de destination",
      "Expertise dans le secteur MICE",
      "Développement dans l'éducation, la finance et l'hôtellerie",
      "Interventions lors de conférences mondiales et participation à des panels",
      "Facilitation de groupes de réflexion et panels d'experts"
    ],
    impact: [
      "Recognised and highly respected personality in Africa tourism space",
      "Serves on expert panels facilitated by UN Tourism, AfCFTA, AU, SADC, The World Bank Group, GIZ, BBC, CNBC Africa, Channel Africa, ENCA, SABC",
      "Convenes major African tourism forums and summits",
      "Global thought leader in Pan-African tourism strategy",
      "Contributing to tourism development across the continent"
    ],
    impactFr: [
      "Personnalité reconnue et hautement respectée dans l'espace du tourisme africain",
      "Membre de panels d'experts facilités par l'UN Tourism, la ZLECAf, l'UA, la SADC, le Groupe de la Banque mondiale, la GIZ, la BBC, CNBC Africa, Channel Africa, ENCA, la SABC",
      "Organise les principaux forums et sommets du tourisme africain",
      "Leader d'opinion mondial en stratégie du tourisme panafricain",
      "Contribue au développement du tourisme à travers le continent"
    ],
    order: 5,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-4',
    name: "Rex Owusu Marfo (Rex Omar)",
    title: "Coordinator, Black Star Experience Secretariat, Office of the President, Ghana",
    titleFr: "Coordinateur, Secrétariat de l'Expérience Black Star, Bureau du Président, Ghana",
    image: "/rex-omar.jpg",
    bio: "Rex Omar is the Coordinator of the Black Star Experience Secretariat at the Office of the President of Ghana, where he leads efforts to promote Ghana's creative industries.",
    bioFr: "Rex Omar est le Coordinateur du Secrétariat de l'Expérience Black Star au Bureau du Président du Ghana, où il dirige les efforts pour promouvoir les industries créatives du Ghana.",
    achievements: [
      "Coordinator of Black Star Experience Secretariat",
      "Celebrated Highlife musician and songwriter",
      "Career spanning over three decades",
      "Hit song 'Wodofo Ne Hwan?' in the late 1980s",
      "Member of iconic trio Nakorex",
      "Former Chairman of Ghana Music Rights Organisation (GHAMRO)"
    ],
    achievementsFr: [
      "Coordinateur du Secrétariat de l'Expérience Black Star",
      "Musicien et auteur-compositeur Highlife célèbre",
      "Carrière s'étendant sur plus de trois décennies",
      "Chanson à succès 'Wodofo Ne Hwan?' à la fin des années 1980",
      "Membre du trio emblématique Nakorex",
      "Ancien Président de l'Organisation des Droits Musicaux du Ghana (GHAMRO)"
    ],
    impact: [
      "Cultural ambassador for Ghanaian music",
      "Advocate for musicians' rights",
      "Championed copyright reforms",
      "Better protection for creatives",
      "Advancing Ghana's creative and cultural economy"
    ],
    impactFr: [
      "Ambassadeur culturel de la musique ghanéenne",
      "Défenseur des droits des musiciens",
      "Défendu les réformes du droit d'auteur",
      "Meilleure protection pour les créatifs",
      "Promouvoir l'économie créative et culturelle du Ghana"
    ],
    order: 6,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-5',
    name: "Theresa Oparebea Ayoade",
    title: "CEO & Co-Founder, Charterhouse Productions Ltd | Founder, EMPAG",
    titleFr: "PDG et Co-fondatrice, Charterhouse Productions Ltd | Fondatrice, EMPAG",
    image: "/THERESA.jpg",
    bio: "Theresa Oparebea Ayoade is a distinguished Ghanaian business executive and trailblazing entrepreneur with nearly 30 years of impact in the creative, events, and cultural industries. As the Co-Founder and CEO of Charterhouse Productions Ltd—Ghana's leading creative agency—Theresa has revolutionized event production, brand experiences, and talent development across West Africa. She is the force behind some of the most celebrated platforms in Ghana's entertainment and creative space, including the Ghana Music Awards Festival, Miss Malaika Ghana, A Night of 1000 Laughs, and the National Women's Summit & Expo. Under her leadership, Charterhouse has delivered over 5,000 high-profile events, from global music concerts to corporate summits and international brand activations.\n\nTheresa's influence extends beyond business. She is a passionate advocate for women, youth, and creatives, and works tirelessly to uplift the ecosystem that fuels Africa's cultural and creative economy. Through the Charterhouse Creative Africa Foundation, she champions policy, advocacy, and infrastructure to drive long-term industry growth. She also co-founded Events Resources Ltd, establishing two of Ghana's largest event venues: The Grand Arena and The Palms Convention Center.\n\nHer academic background includes executive education from the Stanford Graduate School of Business and Oxford Saïd Business School, following her foundational studies at Achimota School and the University of Ghana.\n\nTheresa currently serves as Founder and President of EMPAG (Events & Meetings Professionals Association of Ghana), is a Non-Executive Director of the Ghana Heritage Conservation Trust, and previously served on the board of the Ghana Infrastructure Investment Fund. She is also a committed Rotarian and patron of the Royal Seed Orphanage.\n\nTheresa has a zest for life. Her personal philosophy is 'Work hard, Play hard', therefore she balances smart work with a dash of joie de vie. She loves adventure, exotic holidays, entertaining, dancing, wabi sabi moments, and reflecting in beautiful natural landscapes. In her quiet moments she loves to read and binge on Netflix series.\n\nShe is married and is mother to two lovely young adults. Theresa Oparebea Ayoade is not only a titan of industry—she is a mentor, nation-builder, and catalyst for sustainable cultural transformation in Africa.",
    bioFr: "Theresa Oparebea Ayoade est une dirigeante d'entreprise ghanéenne distinguée et une entrepreneure pionnière avec près de 30 ans d'impact dans les industries créatives, événementielles et culturelles. En tant que cofondatrice et PDG de Charterhouse Productions Ltd—principale agence créative du Ghana—Theresa a révolutionné la production d'événements, les expériences de marque et le développement des talents à travers l'Afrique de l'Ouest. Elle est à l'origine de certaines des plateformes les plus célébrées de l'espace culturel et divertissement du Ghana, notamment le Ghana Music Awards Festival, Miss Malaika Ghana, A Night of 1000 Laughs et le National Women's Summit & Expo. Sous sa direction, Charterhouse a livré plus de 5 000 événements de haut niveau, des concerts mondiaux aux sommets d'entreprise et activations de marque internationales.\n\nL'influence de Theresa s'étend au-delà des affaires. Défenseure passionnée des femmes, de la jeunesse et des créatifs, elle travaille sans relâche à renforcer l'écosystème qui alimente l'économie culturelle et créative de l'Afrique. À travers la Charterhouse Creative Africa Foundation, elle porte des actions de politique, de plaidoyer et d'infrastructure pour stimuler la croissance durable du secteur. Elle a également cofondé Events Resources Ltd, établissant deux des plus grands lieux événementiels du Ghana: The Grand Arena et The Palms Convention Center.\n\nSon parcours académique comprend des programmes exécutifs à la Stanford Graduate School of Business et à l'Oxford Saïd Business School, après des études à Achimota School et à l'Université du Ghana.\n\nTheresa est fondatrice et présidente d'EMPAG (Events & Meetings Professionals Association of Ghana), administratrice non exécutive du Ghana Heritage Conservation Trust et a siégé au conseil du Ghana Infrastructure Investment Fund. Elle est également Rotarienne engagée et marraine de l'orphelinat Royal Seed.\n\nAnimée d'une joie de vivre, sa philosophie personnelle est « Work hard, Play hard »: elle associe travail intelligent et plaisir. Elle aime l'aventure, les vacances exotiques, recevoir, danser, savourer des moments wabi-sabi et se ressourcer dans de magnifiques paysages naturels. Dans ses moments de calme, elle lit et regarde des séries sur Netflix.\n\nMariée et mère de deux jeunes adultes, Theresa Oparebea Ayoade est plus qu'une figure de l'industrie: elle est une mentore, une bâtisseuse de nation et un catalyseur de transformation culturelle durable en Afrique.",
    achievements: [
      "Co-Founder and CEO of Charterhouse Productions Ltd, Ghana's leading creative agency",
      "Visionary producer behind the Ghana Music Awards Festival, Miss Malaika Ghana, A Night of 1000 Laughs, and the National Women's Summit & Expo",
      "Delivered more than 5,000 large-scale events, concerts, corporate summits, and brand activations across West Africa",
      "Co-founded Events Resources Ltd, establishing The Grand Arena and The Palms Convention Center",
      "Founder and President of the Events & Meetings Professionals Association of Ghana (EMPAG)",
      "Founder of Charterhouse Creative Africa Foundation driving policy, advocacy, and infrastructure for the creative economy",
      "Non-Executive Director of the Ghana Heritage Conservation Trust and former board member of the Ghana Infrastructure Investment Fund",
      "Rotarian, patron of the Royal Seed Orphanage, and mentor to emerging creative leaders"
    ],
    achievementsFr: [
      "Co-fondatrice et PDG de Charterhouse Productions Ltd, principale agence créative du Ghana",
      "Productrice visionnaire du Ghana Music Awards Festival, Miss Malaika Ghana, A Night of 1000 Laughs et du National Women's Summit & Expo",
      "Plus de 5 000 événements d'envergure, concerts, sommets d'entreprise et activations de marque livrés à travers l'Afrique de l'Ouest",
      "Co-fondé Events Resources Ltd, établissant The Grand Arena et The Palms Convention Center",
      "Fondatrice et Présidente de l'Events & Meetings Professionals Association of Ghana (EMPAG)",
      "Fondatrice de la Charterhouse Creative Africa Foundation promouvant politiques, plaidoyer et infrastructures pour l'économie créative",
      "Administratrice non exécutive du Ghana Heritage Conservation Trust et ancienne membre du conseil du Ghana Infrastructure Investment Fund",
      "Rotarienne, marraine du Royal Seed Orphanage et mentore des leaders créatifs émergents"
    ],
    expertise: [
      "Event production and experience design",
      "Creative industry leadership",
      "Brand activations and strategic partnerships",
      "Talent development and mentorship",
      "Women and youth empowerment",
      "Creative economy policy advocacy",
      "Infrastructure development for cultural venues"
    ],
    expertiseFr: [
      "Production d'événements et conception d'expériences",
      "Leadership de l'industrie créative",
      "Activations de marque et partenariats stratégiques",
      "Développement et mentorat des talents",
      "Autonomisation des femmes et des jeunes",
      "Plaidoyer pour la politique de l'économie créative",
      "Développement d'infrastructures pour les lieux culturels"
    ],
    impact: [
      "Catalyzing sustainable growth of Ghana's creative and cultural industries",
      "Creating flagship platforms that spotlight African talent and storytelling",
      "Driving ecosystem development through advocacy, policy reform, and infrastructure",
      "Championing inclusive opportunities for women, youth, and creatives across Africa",
      "Mentoring the next generation of creative entrepreneurs and industry leaders",
      "Balancing business excellence with community impact and philanthropy"
    ],
    impactFr: [
      "Catalyser la croissance durable des industries créatives et culturelles du Ghana",
      "Créer des plateformes phares mettant en lumière les talents et récits africains",
      "Développer l'écosystème par le plaidoyer, la réforme des politiques et l'infrastructure",
      "Défendre des opportunités inclusives pour les femmes, les jeunes et les créatifs à travers l'Afrique",
      "Accompagner la prochaine génération d'entrepreneurs et de leaders créatifs",
      "Allier excellence commerciale, impact communautaire et philanthropie"
    ],
    education: [
      "Executive Education, Stanford Graduate School of Business",
      "Executive Education, Oxford Saïd Business School",
      "University of Ghana",
      "Achimota School"
    ],
    educationFr: [
      "Formation exécutive, Stanford Graduate School of Business",
      "Formation exécutive, Oxford Saïd Business School",
      "Université du Ghana",
      "Achimota School"
    ],
    order: 7,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-6',
    name: "Tshifhiwa Tshivhengwa",
    title: "CEO, Tourism Business Council of South Africa & Co-Chair, Africa Tourism Private Sector Alliance",
    titleFr: "PDG, Tourism Business Council of South Africa & Coprésident, Africa Tourism Private Sector Alliance",
    image: "/Tshifhiwa.jpeg",
    bio: "Tshifhiwa Tshivhengwa is the Chief Executive Officer of the Tourism Business Council of South Africa and the Co-Chairperson of the Africa Tourism Private Sector Alliance. A strategic, versatile, and innovative marketing, tourism, communications, and business executive, he has more than 20 years of experience with a track record of visionary leadership, strategic project development and execution, travel and tourism events management, and communications. Tshifhiwa holds an MSc in International Business, Leadership, and Management from the University of York, a Bachelor of Business Administration in Marketing Communications and a Diploma in Marketing from the Institute of Marketing Management, and a National Diploma in Tourism Management from the University of Johannesburg.\n\nIn the two decades since his first foray into the world of work, Tshifhiwa has served across the tourism value chain with organizations including South African Tourism, Myriad Marketing, FEDHASA, Rennies Travel, SARS, and others, while also consulting for a range of companies. He has been a member of the Tourism Transformation Council, the Tourism Grading Council of South Africa, and currently serves on the global Board of Advisors for The Sigmund Project, which supports innovation and collaboration in tourism worldwide.\n\nA respected thought leader and advocate for South African tourism, Tshifhiwa regularly writes, debates, and comments on tourism development and growth across South Africa and the African continent.",
    bioFr: "Tshifhiwa Tshivhengwa est le directeur général du Tourism Business Council of South Africa et coprésident de l'Africa Tourism Private Sector Alliance. Cadre stratégique, polyvalent et innovant dans le marketing, le tourisme, la communication et les affaires, il cumule plus de 20 ans d'expérience avec un bilan de leadership visionnaire, de développement et d'exécution de projets stratégiques, de gestion d'événements de voyage et de tourisme, et de communication. Tshifhiwa est titulaire d'un MSc en commerce international, leadership et management (Université de York), d'un Bachelor of Business Administration en marketing et communication et d'un diplôme en marketing (Institute of Marketing Management), ainsi que d'un diplôme national en gestion du tourisme (Université de Johannesburg).\n\nDepuis son entrée dans le monde professionnel, il a travaillé tout au long de la chaîne de valeur du tourisme avec des organisations telles que South African Tourism, Myriad Marketing, FEDHASA, Rennies Travel, SARS et d'autres, tout en conseillant diverses entreprises. Il a siégé au Tourism Transformation Council et au Tourism Grading Council of South Africa, et siège actuellement au conseil consultatif mondial de The Sigmund Project, qui soutient l'innovation et la collaboration dans le tourisme à l'échelle mondiale.\n\nLeader d'opinion respecté et défenseur du tourisme sud-africain, Tshifhiwa écrit, débat et intervient régulièrement sur le développement et la croissance du tourisme en Afrique du Sud et sur le continent.",
    achievements: [
      "Chief Executive Officer of the Tourism Business Council of South Africa",
      "Co-Chairperson of the Africa Tourism Private Sector Alliance",
      "More than 20 years of leadership across marketing, tourism, communications, and business strategy",
      "Career experience with South African Tourism, Myriad Marketing, FEDHASA, Rennies Travel, SARS, and other tourism value chain organisations",
      "Member of the Tourism Transformation Council and the Tourism Grading Council of South Africa",
      "Global Board of Advisors member for The Sigmund Project supporting tourism innovation",
      "Trusted advisor and consultant to companies across the tourism sector",
      "Recognised thought leader and spokesperson for South African tourism growth"
    ],
    achievementsFr: [
      "Directeur général du Tourism Business Council of South Africa",
      "Coprésident de l'Africa Tourism Private Sector Alliance",
      "Plus de 20 ans de leadership dans le marketing, le tourisme, la communication et la stratégie d'affaires",
      "Expérience au sein de South African Tourism, Myriad Marketing, FEDHASA, Rennies Travel, SARS et d'autres organisations de la chaîne de valeur touristique",
      "Membre du Tourism Transformation Council et du Tourism Grading Council of South Africa",
      "Membre du conseil consultatif mondial de The Sigmund Project soutenant l'innovation touristique",
      "Conseiller de confiance pour des entreprises à travers le secteur touristique",
      "Leader d'opinion reconnu et porte-parole de la croissance du tourisme sud-africain"
    ],
    expertise: [
      "Tourism strategy and policy",
      "Destination marketing and promotion",
      "Stakeholder engagement and advocacy",
      "Travel and hospitality operations",
      "Business development and partnerships",
      "Events and tourism project management",
      "Thought leadership and media engagement"
    ],
    expertiseFr: [
      "Stratégie et politique touristiques",
      "Marketing et promotion de destinations",
      "Mobilisation des parties prenantes et plaidoyer",
      "Opérations de voyage et d'hôtellerie",
      "Développement des affaires et partenariats",
      "Gestion de projets et d'événements touristiques",
      "Leadership d'opinion et engagements médiatiques"
    ],
    education: [
      "MSc in International Business, Leadership, and Management, University of York",
      "Bachelor of Business Administration in Marketing Communications, Institute of Marketing Management",
      "Diploma in Marketing, Institute of Marketing Management",
      "National Diploma in Tourism Management, University of Johannesburg"
    ],
    educationFr: [
      "MSc en commerce international, leadership et management, Université de York",
      "Bachelor of Business Administration en marketing et communication, Institute of Marketing Management",
      "Diplôme en marketing, Institute of Marketing Management",
      "Diplôme national en gestion du tourisme, Université de Johannesburg"
    ],
    impact: [
      "Championing tourism development and transformation in South Africa",
      "Driving collaboration across the African tourism private sector",
      "Shaping national discourse on tourism recovery and growth",
      "Mentoring emerging leaders in travel and hospitality",
      "Amplifying Africa's tourism brand through global advocacy"
    ],
    impactFr: [
      "Promouvoir le développement et la transformation du tourisme en Afrique du Sud",
      "Stimuler la collaboration au sein du secteur privé touristique africain",
      "Influencer le discours national sur la reprise et la croissance du tourisme",
      "Mentorer les futurs leaders du voyage et de l'hôtellerie",
      "Amplifier la marque touristique de l'Afrique grâce au plaidoyer mondial"
    ],
    order: 18,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-7',
    name: "Khadijat El-Alawa",
    title: "Head of Music & Talent, Culture Management Group & AfroFuture | Co-Founder, The Cheer Natives Ltd",
    titleFr: "Responsable Musique & Talents, Culture Management Group & AfroFuture | Cofondatrice, The Cheer Natives Ltd",
    image: "/Khadijat.jpeg",
    bio: "Khadijat El-Alawa is a dynamic Ghanaian executive with multidisciplinary experience across music, food manufacturing, media, and FMCG distribution. At Universal Music Group she built expertise in artist development, A&R, and international music marketing, contributing to the growth and global visibility of African artists.\n\nAs the Head of Music & Talent at Culture Management Group and AfroFuture—Africa's biggest festival—Khadijat leads all music-related programming, curating the performance lineup and overseeing artist relations, programming, and talent strategy. Her work shapes the sound and cultural influence of contemporary African music.\n\nShe also leads The Continent Live, a music incubator and boutique label that develops emerging artists, produces live experiences, and creates original content across Africa and the diaspora.\n\nBeyond entertainment, Khadijat is the Co-Founder of The Cheer Natives Ltd, producers of Cheer Up Iced Tea, where she drives brand strategy, manufacturing innovation, and creative marketing.\n\nHer career reflects a unique blend of creativity and strategic leadership—driving impact across industries while championing African excellence, youth empowerment, and sustainable growth.",
    bioFr: "Khadijat El-Alawa est une dirigeante ghanéenne dynamique dotée d'une expérience multidisciplinaire dans la musique, l'industrie alimentaire, les médias et la distribution FMCG. Chez Universal Music Group, elle a acquis une expertise en développement d'artistes, A&R et marketing musical international, contribuant à la croissance et à la visibilité mondiale des artistes africains.\n\nEn tant que Head of Music & Talent de Culture Management Group et d'AfroFuture—le plus grand festival d'Afrique—Khadijat pilote toute la programmation musicale, la conception des line-ups et la stratégie talents. Son travail façonne le son et l'influence culturelle de la musique africaine contemporaine.\n\nElle dirige également The Continent Live, incubateur musical et label boutique qui accompagne les artistes émergents, produit des expériences live et crée des contenus originaux à travers l'Afrique et la diaspora.\n\nAu-delà du divertissement, Khadijat est cofondatrice de The Cheer Natives Ltd, producteurs de Cheer Up Iced Tea, où elle impulse stratégie de marque, innovation industrielle et marketing créatif.\n\nSa carrière illustre l'alliance entre créativité et leadership stratégique, générant de l'impact dans plusieurs secteurs tout en célébrant l'excellence africaine, l'autonomisation de la jeunesse et une croissance durable.",
    achievements: [
      "Head of Music & Talent for Culture Management Group and AfroFuture",
      "Built artist development, A&R, and music marketing expertise at Universal Music Group",
      "Leads The Continent Live, a music incubator and boutique label for emerging artists",
      "Co-Founder of The Cheer Natives Ltd, producers of Cheer Up Iced Tea",
      "Architect of AfroFuture's performance programming and talent strategy",
      "Bridges music, media, and consumer brands across Africa and the diaspora"
    ],
    achievementsFr: [
      "Responsable Musique & Talents pour Culture Management Group et AfroFuture",
      "Expertise en développement d'artistes, A&R et marketing musical acquise chez Universal Music Group",
      "Dirige The Continent Live, incubateur musical et label boutique pour artistes émergents",
      "Cofondatrice de The Cheer Natives Ltd, producteurs de Cheer Up Iced Tea",
      "Architecte de la programmation et de la stratégie talents d'AfroFuture",
      "Relie musique, médias et marques grand public à travers l'Afrique et la diaspora"
    ],
    expertise: [
      "Artist development and A&R",
      "Music programming and festival curation",
      "Talent strategy and relations",
      "Creative entrepreneurship",
      "Brand and product innovation",
      "Cross-industry partnerships"
    ],
    expertiseFr: [
      "Développement d'artistes et A&R",
      "Programmation musicale et curation de festivals",
      "Stratégie et relations talents",
      "Entrepreneuriat créatif",
      "Innovation de marque et de produit",
      "Partenariats intersectoriels"
    ],
    impact: [
      "Advancing contemporary African music and culture on global stages",
      "Empowering emerging artists through incubation and live experiences",
      "Championing youth-led creative entrepreneurship",
      "Designing immersive festival experiences that celebrate African excellence",
      "Driving innovation at the intersection of music, media, and FMCG"
    ],
    impactFr: [
      "Faire progresser la musique et la culture africaine contemporaines sur les scènes mondiales",
      "Autonomiser les artistes émergents grâce à l'incubation et aux expériences live",
      "Promouvoir l'entrepreneuriat créatif porté par la jeunesse",
      "Concevoir des expériences de festival immersives célébrant l'excellence africaine",
      "Stimuler l'innovation à l'intersection de la musique, des médias et des FMCG"
    ],
    order: 7,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-8',
    name: "Kefa Hussein Igilo",
    title: "Award-Winning Tanzanian Filmmaker, Producer & Screenwriter",
    titleFr: "Cinéaste, Producteur et Scénariste Tanzanien Primé",
    image: "/kefaz.jpeg",
    bio: "Kefa Hussein Igilo is an award-winning Tanzanian filmmaker, producer, and screenwriter celebrated for his creative brilliance and powerful storytelling. A proud alumnus of the MultiChoice Talent Factory (MTF) East Africa Class of 2020, Kefa discovered his passion for storytelling at the age of nine and has since risen to become one of Tanzania's most influential creative voices. Holding a degree in Film and Television, he honed his craft on popular East African telenovelas such as Selina and Kina as an intern writer during his MTF training.\n\nHis exceptional talent earned him the Nihilent Award for Screenwriting, leading to an eight-week internship in India contributing to the M-Net animation series Jay Jay. He now serves as a Producer, Director, and News Anchor at Tanzania Broadcasting Corporation (TBC) and collaborates with international organisations including BBC Media Action and Ubongo Kids as a script consultant and translator.\n\nKefa's debut feature film, Still Okay To (commissioned by M-Net), won several local awards and the Best International Film award at Kenya's Kalasha Film and Television Awards. His second feature, Love Transfusion, earned multiple accolades including Best Screenplay and a nomination for Best Indigenous M-Net Movie at the 10th Africa Magic Viewers' Choice Awards (AMVCA). In 2025, his hit reality show Wa Milele? won the AMVCA for Best Original Reality Series in Africa, cementing his status as a visionary storyteller championing Tanzanian narratives.",
    bioFr: "Kefa Hussein Igilo est un cinéaste, producteur et scénariste tanzanien primé, célébré pour son génie créatif et sa narration puissante. Fier ancien élève de la MultiChoice Talent Factory (MTF) Afrique de l'Est, promotion 2020, Kefa a découvert sa passion pour la narration à l'âge de neuf ans et est depuis devenu l'une des voix créatives les plus influentes de Tanzanie. Titulaire d'un diplôme en cinéma et télévision, il a affiné son art sur des telenovelas populaires d'Afrique de l'Est telles que Selina et Kina en tant qu'écrivain stagiaire pendant sa formation MTF.\n\nSon talent exceptionnel lui a valu le Nihilent Award for Screenwriting, suivi d'un stage de huit semaines en Inde pour contribuer à la série d'animation M-Net Jay Jay. Il est aujourd'hui producteur, réalisateur et présentateur de nouvelles à la Tanzania Broadcasting Corporation (TBC) et collabore avec des organisations internationales telles que BBC Media Action et Ubongo Kids en tant que consultant et traducteur de scripts.\n\nLe premier long métrage de Kefa, Still Okay To (commandé par M-Net), a remporté plusieurs prix locaux ainsi que le prix du meilleur film international aux Kalasha Film and Television Awards du Kenya. Son deuxième long métrage, Love Transfusion, a reçu de multiples distinctions, dont le prix du meilleur scénario et une nomination pour le meilleur film autochtone M-Net aux 10e Africa Magic Viewers' Choice Awards (AMVCA). En 2025, son émission de téléréalité Wa Milele? a remporté l'AMVCA du meilleur programme de téléréalité original en Afrique, confirmant son statut de conteur visionnaire défendant les récits tanzaniens.",
    achievements: [
      "Award-winning Tanzanian filmmaker, producer, and screenwriter",
      "MultiChoice Talent Factory (MTF) East Africa Class of 2020 alumnus",
      "Nihilent Award for Screenwriting recipient with an eight-week internship in India for M-Net's Jay Jay",
      "Producer, Director, and News Anchor at Tanzania Broadcasting Corporation (TBC)",
      "Collaborator with BBC Media Action and Ubongo Kids as script consultant and translator",
      "Still Okay To (commissioned by M-Net) winner of Best International Film at Kenya's Kalasha Film and Television Awards",
      "Love Transfusion winner of multiple accolades including Best Screenplay and AMVCA nomination for Best Indigenous M-Net Movie",
      "Wa Milele? winner of the 2025 AMVCA Best Original Reality Series in Africa"
    ],
    achievementsFr: [
      "Cinéaste, producteur et scénariste tanzanien primé",
      "Ancien élève de la MultiChoice Talent Factory (MTF) Afrique de l'Est, promotion 2020",
      "Lauréat du Nihilent Award for Screenwriting avec un stage de huit semaines en Inde pour Jay Jay de M-Net",
      "Producteur, réalisateur et présentateur de nouvelles à la Tanzania Broadcasting Corporation (TBC)",
      "Collaborateur de BBC Media Action et Ubongo Kids en tant que consultant et traducteur de scripts",
      "Still Okay To (commandé par M-Net) lauréat du meilleur film international aux Kalasha Film and Television Awards du Kenya",
      "Love Transfusion lauréat de multiples distinctions, dont le meilleur scénario et une nomination AMVCA pour le meilleur film autochtone M-Net",
      "Wa Milele? lauréat du prix 2025 AMVCA du meilleur programme de téléréalité original en Afrique"
    ],
    experience: [
      "Film and television production",
      "Screenwriting and script development",
      "Reality television production",
      "News anchoring and broadcasting",
      "International collaboration and consulting"
    ],
    experienceFr: [
      "Production cinématographique et télévisuelle",
      "Scénarisation et développement de scripts",
      "Production de téléréalité",
      "Présentation de nouvelles et diffusion",
      "Collaboration et conseil internationaux"
    ],
    impact: [
      "One of Tanzania's most influential creative voices",
      "Championing Tanzanian storytelling through award-winning films and series",
      "Developing cross-continental collaborations for African media",
      "Inspiring emerging storytellers through mentorship and visibility",
      "Driving innovation in East African film and television"
    ],
    impactFr: [
      "L'une des voix créatives les plus influentes de Tanzanie",
      "Défendre la narration tanzanienne grâce à des films et séries primés",
      "Développer des collaborations transcontinentales pour les médias africains",
      "Inspirer les jeunes conteurs grâce au mentorat et à la visibilité",
      "Stimuler l'innovation dans le cinéma et la télévision en Afrique de l'Est"
    ],
    education: [
      "Film and Television degree",
      "MultiChoice Talent Factory (MTF) East Africa Class of 2020"
    ],
    educationFr: [
      "Diplôme en cinéma et télévision",
      "MultiChoice Talent Factory (MTF) Afrique de l'Est, promotion 2020"
    ],
    order: 8,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-9',
    name: "Johanna Kouzmine-Karavaïeff",
    title: "International Expert in Creative Economy Policy & Governance",
    titleFr: "Experte Internationale en Politique et Gouvernance de l'Économie Créative",
    image: "/Johan.jpg",
    bio: "Johanna Kouzmine-Karavaïeff is an international expert in creative economy policy, governance, and CCI innovation. Equally she is a board member of Africa Creatives Alliance. With 20+ years across Europe, Africa, the Americas, the Middle East, and Asia, she advises governments and multilateral bodies on culture-driven development, policy reform, and ecosystem connectivity. This year she has authored a study on creative economy for the AfDB.",
    bioFr: "Johanna Kouzmine-Karavaïeff est une experte internationale en politique et gouvernance de l'économie créative, ainsi qu'en innovation CCI. Elle est également membre du conseil d'administration d'Africa Creatives Alliance. Avec plus de 20 ans d'expérience en Europe, Afrique, Amériques, Moyen-Orient et Asie, elle conseille les gouvernements et les organisations multilatérales sur le développement axé sur la culture, la réforme des politiques et la connectivité des écosystèmes. Cette année, elle a rédigé une étude sur l'économie créative pour la BAD.",
    achievements: [
      "International expert in creative economy policy, governance, and CCI innovation",
      "Board member of Africa Creatives Alliance",
      "20+ years of international experience across Europe, Africa, the Americas, the Middle East, and Asia",
      "Author of creative economy study for the African Development Bank (AfDB)",
      "Advisor to governments and multilateral bodies on culture-driven development"
    ],
    achievementsFr: [
      "Experte internationale en politique et gouvernance de l'économie créative et innovation CCI",
      "Membre du conseil d'administration d'Africa Creatives Alliance",
      "Plus de 20 ans d'expérience internationale en Europe, Afrique, Amériques, Moyen-Orient et Asie",
      "Auteure d'une étude sur l'économie créative pour la Banque Africaine de Développement (BAD)",
      "Conseillère auprès des gouvernements et organisations multilatérales sur le développement axé sur la culture"
    ],
    expertise: [
      "Creative economy policy",
      "Governance and CCI innovation",
      "Culture-driven development",
      "Policy reform",
      "Ecosystem connectivity",
      "International development"
    ],
    expertiseFr: [
      "Politique de l'économie créative",
      "Gouvernance et innovation CCI",
      "Développement axé sur la culture",
      "Réforme des politiques",
      "Connectivité des écosystèmes",
      "Développement international"
    ],
    experience: [
      "Government advisory services",
      "Multilateral body consultation",
      "Policy development and reform",
      "Creative and cultural industries (CCI)",
      "Cross-regional expertise"
    ],
    experienceFr: [
      "Services de conseil gouvernemental",
      "Consultation auprès d'organisations multilatérales",
      "Développement et réforme des politiques",
      "Industries créatives et culturelles (ICC)",
      "Expertise inter-régionale"
    ],
    impact: [
      "Advancing creative economy policies across multiple continents",
      "Contributing to Africa Creatives Alliance strategic direction",
      "Informing development bank strategies through research and analysis",
      "Building ecosystem connectivity for creative industries",
      "Supporting policy reform initiatives worldwide"
    ],
    impactFr: [
      "Promouvoir les politiques d'économie créative sur plusieurs continents",
      "Contribuer à l'orientation stratégique d'Africa Creatives Alliance",
      "Informer les stratégies des banques de développement grâce à la recherche et à l'analyse",
      "Renforcer la connectivité des écosystèmes pour les industries créatives",
      "Soutenir les initiatives de réforme des politiques dans le monde entier"
    ],
    order: 9,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-10',
    name: "Joel 'Kachi Benson",
    title: "Emmy Award-Winning Documentary Filmmaker",
    titleFr: "Documentariste Primé aux Emmy Awards",
    image: "/Joel-Kachi-Benson.jpg",
    bio: "JOEL 'KACHI BENSON is an Emmy award-winning documentary filmmaker whose work sits at the intersection of storytelling and social impact. He uses both traditional 2D formats and immersive VR technology to tell human-centered stories across Nigeria and Africa, and is recognized as a pioneer in the use of Virtual Reality for storytelling in Nigeria.\n\nHis VR film Daughters of Chibok won the Venice Lion for Best Immersive Story at the 76th Venice Film Festival, making him the first African to receive the award in that category. In 2021 he was selected to co-direct the Disney Original documentary MADU, which went on to win Outstanding Arts & Culture Documentary at the 2025 News & Documentary Emmys—making Benson the first Nigerian to earn this honour in documentary filmmaking.\n\nHis latest film, Mothers of Chibok, continues to tour the global festival circuit, winning the Al Jazeera Award for Best African Documentary Feature at the 2025 Encounters South Africa International Film Festival and the Special Mention Jury Prize at the Afrika Film Festival in Cologne, Germany.\n\nKachi Benson is a firm believer in storytelling as a catalyst for positive change. He has shared his practice through lectures at the Pan-Atlantic University in Lagos, the American University of Nigeria in Yola, the University of Lagos, Morgan State University's School of Global Journalism and Communication, Oxford University, and the Biennale College Cinema's Virtual Reality Program in Venice, Italy. Learn more at www.kachibenson.com or connect via kachi.benson@jbmultimediagroup.com.",
    bioFr: "JOEL 'KACHI BENSON est un documentariste primé aux Emmy Awards dont le travail se situe à l'intersection de la narration et de l'impact social. Il utilise à la fois les formats 2D traditionnels et la technologie VR immersive pour raconter des histoires centrées sur l'humain à travers le Nigeria et l'Afrique, et est reconnu comme un pionnier de l'utilisation de la réalité virtuelle pour la narration au Nigeria.\n\nSon film VR Daughters of Chibok a remporté le Lion de Venise de la meilleure histoire immersive au 76e Festival du Film de Venise, faisant de lui le premier Africain à recevoir cette distinction. En 2021, il a été sélectionné pour co-réaliser le documentaire original de Disney MADU, qui a remporté le prix du documentaire exceptionnel Arts & Culture aux Emmy Awards 2025 de l'actualité et du documentaire—faisant de Benson le premier Nigérian à obtenir cet honneur en documentaire.\n\nSon dernier film, Mothers of Chibok, poursuit sa tournée sur le circuit mondial des festivals, remportant le Al Jazeera Award du meilleur documentaire africain au Encounters South Africa International Film Festival 2025 et la Mention spéciale du jury au Afrika Film Festival de Cologne, en Allemagne.\n\nKachi Benson croit fermement que la narration est un catalyseur de changement positif. Il a partagé son expérience lors de conférences à la Pan-Atlantic University de Lagos, à l'American University of Nigeria à Yola, à l'Université de Lagos, à la School of Global Journalism and Communication de Morgan State University, à l'Université d'Oxford et au programme de réalité virtuelle de la Biennale College Cinema à Venise, en Italie. Plus d'informations: www.kachibenson.com ou kachi.benson@jbmultimediagroup.com.",
    achievements: [
      "Emmy award-winning documentary filmmaker and pioneer of VR storytelling in Nigeria",
      "First African to win the Venice Lion for Best Immersive Story with Daughters of Chibok",
      "Co-directed Disney Original documentary MADU, winner of Outstanding Arts & Culture Documentary at the 2025 News & Documentary Emmys",
      "First Nigerian to receive an Emmy honour in documentary filmmaking",
      "Mothers of Chibok winner of the Al Jazeera Award for Best African Documentary Feature at Encounters South Africa International Film Festival 2025",
      "Mothers of Chibok recipient of the Special Mention Jury Prize at Afrika Film Festival Cologne"
    ],
    achievementsFr: [
      "Documentariste primé aux Emmy Awards et pionnier de la narration VR au Nigeria",
      "Premier Africain à remporter le Lion de Venise de la meilleure histoire immersive avec Daughters of Chibok",
      "Co-réalisateur du documentaire original Disney MADU, lauréat du prix du documentaire Arts & Culture aux Emmy Awards 2025",
      "Premier Nigérian à recevoir un honneur Emmy en documentaire",
      "Mothers of Chibok lauréat du Al Jazeera Award du meilleur documentaire africain au Encounters South Africa International Film Festival 2025",
      "Mothers of Chibok lauréat de la Mention spéciale du jury au Afrika Film Festival de Cologne"
    ],
    experience: [
      "Documentary filmmaking",
      "Virtual Reality storytelling",
      "Immersive narrative experiences",
      "Social impact storytelling",
      "2D and VR film production",
      "Public speaking and lecturing"
    ],
    experienceFr: [
      "Réalisation de documentaires",
      "Narration en réalité virtuelle",
      "Expériences narratives immersives",
      "Narration à impact social",
      "Production de films 2D et VR",
      "Prises de parole et conférences"
    ],
    impact: [
      "Pioneering Virtual Reality storytelling for social impact in Africa",
      "Amplifying human-centred narratives on global platforms",
      "Mentoring creatives through workshops and lectures on immersive media",
      "Highlighting African stories at the intersection of technology and empathy",
      "Collaborating with international partners to expand documentary reach"
    ],
    impactFr: [
      "Pionnier de la narration en réalité virtuelle à impact social en Afrique",
      "Amplifier des récits centrés sur l'humain sur des plateformes mondiales",
      "Mentorer les créatifs grâce à des ateliers et conférences sur les médias immersifs",
      "Mettre en lumière des histoires africaines à l'intersection de la technologie et de l'empathie",
      "Collaborer avec des partenaires internationaux pour étendre la portée du documentaire"
    ],
    order: 10,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-11',
    name: "Rita Ngenzi",
    title: "Founding Director, Africa Creatives Alliance (ACA)",
    titleFr: "Directrice Fondatrice, Africa Creatives Alliance (ACA)",
    image: "/Rita.png",
    bio: "Rita Ngenzi is an innovation strategist and ecosystem builder who has supported multinational innovation and entrepreneurship interventions across Africa, designing and scaling programmes that foster talent, enterprise growth, and investment readiness. She is the Founding Director of the Africa Creatives Alliance (ACA), a Pan-African network advancing the continent's creative economy through cross-border collaboration, enterprise development, and ecosystem strengthening. At ACA, Rita positions creative intermediaries—hubs, incubators, and makerspaces—as catalysts for talent, production, and commercialization, enabling African creators and enterprises to access regional markets, mobilize investment, and build sustainable value chains that drive economic growth and global competitiveness.",
    bioFr: "Rita Ngenzi est une stratège de l'innovation et bâtisseuse d'écosystèmes qui a accompagné des interventions multinationales en innovation et entrepreneuriat à travers l'Afrique, en concevant et en déployant des programmes qui favorisent les talents, la croissance des entreprises et la préparation à l'investissement. Elle est la directrice fondatrice de l'Africa Creatives Alliance (ACA), un réseau panafricain qui fait progresser l'économie créative du continent par la collaboration transfrontalière, le développement des entreprises et le renforcement des écosystèmes. Au sein de l'ACA, Rita positionne les intermédiaires créatifs—hubs, incubateurs et makerspaces—comme catalyseurs de talents, de production et de commercialisation, permettant aux créateurs et entreprises africains d'accéder aux marchés régionaux, de mobiliser des investissements et de bâtir des chaînes de valeur durables qui stimulent la croissance économique et la compétitivité mondiale.",
    achievements: [
      "Founding Director of the Africa Creatives Alliance (ACA)",
      "Designed and scaled innovation and entrepreneurship programmes across Africa",
      "Positions creative intermediaries as catalysts for talent, production, and commercialization",
      "Champions cross-border collaboration and ecosystem strengthening for creative enterprises",
      "Mobilises investment readiness and market access for creative businesses"
    ],
    achievementsFr: [
      "Directrice fondatrice de l'Africa Creatives Alliance (ACA)",
      "Conception et déploiement de programmes d'innovation et d'entrepreneuriat à travers l'Afrique",
      "Positionnement des intermédiaires créatifs comme catalyseurs de talents, de production et de commercialisation",
      "Promotion de la collaboration transfrontalière et du renforcement des écosystèmes pour les entreprises créatives",
      "Mobilisation de la préparation à l'investissement et de l'accès au marché pour les entreprises créatives"
    ],
    expertise: [
      "Innovation strategy and ecosystem design",
      "Creative economy programme development",
      "Cross-border collaboration and partnerships",
      "Enterprise development and acceleration",
      "Investment readiness and capital mobilisation",
      "Policy advocacy for creative sectors"
    ],
    expertiseFr: [
      "Stratégie d'innovation et conception d'écosystèmes",
      "Développement de programmes pour l'économie créative",
      "Collaboration et partenariats transfrontaliers",
      "Développement et accélération des entreprises",
      "Préparation à l'investissement et mobilisation de capitaux",
      "Plaidoyer pour les secteurs créatifs"
    ],
    impact: [
      "Advancing Africa's creative economy through networked collaboration",
      "Strengthening intermediaries that support talent, production, and commercialization",
      "Empowering creative enterprises to access regional markets and investment",
      "Building sustainable value chains that drive inclusive economic growth",
      "Championing ecosystem approaches that position creatives at the heart of development"
    ],
    impactFr: [
      "Faire progresser l'économie créative africaine grâce à une collaboration en réseau",
      "Renforcer les intermédiaires qui soutiennent les talents, la production et la commercialisation",
      "Permettre aux entreprises créatives d'accéder aux marchés régionaux et aux investissements",
      "Construire des chaînes de valeur durables qui stimulent une croissance économique inclusive",
      "Promouvoir des approches écosystémiques plaçant les créatifs au cœur du développement"
    ],
    order: 11,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-12',
    name: "Taye Balogun",
    title: "Film Director, Educator & International Development Practitioner",
    titleFr: "Réalisateur, Éducateur et Praticien du Développement International",
    image: "/TAYE-BALOGUN.png",
    bio: "Taye Balogun is a Film Director, Educator and an international development practitioner. He has worked on several film projects in Africa, Europe, Australia, and North America. Taye has consulted for several United Nations agencies such as UNDP, OHCHR, UNHCR, and UNESCO; the African Union and several International organizations such as Oxfam International, Action Aid, Amnesty International, Crisis Action, Christian Aid, Save The Children amongst others. He has led successful campaigns and advocacy initiatives on Peace & Security, Climate change, Gender, Education, Good governance, SGBV and quality health.",
    bioFr: "Taye Balogun est un réalisateur, éducateur et praticien du développement international. Il a travaillé sur plusieurs projets cinématographiques en Afrique, en Europe, en Australie et en Amérique du Nord. Taye a consulté pour plusieurs agences des Nations Unies telles que le PNUD, le HCDH, le HCR et l'UNESCO; l'Union Africaine et plusieurs organisations internationales telles qu'Oxfam International, Action Aid, Amnesty International, Crisis Action, Christian Aid, Save The Children parmi d'autres. Il a dirigé avec succès des campagnes et des initiatives de plaidoyer sur la paix et la sécurité, le changement climatique, le genre, l'éducation, la bonne gouvernance, les VSBG et la santé de qualité.",
    achievements: [
      "Film Director, Educator and international development practitioner",
      "Worked on film projects across Africa, Europe, Australia, and North America",
      "Consulted for UN agencies: UNDP, OHCHR, UNHCR, and UNESCO",
      "Consulted for African Union and international organizations including Oxfam International, Action Aid, Amnesty International, Crisis Action, Christian Aid, Save The Children",
      "TEDx speaker and alumni of Unleash",
      "Visiting professor at Harvard, Howard, and Georgetown universities (USA), Rome University of Fine Arts (Italy), Monash and Deakin Universities (Australia)",
      "Founder of The CARROT Co. and The NGO International Film & Knowledge Forum",
      "Sits on Advisory Board of Ecoflix and The Graphix Project (partnership with Yale University)"
    ],
    achievementsFr: [
      "Réalisateur, éducateur et praticien du développement international",
      "Travail sur des projets cinématographiques en Afrique, Europe, Australie et Amérique du Nord",
      "Consultation pour les agences de l'ONU: PNUD, HCDH, HCR et UNESCO",
      "Consultation pour l'Union Africaine et organisations internationales incluant Oxfam International, Action Aid, Amnesty International, Crisis Action, Christian Aid, Save The Children",
      "Conférencier TEDx et ancien élève d'Unleash",
      "Professeur invité aux universités Harvard, Howard et Georgetown (États-Unis), Université des Beaux-Arts de Rome (Italie), Universités Monash et Deakin (Australie)",
      "Fondateur de The CARROT Co. et de l'ONG International Film & Knowledge Forum",
      "Membre du conseil consultatif d'Ecoflix et The Graphix Project (partenariat avec l'Université de Yale)"
    ],
    expertise: [
      "Film directing and production",
      "African cinema and films for development",
      "International development",
      "Campaign and advocacy initiatives",
      "Peace & Security",
      "Climate change advocacy",
      "Gender rights",
      "Education and governance"
    ],
    expertiseFr: [
      "Réalisation et production cinématographiques",
      "Cinéma africain et films pour le développement",
      "Développement international",
      "Initiatives de campagnes et de plaidoyer",
      "Paix et sécurité",
      "Plaidoyer pour le changement climatique",
      "Droits des genres",
      "Éducation et gouvernance"
    ],
    experience: [
      "Film projects across multiple continents",
      "UN agency consultation and collaboration",
      "Campaign leadership on major global issues",
      "University teaching and visiting professorships",
      "NGO leadership and advisory roles",
      "International development practice"
    ],
    experienceFr: [
      "Projets cinématographiques sur plusieurs continents",
      "Consultation et collaboration avec les agences de l'ONU",
      "Direction de campagnes sur des enjeux mondiaux majeurs",
      "Enseignement universitaire et professeurs invités",
      "Leadership d'ONG et rôles consultatifs",
      "Pratique du développement international"
    ],
    impact: [
      "Believes art is the best medium to communicate change",
      "Led successful campaigns including Arms Trade Treaty (ATT), Spoilers of Peace Awards, Action 2015, Gender Rights, Climate Justice, Right to quality education, Illicit Financial Flow",
      "Teaching on African cinema and films for development at leading global universities",
      "Contributing to knowledge exchange through International Film & Knowledge Forum",
      "Advising on creative and development initiatives through multiple board positions"
    ],
    impactFr: [
      "Croit que l'art est le meilleur moyen de communiquer le changement",
      "Dirigé des campagnes réussies incluant le Traité sur le Commerce des Armes (TCA), les Prix Spoilers of Peace, Action 2015, les Droits des Genres, la Justice Climatique, le Droit à une éducation de qualité, les Flux Financiers Illicites",
      "Enseignement sur le cinéma africain et les films pour le développement dans les principales universités mondiales",
      "Contribution à l'échange de connaissances grâce à l'International Film & Knowledge Forum",
      "Conseil sur les initiatives créatives et de développement par le biais de plusieurs postes au conseil"
    ],
    order: 12,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-14',
    name: "Boniface Mwalii",
    title: "Chairman, Association of East African Journalists for Arts & Culture (EAJAC) | Project Management Consultant, British Council UK/Kenya",
    titleFr: "Président, Association of East African Journalists for Arts & Culture (EAJAC) | Consultant en Gestion de Projets, British Council UK/Kenya",
    image: "/Boniface.jpeg",
    bio: "Boniface Mwalii is a consummate journalism and communications professional with 15 years of experience spanning journalism, public relations, and project management. He currently serves as Chairman of the Association of East African Journalists for Arts & Culture (EAJAC) and Project Management Consultant for the British Council UK/Kenya Season of Culture 2025.\n\nHis journalism career began at Nation Media Group, where he pioneered youth-focused content by creating the Sunday Nation's first university news columns—'Camposanity' and 'Campus Hustler'—while also serving as a music and television reviewer. This foundation in entertainment journalism positioned him to lead EAJAC's policy advocacy initiatives across the region.\n\nIn the technology and animation space, Boniface served as Executive Producer at Mfalme Productions, Kenya's award-winning studio behind the animated series Makarao. He led the team to victory at the 2015 Pivot East technology competition and later delivered projects for HIVOS, Fairtrade Africa, UNDP, and other organisations.\n\nAs founder of Hove Consulting since 2020, Boniface has diversified his expertise across strategic communications, supporting media companies and international development organisations. He holds a Bachelor of Arts in Political Science and Communication from the University of Nairobi and an Executive Business Intelligence & Data Analytics certification from Riara University, and he is currently undertaking master's research on the role of the media in delivering the AfCFTA at the University of Nairobi's Department of Diplomacy & International Studies.",
    bioFr: "Boniface Mwalii est un professionnel chevronné du journalisme et de la communication avec 15 ans d'expérience couvrant le journalisme, les relations publiques et la gestion de projets. Il est actuellement président de l'Association of East African Journalists for Arts & Culture (EAJAC) et consultant en gestion de projets pour le British Council UK/Kenya Season of Culture 2025.\n\nSa carrière journalistique a débuté au Nation Media Group, où il a lancé des contenus dédiés aux jeunes en créant les premières rubriques universitaires du Sunday Nation—« Camposanity » et « Campus Hustler »—tout en étant critique musical et télé. Cette base dans le journalisme de divertissement l'a propulsé à la tête des initiatives de plaidoyer politique de l'EAJAC dans la région.\n\nDans le domaine de la technologie et de l'animation, Boniface a été producteur exécutif chez Mfalme Productions, studio kényan primé à l'origine de la série animée Makarao. Il a conduit l'équipe à la victoire lors de la compétition technologique Pivot East 2015 et a ensuite mené des projets pour HIVOS, Fairtrade Africa, le PNUD et d'autres organisations.\n\nFondateur de Hove Consulting depuis 2020, Boniface a diversifié son expertise en communication stratégique, accompagnant des entreprises médiatiques et des organisations de développement international. Il est titulaire d'une licence en sciences politiques et communication de l'Université de Nairobi et d'une certification Executive Business Intelligence & Data Analytics de Riara University, et poursuit actuellement des recherches de master sur le rôle des médias dans la mise en œuvre de la ZLECAf au département de diplomatie et d'études internationales de l'Université de Nairobi.",
    achievements: [
      "Chairman of the Association of East African Journalists for Arts & Culture (EAJAC)",
      "Project Management Consultant for the British Council UK/Kenya Season of Culture 2025",
      "15 years of experience across journalism, public relations, and project management",
      "Pioneered youth-focused columns 'Camposanity' and 'Campus Hustler' at Nation Media Group",
      "Executive Producer at award-winning animation studio Mfalme Productions",
      "Led Makarao team to win the 2015 Pivot East Mobile Entertainment category",
      "Founder of Hove Consulting providing strategic communications advisory",
      "Pursuing master's research on the role of media in delivering the AfCFTA"
    ],
    achievementsFr: [
      "Président de l'Association of East African Journalists for Arts & Culture (EAJAC)",
      "Consultant en gestion de projets pour le British Council UK/Kenya Season of Culture 2025",
      "15 ans d'expérience en journalisme, relations publiques et gestion de projets",
      "Créateur des rubriques jeunesse « Camposanity » et « Campus Hustler » au Nation Media Group",
      "Producteur exécutif du studio d'animation primé Mfalme Productions",
      "Chef d'équipe de Makarao, lauréat de la catégorie Mobile Entertainment à Pivot East 2015",
      "Fondateur de Hove Consulting spécialisé en communication stratégique",
      "Recherche de master sur le rôle des médias dans la mise en œuvre de la ZLECAf"
    ],
    expertise: [
      "Arts and culture journalism",
      "Strategic communications and public relations",
      "Project and programme management",
      "Animation and digital storytelling production",
      "Policy advocacy for creative industries",
      "Data analytics for media strategy"
    ],
    expertiseFr: [
      "Journalisme arts et culture",
      "Communication stratégique et relations publiques",
      "Gestion de projets et de programmes",
      "Production d'animation et de narration numérique",
      "Plaidoyer politique pour les industries créatives",
      "Analyse de données pour la stratégie médiatique"
    ],
    impact: [
      "Strengthening policy advocacy for arts and culture journalists in East Africa",
      "Championing youth-focused storytelling platforms in mainstream media",
      "Bridging creative industries with technology and development partners",
      "Mentoring media and communications professionals through consultancy work",
      "Advancing research on media's role in continental integration"
    ],
    impactFr: [
      "Renforcer le plaidoyer politique pour les journalistes arts et culture en Afrique de l'Est",
      "Promouvoir des plateformes narratives dédiées à la jeunesse dans les médias traditionnels",
      "Faire le lien entre industries créatives, technologie et partenaires du développement",
      "Mentorer des professionnels des médias et de la communication via le conseil",
      "Faire progresser la recherche sur le rôle des médias dans l'intégration continentale"
    ],
    education: [
      "Bachelor of Arts in Political Science and Communication, University of Nairobi",
      "Executive Business Intelligence & Data Analytics Certification, Riara University",
      "Master's research in progress: The Role of the Media in Delivering the AfCFTA, University of Nairobi"
    ],
    educationFr: [
      "Licence en sciences politiques et communication, Université de Nairobi",
      "Certification Executive Business Intelligence & Data Analytics, Riara University",
      "Recherche de master en cours: Le rôle des médias dans la mise en œuvre de la ZLECAf, Université de Nairobi"
    ],
    order: 14,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-15',
    name: "Munyaradzi 'Munya' Chidzonga",
    title: "Actor, Filmmaker & Film Industry Entrepreneur",
    titleFr: "Acteur, Cinéaste et Entrepreneur de l'Industrie Cinématographique",
    image: "/Munya.jpeg",
    bio: "Munyaradzi 'Munya' Chidzonga is a versatile Zimbabwean creative force, with a career spanning the realms of entertainment and business. As an actor and filmmaker, he has had the privilege of bringing stories to life on screen, earning recognition including a National Arts Merit Award (NAMA) for Best Actor in 'The Gentleman' and a SOTIGUI award for best Actor in Southern Africa. Beyond acting, Munya thrives behind the camera with experience in film production, distribution, exhibition, financing and policy. After completing an MBA in Entrepreneurship from the Catholic University of Milan, he embarked on a journey to design Distribution, Exhibition and Financing models that work for the film industry, implementing sustainable solutions including a renovated local cinema and arts space in Harare and a Mobile VOD application accessible without Wi-Fi or Data.",
    bioFr: "Munyaradzi 'Munya' Chidzonga est une force créative zimbabwéenne polyvalente, avec une carrière couvrant les domaines du divertissement et des affaires. En tant qu'acteur et cinéaste, il a eu le privilège de donner vie à des histoires à l'écran, obtenant des reconnaissances dont un Prix National du Mérite des Arts (NAMA) du meilleur acteur dans 'The Gentleman' et un prix SOTIGUI du meilleur acteur en Afrique australe. Au-delà du jeu d'acteur, Munya excelle derrière la caméra avec une expérience en production, distribution, exploitation, financement et politique cinématographiques. Après avoir obtenu un MBA en Entrepreneuriat de l'Université Catholique de Milan, il s'est lancé dans la conception de modèles de Distribution, d'Exploitation et de Financement qui fonctionnent pour l'industrie cinématographique, mettant en œuvre des solutions durables incluant un cinéma et espace artistique local rénové à Harare et une application VOD mobile accessible sans Wi-Fi ni données.",
    achievements: [
      "National Arts Merit Award (NAMA) for Best Actor in 'The Gentleman'",
      "SOTIGUI Award for Best Actor in Southern Africa",
      "Award-winning actor and filmmaker",
      "MBA in Entrepreneurship from Catholic University of Milan",
      "Designed sustainable Distribution, Exhibition and Financing models for the film industry",
      "Renovated local cinema and arts space in Harare",
      "Developed Mobile VOD application accessible without Wi-Fi or Data",
      "Pioneering sustainable solutions for Rural, Urban and Peri-Urban audience settings"
    ],
    achievementsFr: [
      "Prix National du Mérite des Arts (NAMA) du meilleur acteur dans 'The Gentleman'",
      "Prix SOTIGUI du meilleur acteur en Afrique australe",
      "Acteur et cinéaste primé",
      "MBA en Entrepreneuriat de l'Université Catholique de Milan",
      "Conception de modèles durables de Distribution, d'Exploitation et de Financement pour l'industrie cinématographique",
      "Cinéma et espace artistique local rénové à Harare",
      "Développement d'une application VOD mobile accessible sans Wi-Fi ni données",
      "Solutions durables pionnières pour les publics ruraux, urbains et périurbains"
    ],
    expertise: [
      "Acting and performance",
      "Film production",
      "Film distribution",
      "Film exhibition",
      "Film financing",
      "Film policy",
      "Business entrepreneurship",
      "Sustainable business models"
    ],
    expertiseFr: [
      "Jeu d'acteur et performance",
      "Production cinématographique",
      "Distribution cinématographique",
      "Exploitation cinématographique",
      "Financement cinématographique",
      "Politique cinématographique",
      "Entrepreneuriat",
      "Modèles d'entreprise durables"
    ],
    experience: [
      "Actor in film and television",
      "Film producer and director",
      "Film distributor and exhibitor",
      "Film financing specialist",
      "Film policy development",
      "Business model design for creative industries",
      "MBA-level entrepreneurship expertise"
    ],
    experienceFr: [
      "Acteur au cinéma et à la télévision",
      "Producteur et réalisateur de films",
      "Distributeur et exploitant de films",
      "Spécialiste du financement cinématographique",
      "Développement de politiques cinématographiques",
      "Conception de modèles d'entreprise pour les industries créatives",
      "Expertise en entrepreneuriat niveau MBA"
    ],
    impact: [
      "Designing sustainable Distribution and Exhibition ecosystems for African film industry",
      "Implementing innovative solutions for film accessibility in diverse settings",
      "Bridging the gap between creative artistry and business sustainability",
      "Contributing to the growth of Zimbabwean and African cinema",
      "Connecting film practitioners across the continent in distribution, exhibition and financing"
    ],
    impactFr: [
      "Conception d'écosystèmes durables de Distribution et d'Exploitation pour l'industrie cinématographique africaine",
      "Mise en œuvre de solutions innovantes pour l'accessibilité cinématographique dans divers contextes",
      "Combler le fossé entre l'art créatif et la durabilité des entreprises",
      "Contribuer à la croissance du cinéma zimbabwéen et africain",
      "Connecter les praticiens du cinéma à travers le continent dans la distribution, l'exploitation et le financement"
    ],
    education: [
      "MBA in Entrepreneurship, Catholic University of Milan",
      "Film and Television training"
    ],
    educationFr: [
      "MBA en Entrepreneuriat, Université Catholique de Milan",
      "Formation en cinéma et télévision"
    ],
    order: 15,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-16',
    name: "Obed Navele",
    title: "Spoken Word Artist | Mental Health Advocate | M.C",
    titleFr: "Artiste de Spoken Word | Défenseur de la Santé Mentale | M.C",
    image: "/Obed.jpeg",
    bio: "Obed Navele is a Ghanaian spoken word artist, M.C, and passionate mental health advocate whose work is anchored in the profound connection between language, mind, and society. A recent 2024/2025 graduate of the University of Ghana, where he pursued a combined major in Psychology and Linguistics, Obed is uniquely positioned to harness the power of words, sound, and artistic expression to awaken consciousness and drive social change. Obed's performances are characterized by their deep emotional resonance, rhythmic African cadence, and intellectual depth. He composes heart-piercing pieces that weave psychology, culture, and purpose into narratives that serve as both a 'mirror and medicine' for society.",
    bioFr: "Obed Navele est un artiste de spoken word ghanéen, M.C et défenseur passionné de la santé mentale dont le travail est ancré dans la connexion profonde entre le langage, l'esprit et la société. Diplômé récent de l'Université du Ghana (2024/2025), où il a poursuivi une majeure combinée en psychologie et linguistique, Obed est positionné de manière unique pour exploiter le pouvoir des mots, du son et de l'expression artistique pour éveiller la conscience et conduire le changement social. Les performances d'Obed sont caractérisées par leur résonance émotionnelle profonde, leur cadence rythmique africaine et leur profondeur intellectuelle. Il compose des pièces percutantes qui tissent la psychologie, la culture et le but dans des récits qui servent à la fois de 'miroir et de médicament' pour la société.",
    achievements: [
      "2024/2025 graduate of University of Ghana with combined major in Psychology and Linguistics",
      "Invited performer at 'She Builds Nations' – Young Women Business Summit 2025, Ghana",
      "Featured performer at 'Who Is the Citizen of Our World?' – UNIV Nigeria Conference, Pan-Atlantic University, Lagos",
      "Performer at 'The Enemy Within' – Mental Health Awareness Convention, University of Ghana",
      "Featured at 'Together for Tomorrow: A Call for Peaceful Elections' – Bible Society of Ghana, 2024",
      "Performer at 'Behind the Veil' – University of Ghana, Poetry & Purpose Series",
      "Unique fusion of academic psychology and linguistic expertise with artistic expression"
    ],
    achievementsFr: [
      "Diplômé 2024/2025 de l'Université du Ghana avec une majeure combinée en psychologie et linguistique",
      "Artiste invité à 'She Builds Nations' – Sommet des Jeunes Femmes Entrepreneures 2025, Ghana",
      "Artiste invité à 'Who Is the Citizen of Our World?' – Conférence UNIV Nigeria, Université Pan-Atlantic, Lagos",
      "Artiste à 'The Enemy Within' – Convention de Sensibilisation à la Santé Mentale, Université du Ghana",
      "Artiste invité à 'Together for Tomorrow: A Call for Peaceful Elections' – Bible Society of Ghana, 2024",
      "Artiste à 'Behind the Veil' – Université du Ghana, Série Poetry & Purpose",
      "Fusion unique d'expertise académique en psychologie et linguistique avec l'expression artistique"
    ],
    expertise: [
      "Spoken word performance",
      "Mental health advocacy",
      "Psychology and linguistics",
      "Cultural storytelling",
      "Social transformation through art",
      "African identity and consciousness",
      "Civic responsibility and national transformation"
    ],
    expertiseFr: [
      "Performance de spoken word",
      "Défense de la santé mentale",
      "Psychologie et linguistique",
      "Narration culturelle",
      "Transformation sociale par l'art",
      "Identité africaine et conscience",
      "Responsabilité civique et transformation nationale"
    ],
    experience: [
      "Spoken word artist and performer",
      "M.C and event hosting",
      "Mental health advocacy and awareness",
      "Academic research in psychology and linguistics",
      "Cultural diplomacy through storytelling",
      "Youth engagement and social change initiatives"
    ],
    experienceFr: [
      "Artiste et interprète de spoken word",
      "M.C et animation d'événements",
      "Défense et sensibilisation à la santé mentale",
      "Recherche académique en psychologie et linguistique",
      "Diplomatie culturelle par la narration",
      "Engagement des jeunes et initiatives de changement social"
    ],
    impact: [
      "Using spoken word as a powerful engine for cultural diplomacy and sustainable economic development",
      "Strengthening African identity and championing the continent's collective future",
      "Demonstrating how African storytelling can drive social change",
      "Aligning artistic work with Creative Economy and AfCFTA framework vision",
      "Addressing mental wellness, civic responsibility, and national transformation through art",
      "Serving as both 'mirror and medicine' for society through his narratives"
    ],
    impactFr: [
      "Utiliser le spoken word comme un puissant moteur pour la diplomatie culturelle et le développement économique durable",
      "Renforcer l'identité africaine et défendre l'avenir collectif du continent",
      "Démontrer comment la narration africaine peut conduire le changement social",
      "Aligner le travail artistique avec la vision de l'Économie Créative et du cadre ZLECAf",
      "Aborder le bien-être mental, la responsabilité civique et la transformation nationale par l'art",
      "Servir à la fois de 'miroir et de médicament' pour la société grâce à ses récits"
    ],
    education: [
      "Combined major in Psychology and Linguistics, University of Ghana (2024/2025 graduate)"
    ],
    educationFr: [
      "Majeure combinée en psychologie et linguistique, Université du Ghana (diplômé 2024/2025)"
    ],
    order: 16,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-17',
    name: "Zodwa Msimang",
    title: "Group Chairman & CEO, Ikhono Thrive Global | Entrepreneur",
    titleFr: "Présidente du Groupe et PDG, Ikhono Thrive Global | Entrepreneure",
    image: "/Zodwa-Msimang.jpg",
    bio: "Zodwa Msimang is a true embodiment of leadership and entrepreneurial service excellence. As a businesswoman, she has contributed to the Meetings, Incentives, Conferences and Exhibitions (MICE) Industry, serving on the boards of Tourism KZN and Durban ICC across HR, business development, and marketing committees. She is also a founding member and non-executive director of Omame Investment—an investment business with portfolios in facilities management, resilience, and gaming & betting. In 2019 she spearheaded the brand expansion of Ikhono, birthing new divisions under Ikhono Thrive Global (ITG).\n\nZodwa is passionate about uplifting and empowering women and youth in rural and peri-urban areas, a commitment that powers the Ikhono Foundation (NPO). During the lockdown she launched the Thriving in Abundance Talk Show on YouTube to educate and inspire communities and founded Woman Thrive, a movement that celebrates women leaders across sectors.\n\nFormally trained in communications, psychology, and education, Zodwa began her career as an educator and has since added a qualification in Social Entrepreneurship through GIBS alongside multiple certifications from the Institute of Directors. Her leadership has been recognised with accolades such as the Top 40 Women in MICE Awards, the Sebenza Women Awards Business Leader of the Year, and the prestigious Albert Cronheim Scholarship to attend the Wolfsberg Seminar on professional conference planning.",
    bioFr: "Zodwa Msimang est une véritable incarnation du leadership et de l'excellence entrepreneuriale. En tant que femme d'affaires, elle a contribué à l'industrie des réunions, incentives, conférences et expositions (MICE), siégeant aux conseils de Tourism KZN et de Durban ICC dans les comités RH, développement commercial et marketing. Elle est également membre fondatrice et directrice non exécutive d'Omame Investment—une société d'investissement aux portefeuilles diversifiés en gestion des installations, résilience et jeux & paris. En 2019, elle a dirigé l'expansion de la marque Ikhono, donnant naissance à de nouvelles divisions sous Ikhono Thrive Global (ITG).\n\nZodwa est passionnée par l'autonomisation des femmes et des jeunes dans les zones rurales et périurbaines, un engagement porté par l'Ikhono Foundation (NPO). Pendant le confinement, elle a lancé l'émission Thriving in Abundance sur YouTube pour informer et inspirer les communautés et a fondé Woman Thrive, un mouvement qui célèbre les femmes leaders dans tous les secteurs.\n\nFormée en communication, psychologie et éducation, Zodwa a commencé sa carrière comme enseignante et a depuis obtenu une qualification en entrepreneuriat social à la GIBS, ainsi que plusieurs certifications de l'Institute of Directors. Son leadership a été reconnu par des distinctions telles que le Top 40 Women in MICE Awards, le Sebenza Women Awards Business Leader of the Year et la prestigieuse bourse Albert Cronheim pour participer au séminaire Wolfsberg sur la planification de conférences professionnelles.",
    achievements: [
      "Group Chairman & CEO of Ikhono Thrive Global",
      "Managing Director of Ikhono Communications (2001-2018)",
      "Chairman of Ikhono Foundation",
      "Top 40 Women in MICE Awards winner (2016)",
      "Sebenza Women Awards - Business Leader of the Year 2020",
      "Gagasi Fm SHERO Awards - Social Entrepreneurship (2021)",
      "Finalist, Standard Bank – Top Women Awards 2017",
      "Finalist, Businesswomen Association Achiever 2006, KZN Region",
      "Albert Cronheim Scholarship recipient for Wolfsberg Seminar on professional conference planning",
      "Board member of Tourism KZN & Durban ICC, Enterprise Ilembe, SAACI, Omame Investments",
      "Creator of the Thriving in Abundance Talk Show on YouTube",
      "Founder of the Woman Thrive movement celebrating women leaders"
    ],
    achievementsFr: [
      "Présidente du Groupe et PDG d'Ikhono Thrive Global",
      "Directrice Générale d'Ikhono Communications (2001-2018)",
      "Présidente de la Fondation Ikhono",
      "Gagnante du Top 40 Women in MICE Awards (2016)",
      "Sebenza Women Awards - Leader d'Entreprise de l'Année 2020",
      "Gagasi Fm SHERO Awards - Entrepreneuriat Social (2021)",
      "Finaliste, Standard Bank – Top Women Awards 2017",
      "Finaliste, Businesswomen Association Achiever 2006, Région KZN",
      "Récipiendaire de la Bourse Albert Cronheim pour le Séminaire Wolfsberg sur la planification de conférences professionnelles",
      "Membre du conseil de Tourism KZN & Durban ICC, Enterprise Ilembe, SAACI, Omame Investments",
      "Créatrice de l'émission Thriving in Abundance sur YouTube",
      "Fondatrice du mouvement Woman Thrive célébrant les femmes leaders"
    ],
    expertise: [
      "MICE industry leadership",
      "Business strategy and governance",
      "Brand expansion and development",
      "Facilities management",
      "Social entrepreneurship",
      "Women and youth empowerment",
      "Community development",
      "Board leadership"
    ],
    expertiseFr: [
      "Leadership de l'industrie MICE",
      "Stratégie et gouvernance d'entreprise",
      "Expansion et développement de marque",
      "Gestion des installations",
      "Entrepreneuriat social",
      "Autonomisation des femmes et des jeunes",
      "Développement communautaire",
      "Leadership au conseil"
    ],
    experience: [
      "MICE industry operations and strategy",
      "Business development and marketing",
      "Event management and conference planning",
      "Board directorship and governance",
      "Social entrepreneurship and community upliftment",
      "Brand expansion and portfolio management",
      "International business exposure and travel"
    ],
    experienceFr: [
      "Opérations et stratégie de l'industrie MICE",
      "Développement commercial et marketing",
      "Gestion d'événements et planification de conférences",
      "Direction au conseil et gouvernance",
      "Entrepreneuriat social et élévation communautaire",
      "Expansion de marque et gestion de portefeuille",
      "Exposition commerciale internationale et voyages"
    ],
    impact: [
      "Passionate about uplifting and empowering women and youth in rural and peri-urban areas through Ikhono Foundation",
      "Created Thriving in Abundance Talk Show on YouTube to educate and inspire communities",
      "Founded Woman Thrive movement celebrating women as leaders in their chosen fields",
      "Spearheaded brand expansion creating new divisions: Ikhono ICE, AFRIthrive brands, Zulu Madame, Mzansi Thrive and Ikhono Suite",
      "Contributing to MICE industry growth in South Africa and Africa",
      "Serving on multiple boards to drive economic and social development",
      "Championing women leadership post-COVID-19 period"
    ],
    impactFr: [
      "Passionnée pour élever et autonomiser les femmes et les jeunes dans les zones rurales et périurbaines grâce à la Fondation Ikhono",
      "Créé l'émission Thriving in Abundance Talk Show sur YouTube pour éduquer et inspirer les communautés",
      "Fondé le mouvement Woman Thrive célébrant les femmes en tant que leaders dans leurs domaines choisis",
      "Dirigé l'expansion de la marque créant de nouvelles divisions: Ikhono ICE, marques AFRIthrive, Zulu Madame, Mzansi Thrive et Ikhono Suite",
      "Contribuer à la croissance de l'industrie MICE en Afrique du Sud et en Afrique",
      "Servir sur plusieurs conseils pour conduire le développement économique et social",
      "Défendre le leadership des femmes dans la période post-COVID-19"
    ],
    education: [
      "BA Communications, University of Zululand",
      "Higher Diploma in Education, University of Zululand",
      "Diploma in Public Relations, Damelin College",
      "Diploma in Human Resources, Damelin College",
      "Post Graduate Diploma in Company Direction, Graduate Institute of Management & Technology (GIMT)",
      "Certificate Social Entrepreneurship Program, Gordon Institute of Business Science",
      "Certificate Business Entrepreneurial Program, Joseph Business School",
      "Institute of Directors (IOD) certificates"
    ],
    educationFr: [
      "BA Communications, Université de Zululand",
      "Diplôme Supérieur en Éducation, Université de Zululand",
      "Diplôme en Relations Publiques, Damelin College",
      "Diplôme en Ressources Humaines, Damelin College",
      "Diplôme d'Études Supérieures en Direction d'Entreprise, Graduate Institute of Management & Technology (GIMT)",
      "Certificat Programme d'Entrepreneuriat Social, Gordon Institute of Business Science",
      "Certificat Programme d'Entrepreneuriat d'Entreprise, Joseph Business School",
      "Certificats de l'Institute of Directors (IOD)"
    ],
    order: 19,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-18',
    name: "Margareth Geddy",
    title: "Award-Winning Tanzanian Television Journalist & Wildlife Filmmaker",
    titleFr: "Journaliste Télévisuelle et Réalisatrice de Films sur la Faune Tanzanienne Primée",
    image: "/Geddy.jpeg",
    bio: "Margareth Geddy is an award-winning Tanzanian television journalist and wildlife filmmaker, celebrated for her impactful storytelling in tourism and conservation. She was honored by the Media Council of Tanzania with the Excellence in Journalism Awards (2023–2025) as the Best Television Journalist in Tourism and Conservation, recognizing her outstanding contribution to environmental journalism and visual storytelling. A former News Anchor, Reporter, and Television Producer at the Tanzania Broadcasting Corporation (TBC), Margareth also produced wildlife documentaries for the Tanzania Safari Channel, a dedicated platform for tourism and conservation.\n\nBeyond the screen, Margareth serves as an Africa Youth and Tourism Ambassador with Africa Tourism Partners, championing youth participation and sustainable tourism across the continent. Her remarkable work has earned recognition from the Tanzania Tourist Board as one of the country's top content creators and from the U.S. Embassy in Tanzania for her influence in digital storytelling. With an unwavering passion for nature and storytelling, she continues to use film and media to amplify Africa's conservation narratives, connecting people, wildlife, and the planet through the power of visual storytelling.",
    bioFr: "Margareth Geddy est une journaliste télévisuelle et réalisatrice de films sur la faune tanzanienne primée, célébrée pour sa narration percutante dans le tourisme et la conservation. Elle a été honorée par le Conseil des Médias de Tanzanie avec les Prix d'Excellence en Journalisme (2023–2025) en tant que meilleure journaliste télévisuelle en tourisme et conservation, reconnaissant sa contribution exceptionnelle au journalisme environnemental et à la narration visuelle. Ancienne présentatrice de nouvelles, reporter et productrice de télévision à la Tanzania Broadcasting Corporation (TBC), Margareth a également produit des documentaires sur la faune pour la Tanzania Safari Channel, une plateforme dédiée au tourisme et à la conservation.\n\nAu-delà de l'écran, Margareth est ambassadrice jeunesse et tourisme pour Africa Tourism Partners, défendant la participation des jeunes et le tourisme durable à travers le continent. Son travail remarquable lui a valu la reconnaissance du Tanzania Tourist Board comme l'une des principales créatrices de contenu du pays et de l'ambassade des États-Unis en Tanzanie pour son influence dans la narration numérique. Animée par une passion inébranlable pour la nature et la narration, elle continue d'utiliser le film et les médias pour amplifier les récits de conservation de l'Afrique, reliant les personnes, la faune et la planète par la puissance de la narration visuelle.",
    achievements: [
      "Award-winning Tanzanian television journalist and wildlife filmmaker",
      "Best Television Journalist in Tourism and Conservation (Media Council of Tanzania Excellence in Journalism Awards 2023–2025)",
      "Former News Anchor, Reporter, and Television Producer at Tanzania Broadcasting Corporation (TBC)",
      "Producer of wildlife documentaries for Tanzania Safari Channel",
      "Africa Youth and Tourism Ambassador with Africa Tourism Partners",
      "Recognized by Tanzania Tourist Board as one of the country's top content creators",
      "Recognition from U.S. Embassy in Tanzania for influence in digital storytelling"
    ],
    achievementsFr: [
      "Journaliste télévisuelle et réalisatrice de films sur la faune tanzanienne primée",
      "Meilleure journaliste télévisuelle en tourisme et conservation (Prix d'Excellence en Journalisme du Conseil des Médias de Tanzanie 2023–2025)",
      "Ancienne présentatrice de nouvelles, reporter et productrice de télévision à la Tanzania Broadcasting Corporation (TBC)",
      "Productrice de documentaires sur la faune pour la Tanzania Safari Channel",
      "Ambassadrice de la Jeunesse et du Tourisme Africains auprès d'Africa Tourism Partners",
      "Reconnue par le Tanzania Tourist Board comme l'une des meilleures créatrices de contenu du pays",
      "Reconnaissance de l'ambassade américaine en Tanzanie pour son influence dans la narration numérique"
    ],
    expertise: [
      "Television journalism",
      "Wildlife filmmaking",
      "Tourism and conservation storytelling",
      "Environmental journalism",
      "Visual storytelling",
      "Digital content creation"
    ],
    expertiseFr: [
      "Journalisme télévisuel",
      "Réalisation de films sur la faune",
      "Narration sur le tourisme et la conservation",
      "Journalisme environnemental",
      "Narration visuelle",
      "Création de contenu numérique"
    ],
    experience: [
      "News anchoring and reporting",
      "Television production",
      "Wildlife documentary production",
      "Tourism content creation",
      "Conservation storytelling",
      "Digital media and storytelling"
    ],
    experienceFr: [
      "Présentation de nouvelles et reportage",
      "Production télévisuelle",
      "Production de documentaires sur la faune",
      "Création de contenu touristique",
      "Narration sur la conservation",
      "Médias numériques et narration"
    ],
    impact: [
      "Championing youth participation and sustainable tourism across Africa as Africa Youth and Tourism Ambassador",
      "Collaborating with Tanzania National Parks (TANAPA), Tanzania Wildlife Management Authority (TAWA), Tanzania Forest Services (TFS)",
      "Working with tourism boards across Tanzania, Namibia, Botswana and South Africa",
      "Using film and media to amplify Africa's conservation narratives",
      "Connecting people, wildlife, and the planet through visual storytelling",
      "Promoting Africa's natural beauty through impactful storytelling"
    ],
    impactFr: [
      "Défendre la participation des jeunes et le tourisme durable à travers l'Afrique en tant qu'Ambassadrice de la Jeunesse et du Tourisme Africains",
      "Collaboration avec les Parcs Nationaux de Tanzanie (TANAPA), l'Autorité de Gestion de la Faune de Tanzanie (TAWA), les Services Forestiers de Tanzanie (TFS)",
      "Travail avec les offices de tourisme en Tanzanie, Namibie, Botswana et Afrique du Sud",
      "Utiliser le cinéma et les médias pour amplifier les récits de conservation de l'Afrique",
      "Connecter les gens, la faune et la planète grâce à la narration visuelle",
      "Promouvoir la beauté naturelle de l'Afrique grâce à une narration percutante"
    ],
    order: 20,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-19',
    name: "Keitumetse Setlang",
    title: "CEO, Botswana Tourism Organisation",
    titleFr: "PDG, Botswana Tourism Organisation",
    image: "/Keitumetse.jpeg",
    bio: "Keitumetse Setlang has been part of Botswana's tourism industry since 1998 when she entered the sector as a Public Relations Manager. She now serves as CEO of the Botswana Tourism Organisation, leading the development and implementation of the Botswana Tourism Strategy with a focus on global destination marketing, brand management, and public relations. Keitumetse has been instrumental in revitalising travel and tourism in the wake of COVID-19 by strengthening linkages across the tourism value chain to increase local economic impact and by steering the growth of the Meetings, Incentives, Conferences and Exhibitions (MICE) sector.",
    bioFr: "Keitumetse Setlang évolue dans l'industrie touristique du Botswana depuis 1998, année où elle a débuté comme responsable des relations publiques. Elle dirige aujourd'hui la Botswana Tourism Organisation en tant que PDG, pilotant le développement et la mise en œuvre de la stratégie touristique du Botswana axée sur le marketing mondial de la destination, la gestion de la marque et les relations publiques. Keitumetse a joué un rôle clé dans la relance du voyage et du tourisme après la COVID-19 en renforçant les liens à travers la chaîne de valeur touristique pour accroître l'impact économique local et en stimulant la croissance du secteur des réunions, incentives, conférences et expositions (MICE).",
    achievements: [
      "CEO of the Botswana Tourism Organisation",
      "Career in tourism marketing and public relations since 1998",
      "Leads the Botswana Tourism Strategy focusing on global destination marketing, brand management, and public relations",
      "Championed post-COVID tourism recovery by strengthening value chain linkages to boost local economic impact",
      "Instrumental in stimulating Botswana's Meetings, Incentives, Conferences and Exhibitions (MICE) sector"
    ],
    achievementsFr: [
      "PDG de la Botswana Tourism Organisation",
      "Carrière dans le marketing et les relations publiques du tourisme depuis 1998",
      "Dirige la stratégie touristique du Botswana axée sur le marketing mondial, la gestion de marque et les relations publiques",
      "Championne de la relance post-COVID du tourisme en renforçant les liens de la chaîne de valeur pour accroître l'impact économique local",
      "Rôle clé dans la stimulation du secteur MICE (réunions, incentives, conférences et expositions) du Botswana"
    ],
    expertise: [
      "Destination marketing and branding",
      "Public relations and stakeholder engagement",
      "Tourism value chain development",
      "MICE sector growth",
      "Strategic partnerships and policy implementation"
    ],
    expertiseFr: [
      "Marketing et image de destination",
      "Relations publiques et mobilisation des parties prenantes",
      "Développement de la chaîne de valeur touristique",
      "Croissance du secteur MICE",
      "Partenariats stratégiques et mise en œuvre des politiques"
    ],
    impact: [
      "Positioning Botswana as a competitive global tourism destination",
      "Building inclusive linkages between tourism and local economic development",
      "Strengthening brand Botswana through integrated marketing campaigns",
      "Promoting business tourism and MICE opportunities for national growth"
    ],
    impactFr: [
      "Positionner le Botswana comme destination touristique compétitive à l'échelle mondiale",
      "Créer des liens inclusifs entre tourisme et développement économique local",
      "Renforcer la marque Botswana grâce à des campagnes marketing intégrées",
      "Promouvoir le tourisme d'affaires et les opportunités MICE pour la croissance nationale"
    ],
    order: 21,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-olayiwola-awakan',
    name: "Olayiwola Awakan",
    title: "Director-General, Nigerian Tourism Development Authority (NTDA)",
    titleFr: "Directeur Général, Nigerian Tourism Development Authority (NTDA)",
    image: "/Olayiwola.png",
    bio: "Olayiwola Awakan is the Director-General of the Nigerian Tourism Development Authority (NTDA) and an award-winning Nigerian journalist, poet, and dramatist. Appointed by President Bola Ahmed Tinubu in 2025, he is focused on repositioning Nigeria's tourism sector, strengthening the creative economy, and showcasing the nation's cultural heritage to the world. A seasoned broadcaster associated with TVC News, he blends storytelling, media expertise, and public leadership to champion culture-led economic growth. He has received numerous accolades, including an Honorary Professional Fellowship Doctorate in Strategic Leadership and Public Resources Management from the Chartered Institute of Public Resources Management and Politics (Ghana).",
    bioFr: "Olayiwola Awakan est le directeur général de la Nigerian Tourism Development Authority (NTDA) et un journaliste, poète et dramaturge nigérian primé. Nommé par le président Bola Ahmed Tinubu en 2025, il s'attache à repositionner le secteur touristique du Nigeria, à renforcer l'économie créative et à mettre en valeur le patrimoine culturel du pays dans le monde. Journaliste et animateur reconnu, notamment auprès de TVC News, il associe narration, expertise médiatique et leadership public pour promouvoir une croissance économique fondée sur la culture. Il a reçu de nombreuses distinctions, dont un diplôme honorifique professionnel en leadership stratégique et gestion des ressources publiques décerné par le Chartered Institute of Public Resources Management and Politics (Ghana).",
    achievements: [
      "Director-General of the Nigerian Tourism Development Authority (NTDA)",
      "Award-winning journalist, poet, and dramatist with a focus on culture and tourism",
      "Advocates for leveraging creativity and culture for Nigeria's economic growth",
      "Recipient of an Honorary Professional Fellowship Doctorate in Strategic Leadership and Public Resources Management",
      "Prominent media personality associated with TVC News and leading cultural platforms"
    ],
    achievementsFr: [
      "Directeur général de la Nigerian Tourism Development Authority (NTDA)",
      "Journaliste, poète et dramaturge primé spécialisé dans la culture et le tourisme",
      "Promoteur de l'utilisation de la créativité et de la culture au service de la croissance économique du Nigeria",
      "Lauréat d'un diplôme honorifique professionnel en leadership stratégique et gestion des ressources publiques",
      "Personnalité médiatique de premier plan associée à TVC News et à des plateformes culturelles majeures"
    ],
    expertise: [
      "Tourism policy leadership",
      "Culture and creative economy advocacy",
      "Broadcast journalism and storytelling",
      "Public communication and stakeholder engagement",
      "Strategic sector partnerships"
    ],
    expertiseFr: [
      "Leadership en politiques touristiques",
      "Plaidoyer pour la culture et l'économie créative",
      "Journalisme audiovisuel et narration",
      "Communication publique et mobilisation des parties prenantes",
      "Partenariats sectoriels stratégiques"
    ],
    impact: [
      "Promoting Nigeria's cultural heritage and creative assets on global platforms",
      "Aligning tourism development with national economic priorities",
      "Championing media-driven campaigns that inspire sustainable tourism",
      "Mentoring creatives and journalists committed to cultural storytelling"
    ],
    impactFr: [
      "Promouvoir le patrimoine culturel et les atouts créatifs du Nigeria sur les scènes internationales",
      "Aligner le développement du tourisme sur les priorités économiques nationales",
      "Porter des campagnes médiatiques inspirant un tourisme durable",
      "Mentorer des créatifs et des journalistes engagés dans la narration culturelle"
    ],
    education: [
      "Honorary Professional Fellowship Doctorate in Strategic Leadership and Public Resources Management, Chartered Institute of Public Resources Management and Politics (Ghana)"
    ],
    educationFr: [
      "Diplôme honorifique professionnel en leadership stratégique et gestion des ressources publiques, Chartered Institute of Public Resources Management and Politics (Ghana)"
    ],
    order: 22,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-melchissedec-obiang',
    name: "Melchissedec Obiang",
    title: "Award-Winning Filmmaker & Founder, Studios Montparnasse, Gabon",
    titleFr: "Réalisateur Primé & Fondateur, Studios Montparnasse, Gabon",
    image: "/Melchissedec.png",
    bio: "Melchissedec Obiang is an award-winning Gabonese filmmaker and producer, and the founder of Studios Montparnasse. After beginning his professional career in healthcare, he transitioned to audiovisual production, releasing acclaimed short films such as \"Kongossa\" and \"La pancarte\", followed by feature films including \"L'amour du diable\", \"Le cœur des femmes\", \"Un mariage à 5\" and \"La puissance de la foi\". His fifth feature, \"La colère des ancêtres\", further solidified his reputation as a leading Central African storyteller. In 2018 he was appointed Advisor in Charge of the Promotion of Cultural Industries and Cinematography to Gabon's Minister of Communication, Digital Economy, Culture, Arts and Traditions.",
    bioFr: "Melchissedec Obiang est un réalisateur et producteur gabonais primé, fondateur de Studios Montparnasse. Après des débuts professionnels dans la santé, il s'est tourné vers la production audiovisuelle en signant des courts métrages salués comme « Kongossa » et « La pancarte », puis des longs métrages tels que « L'amour du diable », « Le cœur des femmes », « Un mariage à 5 » et « La puissance de la foi ». Son cinquième long métrage, « La colère des ancêtres », a confirmé sa réputation de conteur majeur en Afrique centrale. En 2018, il a été nommé conseiller chargé de la promotion des industries culturelles et de la cinématographie auprès du ministre gabonais de la Communication, de l'Économie numérique, de la Culture, des Arts et Traditions.",
    achievements: [
      "Founder of Studios Montparnasse, a leading Gabonese film production company",
      "Director of multiple award-winning short and feature films across Central Africa",
      "Advisor in Charge of the Promotion of Cultural Industries and Cinematography to the Gabonese Minister of Communication (since 2018)",
      "Recipient of national and international recognition for cinematic storytelling"
    ],
    achievementsFr: [
      "Fondateur de Studios Montparnasse, société de production cinématographique gabonaise de référence",
      "Réalisateur de courts et longs métrages primés en Afrique centrale",
      "Conseiller chargé de la promotion des industries culturelles et de la cinématographie auprès du ministre gabonais de la Communication (depuis 2018)",
      "Lauréat de distinctions nationales et internationales pour sa narration cinématographique"
    ],
    expertise: [
      "Film directing and production",
      "Screenwriting and story development",
      "Cultural industries policy advisory",
      "Creative entrepreneurship"
    ],
    expertiseFr: [
      "Réalisation et production cinématographiques",
      "Scénarisation et développement narratif",
      "Conseil en politiques des industries culturelles",
      "Entrepreneuriat créatif"
    ],
    impact: [
      "Amplifying Central African voices through film",
      "Bridging creative production with cultural policy implementation",
      "Developing platforms that professionalise Gabon's audiovisual sector"
    ],
    impactFr: [
      "Valoriser les voix d'Afrique centrale à travers le cinéma",
      "Relier la production créative à la mise en œuvre de politiques culturelles",
      "Développer des plateformes professionnalisant le secteur audiovisuel gabonais"
    ],
    order: 23,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-maureen-fondo',
    name: "Maureen Fondo",
    title: "Head, Copyright and Related Rights, ARIPO",
    titleFr: "Cheffe, Copyright and Related Rights, ARIPO",
    image: "/Maureen.png",
    bio: "Maureen Fondo is the Head of Copyright and Related Rights at the African Regional Intellectual Property Organization (ARIPO), bringing over 16 years of expertise in legal and copyright matters. She contributed to the adoption of the Kampala Protocol on Voluntary Registration of Copyright and Related Rights, the ARIPO Model Law on Copyright and Related Rights, and several regional policy frameworks. A DPhil candidate in Intellectual Property at Africa University, she also lectures on ARIPO's Master's programme in Intellectual Property and has authored copyright publications across the continent.",
    bioFr: "Maureen Fondo est la responsable du Copyright and Related Rights à l'Organisation Régionale Africaine de la Propriété Intellectuelle (ARIPO) et possède plus de 16 ans d'expérience en droit et en droit d'auteur. Elle a contribué à l'adoption du Protocole de Kampala sur l'enregistrement volontaire des droits d'auteur et droits connexes, de la loi-modèle de l'ARIPO sur le droit d'auteur et les droits connexes ainsi que de plusieurs cadres politiques régionaux. Doctorante en propriété intellectuelle à Africa University, elle enseigne également dans le programme de Master en propriété intellectuelle de l'ARIPO et a publié de nombreuses ressources sur le droit d'auteur en Afrique.",
    achievements: [
      "Head of Copyright and Related Rights, ARIPO",
      "Contributor to the Kampala Protocol and ARIPO Model Law on Copyright and Related Rights",
      "Author of multiple copyright policy documents and publications for ARIPO Member States",
      "Former Senior Legal Officer at the Copyright Society of Tanzania (COSOTA)"
    ],
    achievementsFr: [
      "Responsable du Copyright and Related Rights, ARIPO",
      "Contributrice au Protocole de Kampala et à la loi-modèle de l'ARIPO sur le droit d'auteur et les droits connexes",
      "Auteure de nombreux documents politiques et publications sur le droit d'auteur pour les États membres de l'ARIPO",
      "Ancienne juriste principale à la Copyright Society of Tanzania (COSOTA)"
    ],
    expertise: [
      "Copyright and related rights law",
      "Intellectual property policy harmonisation",
      "Dispute resolution and licensing",
      "Legal capacity building and training"
    ],
    expertiseFr: [
      "Droit d'auteur et droits connexes",
      "Harmonisation des politiques de propriété intellectuelle",
      "Résolution des litiges et licences",
      "Renforcement des capacités juridiques et formation"
    ],
    impact: [
      "Strengthening continental frameworks that protect creators and creative businesses",
      "Advancing capacity development for copyright offices across Africa",
      "Supporting legislation that balances creators' rights with access to knowledge"
    ],
    impactFr: [
      "Renforcer les cadres continentaux protégeant les créateurs et les entreprises créatives",
      "Faire progresser le développement des capacités des offices du droit d'auteur en Afrique",
      "Soutenir des législations équilibrant droits des créateurs et accès à la connaissance"
    ],
    education: [
      "DPhil (in progress) in Intellectual Property, Africa University, Zimbabwe",
      "Master's in Intellectual Property, Africa University",
      "Post Graduate Diploma in Legal Practice, Law School of Tanzania",
      "Bachelor of Laws (LLB), Tumaini University (Iringa University), Tanzania"
    ],
    educationFr: [
      "Doctorat (en cours) en propriété intellectuelle, Africa University, Zimbabwe",
      "Master en propriété intellectuelle, Africa University",
      "Diplôme de pratique juridique, Law School of Tanzania",
      "Licence en droit (LLB), Tumaini University (Iringa University), Tanzanie"
    ],
    order: 24,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-marielle-barrow-maignan',
    name: "Dr. Marielle Barrow Maignan",
    title: "CEO & Editor-in-Chief, Caribbean InTransit | Creative Industries Strategist",
    titleFr: "PDG et Rédactrice en Chef, Caribbean InTransit | Stratège des Industries Créatives",
      image: "/Marielle.jpg",
      bio: "Dr. Marielle Barrow Maignan is a Fulbright Scholar, social entrepreneur, arts management consultant, and visual artist. As Founder, CEO, and Editor-in-Chief of Caribbean InTransit, she leads a network operating across 13 countries to deliver an open-access journal, arts festivals, research projects, and the This is ME programme. She previously coordinated the Cultural and Creative Industries Innovation Fund (CIIF) at a regional development bank, designing accelerators and knowledge products for 19 borrowing member countries. Her consultancy portfolio includes the OECS, CARICOM, and Broward County (USA), where she applies arts-based socio-economic interventions to drive inclusive development.",
      bioFr: "Dr Marielle Barrow Maignan est boursière Fulbright, entrepreneure sociale, consultante en gestion des arts et artiste visuelle. Fondatrice, PDG et rédactrice en chef de Caribbean InTransit, elle dirige un réseau présent dans 13 pays qui produit une revue en libre accès, des festivals artistiques, des projets de recherche et le programme This is ME. Elle a précédemment coordonné le Cultural and Creative Industries Innovation Fund (CIIF) d'une banque de développement régionale, concevant des accélérateurs et des ressources de connaissance pour 19 pays membres. Son portefeuille de conseil couvre l'OECO, la CARICOM et le comté de Broward (États-Unis), où elle déploie des interventions socio-économiques fondées sur les arts pour favoriser un développement inclusif.",
      achievements: [
        "Founder, CEO and Editor-in-Chief of Caribbean InTransit",
        "Former Coordinator of the Cultural and Creative Industries Innovation Fund (CIIF)",
        "Designed and implemented accelerators across music, film, animation, fashion, festivals, and data for 19 Caribbean countries",
        "Fulbright Scholar and recognised creative industries strategist",
        "Consultant for organisations including OECS, CARICOM and Broward County, USA"
      ],
      achievementsFr: [
        "Fondatrice, PDG et rédactrice en chef de Caribbean InTransit",
        "Ancienne coordinatrice du Cultural and Creative Industries Innovation Fund (CIIF)",
        "Conception et mise en œuvre d'accélérateurs couvrant musique, film, animation, mode, festivals et données pour 19 pays caribéens",
        "Boursière Fulbright et stratège reconnue des industries créatives",
        "Consultante pour des organisations telles que l'OECO, la CARICOM et le comté de Broward (États-Unis)"
      ],
      expertise: [
        "Creative economy ecosystem design",
        "Programme and accelerator development",
        "Arts-based social innovation",
        "Research and knowledge product development",
        "Cross-regional cultural policy and partnerships"
      ],
      expertiseFr: [
        "Conception d'écosystèmes de l'économie créative",
        "Développement de programmes et d'accélérateurs",
        "Innovation sociale fondée sur les arts",
        "Développement de recherches et de ressources de connaissances",
        "Politiques culturelles et partenariats interrégionaux"
      ],
      impact: [
        "Driving socio-economic transformation through arts-led initiatives",
        "Building collaborative platforms that connect Caribbean and global creative practitioners",
        "Supporting policy makers with data, toolkits, and community-of-practice frameworks"
      ],
      impactFr: [
        "Stimuler la transformation socio-économique grâce à des initiatives portées par les arts",
        "Construire des plateformes collaboratives reliant praticiens créatifs caribéens et internationaux",
        "Soutenir les décideurs par des données, des outils et des cadres de communautés de pratique"
      ],
      education: [
        "Fulbright Scholar (USA)",
        "PhD-level research in arts management and creative economies"
      ],
      educationFr: [
        "Boursière Fulbright (États-Unis)",
        "Recherches de niveau doctorat en gestion des arts et économies créatives"
      ],
      order: 25,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-felix-chege',
      name: "Felix Chege",
      title: "Founder & CEO, Real Sources Africa | Board Member, MSEA & AfCFTA Private Sector Platform",
      titleFr: "Fondateur et CEO, Real Sources Africa | Membre du Conseil, MSEA & Plateforme du Secteur Privé de la ZLECAf",
      image: "/Felix.jpg",
      bio: "Felix Chege is the Founder and CEO of Real Sources Africa (RSA), Kenya's AfCFTA Trading Company, where he leads the TradeConnect Africa Initiative encompassing DealHouse, BiasharaLink, Asili Markets, and the Policy Tracker. A visionary champion of intra-African commerce, he has facilitated landmark SME exports under the AfCFTA to Zambia, the DRC, and South Sudan while designing innovative trade finance and logistics solutions. Felix also serves on the Boards of the Micro and Small Enterprise Authority (MSEA) and the AfCFTA Private Sector Platform, and previously chaired the Intra-Africa Trade Committee of the Kenya National Chamber of Commerce and Industry.",
      bioFr: "Felix Chege est le fondateur et CEO de Real Sources Africa (RSA), la société commerçante kényane dédiée à la ZLECAf, où il dirige l'initiative TradeConnect Africa regroupant DealHouse, BiasharaLink, Asili Markets et Policy Tracker. Visionnaire du commerce intra-africain, il a facilité les premières exportations de PME kényanes sous la ZLECAf vers la Zambie, la RDC et le Soudan du Sud tout en concevant des solutions innovantes de financement et de logistique commerciale. Felix siège également aux conseils de la Micro and Small Enterprise Authority (MSEA) et de la Plateforme du secteur privé de la ZLECAf, et a présidé le Comité du commerce intra-africain de la Chambre nationale de commerce et d'industrie du Kenya.",
      achievements: [
        "Founder & CEO, Real Sources Africa and architect of the TradeConnect Africa Initiative",
        "Board Member, Micro and Small Enterprise Authority (MSEA)",
        "Board Member, AfCFTA Private Sector Platform",
        "Former Chair, Intra-Africa Trade Committee, Kenya National Chamber of Commerce and Industry",
        "Delivered first Kenyan SME exports under AfCFTA to Zambia, DRC, and South Sudan",
        "Regular speaker on intra-African trade at Economist Impact, Afreximbank forums, and CNBC Africa platforms"
      ],
      achievementsFr: [
        "Fondateur et CEO de Real Sources Africa et concepteur de l'initiative TradeConnect Africa",
        "Membre du conseil de la Micro and Small Enterprise Authority (MSEA)",
        "Membre du conseil de la Plateforme du secteur privé de la ZLECAf",
        "Ancien président du Comité du commerce intra-africain, Chambre nationale de commerce et d'industrie du Kenya",
        "Pilotage des premières exportations de PME kényanes sous la ZLECAf vers la Zambie, la RDC et le Soudan du Sud",
        "Intervenant régulier sur le commerce intra-africain (Economist Impact, forums Afreximbank, CNBC Africa, etc.)"
      ],
      expertise: [
        "Intra-African trade strategy",
        "Trade finance and logistics innovation",
        "Public-private partnerships",
        "SME export readiness",
        "Policy advocacy and stakeholder mobilisation"
      ],
      expertiseFr: [
        "Stratégie de commerce intra-africain",
        "Innovation en financement et logistique commerciale",
        "Partenariats public-privé",
        "Préparation à l'exportation des PME",
        "Plaidoyer politique et mobilisation des parties prenantes"
      ],
      impact: [
        "Creating end-to-end solutions that unlock AfCFTA opportunities for African SMEs",
        "Translating continental trade policy into actionable market pathways",
        "Championing data-driven insights that accelerate cross-border commerce"
      ],
      impactFr: [
        "Créer des solutions intégrées exploitant la ZLECAf pour les PME africaines",
        "Transformer les politiques commerciales continentales en opportunités concrètes de marché",
        "Promouvoir des analyses fondées sur les données pour accélérer le commerce transfrontalier"
      ],
      order: 26,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-ana-ballo',
      name: "Ana Ballo",
      title: "Producer, Director & CEO, BA Consulting | Former Director, RTI Distribution",
      titleFr: "Productrice, Réalisatrice et PDG, BA Consulting | Ancienne Directrice, RTI Distribution",
      image: "/Ana.png",
      bio: "Ana Ballo is a Côte d'Ivoire-based audiovisual leader with over 30 years of experience as a producer, director, and distributor. As Director of RTI Distribution (2018–2025) she expanded the catalogue from 700 to over 1,000 hours, forged partnerships with CANAL+, TV5 Monde, SABC, and ZEE TV, and executive-produced more than 150 hours of content. Through BA Consulting she now supports access to global markets and capacity building for African producers, drawing on earlier successes including the comedy series \"On est où là?\", the 18-episode saga \"Ablaha Pokou\", and the award-winning \"Résidence Akwaba\" for UNHCR.",
      bioFr: "Ana Ballo est une dirigeante ivoirienne de l'audiovisuel forte de plus de 30 ans d'expérience en production, réalisation et distribution. En tant que directrice de RTI Distribution (2018–2025), elle a fait passer le catalogue de 700 à plus de 1 000 heures, conclu des partenariats avec CANAL+, TV5 Monde, SABC et ZEE TV, et produit plus de 150 heures de contenus. À travers BA Consulting, elle facilite désormais l'accès aux marchés mondiaux et renforce les compétences des producteurs africains, s'appuyant sur des succès tels que la série humoristique « On est où là? », la saga « Ablaha Pokou » (18 épisodes) et le drame « Résidence Akwaba » réalisé pour le HCR.",
      achievements: [
        "Former Director of RTI Distribution (2018–2025) overseeing international sales and partnerships",
        "Executive producer/director of iconic programmes including \"On est où là?\" and \"Résidence Akwaba\"",
        "Founder of BA Consulting supporting African producers with market access and training",
        "Led RTI Distribution's expansion to over 1,000 hours of content and global syndication"
      ],
      achievementsFr: [
        "Ancienne directrice de RTI Distribution (2018–2025) supervisant ventes internationales et partenariats",
        "Productrice/réalisatrice de programmes emblématiques tels que « On est où là? » et « Résidence Akwaba »",
        "Fondatrice de BA Consulting accompagnant les producteurs africains vers les marchés mondiaux et la formation",
        "Piloté l'expansion du catalogue de RTI Distribution au-delà de 1 000 heures et sa syndication internationale"
      ],
      expertise: [
        "Content production and commissioning",
        "International distribution and sales",
        "Market development and partnerships",
        "Capacity building for audiovisual professionals"
      ],
      expertiseFr: [
        "Production et commande de contenus",
        "Distribution et ventes internationales",
        "Développement de marchés et partenariats",
        "Renforcement des capacités des professionnels audiovisuels"
      ],
      impact: [
        "Expanding global audiences for African storytelling",
        "Professionalising distribution standards across West Africa",
        "Mentoring producers to develop commercially viable content"
      ],
      impactFr: [
        "Élargir les publics mondiaux pour la narration africaine",
        "Professionnaliser les standards de distribution en Afrique de l'Ouest",
        "Mentorer des producteurs pour créer des contenus commercialement viables"
      ],
      order: 27,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-judysheila-mugo',
      name: "JudySheila N. Mugo",
      title: "Director of Content, Pulse East Africa",
      titleFr: "Directrice du Contenu, Pulse East Africa",
      image: "/JudySheila.jpeg",
      bio: "JudySheila N. Mugo is the Director of Content at Pulse East Africa and a multimedia journalist with more than a decade of experience across digital, video, and social platforms. She leads Pulse's editorial strategy, mentorship programmes, and the Pulse Influencer Awards in Kenya and Uganda, helping the brand win the 2025 TikTok Trendsetter Award. Passionate about mental wellbeing, she is currently studying psychology at the Kenya Institute of Professional Counselors and advocates for youth empowerment and positive digital storytelling.",
      bioFr: "JudySheila N. Mugo est directrice du contenu de Pulse East Africa et journaliste multimédia forte de plus de dix ans d'expérience sur les plateformes digitales, vidéo et sociales. Elle pilote la stratégie éditoriale, les programmes de mentorat et les Pulse Influencer Awards au Kenya et en Ouganda, contribuant à l'obtention du TikTok Trendsetter Award 2025. Passionnée par le bien-être mental, elle étudie la psychologie au Kenya Institute of Professional Counselors et milite pour l'autonomisation des jeunes et une narration numérique positive.",
      achievements: [
        "Director of Content, Pulse East Africa",
        "Lead organiser of the Pulse Influencer Awards (Kenya and Uganda)",
        "Recipient of the 2025 TikTok Trendsetter Award with Pulse East Africa",
        "Mentor to emerging journalists and content creators across the region"
      ],
      achievementsFr: [
        "Directrice du contenu, Pulse East Africa",
        "Organisatrice principale des Pulse Influencer Awards (Kenya et Ouganda)",
        "Lauréate du TikTok Trendsetter Award 2025 avec Pulse East Africa",
        "Mentore de journalistes et créateurs de contenu émergents dans la région"
      ],
      expertise: [
        "Digital media leadership",
        "Content strategy and storytelling",
        "Audience engagement and social media",
        "Mentorship and talent development",
        "Mental health advocacy"
      ],
      expertiseFr: [
        "Leadership des médias numériques",
        "Stratégie de contenu et narration",
        "Engagement des audiences et réseaux sociaux",
        "Mentorat et développement des talents",
        "Plaidoyer pour la santé mentale"
      ],
      impact: [
        "Building vibrant digital communities for East Africa's youth",
        "Highlighting creators and influencers who drive positive cultural dialogues",
        "Championing mental wellness conversations within media spaces"
      ],
      impactFr: [
        "Construire des communautés numériques dynamiques pour la jeunesse d'Afrique de l'Est",
        "Mettre en lumière des créateurs et influenceurs qui stimulent des dialogues culturels positifs",
        "Porter les discussions sur le bien-être mental dans les médias"
      ],
      education: [
        "Psychology studies, Kenya Institute of Professional Counselors (in progress)"
      ],
      educationFr: [
        "Études en psychologie, Kenya Institute of Professional Counselors (en cours)"
      ],
      order: 28,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-otsetswe-koboyankwe',
      name: "Otsetswe Koboyankwe",
      title: "Acting Chief Executive Officer, National Arts Council of Botswana",
      titleFr: "Directrice Générale par intérim, National Arts Council of Botswana",
      image: "/Otsetswe.png",
      bio: "Otsetswe Koboyankwe is the Acting Chief Executive Officer of the National Arts Council of Botswana. A lawyer with over 16 years of experience across government and corporate sectors, she advances international partnerships to develop and commercialise Botswana's creative industries. She holds a Bachelor of Laws from the University of Botswana, an LLM in Rule of Law for Development from Loyola University Chicago, and a Master's in Law from Leiden University. Her leadership training includes programmes at the Lee Kuan Yew School of Public Policy in Singapore.",
      bioFr: "Otsetswe Koboyankwe est directrice générale par intérim du National Arts Council of Botswana. Juriste forte de plus de 16 ans d'expérience dans les secteurs public et privé, elle développe des partenariats internationaux pour promouvoir et commercialiser les industries créatives du Botswana. Elle est titulaire d'une licence en droit de l'Université du Botswana, d'un LLM en Rule of Law for Development de Loyola University Chicago et d'un Master en droit de l'Université de Leiden. Elle a également suivi des programmes de leadership à la Lee Kuan Yew School of Public Policy (Singapour).",
      achievements: [
        "Acting CEO, National Arts Council of Botswana",
        "Led international collaborations that elevate Botswana's artists and filmmakers",
        "16+ years of legal experience spanning government and corporate sectors",
        "Represented Botswana in regional and international forums including ICAO and AFCAC"
      ],
      achievementsFr: [
        "Directrice générale par intérim, National Arts Council of Botswana",
        "Conduite de collaborations internationales valorisant artistes et cinéastes botswanais",
        "Plus de 16 ans d'expérience juridique dans les secteurs public et privé",
        "Représentation du Botswana dans des forums régionaux et internationaux, dont l'OACI et l'AFCAC"
      ],
      expertise: [
        "Cultural policy and creative industries development",
        "International legal and regulatory frameworks",
        "Strategic partnerships and stakeholder relations",
        "Governance and ethical leadership"
      ],
      expertiseFr: [
        "Politiques culturelles et développement des industries créatives",
        "Cadres juridiques et réglementaires internationaux",
        "Partenariats stratégiques et relations avec les parties prenantes",
        "Gouvernance et leadership éthique"
      ],
      impact: [
        "Elevating Botswana's creative economy on regional and global stages",
        "Building enabling environments for artists, filmmakers, and cultural practitioners",
        "Championing ethical leadership and inclusive cultural growth"
      ],
      impactFr: [
        "Valoriser l'économie créative du Botswana sur les scènes régionales et mondiales",
        "Créer des environnements propices pour les artistes, cinéastes et acteurs culturels",
        "Promouvoir un leadership éthique et une croissance culturelle inclusive"
      ],
      education: [
        "Master of Laws (LLM) in Rule of Law for Development, Loyola University Chicago",
        "Master of Laws, Leiden University, Netherlands",
        "Bachelor of Laws (LLB), University of Botswana",
        "Leadership Management Programme & Leaders Programme in Policy, Lee Kuan Yew School of Public Policy (Singapore)"
      ],
      educationFr: [
        "Master of Laws (LLM) en Rule of Law for Development, Loyola University Chicago",
        "Master en droit, Université de Leiden (Pays-Bas)",
        "Licence en droit (LLB), Université du Botswana",
        "Leadership Management Programme & Leaders Programme in Policy, Lee Kuan Yew School of Public Policy (Singapour)"
      ],
      order: 29,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-koki-chiepe',
      name: "Koki Chiepe",
      title: "Designer & Creative Director, Koki Kamala",
      titleFr: "Designer et Directrice Créative, Koki Kamala",
      image: "/Keketso.jpeg",
      bio: "Koki Chiepe is the visionary designer behind Koki Kamala, a luxury fashion and lifestyle brand that fuses African heritage with contemporary elegance. Collaborating with artisans across Kenya, India, Indonesia, and Botswana, she crafts limited-edition leather pieces, woven accessories, and statement jewellery that embody slow fashion principles. Committed to sustainable materials, fair trade, and women-led production, Koki Kamala champions community-based manufacturing while delivering globally resonant design.",
      bioFr: "Koki Chiepe est la designer visionnaire à l'origine de Koki Kamala, marque de mode et de lifestyle de luxe alliant héritage africain et élégance contemporaine. En collaboration avec des artisans du Kenya, de l'Inde, de l'Indonésie et du Botswana, elle crée des pièces en cuir en édition limitée, des accessoires tissés et des bijoux d'exception inscrits dans la philosophie de la slow fashion. Attachée aux matériaux durables, au commerce équitable et à la production portée par les femmes, Koki Kamala défend une fabrication communautaire tout en proposant un design à résonance mondiale.",
      achievements: [
        "Founder and Creative Director of the global luxury brand Koki Kamala",
        "Collaborates with artisan collectives to produce limited-edition sustainable pieces",
        "Advocate for women-led production, fair trade, and community manufacturing",
        "Showcases African craftsmanship through globally acclaimed collections"
      ],
      achievementsFr: [
        "Fondatrice et directrice créative de la marque de luxe internationale Koki Kamala",
        "Collaboration avec des collectifs d'artisans pour produire des pièces durables en édition limitée",
        "Porte-parole de la production dirigée par les femmes, du commerce équitable et de la fabrication communautaire",
        "Mise en valeur de l'artisanat africain à travers des collections reconnues dans le monde"
      ],
      expertise: [
        "Luxury fashion design and creative direction",
        "Artisan collaboration and ethical supply chains",
        "Sustainable materials and product innovation",
        "Brand storytelling and global market positioning"
      ],
      expertiseFr: [
        "Design de mode de luxe et direction créative",
        "Collaboration avec les artisans et chaînes d'approvisionnement éthiques",
        "Matériaux durables et innovation produit",
        "Storytelling de marque et positionnement sur les marchés mondiaux"
      ],
      impact: [
        "Celebrating African craftsmanship through premium design",
        "Creating inclusive economic opportunities for artisan communities",
        "Championing sustainability within luxury fashion"
      ],
      impactFr: [
        "Célébrer l'artisanat africain à travers un design haut de gamme",
        "Créer des opportunités économiques inclusives pour les communautés artisanes",
        "Promouvoir la durabilité dans la mode de luxe"
      ],
      order: 30,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-chadzanso-mwenda',
      name: "Chadzanso Justina Mwenda",
      title: "Founder, Inthanda Film Distribution Limited | International Actress, Zambia",
      titleFr: "Fondatrice, Inthanda Film Distribution Limited | Actrice Internationale, Zambie",
      image: "/Chadzanso.png",
      bio: "Chadzanso Justina Mwenda, popularly known as Juvi, is a Zambian international award-winning actress and founder of Inthanda Film Distribution Limited. With over two decades in film and acting, she has featured in productions across Nollywood, Uganda, and South Africa. Her company aggregates and distributes SADC-region films and series to global streaming platforms, in partnership with Circuits TV Global Solutions. Trained at TEVETA Zambia and City Varsity School of Media and Creative Arts (Johannesburg), she continues to advocate for African storytelling and equitable market access.",
      bioFr: "Chadzanso Justina Mwenda, surnommée Juvi, est une actrice zambienne internationale primée et fondatrice d'Inthanda Film Distribution Limited. Forte de plus de vingt ans de carrière dans le cinéma et le théâtre, elle a joué dans des productions au Nigeria, en Ouganda et en Afrique du Sud. Son entreprise agrège et distribue des films et séries de la région SADC vers des plateformes mondiales de streaming, en partenariat avec Circuits TV Global Solutions. Formée à TEVETA Zambia et à la City Varsity School of Media and Creative Arts (Johannesburg), elle plaide pour la narration africaine et un accès équitable aux marchés.",
      achievements: [
        "Founder of Inthanda Film Distribution Limited",
        "International award-winning actress with credits across SADC and Nollywood markets",
        "Partner of Circuits TV Global Solutions for virtual cinema streaming",
        "Advocate for Southern African film distribution to global platforms"
      ],
      achievementsFr: [
        "Fondatrice d'Inthanda Film Distribution Limited",
        "Actrice internationale primée avec des rôles dans les marchés SADC et Nollywood",
        "Partenaire de Circuits TV Global Solutions pour la diffusion en streaming",
        "Porte-parole de la distribution des films d'Afrique australe vers les plateformes mondiales"
      ],
      expertise: [
        "Film acting and performance",
        "Film aggregation and distribution",
        "Cross-border production partnerships",
        "Creative entrepreneurship"
      ],
      expertiseFr: [
        "Jeu d'acteur au cinéma",
        "Agrégation et distribution de films",
        "Partenariats de production transfrontaliers",
        "Entrepreneuriat créatif"
      ],
      impact: [
        "Expanding the visibility of Southern African films on international platforms",
        "Building distribution pathways for Zambia, Malawi, and Zimbabwean productions",
        "Mentoring emerging actors and distributors in the SADC region"
      ],
      impactFr: [
        "Accroître la visibilité des films d'Afrique australe sur les plateformes internationales",
        "Construire des canaux de distribution pour les productions zambiennes, malawites et zimbabwéennes",
        "Mentorer des acteurs et distributeurs émergents dans la région SADC"
      ],
      education: [
        "Diploma, TEVETA Zambia",
        "Advanced training, City Varsity School of Media and Creative Arts, Johannesburg"
      ],
      educationFr: [
        "Diplôme, TEVETA Zambia",
        "Formation avancée, City Varsity School of Media and Creative Arts, Johannesburg"
      ],
      order: 31,
      isActive: true,
      timestamp: null
    },
    {
      id: 'initial-mike-otieno',
      name: "Mike Otieno",
      title: "Co-Founder & President, Wowzi, Kenya",
      titleFr: "Cofondateur et Président, Wowzi, Kenya",
      image: "/Mike.png",
      bio: "Mike Otieno is the Co-Founder and President of Wowzi, a technology platform that democratises influencer marketing by helping businesses tap into everyday digital creators. Formerly with McKinsey & Company, The Palladium Group, and Uber, he combines strategy expertise with community building to unlock jobs in the gig economy. Mike also founded the Presidential Fellows Program supporting Kenyans returning from overseas universities and leads the Internations Nairobi Professional Networking group. He curates CEO networking forums and speaks at conferences including Africa 3.0 on the future of Africa's creative and digital economy.",
      bioFr: "Mike Otieno est le cofondateur et président de Wowzi, une plateforme technologique qui démocratise le marketing d'influence en permettant aux entreprises de collaborer avec des créateurs numériques ordinaires. Ancien consultant chez McKinsey & Company, The Palladium Group et Uber, il associe expertise stratégique et construction de communautés pour créer des emplois dans l'économie des petits boulots. Mike est également le fondateur du Presidential Fellows Program, qui accompagne les Kenyans diplômés à l'étranger, et dirige le groupe Internations Nairobi Professional Networking. Il organise des forums de réseautage pour dirigeants et intervient à des conférences telles qu'Africa 3.0 sur l'avenir de l'économie créative et numérique africaine.",
      achievements: [
        "Co-Founder and President of Wowzi, creating gig-economy influencer opportunities",
        "Founder of the Presidential Fellows Program with a 100% job placement track record",
        "Leader of the Internations Nairobi Professional Networking community",
        "Former strategy consultant with McKinsey & Company and The Palladium Group",
        "Featured speaker at Africa 3.0 and international forums on creative and digital economies"
      ],
      achievementsFr: [
        "Cofondateur et président de Wowzi, créant des opportunités d'influenceurs dans l'économie des petits boulots",
        "Fondateur du Presidential Fellows Program avec un taux de placement de 100 %",
        "Responsable de la communauté Internations Nairobi Professional Networking",
        "Ancien consultant en stratégie chez McKinsey & Company et The Palladium Group",
        "Intervenant à Africa 3.0 et dans des forums internationaux sur les économies créatives et numériques"
      ],
      expertise: [
        "Influencer marketing and digital platforms",
        "Gig economy job creation",
        "Strategic partnerships and community building",
        "Leadership development and mentorship",
        "Innovation in creative and digital ecosystems"
      ],
      expertiseFr: [
        "Marketing d'influence et plateformes numériques",
        "Création d'emplois dans l'économie des petits boulots",
        "Partenariats stratégiques et développement de communautés",
        "Développement du leadership et mentorat",
        "Innovation dans les écosystèmes créatifs et numériques"
      ],
      impact: [
        "Democratising influencer marketing for SMEs across Africa",
        "Creating pathways for youth employment in the digital creative sector",
        "Connecting global professionals through networking and leadership forums"
      ],
      impactFr: [
        "Démocratiser le marketing d'influence pour les PME à travers l'Afrique",
        "Créer des opportunités d'emploi pour les jeunes dans le secteur créatif numérique",
        "Connecter des professionnels du monde entier via des réseaux et forums de leadership"
      ],
      education: [
        "Executive leadership programmes and global fellowships (various)"
      ],
      educationFr: [
        "Programmes de leadership exécutif et bourses internationales (divers)"
      ],
      order: 32,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-laura-ekumbo',
    name: "Laura Ekumbo",
    title: "Multimedia Storyteller & Entrepreneur, Kenya",
    titleFr: "Conteuse multimédia et entrepreneure, Kenya",
    image: "/Laura.jpg",
    bio: "Laura Ekumbo is a multimedia storyteller, entrepreneur, and maker fueled by music, movement, and memory keeping. She has executive-produced, directed, written, edited, voiced, and performed more than 100 multilingual stories, championing narratives that spotlight African women and girls. Laura is the co-founder of The LAM Sisterhood, a multi-award-winning content studio that crafts immersive storytelling experiences across audio, film, theatre, and digital platforms.",
    bioFr: "Laura Ekumbo est une conteuse multimédia, entrepreneure et créatrice portée par la musique, le mouvement et la valorisation de la mémoire. Elle a produit, réalisé, écrit, monté, interprété et diffusé plus de 100 récits multilingues, mettant en lumière les histoires des femmes et des filles africaines. Laura est cofondatrice de The LAM Sisterhood, un studio de contenu multi-primé qui conçoit des expériences immersives à travers l'audio, le cinéma, le théâtre et les plateformes numériques.",
    achievements: [
      "Co-founder of The LAM Sisterhood, a multi-award-winning storytelling studio",
      "Executive-produced, directed, written, edited, voiced, and performed in over 100 multilingual stories",
      "Built multidisciplinary creative projects that blend audio, film, theatre, and digital media"
    ],
    achievementsFr: [
      "Cofondatrice de The LAM Sisterhood, un studio de narration multi-primé",
      "A produit, réalisé, écrit, monté, interprété et diffusé plus de 100 récits multilingues",
      "A développé des projets créatifs multidisciplinaires mêlant audio, cinéma, théâtre et médias numériques"
    ],
    expertise: [
      "Multimedia storytelling",
      "Creative entrepreneurship",
      "Women-centered narrative design",
      "Immersive content production"
    ],
    expertiseFr: [
      "Narration multimédia",
      "Entrepreneuriat créatif",
      "Conception de récits centrés sur les femmes",
      "Production de contenus immersifs"
    ],
    impact: [
      "Amplifying African voices through multilingual storytelling formats",
      "Co-creating safe and joyful spaces for women-led narratives",
      "Expanding access to stories that inspire community memory and imagination"
    ],
    impactFr: [
      "Amplifier les voix africaines grâce à des formats narratifs multilingues",
      "Cocréer des espaces sûrs et joyeux pour des récits portés par des femmes",
      "Élargir l'accès à des histoires qui nourrissent la mémoire collective et l'imagination"
    ],
    order: 33,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-makeba-boateng',
    name: "Makeba Nana Pokua Boateng, APR, USPAP-ISA",
    title: "Public Relations Consultant, Independent Curator, Archivist & Personal Property Appraiser | Founder & Director, Fashion Forum Africa",
    titleFr: "Consultante en Relations Publiques, Commissaire Indépendante, Archiviste et Évaluatrice de Biens Personnels | Fondatrice et Directrice, Fashion Forum Africa",
    image: "/Makeba.jpg",
    bio: "Makeba Nana Pokua Boateng is a Public Relations consultant, independent curator, archivist, and qualified personal property appraiser with a specialization in textiles. With over 35 years of experience in the creative, fashion, and cultural sectors, she is the Founder & Director of Fashion Forum Africa, which promotes African fashion heritage through research, exhibitions, and education. She runs Boaten Personal Property Appraisals, valuing African textiles, garments, and design pieces. Her curatorial and archival work includes collaborations with the Victoria & Albert Museum, contributing to major exhibitions and archival projects. Trained at Sotheby's Institute of Art, Middlesex University, and the V&A, she is accredited by the International Society of Appraisers (ISA) and the Institute of Public Relations, Ghana (APR). She serves as Treasurer of the Ghana Culture Forum. Her vision for Fashion Forum Africa is to document, safeguard, and elevate Africa's fashion legacy by building a globally-recognised platform for designers, textile makers, and cultural stakeholders.",
    bioFr: "Makeba Nana Pokua Boateng est consultante en relations publiques, commissaire indépendante, archiviste et évaluatrice qualifiée de biens personnels spécialisée dans les textiles. Forte de plus de 35 ans d'expérience dans les secteurs créatifs, de la mode et culturels, elle est fondatrice et directrice de Fashion Forum Africa, qui promeut le patrimoine de la mode africaine par la recherche, les expositions et l'éducation. Elle dirige Boaten Personal Property Appraisals, évaluant les textiles, vêtements et pièces de design africains. Son travail curatorial et archivistique comprend des collaborations avec le Victoria & Albert Museum, contribuant à des expositions majeures et des projets d'archives. Formée au Sotheby's Institute of Art, à l'Université de Middlesex et au V&A, elle est accréditée par l'International Society of Appraisers (ISA) et l'Institute of Public Relations, Ghana (APR). Elle est trésorière du Ghana Culture Forum. Sa vision pour Fashion Forum Africa est de documenter, préserver et élever le patrimoine de la mode africaine en construisant une plateforme mondialement reconnue pour les designers, créateurs de textiles et parties prenantes culturelles.",
    achievements: [
      "Founder & Director of Fashion Forum Africa, promoting African fashion heritage",
      "Over 35 years of experience in creative, fashion, and cultural sectors",
      "Qualified personal property appraiser specializing in textiles (USPAP-ISA accredited)",
      "Runs Boaten Personal Property Appraisals, valuing African textiles and design pieces",
      "Curatorial and archival work with the Victoria & Albert Museum",
      "Accredited by International Society of Appraisers (ISA) and Institute of Public Relations, Ghana (APR)",
      "Treasurer of the Ghana Culture Forum",
      "Trained at Sotheby's Institute of Art, Middlesex University, and the V&A"
    ],
    achievementsFr: [
      "Fondatrice et directrice de Fashion Forum Africa, promouvant le patrimoine de la mode africaine",
      "Plus de 35 ans d'expérience dans les secteurs créatifs, de la mode et culturels",
      "Évaluatrice qualifiée de biens personnels spécialisée dans les textiles (accréditée USPAP-ISA)",
      "Dirige Boaten Personal Property Appraisals, évaluant les textiles et pièces de design africains",
      "Travail curatorial et archivistique avec le Victoria & Albert Museum",
      "Accréditée par l'International Society of Appraisers (ISA) et l'Institute of Public Relations, Ghana (APR)",
      "Trésorière du Ghana Culture Forum",
      "Formée au Sotheby's Institute of Art, à l'Université de Middlesex et au V&A"
    ],
    expertise: [
      "Fashion heritage and curation",
      "Textile appraisal and valuation",
      "Public relations and communications",
      "Archival research and documentation",
      "Cultural preservation",
      "Exhibition development",
      "Fashion education and research"
    ],
    expertiseFr: [
      "Patrimoine et curation de la mode",
      "Évaluation et estimation de textiles",
      "Relations publiques et communication",
      "Recherche et documentation archivistiques",
      "Préservation culturelle",
      "Développement d'expositions",
      "Éducation et recherche en mode"
    ],
    impact: [
      "Documenting and safeguarding Africa's fashion legacy through Fashion Forum Africa",
      "Building a globally-recognised platform for African designers and textile makers",
      "Contributing to major exhibitions and archival projects at prestigious institutions",
      "Promoting African fashion heritage through research, exhibitions, and education"
    ],
    impactFr: [
      "Documenter et préserver le patrimoine de la mode africaine à travers Fashion Forum Africa",
      "Construire une plateforme mondialement reconnue pour les designers et créateurs de textiles africains",
      "Contribuer à des expositions majeures et des projets d'archives dans des institutions prestigieuses",
      "Promouvoir le patrimoine de la mode africaine par la recherche, les expositions et l'éducation"
    ],
    education: [
      "Sotheby's Institute of Art",
      "Middlesex University",
      "Victoria & Albert Museum training",
      "International Society of Appraisers (ISA) accreditation",
      "Institute of Public Relations, Ghana (APR) accreditation"
    ],
    educationFr: [
      "Sotheby's Institute of Art",
      "Université de Middlesex",
      "Formation au Victoria & Albert Museum",
      "Accréditation International Society of Appraisers (ISA)",
      "Accréditation Institute of Public Relations, Ghana (APR)"
    ],
    order: 34,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-jermaine-besten',
    name: "Jermaine Besten",
    title: "CEO, WWP Group",
    titleFr: "PDG, WWP Group",
    image: "/Jermaine.jpg",
    bio: "Jermaine Tumelo Besten is the visionary architect and driving force behind WWP Group's evolution into one of Africa's leading experience design, marketing, and live communication powerhouses. With over two decades of hands-on experience across brand strategy, creative direction, and large-scale experiential delivery, Jermaine has built a career defined by innovation, authenticity, and measurable impact. From shaping global campaigns for brands such as Nike, Unilever, South African Tourism, Coca-Cola, MTN, Multichoice, and Standard Bank to spearheading nation-branding initiatives that redefine how Africa presents itself to the world, Jermaine's work is a celebration of culture, creativity, and commercial intelligence. Becoming a Managing Director at just 27, Jermaine has since transformed WWP Group from a boutique agency into a multidisciplinary collective spanning brand consulting, experience architecture, digital innovation, and production excellence. His ability to translate complex ideas into immersive brand ecosystems has earned WWP Group a reputation for delivering unforgettable moments and pioneering firsts across the continent for both global corporates and government institutions. A true collaborator at heart, Jermaine's leadership philosophy — shaped by his background in film and live events — fuses strategic foresight with a people-first ethos. He cultivates spaces where ideas thrive, teams excel, and brands discover their most authentic expressions. Beyond boardrooms and stages, Jermaine invests in the next generation of African creatives through mentorship, youth empowerment, and advocacy for sustainable, inclusive industry growth.",
    bioFr: "Jermaine Tumelo Besten est l'architecte visionnaire et la force motrice derrière l'évolution du WWP Group en l'une des principales puissances africaines en design d'expérience, marketing et communication live. Fort de plus de deux décennies d'expérience pratique en stratégie de marque, direction créative et livraison expérientielle à grande échelle, Jermaine a construit une carrière définie par l'innovation, l'authenticité et l'impact mesurable. De la conception de campagnes mondiales pour des marques telles que Nike, Unilever, South African Tourism, Coca-Cola, MTN, Multichoice et Standard Bank à la direction d'initiatives de nation-branding qui redéfinissent la façon dont l'Afrique se présente au monde, le travail de Jermaine est une célébration de la culture, de la créativité et de l'intelligence commerciale. Devenu directeur général à seulement 27 ans, Jermaine a transformé WWP Group d'une agence boutique en un collectif multidisciplinaire couvrant le conseil en marque, l'architecture d'expérience, l'innovation numérique et l'excellence de production. Sa capacité à traduire des idées complexes en écosystèmes de marque immersifs a valu à WWP Group une réputation pour livrer des moments inoubliables et des premières pionnières à travers le continent pour les entreprises mondiales et les institutions gouvernementales. Collaborateur dans l'âme, la philosophie de leadership de Jermaine — façonnée par son expérience dans le cinéma et les événements live — fusionne la prévoyance stratégique avec une éthique centrée sur les personnes. Il cultive des espaces où les idées prospèrent, les équipes excellent et les marques découvrent leurs expressions les plus authentiques. Au-delà des salles de réunion et des scènes, Jermaine investit dans la prochaine génération de créatifs africains par le mentorat, l'autonomisation des jeunes et le plaidoyer pour une croissance industrielle durable et inclusive.",
    achievements: [
      "CEO of WWP Group, one of Africa's leading experience design and marketing powerhouses",
      "Became Managing Director at age 27, transforming WWP from boutique agency to multidisciplinary collective",
      "Over two decades of experience in brand strategy, creative direction, and large-scale experiential delivery",
      "Shaped global campaigns for Nike, Unilever, South African Tourism, Coca-Cola, MTN, Multichoice, and Standard Bank",
      "Spearheaded nation-branding initiatives that redefine how Africa presents itself to the world",
      "Built reputation for delivering unforgettable moments and pioneering firsts across Africa",
      "Mentor and advocate for next generation of African creatives"
    ],
    achievementsFr: [
      "PDG du WWP Group, l'une des principales puissances africaines en design d'expérience et marketing",
      "Devenu directeur général à 27 ans, transformant WWP d'une agence boutique en collectif multidisciplinaire",
      "Plus de deux décennies d'expérience en stratégie de marque, direction créative et livraison expérientielle à grande échelle",
      "Conçu des campagnes mondiales pour Nike, Unilever, South African Tourism, Coca-Cola, MTN, Multichoice et Standard Bank",
      "Dirigé des initiatives de nation-branding redéfinissant la façon dont l'Afrique se présente au monde",
      "Bâti une réputation pour livrer des moments inoubliables et des premières pionnières à travers l'Afrique",
      "Mentor et défenseur de la prochaine génération de créatifs africains"
    ],
    expertise: [
      "Experience design and architecture",
      "Brand strategy and consulting",
      "Creative direction",
      "Live communication and events",
      "Digital innovation",
      "Nation branding",
      "Large-scale experiential delivery"
    ],
    expertiseFr: [
      "Design et architecture d'expérience",
      "Stratégie et conseil en marque",
      "Direction créative",
      "Communication live et événements",
      "Innovation numérique",
      "Nation-branding",
      "Livraison expérientielle à grande échelle"
    ],
    impact: [
      "Transforming how Africa presents itself to the world through nation-branding initiatives",
      "Delivering unforgettable brand experiences for global corporates and government institutions",
      "Pioneering firsts across the African continent in experience design",
      "Investing in next generation of African creatives through mentorship and youth empowerment",
      "Advocating for sustainable, inclusive industry growth"
    ],
    impactFr: [
      "Transformer la façon dont l'Afrique se présente au monde grâce à des initiatives de nation-branding",
      "Livrer des expériences de marque inoubliables pour les entreprises mondiales et les institutions gouvernementales",
      "Pionnier des premières à travers le continent africain en design d'expérience",
      "Investir dans la prochaine génération de créatifs africains par le mentorat et l'autonomisation des jeunes",
      "Défendre une croissance industrielle durable et inclusive"
    ],
    order: 35,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-frank-murangwa',
    name: "Frank Murangwa",
    title: "Regional Director Africa, International Congress and Convention Association (ICCA)",
    titleFr: "Directeur Régional Afrique, International Congress and Convention Association (ICCA)",
    image: "/Frank.jpeg",
    bio: "Frank Murangwa is the Regional Director Africa for the International Congress and Convention Association (ICCA). In his position, Frank is driving the growth of the Meetings Industry across the African Continent. Prior to his appointment in July 2024, Frank Murangwa was the Director of Destination Marketing for Rwanda Convention Bureau, an organization positioning Rwanda as a leading Meetings, Incentives, Conferences and Exhibitions (MICE) destination on the African continent. His core mandate at RCB was to attract Business Events to Rwanda. He has extensive experience with over 18 years in tourism and Business Events Industry, strategy development, destination marketing, product development and quality assurance. His marketing skills are reinforced by a strong tourism Business Events background. Frank holds a bachelor's degree in Tourism Management from Makerere University of Uganda and a master's degree (Cum Laude) in Tourism Destination Management from Breda University of Applied Science (NHTV) Netherlands. In May 2024 at IMEX Frankfurt, Frank was honored with the late Paul Flackett IMEX Academy Award, which is a recognition for his outstanding contribution to the development of the Business Events Industry in Rwanda and Africa at large. Frank is passionate about Business Events, Tourism and travelling to different destinations to experience new cultures, explore beautiful scenery and enjoys sports as well.",
    bioFr: "Frank Murangwa est le directeur régional Afrique de l'International Congress and Convention Association (ICCA). À ce poste, Frank stimule la croissance de l'industrie des réunions à travers le continent africain. Avant sa nomination en juillet 2024, Frank Murangwa était directeur du marketing de destination pour le Rwanda Convention Bureau, une organisation positionnant le Rwanda comme destination MICE (Meetings, Incentives, Conferences and Exhibitions) de premier plan sur le continent africain. Son mandat principal au RCB était d'attirer les événements d'affaires au Rwanda. Il possède une vaste expérience de plus de 18 ans dans l'industrie du tourisme et des événements d'affaires, le développement de stratégies, le marketing de destination, le développement de produits et l'assurance qualité. Ses compétences marketing sont renforcées par une solide expérience dans le tourisme et les événements d'affaires. Frank est titulaire d'une licence en gestion du tourisme de l'Université de Makerere en Ouganda et d'un master (Cum Laude) en gestion de destination touristique de la Breda University of Applied Science (NHTV) aux Pays-Bas. En mai 2024 à IMEX Francfort, Frank a été honoré du prix IMEX Academy du regretté Paul Flackett, une reconnaissance pour sa contribution exceptionnelle au développement de l'industrie des événements d'affaires au Rwanda et en Afrique en général. Frank est passionné par les événements d'affaires, le tourisme et les voyages vers différentes destinations pour découvrir de nouvelles cultures, explorer de beaux paysages et apprécie également le sport.",
    achievements: [
      "Regional Director Africa for International Congress and Convention Association (ICCA)",
      "Former Director of Destination Marketing for Rwanda Convention Bureau",
      "Over 18 years of experience in tourism and Business Events Industry",
      "Recipient of the late Paul Flackett IMEX Academy Award (May 2024) for outstanding contribution to Business Events Industry in Rwanda and Africa",
      "Positioned Rwanda as a leading MICE destination on the African continent",
      "Extensive experience in strategy development, destination marketing, product development and quality assurance"
    ],
    achievementsFr: [
      "Directeur régional Afrique de l'International Congress and Convention Association (ICCA)",
      "Ancien directeur du marketing de destination pour le Rwanda Convention Bureau",
      "Plus de 18 ans d'expérience dans l'industrie du tourisme et des événements d'affaires",
      "Lauréat du prix IMEX Academy du regretté Paul Flackett (mai 2024) pour contribution exceptionnelle à l'industrie des événements d'affaires au Rwanda et en Afrique",
      "Positionné le Rwanda comme destination MICE de premier plan sur le continent africain",
      "Vaste expérience en développement de stratégies, marketing de destination, développement de produits et assurance qualité"
    ],
    expertise: [
      "Business Events and MICE industry",
      "Destination marketing",
      "Strategy development",
      "Product development",
      "Quality assurance",
      "Tourism management",
      "Convention and congress management"
    ],
    expertiseFr: [
      "Événements d'affaires et industrie MICE",
      "Marketing de destination",
      "Développement de stratégies",
      "Développement de produits",
      "Assurance qualité",
      "Gestion du tourisme",
      "Gestion de conventions et congrès"
    ],
    impact: [
      "Driving growth of the Meetings Industry across the African Continent",
      "Positioning Rwanda as a leading MICE destination in Africa",
      "Contributing to the development of Business Events Industry in Rwanda and Africa",
      "Attracting Business Events to African destinations"
    ],
    impactFr: [
      "Stimuler la croissance de l'industrie des réunions à travers le continent africain",
      "Positionner le Rwanda comme destination MICE de premier plan en Afrique",
      "Contribuer au développement de l'industrie des événements d'affaires au Rwanda et en Afrique",
      "Attirer les événements d'affaires vers les destinations africaines"
    ],
    education: [
      "Master's degree (Cum Laude) in Tourism Destination Management, Breda University of Applied Science (NHTV), Netherlands",
      "Bachelor's degree in Tourism Management, Makerere University, Uganda"
    ],
    educationFr: [
      "Master (Cum Laude) en gestion de destination touristique, Breda University of Applied Science (NHTV), Pays-Bas",
      "Licence en gestion du tourisme, Université de Makerere, Ouganda"
    ],
    order: 36,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-xavier-edwards',
    name: "Xavier Edwards (XAV)",
    title: "Artist - The Sound of Conscious Evolution, Trinidad and Tobago",
    titleFr: "Artiste - Le Son de l'Évolution Consciente, Trinité-et-Tobago",
    image: "/Xavier.jpeg",
    bio: "Xavier Edwards, known artistically as XAV, is a dynamic force in modern music, blending Neo-Soul, Kaiso, and Reggae to create a sound that awakens consciousness. Emerging from a legendary Tobago music dynasty, XAV channels his rich heritage into music that resonates deeply with global audiences. He fuses thought-provoking lyricism with infectious rhythms, setting himself apart as a visionary artist.\n\nXAV's early acclaim includes prestigious awards such as the 2019 Tobago Youth Award, the National Youth Award for Music, and the 2020 Boom Award for Best Hip Hop Song. Tracing his lineage to Benin, West Africa, he weaves African consciousness, love, and sounds into his evolving artistry, crafting music that speaks to identity, heritage, and unity.\n\nHis powerful stage presence has led him to perform at major festivals, including SXSW 2024 Island Wave Stage, Tobago Jazz Festival, Decibel Festival, Fro Fest, Discover Series, and TOMAC Festival, as well as opening for global icons Burna Boy and Morgan Heritage.\n\nWith growing recognition, XAV has received press features in Wordplay Magazine, Fame Magazine, and The Pit London, where his artistry has been praised for its authenticity, depth, and ability to bridge genres. His music has also earned notable playlist support from Colors Studios, Amplify, and Noctis, further cementing his place among today's most promising and forward-thinking artists.\n\nFollowing the success of his Red Pills Only EP campaign, XAV is carving his lane in the global music industry, continuing to push the boundaries of sound and storytelling. 2025 marks a pivotal year for XAV as he prepares to release his highly anticipated debut album, Black Fragments—a deeply personal and culturally rich project set to leave a lasting impact on the international music scene.\n\nXAV is not just an artist—he is a movement, a storyteller, and a bridge between cultures. His journey is only just beginning, and the world is listening.",
    bioFr: "Xavier Edwards, connu artistiquement sous le nom de XAV, est une force dynamique de la musique moderne, fusionnant Neo-Soul, Kaiso et Reggae pour créer un son qui éveille la conscience. Issu d'une dynastie musicale légendaire de Tobago, XAV canalise son riche héritage dans une musique qui résonne profondément avec les publics mondiaux. Il fusionne un lyrisme stimulant avec des rythmes entraînants, se distinguant comme un artiste visionnaire.\n\nLes premières reconnaissances de XAV incluent des prix prestigieux tels que le Tobago Youth Award 2019, le National Youth Award for Music et le Boom Award 2020 pour la meilleure chanson hip-hop. Retraçant sa lignée jusqu'au Bénin, en Afrique de l'Ouest, il tisse la conscience africaine, l'amour et les sons dans son art en évolution, créant une musique qui parle d'identité, d'héritage et d'unité.\n\nSa présence scénique puissante l'a mené à se produire lors de festivals majeurs, notamment SXSW 2024 Island Wave Stage, Tobago Jazz Festival, Decibel Festival, Fro Fest, Discover Series et TOMAC Festival, ainsi qu'à ouvrir pour des icônes mondiales comme Burna Boy et Morgan Heritage.\n\nAvec une reconnaissance croissante, XAV a reçu des articles dans Wordplay Magazine, Fame Magazine et The Pit London, où son art a été salué pour son authenticité, sa profondeur et sa capacité à fusionner les genres. Sa musique a également obtenu un soutien notable de playlists de Colors Studios, Amplify et Noctis, consolidant davantage sa place parmi les artistes les plus prometteurs et avant-gardistes d'aujourd'hui.\n\nSuite au succès de sa campagne EP Red Pills Only, XAV trace sa voie dans l'industrie musicale mondiale, continuant à repousser les limites du son et de la narration. 2025 marque une année charnière pour XAV alors qu'il se prépare à sortir son premier album très attendu, Black Fragments—un projet profondément personnel et culturellement riche destiné à laisser un impact durable sur la scène musicale internationale.\n\nXAV n'est pas seulement un artiste—il est un mouvement, un conteur et un pont entre les cultures. Son voyage ne fait que commencer, et le monde écoute.",
    achievements: [
      "2019 Tobago Youth Award recipient",
      "National Youth Award for Music",
      "2020 Boom Award for Best Hip Hop Song",
      "Performed at SXSW 2024 Island Wave Stage, Tobago Jazz Festival, Decibel Festival, Fro Fest, Discover Series, and TOMAC Festival",
      "Opened for global icons Burna Boy and Morgan Heritage",
      "Featured in Wordplay Magazine, Fame Magazine, and The Pit London",
      "Playlist support from Colors Studios, Amplify, and Noctis",
      "Released Red Pills Only EP campaign",
      "Preparing debut album Black Fragments for 2025 release"
    ],
    achievementsFr: [
      "Lauréat du Tobago Youth Award 2019",
      "National Youth Award for Music",
      "Boom Award 2020 pour la meilleure chanson hip-hop",
      "Performances à SXSW 2024 Island Wave Stage, Tobago Jazz Festival, Decibel Festival, Fro Fest, Discover Series et TOMAC Festival",
      "Ouverture pour les icônes mondiales Burna Boy et Morgan Heritage",
      "Articles dans Wordplay Magazine, Fame Magazine et The Pit London",
      "Soutien de playlists de Colors Studios, Amplify et Noctis",
      "Campagne EP Red Pills Only",
      "Préparation de l'album Black Fragments pour sortie en 2025"
    ],
    expertise: [
      "Neo-Soul, Kaiso, and Reggae fusion",
      "Conscious music and storytelling",
      "Cross-cultural musical expression",
      "Live performance and stage presence",
      "Music production and composition"
    ],
    expertiseFr: [
      "Fusion Neo-Soul, Kaiso et Reggae",
      "Musique consciente et narration",
      "Expression musicale interculturelle",
      "Performance live et présence scénique",
      "Production et composition musicales"
    ],
    impact: [
      "Bridging cultures through music that speaks to identity, heritage, and unity",
      "Representing Trinidad and Tobago's rich musical heritage on global stages",
      "Connecting African diaspora through conscious artistry",
      "Inspiring next generation of Caribbean artists"
    ],
    impactFr: [
      "Créer des ponts entre les cultures à travers une musique qui parle d'identité, d'héritage et d'unité",
      "Représenter le riche héritage musical de Trinité-et-Tobago sur les scènes mondiales",
      "Connecter la diaspora africaine à travers un art conscient",
      "Inspirer la prochaine génération d'artistes caribéens"
    ],
    education: [],
    educationFr: [],
    order: 37,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-osahon-akpata',
    name: "Osahon Akpata",
    title: "Chief Executive Officer, CANEX Creations Inc., Afreximbank, Egypt",
    titleFr: "Directeur Général, CANEX Creations Inc., Afreximbank, Égypte",
    image: "/Osahon.jpeg",
    bio: "Osahon Akpata is a pan-African investor, writer, and creative industry leader with extensive experience in business development, strategy, and finance. He serves as Chief Executive Officer of CANEX Creations Inc. (CCInc), a subsidiary of Afreximbank's Fund for Export Development in Africa, dedicated to acquiring and commercializing intellectual property across Global Africa's creative economy.\n\nOsahon has driven high-impact initiatives spanning film, television, publishing, music, and the visual arts, helping to monetize and globally position African creative assets. Prior to joining Afreximbank, he led SME banking, retail payments, and strategic partnerships at Ecobank Group, and earlier worked with McKinsey & Company, advising CEOs across multiple industries. He began his career at Johnson & Johnson's pharmaceutical division in the United States.\n\nA published author since age 11, Osahon's writing has appeared in Essence, Forbes, and Vogue Italia. He holds an MBA in Media Management from Columbia University.",
    bioFr: "Osahon Akpata est un investisseur panafricain, écrivain et leader de l'industrie créative avec une vaste expérience en développement commercial, stratégie et finance. Il occupe le poste de Directeur Général de CANEX Creations Inc. (CCInc), une filiale du Fonds pour le Développement des Exportations en Afrique d'Afreximbank, dédiée à l'acquisition et à la commercialisation de la propriété intellectuelle dans l'économie créative de l'Afrique mondiale.\n\nOsahon a dirigé des initiatives à fort impact couvrant le cinéma, la télévision, l'édition, la musique et les arts visuels, contribuant à monétiser et positionner mondialement les actifs créatifs africains. Avant de rejoindre Afreximbank, il a dirigé la banque PME, les paiements de détail et les partenariats stratégiques au Groupe Ecobank, et auparavant travaillé avec McKinsey & Company, conseillant des PDG dans plusieurs industries. Il a commencé sa carrière dans la division pharmaceutique de Johnson & Johnson aux États-Unis.\n\nAuteur publié depuis l'âge de 11 ans, les écrits d'Osahon sont parus dans Essence, Forbes et Vogue Italia. Il est titulaire d'un MBA en gestion des médias de l'Université Columbia.",
    achievements: [
      "Chief Executive Officer, CANEX Creations Inc., Afreximbank",
      "Led high-impact initiatives across film, television, publishing, music, and visual arts",
      "Former leadership roles at Ecobank Group in SME banking, retail payments, and strategic partnerships",
      "Former consultant at McKinsey & Company, advising CEOs across multiple industries",
      "Published author since age 11, with work featured in Essence, Forbes, and Vogue Italia",
      "Former professional at Johnson & Johnson's pharmaceutical division"
    ],
    achievementsFr: [
      "Directeur Général, CANEX Creations Inc., Afreximbank",
      "Dirigé des initiatives à fort impact dans le cinéma, la télévision, l'édition, la musique et les arts visuels",
      "Anciens postes de direction au Groupe Ecobank en banque PME, paiements de détail et partenariats stratégiques",
      "Ancien consultant chez McKinsey & Company, conseillant des PDG dans plusieurs industries",
      "Auteur publié depuis l'âge de 11 ans, avec des travaux publiés dans Essence, Forbes et Vogue Italia",
      "Ancien professionnel de la division pharmaceutique de Johnson & Johnson"
    ],
    expertise: [
      "Creative industry investment and IP commercialization",
      "Business development and strategy",
      "Financial services and banking",
      "Media management",
      "Pan-African business development"
    ],
    expertiseFr: [
      "Investissement dans l'industrie créative et commercialisation de la PI",
      "Développement commercial et stratégie",
      "Services financiers et bancaires",
      "Gestion des médias",
      "Développement commercial panafricain"
    ],
    impact: [
      "Monetizing and globally positioning African creative assets",
      "Supporting the growth of Africa's creative economy through strategic investment",
      "Building bridges between creative industries and financial institutions",
      "Advancing intellectual property commercialization across Global Africa"
    ],
    impactFr: [
      "Monétiser et positionner mondialement les actifs créatifs africains",
      "Soutenir la croissance de l'économie créative africaine grâce à l'investissement stratégique",
      "Construire des ponts entre les industries créatives et les institutions financières",
      "Faire progresser la commercialisation de la propriété intellectuelle à travers l'Afrique mondiale"
    ],
    education: [
      "MBA in Media Management, Columbia University"
    ],
    educationFr: [
      "MBA en gestion des médias, Université Columbia"
    ],
    order: 5.5,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-ama-konadu',
    name: "Ama Konadu",
    title: "Project Manager & Producer, Ghana / USA",
    titleFr: "Chef de Projet et Productrice, Ghana / États-Unis",
    image: "/Ama.jpeg",
    bio: "Ama Konadu is a project manager, producer, and facilitator working across media, culture, and social impact. Her work blends strategic operations with capacity-building and dialogue facilitation for teams and organizations seeking to strengthen internal culture, collaboration, and conflict resolution.\n\nHer experience spans music, film, social impact initiatives, and cross-continental creative ecosystems. Ama has led project and product management efforts for JBR Creative Group, supported Africa–U.S. creative collaborations, and contributed to media projects, including the 2024 Hulu film She Taught Love. She is also a producer for People & Places Africa, a media platform and podcast examining the social, economic, and political issues shaping Ghana and the continent.\n\nRooted in her Ghanaian and Black American heritage, Ama's work is informed by a cross-cultural lens that allows her to navigate and connect diverse contexts. Her approach is grounded in the belief that storytelling—across teams, cultures, and communities—can be a conduit for healing, connection, and clarity. She specializes in operational clarity, human-centered processes, and frameworks that help creatives, companies, and communities work more cohesively across varied geographies and environments.",
    bioFr: "Ama Konadu est chef de projet, productrice et facilitatrice travaillant dans les médias, la culture et l'impact social. Son travail allie opérations stratégiques, renforcement des capacités et facilitation du dialogue pour les équipes et organisations cherchant à renforcer la culture interne, la collaboration et la résolution des conflits.\n\nSon expérience couvre la musique, le cinéma, les initiatives d'impact social et les écosystèmes créatifs transcontinentaux. Ama a dirigé les efforts de gestion de projet et de produit pour JBR Creative Group, soutenu les collaborations créatives Afrique–États-Unis et contribué à des projets médias, notamment le film Hulu 2024 She Taught Love. Elle est également productrice pour People & Places Africa, une plateforme médias et podcast examinant les questions sociales, économiques et politiques qui façonnent le Ghana et le continent.\n\nEnracinée dans son héritage ghanéen et afro-américain, le travail d'Ama est informé par une perspective interculturelle qui lui permet de naviguer et de connecter des contextes divers. Son approche est ancrée dans la conviction que la narration—à travers les équipes, les cultures et les communautés—peut être un conduit pour la guérison, la connexion et la clarté. Elle se spécialise dans la clarté opérationnelle, les processus centrés sur l'humain et les cadres qui aident les créatifs, les entreprises et les communautés à travailler plus cohésivement à travers diverses géographies et environnements.",
    achievements: [
      "Project Manager & Producer working across media, culture, and social impact",
      "Led project and product management efforts for JBR Creative Group",
      "Supported Africa–U.S. creative collaborations",
      "Contributed to media projects including the 2024 Hulu film She Taught Love",
      "Producer for People & Places Africa media platform and podcast",
      "Specializes in operational clarity, human-centered processes, and cross-cultural facilitation"
    ],
    achievementsFr: [
      "Chef de projet et productrice travaillant dans les médias, la culture et l'impact social",
      "Dirigé les efforts de gestion de projet et de produit pour JBR Creative Group",
      "Soutenu les collaborations créatives Afrique–États-Unis",
      "Contribué à des projets médias dont le film Hulu 2024 She Taught Love",
      "Productrice pour la plateforme médias et podcast People & Places Africa",
      "Spécialisée en clarté opérationnelle, processus centrés sur l'humain et facilitation interculturelle"
    ],
    expertise: [
      "Project and product management",
      "Strategic operations and capacity-building",
      "Dialogue facilitation and conflict resolution",
      "Cross-continental creative ecosystem development",
      "Media production and storytelling",
      "Human-centered process design"
    ],
    expertiseFr: [
      "Gestion de projet et de produit",
      "Opérations stratégiques et renforcement des capacités",
      "Facilitation du dialogue et résolution des conflits",
      "Développement d'écosystèmes créatifs transcontinentaux",
      "Production médias et narration",
      "Conception de processus centrés sur l'humain"
    ],
    impact: [
      "Strengthening internal culture, collaboration, and conflict resolution in organizations",
      "Bridging Africa–U.S. creative collaborations",
      "Examining social, economic, and political issues shaping Ghana and the continent through media",
      "Using storytelling as a conduit for healing, connection, and clarity across diverse contexts",
      "Helping creatives, companies, and communities work more cohesively across varied geographies"
    ],
    impactFr: [
      "Renforcer la culture interne, la collaboration et la résolution des conflits dans les organisations",
      "Créer des ponts pour les collaborations créatives Afrique–États-Unis",
      "Examiner les questions sociales, économiques et politiques façonnant le Ghana et le continent à travers les médias",
      "Utiliser la narration comme conduit pour la guérison, la connexion et la clarté à travers des contextes divers",
      "Aider les créatifs, les entreprises et les communautés à travailler plus cohésivement à travers diverses géographies"
    ],
    education: [],
    educationFr: [],
    order: 39,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-ivan-quashigah',
    name: "Ivan Quashigah",
    title: "Chief Executive Officer, Farmhouse Productions Limited | Chairman, Governing Board, National Film Authority (2025 - Present)",
    titleFr: "Directeur Général, Farmhouse Productions Limited | Président du Conseil d'Administration, National Film Authority (2025 - Présent)",
    image: "/Ivan.jpeg",
    bio: "Ivan Quashigah is a visionary filmmaker, creative entrepreneur, and celebrated media executive with more than 30 years of experience shaping Ghana's television, film, advertising, and social communication landscape. He studied Film Directing and Scriptwriting at the National Film and Television Institute (NAFTI) and holds an Executive Master's Degree in Governance and Leadership and a Master of Arts Degree in Development Communication all from the GIMPA Graduate School.\n\nBefore establishing Farmhouse Productions Limited in 2006, Ivan spent 13 years at Mullen Lowe Lintas Ghana, rising through the creative ranks as Copywriter, Senior Copywriter, Radio/TV Producer, and Acting Creative Director. His work in advertising and marketing communication influenced some of the most notable campaigns for multinational brands in Ghana and across West Africa.\n\nAt Farmhouse Productions, Ivan leads a powerhouse creative and production team that has delivered some of the most enduring and impactful productions for corporate clients, development agencies, and global brands. His portfolio includes high-profile work for MTN, UNICEF, UNDP, UNFPA, USAID/FHI 360, Johns Hopkins University - Center for Communication Programs, Ghana Health Service/Health Promotion Division, Breakthrough Action, Total Family Health Organization, National Population Council, Plan International, Tullow Oil Plc, MODEC, Yinson Production, West African Gas Pipeline Company Limited, UNILEVER, Promasidor Ghana, Guinness Ghana, Innova DDB, Origin8 Saatchi, STB McCann, Publicis Ghana, and TV3 Networks, among others.\n\nIvan's film and television work has earned over 20 awards, including the prestigious FESPACO 1993 award for Best Short Feature, multiple Gong Gong Awards from the Advertising Association of Ghana, and several recognitions for Television Programme of the Year and TV Commercial of the Year at the Chartered Institute of Marketing Ghana (CIMG) Awards.\n\nHe has produced and directed numerous corporate documentaries and impactful social behavior change communication films. His groundbreaking adolescent reproductive health drama \"Things We Do for Love\" remains one of Ghana's most iconic television productions. His more recent hit series include: YOLO (You Only Live Once), To Have and To Hold, House of Klu - Produced for DSTV Akwaaba Magic.\n\nIvan has also undergone extensive professional training in branding, advertising copywriting, event production, and film/TV production through programs and attachments in Nigeria, Senegal, Zimbabwe, South Africa, Lebanon, and the United Kingdom.",
    bioFr: "Ivan Quashigah est un cinéaste visionnaire, entrepreneur créatif et dirigeant médiatique reconnu avec plus de 30 ans d'expérience façonnant le paysage de la télévision, du cinéma, de la publicité et de la communication sociale du Ghana. Il a étudié la réalisation cinématographique et l'écriture de scénarios au National Film and Television Institute (NAFTI) et est titulaire d'un Master Exécutif en Gouvernance et Leadership et d'un Master of Arts en Communication pour le Développement, tous de la GIMPA Graduate School.\n\nAvant de créer Farmhouse Productions Limited en 2006, Ivan a passé 13 ans chez Mullen Lowe Lintas Ghana, gravissant les échelons créatifs en tant que Rédacteur, Rédacteur Senior, Producteur Radio/TV et Directeur Créatif par intérim. Son travail en publicité et communication marketing a influencé certaines des campagnes les plus remarquables pour des marques multinationales au Ghana et en Afrique de l'Ouest.\n\nChez Farmhouse Productions, Ivan dirige une équipe créative et de production de premier plan qui a livré certaines des productions les plus durables et impactantes pour des clients corporatifs, des agences de développement et des marques mondiales. Son portefeuille comprend des travaux de haut niveau pour MTN, UNICEF, UNDP, UNFPA, USAID/FHI 360, Johns Hopkins University - Center for Communication Programs, Ghana Health Service/Health Promotion Division, Breakthrough Action, Total Family Health Organization, National Population Council, Plan International, Tullow Oil Plc, MODEC, Yinson Production, West African Gas Pipeline Company Limited, UNILEVER, Promasidor Ghana, Guinness Ghana, Innova DDB, Origin8 Saatchi, STB McCann, Publicis Ghana et TV3 Networks, entre autres.\n\nLe travail cinématographique et télévisuel d'Ivan a remporté plus de 20 prix, notamment le prestigieux prix FESPACO 1993 du Meilleur Court Métrage, plusieurs Gong Gong Awards de l'Advertising Association of Ghana, et plusieurs reconnaissances pour Programme Télévisé de l'Année et Publicité TV de l'Année aux Chartered Institute of Marketing Ghana (CIMG) Awards.\n\nIl a produit et réalisé de nombreux documentaires corporatifs et films de communication pour le changement de comportement social. Son drame révolutionnaire sur la santé reproductive des adolescents \"Things We Do for Love\" reste l'une des productions télévisuelles les plus emblématiques du Ghana. Ses séries récentes à succès incluent : YOLO (You Only Live Once), To Have and To Hold, House of Klu - Produit pour DSTV Akwaaba Magic.\n\nIvan a également suivi une formation professionnelle approfondie en branding, rédaction publicitaire, production d'événements et production cinéma/TV à travers des programmes et stages au Nigeria, Sénégal, Zimbabwe, Afrique du Sud, Liban et Royaume-Uni.",
    achievements: [
      "Chief Executive Officer, Farmhouse Productions Limited",
      "Chairman, Governing Board, National Film Authority (2025 - Present)",
      "Over 30 years of experience in television, film, advertising, and social communication",
      "13 years at Mullen Lowe Lintas Ghana, rising from Copywriter to Acting Creative Director",
      "FESPACO 1993 award for Best Short Feature",
      "Multiple Gong Gong Awards from the Advertising Association of Ghana",
      "Television Programme of the Year and TV Commercial of the Year at CIMG Awards",
      "Produced groundbreaking series: Things We Do for Love, YOLO, To Have and To Hold, House of Klu",
      "Extensive professional training in Nigeria, Senegal, Zimbabwe, South Africa, Lebanon, and the United Kingdom"
    ],
    achievementsFr: [
      "Directeur Général, Farmhouse Productions Limited",
      "Président du Conseil d'Administration, National Film Authority (2025 - Présent)",
      "Plus de 30 ans d'expérience en télévision, cinéma, publicité et communication sociale",
      "13 ans chez Mullen Lowe Lintas Ghana, évoluant de Rédacteur à Directeur Créatif par intérim",
      "Prix FESPACO 1993 du Meilleur Court Métrage",
      "Plusieurs Gong Gong Awards de l'Advertising Association of Ghana",
      "Programme Télévisé de l'Année et Publicité TV de l'Année aux CIMG Awards",
      "Produit des séries révolutionnaires : Things We Do for Love, YOLO, To Have and To Hold, House of Klu",
      "Formation professionnelle approfondie au Nigeria, Sénégal, Zimbabwe, Afrique du Sud, Liban et Royaume-Uni"
    ],
    expertise: [
      "Film and television production",
      "Creative direction and scriptwriting",
      "Advertising and marketing communication",
      "Corporate documentaries",
      "Social behavior change communication",
      "Brand development and strategy"
    ],
    expertiseFr: [
      "Production cinématographique et télévisuelle",
      "Direction créative et écriture de scénarios",
      "Publicité et communication marketing",
      "Documentaires corporatifs",
      "Communication pour le changement de comportement social",
      "Développement et stratégie de marque"
    ],
    impact: [
      "Shaping Ghana's media landscape for over 30 years",
      "Creating iconic television productions that influence social behavior",
      "Leading award-winning creative teams and productions",
      "Supporting development agencies and global brands with impactful content"
    ],
    impactFr: [
      "Façonner le paysage médiatique du Ghana pendant plus de 30 ans",
      "Créer des productions télévisuelles emblématiques qui influencent le comportement social",
      "Diriger des équipes créatives et productions primées",
      "Soutenir les agences de développement et marques mondiales avec du contenu impactant"
    ],
    education: [
      "Executive Master's Degree in Governance and Leadership, GIMPA Graduate School",
      "Master of Arts Degree in Development Communication, GIMPA Graduate School",
      "Film Directing and Scriptwriting, National Film and Television Institute (NAFTI)"
    ],
    educationFr: [
      "Master Exécutif en Gouvernance et Leadership, GIMPA Graduate School",
      "Master of Arts en Communication pour le Développement, GIMPA Graduate School",
      "Réalisation cinématographique et écriture de scénarios, National Film and Television Institute (NAFTI)"
    ],
    order: 40,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-samlara-baah-koduah',
    name: "Samlara Baah Koduah",
    title: "Programs Lead, 24-Hour Economy Secretariat, Office of the President of Ghana",
    titleFr: "Responsable des Programmes, Secrétariat de l'Économie 24 Heures, Bureau du Président du Ghana",
    image: "/Samlara.jpeg",
    bio: "Samlara Baah Koduah leads Social Transformation through the SHOW24 and ASPIRE24 sub-Programmes at the 24-Hour Economy and Accelerated Export Development under the Office of the President of Ghana. She is an accomplished leader with over 20 years of experience designing and implementing innovative solutions to drive economic development, improve infrastructure, and empower marginalized communities. Samlara is a fellow with Echoing Green, Halcyon, and the Harvard Social Innovation and Change Initiative (SICI). She holds an MBA from Georgia Institute of Technology and an MPA from the Harvard Kennedy School.",
    bioFr: "Samlara Baah Koduah dirige la Transformation Sociale à travers les sous-programmes SHOW24 et ASPIRE24 de l'Économie 24 Heures et du Développement Accéléré des Exportations sous le Bureau du Président du Ghana. Elle est une leader accomplie avec plus de 20 ans d'expérience dans la conception et la mise en œuvre de solutions innovantes pour stimuler le développement économique, améliorer les infrastructures et autonomiser les communautés marginalisées. Samlara est fellow avec Echoing Green, Halcyon et le Harvard Social Innovation and Change Initiative (SICI). Elle est titulaire d'un MBA du Georgia Institute of Technology et d'un MPA de la Harvard Kennedy School.",
    achievements: [
      "Programs Lead, 24-Hour Economy Secretariat, Office of the President of Ghana",
      "Leads Social Transformation through SHOW24 and ASPIRE24 sub-Programmes",
      "Over 20 years of experience in economic development and social innovation",
      "Fellow with Echoing Green, Halcyon, and Harvard Social Innovation and Change Initiative (SICI)",
      "Designed and implemented innovative solutions for economic development and infrastructure"
    ],
    achievementsFr: [
      "Responsable des Programmes, Secrétariat de l'Économie 24 Heures, Bureau du Président du Ghana",
      "Dirige la Transformation Sociale à travers les sous-programmes SHOW24 et ASPIRE24",
      "Plus de 20 ans d'expérience en développement économique et innovation sociale",
      "Fellow avec Echoing Green, Halcyon et Harvard Social Innovation and Change Initiative (SICI)",
      "Conçu et mis en œuvre des solutions innovantes pour le développement économique et les infrastructures"
    ],
    expertise: [
      "Economic development strategy",
      "Social transformation and innovation",
      "Infrastructure development",
      "Community empowerment",
      "Program design and implementation"
    ],
    expertiseFr: [
      "Stratégie de développement économique",
      "Transformation sociale et innovation",
      "Développement d'infrastructures",
      "Autonomisation communautaire",
      "Conception et mise en œuvre de programmes"
    ],
    impact: [
      "Driving economic development through innovative 24-hour economy initiatives",
      "Empowering marginalized communities through social transformation programs",
      "Improving infrastructure and economic opportunities across Ghana"
    ],
    impactFr: [
      "Stimuler le développement économique à travers des initiatives innovantes d'économie 24 heures",
      "Autonomiser les communautés marginalisées à travers des programmes de transformation sociale",
      "Améliorer les infrastructures et opportunités économiques à travers le Ghana"
    ],
    education: [
      "MBA, Georgia Institute of Technology",
      "MPA, Harvard Kennedy School"
    ],
    educationFr: [
      "MBA, Georgia Institute of Technology",
      "MPA, Harvard Kennedy School"
    ],
    order: 41,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-kobby-mensah',
    name: "Professor Kobby Mensah",
    title: "CEO, Ghana Tourism Development Company Limited | Professor of Marketing, University of Ghana Business School",
    titleFr: "PDG, Ghana Tourism Development Company Limited | Professeur de Marketing, University of Ghana Business School",
    image: "/Kobby.jpeg",
    bio: "Professor Kobby Mensah is the CEO of Ghana Tourism Development Company Limited and a Professor of Marketing at the University of Ghana Business School. He brings extensive expertise in marketing strategy, tourism development, and business leadership to his roles.",
    bioFr: "Le Professeur Kobby Mensah est le PDG de Ghana Tourism Development Company Limited et Professeur de Marketing à l'University of Ghana Business School. Il apporte une expertise approfondie en stratégie marketing, développement du tourisme et leadership d'entreprise à ses fonctions.",
    achievements: [
      "CEO, Ghana Tourism Development Company Limited",
      "Professor of Marketing, University of Ghana Business School",
      "Expertise in marketing strategy and tourism development"
    ],
    achievementsFr: [
      "PDG, Ghana Tourism Development Company Limited",
      "Professeur de Marketing, University of Ghana Business School",
      "Expertise en stratégie marketing et développement du tourisme"
    ],
    expertise: [
      "Marketing strategy",
      "Tourism development",
      "Business leadership",
      "Academic research and teaching"
    ],
    expertiseFr: [
      "Stratégie marketing",
      "Développement du tourisme",
      "Leadership d'entreprise",
      "Recherche académique et enseignement"
    ],
    impact: [
      "Leading tourism development initiatives in Ghana",
      "Advancing marketing knowledge through academic research and teaching",
      "Bridging academia and industry in tourism development"
    ],
    impactFr: [
      "Diriger les initiatives de développement du tourisme au Ghana",
      "Faire progresser les connaissances en marketing à travers la recherche académique et l'enseignement",
      "Créer des ponts entre le monde universitaire et l'industrie dans le développement du tourisme"
    ],
    education: [],
    educationFr: [],
    order: 42,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-gideon-aryeequaye',
    name: "Gideon Aryeequaye",
    title: "Ag. Executive Secretary, Creative Arts Agency | Deputy CEO, Ghana Tourism Development Company | CEO, Ghana Tourism Authority",
    titleFr: "Secrétaire Exécutif par intérim, Creative Arts Agency | Directeur Général Adjoint, Ghana Tourism Development Company | PDG, Ghana Tourism Authority",
    image: "/Gideon.jpg",
    bio: "Gideon Aryeequaye is the Ag. Executive Secretary of the Creative Arts Agency, Deputy CEO of Ghana Tourism Development Company, and CEO of Ghana Tourism Authority. He is a seasoned broadcaster with 20 years of experience in Radio and TV broadcast. His expertise spans Script Writing, TV News Production, Directing, and Broadcast Journalism.",
    bioFr: "Gideon Aryeequaye est le Secrétaire Exécutif par intérim de la Creative Arts Agency, Directeur Général Adjoint de Ghana Tourism Development Company et PDG de Ghana Tourism Authority. Il est un radiodiffuseur chevronné avec 20 ans d'expérience en radiodiffusion Radio et TV. Son expertise couvre l'Écriture de Scénarios, la Production de Nouvelles TV, la Réalisation et le Journalisme de Radiodiffusion.",
    achievements: [
      "Ag. Executive Secretary, Creative Arts Agency",
      "Deputy CEO, Ghana Tourism Development Company",
      "CEO, Ghana Tourism Authority",
      "20 years of experience in Radio and TV broadcast",
      "Expertise in Script Writing, TV News Production, Directing, and Broadcast Journalism"
    ],
    achievementsFr: [
      "Secrétaire Exécutif par intérim, Creative Arts Agency",
      "Directeur Général Adjoint, Ghana Tourism Development Company",
      "PDG, Ghana Tourism Authority",
      "20 ans d'expérience en radiodiffusion Radio et TV",
      "Expertise en Écriture de Scénarios, Production de Nouvelles TV, Réalisation et Journalisme de Radiodiffusion"
    ],
    expertise: [
      "Broadcast journalism",
      "TV news production",
      "Script writing",
      "Television directing",
      "Tourism development",
      "Creative arts management"
    ],
    expertiseFr: [
      "Journalisme de radiodiffusion",
      "Production de nouvelles TV",
      "Écriture de scénarios",
      "Réalisation télévisuelle",
      "Développement du tourisme",
      "Gestion des arts créatifs"
    ],
    impact: [
      "Leading creative arts and tourism development in Ghana",
      "Shaping broadcast media through 20 years of experience",
      "Bridging creative industries and tourism sectors"
    ],
    impactFr: [
      "Diriger le développement des arts créatifs et du tourisme au Ghana",
      "Façonner les médias de radiodiffusion à travers 20 ans d'expérience",
      "Créer des ponts entre les industries créatives et les secteurs du tourisme"
    ],
    education: [],
    educationFr: [],
    order: 43,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-jonas-claes',
    name: "H.E. Jonas Claes",
    title: "Deputy Head of Delegation / Head of Political Section, EU Delegation to Ghana",
    titleFr: "Chef de Délégation Adjoint / Chef de la Section Politique, Délégation de l'UE au Ghana",
    image: "/Jonas.jpg",
    bio: "H.E. Jonas Claes is a seasoned diplomat, currently serving as the Deputy Head of Delegation and Head of Political Section at the European Union Delegation in Ghana.\n\nIn his role, Mr. Claes oversees political communication, public diplomacy, and media relations, strengthening EU–Ghana ties across governance, trade, environmental sustainability, and development cooperation. He has been a vocal advocate for sustainable development, most recently emphasising environmental protection during the EU's Green Ghana Tree-Planting, calling for stronger community action against deforestation and illegal logging.\n\nHis diplomatic engagements also include supporting critical governance initiatives. He played a central role in launching the PAIReD (Participation, Accountability and Integrity for Resilient Democracy) anti-corruption programme with Ghana, noting the need for institutional reforms and greater transparency across the EU.",
    bioFr: "S.E. Jonas Claes est un diplomate chevronné, actuellement Chef de Délégation Adjoint et Chef de la Section Politique à la Délégation de l'Union Européenne au Ghana.\n\nDans son rôle, M. Claes supervise la communication politique, la diplomatie publique et les relations médias, renforçant les liens UE–Ghana dans la gouvernance, le commerce, la durabilité environnementale et la coopération au développement. Il a été un défenseur vocal du développement durable, récemment en mettant l'accent sur la protection de l'environnement lors du Green Ghana Tree-Planting de l'UE, appelant à une action communautaire plus forte contre la déforestation et l'exploitation forestière illégale.\n\nSes engagements diplomatiques incluent également le soutien aux initiatives de gouvernance critiques. Il a joué un rôle central dans le lancement du programme anti-corruption PAIReD (Participation, Accountability and Integrity for Resilient Democracy) avec le Ghana, notant le besoin de réformes institutionnelles et d'une plus grande transparence à travers l'UE.",
    achievements: [
      "Deputy Head of Delegation / Head of Political Section, EU Delegation to Ghana",
      "Oversees political communication, public diplomacy, and media relations",
      "Strengthening EU–Ghana ties across governance, trade, environmental sustainability, and development cooperation",
      "Vocal advocate for sustainable development and environmental protection",
      "Played central role in launching PAIReD anti-corruption programme with Ghana"
    ],
    achievementsFr: [
      "Chef de Délégation Adjoint / Chef de la Section Politique, Délégation de l'UE au Ghana",
      "Supervise la communication politique, la diplomatie publique et les relations médias",
      "Renforcement des liens UE–Ghana dans la gouvernance, le commerce, la durabilité environnementale et la coopération au développement",
      "Défenseur vocal du développement durable et de la protection de l'environnement",
      "Joué un rôle central dans le lancement du programme anti-corruption PAIReD avec le Ghana"
    ],
    expertise: [
      "Diplomacy and international relations",
      "Political communication",
      "Public diplomacy",
      "Governance and anti-corruption",
      "Environmental sustainability",
      "EU-Ghana relations"
    ],
    expertiseFr: [
      "Diplomatie et relations internationales",
      "Communication politique",
      "Diplomatie publique",
      "Gouvernance et anti-corruption",
      "Durabilité environnementale",
      "Relations UE-Ghana"
    ],
    impact: [
      "Strengthening EU–Ghana diplomatic and economic relations",
      "Advocating for sustainable development and environmental protection",
      "Supporting governance reforms and anti-corruption initiatives",
      "Promoting transparency and accountability in democratic institutions"
    ],
    impactFr: [
      "Renforcer les relations diplomatiques et économiques UE–Ghana",
      "Défendre le développement durable et la protection de l'environnement",
      "Soutenir les réformes de gouvernance et initiatives anti-corruption",
      "Promouvoir la transparence et la responsabilité dans les institutions démocratiques"
    ],
    education: [],
    educationFr: [],
    order: 1.5,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-abdoulie-jobe',
    name: "Hon. Abdoulie Jobe",
    title: "Minister of Tourism, Arts and Culture, Republic of The Gambia",
    titleFr: "Ministre du Tourisme, des Arts et de la Culture, République de Gambie",
    image: "/Abdoulie.jpeg",
    bio: "Hon. Abdoulie Jobe is the Gambia's Minister responsible for Tourism, Arts and Culture. He leads cabinet business related to the portfolio, collaborates with other ministers to implement cabinet decisions, and initiates policy across the sector. A seasoned public sector leader, he previously served as Minister of Energy and Petroleum, Minister of Trade, Regional Integration and Employment, Head of Study and Planning at the Gambia River Basin Development Organisation (OMVG) Dakar Office, Director-General of the Public Utilities Regulatory Authority (PURA), and Managing Director of the National Water and Electricity Company (NAWEC). Minister Jobe studied Mechanical Engineering and Water Resources Engineering.",
    bioFr: "L'honorable Abdoulie Jobe est le ministre gambien chargé du Tourisme, des Arts et de la Culture. Il conduit les affaires gouvernementales liées au portefeuille, collabore avec les autres ministres pour exécuter les décisions du cabinet et initie les politiques du secteur. Dirigeant expérimenté du secteur public, il a été ministre de l'Énergie et du Pétrole, ministre du Commerce, de l'Intégration régionale et de l'Emploi, chef des études et de la planification à l'Organisation pour la mise en valeur du fleuve Gambie (OMVG) à Dakar, directeur général de l'Autorité de Régulation des Services Publics (PURA) et directeur général de la National Water and Electricity Company (NAWEC). Le ministre Jobe a étudié le génie mécanique et l'ingénierie des ressources en eau.",
    achievements: [
      "Minister of Tourism, Arts and Culture, Republic of The Gambia",
      "Former Minister of Energy and Petroleum",
      "Former Minister of Trade, Regional Integration and Employment",
      "Head of Study and Planning, OMVG Dakar Office",
      "Director-General, Public Utilities Regulatory Authority (PURA)",
      "Managing Director, National Water and Electricity Company (NAWEC)"
    ],
    achievementsFr: [
      "Ministre du Tourisme, des Arts et de la Culture, République de Gambie",
      "Ancien ministre de l'Énergie et du Pétrole",
      "Ancien ministre du Commerce, de l'Intégration régionale et de l'Emploi",
      "Chef des études et de la planification, Bureau de Dakar de l'OMVG",
      "Directeur général, Autorité de Régulation des Services Publics (PURA)",
      "Directeur général, National Water and Electricity Company (NAWEC)"
    ],
    expertise: [
      "Tourism and cultural policy",
      "Cabinet governance and public administration",
      "Energy and utilities regulation",
      "Regional trade and integration",
      "Infrastructure planning"
    ],
    expertiseFr: [
      "Politiques du tourisme et de la culture",
      "Gouvernance gouvernementale et administration publique",
      "Régulation de l'énergie et des services publics",
      "Commerce et intégration régionale",
      "Planification des infrastructures"
    ],
    education: [
      "Mechanical Engineering",
      "Water Resources Engineering"
    ],
    educationFr: [
      "Génie mécanique",
      "Ingénierie des ressources en eau"
    ],
    order: 3.5,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-marilyn-houadjeto',
    name: "Marilyn Maame Efua Sekyi-Aidoo Houadjeto",
    title: "Chief Executive Officer, Ghana Tourism Authority",
    titleFr: "Directrice Générale, Ghana Tourism Authority",
    image: "/Efua.jpeg",
    bio: "Marilyn Maame Efua Sekyi-Aidoo Houadjeto is the CEO of Ghana Tourism Authority and a trailblazer in communication excellence. With more than three decades of experience in corporate communications, public relations, media strategy, and event planning, she has shaped brand narratives, delivered landmark exhibitions, and mentored emerging leaders across real estate, engineering, project management, and politics. She is a passionate advocate for women in leadership and a sought-after consultant on strategic messaging and stakeholder engagement.",
    bioFr: "Marilyn Maame Efua Sekyi-Aidoo Houadjeto est la directrice générale de la Ghana Tourism Authority et une pionnière de l'excellence en communication. Avec plus de trois décennies d'expérience en communications d'entreprise, relations publiques, stratégie médiatique et planification d'événements, elle a façonné des récits de marque, organisé des expositions emblématiques et mentoré les futurs leaders dans l'immobilier, l'ingénierie, la gestion de projet et la politique. Elle milite pour les femmes leaders et est une consultante recherchée en messages stratégiques et engagement des parties prenantes.",
    achievements: [
      "Chief Executive Officer, Ghana Tourism Authority",
      "30+ years of leadership in corporate communications and strategic messaging",
      "Led Ghana's premier building and property exhibitions with international partners",
      "Mentor and advocate for women in leadership and youth empowerment",
      "Speaker, trainer, and consultant on communication strategy and stakeholder engagement"
    ],
    achievementsFr: [
      "Directrice Générale, Ghana Tourism Authority",
      "Plus de 30 ans de leadership en communications d'entreprise et messages stratégiques",
      "Organisation des principales expositions immobilières du Ghana avec des partenaires internationaux",
      "Mentore et défenseure des femmes leaders et de l'autonomisation des jeunes",
      "Conférencière, formatrice et consultante en stratégie de communication et engagement des parties prenantes"
    ],
    expertise: [
      "Corporate and strategic communications",
      "Tourism marketing and destination branding",
      "Event planning and experiential campaigns",
      "Stakeholder engagement and partnerships",
      "Women in leadership advocacy"
    ],
    expertiseFr: [
      "Communications d'entreprise et stratégiques",
      "Marketing touristique et image de destination",
      "Organisation d'événements et campagnes expérientielles",
      "Engagement des parties prenantes et partenariats",
      "Plaidoyer pour les femmes leaders"
    ],
    education: [],
    educationFr: [],
    order: 3.6,
    isActive: true,
    timestamp: null
  },
  {
    id: 'initial-simon-madjie',
    name: "Simon Madjie",
    title: "Chief Executive Officer, Ghana Investment Promotion Centre",
    titleFr: "Directeur Général, Ghana Investment Promotion Centre",
    image: "/Simon.jpeg",
    bio: "Simon Madjie is the CEO of the Ghana Investment Promotion Centre (GIPC) and a seasoned investment facilitator and lawyer with deep experience advancing trade and investment partnerships between Ghana, the United States, and Africa. He previously served as Executive Secretary of the American Chamber of Commerce in Ghana, consulted on establishing AmChams across Africa, and worked in business development at Equatorial Coca-Cola Bottling Company. Simon is a certified insolvency practitioner, an Abshire-Inamori International Leadership Fellow at CSIS, and a member of the Ghana Bar Association.",
    bioFr: "Simon Madjie est le directeur général du Ghana Investment Promotion Centre (GIPC) et un facilitateur d'investissement chevronné, avocat expérimenté dans la promotion des partenariats commerciaux entre le Ghana, les États-Unis et l'Afrique. Ancien secrétaire exécutif de l'American Chamber of Commerce in Ghana, il a conseillé la création de chambres AmCham dans plusieurs pays africains et travaillé au développement commercial chez Equatorial Coca-Cola Bottling Company. Simon est praticien certifié en insolvabilité, boursier Abshire-Inamori International Leadership au CSIS et membre du Barreau du Ghana.",
    achievements: [
      "Chief Executive Officer, Ghana Investment Promotion Centre (GIPC)",
      "Former Executive Secretary, American Chamber of Commerce in Ghana",
      "Consulted on establishing AmChams in Ethiopia, Angola, The Gambia, and Côte d'Ivoire",
      "Key Account Business Developer, Equatorial Coca-Cola Bottling Company",
      "Certified Insolvency Practitioner and Abshire-Inamori International Leadership Fellow at CSIS"
    ],
    achievementsFr: [
      "Directeur Général, Ghana Investment Promotion Centre (GIPC)",
      "Ancien secrétaire exécutif de l'American Chamber of Commerce in Ghana",
      "Consultant pour la création d'AmCham en Éthiopie, Angola, Gambie et Côte d'Ivoire",
      "Key Account Business Developer, Equatorial Coca-Cola Bottling Company",
      "Praticien certifié en insolvabilité et boursier Abshire-Inamori International Leadership au CSIS"
    ],
    expertise: [
      "Investment promotion and facilitation",
      "International trade and economic partnerships",
      "Legal and regulatory frameworks",
      "Stakeholder engagement and chamber development",
      "Strategic business development"
    ],
    expertiseFr: [
      "Promotion et facilitation des investissements",
      "Commerce international et partenariats économiques",
      "Cadres juridiques et réglementaires",
      "Engagement des parties prenantes et développement de chambres",
      "Développement commercial stratégique"
    ],
    education: [
      "BSc Business Administration (Management), University of Ghana",
      "Master's in Marketing, University of Ghana",
      "LLB, Ghana Institute of Management and Public Administration (GIMPA)",
      "BL, Ghana School of Law",
      "LLM in International Trade Law, University of Turin"
    ],
    educationFr: [
      "Licence en administration des affaires (management), Université du Ghana",
      "Master en marketing, Université du Ghana",
      "LLB, Ghana Institute of Management and Public Administration (GIMPA)",
      "BL, Ghana School of Law",
      "LLM en droit du commerce international, Université de Turin"
    ],
    order: 3.7,
    isActive: true,
    timestamp: null
  }
];

const speakerCountryOverrides: Record<string, string> = {
  'initial-president-ghana': "Ghana",
  'initial-1': "Ghana",
  'initial-elizabeth-ofosu-adjare': "Ghana",
  'initial-abla-dzifa-gomashie': "Ghana",
  'initial-2': "Ghana",
  'initial-3': "South Africa",
  'initial-4': "Ghana",
  'initial-5': "Ghana",
  'initial-6': "South Africa",
  'initial-7': "Ghana",
  'initial-8': "Tanzania",
  'initial-9': "Belgium",
  'initial-10': "Nigeria",
  'initial-11': "Uganda",
  'initial-12': "Kenya",
  'initial-14': "Kenya",
  'initial-15': "Zimbabwe",
  'initial-16': "Ghana",
  'initial-17': "South Africa",
  'initial-18': "Tanzania",
  'initial-19': "Botswana",
  'initial-olayiwola-awakan': "Nigeria",
  'initial-melchissedec-obiang': "Gabon",
  'initial-maureen-fondo': "Tanzania",
  'initial-marielle-barrow-maignan': "Trinidad and Tobago",
  'initial-felix-chege': "Kenya",
  'initial-ana-ballo': "Côte d'Ivoire",
  'initial-judysheila-mugo': "Kenya",
  'initial-otsetswe-koboyankwe': "Botswana",
  'initial-koki-chiepe': "Botswana",
  'initial-chadzanso-mwenda': "Zambia",
  'initial-mike-otieno': "Kenya",
  'initial-laura-ekumbo': "Kenya",
  'initial-makeba-boateng': "Ghana",
  'initial-jermaine-besten': "South Africa",
  'initial-frank-murangwa': "Rwanda",
  'initial-xavier-edwards': "Trinidad and Tobago",
  'initial-osahon-akpata': "Egypt",
  'initial-ama-konadu': "Ghana",
  'initial-ivan-quashigah': "Ghana",
  'initial-samlara-baah-koduah': "Ghana",
  'initial-kobby-mensah': "Ghana",
  'initial-gideon-aryeequaye': "Ghana",
  'initial-jonas-claes': "Belgium",
  'initial-abdoulie-jobe': "The Gambia",
  'initial-marilyn-houadjeto': "Ghana",
  'initial-simon-madjie': "Ghana",
}

const countryPatterns: Array<{ country: string; patterns: RegExp[] }> = [
  { country: "Ghana", patterns: [/\bghanaian\b/i, /\bghana\b/i] },
  { country: "Kenya", patterns: [/\bkenyan\b/i, /\bkenya\b/i] },
  { country: "South Africa", patterns: [/\bsouth african\b/i, /\bsouth africa\b/i] },
  { country: "Nigeria", patterns: [/\bnigerian\b/i, /\bnigeria\b/i] },
  { country: "Tanzania", patterns: [/\btanzanian\b/i, /\btanzania\b/i] },
  { country: "Zimbabwe", patterns: [/\bzimbabwean\b/i, /\bzimbabwe\b/i] },
  { country: "Zambia", patterns: [/\bzambian\b/i, /\bzambia\b/i] },
  { country: "Botswana", patterns: [/\bbotswanan?\b/i, /\bmotswana\b/i, /\bbotswana\b/i] },
  { country: "Gabon", patterns: [/\bgabonese\b/i, /\bgabon\b/i] },
  { country: "Côte d'Ivoire", patterns: [/\bcôte d[\u2019']?ivoire\b/i, /\bcote d[\u2019']?ivoire\b/i, /\bivoirian\b/i] },
  { country: "Trinidad and Tobago", patterns: [/\btrinidad( and)? tobago\b/i, /\btrinbagonian\b/i, /\btobagonian\b/i] },
  { country: "Rwanda", patterns: [/\brwandan\b/i, /\brwanda\b/i] },
  { country: "Uganda", patterns: [/\bugandan\b/i, /\buganda\b/i] },
  { country: "Namibia", patterns: [/\bnamibian\b/i, /\bnamibia\b/i] },
  { country: "Cameroon", patterns: [/\bcameroonian\b/i, /\bcameroon\b/i] },
  { country: "Malawi", patterns: [/\bmalawian\b/i, /\bmalawi\b/i] },
  { country: "Barbados", patterns: [/\bbarbadian\b/i, /\bbarbados\b/i] },
  { country: "Belgium", patterns: [/\bbelgian\b/i, /\bbelgium\b/i] },
  { country: "Egypt", patterns: [/\begyptian\b/i, /\begypt\b/i] },
];

const detectSpeakerCountry = (speaker: Speaker): string | null => {
  if (speaker.country && speaker.country.trim().length > 0) {
    return speaker.country.trim()
  }

  const override = speaker.id ? speakerCountryOverrides[speaker.id] : undefined
  if (override) {
    return override
  }

  const text = `${speaker.title ?? ""} ${speaker.bio ?? ""}`.toLowerCase()
  for (const { country, patterns } of countryPatterns) {
    if (patterns.some(pattern => pattern.test(text))) {
      return country
    }
  }

  return null
}

export default function SpeakersPage() {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>(initialSpeakers);
  const [loading, setLoading] = useState(true);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [speakerModalOpen, setSpeakerModalOpen] = useState(false);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersQuery = query(
          collection(db, 'speakers'),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        const speakersSnapshot = await getDocs(speakersQuery);
        const firebaseSpeakers = speakersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Speaker[];
        
        // Merge Firebase speakers with initial speakers
        // Firebase speakers take precedence (they replace initial ones)
        if (firebaseSpeakers.length > 0) {
          setSpeakers(firebaseSpeakers);
        }
        // If no Firebase speakers, keep initial speakers
      } catch (error) {
        console.error('Error fetching speakers:', error);
        // Keep initial speakers on error
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

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
        contact: "Contact"
      },
      hero: {
        title: "Featured Speakers",
        subtitle: "Meet the distinguished leaders, experts, and visionaries who will share their insights and drive conversations at Creatives Connect Afrika 2025"
      },
      speakers: {
        title: "Keynote Speakers",
        subtitle: "Leading voices shaping Africa's creative economy",
        keyAchievements: "Key Achievements",
        education: "Education",
        expertise: "Expertise",
        impact: "Impact",
        keyInitiatives: "Key Initiatives",
        experience: "Experience",
        loading: "Loading speakers...",
        noSpeakers: "No speakers available at the moment. Check back soon!"
      },
      cta: {
        title: "Join Us in La Palm Royal Beach Hotel, Accra",
        subtitle: "Be part of the inaugural Creatives Connect Afrika Festival & Forum 2025",
        registerNow: "Register Now",
        registerAsExhibitor: "Register as Exhibitor"
      },
      footer: {
        description: "Uniting Africa's creative minds to build a prosperous future through innovation, cultural exchange, and economic integration.",
        copyright: "© 2025 Creatives Connect Afrika. All rights reserved."
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
        contact: "Contact"
      },
      hero: {
        title: "Intervenants Principaux",
        subtitle: "Rencontrez les leaders distingués, experts et visionnaires qui partageront leurs idées et animeront les conversations lors de Creatives Connect Afrika 2025"
      },
      speakers: {
        title: "Conférenciers Clés",
        subtitle: "Voix de premier plan façonnant l'économie créative africaine",
        keyAchievements: "Réalisations Clés",
        education: "Formation",
        expertise: "Expertise",
        impact: "Impact",
        keyInitiatives: "Initiatives Clés",
        experience: "Expérience",
        loading: "Chargement des intervenants...",
        noSpeakers: "Aucun intervenant disponible pour le moment. Revenez bientôt!"
      },
      cta: {
        title: "Rejoignez-Nous à La Palm Royal Beach Hotel, Accra",
        subtitle: "Soyez partie du Festival et Forum inaugural Creatives Connect Afrika 2025",
        registerNow: "S'inscrire Maintenant",
        registerAsExhibitor: "S'inscrire comme Exposant"
      },
      footer: {
        description: "Unir les esprits créatifs africains pour construire un avenir prospère à travers l'innovation, les échanges culturels et l'intégration économique.",
        copyright: "© 2025 Creatives Connect Afrika. Tous droits réservés."
      }
    }
  };

  const t = translations[language];
  const sortedSpeakers = [...speakers].sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
  const featuredSpeaker = sortedSpeakers[0];
  const otherSpeakers = sortedSpeakers.slice(1);

  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{backgroundImage: `url('/22.jpeg')`}} className="bg-cover bg-bottom bg-no-repeat">
        <div className="bg-gradient-to-b from-gray-900/50 to-black">
          <Header language={language} setLanguage={setLanguage} currentPage="speakers" />

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
          </section>
        </div>
      </div>

      {/* Speakers Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">{t.speakers.title}</h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">{t.speakers.subtitle}</p>
            </div>
            
            {/* Speakers Grid - Simplified display */}
            {sortedSpeakers.length > 0 && (
              <div className="space-y-10">
                {featuredSpeaker && (
                  <Card
                    key={featuredSpeaker.id}
                    className="bg-gray-900 border border-gray-800 rounded-none overflow-hidden cursor-pointer hover:bg-gray-900/80 transition-colors"
                    onClick={() => {
                      setSelectedSpeaker(featuredSpeaker);
                      setSpeakerModalOpen(true);
                    }}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <div className="relative w-full lg:w-1/2 xl:w-2/3 h-40 md:h-[44rem]">
                          <Image
                            src={featuredSpeaker.image}
                            alt={featuredSpeaker.name}
                            fill
                            className="object-cover object-top"
                            priority
                          />
                        </div>
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Featured Speaker</p>
                          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                            {featuredSpeaker.name}
                          </h3>
                          <p className="text-[#E19D2B] font-semibold text-lg md:text-xl leading-snug mb-6">
                            {language === 'en' ? featuredSpeaker.title : featuredSpeaker.titleFr}
                          </p>
                          {(() => {
                            const country = detectSpeakerCountry(featuredSpeaker);
                            if (!country) return null;
                            return (
                              <div className="flex items-center gap-2 text-gray-400 text-base">
                                <MapPin className="w-4 h-4 text-[#E19D2B]" />
                                <span>{country}</span>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {otherSpeakers.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {otherSpeakers.map((speaker) => {
                      const country = detectSpeakerCountry(speaker)

                      return (
                      <Card 
                        key={speaker.id} 
                        className="bg-gray-900/50 border-none rounded-none overflow-hidden cursor-pointer hover:bg-gray-900/70 transition-colors"
                        onClick={() => {
                          setSelectedSpeaker(speaker);
                          setSpeakerModalOpen(true);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            {/* Speaker Image */}
                            <div className="w-full aspect-square mb-4 relative overflow-hidden">
                              <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                className="object-cover rounded-none object-top"
                              />
                            </div>
                            
                            {/* Speaker Name */}
                            <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight">
                              {speaker.name}
                            </h3>
                            
                            {/* Speaker Title */}
                            <p className="text-[#E19D2B] font-semibold text-xs md:text-sm leading-tight">
                              {language === 'en' ? speaker.title : speaker.titleFr}
                            </p>

                              {/* Speaker Country */}
                              {country && (
                                <div className="flex items-center justify-center gap-1 text-gray-400 text-xs md:text-sm mt-2">
                                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#E19D2B]" />
                                  <span>{country}</span>
                                </div>
                              )}
                          </div>
                        </CardContent>
                      </Card>
                      )
                    })}
                  </div>
                )}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />

      {/* Speaker Details Modal */}
      <Dialog open={speakerModalOpen} onOpenChange={setSpeakerModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black text-white border-gray-800">
          {selectedSpeaker && (() => {
            const country = detectSpeakerCountry(selectedSpeaker)

            return (
            <>
              <DialogHeader>
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 relative overflow-hidden">
                      <Image
                        src={selectedSpeaker.image}
                        alt={selectedSpeaker.name}
                        fill
                        className="object-cover object-top rounded-none"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedSpeaker.name}
                    </DialogTitle>
                    <DialogDescription className="text-[#E19D2B] font-semibold text-base md:text-lg">
                      {language === 'en' ? selectedSpeaker.title : selectedSpeaker.titleFr}
                    </DialogDescription>
                      {country && (
                        <p className="flex items-center text-sm md:text-base text-gray-400 mt-2">
                          <MapPin className="w-4 h-4 text-[#E19D2B] mr-2" />
                          <span>{country}</span>
                        </p>
                      )}
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {language === 'en' ? selectedSpeaker.bio : selectedSpeaker.bioFr}
                  </p>
                </div>
                
                {/* Key Achievements */}
                {selectedSpeaker.achievements && selectedSpeaker.achievements.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                      <Star className="w-5 h-5 text-[#E19D2B] mr-2" />
                      {t.speakers.keyAchievements}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'en' ? selectedSpeaker.achievements : selectedSpeaker.achievementsFr || selectedSpeaker.achievements).map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 text-sm md:text-base flex items-start">
                          <span className="text-[#E19D2B] mr-2 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Education */}
                {selectedSpeaker.education && selectedSpeaker.education.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                      <GraduationCap className="w-5 h-5 text-[#E19D2B] mr-2" />
                      {t.speakers.education}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'en' ? selectedSpeaker.education : selectedSpeaker.educationFr || selectedSpeaker.education).map((edu, idx) => (
                        <li key={idx} className="text-gray-300 text-sm md:text-base flex items-start">
                          <span className="text-[#E19D2B] mr-2 mt-1">•</span>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Expertise */}
                {selectedSpeaker.expertise && selectedSpeaker.expertise.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 text-[#E19D2B] mr-2" />
                      {t.speakers.expertise}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'en' ? selectedSpeaker.expertise : selectedSpeaker.expertiseFr || selectedSpeaker.expertise).map((exp, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-[#E19D2B]/20 text-[#E19D2B] border-[#E19D2B] rounded-none">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {selectedSpeaker.experience && selectedSpeaker.experience.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 text-[#E19D2B] mr-2" />
                      {t.speakers.experience}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'en' ? selectedSpeaker.experience : selectedSpeaker.experienceFr || selectedSpeaker.experience).map((exp, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-[#E19D2B]/20 text-[#E19D2B] border-[#E19D2B] rounded-none">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Impact */}
                {selectedSpeaker.impact && selectedSpeaker.impact.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                      <Globe className="w-5 h-5 text-[#E19D2B] mr-2" />
                      {t.speakers.impact}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'en' ? selectedSpeaker.impact : selectedSpeaker.impactFr || selectedSpeaker.impact).map((impact, idx) => (
                        <li key={idx} className="text-gray-300 text-sm md:text-base flex items-start">
                          <span className="text-[#E19D2B] mr-2 mt-1">•</span>
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Initiatives */}
                {selectedSpeaker.initiatives && selectedSpeaker.initiatives.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                      <Building2 className="w-5 h-5 text-[#E19D2B] mr-2" />
                      {t.speakers.keyInitiatives}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'en' ? selectedSpeaker.initiatives : selectedSpeaker.initiativesFr || selectedSpeaker.initiatives).map((initiative, idx) => (
                        <li key={idx} className="text-gray-300 text-sm md:text-base flex items-start">
                          <span className="text-[#E19D2B] mr-2 mt-1">•</span>
                          <span>{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
            )
          })()}
        </DialogContent>
      </Dialog>

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
