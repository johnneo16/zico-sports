import { useState, useEffect } from 'react';
import { ShoppingCart, Settings, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';
import Logo from './Logo';
import './Navbar.css';

/**
 * Fixed navigation bar with scroll-aware glassmorphism, mobile menu, and theme toggle.
 */
export default function Navbar({ cartCount, onCartOpen, onAdminAccess }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navLinks = [
    { id: 'shop-sec', label: 'Shop' },
    { id: 'brands-sec', label: 'Brands' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'size-guide', label: 'Sizes' },
    { id: 'about-sec', label: 'About' },
    { id: 'contact-sec', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={42} />
          <div className="navbar__brand-text">
            <div className="navbar__title">ZICO SPORTS</div>
            <div className="navbar__subtitle">FOOTBALL SPIKES SPECIALIST</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navLinks.map(({ id, label }) => (
            <button key={id} className="navbar__link" onClick={() => scrollTo(id)}>
              {label.toUpperCase()}
            </button>
          ))}

          {/* Theme Toggle */}
          <button className="navbar__theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <button className="navbar__admin-link" onClick={onAdminAccess} title="Admin Panel">
            <Settings size={14} />
          </button>

          <button className="navbar__cart-btn" onClick={onCartOpen}>
            <ShoppingCart size={16} />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="navbar__mobile-actions">
          <button className="navbar__theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button className="navbar__cart-btn navbar__cart-btn--mobile" onClick={onCartOpen}>
            <ShoppingCart size={16} />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          <button className="navbar__menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="navbar__mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="navbar__mobile-menu" onClick={(e) => e.stopPropagation()}>
            {navLinks.map(({ id, label }) => (
              <button key={id} className="navbar__mobile-link" onClick={() => scrollTo(id)}>
                {label.toUpperCase()}
              </button>
            ))}
            <button className="navbar__mobile-link navbar__mobile-link--admin" onClick={() => { onAdminAccess(); setMobileOpen(false); }}>
              <Settings size={14} /> ADMIN PANEL
            </button>
          </div>
        </div>
      )}
    </>
  );
}
