document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('mobile-nav-toggle');
  var panel = document.getElementById('mobile-nav');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    });
  }
});
