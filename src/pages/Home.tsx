import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Search, ArrowRight, ShieldCheck, Heart, Users, Leaf } from 'lucide-react';
import { heroSlides } from '../data/hero';
import { products } from '../data/products';
import { recipes } from '../data/recipes';
import { navigate } from '../lib/router';
import { useReveal } from '../lib/useReveal';
import { useSlider } from '../lib/useSlider';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import RecipeCard from '../components/RecipeCard';

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  const go = (i: number) => {
    setActive((i + heroSlides.length) % heroSlides.length);
    if (timer.current) window.clearTimeout(timer.current);
  };

  useEffect(() => {
    timer.current = window.setTimeout(() => setActive((a) => (a + 1) % heroSlides.length), 6000);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [active]);

  const slide = heroSlides[active];
  const alignClass =
    slide.align === 'right' ? 'items-end text-right' : slide.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={s.image} alt={s.headline} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.accent} to-transparent`} />
          <div className="absolute inset-0 bg-ink-950/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className={`container-x flex h-full flex-col justify-center ${alignClass}`}>
          <div
            key={slide.id}
            className={`max-w-xl animate-fade-up ${slide.align === 'center' ? 'mx-auto' : ''}`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              ALSHAMAS Food Products
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              {slide.headline}
            </h1>
            <p className="mt-4 max-w-md text-base text-white/90 sm:text-lg">{slide.subtext}</p>
            <div className={`mt-7 flex gap-3 ${slide.align === 'center' ? 'justify-center' : ''}`}>
              <button
                onClick={() => navigate(slide.href)}
                className="btn-primary text-sm"
              >
                {slide.cta}
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('#/brand')}
                className="btn border-2 border-white/40 text-white hover:bg-white/10"
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(active - 1)}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-all hover:bg-white/30 sm:left-6"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => go(active + 1)}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-all hover:bg-white/30 sm:right-6"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-primary-400' : 'w-2 bg-white/50'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function ProductsSlider() {
  const ref = useReveal<HTMLDivElement>();
  const featured = products.filter((p) => p.tag === 'Bestseller').slice(0, 6);
  const fallback = products.slice(0, 6);
  const display = featured.length >= 4 ? featured : fallback;

  return (
    <section className="py-16 sm:py-20" ref={ref}>
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Text section */}
          <div className="reveal lg:sticky lg:top-24">
            <SectionHeading
              label="Canada's #1 Choice"
              title="Top Selling Frozen Items"
              subtitle="From hand-crafted kebabs to crispy samosas — our most-loved bites, ready in minutes."
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600">
              These are the family favourites our customers keep coming back for. Premium halal ingredients,
              authentic recipes, and freezer-to-table convenience — no compromise on taste.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => navigate('#/products')} className="btn-primary text-xs">
                View All Products <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate('#/products?sort=newest')} className="btn-outline text-xs">
                New Arrivals <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {display.map((p, i) => (
              <div
                key={p.id}
                className="reveal"
                style={{ transitionDelay: `${Math.min(i * 0.06, 0.3)}s` }}
              >
                <ProductCard product={p} onOpen={() => navigate('#/products')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecipesSlider() {
  const ref = useReveal<HTMLDivElement>();
  const slider = useSlider(recipes, 3);
  const featured = recipes.slice(0, 8);

  return (
    <section className="bg-ink-100/60 py-16 sm:py-20" ref={ref}>
      <div className="container-x">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            label="Loved by Our Customers"
            title="Best Selling Bites You’ll Love"
            subtitle="Easy, delicious recipes using ALSHAMAS products — from quick lunches to dinner-party feasts."
          />
          <button onClick={() => navigate('#/recipes')} className="btn-outline text-xs">
            All Recipes <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          ref={slider.ref}
          className="no-scrollbar flex snap-x gap-4 overflow-x-auto scroll-pl-4 px-4 pb-2 sm:px-6 lg:px-8"
        >
          {featured.map((r) => (
            <div key={r.id} className="snap-start">
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
        <div className="container-x mt-6 flex justify-end gap-2">
          <button
            onClick={() => slider.scrollBy(-1)}
            disabled={!slider.canPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-ink-200 transition-all hover:bg-primary-50 hover:text-primary-600 disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => slider.scrollBy(1)}
            disabled={!slider.canNext}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-ink-200 transition-all hover:bg-primary-50 hover:text-primary-600 disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

function StoryTeaser() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-16 sm:py-24" ref={ref}>
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="https://images.pexels.com/photos/37080242/pexels-photo-37080242.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Our heritage"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:-right-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-ink-900">100% Halal</div>
                <div className="text-xs text-ink-500">Certified & Trusted</div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <SectionHeading
              label="Our Canadian Heritage"
              title="A Trusted Frozen Food Company in Canada"
              subtitle="For over a decade, ALSHAMAS has been transforming everyday meals into moments of joy — with high-quality, halal frozen foods Canadians rely on, coast to coast."
            />
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { Icon: Heart, label: 'Halal Values', value: '100%' },
                { Icon: Users, label: 'Happy Families', value: '50k+' },
                { Icon: Leaf, label: 'Natural', value: 'No MSG' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-ink-50 p-4 text-center ring-1 ring-ink-100">
                  <Icon size={22} className="mx-auto text-primary-500" />
                  <div className="mt-2 font-display text-lg font-extrabold text-ink-900">{value}</div>
                  <div className="text-xs text-ink-500">{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('#/brand')} className="btn-dark mt-7 text-sm">
              Our Story <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhereToBuyTeaser() {
  const ref = useReveal<HTMLDivElement>();
  const [query, setQuery] = useState('');

  const storeLogos = [
    { name: 'Walmart', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
    { name: 'Costco', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Costco_Wholesale_logo_2010-10-26_2011-06-26.svg' },
    { name: 'Loblaws', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Loblaws_logo.svg' },
    { name: 'Metro', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Metro_Inc._logo.svg' },
    { name: 'Sobeys', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Sobeys_Logo_2023.svg' },
    { name: 'FreshCo', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/FreshCo_Logo.svg' },
    { name: 'No Frills', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/No_Frills_Logo.svg' },
    { name: 'Save-On-Foods', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Save-On-Foods_Logo.svg' },
    { name: 'IGA', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/IGA_Logo.svg' },
    { name: 'Food Basics', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Food_Basics_Logo.svg' },
    { name: 'T&T', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/T%26T_Supermarket_Logo.svg' },
    { name: 'Real Canadian Superstore', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Real_Canadian_Superstore_Logo.svg' },
  ];

  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20" ref={ref}>
      <div className="absolute inset-0 bg-grain opacity-10" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="container-x relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionHeading
            label="Find Us Near You"
            title="ALSHAMAS in Major Grocers Across Canada"
            subtitle="From coast to coast — search by postal code or city to find stores carrying ALSHAMAS products."
            light
            align="center"
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('#/where-to-buy');
            }}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter postal code or city"
                className="input-field border-ink-700 bg-white/5 pl-11 text-white placeholder-ink-400"
              />
            </div>
            <button type="submit" className="btn-primary text-sm">
              <Search size={16} /> Find Stores
            </button>
          </form>
        </div>

        {/* Store logo marquee */}
        <div className="reveal mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-6">
            {[...storeLogos, ...storeLogos].map((store, i) => (
              <div
                key={i}
                className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl bg-white/95 px-4 shadow-md ring-1 ring-white/20"
              >
                <img
                  src={store.logo}
                  alt={store.name}
                  className="max-h-10 max-w-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'text-xs font-bold text-ink-700';
                    fallback.textContent = store.name;
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['100% Halal', 'Hand-Crafted', 'No Artificial Flavours', 'Ready in Minutes', 'Canadian Owned', 'Since 2013'];
  return (
    <div className="overflow-hidden border-y border-ink-200 bg-primary-500 py-3">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-white">
            <span className="text-lg">🍗</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSlideshow />
      <Marquee />
      <ProductsSlider />
      <RecipesSlider />
      <StoryTeaser />
      <WhereToBuyTeaser />
    </div>
  );
}
