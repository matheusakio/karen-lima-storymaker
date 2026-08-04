import { AnimatePresence, motion } from 'motion/react';

import { useScrolled } from '@/shared/hooks/use-scroll-position';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

/**
 * Barra de contato fixa no rodapé do mobile.
 * Em desktop não aparece — o WhatsApp já está no header e no rodapé.
 */
export function WhatsAppFab() {
  const visible = useScrolled(700);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          className="bg-ink text-paper fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-center text-[0.62rem] tracking-[0.28em] uppercase lg:hidden"
        >
          Falar no WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  );
}
