
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, Check } from 'lucide-react';
import { generateCaption, captionProgressEmitter } from '@/services/openaiService';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { toast } from 'sonner';

const HooksGenerator = () => {
  const { apiKey } = useApiKey();
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [style, setStyle] = useState('hook-story-offer');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [language, setLanguage] = useState('English');
  const [contentLength, setContentLength] = useState('medium');
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
    setGeneratedHooks([]);

    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      // Generate multiple hooks by calling the service multiple times
      const hookPromises = Array.from({ length: 5 }, async (_, index) => {
        const result = await generateCaption({
          apiKey,
          platform: 'General',
          tone,
          style,
          includeEmojis,
          includeHashtags,
          language,
          description: `Generate an attention-grabbing hook/headline for: ${description}`,
          audience,
          keywords: keywordArray,
          cta: '',
          captionLength: contentLength,
        });
        return typeof result === 'string' ? result : result['General'] || '';
      });

      const hooks = await Promise.all(hookPromises);
      setGeneratedHooks(hooks.filter(hook => hook && hook.trim()));
      toast.success('Hooks generated successfully!');
    } catch (error: any) {
      console.error('Error generating hooks:', error);
      toast.error(error.message || 'Failed to generate hooks');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Hook copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
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
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full mt-6" 
              disabled={isGenerating || !description.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Hooks...
                </>
              ) : (
                'Generate Hooks & Headlines'
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
              captionLength={contentLength}
              setCaptionLength={setContentLength}
            />
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Hooks & Headlines</h2>
            {generatedHooks.length === 0 && !isGenerating && (
              <p className="text-muted-foreground text-center py-8">
                Generate hooks to see them here
              </p>
            )}
            
            {isGenerating && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Generating hooks...</span>
              </div>
            )}

            <div className="space-y-4">
              {generatedHooks.map((hook, index) => (
                <div key={index} className="relative group">
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm leading-relaxed flex-1">{hook}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(hook, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="absolute -top-2 -left-2 text-xs">
                    Hook {index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HooksGenerator;
