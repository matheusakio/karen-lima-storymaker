export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

/**
 * Etapas de trabalho.
 *
 * ⚠️ TEXTO DE APOIO, NÃO INFORMAÇÃO CONFIRMADA.
 * Descreve o fluxo genérico de uma produção audiovisual e não afirma prazo,
 * número de revisões nem qualquer compromisso comercial. Revise com a Karen
 * antes de publicar; se algo não corresponder ao processo dela, troque.
 */
export const processSteps: readonly ProcessStep[] = [
  {
    id: 'briefing',
    title: 'Briefing',
    description:
      'Conversa inicial para entender a marca, o objetivo do vídeo e onde ele vai circular.',
  },
  {
    id: 'direcao',
    title: 'Direção',
    description: 'Referências, roteiro de planos e definição de estética antes de gravar.',
  },
  {
    id: 'captacao',
    title: 'Captação',
    description: 'Registro no set, com luz, movimento e bastidores.',
  },
  {
    id: 'entrega',
    title: 'Entrega',
    description: 'Edição, cor e trilha, com os arquivos finalizados nos formatos combinados.',
  },
];
