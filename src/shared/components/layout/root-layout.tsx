import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';
import { WhatsAppFab } from './whatsapp-fab';

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="focus:bg-ink focus:text-paper sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:text-xs focus:uppercase"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFab />
      <ScrollRestoration />
    </div>
  );
}
