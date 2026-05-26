/**
 * Hades II Meta Builds Data (黑帝斯2 強力流派推薦數據)
 */
const hades2BuildPresets = [
  {
    id: "poseidon_special_blades",
    title: "極速波賽頓「水花特技流」",
    weapon: "姊妹雙刀 (Sister Blades)",
    aspect: "梅莉諾雅基底 (Aspect of Melinoë)",
    weaponKey: "sister_blades",
    aspectKey: "melinoe",
    difficulty: "★☆☆☆☆ (極易上手)",
    features: ["AOE清怪極快", "安全輸出距離", "高額增傷"],
    coreBoons: {
      Attack: "hera_attack",       // 赫拉普攻 (施加 Hitch 牽引)
      Special: "poseidon_special",  // 波賽頓特技 (施加 Slip 滑行，主輸出)
      Cast: "apollo_cast",        // 阿波羅法陣 (大範圍控場致盲)
      Dash: "poseidon_dash",      // 波賽頓奔刺 (加強濺射與擊退)
      Gain: "poseidon_gain"       // 波賽頓回魔 (怪掉水球回魔，續航極佳)
    },
    arcanaIds: [1, 3, 5, 8, 12, 15, 18, 24], // 包含 XVIII 源頭與 XV 復仇女神等
    description: "此流派是目前版本最無腦強大的配置之一。姊妹雙刀的特技是扇形遠程飛刀，搭配波賽頓特技的【水花濺射】，每次發射特技都能擊退一大片敵人並施加【滑行】狀態；再搭配赫拉普攻施加的【牽引】，能讓受傷害的敵人互相分享傷害。此組合完美且輕鬆觸發奧秘牌【源頭】的雙重詛咒，增傷 50% 毀天滅地！",
    tips: "開局優先尋找【波賽頓】的特技。拿到特技後，在第二關或第三關尋找【赫拉】或【阿芙蘿黛蒂】的普攻，以確保擁有兩種狀態詛咒。戰鬥時拉開距離瘋狂按特技（飛刀）即可。"
  },
  {
    id: "apollo_solar_cast",
    title: "大日如來「法陣太陽爆擊流」",
    weapon: "巫師之杖 (Witch's Staff)",
    aspect: "梅莉諾雅基底 (Aspect of Melinoë)",
    weaponKey: "witch_staff",
    aspectKey: "melinoe",
    difficulty: "★★☆☆☆ (靈活走位)",
    features: ["持續爆發伤害", "無死角安全區", "控場致盲"],
    coreBoons: {
      Attack: "demeter_attack",    // 德密特普攻 (施加 Freeze 凍結，控場)
      Special: "apollo_special",   // 阿波羅特技 (加長攻擊距離)
      Cast: "apollo_cast",         // 阿波羅法陣 (主輸出，烈陽之環持續灼燒與致盲)
      Dash: "apollo_dash",         // 阿波羅奔刺 (致盲提速)
      Gain: "apollo_gain"          // 阿波羅回魔 (法陣中高速回魔，無限法陣)
    },
    arcanaIds: [1, 5, 7, 12, 14, 15, 18, 25],
    description: "圍繞奧秘牌【復仇女神】（對法陣內敵人傷害+20%）與【源頭】（雙重詛咒+50%）展開的流派。利用阿波羅法陣【烈陽之環】在地上放下超大發光太陽，每秒對怪造成多段烈陽傷害與【眩暈】；配合德密特普攻的【凍結】，敵人將被死死控在法陣中動彈不得，承受毀滅性的疊加融化傷害。",
    tips: "必拿奧秘牌【XV. 復仇女神】。優先拿到阿波羅法陣神恩後，尋找【阿波羅回魔】，只要站在自己的發光法陣中就能無限回復法力，隨後引導法陣（Omega Cast）無限連發，極為震撼。"
  },
  {
    id: "hestia_hephaestus_burst",
    title: "火神爆裂「火山希臘火斧流」",
    weapon: "月長石巨斧 (Moonstone Axe)",
    aspect: "梅莉諾雅基底 (Aspect of Melinoë)",
    weaponKey: "moonstone_axe",
    aspectKey: "melinoe",
    difficulty: "★★★☆☆ (節奏操作)",
    features: ["單擊破千爆發", "厚實護甲生存", "無視護盾擊飛"],
    coreBoons: {
      Attack: "hephaestus_attack", // 赫菲斯托斯普攻 (大冷卻爆炸，施加 Vent)
      Special: "hestia_special",   // 赫斯提亞特技 (遠程投射燃燒，施加 Scorch)
      Cast: "hestia_cast",         // 赫斯提亞法陣 (中央火花持續燃燒)
      Dash: "hephaestus_dash",     // 赫菲斯托斯奔刺 (衝擊波與反彈)
      Gain: "hestia_gain"          // 赫斯提亞回魔 (犧牲10%生命值上限換超高回魔)
    },
    arcanaIds: [3, 6, 8, 9, 12, 18, 24],
    description: "利用月長石巨斧極高單次打擊傷害的特性，配合火神【火山之擊】每 15 秒（可升級縮短）一次的巨大熔岩爆震（起步 400+ 傷害），一擊能直接秒殺小怪；再利用赫斯提亞特技的【燒傷】進行遠程拉扯 and 詛咒堆疊。火神排氣（Vent）與灶神燒傷（Scorch）組合出完美的雙重詛咒，兼具生存與高單擊爆發力！",
    tips: "斧頭第一擊或重擊硬直較大，建議利用奔刺起手。優先點出火神普攻，爆震傷害極高；回魔方面，灶神犧牲生命上限換取恆定秒回是性價比最高的回魔神恩，能讓您隨心所欲揮舞重斧引導 Omega 技。"
  },
  {
    id: "hera_zeus_chain",
    title: "雷劫鎖鏈「天罰引爆流」",
    weapon: "暗影之火 (Umbral Flames)",
    aspect: "梅莉諾雅基底 (Aspect of Melinoë)",
    weaponKey: "umbral_flames",
    aspectKey: "melinoe",
    difficulty: "★★☆☆☆ (中低難度)",
    features: ["「源頭」增傷秒激活", "全螢幕彈射清怪", "超高段數輸出"],
    coreBoons: {
      Attack: "zeus_attack",       // 宙斯普攻 (施加 Blitz 雷擊)
      Special: "hera_special",     // 赫拉特技 (施加 Hitch 牽引)
      Cast: "zeus_cast",          // 宙斯法陣 (落雷轟擊)
      Dash: "hera_dash",          // 赫拉奔刺 (穿怪掛牽引)
      Gain: "zeus_gain"           // 宙斯回魔 (超高速秒回法力)
    },
    arcanaIds: [1, 3, 5, 12, 14, 18, 20, 24],
    description: "利用赫拉特技的【牽引】（Hitch）效果將全場怪物進行生命連結；同時搭配宙斯普攻施加的【雷擊】（Blitz），在怪物承受 120 點傷害時會引爆額外閃電。當多隻受牽引的怪物互相分享傷害時，會瞬間集體引爆閃電連鎖反應！此構築完美包含雷擊與牽引雙重詛咒，可永久激活「源頭」50% 增傷，是清圖效率數一數二的極爽快流派。",
    tips: "開局首選【宙斯】普攻或【赫拉】特技。主力靠蓄力特技在大範圍內給所有怪掛上【牽引】，然後瘋狂按普攻發射子彈召喚閃電引爆。配合宙斯回魔可以無壓力引導 Omega 技能。"
  },
  {
    id: "poseidon_demeter_freeze",
    title: "海王急凍「冰花海嘯泉湧流」",
    weapon: "白銀骷髏 (Argent Skull)",
    aspect: "梅莉諾雅基底 (Aspect of Melinoë)",
    weaponKey: "argent_skull",
    aspectKey: "melinoe",
    difficulty: "★★☆☆☆ (簡單安逸)",
    features: ["極致安全控場", "間歇泉大範圍衝擊", "高防禦容錯率"],
    coreBoons: {
      Attack: "poseidon_attack",    // 波賽頓普攻 (施加 Slip 滑行，主輸出)
      Special: "demeter_special",   // 德密特特技 (施加 Freeze 凍結，完美控場)
      Cast: "poseidon_cast",        // 波賽頓法陣 (間歇泉大擊飛)
      Dash: "demeter_dash",         // 德密特奔刺 (冷冽颶風減速)
      Gain: "poseidon_gain"         // 波賽頓回魔 (怪掉水球回魔，補給多)
    },
    arcanaIds: [1, 3, 8, 9, 12, 18, 22, 23],
    description: "結合了德密特【凍結】的極致安全控制與波賽頓【水花濺射】的強大擊退 AOE 輸出。使用白銀骷髏的特技飛盾進行大範圍近身控場，將敵人死死凍結，再利用波賽頓的普攻與法陣引爆出巨額水花傷害與【滑行】狀態。凍結與滑行完美組合出雙重詛咒，永久觸發奧秘「源頭」的 50% 傷害加成，攻防一體！",
    tips: "優先尋找【波賽頓】的普攻/法陣與【德密特】的特技。戰鬥時先用特技砸向怪堆施加凍結，隨後利用波賽頓普攻近距離發射骷髏引爆水花，安逸感拉滿，特別適合新手或高難度開荒。"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = hades2BuildPresets;
}
