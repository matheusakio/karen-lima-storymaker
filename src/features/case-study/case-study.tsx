import { featuredCase, projects } from '@/data/projects';
import { BurnIn, Rise } from '@/shared/components/ui/burn-in';

const main = projects.find((p) => p.id === featuredCase.projectId)!;
const frames = featuredCase.frameIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

/**
 * Case em destaque — bloco invertido, diagramação de revista.
 * Os cinco tópicos são uma lista com fio, não cinco cards corporativos.
 */
export function CaseStudy() {
  return (
    <section id="case" className="bg-ink text-paper py-24 md:py-32">
      <div className="container-page">
        <div className="flex items-baseline gap-4">
          <span className="meta text-gold">05:45</span>
          <span className="meta text-paper/50">Case</span>
        </div>

        <BurnIn>
          <h2 className="font-display wonk mt-5 max-w-3xl text-[2.6rem] leading-[0.95] font-light sm:text-6xl lg:text-7xl">
            {featuredCase.name}
          </h2>
        </BurnIn>

        <p className="meta text-paper/50 mt-6">
          {featuredCase.client} · {featuredCase.location}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Rise className="lg:col-span-5">
            <div className="aspect-[9/16] w-full overflow-hidden bg-black">
              <img
                src={main.poster}
                alt={main.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Rise>

          <Rise delay={0.12} className="lg:col-span-7">
            <dl className="flex flex-col">
              {featuredCase.blocks.map((block) => (
                <div
                  key={block.label}
                  className="border-paper/15 grid gap-2 border-b py-6 md:grid-cols-[9rem_1fr] md:gap-8"
                >
                  <dt className="meta text-gold">{block.label}</dt>
                  <dd className="text-paper/80 text-[0.98rem] leading-[1.7] font-light">
                    {block.text}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Tira de frames com alturas desiguais */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {frames.map((frame, index) => (
                <div
                  key={frame.id}
                  className={
                    index === 1
                      ? 'aspect-[3/4] overflow-hidden bg-black lg:mt-8'
                      : 'aspect-[3/4] overflow-hidden bg-black'
                  }
                >
                  <img
                    src={frame.poster}
                    alt={frame.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
