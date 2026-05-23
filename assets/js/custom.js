(function () {
  // Dark mode: apply saved preference
  var isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.documentElement.setAttribute('data-theme', 'dark');

  function updateIcon(dark) {
    var icon = document.querySelector('#dark-mode-toggle i');
    if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateIcon(isDark);

    // Capture phase: fires before any other handler
    document.addEventListener('click', function (e) {
      var target = e.target;
      if (!target) return;

      // Dark mode toggle
      var toggle = target.closest ? target.closest('#dark-mode-toggle') : null;
      if (toggle) {
        isDark = !isDark;
        if (isDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('darkMode', 'true');
        } else {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('darkMode', 'false');
        }
        updateIcon(isDark);
        e.stopPropagation();
        return;
      }

      // External links: set target="_blank" and let browser handle it
      var link = target.closest ? target.closest('a[href]') : null;
      if (link && link.hostname && link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }, true);
  });
})();
