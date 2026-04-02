import Logo from './Logo';
import './Footer.css';

const footerLinks = [
  {
    heading: 'Shop',
    links: [
      'All Boots',
      'Nike Boots',
      'Adidas Boots',
      'Puma Boots',
      'New Balance',
      'Mizuno',
      'Clearance Sale',
    ],
  },
  {
    heading: 'Info',
    links: [
      'About Us',
      'Size Guide',
      'Surface Guide',
      'Shipping Policy',
      'Return Policy',
      'FAQ',
    ],
  },
  {
    heading: 'Connect',
    links: [
      'WhatsApp Us',
      'Instagram',
      'Facebook',
      'YouTube',
      'Email Us',
      'Blog',
    ],
  },
];

/**
 * Site footer with links, brand, and legal info.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__brand-header">
              <Logo size={38} />
              <div>
                <div className="footer__brand-name">ZICO SPORTS</div>
                <div className="footer__brand-sub">FOOTBALL SPIKES</div>
              </div>
            </div>
            <p className="footer__brand-desc">
              Bankura's most trusted football boot specialist. Every stud. Every
              brand. Every surface.
            </p>
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
            © 2025 ZICO SPORTS. ALL RIGHTS RESERVED.
          </div>
          <div className="footer__legal">
            BANKURA, WEST BENGAL · INDIA · GST: 19XXXXX1234Z1
          </div>
        </div>
      </div>
    </footer>
  );
}
