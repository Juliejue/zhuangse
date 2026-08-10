/**
 * 校验 src/data/birthdayColors.json。
 * 严重错误（条数不对/缺必填/hex 非法/重复日期）以非零退出码阻断 build。
 * 字段级问题（RGB 与 hex 不符、缺 hsb/lab、缺中文译名等）只告警。
 *
 * 运行：node scripts/validateBirthdayColors.ts
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "src", "data", "birthdayColors.json");

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const pad2 = (n: number) => String(n).padStart(2, "0");

function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  return {
    r: parseInt(m.slice(0, 2), 16),
    g: parseInt(m.slice(2, 4), 16),
    b: parseInt(m.slice(4, 6), 16),
  };
}

const data = JSON.parse(readFileSync(DATA_PATH, "utf8")) as Record<
  string,
  Record<string, unknown>
>;

const errors: string[] = [];
const warnings: string[] = [];

const entries = Object.entries(data);

// 1. 条数：应为 366
if (entries.length !== 366)
  errors.push(`条目数 ${entries.length}，应为 366`);

// 2. 应覆盖全部 366 个合法日期，无缺失无重复
const expected = new Set<string>();
for (let m = 1; m <= 12; m++)
  for (let d = 1; d <= DAYS_IN_MONTH[m - 1]; d++)
    expected.add(`${pad2(m)}${pad2(d)}`);
for (const id of expected)
  if (!data[id]) errors.push(`缺失日期 ${id}`);
for (const id of Object.keys(data))
  if (!expected.has(id)) errors.push(`多出非法日期 ${id}`);

// 3. 逐条字段校验
for (const [id, c] of entries) {
  const need = (k: string) => {
    if (c[k] === undefined || c[k] === null || c[k] === "")
      errors.push(`${id} 缺必填字段 ${k}`);
  };
  need("id");
  need("month");
  need("day");
  need("hex");
  need("colorNameJa");
  need("sourceUrl");
  need("featureJa");

  if (c.id !== id) errors.push(`${id} 的 id 字段不一致：${String(c.id)}`);

  const hex = String(c.hex ?? "");
  if (!/^#[0-9a-f]{6}$/.test(hex))
    errors.push(`${id} hex 非法：${hex}`);
  else if (c.rgb && typeof c.rgb === "object") {
    const rgb = c.rgb as { r: number; g: number; b: number };
    const fromHex = hexToRgb(hex);
    if (rgb.r !== fromHex.r || rgb.g !== fromHex.g || rgb.b !== fromHex.b)
      warnings.push(
        `${id} RGB 与 hex 不符：源站 ${rgb.r},${rgb.g},${rgb.b} vs hex ${fromHex.r},${fromHex.g},${fromHex.b}（保留源站原值，不改）`
      );
  }

  const words = c.colorWordsJa;
  if (!Array.isArray(words) || words.length === 0)
    warnings.push(`${id} 色言葉 缺失`);
  if (!c.hsb) warnings.push(`${id} 缺 hsb`);
  if (!c.lab) warnings.push(`${id} 缺 lab`);
  if (!c.colorNameZh) warnings.push(`${id} 缺中文译名（待 authoring）`);
}

console.log(
  `校验 ${entries.length} 条：错误 ${errors.length}，告警 ${warnings.length}`
);
if (warnings.length) {
  const zhMissing = warnings.filter((w) => w.includes("中文译名")).length;
  const rgbMismatch = warnings.filter((w) => w.includes("RGB")).length;
  console.log(
    `  告警分布：待译中文 ${zhMissing} · RGB不符 ${rgbMismatch} · 其它 ${
      warnings.length - zhMissing - rgbMismatch
    }`
  );
  for (const w of warnings.filter((w) => !w.includes("中文译名")).slice(0, 30))
    console.log("  ⚠️ " + w);
}
if (errors.length) {
  console.error("\n严重错误，阻断 build：");
  for (const e of errors.slice(0, 40)) console.error("  ✗ " + e);
  process.exit(1);
}
console.log("✓ 通过");
