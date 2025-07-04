
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveDropdown } from '@/components/ui/responsive-dropdown';

interface MobileNavProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toolsOptions = [
    { value: '/tools/caption-generator', label: 'Caption Generator' },
    { value: '/tools/hooks-generator', label: 'Hooks Generator' },
    { value: '/tools/video-scripts', label: 'Video Scripts' },
    { value: '/tools/comment-assistant', label: 'Comment Assistant' },
    { value: '/tools/content-calendar', label: 'Content Calendar' },
  ];

  const handleToolSelect = (value: string) => {
    window.location.href = value;
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground hover:text-foreground/80"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg z-50 mx-4">
          <nav className="p-4 space-y-4">
            <Link
              to="/"
              className="block text-foreground hover:text-foreground/80 transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            
            <Link
              to="/features"
              className="block text-foreground hover:text-foreground/80 transition-colors"
              onClick={closeMenu}
            >
              Features
            </Link>

            <Link
              to="/about"
              className="block text-foreground hover:text-foreground/80 transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/tools"
                  className="block text-foreground hover:text-foreground/80 transition-colors"
                  onClick={closeMenu}
                >
                  All Tools
                </Link>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Quick Access:</span>
                  <ResponsiveDropdown
                    options={toolsOptions}
                    value=""
                    onValueChange={handleToolSelect}
                    placeholder="Select a tool"
                    className="w-full"
                  />
                </div>

                <Link
                  to="/account"
                  className="block text-foreground hover:text-foreground/80 transition-colors"
                  onClick={closeMenu}
                >
                  Account
                </Link>

                <button
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }}
                  className="block w-full text-left text-foreground hover:text-foreground/80 transition-colors"
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/auth"
                className="block text-foreground hover:text-foreground/80 transition-colors"
                onClick={closeMenu}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
