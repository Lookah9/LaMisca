import { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Send, Phone as WhatsApp, X, Trash2, Search, Utensils, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MenuItem, CartItem } from '../App';
import { MENU_DATA } from '../data/menuData';

const CATEGORY_MAP: Record<string, string> = {
  "Toate": "cat.all",
  "Gustări": "cat.starters",
  "Salate": "cat.salads",
  "Burgeri": "cat.burgers",
  "Supe & Ciorbe": "cat.soups",
  "Paste": "cat.pasta",
  "Preparate Carne": "cat.meat",
  "Grătar": "cat.grill",
  "Platouri": "cat.platters",
  "Pește & Fructe de mare": "cat.fish",
  "Pizza": "cat.pizza",
  "Desert": "cat.dessert",
  "Băuturi": "cat.drinks",
  "Meniul Zilei": "cat.daily"
};

const CATEGORIES = [
  "Toate", "Gustări", "Salate", "Burgeri", "Supe & Ciorbe", 
  "Paste", "Preparate Carne", "Grătar", "Platouri", 
  "Pește & Fructe de mare", "Pizza", "Desert", "Băuturi", "Meniul Zilei"
];

interface MenuProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  initialSearchQuery?: string;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function Menu({ 
  cart, 
  isCartOpen, 
  setIsCartOpen, 
  addToCart, 
  removeFromCart, 
  clearCart, 
  initialSearchQuery = "",
  activeCategory,
  setActiveCategory
}: MenuProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const { t, language } = useLanguage();

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
      window.scrollTo(0, 0);
    }
  }, [initialSearchQuery]);

  const filteredItems = useMemo(() => {
    let items = MENU_DATA;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.nameEn && item.nameEn.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(query))
      );
    }

    // Filter by category (if not searching or if category is explicitly selected)
    if (activeCategory !== "Toate") {
      items = items.filter(item => item.category === activeCategory);
    }

    return items;
  }, [activeCategory, searchQuery]);

  const groupedItems = useMemo(() => {
    const categoriesToRender = activeCategory === "Toate" 
      ? CATEGORIES.filter(cat => cat !== "Toate")
      : [activeCategory];

    return categoriesToRender.map(cat => ({
      category: cat,
      items: filteredItems.filter(item => item.category === cat)
    })).filter(group => group.items.length > 0);
  }, [activeCategory, filteredItems]);

  const total = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const getItemQuantity = (id: number) => {
    const item = cart.find(i => i.item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <main style={{ minHeight: '80vh', padding: 'var(--spacing-xl) 0' }} aria-labelledby="menu-main-title">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 id="menu-main-title" className="section-title">{t('menu.title')}</h1>
          <p style={{ color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)' }}>
            {t('menu.subtitle')} Telefon: +40 727 783 800
          </p>

          {/* Search Bar */}
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto var(--spacing-md)',
            position: 'relative'
          }}>
            <Search 
              size={20} 
              aria-hidden="true"
              style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--color-text-light)',
                opacity: 0.5
              }} 
            />
            <input 
              type="text"
              placeholder={t('menu.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Caută produse în meniu"
              style={{
                width: '100%',
                padding: '15px 15px 15px 45px',
                borderRadius: '30px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>
          
          {/* Category Filter */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 'var(--spacing-xs)', 
              flexWrap: 'wrap',
              marginBottom: 'var(--spacing-md)'
            }}
            role="tablist"
            aria-label="Categorii meniu"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                aria-controls={`panel-${cat}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery(""); // Clear search when category is selected
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : '#ddd'}`,
                  backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'white',
                  color: activeCategory === cat ? 'white' : 'var(--color-text)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {t(CATEGORY_MAP[cat]).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        {groupedItems.length > 0 ? (
          groupedItems.map(group => (
            <section 
              key={group.category} 
              id={`panel-${group.category}`}
              role="tabpanel"
              style={{ marginBottom: 'var(--spacing-xl)' }}
              aria-labelledby={`heading-${group.category}`}
            >
              <div 
                onClick={() => toggleCategory(group.category)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCategory(group.category); }}
                role="button"
                tabIndex={0}
                aria-expanded={!collapsedCategories.has(group.category)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px', 
                  marginBottom: 'var(--spacing-md)',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  paddingBottom: '10px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 id={`heading-${group.category}`} style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    color: 'var(--color-text)',
                    margin: 0
                  }}>
                    {t(CATEGORY_MAP[group.category])}
                  </h2>
                  <ChevronDown 
                    size={24} 
                    style={{ 
                      color: 'var(--color-primary)',
                      transform: collapsedCategories.has(group.category) ? 'rotate(-90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} 
                  />
                </div>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-primary)', opacity: 0.3 }} aria-hidden="true"></div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateRows: collapsedCategories.has(group.category) ? '0fr' : '1fr',
                transition: 'grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
                    gap: 'var(--spacing-md)',
                    padding: '10px 5px 20px 5px', // prevent clipping of shadows/transforms
                    opacity: collapsedCategories.has(group.category) ? 0 : 1,
                    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    {group.items.map(item => {
                  const quantity = getItemQuantity(item.id);
                  const itemName = language === 'en' && item.nameEn ? item.nameEn : item.name;
                  return (
                    <article key={item.id} style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'var(--transition)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                    }} className="menu-item-card">
                      {/* Item Image */}
                      <div style={{ 
                        height: '200px', 
                        width: '100%', 
                        overflow: 'hidden', 
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={itemName} 
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ 
                            textAlign: 'center', 
                            color: 'var(--color-primary)', 
                            opacity: 0.2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                          }} aria-hidden="true">
                            <Utensils size={48} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                              {t(CATEGORY_MAP[item.category])}
                            </span>
                          </div>
                        )}
                      </div>

                      <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {itemName}
                            </h3>
                            <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.1rem', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                              {item.price} lei
                            </span>
                          </div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-sm)', lineHeight: '1.4' }}>
                            {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                          </p>
                        </div>
                        
                        {quantity === 0 ? (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto', paddingTop: '10px' }}>
                            <button 
                              onClick={() => addToCart(item)}
                              className="btn-primary" 
                              aria-label={`Adaugă ${itemName} în coș`}
                              style={{ padding: '8px 24px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700 }}
                            >
                              {t('menu.add_to_cart')}
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto', paddingTop: '10px' }}>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              gap: '15px',
                              backgroundColor: 'var(--color-primary)',
                              borderRadius: '30px',
                              padding: '6px 10px'
                            }}>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Elimină o porție de ${itemName}`}
                                style={{ 
                                  background: 'white', 
                                  border: 'none', 
                                  borderRadius: '50%', 
                                  width: '26px', 
                                  height: '26px', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  color: 'var(--color-primary)',
                                  cursor: 'pointer'
                                }}
                              >
                                <Minus size={16} aria-hidden="true" />
                              </button>
                              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', minWidth: '16px', textAlign: 'center' }} aria-label={`Cantitate: ${quantity}`}>
                                {quantity}
                              </span>
                              <button 
                                onClick={() => addToCart(item)}
                                aria-label={`Mai adaugă o porție de ${itemName}`}
                                style={{ 
                                  background: 'white', 
                                  border: 'none', 
                                  borderRadius: '50%', 
                                  width: '26px', 
                                  height: '26px', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  color: 'var(--color-primary)',
                                  cursor: 'pointer'
                                }}
                              >
                                <Plus size={16} aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0', opacity: 0.5 }} role="status">
            <Search size={48} style={{ marginBottom: 'var(--spacing-sm)' }} aria-hidden="true" />
            <h3>{t('menu.no_results')}</h3>
          </div>
        )}
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cart.length > 0 && !isCartOpen && (
        <button 
          onClick={() => setIsCartOpen(true)}
          aria-label={`Vezi coșul de cumpărături, total ${total} LEI`}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: 'var(--color-text)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 1000,
            cursor: 'pointer',
            border: 'none'
          }}
        >
          <ShoppingBag size={20} aria-hidden="true" />
          <span style={{ fontWeight: 700 }}>{t('menu.view_order')} ({total} LEI)</span>
        </button>
      )}

      <style>{`
        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        .btn-primary:active {
          transform: scale(0.98);
        }
      `}</style>
    </main>
  );
}
