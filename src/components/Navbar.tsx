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
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center'
      }}>
        {/* Left Side: Language Toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              onClick={() => setLanguage('ro')}
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: language === 'ro' ? 'bold' : 'normal',
                color: language === 'ro' ? 'var(--color-primary)' : 'var(--color-text)',
                opacity: language === 'ro' ? 1 : 0.6,
                padding: '5px 8px',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }}
            >
              RO
            </button>
            <span style={{ opacity: 0.2, alignSelf: 'center' }}>|</span>
            <button 
              onClick={() => setLanguage('en')}
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: language === 'en' ? 'bold' : 'normal',
                color: language === 'en' ? 'var(--color-primary)' : 'var(--color-text)',
                opacity: language === 'en' ? 1 : 0.6,
                padding: '5px 8px',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Center Side: Logo */}
        <div 
          onClick={() => handleNavigate('home')}
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
            style={{ 
              height: '80px', 
              width: 'auto',
              objectFit: 'contain',
              margin: '-15px 0'
            }} 
          />
        </div>

        {/* Right Side: Menu + Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }} className="desktop-menu">
            <button 
              onClick={() => handleNavigate('home')}
              style={{ 
                fontSize: '0.9rem',
                fontWeight: currentPage === 'home' ? '700' : '500',
                color: currentPage === 'home' ? 'var(--color-primary)' : 'var(--color-text)',
                transition: 'var(--transition)'
              }}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => handleNavigate('menu')}
              style={{ 
                fontSize: '0.9rem',
                fontWeight: currentPage === 'menu' ? '700' : '500',
                color: currentPage === 'menu' ? 'var(--color-primary)' : 'var(--color-text)',
                transition: 'var(--transition)'
              }}
            >
              {t('nav.menu')}
            </button>
          </div>

          {/* Cart Button (Always visible) */}
          <div 
            onClick={onCartClick}
            style={{ 
              position: 'relative', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1001,
              padding: '8px',
              backgroundColor: 'var(--color-bg-dark)',
              borderRadius: '50%',
              transition: 'var(--transition)'
            }}
            className="cart-btn-nav"
          >
            <ShoppingBag size={20} />
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
          </div>

          {/* Mobile Burger Button */}
          <div 
            className="mobile-menu-btn" 
            style={{ display: 'none', zIndex: 1001, cursor: 'pointer', padding: '5px' }} 
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

          {/* Logo in Mobile Menu Background */}
          <img 
            src="images/logo.png" 
            alt="Logo Watermark" 
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
