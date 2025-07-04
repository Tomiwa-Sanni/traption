
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout = ({ 
  children, 
  title = "Traption - AI-Powered Social Media Caption Generator",
  description = "Generate platform-specific social media captions in seconds with Traption's AI-powered tools."
}: MainLayoutProps) => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto fade-in">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
