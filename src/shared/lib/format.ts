const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formata um valor inteiro em reais: 1000 -> "R$ 1.000". */
export function formatBRL(value: number): string {
  return brl.format(value).replace(/\s/g, ' ');
}
