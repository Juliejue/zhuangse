/**
 * 抓取 birthday-color.cafein.jp 的 366 日生日色事实。
 *
 * 铁律：只收录源站页面上真实存在的字段，解析不到的一律留空，绝不 invent。
 * 中文译名（colorNameZh / featureZh / colorWordsZh）不是源站数据，此脚本不生成，
 * 只保留 data 文件里已人工核验过的译名，其余留空等后续 authoring pass。
 *
 * 运行：node scripts/fetchBirthdayColors.ts   （Node 23.6+ 原生跑 TS）
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parsePage } from "./parseBirthdayPage.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "src", "data", "birthdayColors.json");
const FAILED_PATH = join(__dirname, "failed.json");

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DELAY_MS = 700;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pad2 = (n: number) => String(n).padStart(2, "0");
const today = new Date().toISOString().slice(0, 10);

async function main() {
  const existing: Record<string, Record<string, unknown>> = existsSync(
    DATA_PATH
  )
    ? JSON.parse(readFileSync(DATA_PATH, "utf8"))
    : {};

  const result: Record<string, unknown> = {};
  const failed: Array<{ id: string; url: string; reason: string }> = [];
  const allWarnings: Array<{ id: string; warnings: string[] }> = [];

  let done = 0;
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= DAYS_IN_MONTH[month - 1]; day++) {
      const id = `${pad2(month)}${pad2(day)}`;
      const url = `http://birthday-color.cafein.jp/html/${id}.html`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          failed.push({ id, url, reason: `HTTP ${res.status}` });
        } else {
          const buf = await res.arrayBuffer();
          const html = new TextDecoder("shift_jis").decode(buf);
          const { color, warnings } = parsePage(html, month, day, url, today);
          if (!color) {
            failed.push({ id, url, reason: warnings.join("; ") || "解析失败" });
          } else {
            if (warnings.length) allWarnings.push({ id, warnings });
            const prev = existing[id] ?? {};
            result[id] = {
              ...color,
              ...(prev.colorNameZh ? { colorNameZh: prev.colorNameZh } : {}),
              ...(prev.featureZh ? { featureZh: prev.featureZh } : {}),
              ...(prev.colorWordsZh ? { colorWordsZh: prev.colorWordsZh } : {}),
              ...(prev.sourceNote ? { sourceNote: prev.sourceNote } : {}),
            };
          }
        }
      } catch (e) {
        failed.push({ id, url, reason: String(e) });
      }
      done++;
      if (done % 30 === 0) process.stdout.write(`  ...${done} 天\n`);
      await sleep(DELAY_MS);
    }
  }

  const sorted: Record<string, unknown> = {};
  for (const k of Object.keys(result).sort()) sorted[k] = result[k];
  writeFileSync(DATA_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  writeFileSync(
    FAILED_PATH,
    JSON.stringify({ failed, warnings: allWarnings }, null, 2) + "\n",
    "utf8"
  );

  console.log(
    `\n完成：成功 ${Object.keys(result).length} 天，失败 ${failed.length} 天，字段警告 ${allWarnings.length} 天`
  );
}

main();
