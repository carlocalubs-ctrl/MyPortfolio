// Mock data for portfolio website

export const portfolioData = {
  // Personal Info
  name: "John Carlo R. Calubiran",
  title: "GoHighLevel & AI Automation Specialist",
  tagline: "Transforming Business Operations Through Intelligent Automation",
  email: "carlocalubs@gmail.com",
  phone: "+639565229350",
  linkedin: "", // To be added later
  calendly: "https://calendly.com/carlocalubs/30min",
  profileImage: "/jc-logo.png",
  profileVideo: "/My-DP.mp4",
  
  // Hero Section
  hero: {
    title: "John Carlo R. Calubiran",
    subtitle: "GoHighLevel & AI Automation Specialist",
    description: "Empowering businesses with AI-driven automation solutions, seamless API integrations, and customer service excellence.",
  },

  // Services
  services: [
    {
      id: 4,
      title: "GoHighLevel",
      description: "Complete CRM, sales, marketing, and automation systems built around your business process.",
      features: [
        "CRM Setup & Optimization",
        "Funnels & Landing Pages",
        "Sales Pipelines",
        "Workflows & Automations",
        "Calendars & Appointment Booking",
        "Forms & Surveys",
        "Email & SMS Automation",
        "Lead Nurturing & Follow-Ups"
      ],
      icon: "workflow"
    },
    {
      id: 2,
      title: "AI Automation",
      description: "Leverage cutting-edge AI automation tools to streamline workflows, reduce manual tasks, and boost operational efficiency.",
      features: ["Workflow Automation", "Process Optimization", "Task Automation", "Smart Solutions"],
      icon: "bot"
    },
    {
      id: 3,
      title: "API Integration",
      description: "Seamless integration of third-party APIs to connect your systems, automate data flow, and enhance functionality.",
      features: ["REST API", "Webhooks", "Data Sync", "System Integration"],
      icon: "plug"
    },
    {
      id: 5,
      title: "CRM Integration",
      description: "Connect and optimize your CRM systems for better customer relationships, data management, and business insights.",
      features: ["CRM Setup", "Data Migration", "Custom Workflows", "Analytics"],
      icon: "database"
    },
    {
      id: 1,
      title: "Customer Service",
      description: "Comprehensive customer support across multiple channels including email, chat, and phone. Delivering exceptional service experiences with proven track record.",
      features: ["Email Support", "Live Chat", "Phone Support", "Ticket Management"],
      icon: "headset"
    }
  ],

  toolsPlatforms: [
    { name: "GoHighLevel", logo: null, icon: "workflow" },
    { name: "n8n", logo: null, icon: "nodes" },
    { name: "Make", logo: null, icon: "blocks" },
    { name: "Zapier", logo: null, icon: "zap" },
    { name: "Vapi AI", logo: null, icon: "phone" },
    { name: "Twilio", logo: null, icon: "message" },
    { name: "ChatGPT", logo: null, icon: "bot" },
    { name: "Claude", logo: null, icon: "sparkles" },
    { name: "Gemini", logo: null, icon: "stars" },
    { name: "Airtable", logo: null, icon: "database" },
    { name: "Asana", logo: null, icon: "check" },
    { name: "Xero", logo: null, icon: "calculator" },
    { name: "Salesforce", logo: null, icon: "cloud" },
    { name: "Google Workspace", logo: null, icon: "briefcase" },
    { name: "Canva", logo: null, icon: "palette" },
    { name: "Systeme.io", logo: null, icon: "globe" }
  ],

  // Work Experience
  experience: [
    {
      id: 1,
      title: "Freelancer - Customer Support & Automation Specialist",
      company: "Upwork & Onlinejobs.ph",
      client: "Various International Clients",
      period: "2024 - Present",
      description: "Providing freelance customer support and AI automation services to clients worldwide",
      responsibilities: [
        "Delivering top-tier customer support across multiple channels (email, chat, phone) for global clients",
        "Building custom automation workflows using Zapier, n8n, Make, and Power Automate",
        "Integrating APIs and CRM systems to streamline client business operations",
        "Implementing AI-powered solutions to reduce manual workload and improve efficiency",
        "Managing multiple client projects with strict deadlines and high quality standards"
      ]
    },
    {
      id: 2,
      title: "Business Process Associate - Care Representative and Upskill into Automation Specialist",
      company: "Tata Consultancy Services",
      client: "AGL Retailer AU",
      period: "March 2023 - April 2026",
      description: "Delivered exceptional customer service for energy and telecommunications services while upskilling into AI automation specialist",
      responsibilities: [
        "Assisted customers with billing inquiries, bill shock concerns, payments, refunds, and account management",
        "Processed gas, electricity, internet and mobile connection, disconnection, and transfer requests",
        "Coordinated with distributors and internal departments to resolve service and account-related issues",
        "Escalated complex cases to management and specialized teams for resolution",
        "Provided accurate information regarding energy services while delivering excellent customer service",
        "Implemented AI automation for QA processes to enhance quality control and operational efficiency",
        "Leveraged TCS AI Wisdom Next platform for intelligent process automation and data-driven insights",
        "Developed automated workflows to streamline repetitive tasks and improve team productivity"
      ]
    },
    {
      id: 3,
      title: "Customer Service Representative",
      company: "Teleperformance",
      client: "UnitedHealthcare USA",
      period: "February 2022 - March 2023",
      description: "Facilitated healthcare coordination and member support services",
      responsibilities: [
        "Facilitated appointment scheduling and care coordination for members",
        "Assisted members with provider searches and appointment arrangements",
        "Improved overall member satisfaction and access to care",
        "Supported members with benefits, claims, coverage verification, and healthcare service inquiries",
        "Provided healthcare navigation support to ensure members received appropriate care"
      ]
    }
  ],

  // Skills
  skills: [
    { name: "Zapier", level: 90, category: "Automation" },
    { name: "n8n", level: 85, category: "Automation" },
    { name: "Make", level: 88, category: "Automation" },
    { name: "Power Automate", level: 82, category: "Automation" },
    { name: "Customer Service", level: 95, category: "Soft Skills" },
    { name: "API Integration", level: 80, category: "Technical" },
    { name: "CRM Systems", level: 85, category: "Technical" }
  ],

  // Featured Project Categories
  projectCategories: [
    {
      id: "gohighlevel",
      title: "GoHighLevel",
      description: "CRM, funnels, pipelines, workflows, calendars, and marketing automation projects built in GoHighLevel.",
      category: "GoHighLevel",
      image: "/gohighlevel-thumbnail.png",
      technologies: ["CRM", "Funnels", "Pipelines", "Workflows", "Calendars", "Marketing Automation"],
      path: "/projects/gohighlevel",
      status: "live"
    },
    {
      id: "n8n",
      title: "n8n",
      description: "Advanced workflow automations connecting AI tools, APIs, CRMs, data sources, and publishing systems.",
      category: "n8n",
      image: "/projects/thumbnail/THUMBNAIL%20n8n.png",
      technologies: ["n8n", "APIs", "AI Agents", "Integrations"],
      path: "/projects/n8n",
      status: "live"
    },
    {
      id: "zapier",
      title: "Zapier",
      description: "Multi-step Zapier workflows for content processing, distribution, file monitoring, and social automation.",
      category: "Zapier",
      image: "/projects/thumbnail/THUMBNAIL%20ZAPIER.png",
      technologies: ["Zapier", "AI by Zapier", "Google Drive", "Social Media"],
      path: "/projects/zapier",
      status: "live"
    },
    {
      id: "make",
      title: "Make",
      description: "Scenario-based automations for email, documents, reporting, task operations, and business process syncing.",
      category: "Make",
      image: "/projects/thumbnail/THUMBNAIL%20MAKE.png",
      technologies: ["Make.com", "Gmail", "Google Drive", "Google Sheets", "Xero"],
      path: "/projects/make",
      status: "live"
    },
    {
      id: "funnels",
      title: "Funnels",
      description: "Conversion-focused funnel and landing page projects for lead capture and CRM-connected campaigns.",
      category: "Funnels",
      image: "/projects/thumbnail/THUMBNAIL%20SALES%20FUNNEL.png",
      technologies: ["Landing Pages", "Lead Capture", "CRM Integration"],
      path: "/projects/funnels",
      status: "live"
    }
  ],

  platformProjects: {
    gohighlevel: {
      title: "GoHighLevel Projects",
      subtitle: "CRM • Funnels • Pipelines • Workflows • Calendars • Marketing Automation",
      projects: [
        {
          id: "01",
          title: "Solar CRM & Automation System",
          description: "End-to-end GoHighLevel CRM and automation system for managing solar leads, appointments, sales pipelines, follow-ups, and marketing workflows.",
          status: "Live",
          image: "/projects/Gohighlevel/Solar Demo/Logo/Solar Demo (1).png",
          thumbnailStyle: "logo",
          technologies: ["GoHighLevel", "CRM", "Funnels", "Pipelines", "Workflows", "Calendars", "Marketing Automation"],
          path: "/projects/gohighlevel-crm-marketing-automation",
          demoPath: "/projects/gohighlevel-crm-marketing-automation#demo",
          demoUrl: ""
        },
        {
          id: "02",
          title: "Coming Soon",
          description: "More GoHighLevel projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        },
        {
          id: "03",
          title: "Coming Soon",
          description: "More GoHighLevel projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        }
      ]
    },
    n8n: {
      title: "n8n Projects",
      subtitle: "AI Agents • APIs • Workflow Automation • CRM Integrations",
      projects: [
        {
          id: "01",
          title: "AI Voice Receptionist & GoHighLevel Automation",
          description: "AI-powered inbound call automation using Vapi, Twilio, n8n, APIs, and GoHighLevel to capture leads, manage callbacks, update CRM records, and support appointment workflows.",
          status: "Live",
          image: "/projects/n8n/AI%20Assistant%20-%20VAPI%20+%20Twilio%20+%20n8n%20+%20GHL/n8n%20-%20GoHighLevel%20-%20Vapi_AI_Receptionist.png",
          technologies: ["n8n", "Vapi AI", "GoHighLevel", "Twilio", "REST API", "Webhooks"],
          path: "/projects/n8n/ai-voice-receptionist",
          demoPath: "/projects/n8n/ai-voice-receptionist#demo",
          screenshots: [
            {
              src: "/projects/n8n/AI%20Assistant%20-%20VAPI%20+%20Twilio%20+%20n8n%20+%20GHL/n8n%20-%20GoHighLevel%20-%20Vapi_AI_Receptionist.png",
              label: "n8n Workflow Screenshot",
              alt: "n8n GoHighLevel Vapi AI receptionist workflow screenshot"
            },
            {
              src: "/projects/n8n/AI%20Assistant%20-%20VAPI%20+%20Twilio%20+%20n8n%20+%20GHL/VAPI%20SCREENSHOT.png",
              label: "Vapi Screenshot",
              alt: "Vapi AI receptionist configuration screenshot"
            }
          ],
          demoVideo: {
            src: "/projects/n8n/AI%20Assistant%20-%20VAPI%20+%20Twilio%20+%20n8n%20+%20GHL/Live%20Phone%20Call%20Demo%20-%20Calling%20Twilio%20Number%20GHL%20n8n%20Vapi.mp4",
            type: "video/mp4"
          }
        },
        {
          id: "02",
          title: "Weather-to-Social Media Automation",
          description: "Automated workflow that retrieves weather data, generates AI-powered content, creates visual assets, publishes to social platforms, and stores outputs in Google Drive.",
          status: "Live",
          image: "/projects/n8n/Auto Post Weather Status to SocMed and save to Gdrive/Auto Post Weather Status.jpg",
          technologies: ["n8n", "Weather API", "Gemini AI", "Google Drive", "Social Media APIs"],
          path: "/projects/n8n/weather-social",
          screenshots: [
            {
              src: "/projects/n8n/Auto Post Weather Status to SocMed and save to Gdrive/Auto Post Weather Status.jpg",
              label: "Weather Automation Workflow",
              alt: "n8n weather to social media automation workflow screenshot"
            }
          ]
        },
        {
          id: "03",
          title: "Coming Soon",
          description: "More n8n projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        }
      ]
    },
    make: {
      title: "Make Projects",
      subtitle: "Email • Documents • Reporting • Task and Invoice Automation",
      projects: [
        {
          id: "01",
          title: "Automated Gmail Sorting & Email Management",
          description: "Make.com automation for monitoring Gmail, organizing incoming messages, processing email data, and reducing repetitive inbox management.",
          status: "Live",
          image: "/projects/make/AUTO SORT GMAIL/AUTO SORT GMAIL_SS.jpg",
          technologies: ["Make", "Gmail", "Automation", "Email Management"],
          path: "/projects/make/gmail-processing",
          demoPath: "/projects/make/gmail-processing#demo",
          screenshots: [
            {
              src: "/projects/make/AUTO SORT GMAIL/AUTO SORT GMAIL_SS.jpg",
              label: "Gmail Sorting Workflow",
              alt: "Make automated Gmail sorting workflow screenshot"
            }
          ],
          demoVideo: {
            src: "/projects/make/AUTO SORT GMAIL/AUTO SORT GMAIL_LOOM.mp4",
            type: "video/mp4"
          }
        },
        {
          id: "02",
          title: "Xero to Asana Transaction Automation",
          description: "Automated workflow connecting Xero and Asana to process transaction data, organize project information, and reduce manual reporting work.",
          status: "Live",
          image: "/projects/make/XERO (Bank transaction into csv & upload to ASANA)/1. PROJECT SCREENSHOT.jpg",
          technologies: ["Make", "Xero", "Asana", "Automation", "Data Sync"],
          path: "/projects/make/xero-asana",
          screenshots: [
            {
              src: "/projects/make/XERO (Bank transaction into csv & upload to ASANA)/1. PROJECT SCREENSHOT.jpg",
              label: "Project Workflow Screenshot",
              alt: "Make Xero to Asana transaction automation workflow screenshot"
            },
            {
              src: "/projects/make/XERO (Bank transaction into csv & upload to ASANA)/2. ASANA Screenshot (Completed task with uploaded attachment).jpg",
              label: "Asana Result Screenshot",
              alt: "Asana completed task with uploaded attachment screenshot"
            }
          ]
        },
        {
          id: "03",
          title: "Coming Soon",
          description: "More Make projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        }
      ]
    },
    zapier: {
      title: "Zapier Projects",
      subtitle: "Content Processing • Distribution • AI Automation",
      projects: [
        {
          id: "01",
          title: "Automated Content Repurposing & Distribution",
          description: "Multi-step Zapier automation that processes content, repurposes it with AI, and distributes formatted outputs across social platforms.",
          status: "Live",
          image: "/projects/zapier/Content Repurposing/Content_Repurposing_SS.jpg",
          technologies: ["Zapier", "AI Automation", "Content Repurposing", "Google Drive", "Social Media"],
          path: "/projects/zapier/content-distribution",
          demoPath: "/projects/zapier/content-distribution#demo",
          screenshots: [
            {
              src: "/projects/zapier/Content Repurposing/Content_Repurposing_SS.jpg",
              label: "Content Repurposing Workflow",
              alt: "Zapier content repurposing and distribution workflow screenshot"
            }
          ],
          demoVideo: {
            src: "/projects/zapier/Content Repurposing/Content_Repurposing_LOOM.mp4",
            type: "video/mp4"
          }
        },
        {
          id: "02",
          title: "Coming Soon",
          description: "More Zapier projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        },
        {
          id: "03",
          title: "Coming Soon",
          description: "More Zapier projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        }
      ]
    },
    funnels: {
      title: "Funnels Projects",
      subtitle: "Landing Pages • Lead Capture • Desktop and Mobile Screenshots",
      projects: [
        {
          id: "01",
          title: "Solar Lead Generation Funnel",
          description: "Conversion-focused landing page and funnel designed for solar lead capture and CRM integration.",
          status: "Live",
          image: "/projects/funnel/solardemo/Thumbnail.png",
          thumbnailStyle: "cover",
          technologies: ["Funnels", "Landing Pages", "Lead Capture", "CRM Integration"],
          path: "/projects/funnels/solar-lead-generation",
          demoUrl: "",
          platform: "GoHighLevel",
          liveLink: null,
          screenshots: [
            {
              src: "/projects/Gohighlevel/Solar Demo/Funnel/Funnel.png",
              label: "Full Funnel",
              alt: "Solar lead generation full funnel screenshot"
            },
            {
              src: "/projects/Gohighlevel/Solar Demo/Funnel/Funnel_Form.png",
              label: "Funnel Form",
              alt: "Solar lead generation funnel form screenshot"
            },
            {
              src: "/projects/Gohighlevel/Solar Demo/Funnel/Funnel_Thank you page.png",
              label: "Thank You Page",
              alt: "Solar lead generation funnel thank you page screenshot"
            }
          ]
        },
        {
          id: "02",
          title: "Coming Soon",
          description: "More funnel projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        },
        {
          id: "03",
          title: "Coming Soon",
          description: "More funnel projects will be added soon.",
          status: "Coming Soon",
          image: null,
          technologies: [],
          path: null
        }
      ]
    }
  },

  // Previous Works / Projects
  projects: [
    {
      id: 1,
      title: "GoHighLevel CRM & Marketing Automation",
      description: "Built an end-to-end GoHighLevel system for a solar business, including CRM setup, lead capture, sales pipelines, funnels, appointment scheduling, workflows, and automated customer follow-ups.",
      category: "GoHighLevel",
      technologies: ["GoHighLevel", "CRM", "Funnels", "Pipelines", "Workflows", "Calendars", "Marketing Automation"],
      image: "/gohighlevel-thumbnail.png",
      video: null,
      demoUrl: null,
      caseStudyPath: "/projects/gohighlevel",
      status: "live"
    },
    {
      id: 2,
      title: "Auto Post Weather Status to SocMed and save to Gdrive",
      description: "Automated workflow using n8n that fetches real-time weather data from AccuWeather, generates social media content via AI Agent (Google Gemini), creates images using Nano Banana via APIFree, and publishes to Facebook, Instagram, and Twitter while saving everything to Google Drive.",
      category: "n8n Automation",
      technologies: ["n8n", "Gemini AI", "AccuWeather", "Google Drive", "Social Media APIs"],
      image: null,
      video: null,
      status: "live"
    },
    {
      id: 3,
      title: "Gmail Integration & Document Processing",
      description: "Make.com (formerly Integromat) automation that watches incoming emails, extracts attachments, uploads files to Google Drive, generates AI-powered responses, logs data to Google Sheets, and sends follow-up emails — all hands-free.",
      category: "Make Automation",
      technologies: ["Make.com", "Gmail", "Google Drive", "Google Sheets", "AI Processing"],
      image: null,
      video: null,
      status: "live"
    },
    {
      id: 4,
      title: "AI-Powered Content Distribution Pipeline",
      description: "Zapier multi-step workflow that monitors Google Drive for new files, uses AI by Zapier to transcribe video/audio, analyzes content, then intelligently distributes posts to Instagram and LinkedIn with proper formatting and scheduling.",
      category: "Zapier Automation",
      technologies: ["Zapier", "AI by Zapier", "Google Drive", "Instagram", "LinkedIn"],
      image: null,
      video: null,
      status: "live"
    },
    {
      id: 5,
      title: "Asana & Xero Task-to-Invoice Sync Automation",
      description: "Make.com workflow that watches completed Asana tasks, makes API calls to Xero for invoice data, routes through an iterator and router, syncs data to Google Sheets, creates CSV reports, and uploads attachments back to Asana — fully automating the task-to-invoice reporting cycle.",
      category: "Make Automation",
      technologies: ["Make.com", "Asana", "Xero", "Google Sheets", "CSV Processing"],
      image: null,
      video: null,
      status: "live"
    }
  ],

  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "Flora McGrath",
      position: "AGL Contact Manager",
      company: "AGL Retailer Australia",
      content: "John Carlo is an exceptional team member with outstanding customer service skills. His dedication to learning AI automation and applying it to our QA processes has significantly improved our team's efficiency. A true asset to any organization.",
      rating: 5,
      avatar: null,
      avatarPosition: "right center",
      featured: true,
      fullImage: "/projects/thumbnail/MY PICTURE.jpg"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      position: "Operations Manager",
      company: "TechFlow Solutions",
      content: "John's automation expertise transformed our workflow efficiency by 60%. His attention to detail and problem-solving skills are exceptional.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Director of Customer Success",
      company: "Global Services Inc.",
      content: "Working with John was a game-changer. His customer service background combined with technical automation skills delivered outstanding results.",
      rating: 5
    },
    {
      id: 4,
      name: "Flora McGrath",
      position: "Client",
      company: "",
      content: "John was great to work with and consistently delivered reliable, high-quality work. He communicates clearly, understands requirements quickly, and handles automation tasks with attention to detail.",
      rating: 5,
      avatar: "/projects/thumbnail/MY%20PICTURE.jpg"
    }
  ]
};
