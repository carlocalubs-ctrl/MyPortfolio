import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, GalleryHorizontal, PlayCircle, X } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { portfolioData } from "../mockData";
import { ProjectStatusBadge, ProjectTags } from "./ProjectCards";

const detailSections = {
  funnels: ["Desktop Screenshots", "Mobile Screenshots", "Project Description", "Platform Used", "Live Link"],
};

const findProject = (categoryId, projectSlug) => {
  const category = portfolioData.platformProjects[categoryId];
  const project = category?.projects.find((item) => {
    if (!item.path) return false;
    return item.path.split("/").at(-1) === projectSlug;
  });

  return { category, project };
};

const ProjectScreenshot = ({ screenshot, index, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(index)}
    className="project-screenshot-trigger group w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/70 transition-all duration-300 hover:border-teal-500/60"
  >
    <div className="flex min-h-[260px] items-center justify-center p-3 sm:p-4">
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        className="h-auto max-h-[620px] w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
        loading="lazy"
      />
    </div>
  </button>
);

export const ProjectDetailPage = () => {
  const { categoryId, projectSlug } = useParams();
  const { category, project } = findProject(categoryId, projectSlug);
  const [activeIndex, setActiveIndex] = useState(null);
  const screenshots = project?.screenshots || [];
  const activeScreenshot =
    activeIndex === null ? null : screenshots[activeIndex];
  const hasMultipleScreenshots = screenshots.length > 1;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | John Carlo R. Calubiran`;
    }
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = activeScreenshot ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeScreenshot]);

  useEffect(() => {
    if (!activeScreenshot) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft" && hasMultipleScreenshots) {
        setActiveIndex((index) => (index - 1 + screenshots.length) % screenshots.length);
      }

      if (event.key === "ArrowRight" && hasMultipleScreenshots) {
        setActiveIndex((index) => (index + 1) % screenshots.length);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeScreenshot, hasMultipleScreenshots, screenshots.length]);

  if (!category || !project || project.status !== "Live") {
    return <Navigate to="/#works" replace />;
  }

  const moveLightbox = (direction) => {
    setActiveIndex((index) => (index + direction + screenshots.length) % screenshots.length);
  };

  const fallbackSections = screenshots.length === 0 && !project.demoVideo
    ? detailSections[categoryId]
    : null;

  return (
    <div className="min-h-screen relative" style={{ background: "#0f172a" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-16">
          <section className="relative overflow-hidden py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                to={`/projects/${categoryId}`}
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to {category.title}</span>
              </Link>

              <ScrollReveal>
                <div className="mx-auto max-w-5xl text-center">
                  <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-teal-500/20 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
                    <span className="text-xs font-mono text-teal-300">
                      PROJECT {project.id}
                    </span>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {project.title}
                    </span>
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
                    {project.description}
                  </p>
                  <div className="mx-auto mt-8 flex max-w-3xl justify-center">
                    <ProjectTags tags={project.technologies} />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-6xl space-y-8">
                {fallbackSections?.map((section, index) => (
                  <ScrollReveal key={section} delay={index * 80}>
                    <Card className="h-full border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20">
                          <GalleryHorizontal className="h-7 w-7 text-teal-400" />
                        </div>
                        <CardTitle className="text-2xl text-white">
                          {section}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed text-slate-400">
                          Project assets and screenshots can be added here when available.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {section === "Live Link" && project.liveLink ? (
                          <Button
                            asChild
                            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600"
                          >
                            <a href={project.liveLink} target="_blank" rel="noreferrer">
                              Open Live Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        ) : (
                          <div className="aspect-[16/9] rounded-lg border border-dashed border-slate-600 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8">
                            <div className="flex h-full flex-col items-center justify-center text-center">
                              <GalleryHorizontal className="mb-4 h-10 w-10 text-teal-300" />
                              <div className="text-base font-semibold text-white">
                                {section} placeholder
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}

                {screenshots.length > 0 && (
                  <ScrollReveal>
                    <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20">
                          <GalleryHorizontal className="h-7 w-7 text-teal-400" />
                        </div>
                        <CardTitle className="text-2xl text-white">
                          Project Screenshots
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed text-slate-400">
                          Workflow and result screenshots from the completed automation.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ProjectScreenshot
                          screenshot={screenshots[0]}
                          index={0}
                          onOpen={setActiveIndex}
                        />

                        {screenshots.length > 1 && (
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {screenshots.slice(1).map((screenshot, index) => (
                              <div key={screenshot.src} className="space-y-3">
                                <div className="text-sm font-semibold text-white">
                                  {screenshot.label}
                                </div>
                                <ProjectScreenshot
                                  screenshot={screenshot}
                                  index={index + 1}
                                  onOpen={setActiveIndex}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                )}

                {project.demoVideo && (
                  <ScrollReveal delay={80}>
                    <Card id="demo" className="border-slate-700 bg-slate-800/50 backdrop-blur-sm scroll-mt-28">
                      <CardHeader>
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20">
                          <PlayCircle className="h-7 w-7 text-teal-400" />
                        </div>
                        <CardTitle className="text-2xl text-white">
                          Demo
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed text-slate-400">
                          Local project demo video.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <video
                          className="h-auto w-full rounded-lg border border-slate-700 bg-black"
                          controls
                          preload="metadata"
                          playsInline
                        >
                          <source src={project.demoVideo.src} type={project.demoVideo.type} />
                        </video>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      {activeScreenshot &&
        createPortal(
          <div
            className="project-lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activeScreenshot.label}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="project-lightbox-control absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700 sm:right-6 sm:top-6"
              aria-label="Close screenshot"
            >
              <X className="h-5 w-5" />
            </button>

            {hasMultipleScreenshots && (
              <>
                <button
                  type="button"
                  onClick={() => moveLightbox(-1)}
                  className="project-lightbox-control absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveLightbox(1)}
                  className="project-lightbox-control absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <img
                src={activeScreenshot.src}
                alt={activeScreenshot.alt}
                className="project-lightbox-image max-h-[80vh] max-w-full object-contain object-center"
              />
              <div className="text-center">
                <div className="text-sm font-semibold text-white">
                  {activeScreenshot.label}
                </div>
                {hasMultipleScreenshots && (
                  <div className="text-xs text-slate-400">
                    {activeIndex + 1} / {screenshots.length}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
