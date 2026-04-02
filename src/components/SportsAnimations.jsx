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

        {/* Player Sequence */}
        <g className="sports-scene__player">
          {/* Silhouette shadow */}
          <ellipse cx="140" cy="650" rx="40" ry="10" fill="currentColor" opacity="0.1" className="player-shadow" />
          
          <g className="player-body" fill="currentColor" opacity="0.15">
            {/* Abstract player shape kicking */}
            <circle cx="120" cy="480" r="24" /> {/* Head */}
            <path d="M110,510 Q140,580 130,640" stroke="currentColor" strokeWidth="18" fill="none" strokeLinecap="round" /> {/* Body/Leg planted */}
            <path d="M110,510 Q70,550 50,520" stroke="currentColor" strokeWidth="14" fill="none" strokeLinecap="round" /> {/* Back Arm */}
            <path d="M110,510 Q150,540 180,510" stroke="currentColor" strokeWidth="14" fill="none" strokeLinecap="round" /> {/* Front Arm */}
            <path d="M130,580 Q190,560 210,610" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" className="kicking-leg" /> {/* Kicking Leg */}
          </g>
        </g>

        {/* Fast moving ball trajectory */}
        <g className="sports-scene__ball-group">
          {/* Motion trail */}
          <path d="M220,620 Q500,450 1440,500" stroke="currentColor" strokeWidth="4" opacity="0.05" fill="none" strokeDasharray="10 10" className="ball-trail"/>
          {/* Ball */}
          <circle cx="220" cy="620" r="14" fill="currentColor" opacity="0.3" className="animated-ball" />
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
