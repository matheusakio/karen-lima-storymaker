import { useState, type FormEvent } from 'react';

import { pricingPackages } from '@/data/packages';
import { Button } from '@/shared/components/ui/button';
import { buildWhatsAppLink } from '@/shared/lib/whatsapp';

interface FormState {
  name: string;
  packageId: string;
  date: string;
  message: string;
}

const INITIAL: FormState = { name: '', packageId: '', date: '', message: '' };

const FIELD =
  'h-12 w-full border-0 border-b border-ink/20 bg-transparent px-0 text-[0.95rem] font-light text-ink transition-colors duration-300 placeholder:text-ink-mute/60 focus:border-ink focus:outline-none';

/**
 * Formulário sem backend: monta uma mensagem estruturada e abre o WhatsApp.
 * Zero infraestrutura e o lead chega onde a Karen já atende.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pkg = pricingPackages.find((item) => item.id === form.packageId);
    const lines = [
      'Oi Karen! Vim pelo site.',
      form.name && `Meu nome é ${form.name}.`,
      pkg && `Tenho interesse no pacote ${pkg.name} (${pkg.duration}).`,
      form.date && `Data prevista: ${new Date(`${form.date}T00:00`).toLocaleDateString('pt-BR')}.`,
      form.message && `\n${form.message}`,
    ].filter(Boolean);

    window.open(buildWhatsAppLink(lines.join(' ')), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="label">
          Nome
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="Como posso te chamar?"
          className={FIELD}
        />
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="package" className="label">
            Pacote
          </label>
          <select
            id="package"
            value={form.packageId}
            onChange={(event) => update('packageId', event.target.value)}
            className={FIELD}
          >
            <option value="">Ainda não sei</option>
            {pricingPackages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} · {pkg.duration}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="label">
            Data prevista
          </label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(event) => update('date', event.target.value)}
            className={FIELD}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label">
          Sobre o projeto
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          placeholder="O que você quer registrar, onde e para qual canal."
          className={`${FIELD} h-auto resize-none py-3`}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Enviar pelo WhatsApp
        </Button>

        <p className="text-ink-mute text-xs font-light">
          Abre o WhatsApp com a mensagem já preenchida.
        </p>
      </div>
    </form>
  );
}
