import { motion } from 'motion/react';

import { MANIFESTO_ID, manifestoMedia } from '@/data/projects';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';

/**
 * Manifesto: texto sobre imagem, centralizado — a assinatura visual dela.
 *
 * A peça usada aqui precisa ser SEM legenda queimada. O vídeo anterior já
 * trazia um poema gravado na imagem e brigava com este texto; agora usa uma
 * peça limpa.
 */
export function Manifesto() {
  const { reducedMotion } = useMediaPolicy();

  return (
    <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
      <AutoVideo
        id={`manifesto-${MANIFESTO_ID}`}
        src={manifestoMedia.previewVideo}
        poster={manifestoMedia.poster}
        poster2x={manifestoMedia.poster2x}
        posterFallback={manifestoMedia.posterFallback}
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full"
        objectPosition="50% 45%"
      />

      <div className="absolute inset-0 bg-[rgb(18_14_12/0.58)]" />

      <div className="page absolute inset-0 grid place-items-center text-center">
        <motion.p
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.2, 1, 0.3, 1] }}
          className="font-serif max-w-[22ch] text-[clamp(1.5rem,4.4vw,2.5rem)] leading-[1.34] font-light sm:max-w-[34ch]"
        >
          Mais do que registrar, transformo movimentos, atmosferas e detalhes em{' '}
          <em className="text-gold">histórias feitas para permanecer</em>.
        </motion.p>
      </div>
    </section>
  );
}
