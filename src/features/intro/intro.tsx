import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { BurnIn, Rise } from '@/shared/components/ui/burn-in';

const STILL = projects.find((p) => p.id === 'v053')!;
const CLIP = projects.find((p) => p.id === 'v067')!;

/**
 * Introdução editorial — composição assimétrica, três larguras diferentes.
 * Nunca três cards lado a lado.
 */
export function Intro() {
  return (
    <section id="intro" className="container-page py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Fotografia de bastidor, deslocada e menor que a coluna */}
        <Rise className="lg:col-span-4 lg:pt-16">
          <figure className="flex flex-col gap-3">
            <div className="bg-cream aspect-[4/5] w-full overflow-hidden">
              <img
                src={STILL.poster}
                alt="Detalhe de bastidor captado por Karen Lima em Brasília"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="meta text-coffee-soft">
              ↑ Bastidor · {STILL.location}
            </figcaption>
          </figure>
        </Rise>

        {/* Texto, coluna larga, começa no topo */}
        <div className="lg:col-span-5 lg:pr-8">
          <BurnIn>
            <p className="font-display wonk text-ink text-[1.9rem] leading-[1.15] font-light text-balance sm:text-4xl lg:text-[2.9rem]">
              Mais do que registrar, Karen transforma movimentos, atmosferas e detalhes em
              histórias feitas para permanecer.
            </p>
          </BurnIn>

          <Rise delay={0.15} className="mt-12">
            <div className="rule-h" />
            <ul className="mt-6 flex flex-col gap-2">
              {['Captação', 'Direção', 'Edição', 'Entrega'].map((step, index) => (
                <li key={step} className="flex items-baseline gap-4">
                  <span className="meta text-gold">{String(index + 1).padStart(2, '0')}</span>
                  <span className="meta text-coffee">{step}</span>
                </li>
              ))}
            </ul>
            <p className="meta text-coffee-soft mt-8">{siteConfig.contact.location}</p>
          </Rise>
        </div>

        {/* Vídeo vertical, coluna estreita, empurrada para baixo */}
        <Rise delay={0.25} className="lg:col-span-3 lg:pt-32">
          <figure className="flex flex-col gap-3">
            <div className="bg-cream aspect-[9/16] w-full overflow-hidden">
              <img
                src={CLIP.poster}
                alt={CLIP.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="meta text-coffee-soft">
              {CLIP.year} · {CLIP.durationLabel}
            </figcaption>
          </figure>
        </Rise>
      </div>
    </section>
  );
}
