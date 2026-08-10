import type { ColorRelation, ColorRelationType } from "./types";

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsl {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export function hexToRgb(hex: string): Rgb {
  const m = hex.replace("#", "");
  return {
    r: parseInt(m.slice(0, 2), 16),
    g: parseInt(m.slice(2, 4), 16),
    b: parseInt(m.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = 60 * (((gn - bn) / d) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / d + 2);
    else h = 60 * ((rn - gn) / d + 4);
  }
  if (h < 0) h += 360;
  return { h, s: s * 100, l: l * 100 };
}

export function hexToHsl(hex: string): Hsl {
  return rgbToHsl(hexToRgb(hex));
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function getReadableTextColor(hex: string): "#000000" | "#ffffff" {
  return relativeLuminance(hex) > 0.55 ? "#000000" : "#ffffff";
}

/** 圆周色相差，0-180 */
export function hueDifference(hexA: string, hexB: string): number {
  const a = hexToHsl(hexA).h;
  const b = hexToHsl(hexB).h;
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

export function mix(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  });
}

export const shade = (hex: string, t: number) => mix(hex, "#140a12", t);
export const tint = (hex: string, t: number) => mix(hex, "#fffaf8", t);

export function getColorRelation(hexA: string, hexB: string): ColorRelation {
  const a = hexToHsl(hexA);
  const b = hexToHsl(hexB);
  const hueDiff = hueDifference(hexA, hexB);
  const lightnessDiff = Math.abs(a.l - b.l);
  const saturationDiff = Math.abs(a.s - b.s);

  const isDark = (c: Hsl) => c.l < 40;
  const isMidNeutral = (c: Hsl) => c.s < 15 && c.l >= 25 && c.l <= 85;

  let relationType: ColorRelationType;
  if (hueDiff >= 140) relationType = "complementary";
  else if (isDark(a) && isDark(b) && hueDiff > 80) relationType = "deepContrast";
  else if (isMidNeutral(a) !== isMidNeutral(b)) relationType = "neutralSupport";
  else if (lightnessDiff > 35 || saturationDiff > 45) relationType = "softContrast";
  else if (hueDiff <= 25 && saturationDiff <= 25) relationType = "tonal";
  else if (hueDiff <= 70) relationType = "analogous";
  else relationType = "softContrast";

  return {
    hueDifference: Math.round(hueDiff),
    lightnessDifference: Math.round(lightnessDiff),
    saturationDifference: Math.round(saturationDiff),
    relationType,
  };
}

/* ---------- 视觉层：ethereal 双联色底的派生色 ---------- */

/** 色域背景的深浅两档渐变 */
export function fieldGradient(hex: string): [string, string] {
  const lum = relativeLuminance(hex);
  if (lum > 0.6) return [mix(hex, "#c9a4b2", 0.28), tint(hex, 0.35)];
  return [shade(hex, 0.45), hex];
}

/** 动物剪影出现在对方色域上时的用色：浅底给深影，深底给浅光 */
export function figureColorOn(fieldHex: string, ownHex: string): string {
  return relativeLuminance(fieldHex) > 0.55
    ? shade(ownHex, 0.3)
    : tint(ownHex, 0.8);
}

/** 档案小字在某色域上的颜色 */
export function archivalTextOn(fieldHex: string): string {
  return relativeLuminance(fieldHex) > 0.55
    ? shade(fieldHex, 0.68)
    : tint(fieldHex, 0.88);
}
