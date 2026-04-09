import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref's subtree.
 * Any child with class `.reveal` gets `.is-visible` added when it
 * enters the viewport, triggering CSS transitions from index.css.
 */
export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('.reveal'));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // rAF ensures the browser has painted the element at opacity:0
            // before the transition starts (avoids flash of invisible content)
            requestAnimationFrame(() => {
              entry.target.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
