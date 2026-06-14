import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';

interface CookiesProps {
  navigateTo: (page: Page) => void;
}

export default function Cookies({ navigateTo }: CookiesProps) {
  const { language } = useLanguage();

  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <section style={{ 
        backgroundColor: 'var(--color-bg-dark)', 
        padding: 'var(--spacing-lg) 0', 
        textAlign: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--spacing-xs)', color: 'var(--color-text)' }}>
            {language === 'ro' ? 'Politică de Cookies' : 'Cookies Policy'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)' }}>
            {language === 'ro' 
              ? 'Cum utilizăm fișierele cookies și tehnologiile similare.' 
              : 'How we use cookies and similar technologies.'}
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
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-light)',
            lineHeight: '1.8'
          }}>
            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              1. {language === 'ro' ? 'Ce sunt fișierele Cookies?' : 'What are Cookies?'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' ? (
                <span>
                  Fișierele cookies sunt fișiere text de dimensiuni mici stocate pe dispozitivul dumneavoastră (computer, telefon sau tabletă) atunci când vizitați un site web. Acestea permit site-ului să vă recunoască dispozitivul și să rețină anumite preferințe sau acțiuni.
                </span>
              ) : (
                <span>
                  Cookies are small text files stored on your device (computer, phone, or tablet) when you visit a website. They allow the site to recognize your device and remember certain preferences or actions.
                </span>
              )}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              2. {language === 'ro' ? 'Cum le utilizăm pe acest website?' : 'How do we use them on this website?'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' ? (
                <span>
                  Website-ul nostru utilizează exclusiv tehnologia <strong>LocalStorage</strong> a browserului pentru a reține produsele din coșul dumneavoastră de cumpărături între vizite. Acest lucru este strict necesar din punct de vedere tehnic pentru funcționarea coșului. <strong>NU utilizăm module cookies de urmărire</strong> (tracking), publicitate sau analiză furnizate de terți (cum ar fi Google Analytics sau Facebook Pixel).
                </span>
              ) : (
                <span>
                  Our website exclusively uses browser <strong>LocalStorage</strong> technology to remember the items in your shopping cart between visits. This is strictly technically necessary for the cart to function. <strong>We do not use tracking</strong>, advertising, or analytics cookies provided by third parties (such as Google Analytics or Facebook Pixel).
                </span>
              )}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              3. {language === 'ro' ? 'Gestionarea sau Ștergerea' : 'Managing or Deleting'}
            </h2>
            <p>
              {language === 'ro' ? (
                <span>
                  Puteți șterge produsele din coș oricând făcând click pe butonul de golire a coșului din meniu. De asemenea, puteți curăța LocalStorage și fișierele cache direct din setările de confidențialitate ale browserului dumneavoastră.
                </span>
              ) : (
                <span>
                  You can empty your cart items at any time by clicking the clear cart button in the menu drawer. You can also clear LocalStorage and cache files directly from your browser's privacy settings.
                </span>
              )}
            </p>
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
