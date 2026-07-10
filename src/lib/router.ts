import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'products'; cat?: string; sort?: string }
  | { name: 'recipe-list' }
  | { name: 'recipe'; id: string }
  | { name: 'brand' }
  | { name: 'where-to-buy' }
  | { name: 'contact' }
  | { name: 'certifications' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, query] = hash.split('?');
  const params = new URLSearchParams(query || '');
  const parts = path.split('/').filter(Boolean);

  switch (parts[0]) {
    case undefined:
      return { name: 'home' };
    case 'products':
      return { name: 'products', cat: params.get('cat') || undefined, sort: params.get('sort') || undefined };
    case 'recipes':
      return parts[1] ? { name: 'recipe', id: parts[1] } : { name: 'recipe-list' };
    case 'brand':
      return { name: 'brand' };
    case 'where-to-buy':
      return { name: 'where-to-buy' };
    case 'contact':
      return { name: 'contact' };
    case 'certifications':
      return { name: 'certifications' };
    default:
      return { name: 'home' };
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(href: string) {
  window.location.hash = href.replace(/^#/, '');
}

export function buildHref(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'products':
      return `#/products${route.cat ? `?cat=${encodeURIComponent(route.cat)}` : ''}${route.sort ? `${route.cat ? '&' : '?'}sort=${route.sort}` : ''}`;
    case 'recipe-list':
      return '#/recipes';
    case 'recipe':
      return `#/recipes/${route.id}`;
    case 'brand':
      return '#/brand';
    case 'where-to-buy':
      return '#/where-to-buy';
    case 'contact':
      return '#/contact';
    case 'certifications':
      return '#/certifications';
  }
}
