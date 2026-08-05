export interface Service {
  id: string;
  name: string;
  description: string;
  /**
   * Peças que passam quando o serviço está em foco.
   *
   * A ideia: cada serviço mostra a linguagem dele em movimento, não uma capa
   * parada. Storymaker passa registros de story, Fashion Film passa beleza,
   * Cobertura passa evento. Aceita de 2 a 6 ids do catálogo.
   */
  gallery: readonly string[];
}

export const services: readonly Service[] = [
  {
    id: 'storymaker',
    name: 'Storymaker',
    description: 'Cobertura em tempo real de eventos, experiências e bastidores.',
    gallery: ['v060', 'v001', 'v057'],
  },
  {
    id: 'videomaker-mobile',
    name: 'Videomaker Mobile',
    description: 'Captação e edição profissional pensadas para redes sociais.',
    gallery: ['v067', 'v071', 'v060'],
  },
  {
    id: 'fashion-film',
    name: 'Fashion Film',
    description: 'Produções visuais para moda, beleza, ensaios e campanhas.',
    gallery: ['v071', 'v067'],
  },
  {
    id: 'conteudo-marcas',
    name: 'Conteúdo para Marcas',
    description: 'Vídeos estratégicos para clínicas, empresas e profissionais.',
    gallery: ['v057', 'v060', 'v065'],
  },
  {
    id: 'cobertura-eventos',
    name: 'Cobertura de Eventos',
    description: 'Registro completo com conteúdo cinematográfico e entrega digital.',
    gallery: ['v064', 'v069', 'v061', 'v065'],
  },
];
