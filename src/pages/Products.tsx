import { useEffect, useMemo, useState } from 'react';
import { Filter, X, SlidersHorizontal, MapPin, ArrowRight, Search, PackageSearch } from 'lucide-react';
import { products, categories, type Category, type Product } from '../data/products';
import { navigate } from '../lib/router';
import { useReveal } from '../lib/useReveal';
import ProductCard from '../components/ProductCard';
import { PageBanner } from '../components/PageBanner';

type SortKey = 'az' | 'newest' | 'weight';

export default function Products({ initialCat, initialSort }: { initialCat?: string; initialSort?: string }) {
  const [activeCat, setActiveCat] = useState<Category | 'All'>(initialCat ? (initialCat as Category) : 'All');
  const [weightFilter, setWeightFilter] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>((initialSort as SortKey) || 'az');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const ref = useReveal<HTMLDivElement>([activeCat, weightFilter, sort, search]);

  useEffect(() => {
    setActiveCat(initialCat ? (initialCat as Category) : 'All');
    setSort((initialSort as SortKey) || 'az');
  }, [initialCat, initialSort]);

  const weightBuckets = [
    { key: 'all', label: 'All Weights' },
    { key: 'small', label: 'Under 600 g' },
    { key: 'medium', label: '600 g – 1 kg' },
    { key: 'large', label: 'Over 1 kg' },
  ];

  const inBucket = (p: Product, key: string) => {
    if (key === 'all') return true;
    if (key === 'small') return p.weightKg < 0.6;
    if (key === 'medium') return p.weightKg >= 0.6 && p.weightKg <= 1.0;
    return p.weightKg > 1.0;
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCat !== 'All') list = list.filter((p) => p.category === activeCat);
    list = list.filter((p) => inBucket(p, weightFilter));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'az':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'weight':
        list.sort((a, b) => b.weightKg - a.weightKg);
        break;
    }
    return list;
  }, [activeCat, weightFilter, sort, search]);

  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Page hero */}
      <PageBanner
        label="Our Products"
        title="Explore Our Full Range"
        subtitle={`${products.length} hand-crafted, halal-certified frozen foods — from kebabs and samosas to ready-to-eat entrées.`}
      />

      {/* Controls */}
      <div className="sticky top-16 z-30 border-b border-ink-100 bg-white/90 backdrop-blur sm:top-20">
        <div className="container-x py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="input-field py-2 pl-9 text-xs"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-ink-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border-2 border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-700 focus:border-primary-500 focus:outline-none"
              >
                <option value="az">A → Z</option>
                <option value="newest">Newest</option>
                <option value="weight">By Weight</option>
              </select>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 rounded-xl border-2 border-ink-200 px-3 py-2 text-xs font-semibold text-ink-700 lg:hidden"
            >
              <Filter size={14} /> Filters
            </button>
          </div>

          {/* Category chips — always visible on desktop */}
          <div className={`mt-3 flex flex-wrap gap-2 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
            <button
              onClick={() => setActiveCat('All')}
              className={`chip transition-all ${
                activeCat === 'All' ? 'bg-primary-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveCat(c.name)}
                className={`chip transition-all ${
                  activeCat === c.name ? 'bg-primary-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                }`}
              >
                <span>{c.icon}</span> {c.name}
              </button>
            ))}
          </div>

          {/* Weight filter */}
          <div className={`mt-2 flex flex-wrap gap-2 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
            {weightBuckets.map((b) => (
              <button
                key={b.key}
                onClick={() => setWeightFilter(b.key)}
                className={`chip text-[0.7rem] transition-all ${
                  weightFilter === b.key ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-500 hover:bg-ink-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-x py-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-ink-500">
            <span className="font-bold text-ink-900">{filtered.length}</span> products
            {activeCat !== 'All' && <> in <span className="font-semibold text-primary-600">{activeCat}</span></>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-300">
              <PackageSearch size={36} />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-ink-700">No products match your filters</p>
            <p className="mt-1 text-sm text-ink-500">Try a different category or clear all filters.</p>
            <button
              onClick={() => {
                setActiveCat('All');
                setWeightFilter('all');
                setSearch('');
                setSort('az');
                navigate('#/products');
              }}
              className="btn-primary mt-5 text-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${Math.min(i * 0.03, 0.3)}s` }}>
                <ProductCard product={p} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product modal */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-t-3xl bg-white shadow-2xl animate-slide-in-right sm:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-700 shadow backdrop-blur transition-colors hover:bg-ink-100"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[85vh] overflow-y-auto sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-ink-100 sm:aspect-auto">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.tag && <span className="chip bg-ink-900/85 text-white backdrop-blur">{product.tag}</span>}
              {product.isNew && <span className="chip bg-primary-500 text-white">New</span>}
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <span className="chip bg-primary-100 text-primary-700">{product.category}</span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-ink-900">{product.name}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-ink-500">
              <span className="font-bold text-primary-600">{product.weight}</span>
              {product.pieces && <span>· {product.pieces}</span>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{product.longDescription}</p>

            {/* Ingredients */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">Ingredients</h4>
              <p className="mt-1 text-sm text-ink-600">{product.ingredients}</p>
            </div>

            {/* Nutrition */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">Nutrition (per serving)</h4>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.nutrition.map((n) => (
                  <div key={n.label} className="rounded-xl bg-ink-50 p-2 text-center ring-1 ring-ink-100">
                    <div className="font-display text-sm font-extrabold text-ink-900">{n.value}</div>
                    <div className="text-[0.65rem] text-ink-400">{n.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate('#/where-to-buy');
              }}
              className="btn-primary mt-6 w-full text-sm"
            >
              <MapPin size={16} /> Where to Buy <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
