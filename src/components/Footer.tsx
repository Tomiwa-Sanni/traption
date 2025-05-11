
import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ExternalLink, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t bg-secondary/20">
      <div className="container space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Traption</h3>
            <p className="text-sm text-muted-foreground">
              AI-Powered Social Media Caption Generator by Tresh Tech.
              Create engaging captions for all your social platforms in seconds.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-medium text-base">Resources</h4>
            <div className="flex flex-col gap-2">
              <Button variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground" asChild>
                <a href="#features">Features</a>
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground" asChild>
                <a href="#tips">Tips</a>
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground" asChild>
                <a href="#faq">FAQ</a>
              </Button>
              <Button variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground" asChild>
                <a href="https://treshtech.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Tresh Tech <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-medium text-base">Contact</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+2349138289542" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" /> +234 913 828 9542
              </a>
              <a href="mailto:contact@treshtech.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" /> contact@treshtech.com
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tresh Tech | All Rights Reserved</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Button variant="link" size="sm" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
