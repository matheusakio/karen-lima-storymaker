import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { Button } from '@/shared/components/ui/button';

/** Seleção editorial — nunca o feed embutido do Instagram. */
const SELECTION = ['v070', 'v063', 'v069', 'v053', 'v050', 'v064']
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Instagram() {
  return (
    <section id="instagram" className="container-page py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="meta text-gold">21:45</span>
            <span className="meta text-coffee-soft">No Instagram</span>
          </div>
          <p className="font-display text-ink mt-4 text-3xl font-light md:text-4xl">
            {siteConfig.social.instagram.label}
          </p>
        </div>

        <Button
          as="a"
          href={siteConfig.social.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
        >
          Acompanhar
          <ArrowUpRight className="size-3.5" />
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SELECTION.map((project) => (
          <a
            key={project.id}
            href={siteConfig.social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cream aspect-[4/5] overflow-hidden"
          >
            <img
              src={project.poster}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-cut)] hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
