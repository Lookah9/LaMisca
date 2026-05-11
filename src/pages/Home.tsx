import Hero from '../components/Hero';
import LocationSection from '../components/LocationSection';
import Menu from './Menu';
import { Page, MenuItem, CartItem } from '../App';

interface HomeProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  initialSearchQuery?: string;
  setMenuSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  navigateTo: (page: Page) => void;
}

export default function Home({ 
  cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart, 
  initialSearchQuery, setMenuSearchQuery, activeCategory, setActiveCategory, navigateTo 
}: HomeProps) {
  return (
    <>
      <Hero navigateTo={navigateTo} />
      
      <div id="menu-section">
        <Menu 
          cart={cart}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          initialSearchQuery={initialSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <LocationSection />
    </>
  );
}
