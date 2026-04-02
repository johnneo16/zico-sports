import './BrandsSection.css';

const brandList = [
  {
    name: 'Nike',
    desc: 'Speed & innovation',
    logo: 'https://cdn.simpleicons.org/nike',
    color: '#e63c2f',
  },
  {
    name: 'Adidas',
    desc: 'Precision control',
    logo: 'https://cdn.simpleicons.org/adidas',
    color: '#1565c0',
  },
  {
    name: 'Puma',
    desc: 'Adaptive fit',
    logo: 'https://cdn.simpleicons.org/puma',
    color: '#7b1fa2',
  },
  {
    name: 'New Balance',
    desc: 'Cushion & speed',
    logo: 'https://cdn.simpleicons.org/newbalance',
    color: '#e65100',
  },
  {
    name: 'Mizuno',
    desc: 'Japanese craftsmanship',
    logo: 'https://cdn.worldvectorlogo.com/logos/mizuno-2.svg',
    color: '#b71c1c',
  },
  {
    name: 'Under Armour',
    desc: 'Athletic edge',
    logo: 'https://cdn.simpleicons.org/underarmour',
    color: '#1a237e',
  },
  {
    name: 'Asics',
    desc: 'Gel comfort tech',
    logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23004d40"><path d="M19.143 8.355c-1.332-2.193-3.666-3.842-6.524-4.577C10.743 3.298 9.214 3 7.822 3 5.488 3 3.327 3.86 1.7 5.253.593 6.2.046 7.214 0 7.846c2.47-1.123 5.613-1.636 8.528-1.503 2.766.126 5.372 1.096 7.428 2.802.73.61 1.403 1.35 1.956 2.228-2.613-2.146-5.836-3.415-9.288-3.52-5.736-.17-10.375 2.502-12.062 6.78C-.944 18.435.535 21.05 4.3 22.1c1.8.498 3.844.606 5.867.33 2.593-.356 4.98-1.428 6.945-3.056C21.758 15.545 24 10.45 24 7.41c-.424.316-.9.645-1.455.992-1.045-1.4-2.193-2.483-3.403-3.047z"/></svg>',
    color: '#004d40',
  },
  {
    name: 'Umbro',
    desc: 'Heritage football',
    logo: 'https://cdn.worldvectorlogo.com/logos/umbro-1.svg',
    color: '#4a148c',
  },
];

/**
 * Brand showcase grid with real logos.
 */
export default function BrandsSection() {
  return (
    <section id="brands-sec" className="brands-section">
      <div className="brands-section__container">
        <div className="brands-section__header">
          <div className="section-label">BRAND LINEUP</div>
          <h2 className="section-title">
            World-Class <em>Brands</em>
          </h2>
          <p className="brands-section__subtitle">
            Only authentic, official products. We partner with the best in football.
          </p>
        </div>
        <div className="brands-grid">
          {brandList.map((brand) => (
            <div key={brand.name} className="brand-card">
              <div className="brand-card__logo-wrapper">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="brand-card__logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="brand-card__fallback"
                  style={{ background: brand.color + '15', color: brand.color, display: 'none' }}
                >
                  {brand.name.split(' ').map(w => w[0]).join('')}
                </div>
              </div>
              <div className="brand-card__name">{brand.name}</div>
              <div className="brand-card__desc">{brand.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
