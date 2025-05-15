
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Platform images (placeholders)
const platforms = [
  { name: "Instagram", color: "bg-platform-instagram text-white" },
  { name: "Twitter/X", color: "bg-platform-twitter text-white" },
  { name: "LinkedIn", color: "bg-platform-linkedin text-white" },
  { name: "Facebook", color: "bg-platform-facebook text-white" },
  { name: "TikTok", color: "bg-platform-tiktok text-white" },
  { name: "Pinterest", color: "bg-platform-pinterest text-white" },
  { name: "WhatsApp", color: "bg-platform-whatsapp text-white" },
];

// Testimony data
const testimonials = [
  {
    name: "Sarah J.",
    role: "Content Creator",
    quote: "Traption has cut my content creation time by 80%. I can now focus more on creating actual content rather than spending hours figuring out what to write.",
  },
  {
    name: "Michael T.",
    role: "Social Media Manager",
    quote: "Managing accounts across 6 different platforms used to be a nightmare. With Traption's suite of tools, I can generate platform-specific content in seconds.",
  },
  {
    name: "Elena R.",
    role: "Small Business Owner",
    quote: "As someone who isn't a natural writer, Traption has been a game-changer for my business. Our engagement has increased by 45% since using their AI-powered tools.",
  },
  {
    name: "David W.",
    role: "Marketing Consultant",
    quote: "I recommend Traption to all my clients. It's the easiest way to maintain a consistent voice while optimizing for each platform's unique requirements.",
  },
];

// Features data
const features = [
  {
    title: "All-in-One Platform",
    description: "Access 8+ specialized tools designed to supercharge your social media presence and content creation workflow."
  },
  {
    title: "Multiple Tones & Styles",
    description: "Choose from professional, casual, humorous, inspirational and more to match your brand voice across all content types."
  },
  {
    title: "Smart Content Suggestions",
    description: "Get AI-powered recommendations for captions, scripts, hooks, and responses tailored to your audience and platform."
  },
  {
    title: "Content Planning & Scheduling",
    description: "Organize your content calendar and set up reminders to never miss the optimal posting time."
  },
];

const Landing = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text animate-gradient">
                Your Complete Social Media Powerhouse
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Transform your social media strategy with Traption's suite of AI-powered tools. Create, plan, and optimize your content for every platform in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link to="/tools">Explore Tools</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 opacity-30 blur"></div>
                <Card className="relative rounded-xl overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="w-full max-w-[660px] mx-auto">
                      <div className="relative w-full pt-[63%]">
                        <iframe 
                          src="https://cdn.iframe.ly/api/iframe?app=1&url=https%3A%2F%2Fwww.instagram.com%2Fp%2FDJmcFsANbnE%2F%3Figsh%3DMWFibHlzMjFlcTFoag%3D%3D&key=925108d922be940af814f71907a7df4b"
                          className="absolute top-0 left-0 w-full h-full border-0"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Platform Support Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            One Platform. <span className="text-primary">Multiple Solutions.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
            {platforms.map((platform, index) => (
              <div 
                key={index} 
                className={`${platform.color} rounded-xl p-4 w-full h-24 flex items-center justify-center shadow-md transition-transform hover:scale-105`}
              >
                <span className="font-bold">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tools Showcase */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">Our Powerful Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">AI Caption Generator</h3>
                <p className="text-muted-foreground">Create platform-optimized captions for all your social media posts in seconds.</p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Hooks & Headlines</h3>
                <p className="text-muted-foreground">Craft attention-grabbing hooks and headlines that stop the scroll.</p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Video Script Writer</h3>
                <p className="text-muted-foreground">Generate engaging scripts for TikTok, Reels, and YouTube Shorts.</p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Comment Assistant</h3>
                <p className="text-muted-foreground">Reply to comments with AI-generated responses that match your tone.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link to="/tools">Explore All Tools</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Tool</h3>
              <p className="text-muted-foreground">Select from our suite of specialized tools based on your content needs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customize Your Content</h3>
              <p className="text-muted-foreground">Set your preferences, tone, and content details for perfectly tailored results.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate & Schedule</h3>
              <p className="text-muted-foreground">Get instant AI-powered content and schedule it for the perfect time.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to="/tools">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/features" className="text-primary hover:underline">
              See all features →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">What People Are Saying</h2>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="p-6">
                        <blockquote className="text-muted-foreground mb-4">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 mx-2" />
              <CarouselNext className="static translate-y-0 mx-2" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start creating high-quality content across all platforms with Traption's comprehensive set of AI-powered tools.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/tools">Try it for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
