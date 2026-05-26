/**
 * Hades II Build Assistant Core Logic (黑帝斯2 構築助手核心邏輯)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // --- 狀態宣告與初始化 ---
  // ==========================================
  let activeTab = "planner";
  let currentPlannerSlot = null; // 用於紀錄點擊了哪個普攻/特技槽位
  
  // 核心構築狀態
  const activeBuild = {
    weapon: "witch_staff",
    aspect: "melinoe",
    Attack: null,   // 存放 Boon 物件
    Special: null,
    Cast: null,
    Dash: null,
    Gain: null
  };

  // 奧秘牌配置狀態
  const activeArcanaIds = new Set();
  const maxGraspLimit = 30;

  // 神恩百科篩選狀態
  let selectedGodKey = "zeus";
  let selectedSlotFilter = "All";
  let boonSearchQuery = "";

  // 雙重/傳奇解鎖路徑模擬狀態
  let currentPathBoon = null;
  const pathObtainedBoons = new Set(); // 存放點擊勾選的前置神恩 ID

  // ==========================================
  // --- 頁面元素選取 ---
  // ==========================================
  
  // Tab 導覽按鈕與面板
  const tabButtons = {
    planner: document.getElementById("tab-btn-planner"),
    database: document.getElementById("tab-btn-database"),
    arcana: document.getElementById("tab-btn-arcana"),
    guides: document.getElementById("tab-btn-guides")
  };
  const tabPanels = {
    planner: document.getElementById("panel-planner"),
    database: document.getElementById("panel-database"),
    arcana: document.getElementById("panel-arcana"),
    guides: document.getElementById("panel-guides")
  };

  // 彈窗元件 (Boon Modal)
  const modalOverlay = document.getElementById("boon-select-modal");
  const modalCloseBtn = document.getElementById("btn-close-modal");
  const modalSearchInput = document.getElementById("modal-search-input");
  const modalGodFilter = document.getElementById("modal-god-filter");
  const modalBoonsList = document.getElementById("modal-boons-list");

  // ==========================================
  // --- 1. Tab 切換邏輯 ---
  // ==========================================
  function switchTab(tabId) {
    if (!tabButtons[tabId]) return;
    
    // 移除現有 active
    Object.keys(tabButtons).forEach(key => {
      tabButtons[key].classList.remove("active");
      tabButtons[key].setAttribute("aria-selected", "false");
      tabPanels[key].classList.remove("active");
    });

    // 激活目標 Tab
    tabButtons[tabId].classList.add("active");
    tabButtons[tabId].setAttribute("aria-selected", "true");
    tabPanels[tabId].classList.add("active");
    activeTab = tabId;

    // 特定 Tab 的特殊加載
    if (tabId === "database") {
      renderGodFilterMenu();
      renderBoonsGrid();
    } else if (tabId === "arcana") {
      renderArcanaBoard();
      updateArcanaState();
    }
  }

  // 綁定 Tab 點擊事件
  Object.keys(tabButtons).forEach(key => {
    tabButtons[key].addEventListener("click", () => switchTab(key));
  });


  // ==========================================
  // --- 2. 構築規劃器 (Build Planner) 邏輯 ---
  // ==========================================
  
  // 綁定武器與基底切換
  const selectWeapon = document.getElementById("select-weapon");
  const selectAspect = document.getElementById("select-aspect");
  
  selectWeapon.addEventListener("change", (e) => {
    activeBuild.weapon = e.target.value;
  });
  selectAspect.addEventListener("change", (e) => {
    activeBuild.aspect = e.target.value;
  });

  // 綁定核心槽位點擊事件
  const slots = ["Attack", "Special", "Cast", "Dash", "Gain"];
  slots.forEach(slot => {
    const slotEl = document.getElementById(`slot-${slot}`);
    slotEl.addEventListener("click", (e) => {
      // 如果點擊的是清除按鈕，則不觸發彈窗
      if (e.target.closest(".slot-clear-btn")) return;
      openBoonModal(slot);
    });
  });

  // 開啟神恩選擇彈窗
  function openBoonModal(slot) {
    currentPlannerSlot = slot;
    modalOverlay.classList.add("active");
    modalSearchInput.value = "";
    modalGodFilter.value = "All";
    
    // 將 Modal 標題設定為對應的槽位名稱
    const slotNamesZh = { Attack: "普通攻擊", Special: "特技攻擊", Cast: "法陣技能", Dash: "奔刺技能", Gain: "法力回復" };
    document.getElementById("modal-title").textContent = `選擇 ${slotNamesZh[slot]} 神恩`;
    
    renderModalBoons();
  }

  // 關閉彈窗
  function closeModal() {
    modalOverlay.classList.remove("active");
    currentPlannerSlot = null;
  }
  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // 彈窗內的搜尋與篩選綁定
  modalSearchInput.addEventListener("input", renderModalBoons);
  modalGodFilter.addEventListener("change", renderModalBoons);

  // 渲染彈窗內的可選神恩
  function renderModalBoons() {
    modalBoonsList.innerHTML = "";
    
    const searchQuery = modalSearchInput.value.toLowerCase().trim();
    const selectedGod = modalGodFilter.value;

    // 篩選出符合此槽位 (Attack/Special 等) 且符合條件的神恩
    const filteredBoons = hades2BoonsData.boons.filter(boon => {
      if (boon.slot !== currentPlannerSlot) return false;
      if (selectedGod !== "All" && boon.god !== selectedGod) return false;
      
      if (searchQuery) {
        const nameMatch = boon.name.toLowerCase().includes(searchQuery);
        const engMatch = boon.englishName.toLowerCase().includes(searchQuery);
        const descMatch = boon.desc.toLowerCase().includes(searchQuery);
        return nameMatch || engMatch || descMatch;
      }
      return true;
    });

    if (filteredBoons.length === 0) {
      modalBoonsList.innerHTML = `<div class="slot-empty-text" style="text-align:center; padding: 20px;">找不到符合篩選條件的神恩。</div>`;
      return;
    }

    filteredBoons.forEach(boon => {
      const godInfo = hades2BoonsData.gods[boon.god] || { themeColor: "#fff", name: "未知" };
      
      const item = document.createElement("div");
      item.className = "modal-boon-item";
      item.style.setProperty("--god-color", godInfo.themeColor);
      
      item.innerHTML = `
        <div class="modal-boon-info">
          <div class="modal-boon-header">
            <span class="modal-boon-name">${boon.name}</span>
            <span class="modal-boon-god-badge" style="border-color: ${godInfo.themeColor}; color: ${godInfo.themeColor};">${godInfo.name}</span>
          </div>
          <div class="modal-boon-desc">${boon.desc}</div>
        </div>
      `;

      item.addEventListener("click", () => {
        equipBoon(currentPlannerSlot, boon);
        closeModal();
      });

      modalBoonsList.appendChild(item);
    });
  }

  // 裝配神恩到指定槽位
  function equipBoon(slot, boon) {
    activeBuild[slot] = boon;
    renderPlannerSlot(slot);
    updatePlannerState();
  }

  // 渲染規劃器槽位內容
  function renderPlannerSlot(slot) {
    const slotEl = document.getElementById(`slot-${slot}`);
    const contentEl = document.getElementById(`slot-${slot}-content`);
    const boon = activeBuild[slot];

    if (!boon) {
      slotEl.classList.remove("filled");
      slotEl.style.borderLeftColor = "";
      const slotNamesZh = { Attack: "普通攻擊", Special: "特技攻擊", Cast: "法陣技能", Dash: "奔刺技能", Gain: "法力回復" };
      contentEl.innerHTML = `<span class="slot-empty-text">點擊裝配${slotNamesZh[slot]}神恩...</span>`;
      return;
    }

    const godInfo = hades2BoonsData.gods[boon.god] || { themeColor: "#fff", name: "未知" };
    slotEl.classList.add("filled");
    slotEl.style.borderLeftColor = godInfo.themeColor;

    contentEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div class="slot-boon-info">
          <div class="slot-boon-header">
            <span class="slot-boon-name" style="color: ${godInfo.themeColor};">${boon.name}</span>
            <span class="slot-boon-god" style="border-color: ${godInfo.themeColor}; color: ${godInfo.themeColor}; background: rgba(255,255,255,0.03);">${godInfo.name}</span>
          </div>
          <div class="slot-boon-desc">${boon.desc}</div>
        </div>
        <button class="slot-clear-btn" data-clear="${slot}" title="清除裝配">✕</button>
      </div>
    `;

    // 綁定清除按鈕
    contentEl.querySelector(".slot-clear-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      activeBuild[slot] = null;
      renderPlannerSlot(slot);
      updatePlannerState();
    });
  }

  // 重置規劃器
  document.getElementById("btn-reset-planner").addEventListener("click", () => {
    slots.forEach(slot => {
      activeBuild[slot] = null;
      renderPlannerSlot(slot);
    });
    updatePlannerState();
  });

  // ==========================================
  // --- 3. 狀態詛咒與「源頭」增傷判定邏輯 ---
  // ==========================================
  function updatePlannerState() {
    // 統計當前所帶神恩引發的詛咒
    const activeCurses = new Set();
    
    slots.forEach(slot => {
      const boon = activeBuild[slot];
      if (boon && boon.curse && boon.curse !== "None") {
        activeCurses.add(boon.curse);
      }
    });

    // 渲染詛咒面板
    const curseBadges = document.querySelectorAll("#active-curses-grid .curse-badge");
    curseBadges.forEach(badge => {
      const curseType = badge.getAttribute("data-curse");
      if (activeCurses.has(curseType)) {
        badge.classList.add("active");
      } else {
        badge.classList.remove("active");
      }
    });

    // 判定奧秘牌「源頭 (Origination)」雙重詛咒 (+50%傷害) 是否激活
    const origBox = document.getElementById("origination-box");
    const origStatus = document.getElementById("origination-status-label");
    const origDesc = document.getElementById("origination-desc-text");

    if (activeCurses.size >= 2) {
      origBox.classList.add("active");
      origStatus.textContent = "已激活 (+50% 全傷加成！)";
      origStatus.style.color = "var(--green-glow)";
      origDesc.innerHTML = `完美契合！您當前擁有的狀態詛咒有：<strong>${Array.from(activeCurses).map(c => translateCurse(c)).join("、")}</strong>，已滿足「至少兩種狀態詛咒」之條件，將觸發超強的 50% 乘算傷害加成！`;
    } else {
      origBox.classList.remove("active");
      origStatus.textContent = "未激活";
      origStatus.style.color = "var(--text-muted)";
      if (activeCurses.size === 1) {
        origDesc.innerHTML = `尚缺一種狀態！目前僅有 <strong>${translateCurse(Array.from(activeCurses)[0])}</strong> 詛咒。請在其他空餘核心槽位補充附帶狀態詛咒的神恩以觸發 +50% 增傷！`;
      } else {
        origDesc.textContent = `在裝配的核心神恩中，需要提供【至少兩種不同的狀態詛咒】，即可激活奧秘牌「源頭」獲得 +50% 的爆發全傷加成！`;
      }
    }

    // 更新神恩解鎖檢測清單 (Duo & Legendary Checklist)
    updatePlannerSynergies(activeCurses);
  }

  function translateCurse(curse) {
    const zh = { Blitz: "雷擊 (宙斯)", Hitch: "牽引 (赫拉)", Slip: "滑行 (波賽頓)", Daze: "眩暈 (阿波羅)", Weak: "衰弱 (阿芙蘿黛蒂)", Scorch: "燒傷 (赫斯提亞)", Freeze: "凍結 (德密特)", Cyclone: "冷冽 (德密特)", Vent: "排氣 (赫菲斯托斯)" };
    return zh[curse] || curse;
  }

  // 更新規劃器下方的雙重與傳奇神恩解鎖狀態檢測
  function updatePlannerSynergies(activeCurses) {
    const listEl = document.getElementById("planner-synergies-list");
    listEl.innerHTML = "";

    // 篩選出數據庫中所有的雙重與傳奇神恩
    const specialBoons = hades2BoonsData.boons.filter(b => b.slot === "Duo" || b.slot === "Legendary");

    specialBoons.forEach(boon => {
      if (!boon.prerequisites) return;

      const reqs = boon.prerequisites.requirements;
      let matchedStepsCount = 0;
      const progressDetails = [];

      // 檢查是否滿足前置選項
      reqs.forEach(req => {
        // 檢查當前 activeBuild 中是否有裝配對應 options 裡的任何一個神恩
        const hasOption = slots.some(slot => {
          const equipped = activeBuild[slot];
          return equipped && req.options.includes(equipped.id);
        });

        if (hasOption) {
          matchedStepsCount++;
          progressDetails.push(`<span style="color:var(--green-glow)">已具備 ${hades2BoonsData.gods[req.god].name}</span>`);
        } else {
          progressDetails.push(`<span style="color:var(--text-muted)">尚缺 ${hades2BoonsData.gods[req.god].name}</span>`);
        }
      });

      const totalSteps = reqs.length;
      const isActive = matchedStepsCount === totalSteps;

      const item = document.createElement("div");
      item.className = `synergy-item ${isActive ? "active" : ""}`;
      
      // 生成進度圓點
      let dotsHtml = "";
      for (let i = 0; i < totalSteps; i++) {
        dotsHtml += `<div class="progress-dot ${i < matchedStepsCount ? "active" : ""}"></div>`;
      }

      item.innerHTML = `
        <div class="synergy-status-icon">${isActive ? "✨" : "🔒"}</div>
        <div class="synergy-item-info">
          <div class="synergy-item-name">
            ${boon.name} 
            <span class="boon-card-badge ${boon.slot.toLowerCase()}" style="font-size: 0.7rem; padding: 1px 4px; margin-left: 5px;">
              ${boon.slot === "Duo" ? "雙重" : "傳奇"}
            </span>
          </div>
          <div class="synergy-item-desc">${boon.desc} (${progressDetails.join(" / ")})</div>
        </div>
        <div class="synergy-progress-dots">
          ${dotsHtml}
        </div>
      `;

      listEl.appendChild(item);
    });

    if (listEl.children.length === 0) {
      listEl.innerHTML = `<div class="slot-empty-text">無加載項目。</div>`;
    }
  }


  // ==========================================
  // --- 4. 神恩百科與前置解鎖 (Boon Encyclopedia) 邏輯 ---
  // ==========================================
  
  // 渲染左側神明篩選器
  function renderGodFilterMenu() {
    const menuEl = document.getElementById("god-filter-menu");
    menuEl.innerHTML = "";

    Object.keys(hades2BoonsData.gods).forEach(key => {
      const god = hades2BoonsData.gods[key];
      const btn = document.createElement("button");
      btn.className = `god-menu-btn ${selectedGodKey === key ? "active" : ""}`;
      btn.style.setProperty("--god-color", god.themeColor);
      btn.style.setProperty("--god-glow-color", god.glowColor);
      
      btn.innerHTML = `
        <span>${god.name}</span>
        <span class="god-menu-curse">${god.curse}</span>
      `;

      btn.addEventListener("click", () => {
        // 切換神明時，重設槽位篩選為全部，並刷新
        selectedGodKey = key;
        document.querySelectorAll("#god-filter-menu .god-menu-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderBoonsGrid();
      });

      menuEl.appendChild(btn);
    });
  }

  // 綁定槽位篩選按鈕
  const boonSlotFilters = document.querySelectorAll("#boon-slot-filters .filter-btn");
  boonSlotFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      boonSlotFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSlotFilter = btn.getAttribute("data-slot");
      renderBoonsGrid();
    });
  });

  // 綁定搜尋輸入
  document.getElementById("input-boon-search").addEventListener("input", (e) => {
    boonSearchQuery = e.target.value.toLowerCase().trim();
    renderBoonsGrid();
  });

  // 渲染神恩展示網格
  function renderBoonsGrid() {
    const gridEl = document.getElementById("boons-display-grid");
    gridEl.innerHTML = "";

    const activeGodInfo = hades2BoonsData.gods[selectedGodKey] || { themeColor: "#fff", glowColor: "rgba(255,255,255,0.1)" };

    const filtered = hades2BoonsData.boons.filter(boon => {
      // 1. 神明篩選 (如果是雙重或傳奇，只要涉及該神明，或者屬於該神明，皆顯示，這樣體驗更好)
      if (boon.slot === "Duo") {
        if (!boon.prerequisites.gods.includes(selectedGodKey)) return false;
      } else {
        if (boon.god !== selectedGodKey) return false;
      }

      // 2. 槽位篩選
      if (selectedSlotFilter !== "All" && boon.slot !== selectedSlotFilter) return false;

      // 3. 搜尋關鍵字篩選
      if (boonSearchQuery) {
        const nameMatch = boon.name.toLowerCase().includes(boonSearchQuery);
        const engMatch = boon.englishName.toLowerCase().includes(boonSearchQuery);
        const descMatch = boon.desc.toLowerCase().includes(boonSearchQuery);
        return nameMatch || engMatch || descMatch;
      }

      return true;
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = `<div class="slot-empty-text" style="grid-column: 1/-1; text-align: center; padding: 40px 0;">目前無符合篩選條件的神恩。</div>`;
      return;
    }

    filtered.forEach(boon => {
      const card = document.createElement("div");
      card.className = "boon-card";
      
      const curGod = hades2BoonsData.gods[boon.god] || activeGodInfo;
      card.style.setProperty("--god-color", curGod.themeColor);
      card.style.setProperty("--god-glow-color", curGod.glowColor);

      // 槽位名稱中文化
      const slotsZh = { Attack: "普通攻擊", Special: "特技攻擊", Cast: "法陣技能", Dash: "奔刺技能", Gain: "法力回復", Passive: "被動效果", Duo: "雙重神恩", Legendary: "傳奇神恩" };
      
      let badgeHtml = "";
      if (boon.slot === "Duo") {
        badgeHtml = `<span class="boon-card-badge duo">雙重神恩</span>`;
      } else if (boon.slot === "Legendary") {
        badgeHtml = `<span class="boon-card-badge legendary">傳奇神恩</span>`;
      }

      let curseHtml = "";
      if (boon.curse && boon.curse !== "None") {
        curseHtml = `
          <div class="boon-card-status">
            <span class="status-dot" style="background-color: ${curGod.themeColor}"></span>
            <span>附帶: ${translateCurse(boon.curse)}</span>
          </div>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="boon-card-header">
            <span class="boon-card-title">${boon.name}</span>
            <span class="boon-card-slot">${slotsZh[boon.slot]}</span>
          </div>
          <div class="boon-card-english">${boon.englishName}</div>
          <div class="boon-card-desc">${boon.desc}</div>
        </div>
        <div class="boon-card-footer">
          ${curseHtml}
          ${badgeHtml}
        </div>
      `;

      // 點擊事件：如果是雙重/傳奇，開啟前置路徑規劃，其餘普通神恩可選擇直接裝載或查看
      card.addEventListener("click", () => {
        if (boon.slot === "Duo" || boon.slot === "Legendary") {
          openPathFinder(boon);
        } else {
          // 普通神恩提示可到裝配區裝配
          const confirmEquip = confirm(`要將「${boon.name}」裝配到您的構築規劃器中嗎？`);
          if (confirmEquip) {
            // 如果該槽位可裝配，則直接裝配
            const coreSlots = ["Attack", "Special", "Cast", "Dash", "Gain"];
            if (coreSlots.includes(boon.slot)) {
              equipBoon(boon.slot, boon);
              switchTab("planner");
            } else {
              alert("此為被動/其他神恩，無法裝入核心的普攻、特技等五大主動槽位。已為您記錄！");
            }
          }
        }
      });

      gridEl.appendChild(card);
    });
  }

  // ==========================================
  // --- 5. 雙重/傳奇前置解鎖路徑模擬 (Path Finder) ---
  // ==========================================
  const pathPanel = document.getElementById("boon-path-finder");
  const pathCloseBtn = document.getElementById("btn-close-path");
  const pathBoonName = document.getElementById("path-boon-name");
  const pathTypeBadge = document.getElementById("path-type-badge");
  const pathDescText = document.getElementById("path-desc-text");
  
  const pathStep1Title = document.getElementById("path-step1-title");
  const pathStep1Options = document.getElementById("path-step1-options");
  const pathStep2Box = document.getElementById("path-step2-box");
  const pathStep2Title = document.getElementById("path-step2-title");
  const pathStep2Options = document.getElementById("path-step2-options");
  
  const pathGauge = document.getElementById("path-progress-gauge");
  const pathPercentNum = document.getElementById("path-percent-num");
  const pathApplyBtn = document.getElementById("btn-apply-path-to-planner");

  pathCloseBtn.addEventListener("click", () => {
    pathPanel.style.display = "none";
    currentPathBoon = null;
  });

  function openPathFinder(boon) {
    currentPathBoon = boon;
    pathPanel.style.display = "block";
    pathPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    
    pathBoonName.textContent = boon.name;
    pathTypeBadge.textContent = boon.slot === "Duo" ? "雙重神恩" : "傳奇神恩";
    pathTypeBadge.className = `boon-card-badge ${boon.slot.toLowerCase()}`;
    pathDescText.innerHTML = `<strong>效果：</strong>${boon.desc}<br><br>這是一個強力的特殊神恩。在下方勾選您已獲得的神恩，模擬前置路徑。`;

    pathObtainedBoons.clear();

    // 渲染前置條件選項
    const reqs = boon.prerequisites.requirements;
    
    // 渲染第一步 (God A)
    const req1 = reqs[0];
    const god1 = hades2BoonsData.gods[req1.god];
    pathStep1Title.textContent = `${god1.name} 前置需求（以下任選一項）`;
    renderPathOptions(pathStep1Options, req1.options);

    // 渲染第二步 (God B) - 傳奇神恩通常只有一步，雙重神恩有兩步
    if (reqs.length > 1) {
      pathStep2Box.style.display = "block";
      const req2 = reqs[1];
      const god2 = hades2BoonsData.gods[req2.god];
      pathStep2Title.textContent = `${god2.name} 前置需求（以下任選一項）`;
      renderPathOptions(pathStep2Options, req2.options);
    } else {
      pathStep2Box.style.display = "none";
    }

    updatePathProgress();
  }

  function renderPathOptions(containerEl, optionIds) {
    containerEl.innerHTML = "";
    
    optionIds.forEach(id => {
      const boon = hades2BoonsData.boons.find(b => b.id === id);
      if (!boon) return;

      const item = document.createElement("div");
      item.className = "step-option-item";
      item.innerHTML = `
        <div class="step-option-checkbox"></div>
        <span class="step-option-text">${boon.name} (${translateSlot(boon.slot)})</span>
      `;

      item.addEventListener("click", () => {
        if (pathObtainedBoons.has(id)) {
          pathObtainedBoons.delete(id);
          item.classList.remove("checked");
        } else {
          pathObtainedBoons.add(id);
          item.classList.add("checked");
        }
        updatePathProgress();
      });

      containerEl.appendChild(item);
    });
  }

  function translateSlot(slot) {
    const zh = { Attack: "普攻", Special: "特技", Cast: "法陣", Dash: "奔刺", Gain: "回魔", Passive: "被動" };
    return zh[slot] || slot;
  }

  function updatePathProgress() {
    if (!currentPathBoon) return;
    
    const reqs = currentPathBoon.prerequisites.requirements;
    let matchedSteps = 0;
    
    reqs.forEach(req => {
      const hasAny = req.options.some(id => pathObtainedBoons.has(id));
      if (hasAny) matchedSteps++;
    });

    const percent = Math.round((matchedSteps / reqs.length) * 100);
    pathPercentNum.textContent = `${percent}%`;
    pathGauge.style.background = `conic-gradient(var(--green-glow) ${percent}%, #2a313d ${percent}%)`;
    
    if (percent === 100) {
      pathPercentNum.style.color = "var(--green-glow)";
      pathDescText.innerHTML = `<strong>效果：</strong>${currentPathBoon.desc}<br><br><span style="color:var(--green-glow); font-weight:800;">🎉 恭喜！您已具備解鎖「${currentPathBoon.name}」的全部前置條件！在後續的遊戲關卡中，您將有機率在祝福房中刷出此技能。</span>`;
    } else {
      pathPercentNum.style.color = "var(--text-main)";
      pathDescText.innerHTML = `<strong>效果：</strong>${currentPathBoon.desc}<br><br>請勾選以達標。當前進度為 ${percent}%。還需要補充其他神明的核心前置技能。`;
    }
  }

  // 綁定「一鍵套用前置到構築規劃器」
  pathApplyBtn.addEventListener("click", () => {
    if (pathObtainedBoons.size === 0) {
      alert("請先在左邊勾選您想要模擬套用的前置神恩！");
      return;
    }

    let loadedCount = 0;
    pathObtainedBoons.forEach(id => {
      const boon = hades2BoonsData.boons.find(b => b.id === id);
      if (boon) {
        // 僅能裝配進 Attack, Special, Cast, Dash, Gain 槽位
        const coreSlots = ["Attack", "Special", "Cast", "Dash", "Gain"];
        if (coreSlots.includes(boon.slot)) {
          activeBuild[boon.slot] = boon;
          renderPlannerSlot(boon.slot);
          loadedCount++;
        }
      }
    });

    if (loadedCount > 0) {
      updatePlannerState();
      alert(`成功為您套用了 ${loadedCount} 個前置神恩到規劃器槽位！已為您自動跳轉查看。`);
      switchTab("planner");
    } else {
      alert("選取的均為被動技能，無法直接裝配進核心的五大主動槽位。");
    }
  });


  // ==========================================
  // --- 6. 奧秘牌配置模擬器 (Arcana Cards) 邏輯 ---
  // ==========================================
  const arcanaDetailPlaceholder = document.getElementById("card-detail-placeholder");
  const arcanaDetailBody = document.getElementById("card-detail-body");
  const arcanaDetailName = document.getElementById("card-detail-name");
  const arcanaDetailCost = document.getElementById("card-detail-cost");
  const arcanaDetailDesc = document.getElementById("card-detail-desc");
  const activatedCardsList = document.getElementById("activated-cards-list");
  const activatedCardsEmpty = document.getElementById("active-cards-empty");
  
  const graspCurrentNum = document.getElementById("grasp-current-num");
  const graspMeter = document.getElementById("grasp-meter");
  const graspWarning = document.getElementById("grasp-warning");

  // 渲染奧秘牌 5x5 石板
  function renderArcanaBoard() {
    const boardEl = document.getElementById("arcana-interactive-board");
    boardEl.innerHTML = "";

    // 奧秘牌對應圖示（隨意映射幾款精美文字或 Emoji 體現主題）
    const cardIcons = {
      1: "🔮", 2: "🧭", 3: "🌳", 4: "👑", 5: "👻",
      6: "🌙", 7: "💧", 8: "✊", 9: "🛡️", 10: "💖",
      11: "⚡", 12: "⏳", 13: "🐎", 14: "🦅", 15: "🔥",
      16: "🎲", 17: "💰", 18: "🔱", 19: "✨", 20: "🎯",
      21: "👁️", 22: "⚔️", 23: "⚖️", 24: "💎", 25: "🌀"
    };

    arcanaCards.forEach(card => {
      const cardEl = document.createElement("div");
      const isActive = activeArcanaIds.has(card.id);
      cardEl.className = `arcana-card-item ${isActive ? "active" : ""}`;
      
      // 計算羅馬數字
      const roman = card.name.split(" ")[0];

      cardEl.innerHTML = `
        <span class="arcana-card-num">${roman}</span>
        <span class="arcana-card-cost">${card.cost}</span>
        <div class="arcana-card-icon">${cardIcons[card.id] || "🃏"}</div>
        <span class="arcana-card-name-label">${card.name.split(" ")[1]}</span>
      `;

      // 滑鼠懸停顯示卡牌詳情
      cardEl.addEventListener("mouseenter", () => showCardDetails(card));
      cardEl.addEventListener("mouseleave", () => hideCardDetailsIfNoActive());

      // 點擊激活/取消激活
      cardEl.addEventListener("click", () => {
        if (activeArcanaIds.has(card.id)) {
          activeArcanaIds.delete(card.id);
          cardEl.classList.remove("active");
        } else {
          activeArcanaIds.add(card.id);
          cardEl.classList.add("active");
        }
        updateArcanaState();
      });

      boardEl.appendChild(cardEl);
    });
  }

  function showCardDetails(card) {
    arcanaDetailPlaceholder.style.display = "none";
    arcanaDetailBody.style.display = "block";
    arcanaDetailName.textContent = card.name;
    arcanaDetailCost.textContent = `消耗：${card.cost}`;
    arcanaDetailDesc.textContent = card.desc;
  }

  function hideCardDetailsIfNoActive() {
    // 如果有選中的牌，可以保持顯示選中牌的詳情，否則放回 Placeholder
    if (activeArcanaIds.size > 0) {
      const lastActiveId = Array.from(activeArcanaIds)[activeArcanaIds.size - 1];
      const card = arcanaCards.find(c => c.id === lastActiveId);
      if (card) {
        showCardDetails(card);
        return;
      }
    }
    arcanaDetailPlaceholder.style.display = "flex";
    arcanaDetailBody.style.display = "none";
  }

  // 更新奧秘牌計量表與啟用列表
  function updateArcanaState() {
    let totalCost = 0;
    activatedCardsList.innerHTML = "";

    // 統計啟用卡牌與消耗
    const activeCardsList = [];
    activeArcanaIds.forEach(id => {
      const card = arcanaCards.find(c => c.id === id);
      if (card) {
        totalCost += card.cost;
        activeCardsList.push(card);
      }
    });

    // 渲染右側列表
    if (activeCardsList.length === 0) {
      activatedCardsList.appendChild(activatedCardsEmpty);
      activatedCardsEmpty.style.display = "block";
    } else {
      activatedCardsEmpty.style.display = "none";
      activeCardsList.forEach(card => {
        const pill = document.createElement("div");
        pill.className = "active-card-pill";
        pill.innerHTML = `
          <span class="active-card-pill-name">${card.name}</span>
          <span style="color:var(--text-muted)">消耗 ${card.cost}</span>
        `;
        activatedCardsList.appendChild(pill);
      });
    }

    // 更新心力計量表
    graspCurrentNum.textContent = totalCost;
    const percent = Math.min((totalCost / maxGraspLimit) * 100, 100);
    graspMeter.style.width = `${percent}%`;

    if (totalCost > maxGraspLimit) {
      graspMeter.classList.add("warning");
      graspWarning.style.display = "block";
    } else {
      graspMeter.classList.remove("warning");
      graspWarning.style.display = "none";
    }
  }

  // 清空配置
  document.getElementById("btn-reset-arcana").addEventListener("click", () => {
    activeArcanaIds.clear();
    renderArcanaBoard();
    updateArcanaState();
  });


  // ==========================================
  // --- 7. 神級流派推薦 (Presets Guides) 邏輯 ---
  // ==========================================
  function renderPresets() {
    const container = document.getElementById("presets-container");
    container.innerHTML = "";

    hades2BuildPresets.forEach(preset => {
      const card = document.createElement("article");
      card.className = "preset-card";

      // 產生標籤
      const tagsHtml = preset.features.map(f => `<span class="preset-tag">${f}</span>`).join("");
      
      card.innerHTML = `
        <div>
          <div class="preset-header">
            <h3 class="preset-title">${preset.title}</h3>
            <div class="preset-weapon">🪓 推薦武器：${preset.weapon} (${preset.aspect})</div>
            <div class="preset-tags">
              <span class="preset-tag highlight">難度：${preset.difficulty}</span>
              ${tagsHtml}
            </div>
          </div>
          <p class="preset-desc">${preset.description}</p>
        </div>
        <button class="preset-action-btn" data-apply-preset="${preset.id}">一鍵載入此套流派配置</button>
      `;

      // 一鍵套用流派
      card.querySelector(".preset-action-btn").addEventListener("click", () => {
        loadPresetBuild(preset);
      });

      container.appendChild(card);
    });
  }

  function loadPresetBuild(preset) {
    const confirmLoad = confirm(`確定要載入「${preset.title}」嗎？這將覆蓋您當前在規劃器與奧秘牌中的所有配置！`);
    if (!confirmLoad) return;

    // 1. 設置武器與基底
    if (preset.weaponKey) {
      selectWeapon.value = preset.weaponKey;
    }
    if (preset.aspectKey) {
      selectAspect.value = preset.aspectKey;
    }
    activeBuild.weapon = selectWeapon.value;
    activeBuild.aspect = selectAspect.value;

    // 2. 裝配槽位神恩
    Object.keys(preset.coreBoons).forEach(slot => {
      const boonId = preset.coreBoons[slot];
      const boon = hades2BoonsData.boons.find(b => b.id === boonId);
      if (boon) {
        activeBuild[slot] = boon;
        renderPlannerSlot(slot);
      } else {
        activeBuild[slot] = null;
        renderPlannerSlot(slot);
      }
    });

    // 3. 裝配奧秘牌
    activeArcanaIds.clear();
    if (Array.isArray(preset.arcanaIds)) {
      preset.arcanaIds.forEach(id => activeArcanaIds.add(id));
    } else if (typeof preset.arcanaIds === "number") {
      activeArcanaIds.add(preset.arcanaIds);
    }
    
    // 4. 更新全局狀態
    updatePlannerState();
    
    // 5. 自動跳轉到首頁查看
    switchTab("planner");
    alert(`🎉 「${preset.title}」已成功載入！核心槽位神恩與奧秘牌已配置完畢，已為您跳轉到構築規劃面板查看。`);
  }

  // 初始化加載
  renderPresets();
});
