"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addSpeaker } from '@/lib/firebaseService';
import { CheckCircle, XCircle, Upload, ArrowLeft } from 'lucide-react';

const initialSpeakers = [
  {
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
    isActive: true
  },
  {
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
    order: 2,
    isActive: true
  },
  {
    name: "Kwakye Donkor",
    title: "Chief Executive Officer, Africa Tourism Partners (ATP)",
    titleFr: "Directeur Général, Partenaires du Tourisme Africain (ATP)",
    image: "/Kwakye-Donkor (1).jpg",
    bio: "Mr. Kwakye Donkor is the Chief Executive Officer of Africa Tourism Partners (ATP), an award-winning pan-African advisory firm recognised by the UNWTO.",
    bioFr: "M. Kwakye Donkor est le Directeur Général d'Afrique Tourism Partners (ATP), un cabinet de conseil panafricain primé reconnu par l'OMT.",
    achievements: [
      "CEO of award-winning pan-African advisory firm ATP",
      "Recognised by UNWTO",
      "Founder of Africa Tourism Leadership Forum & Awards (ATLF)",
      "Founder of Business Tourism and MICE (BTM) Masterclass",
      "Founder of Africa Youth in Tourism Innovation Summit",
      "Founder of Africa Women in Tourism Summit"
    ],
    achievementsFr: [
      "DG du cabinet de conseil panafricain primé ATP",
      "Reconnu par l'OMT",
      "Fondateur du Forum et des Prix de Leadership du Tourisme Africain (ATLF)",
      "Fondateur de la Masterclass du Tourisme d'Affaires et MICE (BTM)",
      "Fondateur du Sommet de l'Innovation des Jeunes dans le Tourisme Africain",
      "Fondateur du Sommet des Femmes dans le Tourisme Africain"
    ],
    experience: [
      "Tourism development",
      "Destination marketing",
      "Investment promotion",
      "MICE sector",
      "Education, finance, and hospitality"
    ],
    experienceFr: [
      "Développement du tourisme",
      "Marketing de destination",
      "Promotion des investissements",
      "Secteur MICE",
      "Éducation, finance et hôtellerie"
    ],
    order: 3,
    isActive: true
  },
  {
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
    order: 4,
    isActive: true
  }
];

export default function UploadSpeakersPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{name: string, success: boolean, error?: string}[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    setResults([]);
    setUploadComplete(false);

    const uploadResults = [];

    for (const speaker of initialSpeakers) {
      try {
        const result = await addSpeaker(speaker);
        uploadResults.push({ name: speaker.name, success: true });
        console.log(`✅ Uploaded: ${speaker.name}`);
      } catch (error) {
        uploadResults.push({ 
          name: speaker.name, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        console.error(`❌ Failed to upload ${speaker.name}:`, error);
      }
    }

    setResults(uploadResults);
    setUploading(false);
    setUploadComplete(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upload Initial Speakers</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              This will upload {initialSpeakers.length} speakers to Firebase. This should only be done once.
            </p>
          </CardHeader>
          <CardContent>
            {!uploadComplete && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Warning:</strong> This will create new speaker entries in Firebase. 
                    Only click this once to avoid duplicates.
                  </p>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-[#E19D2B] hover:bg-[#D18A1A] h-14 text-lg"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload {initialSpeakers.length} Speakers
                    </>
                  )}
                </Button>
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="font-semibold mb-4">Upload Results:</h3>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mr-3" />
                      )}
                      <span className={result.success ? 'text-green-800' : 'text-red-800'}>
                        {result.name}
                      </span>
                    </div>
                    {!result.success && result.error && (
                      <span className="text-xs text-red-600">{result.error}</span>
                    )}
                  </div>
                ))}

                {uploadComplete && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800">
                      ✅ Upload complete! {results.filter(r => r.success).length} of {results.length} speakers uploaded successfully.
                    </p>
                    <Button className="mt-4 w-full" onClick={() => router.push('/dashboard')}>
                      Go to Admin Dashboard
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

