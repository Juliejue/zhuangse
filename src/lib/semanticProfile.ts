import { hexToHsl } from "./colorMath";
import type { BirthdayColor, SemanticProfile } from "./types";

type Boost = Partial<SemanticProfile>;

/** 官方色言葉/特徴 → 语义维度的产品映射（产品解读逻辑，非官方结论） */
const KEYWORD_RULES: Array<[RegExp, Boost]> = [
  [/芸術|表現|個性|色彩|美|才能|センス/, { artistic: 3, expression: 2 }],
  [/自信|主役|威厳|情熱|リーダー|風格/, { intensity: 3, expression: 2 }],
  [/直観|直感/, { intensity: 2, mystery: 2 }],
  [/思いやり|愛|友情|優し|幸福|感動/, { softness: 2, social: 2 }],
  [/努力|規律|現実|慎重|秩序|礼儀/, { stability: 2, grounded: 2 }],
  [/神秘|哲学|夢|感性|精神/, { artistic: 1, mystery: 3, intensity: 1 }],
  [/自然|温和|生活|育て|健康|健全/, { grounded: 1, softness: 1, stability: 1 }],
  [/工芸|技術|仕事|誇り/, { grounded: 2, stability: 1, expression: 1 }],
  [/好奇心|若々し|遊び/, { expression: 1, social: 1, artistic: 1 }],
];

const BASE = 2;
const clamp = (v: number) => Math.max(0, Math.min(10, v));

export function getSemanticProfile(color: BirthdayColor): SemanticProfile {
  const profile: SemanticProfile = {
    expression: BASE,
    stability: BASE,
    softness: BASE,
    intensity: BASE,
    social: BASE,
    artistic: BASE,
    grounded: BASE,
    mystery: BASE,
  };

  const text = [color.featureJa, ...color.colorWordsJa].join("・");
  for (const [pattern, boost] of KEYWORD_RULES) {
    if (!pattern.test(text)) continue;
    for (const [key, value] of Object.entries(boost)) {
      profile[key as keyof SemanticProfile] += value ?? 0;
    }
  }

  // 颜色本身的物理属性也参与画像（色彩心理仅作隐喻，见 PRD 2.2）
  const { h, s, l } = hexToHsl(color.hex);
  if (s >= 60 && l < 75) profile.intensity += 2;
  if (s >= 60) profile.expression += 1;
  if (l >= 80) profile.softness += 2;
  if (l <= 35) {
    profile.stability += 1;
    profile.mystery += 1;
  }
  if (h >= 150 && h <= 260) profile.stability += 1;
  if ((h < 40 || h > 320) && s > 50) profile.intensity += 1;

  for (const key of Object.keys(profile) as Array<keyof SemanticProfile>) {
    profile[key] = clamp(profile[key]);
  }
  return profile;
}

export const isHigh = (v: number) => v >= 6;
