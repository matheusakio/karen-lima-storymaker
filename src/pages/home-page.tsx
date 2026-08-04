import { siteConfig } from '@/config/site';
import { CtaBand } from '@/features/home/components/cta-band';
import { FeaturedWork } from '@/features/home/components/featured-work';
import { Hero } from '@/features/home/components/hero';
import { Process } from '@/features/home/components/process';
import { usePageMeta } from '@/shared/components/seo/use-page-meta';
import { Marquee } from '@/shared/components/ui/marquee';

export default function HomePage() {
  usePageMeta({
    title: 'Filmmaker & Videomaker em Brasília',
    description: siteConfig.description,
  });

  return (
    <>
      <Hero />
      <Marquee items={siteConfig.specialties} />
      <FeaturedWork />
      <Process />
      <CtaBand />
    </>
  );
}
