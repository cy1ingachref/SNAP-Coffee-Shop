// ===== SNAP Coffee Shop — interactions =====
(function () {
  'use strict';

  // Sticky header state
  var header = document.getElementById('header');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 40);
    // Back-to-top
    toTop.classList.toggle('show', y > 450);
    // Hero parallax
    if (heroImg) heroImg.style.transform = 'translateY(' + (y * 0.18) + 'px)';
  }

  // Mobile menu
  var burger = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  // Count-up animation
  function countUp(el, target, dur, decimals) {
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(tick);
  }
  var scoreEl = document.querySelector('.score');
  var numEl = document.querySelector('.review-count .num');
  var ratingSec = document.getElementById('rating');
  var rated = false;
  var rIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !rated) {
        rated = true;
        countUp(scoreEl, 4.3, 1200, 1);
        countUp(numEl, 26, 1400, 0);
        rIo.disconnect();
      }
    });
  }, { threshold: 0.4 });
  if (ratingSec) rIo.observe(ratingSec);

  // Menu filter
  var tabs = document.querySelectorAll('.menu-tab');
  var items = document.querySelectorAll('.menu-item');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      var cat = t.dataset.cat;
      items.forEach(function (it) {
        var show = cat === 'all' || it.dataset.cat === cat;
        it.style.display = show ? 'flex' : 'none';
        if (show) { it.classList.remove('pop'); void it.offsetWidth; it.classList.add('pop'); }
      });
    });
  });

  // Lightbox
  var cards = Array.prototype.slice.call(document.querySelectorAll('.g-card'));
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('.lb-cap');
  var current = 0;
  function openLb(i) {
    current = i;
    var c = cards[i];
    lbImg.src = c.querySelector('img').src;
    lbImg.alt = c.querySelector('img').alt;
    lbCap.textContent = c.querySelector('figcaption').textContent;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function step(d) { openLb((current + d + cards.length) % cards.length); }
  cards.forEach(function (c, i) { c.addEventListener('click', function () { openLb(i); }); });
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  // Back to top
  var toTop = document.querySelector('.to-top');
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Hero parallax ref
  var heroImg = document.querySelector('.hero-img');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
