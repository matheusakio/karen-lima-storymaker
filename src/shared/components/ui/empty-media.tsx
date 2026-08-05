import { siteConfig } from '@/config/site';
import { Button } from '@/shared/components/ui/button';

/**
 * Estado exibido enquanto não há nenhum arquivo em public/videos.
 *
 * Existe para que o site nunca precise de conteúdo fictício para parecer
 * completo: em vez de cards falsos, uma mensagem honesta com link para o
 * portfólio real da Karen.
 */
export function EmptyMedia() {
  return (
    <div className="border-ink/12 flex flex-col items-start gap-6 border-t py-16">
      <span className="label">Portfólio em migração</span>

      <p className="font-display text-ink max-w-lg text-2xl leading-snug font-light md:text-3xl">
        Os trabalhos estão sendo preparados para o site.
      </p>

      <p className="text-ink-soft/80 max-w-md text-[0.95rem] leading-[1.7] font-light">
        Enquanto isso, o material completo está no Instagram e na pasta de portfólio.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          as="a"
          href={siteConfig.social.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
        >
          {siteConfig.social.instagram.label}
        </Button>

        <Button
          as="a"
          href={siteConfig.social.portfolioDrive}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
        >
          Ver portfólio
        </Button>
      </div>
    </div>
  );
}
