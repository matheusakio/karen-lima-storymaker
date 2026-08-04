import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  flush?: boolean;
}

export function Section({ id, className, children, flush = false }: SectionProps) {
  return (
    <section id={id} className={cn(!flush && 'py-20 sm:py-24 md:py-32 lg:py-40', className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  /** Rótulo em caixa alta. Substitui o ícone que existiria aqui. */
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/**
 * Cabeçalho de seção em duas colunas: rótulo à esquerda, conteúdo à direita.
 * Alinhamento à esquerda em tudo — centralizar enfraquece o eixo de leitura.
 */
export function SectionHeader({ label, title, description, className }: SectionHeaderProps) {
  return (
    <header className={cn('grid gap-6 md:grid-cols-12 md:gap-10', className)}>
      {label && (
        <div className="md:col-span-3">
          <span className="label">{label}</span>
        </div>
      )}

      <div className={cn('flex flex-col gap-5', label ? 'md:col-span-9' : 'md:col-span-12')}>
        <h2 className="font-display text-ink text-[2.4rem] leading-[1.02] font-light text-balance sm:text-5xl md:text-6xl lg:text-[4.5rem]">
          {title}
        </h2>

        {description && (
          <p className="text-ink-soft/85 max-w-xl text-[0.95rem] leading-[1.7] font-light">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
