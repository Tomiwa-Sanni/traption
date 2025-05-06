
import { useState } from 'react';
import { Instagram, Facebook, Linkedin, Youtube, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      icon: <div className="text-lg font-bold">TT</div>,
      color: 'bg-platform-tiktok',
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      icon: <div className="text-lg font-bold">X</div>,
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
      icon: <div className="text-lg font-bold">P</div>,
      color: 'bg-platform-pinterest',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      color: 'bg-platform-youtube',
    },
    {
      id: 'google',
      name: 'Google My Business',
      icon: <Search className="h-5 w-5" />,
      color: 'bg-platform-google',
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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg border p-3 text-left transition-all hover:border-primary",
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
    </div>
  );
}
