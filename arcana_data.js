/**
 * Hades II Arcana Cards Data (冥府奧秘牌數據)
 */
const arcanaCards = [
  // 第一行
  { id: 1, name: "I. 魔女 (The Sorceress)", cost: 1, row: 1, col: 1, desc: "引導（Omega）招式時，周圍的時間流速變慢。" },
  { id: 2, name: "II. 指路人 (The Wayfinder)", cost: 2, row: 1, col: 2, desc: "在地圖上顯示通往下一層或特殊房間的指引。" },
  { id: 3, name: "III. 橡樹 (The Oak)", cost: 3, row: 1, col: 3, desc: "獲得生命上限 +20。" },
  { id: 4, name: "IV. 皇后 (The Queen)", cost: 0, row: 1, col: 4, desc: "獲得傳奇與雙重神恩的機率提升。【激活條件：啟動不超過2張同列的牌】" },
  { id: 5, name: "V. 隱形人 (The Unseen)", cost: 5, row: 1, col: 5, desc: "每秒回復 2 點法力值。" },

  // 第二行
  { id: 6, name: "VI. 黑夜 (The Night)", cost: 2, row: 2, col: 1, desc: "普通攻擊與特技的引導招式額外造成 +10% 傷害。" },
  { id: 7, name: "VII. 月亮 (The Moon)", cost: 3, row: 2, col: 2, desc: "獲得法力上限 +30。" },
  { id: 8, name: "VIII. 力量 (The Strength)", cost: 5, row: 2, col: 3, desc: "生命值低於 30% 時，獲得 30% 減傷且造成傷害 +30%。" },
  { id: 9, name: "IX. 騎士 (The Rider)", cost: 2, row: 2, col: 4, desc: "每層開始時，獲得 50 點護甲值。" },
  { id: 10, name: "X. 戀人 (The Lovers)", cost: 2, row: 2, col: 5, desc: "在首領戰（Boss）中，免疫受到的第一次傷害。" },

  // 第三行
  { id: 11, name: "XI. 迅捷 (The Swiftness)", cost: 1, row: 3, col: 1, desc: "移動速度 +20%，奔刺速度更為敏捷。" },
  { id: 12, name: "XII. 永恆 (The Eternity)", cost: 4, row: 3, col: 2, desc: "獲得 1 次死裡逃生（Death Defiance）機會。" },
  { id: 13, name: "XIII. 人馬 (The Centaur)", cost: 0, row: 3, col: 3, desc: "每通過 5 個房間，獲得生命與法力上限 +3。【激活條件：啟動 I 到 XII 的所有卡牌】" },
  { id: 14, name: "XIV. 格里芬 (The Griffin)", cost: 3, row: 3, col: 4, desc: "引導（Omega）招式消耗的法力減少 30%。" },
  { id: 15, name: "XV. 復仇女神 (The Furies)", cost: 3, row: 3, col: 5, desc: "對身處法陣（Cast）中的敵人造成的傷害 +20%。" },

  // 第四行
  { id: 16, name: "XVI. 命運女神 (The Fates)", cost: 3, row: 4, col: 1, desc: "獲得 2 次命運改寫機會（可在選擇神恩時重刷）。" },
  { id: 17, name: "XVII. 船夫 (The Boatman)", cost: 5, row: 4, col: 2, desc: "通關時或開始時獲得 200 金幣。" },
  { id: 18, name: "XVIII. 源頭 (The Origination)", cost: 3, row: 4, col: 3, desc: "對受有至少兩種【狀態詛咒】的敵人造成的傷害 +50%。【核心增傷卡】" },
  { id: 19, name: "XIX. 黃金 (The Golden)", cost: 0, row: 4, col: 4, desc: "每擁有 100 金幣，傷害提升 +5%。【激活條件：啟動包含 3 個不同金幣消耗檔次的卡牌】" },
  { id: 20, name: "XX. 眷顧 (The Spite)", cost: 5, row: 4, col: 5, desc: "若場上沒有其他同類神恩，稀有度提升。" },

  // 第五行
  { id: 21, name: "XXI. 預言者 (The Seer)", cost: 4, row: 5, col: 1, desc: "獲得 2 次命運改寫機會，可用於改變房間獎勵類型。" },
  { id: 22, name: "XXII. 勇士 (The Champion)", cost: 0, row: 5, col: 2, desc: "獲得 1 次死裡逃生，且在首領戰後恢復生命。【激活條件：僅啟動不超過 3 張消耗大於 4 的卡牌】" },
  { id: 23, name: "XXIII. 審判 (The Judgement)", cost: 0, row: 5, col: 3, desc: "擊敗守護者後，隨機激活 3 張未啟動的卡牌。【激活條件：啟動卡牌總數不超過 3 張】" },
  { id: 24, name: "XXIV. 神性 (The Divinity)", cost: 3, row: 5, col: 4, desc: "獲得史詩（Epic）級神恩的初始機率提升 10%。" },
  { id: 25, name: "XXV. 創造者 (The Creator)", cost: 0, row: 5, col: 5, desc: "若某行完全被啟動，則該行所有卡牌效果提升 50%。【激活條件：每行至少啟動一張卡牌】" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = arcanaCards;
}
