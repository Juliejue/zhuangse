/**
 * 把 scripts/_batch.json 里的新一批中文译名并入 translationsZh.json，
 * 再落地到 birthdayColors.json。可反复运行，累加不覆盖旧月份。
 *
 * 运行：node scripts/addTranslations.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRANS = join(__dirname, "..", "src", "data", "translationsZh.json");
const DATA = join(__dirname, "..", "src", "data", "birthdayColors.json");
const BATCH = join(__dirname, "_batch.json");

type Zh = { colorNameZh?: string; featureZh?: string; colorWordsZh?: string[] };

const trans = JSON.parse(readFileSync(TRANS, "utf8")) as Record<string, Zh>;
const batch = JSON.parse(readFileSync(BATCH, "utf8")) as Record<string, Zh>;
const data = JSON.parse(readFileSync(DATA, "utf8")) as Record<
  string,
  Record<string, unknown>
>;

let added = 0;
const orphans: string[] = [];
for (const [id, zh] of Object.entries(batch)) {
  if (!data[id]) {
    orphans.push(id);
    continue;
  }
  trans[id] = { ...trans[id], ...zh };
  added++;
}

// 写回真源（按 id 排序）
const sortedTrans: Record<string, Zh> = {};
for (const k of Object.keys(trans).sort()) sortedTrans[k] = trans[k];
writeFileSync(TRANS, JSON.stringify(sortedTrans, null, 2) + "\n", "utf8");

// 落地到数据文件
for (const [id, zh] of Object.entries(sortedTrans)) {
  if (!data[id]) continue;
  if (zh.colorNameZh) data[id].colorNameZh = zh.colorNameZh;
  if (zh.featureZh) data[id].featureZh = zh.featureZh;
  if (zh.colorWordsZh) data[id].colorWordsZh = zh.colorWordsZh;
}
const sortedData: Record<string, unknown> = {};
for (const k of Object.keys(data).sort()) sortedData[k] = data[k];
writeFileSync(DATA, JSON.stringify(sortedData, null, 2) + "\n", "utf8");

const withZh = Object.values(data).filter((c) => c.featureZh).length;
console.log(
  `本批新增 ${added} 天。中文覆盖 ${withZh}/366${
    orphans.length ? `，孤儿：${orphans.join(",")}` : ""
  }`
);
