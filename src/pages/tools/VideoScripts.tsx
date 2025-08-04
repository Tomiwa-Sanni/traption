
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, Check, Clock, Video } from 'lucide-react';
import { generateCaption } from '@/services/openaiService';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { toast } from 'sonner';

const VideoScripts = () => {
  const { apiKey } = useApiKey();
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [style, setStyle] = useState('hook-story-offer');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [language, setLanguage] = useState('English');
  const [videoDuration, setVideoDuration] = useState('60');
  const [platform, setPlatform] = useState('TikTok');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey) {
      toast.error('Please enter your API key first');
      return;
    }

    if (!description.trim()) {
      toast.error('Please enter a video topic or concept');
      return;
    }

    setIsGenerating(true);
    setGeneratedScript('');

    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const scriptPrompt = `Generate a ${videoDuration}-second video script for ${platform} about: ${description}
      
      Requirements:
      - Include clear timing markers (e.g., [0-5s], [5-10s])
      - Start with a strong hook in the first 3 seconds
      - Include scene directions and visual cues
      - Add pacing suggestions for maximum engagement
      - End with a clear call-to-action
      - Optimize for ${platform} best practices
      ${audience ? `- Target audience: ${audience}` : ''}
      ${keywordArray.length > 0 ? `- Include these themes: ${keywordArray.join(', ')}` : ''}`;

      const result = await generateCaption({
        apiKey,
        platform,
        tone,
        style,
        includeEmojis,
        includeHashtags,
        language,
        description: scriptPrompt,
        audience,
        keywords: keywordArray,
        cta: 'Subscribe for more content like this!',
        captionLength: 'long',
      });

      const script = typeof result === 'string' ? result : result[platform] || '';
      setGeneratedScript(script);
      toast.success('Video script generated successfully!');
    } catch (error: any) {
      console.error('Error generating script:', error);
      toast.error(error.message || 'Failed to generate video script');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      toast.success('Script copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  if (!apiKey) {
    return <ApiKeyInput />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Video Scripts Generator</h1>
        <p className="text-xl text-muted-foreground">
          Generate engaging scripts for short-form videos with timing, hooks, and platform optimization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Video Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Video Topic or Concept *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your video concept, main message, or topic you want to create a script for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
                      <SelectItem value="YouTube Shorts">YouTube Shorts</SelectItem>
                      <SelectItem value="Facebook Reels">Facebook Reels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Video Duration</Label>
                  <Select value={videoDuration} onValueChange={setVideoDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                      <SelectItem value="90">90 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Young professionals, Fitness enthusiasts, Gamers"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords/Themes (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., trending, viral, educational, funny"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full mt-6" 
              disabled={isGenerating || !description.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Script...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Generate Video Script
                </>
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <CustomizationPanel
              tone={tone}
              setTone={setTone}
              style={style}
              setStyle={setStyle}
              includeEmojis={includeEmojis}
              setIncludeEmojis={setIncludeEmojis}
              includeHashtags={includeHashtags}
              setIncludeHashtags={setIncludeHashtags}
              language={language}
              setLanguage={setLanguage}
            />
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Generated Video Script</h2>
              {generatedScript && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {videoDuration}s
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            {!generatedScript && !isGenerating && (
              <p className="text-muted-foreground text-center py-8">
                Generate a script to see it here
              </p>
            )}
            
            {isGenerating && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Generating video script...</span>
              </div>
            )}

            {generatedScript && (
              <div className="bg-muted/50 rounded-lg p-4 border">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {generatedScript}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoScripts;
