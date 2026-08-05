import { useCallback, useEffect, useRef, useState } from 'react';

import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';
import { useVideoPool } from '@/shared/hooks/use-video-pool';
import { cn } from '@/shared/lib/cn';

interface AutoVideoProps {
  id: string;
  src: string;
  poster: string;
  poster2x?: string;
  posterFallback?: string;
  alt: string;
  className?: string;
  sizes?: string;
  threshold?: number;
  /** Toca sempre, fora da fila. Herói e painel de serviço em foco. */
  always?: boolean;
  objectPosition?: string;
  priority?: boolean;
}

/**
 * Vídeo que toca sozinho, mudo e em loop.
 *
 * ── AUTOPLAY NO CELULAR ───────────────────────────────────────────────
 * O iOS só permite autoplay quando o elemento está `muted` E `playsinline`
 * NO MOMENTO em que o carregamento começa. Duas armadilhas aqui:
 *
 * 1. O React define `muted` como PROPRIEDADE, não como atributo HTML. O
 *    Safari lê o atributo ao montar o elemento, vê um vídeo com som e recusa
 *    o autoplay. Por isso o `ref` abaixo escreve `muted` e `playsInline`
 *    imperativamente antes de qualquer tentativa de tocar.
 *
 * 2. Chamar `.play()` só pelo JavaScript é menos confiável que o atributo
 *    `autoplay` declarativo. Usamos os dois.
 *
 * Mesmo assim o autoplay é bloqueado no Modo de Baixo Consumo do iPhone, e
 * não há como contornar. Nesse caso o componente mostra um indicador de toque
 * discreto — o vídeo passa a tocar ao tocar na tela, e o site não parece
 * quebrado.
 */
export function AutoVideo({
  id,
  src,
  poster,
  poster2x,
  posterFallback,
  alt,
  className,
  sizes = '(max-width: 768px) 50vw, 25vw',
  threshold = 0.25,
  always = false,
  objectPosition,
  priority = false,
}: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { canAutoplay } = useMediaPolicy();
  const canHover = useHoverCapable();
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const { ref, canPlay, near, forcePlay } = useVideoPool<HTMLDivElement>(id, {
    threshold,
    enabled: canAutoplay,
    priority: always,
  });

  const mounted = canAutoplay && (always || near);
  const shouldPlay = canAutoplay && canPlay;

  /**
   * Garante `muted`/`playsInline` como ATRIBUTOS antes de o Safari decidir
   * se permite autoplay. Sem isso, o vídeo fica congelado no iPhone.
   */
  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute('muted', '');
    node.setAttribute('playsinline', '');
    node.setAttribute('webkit-playsinline', '');
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      video.muted = true;
      const attempt = video.play();
      if (attempt) {
        attempt.then(() => setBlocked(false)).catch(() => setBlocked(true));
      }
    } else {
      video.pause();
    }
  }, [shouldPlay, mounted]);

  /** Toque manual: única saída quando o sistema bloqueia o autoplay. */
  const playByTouch = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => setBlocked(false)).catch(() => undefined);
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-black', className)}
      onMouseEnter={canHover && canAutoplay ? forcePlay : undefined}
      onTouchStart={blocked ? playByTouch : undefined}
    >
      <img
        src={poster}
        {...(poster2x ? { srcSet: `${poster} 640w, ${poster2x} 1280w`, sizes } : {})}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className="absolute inset-0 h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />

      {mounted && (
        <video
          ref={attachVideo}
          src={src}
          poster={posterFallback ?? poster}
          autoPlay
          muted
          loop
          playsInline
          preload={always ? 'auto' : 'metadata'}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onPlaying={() => setBlocked(false)}
          onError={() => setBlocked(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            ready && shouldPlay && !blocked ? 'opacity-100' : 'opacity-0',
          )}
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}

      {/* Bloqueado pelo sistema (Modo de Baixo Consumo): sinaliza que dá toque */}
      {blocked && (
        <span
          className="border-cream/50 text-cream/90 pointer-events-none absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-full border backdrop-blur-sm"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 size-3 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}
    </div>
  );
}
