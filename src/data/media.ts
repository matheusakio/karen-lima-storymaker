/**
 * Catálogo do portfólio.
 *
 * O conteúdo vem de `media.generated.ts`, produzido por `npm run media` a
 * partir dos arquivos em public/videos e public/images/gallery.
 * Título e cliente saem do nome do arquivo — nada aqui é inventado.
 *
 * Para ajustar um título ou escrever uma descrição, use OVERRIDES no fim
 * deste arquivo. O que não estiver lá continua vindo do nome do arquivo.
 */

import { generatedMedia } from './media.generated';

export const CATEGORIES = {
  fashion: 'Fashion Film',
  clinicas: 'Clínicas & Estética',
  eventos: 'Eventos',
  marcas: 'Marcas',
  reels: 'Reels',
  outros: 'Outros',
} as const;

export type Category = keyof typeof CATEGORIES;

/** Forma bruta que o script gera. */
export interface GeneratedMedia {
  id: string;
  kind: 'video' | 'photo';
  category: string;
  title: string;
  client: string | null;
  src: string;
  poster: string | null;
}

export interface MediaItem {
  id: string;
  kind: 'video' | 'photo';
  category: Category;
  title: string;
  client: string | null;
  description: string | null;
  src: string;
  poster: string | null;
  featured: boolean;
}

/**
 * Ajustes manuais por id (= nome do arquivo sem extensão).
 * Só o que você escrever aqui sobrescreve o valor vindo do arquivo.
 *
 * Exemplo:
 *   'fashion__arabian-glow': {
 *     title: 'Arabian Glow — Full Face',
 *     description: 'Abertura da mentoria, direção de arte e trilha autoral.',
 *     featured: true,
 *   },
 */
const OVERRIDES: Record<string, Partial<Omit<MediaItem, 'id' | 'src'>>> = {};

/** Ordem de exibição. Ids não listados vão para o fim, em ordem alfabética. */
const ORDER: readonly string[] = [];

function isCategory(value: string): value is Category {
  return value in CATEGORIES;
}

function normalize(raw: GeneratedMedia): MediaItem {
  const override = OVERRIDES[raw.id] ?? {};

  return {
    id: raw.id,
    kind: override.kind ?? raw.kind,
    category: override.category ?? (isCategory(raw.category) ? raw.category : 'outros'),
    title: override.title ?? raw.title,
    client: override.client ?? raw.client,
    description: override.description ?? null,
    src: raw.src,
    poster: override.poster ?? raw.poster,
    featured: override.featured ?? false,
  };
}

function byOrder(a: MediaItem, b: MediaItem): number {
  const indexA = ORDER.indexOf(a.id);
  const indexB = ORDER.indexOf(b.id);
  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return a.title.localeCompare(b.title, 'pt-BR');
}

export const mediaItems: readonly MediaItem[] = generatedMedia.map(normalize).sort(byOrder);

/** Destaques da home. Sem marcação manual, usa os 6 primeiros. */
export const featuredItems: readonly MediaItem[] = (() => {
  const marked = mediaItems.filter((item) => item.featured);
  return marked.length > 0 ? marked : mediaItems.slice(0, 6);
})();

/** Só categorias que têm conteúdo — evita filtro vazio na interface. */
export const activeCategories: readonly Category[] = (
  Object.keys(CATEGORIES) as Category[]
).filter((category) => mediaItems.some((item) => item.category === category));

export const hasMedia = mediaItems.length > 0;
