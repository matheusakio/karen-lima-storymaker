import { AnimatePresence, motion } from 'motion/react';

import type { MediaItem } from '@/data/media';

import { MediaCard } from './media-card';

interface MediaGridProps {
  items: readonly MediaItem[];
  onSelect: (item: MediaItem) => void;
  /** Colunas no desktop. Home usa 3, portfólio usa 4. */
  columns?: 3 | 4;
}

export function MediaGrid({ items, onSelect, columns = 3 }: MediaGridProps) {
  if (items.length === 0) return null;

  return (
    <motion.div
      layout
      className={
        columns === 4
          ? 'grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4'
          : 'grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6'
      }
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <MediaCard key={item.id} item={item} index={index} onSelect={onSelect} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
