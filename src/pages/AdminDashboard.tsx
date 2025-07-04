import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Users, Clock, ArrowUpRight, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { GlassCard, GlassButton, GlassTabMenu } from '@/components/glass';

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    totalToolUsage: 0,
    activeUsersToday: 0
  });
  const [toolUsageData, setToolUsageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast.error("Please sign in to access the admin dashboard");
        navigate('/auth');
        return;
      }
      
      // Check if user is admin
      const user = data.session.user;
      setUser(user);
      
      const isAdmin = user.user_metadata?.is_admin === true;
      setIsAdmin(isAdmin);
      
      if (!isAdmin) {
        toast.error("You don't have permission to access the admin dashboard");
        navigate('/');
        return;
      }
      
      // Load admin dashboard data
      if (isAdmin) {
        fetchDashboardData();
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Get total users
      const { count: totalUsers, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (countError) throw countError;
      
      // Get new users today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: newUsersToday, error: newUsersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());
        
      if (newUsersError) throw newUsersError;
      
      // Get tool usage stats
      const { data: toolUsage, error: toolUsageError } = await supabase
        .from('tool_usage')
        .select('tool_name, count')
        .select();
        
      if (toolUsageError) throw toolUsageError;
      
      // Process tool usage data for charts
      const toolUsageMap = toolUsage.reduce((acc, curr) => {
        const toolName = curr.tool_name;
        if (!acc[toolName]) {
          acc[toolName] = 0;
        }
        acc[toolName]++;
        return acc;
      }, {});
      
      const toolUsageData = Object.entries(toolUsageMap).map(([name, value]) => ({
        name,
        value
      }));
      
      setToolUsageData(toolUsageData);
      
      // Get active users today - Fixed the query syntax
      const { data: activeUsersData, error: activeUsersError } = await supabase
        .from('tool_usage')
        .select('user_id')
        .gte('created_at', today.toISOString())
        .not('user_id', 'is', null);
        
      if (activeUsersError) throw activeUsersError;
      
      // Count unique active users
      const uniqueActiveUsers = new Set(activeUsersData?.map(item => item.user_id) || []);
      
      setStats({
        totalUsers: totalUsers || 0,
        newUsersToday: newUsersToday || 0,
        totalToolUsage: toolUsage.length,
        activeUsersToday: uniqueActiveUsers.size
      });
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout title="Admin Dashboard - Traption">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="container flex items-center justify-center min-h-[60vh]">
            <GlassCard className="text-center animate-shimmer">
              <p className="text-glass-secondary text-lg">Loading dashboard data...</p>
            </GlassCard>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return null; // We'll redirect in the useEffect
  }

  const COLORS = ['#3B82F6', '#8B5CF6', '#14B8A6', '#F59E0B', '#EF4444', '#10B981', '#F97316'];

  const tabsData = [
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'tools', label: 'Tool Usage', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <MainLayout title="Admin Dashboard - Traption">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-glass-primary tracking-glass mb-2">
                Admin Dashboard
              </h1>
              <p className="text-glass-secondary text-lg">
                Monitor platform performance and user engagement
              </p>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard hoverable className="cursor-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-glass-muted mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-glass-primary">{stats.totalUsers}</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard hoverable className="cursor-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-glass-muted mb-1">New Users Today</p>
                  <p className="text-3xl font-bold text-glass-primary">{stats.newUsersToday}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-2xl backdrop-blur-sm">
                  <ArrowUpRight className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard hoverable className="cursor-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-glass-muted mb-1">Total Tool Usage</p>
                  <p className="text-3xl font-bold text-glass-primary">{stats.totalToolUsage}</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </GlassCard>
            
            <GlassCard hoverable className="cursor-default">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-glass-muted mb-1">Active Users Today</p>
                  <p className="text-3xl font-bold text-glass-primary">{stats.activeUsersToday}</p>
                </div>
                <div className="bg-teal-500/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Users className="h-6 w-6 text-teal-400" />
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Glass Tab Menu */}
          <div className="mb-8">
            <GlassTabMenu
              tabs={tabsData}
              activeTab={activeTab}
              onChange={setActiveTab}
              className="mx-auto"
            />
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'users' && (
            <GlassCard>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-glass-primary tracking-glass mb-2">User Growth</h2>
                <p className="text-glass-secondary">User registration trends over time</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { name: 'Week 1', users: 13 },
                      { name: 'Week 2', users: 25 },
                      { name: 'Week 3', users: 42 },
                      { name: 'Week 4', users: 58 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '1rem',
                        color: 'rgba(255,255,255,0.9)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      name="Number of Users" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      activeDot={{ r: 8, fill: '#3B82F6' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          )}
          
          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-glass-primary tracking-glass mb-2">Tool Usage Distribution</h2>
                  <p className="text-glass-secondary">Breakdown of tool usage across the platform</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={toolUsageData.length > 0 ? toolUsageData : [
                          { name: 'Caption Generator', value: 48 },
                          { name: 'Video Scripts', value: 25 },
                          { name: 'Hooks Generator', value: 32 },
                          { name: 'Comment Assistant', value: 15 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {(toolUsageData.length > 0 ? toolUsageData : [
                          { name: 'Caption Generator', value: 48 },
                          { name: 'Video Scripts', value: 25 },
                          { name: 'Hooks Generator', value: 32 },
                          { name: 'Comment Assistant', value: 15 },
                        ]).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '1rem',
                          color: 'rgba(255,255,255,0.9)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
              
              <GlassCard>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-glass-primary tracking-glass mb-2">Popular Tools</h2>
                  <p className="text-glass-secondary">Most frequently used tools by count</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={toolUsageData.length > 0 ? toolUsageData : [
                        { name: 'Caption Generator', value: 48 },
                        { name: 'Video Scripts', value: 25 },
                        { name: 'Hooks Generator', value: 32 },
                        { name: 'Comment Assistant', value: 15 },
                        { name: 'Content Calendar', value: 22 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '1rem',
                          color: 'rgba(255,255,255,0.9)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="value" name="Usage Count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          )}
          
          {activeTab === 'activity' && (
            <GlassCard>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-glass-primary tracking-glass mb-2">User Activity</h2>
                <p className="text-glass-secondary">Recent user actions and platform engagement</p>
              </div>
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-glass-muted mx-auto mb-4" />
                <p className="text-glass-muted text-lg">
                  Detailed activity tracking will be available soon.
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
