// =============================
// ⚽ 比賽隊伍模組
// =============================
document.addEventListener("DOMContentLoaded", () => {
  initStarToggle();
  initTabs();
  initMatchDateAutoUpdate();
});

// 1. 星星點擊切換
function initStarToggle() {
  const starIcons = document.querySelectorAll('.star-icon');
  starIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('active');
    });
  });
}

// 2. 頁籤切換功能
function initTabs() {
  const buttons = document.querySelectorAll(".tabs-btn");
  const contents = document.querySelectorAll(".tabs-content");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("current"));
      btn.classList.add("current");

      const target = btn.getAttribute("data-tab");
      contents.forEach(c => {
        c.classList.remove("current");
        if (c.id === target) c.classList.add("current");
      });
    });
  });
}

// 3. 每秒自動更新賽事日期時間
function initMatchDateAutoUpdate() {
  const matchDateEl = document.querySelector('.match-date');
  if (!matchDateEl) return;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function updateMatchDate() {
    const now = new Date();
    const formatted = `${days[now.getDay()]} ${months[now.getMonth()]} ${String(now.getDate()).padStart(2, '0')} ${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    matchDateEl.textContent = formatted;
  }

  updateMatchDate();
  setInterval(updateMatchDate, 1000);
}

// =============================
// 💰 賠率數據模組
// =============================
const typeSelector = document.querySelector('.odds-data-col1');
const dropdown = typeSelector.querySelector('.odds-data-dropdown');
const typeSelectorBtn = typeSelector.querySelector('.odds-data-type-selector');
const logoDiv = typeSelectorBtn.querySelector('.logo');

const logoPaths = [
  'image/oIdds_logo/oIdds_logo01.png',
  'image/oIdds_logo/oIdds_logo02.png',
  'image/oIdds_logo/oIdds_logo03.png',
  'image/oIdds_logo/oIdds_logo04.png',
];

typeSelectorBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  typeSelector.classList.toggle('open');
  if (typeSelector.classList.contains('open')) {
    const rect = typeSelectorBtn.getBoundingClientRect();
    dropdown.style.top = rect.bottom + 'px';
    dropdown.style.left = rect.left + 'px';
  }
});

dropdown.querySelectorAll('button.dropdown-item').forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    logoDiv.style.backgroundImage = `url('${logoPaths[idx]}')`;
    typeSelector.classList.remove('open');
    updateOddsValues();
  });
});

document.addEventListener('click', () => {
  typeSelector.classList.remove('open');
});

function randomOdd(min = 1.5, max = 4.5, fixed = 2) {
  return (Math.random() * (max - min) + min).toFixed(fixed);
}

function randomHandicap() {
  const sign = Math.random() > 0.5 ? '+' : '-';
  const number = (Math.random() * 2 + 0.5).toFixed(2);
  return `<em>${sign}${Math.floor(Math.random() * 3)}</em>${number.slice(1)}`;
}

function randomTotalGoal() {
  const goals = [2.0, 2.5, 3.0, 3.5, 4.0];
  return goals[Math.floor(Math.random() * goals.length)];
}

function updateOddsValues() {
  document.querySelectorAll('.odds-data-body').forEach(row => {
    row.querySelectorAll('.odds-data-col2 span').forEach(span => span.textContent = randomOdd());
    row.querySelectorAll('.odds-data-col3 span').forEach(span => span.innerHTML = randomHandicap());

    const col4 = row.querySelectorAll('.odds-data-col4 span');
    col4[0].textContent = randomTotalGoal();
    col4[1].textContent = randomOdd();
    col4[2].textContent = randomOdd();

    row.querySelectorAll('.odds-data-col5 span').forEach(span => span.textContent = randomOdd());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tableWrappers = document.querySelectorAll('.table-wrapper');
  tableWrappers.forEach(wrapper => {
    wrapper.scrollLeft = 0; // 預設捲動到最左
  });
});

// =============================
// 📺 直播影片模組
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const dateEl = document.getElementById("videos-date");

  function updateTime() {
    const now = new Date();
    const formatted = `${now.toLocaleString('en-US', { weekday: 'short' })} ${now.toLocaleString('en-US', { month: 'short' })} ${String(now.getDate()).padStart(2, '0')} ${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    dateEl.textContent = formatted;
  }

  updateTime();
  setInterval(updateTime, 1000);
});

document.querySelectorAll(".videos-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".videos-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".videos-screen").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.querySelector(`.videos-screen.${btn.dataset.type}`).classList.add("active");
  });
});

// =============================
// 💬 聊天室模組
// =============================
const chatBody = document.getElementById('chatRoomBody');
const toggleBtn = document.getElementById('chatToggleBtn');


toggleBtn.addEventListener('click', () => {
  chatBody.classList.toggle('hidden');
  toggleBtn.querySelector('svg').classList.toggle('collapsed');
});

const mockMessages = [
  { user: 'Alice', message: "Hi there! 😊 How's it going?" },
  { user: 'Bob_88', message: "Doing great! Just got off work 🏃‍♂️" },
  { user: 'Alice', message: "Nice! I'm building a chat box 🧱" },
  { user: 'CoderJoe', message: "Ooh show me when you're done! 🔥" },
  { user: 'Alice', message: "Definitely 😄 Just need a few tweaks." },
  { user: 'Bob_88', message: "Looking forward to it! 💪" },
  { user: 'Alice', message: "Cheers! 🍻" }
];

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage({ user, message }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-room-message';

  const meta = document.createElement('div');
  meta.className = 'chat-room-meta';

  const username = document.createElement('span');
  username.className = 'chat-room-user';
  username.textContent = user;

  const time = document.createElement('span');
  time.className = 'chat-room-time';
  time.textContent = formatTime(new Date());

  meta.appendChild(username);
  meta.appendChild(time);

  const msgText = document.createElement('div');
  msgText.className = 'chat-room-text';
  msgText.textContent = message;

  wrapper.appendChild(meta);
  wrapper.appendChild(msgText);
  chatBody.appendChild(wrapper);

  chatBody.scrollTop = chatBody.scrollHeight;
}

let index = 0;
setInterval(() => {
  if (index < mockMessages.length) {
    appendMessage(mockMessages[index++]);
  }
}, 3000);


// =============================
// 📝 文字直播模組
// =============================
const messages = [
  { type: "left", time: "87", content: '阿德温·埃雷拉 | <span class="strong">黃牌</span>' },
  { type: "left", time: "80", content: '何塞·费尔南多·凯塞多·维达尔 | <span class="strong">換上</span><br>依米·查拉 | <span class="strong">換下</span>' },
  { type: "left", time: "80", content: '坎奇谢博 | <span class="strong">換上</span><br>吉列尔莫·帕瓦 | <span class="strong">換下</span>' },
  { type: "right", time: "76", content: '<span class="strong">进球</span> | 路易斯·亚历杭德罗·拉莫斯·莱瓦<br><span class="strong">助攻</span> | 埃斯尼德·梅纳' },
  { type: "left", time: "74", content: '何塞·埃纳奎拉多 | <span class="strong">紅牌</span>' },
  { type: "left", time: "73", content: '何塞·埃纳奎拉多' },
  { type: "right", time: "69", content: '<span class="strong">換上</span> | Kevin Angulo Angulo<br><span class="strong">換下</span> | 罗德里戈·塞尔加多' },
  { type: "right", time: "66", content: '<span class="strong">黃牌</span> | José Antonio Cavadia Pedraza' },
  { type: "left", time: "65", content: '何塞·埃纳奎拉多 | <span class="strong">換上</span><br>布雷安·卡斯特罗隆 | <span class="strong">換下</span>' },
];

let msgIndex = 0;

function insertMessage() {
  if (msgIndex >= messages.length) return;

  const container = document.getElementById("liveTextMessages");
  const msg = messages[msgIndex];

  const wrapper = document.createElement("div");
  wrapper.className = "live-text-msg-block";

  const timeCircle = document.createElement("div");
  timeCircle.className = "live-text-time-circle";
  timeCircle.textContent = msg.time;

  if (msgIndex === messages.length - 1) {
    timeCircle.classList.add("has-icon");
  }

  const content = document.createElement("div");
  content.className = msg.type === "left" ? "live-text-msg-left" : "live-text-msg-right";
  content.innerHTML = msg.content;

  wrapper.appendChild(timeCircle);
  wrapper.appendChild(content);
  container.appendChild(wrapper);
  msgIndex++;

  updateFirstLastClasses();
}

function updateFirstLastClasses() {
  const blocks = document.querySelectorAll(".live-text-msg-block");
  blocks.forEach(block => block.classList.remove("first", "last"));
  if (blocks.length > 0) {
    blocks[0].classList.add("first");
    blocks[blocks.length - 1].classList.add("last");
  }
}

const interval = setInterval(() => {
  insertMessage();
  if (msgIndex >= messages.length) clearInterval(interval);
}, 800);

// =============================
// 📊 數據分析模組
// =============================
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.querySelectorAll('.data-analysis-content-row').forEach(row => {
  const leftNumElem = row.querySelector('.data-analysis-num-left');
  const rightNumElem = row.querySelector('.data-analysis-num-right');

  const leftNum = randomInt(0, 20);
  const rightNum = randomInt(0, 20);

  leftNumElem.innerHTML = `<span>${leftNum}</span>`;
  rightNumElem.innerHTML = `<span>${rightNum}</span>`;

  const leftSpan = leftNumElem.querySelector('span');
  const rightSpan = rightNumElem.querySelector('span');

  const isDark = document.body.classList.contains('dark');

  // 先重置 style
  leftSpan.style.backgroundColor = 'transparent';
  rightSpan.style.backgroundColor = 'transparent';

  // 文字色先用基本色
  leftSpan.style.color = 'var(--data-analysis-number-color)';
  rightSpan.style.color = 'var(--data-analysis-number-color)';

  if (leftNum > rightNum) {
    leftSpan.style.backgroundColor = 'var(--data-analysis-num-left-bg)';

    leftSpan.style.color = isDark
      ? 'var(--data-analysis-num-left-highlight-color-dark)'
      : 'var(--data-analysis-num-left-highlight-color)';

    rightSpan.style.color = isDark
      ? 'var(--data-analysis-number-color)'
      : 'var(--data-analysis-number-color)';

  } else if (rightNum > leftNum) {
    rightSpan.style.backgroundColor = 'var(--data-analysis-num-right-bg)';

    rightSpan.style.color = isDark
      ? 'var(--data-analysis-num-right-highlight-color-dark)'
      : 'var(--data-analysis-num-right-highlight-color)';

    leftSpan.style.color = isDark
      ? 'var(--data-analysis-number-color)'
      : 'var(--data-analysis-number-color)';

  } else {
    // 平手，字色依照模式
    leftSpan.style.color = isDark
      ? 'var(--data-analysis-number-color)'
      : 'var(--data-analysis-number-color)';
    rightSpan.style.color = leftSpan.style.color;
  }
});

// =============================
// 🧤 陣容模組
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const jerseyPlayers = {
    starting: {
      left: [
        { number: 10, name: "安德烈.费雷拉" },
        { number: 3, name: "費爾南多" },
        { number: 27, name: "魯道夫" },
        { number: 18, name: "多明戈斯" },
        { number: 36, name: "馬丁內斯" },
        { number: 25, name: "拉斐爾" },
      ],
      right: [
        { number: 11, name: "布朗" },
        { number: 9, name: "卡斯提歐" },
        { number: 20, name: "安東尼奧" },
        { number: 7, name: "摩拉雷斯" },
        { number: 33, name: "科雷亞" },
        { number: 19, name: "古斯塔沃" },
      ]
    },
    substitute: {
      left: [
        { number: 13, name: "馬里奧.馬丁" },
        { number: 5, name: "艾瑞克" },
        { number: 21, name: "卡布雷拉" },
        { number: 28, name: "古鐵雷斯" },
        { number: 6, name: "祖利亞" },
        { number: 22, name: "波尼法西奧" },
      ],
      right: [
        { number: 24, name: "路易斯米拿" },
        { number: 16, name: "威廉" },
        { number: 8, name: "薩維爾" },
        { number: 30, name: "達席爾瓦" },
        { number: 14, name: "奧利維拉" },
        { number: 29, name: "卡利斯多" },
      ]
    }
  };

  function createPlayerRow(leftPlayers, rightPlayers) {
    return `
      <div class="jersey-player-row">
        <div class="jersey-player-group jersey-left">
          ${leftPlayers.map(p => `
            <div class="jersey-player-item">
              <div class="jersey-player-icon icon-left">${p.number}</div>
              <div class="jersey-player-name">${p.name}</div>
            </div>`).join('')}
        </div>
        <div class="jersey-player-group jersey-right">
          ${rightPlayers.map(p => `
            <div class="jersey-player-item">
              <div class="jersey-player-icon icon-right">${p.number}</div>
              <div class="jersey-player-name">${p.name}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function createSection(title, group, className = "") {
    const left = group.left;
    const right = group.right;
    const rows = [];

    for (let i = 0; i < 3; i++) {
      const leftPair = left.slice(i * 2, i * 2 + 2);
      const rightPair = right.slice(i * 2, i * 2 + 2);
      rows.push(createPlayerRow(leftPair, rightPair));
    }

    return `
      <div class="jersey-section-title${className}">${title}</div>
      <div class="jersey-player-list">
        ${rows.join('')}
      </div>`;
  }

  // 自動生成球員列表函數
  function generateJersey() {
    const jerseyWraps = document.querySelectorAll(".jersey-wrap");
    jerseyWraps.forEach(jerseyWrap => {
      if (!jerseyWrap.dataset.generated) {
        jerseyWrap.insertAdjacentHTML(
          "beforeend",
          createSection("首发阵容", jerseyPlayers.starting) +
          createSection("替补阵容", jerseyPlayers.substitute, " substitute")
        );
        jerseyWrap.dataset.generated = "true"; // 標記已生成，避免重複生成
      }
    });
  }

  // 初次生成
  generateJersey();

  // 監聽 DOM 變化（支援分頁切換或動態生成）
  const observer = new MutationObserver(() => {
    generateJersey();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

// =============================
// 💰賠率分頁內詳情
// =============================
function randomDecimal(min, max, decimals = 2) {
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function randomWithEm() {
  const sign = Math.random() > 0.5 ? '+1' : '-1';
  return `<em>${sign}</em>${randomDecimal(0.80, 1.99).substring(1)}`;
}

function getBgColorByRow(rowClass) {
  switch (rowClass) {
    case 'cell-row1': return 'var(--odds-info-bg-blue)';
    case 'cell-row2': return 'var(--odds-info-bg-yellow)';
    case 'cell-row3': return 'var(--odds-info-bg-green)';
    default: return '#ffffff';
  }
}

function generateSpanRow(rowClass, count, generator, highlight = false) {
  const bgColor = getBgColorByRow(rowClass);
  return Array.from({ length: count }, () => {
    const cls = highlight ? `${rowClass} highlight` : rowClass;
    return `<span class="${cls}" style="background-color: ${bgColor};">${generator()}</span>`;
  }).join('');
}

function generateCol2() {
  return ['cell-row1', 'cell-row2', 'cell-row3'].map(row =>
    generateSpanRow(row, 3, () => randomDecimal(2.50, 4.00))
  ).join('');
}

function generateCol3() {
  return ['cell-row1', 'cell-row2', 'cell-row3'].map(row =>
    generateSpanRow(row, 2, randomWithEm)
  ).join('');
}

function generateCol4() {
  return ['cell-row1', 'cell-row2', 'cell-row3'].map(row =>
    generateSpanRow(row, 1, () => '2.5', true) + generateSpanRow(row, 2, () => randomDecimal(1.80, 2.20))
  ).join('');
}

function generateCol5() {
  return ['cell-row1', 'cell-row2', 'cell-row3'].map(row =>
    generateSpanRow(row, 3, () => randomDecimal(1.80, 3.50))
  ).join('');
}

function generateOddsRows(count = 4) {
  const table = document.querySelector('.odds-info-table');
  const annotation = document.querySelector('.odds-info-annotation-row');

  for (let i = 1; i <= count; i++) {
    const logoNum = String(i).padStart(2, '0');
    const rowHTML = `
      <div class="odds-info-row odds-info-body">
        <div class="odds-info-col odds-info-col1 rowspan-logo">
          <div class="logo-inner" style="background-image: url('image/oIdds_logo/oIdds_logo${logoNum}.png');"></div>
        </div>
        <div class="odds-info-col odds-info-col2">${generateCol2()}</div>
        <div class="odds-info-col odds-info-col3">${generateCol3()}</div>
        <div class="odds-info-col odds-info-col4">${generateCol4()}</div>
        <div class="odds-info-col odds-info-col5">${generateCol5()}</div>
      </div>`;
      
    annotation.insertAdjacentHTML('beforebegin', rowHTML);
  }
}

generateOddsRows(); // 可調整列數

//手機板
document.addEventListener("DOMContentLoaded", () => {
  // 所有 odds-info-wrapper
  const wrappers = document.querySelectorAll(".odds-info-wrapper");

  wrappers.forEach(wrapper => {
    // Tabs
    const tabBtns = wrapper.querySelectorAll(".tab-btn");
    // Switch
    const switchBtns = wrapper.querySelectorAll(".switch-btn");
    // Table
    const table = wrapper.querySelector(".odds-info-table");
    const preRows = table.querySelectorAll(".pre-row");
    const liveRows = table.querySelectorAll(".live-row");
    const thTitle = table.querySelector("thead th:nth-child(2)");

    // ------------------ Tabs 切換 ------------------
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // 更新 table 標題
        if (thTitle) thTitle.textContent = btn.textContent;
      });
    });

    // ------------------ Switch 切換 ------------------
    switchBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.switch;
        btn.classList.toggle("active");

        if (target === "pre") {
          preRows.forEach(row => row.classList.toggle("hidden"));
        } else if (target === "live") {
          liveRows.forEach(row => row.classList.toggle("hidden"));
        }
      });
    });
  });
});


// =============================
// 隊伍+直播
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const dateEl = document.querySelector(".title-events-mobile-date");
  const content = document.querySelector(".title-events-mobile-content");
  const liveScreen = document.querySelector(".title-events-mobile-live");
  const animeScreen = document.querySelector(".title-events-mobile-anime");
  const toggleBtn = document.querySelector(".toggle-btn");
  const iconLeft = toggleBtn.querySelector(".icon-mobile-left");
  const iconRight = toggleBtn.querySelector(".icon-mobile-right");
  const backBtns = document.querySelectorAll(".back-btn");

  // ---------------- 動態時間 ----------------
  function updateTime() {
    const now = new Date();
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const weekday = weekdays[now.getDay()];
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2,"0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2,"0");
    const minutes = String(now.getMinutes()).padStart(2,"0");
    dateEl.textContent = `${weekday} ${month} ${day} ${year} ${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // ---------------- Toggle ----------------
  iconLeft.addEventListener("click", () => {
    content.classList.add("hidden");
    liveScreen.classList.remove("hidden");
  });
  iconRight.addEventListener("click", () => {
    content.classList.add("hidden");
    animeScreen.classList.remove("hidden");
  });

  // ---------------- 返回 ----------------
  backBtns.forEach(btn => btn.addEventListener("click", () => {
    content.classList.remove("hidden");
    liveScreen.classList.add("hidden");
    animeScreen.classList.add("hidden");
  }));
});