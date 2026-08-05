import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { CATEGORIES, type Project } from '@/data/projects';
import { useLockBodyScroll } from '@/shared/hooks/use-lock-body-scroll';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const EASE = [0.2, 1, 0.3, 1] as const;

/**
 * Abertura do projeto.
 *
 * Enxuta de propósito: quem clicou quer ver o filme, não ler uma ficha. Saíram
 * a tabela de metadados e a duração — o vídeo já mostra o tempo dele. Restam o
 * título, uma linha de contexto e, quando existe, uma frase sobre a peça.
 *
 * A entrada é encenada: o fundo escurece, o vídeo cresce de leve a partir do
 * centro e o texto sobe depois — três tempos em vez de tudo aparecendo junto.
 *
 * O vídeo completo só existe aqui dentro, montado ao abrir e desmontado ao
 * fechar; nada pesado entra no carregamento da página.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { canAutoplay } = useMediaPolicy();

  useLockBodyScroll(Boolean(project));

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-[rgb(10_8_7/0.97)] backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-cream/60 hover:text-cream fixed top-4 right-4 z-10 grid size-11 place-items-center transition-colors md:top-6 md:right-6"
          >
            <X className="size-5" />
          </button>

          <div
            className="flex min-h-full flex-col items-center justify-center px-5 py-16 md:py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE }}
              /* `object-contain`: as peças dela têm tipografia queimada no
                 rodapé do quadro, e qualquer corte come o título. */
              className="aspect-[9/16] h-[56dvh] w-auto overflow-hidden bg-black sm:h-[64dvh] md:h-[72dvh]"
            >
              <video
                src={project.fullVideo}
                poster={project.posterFallback}
                controls
                autoPlay={canAutoplay}
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
              className="mt-7 flex max-w-lg flex-col items-center text-center"
            >
              <span className="label text-gold">
                {CATEGORIES[project.category]} · {project.year}
              </span>

              <h2 className="font-serif text-cream mt-3 text-[clamp(1.6rem,4vw,2.6rem)] leading-tight font-normal">
                {project.title}
              </h2>

              {project.description && (
                <p className="text-warm mt-4 text-[0.95rem] leading-[1.7] font-light">
                  {project.description}
                </p>
              )}

              <span className="label text-warm/70 mt-5 text-[9.5px]">
                {project.services.join(' · ')}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
