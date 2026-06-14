import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';

interface ConsumerInfoProps {
  navigateTo: (page: Page) => void;
}

export default function ConsumerInfo({ navigateTo }: ConsumerInfoProps) {
  const { t, language } = useLanguage();

  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Page Header */}
      <section style={{ 
        backgroundColor: 'var(--color-bg-dark)', 
        padding: 'var(--spacing-lg) 0', 
        textAlign: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)', color: 'var(--color-text)' }}>
            {language === 'ro' ? 'Informații Consumatori' : 'Consumer Information'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)' }}>
            {language === 'ro' 
              ? 'Transparență, detalii legale și soluționarea disputelor.' 
              : 'Transparency, legal details and dispute resolution.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            padding: 'var(--spacing-md)', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(188, 71, 73, 0.08)',
            marginBottom: 'var(--spacing-md)'
          }}>
            {/* Operator Details */}
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>
              {language === 'ro' ? 'Date de Identificare Operator' : 'Operator Identification Data'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '1rem', lineHeight: '1.6', marginBottom: 'var(--spacing-md)' }}>
              <p><strong>{language === 'ro' ? 'Companie:' : 'Company:'}</strong> LA MISCA SRL</p>
              <p><strong>CUI (Cod Unic de Înregistrare):</strong> 44081970</p>
              <p><strong>{language === 'ro' ? 'Nr. Reg. Com.:' : 'Trade Registry No.:'}</strong> J2021002281237</p>
              <p><strong>EUID:</strong> ROONRC.J2021002281237</p>
              <p><strong>{language === 'ro' ? 'Data Înființării:' : 'Incorporation Date:'}</strong> 2021-04-08</p>
              <p><strong>{language === 'ro' ? 'Sediu Social:' : 'Registered Office:'}</strong> Str. Valea Parcului 42, Sat Mogoșoaia, Jud. Ilfov, Cod 077135, România</p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: 'var(--spacing-md) 0' }} />

            {/* Dispute Resolution */}
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>
              {language === 'ro' ? 'Soluționarea Litigiilor de Consum' : 'Consumer Dispute Resolution'}
            </h2>
            <p style={{ lineHeight: '1.8', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)' }}>
              {language === 'ro' 
                ? 'Pentru reclamațiile consumatorilor sau soluționarea alternativă a litigiilor, puteți accesa platforma oficială a Autorității Naționale pentru Protecția Consumatorilor (ANPC - SAL) prin intermediul link-ului de mai jos.' 
                : 'For consumer complaints or alternative dispute resolution, you can access the official platform of the National Authority for Consumer Protection (ANPC - SAL) via the link below.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: 'var(--spacing-sm)' }}>
              <a 
                href="https://reclamatiisal.anpc.ro" 
                target="_blank" 
                rel="noopener noreferrer"
                title="ANPC SAL"
                style={{ 
                  display: 'inline-block',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  backgroundColor: '#fdfdfd',
                  padding: '5px'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img 
                  src="/images/ANPC_converted.webp" 
                  alt="ANPC - Solutionarea alternativa a litigiilor" 
                  style={{ 
                    width: '250px', 
                    height: '50px', 
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </a>
              <a 
                href="https://reclamatiisal.anpc.ro" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--color-primary)', 
                  fontWeight: 700, 
                  fontSize: '0.95rem',
                  textDecoration: 'underline' 
                }}
              >
                https://reclamatiisal.anpc.ro
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
            <button 
              className="btn-outline" 
              onClick={() => navigateTo('home')}
              style={{ padding: '10px 30px', fontSize: '0.9rem' }}
            >
              {language === 'ro' ? 'Înapoi la prima pagină' : 'Back to Home'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
