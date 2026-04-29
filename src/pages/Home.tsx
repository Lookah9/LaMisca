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
}

export default function Home({ navigateTo, addToCart, removeFromCart, cart }: HomeProps) {
  const { t } = useLanguage();
  return (
    <>
      <Hero navigateTo={navigateTo} />
      
      {/* Featured Items Carousel */}
      <FeaturedCarousel addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />
      
      {/* Intro Section */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container text-center">
          <h3 style={{ 
            fontFamily: 'var(--font-sans)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.3em', 
            fontSize: '0.9rem',
            color: 'var(--color-primary)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            {t('home.welcome')}
          </h3>
          <h2 className="section-title" style={{ maxWidth: '800px', margin: '0 auto var(--spacing-md)' }}>
            {t('home.intro')}
          </h2>
          <div className="accent-border" style={{ margin: '0 auto var(--spacing-lg)' }}></div>
        </div>
      </section>

      <FeatureSections />

      <LocationSection />

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
