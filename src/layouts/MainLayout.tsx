
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
