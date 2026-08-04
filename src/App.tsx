import { About } from '@/features/about/about';
import { Contact } from '@/features/contact/contact';
import { Hero } from '@/features/hero/hero';
import { Manifesto } from '@/features/manifesto/manifesto';
import { ExclusiveServices } from '@/features/packages/exclusive';
import { Packages } from '@/features/packages/packages';
import { Portfolio } from '@/features/portfolio/portfolio';
import { Products } from '@/features/products/products';
import { Services } from '@/features/services/services';
import { Credits } from '@/shared/components/layout/credits';
import { Nav } from '@/shared/components/layout/nav';
import { StickyCta } from '@/shared/components/layout/sticky-cta';

export default function App() {
  return (
    <>
      <a
        href="#trabalhos"
        className="focus:bg-cream focus:text-night sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:text-xs focus:uppercase"
      >
        Pular para os trabalhos
      </a>

      <Nav />

      <main>
        <Hero />
        <Manifesto />
        <Portfolio />
        <Services />
        <Packages />
        <ExclusiveServices />
        <Products />
        <About />
        <Contact />
      </main>

      <Credits />
      <StickyCta />
    </>
  );
}
