import Hero from '../components/Hero';
import FeatureSections from '../components/FeatureSections';
import LocationSection from '../components/LocationSection';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { useLanguage } from '../contexts/LanguageContext';
import { Page, MenuItem, CartItem } from '../App';

interface HomeProps {
  navigateTo: (page: Page) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  cart: CartItem[];
  setMenuSearchQuery: (query: string) => void;
}

export default function Home({ navigateTo, addToCart, removeFromCart, cart, setMenuSearchQuery }: HomeProps) {
  const { t } = useLanguage();
  return (
    <>
      <Hero navigateTo={navigateTo} />
      
      {/* Featured Items Carousel */}
      <FeaturedCarousel 
        addToCart={addToCart} 
        removeFromCart={removeFromCart} 
        cart={cart} 
        navigateTo={navigateTo}
        setMenuSearchQuery={setMenuSearchQuery}
      />

      {/* Location Section - Moved here per user request */}
      <LocationSection />
      
      <FeatureSections 
        navigateTo={navigateTo} 
        setMenuSearchQuery={setMenuSearchQuery} 
      />

      {/* Atmosphere / CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="container text-center">
          <h2 className="section-title">{t('home.cta_title')}</h2>
          <p style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
            {t('home.cta_subtitle')}
          </p>
          <button onClick={() => navigateTo('menu')} className="btn-primary">
            {t('home.cta_btn')}
          </button>
        </div>
      </section>
    </>
  );
}
