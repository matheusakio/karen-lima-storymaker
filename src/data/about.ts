/**
 * Conteúdo da página Sobre.
 *
 * ⚠️ A bio abaixo é redação de apoio, construída SOMENTE a partir do que a
 * própria Karen publica: "Filmmaker | StoryMaker | FashionFilm",
 * "StoryMaker & Videomaker Mobile", "Vídeos cinematográficos para marcas,
 * eventos e histórias inesquecíveis", Brasília – DF, e os serviços da tabela
 * de investimento dela.
 *
 * Não há aqui nenhum número, prêmio, tempo de carreira ou nome de cliente —
 * nada disso foi confirmado. Peça o texto dela e substitua.
 */
export const aboutContent = {
  /** Caminho da foto em /public. `null` mostra um campo de cor da marca. */
  portrait: null as string | null, // ex.: '/images/karen-retrato.jpg'

  bio: [
    'Filmmaker e videomaker mobile em Brasília. Trabalho com captação, edição e direção criativa de vídeos cinematográficos para marcas, clínicas e eventos.',
    'Fashion film, cobertura de eventos e conteúdo pensado para circular nas redes — do briefing à entrega, com os formatos prontos para onde o vídeo vai viver.',
  ] as readonly string[],
} as const;
