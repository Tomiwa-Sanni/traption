
import { useState } from 'react';
import { Sparkles, Target, Clock, TrendingUp, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveDropdown } from '@/components/ui/responsive-dropdown';

const Features = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Features' },
    { value: 'generation', label: 'Content Generation' },
    { value: 'optimization', label: 'Optimization' },
    { value: 'analytics', label: 'Analytics & Insights' },
    { value: 'workflow', label: 'Workflow Tools' },
  ];

  const features = [
    {
      category: 'generation',
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: 'AI-Powered Caption Generation',
      description: 'Generate engaging, platform-specific captions in seconds using advanced AI technology.',
      details: ['Multiple tone options', 'Brand voice consistency', 'Contextual understanding', 'Creative variations']
    },
    {
      category: 'optimization',
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: 'Platform Optimization',
      description: 'Automatically optimize your content for each social media platform\'s unique requirements.',
      details: ['Character limit optimization', 'Platform-specific hashtags', 'Engagement triggers', 'Format adaptation']
    },
    {
      category: 'workflow',
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: 'Batch Processing',
      description: 'Generate multiple captions at once to streamline your content creation workflow.',
      details: ['Bulk generation', 'Content scheduling', 'Template management', 'Export options']
    },
    {
      category: 'analytics',
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: 'Performance Analytics',
      description: 'Track and analyze the performance of your AI-generated content.',
      details: ['Engagement metrics', 'A/B testing', 'Performance insights', 'ROI tracking']
    },
    {
      category: 'generation',
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      title: 'Multi-Language Support',
      description: 'Create content in multiple languages to reach a global audience.',
      details: ['50+ languages', 'Cultural adaptation', 'Local trends', 'Native expressions']
    },
    {
      category: 'workflow',
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Quick Actions',
      description: 'Fast-track your content creation with one-click actions and shortcuts.',
      details: ['One-click generation', 'Quick edits', 'Instant publishing', 'Smart suggestions']
    }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
          Powerful Features
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover all the tools and capabilities that make Traption the ultimate AI-powered social media companion.
        </p>
      </div>

      <div className="mb-8 max-w-sm mx-auto">
        <ResponsiveDropdown
          options={categoryOptions}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          placeholder="Select category"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feature, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
