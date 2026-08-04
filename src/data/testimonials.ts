export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

/**
 * VAZIO DE PROPÓSITO.
 *
 * A seção só aparece quando houver depoimento real, com autorização de quem
 * escreveu. Depoimento inventado num site comercial é o tipo de coisa que a
 * Karen teria de sustentar numa conversa com o cliente.
 *
 * Formato:
 *   { id: 'evento-oab', quote: '…', author: 'Nome, cargo' }
 */
export const testimonials: readonly Testimonial[] = [];
