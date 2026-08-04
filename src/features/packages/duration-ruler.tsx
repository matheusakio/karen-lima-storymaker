import { useCallback, type KeyboardEvent } from 'react';

import { pricingPackages } from '@/data/packages';
import { cn } from '@/shared/lib/cn';

interface DurationRulerProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

const MAX_HOURS = 12;

/**
 * Régua de duração — desktop.
 *
 * O produto da Karen não varia em features, varia em TEMPO. Quatro cards lado
 * a lado escondem isso; a régua torna a duração a própria interface.
 *
 * Acessível: radiogroup navegável por setas, com rótulo falado completo.
 */
export function DurationRuler({ activeIndex, onChange }: DurationRulerProps) {
  const active = pricingPackages[activeIndex]!;
  const fill = (active.hours / MAX_HOURS) * 100;

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        onChange(Math.min(activeIndex + 1, pricingPackages.length - 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        onChange(Math.max(activeIndex - 1, 0));
      }
      if (event.key === 'Home') onChange(0);
      if (event.key === 'End') onChange(pricingPackages.length - 1);
    },
    [activeIndex, onChange],
  );

  return (
    <div
      role="radiogroup"
      aria-label="Duração da cobertura"
      onKeyDown={onKeyDown}
      className="relative hidden pt-4 pb-2 md:block"
    >
      {/* trilho */}
      <div className="bg-ink/15 absolute top-1/2 right-0 left-0 h-px" />
      {/* preenchimento até o marcador ativo */}
      <div
        className="bg-gold absolute top-1/2 left-0 h-px transition-all duration-350 ease-[var(--ease-cut)]"
        style={{ width: `${fill}%` }}
      />

      <div className="relative flex justify-between">
        {pricingPackages.map((pkg, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={pkg.id}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Pacote ${pkg.name}, ${pkg.duration}, ${pkg.price} reais`}
              className="group relative flex flex-col items-center gap-4 pt-0"
              style={{
                // posiciona proporcionalmente à duração, não em espaçamento igual
                position: 'absolute',
                left: `${(pkg.hours / MAX_HOURS) * 100}%`,
                transform: 'translateX(-50%)',
                top: '-0.75rem',
              }}
            >
              <span
                className={cn(
                  'grid size-4 place-items-center rounded-full border transition-all duration-350',
                  isActive
                    ? 'border-gold bg-ink scale-125'
                    : 'border-ink/30 bg-paper group-hover:border-ink',
                )}
              >
                {pkg.mostBooked && <span className="bg-rec size-1.5 rounded-full" />}
              </span>

              <span className="flex flex-col items-center gap-1 whitespace-nowrap">
                <span
                  className={cn(
                    'meta transition-colors',
                    isActive ? 'text-ink' : 'text-coffee-soft',
                  )}
                >
                  {pkg.hours}h
                </span>
                {pkg.mostBooked && (
                  <span className="meta text-rec text-[0.5rem]">mais contratado</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* reserva de altura para os marcadores posicionados em absolute */}
      <div className="h-16" />
    </div>
  );
}
