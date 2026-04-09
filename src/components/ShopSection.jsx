import { useState } from 'react';
import { Ruler, Search } from 'lucide-react';
import ProductCard from './ProductCard';
import SizeGuideModal from './SizeGuideModal';
import { BRANDS, SURFACES, CATEGORIES } from '../constants';
import './ShopSection.css';

export default function ShopSection({ products, onSelect, onAddCart }) {
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('Boots');
  const [surface, setSurface] = useState('All Surfaces');
  const [sort, setSort] = useState('popular');
  const [search, setSearch] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const clearFilters = () => {
    setBrand('All');
    setSurface('All Surfaces');
    setSearch('');
  };

  let filtered = products.filter((p) => {
    // 1. Category Filter
    if (p.category !== category) return false;

    // 2. Brand Filter
    if (brand !== 'All' && p.brand !== brand) return false;

    // 3. Surface Filter (Boots only)
    if (category === 'Boots' && surface !== 'All Surfaces' && !p.surface.includes(surface)) return false;

    // 4. Search Filter
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    return true;
  });

  if (sort === 'price-asc')
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc')
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'popular')
    filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === 'rating')
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const hasFilters = brand !== 'All' || surface !== 'All Surfaces' || search;

  return (
    <section id="shop-sec" className="shop-section">
      <div className="shop-section__bg">
        <img src="/football_texture_bw.png" alt="" aria-hidden="true" className="shop-section__texture" />
        <div className="shop-section__overlay" />
      </div>

      <div className="shop-section__container">
        <div className="shop-section__header">
          <div className="section-label">THE COLLECTION</div>
          <h2 className="section-title">
            Football <em>{category}</em>
          </h2>
        </div>

        {/* ── Category Switcher ── */}
        <div className="shop-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`shop-categories__btn ${category === cat ? 'shop-categories__btn--active' : ''}`}
              onClick={() => {
                setCategory(cat);
                setBrand('All');
                setSurface('All Surfaces');
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── Compact Filter Bar ── */}
        <div className="shop-filters">
          {/* Row 1: Search + Sort + Size Guide */}
          <div className="shop-filters__top">
            <div className="shop-filters__search-wrap">
              <Search size={15} className="shop-filters__search-icon" aria-hidden="true" />
              <input
                className="shop-filters__search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search gear..."
                aria-label="Search gear"
              />
            </div>

            <div className="shop-filters__actions">
              <select
                className="shop-filters__sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="popular">Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>

              <button
                className="shop-filters__size-guide-btn"
                onClick={() => setSizeGuideOpen(true)}
                aria-label="View Size Guide"
              >
                <Ruler size={13} aria-hidden="true" />
                <span>SIZE GUIDE</span>
              </button>
            </div>
          </div>

          {/* Row 2: Brand pills + divider + Surface pills — all scrollable */}
          <div className="shop-filters__pills-row" role="group" aria-label="Filter by brand and surface">
            {BRANDS.map((b) => (
              <button
                key={b}
                className={`shop-filters__pill ${brand === b ? 'shop-filters__pill--active' : ''}`}
                onClick={() => setBrand(b)}
                aria-pressed={brand === b}
              >
                {b}
              </button>
            ))}

            {brand !== 'All' && (
              <div className="shop-filters__pill-sep" aria-hidden="true" />
            )}

            {category === 'Boots' && SURFACES.map((s) => (
              <button
                key={s}
                className={`shop-filters__pill shop-filters__pill--surface ${surface === s ? 'shop-filters__pill--active' : ''}`}
                onClick={() => setSurface(s)}
                aria-pressed={surface === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Count + clear */}
        <div className="shop-section__count">
          <span>{filtered.length} {category.toUpperCase()} FOUND</span>
          {hasFilters && (
            <button className="shop-section__clear-btn" onClick={clearFilters}>
              CLEAR ALL
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="shop-grid">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelect}
                onAddCart={onAddCart}
              />
            ))
          ) : (
            <div className="shop-grid__empty">
              <div className="shop-grid__empty-icon">👟</div>
              <h3 className="shop-grid__empty-title">No {category} Found</h3>
              <p className="shop-grid__empty-text">
                Try adjusting your filters or search terms.
              </p>
              <button className="shop-grid__empty-btn" onClick={clearFilters}>
                VIEW ALL COLLECTION
              </button>
            </div>
          )}
        </div>
      </div>

      {sizeGuideOpen && (
        <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />
      )}
    </section>
  );
}
