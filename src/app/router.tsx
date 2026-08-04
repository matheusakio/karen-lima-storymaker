import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/shared/components/layout/root-layout';
import { RouteFallback } from '@/app/route-fallback';

// Code splitting por rota — a home carrega sem o peso das outras páginas.
const HomePage = lazy(() => import('@/pages/home-page'));
const PortfolioPage = lazy(() => import('@/pages/portfolio-page'));
const ServicesPage = lazy(() => import('@/pages/services-page'));
const AboutPage = lazy(() => import('@/pages/about-page'));
const ContactPage = lazy(() => import('@/pages/contact-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'portfolio', element: withSuspense(<PortfolioPage />) },
      { path: 'servicos', element: withSuspense(<ServicesPage />) },
      { path: 'sobre', element: withSuspense(<AboutPage />) },
      { path: 'contato', element: withSuspense(<ContactPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
