import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { portfolioData } from '../mockData';
import { ProjectCategoryNav } from './ProjectCategoryNav';
import { ScrollReveal } from '../hooks/useScrollReveal';

export const Works = () => {
  const { projectCategories } = portfolioData;

  return (
    <section id="works" className="relative py-24 bg-slate-900/60 backdrop-blur-[2px] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="inline-block w-8 h-[2px] bg-teal-400"></span>
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
                Portfolio
              </span>
              <span className="inline-block w-8 h-[2px] bg-teal-400"></span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Featured
              </span>{' '}
              <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent italic">
                Projects
              </span>
            </h2>
            <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto">
              Real-world automation workflows I&apos;ve built and deployed for clients
            </p>
            <ProjectCategoryNav activeCategory="all" />
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-32">
          {projectCategories.map((project, index) => {
            const isReversed = index % 2 === 1;
            const isGoHighLevelProject = project.id === 'gohighlevel';

            return (
              <ScrollReveal
                key={project.id}
                delay={50}
                direction={isReversed ? 'left' : 'right'}
                distance={40}
              >
                <div
                  data-testid={`project-row-${project.id}`}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  <div
                    className="lg:col-span-7 [direction:ltr] group relative"
                    data-testid={`project-thumbnail-${project.id}`}
                  >
                    <div className="absolute -top-8 -left-2 lg:-left-4 text-[8rem] lg:text-[10rem] font-bold text-teal-500/10 leading-none pointer-events-none select-none z-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 group-hover:border-teal-500/50 transition-all duration-500 bg-slate-900 shadow-2xl shadow-black/40 z-10">
                      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/0 via-emerald-500/30 to-cyan-500/0 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

                      <div className="relative aspect-[16/10] overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`w-full h-full object-center transition-transform duration-700 ${
                              isGoHighLevelProject
                                ? 'object-contain'
                                : 'object-cover group-hover:scale-105'
                            }`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 flex items-center justify-center p-8">
                            <div className="text-center">
                              <Code2 className="w-12 h-12 text-teal-300 mx-auto mb-4" />
                              <div className="text-white text-xl sm:text-2xl font-semibold leading-tight">
                                {project.title}
                              </div>
                              <div className="mt-3 text-teal-300 text-sm font-medium">
                                {project.category}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-sm font-medium bg-teal-500/90 backdrop-blur px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <ArrowUpRight className="w-4 h-4" /> View Projects
                        </div>

                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <Badge className="bg-slate-900/80 backdrop-blur text-teal-300 border border-teal-500/30 px-3 py-1">
                            {project.category}
                          </Badge>
                        </div>
                        {project.status === 'live' && (
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-full border border-emerald-500/30">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            <span className="text-xs text-emerald-300 font-medium">Live</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 [direction:ltr]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-teal-400">
                        / Category {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 h-px bg-gradient-to-r from-teal-500/40 to-transparent"></span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs text-slate-300 bg-slate-800/70 border border-slate-700 rounded-md hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        asChild
                        data-testid={`project-explore-${project.id}`}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-6 group"
                      >
                        <Link to={project.path}>
                          View Projects
                          <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
