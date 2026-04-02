import './BrandsSection.css';

const brandList = [
  { name: 'Nike', desc: 'Speed & innovation', abbr: 'NK', color: '#e63c2f' },
  { name: 'Adidas', desc: 'Precision control', abbr: 'AD', color: '#1565c0' },
  { name: 'Puma', desc: 'Adaptive fit', abbr: 'PU', color: '#7b1fa2' },
  { name: 'New Balance', desc: 'Cushion & speed', abbr: 'NB', color: '#e65100' },
  { name: 'Mizuno', desc: 'Japanese craftsmanship', abbr: 'MZ', color: '#b71c1c' },
  { name: 'Under Armour', desc: 'Athletic edge', abbr: 'UA', color: '#1a237e' },
  { name: 'Asics', desc: 'Gel comfort tech', abbr: 'AS', color: '#004d40' },
  { name: 'Umbro', desc: 'Heritage football', abbr: 'UM', color: '#4a148c' },
];

/**
 * Brand showcase grid section.
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
        </div>
        <div className="brands-grid">
          {brandList.map((brand) => (
            <div key={brand.name} className="brand-card">
              <div
                className="brand-card__icon"
                style={{
                  background: brand.color + '18',
                  borderColor: brand.color + '33',
                }}
              >
                <span style={{ color: brand.color }}>{brand.abbr}</span>
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
