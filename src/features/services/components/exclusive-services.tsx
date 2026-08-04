import { exclusiveServices } from '@/data/packages';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/ui/reveal';
import { SectionHeader } from '@/shared/components/ui/section';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

export function ExclusiveServices() {
  return (
    <div className="container-page">
      <Reveal>
        <SectionHeader label="Também" title="Serviços exclusivos" />
      </Reveal>

      <RevealGroup className="border-ink/12 mt-14 border-t md:mt-20">
        {exclusiveServices.map((service) => (
          <RevealItem key={service.id} className="border-ink/12 border-b">
            <a
              href={buildWhatsAppLink(whatsappMessages.service(service.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:bg-paper-soft/60 grid gap-3 py-8 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h3 className="font-display text-ink text-2xl leading-tight font-light md:col-span-5 md:text-3xl">
                {service.name}
              </h3>

              <p className="text-ink-soft/80 text-sm leading-relaxed font-light md:col-span-4">
                {service.note}
              </p>

              <p className="font-display text-ink text-2xl leading-none font-light md:col-span-3 md:text-right md:text-3xl">
                {service.fromPrice ? (
                  <>
                    <span className="text-ink-mute mr-2 align-middle text-[0.55rem] tracking-[0.24em] uppercase">
                      a partir de
                    </span>
                    {formatBRL(service.fromPrice)}
                  </>
                ) : (
                  <span className="text-ink-mute text-[0.65rem] tracking-[0.24em] uppercase">
                    Sob consulta
                  </span>
                )}
              </p>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
