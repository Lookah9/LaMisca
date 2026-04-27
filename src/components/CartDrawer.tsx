import { useState } from 'react';
import { ShoppingBag, Plus, Minus, X, Trash2, Phone as WhatsApp } from 'lucide-react';
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

export default function CartDrawer({ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart }: CartDrawerProps) {
  const { t, language } = useLanguage();
  
  // Customer details state
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formError, setFormError] = useState(false);

  const total = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const sendOrder = () => {
    if (!customerName || !customerAddress || !customerPhone) {
      setFormError(true);
      return;
    }
    setFormError(false);

    const orderText = cart.map(i => `${i.quantity}x ${language === 'en' && i.item.nameEn ? i.item.nameEn : i.item.name}`).join('%0A');
    const intro = language === 'ro' ? 'Buna ziua! As dori sa comand de la La Misca:' : 'Hello! I would like to order from La Misca:';
    
    const details = language === 'ro' 
      ? `%0A%0A*Detalii Client*%0ANume: ${customerName}%0AAdresa: ${customerAddress}%0ATelefon: ${customerPhone}`
      : `%0A%0A*Customer Details*%0AName: ${customerName}%0AAddress: ${customerAddress}%0APhone: ${customerPhone}`;

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
      backdropFilter: 'blur(4px)'
    }} onClick={() => setIsCartOpen(false)}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'var(--color-bg)',
        height: '100%',
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={24} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('menu.your_order')}</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
          >
            <X size={28} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--color-text-light)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '20px' }} />
              <p>{t('menu.cart_empty')}</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                {cart.map(i => (
                  <div key={i.item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2px' }}>
                        {language === 'en' && i.item.nameEn ? i.item.nameEn : i.item.name}
                      </h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>{i.item.price} lei / buc</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        backgroundColor: '#f5f5f5',
                        padding: '4px 10px',
                        borderRadius: '20px'
                      }}>
                        <button 
                          onClick={() => removeFromCart(i.item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 800, minWidth: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{i.quantity}</span>
                        <button 
                          onClick={() => addToCart(i.item)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details Form */}
              <div style={{ 
                backgroundColor: 'rgba(0,0,0,0.02)', 
                padding: 'var(--spacing-md)', 
                borderRadius: '8px',
                border: formError ? '1px solid #e11d48' : '1px solid #eee',
                marginBottom: 'var(--spacing-md)'
              }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {language === 'ro' ? 'Informații Livrare' : 'Delivery Information'}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input 
                    type="text" 
                    placeholder={t('menu.customer_name')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem'
                    }}
                  />
                  <input 
                    type="text" 
                    placeholder={t('menu.customer_phone')}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem'
                    }}
                  />
                  <textarea 
                    placeholder={t('menu.customer_address')}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    rows={2}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem',
                      resize: 'none'
                    }}
                  />
                </div>
                {formError && (
                  <p style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '10px', fontWeight: 600 }}>
                    {t('menu.required_fields')}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '2px dashed #ddd', paddingTop: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{t('menu.total_order')}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{total} LEI</span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={clearCart}
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Golește coșul"
              >
                <Trash2 size={20} color="#e11d48" />
              </button>
              <button 
                onClick={sendOrder}
                className="btn-primary" 
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '15px',
                  fontSize: '0.95rem',
                  fontWeight: 800
                }}
              >
                <WhatsApp size={22} />
                {t('menu.order_whatsapp')}
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '15px', color: 'var(--color-text-light)' }}>
              {t('menu.whatsapp_redirect')}
            </p>
          </div>
        )}
      </div>
      <style>{`
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 2px rgba(225, 29, 72, 0.1);
        }
      `}</style>
    </div>
  );
}
