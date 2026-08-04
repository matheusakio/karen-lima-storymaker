import { cn } from '@/shared/lib/cn';

interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

/** Faixa infinita de especialidades. CSS puro, sem custo de JS. */
export function Marquee({ items, className }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn('border-ink/12 group relative flex overflow-hidden border-b py-5', className)}
      aria-hidden="true"
    >
      <div className="animate-strip flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="meta text-coffee-soft flex items-center gap-10 whitespace-nowrap"
          >
            {item}
            <span className="bg-gold/50 h-px w-5" />
          </span>
        ))}
      </div>
    </div>
  );
}
