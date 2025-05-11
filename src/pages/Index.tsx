
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Landing from "./Landing";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Landing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
