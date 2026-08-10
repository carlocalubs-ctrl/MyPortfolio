import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  Rows3,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
} from "lucide-react";
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

const projectSections = [
  { id: "overview", label: "Overview" },
  { id: "crm", label: "CRM" },
  { id: "pipeline", label: "Pipeline" },
  { id: "forms", label: "Forms" },
  { id: "workflows", label: "Workflows" },
  { id: "calendar", label: "Calendar" },
  { id: "funnels", label: "Funnels" },
  { id: "marketing", label: "Marketing" },
  { id: "demo", label: "Demo" },
];

const processSteps = [
  { title: "Lead Capture", icon: Target },
  { title: "CRM", icon: Users },
  { title: "Pipeline", icon: TrendingUp },
  { title: "Appointment", icon: CalendarCheck },
  { title: "Follow-Up", icon: MessageCircle },
  { title: "Conversion", icon: CheckCircle2 },
];

const solarDemoVideo = {
  src: "/projects/Gohighlevel/Solar Demo/Loom/solar-crm-demo.mp4",
  type: "video/mp4",
};

const caseStudySections = [
  {
    id: "crm",
    title: "CRM & Lead Management",
    description:
      "Centralized lead management using GoHighLevel Contacts, Smart Lists, tags, lead information, location data, and customer activity tracking.",
    icon: Users,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/CRM/CRM_GohighLevel.png",
        label: "GoHighLevel Contacts and Smart Lists",
        alt: "GoHighLevel CRM contacts and smart lists screenshot",
      },
    ],
  },
  {
    id: "pipeline",
    title: "Sales Pipeline Management",
    description:
      "Structured sales pipeline used to track leads throughout the customer journey, from initial contact through appointments, follow-up, negotiation, and final outcomes.",
    icon: Rows3,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/Pipeline/PIPELINE_.png",
        label: "Solar Sales Pipeline",
        alt: "GoHighLevel solar sales pipeline screenshot",
      },
    ],
  },
  {
    id: "forms",
    title: "Lead Capture & Qualification",
    description:
      "Lead capture form designed to collect prospect information and feed qualified leads directly into the CRM and automation system.",
    icon: Target,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/Form/FORM.png",
        label: "Lead Capture Form",
        alt: "Solar lead capture and qualification form screenshot",
      },
    ],
  },
  {
    id: "workflows",
    title: "Workflows & Automation",
    description:
      "Automated workflows manage lead follow-up, appointment activity, pipeline progression, sales follow-ups, and customer outcomes throughout the solar sales process.",
    icon: Workflow,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation Workflow Complete.png",
        label: "Complete Automation Workflow",
        alt: "Complete GoHighLevel solar automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_1 Lead Gen Process.png",
        label: "Lead Generation Process",
        alt: "Lead generation automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_2_1_New Lead Follow up.png",
        label: "New Lead Follow-Up 1",
        alt: "New lead follow-up automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_2_2_New Lead Follow up.png",
        label: "New Lead Follow-Up 2",
        alt: "New lead follow-up automation workflow continuation screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_2_3_New Lead Follow up.png",
        label: "New Lead Follow-Up 3",
        alt: "New lead follow-up automation workflow final part screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_3_1 Appointment Booked.png",
        label: "Appointment Booked 1",
        alt: "Appointment booked automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_3_2 Appointment Booked.png",
        label: "Appointment Booked 2",
        alt: "Appointment booked automation workflow continuation screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_4 Proposal Sent.png",
        label: "Proposal Sent",
        alt: "Proposal sent automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_5 Negotiation.png",
        label: "Negotiation",
        alt: "Negotiation automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_6 Closed Won.png",
        label: "Closed Won",
        alt: "Closed won automation workflow screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Automation/Automation_7 Closed Lost.png",
        label: "Closed Lost",
        alt: "Closed lost automation workflow screenshot",
      },
    ],
  },
  {
    id: "calendar",
    title: "Calendar & Appointment Automation",
    description:
      "Integrated appointment scheduling system that allows leads to book consultations while keeping appointment activity connected to the CRM and automation workflows.",
    icon: Calendar,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/Calendar/Calendar.png",
        label: "Appointment Calendar",
        alt: "GoHighLevel solar appointment calendar screenshot",
      },
    ],
  },
  {
    id: "funnels",
    title: "Funnels & Landing Pages",
    description:
      "Conversion-focused solar funnel designed to capture leads, collect qualification information, and guide prospects into the CRM and follow-up process.",
    icon: Target,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/Funnel/Funnel.png",
        label: "Full Funnel",
        alt: "Full solar lead generation funnel screenshot",
        preview: "funnel-scroll",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Funnel/Funnel_Form.png",
        label: "Lead Capture Form",
        alt: "Solar funnel lead capture form screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Funnel/Funnel_Thank you page.png",
        label: "Thank You Page",
        alt: "Solar funnel thank you page screenshot",
      },
    ],
  },
  {
    id: "marketing",
    title: "Email & Marketing Automation",
    description:
      "Reusable communication templates and automated email messaging designed to provide consistent lead follow-up throughout the customer journey.",
    icon: Mail,
    screenshots: [
      {
        src: "/projects/Gohighlevel/Solar Demo/Email Marketing/Welcome Email Template.png",
        label: "Welcome Email Template",
        alt: "GoHighLevel welcome email template screenshot",
      },
      {
        src: "/projects/Gohighlevel/Solar Demo/Email Marketing/Snippet.png",
        label: "Reusable Email Snippet",
        alt: "GoHighLevel reusable communication snippet screenshot",
      },
    ],
  },
];

const scrollToProjectSection = (id) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ScreenshotGallery = ({ section, onOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenshots = section.screenshots;
  const current = screenshots[currentIndex];
  const hasMultiple = screenshots.length > 1;
  const isMarketingSection = section.id === "marketing";
  const isFullFunnelPreview = current.preview === "funnel-scroll";

  const move = (direction) => {
    setCurrentIndex((index) => (index + direction + screenshots.length) % screenshots.length);
  };

  if (isMarketingSection) {
    return (
      <div className="space-y-8">
        {screenshots.map((screenshot, index) => {
          const isWelcomeEmail = index === 0;

          return (
            <div key={screenshot.src} className="mx-auto w-full max-w-[700px] space-y-3">
              <div>
                <div className="text-sm font-semibold text-white">
                  {screenshot.label}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpen(section, index)}
                className="project-screenshot-trigger group relative w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/70 transition-all duration-300 hover:border-teal-500/60"
              >
                <div className={`${isWelcomeEmail ? "p-3 sm:p-4" : "p-3"} flex items-center justify-center`}>
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className={`${isWelcomeEmail ? "w-full" : "max-h-[480px] w-full"} h-auto object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]`}
                    loading="lazy"
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isFullFunnelPreview ? (
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-300">
            <span>Scroll to explore the full funnel</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen(section, currentIndex)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(section, currentIndex);
              }
            }}
            className="project-screenshot-trigger group relative w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/70 transition-all duration-300 hover:border-teal-500/60"
            aria-label={`Open ${current.label} screenshot`}
          >
            <div className="project-funnel-scroll-preview">
              <img
                src={current.src}
                alt={current.alt}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpen(section, currentIndex)}
          className="project-screenshot-trigger group relative w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900/70 transition-all duration-300 hover:border-teal-500/60"
        >
          <div className="flex max-h-[560px] min-h-[280px] items-center justify-center p-3 sm:p-4">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[520px] w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
        </button>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-white">{current.label}</div>
          {hasMultiple && (
            <div className="text-xs text-slate-400">
              {currentIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>

        {hasMultiple && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => move(-1)}
              className="h-10 border-slate-700 px-3 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label={`Previous ${section.title} screenshot`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => move(1)}
              className="h-10 border-slate-700 px-3 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label={`Next ${section.title} screenshot`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              type="button"
              onClick={() => setCurrentIndex(index)}
                className={`project-screenshot-trigger overflow-hidden rounded-md border bg-slate-900/70 p-1 transition-all duration-300 ${
                index === currentIndex
                  ? "border-teal-400 shadow-lg shadow-teal-500/10"
                  : "border-slate-700 hover:border-teal-500/50"
              }`}
              aria-label={`Show ${screenshot.label}`}
            >
              <img
                src={screenshot.src}
                alt=""
                className="h-14 w-full object-contain object-center"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const GoHighLevelCaseStudy = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title =
      "Project 01 - Solar CRM & Automation System | John Carlo R. Calubiran";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeGallery ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGallery]);

  const openLightbox = (section, index) => {
    setActiveGallery(section);
    setActiveIndex(index);
  };

  const closeGallery = () => {
    setActiveGallery(null);
    setActiveIndex(0);
  };

  const moveGallery = (direction) => {
    if (!activeGallery) return;
    setActiveIndex((current) => {
      const total = activeGallery.screenshots.length;
      return (current + direction + total) % total;
    });
  };

  useEffect(() => {
    if (!activeGallery) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft" && activeGallery.screenshots.length > 1) {
        moveGallery(-1);
      }

      if (event.key === "ArrowRight" && activeGallery.screenshots.length > 1) {
        moveGallery(1);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeGallery]);

  return (
    <div className="project-page min-h-screen relative" style={{ background: "#0f172a" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <nav className="sticky top-16 z-30 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-3 md:justify-center sm:justify-start">
              <Link
                to="/projects/gohighlevel"
                className="self-center inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200 py-3 lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to GoHighLevel Projects</span>
              </Link>
              {projectSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToProjectSection(item.id)}
                  className="whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-all border-2 border-transparent hover:bg-slate-800 hover:border-teal-300 hover:text-teal-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <main className="pt-16">
          <section className="relative overflow-hidden pt-10 pb-20 sm:pt-5 sm:pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-[640px]:max-[768px]:hidden">
              <Link
                to="/projects/gohighlevel"
                className="self-center inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200 py-3"
              >
                <ArrowLeft className="hidden lg:inline h-4 w-4" />
                <span className="hidden lg:inline">
                  Back to GoHighLevel Projects
                </span>
              </Link>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mx-auto max-w-5xl text-center">
                  <div className="mb-5 inline-flex items-center rounded-full border border-teal-500/20 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live GoHighLevel Project
                  </div>
                  <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      Project 01 — Solar CRM & Automation System
                    </span>
                  </h1>
                  <p className="mb-6 text-xl font-semibold text-teal-300">
                    End-to-End CRM, Sales & Marketing Automation System
                  </p>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
                    Built a complete GoHighLevel environment designed to manage
                    the customer journey from initial lead capture through
                    appointment booking, sales follow-up, and pipeline
                    management.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section id="overview" className="scroll-mt-32 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <Card className="project-overview-card mx-auto max-w-6xl border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="project-overview-header text-center">
                    <CardTitle className="text-3xl text-white sm:text-4xl">
                      Project Overview
                    </CardTitle>
                    <CardDescription className="mx-auto max-w-3xl text-base leading-relaxed text-slate-400">
                      The system connects lead capture, customer management,
                      sales tracking, appointment scheduling, and automated
                      follow-ups into one centralized CRM environment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="project-overview-content">
                    <div className="project-overview-flow">
                      {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isFinalStep = index === processSteps.length - 1;

                        return (
                          <div
                            key={step.title}
                            className={`project-overview-step ${isFinalStep ? "project-overview-step-final" : ""}`}
                          >
                            <div className="project-overview-step-body">
                              <span className="project-overview-number">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="project-overview-icon">
                                <Icon className="h-5 w-5" />
                              </span>
                              <span className="project-overview-title">
                                {step.title}
                              </span>
                            </div>
                          {index < processSteps.length - 1 && (
                            <div className="project-overview-connector">
                              <span></span>
                              <ArrowRight className="project-overview-arrow" />
                            </div>
                          )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </section>

          <div className="space-y-10 pb-10">
            {caseStudySections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 py-6"
                >
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal delay={sectionIndex * 50}>
                      <Card className="mx-auto max-w-6xl overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                        <CardHeader>
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20">
                            <Icon className="h-7 w-7 text-teal-400" />
                          </div>
                          <CardTitle className="text-2xl text-white sm:text-3xl">
                            {section.title}
                          </CardTitle>
                          <CardDescription className="max-w-3xl text-base leading-relaxed text-slate-400">
                            {section.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScreenshotGallery
                            section={section}
                            onOpen={openLightbox}
                          />
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </div>
                </section>
              );
            })}
          </div>

          <section
            id="demo"
            className="scroll-mt-32 py-20 bg-slate-900/60 backdrop-blur-[2px]"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mx-auto w-full max-w-6xl text-center">
                  <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                    See the System in Action
                  </h2>
                  <p className="mb-8 text-lg text-slate-400">
                    A walkthrough of the Solar CRM and automation system.
                  </p>
                  <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl">
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      className="block h-auto w-full"
                    >
                      <source src={solarDemoVideo.src} type={solarDemoVideo.type} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      {activeGallery &&
        createPortal(
          <div
            className="project-lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="project-lightbox-control absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700 sm:right-6 sm:top-6"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            {activeGallery.screenshots.length > 1 && (
              <>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    moveGallery(-1);
                  }}
                  className="project-lightbox-control absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    moveGallery(1);
                  }}
                  className="project-lightbox-control absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div
              className="w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-2xl sm:p-4">
                <div className="flex max-h-[82vh] items-center justify-center">
                  <img
                    src={activeGallery.screenshots[activeIndex].src}
                    alt={activeGallery.screenshots[activeIndex].alt}
                    className="project-lightbox-image max-h-[80vh] max-w-full object-contain object-center"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-400">
                <span>{activeGallery.screenshots[activeIndex].label}</span>
                <span>
                  {activeIndex + 1} / {activeGallery.screenshots.length}
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
