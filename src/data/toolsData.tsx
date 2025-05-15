
import React from 'react';
import { PenLine, Video, MessageSquareText, Calendar, Lightbulb, Clock, Wrench, Sparkles } from 'lucide-react';

export interface ToolData {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: JSX.Element;
  category: string;
}

export const toolsData: ToolData[] = [
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
