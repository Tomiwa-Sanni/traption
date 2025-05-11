
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

const App = () => (
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Helmet>
            <title>Traption - AI Social Media Caption Generator</title>
            <meta name="description" content="Create platform-optimized captions for your social media posts with Traption's AI caption generator." />
            <meta name="keywords" content="social media, captions, AI, content creation, instagram captions, twitter posts, linkedin content" />
            <meta property="og:title" content="Traption - AI Social Media Caption Generator" />
            <meta property="og:description" content="Create platform-optimized captions for your social media posts with Traption's AI caption generator." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://traption.app" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Traption - AI Social Media Caption Generator" />
            <meta name="twitter:description" content="Create platform-optimized captions for your social media posts with Traption's AI caption generator." />
          </Helmet>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
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
              <Route path="/blog" element={
                <MainLayout>
                  <Blog />
                </MainLayout>
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
