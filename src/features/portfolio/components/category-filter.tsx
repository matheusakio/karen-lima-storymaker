import { activeCategories, CATEGORIES, type Category } from '@/data/media';
import { cn } from '@/shared/lib/cn';

export type FilterValue = Category | 'all';

interface CategoryFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  countFor: (value: FilterValue) => number;
}

/** Filtro tipográfico: sublinhado marca o ativo. Sem pílula, sem fundo. */
export function CategoryFilter({ value, onChange, countFor }: CategoryFilterProps) {
  const options: { key: FilterValue; label: string }[] = [
    { key: 'all', label: 'Tudo' },
    ...activeCategories.map((category) => ({
      key: category as FilterValue,
      label: CATEGORIES[category],
    })),
  ];

  if (activeCategories.length <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Filtrar por categoria"
      className="-mx-5 flex items-center gap-7 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {options.map((option) => {
        const active = value === option.key;

        return (
          <button
            key={option.key}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(option.key)}
            className={cn(
              'h-11 shrink-0 border-b whitespace-nowrap transition-colors duration-300',
              'text-[0.65rem] tracking-[0.26em] uppercase',
              active ? 'border-ink text-ink' : 'text-ink-mute hover:text-ink border-transparent',
            )}
          >
            {option.label}
            <span className="ml-2 align-super text-[0.55em] tracking-normal opacity-60">
              {countFor(option.key)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
