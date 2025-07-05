
import React from 'react';
import { Clock, Bell, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ComingSoonProps {
  toolName: string;
  description: string;
  estimatedLaunch?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  toolName,
  description,
  estimatedLaunch = "Soon"
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendAdminNotification = async (email: string, source: string) => {
    try {
      await supabase.functions.invoke('send-admin-notifications', {
        body: {
          type: 'newsletter_subscription',
          email,
          source
        }
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      // Don't fail the main operation if notification fails
    }
  };

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          source: 'coming_soon'
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.success('You\'re already subscribed! We\'ll notify you when it\'s ready.');
        } else {
          throw error;
        }
      } else {
        toast.success('Thanks! We\'ll notify you when it\'s ready.');
        // Send admin notification for new newsletter subscription
        await sendAdminNotification(email, 'coming_soon');
      }
      
      setIsSubscribed(true);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

      <div className="max-w-md mx-auto">
        <GlassCard className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
              <Bell className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Get Notified
            </h3>
            
            <p className="text-muted-foreground mb-2">
              Be the first to know when {toolName} launches.
            </p>
            
            <p className="text-sm text-muted-foreground mb-6">
              Estimated Launch: {estimatedLaunch}
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNotifyMe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass w-full"
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Subscribing...' : 'Notify Me'}
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
