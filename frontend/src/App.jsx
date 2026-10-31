import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PortfolioLayout, HomeExplorer, ProjectsExplorer, LegacyHome, WebsitesPage } from "@/components/PortfolioLayout";
import "@/workspace.css";
import "@/warm-theme.css";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ToolsPlatforms } from "@/components/ToolsPlatforms";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Toaster } from "@/components/ui/sonner";
import { GoHighLevelCaseStudy } from "@/components/GoHighLevelCaseStudy";
import { CategoryProjectsPage } from "@/components/CategoryProjectsPage";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { NxtLvlCaseStudy } from "@/components/NxtLvlCaseStudy";
import { NxtLvlGoHighLevelCaseStudy } from "@/components/NxtLvlGoHighLevelCaseStudy";

function AboutPage() {
  const { hash } = useLocation();
  // Preserve bookmarks to the section that now has its own page.
  if (hash === '#services') return <Navigate replace to="/services" />;
  return <><Hero /><Experience /></>;
}

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route element={<PortfolioLayout />}>
          <Route path="/" element={<LegacyHome />} />
          <Route path="/projects" element={<ProjectsExplorer />} />
          <Route path="/projects/websites" element={<WebsitesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/tech-stack" element={<ToolsPlatforms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/gohighlevel-crm-marketing-automation" element={<GoHighLevelCaseStudy />} />
          <Route path="/projects/gohighlevel/nxt-lvl-crm-booking-integration" element={<NxtLvlGoHighLevelCaseStudy />} />
          <Route path="/projects/nxt-lvl-crm-booking-integration" element={<NxtLvlCaseStudy />} />
          <Route path="/projects/:categoryId/:projectSlug" element={<ProjectDetailPage />} />
          <Route path="/projects/:categoryId" element={<CategoryProjectsPage />} />
          <Route path="*" element={<HomeExplorer />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
