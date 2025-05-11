
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 flex flex-col items-center text-center bg-gradient-to-b from-purple-50 to-background dark:from-purple-950/20 dark:to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text mb-6">
            Create Scroll-Stopping Captions in Seconds
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Traption is a free AI-powered caption generator that helps you create engaging captions for Instagram, Twitter, LinkedIn, TikTok, and more—complete with the right tone, hashtags, and emojis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/dashboard">Try It Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 md:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Platform Support</h3>
              <p className="text-muted-foreground">Create captions tailored specifically for Instagram, Twitter, LinkedIn, TikTok, and more platforms.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">Your API keys are stored securely in your browser and never leave your device.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Tone</h3>
              <p className="text-muted-foreground">Choose from multiple tones to match your brand voice, from professional to casual to humorous.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                  <path d="M12 8v4l3 3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
              <p className="text-muted-foreground">Generate engaging captions in seconds rather than spending hours crafting the perfect message.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Hashtags</h3>
              <p className="text-muted-foreground">Automatically generate relevant hashtags that will help increase your content's visibility.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
              <p className="text-muted-foreground">Create captions in various languages to reach a global audience with your content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-purple-50 dark:bg-purple-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Engaging Captions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start generating scroll-stopping captions for your social media posts in seconds.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link to="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
