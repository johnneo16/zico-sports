import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const footerLinks = [
  {
    heading: 'Shop',
    links: ['All Boots', 'Nike Boots', 'Adidas Boots', 'Puma Boots', 'Mizuno Boots', 'Clearance Sale'],
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
                <div className="footer__brand-sub">PLAY BEYOND LIMITS</div>
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
                <span>zicosports.bqa@gmail.com</span>
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
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon fill="#1a1a1a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/917987461287" target="_blank" rel="noopener noreferrer" className="footer__social-icon" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__payments">
          <div className="footer__payment-group">
            {/* UPI — clean inline SVG wordmark */}
            <div className="footer__payment-icon footer__payment-upi" aria-label="UPI">
              <svg viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <text x="4" y="22" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="800" letterSpacing="-1" fill="#ffffff">UPI</text>
              </svg>
            </div>
            {/* Google Pay */}
            <div className="footer__payment-icon gpay-svg">
              <svg viewBox="0 0 80 38.1" xmlns="http://www.w3.org/2000/svg">
                <path style={{ fill: '#fff' }} d="M37.8,19.7V29h-3V6h7.8c1.9,0,3.7,0.7,5.1,2c1.4,1.2,2.1,3,2.1,4.9c0,1.9-0.7,3.6-2.1,4.9c-1.4,1.3-3.1,2-5.1,2L37.8,19.7z M37.8,8.8v8h5c1.1,0,2.2-0.4,2.9-1.2c1.6-1.5,1.6-4,0.1-5.5c-0.8-0.8-1.8-1.3-2.9-1.2L37.8,8.8z" />
                <path style={{ fill: '#fff' }} d="M56.7,12.8c2.2,0,3.9,0.6,5.2,1.8s1.9,2.8,1.9,4.8V29H61v-2.2h-0.1c-1.2,1.8-2.9,2.7-4.9,2.7c-1.7,0-3.2-0.5-4.4-1.5c-1.1-1-1.8-2.4-1.8-3.9c0-1.6,0.6-2.9,1.8-3.9c1.2-1,2.9-1.4,4.9-1.4c1.8,0,3.2,0.3,4.3,1v-0.7c0-1-0.4-2-1.2-2.6c-0.8-0.7-1.8-1.1-2.9-1.1c-1.7,0-3,0.7-3.9,2.1l-2.6-1.6C51.8,13.8,53.9,12.8,56.7,12.8z M52.9,24.2c0,0.8,0.4,1.5,1,1.9c0.7,0.5,1.5,0.8,2.3,0.8c1.2,0,2.4-0.5,3.3-1.4c1-0.9,1.5-2,1.5-3.2c-0.9-0.7-2.2-1.1-3.9-1.1c-1.2,0-2.2,0.3-3,0.9C53.3,22.6,52.9,23.3,52.9,24.2z" />
                <path style={{ fill: '#fff' }} d="M80,13.3l-9.9,22.7h-3l3.7-7.9l-6.5-14.7h3.2l4.7,11.3h0.1l4.6-11.3H80z" />
                <path style={{ fill: '#4285F4' }} d="M25.9,17.7c0-0.9-0.1-1.8-0.2-2.7H13.2v5.1h7.1c-0.3,1.6-1.2,3.1-2.6,4v3.3H22C24.5,25.1,25.9,21.7,25.9,17.7z" />
                <path style={{ fill: '#34A853' }} d="M13.2,30.6c3.6,0,6.6-1.2,8.8-3.2l-4.3-3.3c-1.2,0.8-2.7,1.3-4.5,1.3c-3.4,0-6.4-2.3-7.4-5.5H1.4v3.4C3.7,27.8,8.2,30.6,13.2,30.6z" />
                <path style={{ fill: '#FBBC04' }} d="M5.8,19.9c-0.6-1.6-0.6-3.4,0-5.1v-3.4H1.4c-1.9,3.7-1.9,8.1,0,11.9L5.8,19.9z" />
                <path style={{ fill: '#EA4335' }} d="M13.2,9.4c1.9,0,3.7,0.7,5.1,2l3.8-3.8c-2.4-2.2-5.6-3.5-8.8-3.4c-5,0-9.6,2.8-11.8,7.3l4.4,3.4C6.8,11.7,9.8,9.4,13.2,9.4z" />
              </svg>
            </div>
          </div>
          <div className="footer__payment-group">
            {/* Visa — inline SVG */}
            <div className="footer__payment-icon footer__payment-fa" aria-label="Visa">
              <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
                <text x="2" y="16" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fontStyle="italic" fill="#ffffff" letterSpacing="-1">VISA</text>
              </svg>
            </div>
            {/* Mastercard — inline SVG circles */}
            <div className="footer__payment-icon footer__payment-fa" aria-label="Mastercard">
              <svg viewBox="0 0 44 28" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="12" fill="#EB001B" opacity="0.9" />
                <circle cx="30" cy="14" r="12" fill="#F79E1B" opacity="0.9" />
                <path d="M22 5.7a12 12 0 0 1 0 16.6A12 12 0 0 1 22 5.7z" fill="#FF5F00" />
              </svg>
            </div>
          </div>
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
