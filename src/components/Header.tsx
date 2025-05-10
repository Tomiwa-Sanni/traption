
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Home, Menu, X, MessageSquare, Contact } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerClose
} from './ui/drawer';

interface HeaderProps {
  className?: string;
  minimal?: boolean;
}

export function Header({ className, minimal = false }: HeaderProps) {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <header className={cn("py-8 bg-gradient-to-r from-purple-600 to-indigo-600", 
      !minimal && "h-screen flex flex-col", className)}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-white hover:opacity-90 transition-opacity">
          <h1 className="text-4xl font-bold">
            Traption
          </h1>
        </Link>
        
        {isMobile ? (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-2">
                <Link to="/" onClick={() => setIsDrawerOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="w-5 h-5 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link to="/generator" onClick={() => setIsDrawerOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Generator
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setIsDrawerOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Contact className="w-5 h-5 mr-2" />
                    Contact
                  </Button>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="flex items-center space-x-4">
            {!minimal && (
              <>
                <Link to="/">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <Home className="w-5 h-5 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link to="/generator">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Generator
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <Contact className="w-5 h-5 mr-2" />
                    Contact
                  </Button>
                </Link>
              </>
            )}
            
            {minimal && (
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Home className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      
      {!minimal && (
        <div className="container mt-10 flex-1 flex flex-col justify-center text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">AI-Powered Social Media Caption Generator</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Create engaging, platform-specific captions in seconds with advanced AI technology
          </p>
          <div className="flex justify-center">
            <Link to="/generator">
              <Button size="lg" variant="secondary" className="dark:text-primary text-white hover:text-primary font-semibold">
                Get Started For Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
