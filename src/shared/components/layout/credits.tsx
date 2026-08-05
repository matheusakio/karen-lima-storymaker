import { siteConfig } from '@/config/site';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

/** Rodapé em formato de créditos finais. */
export function Credits() {
  const year = new Date().getFullYear();

  const rows: [string, string, string?][] = [
    ['Direção, captação e edição', siteConfig.name],
    ['Locação', siteConfig.contact.location],
    ['Instagram', siteConfig.social.instagram.label, siteConfig.social.instagram.href],
    ['WhatsApp', siteConfig.contact.whatsappDisplay, buildWhatsAppLink(messages.general)],
  ];

  return (
    <footer className="line-t pb-24 lg:pb-14">
      <div className="page py-14 md:py-20">
        <div className="flex items-center gap-5">
          <span className="h-px flex-1 bg-[rgb(240_230_216/0.14)]" />
          <span className="label text-warm">Créditos finais</span>
          <span className="h-px flex-1 bg-[rgb(240_230_216/0.14)]" />
        </div>

        <p className="font-serif mt-10 text-center text-[clamp(2.5rem,8vw,4.5rem)] leading-none">
          Karen Lima
        </p>
        <p className="label text-warm mt-4 text-center">{siteConfig.role}</p>

        <dl className="mx-auto mt-12 flex max-w-2xl flex-col">
          {rows.map(([label, value, href]) => (
            <div key={label} className="line-b grid gap-1 py-4 sm:grid-cols-2 sm:gap-6">
              <dt className="label text-warm">{label}</dt>
              <dd className="label text-cream/85 sm:text-right">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p className="label text-warm/60 mt-12 text-center">
          © {year} {siteConfig.brand}
        </p>
      </div>
    </footer>
  );
}
