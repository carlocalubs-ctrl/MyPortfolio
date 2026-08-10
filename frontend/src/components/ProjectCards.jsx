import { Link } from "react-router-dom";
import { ArrowRight, Code2, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const ProjectStatusBadge = ({ status }) => {
  const isLive = status === "Live";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        isLive
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          : "border-slate-600 bg-slate-900/60 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
};

export const ProjectTags = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-xs text-slate-300 bg-slate-800/70 border border-slate-700 rounded-md hover:border-teal-500/50 hover:text-teal-300 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const ProjectThumbnail = ({ image, title, thumbnailStyle }) => {
  const isLogoThumbnail = thumbnailStyle === "logo";
  const isCoverThumbnail = thumbnailStyle === "cover";

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-900">
      {image ? (
        <img
          src={image}
          alt={title}
          className={
            isLogoThumbnail
              ? "absolute left-1/2 top-1/2 h-auto w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-contain object-center"
              : isCoverThumbnail
                ? "h-full w-full object-cover object-center"
                : "h-full w-full object-contain object-center"
          }
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 p-8">
          <div className="text-center">
            <Code2 className="mx-auto mb-4 h-10 w-10 text-teal-300" />
            <div className="text-lg font-semibold leading-tight text-white">
              {title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProjectCard = ({ project }) => {
  const isClickable = Boolean(project.path);
  const hasDemo = Boolean(project.demoUrl);
  const hasDemoPath = Boolean(project.demoPath);

  return (
    <Card className="h-full overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-xs font-mono text-teal-400">
            PROJECT {project.id}
          </span>
          <ProjectStatusBadge status={project.status} />
        </div>
        <ProjectThumbnail
          image={project.image}
          title={project.title}
          thumbnailStyle={project.thumbnailStyle}
        />
        <CardTitle className="pt-2 text-2xl text-white">
          {project.title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-slate-400">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProjectTags tags={project.technologies} />
        {isClickable ? (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 font-medium text-white hover:from-teal-600 hover:to-emerald-600"
            >
              <Link to={project.path}>
                View Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {hasDemo && (
              <Button
                asChild
                variant="outline"
                className="border-slate-700 px-6 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </a>
              </Button>
            )}
            {!hasDemo && hasDemoPath && (
              <Button
                asChild
                variant="outline"
                className="border-slate-700 px-6 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Link to={project.demoPath}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <Button
            disabled
            variant="outline"
            className="border-slate-700 px-6 text-slate-500"
          >
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
