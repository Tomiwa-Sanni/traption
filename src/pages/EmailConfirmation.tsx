
import React from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { GlassCard } from '@/components/glass';

const EmailConfirmation = () => {
  return (
    <MainLayout title="Check Your Email - Traption">
      <div className="container flex items-center justify-center min-h-[80vh] py-12">
        <GlassCard className="w-full max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-glass-primary">
            Check Your Email
          </h1>
          
          <p className="text-glass-muted mb-6">
            We've sent you a confirmation email. Please click the link in the email to verify your account and complete your registration.
          </p>
          
          <div className="glass p-4 rounded-xl mb-6">
            <div className="flex items-center gap-3 text-sm text-glass-secondary">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Check your inbox and spam folder</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/auth" className="inline-flex items-center gap-2">
                Go to Login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <p className="text-xs text-glass-muted">
              Didn't receive the email? Check your spam folder or try signing up again.
            </p>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
};

export default EmailConfirmation;
