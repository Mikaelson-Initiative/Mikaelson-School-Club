'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    // Check if browser natively supports scroll-driven animations (e.g. Chrome 115+, Safari 19+)
    const hasNativeScrollAnimations = 
      typeof window !== 'undefined' && 
      typeof CSS !== 'undefined' && 
      CSS.supports && 
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    // If native animations are supported, we do not need the JavaScript observer fallback
    if (hasNativeScrollAnimations) {
      return;
    }

    // IntersectionObserver Fallback Strategy
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -8% 0px', // trigger slightly before entering fully
      threshold: 0.05, // trigger when 5% of the element is visible
    };

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once the reveal animation runs, we can stop observing it
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Track all reveal candidates
    const targets = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-line'
    );
    
    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render any visible UI
}
