import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

import { useHoverCapable } from '@/shared/hooks/use-hover-capable';
import { useMediaPolicy } from '@/shared/hooks/use-media-policy';

/**
 * Cursor customizado com a palavra PLAY.
 * Só existe em ponteiro fino e quando o usuário não pediu menos movimento.
 * Segue o mouse com atraso por spring — nunca cola no ponteiro.
 */
export function PlayCursor({ containerId }: { containerId: string }) {
  const canHover = useHoverCapable();
  const { reducedMotion } = useMediaPolicy();
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!canHover || reducedMotion) return;
    const container = document.getElementById(containerId);
    if (!container) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 34);
      y.set(event.clientY - 34);
    };
    const enter = (event: Event) => {
      if ((event.target as HTMLElement).closest('button')) setVisible(true);
    };
    const leave = () => setVisible(false);

    container.addEventListener('mousemove', move);
    container.addEventListener('mouseover', enter);
    container.addEventListener('mouseout', leave);
    return () => {
      container.removeEventListener('mousemove', move);
      container.removeEventListener('mouseover', enter);
      container.removeEventListener('mouseout', leave);
    };
  }, [canHover, reducedMotion, containerId, x, y]);

  if (!canHover || reducedMotion) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      className="bg-ink text-paper pointer-events-none fixed top-0 left-0 z-50 grid size-[68px] place-items-center rounded-full"
    >
      <span className="meta text-[0.55rem]">Play</span>
    </motion.div>
  );
}
