
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface CaptionPreviewProps {
  caption: string;
  platform: string;
  isLoading: boolean;
}

export function CaptionPreview({ caption, platform, isLoading }: CaptionPreviewProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      toast.success('Caption copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy caption');
    }
  };

  const downloadCaption = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([caption], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${platform}-caption-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('Caption downloaded!');
    } catch (error) {
      toast.error('Failed to download caption');
    }
  };

  const platformClass = platform ? `border-platform-${platform}` : '';

  return (
    <Card className={`h-full flex flex-col ${platformClass}`}>
      <CardHeader>
        <CardTitle className="capitalize">
          {platform ? `${platform} Caption Preview` : 'Caption Preview'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="bg-muted rounded-lg p-4 h-full overflow-auto whitespace-pre-wrap">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-muted-foreground/20 rounded animate-pulse-gentle w-3/4" />
              <div className="h-4 bg-muted-foreground/20 rounded animate-pulse-gentle w-5/6" />
              <div className="h-4 bg-muted-foreground/20 rounded animate-pulse-gentle w-2/3" />
              <div className="h-4 bg-muted-foreground/20 rounded animate-pulse-gentle w-4/5" />
              <div className="h-4 bg-muted-foreground/20 rounded animate-pulse-gentle w-3/5" />
            </div>
          ) : caption ? (
            caption
          ) : (
            <span className="text-muted-foreground italic">
              Your generated caption will appear here...
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={copyToClipboard}
          disabled={!caption || isLoading}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={downloadCaption}
          disabled={!caption || isLoading}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
