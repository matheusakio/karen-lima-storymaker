import { siteConfig } from '@/config/site';

/** Monta o link do WhatsApp. Único lugar do site que conhece o número. */
export function buildWhatsAppLink(message?: string): string {
  const url = new URL('https://api.whatsapp.com/send');
  url.searchParams.set('phone', siteConfig.contact.whatsappE164);
  url.searchParams.set('type', 'phone_number');
  url.searchParams.set('app_absent', '0');
  if (message) url.searchParams.set('text', message);
  return url.toString();
}

const PREFIX = 'Olá, Karen! Conheci seu trabalho pelo site';

export const messages = {
  general: `${PREFIX} e gostaria de saber mais sobre seus serviços.`,
  budget: `${PREFIX} e gostaria de solicitar um orçamento.`,
  package: (name: string) => `${PREFIX} e gostaria de saber mais sobre o pacote ${name}.`,
  service: (name: string) => `${PREFIX} e gostaria de saber mais sobre ${name}.`,
  product: (name: string) => `${PREFIX} e tenho interesse em ${name}.`,
  topic: (topic: string) => `${PREFIX} e gostaria de conversar sobre ${topic}.`,
};
