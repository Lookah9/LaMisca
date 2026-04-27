import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';
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
      padding: 'var(--spacing-xl) 0 var(--spacing-md)'
    }}>
      <div className="container">
        <div className="grid-2" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>LA MISCA</h2>
            <p style={{ maxWidth: '400px', opacity: 0.8, marginBottom: 'var(--spacing-md)' }}>
              {t('footer.description')}
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <a href="https://www.instagram.com/la.misca/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Instagram strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/p/La-Mișcă-100070733624460/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Facebook strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
            <div>
              <h4 style={{ textTransform: 'uppercase', marginBottom: 'var(--spacing-sm)', letterSpacing: '0.1em' }}>Visit</h4>
              <ul style={{ opacity: 0.8 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <MapPin size={16} /> Mogoșoaia, România
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Phone size={16} /> +40 727 783 800
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(253, 240, 213, 0.1)',
          paddingTop: 'var(--spacing-md)',
          textAlign: 'center',
          fontSize: '0.9rem',
          opacity: 0.6
        }}>
          &copy; {new Date().getFullYear()} LA MISCA. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
