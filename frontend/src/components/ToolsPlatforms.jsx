import { ScrollReveal } from "../hooks/useScrollReveal";

const logoBasePath = "/projects/Logo";

const toolRows = [
  {
    label: "Automation and operations platforms",
    direction: "left",
    tools: [
      { name: "GoHighLevel", logo: `${logoBasePath}/GoHighLevel.svg` },
      { name: "n8n", logo: `${logoBasePath}/n8n.svg` },
      { name: "Make", logo: `${logoBasePath}/Make.svg` },
      { name: "Zapier", logo: `${logoBasePath}/Zapier_.svg` },
      { name: "Vapi AI", logo: `${logoBasePath}/Vapi_.svg` },
      { name: "Twilio", logo: `${logoBasePath}/Twilio.svg` },
      { name: "ElevenLabs", logo: `${logoBasePath}/ElevenLabs_.svg` },
      { name: "Deepgram", logo: `${logoBasePath}/Deepgram.svg` },
      { name: "HubSpot", logo: `${logoBasePath}/Hubspot.svg` },
      { name: "Salesforce", logo: `${logoBasePath}/Salesforce_.svg` },
    ],
  },
  {
    label: "AI, creative, and productivity platforms",
    direction: "right",
    tools: [
      { name: "ChatGPT", logo: `${logoBasePath}/Chatgpt_.svg` },
      { name: "Claude", logo: `${logoBasePath}/Claude.svg` },
      { name: "Gemini", logo: `${logoBasePath}/gemini.svg` },
      { name: "Higgsfield", logo: `${logoBasePath}/Higgsfield.svg` },
      { name: "Codex", logo: `${logoBasePath}/Codex_.svg` },
      { name: "GitHub", logo: `${logoBasePath}/Github_.svg` },
      { name: "Lovable", logo: `${logoBasePath}/lovable.svg` },
      { name: "Vercel", logo: `${logoBasePath}/Vercel_.svg` },
      { name: "Visual Studio", logo: `${logoBasePath}/Visual Studio.svg` },
      { name: "Airtable", logo: `${logoBasePath}/airtable.svg` },
      { name: "Asana", logo: `${logoBasePath}/Asana.svg` },
      { name: "Google Workspace", logo: `${logoBasePath}/Google workspace.svg` },
      { name: "Canva", logo: `${logoBasePath}/Canva.svg` },
      { name: "Systeme.io", logo: `${logoBasePath}/System.io.svg` },
      { name: "Nanobanana", logo: `${logoBasePath}/nanobanana.svg` },
    ],
  },
];

const ToolCard = ({ tool }) => {
  return (
    <div className="tool-platform-card group">
      <div className="tool-platform-mark">
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          className="tool-platform-logo"
          loading="lazy"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
        {tool.name}
      </span>
    </div>
  );
};

export const ToolsPlatforms = () => {
  return (
    <section
      id="tools-platforms"
      className="relative overflow-hidden py-20 bg-slate-950/60 backdrop-blur-[2px]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Automation & CRM Tech Stack
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Platforms I use to build intelligent automations, CRM workflows, AI voice systems, and business integrations.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="tools-marquee-rows" aria-label="Tools and platforms">
            {toolRows.map((row) => (
              <div className="tools-marquee" key={row.label} aria-label={row.label}>
                <div className="tool-platform-fade tool-platform-fade-left" />
                <div className="tool-platform-fade tool-platform-fade-right" />
                <div className={`tools-marquee-track tools-marquee-${row.direction}`}>
                  <div className="tools-marquee-set">
                    {row.tools.map((tool) => (
                      <ToolCard key={tool.name} tool={tool} />
                    ))}
                  </div>

                  <div className="tools-marquee-set" aria-hidden="true">
                    {row.tools.map((tool) => (
                      <ToolCard key={`${tool.name}-duplicate`} tool={tool} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
