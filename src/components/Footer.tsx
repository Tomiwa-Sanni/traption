
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("py-6 border-t border-border mt-auto", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Traption. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground">
            <span className="mx-1">•</span>
            <span>Created with Lovable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
