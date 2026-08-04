import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { useLockBodyScroll } from '@/shared/hooks/use-lock-body-scroll';
import { useScrolled } from '@/shared/hooks/use-scroll-position';
import { cn } from '@/shared/lib/cn';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(40);
  const location = useLocation();

  useLockBodyScroll(open);
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled && !open ? 'bg-paper/92 border-ink/10 border-b backdrop-blur-md' : '',
        )}
      >
        <div className="container-page flex h-20 items-center justify-between md:h-24">
          <Link to="/" className="relative z-10" aria-label={`${siteConfig.brand} — início`}>
            <span className="font-display text-ink text-xl font-light tracking-tight md:text-2xl">
              Karen Lima
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Navegação principal">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'text-[0.65rem] tracking-[0.26em] uppercase transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-ink-mute hover:text-ink',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <a
              href={buildWhatsAppLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink text-ink hover:bg-ink hover:text-paper border-b pb-0.5 text-[0.65rem] tracking-[0.26em] uppercase transition-colors duration-300"
            >
              WhatsApp
            </a>
          </nav>

          {/* Menu textual — "Menu"/"Fechar" em vez de hambúrguer. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="text-ink relative z-10 -mr-1 h-11 px-1 text-[0.65rem] tracking-[0.26em] uppercase lg:hidden"
          >
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-paper safe-bottom fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto lg:hidden"
          >
            <nav className="container-page flex flex-col pb-14" aria-label="Navegação mobile">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index + 0.08, duration: 0.5 }}
                  className="border-ink/10 border-t"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'font-display block py-5 text-4xl font-light transition-colors',
                        isActive ? 'text-ink-mute italic' : 'text-ink',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.a
                href={buildWhatsAppLink(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="bg-ink text-paper mt-8 flex h-14 items-center justify-center text-[0.68rem] tracking-[0.26em] uppercase"
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
