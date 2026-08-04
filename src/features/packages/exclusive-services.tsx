import { useState } from 'react';

import { exclusiveServices } from '@/data/packages';
import { projects } from '@/data/projects';
import { SectionHead } from '@/shared/components/ui/section-head';
import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { cn } from '@/shared/lib/cn';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

const byId = new Map(projects.map((p) => [p.id, p]));

/**
 * Linhas com vídeo relacionado — sem ícone de claquete, câmera ou calendário.
 * A mídia é o elemento visual; o resto é tipografia.
 */
export function ExclusiveServices() {
  const [activeId, setActiveId] = useState(exclusiveServices[0]!.id);
  const canHover = useHoverCapable();
  const active = exclusiveServices.find((s) => s.id === activeId);
  const media = active ? byId.get(active.projectId) : undefined;

  return (
    <section id="exclusivos" className="container-page py-24 md:py-32">
      <SectionHead timecode="14:05" label="Serviços exclusivos" title="Sob medida" />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-8">
          <div className="border-ink/12 border-t">
            {exclusiveServices.map((service) => {
              const isActive = service.id === activeId;
              const project = byId.get(service.projectId);

              return (
                <a
                  key={service.id}
                  href={buildWhatsAppLink(messages.service(service.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={canHover ? () => setActiveId(service.id) : undefined}
                  onFocus={() => setActiveId(service.id)}
                  className={cn(
                    'border-ink/12 grid items-baseline gap-3 border-b py-7 transition-colors duration-300 md:grid-cols-12 md:gap-8',
                    isActive && canHover && 'bg-paper-hi',
                  )}
                >
                  <h3 className="font-display text-ink text-2xl leading-tight font-light md:col-span-5 md:text-3xl">
                    {service.name}
                  </h3>

                  <p className="text-coffee text-sm leading-relaxed font-light md:col-span-4">
                    {service.note}
                  </p>

                  <p className="md:col-span-3 md:text-right">
                    {service.fromPrice ? (
                      <>
                        <span className="meta text-coffee-soft mr-2">a partir de</span>
                        <span className="font-display text-ink text-2xl font-light md:text-3xl">
                          {formatBRL(service.fromPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="meta text-coffee-soft">valor personalizado</span>
                    )}
                  </p>

                  {/* Mídia inline no mobile, onde não há painel lateral */}
                  {project && (
                    <div className="bg-cream mt-2 aspect-[16/10] w-full overflow-hidden md:col-span-12 lg:hidden">
                      <img
                        src={project.poster}
                        alt={service.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:col-span-4 lg:block">
          <div className="bg-cream sticky top-24 aspect-[9/16] w-full overflow-hidden">
            {media && (
              <img
                key={media.id}
                src={media.poster}
                alt={active?.name ?? ''}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
