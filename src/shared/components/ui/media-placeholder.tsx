import { cn } from '@/shared/lib/cn';

interface MediaPlaceholderProps {
  /** Mostrado em versalete no centro. Use o título do trabalho. */
  caption?: string;
  className?: string;
}

/**
 * Preenchimento para quando ainda não há arquivo de mídia.
 *
 * Deliberadamente sem ícone: um SVG com play desenhado dentro estica junto
 * com o container e briga com o texto do card. Aqui é só campo de cor e
 * tipografia real do DOM, que escala corretamente em qualquer proporção.
 */
export function MediaPlaceholder({ caption, className }: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'bg-paper-deep text-ink-mute flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center',
        className,
      )}
      aria-hidden="true"
    >
      <span className="bg-ink-mute/30 h-px w-8" />
      <span className="text-[0.6rem] tracking-[0.3em] uppercase">{caption ?? 'Karen Lima'}</span>
    </div>
  );
}
