import { motion } from 'motion/react';
import type { ReactNode } from 'react';

import { useMediaPolicy } from '@/shared/hooks/use-media-policy';

interface BurnInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Anima ao montar (hero) em vez de esperar o scroll. */
  immediate?: boolean;
}

/**
 * Revelação de baixo para cima por clip-path — o gesto de uma legenda queimada
 * aparecendo no vídeo. É a animação-assinatura da direção Corte Seco.
 */
export function BurnIn({ children, delay = 0, className, immediate = false }: BurnInProps) {
  const { reducedMotion } = useMediaPolicy();

  const variants = {
    hidden: reducedMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: 12 },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.2 : 0.75,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, margin: '-60px' } })}
    >
      {children}
    </motion.div>
  );
}

/** Entrada sóbria de bloco: opacidade + 20px. */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { reducedMotion } = useMediaPolicy();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.8,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
