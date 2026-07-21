// Copy this file to js/config.js (gitignored) once you have a key to wire up.
// main.js checks window.BREW_IT_CONFIG at startup and no-ops safely if it's absent.
//
// This is a static site with no build step, so the browser can only read
// keys placed here — values sitting in .env are not picked up automatically.
window.BREW_IT_CONFIG = {
  // API_KEY: "",

  // Google Maps JavaScript API key with the "Places API" enabled.
  // Restrict it in Google Cloud Console to this site's HTTP referrer(s) —
  // that's what makes it safe to ship in client-side JS.
  // GOOGLE_PLACES_API_KEY: "",

  // Optional: skip the name/address lookup by pasting the Place ID
  // directly (Google's "Find your Place ID" tool). If omitted, main.js
  // resolves it at runtime from the business name + address below.
  // GOOGLE_PLACE_ID: "",
};
