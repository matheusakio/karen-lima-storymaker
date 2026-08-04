import { siteConfig } from '@/config/site';
import { ContactForm } from '@/features/contact/components/contact-form';
import { usePageMeta } from '@/shared/components/seo/use-page-meta';
import { PageHero } from '@/shared/components/ui/page-hero';
import { Reveal } from '@/shared/components/ui/reveal';
import { Section } from '@/shared/components/ui/section';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

interface Channel {
  label: string;
  value: string;
  href?: string;
}

export default function ContactPage() {
  usePageMeta({
    title: 'Contato',
    description: `Fale com Karen Lima pelo WhatsApp ${siteConfig.contact.whatsappDisplay}. Atendimento em Brasília – DF.`,
  });

  const channels: Channel[] = [
    {
      label: 'WhatsApp',
      value: siteConfig.contact.whatsappDisplay,
      href: buildWhatsAppLink(whatsappMessages.general),
    },
    {
      label: 'Instagram',
      value: siteConfig.social.instagram.label,
      href: siteConfig.social.instagram.href,
    },
    { label: 'Localização', value: siteConfig.contact.location },
  ];

  return (
    <>
      <PageHero
        label="Contato"
        title="Vamos conversar"
        description="Preencha o formulário ou chame direto no WhatsApp."
      />

      <Section className="container-page !pt-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="border-ink/12 border-t">
              {channels.map((channel) => {
                const content = (
                  <>
                    <span className="label md:col-span-4">{channel.label}</span>
                    <span className="font-display text-ink text-2xl leading-none font-light md:col-span-8">
                      {channel.value}
                    </span>
                  </>
                );

                const base =
                  'border-ink/12 grid gap-2 border-b py-6 md:grid-cols-12 md:items-baseline md:gap-4';

                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${base} hover:bg-paper-soft/60 transition-colors duration-500`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={channel.label} className={base}>
                    {content}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
