
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode, useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ToolsHub from "./pages/ToolsHub";
import Auth from "./pages/Auth";
import EmailConfirmation from "./pages/EmailConfirmation";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Changelog from "./pages/Changelog";
import HooksGenerator from "./pages/tools/HooksGenerator";
import VideoScripts from "./pages/tools/VideoScripts";
import CommentAssistant from "./pages/tools/CommentAssistant";
import ContentCalendar from "./pages/tools/ContentCalendar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

// Auth route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setAuthenticated(!!data.session);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthenticated(!!session);
        setLoading(false);
      }
    );

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="container flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!authenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

// Admin route wrapper
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const isAdmin = data.session.user.user_metadata?.is_admin === true;
        setIsAdmin(isAdmin);
      }
      
      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="container flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Verifying admin privileges...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Smart redirect for dashboard - leads to last used tool
const DashboardRedirect = () => {
  useEffect(() => {
    // Check for last used tool in localStorage
    const lastTool = localStorage.getItem('traption_last_tool');
    if (lastTool && lastTool !== 'caption-generator') {
      window.location.href = `/tools/${lastTool}`;
    } else {
      window.location.href = '/tools/caption-generator';
    }
  }, []);

  return (
    <MainLayout>
      <div className="container flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Redirecting to your tools...</p>
      </div>
    </MainLayout>
  );
};

const App = () => (
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Helmet>
            <title>Traption - AI-Powered Social Media Tools Platform</title>
            <meta name="description" content="Create engaging social media content with Traption's suite of AI-powered tools. Generate captions, hooks, video scripts, and more for every platform in seconds." />
            <meta name="keywords" content="social media, AI captions, content creation, instagram captions, twitter posts, linkedin content, video scripts, content calendar, social media tools" />
            <meta property="og:title" content="Traption - AI-Powered Social Media Tools Platform" />
            <meta property="og:description" content="Create engaging social media content with Traption's suite of AI-powered tools. Generate captions, hooks, video scripts, and more for every platform in seconds." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://traption.app" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Traption - AI-Powered Social Media Tools Platform" />
            <meta name="twitter:description" content="Create engaging social media content with Traption's suite of AI-powered tools. Generate captions, hooks, video scripts, and more for every platform in seconds." />
          </Helmet>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/email-confirmation" element={<EmailConfirmation />} />
              <Route path="/tools" element={
                <ProtectedRoute>
                  <ToolsHub />
                </ProtectedRoute>
              } />
              <Route path="/tools/caption-generator" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/tools/hooks-generator" element={
                <ProtectedRoute>
                  <HooksGenerator />
                </ProtectedRoute>
              } />
              <Route path="/tools/video-scripts" element={
                <ProtectedRoute>
                  <VideoScripts />
                </ProtectedRoute>
              } />
              <Route path="/tools/comment-assistant" element={
                <ProtectedRoute>
                  <CommentAssistant />
                </ProtectedRoute>
              } />
              <Route path="/tools/content-calendar" element={
                <ProtectedRoute>
                  <ContentCalendar />
                </ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/about" element={
                <MainLayout>
                  <About />
                </MainLayout>
              } />
              <Route path="/features" element={
                <MainLayout>
                  <Features />
                </MainLayout>
              } />
              <Route path="/contact" element={
                <MainLayout>
                  <Contact />
                </MainLayout>
              } />
              <Route path="/faq" element={
                <MainLayout>
                  <FAQ />
                </MainLayout>
              } />
              <Route path="/terms" element={
                <MainLayout>
                  <TermsOfService />
                </MainLayout>
              } />
              <Route path="/privacy" element={
                <MainLayout>
                  <PrivacyPolicy />
                </MainLayout>
              } />
              <Route path="/changelog" element={
                <MainLayout>
                  <Changelog />
                </MainLayout>
              } />
              {/* Smart redirect for dashboard - leads to last used tool */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);

export default App;
