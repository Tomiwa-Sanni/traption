import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateCaption, captionProgressEmitter } from '@/services/openaiService';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { CaptionPreview } from '@/components/CaptionPreview';
import { toast } from 'sonner';

const VideoScripts = () => {
  const { apiKey } = useApiKey();
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [style, setStyle] = useState('educational');
  const [language, setLanguage] = useState('English');
  const [videoDuration, setVideoDuration] = useState('60');
  const [platform, setPlatform] = useState('TikTok');
  const [generatedScript, setGeneratedScript] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProgress, setCurrentProgress] = useState('');

  useEffect(() => {
    const handleProgress = (event: any) => {
      setCurrentProgress(event.detail);
    };

    captionProgressEmitter.addEventListener('progress', handleProgress);
    return () => {
      captionProgressEmitter.removeEventListener('progress', handleProgress);
    };
  }, []);

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
    setGeneratedScript({});
    setCurrentProgress('');

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
        includeEmojis: false,
        includeHashtags: false,
        language,
        description: scriptPrompt,
        audience,
        keywords: keywordArray,
        cta: 'Subscribe for more content like this!',
        captionLength: 'long',
      });

      setGeneratedScript(typeof result === 'string' ? { [platform]: result } : result);
      toast.success('Video script generated successfully!');
    } catch (error: any) {
      console.error('Error generating script:', error);
      toast.error(error.message || 'Failed to generate video script');
    } finally {
      setIsGenerating(false);
      setCurrentProgress('');
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
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customization</h3>
              
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="energetic">Energetic</SelectItem>
                    <SelectItem value="inspiring">Inspiring</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="video-style">Video Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="documentary">Documentary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Button 
            onClick={handleGenerate} 
            className="w-full" 
            disabled={isGenerating || !description.trim()}
          >
            {isGenerating ? 'Generating Script...' : 'Generate Video Script'}
          </Button>
        </div>

        <div className="space-y-6">
          <CaptionPreview
            caption={isGenerating ? currentProgress : generatedScript}
            platform={platform}
            isLoading={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoScripts;