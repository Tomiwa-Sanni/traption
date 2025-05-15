
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import SearchAndFilter from '@/components/tools/SearchAndFilter';
import ToolsGrid from '@/components/tools/ToolsGrid';
import { toolsData } from '@/data/toolsData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  // Filter tools based on search term and selected category
  const filteredTools = toolsData
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
        <SearchAndFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Tools grid */}
        <ToolsGrid 
          tools={filteredTools} 
          onToolClick={trackToolClick} 
        />
      </div>
    </MainLayout>
  );
};

export default ToolsHub;
