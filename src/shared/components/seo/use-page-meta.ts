import { useEffect } from 'react';

import { siteConfig } from '@/config/site';

interface PageMeta {
  title: string;
  description?: string;
}

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/**
 * SEO client-side por rota. Suficiente para uma SPA de portfólio;
 * se um dia o SEO virar prioridade, migre para SSG (Astro/Next) sem tocar nas features.
 */
export function usePageMeta({ title, description }: PageMeta): void {
  useEffect(() => {
    document.title = `${title} — ${siteConfig.brand}`;
    setMetaTag('description', description ?? siteConfig.description);
  }, [title, description]);
}
