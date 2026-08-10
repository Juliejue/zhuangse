/**
 * 把 src/data/translationsZh.json 里的中文译名合并进 birthdayColors.json。
 * translationsZh.json 是中文层的唯一真源（人工翻译，产品译，非官方）。
 * 可反复运行，只覆盖 Zh 字段，不动源站事实。
 *
 * 运行：node scripts/applyTranslations.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, "..", "src", "data", "birthdayColors.json");
const TRANS = join(__dirname, "..", "src", "data", "translationsZh.json");

const data = JSON.parse(readFileSync(DATA, "utf8")) as Record<
  string,
  Record<string, unknown>
>;
const trans = JSON.parse(readFileSync(TRANS, "utf8")) as Record<
  string,
  { colorNameZh?: string; featureZh?: string; colorWordsZh?: string[] }
>;

let applied = 0;
const orphans: string[] = [];
for (const [id, zh] of Object.entries(trans)) {
  if (!data[id]) {
    orphans.push(id);
    continue;
  }
  if (zh.colorNameZh) data[id].colorNameZh = zh.colorNameZh;
  if (zh.featureZh) data[id].featureZh = zh.featureZh;
  if (zh.colorWordsZh) data[id].colorWordsZh = zh.colorWordsZh;
  applied++;
}

const sorted: Record<string, unknown> = {};
for (const k of Object.keys(data).sort()) sorted[k] = data[k];
writeFileSync(DATA, JSON.stringify(sorted, null, 2) + "\n", "utf8");

const withZh = Object.values(data).filter((c) => c.featureZh).length;
console.log(
  `合并 ${applied} 天中文译名。当前有中文的天数：${withZh}/366${
    orphans.length ? `，孤儿 id：${orphans.join(",")}` : ""
  }`
);
