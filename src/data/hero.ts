export interface HeroSlide {
  id: string;
  headline: string;
  subtext: string;
  image: string;
  cta: string;
  href: string;
  align: 'left' | 'right' | 'center';
  accent: string;
}

const img = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

export const heroSlides: HeroSlide[] = [
  {
    id: 'h1',
    headline: 'Indulge in the Flavours of Tradition',
    subtext: 'Premium halal frozen foods, hand-crafted with authentic recipes since 2013.',
    image: img('37080242'),
    cta: 'Explore Products',
    href: '#/products',
    align: 'left',
    accent: 'from-primary-900/85',
  },
  {
    id: 'h2',
    headline: 'From Our Kitchen to Yours',
    subtext: 'Ready-in-minutes kebabs, samosas, and entrées — freezer to table in a flash.',
    image: img('6419732'),
    cta: 'Browse Recipes',
    href: '#/recipes',
    align: 'right',
    accent: 'from-brand-900/85',
  },
  {
    id: 'h3',
    headline: 'Soft, Fluffy Parathas — Ready in Minutes',
    subtext: 'No rolling. No kneading. Just perfectly crisped, every single time.',
    image: img('12737800'),
    cta: 'Shop Parathas',
    href: '#/products?cat=Paratha%20%26%20Bread',
    align: 'left',
    accent: 'from-accent-800/85',
  },
  {
    id: 'h4',
    headline: 'Canada’s #1 Choice for Halal Frozen Foods',
    subtext: 'Trusted by families from coast to coast — find us in major grocers near you.',
    image: img('12312104'),
    cta: 'Where to Buy',
    href: '#/where-to-buy',
    align: 'center',
    accent: 'from-primary-900/80',
  },
  {
    id: 'h5',
    headline: 'New! Heat-and-Eat Biryani Bowls',
    subtext: 'Aromatic basmati, spiced chicken, and caramelised onions — 4 minutes to dinner.',
    image: img('4224314'),
    cta: 'Try New Products',
    href: '#/products?sort=newest',
    align: 'left',
    accent: 'from-accent-900/85',
  },
];
