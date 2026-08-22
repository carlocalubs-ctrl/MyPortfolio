import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ToolsPlatforms } from "@/components/ToolsPlatforms";
import { Experience } from "@/components/Experience";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Toaster } from "@/components/ui/sonner";
import { GoHighLevelCaseStudy } from "@/components/GoHighLevelCaseStudy";
import { CategoryProjectsPage } from "@/components/CategoryProjectsPage";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { NxtLvlCaseStudy } from "@/components/NxtLvlCaseStudy";
import { NxtLvlGoHighLevelCaseStudy } from "@/components/NxtLvlGoHighLevelCaseStudy";

const HashScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!location.hash) {
      const animationFrame = window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      });

      return () => window.cancelAnimationFrame(animationFrame);
    }

    const id = location.hash.slice(1);
    const timeout = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  return null;
};

const Home = () => {
  return (
    <div className="min-h-screen relative" style={{ background: "#0f172a" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <ToolsPlatforms />
          <Works />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <HashScroll />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/gohighlevel-crm-marketing-automation" element={<GoHighLevelCaseStudy />} />
          <Route path="/projects/gohighlevel/nxt-lvl-crm-booking-integration" element={<NxtLvlGoHighLevelCaseStudy />} />
          <Route path="/projects/nxt-lvl-crm-booking-integration" element={<NxtLvlCaseStudy />} />
          <Route path="/projects/:categoryId/:projectSlug" element={<ProjectDetailPage />} />
          <Route path="/projects/:categoryId" element={<CategoryProjectsPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
