import { useEffect, useState } from 'react';

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Decide se o site pode dar autoplay em vídeo.
 *
 * Nega quando o usuário pediu menos movimento no sistema, quando o navegador
 * sinaliza economia de dados, ou em conexões 2g. Nesses casos o site mostra
 * poster com botão explícito de reprodução — continua funcional.
 */
export function useMediaPolicy(): { canAutoplay: boolean; reducedMotion: boolean } {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (!conn) return;
    const evaluate = () =>
      setSaveData(
        Boolean(conn.saveData) || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g',
      );
    evaluate();
    const target = conn as unknown as EventTarget;
    target.addEventListener?.('change', evaluate);
    return () => target.removeEventListener?.('change', evaluate);
  }, []);

  return { canAutoplay: !reducedMotion && !saveData, reducedMotion };
}
