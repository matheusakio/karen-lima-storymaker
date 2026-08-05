import { exclusiveServices } from '@/data/packages';
import { projects } from '@/data/projects';
import { AutoVideo } from '@/shared/components/media/auto-video';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

const byId = new Map(projects.map((p) => [p.id, p]));

/**
 * Serviços exclusivos.
 *
 * O valor fica numa tarja sólida abaixo da imagem, não flutuando por cima —
 * era o que o deixava ilegível. Nome à esquerda, "a partir de" em versalete e
 * o valor em serifada dourada à direita.
 */
export function ExclusiveServices() {
  return (
    <section className="page pb-20 md:pb-28 lg:pb-32">
      <div className="grid gap-3.5 md:grid-cols-3">
        {exclusiveServices.map((service) => {
          const media = byId.get(service.projectId);

          return (
            <a
              key={service.id}
              href={buildWhatsAppLink(messages.service(service.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-night-2 block"
            >
              {media && (
                <AutoVideo
                  id={`exc-${service.id}`}
                  src={media.previewVideo}
                  poster={media.poster}
                  poster2x={media.poster2x}
                  posterFallback={media.posterFallback}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={service.name}
                  className="aspect-[16/10] w-full transition-transform duration-[900ms] ease-[var(--ease-soft)] md:group-hover:scale-[1.03]"
                />
              )}

              <div className="line-t flex items-baseline justify-between gap-4 px-5 py-5">
                <h3 className="font-serif text-[clamp(1.15rem,2.4vw,1.55rem)] leading-tight">
                  {service.name}
                </h3>

                <p className="shrink-0 text-right">
                  <span className="label text-warm block text-[9px]">
                    {service.fromPrice ? 'a partir de' : 'sob demanda'}
                  </span>
                  <span className="font-serif text-gold text-[clamp(1.3rem,2.6vw,1.85rem)]">
                    {service.fromPrice ? formatBRL(service.fromPrice) : 'Personalizado'}
                  </span>
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
