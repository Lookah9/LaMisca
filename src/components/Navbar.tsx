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

  return (
    <nav style={{
      padding: 'var(--spacing-sm) 0',
      backgroundColor: 'var(--color-bg)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div 
          onClick={() => navigateTo('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
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

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }} className="desktop-menu">
          <button 
            onClick={() => navigateTo('home')}
            style={{ 
              fontWeight: currentPage === 'home' ? '600' : '400',
              borderBottom: currentPage === 'home' ? '2px solid var(--color-primary)' : 'none'
            }}
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => navigateTo('menu')}
            style={{ 
              fontWeight: currentPage === 'menu' ? '600' : '400',
              borderBottom: currentPage === 'menu' ? '2px solid var(--color-primary)' : 'none'
            }}
          >
            {t('nav.menu')}
          </button>

          {/* Language Toggle */}
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
          <div 
            onClick={onCartClick}
            style={{ 
              position: 'relative', 
              marginLeft: 'var(--spacing-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
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
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
