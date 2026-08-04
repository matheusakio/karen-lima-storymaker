import { processSteps } from '@/data/process';
import { Reveal, RevealGroup, RevealItem } from '@/shared/components/ui/reveal';
import { Section, SectionHeader } from '@/shared/components/ui/section';

/** Método de trabalho. Numeração como elemento gráfico, sem ícone. */
export function Process() {
  return (
    <Section className="border-ink/12 border-t">
      <div className="container-page">
        <Reveal>
          <SectionHeader label="Método" title="Do briefing à entrega" />
        </Reveal>

        <RevealGroup className="mt-14 grid md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.id}
              className="border-ink/12 border-t py-8 md:pr-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-display text-ink-mute/50 block text-3xl leading-none font-light">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-ink mt-5 text-2xl leading-tight font-light">
                {step.title}
              </h3>

              <p className="text-ink-soft/80 mt-3 text-sm leading-[1.65] font-light">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
