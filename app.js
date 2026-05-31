/**
 * Hades II Build Assistant Core Logic (黑帝斯2 構築助手核心邏輯 - 官方對齊版)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // --- 狀態宣告與初始化 ---
  // ==========================================
  let activeTab = "planner";
  let currentPlannerSlot = null; // 用於紀錄點擊了哪個攻擊/技能槽位
  
  // 核心構築狀態
  const activeBuild = {
    weapon: null,
    aspect: null,
    Attack: null,   // 存放 Boon 物件
    Special: null,
    Cast: null,
    Dash: null,
    Gain: null,
    passives: new Set() // 存放被動/雙重/傳奇祝福 ID
  };

  // 奧秘牌配置狀態
  const activeArcanaIds = new Set();
  const maxGraspLimit = 30;

  // 祝福百科篩選狀態
  let selectedGodKey = "zeus";
  let selectedSlotFilter = "All";
  let boonSearchQuery = "";

  // 雙重/傳奇解鎖路徑模擬狀態
  let currentPathBoon = null;
  const pathObtainedBoons = new Set(); // 存放點擊勾選的前置祝福 ID

  // ==========================================
  // --- 頁面元素選取 ---
  // ==========================================
  
  // Tab 導覽按鈕與面板
  const tabButtons = {
    planner: document.getElementById("tab-btn-planner"),
    database: document.getElementById("tab-btn-database"),
    arcana: document.getElementById("tab-btn-arcana"),
    guides: document.getElementById("tab-btn-guides"),
    tutorial: document.getElementById("tab-btn-tutorial")
  };
  const tabPanels = {
    planner: document.getElementById("panel-planner"),
    database: document.getElementById("panel-database"),
    arcana: document.getElementById("panel-arcana"),
    guides: document.getElementById("panel-guides"),
    tutorial: document.getElementById("panel-tutorial")
  };

  // 彈窗元件 (Blessing Modal)
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
      renderDuoMatrix();
    } else if (tabId === "arcana") {
      renderArcanaBoard();
      updateArcanaState();
    } else if (tabId === "tutorial") {
      renderTutorial();
    }
  }

  // 綁定 Tab 點擊事件
  Object.keys(tabButtons).forEach(key => {
    tabButtons[key].addEventListener("click", () => switchTab(key));
  });


  // ==========================================
  // --- 2. 構築規劃器 (Build Planner) 邏輯 ---
  // ==========================================
  
  // 武器與型態關聯對照數據表
  const weaponAspectsMap = {
    witch_staff: [
      { value: "melinoe", text: "墨利諾厄之姿 (Aspect of Melinoë)" },
      { value: "circe", text: "瑟西之姿 (Aspect of Circe)" },
      { value: "momus", text: "摩墨斯之姿 (Aspect of Momus)" }
    ],
    sister_blades: [
      { value: "melinoe", text: "墨利諾厄之姿 (Aspect of Melinoë)" },
      { value: "artemis", text: "阿提米絲之姿 (Aspect of Artemis)" },
      { value: "pan", text: "潘之姿 (Aspect of Pan)" }
    ],
    umbral_flames: [
      { value: "melinoe", text: "墨利諾厄之姿 (Aspect of Melinoë)" },
      { value: "moros", text: "莫洛斯之姿 (Aspect of Moros)" },
      { value: "eos", text: "歐斯之姿 (Aspect of Eos)" }
    ],
    moonstone_axe: [
      { value: "melinoe", text: "墨利諾厄之姿 (Aspect of Melinoë)" },
      { value: "charon", text: "卡戎之姿 (Aspect of Charon)" },
      { value: "thanatos", text: "泰納托斯之姿 (Aspect of Thanatos)" }
    ],
    argent_skull: [
      { value: "melinoe", text: "墨利諾厄之姿 (Aspect of Melinoë)" },
      { value: "medea", text: "美狄亞之姿 (Aspect of Medea)" },
      { value: "persephone", text: "波瑟芬妮之姿 (Aspect of Persephone)" }
    ],
    black_coat: [
      { value: "melinoe", text: "墨利諾厄之姿 (Aspect of Melinoë)" },
      { value: "selene", text: "塞勒涅之姿 (Aspect of Selene)" },
      { value: "nyx", text: "尼克斯之姿 (Aspect of Nyx)" },
      { value: "shiva", text: "濕婆之姿 (Aspect of Shiva)" }
    ]
  };

  // 綁定武器與基底切換
  const selectWeapon = document.getElementById("select-weapon");
  const selectAspect = document.getElementById("select-aspect");
  
  selectWeapon.addEventListener("change", (e) => {
    const weapon = e.target.value;
    activeBuild.weapon = weapon;
    
    // 動態更新型態下拉選單，防止選取不符武器的型態
    selectAspect.innerHTML = '<option value="" disabled selected>-- 請選擇型態 --</option>';
    if (weaponAspectsMap[weapon]) {
      weaponAspectsMap[weapon].forEach(aspect => {
        const opt = document.createElement("option");
        opt.value = aspect.value;
        opt.textContent = aspect.text;
        selectAspect.appendChild(opt);
      });
    }
    
    activeBuild.aspect = null;
    updatePlannerState();
  });
  
  selectAspect.addEventListener("change", (e) => {
    activeBuild.aspect = e.target.value;
    updatePlannerState();
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

  // 開啟祝福選擇彈窗
  function openBoonModal(slot) {
    currentPlannerSlot = slot;
    modalOverlay.classList.add("active");
    modalSearchInput.value = "";
    modalGodFilter.value = "All";
    
    // 將 Modal 標題設定為對應的槽位名稱
    const slotNamesZh = { Attack: "攻擊", Special: "技能", Cast: "法陣", Dash: "衝刺", Gain: "魔力" };
    document.getElementById("modal-title").textContent = `選擇 ${slotNamesZh[slot]} 祝福`;
    
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

  // 渲染彈窗內的可選祝福
  function renderModalBoons() {
    modalBoonsList.innerHTML = "";
    
    const searchQuery = modalSearchInput.value.toLowerCase().trim();
    const selectedGod = modalGodFilter.value;

    // 篩選出符合此槽位 (Attack/Special 等) 且符合條件的祝福
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
      modalBoonsList.innerHTML = `<div class="slot-empty-text" style="text-align:center; padding: 20px;">找不到符合篩選條件的祝福。</div>`;
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

  // 裝配祝福到指定槽位
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
      const slotNamesZh = { Attack: "攻擊", Special: "技能", Cast: "法陣", Dash: "衝刺", Gain: "魔力" };
      contentEl.innerHTML = `<span class="slot-empty-text">點擊裝配${slotNamesZh[slot]}祝福...</span>`;
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
    activeBuild.passives.clear();
    // 重置武器與型態為空置狀態
    selectWeapon.value = "";
    selectAspect.innerHTML = '<option value="" disabled selected>-- 請選擇型態 --</option>';
    activeBuild.weapon = null;
    activeBuild.aspect = null;
    updatePlannerState();
  });

  // 自動掃描並裝備滿足前置條件的雙重/傳奇被動
  function autoEquipSatisfiedSpecialBoons() {
    const equippedBoonIds = new Set();
    slots.forEach(slot => {
      const boon = activeBuild[slot];
      if (boon) equippedBoonIds.add(boon.id);
    });

    const allSpecialBoons = hades2BoonsData.boons.filter(b => b.slot === "Duo" || b.slot === "Legendary");
    allSpecialBoons.forEach(specialBoon => {
      if (!specialBoon.prerequisites) return;
      const reqs = specialBoon.prerequisites.requirements;
      let satisfied = true;
      reqs.forEach(req => {
        const hasAny = req.options.some(optId => equippedBoonIds.has(optId));
        if (!hasAny) satisfied = false;
      });
      if (satisfied) {
        activeBuild.passives.add(specialBoon.id);
      }
    });
  }

  // ==========================================
  // --- 3. 狀態詛咒與「起源」增傷判定邏輯 ---
  // ==========================================
  function updatePlannerState() {
    // 統計當前所帶祝福引發的詛咒
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

    // 判定奧秘卡牌「起源 (Origination)」雙重狀態 (+25%傷害) 是否啟用
    const origBox = document.getElementById("origination-box");
    const origStatus = document.getElementById("origination-status-label");
    const origDesc = document.getElementById("origination-desc-text");

    if (activeCurses.size >= 2) {
      origBox.classList.add("active");
      origStatus.textContent = "已啟用 (+25% 全傷加成！)";
      origStatus.style.color = "var(--green-glow)";
      origDesc.innerHTML = `完美契合！您當前擁有的狀態詛咒有：<strong>${Array.from(activeCurses).map(c => translateCurse(c)).join("、")}</strong>，已滿足「至少兩種狀態詛咒」之條件，將觸發超強的 25% 乘算傷害加成！`;
    } else {
      origBox.classList.remove("active");
      origStatus.textContent = "未啟用";
      origStatus.style.color = "var(--text-muted)";
      if (activeCurses.size === 1) {
        origDesc.innerHTML = `尚缺一種狀態！目前僅有 <strong>${translateCurse(Array.from(activeCurses)[0])}</strong> 詛咒。請在其他空餘核心槽位補充附帶狀態詛咒的祝福以觸發 +25% 增傷！`;
      } else {
        origDesc.textContent = `在裝配的核心祝福中，需要提供【至少兩種不同的狀態詛咒】，即可啟用奧秘卡牌「起源」獲得 +25% 的爆發全傷加成！`;
      }
    }

    renderPassiveBoons();
    updateBuildRecommendations();
  }

  // ==========================================
  // --- 3.5 智慧構築與後續建議分析引擎 ---
  // ==========================================
  function updateBuildRecommendations() {
    const recPanel = document.getElementById("smart-recommendation-panel");
    const recContent = document.getElementById("recommendation-content");
    const recBadge = document.getElementById("recommendation-badge");
    if (!recPanel || !recContent) return;

    // 獲取當前已裝配的核心祝福與神明
    const equippedCoreBoons = [];
    const equippedGods = new Set();
    const equippedBoonIds = new Set();
    const activeCurses = new Set();

    slots.forEach(slot => {
      const boon = activeBuild[slot];
      if (boon) {
        equippedCoreBoons.push(boon);
        equippedGods.add(boon.god);
        equippedBoonIds.add(boon.id);
        if (boon.curse && boon.curse !== "None") {
          activeCurses.add(boon.curse);
        }
      }
    });

    // 如果沒有裝配任何祝福，我們從選擇的武器開始給予後續流派建議！
    if (equippedCoreBoons.length === 0) {
      recPanel.classList.add("has-content");
      if (recBadge) recBadge.style.display = "inline-block";
      
      // 尋找與當前武器及型態完全匹配的所有流派
      const currentWeapon = activeBuild.weapon;
      const currentAspect = activeBuild.aspect;
      const matchingPresets = hades2BuildPresets.filter(p => 
        p.weaponKey === currentWeapon && 
        (!currentAspect || p.aspectKey === currentAspect)
      );
      
      if (matchingPresets.length > 0) {
        let presetsHtml = "";
        
        matchingPresets.forEach(preset => {
          const essentialSlots = preset.essentialSlots || [];
          let essentialHtml = "";
          let optionalHtml = "";
          
          Object.keys(preset.coreBoons).forEach(slotKey => {
            const boonId = preset.coreBoons[slotKey];
            const boon = hades2BoonsData.boons.find(b => b.id === boonId);
            if (!boon) return;
            
            const godInfo = hades2BoonsData.gods[boon.god] || { themeColor: "#fff", name: "" };
            const slotZh = translateSlot(slotKey);
            const isEssential = essentialSlots.includes(slotKey);
            
            const itemHtml = `
              <div style="display: flex; flex-direction: column; font-size: 0.82rem; margin-bottom: 6px; padding: 6px 8px; background: rgba(255, 255, 255, 0.02); border: 1px dashed ${isEssential ? "rgba(255, 89, 42, 0.35)" : "rgba(69, 163, 255, 0.25)"}; border-radius: 6px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>➡️ <strong style="color: #ff9d42;">後續建議</strong>【${slotZh}】：<span style="color: ${godInfo.themeColor}; font-weight: 700;">${boon.name}</span> (${godInfo.name.split(" ")[0]})</span>
                  <span style="color: #ff9d42; font-weight: 600; font-size: 0.75rem;">待獲取</span>
                </div>
                <div style="color: var(--text-muted); font-size: 0.76rem; margin-top: 4px; line-height: 1.35;">${boon.desc}</div>
              </div>
            `;
            
            if (isEssential) {
              essentialHtml += itemHtml;
            } else {
              optionalHtml += itemHtml;
            }
          });

          let boonsDirectionsHtml = "";
          if (essentialHtml) {
            boonsDirectionsHtml += `
              <div class="boon-group-title" style="font-family: var(--font-title); font-size: 0.85rem; color: #ff592a; margin-top: 10px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; font-weight: bold; border-left: 2px solid #ff592a; padding-left: 6px;">🔥 核心必備祝福 (流派運作關鍵)</div>
              ${essentialHtml}
            `;
          }
          if (optionalHtml) {
            boonsDirectionsHtml += `
              <div class="boon-group-title" style="font-family: var(--font-title); font-size: 0.85rem; color: #45a3ff; margin-top: 14px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; font-weight: bold; border-left: 2px solid #45a3ff; padding-left: 6px;">💡 建議搭配/後續加強</div>
              ${optionalHtml}
            `;
          }
          
          const buildTips = preset.tips ? `<div style="font-size: 0.8rem; color: var(--gold); border-left: 2px solid var(--gold); padding-left: 6px; margin: 10px 0; line-height: 1.45;"><strong>💡 運行策略建議：</strong>${preset.tips}</div>` : "";
          
          const aspectBadgeColor = preset.aspectEssential ? "#ff592a" : "#18f299";
          const aspectBgColor = preset.aspectEssential ? "rgba(255, 89, 42, 0.15)" : "rgba(24, 242, 153, 0.15)";
          const aspectBorder = preset.aspectEssential ? "1px solid #ff592a" : "1px solid #18f299";
          const aspectStatusText = preset.aspectEssential ? "核心必須" : "任意 (建議)";

          presetsHtml += `
            <div class="rec-preset-card" style="margin-bottom: 15px;">
              <div class="rec-preset-title" style="margin-bottom: 6px;">
                <span>流派：${preset.title}</span>
                <span class="preset-tag highlight" style="font-size: 0.68rem; margin: 0; padding: 2px 6px;">武器適配</span>
              </div>
              <div class="rec-preset-weapon" style="margin-bottom: 6px; font-size: 0.82rem; color: var(--text-main); font-weight: 600;">
                🪓 推薦武器：${preset.weapon}
              </div>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.45;">
                <span style="color: var(--gold); font-weight: bold;">🔑 武器型態：</span>${preset.aspect} 
                <span style="color: ${aspectBadgeColor}; font-weight: bold; background: ${aspectBgColor}; border: ${aspectBorder}; padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-left: 6px; display: inline-block;">${aspectStatusText}</span>
                <div style="margin-top: 4px; font-size: 0.78rem; font-style: italic; color: rgba(255,255,255,0.55);">${preset.aspectNote}</div>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
                ${boonsDirectionsHtml}
              </div>
              
              ${buildTips}
              
              <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                <button class="rec-preset-btn-action primary" data-action="full" data-preset-id="${preset.id}" style="background: var(--gold); color: var(--bg-dark); border: none; cursor: pointer; font-family: var(--font-body); font-weight: 700; font-size: 0.82rem; padding: 7px 14px; border-radius: 6px; transition: var(--transition-smooth); box-shadow: 0 0 10px rgba(212,175,55,0.15);">一鍵載入流派配置</button>
              </div>
            </div>
          `;
        });
        
        const weaponNames = {
          witch_staff: "女巫之杖 (Witch's Staff)",
          sister_blades: "姊妹雙刃 (Sister Blades)",
          umbral_flames: "暗影之炬 (Umbral Flames)",
          moonstone_axe: "月石之斧 (Moonstone Axe)",
          argent_skull: "銀白之顱 (Argent Skull)",
          black_coat: "黑色戰甲 (Black Coat)"
        };
        const currentWeaponZh = weaponNames[currentWeapon] || "當前武器";

        recContent.innerHTML = `
          <div class="recommendation-section">
            <div class="recommendation-sec-title">🔮 武器專屬流派指引</div>
            <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 12px;">
              您當前選擇了武器 <strong>【${currentWeaponZh}】</strong>，奧林帕斯眾神為您指引以下推薦流派發展走向與後續祝福選擇：
            </div>
            
            ${presetsHtml}
          </div>
        `;
        
        // 綁定按鈕事件
        const actionBtns = recContent.querySelectorAll(".rec-preset-btn-action");
        actionBtns.forEach(btn => {
          btn.addEventListener("click", () => {
            const presetId = btn.getAttribute("data-preset-id");
            const preset = hades2BuildPresets.find(p => p.id === presetId);
            if (preset) {
              loadPresetBuild(preset);
            }
          });
        });
        
      } else {
        recPanel.classList.remove("has-content");
        if (recBadge) recBadge.style.display = "none";
        recContent.innerHTML = `
          <span class="slot-empty-text" style="font-style: normal; line-height: 1.6; display: block;">
            💡 <strong>冥府指引：</strong>請在左側【選擇武器】或【裝配核心祝福】，奧林帕斯眾神將隨即為您解析後續發展走向、增傷搭檔及神級流派推薦！
          </span>
        `;
      }
      return;
    }

    recPanel.classList.add("has-content");
    if (recBadge) recBadge.style.display = "inline-block";

    let html = "";

    // 1. 【起源增傷互補搭檔推薦】
    html += `
      <div class="recommendation-section">
        <div class="recommendation-sec-title">⚡ 「起源」詛咒增傷互補搭檔</div>
    `;

    if (activeCurses.size >= 2) {
      html += `
        <div class="origination-recommendation active">
          <div class="origination-rec-title">🎉 起源雙重增傷已成功啟動！</div>
          <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
            您當前擁有 <strong>${activeCurses.size}</strong> 種狀態詛咒（${Array.from(activeCurses).map(c => translateCurse(c)).join("、")}），已完美激活奧秘卡牌【XIV. 起源】的 <strong>+25% 全傷加成</strong>！
          </div>
        </div>
      `;
    } else {
      // 找出還缺少的狀態詛咒
      const allCursesInfo = [
        { key: "Blitz", god: "zeus", name: "雷霆", godZh: "宙斯" },
        { key: "Hitch", god: "hera", name: "繫結", godZh: "赫拉" },
        { key: "Slip", god: "poseidon", name: "浪沫", godZh: "波賽頓" },
        { key: "Daze", god: "apollo", name: "眩暈", godZh: "阿波羅" },
        { key: "Weak", god: "aphrodite", name: "虛弱", godZh: "阿芙蘿黛蒂" },
        { key: "Scorch", god: "hestia", name: "灼燬", godZh: "赫斯提亞" },
        { key: "Freeze", god: "demeter", name: "凍結", godZh: "荻米特" },
        { key: "Vent", god: "hephaestus", name: "鑠金", godZh: "赫菲斯托斯" }
      ];

      const missingCurses = allCursesInfo.filter(c => !activeCurses.has(c.key));
      const currentCurseName = activeCurses.size === 1 ? translateCurse(Array.from(activeCurses)[0]) : "無";

      html += `
        <div class="origination-recommendation">
          <div class="origination-rec-title" style="color: #ff9d42;">⚠️ 尚缺一種狀態詛咒啟用增傷</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 8px;">
            當前已有狀態：<strong>${currentCurseName}</strong>。只要再補一個不同狀態，即可常駐增傷 +25%。後續推薦選擇：
          </div>
          <div class="origination-rec-list">
      `;

      // 智慧推薦 3 個最契合的補詛咒神明
      missingCurses.slice(0, 3).forEach(c => {
        const godInfo = hades2BoonsData.gods[c.god];
        
        // 智慧尋找不與現有詛咒或已佔用槽位衝突的推薦祝福
        const emptySlots = slots.filter(slot => !activeBuild[slot]);
        const slotsWithoutCurse = slots.filter(slot => {
          const b = activeBuild[slot];
          return !b || !b.curse || b.curse === "None";
        });

        // 優先在完全空置的槽位中尋找能提供該詛咒的祝福，其次在無詛咒的槽位中尋找，最後退而求其次
        let recBoon = hades2BoonsData.boons.find(b => 
          b.god === c.god && 
          b.curse === c.key && 
          emptySlots.includes(b.slot)
        );
        
        if (!recBoon) {
          recBoon = hades2BoonsData.boons.find(b => 
            b.god === c.god && 
            b.curse === c.key && 
            slotsWithoutCurse.includes(b.slot)
          );
        }
        
        if (!recBoon) {
          recBoon = hades2BoonsData.boons.find(b => b.god === c.god && b.curse === c.key);
        }

        const boonNameHtml = recBoon ? `（如裝配於【${translateSlot(recBoon.slot)}】槽位的：<span style="color:${godInfo.themeColor};">${recBoon.name}</span>）` : "";
        html += `
          <div class="origination-rec-god-item">
            <span style="color:var(--green-glow);">✦</span>
            <span>
              <span class="origination-rec-god-name" style="--god-color: ${godInfo.themeColor};">${godInfo.name}</span>
              提供【${c.name}】狀態${boonNameHtml}
            </span>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }
    html += `</div>`;

    // 2. 【後續強力雙重/傳奇解鎖路徑】
    // 分析所有 Duo / Legendary 祝福的前置，看當前裝配是否包含其中某個前置組件
    const allSpecialBoons = hades2BoonsData.boons.filter(b => b.slot === "Duo" || b.slot === "Legendary");
    const matchedSpecialBoons = [];

    allSpecialBoons.forEach(specialBoon => {
      if (!specialBoon.prerequisites) return;

      const reqs = specialBoon.prerequisites.requirements;
      let matchedSome = false;
      const progressDetails = [];

      reqs.forEach(req => {
        // 檢查當前裝配是否包含此 req 的 options 之一
        const isSatisfied = req.options.some(optId => equippedBoonIds.has(optId));
        if (isSatisfied) {
          matchedSome = true;
          progressDetails.push({ god: req.god, satisfied: true, label: `已具備 ${hades2BoonsData.gods[req.god].name.split(" ")[0]}` });
        } else {
          progressDetails.push({ god: req.god, satisfied: false, label: `尚缺 ${hades2BoonsData.gods[req.god].name.split(" ")[0]}`, options: req.options });
        }
      });

      if (matchedSome) {
        matchedSpecialBoons.push({
          boon: specialBoon,
          reqs: progressDetails
        });
      }
    });

    html += `
      <div class="recommendation-section">
        <div class="recommendation-sec-title">🔗 建議解鎖強力雙重/傳奇路徑</div>
        <div class="recommendation-list">
    `;

    if (matchedSpecialBoons.length === 0) {
      html += `<span class="slot-empty-text" style="font-size:0.8rem;">目前核心祝福暫無可適配的雙重/傳奇解鎖走向。</span>`;
    } else {
      matchedSpecialBoons.forEach(item => {
        const godInfo = hades2BoonsData.gods[item.boon.god] || { themeColor: "#fff" };
        const badgeClass = item.boon.slot.toLowerCase();
        const badgeZh = item.boon.slot === "Duo" ? "雙重" : "傳奇";
        
        // 渲染解鎖條件進度
        const prereqList = item.reqs.map(r => {
          if (r.satisfied) {
            return `<span class="fulfilled" style="color: var(--green-glow);">${r.label}</span>`;
          } else {
            // 尋找尚缺神明的一個推薦祝福
            const missingBoonId = r.options[0];
            const missingBoon = hades2BoonsData.boons.find(b => b.id === missingBoonId);
            const missingBoonName = missingBoon ? `『${missingBoon.name}』` : "相關祝福";
            return `<span class="missing" style="color: #ff9d42;">${r.label} (後續建議選擇 ${hades2BoonsData.gods[r.god].name.split(" ")[0]} ${missingBoonName})</span>`;
          }
        }).join(" / ");

        const isEquipped = activeBuild.passives.has(item.boon.id);
        const actionButtonHtml = isEquipped 
          ? `<span style="color: var(--green-glow); font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 4px;">✅ 已裝配</span>`
          : `<button class="rec-equip-passive-btn" data-boon-id="${item.boon.id}" style="background: transparent; border: 1px solid var(--gold); color: var(--gold); font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-family: var(--font-body); font-weight: 700; transition: var(--transition-smooth); outline: none;">裝配</button>`;

        html += `
          <div class="recommendation-item" style="--god-color: ${godInfo.themeColor};">
            <div class="recommendation-item-header">
              <span class="recommendation-item-title" style="color: ${godInfo.themeColor};">${item.boon.name}</span>
              <div style="display: flex; align-items: center; gap: 8px;">
                ${actionButtonHtml}
                <span class="boon-card-badge ${badgeClass}" style="font-size: 0.65rem; padding: 1px 4px;">${badgeZh}</span>
              </div>
            </div>
            <div class="recommendation-item-desc">${item.boon.desc}</div>
            <div class="recommendation-item-prereq">
              <strong>路徑要求：</strong>${prereqList}
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>
    `;

    // 3. 【神級流派走向匹配】
    // 比對 hades2BuildPresets 尋找核心匹配的 preset
    // 3. 【神級流派走向匹配】
    // 比對 hades2BuildPresets 尋找核心與型態匹配的 preset
    const matchedPresets = [];
    const currentAspect = activeBuild.aspect;
    
    hades2BuildPresets.forEach(preset => {
      // 限制匹配當前選取的武器，若選取了型態也限制必須匹配型態
      if (preset.weaponKey !== activeBuild.weapon) return;
      if (currentAspect && preset.aspectKey !== currentAspect) return;

      // 只要當前裝備的祝福有出現在 preset 核心槽位中，就算匹配
      let matchCount = 0;
      Object.keys(preset.coreBoons).forEach(slotKey => {
        const pBoonId = preset.coreBoons[slotKey];
        if (equippedBoonIds.has(pBoonId)) {
          matchCount++;
        }
      });

      if (matchCount > 0) {
        matchedPresets.push({
          preset: preset,
          matchCount: matchCount
        });
      }
    });

    // 依照匹配度排序
    matchedPresets.sort((a, b) => b.matchCount - a.matchCount);

    html += `
      <div class="recommendation-section">
        <div class="recommendation-sec-title">🏆 推薦神級流派與後續祝福方向</div>
    `;

    if (matchedPresets.length === 0) {
      html += `<span class="slot-empty-text" style="font-size:0.8rem;">目前配置暫未匹配到預設流派，您可以繼續豐富核心祝福。</span>`;
    } else {
      matchedPresets.forEach((match, index) => {
        const bestMatch = match.preset;
        const essentialSlots = bestMatch.essentialSlots || [];
        let essentialHtml = "";
        let optionalHtml = "";
        
        Object.keys(bestMatch.coreBoons).forEach(slotKey => {
          const boonId = bestMatch.coreBoons[slotKey];
          const boon = hades2BoonsData.boons.find(b => b.id === boonId);
          if (!boon) return;
          
          const isEquipped = equippedBoonIds.has(boonId);
          const godInfo = hades2BoonsData.gods[boon.god] || { themeColor: "#fff", name: "" };
          const slotZh = translateSlot(slotKey);
          const isEssential = essentialSlots.includes(slotKey);
          
          let itemHtml = "";
          if (isEquipped) {
            itemHtml = `
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px; padding: 4px 8px; background: rgba(24, 242, 153, 0.05); border: 1px solid ${isEssential ? "rgba(255, 89, 42, 0.35)" : "rgba(24, 242, 153, 0.15)"}; border-radius: 6px;">
                <span>✅ <strong style="color: var(--green-glow);">已解鎖</strong>【${slotZh}】：<span style="color: ${godInfo.themeColor}; font-weight: 700;">${boon.name}</span> (${godInfo.name.split(" ")[0]})</span>
                <span style="color: var(--text-muted); font-size: 0.75rem;">已裝配</span>
              </div>
            `;
          } else {
            itemHtml = `
              <div style="display: flex; flex-direction: column; font-size: 0.82rem; margin-bottom: 6px; padding: 6px 8px; background: rgba(255, 255, 255, 0.02); border: 1px dashed ${isEssential ? "rgba(255, 89, 42, 0.35)" : "rgba(69, 163, 255, 0.25)"}; border-radius: 6px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>➡️ <strong style="color: #ff9d42;">後續建議</strong>【${slotZh}】：<span style="color: ${godInfo.themeColor}; font-weight: 700;">${boon.name}</span> (${godInfo.name.split(" ")[0]})</span>
                  <span style="color: #ff9d42; font-weight: 600; font-size: 0.75rem;">待獲取</span>
                </div>
                <div style="color: var(--text-muted); font-size: 0.76rem; margin-top: 4px; line-height: 1.35;">${boon.desc}</div>
              </div>
            `;
          }

          if (isEssential) {
            essentialHtml += itemHtml;
          } else {
            optionalHtml += itemHtml;
          }
        });

        let boonsDirectionsHtml = "";
        if (essentialHtml) {
          boonsDirectionsHtml += `
            <div class="boon-group-title" style="font-family: var(--font-title); font-size: 0.85rem; color: #ff592a; margin-top: 10px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; font-weight: bold; border-left: 2px solid #ff592a; padding-left: 6px;">🔥 核心必備祝福 (流派運作關鍵)</div>
            ${essentialHtml}
          `;
        }
        if (optionalHtml) {
          boonsDirectionsHtml += `
            <div class="boon-group-title" style="font-family: var(--font-title); font-size: 0.85rem; color: #45a3ff; margin-top: 14px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; font-weight: bold; border-left: 2px solid #45a3ff; padding-left: 6px;">💡 建議搭配/後續加強</div>
            ${optionalHtml}
          `;
        }

        const buildTips = bestMatch.tips ? `<div style="font-size: 0.8rem; color: var(--gold); border-left: 2px solid var(--gold); padding-left: 6px; margin: 10px 0; line-height: 1.45;"><strong>💡 運行策略建議：</strong>${bestMatch.tips}</div>` : "";

        const allCoreBoonsEquipped = Object.values(bestMatch.coreBoons).every(boonId => equippedBoonIds.has(boonId));
        const actionButtonsHtml = allCoreBoonsEquipped
          ? `
            <div style="display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; background: rgba(24, 242, 153, 0.08); border: 1px solid rgba(24, 242, 153, 0.25); border-radius: 8px; margin-top: 8px; color: var(--green-glow); font-family: var(--font-title); font-size: 0.82rem; font-weight: bold; text-shadow: 0 0 8px rgba(24, 242, 153, 0.3); width: 100%;">
              🎉 本流派核心配置已完美裝配成型！
            </div>
          `
          : `
            <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
              <button class="rec-preset-btn-action secondary" data-action="full" data-preset-id="${bestMatch.id}" style="background: transparent; border: 1px solid var(--gold); color: var(--gold); cursor: pointer; font-family: var(--font-body); font-weight: 700; font-size: 0.8rem; padding: 6px 12px; border-radius: 6px; transition: var(--transition-smooth);">載入完整流派</button>
              <button class="rec-preset-btn-action primary" data-action="complement" data-preset-id="${bestMatch.id}" style="background: var(--gold); color: var(--bg-dark); border: none; cursor: pointer; font-family: var(--font-body); font-weight: 700; font-size: 0.8rem; padding: 6px 12px; border-radius: 6px; transition: var(--transition-smooth);">一鍵補全剩餘</button>
            </div>
          `;

        const badgeText = index === 0 ? "最契合流派" : "次契合流派";
        const aspectBadgeColor = bestMatch.aspectEssential ? "#ff592a" : "#18f299";
        const aspectBgColor = bestMatch.aspectEssential ? "rgba(255, 89, 42, 0.15)" : "rgba(24, 242, 153, 0.15)";
        const aspectBorder = bestMatch.aspectEssential ? "1px solid #ff592a" : "1px solid #18f299";
        const aspectStatusText = bestMatch.aspectEssential ? "核心必須" : "任意 (建議)";

        html += `
          <div class="rec-preset-card" style="margin-top: 8px; margin-bottom: 15px;">
            <div class="rec-preset-title" style="margin-bottom: 6px;">
              <span>流派：${bestMatch.title}</span>
              <span class="preset-tag highlight" style="font-size: 0.68rem; margin: 0; padding: 2px 6px;">${badgeText}</span>
            </div>
            <div class="rec-preset-weapon" style="margin-bottom: 6px; font-size: 0.82rem; color: var(--text-main); font-weight: 600;">
              🪓 推薦武器：${bestMatch.weapon}
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.45;">
              <span style="color: var(--gold); font-weight: bold;">🔑 武器型態：</span>${bestMatch.aspect} 
              <span style="color: ${aspectBadgeColor}; font-weight: bold; background: ${aspectBgColor}; border: ${aspectBorder}; padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-left: 6px; display: inline-block;">${aspectStatusText}</span>
              <div style="margin-top: 4px; font-size: 0.78rem; font-style: italic; color: rgba(255,255,255,0.55);">${bestMatch.aspectNote}</div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
              ${boonsDirectionsHtml}
            </div>
            
            ${buildTips}
            
            ${actionButtonsHtml}
          </div>
        `;
      });
    }

    html += `</div>`;

    // 4. 【奧秘與武器搭配建議】
    html += `
      <div class="recommendation-section">
        <div class="recommendation-sec-title">🔮 奧秘與武器型態搭配指南</div>
        <div class="rec-combo-box">
    `;

    // 智慧搭配話術
    let weaponAdvise = "";
    const selectedWeapon = activeBuild.weapon;
    
    if (selectedWeapon === "sister_blades") {
      weaponAdvise = "您已選擇【姊妹雙刃】。建議利用其高速近戰特點，搭配技能扇形飛刀或瞬移背擊，爆發增傷極限！";
    } else if (selectedWeapon === "witch_staff") {
      weaponAdvise = "您已選擇【女巫之杖】。建議利用其中遠程安全距離進行 Omega 招式引導，搭配法陣控場！";
    } else if (selectedWeapon === "moonstone_axe") {
      weaponAdvise = "您已選擇【月石之斧】。重斧打擊面板極高但硬直大，建議利用衝刺起手或搭配高額爆震祝福！";
    } else if (selectedWeapon === "umbral_flames") {
      weaponAdvise = "您已選擇【暗影之炬】。建議利用技能遠程彈幕環繞進行中距離拉扯，瘋狂多段疊加狀態傷害！";
    } else if (selectedWeapon === "argent_skull") {
      weaponAdvise = "您已選擇【銀白之顱】。建議發射骷髏後使用技能前衝擊飛並快速回收骷髏，生存容錯極高！";
    } else if (selectedWeapon === "black_coat") {
      weaponAdvise = "您已選擇【黑色戰甲】。戰甲防守與反擊能力強大，建議蓄力反彈飛行道具，並利用Omega招式施加高額單體核爆！";
    } else {
      weaponAdvise = "根據當前武器型態，合理搭配對應的核心與被動祝福進行逃脫。";
    }
    
    let arcanaAdvise = "【XIV. 起源】（狀態詛咒增傷）、【VI. 復仇三女神】（法陣增傷）";

    if (equippedGods.has("poseidon") && equippedGods.has("hera")) {
      weaponAdvise = "您已選擇【姊妹雙刃】。其技能扇形飛刀能完美觸發波賽頓特殊擊退，配合赫拉攻擊掛繫結，分享全場傷害！";
      arcanaAdvise = "極力推薦啟用【XIV. 起源】與【IX. 命運】（利於獲取所需祝福）。";
    } else if (equippedGods.has("apollo")) {
      weaponAdvise = "您已選擇【女巫之杖】。利用其超長打擊距離配合阿波羅大範圍法陣【閃焰環發】安全輸出。";
      arcanaAdvise = "必點奧秘【VI. 復仇三女神】（法陣增傷）與【XIV. 起源】。";
    } else if (equippedGods.has("hephaestus") && equippedGods.has("hestia")) {
      weaponAdvise = "您已選擇【月石之斧】。利用重斧極高單次面板，完美搭配赫菲斯托斯【燄山痛擊】的冷卻大爆炸！";
      arcanaAdvise = "推薦啟用【XXIII. 力量】（低血高防護盾）與【X. 巨力】（增加打擊力度）。";
    }

    html += `
          <div class="rec-combo-item">
            <span class="rec-combo-label">⚔️ 武器特色建議：</span>
            <span>${weaponAdvise}</span>
          </div>
          <div class="rec-combo-item">
            <span class="rec-combo-label">🎴 推薦啟用奧秘：</span>
            <span>${arcanaAdvise}</span>
          </div>
        </div>
      </div>
    `;

    // 將 HTML 寫入內容區域
    recContent.innerHTML = html;

    // 綁定「一鍵載入/補全流派」按鈕事件
    const actionBtns = recContent.querySelectorAll(".rec-preset-btn-action");
    actionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const presetId = btn.getAttribute("data-preset-id");
        const action = btn.getAttribute("data-action");
        const preset = hades2BuildPresets.find(p => p.id === presetId);
        if (!preset) return;

        if (action === "full") {
          loadPresetBuild(preset);
        } else if (action === "complement") {
          // 一鍵補全剩餘空置槽位
          let complCount = 0;
          Object.keys(preset.coreBoons).forEach(slot => {
            const boonId = preset.coreBoons[slot];
            const boon = hades2BoonsData.boons.find(b => b.id === boonId);
            if (boon && !activeBuild[slot]) {
              activeBuild[slot] = boon;
              renderPlannerSlot(slot);
              complCount++;
            }
          });
          if (complCount > 0) {
            autoEquipSatisfiedSpecialBoons();
            updatePlannerState();
            alert(`🎉 已成功為您在空置槽位中補全 ${complCount} 個「${preset.title}」核心祝福，並自動加載了已解鎖的雙重/傳奇被動！`);
          } else {
            alert("您的所有槽位都已裝配了祝福，無法進行空白補全。您可以點擊「載入完整流派」以進行完全覆蓋！");
          }
        }
      });
    });

    // 綁定「裝配」推薦被動按鈕事件
    const equipBtns = recContent.querySelectorAll(".rec-equip-passive-btn");
    equipBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const boonId = btn.getAttribute("data-boon-id");
        activeBuild.passives.add(boonId);
        updatePlannerState();
        const boon = hades2BoonsData.boons.find(b => b.id === boonId);
        if (boon) {
          alert(`🎉 已成功將被動/特殊祝福「${boon.name}」直接裝配到您的被動清單中！`);
        }
      });
    });
  }

  // 渲染被動與特殊祝福列表
  function renderPassiveBoons() {
    const container = document.getElementById("planner-passive-list");
    if (!container) return;

    container.innerHTML = "";

    if (activeBuild.passives.size === 0) {
      container.innerHTML = `<span class="slot-empty-text" style="font-size: 0.85rem; font-style: italic;">目前尚未裝配任何被動或特殊祝福。</span>`;
      return;
    }

    activeBuild.passives.forEach(boonId => {
      const boon = hades2BoonsData.boons.find(b => b.id === boonId);
      if (!boon) return;

      const godInfo = hades2BoonsData.gods[boon.god] || { themeColor: "#fff", name: "未知" };
      const item = document.createElement("div");
      item.className = "passive-boon-item-row";
      item.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(23, 28, 38, 0.6);
        border: 1px solid var(--border-color);
        border-left: 4px solid ${godInfo.themeColor};
        padding: 10px 14px;
        border-radius: 8px;
        margin-bottom: 2px;
      `;

      let badgeClass = "passive";
      let badgeText = "被動";
      if (boon.slot === "Duo") {
        badgeClass = "duo";
        badgeText = "雙重";
      } else if (boon.slot === "Legendary") {
        badgeClass = "legendary";
        badgeText = "傳奇";
      }

      item.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 700; font-size: 0.95rem; color: ${godInfo.themeColor};">${boon.name}</span>
            <span class="boon-card-badge ${badgeClass}" style="font-size: 0.65rem; padding: 1px 4px;">${badgeText}</span>
          </div>
          <span style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">${boon.desc}</span>
        </div>
        <button class="passive-clear-btn" data-id="${boon.id}" title="清除裝配" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.2rem; padding: 2px 8px; transition: var(--transition-smooth);">✕</button>
      `;

      // Clear passive button
      item.querySelector(".passive-clear-btn").addEventListener("click", () => {
        activeBuild.passives.delete(boon.id);
        renderPassiveBoons();
        updatePlannerState();
      });

      // Hover effect on clear button
      const clearBtn = item.querySelector(".passive-clear-btn");
      clearBtn.addEventListener("mouseenter", () => {
        clearBtn.style.color = "#ff4a4a";
      });
      clearBtn.addEventListener("mouseleave", () => {
        clearBtn.style.color = "var(--text-muted)";
      });

      container.appendChild(item);
    });
  }

  function translateCurse(curse) {
    const zh = { Blitz: "雷霆 (宙斯)", Hitch: "繫結 (赫拉)", Slip: "浪沫 (波賽頓)", Daze: "眩暈 (阿波羅)", Weak: "虛弱 (阿芙蘿黛蒂)", Scorch: "灼燬 (赫斯提亞)", Freeze: "凍結 (荻米特)", Cyclone: "冰旋風 (荻米特)", Vent: "鑠金 (赫菲斯托斯)" };
    return zh[curse] || curse;
  }




  // ==========================================
  // --- 4. 祝福百科與前置解鎖 (Boon Encyclopedia) 邏輯 ---
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

  // 渲染祝福展示網格
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
      gridEl.innerHTML = `<div class="slot-empty-text" style="grid-column: 1/-1; text-align: center; padding: 40px 0;">目前無符合篩選條件的祝福。</div>`;
      return;
    }

    filtered.forEach(boon => {
      const card = document.createElement("div");
      card.className = "boon-card";
      
      const curGod = hades2BoonsData.gods[boon.god] || activeGodInfo;
      card.style.setProperty("--god-color", curGod.themeColor);
      card.style.setProperty("--god-glow-color", curGod.glowColor);

      // 槽位名稱中文化 (對齊 Xbox)
      const slotsZh = { Attack: "攻擊", Special: "技能", Cast: "法陣", Dash: "衝刺", Gain: "魔力", Passive: "被動效果", Duo: "雙重祝福", Legendary: "傳奇祝福" };
      
      let badgeHtml = "";
      if (boon.slot === "Duo") {
        badgeHtml = `<span class="boon-card-badge duo">雙重祝福</span>`;
      } else if (boon.slot === "Legendary") {
        badgeHtml = `<span class="boon-card-badge legendary">傳奇祝福</span>`;
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

      // 點擊事件：如果是雙重/傳奇，開啟前置路徑規劃，其餘普通祝福可選擇直接裝載或查看
      card.addEventListener("click", () => {
        if (boon.slot === "Duo" || boon.slot === "Legendary") {
          openPathFinder(boon);
        } else {
          // 普通祝福提示可到裝配區裝配
          const confirmEquip = confirm(`要將「${boon.name}」裝配到您的構築規劃器中嗎？`);
          if (confirmEquip) {
            const coreSlots = ["Attack", "Special", "Cast", "Dash", "Gain"];
            if (coreSlots.includes(boon.slot)) {
              equipBoon(boon.slot, boon);
              switchTab("planner");
            } else {
              activeBuild.passives.add(boon.id);
              updatePlannerState();
              switchTab("planner");
              alert(`🎉 已成功將被動/特殊祝福「${boon.name}」裝配到您的規劃器列表中！`);
            }
          }
        }
      });

      gridEl.appendChild(card);
    });
  }

  // 渲染雙重祝福 X-Y 關係矩陣
  function renderDuoMatrix() {
    const matrixTable = document.getElementById("duo-combination-matrix");
    if (!matrixTable) return;

    const matrixGods = [
      { key: "zeus", name: "宙斯 (Zeus)" },
      { key: "hera", name: "赫拉 (Hera)" },
      { key: "poseidon", name: "波賽頓 (Poseidon)" },
      { key: "apollo", name: "阿波羅 (Apollo)" },
      { key: "aphrodite", name: "阿芙蘿黛蒂 (Aphrodite)" },
      { key: "hestia", name: "赫斯提亞 (Hestia)" },
      { key: "demeter", name: "荻米特 (Demeter)" },
      { key: "hephaestus", name: "赫菲斯托斯 (Hephaestus)" },
      { key: "hermes", name: "赫米斯 (Hermes)" }
    ];

    let theadHtml = `<thead><tr><th>橫縱軸神明</th>`;
    matrixGods.forEach(god => {
      theadHtml += `<th>${god.name.split(" ")[0]}</th>`;
    });
    theadHtml += `</tr></thead>`;

    let tbodyHtml = "<tbody>";
    matrixGods.forEach(rowGod => {
      tbodyHtml += `<tr><td class="matrix-row-header">${rowGod.name.split(" ")[0]}</td>`;
      matrixGods.forEach(colGod => {
        if (rowGod.key === colGod.key) {
          // 對角線：查找該神明的傳奇祝福
          const legendaryBoon = hades2BoonsData.boons.find(b => b.god === rowGod.key && b.slot === "Legendary");
          if (legendaryBoon) {
            tbodyHtml += `<td class="matrix-diagonal-cell has-legendary" data-boon-id="${legendaryBoon.id}" title="點擊查看傳奇祝福解鎖路徑">
               <div style="font-size:0.75rem;">★ 傳奇 ★</div>
              <div class="matrix-duo-name" style="color: #ff592a; font-size:0.8rem; text-shadow:0 0 5px rgba(255, 89, 42, 0.4);">${legendaryBoon.name}</div>
            </td>`;
          } else {
            tbodyHtml += `<td class="matrix-diagonal-cell">—</td>`;
          }
        } else {
          // 非對角線：查找雙重祝福
          const duoBoon = hades2BoonsData.boons.find(b => 
             b.slot === "Duo" && 
             b.prerequisites.gods.includes(rowGod.key) && 
             b.prerequisites.gods.includes(colGod.key)
          );

          if (duoBoon) {
            tbodyHtml += `<td class="matrix-duo-cell" data-boon-id="${duoBoon.id}" title="點擊查看雙重祝福解鎖路徑">
              <div class="matrix-duo-cell-inner">
                <span class="matrix-duo-name">${duoBoon.name}</span>
                <span class="matrix-duo-sub">雙重祝福</span>
              </div>
            </td>`;
          } else {
            tbodyHtml += `<td class="matrix-empty-cell">—</td>`;
          }
        }
      });
      tbodyHtml += "</tr>";
    });
    tbodyHtml += "</tbody>";

    matrixTable.innerHTML = theadHtml + tbodyHtml;

    // 綁定點擊事件
    matrixTable.querySelectorAll(".matrix-duo-cell, .matrix-diagonal-cell.has-legendary").forEach(cell => {
      cell.addEventListener("click", () => {
        const boonId = cell.getAttribute("data-boon-id");
        const boon = hades2BoonsData.boons.find(b => b.id === boonId);
        if (boon) {
          openPathFinder(boon);
        }
      });
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
  const pathFlowchart = document.getElementById("path-flowchart");
  
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
    pathTypeBadge.textContent = boon.slot === "Duo" ? "雙重祝福" : "傳奇祝福";
    pathTypeBadge.className = `boon-card-badge ${boon.slot.toLowerCase()}`;
    pathDescText.innerHTML = `<strong>效果：</strong>${boon.desc}<br><br>這是一個強力的特殊祝福。在下方勾選您已獲得的祝福，模擬前置路徑。`;

    pathObtainedBoons.clear();

    // 渲染前置條件選項
    const reqs = boon.prerequisites.requirements;
    
    // 清空動態步驟容器
    pathFlowchart.innerHTML = "";
    
    reqs.forEach((req, index) => {
      const god = hades2BoonsData.gods[req.god];
      if (!god) return;
      
      const stepBox = document.createElement("div");
      stepBox.className = "flowchart-step";
      
      const stepTitle = document.createElement("div");
      stepTitle.className = "step-title";
      stepTitle.textContent = `${god.name.split(" ")[0]} 前置需求集 ${index + 1}（以下任選一項）`;
      
      const stepOptionsList = document.createElement("div");
      stepOptionsList.className = "step-options-list";
      
      stepBox.appendChild(stepTitle);
      stepBox.appendChild(stepOptionsList);
      pathFlowchart.appendChild(stepBox);
      
      renderPathOptions(stepOptionsList, req.options);
    });

    updatePathProgress();
  }

  function renderPathOptions(containerEl, optionIds) {
    containerEl.innerHTML = "";
    
    optionIds.forEach(id => {
      const boon = hades2BoonsData.boons.find(b => b.id === id);
      if (!boon) return;

      const item = document.createElement("div");
      item.className = "step-option-item";
      item.setAttribute("data-boon-id", id);
      item.innerHTML = `
        <div class="step-option-checkbox"></div>
        <span class="step-option-text">${boon.name} (${translateSlot(boon.slot)})</span>
      `;

      item.addEventListener("click", () => {
        if (pathObtainedBoons.has(id)) {
          pathObtainedBoons.delete(id);
          item.classList.remove("checked");
        } else {
          // 檢查核心槽位衝突 (攻擊、技能、法陣、衝刺、魔力)
          const coreSlots = ["Attack", "Special", "Cast", "Dash", "Gain"];
          if (coreSlots.includes(boon.slot)) {
            // 尋找已勾選且同槽位的其他衝突祝福
            const conflictId = Array.from(pathObtainedBoons).find(checkedId => {
              const b = hades2BoonsData.boons.find(x => x.id === checkedId);
              return b && b.slot === boon.slot && b.id !== boon.id;
            });

            if (conflictId) {
              // 移除衝突祝福的勾選狀態與 DOM 樣式
              pathObtainedBoons.delete(conflictId);
              const conflictingEl = document.querySelector(`.step-option-item[data-boon-id="${conflictId}"]`);
              if (conflictingEl) {
                conflictingEl.classList.remove("checked");
              }
            }
          }

          pathObtainedBoons.add(id);
          item.classList.add("checked");
        }
        updatePathProgress();
      });

      containerEl.appendChild(item);
    });
  }

  // 對齊 Xbox 插槽中文
  function translateSlot(slot) {
    const zh = { Attack: "攻擊", Special: "技能", Cast: "法陣", Dash: "衝刺", Gain: "魔力", Passive: "被動" };
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
      pathDescText.innerHTML = `<strong>效果：</strong>${currentPathBoon.desc}<br><br>請勾選以達標。當前進度為 ${percent}%。還需要補充其他神明的第一階段前置技能。`;
    }
  }

  // 綁定「一鍵套用前置到構築規劃器」
  pathApplyBtn.addEventListener("click", () => {
    if (pathObtainedBoons.size === 0) {
      alert("請先在左邊勾選您想要模擬套用的前置祝福！");
      return;
    }

    let coreCount = 0;
    let passiveCount = 0;

    pathObtainedBoons.forEach(id => {
      const boon = hades2BoonsData.boons.find(b => b.id === id);
      if (boon) {
        const coreSlots = ["Attack", "Special", "Cast", "Dash", "Gain"];
        if (coreSlots.includes(boon.slot)) {
          activeBuild[boon.slot] = boon;
          renderPlannerSlot(boon.slot);
          coreCount++;
        } else {
          activeBuild.passives.add(boon.id);
          passiveCount++;
        }
      }
    });

    // 將目標雙重/傳奇祝福本身也加入被動列表中，使其更完整！
    if (currentPathBoon) {
      activeBuild.passives.add(currentPathBoon.id);
      passiveCount++;
    }

    const totalCount = coreCount + passiveCount;
    if (totalCount > 0) {
      updatePlannerState();
      alert(`🎉 成功套用前置配置！\n• 核心祝福：已裝配 ${coreCount} 個\n• 被動與目標祝福：已裝配 ${passiveCount} 個\n\n已自動為您跳轉至構築規劃面板。`);
      switchTab("planner");
    } else {
      alert("無效的祝福配置，無法套用。");
    }
  });

  // 綁定「直接裝配此被動到規劃器」
  const btnEquipPathBoonDirectly = document.getElementById("btn-equip-path-boon-directly");
  if (btnEquipPathBoonDirectly) {
    btnEquipPathBoonDirectly.addEventListener("click", () => {
      if (!currentPathBoon) {
        alert("無效的祝福，無法裝配。");
        return;
      }
      activeBuild.passives.add(currentPathBoon.id);
      updatePlannerState();
      alert(`🎉 已成功將被動/特殊祝福「${currentPathBoon.name}」直接裝配到您的被動清單中！`);
      switchTab("planner");
    });
  }



  // ==========================================
  // --- 6. 阿卡納奧秘配置模擬器 (Arcana Cards) 邏輯 ---
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

    // 奧秘牌對應圖示（精美文字或 Emoji 體現主題，對齊最新 25 張牌）
    const cardIcons = {
      1: "🔮", 2: "🏃", 3: "🏹", 4: "⏳", 5: "🌙",
      6: "🔱", 7: "🛡️", 8: "🕊️", 9: "👻", 10: "🌌",
      11: "⚡", 12: "💀", 13: "🐎", 14: "🎯", 15: "💖",
      16: "🃏", 17: "🛶", 18: "🛠️", 19: "✨", 20: "👑",
      21: "🎲", 22: "🏆", 23: "💪", 24: "💎", 25: "⚖️"
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
    arcanaDetailCost.textContent = `掌握消耗：${card.cost}`;
    arcanaDetailDesc.textContent = card.desc;
  }

  // 如果有選中的牌，可以保持顯示選中牌的詳情，否則放回 Placeholder
  function hideCardDetailsIfNoActive() {
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

  // 更新奧秘卡牌計量表與啟用列表
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

    // 更新掌握值計量表
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

    const filterWeaponSelect = document.getElementById("select-guide-weapon");
    const selectedWeapon = filterWeaponSelect ? filterWeaponSelect.value : "all";

    hades2BuildPresets.forEach(preset => {
      // 根據選擇的武器篩選
      if (selectedWeapon !== "all" && preset.weaponKey !== selectedWeapon) {
        return;
      }

      const card = document.createElement("article");
      card.className = "preset-card";

      // 產生標籤
      const tagsHtml = preset.features.map(f => `<span class="preset-tag">${f}</span>`).join("");
      
      // 產生核心關鍵與建議配置 HTML
      const essentialSlots = preset.essentialSlots || [];
      let essentialHtml = "";
      let optionalHtml = "";
      
      Object.keys(preset.coreBoons).forEach(slotKey => {
        const boonId = preset.coreBoons[slotKey];
        const boon = hades2BoonsData.boons.find(b => b.id === boonId);
        if (!boon) return;
        
        const godInfo = hades2BoonsData.gods[boon.god] || { themeColor: "#fff", name: "" };
        const slotZh = translateSlot(slotKey);
        const isEssential = essentialSlots.includes(slotKey);
        
        const itemHtml = `
          <div style="display: flex; flex-direction: column; font-size: 0.82rem; margin-bottom: 6px; padding: 6px 8px; background: rgba(255, 255, 255, 0.02); border: 1px dashed ${isEssential ? "rgba(255, 89, 42, 0.35)" : "rgba(69, 163, 255, 0.25)"}; border-radius: 6px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span>➡️ 【${slotZh}】：<span style="color: ${godInfo.themeColor}; font-weight: 700;">${boon.name}</span> (${godInfo.name.split(" ")[0]})</span>
            </div>
            <div style="color: var(--text-muted); font-size: 0.76rem; margin-top: 4px; line-height: 1.35;">${boon.desc}</div>
          </div>
        `;
        
        if (isEssential) {
          essentialHtml += itemHtml;
        } else {
          optionalHtml += itemHtml;
        }
      });

      let boonsDirectionsHtml = "";
      if (essentialHtml) {
        boonsDirectionsHtml += `
          <div class="boon-group-title" style="font-family: var(--font-title); font-size: 0.85rem; color: #ff592a; margin-top: 10px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; font-weight: bold; border-left: 2px solid #ff592a; padding-left: 6px;">🔥 流派核心關鍵祝福 (必備)</div>
          ${essentialHtml}
        `;
      }
      if (optionalHtml) {
        boonsDirectionsHtml += `
          <div class="boon-group-title" style="font-family: var(--font-title); font-size: 0.85rem; color: #45a3ff; margin-top: 14px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; font-weight: bold; border-left: 2px solid #45a3ff; padding-left: 6px;">💡 其他建議配置 (加強)</div>
          ${optionalHtml}
        `;
      }

      // 產生步驟指南 HTML
      let stepsHtml = "";
      if (preset.buildSteps && preset.buildSteps.length > 0) {
        const stepsListHtml = preset.buildSteps.map(step => `
          <li class="preset-step-item">${step}</li>
        `).join("");
        stepsHtml = `
          <div class="preset-steps">
            <h4 class="preset-steps-title">📋 構築成型步驟指南：</h4>
            <ol class="preset-steps-list">
              ${stepsListHtml}
            </ol>
          </div>
        `;
      }

      // 型態必要性標示
      const aspectBadgeColor = preset.aspectEssential ? "#ff592a" : "#18f299";
      const aspectBgColor = preset.aspectEssential ? "rgba(255, 89, 42, 0.15)" : "rgba(24, 242, 153, 0.15)";
      const aspectBorder = preset.aspectEssential ? "1px solid #ff592a" : "1px solid #18f299";
      const aspectStatusText = preset.aspectEssential ? "核心必須" : "任意 (建議)";

      card.innerHTML = `
        <div>
          <div class="preset-header">
            <h3 class="preset-title">${preset.title}</h3>
            <div class="preset-weapon">🪓 推薦武器：${preset.weapon}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 6px; line-height: 1.45;">
              <span style="color: var(--gold); font-weight: bold;">🔑 武器型態：</span>${preset.aspect} 
              <span style="color: ${aspectBadgeColor}; font-weight: bold; background: ${aspectBgColor}; border: ${aspectBorder}; padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-left: 6px; display: inline-block;">${aspectStatusText}</span>
              <div style="margin-top: 4px; font-size: 0.78rem; font-style: italic; color: rgba(255,255,255,0.55);">${preset.aspectNote}</div>
            </div>
            <div class="preset-tags" style="margin-top: 12px;">
              <span class="preset-tag highlight">難度：${preset.difficulty}</span>
              ${tagsHtml}
            </div>
          </div>
          <p class="preset-desc" style="margin-top: 12px;">${preset.description}</p>
          <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
            ${boonsDirectionsHtml}
          </div>
          ${stepsHtml}
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
      const weapon = preset.weaponKey;
      selectWeapon.value = weapon;
      
      // 動態更新型態下拉選單，以便正確回顯所屬型態
      selectAspect.innerHTML = '<option value="" disabled selected>-- 請選擇型態 --</option>';
      if (weaponAspectsMap[weapon]) {
        weaponAspectsMap[weapon].forEach(aspect => {
          const opt = document.createElement("option");
          opt.value = aspect.value;
          opt.textContent = aspect.text;
          selectAspect.appendChild(opt);
        });
      }
    }
    if (preset.aspectKey) {
      selectAspect.value = preset.aspectKey;
    }
    activeBuild.weapon = selectWeapon.value;
    activeBuild.aspect = selectAspect.value;

    // 2. 裝配槽位祝福
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
    activeBuild.passives.clear();
    autoEquipSatisfiedSpecialBoons();
    updatePlannerState();
    
    // 5. 自動跳轉到首頁查看
    switchTab("planner");
    alert(`🎉 「${preset.title}」已成功載入！核心槽位祝福與阿卡納奧秘已配置完畢，已為您跳轉到構築規劃面板查看。`);
  }

  // ==========================================
  // --- 8. 新手成長教學 (Beginner Guide) 邏輯 ---
  // ==========================================
  let activeTutorialStage = "early";
  let completedQuests = new Set();
  
  // 從 localStorage 讀取已完成的任務
  try {
    const savedQuests = localStorage.getItem("hades2_completed_quests");
    if (savedQuests) {
      const parsed = JSON.parse(savedQuests);
      if (Array.isArray(parsed)) {
        parsed.forEach(id => completedQuests.add(id));
      }
    }
  } catch (e) {
    console.error("讀取已完成任務失敗:", e);
  }

  let activeQuestFilter = "all";

  function renderTutorial() {
    renderMechanics();
    renderTimelineTabs();
    renderTimelineContent();
    renderQuestsFilters();
    renderQuestsList();
    updateQuestsProgress();
  }

  // 1. 渲染核心機制
  function renderMechanics() {
    const grid = document.getElementById("tutorial-mechanics-grid");
    if (!grid) return;
    grid.innerHTML = "";

    hades2TutorialData.mechanics.forEach(mech => {
      const card = document.createElement("div");
      card.className = "mechanics-card";
      card.innerHTML = `
        <div class="mechanics-card-header">
          <div class="mechanics-card-icon">${mech.icon}</div>
          <h3 class="mechanics-card-title">${mech.title}</h3>
        </div>
        <p class="mechanics-card-desc">${mech.desc}</p>
      `;
      grid.appendChild(card);
    });
  }

  // 2. 渲染時間軸導覽按鈕
  function renderTimelineTabs() {
    const container = document.getElementById("tutorial-timeline-tabs");
    if (!container) return;
    container.innerHTML = "";

    hades2TutorialData.stages.forEach(stage => {
      const btn = document.createElement("button");
      const stageKey = stage.id.replace("stage_", "");
      btn.className = `timeline-btn ${activeTutorialStage === stageKey ? "active" : ""}`;
      btn.setAttribute("data-stage", stageKey);
      
      const emoji = stage.emoji || "";
      const cleanName = stage.name.split("：")[0];

      btn.innerHTML = `
        <span>${emoji} ${cleanName}</span>
        <span class="timeline-btn-tag">${stage.tag}</span>
      `;

      btn.addEventListener("click", () => {
        activeTutorialStage = stageKey;
        renderTimelineTabs();
        renderTimelineContent();
      });

      container.appendChild(btn);
    });
  }

  // 3. 渲染時間軸細節內容
  function renderTimelineContent() {
    const container = document.getElementById("tutorial-timeline-content");
    if (!container) return;
    container.innerHTML = "";

    const stage = hades2TutorialData.stages.find(s => s.id === `stage_${activeTutorialStage}`);
    if (!stage) return;

    // 渲染階段總結與詳細小卡
    const summaryEl = document.createElement("div");
    summaryEl.className = "timeline-summary";
    summaryEl.innerHTML = `<strong>本階段目標：</strong>${stage.summary}`;
    container.appendChild(summaryEl);

    const grid = document.createElement("div");
    grid.className = "timeline-details-grid";

    stage.details.forEach(detail => {
      const box = document.createElement("div");
      box.className = "timeline-detail-box";
      box.innerHTML = `
        <h4 class="timeline-detail-title">${detail.title}</h4>
        <p class="timeline-detail-content">${detail.content}</p>
      `;
      grid.appendChild(box);
    });

    container.appendChild(grid);
  }

  // 4. 綁定任務過濾按鈕點擊事件
  function renderQuestsFilters() {
    const filters = document.querySelectorAll("#tutorial-quest-filters .filter-btn");
    filters.forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeQuestFilter = btn.getAttribute("data-quest-filter");
        renderQuestsList();
      });
    });
  }

  // 5. 渲染任務清單
  function renderQuestsList() {
    const list = document.getElementById("tutorial-quest-list");
    if (!list) return;
    list.innerHTML = "";

    const filteredQuests = hades2TutorialData.quests.filter(q => {
      if (activeQuestFilter === "all") return true;
      return q.stage === activeQuestFilter;
    });

    if (filteredQuests.length === 0) {
      list.innerHTML = `<div class="slot-empty-text" style="text-align: center; padding: 20px;">當前階段無任何任務。</div>`;
      return;
    }

    filteredQuests.forEach(quest => {
      const item = document.createElement("div");
      const isChecked = completedQuests.has(quest.id);
      item.className = `quest-item ${isChecked ? "checked" : ""}`;
      
      const badgeZh = { early: "🟢 入門期", mid: "🟡 中期", late: "🔴 後期" };

      item.innerHTML = `
        <div class="quest-checkbox-wrapper"></div>
        <div class="quest-info">
          <div class="quest-title-text">
            <span>${quest.title}</span>
            <span class="quest-badge ${quest.stage}">${badgeZh[quest.stage]}</span>
          </div>
          <div class="quest-desc-text">${quest.desc}</div>
        </div>
      `;

      item.addEventListener("click", () => {
        if (completedQuests.has(quest.id)) {
          completedQuests.delete(quest.id);
          item.classList.remove("checked");
        } else {
          completedQuests.add(quest.id);
          item.classList.add("checked");
        }
        
        // 儲存至 localStorage
        try {
          localStorage.setItem("hades2_completed_quests", JSON.stringify(Array.from(completedQuests)));
        } catch (e) {
          console.error("儲存任務完成狀態失敗:", e);
        }

        updateQuestsProgress();
      });

      list.appendChild(item);
    });
  }

  // 6. 更新進度顯示
  function updateQuestsProgress() {
    const progressLabel = document.getElementById("quests-progress-label");
    if (!progressLabel) return;

    const totalQuests = hades2TutorialData.quests.length;
    const completedCount = Array.from(completedQuests).filter(id => 
      hades2TutorialData.quests.some(q => q.id === id)
    ).length;

    const percent = totalQuests > 0 ? Math.round((completedCount / totalQuests) * 100) : 0;
    progressLabel.textContent = `已完成：${completedCount} / ${totalQuests} (${percent}%)`;
    
    if (percent === 100) {
      progressLabel.style.color = "var(--green-glow)";
      progressLabel.style.textShadow = "0 0 8px rgba(24, 242, 153, 0.4)";
    } else {
      progressLabel.style.color = "var(--text-muted)";
      progressLabel.style.textShadow = "none";
    }
  }

  // 初始化加載
  const selectGuideWeapon = document.getElementById("select-guide-weapon");
  if (selectGuideWeapon) {
    selectGuideWeapon.addEventListener("change", () => {
      renderPresets();
    });
  }
  renderPresets();
  renderDuoMatrix();
});
