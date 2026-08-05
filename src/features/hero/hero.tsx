import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { siteConfig } from '@/config/site';
import { heroMedia } from '@/data/projects';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';
import { cn } from '@/shared/lib/cn';

const EASE = [0.2, 1, 0.3, 1] as const;

/**
 * Abertura: vídeo em tela cheia com a tipografia por cima e centralizada.
 * Sem card, sem caixa, sem retângulo atrás do título.
 *
 * SEM CONTROLE DE SOM, de propósito. O áudio bruto de um clipe é ruído
 * ambiente e música automática é bloqueada pelos navegadores. O som existe no
 * modal do projeto, onde a pessoa escolheu assistir.
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { canAutoplay } = useMediaPolicy();
  const [visible, setVisible] = useState(false);

  /**
   * `muted` precisa existir como ATRIBUTO antes do Safari decidir se libera o
   * autoplay. O React só define a propriedade, e o iPhone recusa. Sem isto o
   * herói fica congelado no celular.
   */
  const attach = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute('muted', '');
    node.setAttribute('playsinline', '');
    node.setAttribute('webkit-playsinline', '');
  }, []);

  /** Falha aqui não é definitiva: os eventos de mídia repetem a tentativa. */
  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const attempt = video.play();
    if (attempt) attempt.catch(() => undefined);
  }, []);

  useEffect(() => {
    if (canAutoplay) tryPlay();
  }, [canAutoplay, tryPlay]);

  return (
    <section id="abertura" className="relative h-dvh min-h-[560px] overflow-hidden bg-black">
      <img
        src={heroMedia.poster}
        srcSet={`${heroMedia.poster} 900w, ${heroMedia.poster2x} 1600w`}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover [object-position:50%_26%]"
      />

      {canAutoplay && (
        <video
          ref={attach}
          src={heroMedia.video}
          poster={heroMedia.posterFallback}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={tryPlay}
          onCanPlay={tryPlay}
          onPlaying={() => setVisible(true)}
          onPause={() => setVisible(false)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 [object-position:50%_26%]',
            visible ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}

      <div className="veil-hero absolute inset-0" />

      <div className="page text-on-media absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="label text-cream font-medium"
        >
          {siteConfig.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: EASE }}
          className="font-serif mt-5 text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.9] font-normal"
        >
          Karen <em className="text-gold-hi">Lima</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: EASE }}
          className="font-serif text-cream mt-6 max-w-[26ch] text-[clamp(1.05rem,2.3vw,1.5rem)] leading-[1.45] font-normal"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <a
            href="#trabalhos"
            className="bg-cream text-night label hover:bg-gold flex h-12 items-center justify-center px-8 transition-colors duration-400"
          >
            Ver trabalhos
          </a>
          <a
            href="#investimento"
            className="border-cream/40 text-cream label hover:bg-cream hover:text-night flex h-12 items-center justify-center border px-8 transition-colors duration-400"
          >
            Solicitar orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
}
