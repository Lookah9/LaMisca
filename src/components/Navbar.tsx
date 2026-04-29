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
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = !isScrolled && currentPage === 'home';
  
  const navStyle: React.CSSProperties = {
    padding: isScrolled ? '10px 0' : '20px 0',
    backgroundColor: isScrolled ? 'var(--color-bg)' : (currentPage === 'home' ? 'transparent' : 'var(--color-bg)'),
    borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid transparent',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    color: (isScrolled || currentPage !== 'home') ? 'var(--color-text)' : 'white'
  };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontWeight: active ? '700' : '500',
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'inherit',
    borderBottom: active ? `2px solid ${isScrolled || currentPage !== 'home' ? 'var(--color-primary)' : 'white'}` : '2px solid transparent',
    padding: '5px 0',
    transition: 'var(--transition)'
  });

  return (
    <nav style={navStyle}>
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
            alignItems: 'center',
            transition: 'var(--transition)',
            transform: isScrolled ? 'scale(0.85)' : 'scale(1)'
          }}
        >
          <img 
            src="images/logo.png" 
            alt="La Misca Logo" 
            style={{ 
              height: '80px', 
              width: 'auto',
              objectFit: 'contain',
              filter: (isScrolled || currentPage !== 'home') ? 'none' : 'brightness(0) invert(1)',
              transition: 'var(--transition)'
            }} 
          />
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }} className="desktop-menu">
          <button 
            onClick={() => navigateTo('home')}
            style={linkStyle(currentPage === 'home')}
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => navigateTo('menu')}
            style={linkStyle(currentPage === 'menu')}
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
                opacity: language === 'ro' ? 1 : 0.6,
                padding: '2px 5px',
                color: 'inherit'
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
                opacity: language === 'en' ? 1 : 0.6,
                padding: '2px 5px',
                color: 'inherit'
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
              alignItems: 'center',
              color: 'inherit'
            }}
          >
            <ShoppingBag size={22} />
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
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
          .mobile-menu-btn { 
            display: block !important; 
            color: ${(isScrolled || currentPage !== 'home') ? 'var(--color-text)' : 'white'};
          }
        }
      `}</style>
    </nav>
  );
}
