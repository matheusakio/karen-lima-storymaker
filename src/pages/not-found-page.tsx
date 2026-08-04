import { Link } from 'react-router-dom';

import { usePageMeta } from '@/shared/components/seo/use-page-meta';
import { Button } from '@/shared/components/ui/button';

export default function NotFoundPage() {
  usePageMeta({ title: 'Página não encontrada' });

  return (
    <section className="container-page flex min-h-dvh flex-col justify-center py-32">
      <span className="label">Erro 404</span>

      <h1 className="font-display text-ink mt-6 max-w-2xl text-[2.8rem] leading-[0.98] font-light text-balance md:text-7xl">
        Esta página não existe
      </h1>

      <p className="text-ink-soft/85 mt-6 max-w-md text-[0.95rem] leading-[1.7] font-light">
        O link que você seguiu não leva a lugar nenhum.
      </p>

      <div className="mt-10">
        <Button as={Link} to="/" size="lg" className="w-full sm:w-auto">
          Voltar ao início
        </Button>
      </div>
    </section>
  );
}
