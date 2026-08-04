import { CtaBand } from '@/features/home/components/cta-band';
import { ExclusiveServices } from '@/features/services/components/exclusive-services';
import { Faq } from '@/features/services/components/faq';
import { PricingTable } from '@/features/services/components/pricing-table';
import { usePageMeta } from '@/shared/components/seo/use-page-meta';
import { PageHero } from '@/shared/components/ui/page-hero';
import { Section } from '@/shared/components/ui/section';

export default function ServicesPage() {
  usePageMeta({
    title: 'Tabela de Investimento',
    description:
      'Pacotes de captação e edição a partir de R$ 550. Fashion film, cobertura de eventos e pacotes mensais para clínicas e empresas.',
  });

  return (
    <>
      <PageHero
        label="Tabela de Investimento"
        title="Serviços"
        description="Captação · Edição · Fashion Film · Cobertura de Eventos. Valores para Brasília – DF."
      />

      <Section className="container-page !pt-0">
        <PricingTable />
      </Section>

      <Section className="border-ink/12 border-t">
        <ExclusiveServices />
      </Section>

      <Faq />

      <CtaBand />
    </>
  );
}
