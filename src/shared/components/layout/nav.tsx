import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/config/site';
import { useLockBodyScroll } from '@/shared/hooks/use-lock-body-scroll';
import { useScrolled } from '@/shared/hooks/use-scroll-position';
import { cn } from '@/shared/lib/cn';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

const LINKS = [
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'investimento', label: 'Investimento' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(80);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled && !open && 'bg-night/90 line-b backdrop-blur-md',
        )}
      >
        <div className="page flex h-16 items-center justify-between md:h-20">
          <a href="#abertura" className="font-serif relative z-10 text-xl font-light md:text-2xl">
            Karen Lima
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="label text-cream/70 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildWhatsAppLink(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="label border-gold text-gold hover:bg-gold hover:text-night border px-4 py-2 transition-colors"
            >
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="label relative z-10 h-11 px-1 lg:hidden"
          >
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-night safe-b fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto lg:hidden"
          >
            <nav className="page pb-14" aria-label="Navegação">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.05, duration: 0.4 }}
                  className="line-t font-serif block py-4 text-3xl font-light"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href={buildWhatsAppLink(messages.general)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="bg-gold text-night label mt-8 flex h-14 items-center justify-center"
              >
                {siteConfig.contact.whatsappDisplay}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
