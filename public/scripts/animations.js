(function () {
  'use strict';

  // Respect the user's motion preference - reveal content immediately
  // instead of animating it in.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.classList.add('animate-in');
    });
    return;
  }

  // Scroll-triggered entrance animations
  // Add data-animate to any element to opt in
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });
})();
