import { ShoppingBag, Menu as MenuIcon, X, Globe } from 'lucide-react';
import { useState } from 'react';
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
  const { language, setLanguage, t } = useLanguage();

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav style={{
      padding: 'var(--spacing-sm) 0',
      backgroundColor: 'var(--color-bg)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavigate('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1001
          }}
        >
          <img 
            src="images/logo.png" 
            alt="La Misca Logo" 
            style={{ 
              height: '100px', 
              width: 'auto',
              objectFit: 'contain',
              margin: '-20px 0'
            }} 
          />
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }} className="desktop-menu">
            <button 
              onClick={() => handleNavigate('home')}
              style={{ 
                fontWeight: currentPage === 'home' ? '600' : '400',
                borderBottom: currentPage === 'home' ? '2px solid var(--color-primary)' : 'none',
                color: 'var(--color-text)'
              }}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => handleNavigate('menu')}
              style={{ 
                fontWeight: currentPage === 'menu' ? '600' : '400',
                borderBottom: currentPage === 'menu' ? '2px solid var(--color-primary)' : 'none',
                color: 'var(--color-text)'
              }}
            >
              {t('nav.menu')}
            </button>

            {/* Desktop Language Toggle */}
            <div style={{ display: 'flex', gap: '5px', marginLeft: 'var(--spacing-sm)' }}>
              <button 
                onClick={() => setLanguage('ro')}
                style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: language === 'ro' ? 'bold' : 'normal',
                  opacity: language === 'ro' ? 1 : 0.5,
                  padding: '2px 5px'
                }}
              >
                RO
              </button>
              <span style={{ opacity: 0.3 }}>|</span>
              <button 
                onClick={() => setLanguage('en')}
                style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: language === 'en' ? 'bold' : 'normal',
                  opacity: language === 'en' ? 1 : 0.5,
                  padding: '2px 5px'
                }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Cart Button (Always visible) */}
          <div 
            onClick={onCartClick}
            style={{ 
              position: 'relative', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1001
            }}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '50%',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Burger Button */}
          <div 
            className="mobile-menu-btn" 
            style={{ display: 'none', zIndex: 1001, cursor: 'pointer' }} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
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
        }}>
          <button 
            onClick={() => handleNavigate('home')}
            style={{ 
              fontSize: '2rem', 
              fontWeight: currentPage === 'home' ? '700' : '400',
              color: 'var(--color-text)'
            }}
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => handleNavigate('menu')}
            style={{ 
              fontSize: '2rem', 
              fontWeight: currentPage === 'menu' ? '700' : '400',
              color: 'var(--color-text)'
            }}
          >
            {t('nav.menu')}
          </button>

          {/* Mobile Language Selector */}
          <div style={{ display: 'flex', gap: '20px', marginTop: 'var(--spacing-md)' }}>
            <button 
              onClick={() => { setLanguage('ro'); setIsMobileMenuOpen(false); }}
              style={{ 
                fontSize: '1.2rem', 
                fontWeight: language === 'ro' ? 'bold' : 'normal',
                opacity: language === 'ro' ? 1 : 0.5,
                border: language === 'ro' ? '2px solid var(--color-primary)' : '1px solid #ccc',
                padding: '10px 20px',
                borderRadius: '10px'
              }}
            >
              ROMÂNĂ
            </button>
            <button 
              onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
              style={{ 
                fontSize: '1.2rem', 
                fontWeight: language === 'en' ? 'bold' : 'normal',
                opacity: language === 'en' ? 1 : 0.5,
                border: language === 'en' ? '2px solid var(--color-primary)' : '1px solid #ccc',
                padding: '10px 20px',
                borderRadius: '10px'
              }}
            >
              ENGLISH
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
