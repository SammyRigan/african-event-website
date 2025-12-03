import { notFound } from "next/navigation"
import BlogPostClient from "@/components/BlogPostClient"

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
    content: [
      {
        type: "paragraph",
        text: "The 15th Magical Kenya Travel Expo (MKTE 2025), held from 1 to 3 October at Uhuru Gardens in Nairobi, offered more than exhibitions and meetings. It provided a glimpse into the future of African tourism – one increasingly shaped by culture, creativity and continental collaboration. Among the attendees was a delegation aligned with the forthcoming Creatives Connect Afrika Forum and Festival, travelling to Kenya with a wider purpose: to build relationships, gather insight and champion a new direction for African tourism."
      },
      {
        type: "paragraph",
        text: "From the opening sessions, it became clear that Africa's tourism discourse is evolving. While wildlife and landscapes remain central, discussions at MKTE focused strongly on identity, storytelling and the creative economy. The continent is beginning to position culture not as a supporting feature, but as a driving force for economic growth and regional integration."
      },
      {
        type: "heading",
        text: "A Vision Beyond Destinations"
      },
      {
        type: "paragraph",
        text: "It was during these exchanges that a wider mission came into focus. Led by Emily Mburu-Ndoria of the AfCFTA Secretariat, Rex Omar and Edward Owusu of the Black Star Experience Secretariat, and Kwakye Donkor of Africa Tourism Partners, key conversations shifted away from brochures and booths to focus on deeper themes – music, stories, festivals, fashion, film and the power of Africans travelling to experience one another."
      },
      {
        type: "paragraph",
        text: "Rather than promoting destinations in isolation, the delegation emphasised the importance of aligning tourism with the creative industries, positioning Africa's cultural assets as core pillars of its tourism strategy."
      },
      {
        type: "heading",
        text: "Nairobi as Prelude to Accra"
      },
      {
        type: "paragraph",
        text: "Throughout MKTE, stakeholders across East, West and Southern Africa echoed a common question: how can Africa move from fragmented promotion to united collaboration? The answer pointed towards Accra, 24 to 26 November, where the Creatives Connect Afrika Forum and Festival will convene cultural leaders, policymakers and investors under the AfCFTA framework."
      },
      {
        type: "paragraph",
        text: "There was strong interest in Accra as a platform not just for celebration, but for structured dialogue, investment planning and policy development – a space where creativity is treated as strategy."
      },
      {
        type: "heading",
        text: "Key Insights Taken Forward"
      },
      {
        type: "paragraph",
        text: "The Nairobi experience reinforced several essential truths:"
      },
      {
        type: "list",
        items: [
          "Africa must first market Africa to Africans, building intra-continental pride and mobility.",
          "Culture and creativity are not entertainment – they are economic assets with export value.",
          "Tourism needs policy backing, particularly in areas such as visa reform, mobility frameworks and creative industry investment."
        ]
      },
      {
        type: "heading",
        text: "From Inspiration to Action"
      },
      {
        type: "paragraph",
        text: "MKTE served as an important catalyst, highlighting both progress and the work yet to be done. It confirmed that Africa is ready to redefine how it presents itself to the world, not solely through landscapes, but through the richness of its living cultures."
      },
      {
        type: "paragraph",
        text: "As preparations intensify for Accra, Creatives Connect Afrika is emerging not simply as an event, but as a continental commitment – to reimagine African tourism through creativity, collaboration and cultural ownership."
      },
      {
        type: "paragraph",
        text: "Nairobi opened the conversation. Accra will carry it forward. The story of African tourism is turning a new page."
      }
    ]
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
    content: [
      {
        type: "paragraph",
        text: "The Creatives Connect Afrika initiative was officially launched at the Ghana Trade House in Accra, signalling a new Pan-African platform dedicated to positioning culture and creativity at the centre of the continent's tourism and economic agenda."
      },
      {
        type: "paragraph",
        text: "Hosted under the auspices of the AfCFTA framework, the launch brought together leaders from government, the cultural sector and the tourism industry to outline a vision where Africa's stories, heritage and creative industries drive trade, mobility and integration across borders."
      },
      {
        type: "heading",
        text: "A Cultural Shift Within AfCFTA"
      },
      {
        type: "paragraph",
        text: "Speaking at the launch, Emily Mburu-Ndoria, Director of Trade in Services, Investment, Intellectual Property and Digital Trade at the AfCFTA Secretariat, emphasised the strategic importance of creative industries within continental policy."
      },
      {
        type: "quote",
        text: "Africa can no longer treat culture as seasonal entertainment. It is a serious economic sector that must be integrated into tourism, trade and investment policies. Creatives Connect Afrika is a step towards building an ecosystem where our artists, producers, designers and storytellers can operate across borders with purpose and protection."
      },
      {
        type: "paragraph",
        text: "She highlighted ongoing work to establish frameworks for mobility, intellectual property and digital platforms that will allow cultural products and experiences to move freely across the continent."
      },
      {
        type: "heading",
        text: "Ownership of Africa's Story"
      },
      {
        type: "paragraph",
        text: "Renowned cultural advocate and Presidential Adviser at the Black Star Experience Secretariat, Rex Omar, spoke passionately about the need for Africans to take control of their narrative."
      },
      {
        type: "quote",
        text: "For too long, Africa has been packaged for the world by outsiders. Our music, food, festivals and fashion are not add-ons. They are the essence of our identity. If we are serious about tourism, we must first sell Africa to Africans – proudly, boldly and authentically."
      },
      {
        type: "paragraph",
        text: "He stressed that Creatives Connect Afrika must go beyond conferences and become a long-term platform for creative empowerment, helping African artists access markets, funding and visibility."
      },
      {
        type: "heading",
        text: "Tourism Beyond Landscapes"
      },
      {
        type: "paragraph",
        text: "Media and tourism strategist Francis Doku underscored the connection between tourism and the creative economy, calling for a continental approach to brand Africa through culture."
      },
      {
        type: "quote",
        text: "Tourism in Africa has leaned heavily on wildlife and landscapes. That chapter is not closing, but a new chapter is opening – one written with music, film, fashion, literature and festivals. The African visitor of tomorrow is not only seeking scenery, but a sense of self, story and belonging."
      },
      {
        type: "paragraph",
        text: "He noted that Creatives Connect Afrika will serve as a marketplace of ideas, partnerships and policies, ensuring that creatives are not spectators but central architects of Africa's tourism future."
      },
      {
        type: "heading",
        text: "The Road Ahead – Accra in November"
      },
      {
        type: "paragraph",
        text: "The launch event also confirmed that the first full edition of Creatives Connect Afrika will take place from 24 to 26 November in Accra, bringing together policymakers, investors, cultural institutions and creators from across the continent."
      },
      {
        type: "paragraph",
        text: "With panels, showcases, exhibitions and policy dialogues, the forum and festival aim to reshape how Africa presents itself to the world – not as a destination of sights, but as a destination of stories."
      },
      {
        type: "paragraph",
        text: "Creatives Connect Afrika has begun not as an event, but as a continental commitment. From Accra to Nairobi and back again, the movement is gaining momentum. Africa is ready not only to welcome visitors, but to invite the world into its imagination."
      }
    ]
  }
]

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}

