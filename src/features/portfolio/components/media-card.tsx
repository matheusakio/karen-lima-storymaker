import { motion } from 'motion/react';
import { useRef, useState } from 'react';

import { CATEGORIES, type MediaItem } from '@/data/media';
import { MediaPlaceholder } from '@/shared/components/ui/media-placeholder';
import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { cn } from '@/shared/lib/cn';

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  /** Índice usado só para escalonar a entrada. */
  index?: number;
}

/**
 * Card do portfólio.
 *
 * Proporção fixa 9:16 para toda a grade — misturar vertical e horizontal
 * produzia alturas irregulares e quebrava a leitura. Vídeo horizontal entra
 * com corte central (object-cover).
 *
 * A legenda fica FORA da imagem, abaixo dela, como em catálogo impresso.
 * Isso elimina o gradiente escuro sobre a mídia e o risco de texto sobreposto.
 */
export function MediaCard({ item, onSelect, index = 0 }: MediaCardProps) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const canHover = useHoverCapable();

  const isVideo = item.kind === 'video';

  const startPreview = () => {
    if (!isVideo || !canHover) return;
    setPreviewing(true);
    void previewRef.current?.play().catch(() => setPreviewing(false));
  };

  const stopPreview = () => {
    if (!isVideo || !canHover) return;
    setPreviewing(false);
    const element = previewRef.current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="bg-paper-soft relative block aspect-[9/16] w-full overflow-hidden text-left"
      >
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[var(--ease-editorial)]',
              previewing ? 'opacity-0' : 'opacity-100 md:group-hover:scale-[1.03]',
            )}
          />
        ) : (
          <MediaPlaceholder caption={item.title} className="absolute inset-0" />
        )}

        {isVideo && canHover && (
          <video
            ref={previewRef}
            src={item.src}
            muted
            loop
            playsInline
            preload="none"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
              previewing ? 'opacity-100' : 'opacity-0',
            )}
          />
        )}

        {/* Rótulo textual no lugar do ícone de play. */}
        {isVideo && (
          <span className="bg-paper/90 text-ink absolute bottom-0 left-0 px-4 py-2.5 text-[0.58rem] tracking-[0.28em] uppercase transition-colors duration-500 md:group-hover:bg-ink md:group-hover:text-paper">
            Assistir
          </span>
        )}
      </button>

      <div className="mt-4 flex flex-col gap-1">
        <span className="label text-[0.58rem]">{CATEGORIES[item.category]}</span>

        <h3 className="font-display text-ink text-xl leading-tight font-light md:text-2xl">
          {item.title}
        </h3>

        {item.client && (
          <p className="text-ink-mute text-[0.8rem] font-light">{item.client}</p>
        )}
      </div>
    </motion.article>
  );
}
