import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BrandsSection from './components/BrandsSection';
import ShopSection from './components/ShopSection';
import SizeGuideSection from './components/SizeGuideSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import SPIKE_PRODUCTS from './data/products';

/**
 * Root application component.
 * Manages global state: mode (store/admin), products, cart, and modals.
 */
export default function App() {
  const [mode, setMode] = useState('store');
  const [products, setProducts] = useState(SPIKE_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Admin mode
  if (mode === 'admin') {
    return (
      <AdminPanel
        products={products}
        setProducts={setProducts}
        onExit={() => setMode('store')}
      />
    );
  }

  // Store mode
  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onAdminAccess={() => setMode('admin')}
      />
      <HeroSection
        onShop={() =>
          document
            .getElementById('shop-sec')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <BrandsSection />
      <ShopSection
        products={products}
        onSelect={setSelected}
        onAddCart={addToCart}
      />
      <SizeGuideSection />
      <AboutSection />
      <ContactSection />
      <Footer />

      {/* Modals */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAddCart={addToCart}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}
