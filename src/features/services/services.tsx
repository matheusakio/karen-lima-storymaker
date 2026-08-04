import { useState } from 'react';

import { services } from '@/data/services';
import { ServiceReel } from './service-reel';
import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { cn } from '@/shared/lib/cn';

/**
 * Capítulos numerados.
 *
 * A miniatura é PEQUENA e mora dentro da própria linha, à direita — aparece
 * quando o item entra em foco e some quando sai. Nada de painel grande fixo:
 * o protagonista é a lista, a mídia é a confirmação.
 *
 * Dentro da miniatura passa uma sequência de peças daquele serviço, não uma
 * imagem parada.
 */
export function Services() {
  const [activeId, setActiveId] = useState<string | null>(services[0]!.id);
  const canHover = useHoverCapable();

  return (
    <section id="servicos" className="bg-night-2 py-20 md:py-28 lg:py-32">
      <div className="page">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,3.5rem)] leading-none font-light">
          Serviços
        </h2>

        <div className="mt-10 md:mt-14">
          {services.map((service) => {
            const isActive = service.id === activeId;

            return (
              <button
                key={service.id}
                type="button"
                onMouseEnter={canHover ? () => setActiveId(service.id) : undefined}
                onFocus={() => setActiveId(service.id)}
                onClick={() => setActiveId(isActive ? null : service.id)}
                aria-current={isActive}
                className={cn(
                  'line-t grid w-full items-center gap-4 py-6 text-left last:line-b',
                  'grid-cols-[38px_1fr_92px] md:grid-cols-[64px_1fr_190px] md:gap-8 md:py-7',
                  'transition-colors duration-400',
                )}
              >
                <span
                  className={cn(
                    'font-serif self-start text-xl leading-none font-light transition-colors duration-400 md:text-3xl',
                    isActive ? 'text-gold' : 'text-gold/40',
                  )}
                >
                  {service.number}
                </span>

                <span className="flex flex-col gap-1.5">
                  <span
                    className={cn(
                      'font-serif text-[clamp(1.25rem,3.2vw,2.2rem)] leading-[1.05] font-light transition-colors duration-400',
                      isActive ? 'text-cream' : 'text-cream/65',
                    )}
                  >
                    {service.name}
                  </span>
                  <span className="text-warm text-[12.5px] leading-[1.65] font-light md:text-[13.5px]">
                    {service.description}
                  </span>
                </span>

                {/* miniatura pequena, dentro da linha */}
                <span
                  className={cn(
                    'aspect-[4/5] w-full overflow-hidden transition-all duration-500',
                    isActive ? 'opacity-100' : 'opacity-0 md:opacity-25',
                  )}
                >
                  <ServiceReel
                    gallery={service.gallery}
                    active={isActive}
                    className="h-full w-full"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
