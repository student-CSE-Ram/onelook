import React, { useState } from 'react';

const faqs = [
  { q: 'What are your shipping policies?', a: 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.' },
  { q: 'How can I track my order?', a: "Once your order ships, you'll receive a tracking number via email to monitor your package." },
  { q: 'What is your return policy?', a: 'We accept returns within 30 days of purchase. Items must be in original condition.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide. International shipping rates vary by destination.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <p className="contact-eyebrow">Get in Touch</p>
          <h1 className="contact-title">We'd love to hear from you</h1>
          <p className="contact-subtitle">Have a question, suggestion, or just want to say hello? We're here to help.</p>
        </div>

        {/* Perks */}
        <div className="contact-perks">
          {[
            { icon: '🕐', title: '24/7 Support', sub: 'Get help whenever you need it' },
            { icon: '⚡', title: 'Quick Response', sub: 'We reply within 2 hours' },
            { icon: '🔒', title: 'Secure & Private', sub: 'Your information is safe with us' },
          ].map(p => (
            <div key={p.title} className="contact-perk">
              <div className="contact-perk-icon">{p.icon}</div>
              <div className="contact-perk-title">{p.title}</div>
              <div className="contact-perk-sub">{p.sub}</div>
            </div>
          ))}
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-card">
            <div className="contact-form-title">Send us a message</div>
            <p className="contact-form-sub">Fill out the form below and we'll get back to you as soon as possible.</p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'var(--gray-600)', fontSize: 14 }}>Thanks for reaching out. We'll get back to you within 2 hours.</p>
                <button className="btn-submit" style={{ marginTop: 20, width: 'auto', padding: '10px 24px' }} onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Email</label>
                  <input className="form-input" name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea className="form-textarea" name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-submit">Send Message →</button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info-grid">
            {[
              { icon: '✉️', title: 'Email Us', lines: ['hello@onelook.com', 'support@onelook.com', 'Send us an email anytime'] },
              { icon: '📞', title: 'Call Us', lines: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri from 8am to 5pm'] },
              { icon: '📍', title: 'Visit Us', lines: ['123 Fashion Street', 'Style City, SC 12345', 'Come say hello at our office'] },
              { icon: '🕐', title: 'Working Hours', lines: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm', 'Sunday: Closed'] },
            ].map(card => (
              <div key={card.title} className="contact-info-card">
                <div className="contact-info-icon">{card.icon}</div>
                <div className="contact-info-title">{card.title}</div>
                {card.lines.map((l, i) => <div key={i} className="contact-info-line">{l}</div>)}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-sub">Find quick answers to common questions about our products and services.</p>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className={`faq-q${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className="faq-chevron">▾</span>
              </button>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div style={{ textAlign: 'center', background: 'var(--gray-50)', borderRadius: 16, padding: '48px 24px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Still have questions?</h2>
          <p style={{ color: 'var(--gray-600)', fontSize: 15, marginBottom: 24 }}>Can't find what you're looking for? Our customer support team is here to help.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+15551234567" className="btn-primary" style={{ textDecoration: 'none', borderRadius: 50, display: 'inline-flex' }}>📞 Call Us Now</a>
            <button className="btn-outline-action" style={{ borderRadius: 50 }}>💬 Live Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
