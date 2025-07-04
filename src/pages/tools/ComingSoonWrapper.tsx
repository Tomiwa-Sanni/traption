
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { ComingSoon } from '@/components/ComingSoon';

interface ComingSoonWrapperProps {
  toolName: string;
  description: string;
  estimatedLaunch?: string;
  features?: string[];
}

const ComingSoonWrapper: React.FC<ComingSoonWrapperProps> = (props) => {
  return (
    <MainLayout title={`${props.toolName} - Coming Soon - Traption`}>
      <ComingSoon {...props} />
    </MainLayout>
  );
};

export default ComingSoonWrapper;
