import { useState } from 'react';

import { hasMedia, type MediaItem } from '@/data/media';
import { CategoryFilter } from '@/features/portfolio/components/category-filter';
import { MediaGrid } from '@/features/portfolio/components/media-grid';
import { MediaLightbox } from '@/features/portfolio/components/media-lightbox';
import { usePortfolioFilter } from '@/features/portfolio/hooks/use-portfolio-filter';
import { usePageMeta } from '@/shared/components/seo/use-page-meta';
import { EmptyMedia } from '@/shared/components/ui/empty-media';
import { PageHero } from '@/shared/components/ui/page-hero';
import { Section } from '@/shared/components/ui/section';

export default function PortfolioPage() {
  const { filter, setFilter, items, countFor } = usePortfolioFilter();
  const [selected, setSelected] = useState<MediaItem | null>(null);

  usePageMeta({
    title: 'Portfólio',
    description:
      'Fashion films, coberturas de eventos e conteúdo para clínicas produzidos por Karen Lima em Brasília.',
  });

  return (
    <>
      <PageHero label="Portfólio" title="Trabalhos" />

      <Section className="container-page !pt-0">
        {hasMedia ? (
          <>
            <CategoryFilter value={filter} onChange={setFilter} countFor={countFor} />

            <div className="mt-14">
              <MediaGrid items={items} onSelect={setSelected} columns={4} />
            </div>
          </>
        ) : (
          <EmptyMedia />
        )}
      </Section>

      <MediaLightbox item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
