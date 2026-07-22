# SNAP Coffee Shop — Website

A simple, warm, single-page site for SNAP Coffee Shop (Hay Nasr / Ennasr, Tunis).
Built with plain HTML + CSS + JS — no build step, deploys straight to GitHub Pages.

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
## Live site
- URL: https://cy1ingachref.github.io/SNAP-Coffee-Shop/
- Scannable QR: snap-qr.png (points at the live URL)
- Hosted on GitHub Pages (main branch, root). HTTPS enforced (HSTS).

## How to change the link / settings later
- Change the GitHub URL: rename the repo in Settings → Repository name (URL auto-updates); or set a custom domain in Settings → Pages (add a CNAME file). Then regenerate the QR: `uv run --with qrcode --with pillow python -c "import qrcode; qrcode.make('NEW_URL').save('snap-qr.png')"`.
- Edit the WhatsApp number: search index.html for `wa.me/21658741510`.
- Edit the Google Maps pin: search index.html for `maps.app.goo.gl/44mZ8596GpoQqrAm7`.
- Edit menu items / prices: each `<article class="dish">` block in index.html.
- After any edit: `git add -A && git commit -m "..." && git push` (Pages rebuilds automatically, ~1 min).
- Redeploy from scratch: `bash deploy.sh cy1ingachref`.
