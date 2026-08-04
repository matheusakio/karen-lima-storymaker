import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { faqItems } from '@/data/faq';
import { Reveal } from '@/shared/components/ui/reveal';
import { Section, SectionHeader } from '@/shared/components/ui/section';
import { cn } from '@/shared/lib/cn';

/** A seção inteira some quando não há perguntas confirmadas. */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqItems.length === 0) return null;

  return (
    <Section className="border-ink/12 container-page border-t">
      <Reveal>
        <SectionHeader label="Dúvidas" title="Antes de contratar" />
      </Reveal>

      <div className="border-ink/12 mt-14 border-t md:mt-20">
        {faqItems.map((item) => {
          const open = openId === item.id;

          return (
            <div key={item.id} className="border-ink/12 border-b">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                className="group grid w-full gap-4 py-7 text-left md:grid-cols-12 md:gap-8"
              >
                <span
                  className={cn(
                    'font-display text-xl leading-snug font-light transition-colors duration-300 md:col-span-9 md:text-2xl',
                    open ? 'text-ink-mute italic' : 'text-ink',
                  )}
                >
                  {item.question}
                </span>

                <span className="text-ink-mute text-[0.6rem] tracking-[0.24em] uppercase md:col-span-3 md:text-right">
                  {open ? 'Fechar' : 'Ver'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-ink-soft/85 max-w-2xl pb-8 text-[0.95rem] leading-[1.7] font-light">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
