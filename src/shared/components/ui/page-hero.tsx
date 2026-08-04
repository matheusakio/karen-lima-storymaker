import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface PageHeroProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Cabeçalho das páginas internas. Mesmo eixo tipográfico do hero da home. */
export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="container-page pt-32 pb-12 md:pt-44 md:pb-16">
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="label block"
      >
        {label}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.08, ease: EASE }}
        className="font-display text-ink mt-6 max-w-4xl text-[2.8rem] leading-[0.98] font-light text-balance sm:text-6xl md:text-7xl lg:text-[6rem]"
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-ink-soft/85 mt-8 max-w-xl text-[0.95rem] leading-[1.7] font-light md:text-base"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        className="bg-ink/15 mt-12 h-px w-full origin-left"
      />
    </section>
  );
}
