import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoImg from '../assets/images/logo.PNG';
import { buildHref, navigate, type Route } from '../lib/router';

const navItems: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Products', route: { name: 'products' } },
  { label: 'Recipes', route: { name: 'recipe-list' } },
  { label: 'Our Story', route: { name: 'brand' } },
  { label: 'Where to Buy', route: { name: 'where-to-buy' } },
  { label: 'Certifications', route: { name: 'certifications' } },
  { label: 'Contact', route: { name: 'contact' } },
];

export default function Header({ route }: { route: Route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  const isActive = (r: Route) => r.name === route.name;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-md backdrop-blur-md'
          : 'bg-white/0'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Logo */}
        <a
          href={buildHref({ name: 'home' })}
          className="flex shrink-0 items-center gap-2.5"
          onClick={(e) => {
            e.preventDefault();
            navigate(buildHref({ name: 'home' }));
          }}
        >
          <img
            src={logoImg}
            alt="Al Shamas Logo"
            className="h-16 w-auto transition-all"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={buildHref(item.route)}
              onClick={(e) => {
                e.preventDefault();
                navigate(buildHref(item.route));
              }}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive(item.route)
                  ? 'text-primary-600'
                  : 'text-ink-600 hover:text-primary-600'
              }`}
            >
              {item.label}
              {isActive(item.route) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary-500" />
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href={buildHref({ name: 'products' })}
            onClick={(e) => {
              e.preventDefault();
              navigate(buildHref({ name: 'products' }));
            }}
            className="btn-primary text-xs"
          >
            Shop Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? 'max-h-[28rem] border-b border-ink-100' : 'max-h-0'
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={buildHref(item.route)}
              onClick={(e) => {
                e.preventDefault();
                navigate(buildHref(item.route));
              }}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive(item.route)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-ink-700 hover:bg-ink-50'
              }`}
            >
              {item.label}
              <ChevronDown size={16} className="-rotate-90 opacity-50" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
