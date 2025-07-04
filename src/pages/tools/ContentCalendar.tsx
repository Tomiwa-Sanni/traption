
import React from 'react';
import ComingSoonWrapper from './ComingSoonWrapper';

const ContentCalendar = () => {
  return (
    <ComingSoonWrapper
      toolName="Content Calendar"
      description="Plan, schedule, and organize your content strategy with AI-powered suggestions and optimization recommendations."
      estimatedLaunch="Q3 2025"
      features={[
        'Visual content calendar with drag-and-drop scheduling',
        'AI-powered posting time optimization',
        'Content theme and series planning',
        'Cross-platform scheduling and management',
        'Analytics integration and performance tracking'
      ]}
    />
  );
};

export default ContentCalendar;
