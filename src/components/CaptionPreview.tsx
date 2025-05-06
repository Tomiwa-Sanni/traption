
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Linkedin, Youtube, Search, Copy } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

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
      case 'google': return <Search className="h-5 w-5" />;
      case 'tiktok': return <div className="text-sm font-bold">TT</div>;
      case 'twitter': return <div className="text-sm font-bold">X</div>;
      case 'pinterest': return <div className="text-sm font-bold">P</div>;
      default: return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'Twitter (X)';
      case 'google': return 'Google My Business';
      default: return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Caption copied to clipboard!');
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Generated Caption</span>
        </CardTitle>
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
                <TabsList className="flex mb-4 overflow-x-auto">
                  {platforms.map((p) => (
                    <TabsTrigger key={p} value={p} className="flex items-center gap-2">
                      {getPlatformIcon(p)}
                      <span>{getPlatformName(p)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {platforms.map((p) => (
                  <TabsContent key={p} value={p} className="space-y-4">
                    <div className="relative min-h-24 bg-muted p-4 rounded-md">
                      {captions[p] ? (
                        <pre className="whitespace-pre-wrap font-sans break-words">
                          {captions[p]}
                        </pre>
                      ) : (
                        <p className="text-muted-foreground">Generate a caption to see it here.</p>
                      )}
                    </div>
                    {captions[p] && (
                      <Button 
                        variant="secondary" 
                        onClick={() => copyToClipboard(captions[p])}
                        className="w-full flex gap-2 items-center justify-center"
                      >
                        <Copy className="h-4 w-4" />
                        Copy {getPlatformName(p)} Caption
                      </Button>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <>
                <div className="relative min-h-24 bg-muted p-4 rounded-md">
                  {caption ? (
                    <pre className="whitespace-pre-wrap font-sans break-words">
                      {typeof caption === 'string' ? caption : captions[platforms[0]] || ''}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground">Generate a caption to see it here.</p>
                  )}
                </div>
                {caption && (
                  <Button 
                    variant="secondary" 
                    onClick={() => copyToClipboard(typeof caption === 'string' ? caption : captions[platforms[0]] || '')}
                    className="w-full flex gap-2 items-center justify-center"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Caption
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
