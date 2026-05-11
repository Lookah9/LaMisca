import { ShoppingBag, Menu as MenuIcon, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ currentPage, navigateTo, cartCount, onCartClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
    if (page === 'menu') {
      const menuSection = document.getElementById('menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navTextColor = scrolled ? 'var(--color-text)' : 'white';
  const textShadow = scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.5)';

  return (
    <nav 
      id="main-navbar"
      style={{
        padding: 'var(--spacing-sm) 0',
        backgroundColor: scrolled ? 'var(--color-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease, border-bottom 0.3s ease'
      }}
      aria-label="Navigație principală"
    >
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center'
      }}>
        {/* Left Side: Language Toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '5px' }} role="group" aria-label="Selectare limbă">
            <button 
              onClick={() => setLanguage('ro')}
              aria-label="Schimbă limba în Română"
              aria-pressed={language === 'ro'}
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: language === 'ro' ? 'bold' : 'normal',
                color: navTextColor,
                textShadow: textShadow,
                opacity: language === 'ro' ? 1 : 0.8,
                padding: '5px 8px',
                transition: 'var(--transition)',
                cursor: 'pointer',
                background: 'none',
                border: 'none'
              }}
            >
              RO
            </button>
            <span style={{ opacity: 0.5, alignSelf: 'center', color: navTextColor, textShadow }} aria-hidden="true">|</span>
            <button 
              onClick={() => setLanguage('en')}
              aria-label="Change language to English"
              aria-pressed={language === 'en'}
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: language === 'en' ? 'bold' : 'normal',
                color: navTextColor,
                textShadow: textShadow,
                opacity: language === 'en' ? 1 : 0.8,
                padding: '5px 8px',
                transition: 'var(--transition)',
                cursor: 'pointer',
                background: 'none',
                border: 'none'
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Center Side: Logo */}
        <div 
          onClick={() => handleNavigate('home')}
          role="button"
          aria-label="Mergi la pagina principală"
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
          }}
        >
          <img 
            src="images/logo.png" 
            alt="La Misca Logo" 
            loading="lazy"
            style={{ 
              height: '80px', 
              width: 'auto',
              objectFit: 'contain',
              margin: '-15px 0',
              filter: scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'filter 0.3s ease'
            }} 
          />
        </div>

        {/* Right Side: Menu + Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }} className="desktop-menu">
            <button 
              onClick={() => handleNavigate('home')}
              aria-current={currentPage === 'home' ? 'page' : undefined}
              style={{ 
                fontSize: '0.95rem',
                fontWeight: '600',
                color: navTextColor,
                textShadow: textShadow,
                transition: 'var(--transition)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => handleNavigate('menu')}
              aria-current={currentPage === 'menu' ? 'page' : undefined}
              style={{ 
                fontSize: '0.95rem',
                fontWeight: '600',
                color: navTextColor,
                textShadow: textShadow,
                transition: 'var(--transition)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {t('nav.menu')}
            </button>
          </div>

          {/* Cart Button (Always visible) */}
          <button 
            onClick={onCartClick}
            aria-label={`Vezi coșul de cumpărături, ${cartCount} produse`}
            style={{ 
              position: 'relative', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1001,
              padding: '8px',
              backgroundColor: scrolled ? 'var(--color-bg-dark)' : 'rgba(255,255,255,0.2)',
              color: navTextColor,
              backdropFilter: scrolled ? 'none' : 'blur(5px)',
              borderRadius: '50%',
              transition: 'var(--transition)',
              border: 'none'
            }}
            className="cart-btn-nav"
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontSize: '0.65rem',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Burger Button */}
          <button 
            className="mobile-menu-btn" 
            aria-label={isMobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isMobileMenuOpen}
            style={{ 
              display: 'none', 
              zIndex: 1001, 
              cursor: 'pointer', 
              padding: '5px', 
              background: 'none', 
              border: 'none',
              color: isMobileMenuOpen ? 'var(--color-text)' : navTextColor,
              textShadow: !isMobileMenuOpen ? textShadow : 'none'
            }} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--color-bg)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-lg)',
            animation: 'fadeIn 0.3s ease'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Meniu mobil"
        >
          <button 
            onClick={() => handleNavigate('home')}
            style={{ 
              fontSize: '2rem', 
              fontWeight: currentPage === 'home' ? '700' : '400',
              color: 'var(--color-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => handleNavigate('menu')}
            style={{ 
              fontSize: '2rem', 
              fontWeight: currentPage === 'menu' ? '700' : '400',
              color: 'var(--color-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t('nav.menu')}
          </button>

          {/* Logo in Mobile Menu Background */}
          <img 
            src="images/logo.png" 
            alt="" 
            aria-hidden="true"
            loading="lazy"
            style={{ 
              position: 'absolute',
              bottom: '50px',
              opacity: 0.05,
              width: '200px',
              pointerEvents: 'none'
            }} 
          />
        </div>
      )}

      <style>{`
        .desktop-menu button:hover {
          color: var(--color-primary) !important;
        }
        .cart-btn-nav:hover {
          background-color: #f0f0f0 !important;
          transform: scale(1.05);
        }
        @media (max-width: 850px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 480px) {
          nav .container {
            grid-template-columns: 80px auto 80px !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
