
import { cn } from '@/lib/utils';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  
  // Check authentication state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <header className={cn("py-4 border-b border-border/40 sticky top-0 backdrop-blur-md bg-background/80 z-50", className)}>
      <div className="container flex items-center justify-between">
        {/* Logo and tagline */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
              Traption
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
              Social Media Tools Platform
            </p>
          </Link>
        </div>

        {/* Center navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/') && "bg-accent text-accent-foreground"
                )}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/tools/caption-generator" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Caption Generator</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Create optimized captions for any social platform
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/tools/hooks-generator" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hooks & Headlines</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Craft attention-grabbing post intros
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/tools/video-scripts" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Video Scripts</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Generate engaging short-form video scripts
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/tools/comment-assistant" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Comment Assistant</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Generate thoughtful responses to comments
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/tools/content-calendar" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Content Calendar</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Plan and organize your content schedule
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/tools" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">View All Tools</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explore our complete suite of social media tools
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/tools">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/tools') && "bg-accent text-accent-foreground"
                )}>
                  Tools Hub
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Features</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Discover all the powerful features of Traption
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">About</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn more about Traption and our mission
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Blog</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Check out our social media showcase
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">FAQ</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Find answers to frequently asked questions
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Contact</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Get in touch with our team for support
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
                <Link to="/account">My Account</Link>
              </Button>
              <Button size="sm" variant="ghost" onClick={handleSignOut} className="hidden md:inline-flex">
                Sign Out
              </Button>
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link to="/tools">Tools Hub</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/') && "bg-accent")}>
                    <Link to="/" className="flex items-center gap-2">
                      Home
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/tools') && "bg-accent")}>
                    <Link to="/tools" className="flex items-center gap-2">
                      Tools Hub
                    </Link>
                  </Button>
                  <div className="px-3 py-2">
                    <h3 className="mb-2 text-sm font-medium">Tools</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link to="/tools/caption-generator">Caption Generator</Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link to="/tools/hooks-generator">Hooks & Headlines</Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link to="/tools/video-scripts">Video Scripts</Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link to="/tools/comment-assistant">Comment Assistant</Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link to="/tools/content-calendar">Content Calendar</Link>
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/features') && "bg-accent")}>
                    <Link to="/features" className="flex items-center gap-2">
                      Features
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/about') && "bg-accent")}>
                    <Link to="/about" className="flex items-center gap-2">
                      About
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/blog') && "bg-accent")}>
                    <Link to="/blog" className="flex items-center gap-2">
                      Blog
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/faq') && "bg-accent")}>
                    <Link to="/faq" className="flex items-center gap-2">
                      FAQ
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/contact') && "bg-accent")}>
                    <Link to="/contact" className="flex items-center gap-2">
                      Contact
                    </Link>
                  </Button>
                  {user ? (
                    <>
                      <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/account') && "bg-accent")}>
                        <Link to="/account" className="flex items-center gap-2">
                          My Account
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/auth') && "bg-accent")}>
                      <Link to="/auth" className="flex items-center gap-2">
                        Sign In
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
