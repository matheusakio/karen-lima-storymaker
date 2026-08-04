# Vídeos

Coloque aqui os arquivos baixados do Drive da Karen.

## Nomeação

Use o mesmo `id` do vídeo em `src/data/videos.ts`:

```
arabian-glow-full-face.mp4
hellen-azevedo-clinica.mp4
```

## Compressão (obrigatório)

Arquivo direto do celular pesa 80–300 MB e derruba o carregamento do site.
Comprima antes de subir — com [ffmpeg](https://ffmpeg.org):

**Vídeo do hero** (loop curto, sem áudio, alvo < 6 MB):

```bash
ffmpeg -i entrada.mp4 -t 12 -an \
  -vf "scale=1920:-2" \
  -c:v libx264 -crf 26 -preset slow -movflags +faststart \
  hero-reel.mp4
```

**Vídeos do portfólio** (com áudio, alvo < 15 MB):

```bash
ffmpeg -i entrada.mp4 \
  -vf "scale=1280:-2" \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart \
  -c:a aac -b:a 128k \
  nome-do-video.mp4
```

`-movflags +faststart` é o que permite o vídeo começar a tocar antes de baixar
inteiro. Não pule esse parâmetro.

## Poster (capa)

Cada vídeo precisa de um frame de capa em `public/images/posters/`:

```bash
ffmpeg -i nome-do-video.mp4 -ss 00:00:02 -frames:v 1 -q:v 3 \
  ../images/posters/nome-do-video.jpg
```

## Depois de subir os arquivos

Abra `src/data/videos.ts` e troque `src: null` pelo caminho:

```ts
src: '/videos/arabian-glow-full-face.mp4',
poster: '/images/posters/arabian-glow.jpg',
```

Para o hero, edite `src/features/home/hero-media.ts`.

> Arquivos `.mp4` estão no `.gitignore` — não versione vídeo no git.
> Em produção o Netlify serve direto de `public/`, ou use um CDN/Cloudinary
> e aponte `src` para a URL externa.
