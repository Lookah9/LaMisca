import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';

interface TermsProps {
  navigateTo: (page: Page) => void;
}

export default function Terms({ navigateTo }: TermsProps) {
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
            {language === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)' }}>
            {language === 'ro' 
              ? 'Regulamentul de utilizare a website-ului și fluxul de comandă.' 
              : 'Website usage policy and order placement flow.'}
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
              1. {language === 'ro' ? 'Prevederi Generale' : 'General Provisions'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' 
                ? 'Acest website este operat de LA MISCA SRL, cu sediul social în Str. Valea Parcului 42, Sat Mogoșoaia, Jud. Ilfov, Cod 077135, înregistrată la Registrul Comerțului sub nr. J2021002281237, CUI 44081970.' 
                : 'This website is operated by LA MISCA SRL, with registered office at Str. Valea Parcului 42, Sat Mogosoaia, Jud. Ilfov, Code 077135, registered with the Trade Registry under no. J2021002281237, CUI 44081970.'}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              2. {language === 'ro' ? 'Fluxul de Comandă prin WhatsApp' : 'WhatsApp Ordering Process'}
            </h2>
            <div style={{ 
              backgroundColor: 'rgba(188, 71, 73, 0.03)', 
              borderLeft: '4px solid var(--color-primary)', 
              padding: '15px 20px', 
              borderRadius: '0 8px 8px 0',
              marginBottom: '20px',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'var(--color-text)'
            }}>
              {language === 'ro' ? (
                <p>
                  <strong>IMPORTANT:</strong> Comenzile plasate prin intermediul acestui website sunt transmise via WhatsApp. Website-ul <strong>NU procesează plăți online</strong> cu cardul. O comandă este considerată validă și confirmată <strong>DOAR după ce restaurantul confirmă detaliile</strong>, disponibilitatea produselor, adresa de livrare, timpul estimat de livrare și prețul final prin WhatsApp sau comunicare telefonică directă.
                </p>
              ) : (
                <p>
                  <strong>IMPORTANT:</strong> Orders placed through this website are transmitted via WhatsApp. The website <strong>does not process online payments</strong>. An order is considered confirmed and valid <strong>ONLY after the restaurant confirms the details</strong>, product availability, delivery address, estimated delivery time, and final price through WhatsApp or direct phone communication.
                </p>
              )}
            </div>

            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' ? (
                <span>
                  Produsele și meniurile pot fi selectate și adăugate în coș pe site. La finalizarea comenzii, utilizatorul completează detaliile de contact și este redirecționat automat către WhatsApp, unde textul comenzii este generat și trimis către numărul nostru de suport. Prețurile afișate pe site au caracter informativ, iar disponibilitatea stocurilor sau aria exactă de livrare vor fi confirmate manual în conversație.
                </span>
              ) : (
                <span>
                  Products and menus can be selected and added to the cart on the website. Upon placing the order, the user fills in contact details and is automatically redirected to WhatsApp, where the order text is generated and sent to our support number. Prices shown on the site are informative, and stock availability or the exact delivery area will be confirmed manually during the conversation.
                </span>
              )}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              3. {language === 'ro' ? 'Modalități de Plată' : 'Payment Methods'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' 
                ? 'Plata produselor se va efectua la livrare (ramburs cash) sau la terasă (cash sau card bancar prin POS fizic), după caz și conform înțelegerii din conversația WhatsApp de confirmare a comenzii.' 
                : 'Payment for the products will be made upon delivery (cash on delivery) or at the terrace (cash or bank card via physical POS terminal), as agreed in the WhatsApp order confirmation conversation.'}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              4. {language === 'ro' ? 'Limitarea Răspunderii' : 'Limitation of Liability'}
            </h2>
            <p>
              {language === 'ro' 
                ? 'Depunem eforturi constante pentru ca informațiile referitoare la prețuri, ingrediente și alergeni să fie corecte și actualizate. Cu toate acestea, restaurantul nu își asumă răspunderea pentru erori tehnice de afișare temporară. Confirmarea finală a prețului și a compoziției produsului se face în momentul confirmării manuale.' 
                : 'We make constant efforts to ensure that information regarding prices, ingredients, and allergens is accurate and up-to-date. However, the restaurant does not assume liability for temporary technical display errors. The final confirmation of the price and product composition is made at the time of manual confirmation.'}
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
