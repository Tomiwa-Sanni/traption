
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

interface HeaderProps {
  className?: string;
  minimal?: boolean;
}

export function Header({ className, minimal = false }: HeaderProps) {
  return (
    <header className={cn("py-8 bg-gradient-to-r from-purple-600 to-indigo-600", className)}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-white hover:opacity-90 transition-opacity">
          <h1 className="text-4xl font-bold">
            Traption
          </h1>
        </Link>
        
        {!minimal && (
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/generator">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Generator
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Contact
              </Button>
            </Link>
          </div>
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
      
      {!minimal && (
        <div className="container mt-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">AI-Powered Social Media Caption Generator</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Create engaging, platform-specific captions in seconds with advanced AI technology
          </p>
        </div>
      )}
    </header>
  );
}
