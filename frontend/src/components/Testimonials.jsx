import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { portfolioData } from '../mockData';
import { ScrollReveal } from '../hooks/useScrollReveal';

const FeaturedBadge = () => (
  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-3 py-1 text-xs font-semibold text-white">
    <Star className="h-3 w-3 fill-white" />
    Featured Testimonial
  </span>
);

export const Testimonials = () => {
  const { testimonials } = portfolioData;
  const featured = testimonials.find((t) => t.featured);
  const regular = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="relative py-20 bg-slate-950/60 backdrop-blur-[2px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Client Testimonials
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              What clients say about working with me
            </p>
          </div>
        </ScrollReveal>

        {/* Equal-size featured cards; DOM order also defines the mobile order. */}
        {featured && (
          <ScrollReveal>
            <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
              <Card
                id="kameron-testimonial"
                data-testid="testimonial-featured-kameron-card"
                className="flex min-w-0 flex-col overflow-hidden border-slate-700 bg-slate-800/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 sm:p-6"
              >
                <FeaturedBadge />
                <div className="flex flex-1 items-center justify-center py-5">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster="/projects/thumbnail/kameron-testimonial.jpg"
                    src="/projects/thumbnail/testimonial.mp4"
                    aria-label="Video testimonial from Kameron Jones, Founder of Nxtlvl Mobile Detail"
                    className="block h-auto max-h-[520px] w-auto max-w-full rounded-lg bg-black object-contain"
                  >
                    Your browser does not support embedded video.{' '}
                    <a href="/projects/thumbnail/testimonial.mp4">Download Kameron's testimonial video</a>.
                  </video>
                </div>
                <div className="mt-auto border-t border-slate-700 pt-5">
                  <div className="mb-1 text-xl font-semibold text-white">Kameron Jones</div>
                  <div className="text-sm font-medium text-teal-400">Founder</div>
                  <div className="text-sm text-slate-500">Nxtlvl Mobile Detail</div>
                </div>
              </Card>

              <Card
                id="flora-testimonial"
                data-testid="testimonial-featured-card"
                className="flex min-w-0 flex-col overflow-hidden border-slate-700 bg-slate-800/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 sm:p-6"
              >
                <FeaturedBadge />
                <img
                  src="/projects/thumbnail/MY%20PICTURE.jpg"
                  alt={`John Carlo with ${featured.name}`}
                  className="mx-auto my-5 block h-auto max-h-[260px] w-auto max-w-full rounded-lg object-contain"
                  decoding="async"
                />
                <div className="mb-4 flex gap-1" aria-label={`${featured.rating} out of 5 stars`}>
                  {[...Array(featured.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-lg italic leading-relaxed text-slate-200">
                  &ldquo;{featured.content}&rdquo;
                </p>
                <div className="mt-auto border-t border-slate-700 pt-5">
                  <div className="mb-1 text-xl font-semibold text-white">{featured.name}</div>
                  <div className="text-sm font-medium text-teal-400">{featured.position}</div>
                  <div className="text-sm text-slate-500">{featured.company}</div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        )}

        {/* Regular Testimonials Grid */}
        {regular.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {regular.map((testimonial, idx) => (
              <ScrollReveal key={testimonial.id} delay={idx * 100}>
              <Card
                data-testid={`testimonial-card-${testimonial.id}`}
                className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm group h-full"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                    <Quote className="w-6 h-6 text-teal-400" />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="border-t border-slate-700 pt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/30 to-emerald-500/30 flex items-center justify-center text-teal-300 font-semibold flex-shrink-0 overflow-hidden">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        testimonial.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white mb-0.5 truncate">{testimonial.name}</div>
                      <div className="text-sm text-teal-400 truncate">{testimonial.position}</div>
                      <div className="text-xs text-slate-500 truncate">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
