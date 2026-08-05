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
import { buildRows } from './layout';
import { ProjectModal } from './project-modal';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { useIsDesktop } from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/cn';

type Filter = Category | 'all';

/**
 * Portfólio em fileiras de altura uniforme.
 *
 * Dentro de cada fileira os cards alinham em cima e embaixo; a variedade vem
 * da diferença entre fileiras. Ver `layout.ts` para o porquê desta escolha —
 * cascata não alinha e grade livre deixa buraco.
 */
export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const isDesktop = useIsDesktop();

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const rows = useMemo(() => buildRows(visible, isDesktop), [visible, isDesktop]);

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

      <div className="mt-10 flex flex-col gap-3 md:mt-14 md:gap-4">
        {rows.map((row, rowIndex) => (
          <div
            key={row.items.map((p) => p.id).join('-')}
            className="grid gap-3 md:gap-4"
            style={{ gridTemplateColumns: `repeat(${row.items.length}, minmax(0, 1fr))` }}
          >
            {row.items.map((project) => (
              <article key={project.id} className="group">
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
                    sizes={`(max-width: 768px) ${Math.round(100 / row.items.length)}vw, ${Math.round(100 / row.items.length)}vw`}
                    priority={rowIndex === 0}
                    alt={project.title}
                    className={cn(
                      'w-full transition-transform duration-[900ms] ease-[var(--ease-soft)] md:group-hover:scale-[1.02]',
                      row.aspect,
                    )}
                  />

                  {/* As peças dela têm tipografia queimada no rodapé do quadro,
                      então a legenda precisa de gradiente alto e respiro. */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(10_8_7/0.96)] via-[rgb(10_8_7/0.72)] to-transparent px-4 pt-16 pb-5 md:px-5 md:pb-6">
                    <h3 className="font-serif text-cream text-[clamp(1.05rem,1.9vw,1.45rem)] leading-tight font-normal">
                      {project.title}
                    </h3>
                    <p className="label text-cream/80 mt-1.5 text-[9.5px] font-medium">
                      {CATEGORIES[project.category]} · {project.durationLabel}
                    </p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        ))}
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
