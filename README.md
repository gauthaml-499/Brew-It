# Brew-It — Coffee & Bakes

Single-page site for Brew-It, 40 Kingsway, Kirkby in Ashfield, Nottingham NG17 7BD.

## Running locally

No build step — plain HTML/CSS/JS. From this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## What's placeholder right now

- **Menu items & prices** — realistic sample menu, swap for the real one in `index.html` (`#menu` section).
- **Opening hours** — sample hours in the `#visit` section.
- **Photography** — stock photos from Unsplash throughout. Drop real photos into `assets/images/brand/` and swap the `<img src>` paths whenever you're ready.
- **Reviews** — sample quotes in `#reviews`, ready to be replaced with real ones (or wired to live Google Reviews later).
- **Contact form** — currently opens a pre-filled email (`mailto:`) as a working fallback. No backend yet.
- **Social links** — Instagram/Facebook icons in the footer point to `#` until you share the real handles.

## API key / `.env`

This is a static site, so nothing reads `.env` automatically. It's there as a
holding place for whichever integration comes next (Google Maps, online
ordering, Instagram feed, etc.) — copy `.env.example` to `.env` and drop the
key in when you're ready to tell me what it's for. `js/config.example.js`
shows the front-end side of that wiring (copy to `js/config.js`, which is
gitignored).

## Structure

```
index.html
css/style.css
js/main.js
js/config.example.js   → copy to config.js when you have a key
assets/images/brand/    → real photos go here later
```
# Brew-It
