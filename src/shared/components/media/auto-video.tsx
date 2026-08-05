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
 * Vídeo que toca sozinho, mudo e em loop, ao entrar na tela.
 *
 * ── POR QUE ISTO É MAIS COMPLICADO DO QUE PARECE ──────────────────────
 *
 * 1. ATRIBUTO, NÃO PROPRIEDADE. O React define `muted` como propriedade do
 *    elemento. O Safari lê o ATRIBUTO ao montar, vê um vídeo com som e recusa
 *    o autoplay. O `ref` abaixo escreve `muted` e `playsinline` à mão.
 *
 * 2. `play()` PODE FALHAR SEM SER BLOQUEIO. Se ainda não há dados no buffer, a
 *    promessa é rejeitada — e isso não significa que o navegador proibiu, só
 *    que era cedo demais. A versão anterior tratava a primeira rejeição como
 *    bloqueio permanente: acendia um ícone de play e deixava o vídeo invisível
 *    para sempre. Agora cada rejeição só agenda nova tentativa nos eventos
 *    `loadeddata` e `canplay`.
 *
 * 3. SEM ÍCONE DE PLAY. Se o sistema realmente proibir (Modo de Baixo Consumo
 *    do iPhone), fica só a capa. Uma imagem parada e bonita passa por escolha;
 *    um botão de play que não some passa por defeito.
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
  const [playing, setPlaying] = useState(false);

  const { ref, canPlay, near, forcePlay } = useVideoPool<HTMLDivElement>(id, {
    threshold,
    enabled: canAutoplay,
    priority: always,
  });

  const mounted = canAutoplay && (always || near);
  const shouldPlay = canAutoplay && canPlay;

  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute('muted', '');
    node.setAttribute('playsinline', '');
    node.setAttribute('webkit-playsinline', '');
  }, []);

  /** Tenta tocar. Falha aqui não é definitiva — os eventos de mídia repetem. */
  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const attempt = video.play();
    if (attempt) attempt.catch(() => undefined);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      tryPlay();
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [shouldPlay, mounted, tryPlay]);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-black', className)}
      onMouseEnter={canHover && canAutoplay ? forcePlay : undefined}
      /* Último recurso: se o sistema proibiu, o primeiro toque na tela libera. */
      onTouchStart={!playing ? tryPlay : undefined}
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
          /* `auto`, não `metadata`: o elemento só é montado quando já está
             perto da tela, e sem dados no buffer o play é rejeitado. */
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => shouldPlay && tryPlay()}
          onCanPlay={() => shouldPlay && tryPlay()}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            playing ? 'opacity-100' : 'opacity-0',
          )}
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
    </div>
  );
}
