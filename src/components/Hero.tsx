import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface HeroProps {
  navigateTo: (page: Page) => void;
}

export default function Hero({ navigateTo }: HeroProps) {
  const { t } = useLanguage();
  return (
    <section 
      style={{
        height: '90vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '10vh',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
      aria-label="Introducere"
    >
      {/* Background Image - LCP Optimized */}
      <img 
        src="images/hero.webp" 
        alt="Atmosfera de pe terasa La Mișcă"
        fetchpriority="high"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.65
        }}
      />
      
      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)'
      }} aria-hidden="true"></div>
      
      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        color: 'var(--color-bg)',
        textAlign: 'center',
        maxWidth: '700px'
      }}>
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
          lineHeight: '1.6',
          margin: '0 auto var(--spacing-md)',
          fontWeight: 400,
          opacity: 1, // Full opacity for better contrast/accessibility
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          letterSpacing: '0.02em'
        }}>
          {t('hero.subtitle')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => navigateTo('menu')} 
            className="btn-primary" 
            aria-label={t('home.cta_btn') || "Vezi meniul nostru"}
            style={{ 
              padding: '12px 35px', 
              fontSize: '1rem', 
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)' 
            }}
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
