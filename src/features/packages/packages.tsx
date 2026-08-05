import { pricingPackages } from '@/data/packages';
import { cn } from '@/shared/lib/cn';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

const MAX_HOURS = 12;

/**
 * Faixa horizontal de pacotes.
 *
 * O que a mantém longe do "cartão de SaaS" é o que ela NÃO tem: nenhuma borda
 * em volta, nenhum canto arredondado, nenhuma sombra. As colunas são separadas
 * apenas por fios verticais de 1px, e a primeira e a última encostam na margem
 * — então o conjunto lê como uma faixa contínua, não como quatro caixas.
 *
 * Acima passa um eixo do tempo com quatro marcadores em posição proporcional
 * às horas. O trecho até o pacote mais contratado vem preenchido em dourado.
 *
 * No celular as colunas empilham: quatro colunas roláveis exigiriam descoberta,
 * e empilhado todo mundo vê os quatro.
 */
export function Packages() {
  const highlightIndex = pricingPackages.findIndex((p) => p.mostBooked);
  const tickAt = (i: number) => ((i + 0.5) / pricingPackages.length) * 100;

  return (
    <section id="investimento" className="page py-20 md:py-28 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,3.5rem)] leading-none font-light">
          Investimento
        </h2>
        <span className="label text-warm">Brasília — DF</span>
      </div>

      {/* eixo do tempo — só no desktop, onde as colunas ficam lado a lado */}
      <div
        aria-hidden="true"
        className="relative mt-12 hidden h-px bg-[rgb(240_230_216/0.14)] md:block"
      >
        <span
          className="bg-gold absolute top-0 left-0 h-px"
          style={{ width: `${tickAt(highlightIndex)}%` }}
        />
        {pricingPackages.map((pkg, i) => (
          <span
            key={pkg.id}
            className={cn(
              'absolute -translate-x-1/2 rounded-full',
              pkg.mostBooked
                ? 'bg-gold border-gold -top-[5px] size-[9px] border'
                : 'bg-night -top-[4px] size-[7px] border border-[rgb(240_230_216/0.3)]',
            )}
            style={{ left: `${tickAt(i)}%` }}
          />
        ))}
      </div>

      <div className="mt-6 grid md:mt-0 md:grid-cols-4">
        {pricingPackages.map((pkg, index) => (
          <div
            key={pkg.id}
            className={cn(
              'relative transition-colors duration-400',
              // respiro interno próprio no celular, para nada encostar na borda
              'px-5 py-9 sm:px-6 md:px-6 md:py-10',
              // celular: fio entre linhas. desktop: fio entre colunas.
              index > 0 && 'line-t md:border-t-0',
              index > 0 && 'md:line-l',
              'md:first:pl-0 md:last:pr-0',
              // o realce sangra até a borda da tela só no celular
              pkg.mostBooked && 'bg-[rgb(201_169_106/0.07)] -mx-5 sm:-mx-8 md:mx-0',
            )}
          >
            {pkg.mostBooked && (
              <span className="bg-gold text-night absolute top-0 left-5 -translate-y-1/2 px-2.5 py-1 text-[8.5px] tracking-[0.2em] uppercase sm:left-6 md:left-6">
                Mais contratado
              </span>
            )}

            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  'font-serif text-[clamp(2.6rem,7vw,4rem)] leading-[0.85] font-light',
                  pkg.mostBooked ? 'text-gold' : 'text-cream',
                )}
              >
                {pkg.hours}
              </span>
              <span className="label text-warm text-[9.5px]">horas</span>
            </div>

            <h3 className="font-serif mt-5 text-[clamp(1.4rem,3vw,1.8rem)] leading-none font-light">
              {pkg.name}
            </h3>

            <p className="text-warm mt-2.5 text-[12.5px] leading-[1.65] font-light md:min-h-[62px]">
              {pkg.summary}
            </p>

            <ul className="line-t text-warm mt-5 pt-4 text-[12.5px] leading-[1.55]">
              {pkg.features.map((feature) => (
                <li key={feature} className="relative mb-2.5 pl-4">
                  <span className="bg-gold/75 absolute top-[0.7em] left-0 h-px w-[7px]" />
                  {feature}
                </li>
              ))}
            </ul>

            <p
              className={cn(
                'font-serif mt-6 text-[clamp(2rem,5vw,2.9rem)] leading-none font-light',
                pkg.mostBooked ? 'text-gold' : 'text-cream',
              )}
            >
              {formatBRL(pkg.price)}
            </p>

            <a
              href={buildWhatsAppLink(messages.package(pkg.name))}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'label mt-4 inline-block border-b pb-1.5 text-[10px] transition-colors duration-300',
                pkg.mostBooked
                  ? 'border-gold text-gold'
                  : 'hover:border-gold hover:text-gold border-[rgb(240_230_216/0.28)]',
              )}
            >
              Escolher este pacote
            </a>
          </div>
        ))}
      </div>

      <MaxHoursNote />
    </section>
  );
}

/** Nota discreta: existe só para o eixo do tempo fazer sentido semântico. */
function MaxHoursNote() {
  return (
    <p className="sr-only">
      Os pacotes variam de 2 a {MAX_HOURS} horas de cobertura.
    </p>
  );
}
