import './SportsAnimations.css';

/**
 * Full field scene with animated kicking player. 
 * Replaces the static floating icons for an immersive background.
 */
export function HeroFieldAnimation() {
  return (
    <div className="sports-scene">
      <svg
        className="sports-scene__svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pitch Lines (Perspective) */}
        <g stroke="currentColor" strokeWidth="2" opacity="0.08" fill="none">
          {/* Horizon */}
          <line x1="0" y1="0" x2="1440" y2="0" />
          {/* Center Circle */}
          <ellipse cx="720" cy="400" rx="200" ry="80" />
          <line x1="720" y1="0" x2="720" y2="800" />
          {/* Box Lines */}
          <path d="M420,800 L200,0" />
          <path d="M1020,800 L1240,0" />
          <line x1="200" y1="0" x2="1240" y2="0" />
          {/* Pitch texture lines */}
          <path d="M-200,800 L400,0" />
          <path d="M1640,800 L1040,0" />
        </g>

      </svg>
    </div>
  );
}

/**
 * Section divider with a net/field pattern.
 */
export function FieldDivider({ className = '' }) {
  return (
    <div className={`field-divider ${className}`}>
      <svg width="100%" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        <circle cx="600" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
        <circle cx="600" cy="12" r="2" fill="currentColor" opacity="0.1" />
      </svg>
    </div>
  );
}
