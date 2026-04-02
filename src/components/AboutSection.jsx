import { Trophy, Truck, RotateCcw, Phone } from 'lucide-react';
import './AboutSection.css';

const features = [
  {
    icon: Trophy,
    title: 'Expert Curation',
    desc: 'Every boot tested by real players, not just influencers.',
  },
  {
    icon: Truck,
    title: 'Fast Pan-India Delivery',
    desc: 'Free delivery above ₹1500. 2–5 day dispatch.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Easy Returns',
    desc: "Didn't fit? No problem. Full return, no questions.",
  },
  {
    icon: Phone,
    title: 'Boot Fitting Help',
    desc: "Call us at 7987461287 — we'll help you choose the right boot for your game.",
  },
];

const stats = [
  { value: '2018', label: 'Founded' },
  { value: '500+', label: 'Customers' },
  { value: '8', label: 'Brands' },
];

/**
 * About section with story narrative and feature highlights.
 */
export default function AboutSection() {
  return (
    <section id="about-sec" className="about-section">
      <div className="about-section__container">
        <div className="about-section__story">
          <div className="section-label">OUR STORY</div>
          <h2 className="section-title about-section__title">
            Born on the
            <br />
            <em>
              Field. Built
            </em>
            <br />
            for Champions.
          </h2>
          <p className="about-section__text">
            Zico Sports was founded in 2018 by ex-footballers who were tired of
            settling for overpriced boots with no real expertise behind the
            recommendation. We are Bankura's only dedicated football spikes
            specialist.
          </p>
          <p className="about-section__text">
            Every boot in our store has been worn, tested, and approved on real
            grass, artificial turf, and every surface in between. We give real
            advice — because we've played in the same boots.
          </p>
          <p className="about-section__tagline">We believe in quality.</p>
          <div className="about-section__stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="about-section__stat">
                <div className="about-section__stat-value">{value}</div>
                <div className="about-section__stat-label">
                  {label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section__features">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="about-feature">
              <div className="about-feature__icon">
                <Icon size={18} />
              </div>
              <div>
                <div className="about-feature__title">{title}</div>
                <div className="about-feature__desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
