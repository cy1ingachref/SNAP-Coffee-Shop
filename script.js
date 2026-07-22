// ===== SNAP Coffee — interactions =====
(function () {
  'use strict';
  var header = document.getElementById('header');
  var heroImg = document.querySelector('.float-cup');
  var toTop = document.querySelector('.to-top');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 40);
    if (heroImg && y < window.innerHeight) heroImg.style.transform = 'translateY(' + (y * 0.12) + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  // SAFETY: if a reveal element is never triggered (slow/old mobile, observer edge cases),
  // force everything visible shortly after load so content is never stuck hidden.
  function revealAll() { document.body.classList.add('reveal-fallback'); }
  window.addEventListener('load', function () { setTimeout(revealAll, 1500); });
  // also cover the case where 'load' already fired or never does
  setTimeout(revealAll, 3000);

  // Count-up
  function countUp(el, target, dur, decimals) {
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(tick);
  }
  var scoreEl = document.querySelector('.score');
  var numEl = document.querySelector('.review-count .num');
  var reviewsSec = document.getElementById('reviews');
  var rated = false;
  var rIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !rated) {
        rated = true;
        if (scoreEl) countUp(scoreEl, 4.3, 1200, 1);
        if (numEl) countUp(numEl, 26, 1400, 0);
        rIo.disconnect();
      }
    });
  }, { threshold: 0.4 });
  if (reviewsSec) rIo.observe(reviewsSec);

  // Menu filter
  var tabs = document.querySelectorAll('.menu-tab');
  var dishes = document.querySelectorAll('.dish');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      var cat = t.dataset.cat;
      dishes.forEach(function (d) {
        var show = cat === 'all' || d.dataset.cat === cat;
        d.style.display = show ? 'block' : 'none';
        if (show) { d.classList.remove('pop'); void d.offsetWidth; d.classList.add('pop'); }
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

  // Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
