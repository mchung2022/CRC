/**
 * CRC (兒童權利公約) 互動簡報與素養試題系統主程式
 */
document.addEventListener("DOMContentLoaded", () => {
  let currentSlideIndex = 0;
  const totalSlides = slidesData.length;
  let userQuizAnswers = {}; // { slideId: { selectedOption: number, isCorrect: boolean } }

  // DOM 元素引用
  const slideContainer = document.getElementById("slideCardWrapper");
  const slideListContainer = document.getElementById("slideList");
  const modalGridContainer = document.getElementById("modalGrid");
  const currentSlideNumEl = document.getElementById("currentSlideNum");
  const totalSlideNumEl = document.getElementById("totalSlideNum");
  const jumpInput = document.getElementById("jumpInput");
  const progressBarFill = document.getElementById("progressBarFill");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
  const overviewBtn = document.getElementById("overviewBtn");
  const overviewModal = document.getElementById("overviewModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const searchInput = document.getElementById("searchInput");

  totalSlideNumEl.textContent = totalSlides;
  jumpInput.max = totalSlides;

  // 1. 初始化側邊欄選單
  function renderSidebar(filterQuery = "") {
    slideListContainer.innerHTML = "";
    slidesData.forEach((slide, index) => {
      if (filterQuery) {
        const q = filterQuery.toLowerCase();
        const matchTitle = slide.title.toLowerCase().includes(q);
        const matchCategory = slide.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory) return;
      }

      const item = document.createElement("div");
      item.className = `slide-item ${index === currentSlideIndex ? "active" : ""}`;
      item.onclick = () => goToSlide(index);

      const typeBadge = slide.type === 'quiz' ? '<span class="slide-item-badge" style="color:#f59e0b;">素養題</span>' : '';

      item.innerHTML = `
        <div class="slide-item-num">${slide.id}</div>
        <div class="slide-item-title">${slide.title}</div>
        ${typeBadge}
      `;
      slideListContainer.appendChild(item);
    });
  }

  // 2. 初始化總覽 Modal 網格
  function renderModalGrid() {
    modalGridContainer.innerHTML = "";
    slidesData.forEach((slide, index) => {
      const card = document.createElement("div");
      card.className = `grid-thumb-card ${index === currentSlideIndex ? "active" : ""}`;
      card.onclick = () => {
        goToSlide(index);
        closeOverviewModal();
      };

      const isQuiz = slide.type === 'quiz';
      const badgeText = isQuiz ? '📝 素養題' : '📄 簡報';

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="thumb-num">P.${slide.id}</span>
          <span style="font-size:0.7rem; opacity:0.7;">${badgeText}</span>
        </div>
        <div class="thumb-title">${slide.title}</div>
      `;
      modalGridContainer.appendChild(card);
    });
  }

  // 3. 渲染當前簡報頁面
  function renderSlide(index) {
    const slide = slidesData[index];
    if (!slide) return;

    currentSlideIndex = index;
    currentSlideNumEl.textContent = slide.id;
    jumpInput.value = slide.id;

    // 更新進度條
    const progressPercent = ((index + 1) / totalSlides) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    // 按鈕狀態更新
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;

    // 如果是 Quiz 類型，調用渲染 Quiz
    if (slide.type === "quiz") {
      renderQuizSlide(slide);
    } else {
      renderContentSlide(slide);
    }

    // 更新側邊欄與 Modal 亮顯狀態
    renderSidebar(searchInput.value);
  }

  // 渲染一般圖文簡報
  function renderContentSlide(slide) {
    slideContainer.innerHTML = `
      <div class="slide-header-bar">
        <div class="category-tag">
          <i class="fa-solid ${slide.icon || 'fa-bookmark'}"></i> ${slide.category} • ${slide.tag}
        </div>
        <div class="slide-index-pill">SLIDE ${slide.id} / ${totalSlides}</div>
      </div>
      <h2 class="slide-main-title">${slide.title}</h2>
      <div class="slide-subtitle">${slide.subtitle}</div>
      <div class="slide-body">
        ${slide.content}
      </div>
    `;
  }

  // 渲染素養選擇題簡報
  function renderQuizSlide(slide) {
    const qData = slide.quizData;
    const previousAnswer = userQuizAnswers[slide.id];

    let optionsHTML = "";
    qData.options.forEach((opt, idx) => {
      let optionClass = "quiz-option-btn";
      let iconHTML = '<i class="fa-regular fa-circle"></i>';

      if (previousAnswer) {
        if (idx === qData.correct) {
          optionClass += " selected-correct";
          iconHTML = '<i class="fa-solid fa-circle-check"></i>';
        } else if (idx === previousAnswer.selectedOption) {
          optionClass += " selected-incorrect";
          iconHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        }
        optionClass += " disabled";
      }

      optionsHTML += `
        <button class="${optionClass}" onclick="window.handleQuizSelect(${slide.id}, ${idx})">
          <span>${opt}</span>
          ${iconHTML}
        </button>
      `;
    });

    let explanationHTML = "";
    if (previousAnswer) {
      const isCorrect = previousAnswer.selectedOption === qData.correct;
      const alertType = isCorrect ? "alert-success" : "alert-danger";
      const resultText = isCorrect ? "🎉 回答正確！符合 CRC 人權理念。" : "❌ 回答錯誤！讓我們檢視法理分析：";

      explanationHTML = `
        <div class="quiz-explanation-box">
          <div class="alert-box ${alertType}" style="margin-bottom:0.75rem;">
            <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
            <strong>${resultText}</strong>
          </div>
          <div>${qData.explanation}</div>
        </div>
      `;
    }

    slideContainer.innerHTML = `
      <div class="slide-header-bar">
        <div class="category-tag" style="color:var(--accent-amber);">
          <i class="fa-solid fa-pen-to-square"></i> ${slide.category} • ${slide.tag}
        </div>
        <div class="slide-index-pill" style="border-color:var(--accent-amber); color:var(--accent-amber);">素養挑戰題</div>
      </div>
      <h2 class="slide-main-title">${slide.title}</h2>
      <div class="slide-subtitle">${slide.subtitle}</div>
      <div class="slide-body">
        <div class="quiz-container">
          <div class="quiz-scenario">
            <strong><i class="fa-solid fa-compass"></i> 【情境敘述】：</strong><br>${qData.scenario}
          </div>
          <div class="quiz-question"><i class="fa-solid fa-circle-question"></i> ${qData.question}</div>
          <div class="quiz-options">
            ${optionsHTML}
          </div>
          ${explanationHTML}
        </div>
      </div>
    `;
  }

  // 4. 處理測驗選擇
  window.handleQuizSelect = function (slideId, optionIndex) {
    if (userQuizAnswers[slideId]) return; // 已回答過

    const slide = slidesData.find((s) => s.id === slideId);
    if (!slide || !slide.quizData) return;

    const isCorrect = optionIndex === slide.quizData.correct;
    userQuizAnswers[slideId] = {
      selectedOption: optionIndex,
      isCorrect: isCorrect
    };

    // 重新渲染畫面呈現解析
    renderSlide(currentSlideIndex);
  };

  // 5. 導覽換頁控制
  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      renderSlide(index);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  // 6. 事件監聽設定
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  jumpInput.addEventListener("change", (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= totalSlides) {
      goToSlide(val - 1);
    }
  });

  // 鍵盤快捷鍵 (方向鍵左右, 空白鍵)
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      prevSlide();
    } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "Home") {
      goToSlide(0);
    } else if (e.key === "End") {
      goToSlide(totalSlides - 1);
    }
  });

  // 側邊欄切換
  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // 搜尋功能
  searchInput.addEventListener("input", (e) => {
    renderSidebar(e.target.value);
  });

  // Overview Modal 控制
  function openOverviewModal() {
    renderModalGrid();
    overviewModal.classList.add("active");
  }

  function closeOverviewModal() {
    overviewModal.classList.remove("active");
  }

  overviewBtn.addEventListener("click", openOverviewModal);
  closeModalBtn.addEventListener("click", closeOverviewModal);
  overviewModal.addEventListener("click", (e) => {
    if (e.target === overviewModal) closeOverviewModal();
  });

  // 主題切換 (Dark / Light)
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggleBtn.querySelector("i").className = newTheme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });

  // 全螢幕切換
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("全螢幕切換失敗:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  // 初始化預設啟動第一頁
  renderSidebar();
  renderSlide(0);
});
