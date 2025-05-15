
import React from 'react';
import ToolCard, { ToolProps } from './ToolCard';

interface ToolsGridProps {
  tools: Omit<ToolProps, 'onToolClick'>[];
  onToolClick: (toolId: string) => void;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools, onToolClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          {...tool}
          onToolClick={onToolClick}
        />
      ))}
    </div>
  );
};

export default ToolsGrid;
