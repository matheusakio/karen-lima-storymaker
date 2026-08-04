import { timeline } from '@/config/site';
import { cn } from '@/shared/lib/cn';

interface TimelineRailProps {
  activeId: string;
  progress: number;
}

/**
 * Régua de timeline — a metáfora central da direção Corte Seco.
 *
 * Desktop: coluna fixa na borda esquerda, cada seção marcada com timecode.
 * Celular: vira a barra de progresso no topo (ver `TopBar`).
 */
export function TimelineRail({ activeId, progress }: TimelineRailProps) {
  return (
    <nav
      aria-label="Navegação por seções"
      className="pointer-events-none fixed top-0 bottom-0 left-0 z-40 hidden w-14 flex-col justify-center xl:flex"
    >
      {/* trilho */}
      <span className="bg-ink/10 absolute top-24 bottom-24 left-7 w-px" />
      {/* preenchimento por progresso de scroll */}
      <span
        className="bg-gold absolute top-24 left-7 w-px transition-[height] duration-200"
        style={{ height: `calc((100% - 12rem) * ${progress})` }}
      />

      <ul className="pointer-events-auto relative flex flex-col gap-5 py-24">
        {timeline.map((section) => {
          const active = section.id === activeId;

          return (
            <li key={section.id} className="group relative flex items-center">
              <a
                href={`#${section.id}`}
                className="flex items-center gap-3 py-1"
                aria-current={active ? 'true' : undefined}
              >
                <span
                  className={cn(
                    'ml-[1.4rem] block h-px transition-all duration-300',
                    active ? 'bg-gold w-4' : 'bg-ink/25 w-2 group-hover:w-3.5',
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[0.55rem] tracking-[0.14em] whitespace-nowrap transition-all duration-300',
                    active
                      ? 'text-ink opacity-100'
                      : 'text-coffee-soft opacity-0 group-hover:opacity-100',
                  )}
                >
                  {section.timecode}
                  <span className="ml-2 uppercase">{section.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
