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
 * Alturas dos módulos da cascata.
 * Cinco degraus em vez de dois: com só duas alturas o empacotamento voltava a
 * parecer grade regular.
 */
const HEIGHTS: Record<Project['shape'], string> = {
  square: 'aspect-[1/1]',
  wide: 'aspect-[4/5]',
  mid: 'aspect-[3/4]',
  tall: 'aspect-[9/16]',
  xtall: 'aspect-[2/3.4]',
};

/**
 * Portfólio em cascata de alturas variadas.
 * Nunca alinha em fileiras — é o oposto da grade do Instagram — e, por usar
 * `columns` em vez de CSS Grid, também nunca deixa célula vazia.
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
                  active
                    ? 'border-gold text-cream'
                    : 'text-warm hover:text-cream border-transparent',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colunas em cascata, não CSS Grid.
          A grade queria que as fileiras fechassem: com peças de alturas
          diferentes e número que não divide, sempre sobrava um vão escuro.
          `columns` empacota alturas variadas preenchendo de cima para baixo —
          buraco não acontece, seja qual for a quantidade ou o filtro ativo.
          É o que permite manter os tamanhos diferentes que você gostou. */}
      <div className="mt-10 columns-2 gap-3 md:mt-14 md:columns-3 md:gap-4">
        {visible.map((project) => {
          const height = HEIGHTS[project.shape];

          return (
            <article
              key={project.id}
              className="group mb-3 break-inside-avoid md:mb-4"
            >
              <button
                type="button"
                onClick={() => setOpen(project)}
                aria-label={`Abrir ${project.title}`}
                className="relative block w-full overflow-hidden text-left"
              >
                <AutoVideo
                  id={project.id}
                  src={project.previewVideo}
                  poster={project.poster}
                  poster2x={project.poster2x}
                  posterFallback={project.posterFallback}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  alt={project.title}
                  className={cn(
                    'w-full transition-transform duration-[900ms] ease-[var(--ease-soft)] md:group-hover:scale-[1.02]',
                    height,
                  )}
                />

                {/* Legenda com respiro maior: as peças dela têm tipografia
                  queimada no rodapé do quadro e o texto do site colava nela. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(10_8_7/0.92)] via-[rgb(10_8_7/0.55)] to-transparent px-4 pt-12 pb-5 md:px-5 md:pb-6">
                  <h3 className="font-serif text-[clamp(1rem,1.8vw,1.4rem)] leading-tight font-light">
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
