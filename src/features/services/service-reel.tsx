import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { projects } from '@/data/projects';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';
import { cn } from '@/shared/lib/cn';

const byId = new Map(projects.map((p) => [p.id, p]));

interface ServiceReelProps {
  /** Ids do catálogo que compõem a sequência deste serviço. */
  gallery: readonly string[];
  active: boolean;
  className?: string;
}

/** Tempo de cada peça antes de trocar. */
const DWELL_MS = 2400;

/**
 * Sequência de mídias que passa enquanto o serviço está em foco.
 *
 * Nada aqui fica estático: o item visível é um vídeo em loop, e a cada poucos
 * segundos entra o próximo com dissolve curto. Quando o serviço perde o foco,
 * o ciclo para e o vídeo pausa — só um toca por vez no site todo.
 *
 * Sob `prefers-reduced-motion` o ciclo não avança sozinho: fica a primeira
 * peça, parada.
 */
export function ServiceReel({ gallery, active, className }: ServiceReelProps) {
  const [index, setIndex] = useState(0);
  const { reducedMotion } = useMediaPolicy();

  const items = gallery.map((id) => byId.get(id)).filter((p): p is NonNullable<typeof p> => !!p);

  useEffect(() => {
    if (!active || reducedMotion || items.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      DWELL_MS,
    );
    return () => window.clearInterval(timer);
  }, [active, reducedMotion, items.length]);

  // ao sair de foco, volta para o começo da sequência
  useEffect(() => {
    if (!active) setIndex(0);
  }, [active]);

  if (items.length === 0) return null;
  const current = items[index] ?? items[0]!;

  return (
    <div className={cn('relative overflow-hidden bg-black', className)}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.2, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <AutoVideo
            id={`reel-${current.id}`}
            src={current.previewVideo}
            poster={current.poster}
            poster2x={current.poster2x}
            posterFallback={current.posterFallback}
            sizes="(max-width: 768px) 100vw, 320px"
            alt={current.title}
            className="h-full w-full"
            always={active}
          />
        </motion.div>
      </AnimatePresence>

      {/* marcadores de posição na sequência */}
      {items.length > 1 && active && (
        <div className="absolute bottom-2 left-2 flex gap-1" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={item.id}
              className={cn(
                'h-px w-3 transition-colors duration-300',
                i === index ? 'bg-gold' : 'bg-cream/25',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
