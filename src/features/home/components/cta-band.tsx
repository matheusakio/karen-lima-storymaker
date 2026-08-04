import { siteConfig } from '@/config/site';
import { Button } from '@/shared/components/ui/button';
import { Reveal } from '@/shared/components/ui/reveal';
import { Section } from '@/shared/components/ui/section';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

/** Bloco final de contato. Inverte a paleta para fechar a página. */
export function CtaBand() {
  return (
    <Section className="bg-ink text-paper">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="text-paper/45 text-[0.65rem] tracking-[0.28em] uppercase">
                Contato
              </span>

              <h2 className="font-display mt-6 max-w-2xl text-[2.4rem] leading-[1.02] font-light text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                Conte o que você quer registrar
              </h2>

              <p className="text-paper/60 mt-6 max-w-md text-[0.95rem] leading-[1.7] font-light">
                Retorno com a ideia, o formato e o orçamento.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
              <Button
                as="a"
                href={buildWhatsAppLink(whatsappMessages.budget)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="bg-paper text-ink hover:bg-paper-deep w-full sm:w-auto"
              >
                {siteConfig.contact.whatsappDisplay}
              </Button>

              <a
                href={siteConfig.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/60 hover:text-paper text-[0.65rem] tracking-[0.26em] uppercase transition-colors"
              >
                {siteConfig.social.instagram.label}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
