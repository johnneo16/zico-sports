import { useState } from 'react';
import ProductCard from './ProductCard';
import { BRANDS, SURFACES } from '../constants';
import './ShopSection.css';

/**
 * Main shop section with filters, search, and product grid.
 */
export default function ShopSection({ products, onSelect, onAddCart }) {
  const [brand, setBrand] = useState('All');
  const [surface, setSurface] = useState('All Surfaces');
  const [sort, setSort] = useState('popular');
  const [search, setSearch] = useState('');

  let filtered = products.filter((p) => {
    if (brand !== 'All' && p.brand !== brand) return false;
    if (surface !== 'All Surfaces' && !p.surface.includes(surface))
      return false;
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

  return (
    <section id="shop-sec" className="shop-section">
      <div className="shop-section__container">
        <div className="shop-section__header">
          <div className="section-label">THE COLLECTION</div>
          <h2 className="section-title">
            Football <em>Spikes</em>
          </h2>
        </div>

        {/* Filters Bar */}
        <div className="shop-filters">
          <input
            className="shop-filters__search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search boots..."
          />
          <div className="shop-filters__pills">
            {BRANDS.map((b) => (
              <button
                key={b}
                className={`shop-filters__pill ${
                  brand === b ? 'shop-filters__pill--active' : ''
                }`}
                onClick={() => setBrand(b)}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="shop-filters__pills">
            {SURFACES.map((s) => (
              <button
                key={s}
                className={`shop-filters__pill shop-filters__pill--surface ${
                  surface === s ? 'shop-filters__pill--surface-active' : ''
                }`}
                onClick={() => setSurface(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <select
            className="shop-filters__sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>

        <div className="shop-section__count">
          {filtered.length} BOOTS FOUND
        </div>

        {/* Product Grid */}
        <div className="shop-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelect}
              onAddCart={onAddCart}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="shop-section__empty">
            No boots found. Try a different filter.
          </div>
        )}
      </div>
    </section>
  );
}
