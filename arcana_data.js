/**
 * Hades II Arcana Cards Data (阿卡納奧秘卡牌數據 - 台灣官方對齊版)
 */
const arcanaCards = [
  // 第一行 (Row 1)
  { id: 1, name: "I. 女巫 (The Sorceress)", cost: 1, row: 1, col: 1, desc: "引導 Ω 招式的速度提升 20%。" },
  { id: 2, name: "II. 逆子 (The Wayward Son)", cost: 1, row: 1, col: 2, desc: "離開地點後恢復 2 生命；若低於 30% 生命值則效果倍增。" },
  { id: 3, name: "III. 獵士 (The Huntress)", cost: 3, row: 1, col: 3, desc: "當你的魔力低於 100% 時，普通攻擊與特殊攻擊造成的傷害提升 30%。" },
  { id: 4, name: "IV. 永恆 (Eternity)", cost: 3, row: 1, col: 4, desc: "引導 Ω 招式時，周遭一切變慢 30%，持續 2 秒。" },
  { id: 5, name: "V. 月亮 (The Moon)", cost: 0, row: 1, col: 5, desc: "你的月咒會自動充能（每秒相當於消耗 1 點魔力）。【啟用條件：啟用任意 1 張相鄰的卡牌】" },

  // 第二行 (Row 2)
  { id: 6, name: "VI. 復仇三女神 (The Furies)", cost: 2, row: 2, col: 1, desc: "對處於你鑄造中的敵人造成的傷害提升 20%。" },
  { id: 7, name: "VII. 毅力 (Persistence)", cost: 2, row: 2, col: 2, desc: "最大生命值與最大魔力提升 20。" },
  { id: 8, name: "VIII. 信使 (The Messenger)", cost: 0, row: 2, col: 3, desc: "獲得 10% 閃避率。【啟用條件：啟用至少 3 張掌握值消耗相同的卡牌】" },
  { id: 9, name: "IX. 匿蹤者 (The Unseen)", cost: 5, row: 2, col: 4, desc: "每秒恢復 2 魔力（當你不處於行動中）。" },
  { id: 10, name: "X. 黑夜 (Night)", cost: 2, row: 2, col: 5, desc: "你的 Ω 招式有 2% 機率造成暴擊。" },

  // 第三行 (Row 3)
  { id: 11, name: "XI. 迅疾者 (The Swift Runner)", cost: 1, row: 3, col: 1, desc: "奔行速度提升 20%，且奔行時能直接穿過敵人。" },
  { id: 12, name: "XII. 死亡 (Death)", cost: 4, row: 3, col: 2, desc: "每場挑戰開始時，獲得 1 次死裡逃生（復活）機會。" },
  { id: 13, name: "XIII. 半人馬 (The Centaur)", cost: 0, row: 3, col: 3, desc: "每清理 5 個地點，最大生命值與最大魔力提升 3。【啟用條件：啟用掌握值消耗分別為 1、2、3、4、5 的卡牌】" },
  { id: 14, name: "XIV. 起源 (Origination)", cost: 5, row: 3, col: 4, desc: "對受到至少兩種不同狀態詛咒的敵人，造成的傷害提升 25%。" },
  { id: 15, name: "XV. 戀人 (The Lovers)", cost: 3, row: 3, col: 5, desc: "在面對守護者時，免疫第一次受到的傷害。" },

  // 第四行 (Row 4)
  { id: 16, name: "XVI. 女巫師 (The Enchantress)", cost: 3, row: 4, col: 1, desc: "獲得 1 次命運之變，可用於改變地點獎勵（房間門）的類型。" },
  { id: 17, name: "XVII. 擺渡人 (The Boatman)", cost: 5, row: 4, col: 2, desc: "每場挑戰開始時，獲得 200 金幣。" },
  { id: 18, name: "XVIII. 工匠 (The Artificer)", cost: 3, row: 4, col: 3, desc: "有 10% 機率將地點獎勵中的微小發現（如灰燼、骨頭）轉變為主要發現（如祝福、代達羅斯之鎚）。" },
  { id: 19, name: "XIX. 卓越 (Excellence)", cost: 5, row: 4, col: 4, desc: "獲得稀有或更高階級祝福的機率提升 30%。" },
  { id: 20, name: "XX. 王后 (The Queen)", cost: 0, row: 4, col: 5, desc: "獲得雙重祝福的機率提升 6%。【啟用條件：啟用不超過 2 張相同掌握值消耗的卡牌】" },

  // 第五行 (Row 5)
  { id: 21, name: "XXI. 命運 (The Fates)", cost: 0, row: 5, col: 1, desc: "獲得 1 次命運之變，可用於重刷祝福或代達羅斯之鎚的選項。【啟用條件：啟用所有相鄰的卡牌】" },
  { id: 22, name: "XXII. 冠軍 (The Champions)", cost: 4, row: 5, col: 2, desc: "獲得 1 次命運之變，可用於重刷祝福或代達羅斯之鎚的選項。" },
  { id: 23, name: "XXIII. 力量 (Strength)", cost: 4, row: 5, col: 3, desc: "當你沒有死裡逃生次數時，受到的傷害降低 15%，且造成的傷害提升 15%。" },
  { id: 24, name: "XXIV. 神性 (Divinity)", cost: 0, row: 5, col: 4, desc: "獲得史詩級以上祝福的機率提升 10%。【啟用條件：啟用任意一行或一列的所有卡牌】" },
  { id: 25, name: "XXV. 審判 (Judgment)", cost: 0, row: 5, col: 5, desc: "擊敗關卡守護者後，隨機啟用 3 張未啟用的卡牌。【啟用條件：裝備的卡牌總數不超過 3 張】" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = arcanaCards;
}
