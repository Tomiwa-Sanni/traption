
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "Morning Coffee Vibes",
      date: "May 10, 2025",
      platform: "Instagram",
      content: "☕ Morning ritual in full effect! Starting the day with my favorite brew and a moment of mindfulness. Anyone else feel like their day doesn't truly begin until after that first sip? #MorningCoffee #MindfulMoments #BrewLife",
    },
    {
      id: 2,
      title: "Weekend Adventure",
      date: "May 3, 2025",
      platform: "Instagram",
      content: "🏞️ Lost in nature, found myself. Sometimes you need to disconnect to reconnect. This weekend hike was exactly what my soul needed. #WeekendVibes #NatureTherapy #HikingAdventures #MountainViews",
    },
    {
      id: 3,
      title: "Tech Announcement",
      date: "May 8, 2025",
      platform: "Twitter",
      content: "Just tried the new AI caption generator from @Traption and wow! Generated platform-specific captions in seconds. Game-changer for content creators. #AI #SocialMediaTips",
    },
    {
      id: 4,
      title: "Industry Insight",
      date: "May 5, 2025",
      platform: "Twitter",
      content: "New study shows AI-generated social media content gets 43% more engagement when properly optimized for each platform. This is why tools matter. #ContentStrategy #DigitalMarketing",
    },
    {
      id: 5,
      title: "Professional Milestone",
      date: "May 7, 2025",
      platform: "LinkedIn",
      content: "Thrilled to announce that our team has just launched Traption - an AI-powered caption generator that helps content creators save time while optimizing their social media presence across multiple platforms.\n\nIn today's digital landscape, creating platform-specific content is crucial for engagement, but it's also time-consuming. That's why we developed a solution that generates tailored captions in seconds.\n\nLooking forward to seeing how this tool helps marketers and creators streamline their workflow while improving results.\n\n#ProductLaunch #AITools #ContentCreation #DigitalMarketing",
    },
    {
      id: 6,
      title: "Quick Tip Video",
      date: "May 9, 2025",
      platform: "TikTok",
      content: "POV: You just discovered that you've been writing captions wrong this whole time 😱 #socialmediatips #contentcreator #fyp #learnontiktok",
    },
    {
      id: 7,
      title: "Tutorial Video",
      date: "May 2, 2025",
      platform: "TikTok",
      content: "3 quick hacks to create viral captions for ANY platform! 🚀 Save this for later! #socialmediahacks #influencertips #contentcreation #traption",
    },
    {
      id: 8,
      title: "Community Update",
      date: "May 6, 2025",
      platform: "Facebook",
      content: "BIG NEWS! 🎉 We've just added support for 5 new languages to our caption generator! Now you can create engaging social media content in English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese.\n\nWe're committed to helping content creators around the world connect with their audiences in their preferred languages. Tag someone who would find this useful!\n\n#SocialMediaTips #ContentCreation #LanguageSupport",
    }
  ];

  // Platform colors for badges
  const platformColors: {[key: string]: string} = {
    "Instagram": "bg-gradient-to-r from-purple-500 to-pink-500",
    "Twitter": "bg-blue-500",
    "LinkedIn": "bg-blue-700",
    "TikTok": "bg-black",
    "Facebook": "bg-blue-600"
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore our latest posts across different social media platforms, all created with Traption's AI caption generator.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </div>
                <Badge className={`${platformColors[post.platform]} text-white`}>
                  {post.platform}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className={post.platform === "Instagram" || post.platform === "TikTok" ? 
                "aspect-square bg-muted rounded-md flex items-center justify-center mb-4" :
                "rounded-md bg-muted p-4 mb-4 min-h-[100px] flex items-center justify-center"}>
                <p className="text-sm text-muted-foreground">
                  {post.platform} embed would appear here
                </p>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground mt-auto">
              Generated with Traption
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
