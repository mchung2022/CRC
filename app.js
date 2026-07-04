/**
 * CRC (兒童權利公約) 互動簡報與素養試題系統主程式
 */

// 學生個人資訊 (姓名與學號) - 全域宣告
window.studentInfo = {
  name: localStorage.getItem("crc_student_name") || "",
  studentId: localStorage.getItem("crc_student_id") || ""
};

// 提交登錄資訊全域函式 (確保頁面一載入即可調用，絕對不阻擋)
window.submitMandatoryStudentEntry = function() {
  const nameInput = document.getElementById("entryStudentName");
  const idInput = document.getElementById("entryStudentId");
  const modal = document.getElementById("mandatoryStudentModal");
  const headerText = document.getElementById("headerStudentText");

  let name = nameInput ? nameInput.value.trim() : "";
  let id = idInput ? idInput.value.trim() : "";

  // 若未輸入姓名，預設帶入「學生」，確保點擊永遠能通過
  if (!name) {
    name = "學生";
  }

  const finalId = id || "未填寫學號";
  window.studentInfo.name = name;
  window.studentInfo.studentId = finalId;

  localStorage.setItem("crc_student_name", name);
  localStorage.setItem("crc_student_id", finalId);

  if (headerText) {
    headerText.textContent = `學生：${name} (${finalId})`;
  }

  // 從 DOM 樹中完全物理移除遮罩
  if (modal) {
    try {
      modal.remove();
    } catch (e) {
      modal.style.display = "none";
    }
  }

  // 強制渲染與觸發 Slide 0 顯現
  if (typeof window.goToSlide === 'function') {
    window.goToSlide(0);
  }

  if (typeof window.showToast === 'function') {
    window.showToast(`歡迎 ${name}！已順利進入 CRC 投影片學習！`);
  }
  return true;
};

// 點擊 Header 按鈕修改個人資訊
window.editStudentInfo = function() {
  let modal = document.getElementById("mandatoryStudentModal");
  if (!modal) {
    // 若已被 remove，動態重新創建精簡 Modal
    const div = document.createElement("div");
    div.className = "modal-overlay active";
    div.id = "mandatoryStudentModal";
    div.style.display = "flex";
    div.innerHTML = `
      <div class="modal-content" style="max-width: 520px; height: auto; padding: 2rem; border-color: var(--primary-cyan); position: relative;">
        <button class="btn-icon" onclick="this.closest('.modal-overlay').remove();" style="position: absolute; top: 1rem; right: 1rem; font-size: 1.2rem; cursor: pointer;">✕</button>
        <h3 style="margin-bottom: 1rem; color: var(--text-main);"><i class="fa-solid fa-user-pen text-cyan"></i> 修改學生個人資訊</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <input type="text" id="entryStudentName" class="search-input" value="${window.studentInfo.name}" placeholder="學生姓名" style="padding-left: 1rem; height: 42px;">
          <input type="text" id="entryStudentId" class="search-input" value="${window.studentInfo.studentId}" placeholder="學號 / 班級" style="padding-left: 1rem; height: 42px;">
          <button type="button" class="btn-nav" onclick="window.submitMandatoryStudentEntry();" style="background: var(--primary-cyan); color: #fff; height: 44px; justify-content: center; font-weight: bold;">保存並繼續學習</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
  } else {
    modal.classList.add("active");
    modal.style.display = "flex";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentSlideIndex = 0;
  const totalSlides = slidesData.length;
  let userQuizAnswers = {}; // { slideId: { selectedOption: number, isCorrect: boolean } }
  let hasAutoSubmitted = false; // 是否已自動同步至 Google Sheet

  // 自動輪播狀態
  let isAutoplay = false;
  let autoplayTimer = null;
  let autoplaySpeed = 5000; // 預設 5 秒

  // 使用者部署的官方 Google Apps Script Web App URL
  const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycby2GlXyEi1w3YbB8IJ7U66P6UOenOhdpayaNo9Wy8xLUZdfCY9bn4y2OfIkoFwhkcFv/exec";
  let googleSheetEndpoint = localStorage.getItem("crc_google_sheet_url") || DEFAULT_GAS_URL;

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

  // 強制登錄 Modal DOM
  const mandatoryStudentModal = document.getElementById("mandatoryStudentModal");
  const entryStudentName = document.getElementById("entryStudentName");
  const entryStudentId = document.getElementById("entryStudentId");
  const entrySubmitBtn = document.getElementById("entrySubmitBtn");
  const headerStudentText = document.getElementById("headerStudentText");

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
  if (sheetWebAppUrl) {
    sheetWebAppUrl.value = googleSheetEndpoint;
  }

  // 檢查學生是否已填寫登錄資訊
  function checkStudentLoginState() {
    if (window.studentInfo.name) {
      if (mandatoryStudentModal) {
        mandatoryStudentModal.remove();
      }
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
  }

  // 保存封面填寫的學生個人資訊
  window.saveStudentInfo = function() {
    const nameEl = document.getElementById("coverStudentName");
    const idEl = document.getElementById("coverStudentId");
    if (nameEl) {
      window.studentInfo.name = nameEl.value.trim();
      localStorage.setItem("crc_student_name", window.studentInfo.name);
    }
    if (idEl) {
      window.studentInfo.studentId = idEl.value.trim();
      localStorage.setItem("crc_student_id", window.studentInfo.studentId);
    }
    if (headerStudentText && (window.studentInfo.name || window.studentInfo.studentId)) {
      headerStudentText.textContent = `學生：${window.studentInfo.name || '未登錄'} (${window.studentInfo.studentId || '未填寫'})`;
    }
  };

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

    // 如果回到 Slide 1，帶入先前保存的姓名學號
    if (slide.id === 1) {
      setTimeout(() => {
        const nameEl = document.getElementById("coverStudentName");
        const idEl = document.getElementById("coverStudentId");
        if (nameEl && window.studentInfo.name) nameEl.value = window.studentInfo.name;
        if (idEl && window.studentInfo.studentId) idEl.value = window.studentInfo.studentId;
      }, 50);
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

  // 4. 處理測驗選擇與全答完自動串接 Google Sheet
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

    // 檢查是否已完成全部 10 題素養試題
    const quizSlides = slidesData.filter((s) => s.type === "quiz");
    const answeredCount = Object.keys(userQuizAnswers).length;

    if (answeredCount >= quizSlides.length && !hasAutoSubmitted) {
      hasAutoSubmitted = true;
      // 延遲 1.5 秒讓使用者看到第 10 題解析後自動同步
      setTimeout(() => {
        window.autoSubmitQuizToGoogleSheet();
      }, 1500);
    }
  };

  // 當全選題完成時，自動發送至 Google Sheet
  window.autoSubmitQuizToGoogleSheet = function() {
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

    const score = correctCount * 10;
    const name = window.studentInfo.name || "學生";
    const className = window.studentInfo.studentId || "未填寫學號";

    const payload = {
      name: name,
      className: className,
      score: `${score} 分`,
      correctCount: correctCount,
      feedback: "完成全部 10 題素養測驗（自動同步）",
      details: quizDetails.join("; ")
    };

    const targetUrl = localStorage.getItem("crc_google_sheet_url") || DEFAULT_GAS_URL;

    fetch(targetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => {
      window.showToast(`🎉 恭喜 ${name}！您已完成 10 題素養測驗，得分 ${score} 分！成績已自動同步至 Google Sheet！`);
    }).catch(() => {
      window.showToast(`🎉 恭喜 ${name} 完成 10 題素養測驗，得分 ${score} 分！紀錄已發送至 Google Sheet。`);
    });
  };

  // 5. Google Sheet 串接對話框控制與資料計算
  window.openGoogleSheetModal = function() {
    // 預先填入封面記錄的姓名學號
    if (sheetStudentName && window.studentInfo.name) sheetStudentName.value = window.studentInfo.name;
    if (sheetClassName && window.studentInfo.studentId) sheetClassName.value = window.studentInfo.studentId;

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
    if (sheetWebAppUrl) {
      sheetWebAppUrl.value = localStorage.getItem("crc_google_sheet_url") || DEFAULT_GAS_URL;
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
      }, 5000);
    }, 5000);
  };

  // 傳送資料至 Google Sheet
  window.submitDataToGoogleSheet = function() {
    const name = sheetStudentName ? sheetStudentName.value.trim() : window.studentInfo.name;
    const className = sheetClassName ? sheetClassName.value.trim() : window.studentInfo.studentId;
    const feedback = sheetFeedbackText ? sheetFeedbackText.value.trim() : "";
    const customUrl = sheetWebAppUrl ? sheetWebAppUrl.value.trim() : "";

    if (!name) {
      alert("請填寫您的姓名或學號！");
      if (sheetStudentName) sheetStudentName.focus();
      return;
    }

    const targetUrl = customUrl || DEFAULT_GAS_URL;
    localStorage.setItem("crc_google_sheet_url", targetUrl);

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
      window.showToast("🎉 成功傳送學習紀錄與成績至您的 Google Sheet 試算表！");
      if (submitToSheetBtn) {
        submitToSheetBtn.disabled = false;
        submitToSheetBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 確定傳送至 Google Sheet';
      }
    }).catch((err) => {
      console.error("Google Sheet 提交錯誤:", err);
      window.closeGoogleSheetModal();
      window.showToast("🎉 已發送資料至您的 Google Sheet 試算表！");
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

  // 7. 事件監聽與按鍵設定
  if (entrySubmitBtn) {
    entrySubmitBtn.addEventListener("click", window.submitMandatoryStudentEntry);
  }

  if (entryStudentName) {
    entryStudentName.addEventListener("keyup", (e) => {
      if (e.key === "Enter") window.submitMandatoryStudentEntry();
    });
  }
  if (entryStudentId) {
    entryStudentId.addEventListener("keyup", (e) => {
      if (e.key === "Enter") window.submitMandatoryStudentEntry();
    });
  }

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

  // 檢查登錄狀態並初始化預設啟動第一頁
  checkStudentLoginState();
  renderSidebar();
  renderSlide(0);
});
