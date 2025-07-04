
import React from 'react';
import { Clock, Bell, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { toast } from 'sonner';

interface ComingSoonProps {
  toolName: string;
  description: string;
  estimatedLaunch?: string;
  features?: string[];
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  toolName,
  description,
  estimatedLaunch = "Soon",
  features = []
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Simulate email subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    toast.success('Thanks! We\'ll notify you when it\'s ready.');
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Clock className="h-6 w-6 text-blue-500" />
          <span className="text-sm text-muted-foreground tracking-glass">Coming Soon</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
          {toolName}
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Main Info Card */}
        <GlassCard className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
              <Bell className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Get Notified
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Be the first to know when {toolName} launches. We'll send you an email as soon as it's available.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNotifyMe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass w-full"
                />
                <Button type="submit" className="w-full">
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-green-500 mb-4">
                  <Bell className="h-5 w-5" />
                  <span>You're all set!</span>
                </div>
                <p className="text-muted-foreground">
                  We'll email you when {toolName} is ready.
                </p>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Features Preview */}
        <GlassCard className="p-8">
          <h3 className="text-xl font-semibold mb-6 text-foreground">
            What to Expect
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-foreground">Estimated Launch: {estimatedLaunch}</span>
            </div>
            
            {features.length > 0 && (
              <>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-medium mb-3 text-foreground">Planned Features:</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Back to Tools */}
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link to="/tools" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools Hub
          </Link>
        </Button>
      </div>
    </div>
  );
};
