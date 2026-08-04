export interface NavItem {
  label: string;
  to: string;
}

export const navigation: readonly NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Portfólio', to: '/portfolio' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
] as const;
