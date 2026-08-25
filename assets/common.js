// ============================================
// 커리어허브 - 공통 컴포넌트 (헤더 / 브레드크럼 / 푸터)
// ============================================

const GNB_ITEMS = [
  { label: "홈", href: "index.html", key: "home" },
  { label: "채용공고", href: "jobs_p1.html", key: "jobs" },
  { label: "채용검색", href: "search.html", key: "search" },
  { label: "채용뉴스", href: "news.html", key: "news" },
  { label: "기업정보", href: "company.html", key: "company" },
  { label: "마이페이지", href: "mypage.html", key: "mypage" },
];

function renderHeader(activeKey) {
  const gnbHtml = GNB_ITEMS.map(
    (item) =>
      `<a href="${item.href}" class="${item.key === activeKey ? "active" : ""}">${item.label}</a>`
  ).join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo">
        <span class="logo-mark">C</span>
        커리어허브
      </a>
      <nav class="gnb">${gnbHtml}</nav>
      <div class="header-actions">
        <a href="mypage.html" class="btn btn-outline btn-sm">마이페이지</a>
        <button class="hamburger" id="hamburgerBtn" aria-label="메뉴 열기"><span></span></button>
      </div>
    </div>
    <nav class="mobile-gnb" id="mobileGnb">${gnbHtml}</nav>
  `;
  document.body.prepend(header);

  const btn = header.querySelector("#hamburgerBtn");
  const mobileGnb = header.querySelector("#mobileGnb");
  btn.addEventListener("click", () => mobileGnb.classList.toggle("open"));
}

function renderBreadcrumb(current) {
  const el = document.getElementById("breadcrumb");
  if (!el) return;
  el.innerHTML = `<a href="index.html">홈</a><span class="sep">&gt;</span><span class="current">${current}</span>`;
}

function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-logo">C 커리어허브</div>
        <div class="footer-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">문의하기</a>
        </div>
      </div>
      <p class="footer-disclaimer">
        ※ 이 사이트는 강의 실습을 위해 만든 가상 데이터 사이트입니다. 게재된 채용공고, 기업정보, 뉴스는
        실습용 예시 데이터(일부 실제 언론사 뉴스 크롤링 결과 포함)이며 실제 채용/투자/거래와 무관합니다.
        사이트 내 모든 지원·저장 기능은 동작을 시뮬레이션한 것으로 실제 서버에 전송되지 않습니다.
      </p>
      <div class="footer-copy">&copy; 2026 커리어허브. All rights reserved. (교육용 예시)</div>
    </div>
  `;
  document.body.appendChild(footer);
}

// 저장하기 버튼 (localStorage 시뮬레이션)
function initSaveButtons() {
  document.querySelectorAll(".save-btn").forEach((btn) => {
    const jobId = btn.dataset.jobId;
    const saved = getSavedJobs();
    if (saved.includes(jobId)) {
      btn.classList.add("saved");
      btn.textContent = "저장됨 ✓";
    }
    btn.addEventListener("click", () => {
      let list = getSavedJobs();
      if (list.includes(jobId)) {
        list = list.filter((id) => id !== jobId);
        btn.classList.remove("saved");
        btn.textContent = "저장하기";
      } else {
        list.push(jobId);
        btn.classList.add("saved");
        btn.textContent = "저장됨 ✓";
      }
      localStorage.setItem("careerhub_saved_jobs", JSON.stringify(list));
    });
  });
}

function getSavedJobs() {
  try {
    return JSON.parse(localStorage.getItem("careerhub_saved_jobs")) || [];
  } catch (e) {
    return [];
  }
}

// 히어로/검색창 공용: 검색어 입력 후 search.html 로 이동
function initHeroSearch(inputId, formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.getElementById(inputId).value.trim();
    const url = val ? `search.html?q=${encodeURIComponent(val)}` : "search.html";
    window.location.href = url;
  });
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// 마감일 D-day 계산 (YYYY-MM-DD 형식만)
function getDdayLabel(deadline) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return deadline;
  const today = new Date("2026-08-25");
  const target = new Date(deadline);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "마감";
  if (diff === 0) return "오늘마감";
  return `D-${diff}`;
}

document.addEventListener("DOMContentLoaded", () => {
  initSaveButtons();
});
