// 探索数据轮播
const statsContainer = document.querySelector('.explore-stats');
let statsData = [];
let currentIndex = 0;
let timer = null;

// 数字动画
function animateNumber(el, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(update);
}

// 渲染一条数据
function renderStat(data) {
  statsContainer.innerHTML = `
    <div class="explore-title">${data.title}</div>
    <div style="display:flex;align-items:center;justify-content:center;">
      <span class="explore-number"></span>
      <span class="explore-unit">${data.unit}</span>
    </div>
    <div class="explore-desc">${data.desc}</div>
  `;
  // 数字动画
  const numberEl = statsContainer.querySelector('.explore-number');
  animateNumber(numberEl, data.value);
}

// 轮播切换
function nextStat() {
  renderStat(statsData[currentIndex]);
  currentIndex = (currentIndex + 1) % statsData.length;
}

// 加载数据并轮播
fetch('data/exploration-data.json')
  .then(res => res.json())
  .then(data => {
    statsData = data;
    nextStat();
    timer = setInterval(nextStat, 100);
  })
  .catch(() => {
    statsContainer.innerHTML = "<span style='color:#f66'>数据加载失败</span>";
  });