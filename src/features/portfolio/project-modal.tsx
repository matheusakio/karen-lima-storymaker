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

/**
 * O vídeo completo só existe aqui dentro — é montado ao abrir e desmontado ao
 * fechar, então nada pesado entra no primeiro carregamento da página.
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
          transition={{ duration: 0.3 }}
          className="bg-night fixed inset-0 z-[70] overflow-y-auto"
          onClick={onClose}
        >
          <div className="page flex min-h-full flex-col py-5 md:py-8">
            <div className="flex items-center justify-between">
              <span className="label text-gold">
                {CATEGORIES[project.category]} · {project.year}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="text-cream hover:text-gold grid size-11 place-items-center transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mt-5 flex flex-1 flex-col gap-8 md:flex-row md:gap-14"
            >
              <div className="mx-auto aspect-[9/16] h-[58dvh] w-auto shrink-0 overflow-hidden bg-black md:h-[76dvh]">
                <video
                  src={project.fullVideo}
                  poster={project.poster}
                  controls
                  autoPlay={canAutoplay}
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex max-w-sm flex-col gap-5 md:pt-6">
                <h2 className="font-serif text-3xl leading-tight font-light md:text-5xl">
                  {project.title}
                </h2>

                {project.description && (
                  <p className="text-warm text-[0.95rem] leading-[1.75] font-light">
                    {project.description}
                  </p>
                )}

                <dl className="flex flex-col">
                  {[
                    ['Categoria', CATEGORIES[project.category]],
                    ['Ano', String(project.year)],
                    ['Local', project.location],
                    ['Serviços', project.services.join(' · ')],
                    ['Duração', project.durationLabel],
                  ].map(([label, value]) => (
                    <div key={label} className="line-b grid grid-cols-[6.5rem_1fr] gap-4 py-3">
                      <dt className="label text-warm">{label}</dt>
                      <dd className="text-cream text-sm font-light">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
