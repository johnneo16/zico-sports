import './Stars.css';

/**
 * Star rating display component.
 * @param {{ rating: number }} props
 */
export default function Stars({ rating }) {
  const full = Math.floor(rating);
  const empty = 5 - full;

  return (
    <span className="stars-wrapper">
      <span className="stars-filled">
        {'★'.repeat(full)}
        {'☆'.repeat(empty)}
      </span>
      <span className="stars-number">{rating}</span>
    </span>
  );
}
