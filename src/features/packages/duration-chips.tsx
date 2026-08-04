import { pricingPackages } from '@/data/packages';
import { cn } from '@/shared/lib/cn';

interface DurationChipsProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

/**
 * Versão mobile da régua.
 *
 * Arrastar um marcador de 8px numa linha fina é uma das piores interações no
 * toque. Os chips preservam a metáfora de duração — inclusive a barra de
 * preenchimento proporcional — sem exigir precisão de pixel.
 */
export function DurationChips({ activeIndex, onChange }: DurationChipsProps) {
  const active = pricingPackages[activeIndex]!;
  const fill = (active.hours / 12) * 100;

  return (
    <div className="md:hidden">
      <div
        role="radiogroup"
        aria-label="Duração da cobertura"
        className="no-bar -mx-5 flex gap-2 overflow-x-auto px-5"
      >
        {pricingPackages.map((pkg, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={pkg.id}
              role="radio"
              aria-checked={isActive}
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Pacote ${pkg.name}, ${pkg.duration}, ${pkg.price} reais`}
              className={cn(
                'meta relative h-[52px] shrink-0 border px-6 transition-colors',
                isActive
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/20 text-coffee-soft',
              )}
            >
              {pkg.hours}h
              {pkg.mostBooked && (
                <span className="bg-rec absolute top-2 right-2 size-1.5 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-ink/12 mt-5 h-px w-full">
        <div
          className="bg-gold h-px transition-all duration-350 ease-[var(--ease-cut)]"
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}
