import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './ContactSection.css';

const contactInfo = [
  { icon: MapPin,        label: 'Address',     value: 'Doltala, Satighat, Bankura, 722101', href: null },
  { icon: Phone,         label: 'Phone',       value: '+91 7987461287',                     href: 'tel:+917987461287' },
  { icon: Mail,          label: 'Email',       value: 'zicosports.bqa@gmail.com',           href: 'mailto:zicosports.bqa@gmail.com' },
  { icon: Clock,         label: 'Store Hours', value: 'Mon–Sat · 10:00 AM – 8:00 PM',      href: null },
  { icon: MessageCircle, label: 'WhatsApp',    value: 'Chat with our equipment experts',   href: 'https://wa.me/917987461287' },
];

const EMPTY = { name: '', email: '', phone: '', message: '' };

export default function ContactSection() {
  const sectionRef              = useScrollReveal();
  const [form,   setForm]       = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [sent,   setSent]       = useState(false);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the error for this field on change
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  /** Validate required fields and basic email format */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.message.trim()) e.message = 'Please write a message';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Enter a valid email address';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();          // prevent any accidental page reload
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const msg = [
      `Hi Zico Sports,`,
      ``,
      `I am ${form.name.trim()}.`,
      ``,
      `Message: ${form.message.trim()}`,
      form.email ? `Email: ${form.email}` : '',
      form.phone ? `Phone: ${form.phone}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/917987461287?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setForm(EMPTY);
  };

  return (
    <section id="contact-sec" className="contact-section" ref={sectionRef}>
      {/* Rich background */}
      <div className="contact-section__bg" aria-hidden="true">
        <img src="/football_field_bg.png" alt="" className="contact-section__field" />
        <div className="contact-section__bg-overlay" />
      </div>

      <div className="contact-section__container">
        {/* ── Info column ── */}
        <div className="contact-section__info reveal reveal--left">
          <div className="section-label">REACH US</div>
          <h2 className="section-title">Get in <em>Touch</em></h2>
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
                    <a
                      href={href}
                      className="contact-detail__value contact-detail__link"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
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

        {/* ── Form column ── */}
        <div className="contact-form-wrapper reveal reveal--right reveal--delay-2">
          {sent ? (
            <div className="contact-form__success">
              <div className="contact-form__success-icon">
                <MessageCircle size={40} aria-hidden="true" />
              </div>
              <h3 className="contact-form__success-title">Sent via WhatsApp!</h3>
              <p className="contact-form__success-text">
                Your message has been opened in WhatsApp. We'll reply shortly.
              </p>
              <button className="contact-form__reset-btn" onClick={() => setSent(false)}>
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <h3 className="contact-form__heading">Send a Message</h3>

              {/* Name */}
              <div className={`contact-form__field ${errors.name ? 'contact-form__field--error' : ''}`}>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  autoComplete="name"
                  onChange={(e) => set('name', e.target.value)}
                  className="contact-form__input"
                  aria-label="Your name"
                  aria-required="true"
                />
                {errors.name && <span className="contact-form__error">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className={`contact-form__field ${errors.email ? 'contact-form__field--error' : ''}`}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) => set('email', e.target.value)}
                  className="contact-form__input"
                  aria-label="Email address"
                />
                {errors.email && <span className="contact-form__error">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="contact-form__field">
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  value={form.phone}
                  autoComplete="tel"
                  onChange={(e) => set('phone', e.target.value)}
                  className="contact-form__input"
                  aria-label="Phone or WhatsApp number"
                />
              </div>

              {/* Message */}
              <div className={`contact-form__field ${errors.message ? 'contact-form__field--error' : ''}`}>
                <textarea
                  placeholder="Your message or gear query... *"
                  rows={4}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className="contact-form__textarea"
                  aria-label="Message"
                  aria-required="true"
                />
                {errors.message && <span className="contact-form__error">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-form__submit-btn">
                <MessageCircle size={16} aria-hidden="true" />
                SEND VIA WHATSAPP
              </button>
              <p className="contact-form__hint">
                Opens WhatsApp with your message pre-filled.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
