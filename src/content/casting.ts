import type { BirthdayColor } from "@/lib/types";
import { getSemanticProfile } from "@/lib/semanticProfile";
import { ARCHETYPES, pickArchetypeKey } from "./archetypes";

export type AnimalKey =
  | "fox"
  | "butterfly"
  | "whale"
  | "crane"
  | "cat"
  | "moth"
  | "deer";

export interface DateCasting {
  /** 关系标题里用的短意象，例如 红酒与浅葱 */
  zhShort: string;
  animal: AnimalKey;
  animalZh: string;
  energyTitle: string;
  energyDesc: string;
  attractedTo: string;
  relationshipRole: string;
  blindSpot: string;
  holdingEnergy: string;
  noNeedToShrink: string;
}

/**
 * 选角与单人能量画像（产品解读，仅供自我观察与娱乐）。
 * MVP 只覆盖 4 个样本日期；全量选角表在正式抓取数据后按语义画像生成。
 */
export const CASTING: Record<string, DateCasting> = {
  "0325": {
    zhShort: "红酒",
    animal: "fox",
    animalZh: "狐",
    energyTitle: "高浓度直觉型",
    energyDesc:
      "你是一种浓的颜色。心动来的时候不是涟漪，是整杯酒都在晃。你看人很快，看得也深。喜欢一个人的时候，会想认真对待关系里每一个细节。",
    attractedTo:
      "柔软、干净、带一点易碎感的人，会让你不自觉放轻脚步。",
    relationshipRole: "保护者，引导者，先读懂对方的那个人。",
    blindSpot: "容易把我想保护他，误认成他适合我。",
    holdingEnergy:
      "深水一样的能量。温柔但不脆，细腻但不逃，被你打动，也能反过来看见你。",
    noNeedToShrink: "你的敏锐、强烈、认真，和想表达的欲望。",
  },
  "0306": {
    zhShort: "樱花",
    animal: "butterfly",
    animalZh: "蝶",
    energyTitle: "轻盈感动型",
    energyDesc:
      "你是一种很轻的颜色，轻到接近透明。你容易被世界打动，也容易被一句话留住。这种轻不是弱，是一种没被磨掉的干净。",
    attractedTo: "有温度、有分量、让你觉得可以靠一下的人。",
    relationshipRole: "被照顾的，被读懂的，慢慢打开的那个。",
    blindSpot:
      "被强烈的能量照着的时候，容易忘了自己也可以说，慢一点。",
    holdingEnergy:
      "温柔但立得住的能量。不嫌你想得多，也不催你变勇敢。",
    noNeedToShrink: "你的柔软和眼泪，都不需要道歉。",
  },
  "0909": {
    zhShort: "深水",
    animal: "whale",
    animalZh: "鲸",
    energyTitle: "深水稳定型",
    energyDesc:
      "你是一种深的颜色，安静，装得下东西。别人说话的时候你真的在听。情绪到你这里，会慢下来。",
    attractedTo: "鲜活的、浓烈的、把生活过得很用力的人。",
    relationshipRole: "接住的，稳住的，最后关灯的那个。",
    blindSpot: "太习惯当容器，容易忘记问自己想被谁装着。",
    holdingEnergy:
      "能看见你的深的人。你不说话的时候，对方知道你不是没有话。",
    noNeedToShrink: "你的慢和沉默。那是深度，不是缺点。",
  },
  "0122": {
    zhShort: "浅葱",
    animal: "crane",
    animalZh: "鹤",
    energyTitle: "清透温暖型",
    energyDesc:
      "你是一种清透的颜色，像晴天里的水。你希望身边的人都好，也真的会为别人的好而高兴。",
    attractedTo: "真诚的、不绕弯的、把朋友当回事的人。",
    relationshipRole: "带来光的，串起大家的，先伸手的那个。",
    blindSpot:
      "对所有人都好，容易让真正重要的人排不到队。",
    holdingEnergy:
      "把你的好当真的人。不消耗它，也记得还回来。",
    noNeedToShrink: "你的热心不傻，只是需要给对的人。",
  },
};

export const DISCLAIMER =
  "生日色事实来自 birthday-color.cafein.jp；关系解读由产品生成，仅供自我观察与娱乐。";

/** 取一个短意象用于关系标题（红酒与浅葱）。手写日期用 zhShort，其余用中文色名。 */
function shortName(color: {
  colorNameZh?: string;
  colorNameJa: string;
}): string {
  return color.colorNameZh ?? color.colorNameJa;
}

/**
 * 解析某个日期的选角与单人画像。
 * 优先用 CASTING 里手写的特殊日期；否则按语义画像归入能量原型继承文案。
 * 保证 366 天每一天都有一套成立的画像，绝不空手。
 */
export function resolveCasting(color: BirthdayColor): DateCasting {
  const hand = CASTING[color.id];
  if (hand) return hand;

  const arch = ARCHETYPES[pickArchetypeKey(getSemanticProfile(color))];
  return {
    zhShort: shortName(color),
    animal: arch.animal,
    animalZh: arch.animalZh,
    energyTitle: arch.energyTitle,
    energyDesc: arch.energyDesc,
    attractedTo: arch.attractedTo,
    relationshipRole: arch.relationshipRole,
    blindSpot: arch.blindSpot,
    holdingEnergy: arch.holdingEnergy,
    noNeedToShrink: arch.noNeedToShrink,
  };
}
