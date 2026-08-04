import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

/**
 * `false` em touch. Usado para não esconder affordance atrás de :hover e para
 * escolher entre preview-por-hover (desktop) e preview-por-viewport (celular).
 */
export function useHoverCapable(): boolean {
  const [canHover, setCanHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return canHover;
}
