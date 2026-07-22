// Copy this file to js/config.js (gitignored) once you have a key to wire up.
// main.js checks window.BREW_IT_CONFIG at startup and no-ops safely if it's absent.
//
// This is a static site with no build step, so the browser can only read
// keys placed here — values sitting in .env are not picked up automatically.
window.BREW_IT_CONFIG = {
  // API_KEY: "",
};
