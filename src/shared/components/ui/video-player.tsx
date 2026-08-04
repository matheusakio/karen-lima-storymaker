import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  /** Autoplay silencioso em loop. */
  ambient?: boolean;
  controls?: boolean;
  title?: string;
}

/**
 * Player com controles textuais, sem ícone.
 * A UI nativa é inconsistente entre navegadores e destoa da tipografia do site.
 */
export function VideoPlayer({
  src,
  poster,
  className,
  ambient = false,
  controls = true,
  title,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(ambient);
  const [muted, setMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ambient) return;
    // Autoplay pode ser bloqueado pelo navegador; falha em silêncio.
    void video.play().catch(() => setPlaying(false));
  }, [ambient]);

  return (
    <div className={cn('group relative h-full w-full overflow-hidden', className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        className="h-full w-full object-cover"
        playsInline
        loop
        muted={muted}
        preload={ambient ? 'auto' : 'metadata'}
        autoPlay={ambient}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {controls && (
        /* Sempre visíveis no touch; em desktop entram no hover. */
        <div className="absolute inset-x-0 bottom-0 flex items-stretch transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
          <button
            type="button"
            onClick={togglePlay}
            className="bg-paper/92 text-ink hover:bg-ink hover:text-paper h-11 flex-1 text-[0.58rem] tracking-[0.28em] uppercase transition-colors"
          >
            {playing ? 'Pausar' : 'Reproduzir'}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="bg-paper/92 text-ink hover:bg-ink hover:text-paper border-ink/10 h-11 flex-1 border-l text-[0.58rem] tracking-[0.28em] uppercase transition-colors"
          >
            {muted ? 'Com som' : 'Sem som'}
          </button>
        </div>
      )}
    </div>
  );
}
