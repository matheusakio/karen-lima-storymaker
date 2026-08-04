import { useState } from 'react';
import { Link } from 'react-router-dom';

import { featuredItems, hasMedia, type MediaItem } from '@/data/media';
import { MediaGrid } from '@/features/portfolio/components/media-grid';
import { MediaLightbox } from '@/features/portfolio/components/media-lightbox';
import { Button } from '@/shared/components/ui/button';
import { EmptyMedia } from '@/shared/components/ui/empty-media';
import { Reveal } from '@/shared/components/ui/reveal';
import { Section, SectionHeader } from '@/shared/components/ui/section';

export function FeaturedWork() {
  const [selected, setSelected] = useState<MediaItem | null>(null);

  return (
    <Section id="trabalhos" className="container-page">
      <Reveal>
        <SectionHeader label="Selecionados" title="Trabalhos" />
      </Reveal>

      <div className="mt-14 md:mt-20">
        {hasMedia ? (
          <>
            <MediaGrid items={featuredItems} onSelect={setSelected} columns={3} />

            <Reveal className="mt-16 flex justify-start">
              <Button as={Link} to="/portfolio" variant="outline" size="md">
                Ver tudo
              </Button>
            </Reveal>
          </>
        ) : (
          <EmptyMedia />
        )}
      </div>

      <MediaLightbox item={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
