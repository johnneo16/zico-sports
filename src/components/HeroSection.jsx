import { useEffect, useRef } from 'react';
import { ShoppingBag, ChevronDown, Zap, Shield, Truck, Star } from 'lucide-react';
import Logo from './Logo';
import './HeroSection.css';

export default function HeroSection({ onShop }) {
  const bgRef = useRef(null);

  const scrollToAbout = () => {
    document.getElementById('about-sec')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax: bg image drifts up as user scrolls
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const y = window.scrollY * 0.18;
            bgRef.current.style.transform = `translateY(-${y}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stats = [
    { icon: Star,   value: '500+',   label: 'Happy Players' },
    { icon: Shield, value: '4',      label: 'Top Brands' },
    { icon: Truck,  value: 'Free',   label: 'Delivery ₹1500+' },
    { icon: Zap,    value: 'Expert', label: 'Fitting Support' },
  ];

  return (
    <section className="hero" id="main">
      <div className="hero__background-image">
        <img
          ref={bgRef}
          src="/ronaldo_hero_16_9.png"
          alt="Ronaldo Hero Visual"
          aria-hidden="true"
          className="hero__ronaldo-img"
        />
        <div className="hero__overlay-gradient" />
      </div>

      <div className="hero__content">
        <Logo size={110} className="hero__logo" />

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          BANKURA'S ELITE FOOTBALL GEAR SPECIALIST · EST. 2026
        </div>

        <h1 className="hero__title">
          PLAY <span className="hero__highlight">BEYOND LIMITS</span>
        </h1>

        <p className="hero__tagline">We believe in quality.</p>

        <p className="hero__subtitle">
          Premium football gear from Nike, Adidas, Puma and more. Expert
          guidance from real footballers. Real opinions.
        </p>

        <div className="hero__notices">
          <div className="hero__notice">
            <Truck size={14} aria-hidden="true" />
            <span>₹200 advance for online orders</span>
          </div>
          <div className="hero__notice hero__notice--accent">
            <ShoppingBag size={14} aria-hidden="true" />
            <span>Visit store for exclusive discounts</span>
          </div>
        </div>

        <div className="hero__actions">
          <button className="hero__cta hero__cta--primary" onClick={onShop}>
            <ShoppingBag size={18} aria-hidden="true" />
            EXPLORE GEAR
          </button>
          <button className="hero__cta hero__cta--secondary" onClick={scrollToAbout}>
            OUR STORY
          </button>
        </div>

        <div className="hero__stats" role="list">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className="hero__stat"
              role="listitem"
              style={{ animationDelay: `${0.6 + i * 0.12}s` }}
            >
              <Icon size={20} className="hero__stat-icon" aria-hidden="true" />
              <div className="hero__stat-value">{value}</div>
              <div className="hero__stat-label">{label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <button
          className="hero__scroll-hint"
          onClick={onShop}
          aria-label="Browse collection"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
}
