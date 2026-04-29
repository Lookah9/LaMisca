import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Plus, Minus, Utensils, Search, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MenuItem, CartItem, Page } from '../App';
import { MENU_DATA } from '../data/menuData';

interface FeaturedCarouselProps {
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  cart: CartItem[];
  navigateTo: (page: Page) => void;
  setMenuSearchQuery: (query: string) => void;
}

export default function FeaturedCarousel({ addToCart, removeFromCart, cart, navigateTo, setMenuSearchQuery }: FeaturedCarouselProps) {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [localSearch, setLocalSearch] = useState("");
  
  // Initial pool of items (randomized once on mount)
  const basePool = useMemo(() => {
    return [...MENU_DATA].sort(() => 0.5 - Math.random());
  }, []);

  // Filtered featured items based on search
  const featuredItems = useMemo(() => {
    if (!localSearch.trim()) {
      // If no search, prefer items with images
      const withImages = basePool.filter(item => item.image);
      const pool = withImages.length >= 10 ? withImages : basePool;
      return pool.slice(0, 10);
    }
    
    const query = localSearch.toLowerCase();
    return basePool.filter(item => 
      item.name.toLowerCase().includes(query) || 
      (item.nameEn && item.nameEn.toLowerCase().includes(query)) ||
      item.category.toLowerCase().includes(query)
    );
  }, [basePool, localSearch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Reset index when searching
    setCurrentIndex(0);
  }, [localSearch]);

  useEffect(() => {
    if (featuredItems.length <= visibleItems) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (featuredItems.length - visibleItems + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length, visibleItems]);

  const maxIndex = Math.max(0, featuredItems.length - visibleItems);

  const next = () => {
    if (featuredItems.length <= visibleItems) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  const prev = () => {
    if (featuredItems.length <= visibleItems) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getItemQuantity = (id: number) => {
    const item = cart.find(i => i.item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section style={{ 
      padding: 'var(--spacing-md) 0', // Reduced padding
      backgroundColor: 'var(--color-bg-dark)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            Grill. Pizza. Românește.
          </h2>
          <div className="accent-border" style={{ margin: '0 auto var(--spacing-md)' }}></div>
          
          {/* Search and Full Menu Row */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '15px', 
            flexWrap: 'wrap',
            maxWidth: '700px',
            margin: '0 auto var(--spacing-lg)'
          }}>
            <div 
              style={{ 
                position: 'relative', 
                flex: '1', 
                minWidth: '250px' 
              }}
            >
              <Search 
                size={18} 
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
                placeholder={t('menu.search_placeholder') || 'Caută în recomandări...'}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
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
            
            <button 
              onClick={() => {
                setMenuSearchQuery(localSearch);
                navigateTo('menu');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 25px',
                borderRadius: '30px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(230, 57, 70, 0.2)',
                transition: 'var(--transition)',
                whiteSpace: 'nowrap'
              }}
              className="full-menu-btn"
            >
              {t('home.full_menu') || 'TOT MENIUL'}
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Carousel Viewport */}
          <div style={{ overflow: 'hidden', margin: '0 -10px' }}>
            {featuredItems.length > 0 ? (
              <div style={{ 
                display: 'flex', 
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}>
                {featuredItems.map((item) => {
                  const quantity = getItemQuantity(item.id);
                  return (
                    <div key={item.id} style={{ 
                      flex: `0 0 ${100 / visibleItems}%`,
                      padding: '0 10px',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.04)',
                        transition: 'transform 0.3s ease'
                      }} className="featured-card-small">
                        {/* Image Area */}
                        <div style={{ 
                          height: '220px', 
                          width: '100%', 
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Utensils size={60} style={{ opacity: 0.1 }} />
                          )}
                          <div style={{ 
                            position: 'absolute', 
                            top: '15px', 
                            left: '15px',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.05em'
                          }}>
                            {item.category.toUpperCase()}
                          </div>
                        </div>

                        {/* Content Area */}
                        <div style={{ 
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1
                        }}>
                          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>
                            {language === 'en' && item.nameEn ? item.nameEn : item.name}
                          </h3>
                          <p style={{ 
                            color: 'var(--color-text-light)', 
                            marginBottom: '20px',
                            fontSize: '0.9rem',
                            lineHeight: '1.5',
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                          </p>
                          
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginTop: 'auto',
                            paddingTop: '15px',
                            borderTop: '1px solid rgba(0,0,0,0.05)'
                          }}>
                            <span style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 800, 
                              color: 'var(--color-primary)' 
                            }}>
                              {item.price} lei
                            </span>

                            {quantity === 0 ? (
                              <button 
                                onClick={() => addToCart(item)}
                                style={{ 
                                  backgroundColor: 'var(--color-text)',
                                  color: 'white',
                                  border: 'none',
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  transition: 'var(--transition)'
                                }}
                                className="add-btn-small"
                                title={t('menu.add_to_cart')}
                              >
                                <Plus size={20} />
                              </button>
                            ) : (
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px',
                                backgroundColor: 'var(--color-primary)',
                                borderRadius: '20px',
                                padding: '5px 12px'
                              }}>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                  <Minus size={16} />
                                </button>
                                <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', minWidth: '15px', textAlign: 'center' }}>{quantity}</span>
                                <button 
                                  onClick={() => addToCart(item)}
                                  style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>
                <Search size={48} style={{ marginBottom: '10px' }} />
                <h3>Niciun rezultat găsit în recomandări.</h3>
                <p>Încearcă să cauți în tot meniul folosind butonul de mai sus.</p>
              </div>
            )}
          </div>

          {/* Navigation Arrows - Only show if items exceed visible items */}
          {featuredItems.length > visibleItems && (
            <>
              <button 
                onClick={prev}
                style={{
                  position: 'absolute',
                  left: '-25px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={next}
                style={{
                  position: 'absolute',
                  right: '-25px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Progress Indicators - Only show if items exceed visible items */}
        {featuredItems.length > visibleItems && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '8px', 
            marginTop: '30px' 
          }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: i === currentIndex ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .featured-card-small:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .add-btn-small:hover {
          background-color: var(--color-primary) !important;
          transform: scale(1.1);
        }
        .full-menu-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(230, 57, 70, 0.3);
          background-color: var(--color-primary-dark, #b51d29) !important;
        }
        @media (max-width: 640px) {
          .section-title { font-size: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
