document.addEventListener('DOMContentLoaded', function () {
  var now = new Date();

  // Whole-section expiry: hide a block once its cutoff date passes, reveal a fallback in its place.
  // <div data-expires-section="2027-06-30T23:59:59+08:00" data-expired-fallback="#lyr-expired"> ... </div>
  document.querySelectorAll('[data-expires-section]').forEach(function (el) {
    var cutoff = new Date(el.getAttribute('data-expires-section'));
    if (now >= cutoff) {
      el.classList.add('hidden');
      var fallbackSelector = el.getAttribute('data-expired-fallback');
      if (fallbackSelector) {
        var fallback = document.querySelector(fallbackSelector);
        if (fallback) fallback.classList.remove('hidden');
      }
    }
  });

  // Per-link expiry: disable a sign-up link once its deadline passes and relabel it.
  // <a data-expires-link="2026-09-09T12:00:00+08:00" data-expired-label="Registration Closed 報名已截止">Sign up</a>
  document.querySelectorAll('[data-expires-link]').forEach(function (a) {
    var cutoff = new Date(a.getAttribute('data-expires-link'));
    if (now >= cutoff) {
      var label = a.getAttribute('data-expired-label');
      if (label) a.innerHTML = '<i class="fa-solid fa-lock"></i> ' + label;
      a.removeAttribute('href');
      a.removeAttribute('target');
      a.classList.add('link-expired');
      a.setAttribute('aria-disabled', 'true');
    }
  });

  // Countdown text: replace the token {days} with the number of days remaining until a target date.
  // <span data-countdown-to="2027-06-30T23:59:59+08:00">còn {days} days</span>
  document.querySelectorAll('[data-countdown-to]').forEach(function (el) {
    var target = new Date(el.getAttribute('data-countdown-to'));
    var days = Math.max(0, Math.ceil((target - now) / 86400000));
    el.textContent = el.textContent.replace('{days}', days);
  });
});
