/**
 * Hades II Arcana Cards Data (阿卡納奧秘卡牌數據 - 台灣官方對齊版)
 */
const arcanaCards = [
  // 第一行 (Row 1)
  { id: 1, name: "I. 巫女 (The Sorceress)", cost: 1, row: 1, col: 1, desc: "Ω 招式速度上升 20%。" },
  { id: 2, name: "II. 逆子 (The Wayward Son)", cost: 1, row: 1, col: 2, desc: "離開各房間後回復生命值（生命值低於 30% 時效果加倍）。" },
  { id: 3, name: "III. 獵士 (The Huntress)", cost: 3, row: 1, col: 3, desc: "魔力未滿 100% 時，普通攻擊和特殊攻擊都會造成更多傷害。" },
  { id: 4, name: "IV. 永恆 (Eternity)", cost: 3, row: 1, col: 4, desc: "引導 Ω 招式時，周遭一切變慢 30%，持續 2 秒。" },
  { id: 5, name: "V. 月亮 (The Moon)", cost: 0, row: 1, col: 5, desc: "月咒額外以每秒的速率自動充能。【啟用條件：啟用任意 1 張相鄰的卡牌】" },

  // 第二行 (Row 2)
  { id: 6, name: "VI. 復仇三女神 (The Furies)", cost: 2, row: 2, col: 1, desc: "對處於你鑄造中的敵人造成更多傷害。" },
  { id: 7, name: "VII. 堅忍 (Persistence)", cost: 2, row: 2, col: 2, desc: "最大生命值與最大魔力提升。" },
  { id: 8, name: "VIII. 信使 (The Messenger)", cost: 0, row: 2, col: 3, desc: "施展鑄造將讓你暫時進入無敵狀態，移動速度上升。【啟用條件：啟用至少 3 張掌握值消耗相同的卡牌】" },
  { id: 9, name: "IX. 匿影者 (The Unseen)", cost: 5, row: 2, col: 4, desc: "每秒回復魔力。" },
  { id: 10, name: "X. 黑夜 (Night)", cost: 2, row: 2, col: 5, desc: "Ω 招式中的每一個招式都有機率能夠造成暴擊傷害。" },

  // 第三行 (Row 3)
  { id: 11, name: "XI. 飛毛腿 (The Swift Runner)", cost: 1, row: 3, col: 1, desc: "奔行的速度上升，且能穿越大部分的敵人。" },
  { id: 12, name: "XII. 死神 (Death)", cost: 4, row: 3, col: 2, desc: "擁有額外死裡逃生次數。" },
  { id: 13, name: "XIII. 半人馬 (The Centaur)", cost: 0, row: 3, col: 3, desc: "行經一定數量地點後獲得額外生命和魔力。【啟用條件：啟用掌握值消耗分別為 1、2、3、4、5 的卡牌】" },
  { id: 14, name: "XIV. 起源 (Origination)", cost: 5, row: 3, col: 4, desc: "對身負 2 種以上來自不同奧林帕斯神狀態效果的敵人造成額外 25% 傷害。" },
  { id: 15, name: "XV. 戀人 (The Lovers)", cost: 3, row: 3, col: 5, desc: "在面對守護者時，免疫第一次受到的傷害。" },

  // 第四行 (Row 4)
  { id: 16, name: "XVI. 魔女 (The Enchantress)", cost: 3, row: 4, col: 1, desc: "擁有重置地點獎勵的能力。" },
  { id: 17, name: "XVII. 擺渡人 (The Boatman)", cost: 5, row: 4, col: 2, desc: "擁有初始金幣。" },
  { id: 18, name: "XVIII. 巧匠 (The Artificer)", cost: 3, row: 4, col: 3, desc: "擁有將微小發現更易為主要發現的能力。" },
  { id: 19, name: "XIX. 卓越 (Excellence)", cost: 5, row: 4, col: 4, desc: "所獲祝福選項有機率包含傳奇或至少稀有級祝福。" },
  { id: 20, name: "XX. 皇后 (The Queen)", cost: 0, row: 4, col: 5, desc: "獲得雙重祝福的機率提升。【啟用條件：啟用不超過 2 張相同掌握值消耗的卡牌】" },

  // 第五行 (Row 5)
  { id: 21, name: "XXI. 命運 (The Fates)", cost: 0, row: 5, col: 1, desc: "獲得 +1 次重置機會。【啟用條件：啟用所有相鄰的卡牌】" },
  { id: 22, name: "XXII. 戰士 (The Champions)", cost: 4, row: 5, col: 2, desc: "獲得 +1 次重置機會，並解鎖重置祝福選項的能力。" },
  { id: 23, name: "XXIII. 力量 (Strength)", cost: 4, row: 5, col: 3, desc: "當你沒有死裡逃生次數時，受到的傷害降低，且造成的傷害提升。" },
  { id: 24, name: "XXIV. 神性 (Divinity)", cost: 0, row: 5, col: 4, desc: "獲得史詩級以上祝福的機率提升。【啟用條件：啟用任意一行或一列的所有卡牌】" },
  { id: 25, name: "XXV. 審判 (Judgment)", cost: 0, row: 5, col: 5, desc: "擊敗關卡守護者後，隨機啟用 3 張未啟用的卡牌。【啟用條件：裝備的卡牌總數不超過 3 張】" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = arcanaCards;
}
