
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'glass ripple focus-glass transition-all duration-300 font-medium tracking-glass flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'text-white prismatic-glow hover:prismatic-glow',
    secondary: 'text-glass-primary hover:text-glass-primary',
    ghost: 'bg-transparent border-transparent text-glass-secondary hover:text-glass-primary hover:bg-white/5'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs rounded-xl',
    md: 'px-4 py-2 text-sm rounded-2xl',
    lg: 'px-6 py-3 text-base rounded-2xl'
  };
  
  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
