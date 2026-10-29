import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { portfolioData } from "../mockData";
import { ProjectCard } from "./ProjectCards";
import { ProjectCategoryNav } from "./ProjectCategoryNav";

export const CategoryProjectsPage = () => {
  const { categoryId } = useParams();
  const category = portfolioData.platformProjects[categoryId];
  const overview = portfolioData.projectCategories.find((item) => item.id === categoryId);

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
      <div className="relative z-10">
        <div className="detail-content">
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
                  {overview && (
                    <details className="mt-6 rounded-xl border border-slate-700 bg-slate-800/30 p-5">
                      <summary className="cursor-pointer text-sm font-medium text-teal-300">About this collection</summary>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2 items-center">
                        <img src={overview.image} alt={overview.title} className="w-full rounded-lg" loading="lazy" />
                        <div>
                          <p className="text-sm leading-relaxed text-slate-300">{overview.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">{overview.technologies.map((tech) => <span key={tech} className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-300">{tech}</span>)}</div>
                        </div>
                      </div>
                    </details>
                  )}
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
        </div>
      </div>
    </div>
  );
};
