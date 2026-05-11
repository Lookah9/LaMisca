import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

export type Page = 'home' | 'menu';

export interface MenuItem {
  id: number;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  const [menuActiveCategory, setMenuActiveCategory] = useState("Toate");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('laMiscaCart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('laMiscaCart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      return prev.map(i => i.item.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  return (
    <div className="app-container">
      <Navbar 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <CartDrawer 
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      
      <main key={currentPage} className="page-transition">
        {currentPage === 'home' || currentPage === 'menu' ? (
          <Home 
            cart={cart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            initialSearchQuery={menuSearchQuery}
            setMenuSearchQuery={setMenuSearchQuery}
            activeCategory={menuActiveCategory}
            setActiveCategory={setMenuActiveCategory}
            navigateTo={navigateTo}
          />
        ) : null}
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  )
}

export default App
