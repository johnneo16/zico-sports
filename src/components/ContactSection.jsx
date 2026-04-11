import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './ContactSection.css';

const contactInfo = [
  { icon: MapPin,        label: 'Address',     value: 'Doltala, Satighat, Bankura, 722101', href: null },
  { icon: Phone,         label: 'Phone',       value: '+91 7987461287', href: 'tel:+917987461287' },
  { icon: Mail,          label: 'Email',       value: 'zicosports.bqa@gmail.com', href: 'mailto:zicosports.bqa@gmail.com' },
  { icon: Clock,         label: 'Store Hours', value: 'Mon–Sat · 10:00 AM – 8:00 PM', href: null },
  { icon: MessageCircle, label: 'WhatsApp',    value: 'Chat with our equipment experts', href: 'https://wa.me/917987461287' },
];

export default function ContactSection() {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (form.name && form.message) {
      const msg = `Hi Zico Sports,\n\nI am ${form.name}.\n\nMessage: ${form.message}\n\nEmail: ${form.email}\nPhone: ${form.phone}`;
      window.open(`https://wa.me/917987461287?text=${encodeURIComponent(msg)}`, '_blank');
      setSent(true);
    }
  };

  return (
    <section id="contact-sec" className="contact-section" ref={sectionRef}>
      {/* Rich background */}
      <div className="contact-section__bg" aria-hidden="true">
        <img src="/football_field_bg.png" alt="" className="contact-section__field" />
        <div className="contact-section__bg-overlay" />
      </div>

      <div className="contact-section__container">
        {/* Info Column */}
        <div className="contact-section__info reveal reveal--left">
          <div className="section-label">REACH US</div>
          <h2 className="section-title">
            Get in <em>Touch</em>
          </h2>
          <p className="contact-section__intro">
            Not sure what to buy? Need to check stock? Want expert advice
            on the best gear for your playing style? We're always here.
          </p>

          <address className="contact-details">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="contact-detail">
                <div className="contact-detail__icon" aria-hidden="true">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="contact-detail__label">{label.toUpperCase()}</div>
                  {href ? (
                    <a href={href} className="contact-detail__value contact-detail__link" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <div className="contact-detail__value">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </address>

          <div className="contact-section__order-note">
            <div className="contact-section__order-note-title">Online Orders</div>
            <p>₹200 advance required. Pay the rest on delivery.</p>
            <p className="contact-section__order-note-highlight">
              Visit our store for exclusive in-store discounts!
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-wrapper reveal reveal--right reveal--delay-2">
          {sent ? (
            <div className="contact-form__success">
              <div className="contact-form__success-icon">
                <MessageCircle size={40} aria-hidden="true" />
              </div>
              <h3 className="contact-form__success-title">Message Sent!</h3>
              <p className="contact-form__success-text">We'll reply within 24 hours.</p>
              <button className="contact-form__reset-btn" onClick={() => setSent(false)}>
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <>
              <h3 className="contact-form__heading">Send a Message</h3>
              {[
                { key: 'name',  placeholder: 'Your Name',           type: 'text',  autoComplete: 'name' },
                { key: 'email', placeholder: 'Email Address',       type: 'email', autoComplete: 'email' },
                { key: 'phone', placeholder: 'Phone / WhatsApp',    type: 'tel',   autoComplete: 'tel' },
              ].map(({ key, placeholder, type, autoComplete }) => (
                <div key={key} className="contact-form__field">
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    autoComplete={autoComplete}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="contact-form__input"
                    aria-label={placeholder}
                  />
                </div>
              ))}
              <div className="contact-form__field">
                <textarea
                  placeholder="Your message or gear query..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="contact-form__textarea"
                  aria-label="Message"
                />
              </div>
              <button className="contact-form__submit-btn" onClick={handleSubmit}>
                SEND MESSAGE
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
