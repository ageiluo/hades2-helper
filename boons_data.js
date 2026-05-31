/**
 * Hades II Boons Data (黑帝斯2 台灣官方對齊版祝福數據庫)
 */
const hades2BoonsData = {
  gods: {
    zeus: {
      name: "宙斯 (Zeus)",
      themeColor: "#ecd544",
      glowColor: "rgba(236, 213, 68, 0.4)",
      curse: "雷霆 (Blitz)",
      curseDesc: "身負效果的敵人在受到定額傷害後，或在特定時間後，引來天雷劈擊。"
    },
    hera: {
      name: "赫拉 (Hera)",
      themeColor: "#bd66ff",
      glowColor: "rgba(189, 102, 255, 0.4)",
      curse: "繫結 (Hitch)",
      curseDesc: "身負效果的敵人將受到其他同受影響的敵人所受傷害的百分比傷害。"
    },
    poseidon: {
      name: "波賽頓 (Poseidon)",
      themeColor: "#45a3ff",
      glowColor: "rgba(69, 163, 255, 0.4)",
      curse: "浪沫 (Slip)",
      curseDesc: "身負該效果的敵人受擊時有機率受到額外傷害。"
    },
    apollo: {
      name: "阿波羅 (Apollo)",
      themeColor: "#ffca58",
      glowColor: "rgba(255, 202, 88, 0.4)",
      curse: "眩暈 (Daze)",
      curseDesc: "有機率使身負效果的敵人攻擊無效。"
    },
    aphrodite: {
      name: "阿芙蘿黛蒂 (Aphrodite)",
      themeColor: "#ff7da4",
      glowColor: "rgba(255, 125, 164, 0.4)",
      curse: "虛弱 (Weak)",
      curseDesc: "身負效果的敵人所造成傷害降低。"
    },
    hestia: {
      name: "赫斯提亞 (Hestia)",
      themeColor: "#ff592a",
      glowColor: "rgba(255, 89, 42, 0.4)",
      curse: "灼燬 (Scorch)",
      curseDesc: "身負效果的敵人受到每秒的累積傷害。"
    },
    demeter: {
      name: "荻米特 (Demeter)",
      themeColor: "#a2fdf2",
      glowColor: "rgba(162, 253, 242, 0.4)",
      curse: "凍結 (Freeze)",
      curseDesc: "使身負效果的敵人無法動彈。"
    },
    hephaestus: {
      name: "赫菲斯托斯 (Hephaestus)",
      themeColor: "#d27d2d",
      glowColor: "rgba(210, 125, 45, 0.4)",
      curse: "鑠金 (Vent)",
      curseDesc: "轟擊效果觸發後對敵人施加，一定時間後引爆最高爆發傷害。"
    },
    hermes: {
      name: "赫米斯 (Hermes)",
      themeColor: "#3bf7a0",
      glowColor: "rgba(59, 247, 160, 0.4)",
      curse: "無",
      curseDesc: "赫米斯提供速度與機動性增益，不直接附帶狀態詛咒。"
    }
  },

  boons: [
    // --- 宙斯 Zeus ---
    {
      id: "zeus_attack",
      god: "zeus",
      name: "天雷劈擊",
      englishName: "Heaven Strike",
      slot: "Attack",
      curse: "Blitz",
      desc: "普通攻擊施加【雷霆】狀態。"
    },
    {
      id: "zeus_special",
      god: "zeus",
      name: "天雷絕技",
      englishName: "Heaven Flourish",
      slot: "Special",
      curse: "Blitz",
      desc: "特殊攻擊施加【雷霆】狀態。"
    },
    {
      id: "zeus_cast",
      god: "zeus",
      name: "陰雲環頂",
      englishName: "Storm Ring",
      slot: "Cast",
      curse: "None",
      desc: "施展鑄造時在範圍內重複引來天雷劈擊，每次擊中 1 個敵人。"
    },
    {
      id: "zeus_dash",
      god: "zeus",
      name: "迅雷疾馳",
      englishName: "Thunder Sprint",
      slot: "Dash",
      curse: "None",
      desc: "奔行（衝刺）時引來天雷劈擊，對周圍敵人造成傷害。"
    },
    {
      id: "zeus_gain",
      god: "zeus",
      name: "電能滿沛",
      englishName: "Ionic Gain",
      slot: "Gain",
      curse: "None",
      desc: "每場遭遇戰中出現一個能夠回復所有魔力的雷電球，但魔力上限降低 70%。"
    },
    {
      id: "zeus_double_strike",
      god: "zeus",
      name: "雷電交加",
      englishName: "Double Strike",
      slot: "Passive",
      curse: "None",
      desc: "天雷效果有機率能劈擊 2 次。"
    },

    // --- 赫拉 Hera ---
    {
      id: "hera_attack",
      god: "hera",
      name: "許誓縛擊",
      englishName: "Sworn Strike",
      slot: "Attack",
      curse: "Hitch",
      desc: "普通攻擊能造成更高傷害，並施加【繫結】效果。"
    },
    {
      id: "hera_special",
      god: "hera",
      name: "許誓絕技",
      englishName: "Sworn Flourish",
      slot: "Special",
      curse: "Hitch",
      desc: "特殊攻擊能造成更高傷害，並施加【繫結】效果。"
    },
    {
      id: "hera_cast",
      god: "hera",
      name: "結姻戒環",
      englishName: "Engagement Ring",
      slot: "Cast",
      curse: "Hitch",
      desc: "施展鑄造時施加【繫結】效果，並立即根據身處其中的敵人數量，對其造成傷害。"
    },
    {
      id: "hera_dash",
      god: "hera",
      name: "聯袂疾馳",
      englishName: "Nexus Sprint",
      slot: "Dash",
      curse: "Hitch",
      desc: "奔行時對接觸之敵人施加【繫結】效果，並造成傷害。"
    },
    {
      id: "hera_gain",
      god: "hera",
      name: "從容滿面",
      englishName: "Born Gain",
      slot: "Gain",
      curse: "None",
      desc: "在魔力用罄時預留魔力，回復全部魔力，直到下一個遭遇戰地點。"
    },

    // --- 波賽頓 Poseidon ---
    {
      id: "poseidon_attack",
      god: "poseidon",
      name: "震浪湧擊",
      englishName: "Wave Strike",
      slot: "Attack",
      curse: "None",
      desc: "使出普通攻擊時能掀起波瀾，將敵人擊退。"
    },
    {
      id: "poseidon_special",
      god: "poseidon",
      name: "震浪絕技",
      englishName: "Wave Flourish",
      slot: "Special",
      curse: "None",
      desc: "使出特殊攻擊時能掀起波瀾，將敵人擊退。"
    },
    {
      id: "poseidon_cast",
      god: "poseidon",
      name: "狂潮環湧",
      englishName: "Geyser Ring",
      slot: "Cast",
      curse: "Slip",
      desc: "施展鑄造的同時將掀起強力波瀾，造成傷害並對敵人施加【浪沫】效果。"
    },
    {
      id: "poseidon_dash",
      god: "poseidon",
      name: "澎湃疾馳",
      englishName: "Breaker Sprint",
      slot: "Dash",
      curse: "None",
      desc: "奔行時能夠對首位接觸到的敵人造成傷害，並將其擊退。"
    },
    {
      id: "poseidon_gain",
      god: "poseidon",
      name: "暴洪滿溢",
      englishName: "Fluid Gain",
      slot: "Gain",
      curse: "None",
      desc: "施展 Ω 招式後，短暫回復任何已使用的魔力。"
    },
    {
      id: "poseidon_double_up",
      god: "poseidon",
      name: "海映雙輝",
      englishName: "Double Up",
      slot: "Passive",
      curse: "None",
      desc: "領取獎勵時，只要該獎勵並非祝福、代達羅斯之錘或稀有資源，有機率額外獲得一份。"
    },

    // --- 阿波羅 Apollo ---
    {
      id: "apollo_attack",
      god: "apollo",
      name: "新星強擊",
      englishName: "Nova Strike",
      slot: "Attack",
      curse: "None",
      desc: "普通攻擊能造成更高傷害，影響範圍也擴大。"
    },
    {
      id: "apollo_special",
      god: "apollo",
      name: "新星絕技",
      englishName: "Nova Flourish",
      slot: "Special",
      curse: "None",
      desc: "特殊攻擊能造成更高傷害，影響範圍也擴大。"
    },
    {
      id: "apollo_cast",
      god: "apollo",
      name: "閃焰環發",
      englishName: "Solar Ring",
      slot: "Cast",
      curse: "Daze",
      desc: "鑄造施加【眩暈】效果，並在失效前造成爆發傷害。"
    },
    {
      id: "apollo_dash",
      god: "apollo",
      name: "炫目疾馳",
      englishName: "Blinding Sprint",
      slot: "Dash",
      curse: "Daze",
      desc: "能奔行得更快，並對周圍敵人施加【眩暈】效果。"
    },
    {
      id: "apollo_gain",
      god: "apollo",
      name: "澄光滿盈",
      englishName: "Lucid Gain",
      slot: "Gain",
      curse: "None",
      desc: "每當鑄造消散時，回復一些魔力。"
    },

    // --- 阿芙蘿黛蒂 Aphrodite ---
    {
      id: "aphrodite_attack",
      god: "aphrodite",
      name: "愛戀重擊",
      englishName: "Flutter Strike",
      slot: "Attack",
      curse: "Weak",
      desc: "普通攻擊對附近的敵人造成更高的傷害，並施加【虛弱】狀態。"
    },
    {
      id: "aphrodite_special",
      god: "aphrodite",
      name: "愛戀絕技",
      englishName: "Flutter Flourish",
      slot: "Special",
      curse: "Weak",
      desc: "特殊攻擊對附近的敵人造成更高的傷害，並施加【虛弱】狀態。"
    },
    {
      id: "aphrodite_cast",
      god: "aphrodite",
      name: "深情環抱",
      englishName: "Rapture Ring",
      slot: "Cast",
      curse: "Weak",
      desc: "鑄造施加【虛弱】效果，將敵人拉向中心並造成傷害。"
    },
    {
      id: "aphrodite_dash",
      god: "aphrodite",
      name: "激情疾馳",
      englishName: "Passion Sprint",
      slot: "Dash",
      curse: "Weak",
      desc: "奔行時能於起點和終點炸擊周圍敵人，並施加【虛弱】效果。"
    },
    {
      id: "aphrodite_gain",
      god: "aphrodite",
      name: "愛慾滿懷",
      englishName: "Glamour Gain",
      slot: "Gain",
      curse: "None",
      desc: "自動對附近敵人施加【虛弱】效果，在【虛弱】敵人附近時能夠回復魔力。"
    },

    // --- 赫斯提亞 Hestia ---
    {
      id: "hestia_attack",
      god: "hestia",
      name: "烈焰灼擊",
      englishName: "Flame Strike",
      slot: "Attack",
      curse: "Scorch",
      desc: "普通攻擊施加【灼燬】效果。"
    },
    {
      id: "hestia_special",
      god: "hestia",
      name: "烈焰絕技",
      englishName: "Flame Flourish",
      slot: "Special",
      curse: "Scorch",
      desc: "特殊攻擊施加【灼燬】效果。"
    },
    {
      id: "hestia_cast",
      god: "hestia",
      name: "燻燒火環",
      englishName: "Smolder Ring",
      slot: "Cast",
      curse: "Scorch",
      desc: "施展鑄造時，對影響範圍內的敵人重複施加【灼燬】效果。"
    },
    {
      id: "hestia_dash",
      god: "hestia",
      name: "煤焰疾馳",
      englishName: "Soot Sprint",
      slot: "Dash",
      curse: "None",
      desc: "在奔行時於身後留下一道餘燼的蹤跡，且每次受到的燒灼傷害上限為 15 點。"
    },
    {
      id: "hestia_gain",
      god: "hestia",
      name: "騰焰滿腔",
      englishName: "Hearth Gain",
      slot: "Gain",
      curse: "None",
      desc: "普通攻擊或特殊攻擊造成傷害時，能夠回復魔力。"
    },

    // --- 荻米特 Demeter ---
    {
      id: "demeter_attack",
      god: "demeter",
      name: "冰霜刺擊",
      englishName: "Frost Strike",
      slot: "Attack",
      curse: "Freeze",
      desc: "普通攻擊能造成更高傷害，並施加【凍結】效果。"
    },
    {
      id: "demeter_special",
      god: "demeter",
      name: "冰霜絕技",
      englishName: "Frost Flourish",
      slot: "Special",
      curse: "Freeze",
      desc: "特殊攻擊能造成更高傷害，並施加【凍結】效果。"
    },
    {
      id: "demeter_cast",
      god: "demeter",
      name: "飛霜環旋",
      englishName: "Arctic Ring",
      slot: "Cast",
      curse: "Cyclone",
      desc: "鑄造能於有效範圍內持續對敵人造成傷害，並施加【凍結】效果。"
    },
    {
      id: "demeter_dash",
      god: "demeter",
      name: "凜風疾馳",
      englishName: "Frigid Sprint",
      slot: "Dash",
      curse: "Cyclone",
      desc: "奔行結束時，在周圍形成一陣暫留於該處的緩速風暴。"
    },
    {
      id: "demeter_gain",
      god: "demeter",
      name: "謐靜滿庭",
      englishName: "Tranquil Gain",
      slot: "Gain",
      curse: "None",
      desc: "靜止不動 1 秒後開始快速回復魔力，直到再次做出行動。"
    },

    // --- 赫菲斯托斯 Hephaestus ---
    {
      id: "hephaestus_attack",
      god: "hephaestus",
      name: "燄山痛擊",
      englishName: "Volcanic Strike",
      slot: "Attack",
      curse: "Vent",
      desc: "使出普通攻擊時能引發轟擊，造成巨大的範圍傷害（具有數秒冷卻時間）。"
    },
    {
      id: "hephaestus_special",
      god: "hephaestus",
      name: "燄山絕技",
      englishName: "Volcanic Flourish",
      slot: "Special",
      curse: "Vent",
      desc: "使用特殊攻擊時能引發轟擊，造成巨大的範圍傷害（具有數秒冷卻時間）。"
    },
    {
      id: "hephaestus_cast",
      god: "hephaestus",
      name: "錘砧環落",
      englishName: "Anvil Ring",
      slot: "Cast",
      curse: "None",
      desc: "鑄造能對影響範圍內的敵人連續造成多次傷害。"
    },
    {
      id: "hephaestus_dash",
      god: "hephaestus",
      name: "烙鐵疾馳",
      englishName: "Smithy Sprint",
      slot: "Dash",
      curse: "None",
      desc: "若奔行後有敵人在附近，能夠引發轟擊，造成大範圍傷害。"
    },
    {
      id: "hephaestus_gain",
      god: "hephaestus",
      name: "鋼毅滿志",
      englishName: "Fixed Gain",
      slot: "Gain",
      curse: "None",
      desc: "受到傷害時能抵擋部分傷害，並回復魔力。"
    },

    // --- 赫米斯 Hermes ---
    {
      id: "hermes_attack_speed",
      god: "hermes",
      name: "身手矯健",
      englishName: "Swift Strike",
      slot: "Passive",
      curse: "None",
      desc: "使出普通攻擊、使用特殊攻擊和施展鑄造的速度更快。"
    },
    {
      id: "hermes_special_speed",
      god: "hermes",
      name: "精力充沛",
      englishName: "Swift Flourish",
      slot: "Passive",
      curse: "None",
      desc: "施展 Ω 招式的速度更快。"
    },
    {
      id: "hermes_dodge",
      god: "hermes",
      name: "急速閃躲",
      englishName: "Greater Evasion",
      slot: "Passive",
      curse: "None",
      desc: "獲得閃避機率以及移動速度，擁有的祝福數量越多，機率與速度越高。"
    },

    // ==========================================
    // --- 雙重祝福 Duo Boons ---
    // ==========================================
    {
      id: "duo_golden_rule",
      god: "poseidon",
      name: "漣漪效應",
      englishName: "Golden Rule",
      slot: "Duo",
      curse: "None",
      desc: "來自赫拉和波賽頓的 Ω 招式效果有機率生效 2 次。",
      prerequisites: {
        gods: ["poseidon", "hera"],
        requirements: [
          {
            god: "poseidon",
            options: ["poseidon_attack", "poseidon_special", "poseidon_cast", "poseidon_dash", "poseidon_gain"]
          },
          {
            god: "hera",
            options: ["hera_attack", "hera_special", "hera_cast", "hera_dash", "hera_gain"]
          }
        ]
      }
    },
    {
      id: "duo_sunny_disposition",
      god: "apollo",
      name: "轟烈浩劫",
      englishName: "Sunny Disposition",
      slot: "Duo",
      curse: "None",
      desc: "施展 Ω 鑄造時能進一步消耗額外魔力，使法陣中的敵人重複受到天雷劈擊。",
      prerequisites: {
        gods: ["apollo", "zeus"],
        requirements: [
          {
            god: "apollo",
            options: ["apollo_attack", "apollo_special", "apollo_cast"]
          },
          {
            god: "zeus",
            options: ["zeus_attack", "zeus_special", "zeus_cast"]
          }
        ]
      }
    },
    {
      id: "duo_burning_desire",
      god: "hestia",
      name: "熱浪來襲",
      englishName: "Burning Desire",
      slot: "Duo",
      curse: "None",
      desc: "灼燬效果對虛弱敵人造成傷害時，灼燬值不會消減。",
      prerequisites: {
        gods: ["hestia", "aphrodite"],
        requirements: [
          {
            god: "hestia",
            options: ["hestia_attack", "hestia_special", "hestia_cast"]
          },
          {
            god: "aphrodite",
            options: ["aphrodite_attack", "aphrodite_special", "aphrodite_cast", "aphrodite_dash", "aphrodite_gain"]
          }
        ]
      }
    },
    {
      id: "duo_hail_storm",
      god: "demeter",
      name: "漫天落雹",
      englishName: "Hail Storm",
      slot: "Duo",
      curse: "None",
      desc: "凍結效果將同時引來天雷劈擊，重複擊中無法動彈的敵人。",
      prerequisites: {
        gods: ["demeter", "zeus"],
        requirements: [
          {
            god: "demeter",
            options: ["demeter_attack", "demeter_special", "demeter_cast"]
          },
          {
            god: "zeus",
            options: ["zeus_attack", "zeus_special", "zeus_cast", "zeus_gain"]
          }
        ]
      }
    },
    {
      id: "duo_aether",
      god: "hera",
      name: "魂牽夢縈",
      englishName: "Aether",
      slot: "Duo",
      curse: "None",
      desc: "只要遭遇戰中有多個敵人，自動使其中 1 個身負魅惑效果協助戰鬥。",
      prerequisites: {
        gods: ["hera", "aphrodite"],
        requirements: [
          {
            god: "hera",
            options: ["hera_attack", "hera_special", "hera_cast", "hera_dash", "hera_gain"]
          },
          {
            god: "aphrodite",
            options: ["aphrodite_attack", "aphrodite_special", "aphrodite_cast", "aphrodite_dash", "aphrodite_gain"]
          }
        ]
      }
    },
    {
      id: "duo_chain_reaction",
      god: "hephaestus",
      name: "煉鎖反應",
      englishName: "Chain Reaction",
      slot: "Duo",
      curse: "None",
      desc: "若在赫菲斯托斯的轟擊效果就緒時立即使用，將引發 2 次轟擊。",
      prerequisites: {
        gods: ["hephaestus", "hestia"],
        requirements: [
          {
            god: "hephaestus",
            options: ["hephaestus_attack", "hephaestus_special", "hephaestus_cast"]
          },
          {
            god: "hestia",
            options: ["hestia_attack", "hestia_special", "hestia_cast"]
          }
        ]
      }
    },

    // ==========================================
    // --- 傳奇祝福 Legendary Boons ---
    // ==========================================
    {
      id: "legendary_zeus",
      god: "zeus",
      name: "神雷轟頂",
      englishName: "Divine Lightning",
      slot: "Legendary",
      curse: "None",
      desc: "大部分敵人在首度受到傷害時，有機率直接被天雷劈中秒殺。",
      prerequisites: {
        gods: ["zeus"],
        requirements: [
          {
            god: "zeus",
            options: ["zeus_double_strike"]
          },
          {
            god: "zeus",
            options: ["zeus_attack", "zeus_special", "zeus_cast"]
          }
        ]
      }
    },
    {
      id: "legendary_poseidon",
      god: "poseidon",
      name: "深海恩澤",
      englishName: "Greatest Bounty",
      slot: "Legendary",
      curse: "None",
      desc: "任何冒險與金幣獎勵都更加豐厚，並立即獲得金幣、生命值與冥府獎勵。",
      prerequisites: {
        gods: ["poseidon"],
        requirements: [
          {
            god: "poseidon",
            options: ["poseidon_double_up"]
          },
          {
            god: "poseidon",
            options: ["poseidon_attack", "poseidon_special", "poseidon_cast"]
          }
        ]
      }
    },
    {
      id: "legendary_demeter",
      god: "demeter",
      name: "冬令割獲",
      englishName: "Winter Harvest",
      slot: "Legendary",
      curse: "None",
      desc: "身負凍結效果的敵人的生命值在 10% 以下時立即粉碎秒殺，並對周圍引發範圍傷害與凍結。",
      prerequisites: {
        gods: ["demeter"],
        requirements: [
          {
            god: "demeter",
            options: ["demeter_attack", "demeter_special", "demeter_cast"]
          }
        ]
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = hades2BoonsData;
}
