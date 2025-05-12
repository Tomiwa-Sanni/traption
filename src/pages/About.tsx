
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
            Our AI-powered caption generator helps you craft the perfect captions for any platform, ensuring your content gets the engagement it deserves.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-4 text-muted-foreground">
            <li>
              <strong>Select your platforms</strong> - Choose which social media platforms you want to create captions for.
            </li>
            <li>
              <strong>Customize your preferences</strong> - Set your tone, style, language, and whether you want hashtags and emojis.
            </li>
            <li>
              <strong>Describe your content</strong> - Tell us about the post you're creating, your target audience, keywords, and call-to-action.
            </li>
            <li>
              <strong>Generate your caption</strong> - Our AI will create optimized captions tailored to each platform you selected.
            </li>
          </ol>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
          <p className="text-muted-foreground mb-4">
            At Traption, we take your privacy seriously. That's why:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>All caption generation happens directly between your browser and OpenRouter's servers</li>
            <li>We don't track or store the content of your captions</li>
            <li>No account creation or personal information is required to use our service</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
