import { useState } from 'react';

import { services } from '@/data/services';
import { ServiceReel } from './service-reel';
import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { useIsDesktop } from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/cn';

/**
 * Capítulos de serviço.
 *
 * As duas versões são ESTRUTURALMENTE diferentes, então a escolha acontece em
 * JavaScript e não com `md:hidden`. Escondendo por CSS, as duas árvores ficam
 * no DOM: dez componentes de vídeo montados, dez observers, para mostrar cinco.
 *
 * DESKTOP — lista com miniatura grande à direita, esmaecida em repouso e cheia
 * no item sob o cursor. A miniatura fica sempre visível: com `opacity-0` o
 * espaço seguia reservado e a seção abria vãos escuros.
 *
 * CELULAR — cada serviço carrega a própria mídia, empilhado. A versão anterior
 * usava um painel único que trocava conforme o scroll; com pouco texto por
 * serviço, a pessoa atravessava os cinco num gesto e o vídeo mal aparecia.
 */
export function Services() {
  const isDesktop = useIsDesktop();

  return (
    <section id="servicos" className="bg-night-2 py-20 md:py-28 lg:py-32">
      <div className="page">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,3.5rem)] leading-none font-light">
          Serviços
        </h2>

        {isDesktop ? <ServicesDesktop /> : <ServicesMobile />}
      </div>
    </section>
  );
}

/** Empilhado: cada bloco tem o tempo que a pessoa der a ele. */
function ServicesMobile() {
  return (
    <div className="mt-8 flex flex-col gap-10">
      {services.map((service) => (
        <article key={service.id}>
          <ServiceReel gallery={service.gallery} className="aspect-[4/3] w-full" />
          <h3 className="font-serif text-cream mt-4 text-[1.6rem] leading-none font-light">
            {service.name}
          </h3>
          <p className="text-warm mt-2 text-[13px] leading-[1.65] font-light">
            {service.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function ServicesDesktop() {
  const [activeId, setActiveId] = useState(services[0]!.id);
  const canHover = useHoverCapable();

  return (
    <div className="mt-14">
      {services.map((service) => {
        const isActive = service.id === activeId;

        return (
          <button
            key={service.id}
            type="button"
            onMouseEnter={canHover ? () => setActiveId(service.id) : undefined}
            onFocus={() => setActiveId(service.id)}
            onClick={() => setActiveId(service.id)}
            aria-current={isActive}
            className="line-t grid w-full grid-cols-[1fr_180px] items-center gap-10 py-7 text-left last:line-b"
          >
            <span className="flex flex-col gap-2">
              <span
                className={cn(
                  'font-serif text-[clamp(1.6rem,3.2vw,2.2rem)] leading-[1.05] font-light transition-colors duration-400',
                  isActive ? 'text-cream' : 'text-cream/60',
                )}
              >
                {service.name}
              </span>
              <span className="text-warm text-[13.5px] leading-[1.65] font-light">
                {service.description}
              </span>
            </span>

            <span
              className={cn(
                'aspect-[4/5] w-full overflow-hidden transition-opacity duration-500',
                isActive ? 'opacity-100' : 'opacity-30',
              )}
            >
              {/* Só o item em foco cicla e fura a fila. Ligar isso em vários
                  ao mesmo tempo faria todos decodificarem em paralelo. */}
              <ServiceReel
                gallery={service.gallery}
                cycle={isActive}
                priority={isActive}
                className="h-full w-full"
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
