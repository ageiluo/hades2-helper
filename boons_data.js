/**
 * Hades II Boons Data (黑帝斯2 台灣官方對齊版祝福數據庫)
 */
const hades2BoonsData = {
  gods: {
    zeus: {
      name: "宙斯 (Zeus)",
      themeColor: "#ecd544",
      glowColor: "rgba(236, 213, 68, 0.4)",
      curse: "霹靂 (Blitz)",
      curseDesc: "敵人受此狀態後，在受到後續傷害達到定額時會觸發天雷轟擊。"
    },
    hera: {
      name: "赫拉 (Hera)",
      themeColor: "#bd66ff",
      glowColor: "rgba(189, 102, 255, 0.4)",
      curse: "株連 (Hitch)",
      curseDesc: "受株連的敵人互相連結，其中一人受傷時，其他人亦會承受部分傷害。"
    },
    poseidon: {
      name: "波塞頓 (Poseidon)",
      themeColor: "#45a3ff",
      glowColor: "rgba(69, 163, 255, 0.4)",
      curse: "打滑 (Slip)",
      curseDesc: "受影響的敵人受到更多傷害且會被擊退得更遠。"
    },
    apollo: {
      name: "阿波羅 (Apollo)",
      themeColor: "#ffca58",
      glowColor: "rgba(255, 202, 88, 0.4)",
      curse: "目眩 (Daze)",
      curseDesc: "敵人的攻擊有機率落空（打偏）。"
    },
    aphrodite: {
      name: "阿芙蘿黛蒂 (Aphrodite)",
      themeColor: "#ff7da4",
      glowColor: "rgba(255, 125, 164, 0.4)",
      curse: "虛弱 (Weak)",
      curseDesc: "敵人造成的傷害降低。"
    },
    hestia: {
      name: "赫斯提亞 (Hestia)",
      themeColor: "#ff592a",
      glowColor: "rgba(255, 89, 42, 0.4)",
      curse: "灼燒 (Scorch)",
      curseDesc: "敵人承受持續燃燒的火焰傷害。"
    },
    demeter: {
      name: "狄蜜特 (Demeter)",
      themeColor: "#a2fdf2",
      glowColor: "rgba(162, 253, 242, 0.4)",
      curse: "冰封/冰旋風 (Freeze/Cyclone)",
      curseDesc: "冰封可使敵人暫時無法行動；冰旋風可降低移動與攻擊速度並造成微量持續傷害。"
    },
    hephaestus: {
      name: "赫菲斯托斯 (Hephaestus)",
      themeColor: "#d27d2d",
      glowColor: "rgba(210, 125, 45, 0.4)",
      curse: "回火 (Vent)",
      curseDesc: "在轟擊觸發後對敵人附加回火，5秒後引爆延遲傷害。"
    },
    hermes: {
      name: "荷米斯 (Hermes)",
      themeColor: "#3bf7a0",
      glowColor: "rgba(59, 247, 160, 0.4)",
      curse: "無",
      curseDesc: "荷米斯提供速度與機動性增益，不直接附帶狀態詛咒。"
    }
  },

  boons: [
    // --- 宙斯 Zeus ---
    {
      id: "zeus_attack",
      god: "zeus",
      name: "雷霆打擊",
      englishName: "Heaven Strike",
      slot: "Attack",
      curse: "Blitz",
      desc: "攻擊召喚落雷，並對敵人施加【霹靂】狀態。"
    },
    {
      id: "zeus_special",
      god: "zeus",
      name: "雷霆絕技",
      englishName: "Heaven Flourish",
      slot: "Special",
      curse: "Blitz",
      desc: "特殊攻擊召喚落雷，並對敵人施加【霹靂】狀態。"
    },
    {
      id: "zeus_cast",
      god: "zeus",
      name: "風暴之環",
      englishName: "Storm Ring",
      slot: "Cast",
      curse: "None",
      desc: "你的鑄造會在指定區域內隨機召喚落雷打擊敵人。"
    },
    {
      id: "zeus_dash",
      god: "zeus",
      name: "電掣奔行",
      englishName: "Thunder Sprint",
      slot: "Dash",
      curse: "None",
      desc: "奔行時會不斷有落雷打擊附近的敵人，每次消耗魔力。"
    },
    {
      id: "zeus_gain",
      god: "zeus",
      name: "離子匯流",
      englishName: "Ionic Gain",
      slot: "Gain",
      curse: "None",
      desc: "使你的魔力隨時間自動恢復，但魔力上限降低 70%。"
    },
    {
      id: "zeus_double_strike",
      god: "zeus",
      name: "雙重雷擊",
      englishName: "Double Strike",
      slot: "Passive",
      curse: "None",
      desc: "你的天雷效果有機率額外轟擊 1 次。"
    },

    // --- 赫拉 Hera ---
    {
      id: "hera_attack",
      god: "hera",
      name: "盟約打擊",
      englishName: "Sworn Strike",
      slot: "Attack",
      curse: "Hitch",
      desc: "攻擊造成更高傷害，並施加【株連】狀態。"
    },
    {
      id: "hera_special",
      god: "hera",
      name: "盟約絕技",
      englishName: "Sworn Flourish",
      slot: "Special",
      curse: "Hitch",
      desc: "特殊攻擊造成更高傷害，並施加【株連】狀態。"
    },
    {
      id: "hera_cast",
      god: "hera",
      name: "羈絆之環",
      englishName: "Engagement Ring",
      slot: "Cast",
      curse: "Hitch",
      desc: "你的鑄造持續時間延長，並會對所有進入遭遇戰的敵人造成傷害並施加【株連】。"
    },
    {
      id: "hera_dash",
      god: "hera",
      name: "結緣奔行",
      englishName: "Nexus Sprint",
      slot: "Dash",
      curse: "Hitch",
      desc: "奔行穿過敵人時會對其施加【株連】狀態，並向相鄰的其它敵人擴散。"
    },
    {
      id: "hera_gain",
      god: "hera",
      name: "從容滿面",
      englishName: "Born Gain",
      slot: "Gain",
      curse: "None",
      desc: "當你的魔力歸零時，立即將其全數補滿，但會預留一部分的最大魔力。"
    },

    // --- 波塞頓 Poseidon ---
    {
      id: "poseidon_attack",
      god: "poseidon",
      name: "海浪打擊",
      englishName: "Wave Strike",
      slot: "Attack",
      curse: "Slip",
      desc: "攻擊附帶水花濺射與擊退，並施加【打滑】狀態。"
    },
    {
      id: "poseidon_special",
      god: "poseidon",
      name: "海浪絕技",
      englishName: "Wave Flourish",
      slot: "Special",
      curse: "Slip",
      desc: "特殊攻擊附帶水花濺射與擊退，並施加【打滑】狀態。"
    },
    {
      id: "poseidon_cast",
      god: "poseidon",
      name: "間歇泉鑄造",
      englishName: "Geyser Ring",
      slot: "Cast",
      curse: "None",
      desc: "你的鑄造在釋放時會召喚巨大的噴泉擊飛並傷害敵人。"
    },
    {
      id: "poseidon_dash",
      god: "poseidon",
      name: "擊破奔行",
      englishName: "Breaker Sprint",
      slot: "Dash",
      curse: "Slip",
      desc: "奔行時撞擊敵人造成浪潮擊退傷害，並施加【打滑】狀態。"
    },
    {
      id: "poseidon_gain",
      god: "poseidon",
      name: "流水匯流",
      englishName: "Fluid Gain",
      slot: "Gain",
      curse: "None",
      desc: "擊中敵人時，有機率掉落水珠，拾取可恢復魔力。"
    },
    {
      id: "poseidon_double_up",
      god: "poseidon",
      name: "雙重收益",
      englishName: "Double Up",
      slot: "Passive",
      curse: "None",
      desc: "所有撿起的資源（金幣、灰燼、生命等）有機會被複製成雙份。"
    },

    // --- 阿波羅 Apollo ---
    {
      id: "apollo_attack",
      god: "apollo",
      name: "光耀打擊",
      englishName: "Nova Strike",
      slot: "Attack",
      curse: "Daze",
      desc: "攻擊傷害增加，且判定範圍擴大，並施加【目眩】狀態。"
    },
    {
      id: "apollo_special",
      god: "apollo",
      name: "光耀絕技",
      englishName: "Nova Flourish",
      slot: "Special",
      curse: "Daze",
      desc: "特殊攻擊傷害增加，且判定範圍擴大，並施加【目眩】狀態。"
    },
    {
      id: "apollo_cast",
      god: "apollo",
      name: "烈日之環",
      englishName: "Solar Ring",
      slot: "Cast",
      curse: "Daze",
      desc: "你的鑄造會發射持續的日光脈衝，對範圍內敵人造成持續傷害並施加【目眩】。"
    },
    {
      id: "apollo_dash",
      god: "apollo",
      name: "炫目奔行",
      englishName: "Blinding Sprint",
      slot: "Dash",
      curse: "Daze",
      desc: "奔行速度大幅提升，並會對附近的敵人施加【目眩】。"
    },
    {
      id: "apollo_gain",
      god: "apollo",
      name: "明光匯流",
      englishName: "Lucid Gain",
      slot: "Gain",
      curse: "None",
      desc: "當你站在你的鑄造範圍內時，魔力會逐漸恢復。"
    },

    // --- 阿芙蘿黛蒂 Aphrodite ---
    {
      id: "aphrodite_attack",
      god: "aphrodite",
      name: "心動打擊",
      englishName: "Flutter Strike",
      slot: "Attack",
      curse: "Weak",
      desc: "攻擊對貼身近距離敵人造成極高的爆發傷害，並施加【虛弱】狀態。"
    },
    {
      id: "aphrodite_special",
      god: "aphrodite",
      name: "心動絕技",
      englishName: "Flutter Flourish",
      slot: "Special",
      curse: "Weak",
      desc: "特殊攻擊對貼身近距離敵人造成極高的爆發傷害，並施加【虛弱】狀態。"
    },
    {
      id: "aphrodite_cast",
      god: "aphrodite",
      name: "淪陷之環",
      englishName: "Rapture Ring",
      slot: "Cast",
      curse: "Weak",
      desc: "你的鑄造在釋放時會將附近的敵人吸向中心，並施加【虛弱】。"
    },
    {
      id: "aphrodite_dash",
      god: "aphrodite",
      name: "激情衝刺",
      englishName: "Passion Sprint",
      slot: "Dash",
      curse: "Weak",
      desc: "衝刺在起點和終點對附近的敵人造成傷害並施加【虛弱】。"
    },
    {
      id: "aphrodite_gain",
      god: "aphrodite",
      name: "翩翩匯流",
      englishName: "Glamour Gain",
      slot: "Gain",
      curse: "None",
      desc: "當你身處於【虛弱】敵人附近時，魔力會逐漸恢復。此外，每場遭遇戰會有一名敵人自動被施加【虛弱】狀態。"
    },

    // --- 赫斯提亞 Hestia ---
    {
      id: "hestia_attack",
      god: "hestia",
      name: "烈焰打擊",
      englishName: "Flame Strike",
      slot: "Attack",
      curse: "Scorch",
      desc: "攻擊使敵人附帶【灼燒】狀態，造成持續燃燒傷害。"
    },
    {
      id: "hestia_special",
      god: "hestia",
      name: "烈焰絕技",
      englishName: "Flame Flourish",
      slot: "Special",
      curse: "Scorch",
      desc: "特殊攻擊使敵人附帶【灼燒】狀態，造成持續燃燒傷害。"
    },
    {
      id: "hestia_cast",
      god: "hestia",
      name: "炙烤之環",
      englishName: "Smolder Ring",
      slot: "Cast",
      curse: "Scorch",
      desc: "你的鑄造會持續朝中心噴射火花，對範圍內敵人造成超高速的【灼燒】堆疊。"
    },
    {
      id: "hestia_dash",
      god: "hestia",
      name: "煤煙奔行",
      englishName: "Soot Sprint",
      slot: "Dash",
      curse: "None",
      desc: "奔行時消除附近敵方的遠端投射物，並對發射該攻擊的敵人施加【灼燒】。"
    },
    {
      id: "hestia_gain",
      god: "hestia",
      name: "騰焰滿腔",
      englishName: "Hearth Gain",
      slot: "Gain",
      curse: "None",
      desc: "攻擊與特殊攻擊擊中敵人時可恢復魔力，但你的最大生命值上限會減少 20%。"
    },

    // --- 狄蜜特 Demeter ---
    {
      id: "demeter_attack",
      god: "demeter",
      name: "冰霜打擊",
      englishName: "Frost Strike",
      slot: "Attack",
      curse: "Freeze",
      desc: "攻擊造成傷害並累積【冰封】狀態。冰封可使敵人暫時無法行動。"
    },
    {
      id: "demeter_special",
      god: "demeter",
      name: "冰霜絕技",
      englishName: "Frost Flourish",
      slot: "Special",
      curse: "Freeze",
      desc: "特殊攻擊造成傷害並累積【冰封】狀態。冰封可使敵人暫時無法行動。"
    },
    {
      id: "demeter_cast",
      god: "demeter",
      name: "北極之環",
      englishName: "Arctic Ring",
      slot: "Cast",
      curse: "Cyclone",
      desc: "你的鑄造範圍內颳起【冰旋風】，對接觸的敵人造成減速與微量持續傷害。"
    },
    {
      id: "demeter_dash",
      god: "demeter",
      name: "凜風奔行",
      englishName: "Frigid Sprint",
      slot: "Dash",
      curse: "Cyclone",
      desc: "奔行時在周圍形成一道旋風，停止後仍會持續存在並施加冰旋風。"
    },
    {
      id: "demeter_gain",
      god: "demeter",
      name: "謐靜之利",
      englishName: "Tranquil Gain",
      slot: "Gain",
      curse: "None",
      desc: "當你停止行動 1 秒後，魔力會快速恢復。"
    },

    // --- 赫菲斯托斯 Hephaestus ---
    {
      id: "hephaestus_attack",
      god: "hephaestus",
      name: "火山打擊",
      englishName: "Volcanic Strike",
      slot: "Attack",
      curse: "Vent",
      desc: "攻擊會觸發一場巨大的轟擊（有冷卻時間），爆發後對敵人附加【回火】狀態。"
    },
    {
      id: "hephaestus_special",
      god: "hephaestus",
      name: "火山絕技",
      englishName: "Volcanic Flourish",
      slot: "Special",
      curse: "Vent",
      desc: "特殊攻擊會觸發一場巨大的轟擊（有冷卻時間），爆發後對敵人附加【回火】狀態。"
    },
    {
      id: "hephaestus_cast",
      god: "hephaestus",
      name: "鐵砧鑄造",
      englishName: "Anvil Ring",
      slot: "Cast",
      curse: "None",
      desc: "你的鑄造在啟動時會產生一次沉重打擊，使範圍內敵人受到重創，並提供防禦護甲。"
    },
    {
      id: "hephaestus_dash",
      god: "hephaestus",
      name: "鍛造奔行",
      englishName: "Smithy Sprint",
      slot: "Dash",
      curse: "None",
      desc: "奔行時產生震波擊飛敵人，且可擋下前方的投射物。"
    },
    {
      id: "hephaestus_gain",
      god: "hephaestus",
      name: "鋼毅滿志",
      englishName: "Fixed Gain",
      slot: "Gain",
      curse: "None",
      desc: "減少你受到的傷害，且每當你受到傷害時，會恢復魔力。"
    },

    // --- 荷米斯 Hermes ---
    {
      id: "hermes_attack_speed",
      god: "hermes",
      name: "迅捷打擊",
      englishName: "Swift Strike",
      slot: "Passive",
      curse: "None",
      desc: "普通攻擊的速度大幅提升。"
    },
    {
      id: "hermes_special_speed",
      god: "hermes",
      name: "迅捷絕技",
      englishName: "Swift Flourish",
      slot: "Passive",
      curse: "None",
      desc: "特殊攻擊的速度大幅提升。"
    },
    {
      id: "hermes_dodge",
      god: "hermes",
      name: "敏銳迴避",
      englishName: "Greater Evasion",
      slot: "Passive",
      curse: "None",
      desc: "提升閃避攻擊的機率。"
    },

    // ==========================================
    // --- 雙重祝福 Duo Boons ---
    // ==========================================
    {
      id: "duo_golden_rule",
      god: "poseidon",
      name: "黃金法則",
      englishName: "Golden Rule",
      slot: "Duo",
      curse: "None",
      desc: "你持有的金幣越多，造成的傷害越高（每 100 金幣約增加 +5% 全域傷害）。",
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
      name: "輝耀天災",
      englishName: "Sunny Disposition",
      slot: "Duo",
      curse: "None",
      desc: "你的 Ω鑄造可額外引導+30魔力，使範圍內敵人反覆受到天雷轟擊。",
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
      name: "燃燒渴望",
      englishName: "Burning Desire",
      slot: "Duo",
      curse: "None",
      desc: "對受有【虛弱】狀態的敵人，身上的【灼燒】堆疊在造成傷害時不會消減，使灼燒持續更長時間。",
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
      name: "冰雹風暴",
      englishName: "Hail Storm",
      slot: "Duo",
      curse: "None",
      desc: "你的【冰封】效果觸發後，會使被冰封的敵人反覆遭到閃電轟擊（每 0.5 秒造成 30 點閃電傷害）。",
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
      name: "以太（Aether）",
      englishName: "Aether",
      slot: "Duo",
      curse: "None",
      desc: "只要遭遇戰中有多名敵人存在，就會自動對其中一名敵人施加【魅惑】效果，使其暫時轉為友軍協助戰鬥。",
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
      name: "連鎖反應",
      englishName: "Chain Reaction",
      slot: "Duo",
      curse: "None",
      desc: "若你的赫菲斯托斯爆震技能剛充能完成後的 2 秒內立即使用，會連續觸發 2 次爆震效果。",
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
      name: "眾神之王",
      englishName: "To The King",
      slot: "Legendary",
      curse: "None",
      desc: "您的閃電技能會連續額外打擊一次，且霹靂起爆所需傷害減少 30 點。",
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
      name: "深海恩賜",
      englishName: "Greatest Bounty",
      slot: "Legendary",
      curse: "None",
      desc: "戰鬥結束後掉落的所有基礎道具、金幣、最大生命與魔力均以雙倍結算。",
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
      name: "嚴冬降臨",
      englishName: "Winter Harvest",
      slot: "Legendary",
      curse: "None",
      desc: "受有【冰封】的敵人生命值低於 10%時會瞬間被粉碎秒殺，並對周圍引發冰碎擴散冰封。",
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
