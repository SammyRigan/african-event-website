"use client"

import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
  variant?: "default" | "outline"
  size?: "sm" | "default"
  showLabels?: boolean
}

export default function ShareButtons({ 
  title, 
  url, 
  variant = "outline", 
  size = "sm",
  showLabels = false 
}: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="flex space-x-2">
      <Button 
        size={size}
        variant={variant}
        className="border-white/30 text-black hover:bg-white/10 hover:text-white"
        onClick={() => handleShare('facebook')}
      >
        <Facebook className="w-5 h-5" />
        {showLabels && <span className="ml-2">Facebook</span>}
      </Button>
      <Button 
        size={size}
        variant={variant}
        className="border-white/30 text-black hover:bg-white/10 hover:text-white"
        onClick={() => handleShare('twitter')}
      >
        <Twitter className="w-5 h-5" />
        {showLabels && <span className="ml-2">Twitter</span>}
      </Button>
      <Button 
        size={size}
        variant={variant}
        className="border-white/30 text-black hover:bg-white/10 hover:text-white"
        onClick={() => handleShare('linkedin')}
      >
        <Linkedin className="w-5 h-5" />
        {showLabels && <span className="ml-2">LinkedIn</span>}
      </Button>
    </div>
  )
}
