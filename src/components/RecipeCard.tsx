import { useState } from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import type { Recipe } from '../data/recipes';
import { navigate } from '../lib/router';

const diffColors: Record<string, string> = {
  Easy: 'bg-primary-100 text-primary-700',
  Medium: 'bg-gold-100 text-gold-700',
  Hard: 'bg-brand-100 text-brand-700',
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`#/recipes/${recipe.id}`)}
      className="group flex shrink-0 w-72 flex-col overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-ink-200/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-primary-200 sm:w-80"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 ${hover ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className={`chip ${diffColors[recipe.difficulty]}`}>{recipe.difficulty}</span>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="chip bg-white/85 text-ink-800 backdrop-blur">
            <Clock size={12} /> {recipe.cookTime}
          </span>
          <span className="chip bg-white/85 text-ink-800 backdrop-blur">
            <Users size={12} /> {recipe.servings}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-primary-600">
          <ChefHat size={14} /> Recipe
        </div>
        <h3 className="font-display text-base font-bold leading-snug text-ink-900">
          {recipe.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs text-ink-500">{recipe.teaser}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary-600 transition-all group-hover:gap-2">
          View Recipe →
        </span>
      </div>
    </button>
  );
}
