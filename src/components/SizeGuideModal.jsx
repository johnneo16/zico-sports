import { useEffect } from 'react';
import { X, Ruler, Info } from 'lucide-react';
import './SizeGuideModal.css';

const bootSizes = [
  ['UK 7', 'EU 41', 'US 8', '25.5 cm'],
  ['UK 7.5', 'EU 41.5', 'US 8.5', '26.0 cm'],
  ['UK 8', 'EU 42', 'US 9', '26.5 cm'],
  ['UK 8.5', 'EU 42.5', 'US 9.5', '27.0 cm'],
  ['UK 9', 'EU 43', 'US 10', '27.5 cm'],
  ['UK 9.5', 'EU 44', 'US 10.5', '28.0 cm'],
  ['UK 10', 'EU 44.5', 'US 11', '28.5 cm'],
];

const jerseySizes = [
  ['S', '36 - 38', '27'],
  ['M', '38 - 40', '28'],
  ['L', '40 - 42', '29'],
  ['XL', '42 - 44', '30'],
  ['XXL', '44 - 46', '31'],
];

/**
 * Size Guide Modal - triggered from the Shop section's filter controls.
 */
export default function SizeGuideModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="sg-modal__backdrop" onClick={onClose}>
      <div
        className="sg-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Size Guide"
      >
        {/* Header */}
        <div className="sg-modal__header">
          <div className="sg-modal__title-group">
            <Ruler size={20} className="sg-modal__ruler-icon" />
            <div>
              <div className="section-label" style={{ marginBottom: 4 }}>FIND YOUR FIT</div>
              <h2 className="sg-modal__title">Size Guide</h2>
            </div>
          </div>
          <button className="sg-modal__close" onClick={onClose} aria-label="Close size guide">
            <X size={18} />
          </button>
        </div>

        <p className="sg-modal__subtitle">
          Find the perfect fit for your footwear and apparel.
        </p>

        <div className="sg-modal__layout">
          <div className="sg-modal__group">
            <h3 className="sg-modal__label">FOOTWEAR</h3>
            <div className="sg-modal__table">
              <div className="sg-modal__thead">
                {['UK', 'EU', 'US', 'Length'].map((h) => (
                  <div key={h} className="sg-modal__th">{h}</div>
                ))}
              </div>
              {bootSizes.map((row, i) => (
                <div key={i} className={`sg-modal__tr ${i % 2 !== 0 ? 'sg-modal__tr--alt' : ''}`}>
                  {row.map((cell, j) => (
                    <div key={j} className="sg-modal__td">{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="sg-modal__group">
            <h3 className="sg-modal__label">JERSEYS</h3>
            <div className="sg-modal__table">
              <div className="sg-modal__thead">
                {['SIZE', 'CHEST', 'LEN'].map((h) => (
                  <div key={h} className="sg-modal__th">{h}</div>
                ))}
              </div>
              {jerseySizes.map((row, i) => (
                <div key={i} className={`sg-modal__tr ${i % 2 !== 0 ? 'sg-modal__tr--alt' : ''}`}>
                  {row.map((cell, j) => (
                    <div key={j} className="sg-modal__td">{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Tip Banner */}
        <div className="sg-modal__banner">
          <div className="sg-modal__banner-icon">
            <Info size={20} />
          </div>
          <div className="sg-modal__banner-content">
            <h4 className="sg-modal__banner-title">PRO TIP: PERFECT FIT</h4>
            <p className="sg-modal__banner-text">
              Performance gear runs athletic. For boots, order half a size up. For jerseys, if between sizes, choose the larger for a relaxed fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
