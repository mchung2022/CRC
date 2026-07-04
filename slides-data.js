/**
 * CRC (兒童權利公約) 50 頁簡報與素養題目資料庫
 */
const slidesData = [
  // ==========================================
  // PART 1: 概述與核心精神 (1 - 7)
  // ==========================================
  {
    id: 1,
    category: "PART 1: 概述與核心精神",
    tag: "簡報封面與學生登錄",
    title: "兒童權利公約 (CRC) 簡介與素養實踐",
    subtitle: "Convention on the Rights of the Child - 50頁互動教學與情境思辨簡報",
    icon: "fa-book-open-reader",
    type: "cover",
    content: `
      <div class="cover-hero">
        <div class="badge-pill"><i class="fa-solid fa-shield-halved"></i> 人權教育與素養實踐</div>
        <h1 class="cover-title">兒童權利公約 <span class="highlight">CRC</span> 深度導覽</h1>
        <p class="cover-description">從「慈善保護對象」到「獨立權利主體」的範式轉移 | 完整 50 頁主題簡報與 10 大素養試題</p>
        
        <!-- 學生姓名與學號填報登錄卡片 -->
        <div class="student-login-card">
          <div class="sl-card-title"><i class="fa-solid fa-user-pen text-cyan"></i> 請先登記您的姓名與學號（測驗完成將自動同步至 Google Sheet）</div>
          <div class="sl-input-group">
            <div class="sl-field">
              <label for="coverStudentName"><i class="fa-solid fa-user"></i> 學生姓名：</label>
              <input type="text" id="coverStudentName" class="search-input" placeholder="例如：張小明" onchange="window.saveStudentInfo()" oninput="window.saveStudentInfo()">
            </div>
            <div class="sl-field">
              <label for="coverStudentId"><i class="fa-solid fa-id-card"></i> 學號 / 班級：</label>
              <input type="text" id="coverStudentId" class="search-input" placeholder="例如：高一乙班 / 112005" onchange="window.saveStudentInfo()" oninput="window.saveStudentInfo()">
            </div>
          </div>
          <div class="sl-status-text" id="studentLoginStatus">
            <i class="fa-solid fa-circle-check text-green"></i> 資訊填寫後，完成 10 題素養試題系統將自動將成績與答題紀錄同步至 Google 試算表。
          </div>
        </div>

        <div class="cover-stats" style="margin-top: 1.5rem;">
          <div class="stat-card">
            <span class="stat-num">1989</span>
            <span class="stat-label">聯合國通過年份</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">54</span>
            <span class="stat-label">條文總數</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">4</span>
            <span class="stat-label">核心原則 (4Ps)</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">10</span>
            <span class="stat-label">素養情境實作題</span>
          </div>
        </div>
        <div class="cover-footer">
          <span><i class="fa-solid fa-user"></i> 簡報製作：mchung2022</span>
          <span><i class="fa-solid fa-graduation-cap"></i> 適用對象：國高中公民與社會科、教職員研習、兒少權利宣導</span>
        </div>
      </div>
    `
  },
  {
    id: 2,
    category: "PART 1: 概述與核心精神",
    tag: "導覽與學習目標",
    title: "導覽目錄與學習目標",
    subtitle: "掌握 CRC 核心架構與素養導向思考歷程",
    icon: "fa-list-check",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-sitemap"></i> 簡報四大核心模組</h3>
          <ul class="styled-list">
            <li><strong>一、概述與核心精神 (1-7 頁)：</strong>起源、台灣國內法化、四大原則總覽。</li>
            <li><strong>二、四大基本原則深度解析 (8-15 頁)：</strong>不歧視、最佳利益、生存發展、表意權。</li>
            <li><strong>三、4Ps 權利分類與主題 (16-27 頁)：</strong>生存、發展、保護、參與權利範疇。</li>
            <li><strong>四、迷思破除與國際趨勢 (28-34 頁)：</strong>任擇議定書、正向管教、數位權利。</li>
            <li><strong>五、素養情境評量與實踐 (35-50 頁)：</strong>10 題校園/家庭真實案例選擇題與深度解析。</li>
          </ul>
        </div>
        <div class="info-card highlight-box">
          <h3><i class="fa-solid fa-bullseye"></i> 三維素養學習目標</h3>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-brain"></i></div>
            <div>
              <strong>認知 (Knowledge)：</strong>理解 CRC 的 4 大原則、4Ps 分類與台灣《CRC 施行法》架構。
            </div>
          </div>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-scale-balanced"></i></div>
            <div>
              <strong>態度 (Attitude)：</strong>樹立「兒少為獨立權利主體」理念，尊重兒少主體性與多元表意。
            </div>
          </div>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-handshake-angle"></i></div>
            <div>
              <strong>技能與行動 (Action)：</strong>運用 CRC 原則分析校園與日常情境，進行理性的權利衡平思考。
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 3,
    category: "PART 1: 概述與核心精神",
    tag: "背景與歷史",
    title: "什麼是 CRC？歷史背景與國際地位",
    subtitle: "世界上簽署國家最多、權利涵蓋最廣的人權條約",
    icon: "fa-globe",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-landmark"></i> 發展歷史里程碑</h3>
          <div class="timeline">
            <div class="tl-item">
              <span class="tl-date">1924 年</span>
              <div class="tl-content">國際聯盟通過《日內瓦兒童權利宣言》，首次提出兒童保護。</div>
            </div>
            <div class="tl-item">
              <span class="tl-date">1959 年</span>
              <div class="tl-content">聯合國通過《兒童權利宣言》，擴大權利保障範疇。</div>
            </div>
            <div class="tl-item active">
              <span class="tl-date">1989 年 11 月 20 日</span>
              <div class="tl-content">聯合國大會一致通過《兒童權利公約》(CRC)，具法律約束力。</div>
            </div>
            <div class="tl-item">
              <span class="tl-date">1990 年 9 月 2 日</span>
              <div class="tl-content">正式生效，每年 11 月 20 日訂為「世界兒童人權日」。</div>
            </div>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-star"></i> CRC 的三大特點</h3>
          <div class="feature-card">
            <i class="fa-solid fa-hand-holding-heart text-cyan"></i>
            <div>
              <strong>普世適用性 (Universal)</strong>
              <p>適用於全球未滿 18 歲的所有兒童與少年，不因性別、種族、身分而異。</p>
            </div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-scale-unbalanced-flip text-purple"></i>
            <div>
              <strong>權利完整性 (Comprehensive)</strong>
              <p>包含公民、政治、經濟、社會與文化權，為首部結合完整權利類型的國際公約。</p>
            </div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-gavel text-amber"></i>
            <div>
              <strong>國家義務性 (Binding)</strong>
              <p>締約國必須修法落實，並定期提交「國家報告」接受聯合國委員會審查。</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 4,
    category: "PART 1: 概述與核心精神",
    tag: "觀念轉變",
    title: "為什麼兒童需要專屬的權利公約？",
    subtitle: "從「被動慈善對象」轉變為「獨立權利主體」",
    icon: "fa-shuffle",
    type: "content",
    content: `
      <div class="comparison-table">
        <div class="comp-col old-view">
          <div class="comp-header"><i class="fa-solid fa-ghost"></i> 傳統視角：被動接受者</div>
          <ul class="comp-list">
            <li>認為兒童是父母的附屬品或財產。</li>
            <li>僅將兒童視為「脆弱需要受保護」的人。</li>
            <li>決策全然由大人主導，「大人都是為了你好」。</li>
            <li>忽視兒童自身的表達意願與自主能力。</li>
          </ul>
        </div>
        <div class="comp-vs">VS</div>
        <div class="comp-col new-view">
          <div class="comp-header"><i class="fa-solid fa-crown"></i> CRC 視角：獨立權利主體</div>
          <ul class="comp-list">
            <li>兒童是擁有獨立人格與權利的人。</li>
            <li>兼具「需要保護」與「主動參與」的雙重角色。</li>
            <li>決策應貫徹「兒童最佳利益」並聆聽其意見。</li>
            <li>隨年齡與成熟度遞增，賦予漸進式自主權。</li>
          </ul>
        </div>
      </div>
      <div class="quote-box">
        <i class="fa-solid fa-quote-left"></i>
        <span>「兒童並非尚未長大的人，他們現在就是完整的人。」—— 柯札克 (Janusz Korczak, 兒童權利之父)</span>
      </div>
    `
  },
  {
    id: 5,
    category: "PART 1: 概述與核心精神",
    tag: "台灣實踐",
    title: "CRC 在台灣的發展與國內法化",
    subtitle: "2014年通過《兒童權利公約施行法》，與國際人權接軌",
    icon: "fa-flag-usa",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-gavel"></i> 《CRC 施行法》三大亮點</h3>
          <div class="key-point">
            <div class="kp-num">1</div>
            <div>
              <strong>國內法效力：</strong>
              <p>2014 年 6 月 4 日公布，11 月 20 日施行。規定 CRC 條文具有國內法律之效力。</p>
            </div>
          </div>
          <div class="key-point">
            <div class="kp-num">2</div>
            <div>
              <strong>法規檢討機制：</strong>
              <p>政府須檢討修正不符 CRC 的法律與行政措施（包含校規、家長懲戒權等）。</p>
            </div>
          </div>
          <div class="key-point">
            <div class="kp-num">3</div>
            <div>
              <strong>國際審查機制：</strong>
              <p>每 5 年提出國家報告，邀請聯合國國際專家來台定期審查並提出結論性意見。</p>
            </div>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-arrows-spin"></i> 台灣 CRC 檢閱重要里程碑</h3>
          <div class="stat-grid">
            <div class="mini-stat">
              <span class="ms-num">2017</span>
              <span class="ms-label">第一次國際審查</span>
            </div>
            <div class="mini-stat">
              <span class="ms-num">2022</span>
              <span class="ms-label">第二次國際審查</span>
            </div>
          </div>
          <p class="text-sm text-gray">國際專家提出包含：校園不當對待、正向管教、兒少心理健康、學生表意權落實及兒少自殺防治等重要改革建議。</p>
        </div>
      </div>
    `
  },
  {
    id: 6,
    category: "PART 1: 概述與核心精神",
    tag: "法規結構",
    title: "CRC 的核心結構與三大任擇議定書",
    subtitle: "條文總覽與深化保護的補充協議",
    icon: "fa-layer-group",
    type: "content",
    content: `
      <div class="grid-3col">
        <div class="info-card">
          <h3>第一部分 (第1-41條)</h3>
          <span class="badge">實體權利條文</span>
          <p>規定兒童應享有之各項人權（生存、發展、保護、參與）以及締約國的相應義務。</p>
        </div>
        <div class="info-card">
          <h3>第二部分 (第42-45條)</h3>
          <span class="badge">宣導與審查</span>
          <p>規定國家有宣導義務，並設立「聯合國兒童權利委員會」負責審查國家報告。</p>
        </div>
        <div class="info-card">
          <h3>第三部分 (第46-54條)</h3>
          <span class="badge">簽署與生效</span>
          <p>規定公約之批准、生效、批准書存放與修正程序等行政作業。</p>
        </div>
      </div>
      <div class="info-card highlight-box" style="margin-top: 1rem;">
        <h3><i class="fa-solid fa-file-contract"></i> 三大任擇議定書 (Optional Protocols)</h3>
        <div class="grid-3col">
          <div><strong>1. OPAC：</strong>禁止捲入武裝衝突 (防止童兵)</div>
          <div><strong>2. OPSC：</strong>禁止販賣兒童、兒童賣淫及兒童色情</div>
          <div><strong>3. OPIC：</strong>個人訴願程序 (兒少可直接向聯合國申訴)</div>
        </div>
      </div>
    `
  },
  {
    id: 7,
    category: "PART 1: 概述與核心精神",
    tag: "四大原則總覽",
    title: "CRC 四大基本原則心智圖",
    subtitle: "貫穿所有 54 條公約內容的四大靈魂支柱",
    icon: "fa-diagram-project",
    type: "content",
    content: `
      <div class="principles-grid">
        <div class="p-card border-blue">
          <div class="p-header"><i class="fa-solid fa-ban font-xl"></i></div>
          <h3>1. 禁止歧視原則</h3>
          <span class="p-article">第 2 條</span>
          <p>不因兒童或其父母之種族、膚色、性別、語言、宗教、身心障礙等而有任何歧視。</p>
        </div>
        <div class="p-card border-green">
          <div class="p-header"><i class="fa-solid fa-heart-circle-check font-xl"></i></div>
          <h3>2. 兒童最佳利益</h3>
          <span class="p-article">第 3 條</span>
          <p>所有關於兒童之行政、立法或司法行動，均應以兒童的最佳利益為首要考量。</p>
        </div>
        <div class="p-card border-purple">
          <div class="p-header"><i class="fa-solid fa-seedling font-xl"></i></div>
          <h3>3. 生命、生存及發展權</h3>
          <span class="p-article">第 6 條</span>
          <p>確認兒童有固有之生命權，國家應盡最大可能確保兒童之生存與身心發展。</p>
        </div>
        <div class="p-card border-amber">
          <div class="p-header"><i class="fa-solid fa-comments font-xl"></i></div>
          <h3>4. 尊重兒童意見 (表意權)</h3>
          <span class="p-article">第 12 條</span>
          <p>有表達意見能力的兒童，對影響其本身的一切事項，有權自由發表意見。</p>
        </div>
      </div>
    `
  },

  // ==========================================
  // PART 2: 四大基本原則深度解析 (8 - 15)
  // ==========================================
  {
    id: 8,
    category: "PART 2: 四大基本原則深度解析",
    tag: "基本原則一",
    title: "【原則一】禁止歧視原則 (Article 2)",
    subtitle: "人人平等，不讓任何一個孩子被落在後面",
    icon: "fa-scale-balanced",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-scroll"></i> 條文核心精神 (第2條)</h3>
          <p>締約國應尊重並確保公約所載之權利，適用於其管轄範圍內的每一個兒童，<strong>不因兒童或其父母、法定監護人之種族、膚色、性別、語言、宗教、政治或其他見解、民族或社會背景、財產、身心障礙、出生或其他身分而有任何差別對待。</strong></p>
          <div class="alert-box alert-warning">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>不只禁止直接歧視，也禁止間接歧視與結構性不平等！</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-list-check"></i> 實質平等的合理差別對待</h3>
          <p>「禁止歧視」不等於「給予完全相同的待遇」，而是要追求<strong>「實質平等」</strong>：</p>
          <ul class="styled-list">
            <li><strong>合理補償：</strong>對身心障礙兒童提供合理調整與輔具支援。</li>
            <li><strong>資源傾斜：</strong>對偏鄉、原住民或經濟弱勢兒少給予額外教育資源。</li>
            <li><strong>保護扶助：</strong>對新住民子女提供母語與文化適應學習協助。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 9,
    category: "PART 2: 四大基本原則深度解析",
    tag: "原則一實踐",
    title: "禁止歧視原則：校園與社會實踐",
    subtitle: "消除隱形偏見與建構友善包容校園",
    icon: "fa-school-flag",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-user-xmark"></i> 校園常見隱形歧視型態</h3>
          <div class="scenario-item">
            <strong>1. 成績或行為標籤：</strong>
            <p>將學生劃分「好學生/壞學生」，限制特定群體參加社團或校園活動。</p>
          </div>
          <div class="scenario-item">
            <strong>2. 身心狀況歧視：</strong>
            <p>以「維護班級秩序」為由，拒絕特教生參加校外教學或運動會。</p>
          </div>
          <div class="scenario-item">
            <strong>3. 性別偏見與刻板印象：</strong>
            <p>限制特定性別的髮型、服儀或體育選修課資格。</p>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-heart-pulse"></i> 具體改進行動指南</h3>
          <ul class="styled-list">
            <li><strong>無障礙通用設計：</strong>校園硬體與軟體活動皆落實通用設計與友善設施。</li>
            <li><strong>多樣性包容教育：</strong>將多元文化、性別平等與特殊教育包容納入課程。</li>
            <li><strong>零霸凌與公平檢核：</strong>定期檢視校規與懲處機制是否對特定群體造成不公平不利。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 10,
    category: "PART 2: 四大基本原則深度解析",
    tag: "基本原則二",
    title: "【原則二】兒童最佳利益原則 (Article 3)",
    subtitle: "所有涉及兒童的行動，均應以兒童最佳利益為首要考量",
    icon: "fa-hand-holding-heart",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-gavel"></i> 條文核心精神 (第3條)</h3>
          <p>在所有關於兒童的行動中，無論是由<strong>公私立社會福利機構、法院、行政機關或立法機關</strong>辦理，均應以<strong>兒童的最佳利益為首要考量 (Primary Consideration)</strong>。</p>
          <div class="concept-box" style="margin-top: 1rem;">
            <div class="concept-icon"><i class="fa-solid fa-scale-unbalanced"></i></div>
            <div>
              <strong>不是大人的方便，而是兒童的權益：</strong>
              <p>當大人權益（如父母利益、學校管理方便）與兒童權利發生衝突時，必須 prioritize 兒童的最佳利益。</p>
            </div>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-shapes"></i> 三重法律概念</h3>
          <div class="feature-card">
            <i class="fa-solid fa-1 text-cyan"></i>
            <div><strong>一項實體權利：</strong>兒童有權使最佳利益得到評估與優先考量。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-2 text-purple"></i>
            <div><strong>一項基本法律原則：</strong>法條解釋有岐義時，採最有利兒童之解釋。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-3 text-amber"></i>
            <div><strong>一套程序規則：</strong>決策過程必須書面說明如何評估兒童利益。</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 11,
    category: "PART 2: 四大基本原則深度解析",
    tag: "原則二衡量",
    title: "兒童最佳利益：如何客觀衡量？",
    subtitle: "聯合國第 14 號一般性意見書評估要素",
    icon: "fa-sliders",
    type: "content",
    content: `
      <p class="section-desc">「最佳利益」絕非大人憑空主觀認定，而是需經過以下多元面向綜合評估：</p>
      <div class="grid-3col">
        <div class="info-card">
          <h3><i class="fa-solid fa-comments"></i> 1. 兒童的意願與感受</h3>
          <p>尊重兒童自身的意見，評估其年齡與成熟度（不可忽略兒童聲音）。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-fingerprint"></i> 2. 身分與文化背景</h3>
          <p>維持兒童的身分認同、文化、語言、宗教背景與家庭關係脈絡。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-people-roof"></i> 3. 家庭環境與關係</h3>
          <p>維護家庭環境完整，盡可能維持與雙親之親密關係（除非遭遇虐待）。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-shield-cat"></i> 4. 安全與照護保護</h3>
          <p>評估安全威脅、身體與心理虐待風險，確保物理與心理安全。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-user-nurse"></i> 5. 健康與教育需求</h3>
          <p>保障醫療健康照顧、優質教育與良好的發展機會。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-clipboard-check"></i> 6. 程序保障與專業介入</h3>
          <p>由社工、心理師、兒少代表等跨專業團隊進行綜合評估。</p>
        </div>
      </div>
    `
  },
  {
    id: 12,
    category: "PART 2: 四大基本原則深度解析",
    tag: "基本原則三",
    title: "【原則三】生命、生存及發展權 (Article 6)",
    subtitle: "確認兒童固有的生命權，確保全人順利成長",
    icon: "fa-seedling",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-heart-pulse"></i> 條文核心精神 (第6條)</h3>
          <ol class="styled-list">
            <li>締約國確認每一兒童均有固有的生命權 (Inherent Right to Life)。</li>
            <li>締約國應盡最大可能確保兒童之<strong>生存 (Survival) 與發展 (Development)</strong>。</li>
          </ol>
          <div class="alert-box alert-success" style="margin-top: 1rem;">
            <i class="fa-solid fa-circle-check"></i>
            <span>生存不僅是「活著」，發展更是指「生理、心理、精神、道德與社會的健全成長」！</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-spa"></i> 「發展 (Development)」的全人涵義</h3>
          <div class="dev-dimensions">
            <div class="dev-box"><strong>生理發展：</strong>營養、疫苗、疾病防治、體能。</div>
            <div class="dev-box"><strong>心理發展：</strong>情緒穩定、安全感、自尊與心理健康。</div>
            <div class="dev-box"><strong>精神發展：</strong>道德感、價值觀、探索生命的權利。</div>
            <div class="dev-box"><strong>社會適應：</strong>人際關係、社會參與及公民能力。</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 13,
    category: "PART 2: 四大基本原則深度解析",
    tag: "原則三實踐",
    title: "生命生存與發展權：從基本生活到身心健全",
    subtitle: "健康照護、心理支持與遊戲權的綜合體現",
    icon: "fa-face-smile",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-kit-medical"></i> 當前台灣兒少發展權關鍵議題</h3>
          <div class="issue-box">
            <strong>1. 兒少心理健康危機：</strong>
            <p>課業壓力、同儕霸凌與網路焦慮上升，亟需校園心理輔導與三級預防資源。</p>
          </div>
          <div class="issue-box">
            <strong>2. 休息與休閒時間被擠壓：</strong>
            <p>補習與過度評量導致睡眠不足，違反第 31 條「遊戲與休息權」。</p>
          </div>
          <div class="issue-box">
            <strong>3. 兒童交通事故與安全環境：</strong>
            <p>通學步道安全、交通事故防範直接影響生存與身體健康權。</p>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-gamepad"></i> 遊戲是兒童發展的認真事業</h3>
          <p> CRC 第 31 條強調遊戲與休閒是兒童發展不可或缺的核心：</p>
          <ul class="styled-list">
            <li>促進大腦神經網絡發展與創造力。</li>
            <li>培養人際互動、談判與挫折忍受力。</li>
            <li>釋放情緒壓力，維持心理健康平衡。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 14,
    category: "PART 2: 四大基本原則深度解析",
    tag: "基本原則四",
    title: "【原則四】尊重兒童意見 / 表意權 (Article 12)",
    subtitle: "聆聽兒童的聲音，給予其年齡與成熟度應有的比重",
    icon: "fa-comments",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-bullhorn"></i> 條文核心精神 (第12條)</h3>
          <p>締約國應確保有形成自己見解能力的兒童，對<strong>影響其本身的一切事項</strong>，有自由發表意見的權利；<strong>對兒童的意見，應按其年齡及成熟程度予以適當的看待。</strong></p>
          <div class="alert-box alert-info" style="margin-top: 1rem;">
            <i class="fa-solid fa-lightbulb"></i>
            <span>表意權不是給兒童「最終決定權」，而是給予「參與討論與表達的機會」！</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-comments-dollar"></i> 表意權的五大核心要則</h3>
          <ul class="styled-list">
            <li><strong>透明與知情：</strong>提供兒童看得懂的資訊，使其能理解議題。</li>
            <li><strong>自願性：</strong>兒童有權表達，亦有權選擇不表達。</li>
            <li><strong>受尊重：</strong>認真對待兒童意見，不輕忽或嘲弄。</li>
            <li><strong>友善環境：</strong>提供安全、不受脅迫的表達空間。</li>
            <li><strong>回饋與回應：</strong>告知兒童決策結果與未採納意見的原因。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 15,
    category: "PART 2: 四大基本原則深度解析",
    tag: "原則四範疇",
    title: "表意權的階梯：從「被告知」到「共同決策」",
    subtitle: "兒少參與的五個層次 (Hart's Ladder of Participation)",
    icon: "fa-chart-line",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-stairs"></i> 兒少參與階梯圖</h3>
          <div class="ladder-container">
            <div class="ladder-step step-5"><strong>5. 兒少主導，大人協作：</strong>兒少發起提案，大人提供後勤與資源。</div>
            <div class="ladder-step step-4"><strong>4. 大人發起，兒少共同決策：</strong>雙方平等討論，共同達成共識。</div>
            <div class="ladder-step step-3"><strong>3. 諮詢與告知：</strong>大人徵詢兒少意見並給予反饋。</div>
            <div class="ladder-step step-2 warning-step"><strong>2. 象徵性參與 (Tokenism)：</strong>僅邀請兒少出席背書，無實質影響。</div>
            <div class="ladder-step step-1 danger-step"><strong>1. 操弄 (Manipulation)：</strong>大人利用兒少宣傳自己意志。</div>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-building-columns"></i> 校園實踐真實案例</h3>
          <div class="example-box">
            <strong>真參與案例：</strong>
            <p>學校修訂校規或服儀委員會時，確保學生代表佔適當比例，且學生意見在紀錄中具名回應並列入投票表決。</p>
          </div>
          <div class="example-box">
            <strong>假參與案例：</strong>
            <p>開會前結論已定，僅在會議中叫學生「發表感想」，最後完全未採納任何學生建議且未說明理由。</p>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // PART 3: CRC 權利四大分類 4Ps (16 - 27)
  // ==========================================
  {
    id: 16,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "4Ps 概觀",
    title: "CRC 權利四大分類 (4Ps 概觀)",
    subtitle: "生存權、發展權、受保護權、參與權的全方位保障",
    icon: "fa-shapes",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="p4-card border-blue">
          <div class="p4-icon"><i class="fa-solid fa-heart-pulse"></i></div>
          <h3>1. 生存權 (Survival Rights)</h3>
          <p>維持生命的權利，包括乾淨飲水、充足食物、適當住房與基本醫療健康照護。</p>
          <span class="tag-sm">條文第6, 24, 27條</span>
        </div>
        <div class="p4-card border-green">
          <div class="p4-icon"><i class="fa-solid fa-graduation-cap"></i></div>
          <h3>2. 發展權 (Development Rights)</h3>
          <p>潛能發揮的權利，包括教育、遊戲、休閒、文化活動與資訊獲取權。</p>
          <span class="tag-sm">條文第28, 29, 31條</span>
        </div>
        <div class="p4-card border-purple">
          <div class="p4-icon"><i class="fa-solid fa-shield-cat"></i></div>
          <h3>3. 受保護權 (Protection Rights)</h3>
          <p>免受傷害的權利，包括免受暴力、虐待、疏忽、剝削、私密侵害與戰爭危害。</p>
          <span class="tag-sm">條文第19, 32-38條</span>
        </div>
        <div class="p4-card border-amber">
          <div class="p4-icon"><i class="fa-solid fa-people-group"></i></div>
          <h3>4. 參與權 (Participation Rights)</h3>
          <p>積極參與的權利，包括表達意見、言論自由、思想宗教自由與集會結社自由。</p>
          <span class="tag-sm">條文第12-15, 17條</span>
        </div>
      </div>
    `
  },
  {
    id: 17,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "生存權",
    title: "【生存權 Survival】生存、水文、營養與醫療保障",
    subtitle: "確保生命維持的最低與最適健康標準",
    icon: "fa-droplet",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-notes-medical"></i> 第 24 條：健康與醫療服務</h3>
          <p>締約國確認兒童有權享有<strong>最高可達到的健康標準</strong>及醫療和康復設施。國家應優先處理：</p>
          <ul class="styled-list">
            <li>降低嬰幼兒死亡率。</li>
            <li>提供必要的醫療協助與健康照護。</li>
            <li>消除疾病與營養不良（提供充足營養與清潔飲水）。</li>
            <li>提供產前與產後母親保健。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-house-user"></i> 第 27 條：適當生活水準</h3>
          <p>每一兒童均有權享有<strong>足以促進其身心、精神、道德與社會發展的適當生活水準</strong>。</p>
          <div class="alert-box alert-success" style="margin-top: 1rem;">
            <i class="fa-solid fa-hand-holding-dollar"></i>
            <span>父母負首要責任，當父母無力負擔時，國家有義務提供物質援助與支援計畫（如低收入戶補助、急難救助）。</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 18,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "生存權延伸",
    title: "生存權延伸：兒童貧窮與社會安全網",
    subtitle: "打破貧窮循環，保障每一個孩子的基本生存條件",
    icon: "fa-handshake-angle",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-chart-pie"></i> 隱形兒童貧窮現象</h3>
          <p>兒童貧窮不只是經濟匱乏，還包含資源匱乏：</p>
          <div class="feature-card">
            <i class="fa-solid fa-utensils text-amber"></i>
            <div><strong>營養貧窮：</strong>無力負擔健康飲食，導致營養失衡或肥胖。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-laptop text-cyan"></i>
            <div><strong>數位貧窮：</strong>缺乏電腦與網路設備，導致遠距學習落差。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-user-doctor text-purple"></i>
            <div><strong>健康照護落差：</strong>因偏鄉或經濟因素延誤醫療黃金期。</div>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-shield-halved"></i> 社會安全網與政策因應</h3>
          <ul class="styled-list">
            <li><strong>弱勢兒少社區照顧據點：</strong>提供課後照顧、營養餐點與心理關懷。</li>
            <li><strong>兒少未來教育與發展帳戶：</strong>政府一比一對提撥，協助累積未來資產。</li>
            <li><strong>強化社會安全網計畫：</strong>及早發現高風險家庭，預防疏忽與虐待。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 19,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "發展權",
    title: "【發展權 Development】教育權與教育目標",
    subtitle: " Article 28 & 29：普及、包容與以兒童為中心的教育",
    icon: "fa-book-bookmark",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-school"></i> 第 28 條：教育權保障</h3>
          <ul class="styled-list">
            <li>實施免費且強迫的初等教育。</li>
            <li>鼓勵發展不同形式的中等教育，使人人均可取得。</li>
            <li>採取措施定期促進出席率並降低輟學率。</li>
            <li><strong>校園紀律：</strong>學校管教方式應維護兒童的人格尊嚴（禁止體罰與侮辱）。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-compass"></i> 第 29 條：教育的目的</h3>
          <p>教育的目的不僅是傳授知識，而是：</p>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-seedling"></i></div>
            <div>充分發展兒童的人格、才智及身心能力。</div>
          </div>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-hands-holding-child"></i></div>
            <div>培養對人權、基本自由及父母文化認同的尊重。</div>
          </div>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-earth-americas"></i></div>
            <div>培養在自由社會中本著理解、和平與包容精神生活的責任。</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 20,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "發展權延伸",
    title: "發展權延伸：遊戲權與休閒權 (Article 31)",
    subtitle: "休息、休閒、遊戲、娛樂及文化藝術生活",
    icon: "fa-icons",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-gamepad"></i> 第 31 條核心內容</h3>
          <p>締約國確認兒童有權享有<strong>休息及休閒之權利</strong>，有權從事適合其年齡的<strong>遊戲和娛樂活動</strong>，以及自由參加文化生活和藝術活動。</p>
          <div class="alert-box alert-warning" style="margin-top: 1rem;">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>聯合國第 17 號一般性意見書指出：過度安排的課業、缺乏安全遊戲空間及商業化娛樂，嚴重威脅兒童遊戲權！</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-puzzle-piece"></i> 遊戲權的現代價值與實踐</h3>
          <ul class="styled-list">
            <li><strong>共融遊戲場：</strong>設計身心障礙與一般兒童皆可共同玩樂的遊戲設施。</li>
            <li><strong>適度留白時間：</strong>減少過度補習與測驗，還給兒少自主探索的空閒時間。</li>
            <li><strong>冒險與探索：</strong>提供兼具安全與挑戰性的自然遊戲空間。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 21,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "發展權實務",
    title: "發展權實務：文化參與與資訊獲取權 (Article 17)",
    subtitle: "數位時代下的適性閱讀與大眾傳播媒體保護",
    icon: "fa-newspaper",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-tv"></i> 第 17 條：大眾傳播媒體與資訊權</h3>
          <p>締約國確認大眾傳播媒體的重要功能，應確保兒童能獲得來自多元國內和國際來源的<strong>資訊與材料</strong>，特別是旨在促進其社會、精神及道德福祉與身心健康的資訊。</p>
          <ul class="styled-list">
            <li>鼓勵媒體出版適合兒童的優質書籍與節目。</li>
            <li>保護兒童免受有害其福祉的資訊與材料傷害（分級制度）。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-laptop-code"></i> 數位時代的資訊素養</h3>
          <p>現代兒少面臨資訊爆炸與假訊息挑戰：</p>
          <div class="feature-card">
            <i class="fa-solid fa-filter text-cyan"></i>
            <div><strong>媒體識讀能力：</strong>培養兒少批判性思考與辨識假新聞之能力。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-shield-halved text-purple"></i>
            <div><strong>演算法與廣告防護：</strong>保護兒少不受商業廣告過度操弄。</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 22,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "受保護權",
    title: "【受保護權 Protection】防止暴力、虐待與疏忽",
    subtitle: "Article 19：保護兒童免受一切形式的身心暴力與疏忽",
    icon: "fa-shield-heart",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-hand-fist"></i> 第 19 條：免受暴力權</h3>
          <p>締約國應採取一切適當的立法、行政、社會與教育措施，保護兒童在受父母、法定監護人或其他照護者照顧時，<strong>免受一切形式的身心暴力、傷害或凌辱、疏忽或疏忽對待、虐待或剝削（包括性侵害）。</strong></p>
          <div class="alert-box alert-danger" style="margin-top: 1rem;">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>零體罰與零言語霸凌：任何以教育或管教為名的肉體處罰或人格侮辱均違背 CRC！</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-user-shield"></i> 全方位防護體系</h3>
          <ul class="styled-list">
            <li><strong>責任通報機制：</strong>醫事、教育、社工人員發現兒虐嫌疑須 24 小時內通報。</li>
            <li><strong>親職教育支持：</strong>提供壓力家庭親職輔導，避免疏忽照顧。</li>
            <li><strong>保護處置與安置：</strong>極端情況下提供緊急保護安置與專業心理創傷輔導。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 23,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "受保護權實務",
    title: "受保護權實務：防止經濟剝削與不當童工 (Article 32)",
    subtitle: "保護兒童免受危險、有害健康或妨礙教育之勞動",
    icon: "fa-briefcase",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-person-digging"></i> 第 32 條：防止經濟剝削</h3>
          <p>締約國確認兒童有權受保護免受<strong>經濟剝削</strong>，並不得從事任何<strong>危險、妨礙教育、或有害兒童健康身心發展</strong>的工作。</p>
          <div class="stat-box" style="margin-top: 1rem;">
            <span class="stat-num">15 歲</span>
            <span class="stat-label">最低工作年齡標準（台灣《勞基法》童工規範）</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-gavel"></i> 台灣法規對童工與青少年打工的保護</h3>
          <ul class="styled-list">
            <li><strong>年齡限制：</strong>未滿 15 歲不得從事勞動（特殊藝能表演須事先申請許可）。</li>
            <li><strong>工時限制：</strong>15 歲以上未滿 16 歲之童工，每日工作不得超過 8 小時，不得於深夜 (20:00 - 06:00) 工作。</li>
            <li><strong>危險工作禁止：</strong>禁止從事坑井、高空、坑道或處理坑危險物品等繁重危險工作。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 24,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "受保護權數位",
    title: "受保護權實務：數位時代防護與個人隱私 (Article 16)",
    subtitle: "防止網路霸凌、數位性剝削與隱私侵害",
    icon: "fa-lock",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-user-secret"></i> 第 16 條：隱私權保護</h3>
          <p>兒童的<strong>私生活、家庭、住宅或通信不得遭受任意或非法干涉</strong>，其榮譽及名譽亦不得遭受非法侵害。兒童有權享受法律保護，免受此種干涉或侵害。</p>
          <div class="alert-box alert-warning" style="margin-top: 1rem;">
            <i class="fa-solid fa-camera"></i>
            <span>家長曬娃 (Sharenting) 注意：未經同意過度公開孩子私密照片與個人資訊，可能侵犯兒少隱私權！</span>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-shield-halved"></i> 數位威脅與防治法制</h3>
          <div class="scenario-item">
            <strong>1. 性剝削防制：</strong>
            <p>防制《兒童及少年性剝削防制條例》，嚴懲拍攝、散布兒少私密影像。</p>
          </div>
          <div class="scenario-item">
            <strong>2. 網路霸凌防範：</strong>
            <p>建立校園網路霸凌申訴管道與心理輔導機制。</p>
          </div>
          <div class="scenario-item">
            <strong>3. 被遺忘權與數位下架：</strong>
            <p>確保兒少有權請求移除未成年時期之不當私密或敏感數位紀錄。</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 25,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "受保護權家庭",
    title: "受保護權實務：家庭剝離保護與替代照護 (Article 20)",
    subtitle: "當家庭無法發揮功能時，國家的特別保護義務",
    icon: "fa-people-roof",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-house-chimney-crack"></i> 第 20 條：脫離家庭環境的保護</h3>
          <p>暫時或永久脫離家庭環境的兒童，或為了其最佳利益不能被允許繼續留在家庭環境中的兒童，<strong>有權獲得國家的特別保護和援助。</strong></p>
          <ul class="styled-list">
            <li><strong>替代照護形式：</strong>寄養家庭 (Foster Care)、收養 (Adoption) 或安養機構照顧。</li>
            <li><strong>文化連續性：</strong>在安排替代照護時，應適當考慮兒童背景的連續性及文化背景。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-heart-circle-bolt"></i> 台灣家外安置改革趨勢</h3>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-house-heart"></i></div>
            <div><strong>家庭化與小組化：</strong>減少大型機構安置，優先推動寄養家庭與類家庭照顧。</div>
          </div>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-hands-holding"></i></div>
            <div><strong>自立支援服務：</strong>對滿 18 歲結束安置青少年，提供就學、就業與租屋輔導。</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 26,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "參與權",
    title: "【參與權 Participation】言論、思想與集會自由",
    subtitle: "Article 13, 14, 15：公民與政治自由的兒少實踐",
    icon: "fa-bullhorn",
    type: "content",
    content: `
      <div class="grid-3col">
        <div class="info-card">
          <h3>第 13 條：表達自由</h3>
          <p>兒童有自由表達意見的權利，包括尋求、接收和傳播各種資訊與思想的自由（口頭、書面、藝術）。</p>
        </div>
        <div class="info-card">
          <h3>第 14 條：思想與宗教自由</h3>
          <p>締約國應尊重兒童思想、良心及宗教自由的權利，同時尊重父母指導其權利行使的權責。</p>
        </div>
        <div class="info-card">
          <h3>第 15 條：集會結社自由</h3>
          <p>締約國確認兒童享有和平集會及自由結社的權利（如成立學生社團、公共議題倡議）。</p>
        </div>
      </div>
      <div class="info-card highlight-box" style="margin-top: 1rem;">
        <h3><i class="fa-solid fa-flag"></i> 兒少不是未來的公民，而是「現在的公民」</h3>
        <p>兒少有權關心社會議題（氣候變遷、校園民主、路權改革），大人應提供安全的參與平台而非打壓。</p>
      </div>
    `
  },
  {
    id: 27,
    category: "PART 3: 4Ps 權利分類與主題",
    tag: "參與權實務",
    title: "參與權實務：學生自治與兒少代表機制",
    subtitle: "台灣公共事務中的兒少參與現況",
    icon: "fa-user-group",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-check-to-slot"></i> 1. 校園學生自治組織</h3>
          <p>依《高級中等教育法》，學生會為校園法定自治組織：</p>
          <ul class="styled-list">
            <li>參與校務會議、教評會、校規制定委員會。</li>
            <li>參與學生服儀委員會（學生代表比例不得少於 1/4）。</li>
            <li>自主規劃校園活動與經費預算。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-landmark"></i> 2. 中央與地方「兒少代表」制度</h3>
          <p>衛生福利部及各縣市政府設立兒少代表機制：</p>
          <ul class="styled-list">
            <li>兒少代表參與「兒童及少年福利與權益推動會」。</li>
            <li>針對跨領域議題（如數位安全、心理健康、通學環境）提出政策建言。</li>
            <li>落實行政決策前的兒少諮詢程序。</li>
          </ul>
        </div>
      </div>
    `
  },

  // ==========================================
  // PART 4: 迷思破除與國際趨勢 (28 - 34)
  // ==========================================
  {
    id: 28,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "任擇議定書",
    title: "CRC 三個任擇議定書 (Optional Protocols)",
    subtitle: "針對重大專題深化保護與申訴機制的補充條約",
    icon: "fa-file-shield",
    type: "content",
    content: `
      <div class="grid-3col">
        <div class="info-card">
          <h3><i class="fa-solid fa-person-military-pointing text-danger font-xl"></i><br>OPAC 議定書</h3>
          <strong>關於兒童捲入武裝衝突</strong>
          <p>提高徵兵最低年齡至 18 歲，禁止強迫徵召或直接參與戰鬥行動，維護和平成長環境。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-hand-holding-dollar text-warning font-xl"></i><br>OPSC 議定書</h3>
          <strong>關於販賣兒童及兒童色情</strong>
          <p>刑事化所有販賣兒童、兒童賣淫、兒童色情出版品與網路傳播行為，跨國打擊打擊罪行。</p>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-gavel text-cyan font-xl"></i><br>OPIC 議定書</h3>
          <strong>關於個人通報申訴程序</strong>
          <p>當國內救濟途徑窮盡後，允許兒少或其代表直接向聯合國兒童權利委員會提出個案申訴。</p>
        </div>
      </div>
    `
  },
  {
    id: 29,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "迷思破除一",
    title: "CRC 迷思破除 (一)：CRC 會讓孩子變得無法管教？",
    subtitle: "區分「正向管教」與「暴力體罰」的本質差異",
    icon: "fa-circle-question",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card old-view">
          <h3><i class="fa-solid fa-xmark text-danger"></i> 常見誤解</h3>
          <p>「CRC 說不能打罵孩子，那小孩犯錯就不能管了嗎？學校老師和父母根本無法教導孩子了！」</p>
        </div>
        <div class="info-card new-view">
          <h3><i class="fa-solid fa-check text-success"></i> 正確理解</h3>
          <p><strong>CRC 反對的是「暴力與侮辱」，而非反對「管教與引導」！</strong>CRC 第 5 條明確承認父母有指導和管教的權責。</p>
        </div>
      </div>
      <div class="info-card highlight-box" style="margin-top: 1rem;">
        <h3><i class="fa-solid fa-hands-holding-child"></i> 什麼是「正向管教 (Positive Discipline)」？</h3>
        <div class="grid-3col">
          <div><strong>1. 清確界線：</strong>建立明確、合理的規範與期望，而非隨意體罰。</div>
          <div><strong>2. 溝通與說明：</strong>向孩子解釋行為的影響與後果，培養責任感。</div>
          <div><strong>3. 尊嚴與尊重：</strong>不使用公然侮辱、體罰或威脅等傷害身心的方式。</div>
        </div>
      </div>
    `
  },
  {
    id: 30,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "迷思破除二",
    title: "CRC 迷思破除 (二)：享權利前必須先盡義務？",
    subtitle: "釐清「基本人權」的普世性與無條件性",
    icon: "fa-scale-unbalanced",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card old-view">
          <h3><i class="fa-solid fa-xmark text-danger"></i> 常見誤解</h3>
          <p>「小孩要先乖乖聽話、盡好學生的責任義務，才有資格談什麼兒童權利！」</p>
        </div>
        <div class="info-card new-view">
          <h3><i class="fa-solid fa-check text-success"></i> 正確理解</h3>
          <p><strong>基本人權是「與生俱來」且「無條件」的！</strong>人權不是大人給予的獎勵或交換籌碼。</p>
        </div>
      </div>
      <div class="info-card" style="margin-top: 1rem;">
        <h3><i class="fa-solid fa-shield-halved"></i> 權利與責任的真實關係</h3>
        <ul class="styled-list">
          <li><strong>生存、安全與尊嚴不可剝奪：</strong>即使孩子犯錯或未完成功課，也不能剝奪其吃飯、休息、不被毆打的基本權利。</li>
          <li><strong>在尊重權利中學習責任：</strong>只有當兒童體驗到自己的權利被尊重時，他們才會學會尊重他人的權利與承擔社會責任。</li>
        </ul>
      </div>
    `
  },
  {
    id: 31,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "迷思破除三",
    title: "CRC 迷思破除 (三)：表意權等於「小孩說了算」？",
    subtitle: "表意權不等於盲目聽從，而是雙向溝通與理性衡平",
    icon: "fa-comments-dollar",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card old-view">
          <h3><i class="fa-solid fa-xmark text-danger"></i> 常見誤解</h3>
          <p>「如果尊重小孩的表意權，那小孩說不想上學、天天打電玩，大人就只能聽他的嗎？」</p>
        </div>
        <div class="info-card new-view">
          <h3><i class="fa-solid fa-check text-success"></i> 正確理解</h3>
          <p><strong>「聆聽意見」不等於「全盤照單全收」！</strong>第 12 條強調意見要「按其年齡與成熟程度予以適當考量」。</p>
        </div>
      </div>
      <div class="info-card highlight-box" style="margin-top: 1rem;">
        <h3><i class="fa-solid fa-scale-balanced"></i> 理性決策三步驟</h3>
        <div class="grid-3col">
          <div><strong>1. 傾聽與理解：</strong>了解小孩想法背後的原因與情緒。</div>
          <div><strong>2. 評估與衡平：</strong>結合「最佳利益」與「發展保護」進行綜合專業判斷。</div>
          <div><strong>3. 說明與反饋：</strong>若無法完全採納，大人應以溫和明確方式說明決策原因。</div>
        </div>
      </div>
    `
  },
  {
    id: 32,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "國際審查",
    title: "台灣 CRC 國家報告與國際審查發展",
    subtitle: "獨立專家提出改進建議，持續推動人權法制改革",
    icon: "fa-magnifying-glass-location",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-clipboard-question"></i> 國際審查專家重點關切議題</h3>
          <ul class="styled-list">
            <li><strong>兒少心理健康與自殺防制：</strong>建議減少過度考試競爭壓力，強化心理輔導。</li>
            <li><strong>校園不當對待與體罰：</strong>落實零體罰，強化教職員人權素養培訓。</li>
            <li><strong>兒少表意權實質化：</strong>促進校園與政府決策機制中兒少代表之實質影響力。</li>
            <li><strong>少年司法與替代處遇：</strong>推動轉向處遇，減少對非行兒少標籤化與機構化。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-gavel"></i> 台灣近年推動之重大法制變革</h3>
          <div class="feature-card">
            <i class="fa-solid fa-house-user text-cyan"></i>
            <div><strong>《民法》修正懲戒權：</strong>研擬修正民法第 1085 條父母懲戒權，明定不得體罰。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-shirt text-purple"></i>
            <div><strong>校園服儀解嚴：</strong>教育部修訂服儀原則，禁止學校因服儀懲處學生。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-user-gear text-amber"></i>
            <div><strong>兒少權法修法：</strong>強化網路數位性剝削防制與下架機制。</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 33,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "SDGs 交會",
    title: "兒少權利與永續發展目標 (SDGs) 的交會",
    subtitle: "CRC 與聯合國 2030 永續發展目標的協同效應",
    icon: "fa-earth-asia",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-arrows-to-circle"></i> 永續發展目標與 CRC 相互扣合</h3>
          <div class="sdg-item border-blue">
            <strong>SDG 3 良好健康與福祉 <-> CRC 第 24 條</strong>
            <p>降低新生兒死亡率，促進兒少身心健康與心理支持。</p>
          </div>
          <div class="sdg-item border-green">
            <strong>SDG 4 優質教育 <-> CRC 第 28, 29 條</strong>
            <p>確保包容和公平的優質教育，促進人人終身學習機會。</p>
          </div>
          <div class="sdg-item border-purple">
            <strong>SDG 10 減少不平等 <-> CRC 第 2 條</strong>
            <p>消除性別、身心障礙與出身所造成的社會機會不平等。</p>
          </div>
          <div class="sdg-item border-amber">
            <strong>SDG 16 和平正義與健全制度 <-> CRC 第 19, 12 條</strong>
            <p>終止對兒童的暴力、虐待與剝削，建立具包容性的參與決策制度。</p>
          </div>
        </div>
        <div class="info-card highlight-box">
          <h3><i class="fa-solid fa-seedling"></i> 氣候正義與兒少未來</h3>
          <p>聯合國第 26 號一般性意見書指出：<strong>氣候危機即是兒童權利危機！</strong></p>
          <p>環境惡化直接威脅兒少的生命權、健康權與生存權，兒少有權參與氣候政策決定。</p>
        </div>
      </div>
    `
  },
  {
    id: 34,
    category: "PART 4: 迷思破除與國際趨勢",
    tag: "數位權利",
    title: "數位時代的 CRC：聯合國第 25 號一般性意見",
    subtitle: "保障與促進兒少在數位環境中的各項權利",
    icon: "fa-laptop-code",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-wifi"></i> 數位環境中的四大權利維度</h3>
          <ul class="styled-list">
            <li><strong>數位包容權：</strong>確保所有兒少均有公平獲取數位設備與網路之機會。</li>
            <li><strong>數位隱私權：</strong>防範科技公司過度蒐集兒少個資與演算法追蹤。</li>
            <li><strong>數位安全保護：</strong>防範網路霸凌、網路性誘拐與不合宜內容。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-shield-cat"></i> 科技企業與政府的責任</h3>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-code"></i></div>
            <div><strong>預設隱私與安全 (Safety by Design)：</strong>數位產品設計時即應預設最高隱私層級與保護機制。</div>
          </div>
          <div class="concept-box">
            <div class="concept-icon"><i class="fa-solid fa-chalkboard-user"></i></div>
            <div><strong>提升數位素養：</strong>教育兒少如何負責任且安全地探索網路世界。</div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // PART 5: 素養導向情境題 (35 - 45)
  // ==========================================
  {
    id: 35,
    category: "PART 5: 素養導向情境題",
    tag: "素養評量導讀",
    title: "素養導向評量說明：如何應用 CRC 進行情境思辨？",
    subtitle: "跳脫死背條文，培養情境分析、權利衡平與價值批判能力",
    icon: "fa-pen-to-square",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card highlight-box">
          <h3><i class="fa-solid fa-lightbulb"></i> 素養導向題型三要素</h3>
          <div class="feature-card">
            <i class="fa-solid fa-street-view text-cyan"></i>
            <div><strong>1. 生活情境化 (Contextual)：</strong>取自校園、家庭、社區與數位網路真實發生的爭議。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-brain text-purple"></i>
            <div><strong>2. 價值衡平與思考 (Critical thinking)：</strong>分析不同主張之間的利益衝突與 CRC 原則。</div>
          </div>
          <div class="feature-card">
            <i class="fa-solid fa-hand-holding-hand text-amber"></i>
            <div><strong>3. 實踐與解方 (Action-oriented)：</strong>尋求符合兒童最佳利益與人權保障之具體方案。</div>
          </div>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-cloud-arrow-up text-cyan"></i> 自動同步 Google Sheet 機制說明</h3>
          <p>本模組包含 10 題素養情境實作試題：</p>
          <ul class="styled-list">
            <li>當您完成第 10 題回答後，系統將<strong>自動將您的姓名、學號、總得分與詳細答題紀錄同步發送至 Google 試算表</strong>。</li>
            <li>若您尚未填寫姓名學號，請回首頁第 1 頁填寫，或點擊右上角 `📊` 按鈕填報。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 36,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 01",
    title: "【素養情境題 1】校園服儀規範與學生自主權",
    subtitle: "校規管制 vs 學生表意權與人格發展權",
    icon: "fa-shirt",
    type: "quiz",
    quizData: {
      scenario: `某高中學務處為了維護「校風嚴謹」，公告規定：「學生於校內一律須穿著標準校服，不得搭配便服外衣，違者按次警告一次，累積三次予以留校察看。」學生會認為此規定違反教育部服儀原則且未尊重學生自主，發起連署抗議。校長表示：「學校有管理考量，學生應該遵守學校規定，長大才有社會紀律。」`,
      question: "依據 CRC 精神與台灣現行法規，下列哪一個評析最為適切？",
      options: [
        "A. 學校管理考量優先於學生權利，學生未滿 18 歲前應無條件遵守校方服儀規定。",
        "B. 服儀規範涉及學生身體自主權與人格發展權，學校不得因服儀違規懲處學生，且應開放學生參與服儀委員會討論。",
        "C. 服儀屬於學校內部管理事項，不在 CRC 人權保障與表意權的範疇之內。",
        "D. 學生會可以連署抗議，但學校可以直接無視連署，因為校長享有最終行政裁量權。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>CRC 原則應用：</strong>CRC 第 12 條（表意權）與第 13 條（表達自由）強調兒少對涉及個人生活事項（如服儀穿著）有表達意見與發展個人特色的權利。<br>
        2. <strong>台灣法規現況：</strong>教育部已修訂高級中等學校服容原則，明定學校「不得將學生服裝儀容規定作為懲處依據」。校方制定規範須透過服儀委員會且確保學生代表比例（不低於 1/4）共同決策。
      `
    }
  },
  {
    id: 37,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 02",
    title: "【素養情境題 2】家長監控軟體與兒少數位隱私權",
    subtitle: "監護管教權 vs 兒少隱私權 (Article 16)",
    icon: "fa-mobile-screen-button",
    type: "quiz",
    quizData: {
      scenario: `14 歲的國中生小明發現媽媽在他的手機裡秘密安裝了定位與通訊監控 App，可以隨時讀取他的 Line 對話紀錄、社群貼文與GPS位置。小明感到隱私被嚴重侵犯並提出抗議。媽媽回答：「我是你媽媽，我有管教保護你的責任，你還沒成年，我隨時看你手機是為了你的安全著想，哪有什麼隱私權！」`,
      question: "從 CRC 關於隱私權 (Article 16) 與家長指導權 (Article 5) 的觀點，下列何者正確？",
      options: [
        "A. 未成年兒少在法律上完全不享有隱私權，家長擁有無限制檢查兒少通訊的絕對權力。",
        "B. CRC 第 16 條保障兒少享有隱私權免受非法干涉；家長行使保護職責時，應隨兒少年齡成熟度，以溝通取代秘密監控。",
        "C. 只要家長的主觀意圖是「為了孩子好」，任何侵犯兒少隱私與祕密通訊的手段都是合法的。",
        "D. 小明可以直接告父母侵犯隱私，政府應強制剝奪媽媽的監護權。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>隱私權普世性：</strong>CRC 第 16 條明確規範兒童之私生活與通信不得受任意干涉。未成年人同樣享有隱私權。<br>
        2. <strong>適度與漸進式引導：</strong>CRC 第 5 條承認家長有指導權，但此權力旨在「協助兒少行使權利」而非完全取消兒少權利。隨著兒少年齡增長與成熟，家長應逐步尊重其自主空間，秘密監控會破壞信任關係並侵犯隱私。
      `
    }
  },
  {
    id: 38,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 03",
    title: "【素養情境題 3】社區拆除公園遊具與兒童遊戲權",
    subtitle: "公共空間工程決策 vs 兒童遊戲權與參與權 (Article 31 & 12)",
    icon: "fa-volleyball",
    type: "quiz",
    quizData: {
      scenario: `某區公所因接獲少數居民抱怨公園裡兒童遊玩嬉戲聲音太吵，便在沒有公開說明的情況下，決定將公園內大受兒童歡迎的磨石子溜滑梯與鞦韆全部拆除，改鋪設靜態花圃。社區兒童得知後感到非常傷心與失望。`,
      question: "運用 CRC 原則評析此區公所的公共決策，下列何者最適當？",
      options: [
        "A. 公園是公有財產，行政機關可以自行決定設施變更，無須考量兒童意見。",
        "B. 決策過程忽視了兒童的遊戲休閒權 (Article 31) 與最佳利益 (Article 3)，且未徵詢兒童意見 (Article 12)，是不符合 CRC 精神的決策。",
        "C. 成人的安靜休息需求必然優先於兒童的遊戲權利，區公所的做法完全合理。",
        "D. 兒童因為沒有投票權，因此不能參與任何公共設施的聽證或公聽會。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>遊戲權保障：</strong>CRC 第 31 條確認兒童享有遊戲與娛樂權利。公共空間規畫應優先保障兒少遊戲空間。<br>
        2. <strong>決策參與：</strong>公共設施拆除涉及兒少切身利益，應發揮 CRC 第 12 條表意權，舉辦兒少友善公聽會，聆聽兒童聲音並進行通盤評估，尋求噪音防範與遊戲權雙贏方案。
      `
    }
  },
  {
    id: 39,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 04",
    title: "【素養情境題 4】特殊需求學生課堂融入與禁止歧視",
    subtitle: "合理調整義務 vs 禁止歧視原則 (Article 2)",
    icon: "fa-wheelchair-move",
    type: "quiz",
    quizData: {
      scenario: `班上一位患有腦性麻痺、行動需輪椅代步的小華同學，很期待參加三天的校外畢業旅行。然而導師以「景點有無障礙設施疑慮，且帶輪椅學生會拖慢全班行程、增加帶隊責任」為由，私下勸說小華家長讓小華請假待在家裡。`,
      question: "從 CRC 禁止歧視原則 (Article 2) 與身心障礙權利觀點評析，學校與教師應如何處理？",
      options: [
        "A. 導師勸退是為了團體效率，符合大多數同學的利益，並無不妥。",
        "B. 學校應提供合理調整（如規劃無障礙路線與隨隊協助），保障小華平等參與教育活動的權利，拒絕參與構成歧視。",
        "C. 只要小華家長同意請假，就不算侵犯小華的權利。",
        "D. 特殊需求學生只適合參加專屬的特教旅遊，不應參加普通班的畢業旅行。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>禁止歧視與實質平等：</strong>CRC 第 2 條禁止因身心障礙而有任何差別對待。學校有責任消除環境障礙，提供「合理調整 (Reasonable Accommodation)」。<br>
        2. <strong>包容教育：</strong>強迫或勸退特教生放棄同儕活動屬於剝奪其發展權與社交參與權，學校應做好路線評估與後勤支援，落實融合教育。
      `
    }
  },
  {
    id: 40,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 05",
    title: "【素養情境題 5】學生發起氣候罷課與集會自由權",
    subtitle: "公共倡議 vs 集會結社與言論自由 (Article 13 & 15)",
    icon: "fa-people-pulling",
    type: "quiz",
    quizData: {
      scenario: `一群高中生響應國際「星期五為氣候罷課 (Fridays for Future)」倡議，規劃於週五下午前往市政府前廣場進行和平快閃與公開演講，宣導減碳與氣候正義。校方得知後警告：「未成年學生任務就是好好念書，若擅自請假參加任何政治活動或集會，一律以記大過處分。」`,
      question: "針對校方的警告與學生的倡議行動，依據 CRC 評析下列何者適當？",
      options: [
        "A. 校方做法正確，未成年學生嚴禁參與任何與公共議題相關的集會活動。",
        "B. CRC 第 15 條保障兒少和平集會與自由結社權；學生關心氣候議題展現公民素養，學校應尊重並給予正向溝通輔導而非壓制。",
        "C. 學生氣候快閃活動非法，因為未滿 18 歲的人沒有言論自由。",
        "D. 學生只要是在上課時間活動，學校就可以隨意以記大過威脅所有學生。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>集會結社與表達自由：</strong>CRC 第 13、15 條保障兒少享有言論與和平集會自由。兒少關注全球氣候變遷危機屬於正當的公民參與權利行使。<br>
        2. <strong>校方引導角色：</strong>校方宜以學習引導（如討論請假程序、安全注意與議題討論）取代高壓恐嚇記過，尊重兒少作為社會公民的主體性。
      `
    }
  },
  {
    id: 41,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 06",
    title: "【素養情境題 6】兒少涉案新聞報導與隱私保護",
    subtitle: "新聞自由 vs 兒少受保護權與名譽隱私 (Article 16 & 40)",
    icon: "fa-newspaper",
    type: "quiz",
    quizData: {
      scenario: `某國中發生學生打架衝突事件。某電視新聞台在播報此新聞時，未將涉案學生的臉部畫面打馬賽克，且直接公布學生的全名、就讀學校與班級，甚至到學生家門口堵訪其家人，引發網路公審與肉搜。`,
      question: "檢視新聞台的報導行為，違反了 CRC 的哪項權利原則及相關法條？",
      options: [
        "A. 報導完全符合新聞自由與大眾知情權，沒有任何違法疑慮。",
        "B. 違反 CRC 第 16 條隱私權與第 40 條司法保護原則（以及台灣《兒少權法》第 69 條），嚴重侵害兒少名譽與個人隱私。",
        "C. 只要學生確實有打架，媒體就有權公開其姓名照片作為社會懲戒。",
        "D. 媒體只要事後刪除報導影片即可，不需要承擔法律責任。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>兒少保護與去識別化：</strong>CRC 第 16 條與台灣《兒童及少年福利與權益保障法》第 69 條嚴禁媒體公開任何足以識別涉案兒少身分的資訊（姓名、照片、學校等）。<br>
        2. <strong>復原與重新融入：</strong>兒少司法與保護的核心是「輔導教育與重新融入社會」，公開報導會造成永久性數位標籤與二次傷害。
      `
    }
  },
  {
    id: 42,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 07",
    title: "【素養情境題 7】父母離異監護權歸屬與最佳利益",
    subtitle: "父母權利爭執 vs 兒童最佳利益原則 (Article 3 & 12)",
    icon: "fa-people-arrows",
    type: "quiz",
    quizData: {
      scenario: `小英（10 歲）的父母正在進行離婚訴訟，爭奪小英的親權（監護權）。父親經濟條件優渥但長期在外工作；母親收入中等但長期擔任主要照顧者，且小英表達強烈希望能與母親生活。法官在進行審判時，父親聲稱：「我最有錢能給孩子最好的物質生活，法官應該判給我，而且 10 歲小孩懂什麼，不用問她的意見。」`,
      question: "依據 CRC 兒童最佳利益原則 (Article 3)，法院審理親權應如何評估？",
      options: [
        "A. 經濟條件是唯一的裁量標準，誰最有錢就必然判給誰。",
        "B. 應綜合考量主要照顧者、情感依附、生活穩定度，並依第 12 條聽取小英的真實意願，以兒童最佳利益為首要考量。",
        "C. 法官直接抽籤決定，以示對父母雙方公平。",
        "D. 父母爭執不休時，直接將小英送往孤兒院安置。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>多元最佳利益評估：</strong>物質財富不等於最佳利益。社工調查會評估感情依附、照顧意願、照顧持續性等。<br>
        2. <strong>聆聽兒少聲音：</strong>10 歲兒童已有表達見解能力，法官及程序監理人應提供友善環境聽取小英意見，作為最佳利益裁量之關鍵參考。
      `
    }
  },
  {
    id: 43,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 08",
    title: "【素養情境題 8】補習至深夜與身心健康發展權",
    subtitle: "升學競爭 vs 生存發展權與休息權 (Article 6 & 31)",
    icon: "fa-book-open-reader",
    type: "quiz",
    quizData: {
      scenario: `國三學生小強為了準備升學會考，每天在學校上課到下午 5 點，緊接著到補習班上課與考試至晚上 11 點半，回到家完成作業已凌晨 1 點多，每天睡眠不足 5 小時。小強出現情緒焦躁、頭痛及學習注意力不集中症狀，但家長認為：「大家都這樣苦過來的，再忍耐幾個月考上好學校最重要！」`,
      question: "從 CRC 第 6 條（生存與發展權）及第 31 條（休息權）評析此現象，下列何者正確？",
      options: [
        "A. 升學成績高於一切，為了未來發展，短暫犧牲身心健康與睡眠是完全符合 CRC 發展權的。",
        "B. 長期過度學習與睡眠剝奪嚴重損害兒少生理與心理健康發展，違反了第 6 條發展權與第 31 條休息權，家長與社會應協助調整均衡作息。",
        "C. 只要小強沒有被體罰，就不存在任何人權侵犯問題。",
        "D. 補習班上課時間越長，代表國家越重視兒少的教育權。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>全人健康發展：</strong>CRC 第 6 條強調發展包含「生理與心理」健康。慢性睡眠不足與高壓威脅精神健全。<br>
        2. <strong>休息權不可忽視：</strong>第 31 條明確指出「休息與休閒」是兒童基本權利。升學追求不應以犧牲兒童的基本健康與健全發育為代價。
      `
    }
  },
  {
    id: 44,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 09",
    title: "【素養情境題 9】學生會提案改善午餐與參採機制",
    subtitle: "校園民主參與 vs 表意權實質化 (Article 12)",
    icon: "fa-utensils",
    type: "quiz",
    quizData: {
      scenario: `某中學學生會針對「校園營養午餐菜色與品質」發起全校滿意度問卷調查，整理出 800 份學生問卷與具體改善建議，提交給學校伙食委員會。委員會召集人表示：「感謝學生會意見，但午餐招標與菜色屬於學校行政專業，學生還小不懂成本與營養配比，意見僅供參考備查。」最後菜色無任何改變。`,
      question: "評析學校伙食委員會對學生會提案的回應，下列何者符 CRC 第 12 條精神？",
      options: [
        "A. 委員會做法完全正確，行政專業決策本就不需考慮學生主觀喜好。",
        "B. 僅備查而不回應屬於「象徵性參與」，學校應認真對待學生調查，在會議中與學生代表研商並說明採納與否之理由。",
        "C. 學生會不應該調查午餐，因為午餐不是涉及學生切身權益的事項。",
        "D. 學校只要給學生會發獎狀鼓勵調查即可，無須實質討論。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>表意權實質化：</strong>CRC 第 12 條要求對兒少意見「予以適當看待 (Due weight)」。<br>
        2. <strong>雙向溝通機制：</strong>校方不能將兒少參與作為公關擺設。對學生透過科學問卷整理的理性提案，應邀請學生代表共同對話，若有成本限制亦應透明溝通，落實民主教育。
      `
    }
  },
  {
    id: 45,
    category: "PART 5: 素養導向情境題",
    tag: "素養題 10 (完成將自動同步成績)",
    title: "【素養情境題 10】兒少社群發表公共議題言論",
    subtitle: "網路言論自由 vs 資訊與表達自由 (Article 13)",
    icon: "fa-hashtag",
    type: "quiz",
    quizData: {
      scenario: `16 歲的高中生阿凱在個人 Instagram 發表一篇文長 1000 字的文章，分析社區公共自行車 (YouBike) 站點設置不合理的現象，並提出優化建議。貼文獲得許多迴響。然而學務處老師私下找阿凱關切：「未成年人在網路發表公共政策看法容易引發爭議，建議你把貼文刪除，認真讀書比較重要。」`,
      question: "從 CRC 促進兒少公民參與的觀點，老師的關切做法是否妥適？",
      options: [
        "A. 妥適，老師是為了保護阿凱不受網路攻擊，學生應避免討論公共議題。",
        "B. 不妥適，阿凱在網路發表理性的公共政策看法是 CRC 第 13 條表達自由的合法行使，校方應予以鼓勵與引導而非要求刪文。",
        "C. 妥適，除非獲得家長與學校雙重授權，否則兒少不得公開評論政府政策。",
        "D. 不妥適，但阿凱應該直接發起網路圍攻老師來捍衛自己的權利。"
      ],
      correct: 1,
      explanation: `
        <strong>【解析說明】正確答案為 B。</strong><br>
        1. <strong>表達自由與公民素養：</strong>CRC 第 13 條保障兒少尋求、接收與傳播資訊與思想的自由。阿凱關注社區交通議題展現優質公民素養。<br>
        2. <strong>正向培力與引導：</strong>學校應扮演鼓勵與協助的角色（如輔導如何進行數位自我保護、理性思辨），而非出於威權思想強制要求關閉言論通道。
      `
    }
  },

  // ==========================================
  // PART 6: 實踐、資源與結語 (46 - 50)
  // ==========================================
  {
    id: 46,
    category: "PART 6: 實踐與資源",
    tag: "實踐行動",
    title: "校園與家庭 CRC 實踐行動清單 CheckList",
    subtitle: "將 CRC 四大原則融入日常互動與決策",
    icon: "fa-list-check",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-school"></i> 校園行動清單 (Educator Checklist)</h3>
          <ul class="checklist">
            <li><i class="fa-regular fa-square-check text-cyan"></i> 檢視校規與班規，消除帶有歧視或體罰性質之規定。</li>
            <li><i class="fa-regular fa-square-check text-cyan"></i> 確保學生代表實質參與校務與服儀委員會討論。</li>
            <li><i class="fa-regular fa-square-check text-cyan"></i> 落實零體罰與正向管教，建立校園包容與友善氣氛。</li>
            <li><i class="fa-regular fa-square-check text-cyan"></i> 尊重特教學生權益，提供課堂與活動合理調整。</li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-house-user"></i> 家庭行動清單 (Parent Checklist)</h3>
          <ul class="checklist">
            <li><i class="fa-regular fa-square-check text-purple"></i> 涉及孩子重大事項（如選科系、作息安排）前主動傾聽其意見。</li>
            <li><i class="fa-regular fa-square-check text-purple"></i> 尊重孩子隱私，不未經同意查看日記、簡訊或公開私密照。</li>
            <li><i class="fa-regular fa-square-check text-purple"></i> 保障充足睡眠與遊戲休閒時間，維持身心健全發展。</li>
            <li><i class="fa-regular fa-square-check text-purple"></i> 以非暴力溝通取代體罰與言語威脅。</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 47,
    category: "PART 6: 實踐與資源",
    tag: "求助資源",
    title: "兒少權利申訴、諮詢與求助管道資源",
    subtitle: "遇到權利受損或需要協助時的公私立防護網絡",
    icon: "fa-phone-volume",
    type: "content",
    content: `
      <div class="grid-3col">
        <div class="resource-card border-blue">
          <div class="rc-icon"><i class="fa-solid fa-phone"></i></div>
          <h3>113 保護專線</h3>
          <p>提供 24 小時免費保護諮詢與緊急通報服務（家庭暴力、兒少虐待、性侵害）。</p>
          <span class="rc-contact">撥打 113 (免付費)</span>
        </div>
        <div class="resource-card border-green">
          <div class="rc-icon"><i class="fa-solid fa-headset"></i></div>
          <h3>1925 依舊愛我專線</h3>
          <p>衛生福利部 24 小時心理諮詢與自殺防治安心專線，提供情緒傾聽與支持。</p>
          <span class="rc-contact">撥打 1925 (免付費)</span>
        </div>
        <div class="resource-card border-purple">
          <div class="rc-icon"><i class="fa-solid fa-hands-holding-child"></i></div>
          <h3>家扶基金會 / 勵馨基金會</h3>
          <p>提供弱勢家庭扶助、兒少保護安置、心理創傷復原與法律諮詢服務。</p>
          <span class="rc-contact">各縣市服務據點</span>
        </div>
      </div>
      <div class="info-card highlight-box" style="margin-top: 1rem;">
        <h3><i class="fa-solid fa-landmark-flag"></i> 國家人權委員會 (NHRC) 與教育部申訴管道</h3>
        <p>如遭遇校園霸凌或嚴重人權受損，可透過教育部「1953 校園霸凌專線」或國家人權委員會提出兒少申訴。</p>
      </div>
    `
  },
  {
    id: 48,
    category: "PART 6: 實踐與資源",
    tag: "參考文獻",
    title: "延伸閱讀與權威參考資料",
    subtitle: "深化 CRC 理論與實務研究之學習資源",
    icon: "fa-book-atlas",
    type: "content",
    content: `
      <div class="grid-2col">
        <div class="info-card">
          <h3><i class="fa-solid fa-globe"></i> 官方網站與公約條文</h3>
          <ul class="styled-list">
            <li><strong>衛生福利部 CRC 資訊網：</strong><br><small>提供 CRC 條文全文、一般性意見書中文版與國家報告資訊。</small></li>
            <li><strong>國家人權委員會 CRC 專區：</strong><br><small>提供兒少版 CRC 教材、獨立評估意見與主題研究報告。</small></li>
            <li><strong>聯合國兒童基金會 (UNICEF) 官網：</strong><br><small>國際兒童權利現況與最新趨勢專題分析。</small></li>
          </ul>
        </div>
        <div class="info-card">
          <h3><i class="fa-solid fa-bookmark"></i> 重要一般性意見書推薦 (General Comments)</h3>
          <ul class="styled-list">
            <li><strong>第 12 號：</strong>兒童被聆聽的權利 (2009)</li>
            <li><strong>第 13 號：</strong>免受一切形式暴力傷害的權利 (2011)</li>
            <li><strong>第 14 號：</strong>以兒童最佳利益為首要考量 (2013)</li>
            <li><strong>第 17 號：</strong>休息、休閒、遊戲與文化生活權 (2013)</li>
            <li><strong>第 25 號：</strong>數位環境中的兒童權利 (2021)</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 49,
    category: "PART 6: 實踐與資源",
    tag: "總結省思",
    title: "總結與核心省思：讓每一個孩子尊嚴成長",
    subtitle: "實踐 CRC，打造世代共融與溫暖包容的社會",
    icon: "fa-heart-pulse",
    type: "content",
    content: `
      <div class="summary-hero">
        <div class="quote-card">
          <i class="fa-solid fa-quote-left font-xl"></i>
          <h2>「對兒童友善的城市與社會，必然是對所有人都友善的社會。」</h2>
          <p>—— 聯合國兒童基金會 (UNICEF)</p>
        </div>
        <div class="grid-3col" style="margin-top: 1.5rem;">
          <div class="summary-box">
            <i class="fa-solid fa-eye text-cyan font-xl"></i>
            <h4>看見主體</h4>
            <p>承認兒少為獨立的權利主體，而非大人的附屬品。</p>
          </div>
          <div class="summary-box">
            <i class="fa-solid fa-ear-listen text-purple font-xl"></i>
            <h4>倾聽聲音</h4>
            <p>耐心聽取兒少見解，在專利評估中落實最佳利益。</p>
          </div>
          <div class="summary-box">
            <i class="fa-solid fa-hands-holding text-amber font-xl"></i>
            <h4>守護成長</h4>
            <p>消除暴力歧視，陪伴孩子在安全環境中適性發展。</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 50,
    category: "PART 6: 實踐與資源",
    tag: "結語問答",
    title: "結語與 Q&A 交流 (Thank You)",
    subtitle: "感謝聆聽 | 歡迎提問與交流討案",
    icon: "fa-comments-dollar",
    type: "summary",
    content: `
      <div class="thankyou-card">
        <div class="ty-badge"><i class="fa-solid fa-star"></i> Presentation Completed</div>
        <h1>感謝您的聆聽與參與！</h1>
        <p class="ty-desc">兒童權利公約 (CRC) 的落實，需要家庭、學校與社會大眾的共同努力。<br>讓我們攜手為兒少打造更加尊重、安全與自由的成長環境。</p>
        <div class="qa-box">
          <h3><i class="fa-solid fa-circle-question"></i> 現場 Q&A 與自由討論主題</h3>
          <div class="qa-tags">
            <span># 學校校規如何修訂符合 CRC？</span>
            <span># 正向管教的實際技巧？</span>
            <span># 兒少表意權在家庭中的實踐？</span>
            <span># 數位時代手機能看嗎？</span>
          </div>
        </div>
        <div class="ty-footer">
          <span><i class="fa-brands fa-github"></i> GitHub: github.com/mchung2022</span>
          <span><i class="fa-solid fa-envelope"></i> 簡報格式：HTML5 互動網頁</span>
          <span><i class="fa-solid fa-calendar-days"></i> 2026 年人權教育推廣專用</span>
        </div>
      </div>
    `
  }
];
