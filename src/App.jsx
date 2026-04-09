import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BrandsSection from './components/BrandsSection';
import WhyChooseUs from './components/WhyChooseUs';
import ShopSection from './components/ShopSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AdminLogin from './components/AdminLogin';
import BackToTop from './components/BackToTop';
import AdminPanel from './components/AdminPanel';
import { supabase } from './lib/supabase';

export default function App() {
  const [mode, setMode] = useState('store');
  const [products, setProducts] = useState([]);

  // Fetch products from Supabase on mount
  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error('Failed to load products:', error.message);
        else setProducts(data || []);
      });
  }, []);
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

  const handleAdminAccess = () => {
    setMode('login');
  };

  // Admin login gate
  if (mode === 'login') {
    return (
      <AdminLogin
        onSuccess={() => setMode('admin')}
        onBack={() => setMode('store')}
      />
    );
  }

  // Admin panel
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
      <a href="#main" className="skip-link">SKIP TO CONTENT</a>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onAdminAccess={handleAdminAccess}
      />
      <HeroSection
        onShop={() =>
          document
            .getElementById('shop-sec')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <BrandsSection />
      <WhyChooseUs />
      <ShopSection
        products={products}
        onSelect={setSelected}
        onAddCart={addToCart}
      />
      <AboutSection />
      <ContactSection />
      <Footer onAdminAccess={handleAdminAccess} />

      {/* Modals & Overlays */}
      <BackToTop />
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
