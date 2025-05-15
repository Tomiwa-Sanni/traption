
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Users, Clock, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
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
      
      // Get active users today
      const { count: activeUsersToday, error: activeUsersError } = await supabase
        .from('tool_usage')
        .select('user_id', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())
        .is('user_id', 'not.null');
        
      if (activeUsersError) throw activeUsersError;
      
      setStats({
        totalUsers: totalUsers || 0,
        newUsersToday: newUsersToday || 0,
        totalToolUsage: toolUsage.length,
        activeUsersToday: activeUsersToday || 0
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
        <div className="container flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return null; // We'll redirect in the useEffect
  }

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
    <MainLayout title="Admin Dashboard - Traption">
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Users Today</p>
                  <p className="text-3xl font-bold">{stats.newUsersToday}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full dark:bg-green-900/30">
                  <ArrowUpRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tool Usage</p>
                  <p className="text-3xl font-bold">{stats.totalToolUsage}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900/30">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users Today</p>
                  <p className="text-3xl font-bold">{stats.activeUsersToday}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full dark:bg-purple-900/30">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tools">Tool Usage</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>User registration trends over time</CardDescription>
              </CardHeader>
              <CardContent>
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
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        name="Number of Users" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tools">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tool Usage Distribution</CardTitle>
                  <CardDescription>Breakdown of tool usage across the platform</CardDescription>
                </CardHeader>
                <CardContent>
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
                          {toolUsageData.length > 0 ? 
                            toolUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            )) :
                            [
                              <Cell key="cell-0" fill={COLORS[0]} />,
                              <Cell key="cell-1" fill={COLORS[1]} />,
                              <Cell key="cell-2" fill={COLORS[2]} />,
                              <Cell key="cell-3" fill={COLORS[3]} />
                            ]
                          }
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tools</CardTitle>
                  <CardDescription>Most frequently used tools by count</CardDescription>
                </CardHeader>
                <CardContent>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Usage Count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Recent user actions and platform engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Detailed activity tracking will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
