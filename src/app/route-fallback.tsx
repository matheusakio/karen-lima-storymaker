/** Placeholder entre rotas — discreto, sem spinner. */
export function RouteFallback() {
  return (
    <div className="grid min-h-dvh place-items-center" role="status" aria-live="polite">
      <span className="label">Carregando</span>
    </div>
  );
}
