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
    logo: 'https://share.google/XEGvu7m551icy9Sg1',
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
