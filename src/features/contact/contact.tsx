import { motion } from 'motion/react';
import { useState } from 'react';

import { siteConfig } from '@/config/site';
import { CONTACT_ID, contactMedia } from '@/data/projects';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { cn } from '@/shared/lib/cn';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

const TOPICS = [
  'Storymaker',
  'Fashion Film',
  'Evento',
  'Conteúdo para marca',
  'Pacote mensal',
  'Outro projeto',
] as const;

type Topic = (typeof TOPICS)[number];

/**
 * Contato: imagem cheia com tipografia por cima, no mesmo idioma da abertura.
 * O assunto escolhido entra na mensagem do WhatsApp.
 */
export function Contact() {
  const [topic, setTopic] = useState<Topic | null>(null);

  const href = buildWhatsAppLink(
    topic ? messages.topic(topic.toLowerCase()) : messages.general,
  );

  return (
    <section id="contato" className="relative min-h-[560px] overflow-hidden py-24 md:py-32">
      <AutoVideo
        id={`contact-${CONTACT_ID}`}
        src={contactMedia.previewVideo}
        poster={contactMedia.poster}
        poster2x={contactMedia.poster2x}
        posterFallback={contactMedia.posterFallback}
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full"
        objectPosition="50% 45%"
      />
      <div className="absolute inset-0 bg-[rgb(14_11_10/0.78)]" />

      <div className="page text-on-media relative flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: [0.2, 1, 0.3, 1] }}
          className="font-serif max-w-[18ch] text-[clamp(2.2rem,7vw,4.2rem)] leading-[1.05] font-normal"
        >
          Sua próxima história <em className="text-gold">começa aqui</em>.
        </motion.h2>

        <div
          role="radiogroup"
          aria-label="Assunto"
          className="mt-9 flex max-w-2xl flex-wrap justify-center gap-2.5"
        >
          {TOPICS.map((item) => {
            const active = topic === item;
            return (
              <button
                key={item}
                role="radio"
                aria-checked={active}
                type="button"
                onClick={() => setTopic(active ? null : item)}
                className={cn(
                  'label border px-4 py-2.5 text-[10px] transition-colors duration-300',
                  active
                    ? 'bg-cream text-night border-cream'
                    : 'text-cream hover:border-cream/60 border-[rgb(240_230_216/0.28)]',
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cream text-night label hover:bg-gold mt-8 flex h-12 items-center px-9 transition-colors duration-400"
        >
          Falar pelo WhatsApp
        </a>

        <p className="label text-cream/80 mt-6">{siteConfig.contact.location}</p>
      </div>
    </section>
  );
}
