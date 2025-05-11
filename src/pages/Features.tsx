
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Features = () => {
  return (
    <div className="container max-w-6xl py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Features</h1>
      
      <Tabs defaultValue="platforms" className="w-full">
        <div className="relative">
          <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4" orientation="horizontal">
            <TabsList className="inline-flex w-max">
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="customization">Customization</TabsTrigger>
              <TabsTrigger value="style">Style Options</TabsTrigger>
              <TabsTrigger value="language">Languages</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>
        
        <TabsContent value="platforms" className="space-y-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Multi-Platform Support</h2>
              <p className="text-muted-foreground mb-6">
                Traption generates platform-specific captions optimized for each social network's unique requirements and audience expectations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Instagram</h3>
                  <p className="text-sm text-muted-foreground">Visually descriptive captions with strategic hashtags and engaging storytelling.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Twitter/X</h3>
                  <p className="text-sm text-muted-foreground">Concise and impactful captions that work within character limits while driving engagement.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">Professional captions with industry insights and thought leadership positioning.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">TikTok</h3>
                  <p className="text-sm text-muted-foreground">Trending hashtags and conversational captions that appeal to TikTok's younger audience.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Facebook</h3>
                  <p className="text-sm text-muted-foreground">Conversational captions designed to maximize reach and engagement in news feeds.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Pinterest</h3>
                  <p className="text-sm text-muted-foreground">SEO-optimized descriptions with keywords that help your pins get discovered.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customization">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Advanced Customization</h2>
              <p className="text-muted-foreground mb-6">
                Tailor your captions exactly how you want them with our detailed customization options.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Tone Selection</h3>
                  <p className="text-muted-foreground mb-2">Choose from multiple tone options:</p>
                  <ul className="list-disc pl-5 text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>Professional</li>
                    <li>Casual</li>
                    <li>Humorous</li>
                    <li>Inspirational</li>
                    <li>Persuasive</li>
                    <li>Informative</li>
                    <li>Friendly</li>
                    <li>Authoritative</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Optional Elements</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Emoji integration to add visual appeal</li>
                    <li>Hashtag generation for increased discoverability</li>
                    <li>Custom call-to-actions to drive user engagement</li>
                    <li>Adjustable caption length to fit your needs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="style">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Caption Styles</h2>
              <p className="text-muted-foreground mb-6">
                Select from various structural approaches to organize your captions effectively.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Hook-Story-Offer</h3>
                  <p className="text-muted-foreground">
                    Start with an attention-grabbing hook, tell a compelling story, and finish with a clear offer or call-to-action. Perfect for promotional content.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Question-Answer</h3>
                  <p className="text-muted-foreground">
                    Begin with a thought-provoking question that resonates with your audience, then provide a valuable answer. Great for educational content.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Problem-Solution</h3>
                  <p className="text-muted-foreground">
                    Identify a common pain point for your audience and present your content as the solution. Ideal for service-based businesses.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Storytelling</h3>
                  <p className="text-muted-foreground">
                    Create an emotional connection through narrative. Perfect for brand building and personal content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Multi-Language Support</h2>
              <p className="text-muted-foreground mb-6">
                Reach global audiences with captions in multiple languages, each maintaining the right tone and cultural context.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">English</div>
                <div className="p-4 border rounded-lg text-center">Spanish</div>
                <div className="p-4 border rounded-lg text-center">French</div>
                <div className="p-4 border rounded-lg text-center">German</div>
                <div className="p-4 border rounded-lg text-center">Italian</div>
                <div className="p-4 border rounded-lg text-center">Portuguese</div>
                <div className="p-4 border rounded-lg text-center">Japanese</div>
                <div className="p-4 border rounded-lg text-center">Chinese</div>
                <div className="p-4 border rounded-lg text-center">Russian</div>
                <div className="p-4 border rounded-lg text-center">Arabic</div>
                <div className="p-4 border rounded-lg text-center">Hindi</div>
                <div className="p-4 border rounded-lg text-center">Korean</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Privacy-First Approach</h2>
              <p className="text-muted-foreground mb-6">
                Traption is built with user privacy as a foundational principle.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Client-Side API Integration</h3>
                  <p className="text-muted-foreground">
                    Your OpenAI API key is stored locally in your browser's localStorage and never transmitted to our servers.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">No Account Required</h3>
                  <p className="text-muted-foreground">
                    Use all features without creating an account or sharing personal information.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Local Storage Only</h3>
                  <p className="text-muted-foreground">
                    Your captions and settings are saved only on your device for your convenience.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Direct API Communication</h3>
                  <p className="text-muted-foreground">
                    All requests to OpenAI are made directly from your browser to their API, without passing through our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Features;
