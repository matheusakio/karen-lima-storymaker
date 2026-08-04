import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type Variant = 'solid' | 'outline' | 'invert' | 'bare';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-ink-soft',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  invert: 'bg-paper text-ink hover:bg-sand',
  bare: 'text-ink underline-offset-[7px] hover:underline',
};

/** Alturas ≥ 48px: alvo de toque confortável. */
const SIZES: Record<Size, string> = {
  sm: 'h-12 px-6 text-[0.62rem]',
  md: 'h-[52px] px-7 text-[0.65rem]',
  lg: 'h-14 px-8 text-[0.68rem]',
};

interface OwnProps<T extends ElementType> {
  as?: T;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonProps<T extends ElementType> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? 'button') as ElementType;

  return (
    <Component
      className={cn(
        'font-mono inline-flex items-center justify-center gap-3 tracking-[0.22em] uppercase',
        'transition-colors duration-400 ease-[var(--ease-cut)]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANTS[variant],
        variant !== 'bare' && SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
