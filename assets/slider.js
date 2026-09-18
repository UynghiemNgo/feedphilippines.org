/* Accessible fade slider. No dependencies. Replaces Weebly's gallery widget.
   Keeps the old settings that mattered: fade transition, 4s interval, captions.
   Adds what it lacked: pause control, keyboard nav, reduced-motion fallback,
   and auto-pause on hover/focus/offscreen. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    if (slides.length < 2) return;

    var delay = (parseFloat(root.dataset.speed) || 4) * 1000;
    var dots = root.querySelector('.slider-dots');
    var pauseBtn = root.querySelector('.slider-pause');
    var i = 0, timer = null, paused = false;

    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (d, k) {
          d.setAttribute('aria-selected', k === i ? 'true' : 'false');
        });
      }
    }
    function next() { show(i + 1); }
    function prev() { show(i - 1); }

    function start() {
      if (timer || paused || reduce.matches) return;
      timer = setInterval(next, delay);
    }
    function stop() { clearInterval(timer); timer = null; }

    // dots
    if (dots) {
      slides.forEach(function (_, k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Slide ' + (k + 1) + ' of ' + slides.length);
        b.addEventListener('click', function () { show(k); });
        dots.appendChild(b);
      });
    }

    root.querySelector('.slider-btn--next').addEventListener('click', next);
    root.querySelector('.slider-btn--prev').addEventListener('click', prev);

    // explicit pause/play — WCAG 2.2.2 for anything auto-moving
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        paused = !paused;
        if (paused) { stop(); } else { start(); }
        pauseBtn.textContent = paused ? 'Play' : 'Pause';
        pauseBtn.setAttribute('aria-pressed', String(paused));
      });
    }

    // arrow keys when focus is inside
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
    });

    // pause on hover and on keyboard focus
    ['mouseenter', 'focusin'].forEach(function (ev) { root.addEventListener(ev, stop); });
    ['mouseleave', 'focusout'].forEach(function (ev) { root.addEventListener(ev, start); });

    // don't burn cycles offscreen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries[0].isIntersecting ? start() : stop();
      }, { threshold: 0.25 }).observe(root);
    } else { start(); }

    reduce.addEventListener('change', function () { reduce.matches ? stop() : start(); });

    show(0);
    if (reduce.matches && pauseBtn) {
      pauseBtn.textContent = 'Play';
      pauseBtn.setAttribute('aria-pressed', 'true');
      paused = true;
    }
  });

  /* YouTube facade — poster image only until clicked, then swap in the iframe.
     Saves ~1MB+ per embed on first load and stops YouTube setting cookies
     before the visitor has asked for the video. */
  document.querySelectorAll('[data-yt]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (el.classList.contains('is-playing')) return;
      var id = el.dataset.yt;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = el.dataset.title || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      el.innerHTML = '';
      el.appendChild(f);
      el.classList.add('is-playing');
    });
  });

  // mobile nav
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var links = document.querySelector('.nav-links');
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
})();
