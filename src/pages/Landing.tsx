
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
    quote: "Traption has cut my caption writing time by 80%. I can now focus more on creating actual content rather than spending hours figuring out what to write.",
  },
  {
    name: "Michael T.",
    role: "Social Media Manager",
    quote: "Managing accounts across 6 different platforms used to be a nightmare for captions. With Traption, I can generate platform-specific content in seconds.",
  },
  {
    name: "Elena R.",
    role: "Small Business Owner",
    quote: "As someone who isn't a natural writer, Traption has been a game-changer for my business. Our engagement has increased by 45% since using these AI-generated captions.",
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
    title: "Platform-Specific Optimization",
    description: "Automatically tailors your captions for each social media platform's unique audience, character limits, and best practices."
  },
  {
    title: "Multiple Tones & Styles",
    description: "Choose from professional, casual, humorous, inspirational and more to match your brand voice."
  },
  {
    title: "Hashtag Generation",
    description: "Intelligently suggests relevant hashtags to improve discoverability for each platform."
  },
  {
    title: "Multilingual Support",
    description: "Create captions in multiple languages to reach global audiences with the same quality and messaging."
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
                Create Perfect Captions for Every Platform
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Generate AI-powered, platform-specific social media captions in seconds. Optimize your content for each platform without the hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link to="/dashboard">Try it now</Link>
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
                    {/*<img 
                      src="https://via.placeholder.com/600x400/EEEEEE/999999?text=AI+Caption+Generator"
                      alt="Traption AI Caption Generator"
                      className="w-full h-auto rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-sm font-semibold mb-2">Generated for Instagram:</p>
                        <p className="text-xs opacity-90">
                          ✨ Embracing the creative journey one step at a time. What's inspiring you today? #CreativeProcess #InspirationDaily
                        </p>
                      </div>
                    </div>*/}
                    <div class="w-full max-w-[660px] mx-auto">
                      <div class="relative w-full pt-[63%]">
                        <iframe 
                          src="https://cdn.iframe.ly/api/iframe?app=1&url=https%3A%2F%2Fwww.instagram.com%2Fp%2FDJmcFsANbnE%2F%3Figsh%3DMWFibHlzMjFlcTFoag%3D%3D&key=925108d922be940af814f71907a7df4b"
                          class="absolute top-0 left-0 w-full h-full border-0"
                          allowfullscreen
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
            One Tool. <span className="text-primary">Multiple Platforms.</span>
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
      
      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Your Platforms</h3>
              <p className="text-muted-foreground">Choose which social media platforms you want to create captions for.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customize Your Style</h3>
              <p className="text-muted-foreground">Set your tone, choose whether to include hashtags, emojis, and more.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate & Use</h3>
              <p className="text-muted-foreground">Click generate and get platform-optimized captions ready to copy and use.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
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
      <section className="py-16 md:py-24">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Social Media Content?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start creating platform-optimized captions in seconds with Traption's AI-powered generator.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/dashboard">Try it for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
