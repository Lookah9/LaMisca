import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';

interface PrivacyProps {
  navigateTo: (page: Page) => void;
}

export default function Privacy({ navigateTo }: PrivacyProps) {
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
            {language === 'ro' ? 'Politică de Confidențialitate' : 'Privacy Policy'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)' }}>
            {language === 'ro' 
              ? 'Cum protejăm și procesăm datele dumneavoastră personale.' 
              : 'How we protect and process your personal data.'}
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
              1. {language === 'ro' ? 'Colectarea de Date' : 'Data Collection'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' ? (
                <span>
                  LA MISCA SRL colectează date personale minime exclusiv în scopul facilitării plasării comenzilor de mâncare. Când adăugați produse în coș și introduceți numele, adresa de livrare și numărul de telefon, aceste date sunt folosite pentru a genera mesajul de comandă pe care îl trimiteți prin WhatsApp. Noi <strong>NU stocăm datele dumneavoastră pe serverele noastre</strong> și nu le vindem terților.
                </span>
              ) : (
                <span>
                  LA MISCA SRL collects minimal personal data solely for the purpose of facilitating food orders. When you add products to the cart and enter your name, delivery address, and phone number, this data is used to generate the order message you send via WhatsApp. We <strong>do not store your data on our servers</strong> and do not sell it to third parties.
                </span>
              )}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              2. {language === 'ro' ? 'Cum Folosim Datele' : 'How We Use Your Data'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' ? (
                <span>
                  Informațiile pe care le completați în formularul de comandă din coș sunt salvate local în browserul dumneavoastră pentru confortul dumneavoastră și sunt incluse în textul transmis pe WhatsApp. Acestea sunt utilizate exclusiv de echipa noastră de suport pentru a livra comanda și a vă contacta pentru detalii sau clarificări privind comanda.
                </span>
              ) : (
                <span>
                  The information you enter in the order form in the cart is saved locally in your browser for your convenience and is included in the text transmitted via WhatsApp. It is used exclusively by our support team to deliver the order and contact you for details or clarifications regarding the order.
                </span>
              )}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              3. {language === 'ro' ? 'Drepturile Dumneavoastră (GDPR)' : 'Your Rights (GDPR)'}
            </h2>
            <p style={{ marginBottom: '20px' }}>
              {language === 'ro' ? (
                <span>
                  Conform GDPR, aveți dreptul de acces, rectificare sau ștergere a datelor dumneavoastră personale. Deoarece nu păstrăm o bază de date permanentă a utilizatorilor pe site, puteți oricând să ne solicitați ștergerea mesajelor de comandă trimise pe WhatsApp trimițând o solicitare la adresa <strong>contact@lamisca.ro</strong>.
                </span>
              ) : (
                <span>
                  Under GDPR, you have the right to access, rectify, or delete your personal data. Since we do not maintain a permanent user database on the site, you can request the deletion of order messages sent on WhatsApp at any time by sending a request to <strong>contact@lamisca.ro</strong>.
                </span>
              )}
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
              4. {language === 'ro' ? 'Securitatea Datelor' : 'Data Security'}
            </h2>
            <p>
              {language === 'ro' ? (
                <span>
                  Redirecționarea comenzii se realizează securizat prin protocolul HTTPS. WhatsApp folosește criptare end-to-end pentru a asigura securitatea mesajelor dumneavoastră.
                </span>
              ) : (
                <span>
                  Order redirection is securely performed via HTTPS. WhatsApp uses end-to-end encryption to ensure the security of your messages.
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
