import rawData from "@/data/birthdayColors.json";
import type { BirthdayColor } from "./types";

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const birthdayColors = rawData as Record<string, BirthdayColor>;

export function toBirthdayId(month: number, day: number): string {
  return `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
}

export function parseBirthdayId(
  id: string
): { month: number; day: number } | null {
  if (!/^\d{4}$/.test(id)) return null;
  const month = Number(id.slice(0, 2));
  const day = Number(id.slice(2, 4));
  if (!isValidBirthday(month, day)) return null;
  return { month, day };
}

export function isValidBirthday(month: number, day: number): boolean {
  if (!Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12) return false;
  return day >= 1 && day <= DAYS_IN_MONTH[month - 1];
}

export function dateLabelZh(month: number, day: number): string {
  return `${month}月${day}日`;
}

export function dateLabelShort(month: number, day: number): string {
  return `${month}.${day}`;
}

/** 数据缺失时返回 null，绝不硬生成 */
export function getBirthdayColor(id: string): BirthdayColor | null {
  return birthdayColors[id] ?? null;
}

export const availableIds = Object.keys(birthdayColors).sort();
