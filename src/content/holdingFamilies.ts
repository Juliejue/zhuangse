import type { HoldingFamily } from "@/lib/types";

/**
 * 承接能量家族（产品解读，非官方结论）。
 * 推荐"颜色能量类型"而不是具体日期，避免用户误以为要按生日找人。
 */
export const HOLDING_FAMILIES: Record<string, HoldingFamily> = {
  deepwater: {
    key: "deepwater",
    colorFamilyName: "深水型冷色调",
    sampleColorNames: ["Deep Teal", "Peacock Blue", "Azure Blue"],
    whyFitsUser:
      "你的颜色浓度高，表达强，直觉也快。能接住这种能量的，往往不是另一团失控的火，也不是一碰就碎的软。是一种有边界、有深度、回应稳定的深水。它不要求你变淡，它只是装得下。",
    relationshipFeeling:
      "和这种人相处，第一秒未必心动，但身体会慢慢松开。你可以强烈，可以敏锐，可以话很多，关系不会因此摇晃。",
    realLifeSignals: [
      "回复稳定，节奏不忽冷忽热",
      "能听你把话说完，不急着评价",
      "不因为你认真而后退",
      "有自己的边界，也尊重你的",
    ],
    commonMisread:
      "它一开始不如易碎的人让你心疼，你可能会误以为不够心动。",
  },
  neutral: {
    key: "neutral",
    colorFamilyName: "亚麻与灰紫型中性色",
    sampleColorNames: ["Linen Beige", "Greyish Purple", "Taupe"],
    whyFitsUser:
      "中性色不抢舞台，但托得住浓颜色的重量。它给的东西很朴素：日子被安排好，情绪有地方放。",
    relationshipFeeling:
      "不太会一直上头，但会越来越觉得生活有质感。一起看展，散步，把房间整理出秩序，日子慢慢变好看。",
    realLifeSignals: [
      "审美稳定，不浮夸",
      "能把生活安排好",
      "有长期主义",
      "不拿冷淡冒充高级",
    ],
    commonMisread: "安静容易被误读成无趣，多给它一次对话的机会。",
  },
  gentleSteady: {
    key: "gentleSteady",
    colorFamilyName: "立得住的浅色",
    sampleColorNames: ["Light Turquoise", "Sage Green", "Pale Aqua"],
    whyFitsUser:
      "你的颜色轻，干净，容易被打动。适合接住你的，是同样温柔但立得住的能量。它不会拿你的敏感开玩笑，也不会把你的柔软当成理所当然。",
    relationshipFeeling:
      "被这种人接住的感觉，接近把很重的包放下来的那一秒。",
    realLifeSignals: [
      "温柔是稳定的，不看心情",
      "记得你随口说过的小事",
      "不评判你的眼泪",
      "答应的事会做到",
    ],
    commonMisread:
      "它不戏剧化，你可能会觉得平淡。但平淡里有你缺的那种安全。",
  },
};
