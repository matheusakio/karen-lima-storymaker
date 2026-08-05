import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Entrada em scroll. Movimento contido — em layout editorial, deslocamento
 * grande chama mais atenção que o conteúdo.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  const variants: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.2 : 0.9,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </motion.div>
  );
}

/** Container que escalona os filhos. Use `RevealItem` dentro. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: prefersReduced ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
