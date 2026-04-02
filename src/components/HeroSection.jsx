import Logo from './Logo';
import './HeroSection.css';

/**
 * Full-screen hero landing section with CTA and stats.
 */
export default function HeroSection({ onShop }) {
  const scrollToAbout = () => {
    document.getElementById('about-sec')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '500+', label: 'Happy Players' },
    { value: '8', label: 'Top Brands' },
    { value: 'Free', label: 'Delivery ₹1500+' },
    { value: '30-Day', label: 'Easy Returns' },
  ];

  return (
    <section className="hero">
      <div className="hero__glow" />
      <div className="hero__line" />

      <div className="hero__content">
        <Logo size={120} />

        <div className="hero__badge">
          BANKURA'S FOOTBALL BOOT SPECIALIST · EST. 2018
        </div>

        <h1 className="hero__title">
          DOMINATE
          <br />
          <em>THE PITCH</em>
        </h1>

        <p className="hero__subtitle">
          Premium football spikes from Nike, Adidas, Puma and more. Expert
          guidance. Real footballers. Real opinions.
        </p>

        <div className="hero__actions">
          <button className="hero__cta hero__cta--primary" onClick={onShop}>
            SHOP BOOTS →
          </button>
          <button className="hero__cta hero__cta--secondary" onClick={scrollToAbout}>
            OUR STORY
          </button>
        </div>

        <div className="hero__stats">
          {stats.map(({ value, label }) => (
            <div key={label} className="hero__stat">
              <div className="hero__stat-value">{value}</div>
              <div className="hero__stat-label">{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
