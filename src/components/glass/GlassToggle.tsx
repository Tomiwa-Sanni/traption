
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const GlassToggle: React.FC<GlassToggleProps> = ({
  checked = false,
  onChange,
  size = 'md',
  className,
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };
  
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-12 h-6',
    lg: 'w-16 h-8'
  };
  
  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      className={cn(
        'glass relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus-glass',
        sizeClasses[size],
        isChecked && 'bg-blue-500/30 shadow-blue-500/50',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className
      )}
      onClick={handleToggle}
      disabled={disabled}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out transform',
          thumbSizes[size],
          isChecked ? 'translate-x-6' : 'translate-x-0.5',
          size === 'sm' && (isChecked ? 'translate-x-4' : 'translate-x-0.5'),
          size === 'lg' && (isChecked ? 'translate-x-8' : 'translate-x-0.5')
        )}
      />
      {isChecked && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-shimmer" />
      )}
    </button>
  );
};
