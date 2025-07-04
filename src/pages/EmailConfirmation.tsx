
import React from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EmailConfirmation = () => {
  return (
    <MainLayout title="Check Your Email - Traption">
      <div className="container flex items-center justify-center min-h-[80vh] py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 mx-auto">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Check Your Email
            </CardTitle>
            <CardDescription>
              We've sent you a confirmation email. Please click the link in the email to verify your account and complete your registration.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-xl">
              <div className="flex items-center gap-3 text-sm text-green-700 dark:text-green-300">
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
              
              <p className="text-xs text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or try signing up again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmailConfirmation;
