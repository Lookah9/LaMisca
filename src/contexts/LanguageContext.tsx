import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ro' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  ro: {
    // Navbar
    'nav.home': 'ACASĂ',
    'nav.menu': 'MENIU',
    'nav.contact': 'CONTACT',
    'nav.cart': 'COȘ',
    
    // Hero
    'hero.title': 'Bucătărie la Foc și Jar',
    'hero.subtitle': 'Pizza la cuptor, grill și mese la terasă, lângă verdele Parcului Mogoșoaia.',
    'hero.cta': 'COMANDĂ ACUM',
    
    // Home
    'home.welcome': 'Bine ați venit la La Mișcă',
    'home.intro': 'Un loc pentru cei care apreciază ritmul grătarului și căldura unei grădini.',
    'home.cta_title': 'Ești gata să guști tradiția?',
    'home.cta_subtitle': 'Alătură-te nouă pe terasă pentru o masă de neuitat lângă lac.',
    'home.cta_btn': 'DESCOPERĂ MENIUL',
    'home.full_menu': 'MENIU ÎNTREG',
    'home.featured_title': 'Grill. Pizza. Românește.',
    
    // Menu
    'menu.title': 'Meniul La Mișcă',
    'menu.subtitle': 'Comandă acum și bucură-te de gustul autentic.',
    'menu.add_to_cart': 'ADAUGĂ ÎN COȘ',
    'menu.view_order': 'VEZI COMANDA',
    'menu.total': 'TOTAL',
    'menu.order_whatsapp': 'TRIMITE COMANDA PE WHATSAPP',
    'menu.cart_empty': 'Coșul tău este gol.',
    'menu.your_order': 'COMANDA TA',
    'menu.whatsapp_redirect': 'Vei fi redirecționat către WhatsApp pentru a finaliza comanda.',
    'menu.customer_name': 'Nume Complet',
    'menu.customer_address': 'Adresă Livrare',
    'menu.customer_phone': 'Număr de Telefon',
    'menu.required_fields': 'Vă rugăm să completați toate câmpurile.',
    'menu.total_order': 'TOTAL COMANDĂ',
    'menu.search_placeholder': 'Caută un preparat...',
    'menu.no_results': 'Niciun rezultat găsit pentru căutarea ta.',
    'menu.back_to_cart': 'ÎNAPOI',
    
    // Categories
    'cat.all': 'TOATE',
    'cat.starters': 'GUSTĂRI',
    'cat.salads': 'SALATE',
    'cat.burgers': 'BURGERI',
    'cat.soups': 'SUPE & CIORBE',
    'cat.pasta': 'PASTE',
    'cat.meat': 'PREPARATE CARNE',
    'cat.grill': 'GRĂTAR',
    'cat.platters': 'PLATOURI',
    'cat.fish': 'PEȘTE & FRUCTE DE MARE',
    'cat.pizza': 'PIZZA',
    'cat.dessert': 'DESERT',
    'cat.drinks': 'BĂUTURI',
    'cat.daily': 'MENIUL ZILEI',
    
    // Location
    'loc.title': 'După parc, la masă.',
    'loc.subtitle': 'La doi pași de Parcul Mogoșoaia, La Mișcă e locul unde te oprești după plimbare, stai liniștit și comanzi ceva cald.',
    'loc.address': 'Adresă',
    'loc.hours': 'Program',
    'loc.contact': 'Contact',
    'loc.nav_btn': 'NAVIGHEAZĂ ACUM',
    'loc.hours_val': 'Luni - Duminică: 10:00 - 22:00',
    
    // Footer
    'footer.description': 'La Mișcă este terasa de familie crescută la marginea Parcului Mogoșoaia, acolo unde plimbările lungi, aerul verde și pofta de mâncare caldă se întâlnesc firesc. Născută din dorința de a aduce în zonă un loc primitor, cu pizza coaptă pe loc, grătar încins și gusturi românești așezate la masă, La Mișcă păstrează farmecul unei opriri simple, bune, aproape de natură, făcută pentru familii, prieteni și oameni care vor să rămână puțin mai mult.',
    'footer.quick_links': 'Link-uri Rapide',
    'footer.rights': 'Toate drepturile rezervate.',
  },
  en: {
    // Navbar
    'nav.home': 'HOME',
    'nav.menu': 'MENU',
    'nav.contact': 'CONTACT',
    'nav.cart': 'CART',
    
    // Hero
    'hero.title': 'Cooking by Fire and Grill',
    'hero.subtitle': 'Oven-baked pizza, grill, and terrace dining, next to the greenery of Mogoșoaia Park.',
    'hero.cta': 'ORDER NOW',
    
    // Home
    'home.welcome': 'Welcome to La Mișcă',
    'home.intro': 'A place for those who appreciate the rhythm of the grill and the warmth of a garden.',
    'home.cta_title': 'Ready to taste the tradition?',
    'home.cta_subtitle': 'Join us on the terrace for an unforgettable meal by the lake.',
    'home.cta_btn': 'DISCOVER THE MENU',
    'home.full_menu': 'FULL MENU',
    'home.featured_title': 'Grill. Pizza. Romanian.',
    
    // Menu
    'menu.title': 'La Mișcă Menu',
    'menu.subtitle': 'Order now and enjoy the authentic taste.',
    'menu.add_to_cart': 'ADD TO CART',
    'menu.view_order': 'VIEW ORDER',
    'menu.total': 'TOTAL',
    'menu.order_whatsapp': 'SEND ORDER VIA WHATSAPP',
    'menu.cart_empty': 'Your cart is empty.',
    'menu.your_order': 'YOUR ORDER',
    'menu.whatsapp_redirect': 'You will be redirected to WhatsApp to finalize your order.',
    'menu.customer_name': 'Full Name',
    'menu.customer_address': 'Delivery Address',
    'menu.customer_phone': 'Phone Number',
    'menu.required_fields': 'Please fill in all fields.',
    'menu.total_order': 'TOTAL ORDER',
    'menu.search_placeholder': 'Search for a dish...',
    'menu.no_results': 'No results found for your search.',
    'menu.back_to_cart': 'BACK',
    
    // Categories
    'cat.all': 'ALL',
    'cat.starters': 'STARTERS',
    'cat.salads': 'SALADS',
    'cat.burgers': 'BURGERS',
    'cat.soups': 'SOUPS & STEWS',
    'cat.pasta': 'PASTA',
    'cat.meat': 'MEAT DISHES',
    'cat.grill': 'GRILL',
    'cat.platters': 'PLATTERS',
    'cat.fish': 'FISH & SEAFOOD',
    'cat.pizza': 'PIZZA',
    'cat.dessert': 'DESSERT',
    'cat.drinks': 'DRINKS',
    'cat.daily': 'DAILY MENU',
    
    // Location
    'loc.title': 'After the park, at the table.',
    'loc.subtitle': 'Just steps away from Mogoșoaia Park, La Mișcă is the place where you stop after a walk, relax, and order something warm.',
    'loc.address': 'Address',
    'loc.hours': 'Hours',
    'loc.contact': 'Contact',
    'loc.nav_btn': 'NAVIGATE NOW',
    'loc.hours_val': 'Monday - Sunday: 10:00 - 22:00',
    
    // Footer
    'footer.description': 'La Mișcă is the family terrace grown on the edge of Mogoșoaia Park, where long walks, green air, and a craving for warm food meet naturally. Born from the desire to bring a welcoming place to the area, with freshly baked pizza, a hot grill, and Romanian tastes served at the table, La Mișcă preserves the charm of a simple, good stop, close to nature, made for families, friends, and people who want to stay a little longer.',
    'footer.quick_links': 'Quick Links',
    'footer.rights': 'All rights reserved.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ro') {
      setLanguage('ro');
    } else {
      setLanguage('en');
    }
  }, []);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
