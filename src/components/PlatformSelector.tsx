
import { useState } from 'react';
import { Instagram, Facebook, Linkedin, Youtube, Twitter, MessageCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TikTok } from './icons/TikTok';
import { Pinterest } from './icons/Pinterest';
import { WhatsApp } from './icons/WhatsApp';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  custom?: boolean;
}

interface PlatformSelectorProps {
  selectedPlatform: string | string[];
  onSelectPlatform: (platform: string | string[]) => void;
}

export function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  // Convert selectedPlatform to array for consistent handling
  const selectedPlatforms = Array.isArray(selectedPlatform) ? selectedPlatform : [selectedPlatform];
  const [customPlatformName, setCustomPlatformName] = useState('');
  const [customPlatforms, setCustomPlatforms] = useState<Platform[]>(() => {
    try {
      const saved = localStorage.getItem('traption_custom_platforms');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error loading custom platforms:", e);
      return [];
    }
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const defaultPlatforms: Platform[] = [
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

  // Combine default and custom platforms
  const allPlatforms = [...defaultPlatforms, ...customPlatforms];
  
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

  const addCustomPlatform = () => {
    if (!customPlatformName.trim()) return;
    
    // Check if platform name already exists
    if (allPlatforms.some(p => p.name.toLowerCase() === customPlatformName.trim().toLowerCase())) {
      return;
    }

    const newPlatform: Platform = {
      id: `custom-${Date.now()}`,
      name: customPlatformName.trim(),
      icon: <MessageCircle className="h-5 w-5" />,
      color: 'bg-primary',
      custom: true
    };

    const updatedCustomPlatforms = [...customPlatforms, newPlatform];
    setCustomPlatforms(updatedCustomPlatforms);
    localStorage.setItem('traption_custom_platforms', JSON.stringify(updatedCustomPlatforms));
    setCustomPlatformName('');
    setDialogOpen(false);
    
    // Auto-select the new platform
    const newSelection = [...selectedPlatforms, newPlatform.id];
    onSelectPlatform(newSelection.length === 1 ? newSelection[0] : newSelection);
  };

  const removeCustomPlatform = (platformId: string) => {
    // Remove from selected platforms if present
    if (selectedPlatforms.includes(platformId)) {
      const newSelection = selectedPlatforms.filter(id => id !== platformId);
      onSelectPlatform(newSelection.length === 1 ? newSelection[0] : newSelection);
    }

    // Remove from custom platforms
    const updatedCustomPlatforms = customPlatforms.filter(p => p.id !== platformId);
    setCustomPlatforms(updatedCustomPlatforms);
    localStorage.setItem('traption_custom_platforms', JSON.stringify(updatedCustomPlatforms));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Select Platform(s)</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex gap-1">
              <Plus className="h-4 w-4" /> Add Platform
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Custom Platform</DialogTitle>
            </DialogHeader>
            <div className="flex items-end gap-2 mt-4">
              <div className="flex-1">
                <Input 
                  placeholder="Enter platform name" 
                  value={customPlatformName} 
                  onChange={e => setCustomPlatformName(e.target.value)} 
                />
              </div>
              <Button onClick={addCustomPlatform}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full">
        <ScrollArea className="w-full pb-2">
          <div className="flex gap-2 pb-2 pr-2 min-w-max">
            {allPlatforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-3 text-left transition-all hover:border-primary whitespace-nowrap relative group",
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
                {platform.custom && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCustomPlatform(platform.id);
                    }}
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                )}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
