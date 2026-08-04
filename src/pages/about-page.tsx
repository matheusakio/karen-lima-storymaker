import { siteConfig } from '@/config/site';
import { aboutContent } from '@/data/about';
import { CtaBand } from '@/features/home/components/cta-band';
import { usePageMeta } from '@/shared/components/seo/use-page-meta';
import { Button } from '@/shared/components/ui/button';
import { MediaPlaceholder } from '@/shared/components/ui/media-placeholder';
import { PageHero } from '@/shared/components/ui/page-hero';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/ui/reveal';
import { Section } from '@/shared/components/ui/section';

export default function AboutPage() {
  usePageMeta({
    title: 'Sobre',
    description:
      'Karen Lima é filmmaker e videomaker mobile em Brasília. Captação, edição e direção criativa para marcas, clínicas e eventos.',
  });

  return (
    <>
      <PageHero label="Sobre" title="Karen Lima" description={siteConfig.tagline} />

      <Section className="container-page !pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="bg-paper-soft aspect-[4/5] w-full overflow-hidden">
              {aboutContent.portrait ? (
                <img
                  src={aboutContent.portrait}
                  alt="Karen Lima"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <MediaPlaceholder />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="flex flex-col gap-5">
              {aboutContent.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-ink-soft text-[1.02rem] leading-[1.75] font-light md:text-lg"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  as="a"
                  href={siteConfig.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  {siteConfig.social.instagram.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-ink/12 border-t">
        <div className="container-page">
          <span className="label">Especialidades</span>

          <RevealGroup className="border-ink/12 mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.specialties.map((item) => (
              <RevealItem
                key={item}
                className="border-ink/12 border-b px-1 py-6 sm:even:border-l sm:even:pl-8 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:not(:nth-child(3n+1))]:pl-8"
              >
                <p className="font-display text-ink text-2xl leading-none font-light">{item}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
