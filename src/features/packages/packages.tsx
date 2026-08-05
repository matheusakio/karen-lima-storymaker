import { pricingPackages } from '@/data/packages';
import { cn } from '@/shared/lib/cn';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

/**
 * Faixa de pacotes.
 *
 * Esta é a seção que vende, e ela estava passando batido: o realce do pacote
 * mais contratado era um dourado a 7% de opacidade — invisível na prática — e
 * a seção inteira tinha o mesmo peso visual do resto da página.
 *
 * O que dá destaque agora, sem virar cartão de SaaS:
 *  · a seção troca de fundo, criando um bloco próprio na página
 *  · o pacote em destaque tem fundo sólido claro e inverte as cores
 *  · o valor é o maior número da página inteira
 *  · o botão do destaque é sólido, não sublinhado
 */
export function Packages() {
  return (
    <section id="investimento" className="bg-night py-20 md:py-28 lg:py-32">
      <div className="page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label text-gold">Investimento</span>
            <h2 className="font-serif mt-3 serif-display text-[clamp(2.2rem,6vw,3.5rem)] leading-none">
              Pacotes de cobertura
            </h2>
          </div>
          <span className="label text-warm">Brasília — DF</span>
        </div>

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {pricingPackages.map((pkg) => {
            const featured = Boolean(pkg.mostBooked);

            return (
              <div
                key={pkg.id}
                className={cn(
                  'relative flex flex-col p-6 transition-colors duration-400 md:p-7',
                  featured
                    ? 'bg-cream text-night md:-my-4 md:pt-11'
                    : 'bg-night-2 text-cream hover:bg-[rgb(240_230_216/0.05)]',
                )}
              >
                {featured && (
                  <span className="bg-night text-gold absolute top-0 left-6 -translate-y-1/2 px-3 py-1.5 text-[9px] font-medium tracking-[0.2em] uppercase md:left-7">
                    Mais contratado
                  </span>
                )}

                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      'font-serif serif-display text-[clamp(2.4rem,6vw,3.4rem)] leading-[0.85]',
                      featured ? 'text-night' : 'text-gold',
                    )}
                  >
                    {pkg.hours}
                  </span>
                  <span
                    className={cn(
                      'label text-[9.5px] font-medium',
                      featured ? 'text-night/60' : 'text-warm',
                    )}
                  >
                    horas
                  </span>
                </div>

                <h3
                  className={cn(
                    'font-serif mt-5 text-[clamp(1.5rem,3vw,1.9rem)] leading-none',
                    featured ? 'text-night' : 'text-cream',
                  )}
                >
                  {pkg.name}
                </h3>

                <p
                  className={cn(
                    'mt-2.5 text-[13px] leading-[1.6] font-light',
                    featured ? 'text-night/70' : 'text-warm',
                  )}
                >
                  {pkg.summary}
                </p>

                <ul
                  className={cn(
                    'mt-5 flex-1 border-t pt-4 text-[13px] leading-[1.5]',
                    featured ? 'border-night/15 text-night/80' : 'border-cream/12 text-warm',
                  )}
                >
                  {pkg.features.map((feature) => (
                    <li key={feature} className="relative mb-2.5 pl-4">
                      <span
                        className={cn(
                          'absolute top-[0.7em] left-0 h-px w-[7px]',
                          featured ? 'bg-night/50' : 'bg-gold/75',
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p
                  className={cn(
                    'font-serif mt-6 serif-display text-[clamp(2.2rem,5.5vw,3rem)] leading-none',
                    featured ? 'text-night' : 'text-cream',
                  )}
                >
                  {formatBRL(pkg.price)}
                </p>

                <a
                  href={buildWhatsAppLink(messages.package(pkg.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'label mt-5 flex h-12 items-center justify-center text-[10px] font-medium transition-colors duration-300',
                    featured
                      ? 'bg-night text-cream hover:bg-gold hover:text-night'
                      : 'border-cream/25 hover:border-gold hover:text-gold border',
                  )}
                >
                  Escolher
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
