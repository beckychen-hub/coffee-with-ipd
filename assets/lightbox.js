document.addEventListener('DOMContentLoaded', function () {
  var groups = {};
  document.querySelectorAll('[data-lightbox-group]').forEach(function (el) {
    var group = el.getAttribute('data-lightbox-group');
    if (!groups[group]) groups[group] = [];
    groups[group].push(el);
  });
  if (!Object.keys(groups).length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lightbox-prev" aria-label="Previous">&#10094;</button>' +
    '<img class="lightbox-img" src="" alt="">' +
    '<button type="button" class="lightbox-next" aria-label="Next">&#10095;</button>' +
    '<div class="lightbox-counter"></div>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector('.lightbox-img');
  var counterEl = overlay.querySelector('.lightbox-counter');
  var currentGroup = null;
  var currentIndex = 0;

  function show(group, index) {
    var items = groups[group];
    if (!items || !items.length) return;
    currentGroup = group;
    currentIndex = (index + items.length) % items.length;
    var el = items[currentIndex];
    imgEl.src = el.getAttribute('data-lightbox-src');
    imgEl.alt = el.getAttribute('data-lightbox-alt') || '';
    counterEl.textContent = (currentIndex + 1) + ' / ' + items.length;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  Object.keys(groups).forEach(function (group) {
    groups[group].forEach(function (el, index) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        show(group, index);
      });
    });
  });

  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  overlay.querySelector('.lightbox-prev').addEventListener('click', function () {
    show(currentGroup, currentIndex - 1);
  });
  overlay.querySelector('.lightbox-next').addEventListener('click', function () {
    show(currentGroup, currentIndex + 1);
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentGroup, currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentGroup, currentIndex + 1);
  });
});
