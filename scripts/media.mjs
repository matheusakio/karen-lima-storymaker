#!/usr/bin/env node
/**
 * Pipeline de mídia — converte, gera capa e preview.
 *
 *   npm run media
 *
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  1. Jogue os arquivos originais em  media-entrada/               │
 * │     (aceita .mov .mp4 .m4v — inclusive HEVC direto do iPhone)    │
 * │  2. Rode  npm run media                                          │
 * │  3. Copie o bloco impresso no fim para  src/data/projects.ts     │
 * └──────────────────────────────────────────────────────────────────┘
 *
 * O que ele resolve, e que é fácil errar na mão:
 *
 * · HEVC → H.264. Safari toca HEVC, Chrome e Firefox não. Arquivo do iPhone
 *   vem em HEVC e simplesmente não abre para metade dos visitantes.
 * · Rotação. O iPhone grava 3840x2160 com uma matriz de rotação; ler só a
 *   dimensão bruta faz o vídeo parecer horizontal quando é vertical.
 * · faststart. Sem `-movflags +faststart` o vídeo só começa depois de baixar
 *   inteiro.
 * · Três versões por peça, com qualidade calibrada:
 *      poster   capa estática              ~150 KB
 *      preview  8 s, mudo, 720px, crf 23   ~1-3 MB   (toca no scroll)
 *      full     completo, 1080px, crf 23   ~5-30 MB  (só abre no modal)
 *
 * Nome do arquivo vira id e título:
 *   encerramento-de-evento.mov  →  id "encerramento-de-evento"
 *                                  título "Encerramento de Evento"
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const IN = join(ROOT, 'media-entrada');
const OUT = join(ROOT, 'public/media');

const SOURCE_EXT = new Set(['.mov', '.mp4', '.m4v']);
const MINOR = new Set(['de', 'da', 'do', 'e', 'em', 'na', 'no', 'para', 'com']);

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', ...args], { stdio: 'pipe' });

function probe(file, entries, stream = false) {
  const args = ['-v', 'error'];
  if (stream) args.push('-select_streams', 'v:0');
  args.push('-show_entries', entries, '-of', 'default=nw=1:nk=1', file);
  return execFileSync('ffprobe', args, { encoding: 'utf8' }).trim().split('\n');
}

function titleFrom(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w, i) => (i > 0 && MINOR.has(w) ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ');
}

function timecode(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function main() {
  if (!existsSync(IN)) {
    mkdirSync(IN, { recursive: true });
    console.log(`\n  Pasta criada: media-entrada/`);
    console.log(`  Coloque os arquivos lá e rode de novo.\n`);
    return;
  }

  for (const dir of ['poster', 'preview', 'full', 'hero']) {
    mkdirSync(join(OUT, dir), { recursive: true });
  }

  const files = readdirSync(IN)
    .filter((f) => !f.startsWith('.') && SOURCE_EXT.has(extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log(`\n  Nenhum arquivo em media-entrada/.\n`);
    return;
  }

  const entries = [];

  for (const file of files) {
    const src = join(IN, file);
    const id = basename(file, extname(file));

    const [durRaw] = probe(src, 'format=duration');
    const duration = Number(durRaw) || 0;
    if (!duration) {
      console.log(`  ✗ ${file} — não consegui ler a duração, pulando`);
      continue;
    }

    // dimensão APÓS rotação: extrai um quadro e mede o resultado
    ff(['-ss', String(duration / 3), '-i', src, '-frames:v', '1', '-q:v', '3',
      '-vf', "scale='min(1200,iw)':-2", join(OUT, 'poster', `${id}.jpg`), '-y']);
    const [w, h] = probe(join(OUT, 'poster', `${id}.jpg`), 'stream=width,height', true).map(Number);
    const vertical = h > w;

    const scale = vertical ? 'scale=1080:-2' : 'scale=1920:-2';

    ff(['-i', src, '-vf', scale, '-c:v', 'libx264', '-crf', '23', '-preset', 'veryfast',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '128k',
      join(OUT, 'full', `${id}.mp4`), '-y']);

    // preview sempre do ORIGINAL, nunca do mp4 já comprimido (perda de geração)
    ff(['-ss', String(duration * 0.15), '-t', '8', '-i', src, '-an',
      '-vf', vertical ? 'scale=720:-2' : 'scale=1280:-2',
      '-c:v', 'libx264', '-crf', '23', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', join(OUT, 'preview', `${id}.mp4`), '-y']);

    entries.push({ id, title: titleFrom(id), vertical, duration: timecode(duration) });
    console.log(`  ✓ ${id}  ${vertical ? '9:16' : '16:9'}  ${timecode(duration)}`);
  }

  const block = entries
    .map(
      (e) => `  {
    id: '${e.id}',
    title: '${e.title}',
    client: null,
    category: 'clinicas', // clinicas | eventos | fashion | story | lifestyle
    year: ${new Date().getFullYear()},
    location: 'Brasília — DF',
    services: ['Captação', 'Edição'],
    ...media('${e.id}'),
    shape: '${e.vertical ? 'tall' : 'wide'}',
    durationLabel: '${e.duration}',
    description: null,
  },`,
    )
    .join('\n');

  writeFileSync(join(ROOT, 'media-saida.txt'), block, 'utf8');

  console.log(`\n  ${entries.length} peça(s) processada(s).`);
  console.log(`  Bloco pronto em  media-saida.txt`);
  console.log(`  Cole dentro de  projects  em src/data/projects.ts`);
  console.log(`  e ajuste categoria, serviços e título.\n`);
}

main();
