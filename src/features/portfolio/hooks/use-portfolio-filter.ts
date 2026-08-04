import { useMemo, useState } from 'react';

import { mediaItems, type MediaItem } from '@/data/media';
import type { FilterValue } from '@/features/portfolio/components/category-filter';

interface UsePortfolioFilter {
  filter: FilterValue;
  setFilter: (value: FilterValue) => void;
  items: readonly MediaItem[];
  countFor: (value: FilterValue) => number;
}

/** Isola a lógica de filtragem da apresentação. */
export function usePortfolioFilter(initial: FilterValue = 'all'): UsePortfolioFilter {
  const [filter, setFilter] = useState<FilterValue>(initial);

  const items = useMemo(
    () =>
      filter === 'all' ? mediaItems : mediaItems.filter((item) => item.category === filter),
    [filter],
  );

  const countFor = (value: FilterValue) =>
    value === 'all'
      ? mediaItems.length
      : mediaItems.filter((item) => item.category === value).length;

  return { filter, setFilter, items, countFor };
}
