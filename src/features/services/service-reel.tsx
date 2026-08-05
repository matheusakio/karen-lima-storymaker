import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

import { projects } from '@/data/projects';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';
import { cn } from '@/shared/lib/cn';

const byId = new Map(projects.map((p) => [p.id, p]));

interface ServiceReelProps {
  /** Ids do catálogo que compõem a sequência deste serviço. */
  gallery: readonly string[];
  /**
   * Alterna entre as peças da sequência. Use só onde há UM reel em foco por
   * vez — no desktop, o item sob o cursor.
   */
  cycle?: boolean;
  /**
   * Fura a fila de reprodução e toca sempre.
   *
   * ⚠️ Só para o reel único em foco no desktop. Ligar isso em vários reels ao
   * mesmo tempo — como aconteceria na lista empilhada do celular — faria todos
   * decodificarem em paralelo, que é justamente o que trava o aparelho.
   */
  priority?: boolean;
  className?: string;
}

/** Tempo de cada peça antes de trocar. */
const DWELL_MS = 2400;

/**
 * Sequência de mídias de um serviço.
 *
 * Sem `cycle`, mostra a primeira peça e deixa a fila global decidir quando
 * tocar — é o modo usado na lista do celular, onde há cinco reels visíveis.
 */
export function ServiceReel({ gallery, cycle = false, priority = false, className }: ServiceReelProps) {
  const [index, setIndex] = useState(0);
  const { reducedMotion } = useMediaPolicy();

  // `gallery` é uma constante do módulo, então a lista resolvida também pode
  // ser estável — sem isto o array era recriado a cada render e reiniciava o
  // efeito do temporizador.
  const items = useMemo(
    () => gallery.map((id) => byId.get(id)).filter((p): p is NonNullable<typeof p> => !!p),
    [gallery],
  );

  useEffect(() => {
    if (!cycle || reducedMotion || items.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), DWELL_MS);
    return () => window.clearInterval(timer);
  }, [cycle, reducedMotion, items.length]);

  useEffect(() => {
    if (!cycle) setIndex(0);
  }, [cycle]);

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
            always={priority}
          />
        </motion.div>
      </AnimatePresence>

      {cycle && items.length > 1 && (
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
