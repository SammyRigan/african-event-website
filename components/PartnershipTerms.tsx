"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/LanguageContext"
import { FileText, X } from "lucide-react"

export default function PartnershipTerms() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const translations = {
    en: {
      title: "Partnership Terms & Conditions",
      viewTerms: "View Terms & Conditions",
      content: `PARTNERSHIP TERMS & CONDITIONS
By submitting this partnership form, you agree to the following terms and conditions:

1. Partnership Review & Approval
• Submission of this form does not guarantee automatic partnership.
• All partnership requests will be reviewed by the Creatives Connect Afrika team.
• Creatives Connect Afrika reserves the right to decline applications at its discretion without obligation to provide reasons.

2. Accuracy of Information
• Applicants must ensure that all information provided is true, complete, and accurate.
• Creatives Connect Afrika shall not be held responsible for losses or damages arising from false or misleading information supplied by applicants.

3. Use of Brand Assets
• Approved partners agree to grant Creatives Connect Afrika the right to use their logos, brand names, and approved assets strictly for partnership-related purposes (e.g., website, publicity, event materials).
• Likewise, partners must seek written approval before using Creatives Connect Afrika's name, logo, or materials.

4. Mutual Responsibilities
• The scope of responsibilities (financial, marketing, operational, content-related) will be defined separately in a Partnership Agreement or MOU.
• Each party shall fulfill its commitments in good faith and within the agreed timelines.

5. Confidentiality
• Any confidential information shared during partnership discussions or collaboration shall be treated with strict confidentiality.
• Neither party may disclose private discussions, documents, budgets or strategies to third parties without consent.

6. Content & Media Rights
• Creatives Connect Afrika reserves the right to publish or share media content from collaborations, events, festivals, or initiatives involving partners, unless explicitly restricted in writing.
• Any co-created content (film, music, interviews, etc.) may be subject to shared intellectual property agreements.

7. Non-Exclusivity
• Partnerships with Creatives Connect Afrika are non-exclusive, unless expressly stated otherwise.
• We reserve the right to work with multiple brands, agencies, institutions, and creative stakeholders across Africa and beyond.

8. Termination of Partnership
• Either party may terminate the partnership with written notice if the other party breaches agreed terms or fails to uphold brand values.
• Creatives Connect Afrika reserves the right to withdraw partnership if the partner engages in unethical, unlawful, or reputation-damaging activity.

9. Legal & Ethical Standards
• Partners must operate within the legal frameworks of their home countries and demonstrate ethical standards in labour, creativity, intellectual property, and public conduct.
• Creatives Connect Afrika promotes Pan-African collaboration, diversity, and inclusion — partners must reflect these values.

10. Contact & Support
• For any clarification on these terms, applicants may contact the Creatives Connect Afrika team via the official email or support channels provided.`
    },
    fr: {
      title: "Termes et Conditions de Partenariat",
      viewTerms: "Voir les Termes et Conditions",
      content: `TERMES ET CONDITIONS DE PARTENARIAT
En soumettant ce formulaire de partenariat, vous acceptez les termes et conditions suivants :

1. Examen et Approbation du Partenariat
• La soumission de ce formulaire ne garantit pas un partenariat automatique.
• Toutes les demandes de partenariat seront examinées par l'équipe de Creatives Connect Afrika.
• Creatives Connect Afrika se réserve le droit de refuser les candidatures à sa discrétion sans obligation de fournir des raisons.

2. Exactitude des Informations
• Les candidats doivent s'assurer que toutes les informations fournies sont vraies, complètes et exactes.
• Creatives Connect Afrika ne sera pas tenu responsable des pertes ou dommages résultant d'informations fausses ou trompeuses fournies par les candidats.

3. Utilisation des Actifs de Marque
• Les partenaires approuvés acceptent d'accorder à Creatives Connect Afrika le droit d'utiliser leurs logos, noms de marque et actifs approuvés strictement à des fins liées au partenariat (par exemple, site web, publicité, matériel d'événement).
• De même, les partenaires doivent demander une approbation écrite avant d'utiliser le nom, le logo ou les matériaux de Creatives Connect Afrika.

4. Responsabilités Mutuelles
• La portée des responsabilités (financières, marketing, opérationnelles, liées au contenu) sera définie séparément dans un Accord de Partenariat ou un MOU.
• Chaque partie remplira ses engagements de bonne foi et dans les délais convenus.

5. Confidentialité
• Toute information confidentielle partagée lors des discussions de partenariat ou de collaboration sera traitée avec une confidentialité stricte.
• Aucune des parties ne peut divulguer des discussions privées, des documents, des budgets ou des stratégies à des tiers sans consentement.

6. Droits de Contenu et Médias
• Creatives Connect Afrika se réserve le droit de publier ou de partager du contenu médiatique provenant de collaborations, d'événements, de festivals ou d'initiatives impliquant des partenaires, sauf restriction explicite par écrit.
• Tout contenu co-créé (film, musique, interviews, etc.) peut être soumis à des accords de propriété intellectuelle partagés.

7. Non-Exclusivité
• Les partenariats avec Creatives Connect Afrika sont non-exclusifs, sauf indication contraire expresse.
• Nous nous réservons le droit de travailler avec plusieurs marques, agences, institutions et parties prenantes créatives à travers l'Afrique et au-delà.

8. Résiliation du Partenariat
• Chaque partie peut résilier le partenariat avec un préavis écrit si l'autre partie viole les termes convenus ou ne respecte pas les valeurs de la marque.
• Creatives Connect Afrika se réserve le droit de retirer le partenariat si le partenaire s'engage dans des activités contraires à l'éthique, illégales ou nuisibles à la réputation.

9. Standards Légaux et Éthiques
• Les partenaires doivent opérer dans le cadre légal de leurs pays d'origine et démontrer des standards éthiques en matière de travail, de créativité, de propriété intellectuelle et de conduite publique.
• Creatives Connect Afrika promeut la collaboration panafricaine, la diversité et l'inclusion — les partenaires doivent refléter ces valeurs.

10. Contact et Support
• Pour toute clarification sur ces termes, les candidats peuvent contacter l'équipe de Creatives Connect Afrika via l'email officiel ou les canaux de support fournis.`
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <FileText className="w-4 h-4 mr-2" />
          {t.viewTerms}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black border-white/20 text-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center justify-between">
            {t.title}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <Card className="bg-gray-900 border-white/10">
            <CardContent className="p-6">
              <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-sans">
                {t.content}
              </pre>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
