import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Plus, Minus, Search, ArrowRight } from 'lucide-react';
import { MENU_DATA } from '../data/menuData';
import { useLanguage } from '../contexts/LanguageContext';
import { MenuItem, CartItem, Page } from '../App';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get 8 random items if no search, or filter based on search
    if (searchQuery.trim() === '') {
      const shuffled = [...MENU_DATA].sort(() => 0.5 - Math.random());
      setFilteredItems(shuffled.slice(0, 8));
    } else {
      const filtered = MENU_DATA.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
    setCurrentIndex(0);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGoToMenu = () => {
    setMenuSearchQuery(searchQuery);
    navigateTo('menu');
  };

  const nextSlide = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredItems.length - 1);
    }
  };

  const getItemQuantity = (id: number) => {
    const cartItem = cart.find(i => i.item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section 
      style={{ padding: 'var(--spacing-lg) 0', backgroundColor: '#fcfcfc' }}
      aria-labelledby="featured-title"
    >
      <div className="container">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          marginBottom: 'var(--spacing-lg)' 
        }}>
          <h2 id="featured-title" style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center' }}>
            {t('home.featured_title') || 'Grill. Pizza. Românește.'}
          </h2>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '400px' 
            }}>
              <Search 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#999'
                }} 
              />
              <input 
                type="text"
                placeholder={t('menu.search_placeholder')}
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Caută în meniu"
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  borderRadius: '30px',
                  border: '1px solid #ddd',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              />
            </div>
            <button 
              onClick={handleGoToMenu}
              className="btn-primary"
              aria-label="Mergi la meniul complet"
              style={{ 
                padding: '12px 25px', 
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}
            >
              {t('home.full_menu') || 'MENIU ÎNTREG'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div style={{ position: 'relative', padding: '0 40px' }}>
            {/* Carousel Controls */}
            <button 
              onClick={prevSlide}
              aria-label="Elementul anterior"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'white',
                border: '1px solid #eee',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                zIndex: 2
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              style={{ 
                overflow: 'hidden',
                width: '100%'
              }}
              ref={scrollRef}
            >
              <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease',
                transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%)`,
              }}>
                {filteredItems.map((item) => (
                  <div key={item.id} style={{
                    minWidth: window.innerWidth < 768 ? '100%' : '33.333%',
                    padding: '10px',
                    flexShrink: 0
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                        <img 
                          src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000"} 
                          alt={language === 'en' && item.nameEn ? item.nameEn : item.name}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 800
                        }}>
                          {item.price} LEI
                        </div>
                      </div>
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>
                          {language === 'en' && item.nameEn ? item.nameEn : item.name}
                        </h3>
                        <p style={{ 
                          fontSize: '0.85rem', 
                          color: '#666', 
                          marginBottom: '20px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flex: 1
                        }}>
                          {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {getItemQuantity(item.id) === 0 ? (
                            <button 
                              onClick={() => addToCart(item)}
                              aria-label={`Adaugă ${item.name} în coș`}
                              className="btn-primary"
                              style={{ 
                                width: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px',
                                padding: '10px',
                                borderRadius: '10px',
                                fontSize: '0.85rem'
                              }}
                            >
                              <Plus size={16} />
                              {t('menu.add_to_cart')}
                            </button>
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              width: '100%',
                              backgroundColor: '#f5f5f5',
                              padding: '5px 15px',
                              borderRadius: '10px'
                            }}>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Elimină o porție de ${item.name}`}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                              >
                                <Minus size={18} />
                              </button>
                              <span style={{ fontWeight: 800 }}>{getItemQuantity(item.id)}</span>
                              <button 
                                onClick={() => addToCart(item)}
                                aria-label={`Mai adaugă o porție de ${item.name}`}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                              >
                                <Plus size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={nextSlide}
              aria-label="Elementul următor"
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'white',
                border: '1px solid #eee',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                zIndex: 2
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>{t('menu.no_results')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
