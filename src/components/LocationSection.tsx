import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LocationSection() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-xl)',
          alignItems: 'center'
        }} className="location-grid">
          {/* Left Column: Info */}
          <div>
            <h2 className="section-title" style={{ marginBottom: 'var(--spacing-md)' }}>{t('loc.title')}</h2>
            <p style={{ color: 'var(--color-text-light)', marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem' }}>
              {t('loc.subtitle')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-primary)', marginTop: '4px' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>{t('loc.address')}</h4>
                  <p style={{ color: 'var(--color-text-light)' }}>
                    Strada Valea Parcului 42<br />
                    070000 Mogoșoaia, România
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-primary)', marginTop: '4px' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>{t('loc.hours')}</h4>
                  <p style={{ color: 'var(--color-text-light)' }}>
                    {t('loc.hours_val')}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-primary)', marginTop: '4px' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>{t('loc.contact')}</h4>
                  <p style={{ color: 'var(--color-text-light)' }}>
                    +40 727 783 800
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.open('https://maps.app.goo.gl/3Q8m6D6G6vX6Gv6G9', '_blank')}
              className="btn-primary" 
              style={{ marginTop: 'var(--spacing-lg)' }}
            >
              {t('loc.nav_btn')}
            </button>
          </div>

          {/* Right Column: Map */}
          <div style={{ 
            height: '600px', 
            borderRadius: '12px', 
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2843.9!2d25.9!3d44.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201662c16262b%3A0x6b6b6b6b6b6b6b6b!2sStrada%20Valea%20Parcului%2042%2C%20Mogo%C5%9Foaia%20077135!5e0!3m2!1sen!2sro!4v1714220000000!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
