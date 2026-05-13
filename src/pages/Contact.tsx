import { useLanguage } from '../contexts/LanguageContext';
import LocationSection from '../components/LocationSection';
import { Page } from '../App';

interface ContactProps {
  navigateTo: (page: Page) => void;
}

export default function Contact({ navigateTo }: ContactProps) {
  const { t, language } = useLanguage();

  const ourStoryDesc = language === 'ro' 
    ? "La Mișcă este terasa de familie crescută la marginea Parcului Mogoșoaia, acolo unde plimbările lungi, aerul verde și pofta de mâncare caldă se întâlnesc firesc. Născută din dorința de a aduce în zonă un loc primitor, cu pizza coaptă pe loc, grătar încins și gusturi românești așezate la masă, La Mișcă păstrează farmecul unei opriri simple, bune, aproape de natură, făcută pentru familii, prieteni și oameni care vor să rămână puțin mai mult."
    : "La Mișcă is the family terrace grown on the edge of Mogoșoaia Park, where long walks, green air, and a craving for warm food meet naturally. Born from the desire to bring a welcoming place to the area, with freshly baked pizza, a hot grill, and Romanian tastes served at the table, La Mișcă preserves the charm of a simple, good stop, close to nature, made for families, friends, and people who want to stay a little longer.";

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Mini Hero / Header */}
      <section style={{ 
        backgroundColor: 'var(--color-bg-dark)', 
        padding: 'var(--spacing-xl) 0', 
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)' }}>
            {t('nav.contact')}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            {language === 'ro' ? "Suntem aici pentru tine. Te așteptăm cu drag pe terasă." : "We are here for you. We look forward to seeing you on the terrace."}
          </p>
        </div>
      </section>

      {/* Our Story / Legacy Content */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-xl)' }}>
            <div>
              <span style={{ 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                fontSize: '0.8rem', 
                color: 'var(--color-primary)',
                fontWeight: 700
              }}>
                {language === 'ro' ? "Povestea Noastră" : "Our Story"}
              </span>
              <h2 className="section-title" style={{ fontSize: '2.5rem' }}>La Mișcă</h2>
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--color-text-light)', 
                lineHeight: '1.8'
              }}>
                {ourStoryDesc}
              </p>
            </div>
            <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src="images/LM istoric.png" 
                alt="La Mișcă Heritage" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />

      {/* Bottom CTA */}
      <section className="section" style={{ textAlign: 'center', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-md)' }}>
            {language === 'ro' ? "Vrei să guști bunătățile noastre?" : "Want to taste our delicacies?"}
          </h3>
          <button 
            className="btn-primary" 
            onClick={() => navigateTo('home')}
            style={{ padding: '15px 40px' }}
          >
            {language === 'ro' ? "DESCOPERĂ MENIUL" : "DISCOVER THE MENU"}
          </button>
        </div>
      </section>
    </div>
  );
}
