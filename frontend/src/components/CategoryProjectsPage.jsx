import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { portfolioData } from "../mockData";
import { ProjectCard } from "./ProjectCards";
import { ProjectCategoryNav } from "./ProjectCategoryNav";

export const CategoryProjectsPage = () => {
  const { categoryId } = useParams();
  const category = portfolioData.platformProjects[categoryId];

  useEffect(() => {
    if (category) {
      document.title = `${category.title} | John Carlo R. Calubiran`;
    }
  }, [category]);

  if (!category) {
    return <Navigate to="/#works" replace />;
  }

  return (
    <div className="min-h-screen relative" style={{ background: "#0f172a" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-16">
          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                to="/#works"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Featured Projects</span>
              </Link>

              <ScrollReveal>
                <div className="mx-auto max-w-5xl text-center">
                  <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {category.title}
                    </span>
                  </h1>
                  <p className="mx-auto max-w-3xl text-xl font-semibold text-teal-300">
                    {category.subtitle}
                  </p>
                  <ProjectCategoryNav activeCategory={categoryId} />
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.projects.map((project, index) => (
                  <ScrollReveal key={project.id} delay={index * 100}>
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};
