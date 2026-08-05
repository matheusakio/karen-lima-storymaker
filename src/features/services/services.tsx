import { useEffect, useRef, useState } from 'react';

import { services } from '@/data/services';
import { ServiceReel } from './service-reel';
import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { cn } from '@/shared/lib/cn';

/**
 * Capítulos de serviço.
 *
 * DESKTOP — miniatura grande na própria coluna da grade, sempre presente:
 * esmaecida nos itens em repouso, cheia no item em foco. Ela precisa continuar
 * NO FLUXO e VISÍVEL. Quando o item inativo ficava com `opacity-0`, o espaço
 * continuava reservado e a seção abria vãos escuros enormes; a opacidade
 * parcial resolve os dois problemas de uma vez.
 *
 * CELULAR — não há hover, e miniatura pequena não mostra nada. A mídia vira
 * faixa compacta e fixa no topo, e o item ativo é o que estiver no centro da
 * tela: a pessoa rola e o vídeo acompanha.
 */
export function Services() {
  const [activeId, setActiveId] = useState(services[0]!.id);
  const canHover = useHoverCapable();
  const rowsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (canHover) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = top?.target.getAttribute('data-service');
        if (id) setActiveId(id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] },
    );

    rowsRef.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [canHover]);

  const active = services.find((s) => s.id === activeId) ?? services[0]!;

  return (
    <section id="servicos" className="bg-night-2 py-20 md:py-28 lg:py-32">
      <div className="page">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,3.5rem)] leading-none font-light">
          Serviços
        </h2>

        {/* CELULAR: faixa compacta que acompanha o item no centro da tela.
            Altura fixa em vez de proporção — as peças dela são 9:16 com
            tipografia queimada embaixo, e uma caixa alta empurrava a lista
            para fora da tela. */}
        <div className="sticky top-16 z-10 mt-7 md:hidden">
          <ServiceReel gallery={active.gallery} active className="h-[30dvh] w-full" />
          <p className="label text-gold bg-night-2 py-2.5">{active.name}</p>
        </div>

        <div className="mt-4 md:mt-14">
          {services.map((service) => {
            const isActive = service.id === activeId;

            return (
              <div
                key={service.id}
                data-service={service.id}
                ref={(node) => {
                  if (node) rowsRef.current.set(service.id, node);
                  else rowsRef.current.delete(service.id);
                }}
              >
                <button
                  type="button"
                  onMouseEnter={canHover ? () => setActiveId(service.id) : undefined}
                  onFocus={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  aria-current={isActive}
                  className={cn(
                    'line-t grid w-full items-center gap-5 py-6 text-left last:line-b',
                    'grid-cols-1 md:grid-cols-[1fr_180px] md:gap-10 md:py-7',
                    'transition-colors duration-400',
                  )}
                >
                  <span className="flex flex-col gap-2">
                    <span
                      className={cn(
                        'font-serif text-[clamp(1.35rem,3.2vw,2.2rem)] leading-[1.05] font-light transition-colors duration-400',
                        isActive ? 'text-cream' : 'text-cream/60',
                      )}
                    >
                      {service.name}
                    </span>
                    <span className="text-warm text-[12.5px] leading-[1.65] font-light md:text-[13.5px]">
                      {service.description}
                    </span>
                  </span>

                  {/* Miniatura grande, sempre presente. Esmaecida em repouso,
                      cheia em foco — nunca `opacity-0`, senão volta o vão. */}
                  <span
                    className={cn(
                      'hidden aspect-[4/5] w-full overflow-hidden transition-opacity duration-500 md:block',
                      isActive ? 'opacity-100' : 'opacity-30',
                    )}
                  >
                    <ServiceReel
                      gallery={service.gallery}
                      active={isActive && canHover}
                      className="h-full w-full"
                    />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
