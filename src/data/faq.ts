export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * VAZIO DE PROPÓSITO.
 *
 * A seção de FAQ só aparece no site quando esta lista tiver itens.
 * Preencher exige informação real da Karen — prazo de entrega, política de
 * sinal, se atende fora de Brasília. Qualquer resposta inventada aqui vira
 * promessa comercial que ela teria de cumprir.
 *
 * Perguntas que valem confirmar com ela:
 *   · Qual o prazo médio de entrega?
 *   · Como funciona a reserva de data / sinal?
 *   · Atende fora de Brasília? Como cobra deslocamento?
 *   · Quantas revisões estão inclusas?
 *   · O que exatamente é entregue (formatos, resolução, arquivos brutos)?
 *
 * Formato:
 *   { id: 'prazo', question: '…?', answer: '…' }
 */
export const faqItems: readonly FaqItem[] = [];
