
import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface ResponsiveDropdownProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const ResponsiveDropdown: React.FC<ResponsiveDropdownProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select option",
  className,
}) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between glass hover:bg-white/10",
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-full min-w-[200px] max-h-[300px] overflow-y-auto glass bg-background/95 backdrop-blur-sm border border-white/20"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className="flex items-center justify-between cursor-pointer hover:bg-white/10"
          >
            <span>{option.label}</span>
            {value === option.value && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
