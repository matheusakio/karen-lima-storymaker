/**
 * Mídia do hero — único ponto a editar para trocar a peça da primeira dobra.
 *
 * Ambos `null` → o hero mostra um campo de cor da marca, sem imagem quebrada.
 * Recomendado: MP4 vertical, ~1080px de largura, 8–15s em loop, < 6 MB.
 */
export const HERO_MEDIA: { video: string | null; poster: string | null } = {
  video: null, // ex.: '/videos/hero.mp4'
  poster: null, // ex.: '/images/hero-poster.jpg'
};
