import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  X,
} from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollReveal } from "../hooks/useScrollReveal";

const assetRoot = "/projects/Gohighlevel/Nxt Lvl Detail";

const projectSections = [
  {
    id: "integration",
    title: "Fieldd ↔ GoHighLevel Integration",
    description:
      "Connected Fieldd customer and booking data through Zapier so contacts, bookings, and CRM updates move through a consistent Fieldd → Zapier → GoHighLevel flow with less manual entry.",
    icon: GitBranch,
    visuals: [
      {
        type: "image",
        src: `${assetRoot}/Zapier Automation.png`,
        label: "Fieldd customer and contact integration",
        alt: "Zapier automation connecting Fieldd customer data to GoHighLevel contacts",
      },
      {
        type: "image",
        src: `${assetRoot}/Zapier Automation Booking.png`,
        label: "Fieldd booking integration",
        alt: "Zapier automation connecting Fieldd booking data to GoHighLevel",
      },
      {
        type: "video",
        src: `${assetRoot}/Zapier Automation from Fieldd co to GhL.mp4`,
        label: "Fieldd to GoHighLevel integration demo",
      },
    ],
  },
];

const technologies = ["GoHighLevel", "Fieldd", "Zapier", "Webflow"];

export const NxtLvlCaseStudy = () => {
  const [activeScreenshot, setActiveScreenshot] = useState(null);
  const screenshots = projectSections.flatMap((section) =>
    section.visuals.filter((visual) => visual.type === "image")
  );

  useEffect(() => {
    document.title = "CRM Specialist & Booking Integration | John Carlo R. Calubiran";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeScreenshot ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeScreenshot]);

  useEffect(() => {
    if (!activeScreenshot) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") setActiveScreenshot(null);
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeScreenshot]);

  const moveLightbox = (direction) => {
    setActiveScreenshot((current) => {
      const currentIndex = screenshots.indexOf(current);
      return screenshots[(currentIndex + direction + screenshots.length) % screenshots.length];
    });
  };

  return (
    <div className="project-page relative min-h-screen" style={{ background: "#0f172a" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-16">
          <section className="relative overflow-hidden py-16 sm:py-24">
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
                  <img
                    src={`${assetRoot}/NXT LVL DETAIL LOGO.jpg`}
                    alt="NXT LVL Mobile Detailing logo"
                    className="mx-auto mb-8 h-24 w-24 rounded-xl border border-slate-700 object-cover shadow-xl"
                  />
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    CRM & Booking Integration
                  </div>
                  <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      CRM Specialist & Booking Integration
                    </span>
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
                    Built and configured a connected GoHighLevel CRM environment for NXT LVL Mobile Detailing, integrating Fieldd booking data through Zapier.
                  </p>
                  <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
                    {technologies.map((technology) => (
                      <span key={technology} className="rounded-md border border-slate-700 bg-slate-800/70 px-3 py-1 text-sm text-slate-300">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section id="overview" className="scroll-mt-28 py-10 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <Card className="mx-auto max-w-6xl border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl text-white sm:text-4xl">Project Overview</CardTitle>
                    <CardDescription className="max-w-3xl text-base leading-relaxed text-slate-400">
                      This project involved building and organizing a complete GoHighLevel CRM environment and integrating Fieldd with GoHighLevel through Zapier to connect lead capture, customer data, booking synchronization, automation, and communication workflows.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-3">
                    {["Capture and organize leads", "Sync customers and bookings", "Automate follow-up and communication"].map((item, index) => (
                      <div key={item} className="flex items-start gap-3 rounded-md border border-slate-700/80 bg-slate-900/40 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                        <span className="text-sm leading-relaxed text-slate-300">0{index + 1} {item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </section>

          <div className="space-y-8 pb-16">
            {projectSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="scroll-mt-28 py-4">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal delay={sectionIndex * 50}>
                      <Card className="mx-auto max-w-6xl overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                        <CardHeader>
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20">
                            <Icon className="h-7 w-7 text-teal-400" />
                          </div>
                          <CardTitle className="text-2xl text-white sm:text-3xl">{section.title}</CardTitle>
                          <CardDescription className="max-w-4xl text-base leading-relaxed text-slate-400">{section.description}</CardDescription>
                          {section.journey && <p className="mt-4 rounded-md border border-teal-500/20 bg-teal-500/5 p-4 text-sm leading-relaxed text-teal-200">{section.journey}</p>}
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {section.visuals.map((visual) => (
                            <div key={visual.src} className="space-y-3">
                              <div className="text-sm font-semibold text-white">{visual.label}</div>
                              {visual.type === "video" ? (
                                <div className="overflow-hidden rounded-lg border border-slate-700 bg-black">
                                  <video controls preload="metadata" playsInline className="block h-auto w-full">
                                    <source src={visual.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setActiveScreenshot(visual)}
                                  className="project-screenshot-trigger block w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/70 p-3 transition-all duration-300 hover:border-teal-500/60 sm:p-4"
                                >
                                  <img src={visual.src} alt={visual.alt} className="mx-auto block h-auto max-h-[680px] w-full object-contain object-center" loading="lazy" />
                                </button>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </div>
                </section>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>

      {activeScreenshot && createPortal(
        <div className="project-lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label={activeScreenshot.label}>
          <button type="button" onClick={() => setActiveScreenshot(null)} className="project-lightbox-control absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white hover:bg-slate-700 sm:right-6 sm:top-6" aria-label="Close screenshot">
            <X className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => moveLightbox(-1)} className="project-lightbox-control absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white hover:bg-slate-700" aria-label="Previous screenshot">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => moveLightbox(1)} className="project-lightbox-control absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white hover:bg-slate-700" aria-label="Next screenshot">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <img src={activeScreenshot.src} alt={activeScreenshot.alt} className="project-lightbox-image max-h-[82vh] max-w-full object-contain" />
            <div className="text-center text-sm font-semibold text-white">{activeScreenshot.label}</div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
