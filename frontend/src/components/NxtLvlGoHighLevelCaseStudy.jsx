import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Database,
  FormInput,
  MessageCircle,
  Workflow,
  X,
} from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollReveal } from "../hooks/useScrollReveal";

const assetRoot = "/projects/Gohighlevel/Nxt Lvl Detail";
const technologies = ["GoHighLevel", "CRM", "Pipelines", "Calendars", "Custom Fields", "Automation", "A2P", "SMS"];

const sections = [
  {
    id: "architecture",
    title: "CRM Architecture",
    description:
      "Organized the GoHighLevel CRM for lead and customer management, opportunity handling, sales and booking pipelines, pipeline stages, dashboard visibility, and lead and booking tracking.",
    icon: Database,
    visuals: [
      {
        src: `${assetRoot}/CRM SNAPSHOT.png`,
        label: "GoHighLevel CRM snapshot",
        alt: "GoHighLevel CRM snapshot showing organized customer and lead records",
      },
      {
        src: `${assetRoot}/Dashboard.png`,
        label: "CRM dashboard",
        alt: "GoHighLevel dashboard showing lead and booking visibility",
      },
      {
        src: `${assetRoot}/Pipeline Stages.png`,
        label: "Pipeline stages",
        alt: "GoHighLevel opportunity pipeline stages for lead and booking tracking",
      },
    ],
  },
  {
    id: "calendar",
    title: "Calendar & Booking System",
    description:
      "Configured the GoHighLevel calendar for appointment organization and booking management, keeping booking information connected to the CRM workflow.",
    icon: Calendar,
    visuals: [
      {
        src: `${assetRoot}/Calendar.png`,
        label: "GoHighLevel calendar configuration",
        alt: "GoHighLevel calendar configuration for appointment and booking management",
      },
    ],
  },
  {
    id: "fields",
    title: "Custom Fields & CRM Data",
    description:
      "Configured custom fields to keep customer, service, booking, and CRM information structured and available throughout the GoHighLevel process.",
    icon: Database,
    visuals: [
      {
        src: `${assetRoot}/Custom Fields.png`,
        label: "Custom CRM fields",
        alt: "GoHighLevel custom fields for customer service and booking information",
      },
    ],
  },
  {
    id: "automation",
    title: "GoHighLevel Automation",
    description:
      "Built native GoHighLevel workflow logic for automated CRM actions, lead and customer processing, follow-up automation, and booking-related operations.",
    icon: Workflow,
    visuals: [
      {
        src: `${assetRoot}/Automation.png`,
        label: "Native GoHighLevel automation",
        alt: "GoHighLevel native workflow automation for lead processing and follow-up",
      },
    ],
  },
  {
    id: "sms",
    title: "A2P & SMS Campaign Infrastructure",
    description:
      "Configured A2P setup and SMS campaign infrastructure to support customer communication readiness without claiming an approval status not established by the project evidence.",
    icon: MessageCircle,
    visuals: [
      {
        src: `${assetRoot}/a2p Compliance.png`,
        label: "A2P and SMS configuration",
        alt: "GoHighLevel A2P configuration and SMS campaign infrastructure",
      },
    ],
  },
  {
    id: "forms",
    title: "Custom Lead Capture & Booking Experience",
    description:
      "Created a customer-facing Webflow experience where GoHighLevel handles phone and lead capture, customer information is saved in the CRM, and the customer continues into the booking process.",
    icon: FormInput,
    journey: "Book A Detail → GoHighLevel phone / lead capture → Customer information captured in CRM → Please Wait transition → Customer continues into the booking process",
    visuals: [
      {
        src: `${assetRoot}/FORM.png`,
        label: "Book A Detail lead capture",
        alt: "Book A Detail customer lead capture form",
      },
      {
        src: `${assetRoot}/FORM NXT LVL.png`,
        label: "NXT LVL booking form",
        alt: "NXT LVL Webflow and GoHighLevel booking form",
      },
      {
        src: `${assetRoot}/FORM PLEASE WAIT.png`,
        label: "Please Wait transition",
        alt: "Please Wait transition before the customer continues to booking",
      },
    ],
  },
];

export const NxtLvlGoHighLevelCaseStudy = () => {
  const [activeScreenshot, setActiveScreenshot] = useState(null);
  const screenshots = sections.flatMap((section) => section.visuals);

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
                to="/projects/gohighlevel"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to GoHighLevel Projects</span>
              </Link>
              <ScrollReveal>
                <div className="mx-auto max-w-5xl text-center">
                  <img
                    src={`${assetRoot}/NXT LVL DETAIL LOGO.jpg`}
                    alt="NXT LVL Mobile Detailing logo"
                    className="mx-auto mb-8 h-24 w-24 rounded-xl border border-slate-700 object-contain shadow-xl"
                  />
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    GoHighLevel CRM Project
                  </div>
                  <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      CRM Specialist & Booking Integration
                    </span>
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
                    Built and configured a complete GoHighLevel CRM system for NXT LVL Mobile Detailing, including pipelines, dashboards, calendars, custom fields, native workflows, A2P setup, and SMS campaign infrastructure.
                  </p>
                  <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
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
                    <CardDescription className="max-w-4xl text-base leading-relaxed text-slate-400">
                      The NXT LVL project included setting up and organizing a complete GoHighLevel CRM environment for leads, customers, bookings, communication, and automation. The work covered CRM setup, pipelines, dashboards, calendars, custom fields, native workflows, A2P and SMS infrastructure, and a connected booking and lead-capture experience.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollReveal>
            </div>
          </section>

          <div className="space-y-8 pb-16">
            {sections.map((section, sectionIndex) => {
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
                              <button
                                type="button"
                                onClick={() => setActiveScreenshot(visual)}
                                className="project-screenshot-trigger block w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/70 p-3 transition-all duration-300 hover:border-teal-500/60 sm:p-4"
                              >
                                <img src={visual.src} alt={visual.alt} className="mx-auto block h-auto max-h-[680px] w-full object-contain object-center" loading="lazy" />
                              </button>
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

          <section className="bg-slate-900/60 py-16">
            <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
              <ScrollReveal>
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Outcome</h2>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
                  The setup centralized customer and booking information inside GoHighLevel and provided a structured environment for lead management, booking visibility, automated workflows, and customer communication.
                </p>
              </ScrollReveal>
            </div>
          </section>
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
