import { useState } from 'react';
import type { Product } from '../data/products';
import { navigate } from '../lib/router';

const categoryColors: Record<string, string> = {
  Chicken: 'bg-primary-100 text-primary-700',
  Beef: 'bg-brand-100 text-brand-700',
  Snacks: 'bg-gold-100 text-gold-700',
  'Ready-to-Cook': 'bg-accent-100 text-accent-700',
  'Frozen Entrées': 'bg-ink-100 text-ink-700',
  'Paratha & Bread': 'bg-gold-100 text-gold-800',
  Veg: 'bg-primary-100 text-primary-700',
};

export default function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen?: (p: Product) => void;
}) {
  const [hover, setHover] = useState(false);

  const click = () => {
    if (onOpen) onOpen(product);
    else navigate(`#/products?focus=${product.id}`);
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={click}
      className="group card overflow-hidden text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-primary-200"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 ${hover ? 'scale-110' : 'scale-100'}`}
        />
        {/* Tags */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tag && (
            <span className="chip bg-ink-900/85 text-white backdrop-blur">{product.tag}</span>
          )}
          {product.isNew && (
            <span className="chip bg-primary-500 text-white">New</span>
          )}
        </div>
        {/* Quick view */}
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-ink-950/70 to-transparent p-3 transition-all duration-300 ${
            hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-ink-900 backdrop-blur">
            Quick View
          </span>
        </div>
      </div>
      <div className="p-4">
        <span className={`chip ${categoryColors[product.category] || 'bg-ink-100 text-ink-700'}`}>
          {product.category}
        </span>
        <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink-900">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-ink-500">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-primary-600">{product.weight}</span>
          {product.pieces && (
            <span className="text-xs text-ink-400">{product.pieces}</span>
          )}
        </div>
      </div>
    </button>
  );
}
