/**
 * Catálogo do portfólio.
 *
 * ⚠️ REGRA DE PRIVACIDADE — não remova sem falar com a Karen.
 * Nenhuma peça com rosto de cliente identificável em procedimento entra aqui.
 * Ficaram de fora as séries de antes/depois de harmonização facial: é o
 * material mais sensível do acervo e exige autorização escrita de cada pessoa.
 *
 * ⚠️ TÍTULOS PROVISÓRIOS. São descrições neutras do que se vê no quadro, não
 * os nomes reais dos projetos. Nenhum cliente é nomeado. Troque `title` e
 * preencha `client` quando a Karen mandar os nomes e as liberações.
 *
 * COMO TROCAR UMA PEÇA
 *   1. coloque o original em media-entrada/
 *   2. npm run media
 *   3. troque o bloco correspondente aqui
 */

export const CATEGORIES = {
  clinicas: 'Clínicas',
  eventos: 'Eventos',
  fashion: 'Fashion Film',
  story: 'Storymaker',
  lifestyle: 'Lifestyle',
} as const;

export type Category = keyof typeof CATEGORIES;

export interface Project {
  id: string;
  title: string;
  client: string | null;
  category: Category;
  year: number;
  location: string;
  services: readonly string[];
  poster: string;
  poster2x: string;
  posterFallback: string;
  previewVideo: string;
  fullVideo: string;
  durationLabel: string;
  description: string | null;
}

const M = '/media';

/**
 * Capa em duas larguras (640 e 1280) em WebP — o navegador escolhe pelo
 * `sizes`, então um card pequeno baixa ~35 KB em vez de ~106 KB.
 * O JPEG serve ao atributo `poster` do <video>.
 */
const media = (id: string) => ({
  poster: `${M}/poster/${id}.webp`,
  poster2x: `${M}/poster/${id}@2x.webp`,
  posterFallback: `${M}/poster/${id}.jpg`,
  previewVideo: `${M}/preview/${id}.mp4`,
  fullVideo: `${M}/full/${id}.mp4`,
});

/**
 * A ALTURA DE CADA CARD NÃO MORA AQUI.
 * Ela vem da fileira em que a peça cai — ver `features/portfolio/layout.ts`.
 * Reordenar esta lista muda a composição; é o jeito de ajustar o ritmo.
 *
 * TÍTULOS
 *
 * Sempre que a peça tem um título gravado por ela na tela, é ele que vale —
 * "Mão na Massa", "Mentoria Full Face", "Transforma", "Não tenha medo de
 * recomeçar". São palavras dela, já testadas no público dela, e valem mais que
 * qualquer descrição que eu escrevesse.
 *
 * Onde não há título gravado, usamos o nome real do que está em quadro (o
 * congresso, a lei citada no letreiro) ou o serviço vendido ("Ativação em
 * bar"), nunca uma descrição genérica.
 */
export const projects: readonly Project[] = [
  {
    id: 'v067',
    title: 'Transforma',
    client: null,
    category: 'lifestyle',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Direção criativa', 'Captação', 'Edição'],
    ...media('v067'),
    durationLabel: '00:34',
    description:
      'Filme de experiência: natureza, pousada e prática, costurados pelas palavras dela — sou, experiência, emocionante.',
  },
  {
    id: 'v060',
    title: 'Mão na Massa',
    client: null,
    category: 'story',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Cobertura', 'Montagem', 'Tipografia'],
    ...media('v060'),
    durationLabel: '00:32',
    description: 'Três salas acompanhadas em sequência, com cartela abrindo cada uma.',
  },
  {
    id: 'v001',
    title: 'Mentoria Full Face',
    client: null,
    category: 'eventos',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Cobertura', 'Edição'],
    ...media('v001'),
    durationLabel: '00:42',
    description: null,
  },
  {
    id: 'v069',
    title: 'Não tenha medo de recomeçar',
    client: null,
    category: 'eventos',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Cobertura', 'Edição', 'Direção criativa'],
    ...media('v069'),
    durationLabel: '00:30',
    description: 'Encerramento com texto autoral sobre a paisagem.',
  },
  {
    id: 'v064',
    title: 'VI Congresso de Direito Administrativo',
    client: null,
    category: 'eventos',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Cobertura', 'Edição'],
    ...media('v064'),
    durationLabel: '00:34',
    description: null,
  },
  {
    id: 'v071',
    title: 'Dia de salão',
    client: null,
    category: 'fashion',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Captação', 'Direção criativa', 'Edição'],
    ...media('v071'),
    durationLabel: '00:16',
    description: null,
  },
  {
    id: 'v057',
    title: 'Sala 01',
    client: null,
    category: 'clinicas',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Captação', 'Edição'],
    ...media('v057'),
    durationLabel: '00:19',
    description: 'Institucional de clínica: espaço, luz e acabamento.',
  },
  {
    id: 'v065',
    title: 'Fiscalização Contratual · Lei 14.133',
    client: null,
    category: 'eventos',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Cobertura', 'Edição', 'Legendagem'],
    ...media('v065'),
    durationLabel: '00:22',
    description: null,
  },
  {
    id: 'v061',
    title: 'Ativação em bar',
    client: null,
    category: 'eventos',
    year: 2026,
    location: 'Brasília — DF',
    services: ['Cobertura', 'Edição'],
    ...media('v061'),
    durationLabel: '00:21',
    description: null,
  },
];

/**
 * Abertura. Arquivo próprio e leve; o herói é a única mídia no primeiro paint.
 * Silencioso de propósito — som só dentro do modal, quando a pessoa escolhe
 * assistir. Para trocar, substitua os arquivos em /media/hero.
 */
export const heroMedia = {
  video: `${M}/hero/loop.mp4`,
  poster: `${M}/hero/poster.webp`,
  poster2x: `${M}/hero/poster@2x.webp`,
  posterFallback: `${M}/hero/poster.jpg`,
} as const;

/**
 * Manifesto. Precisa ser um vídeo SEM legenda queimada — o site coloca texto
 * por cima, e dois textos brigam. `v053` é macro, quente e limpo.
 */
export const MANIFESTO_ID = 'v053';
export const manifestoMedia = media(MANIFESTO_ID);

/** Fundo do contato. */
export const CONTACT_ID = 'v057';
export const contactMedia = media(CONTACT_ID);

/** Mídia da seção Sobre. */
export const ABOUT_ID = 'v060';
export const aboutMedia = media(ABOUT_ID);

export const activeCategories = (Object.keys(CATEGORIES) as Category[]).filter((c) =>
  projects.some((p) => p.category === c),
);

/** Pasta pública com o portfólio completo dela. */
export const PORTFOLIO_DRIVE =
  'https://drive.google.com/drive/folders/1ITKktcCpMu88SjOzATKWJtrCpF0LB7ZV';
