import { useState } from 'react';

import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';
import { useVideoPool } from '@/shared/hooks/use-video-pool';
import { cn } from '@/shared/lib/cn';
import { useVideoAutoplay } from './use-video-autoplay';

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
 * Vídeo que toca sozinho, mudo e em loop, ao entrar na tela.
 * A parte difícil — convencer o iOS a tocar — vive em `useVideoAutoplay`.
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
  const { canAutoplay } = useMediaPolicy();
  const canHover = useHoverCapable();
  const [playing, setPlaying] = useState(false);

  const { ref, canPlay, near, forcePlay } = useVideoPool<HTMLDivElement>(id, {
    threshold,
    enabled: canAutoplay,
    priority: always,
  });

  const mounted = canAutoplay && (always || near);
  const shouldPlay = canAutoplay && canPlay;

  const { attach, play } = useVideoAutoplay(mounted && shouldPlay);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-black', className)}
      onMouseEnter={canHover && canAutoplay ? forcePlay : undefined}
      onTouchStart={!playing ? play : undefined}
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
          ref={attach}
          poster={posterFallback ?? poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={play}
          onLoadedData={play}
          onCanPlay={play}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            playing ? 'opacity-100' : 'opacity-0',
          )}
          style={objectPosition ? { objectPosition } : undefined}
        >
          {/* `<source>` em vez do atributo `src`: com o src definido depois da
              criação do elemento, o Safari às vezes não inicia o carregamento. */}
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
