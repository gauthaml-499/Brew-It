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

  // --- Live Google reviews ---
  // Falls back silently to the placeholder cards already in the markup
  // when no key is configured, the lookup fails, or Places returns nothing.
  const PLACE_QUERY = 'Brew-It, 40 Kingsway, Kirkby in Ashfield, Nottingham NG17 7BD';

  function initialsOf(name) {
    return (name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
  }

  function buildReviewTile(review) {
    const tile = document.createElement('blockquote');
    tile.className = 'review-tile';

    const head = document.createElement('div');
    head.className = 'review-tile-head';

    const avatar = document.createElement('span');
    avatar.className = 'review-avatar';
    avatar.textContent = initialsOf(review.author_name);

    const cite = document.createElement('cite');
    cite.textContent = review.author_name || 'Google user';

    head.append(avatar, cite);

    const stars = document.createElement('div');
    stars.className = 'review-tile-stars';
    stars.setAttribute('aria-hidden', 'true');
    stars.textContent = '★'.repeat(Math.max(1, Math.min(5, Math.round(review.rating || 5))));

    const text = document.createElement('p');
    text.textContent = review.text || '';

    tile.append(head, stars, text);
    return tile;
  }

  function renderGoogleReviews(place) {
    const reviews = (place.reviews || []).filter((r) => r.text).slice(0, 8);
    const track = document.getElementById('reviewTrack');
    if (!reviews.length || !track) return;

    track.innerHTML = '';
    for (let i = 0; i < 2; i += 1) {
      const group = document.createElement('div');
      group.className = 'review-group';
      if (i === 1) group.setAttribute('aria-hidden', 'true');
      reviews.forEach((r) => group.appendChild(buildReviewTile(r)));
      track.appendChild(group);
    }

    if (place.rating) document.getElementById('reviewsScore').textContent = place.rating.toFixed(1);
    if (place.user_ratings_total) {
      document.getElementById('reviewsCount').textContent = `${place.user_ratings_total} reviews on Google`;
    }
    if (place.url) document.getElementById('reviewsLink').href = place.url;
  }

  function loadGoogleReviews() {
    const cfg = window.BREW_IT_CONFIG;
    if (!cfg || !cfg.GOOGLE_PLACES_API_KEY) return;

    window.__brewItInitReviews = () => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));

      const fetchDetails = (placeId) => {
        service.getDetails(
          { placeId, fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'url'] },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              renderGoogleReviews(place);
            }
          }
        );
      };

      if (cfg.GOOGLE_PLACE_ID) {
        fetchDetails(cfg.GOOGLE_PLACE_ID);
      } else {
        service.findPlaceFromQuery(
          { query: PLACE_QUERY, fields: ['place_id'] },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
              fetchDetails(results[0].place_id);
            }
          }
        );
      }
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(cfg.GOOGLE_PLACES_API_KEY)}&libraries=places&callback=__brewItInitReviews`;
    script.async = true;
    document.head.appendChild(script);
  }

  loadGoogleReviews();
})();
