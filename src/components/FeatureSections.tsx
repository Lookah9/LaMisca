import { useLanguage } from '../contexts/LanguageContext';

interface FeatureRowProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reverse?: boolean;
}

function FeatureRow({ title, subtitle, description, image, reverse }: FeatureRowProps) {
  return (
    <div className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div style={{ order: reverse ? 2 : 1 }}>
          <div className="accent-border"></div>
          <span style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            fontSize: '0.8rem', 
            color: 'var(--color-primary)',
            fontWeight: 700
          }}>
            {subtitle}
          </span>
          <h2 className="section-title">{title}</h2>
          <p style={{ 
             fontSize: '1.1rem', 
             color: 'var(--color-text-light)', 
             marginBottom: 'var(--spacing-md)',
             maxWidth: '500px'
          }}>
            {description}
          </p>
          <button className="btn-outline">{useLanguage().t('hero.cta')}</button>
        </div>
        <div style={{ 
          order: reverse ? 1 : 2,
          position: 'relative',
          height: '500px',
          overflow: 'hidden',
          borderRadius: '2px'
        }}>
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>
    </div>
  );
}

export default function FeatureSections() {
  const { t, language } = useLanguage();
  
  return (
    <section className="section">
      <FeatureRow 
        subtitle={t('cat.grill')}
        title={language === 'ro' ? "Foc, Fum și Suflet" : "Fire, Smoke, & Soul"}
        description={language === 'ro' ? "Meșteșugul nostru începe cu flacăra. Bucăți de carne premium, condimentate simplu și fripte la perfecțiune pe jar încins. Un gust al tradiției în fiecare mușcătură." : "Our craft begins with the flame. Prime cuts of meat, seasoned with simplicity and grilled to perfection over open embers. A taste of tradition in every bite."}
        image="/images/Ceafa La Misca_converted.webp"
      />
      
      <FeatureRow 
        subtitle={t('cat.pizza')}
        title={language === 'ro' ? "Pizza pe Vatră" : "Wood-Fired Pizza"}
        description={language === 'ro' ? "Aluat întins manual, ingrediente oneste și căldura intensă a cuptorului nostru cu lemne. Aducem spiritul autentic al pizzaiolo în Mogoșoaia." : "Hand-stretched dough, honest ingredients, and the intense heat of our brick oven. We bring the authentic spirit of the pizzaiolo to Mogosoaia."}
        image="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000"
        reverse
      />
      
      <FeatureRow 
        subtitle={language === 'ro' ? "RĂDĂCINI ROMÂNEȘTI" : "ROMANIAN ROOTS"}
        title={language === 'ro' ? "Tradiție, Reinterpretată" : "Tradition, Reimagined"}
        description={language === 'ro' ? "Savoarea gustului de acasă. De la mezeluri artizanale la tocănițe gătite lent, celebrăm moștenirea culinară românească cu o notă modernă și de înaltă calitate." : "Savor the flavors of home. From artisanal cold cuts to slow-cooked stews, we celebrate Romanian culinary heritage with a modern, high-quality touch."}
        image="/images/Muschi Vita Gorgonzola_converted.webp"
      />
    </section>
  );
}
