import './SizeGuideSection.css';

const sizes = [
  ['UK 6', 'EU 39', 'US 7', '24.5 cm'],
  ['UK 7', 'EU 41', 'US 8', '25.5 cm'],
  ['UK 8', 'EU 42', 'US 9', '26.5 cm'],
  ['UK 9', 'EU 43', 'US 10', '27.5 cm'],
  ['UK 10', 'EU 44', 'US 11', '28.5 cm'],
  ['UK 11', 'EU 45', 'US 12', '29.5 cm'],
];

/**
 * Size conversion guide displayed as a table.
 */
export default function SizeGuideSection() {
  return (
    <section id="size-guide" className="size-guide">
      <div className="size-guide__container">
        <div className="size-guide__header">
          <div className="section-label">FIND YOUR FIT</div>
          <h2 className="section-title">
            Size <em>Guide</em>
          </h2>
        </div>

        <div className="size-guide__table">
          <div className="size-guide__thead">
            {['UK', 'EU', 'US', 'Foot Length'].map((h) => (
              <div key={h} className="size-guide__th">
                {h.toUpperCase()}
              </div>
            ))}
          </div>
          {sizes.map((row, i) => (
            <div
              key={i}
              className={`size-guide__tr ${
                i % 2 !== 0 ? 'size-guide__tr--alt' : ''
              }`}
            >
              {row.map((cell, j) => (
                <div key={j} className="size-guide__td">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="size-guide__tip">
          PRO TIP: Football boots typically run half a size smaller — order half
          a size up if between sizes.
        </p>
      </div>
    </section>
  );
}
