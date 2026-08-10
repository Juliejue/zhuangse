import type { AnimalKey } from "./casting";

export type ArchetypeKey =
  | "intense"
  | "soft"
  | "steady"
  | "expressive"
  | "aesthetic"
  | "mystic"
  | "grounded";

export interface Archetype {
  key: ArchetypeKey;
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
 * 七个能量原型（产品解读，仅供自我观察与娱乐）。
 * 语感基准：爱吃温泉蛋。低声，画面先于观点，不上价值，全程不用破折号。
 * 366 天按主导语义维度归入某个原型继承文案；casting.ts 里手写的特殊日期覆盖它。
 */
export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  intense: {
    key: "intense",
    animal: "fox",
    animalZh: "狐",
    energyTitle: "高浓度直觉型",
    energyDesc:
      "你是一种浓的颜色。心动不是慢慢渗上来的，是一下子就满了。你看人很快，常常对方还没开口，你就已经读到了他没说的那半句。这种浓是天生的，有时候也挺累的。",
    attractedTo:
      "那些看起来需要被好好对待的人，会让你不自觉放轻脚步。",
    relationshipRole: "读懂对方的那个，先伸手的那个，忍不住想护着的那个。",
    blindSpot: "你可能会把想保护他，悄悄当成他适合我。",
    holdingEnergy:
      "接得住浓度的人。不怕你的强烈，也不需要你把自己拧小一号。",
    noNeedToShrink:
      "你的敏锐和认真。它们不算多。只是还没遇到一个接得稳的人。",
  },
  soft: {
    key: "soft",
    animal: "butterfly",
    animalZh: "蝶",
    energyTitle: "轻盈易感型",
    energyDesc:
      "你是一种很轻的颜色，轻到有点透明。一句话，一首歌，陌生人随手的一点好，都能让你停很久。这么容易被打动，不代表你弱。你身上有一块地方，一直没被磨硬。",
    attractedTo: "有温度、有分量、让你觉得可以靠一下的人。",
    relationshipRole: "被照顾的，慢慢打开的，把心事一点点说出来的那个。",
    blindSpot:
      "被浓烈的人吸引时，容易忘记自己也可以说一句，等我一下。",
    holdingEnergy:
      "温柔又立得住的人。不嫌你想得多，也不会拿你的软来开玩笑。",
    noNeedToShrink: "你的眼泪和你的敏感。它们不用先道歉。",
  },
  steady: {
    key: "steady",
    animal: "whale",
    animalZh: "鲸",
    energyTitle: "深水稳定型",
    energyDesc:
      "你是一种深的颜色，安静，装得下东西。别人说话的时候，你是真的在听。情绪淌到你这儿，会自己慢下来。你不太争，可有你在的地方，人会莫名踏实。",
    attractedTo: "鲜活的、浓烈的、把日子过得很用力的人。",
    relationshipRole: "接住的，稳住的，最后关灯的那个。",
    blindSpot: "太习惯当容器，容易忘了问自己，想被谁装着。",
    holdingEnergy:
      "能看见你那层深的人。你沉默的时候，对方知道你不是没有话。",
    noNeedToShrink: "你的慢。别人常把它看成迟钝，其实你只是沉得比较深。",
  },
  expressive: {
    key: "expressive",
    animal: "crane",
    animalZh: "鹤",
    energyTitle: "有存在感的表达型",
    energyDesc:
      "你是一种一走进房间就会被看到的颜色。你有话想说，也说得出口。那种光很自然，藏不住。有人会因为它靠近你，也有人会因为它有点怕你。",
    attractedTo: "接得住你的表达、还能陪你来回几个回合的人。",
    relationshipRole: "带节奏的，先开口的，把气氛点亮的那个。",
    blindSpot: "光太亮的时候，容易照不见旁边那个一直没作声的人。",
    holdingEnergy:
      "不被你压住、也不跟你抢的人。你发光的时候，对方在旁边稳稳看着。",
    noNeedToShrink: "你的表达欲。你不必为了让谁自在，把自己调暗。",
  },
  aesthetic: {
    key: "aesthetic",
    animal: "cat",
    animalZh: "猫",
    energyTitle: "审美驱动型",
    energyDesc:
      "你是一种讲究的颜色。你对美很敏感，遇到不对的配色、不对的氛围，身体会先替你难受。光被爱是不够的，你更想被懂。有人能接住你那句这个真好看，你大概就认定他了。",
    attractedTo: "审美同频、能一起沉进一件美的事里的人。",
    relationshipRole: "发现美的，营造氛围的，把日子过成作品的那个。",
    blindSpot: "太看重同频，容易忽略对方能不能陪你把事情落地。",
    holdingEnergy: "懂你的讲究、又拉得住你不飘走的人。",
    noNeedToShrink: "你对美的固执。那不是矫情，是你认真的方式。",
  },
  mystic: {
    key: "mystic",
    animal: "moth",
    animalZh: "蛾",
    energyTitle: "深潜精神型",
    energyDesc:
      "你是一种深处的颜色。你想的东西常常比说出来的多。聊天聊到某个够深的地方，你才觉得终于喘上一口气。浅的热闹留不住你，你在找的是能一起潜下去的人。",
    attractedTo: "有精神纵深、聊得进去的人。",
    relationshipRole: "带对方看深处的，也在深处等人的那个。",
    blindSpot: "在自己的世界里住太久，容易忘记下楼吃饭。",
    holdingEnergy: "愿意跟你潜下去、也会记得拉你回岸上的人。",
    noNeedToShrink: "你的深和你的沉默。那是你的地方，不是毛病。",
  },
  grounded: {
    key: "grounded",
    animal: "deer",
    animalZh: "鹿",
    energyTitle: "踏实落地型",
    energyDesc:
      "你是一种沉得住的颜色。你不太说漂亮话，可你答应的事会做到。你把稳定当成一种温柔，把日子一天天过好，就是你在表达在乎。这种可靠其实很稀有。",
    attractedTo: "同样靠谱、不玩虚的、能一起把生活搭起来的人。",
    relationshipRole: "撑起来的，安排好的，让人安心的那个。",
    blindSpot: "太负责，容易把自己的需要排到最后一个。",
    holdingEnergy:
      "看得见你付出、也会心疼你的人。你不该永远是那个照顾别人的。",
    noNeedToShrink: "你的实在。它不无聊。很多人求这种安稳，求不到。",
  },
};

/** 从八维语义画像归入某个原型（social 并入 soft，其余取主导维度） */
export function pickArchetypeKey(profile: {
  intensity: number;
  softness: number;
  stability: number;
  expression: number;
  artistic: number;
  mystery: number;
  grounded: number;
  social: number;
}): ArchetypeKey {
  const buckets: Array<[ArchetypeKey, number]> = [
    ["intense", profile.intensity],
    ["soft", profile.softness + profile.social * 0.6],
    ["steady", profile.stability],
    ["expressive", profile.expression],
    ["aesthetic", profile.artistic],
    ["mystic", profile.mystery],
    ["grounded", profile.grounded],
  ];
  buckets.sort((a, b) => b[1] - a[1]);
  return buckets[0][0];
}
