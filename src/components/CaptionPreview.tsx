
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Linkedin, Youtube, Copy, Twitter, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { TikTok } from './icons/TikTok';
import { Pinterest } from './icons/Pinterest';
import { WhatsApp } from './icons/WhatsApp';
import { Badge } from './ui/badge';

interface CaptionPreviewProps {
  caption: string | Record<string, string>;
  platform: string | string[];
  isLoading: boolean;
}

export function CaptionPreview({ caption, platform, isLoading }: CaptionPreviewProps) {
  // Convert platforms to array for consistent handling
  const platforms = Array.isArray(platform) ? platform : [platform];
  const isMultiPlatform = platforms.length > 1;
  
  // Convert caption to record for consistent handling
  const captions: Record<string, string> = typeof caption === 'string' 
    ? { [platforms[0]]: caption } 
    : caption as Record<string, string>;
  
  const [activeTab, setActiveTab] = useState<string>(platforms[0]);

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'whatsapp': return <WhatsApp className="h-5 w-5" />;
      case 'tiktok': return <TikTok className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      case 'pinterest': return <Pinterest className="h-5 w-5" />;
      default: 
        // For custom platforms use a default icon
        if (platform.startsWith('custom-')) {
          return <Sparkles className="h-5 w-5" />;
        }
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    if (platform.startsWith('custom-')) {
      // Try to get custom platform name from localStorage
      try {
        const customPlatforms = JSON.parse(localStorage.getItem('traption_custom_platforms') || '[]');
        const customPlatform = customPlatforms.find((p: any) => p.id === platform);
        if (customPlatform) return customPlatform.name;
      } catch (e) {
        // Fallback if localStorage parsing fails
      }
    }
    
    switch (platform) {
      case 'twitter': return 'Twitter (X)';
      case 'whatsapp': return 'WhatsApp';
      default: return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Caption copied to clipboard!');
  };

  // Check if the caption is in "loading" state with status updates
  const isGenerating = (text: string): boolean => {
    return text?.startsWith('Creating') || 
           text?.startsWith('Waiting') || 
           text?.startsWith('Draft completed') || 
           text?.startsWith('Applying') || 
           text?.startsWith('Giving');
  };

  // Get progress percentage based on status text
  const getProgressValue = (text: string): number => {
    if (!text) return 0;
    if (text.startsWith('Waiting')) return 10;
    if (text.startsWith('Creating')) return 30;
    if (text.startsWith('Draft completed')) return 50;
    if (text.startsWith('Applying')) return 70;
    if (text.startsWith('Giving')) return 90;
    return 100;
  };

  // Get status text for display
  const getStatusText = (text: string): string => {
    if (!text) return 'Initializing...';
    if (text.startsWith('Waiting')) return 'Initializing...';
    if (text.startsWith('Creating')) return 'Creating draft...';
    if (text.startsWith('Draft completed')) return 'Critiquing draft...';
    if (text.startsWith('Applying')) return 'Revising caption...';
    if (text.startsWith('Giving')) return 'Final polish...';
    return '';
  };

  const renderCaptionContent = (platformId: string) => {
    const captionText = captions[platformId];
    
    if (!captionText) {
      return (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-muted-foreground">Generate a caption to see it here.</p>
        </div>
      );
    }
    
    if (isGenerating(captionText)) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-10">
          <div className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-10 px-4 py-2">
            <div className="h-5 w-5 text-primary border-t-2 border-b-2 border-primary animate-spin rounded-full"></div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            {getStatusText(captionText)}
          </p>
          <Progress value={getProgressValue(captionText)} className="w-full max-w-[200px]" />
        </div>
      );
    }
    
    return (
      <>
        <ScrollArea className="h-[200px] bg-muted/50 p-4 rounded-md">
          <pre className="whitespace-pre-wrap font-sans break-words">
            {captionText}
          </pre>
          <ScrollBar />
        </ScrollArea>
        <Button 
          variant="secondary" 
          onClick={() => copyToClipboard(captionText)}
          className="w-full flex gap-2 items-center justify-center mt-4"
        >
          <Copy className="h-4 w-4" />
          Copy {getPlatformName(platformId)} Caption
        </Button>
      </>
    );
  };

  return (
    <Card className="h-full border shadow-md backdrop-blur-sm bg-card/90">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <span>Generated Caption</span>
            <Badge variant="outline" className="text-xs font-normal">
              {isMultiPlatform ? `${platforms.length} platforms` : getPlatformName(platforms[0])}
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        ) : (
          <>
            {isMultiPlatform ? (
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="relative w-full">
                  <ScrollArea className="w-full pb-2">
                    <TabsList className="inline-flex w-max mb-4">
                      {platforms.map((p) => (
                        <TabsTrigger key={p} value={p} className="flex items-center gap-2">
                          {getPlatformIcon(p)}
                          <span>{getPlatformName(p)}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
                
                <div className="min-h-[200px]">
                  {platforms.map((p) => (
                    <TabsContent key={p} value={p} className="space-y-4 mt-0">
                      {renderCaptionContent(p)}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            ) : (
              <div className="min-h-[200px]">
                {renderCaptionContent(platforms[0])}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
