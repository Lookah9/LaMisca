import { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, X, Trash2, Phone as WhatsApp, ChevronRight, ChevronLeft, MapPin, Truck, Store } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MenuItem {
  id: number;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  category: string;
  image?: string;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartDrawerProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

type CheckoutStep = 'cart' | 'details';
type DeliveryMethod = 'delivery' | 'pickup';

export default function CartDrawer({ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart }: CartDrawerProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  
  // Customer details state
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formError, setFormError] = useState(false);

  // Reset step when drawer opens
  useEffect(() => {
    if (isCartOpen) setStep('cart');
  }, [isCartOpen]);

  const total = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const sendOrder = () => {
    // Validate based on method
    if (!customerName || !customerPhone || (deliveryMethod === 'delivery' && !customerAddress)) {
      setFormError(true);
      return;
    }
    setFormError(false);

    const orderText = cart.map(i => `${i.quantity}x ${language === 'en' && i.item.nameEn ? i.item.nameEn : i.item.name}`).join('%0A');
    const intro = language === 'ro' ? 'Buna ziua! As dori sa comand de la La Misca:' : 'Hello! I would like to order from La Misca:';
    
    const methodLabel = deliveryMethod === 'delivery' 
      ? (language === 'ro' ? 'LIVRARE LA DOMICILIU' : 'HOME DELIVERY')
      : (language === 'ro' ? 'RIDICARE PERSONALA' : 'SELF PICKUP');

    const details = language === 'ro' 
      ? `%0A%0A*Metoda: ${methodLabel}*%0A*Detalii Client*%0ANume: ${customerName}%0AAdresa: ${deliveryMethod === 'delivery' ? customerAddress : 'RIDICARE PERSONALA'}%0ATelefon: ${customerPhone}`
      : `%0A%0A*Method: ${methodLabel}*%0A*Customer Details*%0AName: ${customerName}%0AAddress: ${deliveryMethod === 'delivery' ? customerAddress : 'SELF PICKUP'}%0APhone: ${customerPhone}`;

    const totalLabel = language === 'ro' ? 'Total' : 'Total';
    const message = `${intro}%0A${orderText}%0A%0A${totalLabel}: ${total} RON${details}`;
    
    window.open(`https://wa.me/40727783800?text=${message}`, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 3000,
      display: 'flex',
      justifyContent: 'flex-end',
      backdropFilter: 'blur(8px)'
    }} onClick={() => setIsCartOpen(false)}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'var(--color-bg)',
        height: '100%',
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {step === 'details' ? (
              <button 
                onClick={() => setStep('cart')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-primary)', fontWeight: 700 }}
              >
                <ChevronLeft size={20} />
                {t('menu.back_to_cart') || 'ÎNAPOI'}
              </button>
            ) : (
              <>
                <ShoppingBag size={24} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('menu.your_order')}</h2>
              </>
            )}
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
          >
            <X size={28} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--color-text-light)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '20px' }} />
              <p>{t('menu.cart_empty')}</p>
            </div>
          ) : step === 'cart' ? (
            /* STEP 1: Review Items */
            <div style={{ animation: 'slideInRight 0.3s ease' }}>
              {cart.map(i => (
                <div key={i.item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>
                      {language === 'en' && i.item.nameEn ? i.item.nameEn : i.item.name}
                    </h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 700 }}>{i.item.price} lei / buc</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#f9f9f9', padding: '5px 12px', borderRadius: '25px' }}>
                    <button 
                      onClick={() => removeFromCart(i.item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-text)' }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{i.quantity}</span>
                    <button 
                      onClick={() => addToCart(i.item)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-text)' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* STEP 2: Delivery Details */
            <div style={{ animation: 'slideInLeft 0.3s ease' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', color: 'var(--color-text)' }}>
                {language === 'ro' ? 'Cum dorești comanda?' : 'How do you want your order?'}
              </h3>
              
              {/* Method Selector */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                <button 
                  onClick={() => setDeliveryMethod('delivery')}
                  style={{
                    flex: 1,
                    padding: '20px 10px',
                    borderRadius: '12px',
                    border: deliveryMethod === 'delivery' ? '2px solid var(--color-primary)' : '1px solid #ddd',
                    backgroundColor: deliveryMethod === 'delivery' ? 'rgba(230, 57, 70, 0.05)' : 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Truck size={24} color={deliveryMethod === 'delivery' ? 'var(--color-primary)' : '#666'} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{language === 'ro' ? 'LIVRARE' : 'DELIVERY'}</span>
                </button>
                <button 
                  onClick={() => setDeliveryMethod('pickup')}
                  style={{
                    flex: 1,
                    padding: '20px 10px',
                    borderRadius: '12px',
                    border: deliveryMethod === 'pickup' ? '2px solid var(--color-primary)' : '1px solid #ddd',
                    backgroundColor: deliveryMethod === 'pickup' ? 'rgba(230, 57, 70, 0.05)' : 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Store size={24} color={deliveryMethod === 'pickup' ? 'var(--color-primary)' : '#666'} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{language === 'ro' ? 'RIDICARE' : 'PICKUP'}</span>
                </button>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="input-group">
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px', opacity: 0.7 }}>{t('menu.customer_name').toUpperCase()}</label>
                  <input 
                    type="text" 
                    placeholder="ex: Andrei Popescu"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px', opacity: 0.7 }}>{t('menu.customer_phone').toUpperCase()}</label>
                  <input 
                    type="tel" 
                    placeholder="07xx xxx xxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="input-group" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px', opacity: 0.7 }}>{t('menu.customer_address').toUpperCase()}</label>
                    <textarea 
                      placeholder="Strada, Număr, Bloc, Apartament..."
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '1rem',
                        resize: 'none'
                      }}
                    />
                  </div>
                )}

                {deliveryMethod === 'pickup' && (
                  <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '5px' }}>
                    <MapPin size={20} color="var(--color-primary)" style={{ marginTop: '2px' }} />
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      <strong>Locație Ridicare:</strong><br />
                      Strada Valea Parcului 42, Mogoșoaia
                    </p>
                  </div>
                )}
              </div>

              {formError && (
                <p style={{ color: '#e11d48', fontSize: '0.85rem', marginTop: '15px', fontWeight: 700, textAlign: 'center' }}>
                  {t('menu.required_fields')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {cart.length > 0 && (
          <div style={{ borderTop: '2px dashed #eee', paddingTop: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t('menu.total_order')}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{total} LEI</span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {step === 'cart' ? (
                <>
                  <button 
                    onClick={clearCart}
                    style={{
                      width: '60px',
                      borderRadius: '12px',
                      border: '1px solid #ddd',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition)'
                    }}
                    title="Golește coșul"
                  >
                    <Trash2 size={20} color="#e11d48" />
                  </button>
                  <button 
                    onClick={() => setStep('details')}
                    className="btn-primary" 
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '18px',
                      fontSize: '1rem',
                      fontWeight: 800,
                      borderRadius: '12px'
                    }}
                  >
                    {language === 'ro' ? 'CONTINUĂ' : 'CONTINUE'}
                    <ChevronRight size={20} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={sendOrder}
                  className="btn-primary" 
                  style={{ 
                    flex: 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '18px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    borderRadius: '12px'
                  }}
                >
                  <WhatsApp size={22} />
                  {t('menu.order_whatsapp')}
                </button>
              )}
            </div>
            
            <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '15px', color: 'var(--color-text-light)' }}>
              {step === 'cart' 
                ? (language === 'ro' ? 'Pasul următor: Metoda de livrare' : 'Next step: Delivery method')
                : t('menu.whatsapp_redirect')
              }
            </p>
          </div>
        )}
      </div>

      <style>{`
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
