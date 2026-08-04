import { useEffect, useRef, useState } from 'react';

/**
 * Pool de reprodução com limite de simultâneos.
 *
 * A versão anterior deixava UM vídeo tocar no site inteiro. Evitava travamento,
 * mas congelava tudo o que não fosse o item da vez — a grade parecia quebrada.
 *
 * Agora vários tocam ao mesmo tempo, com teto. Quatro streams mudos em 720p
 * são tranquilos para qualquer aparelho atual; o problema real era decodificar
 * doze. Quando o teto é atingido, quem entra depois espera a primeira vaga —
 * e assim que alguém sai de cena a vaga é repassada na hora.
 */
const MAX_CONCURRENT = 4;

/** Ids tocando agora, na ordem em que pediram. */
const playing = new Set<string>();
/** Ids esperando vaga. */
const waiting: string[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function pump() {
  while (playing.size < MAX_CONCURRENT && waiting.length > 0) {
    const next = waiting.shift();
    if (next) playing.add(next);
  }
  notify();
}

function request(id: string) {
  if (playing.has(id) || waiting.includes(id)) return;
  if (playing.size < MAX_CONCURRENT) playing.add(id);
  else waiting.push(id);
  notify();
}

function release(id: string) {
  const had = playing.delete(id);
  const index = waiting.indexOf(id);
  if (index !== -1) waiting.splice(index, 1);
  if (had) pump();
  else notify();
}

interface Options {
  /** Fração visível para pedir vaga. */
  threshold?: number;
  enabled?: boolean;
  /** Ignora a fila e toca sempre (herói, painel de serviço em foco). */
  priority?: boolean;
}

interface Result<T> {
  ref: React.RefObject<T>;
  /** Tem vaga: pode tocar. */
  canPlay: boolean;
  /** Está perto da tela: hora de montar o <video>. */
  near: boolean;
  /** Força a vaga — usado no hover, para responder na hora. */
  forcePlay: () => void;
}

export function useVideoPool<T extends HTMLElement>(
  id: string,
  { threshold = 0.25, enabled = true, priority = false }: Options = {},
): Result<T> {
  const ref = useRef<T>(null);
  const [canPlay, setCanPlay] = useState(priority);
  const [near, setNear] = useState(priority);

  useEffect(() => {
    if (priority) {
      setCanPlay(true);
      return;
    }
    const update = () => setCanPlay(playing.has(id));
    listeners.add(update);
    update();
    return () => {
      listeners.delete(update);
      release(id);
    };
  }, [id, priority]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled || priority) return;

    // monta o <video> um pouco antes, para o play não ter espera
    const nearObserver = new IntersectionObserver(
      ([entry]) => entry && setNear(entry.isIntersecting),
      { rootMargin: '500px 0px' },
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) request(id);
        else release(id);
      },
      { threshold },
    );

    nearObserver.observe(element);
    playObserver.observe(element);

    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
    };
  }, [id, threshold, enabled, priority]);

  /**
   * No hover o vídeo precisa responder imediatamente, mesmo sem vaga.
   * Libera o mais antigo para abrir espaço.
   */
  const forcePlay = () => {
    if (playing.has(id)) return;
    if (playing.size >= MAX_CONCURRENT) {
      const oldest = playing.values().next().value;
      if (oldest) playing.delete(oldest);
    }
    playing.add(id);
    notify();
  };

  return { ref, canPlay: priority || canPlay, near: priority || near, forcePlay };
}
