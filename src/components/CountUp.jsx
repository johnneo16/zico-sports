import { useState, useEffect, useRef } from 'react';

/**
 * Animated number counter that starts when element scrolls into view.
 */
export default function CountUp({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const startAnimation = () => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(ease * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  };

  const formattedCount = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={elementRef}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}
