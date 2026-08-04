import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { timeline } from '@/config/site';
import { useLockBodyScroll } from '@/shared/hooks/use-lock-body-scroll';
import { useScrolled } from '@/shared/hooks/use-scroll-position';
import { cn } from '@/shared/lib/cn';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

const MENU = ['trabalhos', 'servicos', 'pacotes', 'sobre', 'contato'] as const;

interface TopBarProps {
  activeId: string;
  progress: number;
}

export function TopBar({ activeId, progress }: TopBarProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(60);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const active = timeline.find((s) => s.id === activeId) ?? timeline[0];
  const onDark = !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled && !open && 'bg-paper/92 border-ink/10 border-b backdrop-blur-md',
        )}
      >
        {/* Barra de progresso — a régua da timeline no celular */}
        <div className={cn('h-px w-full', scrolled ? 'bg-ink/10' : 'bg-paper/20')}>
          <div
            className="bg-gold h-px transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <a
            href="#abertura"
            className={cn(
              'font-display text-xl font-light transition-colors md:text-2xl',
              onDark ? 'text-paper' : 'text-ink',
            )}
          >
            Karen Lima
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegação principal">
            {MENU.map((id) => {
              const section = timeline.find((s) => s.id === id);
              if (!section) return null;
              const isActive = activeId === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    'meta transition-colors',
                    onDark
                      ? isActive
                        ? 'text-paper'
                        : 'text-paper/60 hover:text-paper'
                      : isActive
                        ? 'text-ink'
                        : 'text-coffee-soft hover:text-ink',
                  )}
                >
                  {section.label}
                </a>
              );
            })}

            <a
              href={buildWhatsAppLink(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'meta border-b pb-0.5 transition-colors',
                onDark ? 'border-paper/50 text-paper' : 'border-ink text-ink',
              )}
            >
              WhatsApp
            </a>
          </nav>

          <div className="flex items-center gap-5 lg:hidden">
            <span
              className={cn(
                'font-mono text-[0.6rem] tracking-[0.14em]',
                onDark ? 'text-paper/70' : 'text-coffee-soft',
              )}
            >
              {active?.timecode}
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className={cn(
                'meta relative z-10 h-12 px-1 transition-colors',
                open || !onDark ? 'text-ink' : 'text-paper',
              )}
            >
              {open ? 'Fechar' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-paper safe-b fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto lg:hidden"
          >
            <nav className="container-page pb-12" aria-label="Navegação">
              {timeline.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.4 }}
                  className="border-ink/10 flex items-baseline gap-4 border-t py-4"
                >
                  <span className="font-mono text-gold text-[0.6rem]">{section.timecode}</span>
                  <span className="font-display text-ink text-3xl font-light">
                    {section.label}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
