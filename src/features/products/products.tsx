import { hasRealProducts, products } from '@/data/packages';
import { Button } from '@/shared/components/ui/button';
import { formatBRL } from '@/shared/lib/format';
import { buildWhatsAppLink, messages } from '@/shared/lib/whatsapp';

/**
 * Produtos e mentorias — cartelas de abertura de filme.
 *
 * ⚠️ A seção NÃO renderiza enquanto todos os itens forem placeholder. Isso
 * impede que conteúdo de exemplo vá ao ar por acidente. Assim que um produto
 * real for cadastrado em `data/packages.ts` com `placeholder: false`, a seção
 * aparece sozinha.
 */
export function Products() {
  if (!hasRealProducts) return null;

  const real = products.filter((p) => !p.placeholder);

  return (
    <section id="produtos" className="bg-ink text-paper py-24 md:py-32">
      <div className="container-page">
        <div className="flex items-baseline gap-4">
          <span className="meta text-gold">15:40</span>
          <span className="meta text-paper/50">Produtos e mentorias</span>
        </div>

        <div className="mt-14 flex flex-col gap-20">
          {real.map((product) => (
            <article key={product.id} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="aspect-[4/5] w-full overflow-hidden bg-black">
                  {product.cover && (
                    <img
                      src={product.cover}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-7">
                <h3 className="font-display wonk text-[2.4rem] leading-[0.95] font-light md:text-6xl">
                  {product.name}
                </h3>

                <p className="text-paper/70 mt-6 max-w-lg text-[1.02rem] leading-[1.7] font-light">
                  {product.description}
                </p>

                <dl className="mt-8 flex flex-col">
                  {[
                    ['Para quem', product.audience],
                    ['Formato', product.format],
                    [
                      'Investimento',
                      product.price !== null
                        ? formatBRL(product.price)
                        : (product.priceLabel ?? '—'),
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border-paper/15 grid grid-cols-[8rem_1fr] gap-4 border-b py-3"
                    >
                      <dt className="meta text-gold">{label}</dt>
                      <dd className="text-paper/85 text-sm font-light">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8">
                  <Button
                    as="a"
                    href={buildWhatsAppLink(messages.product(product.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="invert"
                    size="lg"
                  >
                    {product.ctaLabel}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
