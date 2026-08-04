import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { ErrorBoundary } from '@/app/error-boundary';
import '@/styles/globals.css';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root não encontrado.');

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
