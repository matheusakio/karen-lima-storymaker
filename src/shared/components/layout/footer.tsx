import { Link } from 'react-router-dom';

import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-ink/12 border-t">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-ink text-4xl leading-none font-light md:text-5xl">
              Karen Lima
            </p>
            <p className="text-ink-mute mt-3 text-[0.65rem] tracking-[0.28em] uppercase">
              StoryMaker
            </p>
            <p className="text-ink-soft/80 mt-6 max-w-xs text-sm leading-relaxed font-light">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3 md:col-span-3">
            <span className="label mb-1">Navegação</span>
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-ink-soft hover:text-ink w-fit text-sm font-light transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 md:col-span-4">
            <span className="label mb-1">Contato</span>

            <a
              href={buildWhatsAppLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-ink w-fit text-sm font-light transition-colors"
            >
              {siteConfig.contact.whatsappDisplay}
            </a>

            <a
              href={siteConfig.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-ink w-fit text-sm font-light transition-colors"
            >
              {siteConfig.social.instagram.label}
            </a>

            <span className="text-ink-soft text-sm font-light">
              {siteConfig.contact.location}
            </span>
          </div>
        </div>

        <div className="rule mt-16 mb-8" />

        <div className="text-ink-mute flex flex-col gap-2 text-[0.6rem] tracking-[0.24em] uppercase sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.brand}
          </p>
          <p>Brasília · Brasil</p>
        </div>
      </div>
    </footer>
  );
}
