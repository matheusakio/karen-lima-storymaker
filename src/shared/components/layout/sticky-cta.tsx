import { AnimatePresence, motion } from 'motion/react';

import { useScrolled } from '@/shared/hooks/use-scroll-position';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

/** Barra fixa de conversão. Só no celular — no desktop o CTA já está no topo. */
export function StickyCta() {
  const visible = useScrolled(800);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink(messages.general)}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          className="bg-gold text-night label fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-center lg:hidden"
        >
          Falar pelo WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  );
}
