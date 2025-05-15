
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface ToolProps {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: JSX.Element;
  category: string;
  onToolClick: (toolId: string) => void;
}

const ToolCard: React.FC<ToolProps> = ({ 
  id, 
  name, 
  description, 
  path, 
  icon, 
  category, 
  onToolClick 
}) => {
  return (
    <Link 
      to={path}
      onClick={() => onToolClick(id)}
    >
      <Card className="h-full hover:shadow-md transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="bg-primary/10 p-2 rounded-full">
              {icon}
            </div>
            <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full capitalize">
              {category}
            </span>
          </div>
          <CardTitle className="mt-2">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" size="sm">Launch Tool</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ToolCard;
