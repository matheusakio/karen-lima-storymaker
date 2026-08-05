import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { BurnIn } from '@/shared/components/ui/burn-in';

const LEFT = projects.find((p) => p.id === 'v069')!;
const RIGHT = projects.find((p) => p.id === 'v001')!;

/**
 * Depoimentos como frases editoriais entre imagens.
 * Sem carrossel, sem card, sem estrela.
 *
 * A seção some enquanto não houver depoimento real.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className="py-24 md:py-32">
      {testimonials.map((item, index) => (
        <div key={item.id} className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="hidden lg:col-span-3 lg:block">
              <div className="bg-cream aspect-[9/16] w-full overflow-hidden">
                <img
                  src={(index % 2 === 0 ? LEFT : RIGHT).poster}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <BurnIn className="lg:col-span-6">
              <blockquote>
                <p className="font-display text-ink text-[1.7rem] leading-[1.25] font-light italic text-balance sm:text-3xl lg:text-[2.6rem]">
                  {item.quote}
                </p>
                <cite className="meta text-coffee-soft mt-6 block not-italic">{item.author}</cite>
              </blockquote>
            </BurnIn>

            <div className="hidden lg:col-span-3 lg:block lg:pt-20">
              <div className="bg-cream aspect-[4/5] w-full overflow-hidden">
                <img
                  src={(index % 2 === 0 ? RIGHT : LEFT).poster}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
