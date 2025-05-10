
import { useState } from 'react';
import { Instagram, Facebook, Linkedin, Youtube, Twitter, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TikTok } from './icons/TikTok';
import { Pinterest } from './icons/Pinterest';
import { WhatsApp } from './icons/WhatsApp';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface PlatformSelectorProps {
  selectedPlatform: string | string[];
  onSelectPlatform: (platform: string | string[]) => void;
}

export function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  // Convert selectedPlatform to array for consistent handling
  const selectedPlatforms = Array.isArray(selectedPlatform) ? selectedPlatform : [selectedPlatform];

  const platforms: Platform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      color: 'bg-platform-instagram',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <TikTok className="h-5 w-5" />,
      color: 'bg-platform-tiktok',
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      icon: <Twitter className="h-5 w-5" />,
      color: 'bg-platform-twitter',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      color: 'bg-platform-linkedin',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      color: 'bg-platform-facebook',
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: <Pinterest className="h-5 w-5" />,
      color: 'bg-platform-pinterest',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      color: 'bg-platform-youtube',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <WhatsApp className="h-5 w-5" />,
      color: 'bg-platform-whatsapp',
    },
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      // Remove platform if already selected (but ensure at least one platform remains selected)
      const newSelection = selectedPlatforms.filter(id => id !== platformId);
      if (newSelection.length > 0) {
        onSelectPlatform(newSelection.length === 1 ? newSelection[0] : newSelection);
      }
    } else {
      // Add platform to selection
      const newSelection = [...selectedPlatforms, platformId];
      onSelectPlatform(newSelection.length === 1 ? newSelection[0] : newSelection);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Select Platform(s)</h3>
      <div className="relative w-full">
        <ScrollArea className="w-full pb-2">
          <div className="flex gap-2 pb-2 pr-2 min-w-max">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-3 text-left transition-all hover:border-primary whitespace-nowrap",
                  selectedPlatforms.includes(platform.id)
                    ? "border-2 border-primary bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                <div 
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-white",
                    platform.color
                  )}
                >
                  {platform.icon}
                </div>
                <div className="text-sm font-medium">{platform.name}</div>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
