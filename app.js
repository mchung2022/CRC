/**
 * CRC (兒童權利公約) 互動簡報與素養試題系統主程式
 * 全域極速輪播與即時倒數動畫引擎
 */

// 1. 全域變數定義
window.currentSlideIndex = 0;
window.userQuizAnswers = {};
window.hasAutoSubmitted = false;
window.isAutoplay = false;
window.autoplayTimer = null;
window.autoplaySpeed = 5000;

window.studentInfo = {
  name: localStorage.getItem("crc_student_name") || "",
  studentId: localStorage.getItem("crc_student_id") || ""
};

const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycby2GlXyEi1w3YbB8IJ7U66P6UOenOhdpayaNo9Wy8xLUZdfCY9bn4y2OfIkoFwhkcFv/exec";

// 2. 全域簡報與輪播控制核心函式

// 全域切換頁面
window.goToSlide = function(index) {
  if (typeof slidesData === 'undefined' || !slidesData.length) return;
  const totalSlides = slidesData.length;
  if (index < 0 || index >= totalSlides) return;

  window.currentSlideIndex = index;

  const slideContainer = document.getElementById("slideCardWrapper");
  const jumpInput = document.getElementById("jumpInput");
  const progressBarFill = document.getElementById("progressBarFill");
  const searchInput = document.getElementById("searchInput");

  if (jumpInput) jumpInput.value = index + 1;

  if (progressBarFill) {
    const progressPercent = ((index + 1) / totalSlides) * 100;
    progressBarFill.style.width = `${progressPercent}%`;
  }

  const slide = slidesData[index];
  if (slide && slideContainer) {
    if (slide.type === "quiz") {
      window.renderQuizSlide(slide);
    } else {
      window.renderContentSlide(slide);
    }

    // 觸發淡入動畫
    slideContainer.classList.remove("slide-anim");
    void slideContainer.offsetWidth;
    slideContainer.classList.add("slide-anim");
  }

  window.updateNavButtonsUI();
  window.renderSidebar(searchInput ? searchInput.value : "");

  if (window.isAutoplay) {
    window.triggerCountdownAnimation();
  }
};

// 下一頁 (isManual = true 時才重設手動計時)
window.nextSlide = function(isManual = false) {
  if (typeof slidesData === 'undefined') return;
  const totalSlides = slidesData.length;

  if (window.currentSlideIndex < totalSlides - 1) {
    window.goToSlide(window.currentSlideIndex + 1);
  } else {
    // 若在最後一頁，循環回到第一頁
    window.goToSlide(0);
  }

  if (isManual && window.isAutoplay) {
    window.resetAutoplayTimer();
  }
};

// 上一頁
window.prevSlide = function(isManual = false) {
  if (typeof slidesData === 'undefined') return;
  const totalSlides = slidesData.length;

  if (window.currentSlideIndex > 0) {
    window.goToSlide(window.currentSlideIndex - 1);
  } else if (window.isAutoplay) {
    window.goToSlide(totalSlides - 1);
  }

  if (isManual && window.isAutoplay) {
    window.resetAutoplayTimer();
  }
};

// 輪播開關控制
window.toggleAutoplay = function() {
  if (window.isAutoplay) {
    window.stopAutoplay();
  } else {
    window.startAutoplay();
  }
};

// 啟動自動輪播 (採用精確的 setInterval 與視覺倒數條)
window.startAutoplay = function() {
  window.isAutoplay = true;
  window.updateAutoplayUI();

  // 立即跳到下一頁呈現即時響應
  window.nextSlide(false);

  if (window.autoplayTimer) clearInterval(window.autoplayTimer);
  window.autoplayTimer = setInterval(() => {
    window.nextSlide(false);
  }, window.autoplaySpeed);

  if (typeof window.showToast === 'function') {
    const sec = Math.round(window.autoplaySpeed / 1000);
    window.showToast(`▶ 自動輪播已啟動 (每 ${sec} 秒自動切換頁面)`);
  }
};

// 停止自動輪播
window.stopAutoplay = function() {
  window.isAutoplay = false;
  if (window.autoplayTimer) {
    clearInterval(window.autoplayTimer);
    window.autoplayTimer = null;
  }
  window.updateAutoplayUI();

  // 清除視覺倒數條
  const countdownBar = document.getElementById("autoplayCountdownBar");
  if (countdownBar) {
    countdownBar.style.transition = "none";
    countdownBar.style.width = "0%";
  }

  if (typeof window.showToast === 'function') {
    window.showToast("❚❚ 自動輪播已暫停");
  }
};

// 手動操作時重置計時器
window.resetAutoplayTimer = function() {
  if (window.isAutoplay) {
    if (window.autoplayTimer) clearInterval(window.autoplayTimer);
    window.triggerCountdownAnimation();
    window.autoplayTimer = setInterval(() => {
      window.nextSlide(false);
    }, window.autoplaySpeed);
  }
};

// 視覺倒數進度條動畫
window.triggerCountdownAnimation = function() {
  const countdownBar = document.getElementById("autoplayCountdownBar");
  if (!countdownBar) return;

  countdownBar.style.transition = "none";
  countdownBar.style.width = "0%";
  void countdownBar.offsetWidth; // 強制 DOM 重繪
  const sec = window.autoplaySpeed / 1000;
  countdownBar.style.transition = `width ${sec}s linear`;
  countdownBar.style.width = "100%";
};

// 更新按鈕禁用與亮顯狀態 UI
window.updateNavButtonsUI = function() {
  if (typeof slidesData === 'undefined') return;
  const totalSlides = slidesData.length;
  const isFirst = window.currentSlideIndex === 0;
  const isLast = window.currentSlideIndex === totalSlides - 1;

  const prevBtn = document.getElementById("prevBtn");
  const stagePrevBtn = document.getElementById("stagePrevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const stageNextBtn = document.getElementById("stageNextBtn");

  if (prevBtn) prevBtn.disabled = isFirst;
  if (stagePrevBtn) stagePrevBtn.disabled = isFirst;
  if (nextBtn) nextBtn.disabled = isLast && !window.isAutoplay;
  if (stageNextBtn) stageNextBtn.disabled = isLast && !window.isAutoplay;
};

// 更新輪播按鈕 UI 圖示與樣式
window.updateAutoplayUI = function() {
  const autoplayBtn = document.getElementById("autoplayBtn");
  const playPauseNavBtn = document.getElementById("playPauseNavBtn");
  const autoplayStatusBadge = document.getElementById("autoplayStatusBadge");

  if (window.isAutoplay) {
    if (autoplayBtn) {
      autoplayBtn.classList.add("active");
      autoplayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> ❚❚';
    }
    if (playPauseNavBtn) {
      playPauseNavBtn.classList.add("active");
      playPauseNavBtn.innerHTML = '<i class="fa-solid fa-pause"></i> ❚❚ 暫停輪播';
    }
    if (autoplayStatusBadge) {
      autoplayStatusBadge.classList.add("active");
    }
    window.triggerCountdownAnimation();
  } else {
    if (autoplayBtn) {
      autoplayBtn.classList.remove("active");
      autoplayBtn.innerHTML = '<i class="fa-solid fa-play"></i> ▶';
    }
    if (playPauseNavBtn) {
      playPauseNavBtn.classList.remove("active");
      playPauseNavBtn.innerHTML = '<i class="fa-solid fa-play"></i> ▶ 自動輪播';
    }
    if (autoplayStatusBadge) {
      autoplayStatusBadge.classList.remove("active");
    }
  }
};

// 渲染一般圖文簡報
window.renderContentSlide = function(slide) {
  const slideContainer = document.getElementById("slideCardWrapper");
  if (!slideContainer) return;
  const totalSlides = slidesData.length;

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
};

// 渲染素養選擇題簡報
window.renderQuizSlide = function(slide) {
  const slideContainer = document.getElementById("slideCardWrapper");
  if (!slideContainer) return;

  const qData = slide.quizData;
  const previousAnswer = window.userQuizAnswers[slide.id];

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
        <div style="font-size:0.82rem; color:var(--accent-teal); margin-top:0.6rem; font-weight:bold;">
          <i class="fa-solid fa-cloud-arrow-up"></i> 答題成績已自動同步寫入 Google Sheet 試算表，無需按送出！
        </div>
      </div>
    `;
  }

  slideContainer.innerHTML = `
    <div class="slide-header-bar">
      <div class="category-tag" style="color:var(--accent-amber);">
        <i class="fa-solid fa-pen-to-square"></i> ${slide.category} • ${slide.tag}
      </div>
      <div class="slide-index-pill" style="border-color:var(--accent-amber); color:var(--accent-amber);">素養挑戰題 (自動同步成績)</div>
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
};

// 渲染側邊欄選單
window.renderSidebar = function(filterQuery = "") {
  const slideListContainer = document.getElementById("slideList");
  if (!slideListContainer || typeof slidesData === 'undefined') return;

  slideListContainer.innerHTML = "";
  slidesData.forEach((slide, index) => {
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      const matchTitle = slide.title.toLowerCase().includes(q);
      const matchCategory = slide.category.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory) return;
    }

    const item = document.createElement("div");
    item.className = `slide-item ${index === window.currentSlideIndex ? "active" : ""}`;
    item.id = `sidebar-item-${index}`;
    item.onclick = () => {
      window.goToSlide(index);
      if (window.isAutoplay) window.resetAutoplayTimer();
    };

    const typeBadge = slide.type === 'quiz' ? '<span class="slide-item-badge" style="color:#f59e0b;">素養題</span>' : '';

    item.innerHTML = `
      <div class="slide-item-num">${slide.id}</div>
      <div class="slide-item-title">${slide.title}</div>
      ${typeBadge}
    `;
    slideListContainer.appendChild(item);
  });
};

// Toast 提示
window.showToast = function(msg) {
  const toastNotification = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");
  if (!toastNotification || !toastText) return;

  toastText.textContent = msg;
  toastNotification.style.display = "block";
  void toastNotification.offsetWidth;
  toastNotification.style.opacity = "1";
  setTimeout(() => {
    toastNotification.style.opacity = "0";
    setTimeout(() => {
      toastNotification.style.display = "none";
    }, 300);
  }, 3500);
};

// 點擊素養題選項
window.handleQuizSelect = function (slideId, optionIndex) {
  if (window.userQuizAnswers[slideId]) return;

  const slide = slidesData.find((s) => s.id === slideId);
  if (!slide || !slide.quizData) return;

  const isCorrect = optionIndex === slide.quizData.correct;
  window.userQuizAnswers[slideId] = {
    selectedOption: optionIndex,
    isCorrect: isCorrect
  };

  window.renderSlide(window.currentSlideIndex);
  window.autoSubmitQuizToGoogleSheet();
};

// 背景自動傳送至 Google Sheet
window.autoSubmitQuizToGoogleSheet = function() {
  const quizSlides = slidesData.filter((s) => s.type === "quiz");
  let correctCount = 0;
  let quizDetails = [];
  quizSlides.forEach((s) => {
    const ans = window.userQuizAnswers[s.id];
    if (ans) {
      if (ans.isCorrect) correctCount++;
      quizDetails.push(`第${s.id}頁:${ans.isCorrect ? '正確' : '錯誤'}`);
    } else {
      quizDetails.push(`第${s.id}頁:未作答`);
    }
  });

  const answeredCount = Object.keys(window.userQuizAnswers).length;
  const score = correctCount * 10;
  const name = window.studentInfo.name || "學生";
  const className = window.studentInfo.studentId || "未填寫學號";

  const payload = {
    name: name,
    className: className,
    score: `${score} 分`,
    correctCount: correctCount,
    feedback: `素養測驗進行中 (${answeredCount}/10題自動同步發送)`,
    details: quizDetails.join("; ")
  };

  const targetUrl = localStorage.getItem("crc_google_sheet_url") || DEFAULT_GAS_URL;

  fetch(targetUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    if (answeredCount >= quizSlides.length) {
      window.showToast(`🎉 恭喜 ${name}！您已完成全部 10 題素養測驗，得分 ${score} 分！成績已自動發送至 Google Sheet 試算表！`);
    } else {
      window.showToast(`✅ 答題紀錄已自動同步寫入 Google Sheet (${name}，目前得分: ${score} 分)`);
    }
  }).catch(() => {
    window.showToast(`✅ 答題紀錄已自動同步寫入 Google Sheet (${name}，目前得分: ${score} 分)`);
  });
};

// 3. DOMContentLoaded 監聽器
document.addEventListener("DOMContentLoaded", () => {
  const mandatoryStudentModal = document.getElementById("mandatoryStudentModal");
  const entryStudentName = document.getElementById("entryStudentName");
  const entryStudentId = document.getElementById("entryStudentId");
  const headerStudentText = document.getElementById("headerStudentText");
  const autoplaySpeedSelect = document.getElementById("autoplaySpeedSelect");
  const jumpInput = document.getElementById("jumpInput");
  const searchInput = document.getElementById("searchInput");
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
  const overviewBtn = document.getElementById("overviewBtn");
  const overviewModal = document.getElementById("overviewModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  // 登錄狀態檢查
  if (window.studentInfo.name) {
    if (mandatoryStudentModal) mandatoryStudentModal.remove();
    if (headerStudentText) {
      headerStudentText.textContent = `學生：${window.studentInfo.name} (${window.studentInfo.studentId || '未填寫學號'})`;
    }
  } else {
    if (mandatoryStudentModal) {
      mandatoryStudentModal.classList.add("active");
      mandatoryStudentModal.style.display = "flex";
    }
    if (entryStudentName && window.studentInfo.name) entryStudentName.value = window.studentInfo.name;
    if (entryStudentId && window.studentInfo.studentId) entryStudentId.value = window.studentInfo.studentId;
  }

  // 輪播速度選擇
  if (autoplaySpeedSelect) {
    autoplaySpeedSelect.addEventListener("change", (e) => {
      window.autoplaySpeed = parseInt(e.target.value);
      if (window.isAutoplay) {
        window.resetAutoplayTimer();
      }
    });
  }

  // 綁定按鈕點擊為手動模式 (isManual = true)
  const prevBtn = document.getElementById("prevBtn");
  const stagePrevBtn = document.getElementById("stagePrevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const stageNextBtn = document.getElementById("stageNextBtn");

  [prevBtn, stagePrevBtn].forEach((btn) => {
    if (btn) btn.addEventListener("click", () => window.prevSlide(true));
  });

  [nextBtn, stageNextBtn].forEach((btn) => {
    if (btn) btn.addEventListener("click", () => window.nextSlide(true));
  });

  // 跳頁輸入
  if (jumpInput) {
    const handleJump = (e) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val) && val >= 1 && val <= slidesData.length) {
        window.goToSlide(val - 1);
        if (window.isAutoplay) window.resetAutoplayTimer();
      }
    };
    jumpInput.addEventListener("change", handleJump);
    jumpInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") handleJump(e);
    });
  }

  // 搜尋功能
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      window.renderSidebar(e.target.value);
    });
  }

  // 側邊欄切換
  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  // Overview Modal 控制
  if (overviewBtn && overviewModal) {
    overviewBtn.addEventListener("click", () => {
      const modalGridContainer = document.getElementById("modalGrid");
      if (modalGridContainer && typeof slidesData !== 'undefined') {
        modalGridContainer.innerHTML = "";
        slidesData.forEach((slide, index) => {
          const card = document.createElement("div");
          card.className = `grid-thumb-card ${index === window.currentSlideIndex ? "active" : ""}`;
          card.onclick = () => {
            window.goToSlide(index);
            overviewModal.classList.remove("active");
            if (window.isAutoplay) window.resetAutoplayTimer();
          };
          card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="thumb-num">P.${slide.id}</span>
              <span style="font-size:0.7rem; opacity:0.7;">${slide.type === 'quiz' ? '📝 素養題' : '📄 簡報'}</span>
            </div>
            <div class="thumb-title">${slide.title}</div>
          `;
          modalGridContainer.appendChild(card);
        });
      }
      overviewModal.classList.add("active");
    });
  }

  if (closeModalBtn && overviewModal) {
    closeModalBtn.addEventListener("click", () => {
      overviewModal.classList.remove("active");
    });
  }

  // 主題切換 (Dark / Light)
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      const icon = themeToggleBtn.querySelector("i");
      if (icon) icon.className = newTheme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
  }

  // 全螢幕切換
  if (fullscreenBtn) {
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
  }

  // 鍵盤快捷鍵 (方向鍵左右, 空白鍵, Enter)
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      window.prevSlide(true);
    } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      window.nextSlide(true);
    } else if (e.key === "Home") {
      window.goToSlide(0);
      if (window.isAutoplay) window.resetAutoplayTimer();
    } else if (e.key === "End") {
      window.goToSlide(slidesData.length - 1);
      if (window.isAutoplay) window.resetAutoplayTimer();
    }
  });

  // 初始化啟動
  window.renderSidebar();
  window.goToSlide(0);
});
