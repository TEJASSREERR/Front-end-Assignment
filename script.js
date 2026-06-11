(function () {
  'use strict';

  /* ── Play button keyboard support ── */
  (function () {
    var playBtn = document.querySelector('.s1-play-btn');
    if (!playBtn) return;
    playBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playBtn.click();
      }
    });
  })();

  /* ── Header scroll ── */
  (function () {
    var header = document.getElementById('site-header');
    if (!header) return;

    function updateHeader() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  })();

  /* ── Section 8 accordion ── */
  (function () {
    var triggers = document.querySelectorAll('.s8-trigger');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item   = trigger.closest('.s8-item');
        var panel  = item.querySelector('.s8-panel');
        var isOpen = trigger.classList.contains('is-open');

        triggers.forEach(function (t) {
          t.classList.remove('is-open');
          t.setAttribute('aria-expanded', 'false');
          var p = t.closest('.s8-item').querySelector('.s8-panel');
          if (p) p.classList.remove('is-open');
        });

        if (!isOpen) {
          trigger.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          if (panel) panel.classList.add('is-open');
        }
      });
    });

    if (triggers[0]) {
      triggers[0].classList.add('is-open');
      triggers[0].setAttribute('aria-expanded', 'true');
      var firstPanel = triggers[0].closest('.s8-item').querySelector('.s8-panel');
      if (firstPanel) firstPanel.classList.add('is-open');
    }
  })();

  /* ── Section 2 counter animation ── */
  (function () {
    var counter = document.getElementById('s2-counter');
    if (!counter) return;

    var target   = 50000;
    var duration = 2200;
    var started  = false;

    function easeOutCubic(t) { 
      return 1 - Math.pow(1 - t, 3); 
    }

    function fmt(n) {
      var s = '' + Math.floor(n);
      var r = '';
      for (var i = 0; i < s.length; i++) {
        if (i > 0 && (s.length - i) % 3 === 0) r += ',';
        r += s[i];
      }
      return '$' + r;
    }

    function run(startTs) {
      function tick(ts) {
        var progress = Math.min((ts - startTs) / duration, 1);
        counter.textContent = fmt(target * easeOutCubic(progress));
        if (progress < 1) requestAnimationFrame(tick);
      }
      tick(startTs);
    }

    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started) {
        started = true;
        requestAnimationFrame(run);
      }
    }, { threshold: 0.2 });

    var s2Section = document.querySelector('.s2');
    if (s2Section) obs.observe(s2Section);
  })();

  /* ── Section 10 expandable ── */
  (function () {
    var trigger = document.querySelector('.s10-expand-trigger');
    var panel   = document.querySelector('.s10-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.classList.contains('is-open');
      if (isOpen) {
        trigger.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      } else {
        trigger.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
      }
    });
  })();

  /* ── Smooth scroll for anchor links ── */
  (function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  })();

})();