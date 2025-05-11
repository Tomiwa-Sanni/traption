
import { cn } from '@/lib/utils';
import { Menu, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("py-6 border-b border-border/40 sticky top-0 backdrop-blur-md bg-background/80 z-50", className)}>
      <div className="container flex items-center justify-between">
        {/* Logo and tagline */}
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
              Traption
            </h1>
            <p className="text-sm text-muted-foreground hidden md:block">
              AI-Powered Caption Generator
            </p>
          </div>
        </div>

        {/* Center navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#features" className="flex items-center gap-2">
              Features
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#tips" className="flex items-center gap-2">
              Tips
            </a>
          </Button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/treshtech.png" alt="Tresh Tech" />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
          
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
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Home
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <a href="#features" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Features
                    </a>
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
