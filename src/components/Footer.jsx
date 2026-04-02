import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Send } from 'lucide-react';
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
              <div className="footer__column-heading">{heading}</div>
              {links.map((link) => (
                <div key={link} className="footer__link">
                  {link}
                </div>
              ))}
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="footer__column footer__column--newsletter">
            <div className="footer__column-heading">JOIN THE SQUAD</div>
            <p className="footer__newsletter-text">
              Subscribe to get exclusive early access to new boot drops and Bankura-only discounts.
            </p>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="footer__newsletter-input" required />
              <button type="submit" className="footer__newsletter-btn">
                <Send size={14} />
              </button>
            </form>
            <div className="footer__socials">
              <Instagram size={18} className="footer__social-icon" />
              <Facebook size={18} className="footer__social-icon" />
              <Youtube size={18} className="footer__social-icon" />
            </div>
          </div>
        </div>

        <div className="footer__payments">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="footer__payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_%28GPay%29_Logo.svg" alt="GPay" className="footer__payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/PhonePe_Logo.svg" alt="PhonePe" className="footer__payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="footer__payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="footer__payment-icon" />
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
