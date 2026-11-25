/* LunarNotch — reveals on scroll, the lockscreen switcher, and the accordion. */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── reveal on scroll ─────────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-in');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealables, function (el) {
      observer.observe(el);
    });
  }

  /* ── lockscreen / full expanded art ───────────────────────── */
  var tabs = document.querySelectorAll('.tab');
  var frames = document.querySelectorAll('.frame');
  var note = document.getElementById('stageNote');

  var notes = {
    lock: 'What you see before you sign in. The pill keeps playing, artwork and all.',
    art: 'Full expanded art. The cover and the lyric fill the lock screen, and the clock stays readable.'
  };

  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener('click', function () {
      var state = tab.dataset.state;

      Array.prototype.forEach.call(tabs, function (other) {
        var on = other === tab;
        other.classList.toggle('is-active', on);
        other.setAttribute('aria-selected', on ? 'true' : 'false');
      });

      Array.prototype.forEach.call(frames, function (frame) {
        frame.classList.toggle('is-on', frame.dataset.frame === state);
      });

      if (note && notes[state]) note.textContent = notes[state];
    });
  });

  /* ── accordion ────────────────────────────────────────────── */
  Array.prototype.forEach.call(document.querySelectorAll('.acc-btn'), function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('li');
      if (!item) return;

      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

})();
