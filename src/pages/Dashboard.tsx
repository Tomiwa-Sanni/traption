
import { useState } from 'react';
import { useApiKey } from '@/hooks/useApiKey';
import { generateCaption, captionProgressEmitter } from '@/services/openaiService';
import { PlatformSelector } from '@/components/PlatformSelector';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { InputFields } from '@/components/InputFields';
import { CaptionPreview } from '@/components/CaptionPreview';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useEffect } from 'react';

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
  
  // Platform state - use default value but don't load from localStorage
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
  
  // Load and save customization settings using localStorage - except for platform
  useEffect(() => {
    // Load settings on initial render
    const loadSettings = () => {
      const savedTone = localStorage.getItem('traption_tone');
      const savedStyle = localStorage.getItem('traption_style');
      const savedEmojis = localStorage.getItem('traption_emojis');
      const savedHashtags = localStorage.getItem('traption_hashtags');
      const savedLanguage = localStorage.getItem('traption_language');
      const savedCaption = localStorage.getItem('traption_caption');
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
      
      if (savedCaption) {
        try {
          // Try to parse as JSON first (for multi-platform captions)
          const parsedCaption = JSON.parse(savedCaption);
          setCaption(parsedCaption);
        } catch (e) {
          // If not JSON, treat as single string
          setCaption(savedCaption);
        }
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings whenever they change (except platform)
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
  
  // Save caption whenever it changes
  useEffect(() => {
    if (caption) {
      localStorage.setItem('traption_caption', typeof caption === 'object' ? JSON.stringify(caption) : caption);
    }
  }, [caption]);
  
  // Set up caption progress event listener
  useEffect(() => {
    const handleCaptionProgress = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { platform, status, caption: platformCaption, error } = customEvent.detail;
      
      // Update progress state
      setCaptionProgress(prev => ({
        ...prev,
        [platform]: {
          status,
          ...(platformCaption ? { caption: platformCaption } : {}),
          ...(error ? { error } : {})
        }
      }));
      
      // Only update the main caption state when generation is complete
      if (status === 'completed' || status === 'error') {
        setCaption(prev => {
          const currentCaption = typeof prev === 'string' ? { [platform]: prev } : { ...prev };
          
          if (status === 'completed') {
            currentCaption[platform] = platformCaption;
          } else if (status === 'error') {
            currentCaption[platform] = `Error: ${error}`;
          }
          
          // Return the current caption object or just the platform caption if only one platform
          return Array.isArray(selectedPlatform) && selectedPlatform.length > 1
            ? currentCaption
            : currentCaption[platform];
        });
      }
    };
    
    // Add event listener
    captionProgressEmitter.addEventListener('captionProgress', handleCaptionProgress);
    
    // Cleanup
    return () => {
      captionProgressEmitter.removeEventListener('captionProgress', handleCaptionProgress);
    };
  }, [selectedPlatform]);
  
  const handleGenerate = async () => {
    if (!description) {
      toast.error('Please provide a post description');
      return;
    }

    // Make sure we have selected platforms
    const platformsToGenerate = Array.isArray(selectedPlatform) 
      ? selectedPlatform.filter(p => p) // Filter out empty strings
      : (selectedPlatform || 'instagram'); // Default to instagram if nothing selected
      
    if (Array.isArray(platformsToGenerate) && platformsToGenerate.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    setIsGenerating(true);
    
    // Reset caption state for a clean generation
    setCaption('');
    
    // Initialize progress for each selected platform
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
  
  // Prepare caption data for preview component, incorporating progress information
  const getCaptionForPreview = () => {
    if (!isGenerating && Object.keys(captionProgress).length === 0) {
      return caption;
    }
    
    // If generating, construct a caption object with status updates
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
    <div className="min-h-screen flex flex-col">
      <main className="container space-y-6 flex-grow py-8">
        <h1 className="text-3xl font-bold mb-6">Caption Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Accordion 
              type="multiple" 
              defaultValue={["platform", "customization", "input"]}
              className="space-y-4"
            >
              <AccordionItem value="platform" className="border rounded-lg bg-card">
                <AccordionTrigger className="px-4">Platform Selection</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <PlatformSelector 
                    selectedPlatform={selectedPlatform}
                    onSelectPlatform={setSelectedPlatform}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="customization" className="border rounded-lg bg-card">
                <AccordionTrigger className="px-4">Caption Customization</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
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

              <AccordionItem value="input" className="border rounded-lg bg-card">
                <AccordionTrigger className="px-4">Content Details</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
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

            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleGenerate} 
                disabled={isGenerating || !description}
                className="px-8"
              >
                {isGenerating ? 'Generating...' : 'Generate Caption'}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <CaptionPreview 
              caption={getCaptionForPreview()} 
              platform={selectedPlatform}
              isLoading={false} // Never show loading skeletons since we show progressive updates
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
