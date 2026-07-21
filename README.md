# SNAP Coffee Shop — Website

A simple, warm, single-page site for SNAP Coffee Shop (Hay Nasr / Ennasr, Tunis).
Built with plain HTML + CSS + JS — no build step, deploys straight to GitHub Pages.

## Open it
Just double-click `index.html`, or run a local preview:
    python -m http.server 8000
then visit http://localhost:8000

## Interactions
- Sticky header that refines on scroll + mobile hamburger menu
- Scroll-reveal fade-ins (IntersectionObserver)
- Animated count-up on the Google rating
- Menu tabs that filter All / Coffee / Food
- Click-to-zoom photo lightbox (arrow keys + Esc)
- Hero parallax + back-to-top button

## What's on the page
- Hero with the café name and tagline
- Google rating block (4.3 ★, 26 reviews)
- Menu (coffee + food, prices in TND)
- Photo gallery
- Visit / contact section with WhatsApp button

## Customize
- MENU: edit the `.menu-item` rows in `index.html` (keep `data-cat="coffee"` or `food`).
- RATING: edit the `.rating` block (score, review count, stars).
- PHONE / HOURS / LOCATION: edit the `#visit` section and the WhatsApp link.
- PHOTOS: drop real `.jpg`/`.png` files into `images/` and change the `src` in `index.html`.
  Current images are SVG placeholders.

## Deploy (GitHub Pages)
1. Create a repo, then: `git remote add origin <url>` and `git push -u origin main`
2. In repo Settings → Pages → Source: "Deploy from a branch" → branch `main`, folder `/ (root)`
3. Live URL: https://<user>.github.io/<repo>/
The `.nojekyll` file ensures GitHub doesn't strip any assets.
