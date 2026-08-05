import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

import { CATEGORIES, type MediaItem } from '@/data/media';
import { VideoPlayer } from '@/shared/components/ui/video-player';
import { useLockBodyScroll } from '@/shared/hooks/use-lock-body-scroll';

interface MediaLightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  useLockBodyScroll(Boolean(item));

  useEffect(() => {
    if (!item) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-paper fixed inset-0 z-[60] overflow-y-auto"
          onClick={onClose}
        >
          <div className="container-page flex min-h-full flex-col py-6 md:py-10">
            <div className="mb-6 flex items-center justify-between md:mb-10">
              <span className="label">{CATEGORIES[item.category]}</span>

              <button
                type="button"
                onClick={onClose}
                className="text-ink hover:text-ink-mute h-11 text-[0.65rem] tracking-[0.28em] uppercase transition-colors"
              >
                Fechar
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="flex flex-1 flex-col items-center gap-8 md:flex-row md:items-start md:gap-14"
            >
              <div className="bg-paper-soft aspect-[9/16] h-[58dvh] w-auto shrink-0 overflow-hidden md:h-[74dvh]">
                {item.kind === 'video' ? (
                  <VideoPlayer
                    src={item.src}
                    poster={item.poster ?? undefined}
                    title={item.title}
                    ambient
                  />
                ) : (
                  <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                )}
              </div>

              <div className="flex max-w-sm flex-col gap-4 md:pt-8">
                <h2 className="font-display text-ink text-3xl leading-tight font-light md:text-5xl">
                  {item.title}
                </h2>

                {item.client && <p className="text-ink-mute text-sm font-light">{item.client}</p>}

                {item.description && (
                  <>
                    <span className="rule my-1" />
                    <p className="text-ink-soft/85 text-[0.95rem] leading-[1.7] font-light">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
