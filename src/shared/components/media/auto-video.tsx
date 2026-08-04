import { useEffect, useRef, useState } from 'react';

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
 * Regras:
 * · Toca ao entrar na tela, com teto de simultâneos (ver `use-video-pool`).
 * · No desktop, passar o mouse força a reprodução na hora — se estava
 *   esperando vaga, fura a fila. Assim nada fica parado sob o cursor.
 * · Pausa ao sair da tela e devolve a vaga.
 * · Se o autoplay for bloqueado, ou houver `prefers-reduced-motion` ou
 *   economia de dados, fica a capa — sem quadro preto e sem erro.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { canAutoplay } = useMediaPolicy();
  const canHover = useHoverCapable();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const { ref, canPlay, near, forcePlay } = useVideoPool<HTMLDivElement>(id, {
    threshold,
    enabled: canAutoplay,
    priority: always,
  });

  const mounted = canAutoplay && !failed && (always || near);
  const shouldPlay = canAutoplay && !failed && canPlay;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) video.play().catch(() => setFailed(true));
    else video.pause();
  }, [shouldPlay]);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-black', className)}
      onMouseEnter={canHover && canAutoplay ? forcePlay : undefined}
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
          ref={videoRef}
          src={src}
          poster={posterFallback ?? poster}
          muted
          loop
          playsInline
          preload={always ? 'auto' : 'metadata'}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            ready && shouldPlay ? 'opacity-100' : 'opacity-0',
          )}
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
    </div>
  );
}
