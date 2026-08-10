/**
 * 从 birthday-color.cafein.jp 单页 HTML 解析生日色事实。
 * 铁律：解析不到的字段留空/null，绝不 invent。
 */
export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface ParsedColor {
  id: string;
  month: number;
  day: number;
  dateLabelJa: string;
  colorNameJa: string;
  colorNameKana?: string;
  colorNameEn?: string;
  hex: string;
  rgb: Rgb;
  sourceNote?: string;
  hsb?: { h: number; s: number; b: number };
  lab?: { l: number; a: number; b: number };
  cmyk?: { c: number; m: number; y: number; k: number };
  featureJa: string;
  colorWordsJa: string[];
  sourceUrl: string;
  verifiedAt: string;
}

const pad2 = (n: number) => String(n).padStart(2, "0");
const isHiragana = (s: string) => /^[぀-ゟー\s]+$/.test(s);
const hasLatin = (s: string) => /[A-Za-z]/.test(s);

function num(re: RegExp, text: string): number | null {
  const m = text.match(re);
  return m ? Number(m[1]) : null;
}

export function parsePage(
  html: string,
  month: number,
  day: number,
  url: string,
  verifiedAt: string
): { color?: ParsedColor; warnings: string[] } {
  const warnings: string[] = [];

  const titleMatch = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  if (!titleMatch) return { warnings: ["没找到标题块 h1/h2"] };

  const lines = titleMatch[1]
    .split(/<br\s*\/?>/i)
    .map((s) => s.replace(/<[^>]+>/g, "").trim())
    .filter((s) => s.length > 0);

  const dateLabelJa = `${month}月${day}日`;
  const paddedLabel = `${pad2(month)}月${pad2(day)}日`;
  if (lines[0] !== dateLabelJa && lines[0] !== paddedLabel)
    warnings.push(`日期标签不匹配：期望 ${dateLabelJa}，得到 ${lines[0] ?? "空"}`);

  // 用 # 开头的行作为名字/色号边界（即便 hex 本身有笔误）
  const hexLineIdx = lines.findIndex((l) => /^#/.test(l));
  if (hexLineIdx < 1) return { warnings: [...warnings, "没找到色号行"] };

  const nameLines = lines.slice(1, hexLineIdx);
  if (nameLines.length === 0) return { warnings: [...warnings, "没找到色名"] };
  const colorNameJa = nameLines[0];
  let colorNameKana: string | undefined;
  let colorNameEn: string | undefined;
  for (const l of nameLines.slice(1)) {
    if (hasLatin(l)) colorNameEn = l;
    else if (isHiragana(l)) colorNameKana = l;
  }

  const r = num(/R:\s*(-?\d+)/, html);
  const g = num(/R:\s*-?\d+\s*G:\s*(-?\d+)/, html);
  const b = num(/G:\s*-?\d+\s*B:\s*(-?\d+)/, html);
  if (r === null || g === null || b === null)
    return { warnings: [...warnings, "RGB 解析失败"] };

  // hex：优先用页面上的合法色号；若源站笔误（如 #W464646），
  // 用源站自己的 RGB 反推（不算 invent，仍是源站数据），并留 note
  const toHex2 = (n: number) =>
    Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  const rawHex = lines[hexLineIdx];
  let hex: string;
  let sourceNote: string | undefined;
  if (/^#[0-9A-Fa-f]{6}$/.test(rawHex)) {
    hex = rawHex.toLowerCase();
  } else {
    hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    sourceNote = `源站色号写作「${rawHex}」疑似笔误，此处按源站 RGB(${r},${g},${b}) 反推为 ${hex}`;
    warnings.push(`hex 笔误，已按 RGB 反推：${rawHex} → ${hex}`);
  }

  const hsbH = num(/H:\s*(-?\d+)/, html);
  const hsbS = num(/H:\s*-?\d+\s*S:\s*(-?\d+)/, html);
  const hsbB = num(/S:\s*-?\d+\s*B:\s*(-?\d+)/, html);
  const labL = num(/L\*:\s*(-?[\d.]+)/, html);
  const labA = num(/a\*:\s*(-?[\d.]+)/, html);
  const labB = num(/b\*:\s*(-?[\d.]+)/, html);
  const cmykC = num(/C:\s*(-?\d+)%/, html);
  const cmykM = num(/M:\s*(-?\d+)%/, html);
  const cmykY = num(/Y:\s*(-?\d+)%/, html);
  const cmykK = num(/K:\s*(-?\d+)%/, html);

  const featMatch = html.match(/特徴：\s*([^<\n]+)/);
  // 色言葉：容忍源站把标签少打成「言葉：」的笔误
  const wordsMatch =
    html.match(/色言葉：\s*([^<\n]+)/) ?? html.match(/(?<!色)言葉：\s*([^<\n]+)/);
  const featureJa = featMatch ? featMatch[1].trim() : "";
  const colorWordsJa = wordsMatch
    ? wordsMatch[1]
        .trim()
        .split("・")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  if (!featureJa) warnings.push("特徴 缺失");
  if (colorWordsJa.length === 0) warnings.push("色言葉 缺失");

  const color: ParsedColor = {
    id: `${pad2(month)}${pad2(day)}`,
    month,
    day,
    dateLabelJa,
    colorNameJa,
    ...(colorNameKana ? { colorNameKana } : {}),
    ...(colorNameEn ? { colorNameEn } : {}),
    hex,
    rgb: { r, g, b },
    ...(sourceNote ? { sourceNote } : {}),
    ...(hsbH !== null && hsbS !== null && hsbB !== null
      ? { hsb: { h: hsbH, s: hsbS, b: hsbB } }
      : {}),
    ...(labL !== null && labA !== null && labB !== null
      ? { lab: { l: labL, a: labA, b: labB } }
      : {}),
    ...(cmykC !== null && cmykM !== null && cmykY !== null && cmykK !== null
      ? { cmyk: { c: cmykC, m: cmykM, y: cmykY, k: cmykK } }
      : {}),
    featureJa,
    colorWordsJa,
    sourceUrl: url,
    verifiedAt,
  };
  return { color, warnings };
}
