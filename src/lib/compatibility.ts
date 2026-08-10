import { DISCLAIMER, resolveCasting } from "@/content/casting";
import { HOLDING_FAMILIES } from "@/content/holdingFamilies";
import { RELATION_TYPES } from "@/content/relationTypes";
import type { ArchetypeKey } from "@/content/archetypes";
import { composeBlocks, pickRelationByArchetype } from "@/content/compose";
import type { AnimalKey } from "@/content/casting";

const ANIMAL_ARCHETYPE: Record<AnimalKey, ArchetypeKey> = {
  fox: "intense",
  butterfly: "soft",
  whale: "steady",
  crane: "expressive",
  cat: "aesthetic",
  moth: "mystic",
  deer: "grounded",
};
import { getColorRelation } from "./colorMath";
import { getSemanticProfile, isHigh } from "./semanticProfile";
import type {
  BirthdayColor,
  IndexBand,
  PairAnalysis,
  RelationshipStatus,
} from "./types";

const clamp = (v: number, lo = 5, hi = 96) => Math.max(lo, Math.min(hi, v));

function toBand(v: number): IndexBand {
  if (v >= 75) return "高";
  if (v >= 60) return "中高";
  if (v >= 45) return "中";
  if (v >= 30) return "中低";
  return "低";
}

const HEARTBEAT_WORDS =
  /心疼|保护|护着|怕我|看穿|靠近|上头|心动|想他|想她|睡不着|梦到|拉扯/g;
const HOLDING_WORDS =
  /安心|稳|听我|理解|懂我|不逃|日常|松弛|放松|踏实|舒服/g;

function countMatches(text: string, pattern: RegExp): number {
  return (text.match(pattern) ?? []).length;
}

export function analyzePair(
  self: BirthdayColor,
  target: BirthdayColor,
  status: RelationshipStatus = "crush",
  userText = ""
): PairAnalysis {
  const colorRelation = getColorRelation(self.hex, target.hex);
  const a = getSemanticProfile(self);
  const b = getSemanticProfile(target);
  // 关系类型由两人的能量原型配对决定（永远命中，不落兜底）。
  // 原型取自实际展示的动物，保证 FIG 动物与关系类型一致（手写日期也不例外）。
  const castA = resolveCasting(self);
  const castB = resolveCasting(target);
  const archA = ANIMAL_ARCHETYPE[castA.animal];
  const archB = ANIMAL_ARCHETYPE[castB.animal];
  const key = pickRelationByArchetype(archA, archB);
  const content = RELATION_TYPES[key];

  // 心动指数：色彩张力 + 强烈×柔软落差 + 用户原话 + 关系状态
  let heartbeat = 40;
  heartbeat += Math.min(18, colorRelation.lightnessDifference * 0.25);
  heartbeat += Math.min(12, colorRelation.saturationDifference * 0.15);
  if (isHigh(a.intensity) && isHigh(b.softness)) heartbeat += 12;
  if (isHigh(b.intensity) && !isHigh(a.intensity)) heartbeat += 10;
  if (isHigh(a.artistic) && isHigh(b.artistic)) heartbeat += 6;
  if (isHigh(a.mystery) && isHigh(b.mystery)) heartbeat += 6;
  heartbeat += Math.min(12, countMatches(userText, HEARTBEAT_WORDS) * 3);
  if (status === "crush" || status === "situationship") heartbeat += 6;
  if (status === "past") heartbeat += 4;

  // 承接指数：对方稳定性 + grounded + 色彩关系不过度尖锐 + 用户原话
  let holding = 28;
  holding += b.stability * 4;
  holding += b.grounded * 2;
  if (
    colorRelation.relationType !== "complementary" &&
    colorRelation.relationType !== "deepContrast"
  )
    holding += 5;
  if (isHigh(b.softness) && b.stability < 4) holding -= 12;
  holding += Math.min(12, countMatches(userText, HOLDING_WORDS) * 4);
  if (status === "together") holding += 4;

  // 承接能量家族：按用户自己的主导维度选
  const family = isHigh(a.intensity)
    ? HOLDING_FAMILIES.deepwater
    : isHigh(a.softness)
      ? HOLDING_FAMILIES.gentleSteady
      : HOLDING_FAMILIES.neutral;

  const heartbeatBand = toBand(clamp(heartbeat));
  const holdingBand = toBand(clamp(holding));
  // TA 已经接得住你时，承接模块转为"你们已经在对的频率上"，不再硬推别人
  const holdingAlreadyMet = clamp(holding) >= 60;

  const relationshipTitle = `${castA.zhShort}与${castB.zhShort}`;
  const figLabel = `${castA.animalZh}与${castB.animalZh}`;

  // 组合式解读：把 TA 的颜色名与双方能量织进段落，同类型不同人也不撞
  const blocks = composeBlocks(key, {
    T: castB.zhShort,
    self: archA,
    target: archB,
  });

  // quote 按双方 id 做稳定轮换，同一对生日看到同一句
  const quotes = content.quotes;
  const quote =
    quotes[(Number(self.id) + Number(target.id)) % quotes.length];

  return {
    relationshipTitle,
    relationTypeKey: key,
    relationshipType: content.name,
    tagline: content.tagline,
    figLabel,
    colorRelation,
    heartbeatBand,
    holdingBand,
    holdingAlreadyMet,
    attraction: blocks.attraction,
    risk: blocks.risk,
    userPattern: blocks.userPattern,
    holdingFamily: family,
    takeaway: content.takeaway,
    quote,
    disclaimer: DISCLAIMER,
  };
}
