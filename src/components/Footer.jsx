import { MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const footerLinks = [
  {
    heading: 'Shop',
    links: ['All Boots', 'Nike Boots', 'Adidas Boots', 'Puma Boots', 'New Balance', 'Mizuno', 'Clearance Sale'],
  },
  {
    heading: 'Info',
    links: ['About Us', 'Size Guide', 'Surface Guide', 'Shipping Policy', 'Return Policy', 'FAQ'],
  },
  {
    heading: 'Connect',
    links: ['WhatsApp Us', 'Instagram', 'Facebook', 'YouTube', 'Email Us', 'Blog'],
  },
];

/**
 * Site footer with links, brand info, contact, and legal.
 */
export default function Footer({ onAdminAccess }) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__brand-header">
              <Logo size={44} />
              <div>
                <div className="footer__brand-name">ZICO SPORTS</div>
                <div className="footer__brand-sub">FOOTBALL SPIKES</div>
              </div>
            </div>
            <p className="footer__brand-tagline">We believe in quality.</p>
            <p className="footer__brand-desc">
              Bankura's most trusted football boot specialist. Every stud. Every
              brand. Every surface.
            </p>
            <div className="footer__contact-mini">
              <div className="footer__contact-item">
                <MapPin size={12} />
                <span>Doltala, Satighat, Bankura, 722101</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={12} />
                <span>+91 7987461287</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={12} />
                <span>hello@zicosports.in</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="footer__column">
              <div className="footer__column-heading">
                {heading.toUpperCase()}
              </div>
              {links.map((link) => (
                <div key={link} className="footer__link">
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            © 2026 ZICO SPORTS. ALL RIGHTS RESERVED.
          </div>
          <div className="footer__legal">
            BANKURA, WEST BENGAL · INDIA
            <br />
            <button 
              onClick={onAdminAccess}
              style={{ background: 'none', border: 'none', color: 'var(--text-ghost)', fontSize: '10px', marginTop: '8px', cursor: 'pointer' }}
            >
              ADMIN LOGIN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
