import type { ReactNode } from 'react';

import { BurnIn } from './burn-in';
import { cn } from '@/shared/lib/cn';

interface SectionHeadProps {
  /** Timecode da seção — vem de `timeline` em config/site. */
  timecode?: string;
  label: string;
  title?: ReactNode;
  className?: string;
}

/** Cabeçalho de seção: rótulo em mono + título em Fraunces. Sem ícone. */
export function SectionHead({ timecode, label, title, className }: SectionHeadProps) {
  return (
    <header className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-baseline gap-4">
        {timecode && <span className="meta text-gold">{timecode}</span>}
        <span className="meta text-coffee-soft">{label}</span>
      </div>

      {title && (
        <BurnIn>
          <h2 className="font-display wonk text-ink text-[2.6rem] leading-[0.95] font-light sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </BurnIn>
      )}
    </header>
  );
}
