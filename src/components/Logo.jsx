import zicoLogo from '../assets/zico-logo.png';
import './Logo.css';

/**
 * Zico Sports logo component using actual brand logo.
 * @param {{ size?: number, className?: string }} props
 */
export default function Logo({ size = 48, className = '' }) {
  return (
    <img
      src={zicoLogo}
      alt="Zico Sports"
      className={`zico-logo ${className}`}
      style={{ height: size, width: size }}
    />
  );
}
