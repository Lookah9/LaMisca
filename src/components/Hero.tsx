import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface HeroProps {
  navigateTo: (page: Page) => void;
}

export default function Hero({ navigateTo }: HeroProps) {
  const { t } = useLanguage();
  return (
    <section style={{
      height: '90vh',
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      {/* Background Image Placeholder or Generated Image */}
      <img 
        src="images/Sketched Hero.webp" 
        alt="La Misca Terrace Atmosphere"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.7
        }}
      />
      
      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        color: 'var(--color-bg)',
        textAlign: 'center'
      }}>
        <h1 className="hero-text" style={{ color: 'var(--color-bg)', marginBottom: 'var(--spacing-sm)' }}>
          LA <span style={{ fontStyle: 'italic' }}>MISCA</span>
        </h1>
        <p style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          maxWidth: '600px',
          margin: '0 auto var(--spacing-md)',
          opacity: 0.9,
          fontWeight: 300,
          letterSpacing: '0.05em'
        }}>
          {t('hero.subtitle')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => navigateTo('menu')} className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
