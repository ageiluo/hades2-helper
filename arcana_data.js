/**
 * Hades II Arcana Cards Data (阿卡納奧秘卡牌數據 - 台灣官方對齊版)
 */
const arcanaCards = [
  // 第一行 (Row 1)
  { id: 1, name: "I. 女巫 (The Sorceress)", cost: 1, row: 1, col: 1, desc: "引導 Ω 招式時，周遭時間流速變慢。" },
  { id: 2, name: "II. 逆子 (The Wayward Son)", cost: 1, row: 1, col: 2, desc: "離開一個地點後，回復生命值；若生命值低於 30% 回復量加倍。" },
  { id: 3, name: "III. 獵士 (The Huntress)", cost: 2, row: 1, col: 3, desc: "當魔力低於 100% 時，普通攻擊與特殊攻擊造成的傷害提升。" },
  { id: 4, name: "IV. 永恆 (Eternity)", cost: 3, row: 1, col: 4, desc: "每場挑戰開始時，獲得 1 次死亡反抗（復活）機會。" },
  { id: 5, name: "V. 月亮 (The Moon)", cost: 0, row: 1, col: 5, desc: "啟動的 Ω 鑄造會自動為月咒（Hex）充能。【啟用條件：啟用至少一張相鄰的卡牌】" },

  // 第二行 (Row 2)
  { id: 6, name: "VI. 復仇三女神 (The Furies)", cost: 2, row: 2, col: 1, desc: "對身處鑄造（Cast）中的敵人造成的傷害提升。" },
  { id: 7, name: "VII. 毅力 (Persistence)", cost: 2, row: 2, col: 2, desc: "獲得最大生命值與最大魔力上限加成。" },
  { id: 8, name: "VIII. 信使 (The Messenger)", cost: 0, row: 2, col: 3, desc: "獲得閃避機率加成。【啟用條件：啟用至少 3 張掌握值相同的卡牌】" },
  { id: 9, name: "IX. 匿蹤者 (The Unseen)", cost: 5, row: 2, col: 4, desc: "每秒自動回復魔力。" },
  { id: 10, name: "X. 黑夜 (Night)", cost: 2, row: 2, col: 5, desc: "Ω 招式連段有額外暴擊率加成。" },

  // 第三行 (Row 3)
  { id: 11, name: "XI. 迅疾者 (The Swift Runner)", cost: 1, row: 3, col: 1, desc: "衝刺速度提升，且衝刺時能直接穿過敵人。" },
  { id: 12, name: "XII. 死亡 (Death)", cost: 3, row: 3, col: 2, desc: "你的 Ω 招式有一定機率造成暴擊傷害。" },
  { id: 13, name: "XIII. 半人馬 (The Centaur)", cost: 0, row: 3, col: 3, desc: "每清理 5 個地點，獲得生命與魔力上限加成。【啟用條件：啟用至少一張掌握值為 1, 2, 3, 4, 5 的卡牌】" },
  { id: 14, name: "XIV. 起源 (Origination)", cost: 5, row: 3, col: 4, desc: "對受到至少兩種狀態詛咒（異常狀態）的敵人造成的傷害提升 50%。" },
  { id: 15, name: "XV. 戀人 (The Lovers)", cost: 3, row: 3, col: 5, desc: "在守護者（Boss）戰鬥中，免疫受到的第一次傷害。" },

  // 第四行 (Row 4)
  { id: 16, name: "XVI. 女巫師 (The Enchantress)", cost: 3, row: 4, col: 1, desc: "獲得命運之變，可用於改變地點獎勵（房間門）的類型。" },
  { id: 17, name: "XVII. 擺渡人 (The Boatman)", cost: 5, row: 4, col: 2, desc: "每場挑戰開始時獲得 200 金幣。" },
  { id: 18, name: "XVIII. 工匠 (The Artificer)", cost: 3, row: 4, col: 3, desc: "每場挑戰有機會將地點獎勵中的「微小發現」（如灰燼、骨頭）轉變為隨機「主要發現」（如祝福、代達羅斯之鎚）。" },
  { id: 19, name: "XIX. 卓越 (Excellence)", cost: 5, row: 4, col: 4, desc: "獲得稀有或更高階級祝福的初始機率提升。" },
  { id: 20, name: "XX. 王后 (The Queen)", cost: 0, row: 4, col: 5, desc: "獲得雙重祝福（Duo Boon）的機率提升。【啟用條件：啟用不超過 2 張相同掌握值消耗的卡牌】" },

  // 第五行 (Row 5)
  { id: 21, name: "XXI. 命運 (The Fates)", cost: 0, row: 5, col: 1, desc: "每場挑戰開始時獲得更多命運之變（重刷機會）。【啟用條件：啟用所有相鄰的卡牌】" },
  { id: 22, name: "XXII. 冠軍 (The Champions)", cost: 4, row: 5, col: 2, desc: "獲得額外命運之變次數，可用於重刷祝福選擇或代達羅斯之鎚升級。" },
  { id: 23, name: "XXIII. 力量 (Strength)", cost: 4, row: 5, col: 3, desc: "當你沒有死亡反抗次數時，受到的傷害降低，且造成的傷害提升。" },
  { id: 24, name: "XXIV. 神性 (Divinity)", cost: 0, row: 5, col: 4, desc: "獲得史詩級祝福的初始機率提升。【啟用條件：使任意一行卡牌完全啟用】" },
  { id: 25, name: "XXV. 審判 (Judgment)", cost: 0, row: 5, col: 5, desc: "擊敗關卡守護者後，隨機啟用 3 張未啟用的卡牌。【啟用條件：啟用的卡牌總數不超過 3 張】" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = arcanaCards;
}
