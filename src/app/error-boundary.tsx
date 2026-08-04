import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Impede que um erro de render derrube a página inteira em branco. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container-page grid min-h-dvh place-items-center">
        <div className="flex flex-col items-start gap-5">
          <span className="label">Algo deu errado</span>

          <h1 className="font-display text-ink text-4xl font-light">
            Não foi possível carregar esta página
          </h1>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-ink text-paper hover:bg-ink-soft h-12 px-7 text-[0.68rem] tracking-[0.24em] uppercase transition-colors"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }
}
