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
    logo: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMDAgMTY1LjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTI0NC4zIDExMS40IDEuMSAwIDAgMi42IDEuMyAwYzAuNCAwIDEgMC40IDEgMS4xIDAgMC40LTAuMSAxLjUgMC4xIDEuNWwxLjIgMGMtMC4yIDAtMC4zIDEuMS0wLjQgMS44LTAuMSAxLTAuOCAxLjItMSAxLjMgMC4yIDAgMS4yIDAuNSAxLjIgMS41IDAgMS0wLjggMS45LTEuOSAxLjlsMCAwLTIuOCAwIDAtNi41em0xLjEgNS41IDEuMyAwYzAuNiAwIDEtMC41IDEtMSAwLTAuNC0wLjMtMS0xLTFsMCAwLTEuMyAwIDAgMnoiLz48cGF0aCBkPSJtMTczLjUgNTcuNmMtMy41IDExLjItOC42IDM2LjQgMTMuNSA1MiAxNS45IDExLjEgNjQuMSAyNC4zIDg5LjkgMzMuOGwxOC42IDI1LjFjLTEyMi00NC40LTE0NS01My43LTE2Ni02MC4xLTQ2LjctMTQuMy03NC42LTIyLjgtMTEwLTIzLjUtMjUuOS0wLjUtMjYuMiAxMS43LTEgMzMuNi0yOC4zLTEwLjktNjcuOS0yMy45LTExMy0zNC4xIDQwLjUtMS4xIDcxLjMtOS4zIDg5LjgtMjAuMSAyNi4zLTE1LjMgMzIuNy0zMS40IDM1LjctNDJsMzkuMSAwem0tNDguOCA0Ni41YzEyLjYtMC40IDIyLjMgMC41IDM5LjkgNC4zLTguMy02LjItMTUuNi0xNy40LTE2LjQtMjYuMS00LjMgNi41LTE0LjUgMTYuNy0yMy40IDIxLjciLz48cGF0aCBkPSJtMTgyLjYgMTA4LjhjLTQuMiAwLTcuNiAzLjQtNy42IDcuNmwwIDMwLjUgMTQuNSAwIDAtMjYuN2MwLTIuMSAxLjctMy44IDMuOC0zLjhsNC42IDBjMi4xIDAgMy43IDEuNyAzLjcgMy44bDAgMjYuNyAzMy44IDBjNC4yIDAgNy42LTMuNCA3LjYtNy42bDAtMzAuNS0xNC41IDAgMCAyNi43YzAgMi4xLTEuNyAzLjgtMy44IDMuOGwtOC41IDAgMC0yMi44YzAtMy40LTMuMy02LjgtNy41LTYuOGwtMjYuMiAweiIvPjwvZz48L3N2Zz4=',
    color: '#b71c1c',
  },
  {
    name: 'Under Armour',
    desc: 'Athletic edge',
    logo: 'https://cdn.simpleicons.org/underarmour',
    color: '#1a237e',
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
                  crossOrigin="anonymous"
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
