import { Shield, Truck, RotateCcw, Headphones, Award, BadgeCheck } from 'lucide-react';
import CountUp from './CountUp';
import useScrollReveal from '../hooks/useScrollReveal';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: Award,
    title: 'Premium Quality Only',
    desc: 'Every item is 100% authentic. Sourced directly from authorized distributors — no replicas, no compromises.',
  },
  {
    icon: BadgeCheck,
    title: 'Tested by Real Players',
    desc: 'Our ex-footballer team tests every piece of gear on real pitches before we stock it. We recommend what we actually play in.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    desc: 'Free delivery on orders above ₹1,500. Careful packaging, shipped across India.',
  },
  {
    icon: RotateCcw,
    title: 'Fast Dispatch',
    desc: 'Orders dispatched within 24 hours. Fully tracked shipping — your order arrives game-ready.',
  },
  {
    icon: Headphones,
    title: 'WhatsApp-First Support',
    desc: 'Chat directly with our team. Real-time sizing advice, stock updates, and order help — instantly.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    desc: 'Simple ordering via WhatsApp or in-store. Just ₹200 advance online. Pay the rest on delivery.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useScrollReveal();

  return (
    <section id="why-us" className="why-section" ref={sectionRef}>
      <div className="why-section__bg">
        <img
          src="/mbappe_action_bw.png"
          alt=""
          aria-hidden="true"
          className="why-section__mbappe"
        />
        <div className="why-section__overlay" />
      </div>

      <div className="why-section__container">
        {/* Section header — always visible, reveal on scroll */}
        <div className="why-section__header reveal">
          <div className="section-label">WHY ZICO SPORTS</div>
          <h2 className="section-title">
            Why Players <em>Choose Us</em>
          </h2>
          <p className="why-section__subtitle">
            We're not just another sports store. We're footballers who understand
            what you need on the pitch.
          </p>
        </div>

        {/* Cards grid — stagger per column */}
        <div className="why-grid">
          {reasons.map(({ icon: Icon, title, desc }, i) => {
            const col = i % 3;
            const delayClass =
              col === 0 ? '' : col === 1 ? 'reveal--delay-1' : 'reveal--delay-2';
            return (
              <div key={title} className={`why-card reveal ${delayClass}`}>
                <div className="why-card__icon-wrapper" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <h3 className="why-card__title">{title}</h3>
                <p className="why-card__desc">{desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trust stats */}
        <div className="why-section__trust reveal reveal--delay-1">
          <div className="why-section__trust-item">
            <span className="why-section__trust-number">
              <CountUp end={500} suffix="+" />
            </span>
            <span className="why-section__trust-text">Satisfied Customers</span>
          </div>
          <div className="why-section__trust-divider" aria-hidden="true" />
          <div className="why-section__trust-item">
            <span className="why-section__trust-number">
              <CountUp end={4.8} decimals={1} suffix="★" />
            </span>
            <span className="why-section__trust-text">Average Rating</span>
          </div>
          <div className="why-section__trust-divider" aria-hidden="true" />
          <div className="why-section__trust-item">
            <span className="why-section__trust-number">
              <CountUp end={2026} duration={1500} />
            </span>
            <span className="why-section__trust-text">Serving Since</span>
          </div>
        </div>
      </div>
    </section>
  );
}
