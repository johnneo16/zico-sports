import { Shield, Truck, RotateCcw, Headphones, Award, BadgeCheck } from 'lucide-react';
import CountUp from './CountUp';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: Award,
    title: 'Premium Quality Only',
    desc: 'Every boot in our store is 100% authentic. We source directly from authorized distributors — no replicas, no compromises.',
    highlight: true,
  },
  {
    icon: BadgeCheck,
    title: 'Tested by Real Players',
    desc: 'Our team of ex-footballers tests every boot on real pitches before we stock it. We recommend what we actually play in.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    desc: 'Free delivery on orders above ₹1,500. We ship across India with careful packaging to protect every stud.',
  },
  {
    icon: RotateCcw,
    title: 'Fast Pan-India Dispatch',
    desc: 'Orders dispatched within 24 hours. Tracked shipping across all of India — your boots arrive game-ready and on time.',
  },
  {
    icon: Headphones,
    title: 'WhatsApp-First Support',
    desc: 'Chat directly with our team on WhatsApp. Get real-time sizing advice, stock updates, and order help — instantly.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    desc: 'Simple ordering via WhatsApp or in-store. Just ₹200 advance for online orders. Pay the rest on delivery.',
  },
];

/**
 * "Why Choose Us" section showcasing brand differentiators.
 */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="why-section">
      <div className="why-section__container">
        <div className="why-section__header">
          <div className="section-label">WHY ZICO SPORTS</div>
          <h2 className="section-title">
            Why Players <em>Choose Us</em>
          </h2>
          <p className="why-section__subtitle">
            We're not just another sports store. We're footballers who understand
            what you need on the pitch.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map(({ icon: Icon, title, desc, highlight }) => (
            <div
              key={title}
              className={`why-card ${highlight ? 'why-card--highlight' : ''}`}
            >
              <div className="why-card__icon-wrapper">
                <Icon size={24} className="why-card__icon" />
              </div>
              <h3 className="why-card__title">{title}</h3>
              <p className="why-card__desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="why-section__trust">
          <div className="why-section__trust-item">
            <span className="why-section__trust-number"><CountUp end={500} suffix="+" /></span>
            <span className="why-section__trust-text">Satisfied Customers</span>
          </div>
          <div className="why-section__trust-divider" />
          <div className="why-section__trust-item">
            <span className="why-section__trust-number"><CountUp end={4.8} decimals={1} suffix="★" /></span>
            <span className="why-section__trust-text">Average Rating</span>
          </div>
          <div className="why-section__trust-divider" />
          <div className="why-section__trust-item">
            <span className="why-section__trust-number"><CountUp end={2026} duration={1500} /></span>
            <span className="why-section__trust-text">Serving Since</span>
          </div>

        </div>
      </div>
    </section>
  );
}
