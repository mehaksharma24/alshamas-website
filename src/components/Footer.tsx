import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { buildHref, navigate } from '../lib/router';
import Logo from './Logo';

const quickLinks: { label: string; route: Parameters<typeof buildHref>[0] }[] = [
  { label: 'Products', route: { name: 'products' } },
  { label: 'Recipes', route: { name: 'recipe-list' } },
  { label: 'Our Story', route: { name: 'brand' } },
  { label: 'Where to Buy', route: { name: 'where-to-buy' } },
  { label: 'Certifications', route: { name: 'certifications' } },
  { label: 'Contact', route: { name: 'contact' } },
];

export default function Footer({ onNewsletter }: { onNewsletter: () => void }) {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />

      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 w-fit">
              <Logo size="md" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Canada’s trusted name in premium halal frozen foods. Hand-crafted with authentic recipes since 2013.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-300 transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={buildHref(l.route)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(buildHref(l.route));
                    }}
                    className="text-sm text-ink-400 transition-colors hover:text-primary-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-400" />
                <span>1500 Creditstone Rd, Concord, ON L4K 0E3, Canada</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-primary-400" />
                <span>+1 (416) 555-0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-primary-400" />
                <span>hello@alshamasfood.ca</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Stay in the Loop</h4>
            <p className="mt-4 text-sm text-ink-400">
              New products, recipes, and offers — straight to your inbox.
            </p>
            <button onClick={onNewsletter} className="btn-primary mt-4 w-full text-xs">
              Sign Up for Updates
            </button>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-primary-500/10 px-3 py-2.5 ring-1 ring-primary-500/20">
              <ShieldCheck size={18} className="shrink-0 text-primary-400" />
              <span className="text-xs font-semibold text-primary-300">100% Halal Certified</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ALSHAMAS Food Products. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400">Terms of Service</a>
            <a href="#" className="hover:text-primary-400">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
