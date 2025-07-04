
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ResponsiveDropdown } from '@/components/ui/responsive-dropdown';
import MobileNav from '@/components/MobileNav';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toolsOptions = [
    { value: '/tools/caption-generator', label: 'Caption Generator' },
    { value: '/tools/hooks-generator', label: 'Hooks Generator' },
    { value: '/tools/video-scripts', label: 'Video Scripts' },
    { value: '/tools/comment-assistant', label: 'Comment Assistant' },
    { value: '/tools/content-calendar', label: 'Content Calendar' },
  ];

  const handleToolSelect = (value: string) => {
    navigate(value);
  };

  return (
    <header className="glass border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
          Traption
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-foreground/80 transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-foreground hover:text-foreground/80 transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-foreground hover:text-foreground/80 transition-colors">
            About
          </Link>
          
          {user && (
            <>
              <Link to="/tools" className="text-foreground hover:text-foreground/80 transition-colors">
                Tools
              </Link>
              <div className="min-w-[160px]">
                <ResponsiveDropdown
                  options={toolsOptions}
                  value=""
                  onValueChange={handleToolSelect}
                  placeholder="Quick Access"
                  className="text-sm"
                />
              </div>
            </>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/account">
                <Button variant="ghost" size="sm">
                  Account
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav isAuthenticated={!!user} onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
