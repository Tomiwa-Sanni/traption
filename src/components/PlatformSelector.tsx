import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Plus, X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TikTok } from './icons/TikTok';
import { Pinterest } from './icons/Pinterest';
import { WhatsApp } from './icons/WhatsApp';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define available platforms with their icons, names, and descriptions
const DEFAULT_PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Visual storytelling with emoji and hashtag options',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    description: 'Concise captions for optimal engagement',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Professional, industry-focused captions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Conversational captions for higher reach',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Trendy captions with high discoverability',
    icon: <TikTok className="h-5 w-5" />,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    description: 'SEO-friendly descriptions for discovery',
    icon: <Pinterest className="h-5 w-5" />,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Engaging messages for direct sharing',
    icon: <WhatsApp className="h-5 w-5" />,
  },
];

interface PlatformSelectorProps {
  selectedPlatform: string | string[];
  onSelectPlatform: (platform: string | string[]) => void;
}

export const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) => {
  const [availablePlatforms, setAvailablePlatforms] = useState([...DEFAULT_PLATFORMS]);
  const [customPlatformName, setCustomPlatformName] = useState('');
  const [customPlatformDesc, setCustomPlatformDesc] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Check if the platform is selected
  const isPlatformSelected = (platformId: string) => {
    if (Array.isArray(selectedPlatform)) {
      return selectedPlatform.includes(platformId);
    }
    return selectedPlatform === platformId;
  };
  
  // Handle platform selection
  const handleSelectPlatform = (platformId: string) => {
    if (Array.isArray(selectedPlatform)) {
      if (isPlatformSelected(platformId)) {
        // Only allow deselection if there will still be at least one platform selected
        const updatedSelection = selectedPlatform.filter(id => id !== platformId);
        if (updatedSelection.length > 0) {
          onSelectPlatform(updatedSelection);
        }
      } else {
        // Add to selection
        onSelectPlatform([...selectedPlatform, platformId]);
      }
    } else {
      // Switch from single selection to multi-selection
      if (selectedPlatform === platformId) {
        // Don't allow deselecting the only selected platform
        return;
      } else if (selectedPlatform) {
        onSelectPlatform([selectedPlatform, platformId]);
      } else {
        onSelectPlatform(platformId);
      }
    }
  };
  
  // Add a custom platform
  const handleAddCustomPlatform = () => {
    if (!customPlatformName.trim()) return;
    
    const newPlatformId = customPlatformName.toLowerCase().replace(/\s+/g, '-');
    
    // Check if platform with this ID already exists
    if (availablePlatforms.some(p => p.id === newPlatformId)) {
      alert('A platform with a similar name already exists');
      return;
    }
    
    const newPlatform = {
      id: newPlatformId,
      name: customPlatformName.trim(),
      description: customPlatformDesc.trim() || 'Custom platform',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
    };
    
    // Update available platforms
    setAvailablePlatforms(prev => [...prev, newPlatform]);
    
    // Select the new platform
    if (Array.isArray(selectedPlatform)) {
      onSelectPlatform([...selectedPlatform, newPlatform.id]);
    } else if (selectedPlatform) {
      onSelectPlatform([selectedPlatform, newPlatform.id]);
    } else {
      onSelectPlatform(newPlatform.id);
    }
    
    // Reset form and close dialog
    setCustomPlatformName('');
    setCustomPlatformDesc('');
    setDialogOpen(false);
  };
  
  // Get the count of selected platforms
  const selectedCount = Array.isArray(selectedPlatform) 
    ? selectedPlatform.length 
    : (selectedPlatform ? 1 : 0);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <p className="text-sm font-medium">
          {selectedCount === 0 
            ? 'Select platforms:' 
            : `${selectedCount} platform${selectedCount > 1 ? 's' : ''} selected:`}
        </p>
        
        {/* Display selected platforms as badges */}
        <ScrollArea className="w-full max-w-full">
          <div className="flex flex-nowrap gap-2 pb-2">
            {Array.isArray(selectedPlatform) && selectedPlatform.length > 0 ? (
              selectedPlatform.map(platformId => {
                const platform = availablePlatforms.find(p => p.id === platformId);
                if (!platform) return null;
                
                return (
                  <Badge key={platformId} variant="secondary" className="flex items-center gap-1 whitespace-nowrap">
                    {platform.name}
                    {/* Only show remove button if there's more than one platform selected */}
                    {selectedPlatform.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full p-0"
                        onClick={() => handleSelectPlatform(platformId)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    )}
                  </Badge>
                );
              })
            ) : selectedPlatform ? (
              <Badge variant="secondary" className="flex items-center gap-1 whitespace-nowrap">
                {availablePlatforms.find(p => p.id === selectedPlatform)?.name || selectedPlatform}
                {/* Don't show remove button for single selected platform */}
              </Badge>
            ) : null}
          </div>
        </ScrollArea>
      </div>
      
      {/* Platform grid */}
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-w-[600px]">
          {availablePlatforms.map(platform => (
            <Button
              key={platform.id}
              variant="outline"
              size="lg"
              className={`flex items-center justify-start gap-2 h-auto py-3 px-4 overflow-hidden ${
                isPlatformSelected(platform.id)
                  ? 'border-primary/80 bg-primary/10 dark:text-primary-foreground'
                  : ''
              } hover:border-primary hover:text-primary focus:text-primary`}
              onClick={() => handleSelectPlatform(platform.id)}
            >
              <div className="flex-shrink-0">
                {isPlatformSelected(platform.id) ? (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-background dark:text-primary-foreground" />
                  </div>
                ) : (
                  platform.icon
                )}
              </div>
              <div className="text-left">
                <div className={`font-medium ${isPlatformSelected(platform.id) ? 'text-primary dark:text-primary-foreground' : ''}`}>
                  {platform.name}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {platform.description}
                </p>
              </div>
            </Button>
          ))}
          
          {/* Custom platform button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-start gap-2 h-auto py-3 px-4 border-dashed"
              >
                <div className="flex-shrink-0">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Custom Platform</div>
                  <p className="text-xs text-muted-foreground">
                    Add your own platform
                  </p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Platform</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input
                    id="platform-name"
                    placeholder="e.g., YouTube, Blog, Email"
                    value={customPlatformName}
                    onChange={(e) => setCustomPlatformName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-desc">Description (optional)</Label>
                  <Input
                    id="platform-desc"
                    placeholder="Brief description of the platform"
                    value={customPlatformDesc}
                    onChange={(e) => setCustomPlatformDesc(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomPlatform} disabled={!customPlatformName.trim()}>
                  Add Platform
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ScrollArea>
    </div>
  );
};
