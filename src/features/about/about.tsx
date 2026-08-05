import { motion } from 'motion/react';

import { siteConfig } from '@/config/site';
import { ABOUT_ID, aboutMedia } from '@/data/projects';
import { AutoVideo } from '@/shared/components/media/auto-video';

/**
 * Sobre: mídia sangrada de um lado, texto do outro. Sem card, sem borda.
 *
 * ⚠️ O texto abaixo usa SOMENTE o que a própria Karen publica: os três papéis
 * do perfil dela, a cidade e a frase de posicionamento. Não há adjetivo
 * inventado nem promessa que ela teria de sustentar. Substitua pelo texto
 * dela quando enviar.
 */
export function About() {
  return (
    <section id="sobre" className="grid md:grid-cols-2">
      <AutoVideo
        id={`about-${ABOUT_ID}`}
        src={aboutMedia.previewVideo}
        poster={aboutMedia.poster}
        poster2x={aboutMedia.poster2x}
        posterFallback={aboutMedia.posterFallback}
        sizes="(max-width: 768px) 100vw, 50vw"
        alt="Karen Lima em produção"
        objectPosition="50% 32%"
        className="aspect-[5/4] w-full sm:aspect-[4/3] md:aspect-auto md:h-full md:min-h-[520px]"
      />

      <div className="flex flex-col justify-center px-5 py-16 sm:px-8 md:px-12 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: [0.2, 1, 0.3, 1] }}
          className="font-serif max-w-[34ch] text-[clamp(1.35rem,3.2vw,2rem)] leading-[1.35]"
        >
          Karen Lima é <em className="text-gold">filmmaker, storymaker e videomaker mobile</em> em
          Brasília. Capta e edita vídeos para marcas, clínicas, empresas e eventos.
        </motion.p>

        <div className="line-t text-warm mt-10 flex flex-wrap gap-x-7 gap-y-2 pt-5">
          <span className="label">Direção</span>
          <span className="label">Captação</span>
          <span className="label">Edição</span>
          <span className="label sm:ml-auto">{siteConfig.contact.location}</span>
        </div>
      </div>
    </section>
  );
}
