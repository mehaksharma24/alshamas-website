import { useMemo, useState } from 'react';
import { Search, MapPin, Navigation, Store as StoreIcon, X } from 'lucide-react';
import { stores, type Store } from '../data/stores';
import { useReveal } from '../lib/useReveal';
import { PageBanner } from '../components/PageBanner';

function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function WhereToBuy() {
  const ref = useReveal<HTMLDivElement>();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Store | null>(stores[0]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return stores
      .filter(
        (s) =>
          s.city.toLowerCase().includes(q) ||
          s.postal.toLowerCase().includes(q) ||
          s.chain.toLowerCase().includes(q) ||
          s.province.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query]);

  const filtered = useMemo(() => {
    if (!query.trim()) return stores;
    const q = query.toLowerCase();
    return stores.filter(
      (s) =>
        s.city.toLowerCase().includes(q) ||
        s.postal.toLowerCase().includes(q) ||
        s.chain.toLowerCase().includes(q) ||
        s.province.toLowerCase().includes(q)
    );
  }, [query]);

  const sorted = useMemo(() => {
    if (!selected) return filtered;
    return [...filtered].sort(
      (a, b) => distance(selected.lat, selected.lng, a.lat, a.lng) - distance(selected.lat, selected.lng, b.lat, b.lng)
    );
  }, [filtered, selected]);

  const mapSrc = useMemo(() => {
    const center = selected || stores[0];
    const pins = stores
      .map((s) => `markers=color:${s.id === selected?.id ? '0x15803d' : '0xc62515'}%7C${s.lat},${s.lng}`)
      .join('&');
    return `https://maps.google.com/maps?q=${center.lat},${center.lng}&z=5&output=embed&${pins}`;
  }, [selected]);

  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <PageBanner
        label="Find Us"
        title="Where to Buy"
        subtitle="Search by postal code, city, or province to find stores carrying ALSHAMAS products near you."
      >
          <div className="reveal reveal-delay-1 relative mt-7 max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Postal code, city, or province…"
                className="input-field border-ink-700 bg-white/5 pl-11 text-white placeholder-ink-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-ink-200">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setQuery(s.city);
                      setSelected(s);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-primary-50"
                  >
                    <MapPin size={16} className="shrink-0 text-primary-500" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-ink-800">{s.chain} — {s.city}</div>
                      <div className="truncate text-xs text-ink-500">{s.address}, {s.province}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
      </PageBanner>

      {/* Map + list */}
      <div className="container-x py-8">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="reveal overflow-hidden rounded-3xl shadow-lg ring-1 ring-ink-200">
            <iframe
              title="ALSHAMAS store map"
              src={mapSrc}
              className="h-[60vh] min-h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="reveal reveal-delay-1">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <StoreIcon size={20} className="text-primary-500" /> {sorted.length} Stores
              </h2>
            </div>
            <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              {sorted.map((s) => {
                const active = selected?.id === s.id;
                const dist = selected ? distance(selected.lat, selected.lng, s.lat, s.lng).toFixed(0) : null;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={`block w-full rounded-2xl p-4 text-left transition-all ${
                      active
                        ? 'bg-primary-50 ring-2 ring-primary-500'
                        : 'bg-white ring-1 ring-ink-200/60 hover:ring-primary-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-display text-sm font-bold text-ink-900">{s.chain}</span>
                          {active && <span className="chip bg-primary-500 text-white text-[0.6rem]">Selected</span>}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-ink-500">{s.name}</p>
                        <p className="mt-0.5 text-xs text-ink-500">{s.address}, {s.city}, {s.province}</p>
                        <p className="mt-0.5 text-xs font-semibold text-ink-400">{s.postal}</p>
                      </div>
                      {dist && (
                        <div className="shrink-0 text-right">
                          <div className="font-display text-sm font-extrabold text-primary-600">{dist} km</div>
                          <div className="text-[0.65rem] text-ink-400">away</div>
                        </div>
                      )}
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-ink-700"
                    >
                      <Navigation size={12} /> Directions
                    </a>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
