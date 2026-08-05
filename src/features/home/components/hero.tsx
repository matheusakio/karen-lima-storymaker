import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import { siteConfig } from '@/config/site';
import { HERO_MEDIA } from '@/features/home/hero-media';
import { Button } from '@/shared/components/ui/button';
import { MediaPlaceholder } from '@/shared/components/ui/media-placeholder';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

const RISE = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero editorial: tipografia à esquerda, mídia vertical à direita.
 * Sem sobreposição de texto em imagem — cada elemento tem seu campo.
 */
export function Hero() {
  return (
    <section className="container-page pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.span {...RISE} transition={{ duration: 0.7, ease: EASE }} className="label block">
            {siteConfig.contact.location}
          </motion.span>

          <h1 className="font-display text-ink mt-7 text-[3.2rem] leading-[0.92] font-light sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            <motion.span
              {...RISE}
              transition={{ duration: 1, delay: 0.08, ease: EASE }}
              className="block"
            >
              Karen Lima
            </motion.span>

            <motion.span
              {...RISE}
              transition={{ duration: 1, delay: 0.18, ease: EASE }}
              className="text-ink-mute block italic"
            >
              StoryMaker
            </motion.span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="bg-ink/15 mt-10 h-px w-full origin-left"
          />

          <motion.p
            {...RISE}
            transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
            className="text-ink-soft mt-8 max-w-md text-lg leading-[1.5] font-light text-balance md:text-xl"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            {...RISE}
            transition={{ duration: 0.9, delay: 0.52, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button as={Link} to="/portfolio" size="lg" className="w-full sm:w-auto">
              Ver trabalhos
            </Button>

            <Button
              as="a"
              href={buildWhatsAppLink(whatsappMessages.budget)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Orçamento
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="bg-paper-soft aspect-[4/5] w-full overflow-hidden lg:col-span-5 lg:aspect-[3/4]"
        >
          {HERO_MEDIA.video ? (
            <video
              src={HERO_MEDIA.video}
              poster={HERO_MEDIA.poster ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          ) : HERO_MEDIA.poster ? (
            <img
              src={HERO_MEDIA.poster}
              alt=""
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          ) : (
            <MediaPlaceholder />
          )}
        </motion.div>
      </div>
    </section>
  );
}
