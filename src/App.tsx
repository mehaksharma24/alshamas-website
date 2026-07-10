import { useEffect, useRef, useState } from 'react';
import { useRouter } from './lib/router';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsletterModal from './components/NewsletterModal';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import Brand from './pages/Brand';
import WhereToBuy from './pages/WhereToBuy';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';

const NEWSLETTER_KEY = 'alshamas_newsletter_seen';

export default function App() {
  const route = useRouter();
  const [splash, setSplash] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const newsletterShown = useRef(false);

  // Newsletter triggers
  useEffect(() => {
    if (sessionStorage.getItem(NEWSLETTER_KEY)) return;

    const trigger = () => {
      if (newsletterShown.current) return;
      newsletterShown.current = true;
      setNewsletter(true);
      sessionStorage.setItem(NEWSLETTER_KEY, '1');
    };

    // Exit intent (desktop)
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    document.addEventListener('mouseout', onMouseOut);

    // 10s timer
    const timer = window.setTimeout(trigger, 10000);

    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.clearTimeout(timer);
    };
  }, []);

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products initialCat={route.cat} initialSort={route.sort} />;
      case 'recipe-list':
        return <RecipeList />;
      case 'recipe':
        return <RecipeDetail id={route.id} />;
      case 'brand':
        return <Brand />;
      case 'where-to-buy':
        return <WhereToBuy />;
      case 'contact':
        return <Contact />;
      case 'certifications':
        return <Certifications />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <Header route={route} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNewsletter={() => setNewsletter(true)} />
      <NewsletterModal open={newsletter} onClose={() => setNewsletter(false)} />
    </div>
  );
}
