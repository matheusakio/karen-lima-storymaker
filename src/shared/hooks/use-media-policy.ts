import { useEffect, useState } from 'react';

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Política de reprodução automática.
 *
 * Só uma coisa impede o autoplay: o usuário ter pedido menos movimento no
 * sistema. É uma escolha explícita dele e precisa ser respeitada.
 *
 * ⚠️ NÃO bloqueie por `saveData`. No Android o Modo de Economia de Dados vem
 * ligado de fábrica em muitos aparelhos, e bloquear por causa dele fazia o
 * site inteiro aparecer congelado no celular — foi exatamente o que
 * aconteceu. Quem entra num site de filmmaker espera ver vídeo; o cuidado com
 * dados já está no peso dos previews (~1 MB) e no carregamento sob demanda.
 *
 * `lightMode` fica exposto para quem quiser usar em decisões mais brandas,
 * como diminuir o número de vídeos simultâneos.
 */
export function useMediaPolicy(): {
  canAutoplay: boolean;
  reducedMotion: boolean;
  lightMode: boolean;
} {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [lightMode, setLightMode] = useState(false);

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
      setLightMode(
        Boolean(conn.saveData) ||
          conn.effectiveType === '2g' ||
          conn.effectiveType === 'slow-2g',
      );

    evaluate();
    const target = conn as unknown as EventTarget;
    target.addEventListener?.('change', evaluate);
    return () => target.removeEventListener?.('change', evaluate);
  }, []);

  return { canAutoplay: !reducedMotion, reducedMotion, lightMode };
}
