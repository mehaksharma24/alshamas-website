import { useEffect, useState } from 'react';
import logoImg from '../assets/images/logo.png';

/**
 * Splash screen sequence:
 *  0.0s  — dark green stage, steam wisps rising
 *  0.3s  — drumstick flies in from bottom-right with rotation
 *  1.0s  — drumstick "lands" and sparkles burst
 *  1.2s  — logo pops in
 *  1.6s  — tagline fades up
 *  2.4s  — loading bar fills
 *  3.0s  — fade out
 */
export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2900);
    const t2 = setTimeout(onDone, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-primary-950 transition-opacity duration-500 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(34,197,94,0.18) 0%, rgba(5,46,22,1) 70%)',
        }}
      />

      {/* Drifting food emojis in background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        {['🍗', '🥩', '🫓', '🥟', '🍗', '🫓', '🍗', '🥩'].map((e, i) => (
          <div
            key={i}
            className="absolute text-8xl animate-drift"
            style={{
              left: `${(i * 14 + 5) % 95}%`,
              top: `${(i * 19 + 8) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${9 + (i % 4)}s`,
            }}
          >
            {e}
          </div>
        ))}
      </div>

      {/* Center stage */}
      <div className="relative flex flex-col items-center">

        {/* Drumstick + steam + sparkles */}
        <div className="relative mb-6 h-32 w-32">

          {/* Steam wisps (behind drumstick) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute h-12 w-1.5 rounded-full bg-white/30 blur-sm animate-steam"
                style={{
                  left: `${(i - 1) * 14}px`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-primary-400/25 blur-2xl animate-pulse-soft" />

          {/* ❌ Drumstick removed — everything else stays */}

          {/* Sparkle burst */}
          <div className="absolute inset-0">
            {[
              { top: '8%', left: '78%', delay: '1.0s', size: '14px' },
              { top: '20%', left: '12%', delay: '1.1s', size: '10px' },
              { top: '72%', left: '85%', delay: '1.15s', size: '12px' },
              { top: '85%', left: '22%', delay: '1.2s', size: '8px' },
              { top: '50%', left: '95%', delay: '1.25s', size: '10px' },
              { top: '15%', left: '50%', delay: '1.3s', size: '8px' },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute text-gold-300 animate-sparkle"
                style={{
                  top: s.top,
                  left: s.left,
                  fontSize: s.size,
                  animationDelay: s.delay,
                  animationIterationCount: '2',
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div
          className="opacity-0 animate-logo-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        >
          <img
            src={logoImg}
            alt="Al Shamas Logo"
            className="h-28 w-auto sm:h-36 drop-shadow-xl"
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-5 font-script text-xl text-gold-300 opacity-0 sm:text-2xl"
          style={{ animation: 'fade-up 0.6s ease-out 1.6s forwards' }}
        >
          Halal. Hand-crafted. Since 2013.
        </p>

        {/* Loading bar */}
        <div className="mt-7 h-1 w-44 overflow-hidden rounded-full bg-white/10 sm:w-56">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-400 to-gold-400"
            style={{
              width: '0%',
              animation: 'loading-fill 2.4s ease-in-out 0.8s forwards',
            }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes loading-fill {
          0%   { width: 0%; }
          60%  { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
