import { useEffect, useState } from 'react';

/**
 * Acompanha qual seção está no centro da tela.
 * Usa uma faixa estreita no meio da viewport para evitar oscilação entre
 * duas seções durante o scroll.
 */
export function useActiveSection(ids: readonly string[]): { id: string; progress: number } {
  const [id, setId] = useState(ids[0] ?? '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);

      const middle = window.innerHeight / 2;
      let current = ids[0] ?? '';

      for (const sectionId of ids) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= middle) current = sectionId;
      }
      setId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return { id, progress };
}
