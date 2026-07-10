import { useEffect, useState } from 'react';
import { X, Mail, Sparkles, Check } from 'lucide-react';

export default function NewsletterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setDone(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-pop">
        {/* Decorative top band */}
        <div className="relative h-28 overflow-hidden bg-gradient-to-br from-primary-500 to-brand-600">
          <div className="absolute inset-0 bg-grain opacity-20" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl opacity-30 animate-float"
              style={{ left: `${i * 18}%`, top: `${(i % 2) * 30}%`, animationDelay: `${i * 0.4}s` }}
            >
              🍗
            </div>
          ))}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6 pt-5 text-center">
          {done ? (
            <div className="flex flex-col items-center py-6 animate-scale-in">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Check size={28} />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">You’re on the list!</h3>
              <p className="mt-1.5 text-sm text-ink-500">
                Watch your inbox for new product launches, recipes, and tasty offers.
              </p>
              <button onClick={onClose} className="btn-primary mt-5 text-xs">
                Keep Browsing
              </button>
            </div>
          ) : (
            <>
              <div className="-mt-10 mb-2 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg ring-4 ring-white">
                  <Sparkles className="text-primary-500" size={28} />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-ink-900">
                Sign up for updates & new product launches
              </h3>
              <p className="mt-1.5 text-sm text-ink-500">
                Be the first to taste what’s next from ALSHAMAS.
              </p>
              <form onSubmit={submit} className="mt-5 space-y-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-10"
                  />
                </div>
                <button type="submit" className="btn-primary w-full text-sm">
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-[0.7rem] text-ink-400">
                No spam, just delicious updates. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
