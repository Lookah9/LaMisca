import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../App';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  const { t } = useLanguage();
  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-text)',
        color: 'var(--color-bg)',
        padding: 'var(--spacing-xl) 0 var(--spacing-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Subsol pagină"
    >
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '2rem 1.5rem',
          marginBottom: 'var(--spacing-lg)' 
        }}>
          {/* Logo, Socials and Company legal info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
              <button 
                onClick={() => navigateTo('home')}
                aria-label="Mergi la pagina principală"
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              >
                <img 
                  src="/images/logo.png" 
                  alt="La Misca Logo" 
                  loading="lazy"
                  style={{ 
                    height: '50px', 
                    width: 'auto',
                    filter: 'brightness(0) invert(1)', // Make logo white for dark footer
                    objectFit: 'contain'
                  }} 
                />
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: 'var(--spacing-md)' }}>
              <a 
                href="https://www.instagram.com/la.misca/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Urmărește-ne pe Instagram"
                style={{ 
                  color: 'inherit', 
                  opacity: 0.8,
                  transition: 'var(--transition)'
                }}
                className="social-link"
              >
                <Instagram size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <a 
                href="https://www.facebook.com/p/La-Mișcă-100070733624460/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Urmărește-ne pe Facebook"
                style={{ 
                  color: 'inherit', 
                  opacity: 0.8,
                  transition: 'var(--transition)'
                }}
                className="social-link"
              >
                <Facebook size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
 
            {/* Company legal details */}
            <div style={{ fontSize: '0.8rem', lineHeight: '1.6', opacity: 0.6 }}>
              <h5 style={{ fontWeight: 800, margin: '0 0 4px 0', textTransform: 'uppercase', color: 'var(--color-primary)', fontSize: '0.85rem' }}>LA MISCA SRL</h5>
              <p style={{ margin: '0 0 2px 0' }}>CUI: 44081970</p>
              <p style={{ margin: '0 0 2px 0' }}>Reg. Com.: J2021002281237</p>
              <p style={{ margin: 0 }}>Sediu: Str. Valea Parcului 42, Sat Mogoșoaia, Jud. Ilfov, Cod 077135, România</p>
            </div>
          </div>
 
          {/* Quick Links */}
          <nav aria-label="Link-uri rapide în subsol">
            <h4 style={{ 
              textTransform: 'uppercase', 
              marginBottom: 'var(--spacing-md)', 
              letterSpacing: '0.15em',
              fontSize: '0.9rem',
              color: 'var(--color-primary)',
              height: '50px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {t('footer.quick_links')}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <button 
                  onClick={() => navigateTo('home')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('menu')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('nav.menu')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </nav>
 
          {/* Legal/Navigation Links */}
          <nav aria-label="Informații legale în subsol">
            <h4 style={{ 
              textTransform: 'uppercase', 
              marginBottom: 'var(--spacing-md)', 
              letterSpacing: '0.15em',
              fontSize: '0.9rem',
              color: 'var(--color-primary)',
              height: '50px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {t('footer.legal_title')}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <button 
                  onClick={() => navigateTo('terms')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('footer.terms')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('privacy')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('footer.privacy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('cookies')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('footer.cookies')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('consumer-info')}
                  style={{ opacity: 0.8, fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, textAlign: 'left', display: 'inline-block', transition: 'var(--transition)' }}
                  className="footer-nav-link"
                >
                  {t('footer.consumer_info')}
                </button>
              </li>
            </ul>
          </nav>
 
          {/* Contact Info & ANPC badge */}
          <div>
            <h4 style={{ 
              textTransform: 'uppercase', 
              marginBottom: 'var(--spacing-md)', 
              letterSpacing: '0.15em',
              fontSize: '0.9rem',
              color: 'var(--color-primary)',
              height: '50px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Contact
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'var(--spacing-md)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.9rem' }}>
                <MapPin size={16} aria-hidden="true" /> Str. Valea Parcului 42, Mogoșoaia
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.9rem' }}>
                <Phone size={16} aria-hidden="true" /> +40 727 783 800
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.9rem' }}>
                <Mail size={16} aria-hidden="true" /> contact@lamisca.ro
              </li>
            </ul>

            {/* ANPC Link with clickable image */}
            <div style={{ marginTop: 'var(--spacing-sm)' }}>
              <a 
                href="https://reclamatiisal.anpc.ro" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="ANPC - Soluționarea alternativă a litigiilor"
                style={{ 
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'var(--transition)'
                }}
                className="anpc-badge-link"
              >
                <img 
                  src="/images/ANPC_converted.webp" 
                  alt="ANPC - Soluționarea alternativă a litigiilor" 
                  loading="lazy"
                  style={{ 
                    width: '200px', 
                    height: '40px', 
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </a>
            </div>
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
          fontSize: '0.8rem',
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
        .footer-nav-link {
          transition: all 0.2s ease !important;
        }
        .footer-nav-link:hover {
          opacity: 1 !important;
          color: var(--color-primary) !important;
          transform: translateX(3px);
        }
        .anpc-badge-link:hover {
          border-color: var(--color-primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(188, 71, 73, 0.2);
        }
      `}</style>
    </footer>
  );
}
