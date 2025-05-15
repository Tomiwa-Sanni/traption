
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export interface ToolProps {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: JSX.Element;
  category: string;
  available?: boolean;
  onToolClick: (toolId: string) => void;
}

const ToolCard: React.FC<ToolProps> = ({ 
  id, 
  name, 
  description, 
  path, 
  icon, 
  category,
  available = true,
  onToolClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!available) {
      e.preventDefault();
      return;
    }
    onToolClick(id);
  };

  return (
    <Link 
      to={available ? path : '#'}
      onClick={handleClick}
      className={!available ? 'cursor-default' : ''}
    >
      <Card className={`h-full transition-all ${available ? 'hover:shadow-md' : 'opacity-80'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="bg-primary/10 p-2 rounded-full">
              {icon}
            </div>
            <div className="flex gap-2 items-center">
              {!available && (
                <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500 dark:hover:bg-amber-900/30">
                  Coming Soon
                </Badge>
              )}
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full capitalize">
                {category}
              </span>
            </div>
          </div>
          <CardTitle className="mt-2">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            className="w-full" 
            size="sm" 
            disabled={!available}
            variant={available ? "default" : "outline"}
          >
            {available ? "Launch Tool" : "Coming Soon"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ToolCard;
