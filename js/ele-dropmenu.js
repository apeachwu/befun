document.addEventListener('DOMContentLoaded', function () {
  const langIcon = document.querySelector('.lang-icon');
  const langGroup = document.querySelector('.ele-lang-group');
  const settingsIcon = document.querySelector('.settings-icon');
  const settingsMenu = document.querySelector('.settings-menu');

  if (langIcon && langGroup && settingsIcon && settingsMenu) {
    langIcon.addEventListener('click', function (e) {
      e.preventDefault();
      const langIsOpen = langGroup.classList.contains('active');
      const settingsIsOpen = settingsMenu.classList.contains('show');

      if (langIsOpen) {
        langGroup.classList.remove('active');
        langIcon.classList.remove('current');
      } else {
        // 關閉另一個選單
        if (settingsIsOpen) {
          settingsMenu.classList.remove('show');
          settingsIcon.classList.remove('active');
        }
        langGroup.classList.add('active');
        langIcon.classList.add('current');
      }
    });

    settingsIcon.addEventListener('click', function (e) {
      e.preventDefault();
      const settingsIsOpen = settingsMenu.classList.contains('show');
      const langIsOpen = langGroup.classList.contains('active');

      if (settingsIsOpen) {
        settingsMenu.classList.remove('show');
        settingsIcon.classList.remove('active');
      } else {
        // 關閉另一個選單
        if (langIsOpen) {
          langGroup.classList.remove('active');
          langIcon.classList.remove('current');
        }
        settingsMenu.classList.add('show');
        settingsIcon.classList.add('active');
      }
    });

    // 點下拉項目自動關閉
    langGroup.querySelectorAll('.ele-lang-option').forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        langGroup.classList.remove('active');
        langIcon.classList.remove('current');
      });
    });

    settingsMenu.querySelectorAll('.settings-item').forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        settingsMenu.classList.remove('show');
        settingsIcon.classList.remove('active');
      });
    });
  }
});