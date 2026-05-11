import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

const HERO_IMAGES = [
  'images/LM Pizza Oven.webp',
  'images/LM Hero 2.webp',
  'images/LM Hero_converted.webp'
];

interface HeroProps {
  navigateTo: (page: Page) => void;
}

export default function Hero({ navigateTo }: HeroProps) {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      {HERO_IMAGES.map((src, index) => (
        <img 
          key={src}
          src={src} 
          alt={`La Misca Atmosphere ${index + 1}`}
          // @ts-ignore
          fetchpriority={index === 0 ? "high" : "auto"}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === currentImageIndex ? 0.8 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 0
          }}
        />
      ))}
      
      {/* Top Gradient for Navbar legibility */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '200px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} aria-hidden="true"></div>

      {/* Bottom Gradient for seamless Menu transition */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '35%',
        background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} aria-hidden="true"></div>
      
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
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
            onClick={() => {
              const menuSection = document.getElementById('menu-section');
              if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
            }} 
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
