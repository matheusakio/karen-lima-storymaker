import { useEffect, useState } from 'react';

/**
 * Media query em JavaScript, para quando a diferença entre telas não é só
 * aparência mas ESTRUTURA.
 *
 * Esconder um bloco com `md:hidden` mantém tudo no DOM: os componentes montam,
 * criam observers e reservam memória mesmo invisíveis. Quando as duas versões
 * são listas de vídeo, isso dobra o custo à toa. Aqui só uma das árvores chega
 * a existir.
 *
 * Para diferenças puramente visuais, continue usando as classes do Tailwind —
 * é mais barato e não depende de JS.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Alinhado ao breakpoint `md` do Tailwind. */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
