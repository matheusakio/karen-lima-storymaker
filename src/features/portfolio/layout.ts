import type { Project } from '@/data/projects';

/**
 * Composição do portfólio em FILEIRAS.
 *
 * Por que não cascata e não grade livre:
 *
 * · Cascata (`columns`) nunca deixa buraco, mas também não alinha nada — cada
 *   card termina numa altura diferente e o conjunto lê como espalhado.
 * · Grade com módulos de tamanhos diferentes alinha, mas sobra célula vazia
 *   sempre que a conta não fecha.
 *
 * A composição por fileiras resolve os dois: DENTRO da fileira todos os cards
 * têm a mesma altura e alinham em cima e embaixo; a variedade vem da diferença
 * ENTRE fileiras — uma com duas peças altas, a seguinte com três médias, a
 * outra com duas panorâmicas. E como cada fileira distribui a largura entre
 * exatamente os itens que tem, nunca sobra espaço.
 */
export interface Row {
  items: Project[];
  /** Proporção aplicada a todos os cards desta fileira. */
  aspect: string;
}

/** Ritmo do desktop: quantos cards por fileira e qual a altura de cada uma. */
const DESKTOP_PATTERN: { count: number; aspect: string }[] = [
  { count: 2, aspect: 'aspect-[4/5]' }, // abertura: duas peças grandes
  { count: 3, aspect: 'aspect-[9/16]' }, // respiro: três verticais
  { count: 2, aspect: 'aspect-[16/10]' }, // panorâmica: corta o ritmo
  { count: 3, aspect: 'aspect-[3/4]' },
];

/**
 * Celular: alterna peça cheia e par, sempre nessa ordem.
 *
 * Três colunas não cabem numa tela de 390px, e dois cards 9:16 lado a lado
 * ficam estreitos e altos demais — pareciam miniatura, não portfólio. O ritmo
 * abaixo dá uma peça grande a cada duas pequenas e mantém todo card acima de
 * ~180px de largura.
 *
 * O ciclo soma 6, então qualquer quantidade cai em fileiras cheias e a última
 * absorve o resto ocupando a largura toda.
 */
const MOBILE_PATTERN: { count: number; aspect: string }[] = [
  { count: 1, aspect: 'aspect-[4/5]' }, // peça grande, abre o bloco
  { count: 2, aspect: 'aspect-[1/1]' }, // par compacto
  { count: 1, aspect: 'aspect-[16/10]' }, // panorâmica, respiro
  { count: 2, aspect: 'aspect-[3/4]' }, // par um pouco mais alto
];

/**
 * Distribui os projetos nas fileiras seguindo o padrão, em ciclo.
 *
 * A última fileira recebe o que sobrar e divide a largura entre esses itens —
 * é isso que garante que nunca exista célula vazia, seja qual for a quantidade
 * de trabalhos ou o filtro ativo.
 */
export function buildRows(projects: readonly Project[], isDesktop: boolean): Row[] {
  const pattern = isDesktop ? DESKTOP_PATTERN : MOBILE_PATTERN;
  const rows: Row[] = [];

  let cursor = 0;
  let step = 0;

  while (cursor < projects.length) {
    const spec = pattern[step % pattern.length]!;
    const remaining = projects.length - cursor;
    const count = Math.min(spec.count, remaining);

    rows.push({
      items: projects.slice(cursor, cursor + count) as Project[],
      aspect: spec.aspect,
    });

    cursor += count;
    step += 1;
  }

  return rows;
}
