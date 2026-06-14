import { useState, useMemo, useEffect, useRef } from 'react';
import { ShoppingBag, Plus, Minus, Send, Phone as WhatsApp, X, Trash2, Search, Utensils, ChevronDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
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

const removeDiacritics = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

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
  const [showFilters, setShowFilters] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const filterListRef = useRef<HTMLDivElement>(null);
  
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
    const handleScroll = () => {
      setShowFilters(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const header = document.getElementById('main-navbar');
      if (header) {
        setNavbarHeight(header.offsetHeight);
      }
    };
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  const checkScrollLimits = () => {
    const el = filterListRef.current;
    if (el) {
      const canScrollLeft = el.scrollLeft > 5;
      const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
      setShowLeftArrow(canScrollLeft);
      setShowRightArrow(canScrollRight);
    }
  };

  useEffect(() => {
    const el = filterListRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits);
      // Run once on load/visibility toggle
      checkScrollLimits();
      
      // Also run when window resizes
      window.addEventListener('resize', checkScrollLimits);
      
      return () => {
        el.removeEventListener('scroll', checkScrollLimits);
        window.removeEventListener('resize', checkScrollLimits);
      };
    }
  }, [showFilters]);

  // Check scroll limits whenever the activeCategory changes (after scroll animation completes)
  useEffect(() => {
    const timer = setTimeout(checkScrollLimits, 400);
    return () => clearTimeout(timer);
  }, [activeCategory]);

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
      const query = removeDiacritics(searchQuery.toLowerCase());
      items = items.filter(item => {
        const nameRo = removeDiacritics(item.name.toLowerCase());
        const nameEn = item.nameEn ? removeDiacritics(item.nameEn.toLowerCase()) : "";
        const descRo = removeDiacritics(item.description.toLowerCase());
        const descEn = item.descriptionEn ? removeDiacritics(item.descriptionEn.toLowerCase()) : "";
        
        return nameRo.includes(query) || 
               nameEn.includes(query) ||
               descRo.includes(query) ||
               descEn.includes(query);
      });
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
    <main style={{ minHeight: '80vh', padding: '0 0 var(--spacing-xl) 0', marginTop: '-15vh', position: 'relative', zIndex: 2 }} aria-labelledby="menu-main-title">
      
      {/* Fixed Header for Filters */}
      <div style={{
        position: 'fixed',
        top: `${navbarHeight}px`,
        left: 0,
        width: '100%',
        zIndex: 900,
        backgroundColor: 'var(--color-bg)',
        padding: '15px 0',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        transform: showFilters ? 'translateY(0)' : 'translateY(-100%)',
        opacity: showFilters ? 1 : 0,
        visibility: showFilters ? 'visible' : 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div className="container">
          {/* Search Bar */}
          <div style={{ 
            maxWidth: '600px', 
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
                padding: '12px 15px 12px 45px',
                borderRadius: '30px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>
          
          {/* Category Filter Wrapper with dynamic scroll arrows */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Left Scroll Arrow */}
            {showLeftArrow && (
              <div 
                className="scroll-arrow-container left"
                onClick={() => {
                  if (filterListRef.current) {
                    filterListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                  }
                }}
              >
                <button 
                  className="scroll-arrow-btn"
                  aria-label="Defilează la stânga"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
            )}

            {/* Category Filter */}
            <div 
              ref={filterListRef}
              className="category-filter-list hide-scrollbar"
              role="tablist"
              aria-label="Categorii meniu"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  aria-controls={`panel-${cat}`}
                  onClick={(e) => {
                    if (activeCategory === cat) {
                      setActiveCategory("Toate");
                    } else {
                      setActiveCategory(cat);
                    }
                    setSearchQuery(""); // Clear search when category is selected

                    // Smoothly scroll the selected category into the center of the list
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    });

                    // Scroll back to top of menu
                    const menuSection = document.getElementById('menu-section');
                    if (menuSection) {
                      const y = menuSection.getBoundingClientRect().top + window.scrollY - 130;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)'}`,
                    backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'white',
                    color: activeCategory === cat ? 'white' : 'var(--color-text)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition)'
                  }}
                >
                  {t(CATEGORY_MAP[cat]).toUpperCase()}
                </button>
              ))}
            </div>

            {/* Right Scroll Arrow */}
            {showRightArrow && (
              <div 
                className="scroll-arrow-container right"
                onClick={() => {
                  if (filterListRef.current) {
                    filterListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                  }
                }}
              >
                <button 
                  className="scroll-arrow-btn"
                  aria-label="Defilează la dreapta"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Menu Sections */}
        {groupedItems.length > 0 ? (
          groupedItems.map((group, index) => (
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
                  display: index === 0 ? 'none' : 'flex', 
                  alignItems: 'center', 
                  gap: '20px', 
                  marginBottom: 'var(--spacing-md)',
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
                      border: '1px solid rgba(188, 71, 73, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'var(--transition)',
                      boxShadow: '0 8px 24px rgba(188, 71, 73, 0.05)'
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
          box-shadow: 0 12px 32px rgba(188, 71, 73, 0.12) !important;
        }
        .btn-primary:active {
          transform: scale(0.98);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .category-filter-list {
          display: flex;
          justify-content: flex-start;
          gap: 8px;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 8px var(--spacing-md) 12px var(--spacing-md);
          margin: 0 calc(-1 * var(--spacing-md));
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        @media (min-width: 768px) {
          .category-filter-list {
            justify-content: center;
            flex-wrap: wrap;
            overflow-x: visible;
            padding: 0 0 5px 0;
            margin: 0;
          }
        }
        /* Premium Arrow Containers with Fading Gradient Overlay */
        .scroll-arrow-container {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50px;
          display: flex;
          align-items: center;
          z-index: 10;
          pointer-events: none;
          animation: fadeInArrow 0.25s ease;
        }
        .scroll-arrow-container.left {
          left: calc(-1 * var(--spacing-md));
          background: linear-gradient(to right, var(--color-bg) 60%, rgba(253, 240, 213, 0));
          justify-content: flex-start;
          padding-left: 8px;
        }
        .scroll-arrow-container.right {
          right: calc(-1 * var(--spacing-md));
          background: linear-gradient(to left, var(--color-bg) 60%, rgba(253, 240, 213, 0));
          justify-content: flex-end;
          padding-right: 8px;
        }
        .scroll-arrow-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
          pointer-events: auto;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-arrow-btn:hover {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
          transform: scale(1.08);
        }
        .scroll-arrow-btn:active {
          transform: scale(0.92);
        }
        @keyframes fadeInArrow {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (min-width: 768px) {
          .scroll-arrow-container {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
