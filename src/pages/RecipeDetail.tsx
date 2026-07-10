import { ArrowLeft, Clock, Users, ChefHat, Flame, ListChecks, ArrowRight } from 'lucide-react';
import { recipes } from '../data/recipes';
import { products } from '../data/products';
import { navigate } from '../lib/router';
import { useReveal } from '../lib/useReveal';

const diffColors: Record<string, string> = {
  Easy: 'bg-primary-100 text-primary-700',
  Medium: 'bg-gold-100 text-gold-700',
  Hard: 'bg-brand-100 text-brand-700',
};

export default function RecipeDetail({ id }: { id: string }) {
  const ref = useReveal<HTMLDivElement>();
  const recipe = recipes.find((r) => r.id === id);
  const product = recipe ? products.find((p) => p.id === recipe.productId) : null;

  if (!recipe) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20 text-center">
        <div className="text-5xl">🍽️</div>
        <p className="mt-4 font-display text-xl font-bold text-ink-700">Recipe not found</p>
        <button onClick={() => navigate('#/recipes')} className="btn-primary mt-4 text-xs">
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-x pb-8">
            <button
              onClick={() => navigate('#/recipes')}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> All Recipes
            </button>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((t) => (
                <span key={t} className="chip bg-white/15 text-white backdrop-blur">{t}</span>
              ))}
              <span className={`chip ${diffColors[recipe.difficulty]}`}>{recipe.difficulty}</span>
            </div>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl">
              {recipe.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-x py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="reveal rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink-200/60">
              <p className="text-sm leading-relaxed text-ink-600">{recipe.teaser}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-ink-50 p-3 text-center">
                  <Clock size={18} className="mx-auto text-primary-500" />
                  <div className="mt-1 font-display text-sm font-extrabold text-ink-900">{recipe.cookTime}</div>
                  <div className="text-[0.65rem] text-ink-400">Cook Time</div>
                </div>
                <div className="rounded-2xl bg-ink-50 p-3 text-center">
                  <Users size={18} className="mx-auto text-primary-500" />
                  <div className="mt-1 font-display text-sm font-extrabold text-ink-900">{recipe.servings}</div>
                  <div className="text-[0.65rem] text-ink-400">Servings</div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="reveal reveal-delay-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink-200/60">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <ChefHat size={20} className="text-primary-500" /> Ingredients
              </h3>
              <ul className="mt-4 space-y-2.5">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product used */}
            {product && (
              <div className="reveal reveal-delay-2 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-200/60">
                <div className="bg-primary-50 px-5 py-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary-600">Product Used</h3>
                </div>
                <div className="flex items-center gap-4 p-5">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <div className="font-display text-sm font-bold text-ink-900">{product.name}</div>
                    <div className="text-xs text-ink-500">{product.weight}</div>
                  </div>
                  <button
                    onClick={() => navigate('#/products')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white transition-transform hover:scale-110"
                    aria-label="View product"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Steps */}
          <div className="reveal reveal-delay-1">
            <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink-900">
              <Flame size={24} className="text-primary-500" /> Method
            </h2>
            <ol className="mt-6 space-y-5">
              {recipe.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink-200/60 transition-all hover:ring-primary-200"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 font-display text-lg font-extrabold text-white">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-400">
                      <ListChecks size={12} /> Step {i + 1}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">{step}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-br from-primary-500 to-brand-600 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">Ready to cook?</h3>
                <p className="text-sm text-white/90">Find ALSHAMAS products at a store near you.</p>
              </div>
              <button onClick={() => navigate('#/where-to-buy')} className="btn bg-white text-primary-600 hover:bg-white/90">
                Where to Buy <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
