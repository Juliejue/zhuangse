export interface BirthdayColor {
  id: string; // MMDD
  month: number;
  day: number;
  dateLabelJa: string;
  colorNameJa: string;
  colorNameKana?: string;
  colorNameEn?: string;
  colorNameZh?: string; // 产品译名，非官方
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsb?: { h: number; s: number; b: number };
  lab?: { l: number; a: number; b: number };
  cmyk?: { c: number; m: number; y: number; k: number };
  featureJa: string;
  featureZh?: string; // 产品译，非官方
  colorWordsJa: string[];
  colorWordsZh?: string[]; // 产品译，非官方
  sourceUrl: string;
  sourceNote?: string;
  verifiedAt: string;
}

export interface SemanticProfile {
  expression: number;
  stability: number;
  softness: number;
  intensity: number;
  social: number;
  artistic: number;
  grounded: number;
  mystery: number;
}

export type ColorRelationType =
  | "tonal"
  | "analogous"
  | "softContrast"
  | "complementary"
  | "deepContrast"
  | "neutralSupport";

export interface ColorRelation {
  hueDifference: number;
  lightnessDifference: number;
  saturationDifference: number;
  relationType: ColorRelationType;
}

// 只做心动关系：所有解读语言都是恋爱框架
export type RelationshipStatus =
  | "crush"
  | "situationship"
  | "together"
  | "past";

export type RelationTypeKey =
  | "protective"
  | "held"
  | "flame"
  | "aesthetic"
  | "strong"
  | "fragile"
  | "grounding"
  | "spiritual"
  | "support"
  | "kindred";

export type IndexBand = "低" | "中低" | "中" | "中高" | "高";

export interface HoldingFamily {
  key: string;
  colorFamilyName: string;
  sampleColorNames: string[];
  whyFitsUser: string;
  relationshipFeeling: string;
  realLifeSignals: string[];
  commonMisread: string;
}

export interface PairAnalysis {
  relationshipTitle: string;
  relationTypeKey: RelationTypeKey;
  relationshipType: string;
  tagline: string;
  figLabel: string;
  colorRelation: ColorRelation;
  heartbeatBand: IndexBand;
  holdingBand: IndexBand;
  holdingAlreadyMet: boolean; // TA 是否已经具备承接你的能量
  attraction: string;
  risk: string;
  userPattern: string;
  holdingFamily: HoldingFamily;
  takeaway: string;
  quote: string;
  disclaimer: string;
}
