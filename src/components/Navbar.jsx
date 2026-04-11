import { useState, useEffect } from 'react';
import { ShoppingCart, Settings, Menu, X, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const WA_LINK =
  'https://wa.me/917987461287?text=' +
  encodeURIComponent("Hi Zico Sports! I'd like to enquire about your football boots. 👟");

export default function Navbar({ cartCount, onCartOpen, onAdminAccess }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen, setMobileOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  /**
   * Nav link config.
   * - `id`        → scroll to that section ID
   * - `whatsapp`  → open WhatsApp directly (no scroll)
   * - `icon`      → optional Lucide icon shown beside the label
   */
  const navLinks = [
    { id: 'shop-sec',   label: 'Shop' },
    { id: 'brands-sec', label: 'Brands' },
    { id: 'why-us',     label: 'Why Us' },
    { id: 'about-sec',  label: 'About' },
    { whatsapp: true,   label: 'Contact', icon: MessageCircle },
  ];

  const handleNavClick = ({ id, whatsapp }) => {
    if (whatsapp) {
      window.open(WA_LINK, '_blank', 'noopener,noreferrer');
      setMobileOpen(false);
      return;
    }
    scrollTo(id);
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand / Logo */}
        <div
          className="navbar__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <Logo size={42} />
          <div className="navbar__brand-text">
            <div className="navbar__title">ZICO SPORTS</div>
            <div className="navbar__subtitle">PLAY BEYOND LIMITS</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                className={`navbar__link ${link.whatsapp ? 'navbar__link--whatsapp' : ''}`}
                onClick={() => handleNavClick(link)}
                aria-label={link.whatsapp ? 'Contact us on WhatsApp' : undefined}
              >
                {Icon && <Icon size={13} aria-hidden="true" className="navbar__link-icon" />}
                {link.label.toUpperCase()}
              </button>
            );
          })}

          <button
            className="navbar__admin-link"
            onClick={onAdminAccess}
            title="Admin Panel"
            aria-label="Admin Panel"
          >
            <Settings size={14} />
          </button>

          <button
            className="navbar__cart-btn"
            onClick={onCartOpen}
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="navbar__cart-badge" aria-hidden="true">{cartCount}</span>
            )}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="navbar__mobile-actions">
          <button
            className="navbar__cart-btn navbar__cart-btn--mobile"
            onClick={onCartOpen}
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="navbar__cart-badge" aria-hidden="true">{cartCount}</span>
            )}
          </button>
          <button
            className="navbar__menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="navbar__mobile-menu" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  className={`navbar__mobile-link ${link.whatsapp ? 'navbar__mobile-link--whatsapp' : ''}`}
                  onClick={() => handleNavClick(link)}
                >
                  {Icon && <Icon size={14} aria-hidden="true" />}
                  {link.label.toUpperCase()}
                </button>
              );
            })}
            <button
              className="navbar__mobile-link navbar__mobile-link--admin"
              onClick={() => { onAdminAccess(); setMobileOpen(false); }}
            >
              <Settings size={14} aria-hidden="true" /> ADMIN PANEL
            </button>
          </div>
        </div>
      )}
    </>
  );
}
