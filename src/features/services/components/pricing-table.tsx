import { pricingPackages } from '@/data/packages';
import { Button } from '@/shared/components/ui/button';
import { RevealGroup, RevealItem } from '@/shared/components/ui/reveal';
import { cn } from '@/shared/lib/cn';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, whatsappMessages } from '@/shared/lib/whatsapp';

/**
 * Tabela de investimento em linhas, não em cards.
 * Quatro cards lado a lado competem entre si; a linha deixa o olho comparar
 * duração e valor na vertical, como numa tabela de preços impressa.
 */
export function PricingTable() {
  return (
    <RevealGroup className="border-ink/12 border-t">
      {pricingPackages.map((pkg) => (
        <RevealItem
          key={pkg.id}
          className={cn(
            'border-ink/12 group border-b transition-colors duration-500',
            pkg.highlighted && 'bg-paper-soft/60',
          )}
        >
          <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12">
            <div className="md:col-span-3">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-ink text-3xl leading-none font-light md:text-4xl">
                  {pkg.name}
                </h3>
                {pkg.badge && (
                  <span className="text-ink-mute text-[0.55rem] tracking-[0.24em] whitespace-nowrap uppercase">
                    {pkg.badge}
                  </span>
                )}
              </div>

              <p className="text-ink-mute mt-2 text-[0.65rem] tracking-[0.26em] uppercase">
                {pkg.duration}
              </p>
            </div>

            <div className="md:col-span-5">
              <p className="text-ink-soft/85 text-sm leading-[1.7] font-light">{pkg.summary}</p>

              <ul className="mt-4 flex flex-col gap-1.5">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-ink-soft flex gap-3 text-sm font-light before:content-['—'] before:opacity-40"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 md:col-span-4 md:items-end md:text-right">
              <p className="font-display text-ink text-4xl leading-none font-light md:text-5xl">
                {formatBRL(pkg.price)}
              </p>

              <Button
                as="a"
                href={buildWhatsAppLink(whatsappMessages.package(pkg.name))}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                Contratar
              </Button>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
