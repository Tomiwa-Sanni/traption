import { useState, useEffect } from 'react';
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
import { AdSense } from '@/components/AdSense';


const Index = () => {
  const { apiKey, hasApiKey } = useApiKey();
  
  // Platform state
  const [selectedPlatform, setSelectedPlatform] = useState < string | string[] > ('instagram');
  
  // Customization options
  const [tone, setTone] = useState('casual');
  const [style, setStyle] = useState('hook-story-offer');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [language, setLanguage] = useState('English');
  
  // Input fields
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState < string[] > ([]);
  const [cta, setCta] = useState('');
  
  // Generated caption
  const [caption, setCaption] = useState < string | Record < string, string >> ('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Load and save customization settings using localStorage
  useEffect(() => {
    // Load settings on initial render
    const loadSettings = () => {
      const savedPlatform = localStorage.getItem('traption_platform');
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
      
      if (savedPlatform) {
        try {
          // Try to parse as JSON array first
          const parsedPlatform = JSON.parse(savedPlatform);
          setSelectedPlatform(parsedPlatform);
        } catch (e) {
          // If not JSON, treat as single string
          setSelectedPlatform(savedPlatform);
        }
      }
      
      if (savedTone) setTone(savedTone);
      if (savedStyle) setStyle(savedStyle);
      if (savedEmojis) setIncludeEmojis(savedEmojis === 'true');
      if (savedHashtags) setIncludeHashtags(savedHashtags === 'true');
      if (savedLanguage) setLanguage(savedLanguage);
      if (savedDescription) setDescription(savedDescription);
      if (savedAudience) setAudience(savedAudience);
      if (savedCta) setCta(savedCta);
      
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
  
  // Save settings whenever they change
  useEffect(() => {
    const platformToSave = Array.isArray(selectedPlatform) ? JSON.stringify(selectedPlatform) : selectedPlatform;
    localStorage.setItem('traption_platform', platformToSave);
    localStorage.setItem('traption_tone', tone);
    localStorage.setItem('traption_style', style);
    localStorage.setItem('traption_emojis', String(includeEmojis));
    localStorage.setItem('traption_hashtags', String(includeHashtags));
    localStorage.setItem('traption_language', language);
  }, [selectedPlatform, tone, style, includeEmojis, includeHashtags, language]);
  
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
                  
                  <AdSense
                    adClient="ca-pub-6274496150668837"
                    adSlot="9017540199"
                    adFormat="fluid"
                    layout="in-article"
                    style={{ display: "block", textAlign: "center" }}
                  />
                  {/*<div className="ads">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6274496150668837" crossorigin="anonymous"></script>
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-client="ca-pub-6274496150668837"
                         data-ad-slot="4144728715"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                    <script>
                         (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                  </div>*/}

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
                  
                  <AdSense
                    adClient="ca-pub-6274496150668837"
                    adSlot="4144728715"
                  />

                  {/*<div className="ads">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6274496150668837" crossorigin="anonymous"></script>
                    <ins class="adsbygoogle"
                         style="display:block; text-align:center;"
                         data-ad-layout="in-article"
                         data-ad-format="fluid"
                         data-ad-client="ca-pub-6274496150668837"
                         data-ad-slot="9017540199"></ins>
                    <script>
                         (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>

                  </div>*/}


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
              
              
              {/*<div className="ads">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6274496150668837" crossorigin="anonymous"></script>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-format="autorelaxed"
                     data-ad-client="ca-pub-6274496150668837"
                     data-ad-slot="7841265297"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

              </div>*/}
              
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
      
      <AdSense
        adClient = "ca-pub-6274496150668837"
        adSlot = "7841265297"
        adFormat = "autorelaxed" />

      <Footer />
    </div>
  );
};

export default Index;