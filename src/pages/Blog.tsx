
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Blog = () => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Social Media Showcase</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Explore our latest posts across different social media platforms, all created with Traption's AI caption generator.
      </p>
      
      <Tabs defaultValue="instagram" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="twitter">Twitter/X</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="instagram" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Instagram Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram Embed 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Morning Coffee Vibes</CardTitle>
                <CardDescription>Posted May 10, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-sm text-muted-foreground">Instagram post embed would appear here</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  ☕ Morning ritual in full effect! Starting the day with my favorite brew and a moment of mindfulness. 
                  Anyone else feel like their day doesn't truly begin until after that first sip? 
                  #MorningCoffee #MindfulMoments #BrewLife
                </p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Generated with Traption
              </CardFooter>
            </Card>
            
            {/* Instagram Embed 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Weekend Adventure</CardTitle>
                <CardDescription>Posted May 3, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-sm text-muted-foreground">Instagram post embed would appear here</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  🏞️ Lost in nature, found myself. Sometimes you need to disconnect to reconnect. 
                  This weekend hike was exactly what my soul needed.
                  #WeekendVibes #NatureTherapy #HikingAdventures #MountainViews
                </p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Generated with Traption
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="twitter" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Twitter/X Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tech Announcement</CardTitle>
                <CardDescription>Posted May 8, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4 mb-4">
                  <p className="text-sm">Twitter embed would appear here</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Just tried the new AI caption generator from @Traption and wow! Generated platform-specific captions in seconds. Game-changer for content creators. #AI #SocialMediaTips
                </p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Generated with Traption
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Industry Insight</CardTitle>
                <CardDescription>Posted May 5, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4 mb-4">
                  <p className="text-sm">Twitter embed would appear here</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  New study shows AI-generated social media content gets 43% more engagement when properly optimized for each platform. This is why tools matter. #ContentStrategy #DigitalMarketing
                </p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Generated with Traption
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="linkedin" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">LinkedIn Posts</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Professional Milestone</CardTitle>
              <CardDescription>Posted May 7, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 mb-4">
                <p className="text-sm">LinkedIn embed would appear here</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Thrilled to announce that our team has just launched Traption - an AI-powered caption generator that helps content creators save time while optimizing their social media presence across multiple platforms.
                
                In today's digital landscape, creating platform-specific content is crucial for engagement, but it's also time-consuming. That's why we developed a solution that generates tailored captions in seconds.
                
                Looking forward to seeing how this tool helps marketers and creators streamline their workflow while improving results.
                
                #ProductLaunch #AITools #ContentCreation #DigitalMarketing
              </p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Generated with Traption
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tiktok" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">TikTok Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Tip Video</CardTitle>
                <CardDescription>Posted May 9, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[9/16] bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-sm text-muted-foreground">TikTok video embed would appear here</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  POV: You just discovered that you've been writing captions wrong this whole time 😱 #socialmediatips #contentcreator #fyp #learnontiktok
                </p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Generated with Traption
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tutorial Video</CardTitle>
                <CardDescription>Posted May 2, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[9/16] bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-sm text-muted-foreground">TikTok video embed would appear here</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  3 quick hacks to create viral captions for ANY platform! 🚀 Save this for later! #socialmediahacks #influencertips #contentcreation #traption
                </p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Generated with Traption
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="facebook" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Facebook Posts</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Community Update</CardTitle>
              <CardDescription>Posted May 6, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 mb-4">
                <p className="text-sm">Facebook post embed would appear here</p>
              </div>
              <p className="text-sm text-muted-foreground">
                BIG NEWS! 🎉 We've just added support for 5 new languages to our caption generator! Now you can create engaging social media content in English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese.
                
                We're committed to helping content creators around the world connect with their audiences in their preferred languages. Tag someone who would find this useful!
                
                #SocialMediaTips #ContentCreation #LanguageSupport
              </p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Generated with Traption
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Blog;
