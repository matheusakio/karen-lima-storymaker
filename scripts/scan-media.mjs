#!/usr/bin/env node
/**
 * Varre as pastas de mídia e gera src/data/media.generated.ts.
 *
 * Uso:  npm run media
 *
 * ┌─ ONDE COLOCAR CADA COISA ──────────────────────────────────────────┐
 * │  public/videos/          → vídeos do portfólio (.mp4 .webm .mov)   │
 * │  public/images/posters/  → capa de cada vídeo (mesmo nome do .mp4) │
 * │  public/images/gallery/  → fotos avulsas do portfólio             │
 * └────────────────────────────────────────────────────────────────────┘
 *
 * Convenção de nome (partes opcionais, separadas por "__"):
 *
 *   categoria__titulo-do-trabalho__cliente.mp4
 *
 * Exemplos:
 *   fashion__arabian-glow-full-face__mentoria-arabian-glow.mp4
 *   clinicas__bastidores__hellen-azevedo-clinica.mp4
 *   reels__procedimento-estetico.mp4
 *   qualquer-nome.mp4                        → categoria "outros"
 *
 * Categorias aceitas: fashion, clinicas, eventos, marcas, reels.
 * Nada aqui inventa dado: título e cliente vêm do nome do arquivo.
 */

import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIRS = {
  videos: join(ROOT, 'public/videos'),
  posters: join(ROOT, 'public/images/posters'),
  gallery: join(ROOT, 'public/images/gallery'),
};
const OUTPUT = join(ROOT, 'src/data/media.generated.ts');

const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov']);
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.webp', '.png', '.avif']);
const POSTER_EXT = ['.jpg', '.jpeg', '.webp', '.png', '.avif'];

const CATEGORY_ALIASES = {
  fashion: 'fashion',
  'fashion-film': 'fashion',
  fashionfilm: 'fashion',
  clinicas: 'clinicas',
  clinica: 'clinicas',
  estetica: 'clinicas',
  eventos: 'eventos',
  evento: 'eventos',
  casamento: 'eventos',
  marcas: 'marcas',
  marca: 'marcas',
  reels: 'reels',
  reel: 'reels',
};

const MINOR_WORDS = new Set(['de', 'da', 'do', 'e', 'em', 'na', 'no', 'para', 'com']);

function toTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word, index) =>
      index > 0 && MINOR_WORDS.has(word) ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join(' ');
}

function listFiles(dir, allowed) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => !file.startsWith('.') && allowed.has(extname(file).toLowerCase()))
    .sort();
}

function findPoster(id) {
  for (const ext of POSTER_EXT) {
    if (existsSync(join(DIRS.posters, id + ext))) return `/images/posters/${id}${ext}`;
  }
  return null;
}

function parseName(fileName) {
  const stem = basename(fileName, extname(fileName));
  const parts = stem.split('__');

  if (parts.length >= 2 && CATEGORY_ALIASES[parts[0]]) {
    return {
      id: stem,
      category: CATEGORY_ALIASES[parts[0]],
      title: toTitle(parts[1]),
      client: parts[2] ? toTitle(parts[2]) : null,
    };
  }

  return { id: stem, category: 'outros', title: toTitle(stem), client: null };
}

function main() {
  const videos = listFiles(DIRS.videos, VIDEO_EXT).map((file) => ({
    ...parseName(file),
    kind: 'video',
    src: `/videos/${file}`,
    poster: findPoster(basename(file, extname(file))),
  }));

  const photos = listFiles(DIRS.gallery, IMAGE_EXT).map((file) => ({
    ...parseName(file),
    kind: 'photo',
    src: `/images/gallery/${file}`,
    poster: `/images/gallery/${file}`,
  }));

  const items = [...videos, ...photos];

  const contents = `// ⚠️ ARQUIVO GERADO — não edite à mão.
// Gerado por scripts/scan-media.mjs a partir de public/videos e public/images/gallery.
// Rode \`npm run media\` sempre que adicionar ou remover arquivos.

import type { GeneratedMedia } from './media';

export const generatedMedia: readonly GeneratedMedia[] = ${JSON.stringify(items, null, 2)};
`;

  writeFileSync(OUTPUT, contents, 'utf8');

  console.log(`\n  ${videos.length} vídeo(s) · ${photos.length} foto(s)\n`);

  for (const item of items) {
    const flag = item.kind === 'video' && !item.poster ? '   ← sem poster' : '';
    console.log(`  ${item.kind === 'video' ? '▸' : '▫'} ${item.title}  [${item.category}]${flag}`);
  }

  if (items.length === 0) {
    console.log('  Nenhuma mídia encontrada.');
    console.log('  Coloque os arquivos em public/videos/ e public/images/gallery/.');
  }

  console.log(`\n  → src/data/media.generated.ts\n`);
}

main();
