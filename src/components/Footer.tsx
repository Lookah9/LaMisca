import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  const { t } = useLanguage();
  return (
    <footer style={{
      backgroundColor: 'var(--color-text)',
      color: 'var(--color-bg)',
      padding: 'var(--spacing-xl) 0 var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-lg)' 
        }}>
          {/* Logo and Description */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div 
              onClick={() => navigateTo('home')}
              style={{ cursor: 'pointer', marginBottom: 'var(--spacing-md)' }}
            >
              <img 
                src="images/logo.png" 
                alt="La Misca Logo" 
                style={{ 
                  height: '100px', 
                  width: 'auto',
                  filter: 'brightness(0) invert(1)', // Make logo white for dark footer
                  objectFit: 'contain'
                }} 
              />
            </div>
            <p style={{ maxWidth: '350px', opacity: 0.7, marginBottom: 'var(--spacing-md)', lineHeight: '1.6' }}>
              {t('footer.description')}
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a 
                href="https://www.instagram.com/la.misca/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: 'inherit', 
                  opacity: 0.8,
                  transition: 'var(--transition)'
                }}
                className="social-link"
              >
                <Instagram size={20} strokeWidth={2} />
              </a>
              <a 
                href="https://www.facebook.com/p/La-Mișcă-100070733624460/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: 'inherit', 
                  opacity: 0.8,
                  transition: 'var(--transition)'
                }}
                className="social-link"
              >
                <Facebook size={20} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              textTransform: 'uppercase', 
              marginBottom: 'var(--spacing-md)', 
              letterSpacing: '0.15em',
              fontSize: '0.9rem',
              color: 'var(--color-primary)'
            }}>
              Contact
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.95rem' }}>
                <MapPin size={18} /> Strada Valea Parcului 42, Mogoșoaia
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.95rem' }}>
                <Phone size={18} /> +40 727 783 800
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.95rem' }}>
                <Mail size={18} /> contact@lamisca.ro
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              textTransform: 'uppercase', 
              marginBottom: 'var(--spacing-md)', 
              letterSpacing: '0.15em',
              fontSize: '0.9rem',
              color: 'var(--color-primary)'
            }}>
              {t('footer.quick_links')}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button 
                  onClick={() => navigateTo('home')}
                  style={{ opacity: 0.8, fontSize: '0.95rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0 }}
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('menu')}
                  style={{ opacity: 0.8, fontSize: '0.95rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0 }}
                >
                  {t('nav.menu')}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--spacing-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '0.85rem',
          opacity: 0.5
        }}>
          <div>&copy; {new Date().getFullYear()} LA MISCA. {t('footer.rights')}</div>
          <div>Developed by Libri Studio</div>
        </div>
      </div>

      <style>{`
        .social-link:hover {
          opacity: 1 !important;
          color: var(--color-primary) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
}
