
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Facebook, Linkedin, ArrowRight, Check } from 'lucide-react';
import { X } from 'lucide-react';
import { TikTok } from '@/components/icons/TikTok';
import { WhatsApp } from '@/components/icons/WhatsApp';
import { Pinterest } from '@/components/icons/Pinterest';

const Home = () => {
  // Ensure page scrolls to top on load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Platforms Section */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Supported Platforms</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Generate optimized captions for all major social media platforms with a single click
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <Instagram className="h-10 w-10 text-platform-instagram mb-4" />
              <h3 className="font-medium">Instagram</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <TikTok className="h-10 w-10 text-platform-tiktok mb-4" />
              <h3 className="font-medium">TikTok</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <X className="h-10 w-10 text-platform-twitter mb-4" />
              <h3 className="font-medium">X</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <Facebook className="h-10 w-10 text-platform-facebook mb-4" />
              <h3 className="font-medium">Facebook</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <Linkedin className="h-10 w-10 text-platform-linkedin mb-4" />
              <h3 className="font-medium">LinkedIn</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <Pinterest className="h-10 w-10 text-platform-pinterest mb-4" />
              <h3 className="font-medium">Pinterest</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <WhatsApp className="h-10 w-10 text-platform-whatsapp mb-4" />
              <h3 className="font-medium">WhatsApp</h3>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all">
              <div className="text-sm text-muted-foreground">
                + Custom Platforms
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Our AI-powered caption generator helps you create engaging content in just a few simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">1</span>
                Select Platforms
              </h3>
              <p className="text-muted-foreground">
                Choose from popular social media platforms or add your own custom platforms to generate captions for.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">2</span>
                Customize Your Caption
              </h3>
              <p className="text-muted-foreground">
                Set your preferred tone, style, length, and include optional elements like emojis and hashtags.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">3</span>
                Generate & Copy
              </h3>
              <p className="text-muted-foreground">
                Click generate and get platform-optimized captions that you can use right away on your social posts.
              </p>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/generator">
              <Button size="lg">
                Try It Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Why Choose Traption?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium">Platform-Specific Optimization</h3>
                    <p className="text-muted-foreground">Each caption is tailored to the specific platform's best practices and character limits.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium">Customizable Length and Style</h3>
                    <p className="text-muted-foreground">Control the length, tone, and style of your captions to match your brand voice.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium">Multi-Platform Support</h3>
                    <p className="text-muted-foreground">Generate captions for multiple platforms at once to save time and effort.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium">Advanced AI Generation</h3>
                    <p className="text-muted-foreground">Powered by state-of-the-art AI models that understand social media trends and engagement patterns.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <Card className="border-2 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=1000"
                    alt="Social media content creation" 
                    className="w-full h-auto object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Creating Better Social Media Captions Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of content creators, marketers, and businesses who use Traption to increase engagement on their social media posts.
          </p>
          <Link to="/generator">
            <Button size="lg" variant="secondary" className="dark:text-primary text-white hover:text-primary">
              Get Started For Free
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
