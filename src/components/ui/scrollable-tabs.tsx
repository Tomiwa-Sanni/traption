
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ScrollableTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  defaultTab,
  className,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, [tabs]);

  useEffect(() => {
    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Navigation */}
      <div className="relative glass p-1 rounded-2xl mb-6">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scrollToDirection('left')}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 glass-card p-1 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-glass-primary" />
          </button>
        )}

        {/* Scrollable Tab Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex-shrink-0 tracking-glass whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-white/20 text-glass-primary shadow-lg prismatic-glow'
                  : 'text-glass-muted hover:text-glass-secondary hover:bg-white/5'
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scrollToDirection('right')}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 glass-card p-1 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-glass-primary" />
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {activeTabContent}
      </div>
    </div>
  );
};
