import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  activeCategories,
  CATEGORIES,
  PORTFOLIO_DRIVE,
  projects,
  type Category,
  type Project,
} from '@/data/projects';
import { ProjectModal } from './project-modal';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { cn } from '@/shared/lib/cn';

type Filter = Category | 'all';

/**
 * Grade editorial assimétrica: um módulo largo (4:5) ao lado de dois estreitos
 * (9:16), alternando o lado a cada fileira. Nunca alinha em linhas iguais —
 * é o oposto da grade do Instagram.
 */
export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const options: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Tudo' },
    ...activeCategories.map((c) => ({ key: c as Filter, label: CATEGORIES[c] })),
  ];

  return (
    <section id="trabalhos" className="page py-20 md:py-28 lg:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,3.5rem)] leading-none font-light">
          Trabalhos
        </h2>

        <div
          role="tablist"
          aria-label="Filtrar por categoria"
          className="rail -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {options.map((option) => {
            const active = filter === option.key;
            return (
              <button
                key={option.key}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(option.key)}
                className={cn(
                  'label h-11 shrink-0 border-b whitespace-nowrap transition-colors',
                  active ? 'border-gold text-cream' : 'text-warm hover:text-cream border-transparent',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-3.5">
        {visible.map((project, index) => {
          // módulo largo ocupa duas colunas; alterna o lado a cada fileira
          const wide = project.shape === 'wide';
          return (
            <article
              key={project.id}
              className={cn('group', wide && 'col-span-2', index % 6 === 3 && 'md:col-start-1')}
            >
              <button
                type="button"
                onClick={() => setOpen(project)}
                aria-label={`Abrir ${project.title}`}
                className="relative block w-full text-left"
              >
                <AutoVideo
                  id={project.id}
                  src={project.previewVideo}
                  poster={project.poster}
                  poster2x={project.poster2x}
                  posterFallback={project.posterFallback}
                  sizes={wide ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  alt={project.title}
                  className={cn(
                    'w-full transition-transform duration-[900ms] ease-[var(--ease-soft)] md:group-hover:scale-[1.02]',
                    wide ? 'aspect-[4/5] md:aspect-[16/11]' : 'aspect-[9/16]',
                  )}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(10_8_7/0.86)] to-transparent p-4 md:p-5">
                  <h3 className="font-serif text-[clamp(1rem,2vw,1.5rem)] leading-tight font-light">
                    {project.title}
                  </h3>
                  <p className="label text-cream/60 mt-1.5 text-[9.5px]">
                    {CATEGORIES[project.category]} · {project.durationLabel}
                  </p>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {/* O site mostra uma curadoria; o acervo completo vive no Drive dela. */}
      <div className="mt-12 flex justify-center md:mt-16">
        <a
          href={PORTFOLIO_DRIVE}
          target="_blank"
          rel="noopener noreferrer"
          className="label border-cream/25 text-cream hover:border-gold hover:text-gold inline-flex h-12 items-center gap-3 border px-8 transition-colors duration-400"
        >
          Ver portfólio completo
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
