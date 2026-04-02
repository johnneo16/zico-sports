import { ShoppingBag, ChevronDown, Zap, Shield, Truck, Star } from 'lucide-react';
import { HeroFieldAnimation } from './SportsAnimations';
import Logo from './Logo';
import './HeroSection.css';

/**
 * Full-screen hero with animated SVGs, floating orbs, and CTAs.
 */
export default function HeroSection({ onShop }) {
  const scrollToAbout = () => {
    document.getElementById('about-sec')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: Star, value: '500+', label: 'Happy Players' },
    { icon: Shield, value: '8', label: 'Top Brands' },
    { icon: Truck, value: 'Free', label: 'Delivery ₹1500+' },
    { icon: Zap, value: '30-Day', label: 'Easy Returns' },
  ];

  return (
    <section className="hero">
      {/* Animated Background */}
      <div className="hero__bg-elements">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid-overlay" />
      </div>

      <div className="hero__glow" />
      <div className="hero__line" />

      {/* Animated Sports SVGs */}
      <HeroFieldAnimation />

      <div className="hero__content">
        <Logo size={110} className="hero__logo" />

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          BANKURA'S FOOTBALL BOOT SPECIALIST · EST. 2018
        </div>

        <h1 className="hero__title">
          ELEVATE
          <br />
          <em>YOUR GAME</em>
        </h1>

        <p className="hero__tagline">We believe in quality.</p>

        <p className="hero__subtitle">
          Premium football spikes from Nike, Adidas, Puma and more. Expert
          guidance from real footballers. Real opinions.
        </p>

        {/* Notice Banners */}
        <div className="hero__notices">
          <div className="hero__notice">
            <Truck size={14} />
            <span>₹200 advance for online orders</span>
          </div>
          <div className="hero__notice hero__notice--accent">
            <ShoppingBag size={14} />
            <span>Visit store for exclusive discounts</span>
          </div>
        </div>

        <div className="hero__actions">
          <button className="hero__cta hero__cta--primary" onClick={onShop}>
            <ShoppingBag size={18} />
            SHOP BOOTS
          </button>
          <button className="hero__cta hero__cta--secondary" onClick={scrollToAbout}>
            OUR STORY
          </button>
        </div>

        <div className="hero__stats">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="hero__stat">
              <Icon size={16} className="hero__stat-icon" />
              <div className="hero__stat-value">{value}</div>
              <div className="hero__stat-label">{label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <button className="hero__scroll-hint" onClick={onShop}>
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
}
