import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollReveal } from "../hooks/useScrollReveal";

export const ProjectWalkthrough = ({ video }) => (
  <ScrollReveal>
    <Card id="walkthrough" className="border-slate-700 bg-slate-800/50 backdrop-blur-sm scroll-mt-28">
      <CardHeader>
        <CardTitle className="text-2xl text-white">{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <video
          aria-label={video.title}
          className="block h-auto w-full max-w-full rounded-lg border border-slate-700 bg-black object-contain"
          controls
          preload="metadata"
          playsInline
        >
          <source src={video.src} type={video.type} />
          Your browser does not support embedded video. <a href={video.src}>Open the walkthrough video</a>.
        </video>
      </CardContent>
    </Card>
  </ScrollReveal>
);
