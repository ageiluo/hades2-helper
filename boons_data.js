/**
 * Hades II Boons Data (黑帝斯2 官方對齊版祝福數據庫)
 */
const hades2BoonsData = {
  gods: {
    zeus: {
      name: "宙斯 (Zeus)",
      themeColor: "#ecd544",
      glowColor: "rgba(236, 213, 68, 0.4)",
      curse: "雷霆 (Blitz)",
      curseDesc: "敵人受此狀態後，在承受 120 點傷害時會引爆並受到額外落雷傷害。"
    },
    hera: {
      name: "赫拉 (Hera)",
      themeColor: "#bd66ff",
      glowColor: "rgba(189, 102, 255, 0.4)",
      curse: "繫結 (Hitch)",
      curseDesc: "受繫結的敵人互相連結，其中一人受傷時，其他人亦會承受 30% 的傷害。"
    },
    poseidon: {
      name: "波賽頓 (Poseidon)",
      themeColor: "#45a3ff",
      glowColor: "rgba(69, 163, 255, 0.4)",
      curse: "受潮 (Slip)",
      curseDesc: "敵人受此狀態後，在受到後續傷害時有機率承受額外爆發傷害。"
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
      curse: "衰弱 (Weak)",
      curseDesc: "敵人造成的傷害降低。"
    },
    hestia: {
      name: "赫斯提亞 (Hestia)",
      themeColor: "#ff592a",
      glowColor: "rgba(255, 89, 42, 0.4)",
      curse: "灼燬 (Scorch)",
      curseDesc: "敵人承受持續燃燒的火焰傷害。"
    },
    demeter: {
      name: "狄蜜特 (Demeter)",
      themeColor: "#a2fdf2",
      glowColor: "rgba(162, 253, 242, 0.4)",
      curse: "冰凍/冰旋風 (Freeze/Cyclone)",
      curseDesc: "冰凍可使敵人完全無法行動；冰旋風可降低移動與攻擊速度並造成微量持續傷害。"
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
      curseDesc: "荷米斯提供速度與敏捷增益，不直接附帶狀態詛咒。"
    }
  },

  boons: [
    // --- 宙斯 Zeus ---
    {
      id: "zeus_attack",
      god: "zeus",
      name: "天堂之擊",
      englishName: "Heaven Strike",
      slot: "Attack",
      curse: "Blitz",
      desc: "攻擊召喚落雷，並對敵人施加【雷霆】狀態。"
    },
    {
      id: "zeus_special",
      god: "zeus",
      name: "閃電狂風",
      englishName: "Lightning Flourish",
      slot: "Special",
      curse: "Blitz",
      desc: "特技召喚落雷，並對敵人施加【雷霆】狀態。"
    },
    {
      id: "zeus_cast",
      god: "zeus",
      name: "風暴之環",
      englishName: "Storm Ring",
      slot: "Cast",
      curse: "None",
      desc: "施法會在指定區域內隨機召喚落雷打擊敵人。"
    },
    {
      id: "zeus_dash",
      god: "zeus",
      name: "雷鳴衝刺",
      englishName: "Thunder Sprint",
      slot: "Dash",
      curse: "None",
      desc: "衝刺時會不斷有落雷打擊附近的敵人，每次消耗法能。"
    },
    {
      id: "zeus_gain",
      god: "zeus",
      name: "離子法能",
      englishName: "Ionic Gain",
      slot: "Gain",
      curse: "None",
      desc: "使法能上限減少 70%，但每秒獲得極高的法能回復速度。"
    },
    {
      id: "zeus_double_strike",
      god: "zeus",
      name: "雙重打擊",
      englishName: "Double Strike",
      slot: "Passive",
      curse: "None",
      desc: "閃電效果有機率再次觸發擊打敵人。"
    },

    // --- 赫拉 Hera ---
    {
      id: "hera_attack",
      god: "hera",
      name: "誓約之擊",
      englishName: "Sworn Strike",
      slot: "Attack",
      curse: "Hitch",
      desc: "攻擊造成更高傷害，並施加【繫結】狀態。"
    },
    {
      id: "hera_special",
      god: "hera",
      name: "誓約狂風",
      englishName: "Sworn Flourish",
      slot: "Special",
      curse: "Hitch",
      desc: "特技造成更高傷害，並施加【繫結】狀態。"
    },
    {
      id: "hera_cast",
      god: "hera",
      name: "訂婚之環",
      englishName: "Engagement Ring",
      slot: "Cast",
      curse: "Hitch",
      desc: "施法將召喚一個邊界，進入其中的敵人會被施加【繫結】狀態並受到傷害。"
    },
    {
      id: "hera_dash",
      god: "hera",
      name: "連結衝刺",
      englishName: "Nexus Sprint",
      slot: "Dash",
      curse: "Hitch",
      desc: "穿過敵人時會對其施加【繫結】狀態，並造成微量傷害。"
    },
    {
      id: "hera_gain",
      god: "hera",
      name: "重生法能",
      englishName: "Born Gain",
      slot: "Gain",
      curse: "None",
      desc: "當法能值歸零時，瞬間回滿。每次觸發有短暫的冷卻時間。"
    },

    // --- 波賽頓 Poseidon ---
    {
      id: "poseidon_attack",
      god: "poseidon",
      name: "潮汐之擊",
      englishName: "Wave Strike",
      slot: "Attack",
      curse: "Slip",
      desc: "攻擊附帶浪潮擊退，並施加【受潮】狀態。"
    },
    {
      id: "poseidon_special",
      god: "poseidon",
      name: "潮汐狂風",
      englishName: "Wave Flourish",
      slot: "Special",
      curse: "Slip",
      desc: "特技附帶浪潮擊退，並施加【受潮】狀態。"
    },
    {
      id: "poseidon_cast",
      god: "poseidon",
      name: "間歇泉之環",
      englishName: "Geyser Ring",
      slot: "Cast",
      curse: "None",
      desc: "施法在被引導或引爆時，會召喚巨大的噴泉擊飛並傷害敵人。"
    },
    {
      id: "poseidon_dash",
      god: "poseidon",
      name: "碎浪衝刺",
      englishName: "Breaker Sprint",
      slot: "Dash",
      curse: "Slip",
      desc: "衝刺時撞擊敵人造成浪潮傷害，並施加【受潮】狀態。"
    },
    {
      id: "poseidon_gain",
      god: "poseidon",
      name: "流水法能",
      englishName: "Fluid Gain",
      slot: "Gain",
      curse: "None",
      desc: "擊敗敵人時有 20% 機率掉落水球，撿起可恢復大量法能。"
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
      name: "超新星之擊",
      englishName: "Nova Strike",
      slot: "Attack",
      curse: "Daze",
      desc: "攻擊傷害增加，攻擊範圍顯著擴大，並施加【目眩】狀態。"
    },
    {
      id: "apollo_special",
      god: "apollo",
      name: "超新星狂風",
      englishName: "Nova Flourish",
      slot: "Special",
      curse: "Daze",
      desc: "特技傷害增加，攻擊範圍顯著擴大，並施加【目眩】狀態。"
    },
    {
      id: "apollo_cast",
      god: "apollo",
      name: "烈陽之環",
      englishName: "Solar Ring",
      slot: "Cast",
      curse: "Daze",
      desc: "施法會發射持續的日光脈衝，對範圍內敵人造成持續傷害並施加【目眩】。"
    },
    {
      id: "apollo_dash",
      god: "apollo",
      name: "炫目衝刺",
      englishName: "Blinding Sprint",
      slot: "Dash",
      curse: "Daze",
      desc: "衝刺速度大幅提升，並會使所經過的敵人【目眩】。"
    },
    {
      id: "apollo_gain",
      god: "apollo",
      name: "清明法能",
      englishName: "Lucid Gain",
      slot: "Gain",
      curse: "None",
      desc: "當您站在施法法陣區域中時，法能會獲得自動回復。"
    },

    // --- 阿芙蘿黛蒂 Aphrodite ---
    {
      id: "aphrodite_attack",
      god: "aphrodite",
      name: "輕盈之擊",
      englishName: "Flutter Strike",
      slot: "Attack",
      curse: "Weak",
      desc: "攻擊對貼身近距離敵人造成極高的爆發傷害，並施加【衰弱】狀態。"
    },
    {
      id: "aphrodite_special",
      god: "aphrodite",
      name: "輕盈狂風",
      englishName: "Flutter Flourish",
      slot: "Special",
      curse: "Weak",
      desc: "特技對貼身近距離敵人造成極高的爆發傷害，並施加【衰弱】狀態。"
    },
    {
      id: "aphrodite_cast",
      god: "aphrodite",
      name: "歡愉之環",
      englishName: "Rapture Ring",
      slot: "Cast",
      curse: "Weak",
      desc: "施法在釋放時會將附近的敵人吸向中心，並施加【衰弱】。"
    },
    {
      id: "aphrodite_dash",
      god: "aphrodite",
      name: "激情衝刺",
      englishName: "Passion Sprint",
      slot: "Dash",
      curse: "Weak",
      desc: "衝刺撞擊敵人時造成傷害並施加【衰弱】，且會吸引敵人注意力。"
    },
    {
      id: "aphrodite_gain",
      god: "aphrodite",
      name: "魅惑法能",
      englishName: "Glamour Gain",
      slot: "Gain",
      curse: "None",
      desc: "只要您身邊有受到狀態詛咒的敵人，即可持續獲得法能回復。"
    },

    // --- 赫斯提亞 Hestia ---
    {
      id: "hestia_attack",
      god: "hestia",
      name: "烈焰擊",
      englishName: "Flame Strike",
      slot: "Attack",
      curse: "Scorch",
      desc: "攻擊使敵人附帶【灼燬】狀態，造成持續燃燒傷害。"
    },
    {
      id: "hestia_special",
      god: "hestia",
      name: "烈焰狂風",
      englishName: "Flame Flourish",
      slot: "Special",
      curse: "Scorch",
      desc: "特技使敵人附帶【灼燬】狀態，造成持續燃燒傷害。"
    },
    {
      id: "hestia_cast",
      god: "hestia",
      name: "煙硝之環",
      englishName: "Smolder Ring",
      slot: "Cast",
      curse: "Scorch",
      desc: "施法會持續朝中心噴射火花，對範圍內敵人造成超高速的【灼燬】堆疊。"
    },
    {
      id: "hestia_dash",
      god: "hestia",
      name: "煤煙衝刺",
      englishName: "Soot Sprint",
      slot: "Dash",
      curse: "None",
      desc: "衝刺時可吸收敵人的遠程投影彈幕，並對發射彈幕的敵人施加灼燬。"
    },
    {
      id: "hestia_gain",
      god: "hestia",
      name: "爐火法能",
      englishName: "Hearth Gain",
      slot: "Gain",
      curse: "None",
      desc: "犧牲 10% 生命上限，換取每秒極為高昂的恆定法能回復。"
    },

    // --- 德密特 Demeter ---
    {
      id: "demeter_attack",
      god: "demeter",
      name: "冰霜之擊",
      englishName: "Frost Strike",
      slot: "Attack",
      curse: "Freeze",
      desc: "攻擊造成傷害並累積【冰凍】。冰凍疊滿會使敵人無法行動。"
    },
    {
      id: "demeter_special",
      god: "demeter",
      name: "冰霜狂風",
      englishName: "Frost Flourish",
      slot: "Special",
      curse: "Freeze",
      desc: "特技造成傷害並累積【冰凍】。冰凍疊滿會使敵人無法行動。"
    },
    {
      id: "demeter_cast",
      god: "demeter",
      name: "極地之環",
      englishName: "Arctic Ring",
      slot: "Cast",
      curse: "Cyclone",
      desc: "施法內部颳起【冰旋風】，對範圍內敵人造成減速與微量持續傷害。"
    },
    {
      id: "demeter_dash",
      god: "demeter",
      name: "寒霜衝刺",
      englishName: "Frigid Sprint",
      slot: "Dash",
      curse: "Cyclone",
      desc: "衝刺時在身後留下冰旋風，對接觸的敵人施加寒冷與減速。"
    },
    {
      id: "demeter_gain",
      god: "demeter",
      name: "寧靜法能",
      englishName: "Tranquil Gain",
      slot: "Gain",
      curse: "None",
      desc: "只要您保持不動（不移動不攻擊），法能便會瞬間超快速回滿。"
    },

    // --- 赫菲斯托斯 Hephaestus ---
    {
      id: "hephaestus_attack",
      god: "hephaestus",
      name: "火山之擊",
      englishName: "Volcanic Strike",
      slot: "Attack",
      curse: "Vent",
      desc: "攻擊會觸發一場巨大的轟擊（冷卻 15 秒），爆發後對敵人附加【回火】狀態。"
    },
    {
      id: "hephaestus_special",
      god: "hephaestus",
      name: "火山狂風",
      englishName: "Volcanic Flourish",
      slot: "Special",
      curse: "Vent",
      desc: "特技會觸發一場巨大的轟擊（冷卻 15 秒），爆發後對敵人附加【回火】狀態。"
    },
    {
      id: "hephaestus_cast",
      god: "hephaestus",
      name: "鐵砧之環",
      englishName: "Anvil Ring",
      slot: "Cast",
      curse: "None",
      desc: "施法啟動時會產生一次沉重打擊，使範圍內敵人受到重創，並提供護盾增益。"
    },
    {
      id: "hephaestus_dash",
      god: "hephaestus",
      name: "鍛造衝刺",
      englishName: "Smithy Sprint",
      slot: "Dash",
      curse: "None",
      desc: "衝刺開始時產生震波擊飛敵人，且可擋下前方的投射物。"
    },
    {
      id: "hephaestus_gain",
      god: "hephaestus",
      name: "固定法能",
      englishName: "Fixed Gain",
      slot: "Gain",
      curse: "None",
      desc: "每當您受到傷害時，會瞬間回復 100% 的法能；另有被動微量法能回復。"
    },

    // --- 荷米斯 Hermes ---
    {
      id: "hermes_attack_speed",
      god: "hermes",
      name: "迅捷身手",
      englishName: "Swift Strike",
      slot: "Passive",
      curse: "None",
      desc: "攻擊的速度提升 15%。"
    },
    {
      id: "hermes_special_speed",
      god: "hermes",
      name: "迅捷特技",
      englishName: "Swift Flourish",
      slot: "Passive",
      curse: "None",
      desc: "特技的速度提升 15%。"
    },
    {
      id: "hermes_dodge",
      god: "hermes",
      name: "神速閃避",
      englishName: "Greater Evasion",
      slot: "Passive",
      curse: "None",
      desc: "獲得 10% 的機率完全閃避任何傷害。"
    },

    // ==========================================
    // --- 雙重祝福 Duo Boons ---
    // ==========================================
    {
      id: "duo_golden_rule",
      god: "zeus",
      name: "黃金法則",
      englishName: "Golden Rule",
      slot: "Duo",
      curse: "None",
      desc: "您造成的所有濺射或範圍傷害效果，會根據您現有的金幣數量額外爆發多次傷害。",
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
      name: "陽光開朗",
      englishName: "Sunny Disposition",
      slot: "Duo",
      curse: "None",
      desc: "當您的【雷霆】狀態被引爆時，會額外引發一次太陽射線，造成大範圍火焰濺射。",
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
      desc: "對受有【衰弱】狀態的敵人施加【灼燬】時，會在其周圍產生追蹤的烈焰餘燼持續傷害之。",
      prerequisites: {
        gods: ["hestia", "aphrodite"],
        requirements: [
          {
            god: "hestia",
            options: ["hestia_attack", "hestia_special", "hestia_cast"]
          },
          {
            god: "aphrodite",
            options: ["aphrodite_attack", "aphrodite_special", "aphrodite_cast"]
          }
        ]
      }
    },
    {
      id: "duo_freezing_rain",
      god: "demeter",
      name: "急凍雷雨",
      englishName: "Freezing Rain",
      slot: "Duo",
      curse: "None",
      desc: "您的【受潮】效果現在也會附帶【冰凍】狀態，且冰凍累積速度提升 50%。",
      prerequisites: {
        gods: ["demeter", "poseidon"],
        requirements: [
          {
            god: "demeter",
            options: ["demeter_attack", "demeter_special", "demeter_cast"]
          },
          {
            god: "poseidon",
            options: ["poseidon_attack", "poseidon_special", "poseidon_cast", "poseidon_dash"]
          }
        ]
      }
    },
    {
      id: "duo_spiteful_glance",
      god: "hera",
      name: "怨毒一瞥",
      englishName: "Spiteful Glance",
      slot: "Duo",
      curse: "None",
      desc: "受有【繫結】狀態的敵人在受到【衰弱】影響時，會發射怨毒光線自動打擊附近的隊友。",
      prerequisites: {
        gods: ["hera", "aphrodite"],
        requirements: [
          {
            god: "hera",
            options: ["hera_attack", "hera_special", "hera_cast"]
          },
          {
            god: "aphrodite",
            options: ["aphrodite_attack", "aphrodite_special", "aphrodite_cast"]
          }
        ]
      }
    },
    {
      id: "duo_master_metal",
      god: "hephaestus",
      name: "大師金屬",
      englishName: "Master Metal",
      slot: "Duo",
      curse: "None",
      desc: "所有需要引導 Ω 的技能，引導速度提升 30% 且消耗的法能額外引發微型火山爆震。",
      prerequisites: {
        gods: ["hephaestus", "hermes"],
        requirements: [
          {
            god: "hephaestus",
            options: ["hephaestus_attack", "hephaestus_special", "hephaestus_cast"]
          },
          {
            god: "hermes",
            options: ["hermes_attack_speed", "hermes_special_speed", "hermes_dodge"]
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
      desc: "您的閃電技能會連續額外打擊一次，且雷霆起爆所需傷害減少 30 點。",
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
      desc: "戰鬥結束後掉落的所有基礎道具、金幣、最大生命與法能均以雙倍結算。",
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
      desc: "受有【冰凍】的敵人生命值低於 10%時會瞬間被粉碎秒殺，並對周圍引發冰碎擴散冰凍。",
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
