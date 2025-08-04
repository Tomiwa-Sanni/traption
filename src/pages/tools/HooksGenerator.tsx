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
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { CaptionPreview } from '@/components/CaptionPreview';
import { toast } from 'sonner';

const HooksGenerator = () => {
  const { apiKey } = useApiKey();
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('engaging');
  const [hookLength, setHookLength] = useState('short');
  const [generatedHooks, setGeneratedHooks] = useState<Record<string, string>>({});
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
      toast.error('Please enter a topic or content description');
      return;
    }

    setIsGenerating(true);
    setGeneratedHooks({});
    setCurrentProgress('');

    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const result = await generateCaption({
        apiKey,
        platform: selectedPlatforms,
        tone,
        style: 'hooks',
        includeEmojis: false,
        includeHashtags: false,
        language,
        description: `Create compelling hooks/headlines: ${description}`,
        audience,
        keywords: keywordArray,
        cta: '',
        captionLength: hookLength,
      });
      
      setGeneratedHooks(typeof result === 'string' ? { [selectedPlatforms[0]]: result } : result);
      toast.success('Hooks generated successfully!');
    } catch (error: any) {
      console.error('Error generating hooks:', error);
      toast.error(error.message || 'Failed to generate hooks');
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
        <h1 className="text-4xl font-bold mb-4">Hooks & Headlines Generator</h1>
        <p className="text-xl text-muted-foreground">
          Create attention-grabbing opening lines and headlines that stop scrollers in their tracks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Content Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Topic or Content Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your content is about, the main message, or the topic you want to create hooks for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Small business owners, Tech enthusiasts, Parents"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., productivity, success, motivation"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div>
                <Label>Social Media Platforms</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Instagram', 'Twitter', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube'].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPlatforms([...selectedPlatforms, platform]);
                          } else {
                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <CustomizationPanel
            tone={tone}
            setTone={setTone}
            style=""
            setStyle={() => {}}
            captionLength={hookLength}
            setCaptionLength={setHookLength}
            includeEmojis={false}
            setIncludeEmojis={() => {}}
            includeHashtags={false}
            setIncludeHashtags={() => {}}
            language={language}
            setLanguage={setLanguage}
            selectedPlatform={selectedPlatforms}
          />

          <Button 
            onClick={handleGenerate} 
            className="w-full" 
            disabled={isGenerating || !description.trim() || selectedPlatforms.length === 0}
          >
            {isGenerating ? 'Generating Hooks...' : 'Generate Hooks & Headlines'}
          </Button>
        </div>

        <div className="space-y-6">
          <CaptionPreview
            caption={isGenerating ? currentProgress : generatedHooks}
            platform={selectedPlatforms}
            isLoading={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default HooksGenerator;