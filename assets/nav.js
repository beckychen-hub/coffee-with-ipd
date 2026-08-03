document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('mobile-nav-toggle');
  var panel = document.getElementById('mobile-nav');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    });
  }

  // Clicking a control inside an embedded iframe (e.g. the Slides "next"
  // arrow) moves focus into that iframe, and browsers auto-scroll it into
  // view. On short viewports the iframe isn't already fully visible, so
  // the page visibly jumps. Snapshot scroll position when focus enters an
  // iframe and pin it back for a short window to cancel that auto-scroll.
  var restoring = false;
  var savedX = 0;
  var savedY = 0;

  window.addEventListener('blur', function () {
    if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
      savedX = window.scrollX;
      savedY = window.scrollY;
      restoring = true;
      setTimeout(function () { restoring = false; }, 400);
    }
  });

  window.addEventListener('scroll', function () {
    if (restoring) {
      window.scrollTo({ top: savedY, left: savedX, behavior: 'instant' });
    }
  }, { passive: true });
});
