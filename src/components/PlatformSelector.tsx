
import { useState } from 'react';
import { Instagram, Facebook, Linkedin, Youtube, Twitter, Plus, Check, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TikTok } from './icons/TikTok';
import { Pinterest } from './icons/Pinterest';
import { WhatsApp } from './icons/WhatsApp';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

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
  
  // State for custom platforms
  const [customPlatforms, setCustomPlatforms] = useState<Platform[]>(() => {
    // Load from localStorage
    const savedPlatforms = localStorage.getItem('traption_custom_platforms');
    return savedPlatforms ? JSON.parse(savedPlatforms) : [];
  });

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformColor, setNewPlatformColor] = useState('#6366f1');

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
  const platforms = [...defaultPlatforms, ...customPlatforms];

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
    if (!newPlatformName.trim()) {
      toast.error('Please provide a platform name');
      return;
    }

    // Create sanitized ID from the name
    const platformId = `custom-${newPlatformName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    
    // Check for duplicate IDs
    if (platforms.some(p => p.id === platformId)) {
      toast.error('A platform with a similar name already exists');
      return;
    }

    const newPlatform: Platform = {
      id: platformId,
      name: newPlatformName,
      icon: <User className="h-5 w-5" />,
      color: newPlatformColor.replace('#', 'bg-[#') + ']',
      custom: true
    };

    const updatedCustomPlatforms = [...customPlatforms, newPlatform];
    setCustomPlatforms(updatedCustomPlatforms);
    
    // Save to localStorage
    localStorage.setItem('traption_custom_platforms', JSON.stringify(updatedCustomPlatforms));
    
    // Reset form and close dialog
    setNewPlatformName('');
    setNewPlatformColor('#6366f1');
    setIsDialogOpen(false);
    toast.success(`${newPlatformName} platform added successfully!`);
  };

  const removeCustomPlatform = (platformId: string) => {
    // Remove from custom platforms
    const updatedCustomPlatforms = customPlatforms.filter(p => p.id !== platformId);
    setCustomPlatforms(updatedCustomPlatforms);
    
    // Save to localStorage
    localStorage.setItem('traption_custom_platforms', JSON.stringify(updatedCustomPlatforms));
    
    // If the platform was selected, remove it from selection
    if (selectedPlatforms.includes(platformId)) {
      const newSelection = selectedPlatforms.filter(id => id !== platformId);
      if (newSelection.length > 0) {
        onSelectPlatform(newSelection.length === 1 ? newSelection[0] : newSelection);
      } else {
        // If no platforms are selected, default to Instagram
        onSelectPlatform('instagram');
      }
    }
    
    toast.success('Platform removed successfully!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Select Platform(s)</h3>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex gap-1 items-center">
              <Plus className="h-4 w-4" /> Add Platform
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Platform</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-3">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input 
                  id="platform-name" 
                  value={newPlatformName} 
                  onChange={(e) => setNewPlatformName(e.target.value)}
                  placeholder="e.g., Threads"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform-color">Brand Color</Label>
                <div className="flex gap-3">
                  <Input 
                    id="platform-color" 
                    type="color" 
                    value={newPlatformColor}
                    onChange={(e) => setNewPlatformColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={newPlatformColor}
                    onChange={(e) => setNewPlatformColor(e.target.value)}
                    placeholder="#6366f1"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={addCustomPlatform}
              >
                Add Platform
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="relative w-full">
        <ScrollArea className="w-full pb-2">
          <div className="flex gap-2 pb-2 pr-2 min-w-max">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-3 text-left transition-all hover:border-primary whitespace-nowrap group relative",
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
                
                {/* Remove button for custom platforms */}
                {platform.custom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCustomPlatform(platform.id);
                    }}
                    className="absolute -top-2 -right-2 h-5 w-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${platform.name}`}
                  >
                    <X className="h-3 w-3 text-white" />
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
