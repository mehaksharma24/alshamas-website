import { useMemo, useState } from 'react';
import { Search, ChefHat, ArrowDownWideNarrow, Clock, X } from 'lucide-react';
import { recipes } from '../data/recipes';
import { useReveal } from '../lib/useReveal';
import RecipeCard from '../components/RecipeCard';
import { PageBanner } from '../components/PageBanner';

const allTags = Array.from(new Set(recipes.flatMap((r) => r.tags)));

type SortKey = 'az' | 'quick' | 'easy';

export default function RecipeList() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('az');
  const ref = useReveal<HTMLDivElement>([search, tag, sort]);

  const filtered = useMemo(() => {
    let list = [...recipes];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.teaser.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (tag) list = list.filter((r) => r.tags.includes(tag));
    switch (sort) {
      case 'az':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'quick':
        list.sort((a, b) => parseInt(a.cookTime) - parseInt(b.cookTime));
        break;
      case 'easy':
        list.sort((a, b) => {
          const order = { Easy: 0, Medium: 1, Hard: 2 };
          return order[a.difficulty] - order[b.difficulty];
        });
        break;
    }
    return list;
  }, [search, tag, sort]);

  const clearAll = () => {
    setSearch('');
    setTag(null);
    setSort('az');
  };

  const hasFilters = search.trim() || tag || sort !== 'az';

  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <PageBanner
        label="ALSHAMAS Kitchen"
        title="Recipes Worth Cooking"
        subtitle="Easy, delicious recipes built around ALSHAMAS products — from quick lunches to dinner-party feasts."
      />

      {/* Controls */}
      <div className="sticky top-16 z-30 border-b border-ink-100 bg-white/90 backdrop-blur sm:top-20">
        <div className="container-x py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes…"
                className="input-field py-2 pl-9 text-xs"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowDownWideNarrow size={16} className="text-ink-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border-2 border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors focus:border-primary-500 focus:outline-none"
              >
                <option value="az">A → Z</option>
                <option value="quick">Quickest</option>
                <option value="easy">Easiest</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setTag(null)}
              className={`chip text-[0.7rem] transition-all ${
                !tag ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t === tag ? null : t)}
                className={`chip text-[0.7rem] transition-all ${
                  tag === t ? 'bg-primary-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-x py-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-ink-500">
            <span className="font-bold text-ink-900">{filtered.length}</span> recipe{filtered.length !== 1 ? 's' : ''}
          </p>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-200"
            >
              <X size={12} /> Clear All
            </button>
          )}
        </div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-300">
              <ChefHat size={36} />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-ink-700">No recipes match your filters</p>
            <p className="mt-1 text-sm text-ink-500">
              New recipes are coming soon — try clearing your filters or searching differently.
            </p>
            <button onClick={clearAll} className="btn-primary mt-5 text-xs">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <div key={r.id} className="reveal" style={{ transitionDelay: `${Math.min(i * 0.05, 0.3)}s` }}>
                <div className="h-full">
                  <RecipeCard recipe={r} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
