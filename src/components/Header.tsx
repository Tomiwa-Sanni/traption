
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("py-6", className)}>
      <div className="container flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Traption
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            AI-Powered Social Media Caption Generator Powered By Tresh Tech
          </p>
        </div>
      </div>
    </header>
  );
}
