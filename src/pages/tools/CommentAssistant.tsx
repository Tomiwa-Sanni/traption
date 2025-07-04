
import React from 'react';
import ComingSoonWrapper from './ComingSoonWrapper';

const CommentAssistant = () => {
  return (
    <ComingSoonWrapper
      toolName="Comment Assistant"
      description="Generate thoughtful, engaging responses to comments that build community and increase engagement rates."
      estimatedLaunch="Q3 2025"
      features={[
        'Context-aware response generation',
        'Tone matching and brand voice consistency',
        'Bulk comment response suggestions',
        'Sentiment analysis and appropriate responses',
        'Community management best practices'
      ]}
    />
  );
};

export default CommentAssistant;
