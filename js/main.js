(() => {
  'use strict';

  // --- Nav: solid background after scrolling past hero ---
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('is-open', !isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
    });
  });

  // --- Menu tabs ---
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach((p) => { p.classList.remove('is-active'); p.hidden = true; });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.classList.add('is-active');
      panel.hidden = false;
    });
  });

  // --- Contact form ---
  // No backend is wired up yet. If a future API key is dropped into
  // js/config.js, this is where it would plug in (e.g. a form
  // endpoint or booking API). Until then, this opens a pre-filled
  // email as a working fallback.
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (window.BREW_IT_CONFIG && window.BREW_IT_CONFIG.API_KEY) {
        // Placeholder for a real submission once an endpoint/key exists.
      }

      const subject = encodeURIComponent(`Message from ${name} via Brew-It website`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:hello@brew-it.co.uk?subject=${subject}&body=${body}`;

      status.textContent = 'Opening your email app to send this…';
      status.classList.add('is-success');
      form.reset();
    });
  }

  // --- Scroll reveal ---
  const revealTargets = document.querySelectorAll(
    '.story-copy, .story-media, .value-grid li, .menu-panel, .g-item, .reviews-head, .contact-card-order, .contact-card-visit, .visit-info, .visit-map'
  );
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach((el) => io.observe(el));
  }

  // --- Footer year ---
  document.getElementById('year').textContent = new Date().getFullYear();

})();
