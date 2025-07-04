import { useState, useEffect } from 'react';
import { useApiKey } from '@/hooks/useApiKey';
import { generateCaption, captionProgressEmitter } from '@/services/openaiService';
import { PlatformSelector } from '@/components/PlatformSelector';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { InputFields } from '@/components/InputFields';
import { CaptionPreview } from '@/components/CaptionPreview';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Rocket, 
  ArrowRight, 
  Zap 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Interface for tracking caption generation progress
interface CaptionProgress {
  [platform: string]: {
    status: 'idle' | 'started' | 'draft-completed' | 'critique-completed' | 'revision-completed' | 'completed' | 'error';
    caption?: string;
    error?: string;
  };
}

const Dashboard = () => {
  const { apiKey } = useApiKey();
  
  // Save that user visited caption generator
  useEffect(() => {
    localStorage.setItem('traption_last_tool', 'caption-generator');
  }, []);
  
  // Platform state - always start with 'instagram' as default
  const [selectedPlatform, setSelectedPlatform] = useState<string | string[]>('instagram');
  
  // Customization options
  const [tone, setTone] = useState('casual');
  const [style, setStyle] = useState('hook-story-offer');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [language, setLanguage] = useState('English');
  const [captionLength, setCaptionLength] = useState('medium');
  
  // Input fields
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [cta, setCta] = useState('');
  
  // Generated caption
  const [caption, setCaption] = useState<string | Record<string, string>>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Caption generation progress tracking
  const [captionProgress, setCaptionProgress] = useState<CaptionProgress>({});
  
  // Load customization settings using localStorage - except for platform and caption
  useEffect(() => {
    // Load settings on initial render
    const loadSettings = () => {
      const savedTone = localStorage.getItem('traption_tone');
      const savedStyle = localStorage.getItem('traption_style');
      const savedEmojis = localStorage.getItem('traption_emojis');
      const savedHashtags = localStorage.getItem('traption_hashtags');
      const savedLanguage = localStorage.getItem('traption_language');
      const savedDescription = localStorage.getItem('traption_description');
      const savedAudience = localStorage.getItem('traption_audience');
      const savedKeywords = localStorage.getItem('traption_keywords');
      const savedCta = localStorage.getItem('traption_cta');
      const savedCaptionLength = localStorage.getItem('traption_caption_length');
      
      if (savedTone) setTone(savedTone);
      if (savedStyle) setStyle(savedStyle);
      if (savedEmojis) setIncludeEmojis(savedEmojis === 'true');
      if (savedHashtags) setIncludeHashtags(savedHashtags === 'true');
      if (savedLanguage) setLanguage(savedLanguage);
      if (savedDescription) setDescription(savedDescription);
      if (savedAudience) setAudience(savedAudience);
      if (savedCta) setCta(savedCta);
      if (savedCaptionLength) setCaptionLength(savedCaptionLength);
      
      if (savedKeywords) {
        try {
          const parsedKeywords = JSON.parse(savedKeywords);
          if (Array.isArray(parsedKeywords)) {
            setKeywords(parsedKeywords);
          }
        } catch (e) {
          console.error('Error parsing keywords from localStorage:', e);
        }
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings whenever they change (except platform and caption)
  useEffect(() => {
    localStorage.setItem('traption_tone', tone);
    localStorage.setItem('traption_style', style);
    localStorage.setItem('traption_emojis', String(includeEmojis));
    localStorage.setItem('traption_hashtags', String(includeHashtags));
    localStorage.setItem('traption_language', language);
    localStorage.setItem('traption_caption_length', captionLength);
  }, [tone, style, includeEmojis, includeHashtags, language, captionLength]);
  
  // Save input values whenever they change
  useEffect(() => {
    localStorage.setItem('traption_description', description);
    localStorage.setItem('traption_audience', audience);
    localStorage.setItem('traption_keywords', JSON.stringify(keywords));
    localStorage.setItem('traption_cta', cta);
  }, [description, audience, keywords, cta]);
  
  // Set up caption progress event listener
  useEffect(() => {
    const handleCaptionProgress = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { platform, status, caption: platformCaption, error } = customEvent.detail;
      
      setCaptionProgress(prev => ({
        ...prev,
        [platform]: {
          status,
          ...(platformCaption ? { caption: platformCaption } : {}),
          ...(error ? { error } : {})
        }
      }));
      
      if (status === 'completed' || status === 'error') {
        setCaption(prev => {
          const currentCaption = typeof prev === 'string' ? { [platform]: prev } : { ...prev };
          
          if (status === 'completed') {
            currentCaption[platform] = platformCaption;
          } else if (status === 'error') {
            currentCaption[platform] = `Error: ${error}`;
          }
          
          return Array.isArray(selectedPlatform) && selectedPlatform.length > 1
            ? currentCaption
            : currentCaption[platform];
        });
      }
    };
    
    captionProgressEmitter.addEventListener('captionProgress', handleCaptionProgress);
    
    return () => {
      captionProgressEmitter.removeEventListener('captionProgress', handleCaptionProgress);
    };
  }, [selectedPlatform]);
  
  const handleGenerate = async () => {
    if (!description) {
      toast.error('Please provide a post description');
      return;
    }

    const platformsToGenerate = Array.isArray(selectedPlatform) 
      ? selectedPlatform.filter(p => p)
      : (selectedPlatform || 'instagram');
      
    if ((Array.isArray(platformsToGenerate) && platformsToGenerate.length === 0) || !platformsToGenerate) {
      setSelectedPlatform('instagram');
      toast.error('At least one platform must be selected. Defaulting to Instagram.');
      return;
    }
    
    setIsGenerating(true);
    setCaption('');
    
    const platforms = Array.isArray(platformsToGenerate) ? platformsToGenerate : [platformsToGenerate];
    const initialProgress: CaptionProgress = {};
    platforms.forEach(platform => {
      initialProgress[platform] = { status: 'idle' };
    });
    setCaptionProgress(initialProgress);
    
    try {
      await generateCaption({
        apiKey,
        platform: platformsToGenerate,
        tone,
        style,
        includeEmojis,
        includeHashtags,
        language,
        description,
        audience,
        keywords,
        cta,
        captionLength
      });
      
      toast.success('Caption generation complete!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate caption');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const getCaptionForPreview = () => {
    if (!isGenerating && Object.keys(captionProgress).length === 0) {
      return caption;
    }
    
    const progressCaption: Record<string, string> = {};
    Object.entries(captionProgress).forEach(([platform, progress]) => {
      if (progress.status === 'idle') {
        progressCaption[platform] = 'Waiting to start...';
      } else if (progress.status === 'started') {
        progressCaption[platform] = 'Creating initial draft...';
      } else if (progress.status === 'draft-completed') {
        progressCaption[platform] = 'Draft completed, critiquing...';
      } else if (progress.status === 'critique-completed') {
        progressCaption[platform] = 'Applying improvements based on critique...';
      } else if (progress.status === 'revision-completed') {
        progressCaption[platform] = 'Giving final polish...';
      } else if (progress.status === 'completed') {
        progressCaption[platform] = progress.caption || 'Caption complete!';
      } else if (progress.status === 'error') {
        progressCaption[platform] = `Error: ${progress.error || 'Unknown error'}`;
      }
    });
    
    return progressCaption;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <main className="container space-y-8 flex-grow py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text inline-block">
            AI Caption Generator
          </h1>
          <p className="text-muted-foreground mt-2">Create engaging, platform-optimized captions for your social media posts in seconds</p>
        </div>
        
        {/* Dashboard stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-none dark:from-purple-950/30 dark:to-indigo-950/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium">AI-Powered</p>
                <p className="text-xs text-muted-foreground">Advanced content generation</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-none dark:from-blue-950/30 dark:to-cyan-950/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Instant Results</p>
                <p className="text-xs text-muted-foreground">Generate captions in seconds</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-none dark:from-indigo-950/30 dark:to-purple-950/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
                <Rocket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Platform Optimized</p>
                <p className="text-xs text-muted-foreground">Tailored for each social network</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Accordion 
              type="multiple" 
              defaultValue={["platform", "customization", "input"]}
              className="space-y-4"
            >
              <AccordionItem value="platform" className="border rounded-lg bg-card shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                  <span className="flex items-center gap-2">
                    Platform Selection
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 animate-accordion-down">
                  <PlatformSelector 
                    selectedPlatform={selectedPlatform}
                    onSelectPlatform={setSelectedPlatform}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="customization" className="border rounded-lg bg-card shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                  <span className="flex items-center gap-2">
                    Caption Customization
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 animate-accordion-down">
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
                    captionLength={captionLength}
                    setCaptionLength={setCaptionLength}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="input" className="border rounded-lg bg-card shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                  <span className="flex items-center gap-2">
                    Content Details
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 animate-accordion-down">
                  <InputFields 
                    description={description}
                    setDescription={setDescription}
                    audience={audience}
                    setAudience={setAudience}
                    keywords={keywords}
                    setKeywords={setKeywords}
                    cta={cta}
                    setCta={setCta}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-center pt-4">
              <Button 
                size="lg" 
                onClick={handleGenerate}
                disabled={isGenerating || !description}
                className="px-8 py-6 text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isGenerating ? 'Creating Captions...' : (
                  <div className="flex items-center gap-2">
                    Generate Captions <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <CaptionPreview 
                caption={getCaptionForPreview()} 
                platform={selectedPlatform}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
