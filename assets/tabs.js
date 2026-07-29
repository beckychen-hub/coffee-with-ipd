document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-tab-group]').forEach(function (group) {
    var panel = document.querySelector(group.getAttribute('data-panel-target'));
    if (!panel) return;

    group.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var staff = btn.getAttribute('data-staff');
        panel.className = 'resource-card overflow-hidden flex flex-col';
        panel.innerHTML =
          '<div class="p-6 flex flex-col gap-4">' +
            '<h2 class="font-display text-lg font-bold">' + btn.getAttribute('data-title') + '</h2>' +
            '<p class="text-sm text-espressoLight">' + btn.getAttribute('data-subtitle') + '</p>' +
            (staff ? '<div class="text-sm text-espressoLight leading-relaxed space-y-1">' + staff + '</div>' : '') +
          '</div>' +
          '<div class="embed-wrap">' +
            '<iframe src="' + btn.getAttribute('data-embed') + '" title="' + btn.getAttribute('data-title') + '" loading="lazy" allowfullscreen></iframe>' +
          '</div>';
      });
    });
  });
});
