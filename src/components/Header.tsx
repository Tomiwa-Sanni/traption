
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

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
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
              AI-Powered Caption Generator
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
              <Link to="/dashboard">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/dashboard') && "bg-accent text-accent-foreground"
                )}>
                  Dashboard
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
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/dashboard">Try it now</Link>
          </Button>
          
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
                  <Button variant="ghost" size="sm" asChild className={cn("justify-start", isActive('/dashboard') && "bg-accent")}>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      Dashboard
                    </Link>
                  </Button>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
