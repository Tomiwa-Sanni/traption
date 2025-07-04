
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface GlassTabMenuProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const GlassTabMenu: React.FC<GlassTabMenuProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  const [active, setActive] = useState(activeTab || tabs[0]?.id || '');
  
  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    onChange?.(tabId);
  };
  
  return (
    <div className={cn('glass p-1 inline-flex rounded-2xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 tracking-glass',
            active === tab.id
              ? 'bg-white/20 text-glass-primary shadow-lg prismatic-glow'
              : 'text-glass-muted hover:text-glass-secondary hover:bg-white/5'
          )}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
