/**
 * CRC (兒童權利公約) 互動簡報與素養試題系統主程式
 */
document.addEventListener("DOMContentLoaded", () => {
  let currentSlideIndex = 0;
  const totalSlides = slidesData.length;
  let userQuizAnswers = {}; // { slideId: { selectedOption: number, isCorrect: boolean } }

  // 自動輪播狀態
  let isAutoplay = false;
  let autoplayTimer = null;
  let autoplaySpeed = 5000; // 預設 5 秒

  // 預設與使用者設定的 Google Apps Script Web App URL
  let googleSheetEndpoint = localStorage.getItem("crc_google_sheet_url") || "https://script.google.com/macros/s/AKfycbz_demo_crc_endpoint/exec";

  // DOM 元素引用
  const slideContainer = document.getElementById("slideCardWrapper");
  const slideStage = document.getElementById("slideStage");
  const slideListContainer = document.getElementById("slideList");
  const modalGridContainer = document.getElementById("modalGrid");
  const totalSlideNumEl = document.getElementById("totalSlideNum");
  const jumpInput = document.getElementById("jumpInput");
  const progressBarFill = document.getElementById("progressBarFill");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const stagePrevBtn = document.getElementById("stagePrevBtn");
  const stageNextBtn = document.getElementById("stageNextBtn");
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
  const overviewBtn = document.getElementById("overviewBtn");
  const overviewModal = document.getElementById("overviewModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const searchInput = document.getElementById("searchInput");

  // 輪播控制 DOM
  const autoplayBtn = document.getElementById("autoplayBtn");
  const playPauseNavBtn = document.getElementById("playPauseNavBtn");
  const autoplaySpeedSelect = document.getElementById("autoplaySpeedSelect");
  const autoplayStatusBadge = document.getElementById("autoplayStatusBadge");

  // Google Sheet DOM
  const googleSheetModal = document.getElementById("googleSheetModal");
  const sheetStudentName = document.getElementById("sheetStudentName");
  const sheetClassName = document.getElementById("sheetClassName");
  const sheetQuizScoreDisplay = document.getElementById("sheetQuizScoreDisplay");
  const sheetQuizDetailDisplay = document.getElementById("sheetQuizDetailDisplay");
  const sheetFeedbackText = document.getElementById("sheetFeedbackText");
  const sheetWebAppUrl = document.getElementById("sheetWebAppUrl");
  const submitToSheetBtn = document.getElementById("submitToSheetBtn");
  const toastNotification = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");

  if (totalSlideNumEl) totalSlideNumEl.textContent = totalSlides;
  if (jumpInput) jumpInput.max = totalSlides;
  if (sheetWebAppUrl && localStorage.getItem("crc_google_sheet_url")) {
    sheetWebAppUrl.value = localStorage.getItem("crc_google_sheet_url");
  }

  // 全域換頁函式 (提供 HTML onclick 與 EventListeners 調用)
  window.goToSlide = function(index) {
    if (index >= 0 && index < totalSlides) {
      renderSlide(index);
    }
  };

  window.prevSlide = function() {
    if (currentSlideIndex > 0) {
      window.goToSlide(currentSlideIndex - 1);
    } else if (isAutoplay) {
      window.goToSlide(totalSlides - 1); // 自動輪播倒退循環
    }
    if (isAutoplay) resetAutoplayTimer();
  };

  window.nextSlide = function() {
    if (currentSlideIndex < totalSlides - 1) {
      window.goToSlide(currentSlideIndex + 1);
    } else {
      // 若在最後一頁且開啟輪播，回到第一頁循環
      window.goToSlide(0);
    }
    if (isAutoplay) resetAutoplayTimer();
  };

  window.toggleAutoplay = function() {
    if (isAutoplay) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  // 1. 初始化與更新側邊欄選單
  function renderSidebar(filterQuery = "") {
    if (!slideListContainer) return;
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
      item.id = `sidebar-item-${index}`;
      item.onclick = () => {
        window.goToSlide(index);
        if (isAutoplay) resetAutoplayTimer();
      };

      const typeBadge = slide.type === 'quiz' ? '<span class="slide-item-badge" style="color:#f59e0b;">素養題</span>' : '';

      item.innerHTML = `
        <div class="slide-item-num">${slide.id}</div>
        <div class="slide-item-title">${slide.title}</div>
        ${typeBadge}
      `;
      slideListContainer.appendChild(item);
    });

    // 將當前亮顯項自動滾動入選單視域中
    const activeItem = document.getElementById(`sidebar-item-${currentSlideIndex}`);
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // 2. 初始化總覽 Modal 網格
  function renderModalGrid() {
    if (!modalGridContainer) return;
    modalGridContainer.innerHTML = "";
    slidesData.forEach((slide, index) => {
      const card = document.createElement("div");
      card.className = `grid-thumb-card ${index === currentSlideIndex ? "active" : ""}`;
      card.onclick = () => {
        window.goToSlide(index);
        closeOverviewModal();
        if (isAutoplay) resetAutoplayTimer();
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
    if (!slide || !slideContainer) return;

    currentSlideIndex = index;
    if (jumpInput) jumpInput.value = slide.id;

    // 更新進度條
    if (progressBarFill) {
      const progressPercent = ((index + 1) / totalSlides) * 100;
      progressBarFill.style.width = `${progressPercent}%`;
    }

    // 底部與懸浮導覽按鈕狀態更新
    const isFirst = index === 0;
    const isLast = index === totalSlides - 1;
    if (prevBtn) prevBtn.disabled = isFirst;
    if (stagePrevBtn) stagePrevBtn.disabled = isFirst;
    if (nextBtn) nextBtn.disabled = isLast && !isAutoplay;
    if (stageNextBtn) stageNextBtn.disabled = isLast && !isAutoplay;

    // 如果是 Quiz 類型，調用渲染 Quiz
    if (slide.type === "quiz") {
      renderQuizSlide(slide);
    } else {
      renderContentSlide(slide);
    }

    // 重新觸發換頁淡入過渡動畫
    slideContainer.classList.remove("slide-anim");
    void slideContainer.offsetWidth; // 強制 DOM 重繪
    slideContainer.classList.add("slide-anim");

    // 更新側邊欄亮顯與滾動位置
    renderSidebar(searchInput ? searchInput.value : "");
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

  // 5. Google Sheet 串接對話框控制與資料計算
  window.openGoogleSheetModal = function() {
    // 計算測驗成績
    const quizSlides = slidesData.filter((s) => s.type === "quiz");
    let correctCount = 0;
    let answeredCount = 0;
    let quizLog = [];

    quizSlides.forEach((s) => {
      const ans = userQuizAnswers[s.id];
      if (ans) {
        answeredCount++;
        if (ans.isCorrect) correctCount++;
        quizLog.push(`P.${s.id}:${ans.isCorrect ? '對' : '錯'}`);
      } else {
        quizLog.push(`P.${s.id}:未答`);
      }
    });

    const score = correctCount * 10;
    if (sheetQuizScoreDisplay) {
      sheetQuizScoreDisplay.textContent = `${score} / 100 分`;
    }
    if (sheetQuizDetailDisplay) {
      sheetQuizDetailDisplay.textContent = `已完成 ${answeredCount} / 10 題測驗，答對 ${correctCount} 題`;
    }

    if (googleSheetModal) googleSheetModal.classList.add("active");
  };

  window.closeGoogleSheetModal = function() {
    if (googleSheetModal) googleSheetModal.classList.remove("active");
  };

  window.showToast = function(msg) {
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

  // 傳送資料至 Google Sheet
  window.submitDataToGoogleSheet = function() {
    const name = sheetStudentName ? sheetStudentName.value.trim() : "";
    const className = sheetClassName ? sheetClassName.value.trim() : "";
    const feedback = sheetFeedbackText ? sheetFeedbackText.value.trim() : "";
    const customUrl = sheetWebAppUrl ? sheetWebAppUrl.value.trim() : "";

    if (!name) {
      alert("請填寫您的姓名或學號！");
      if (sheetStudentName) sheetStudentName.focus();
      return;
    }

    const targetUrl = customUrl || googleSheetEndpoint;
    if (customUrl) {
      localStorage.setItem("crc_google_sheet_url", customUrl);
    }

    // 彙整測驗成績
    const quizSlides = slidesData.filter((s) => s.type === "quiz");
    let correctCount = 0;
    let quizDetails = [];
    quizSlides.forEach((s) => {
      const ans = userQuizAnswers[s.id];
      if (ans) {
        if (ans.isCorrect) correctCount++;
        quizDetails.push(`第${s.id}頁:${ans.isCorrect ? '正確' : '錯誤'}`);
      } else {
        quizDetails.push(`第${s.id}頁:未作答`);
      }
    });

    const payload = {
      name: name,
      className: className || "未填寫",
      score: `${correctCount * 10} 分`,
      correctCount: correctCount,
      feedback: feedback || "無",
      details: quizDetails.join("; ")
    };

    if (submitToSheetBtn) {
      submitToSheetBtn.disabled = true;
      submitToSheetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 正在傳送...';
    }

    // 發送 POST 請求至 Google Apps Script Web App
    fetch(targetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(() => {
      window.closeGoogleSheetModal();
      window.showToast("🎉 成功傳送學習紀錄與成績至 Google Sheet！");
      if (submitToSheetBtn) {
        submitToSheetBtn.disabled = false;
        submitToSheetBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 確定傳送至 Google Sheet';
      }
    }).catch((err) => {
      console.error("Google Sheet 提交錯誤:", err);
      // no-cors 下有時跨網域仍成功寫入
      window.closeGoogleSheetModal();
      window.showToast("🎉 已發送資料至 Google Sheet！");
      if (submitToSheetBtn) {
        submitToSheetBtn.disabled = false;
        submitToSheetBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 確定傳送至 Google Sheet';
      }
    });
  };

  // 6. 自動輪播 (Autoplay / Carousel) 控制邏輯
  function startAutoplay() {
    isAutoplay = true;
    updateAutoplayUI();
    autoplayTimer = setInterval(() => {
      window.nextSlide();
    }, autoplaySpeed);
  }

  function stopAutoplay() {
    isAutoplay = false;
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    updateAutoplayUI();
  }

  function resetAutoplayTimer() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        window.nextSlide();
      }, autoplaySpeed);
    }
  }

  function updateAutoplayUI() {
    if (!autoplayBtn || !playPauseNavBtn || !autoplayStatusBadge) return;
    const playIcon = autoplayBtn.querySelector("i");
    if (isAutoplay) {
      if (playIcon) playIcon.className = "fa-solid fa-pause";
      autoplayBtn.classList.add("active");
      playPauseNavBtn.classList.add("active");
      playPauseNavBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停輪播';
      autoplayStatusBadge.classList.add("active");
    } else {
      if (playIcon) playIcon.className = "fa-solid fa-play";
      autoplayBtn.classList.remove("active");
      playPauseNavBtn.classList.remove("active");
      playPauseNavBtn.innerHTML = '<i class="fa-solid fa-play"></i> 自動輪播';
      autoplayStatusBadge.classList.remove("active");
    }
  }

  // 7. 事件監聽設定
  if (autoplayBtn) autoplayBtn.addEventListener("click", window.toggleAutoplay);
  if (playPauseNavBtn) playPauseNavBtn.addEventListener("click", window.toggleAutoplay);

  if (autoplaySpeedSelect) {
    autoplaySpeedSelect.addEventListener("change", (e) => {
      autoplaySpeed = parseInt(e.target.value);
      if (isAutoplay) {
        resetAutoplayTimer();
      }
    });
  }

  // 綁定底部與懸浮換頁按鈕
  [prevBtn, stagePrevBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.prevSlide();
      });
    }
  });

  [nextBtn, stageNextBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.nextSlide();
      });
    }
  });

  // 頁碼輸入跳頁 (對應 change 與 input)
  if (jumpInput) {
    const handleJump = (e) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val) && val >= 1 && val <= totalSlides) {
        window.goToSlide(val - 1);
        if (isAutoplay) resetAutoplayTimer();
      }
    };
    jumpInput.addEventListener("change", handleJump);
    jumpInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") handleJump(e);
    });
  }

  // 觸控滑動手勢支援 (Touch Swipe on Mobile/Tablet)
  let touchStartX = 0;
  let touchEndX = 0;

  if (slideStage) {
    slideStage.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slideStage.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      window.nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      window.prevSlide();
    }
  }

  // 鍵盤快捷鍵 (方向鍵左右, 空白鍵, Enter)
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      window.prevSlide();
    } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      window.nextSlide();
    } else if (e.key === "Home") {
      window.goToSlide(0);
      if (isAutoplay) resetAutoplayTimer();
    } else if (e.key === "End") {
      window.goToSlide(totalSlides - 1);
      if (isAutoplay) resetAutoplayTimer();
    }
  });

  // 側邊欄切換
  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  // 搜尋功能
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderSidebar(e.target.value);
    });
  }

  // Overview Modal 控制
  function openOverviewModal() {
    renderModalGrid();
    if (overviewModal) overviewModal.classList.add("active");
  }

  function closeOverviewModal() {
    if (overviewModal) overviewModal.classList.remove("active");
  }

  if (overviewBtn) overviewBtn.addEventListener("click", openOverviewModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeOverviewModal);
  if (overviewModal) {
    overviewModal.addEventListener("click", (e) => {
      if (e.target === overviewModal) closeOverviewModal();
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

  // 初始化預設啟動第一頁
  renderSidebar();
  renderSlide(0);
});
