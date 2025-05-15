
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Traption</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Traption was created with a simple mission: to help content creators, marketers, and businesses save time and create more engaging social media content. We believe that everyone deserves access to powerful AI tools that can elevate their social media presence without requiring technical expertise.
          </p>
          <p className="text-muted-foreground">
            Our suite of AI-powered tools helps you craft the perfect content for any platform, ensuring your social media strategy gets the results it deserves.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Our Tools</h2>
          <p className="text-muted-foreground mb-4">
            Traption offers a comprehensive collection of tools designed to enhance every aspect of your social media strategy:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Caption Generator</strong> - Create platform-specific captions optimized for engagement</li>
            <li><strong>Hooks & Headlines</strong> - Craft attention-grabbing introductions that stop the scroll</li>
            <li><strong>Video Scripts</strong> - Generate compelling scripts for short-form video content</li>
            <li><strong>Content Planning</strong> - Organize your content calendar and schedule posts</li>
            <li><strong>Engagement Tools</strong> - Respond to comments and increase audience interaction</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
          <p className="text-muted-foreground mb-4">
            At Traption, we take your privacy seriously. That's why:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>All content generation happens directly between your browser and OpenRouter's servers</li>
            <li>We don't track or store the content you create</li>
            <li>Your data remains yours - we prioritize security in everything we build</li>
            <li>We're committed to transparent data practices and user privacy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
