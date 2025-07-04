
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverable = false,
  gradient = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'glass-card animate-fadeIn',
        hoverable && 'glass-hover cursor-pointer',
        gradient && 'gradient-border',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
