import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/layouts/MainLayout';

const Changelog = () => {
  const releases = [
    {
      version: "1.0.0",
      date: "July 4, 2025",
      type: "Major Release",
      changes: [
        "🎉 Initial release of Traption - AI-powered social media tools platform",
        "✨ AI Caption Generator with platform-specific optimization",
        "🔐 User authentication and account management",
        "📱 Responsive design for all devices",
        "🎨 Modern glass-morphism UI design",
        "⚡ Real-time caption generation with progress tracking",
        "🌐 Multi-language support for global reach",
        "📊 Platform-specific content optimization (Instagram, Twitter, LinkedIn, Facebook, TikTok)",
        "🎯 Customizable tone and style options",
        "📧 Newsletter subscription system",
        "🔒 Secure user data handling with Supabase",
        "💬 Admin email notifications for new signups and newsletter subscriptions",
        "📝 User profile management and settings",
        "🎭 Multiple writing tones (Professional, Casual, Humorous, Inspirational, Educational)",
        "📈 Smart dashboard with tool navigation",
        "🔄 Email verification system for new users"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Major Release':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600';
      case 'Minor Release':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600';
      case 'Patch':
        return 'bg-gradient-to-r from-green-600 to-emerald-600';
      default:
        return 'bg-gradient-to-r from-gray-600 to-slate-600';
    }
  };

  return (
    <MainLayout 
      title="Changelog - Traption" 
      description="Stay updated with the latest features, improvements, and bug fixes in Traption."
    >
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text mb-4">
              Changelog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay up to date with the latest features, improvements, and bug fixes in Traption.
            </p>
          </div>
          
          <div className="space-y-8">
            {releases.map((release, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-background to-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-2xl font-bold">
                        Version {release.version}
                      </CardTitle>
                      <Badge className={`${getTypeColor(release.type)} text-white`}>
                        {release.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{release.date}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{change}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-none">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Follow our development progress and be the first to know about new features.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="https://twitter.com/traption" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Twitter
                </a>
                <span className="text-muted-foreground">•</span>
                <a 
                  href="https://github.com/traption" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star on GitHub
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Changelog;
