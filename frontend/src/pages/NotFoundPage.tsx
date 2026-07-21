import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center text-center px-4">
      <div className="space-y-5 rounded-[2rem] border border-gold-300/15 bg-ink-900/80 p-10 shadow-glow">
        <div className="text-sm uppercase tracking-[0.35em] text-gold-200">Not found</div>
        <h1 className="font-display text-4xl font-semibold text-white">This page does not exist.</h1>
        <p className="text-mist-200">Return home and continue building the Mira experience.</p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-gradient-to-r from-gold-500 to-ember-400 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow transition hover:opacity-95"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
