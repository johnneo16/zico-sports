import { useState } from 'react';
import './ContactSection.css';

const contactInfo = [
  { icon: '📍', label: 'Address', value: '12, Stadium Road, Bankura, West Bengal – 722101' },
  { icon: '📞', label: 'Phone', value: '+91 98300 00000' },
  { icon: '📧', label: 'Email', value: 'hello@zicosports.in' },
  { icon: '🕐', label: 'Store Hours', value: 'Mon–Sat · 10:00 AM – 8:00 PM' },
  { icon: '💬', label: 'WhatsApp', value: 'Chat with our boot experts instantly' },
];

/**
 * Contact section with form and contact details.
 */
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (form.name && form.email) setSent(true);
  };

  return (
    <section id="contact-sec" className="contact-section">
      <div className="contact-section__container">
        {/* Info Column */}
        <div className="contact-section__info">
          <div className="section-label">REACH US</div>
          <h2 className="section-title">
            Get in <em>Touch</em>
          </h2>
          <p className="contact-section__intro">
            Not sure which boot to buy? Need to check stock? Want expert advice
            on boots for your playing style? We're always here.
          </p>
          <div className="contact-details">
            {contactInfo.map(({ icon, label, value }) => (
              <div key={label} className="contact-detail">
                <div className="contact-detail__icon">{icon}</div>
                <div>
                  <div className="contact-detail__label">
                    {label.toUpperCase()}
                  </div>
                  <div className="contact-detail__value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-wrapper">
          {sent ? (
            <div className="contact-form__success">
              <div className="contact-form__success-icon">✅</div>
              <h3 className="contact-form__success-title">Message Sent!</h3>
              <p className="contact-form__success-text">
                We'll reply within 24 hours.
              </p>
              <button
                className="contact-form__reset-btn"
                onClick={() => setSent(false)}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <>
              <h3 className="contact-form__heading">Send a Message</h3>
              {[
                { key: 'name', placeholder: 'Your Name', type: 'text' },
                { key: 'email', placeholder: 'Email Address', type: 'email' },
                { key: 'phone', placeholder: 'Phone / WhatsApp', type: 'tel' },
              ].map(({ key, placeholder, type }) => (
                <div key={key} className="contact-form__field">
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="contact-form__input"
                  />
                </div>
              ))}
              <div className="contact-form__field">
                <textarea
                  placeholder="Your message or boot query..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="contact-form__textarea"
                />
              </div>
              <button className="contact-form__submit-btn" onClick={handleSubmit}>
                SEND MESSAGE →
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
