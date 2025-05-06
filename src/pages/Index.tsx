
import { useState } from 'react';
import { useApiKey } from '@/hooks/useApiKey';
import { generateCaption } from '@/services/openaiService';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { PlatformSelector } from '@/components/PlatformSelector';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { InputFields } from '@/components/InputFields';
import { CaptionPreview } from '@/components/CaptionPreview';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

const Index = () => {
  const { apiKey, hasApiKey } = useApiKey();
  
  // Platform state
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  
  // Customization options
  const [tone, setTone] = useState('casual');
  const [style, setStyle] = useState('hook-story-offer');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [language, setLanguage] = useState('English');
  
  // Input fields
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [cta, setCta] = useState('');
  
  // Generated caption
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!description) {
      toast.error('Please provide a post description');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedCaption = await generateCaption({
        apiKey,
        platform: selectedPlatform,
        tone,
        style,
        includeEmojis,
        includeHashtags,
        language,
        description,
        audience,
        keywords,
        cta
      });
      setCaption(generatedCaption);
      toast.success('Caption generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate caption');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-12 bg-gradient-to-b from-background to-secondary/20">
      <Header />

      <main className="container space-y-6 flex-grow">
        {/* API Key Input */}
        <ApiKeyInput />

        {/* Main content */}
        {hasApiKey && (
          <>
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
                  caption={caption} 
                  platform={selectedPlatform}
                  isLoading={isGenerating} 
                />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
