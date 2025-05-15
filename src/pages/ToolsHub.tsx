
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenLine, Video, MessageSquareText, Calendar, Lightbulb, Clock, Wrench, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: JSX.Element;
  category: string;
}

const ToolsHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Please sign in to access the tools");
        navigate('/auth');
      } else {
        setUser(data.session.user);
      }
    };
    
    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const tools: Tool[] = [
    {
      id: 'caption-generator',
      name: 'Caption Generator',
      description: 'Create platform-optimized captions for all your social media posts in seconds.',
      path: '/tools/caption-generator',
      icon: <PenLine className="h-5 w-5" />,
      category: 'content'
    },
    {
      id: 'hooks-generator',
      name: 'Hooks & Headlines',
      description: 'Craft attention-grabbing hooks and headlines that stop the scroll and drive engagement.',
      path: '/tools/hooks-generator',
      icon: <Sparkles className="h-5 w-5" />,
      category: 'content'
    },
    {
      id: 'video-scripts',
      name: 'Video Script Writer',
      description: 'Generate engaging scripts for TikTok, Reels, YouTube Shorts and other short-form video content.',
      path: '/tools/video-scripts',
      icon: <Video className="h-5 w-5" />,
      category: 'video'
    },
    {
      id: 'comment-assistant',
      name: 'Comment Response Assistant',
      description: 'Generate thoughtful responses to comments based on your brand voice and tone.',
      path: '/tools/comment-assistant',
      icon: <MessageSquareText className="h-5 w-5" />,
      category: 'engagement'
    },
    {
      id: 'content-calendar',
      name: 'Content Calendar & Planner',
      description: 'Organize and plan your content schedule with a visual calendar and content strategy tools.',
      path: '/tools/content-calendar',
      icon: <Calendar className="h-5 w-5" />,
      category: 'planning'
    },
    {
      id: 'video-ideas',
      name: 'Video Ideas Generator',
      description: 'Get fresh content ideas for your videos based on your niche, trends, and audience interests.',
      path: '/tools/video-ideas',
      icon: <Lightbulb className="h-5 w-5" />,
      category: 'ideation'
    },
    {
      id: 'resources-ai',
      name: 'Resources AI',
      description: 'Discover the best tools and resources for your content creation needs with AI recommendations.',
      path: '/tools/resources-ai',
      icon: <Wrench className="h-5 w-5" />,
      category: 'resources'
    },
    {
      id: 'post-scheduler',
      name: 'Post Timer & Scheduler',
      description: 'Set up your posting schedule and get reminders when it's time to post your content.',
      path: '/tools/post-scheduler',
      icon: <Clock className="h-5 w-5" />,
      category: 'planning'
    }
  ];

  const filteredTools = tools
    .filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(tool => selectedCategory === 'all' || tool.category === selectedCategory);

  // Track tool click for analytics
  const trackToolClick = async (toolId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('tool_usage')
        .insert({
          user_id: user.id,
          tool_name: toolId,
          time_spent: 0 // Initial click
        });
        
      if (error) console.error('Error logging tool usage:', error);
    } catch (error) {
      console.error('Failed to log tool usage:', error);
    }
  };

  return (
    <MainLayout 
      title="Tools Hub - Traption" 
      description="Explore Traption's comprehensive suite of AI-powered social media tools"
    >
      <div className="container py-12">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
            Tools Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our suite of AI-powered tools designed to enhance your social media strategy and content creation process.
          </p>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <Input
            placeholder="Search tools..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="ideation">Ideation</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              onClick={() => trackToolClick(tool.id)}
            >
              <Card className="h-full hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {tool.icon}
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full capitalize">
                      {tool.category}
                    </span>
                  </div>
                  <CardTitle className="mt-2">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" size="sm">Launch Tool</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ToolsHub;
