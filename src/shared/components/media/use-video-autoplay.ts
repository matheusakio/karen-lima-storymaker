import { useCallback, useEffect, useRef } from 'react';

/**
 * Autoplay confiável no iOS.
 *
 * O Safari do iPhone é o navegador mais restritivo aqui, e cada detalhe abaixo
 * corresponde a um motivo real de recusa que já derrubou este site:
 *
 * 1. ATRIBUTO, NÃO PROPRIEDADE — o React define `muted` como propriedade; o
 *    Safari lê o ATRIBUTO no momento de montar e, sem ele, considera o vídeo
 *    com som e recusa.
 *
 * 2. `load()` ANTES DE `play()` — quando o `src` é definido depois da criação
 *    do elemento (que é o que o React faz), o Safari às vezes não inicia o
 *    carregamento sozinho. Chamar `load()` força.
 *
 * 3. FALHA NÃO É DEFINITIVA — sem dados no buffer a promessa é rejeitada, e
 *    isso significa "cedo demais", não "proibido". Tentar uma vez só era o que
 *    deixava vídeo congelado.
 *
 * 4. TENTATIVAS ESPAÇADAS — além dos eventos de mídia, algumas tentativas ao
 *    longo dos primeiros segundos cobrem o caso de rede lenta.
 *
 * O que NÃO tem contorno: Modo de Baixo Consumo do iPhone. Nesse caso fica a
 * capa, sem ícone e sem erro.
 */
export function useVideoAutoplay(enabled: boolean) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const timers = useRef<number[]>([]);

  const attach = useCallback((node: HTMLVideoElement | null) => {
    ref.current = node;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute('muted', '');
    node.setAttribute('playsinline', '');
    node.setAttribute('webkit-playsinline', '');
    node.setAttribute('disableRemotePlayback', '');
  }, []);

  const play = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;

    // Se nem os metadados chegaram, empurra o carregamento.
    if (video.readyState === 0) {
      try {
        video.load();
      } catch {
        /* ignora */
      }
    }

    const attempt = video.play();
    if (attempt) attempt.catch(() => undefined);
  }, []);

  useEffect(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    if (!enabled) return;

    play();
    // rede lenta: repete nos primeiros segundos
    timers.current = [300, 1200, 3000].map((ms) => window.setTimeout(play, ms));

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [enabled, play]);

  return { ref, attach, play };
}
