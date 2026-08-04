/** Tabela de investimento — valores confirmados pelo material oficial da Karen. */

export interface PricingPackage {
  id: string;
  name: string;
  hours: number;
  duration: string;
  summary: string;
  features: readonly string[];
  price: number;
  mostBooked?: boolean;
}

export const pricingPackages: readonly PricingPackage[] = [
  {
    id: 'signature',
    name: 'Signature',
    hours: 2,
    duration: '2 horas',
    summary: 'Ideal para atendimentos, lançamentos, ensaios e produção de conteúdo.',
    features: [
      'Captação profissional',
      'Bastidores',
      '2 a 4 vídeos editados',
      'Direcionamento criativo',
    ],
    price: 550,
  },
  {
    id: 'select',
    name: 'Select',
    hours: 4,
    duration: '4 horas',
    summary: 'Ideal para eventos, ativações de marca e produções completas.',
    features: [
      'Captação completa',
      'Reels editados',
      'Bastidores exclusivos',
      'Conteúdo otimizado para redes sociais',
    ],
    price: 1000,
    mostBooked: true,
  },
  {
    id: 'prestige',
    name: 'Prestige',
    hours: 8,
    duration: '8 horas',
    summary: 'Ideal para casamentos, eventos corporativos e grandes coberturas.',
    features: [
      'Cobertura completa',
      'Conteúdo em tempo real',
      'Reels premium',
      'Direção criativa durante todo o evento',
    ],
    price: 1900,
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    hours: 12,
    duration: '12 horas',
    summary: 'Para quem deseja registrar toda a experiência com excelência.',
    features: [
      'Acompanhamento completo',
      'Conteúdo durante todo o evento',
      'Entrega premium',
      'Atendimento prioritário',
    ],
    price: 2800,
  },
];

export interface ExclusiveService {
  id: string;
  name: string;
  fromPrice: number | null;
  note: string;
  projectId: string;
}

export const exclusiveServices: readonly ExclusiveService[] = [
  {
    id: 'fashion-film',
    name: 'Fashion Film',
    fromPrice: 600,
    note: 'Produção autoral com direção de arte.',
    projectId: 'v071',
  },
  {
    id: 'cobertura-eventos',
    name: 'Cobertura de Eventos',
    fromPrice: 700,
    note: 'Registro completo do início ao fim.',
    projectId: 'v061',
  },
  {
    id: 'pacotes-mensais',
    name: 'Pacotes Mensais',
    fromPrice: null,
    note: 'Para clínicas e empresas, conforme a demanda.',
    projectId: 'v057',
  },
];

/* ------------------------------------------------------------------ *
 *  PRODUTOS E MENTORIAS — PLACEHOLDER
 *
 *  ⚠️ Nenhum produto real foi informado. Os itens abaixo existem só para
 *  a seção ter forma durante o desenvolvimento e estão marcados como
 *  `placeholder: true`. A seção NÃO aparece no site enquanto todos os
 *  itens forem placeholder — ver `hasRealProducts` abaixo.
 * ------------------------------------------------------------------ */
export interface Product {
  id: string;
  name: string;
  description: string;
  audience: string;
  format: string;
  price: number | null;
  priceLabel?: string;
  cover: string | null;
  ctaLabel: string;
  placeholder: boolean;
}

export const products: readonly Product[] = [
  {
    id: 'placeholder-mentoria',
    name: 'Nome da mentoria',
    description: 'Descrição curta do que a pessoa aprende e do resultado esperado.',
    audience: 'Para quem é',
    format: 'Formato e duração',
    price: null,
    priceLabel: 'A definir',
    cover: null,
    ctaLabel: 'Tenho interesse',
    placeholder: true,
  },
];

export const hasRealProducts = products.some((p) => !p.placeholder);
