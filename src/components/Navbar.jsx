import { useState, useEffect } from 'react';
import Logo from './Logo';
import './Navbar.css';

/**
 * Fixed navigation bar with scroll-aware glassmorphism effect.
 */
export default function Navbar({ cartCount, onCartOpen, onAdminAccess }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'shop-sec', label: 'Shop' },
    { id: 'brands-sec', label: 'Brands' },
    { id: 'size-guide', label: 'Sizes' },
    { id: 'about-sec', label: 'About' },
    { id: 'contact-sec', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__brand">
        <Logo size={42} />
        <div className="navbar__brand-text">
          <div className="navbar__title">ZICO SPORTS</div>
          <div className="navbar__subtitle">FOOTBALL SPIKES SPECIALIST</div>
        </div>
      </div>

      <div className="navbar__links">
        {navLinks.map(({ id, label }) => (
          <button
            key={id}
            className="navbar__link"
            onClick={() => scrollTo(id)}
          >
            {label.toUpperCase()}
          </button>
        ))}
        <button
          className="navbar__admin-link"
          onClick={onAdminAccess}
          title="Admin Panel"
        >
          MANAGE
        </button>
        <button className="navbar__cart-btn" onClick={onCartOpen}>
          🛒
          {cartCount > 0 && (
            <span className="navbar__cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
