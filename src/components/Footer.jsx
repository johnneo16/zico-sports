import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const footerLinks = [
  {
    heading: 'Shop',
    links: ['All Boots', 'Nike Boots', 'Adidas Boots', 'Puma Boots', 'New Balance', 'Mizuno', 'Clearance Sale'],
  },
  {
    heading: 'Info',
    links: ['About Us', 'Size Guide', 'Surface Guide', 'Shipping Policy', 'No Return Policy', 'FAQ'],
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://wa.me/917987461287" target="_blank" rel="noopener noreferrer" className="footer__social-icon">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__payments">
          <div className="footer__payment-group">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzAuNTQgNDYuMTE4Ij48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMzIuNTE0IDE0LjEzN2gyLjc3bC0yLjU3NCAxMC43NTFjLS4zODIgMS41OTUtLjMxIDIuNzk2LjIxOCAzLjU5Ny41MjYuODAyIDEuNTA1IDEuMjAzIDIuOTM2IDEuMjAzIDEuNDIyIDAgMi41ODguNDAxIDMuNDk5IDEuMjAzLjkxMi44MDEgMS41NTkgMi4wMDIgMS45NDEgMy41OTdMNDMuODc3IDE0LjEzN2gyLjgwNkw0NC4wNDYgMjUuMTU0Yy0uNTczIDIuMzk0LTEuNTk0IDQuMTg2LTMuMDU2IDUuMzc0LTEuNDYzIDEuMTktMy4zODEgMS43ODQtNS43NTQgMS43ODQtMi4zNzUgMC00LjAwNC0uNTkzLTQuODkxLTEuNzc4LS44ODgtMS4xODQtMS4wNDMtMi45NzgtLjQ2OC01LjM4ek00Ni4zMTEgMzEuOTEzbDQuNDA2LTE4LjQwNSA4LjM3MiAxMC44MjNjLjIyNC4zMDUuNDUuNjMyLjY3My45NzlzLjQ1MS43Ny42ODUgMS4yMDZsMi45MzktMTIuMjc0aDIuNTkzTDU0LjIwMiA0Ny41OTdsLTguNTQ4LTExLjAxNmMtLjIyOS0uMjk3LS40NDItLjYxMS0uNjQxLS45NDJzLS4zODItLjY3OC0uNTQ4LTEuMDQxbC0yLjk0NyAxMi4zMTF6TTY1Ljc0OSAzMS45MTNsNC4yMzgtMTcuNzA0aDIuODA0bC00LjIzNyAxNy43MDR6TTcyLjU4NiAzMS45MTNsNC4yMzgtMTcuNzA0aDkuNjNMODUuODIxIDE2LjY1NGgtNi44MjVsLTEuMDU3IDQuNDE0aDYuODI1bC0wLjYwNCAyLjUyN2gtNi44MjZsLTEuOTkxIDguMzIxeE04NS4zMDUgMzEuOTEzbDQuMjM4LTE3LjcwNGgyLjgwNGwtNC4yMzcgMTcuNzA0ek05Mi4xNDIgMzEuOTEzbDQuMjM4LTE3LjcwNGg5LjYzTDk5LjM3OCAxNi42NTRoLTYuODI1bC0xLjA2MyA0LjQzOGg2LjgyNWwtLjYwNCAyLjUyOGgtNi44MjZsLTEuMzcgNS43Mmg2LjgyNWwtLjYwNCAyLjUyOHpNMTA1LjA0OSAzMS45MTNoMi4zNThjMS4yOTYgMCAyLjI5LS4wODkgMi45ODEtLjI2NnMxLjMyNS0uNDc2IDEuOTA2LS44OTVjLjc4OS0uNTcxIDEuNDQ4LTEuMjgzIDEuOTc4LTIuMTM0LjUyOS0uODUgLjkzLTEuODQxIDEuMi0yLjk3LjI2OS0xLjEyOS4zNDMtMi4xMTcuMjIxLTIuOTY2LS4xMjMtLjg1Mi0uNDQxLTEuNTYzLS45NTYtMi4xMzZhMy40MzIgMy40MzIgMCAwIDAtMS41MzYtLjg5NmMtLjYzOS0uMTc2LTEuNjc5LS4yNjUtMy4xMjUtLjI2NUgxMDguOTZsLTEuMDE0IDEuNzQxeiIvPjxwYXRoIGQ9Ik0xMi42NzUgMTQuMTM3SDIyLjcyYzUuODkgMCA5LjYzLS4xODcgMTEuMjEtLjU1OXMuMDUuNjg2LS4zMjMuOTQxYy0uMzU0LjI0MS0uNjkzLjQyMy0xLjE0LjYyOC0uMzkzLjE4LTEuMjk5LjYzNC0yLjcxOSAxLjM2My01LjY2NiAyLjkAxLTYuNjY4IDYuNzU3LTkuOTY3IDIwLjA4OGExMC4wNzQgMTAuMDc0IDAgMCAxIC4yOTggNC43NjdjLjcyNCAxLjA2MyAyLjA3MiAxLjU5NCA0LjA0MyAxLjU5NGg3LjQybC00LjI0LTE0LjUxNmMtLjA1LS4xOTYtLjEtLjQwNy0uMTUyLS42MzNzLS4wODgtLjQxMy0uMTExLS41NjJjLS4wMi0uMTUyLS4xNjMtLjM3MS0uNDI3LS42Ni0uMjY0LS4yODktLjU2LS41NjctLjg5LS44MzVoLTMuMTc0ek01MS4zNyAxNC4xMzdjLS4xNi0uNjY1LS40OTMtMS4xNTUtLjk5OS0xLjQ3MnMtMS4yMTgtLjQ3NC0yLjEzOC0uNDc0aC03LjQybDcuMTU4IDI5LjI4MmMzLjEyNCAwIDUuNDQxIDEuMTQ0IDYuOTUzIDMuNDMyIDEuNTEyIDIuMjg4IDEuNzQ4IDUuNTQ1LjcxIDkuNzcxIDIuMDA4IDEuNDg4LTEuNTEzIDUuNzYxLTEwLjU3NSAxMi44MjcgNy41OC0xLjYwOSAxNC42MTEtNS4yMDcgMjEuMDkyLTEwLjc5NiAzLjAwMS0yLjU4OSA1LjIwNy01LjU1IDYuNjE3LTguODgzIDEuNDExLTMuMzMyIDEuOTctNi44NjcgMS42NzktMTAuNjA0TDQ4Ljk0MyAyNC41YzEuNTQ5LTUuODcgLTEuMjc0IDAtMy4yNjYtMTIuNjg1eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=" alt="UPI" className="footer__payment-icon" />
            <img src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMDAgMTY1LjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTI0NC4zIDExMS40IDEuMSAwIDAgMi42IDEuMyAwYzAuNCAwIDEgMC40IDEgMS4xIDAgMC40LTAuMSAxLjUgMC4xIDEuNWwxLjIgMGMtMC4yIDAtMC4zIDEuMS0wLjQgMS44LTAuMSAxLTAuOCAxLjItMSAxLjMgMC4yIDAgMS4yIDAuNSAxLjIgMS41IDAgMS0wLjggMS45LTEuOSAxLjlsMCAwLTIuOCAwIDAtNi41em0xLjEgNS41IDEuMyAwYzAuNiAwIDEtMC41IDEtMSAwLTAuNC0wLjMtMS0xLTFsMCAwLTEuMyAwIDAgMnoiLz48cGF0aCBkPSJtMTczLjUgNTcuNmMtMy41IDExLjItOC42IDM2LjQgMTMuNSA1MiAxNS45IDExLjEgNjQuMSAyNC4zIDg5LjkgMzMuOGwxOC42IDI1LjFjLTEyMi00NC40LTE0NS01My43LTE2Ni02MC4xLTQ2LjctMTQuMy03NC42LTIyLjgtMTEwLTIzLjUtMjUuOS0wLjUtMjYuMiAxMS43LTEgMzMuNi0yOC4zLTEwLjktNjcuOS0yMy45LTExMy0zNC4xIDQwLjUtMS4xIDcxLjMtOS4zIDg5LjgtMjAuMSAyNi4zLTE1LjMgMzIuNy0zMS40IDM1LjctNDJsMzkuMSAwem0tNDguOCA0Ni41YzEyLjYtMC40IDIyLjMgMC41IDM5LjkgNC4zLTguMy02LjItMTUuNi0xNy40LTE2LjQtMjYuMS00LjMgNi41LTE0LjUgMTYuNy0yMy40IDIxLjciLz48cGF0aCBkPSJtMTgyLjYgMTA4LjhjLTQuMiAwLTcuNiAzLjQtNy42IDcuNmwwIDMwLjUgMTQuNSAwIDAtMjYuN2MwLTIuMSAxLjctMy44IDMuOC0zLjhsNC42IDBjMi4xIDAgMy43IDEuNyAzLjcgMy44bDAgMjYuNyAzMy44IDBjNC4yIDAgNy42LTMuNCA3LjYtNy42bDAtMzAuNS0xNC41IDAgMCAyNi43YzAgMi4xLTEuNyAzLjgtMy44IDMuOGwtOC41IDAgMC0yMi44YzAtMy40LTMuMy02LjgtNy41LTYuOGwtMjYuMiAweiIvPjwvZz48L3N2Zz4=" alt="Mizuno" className="footer__payment-icon" />
            <div className="footer__payment-icon gpay-svg">
              <svg viewBox="0 0 80 38.1" xmlns="http://www.w3.org/2000/svg">
                <path style={{fill:'#fff'}} d="M37.8,19.7V29h-3V6h7.8c1.9,0,3.7,0.7,5.1,2c1.4,1.2,2.1,3,2.1,4.9c0,1.9-0.7,3.6-2.1,4.9c-1.4,1.3-3.1,2-5.1,2L37.8,19.7z M37.8,8.8v8h5c1.1,0,2.2-0.4,2.9-1.2c1.6-1.5,1.6-4,0.1-5.5c-0.8-0.8-1.8-1.3-2.9-1.2L37.8,8.8z"/>
                <path style={{fill:'#fff'}} d="M56.7,12.8c2.2,0,3.9,0.6,5.2,1.8s1.9,2.8,1.9,4.8V29H61v-2.2h-0.1c-1.2,1.8-2.9,2.7-4.9,2.7c-1.7,0-3.2-0.5-4.4-1.5c-1.1-1-1.8-2.4-1.8-3.9c0-1.6,0.6-2.9,1.8-3.9c1.2-1,2.9-1.4,4.9-1.4c1.8,0,3.2,0.3,4.3,1v-0.7c0-1-0.4-2-1.2-2.6c-0.8-0.7-1.8-1.1-2.9-1.1c-1.7,0-3,0.7-3.9,2.1l-2.6-1.6C51.8,13.8,53.9,12.8,56.7,12.8z M52.9,24.2c0,0.8,0.4,1.5,1,1.9c0.7,0.5,1.5,0.8,2.3,0.8c1.2,0,2.4-0.5,3.3-1.4c1-0.9,1.5-2,1.5-3.2c-0.9-0.7-2.2-1.1-3.9-1.1c-1.2,0-2.2,0.3-3,0.9C53.3,22.6,52.9,23.3,52.9,24.2z"/>
                <path style={{fill:'#fff'}} d="M80,13.3l-9.9,22.7h-3l3.7-7.9l-6.5-14.7h3.2l4.7,11.3h0.1l4.6-11.3H80z"/>
                <path style={{fill:'#4285F4'}} d="M25.9,17.7c0-0.9-0.1-1.8-0.2-2.7H13.2v5.1h7.1c-0.3,1.6-1.2,3.1-2.6,4v3.3H22C24.5,25.1,25.9,21.7,25.9,17.7z"/>
                <path style={{fill:'#34A853'}} d="M13.2,30.6c3.6,0,6.6-1.2,8.8-3.2l-4.3-3.3c-1.2,0.8-2.7,1.3-4.5,1.3c-3.4,0-6.4-2.3-7.4-5.5H1.4v3.4C3.7,27.8,8.2,30.6,13.2,30.6z"/>
                <path style={{fill:'#FBBC04'}} d="M5.8,19.9c-0.6-1.6-0.6-3.4,0-5.1v-3.4H1.4c-1.9,3.7-1.9,8.1,0,11.9L5.8,19.9z"/>
                <path style={{fill:'#EA4335'}} d="M13.2,9.4c1.9,0,3.7,0.7,5.1,2l3.8-3.8c-2.4-2.2-5.6-3.5-8.8-3.4c-5,0-9.6,2.8-11.8,7.3l4.4,3.4C6.8,11.7,9.8,9.4,13.2,9.4z"/>
              </svg>
            </div>
          </div>
          <div className="footer__payment-group">
            <i className="fa-brands fa-cc-visa footer__payment-fa"></i>
            <i className="fa-brands fa-cc-mastercard footer__payment-fa"></i>
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
