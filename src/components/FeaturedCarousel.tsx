import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Plus, Minus, Utensils } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MenuItem, CartItem } from '../App';
import { MENU_DATA } from '../data/menuData';

interface FeaturedCarouselProps {
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  cart: CartItem[];
}

export default function FeaturedCarousel({ addToCart, removeFromCart, cart }: FeaturedCarouselProps) {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Select 8 random items with images if possible, or just random items
  const featuredItems = useMemo(() => {
    const withImages = MENU_DATA.filter(item => item.image);
    const pool = withImages.length >= 8 ? withImages : MENU_DATA;
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 8);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);

  const getItemQuantity = (id: number) => {
    const item = cart.find(i => i.item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section style={{ 
      padding: 'var(--spacing-lg) 0', 
      backgroundColor: 'var(--color-bg-dark)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>{t('home.featured_title') || 'RECOMANDĂRILE NOASTRE'}</h2>
          <div className="accent-border" style={{ margin: '0 auto var(--spacing-sm)' }}></div>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Carousel Wrapper */}
          <div style={{ 
            display: 'flex', 
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${currentIndex * 100}%)`,
            width: '100%'
          }}>
            {featuredItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <div key={item.id} style={{ 
                  minWidth: '100%', 
                  padding: '0 10px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    maxWidth: '800px',
                    minHeight: '350px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }} className="featured-card">
                    {/* Image Side */}
                    <div style={{ 
                      flex: 1, 
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
                        <Utensils size={80} style={{ opacity: 0.1 }} />
                      )}
                      <div style={{ 
                        position: 'absolute', 
                        top: '20px', 
                        left: '20px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em'
                      }}>
                        {item.category.toUpperCase()}
                      </div>
                    </div>

                    {/* Info Side */}
                    <div style={{ 
                      flex: 1, 
                      padding: 'var(--spacing-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
                        {language === 'en' && item.nameEn ? item.nameEn : item.name}
                      </h3>
                      <p style={{ 
                        color: 'var(--color-text-light)', 
                        marginBottom: '20px',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                      }}>
                        {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                      </p>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginTop: 'auto'
                      }}>
                        <span style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 800, 
                          color: 'var(--color-primary)' 
                        }}>
                          {item.price} lei
                        </span>

                        {quantity === 0 ? (
                          <button 
                            onClick={() => addToCart(item)}
                            className="btn-primary"
                            style={{ 
                              padding: '10px 25px', 
                              borderRadius: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            <ShoppingBag size={18} />
                            {t('menu.add_to_cart')}
                          </button>
                        ) : (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '15px',
                            backgroundColor: 'var(--color-primary)',
                            borderRadius: '30px',
                            padding: '6px 15px'
                          }}>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              <Minus size={18} />
                            </button>
                            <span style={{ color: 'white', fontWeight: 800 }}>{quantity}</span>
                            <button 
                              onClick={() => addToCart(item)}
                              style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              <Plus size={18} />
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

          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            style={{
              position: 'absolute',
              left: '-20px',
              backgroundColor: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              zIndex: 2,
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            style={{
              position: 'absolute',
              right: '-20px',
              backgroundColor: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              zIndex: 2,
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginTop: 'var(--spacing-md)' 
        }}>
          {featuredItems.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: i === currentIndex ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-card {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .featured-card > div:first-child {
            height: 200px;
          }
          .featured-card > div:last-child {
            padding: 20px !important;
          }
          .featured-card h3 {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
