/**
 * ALSHAMAS logo mark — matches the brand identity:
 * Dark green circular badge, red "AL" + script-style "Shamas", gold leaf accent.
 */
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = {
    sm: { box: 'h-11 w-11 sm:h-12 sm:w-12', text: 'text-lg sm:text-xl', sub: 'text-[0.55rem]', emoji: 'text-lg' },
    md: { box: 'h-12 w-12', text: 'text-xl', sub: 'text-[0.6rem]', emoji: 'text-xl' },
    lg: { box: 'h-16 w-16', text: 'text-2xl', sub: 'text-xs', emoji: 'text-2xl' },
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Badge */}
      <div className="relative">
        <div className={`flex ${dims.box} items-center justify-center rounded-2xl bg-primary-800 shadow-lg shadow-primary-800/30`}>
          {/* Gold leaf accent */}
          <svg viewBox="0 0 24 24" className="absolute -right-1 -top-1 h-4 w-4 text-gold-400" fill="currentColor">
            <path d="M12 2C8 6 6 10 6 14a6 6 0 0012 0c0-4-2-8-6-12z" />
          </svg>
          <span className={`${dims.emoji} drop-shadow`}>🍗</span>
        </div>
      </div>
      {/* Wordmark */}
      <div className="leading-none">
        <div className={`font-display ${dims.text} font-extrabold tracking-tight text-ink-900`}>
          AL<span className="text-brand-500">SHAMAS</span>
        </div>
        <div className={`${dims.sub} font-semibold uppercase tracking-[0.3em] text-ink-400`}>
          Food Products
        </div>
      </div>
    </div>
  );
}
