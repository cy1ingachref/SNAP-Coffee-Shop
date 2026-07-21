# SNAP Coffee Shop — Website

A simple, warm, single-page site for SNAP Coffee Shop (Hay Nasr / Ennasr, Tunis).
Built with plain HTML + CSS, no build step required.

## Open it
Just double-click `index.html` — it opens in your browser.
Or run a local preview server:
    python -m http.server 8000
then visit http://localhost:8000

## What's on the page
- Hero with the café name and tagline
- Google rating block (4.3 ★, 26 reviews)
- Menu (coffee + food, prices in TND)
- Photo gallery
- Visit / contact section with WhatsApp button

## Customize
- MENU: edit the lists in `index.html` under the `#menu` section.
- RATING: edit the `.rating` block (score, review count, stars).
- PHONE / HOURS / LOCATION: edit the `#visit` section and the WhatsApp link.
- PHOTOS: drop real `.jpg`/`.png` files into `images/` and change the `src="images/..."`
  in `index.html`. The current images are SVG placeholders.

## Notes
- Image generation was unavailable on the account, so food/coffee photos are
  tasteful SVG placeholders. Replace them with real photos when ready.
- Menu items and prices are indicative placeholders — confirm with the owner.
