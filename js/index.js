

//日間夜間主題切換
  document.addEventListener('DOMContentLoaded', () => {
  const lightBtn = document.getElementById('light-mode');
  const darkBtn = document.getElementById('dark-mode');

  // 初次載入時依照 localStorage 設定主題
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  lightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });

  darkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
});


//輪播圖
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-box');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  const images = [
    '../befunscore/image/slider01.png',
    '../befunscore/image/slider02.png'
    // 可以繼續添加
  ];

  let current = 0;

  function showSlide(index) {
    slider.style.backgroundImage = `url(${images[index]})`;
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showSlide(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showSlide(current);
  });

  // 自動輪播
  setInterval(() => {
    current = (current + 1) % images.length;
    showSlide(current);
  }, 10000);

  // 初始化
  showSlide(current);
});


//收合表單(熱門賽事)
document.addEventListener('DOMContentLoaded', function () {
  function setupCollapse(selector, toggleSelector) {
    const containers = document.querySelectorAll(selector);

    containers.forEach(container => {
      const toggleBtn = container.querySelector(toggleSelector);
      if (!toggleBtn) return;

      toggleBtn.addEventListener('click', () => {
        containers.forEach(other => {
          if (other !== container) {
            other.classList.add('collapsed');
          }
        });

        container.classList.toggle('collapsed');
      });
    });
  }

  setupCollapse('.form-box', '.form-toggle-btn');
  setupCollapse('.nation-box', '.nation-toggle-btn');
});

//足球賽事
document.addEventListener("DOMContentLoaded", () => {
  // --- 時區切換功能區 ---
  const timezoneToggle = document.getElementById("timezoneToggle");
  timezoneToggle.addEventListener("click", function () {
    this.classList.toggle("open");
  });

  const timezoneOptions = timezoneToggle.querySelectorAll(".option");
  timezoneOptions.forEach((opt) => {
    opt.addEventListener("click", function () {
      timezoneToggle.querySelector(".selected-timezone").textContent = this.textContent;
      timezoneToggle.classList.remove("open");
    });
  });

  // --- 賠率開關切換功能區 ---
  const oddsSwitch = document.getElementById("oddsSwitch");
  const leagues = document.querySelectorAll(".football-league");
  oddsSwitch.addEventListener("click", () => {
    oddsSwitch.classList.toggle("active");
    leagues.forEach((league) => league.classList.toggle("odds-hidden"));
  });

  // --- 頁籤切換功能區 ---
  const tabs = document.querySelectorAll("#footballTabs .tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      contents.forEach((content) => {
        content.classList.toggle("active", content.getAttribute("data-content") === target);
      });
    });
  });

  // --- 聯賽折疊箭頭功能區 ---
  const leagueHeaders = document.querySelectorAll(".league-header");
  leagueHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const league = header.closest(".football-league");
      league.classList.toggle("collapsed");
    });
  });

  // --- 日期初始化為今日功能區 ---
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById("customDateInput");
  if (dateInput) dateInput.value = todayStr;

  // --- 收藏星星點擊切換功能區 ---
  document.querySelectorAll('.favorite-toggle').forEach(star => {
    star.addEventListener('click', () => {
      star.classList.toggle('active');
    });
  });
});

//热门现场比赛
document.querySelectorAll('.btn-grey').forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});

//賽程
document.addEventListener('DOMContentLoaded', function () {
  const btnCompleted = document.getElementById('tab-completed');
  const btnUpcoming = document.getElementById('tab-upcoming');
  const contentCompleted = document.getElementById('content-completed');
  const contentUpcoming = document.getElementById('content-upcoming');

  function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function generateItems(dates) {
    return dates
      .map(
        (date) =>
          `<div class="item"><a href="#">${date}</a></div>`
      )
      .join('');
  }

  function generateCompletedDates() {
    const today = new Date();
    const dates = [];
    for (let i = 5; i >= 1; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dates.push(formatDate(d));
    }
    return dates;
  }

  function generateUpcomingDates() {
    const today = new Date();
    const dates = [];
    for (let i = 1; i <= 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(formatDate(d));
    }
    return dates;
  }

  function switchTab(tab) {
    if (tab === 'completed') {
      btnCompleted.classList.add('active');
      btnUpcoming.classList.remove('active');
      contentCompleted.style.display = 'flex';
      contentUpcoming.style.display = 'none';
    } else {
      btnCompleted.classList.remove('active');
      btnUpcoming.classList.add('active');
      contentCompleted.style.display = 'none';
      contentUpcoming.style.display = 'flex';
    }
  }

  contentCompleted.innerHTML = generateItems(generateCompletedDates());
  contentUpcoming.innerHTML = generateItems(generateUpcomingDates());

  btnCompleted.addEventListener('click', () => switchTab('completed'));
  btnUpcoming.addEventListener('click', () => switchTab('upcoming'));
});

//左邊浮動
const panelWrapper = document.getElementById('side-panel-wrapper');
const panelIcon = document.getElementById('side-panel-icon');
const earthWrapper = document.getElementById('earth-panel-wrapper');
const earthIcon = document.getElementById('earth-panel-icon');
const panelOverlay = document.getElementById('side-panel-overlay');
const panelClose = document.getElementById('panel-close');
const earthClose = document.getElementById('earth-panel-close');

// ICON hover 旋轉
[panelIcon, earthIcon].forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    if (!icon.classList.contains('open')) icon.classList.add('spin');
  });
  icon.addEventListener('mouseleave', () => {
    icon.classList.remove('spin');
  });
});

// 面板開關函數（兩個 ICON 都消失）
function togglePanel(wrapper, open) {
  if (open) {
    wrapper.classList.add('open');
    panelOverlay.classList.add('open');
    panelIcon.classList.add('open');  // 兩個 ICON 都隱藏
    earthIcon.classList.add('open');
  } else {
    wrapper.classList.remove('open');
    panelOverlay.classList.remove('open');
    panelIcon.classList.remove('open'); // 顯示 ICON
    earthIcon.classList.remove('open');
  }
}

// 足球 ICON
panelIcon.addEventListener('click', e => {
  e.stopPropagation();
  togglePanel(panelWrapper, !panelWrapper.classList.contains('open'));
});

// 地球 ICON
earthIcon.addEventListener('click', e => {
  e.stopPropagation();
  togglePanel(earthWrapper, !earthWrapper.classList.contains('open'));
});

// 點遮罩關閉
panelOverlay.addEventListener('click', () => {
  togglePanel(panelWrapper, false);
  togglePanel(earthWrapper, false);
});

// 點 X 關閉
panelClose.addEventListener('click', () => togglePanel(panelWrapper, false));
earthClose.addEventListener('click', () => togglePanel(earthWrapper, false));

// ESC 關閉
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    togglePanel(panelWrapper, false);
    togglePanel(earthWrapper, false);
  }
});