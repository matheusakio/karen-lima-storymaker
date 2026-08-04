import { projects } from '@/data/projects';
import { cn } from '@/shared/lib/cn';

/** Clipes curtos de bastidor — os mais curtos do acervo. */
const STRIP = ['v054', 'v053', 'v058', 'v050', 'v067', 'v001']
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

/**
 * Bastidores — tira horizontal com alturas alternadas.
 * Mostra que videomaker mobile é escolha profissional, não limitação.
 */
export function Behind() {
  return (
    <section id="bastidores" className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex items-baseline gap-4">
          <span className="meta text-gold">19:00</span>
          <span className="meta text-coffee-soft">Bastidores</span>
        </div>
      </div>

      <div className="no-bar mt-10 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
        {STRIP.map((project, index) => (
          <figure
            key={project.id}
            className={cn(
              'shrink-0 snap-start',
              index % 2 === 0 ? 'w-[52vw] sm:w-64' : 'w-[44vw] sm:w-52 lg:mt-12',
            )}
          >
            <div
              className={cn(
                'bg-cream w-full overflow-hidden',
                index % 2 === 0 ? 'aspect-[9/16]' : 'aspect-[4/5]',
              )}
            >
              <img
                src={project.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="meta text-coffee-soft mt-2">
              {project.durationLabel}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
