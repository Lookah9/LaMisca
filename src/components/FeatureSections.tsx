import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../App';

interface FeatureRowProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reverse?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
}

function FeatureRow({ title, subtitle, description, image, reverse, buttonLabel, onButtonClick, showButton = true }: FeatureRowProps) {
  const { t } = useLanguage();
  return (
    <div className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div style={{ order: reverse ? 2 : 1 }}>
          <div className="accent-border" aria-hidden="true"></div>
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
             maxWidth: '500px',
             lineHeight: '1.6'
          }}>
            {description}
          </p>
          {showButton && (
            <button 
              className="btn-outline" 
              onClick={onButtonClick}
              aria-label={buttonLabel || t('hero.cta')}
              style={{ padding: '12px 30px' }}
            >
              {buttonLabel || t('hero.cta')}
            </button>
          )}
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
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureSectionsProps {
  navigateTo: (page: Page) => void;
  setMenuSearchQuery: (query: string) => void;
}

export default function FeatureSections({ navigateTo, setMenuSearchQuery }: FeatureSectionsProps) {
  const { t, language } = useLanguage();
  
  const ourStoryDesc = language === 'ro' 
    ? "La Mișcă este terasa de familie crescută la marginea Parcului Mogoșoaia, acolo unde plimbările lungi, aerul verde și pofta de mâncare caldă se întâlnesc firesc. Născută din dorința de a aduce în zonă un loc primitor, cu pizza coaptă pe loc, grătar încins și gusturi românești așezate la masă, La Mișcă păstrează farmecul unei opriri simple, bune, aproape de natură, făcută pentru familii, prieteni și oameni care vor să rămână puțin mai mult."
    : "La Mișcă is the family terrace grown on the edge of Mogoșoaia Park, where long walks, green air, and a craving for warm food meet naturally. Born from the desire to bring a welcoming place to the area, with freshly baked pizza, a hot grill, and Romanian tastes served at the table, La Mișcă preserves the charm of a simple, good stop, close to nature, made for families, friends, and people who want to stay a little longer.";

  const handlePizzaClick = () => {
    setMenuSearchQuery("Pizza");
    navigateTo('menu');
  };

  const handleOrderClick = () => {
    setMenuSearchQuery("");
    navigateTo('menu');
  };

  return (
    <section className="section" aria-label="Caracteristici și Poveste">
      <FeatureRow 
        subtitle={language === 'ro' ? "Povestea Noastră" : "Our Story"}
        title={language === 'ro' ? "La Mișcă" : "La Mișcă"}
        description={ourStoryDesc}
        image="images/LM istoric.png"
        showButton={false}
      />
      
      <FeatureRow 
        subtitle={t('cat.pizza')}
        title={language === 'ro' ? "Pizza pe Vatră" : "Wood-Fired Pizza"}
        description={language === 'ro' ? "Aluat întins manual, ingrediente oneste și căldura intensă a cuptorului nostru cu lemne. Aducem spiritul autentic al pizzaiolo în Mogoșoaia." : "Hand-stretched dough, honest ingredients, and the intense heat of our brick oven. We bring the authentic spirit of the pizzaiolo to Mogosoaia."}
        image="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000"
        reverse
        buttonLabel={language === 'ro' ? "Pizza Noastră" : "Our Pizza"}
        onButtonClick={handlePizzaClick}
      />
      
      <FeatureRow 
        subtitle={language === 'ro' ? "RĂDĂCINI ROMÂNEȘTI" : "ROMANIAN ROOTS"}
        title={language === 'ro' ? "Tradiție, Reinterpretată" : "Tradition, Reimagined"}
        description={language === 'ro' ? "Savoarea gustului de acasă. De la mezeluri artizanale la tocănițe gătite lent, celebrăm moștenirea culinară românească cu o notă modernă și de înaltă calitate." : "Savor the flavors of home. From artisanal cold cuts to slow-cooked stews, we celebrate Romanian culinary heritage with a modern, high-quality touch."}
        image="images/Muschi Vita Gorgonzola_converted.webp"
        onButtonClick={handleOrderClick}
      />
    </section>
  );
}
