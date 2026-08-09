import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  Mail,
  PlayCircle,
  Rows3,
  Target,
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
import { toast } from "sonner";

const projectSections = [
  { id: "overview", label: "Overview" },
  { id: "crm", label: "CRM" },
  { id: "pipeline", label: "Pipeline" },
  { id: "funnels", label: "Funnels" },
  { id: "workflows", label: "Workflows" },
  { id: "calendar", label: "Calendar" },
  { id: "marketing", label: "Marketing" },
  { id: "demo", label: "Demo" },
];

const processSteps = [
  "Lead Capture",
  "CRM",
  "Pipeline",
  "Appointment",
  "Follow-Up",
  "Conversion",
];

const caseStudySections = [
  {
    id: "crm",
    title: "CRM & Lead Management",
    description:
      "A centralized CRM structure prepared to organize new solar leads, contact details, source tags, notes, and follow-up activity.",
    icon: Users,
    placeholders: ["CRM dashboard placeholder"],
  },
  {
    id: "pipeline",
    title: "Sales Pipeline Management",
    description:
      "Pipeline stages designed to track each opportunity from initial inquiry through qualification, booked appointment, proposal, and closed sale.",
    icon: Rows3,
    placeholders: ["Pipeline board placeholder"],
  },
  {
    id: "funnels",
    title: "Funnels & Landing Pages",
    description:
      "Lead capture funnels and forms prepared for future screenshots of landing pages, intake forms, and conversion steps.",
    icon: Target,
    placeholders: [
      "Funnel page placeholder",
      "Lead form placeholder",
      "Thank-you page placeholder",
    ],
  },
  {
    id: "workflows",
    title: "Workflows & Automation",
    description:
      "Automation workflows structured for lead routing, notifications, appointment reminders, follow-ups, and sales team handoffs.",
    icon: Workflow,
    placeholders: [
      "Lead follow-up workflow placeholder",
      "Appointment reminder workflow placeholder",
      "Pipeline automation placeholder",
    ],
  },
  {
    id: "calendar",
    title: "Calendar & Appointment Automation",
    description:
      "Booking calendars prepared to help prospects schedule calls while keeping sales follow-up and appointment status connected inside the CRM.",
    icon: Calendar,
    placeholders: ["Calendar booking placeholder"],
  },
  {
    id: "marketing",
    title: "Email & Marketing Automation",
    description:
      "Email and SMS nurture paths prepared for future campaign screenshots, customer follow-up sequences, and re-engagement flows.",
    icon: Mail,
    placeholders: ["Marketing automation placeholder"],
  },
];

const scrollToProjectSection = (id) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ScreenshotPlaceholder = ({ label, index, total, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-dashed border-slate-600 bg-slate-900/70 text-left transition-all duration-300 hover:border-teal-500/60 hover:bg-slate-900"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/10 opacity-70"></div>
    <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
      <GalleryHorizontal className="mb-4 h-10 w-10 text-teal-400" />
      <div className="text-base font-semibold text-white">{label}</div>
      <div className="mt-2 text-sm text-slate-400">
        Screenshot placeholder {total > 1 ? `${index + 1} of ${total}` : ""}
      </div>
    </div>
  </button>
);

export const GoHighLevelCaseStudy = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title =
      "GoHighLevel CRM & Marketing Automation | John Carlo R. Calubiran";
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeGallery ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGallery]);

  const openPlaceholder = (section, index) => {
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
      const total = activeGallery.placeholders.length;
      return (current + direction + total) % total;
    });
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#0f172a" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <nav className="sticky top-16 z-30 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-3 lg:justify-center mg:justify-center sm:justify-start">
              <Link
                to="/#works"
                className="self-center inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200 py-3"
              >
                <ArrowLeft className="lg:hidden zh-4 w-4" />
                <span className="lg:hidden">Back</span>
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
                to="/#works"
                className="self-center inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200 py-3"
              >
                <ArrowLeft className="hidden lg:inline h-4 w-4" />
                <span className="hidden lg:inline">
                  Back to Featured Projects
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
                      GoHighLevel CRM & Marketing Automation
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
                <Card className="mx-auto max-w-6xl border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-white sm:text-4xl">
                      Project Overview
                    </CardTitle>
                    <CardDescription className="mx-auto max-w-3xl text-base leading-relaxed text-slate-400">
                      The system connects lead capture, customer management,
                      sales tracking, appointment scheduling, and automated
                      follow-ups into one centralized CRM environment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                      {processSteps.map((step, index) => (
                        <div
                          key={step}
                          className="flex items-center gap-3 lg:block"
                        >
                          <div className="rounded-lg border border-teal-500/20 bg-slate-900/70 p-4 text-center transition-all hover:border-teal-500/50">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-sm font-bold text-teal-300">
                              {index + 1}
                            </div>
                            <div className="text-sm font-semibold text-white">
                              {step}
                            </div>
                          </div>
                          {index < processSteps.length - 1 && (
                            <ArrowRight className="hidden h-5 w-5 text-teal-400 lg:mx-auto lg:mt-3 lg:block" />
                          )}
                        </div>
                      ))}
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
                          <div
                            className={`grid gap-4 ${section.placeholders.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}
                          >
                            {section.placeholders.map((placeholder, index) => (
                              <ScreenshotPlaceholder
                                key={placeholder}
                                label={placeholder}
                                index={index}
                                total={section.placeholders.length}
                                onOpen={() => openPlaceholder(section, index)}
                              />
                            ))}
                          </div>
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
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                    See the System in Action
                  </h2>
                  <p className="mb-8 text-lg text-slate-400">
                    A Loom or video walkthrough can be added here when the demo
                    URL is ready.
                  </p>
                  <Button
                    onClick={() => toast.info("Demo video will be added soon.")}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6 text-lg font-medium text-white hover:from-teal-600 hover:to-emerald-600"
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700 sm:right-6 sm:top-6"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            {activeGallery.placeholders.length > 1 && (
              <>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    moveGallery(-1);
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    moveGallery(1);
                  }}
                  className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div
              className="w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="aspect-[16/9] rounded-lg border border-dashed border-slate-600 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8 shadow-2xl">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <GalleryHorizontal className="mb-5 h-16 w-16 text-teal-300" />
                  <div className="text-2xl font-semibold text-white">
                    {activeGallery.placeholders[activeIndex]}
                  </div>
                  <div className="mt-3 text-sm text-slate-400">
                    Replace this placeholder with an actual screenshot later.
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-400">
                <span>{activeGallery.title}</span>
                <span>
                  {activeIndex + 1} / {activeGallery.placeholders.length}
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
