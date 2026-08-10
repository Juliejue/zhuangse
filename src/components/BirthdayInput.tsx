"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  availableIds,
  isValidBirthday,
  toBirthdayId,
} from "@/lib/birthday";
import type { RelationshipStatus } from "@/lib/types";

const STATUS_OPTIONS: Array<{ value: RelationshipStatus; label: string }> = [
  { value: "crush", label: "心动中" },
  { value: "situationship", label: "暧昧中" },
  { value: "together", label: "在一起了" },
  { value: "past", label: "曾经喜欢过" },
];

const SAMPLE_PAIRS: Array<{ label: string; self: [number, number]; target: [number, number] }> = [
  { label: "3.25 × 1.22", self: [3, 25], target: [1, 22] },
  { label: "3.25 × 9.9", self: [3, 25], target: [9, 9] },
  { label: "1.22 × 9.9", self: [1, 22], target: [9, 9] },
  { label: "9.9 × 1.22", self: [9, 9], target: [1, 22] },
];

const selectCls =
  "w-full appearance-none rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm font-light text-white/90 outline-none transition focus:border-white/40";

function DateSelects({
  month,
  day,
  onChange,
}: {
  month: number | null;
  day: number | null;
  onChange: (m: number | null, d: number | null) => void;
}) {
  const parse = (v: string) => (v ? Number(v) : null);
  return (
    <div className="grid grid-cols-2 gap-2">
      <select
        className={selectCls}
        value={month ?? ""}
        onChange={(e) => onChange(parse(e.target.value), day)}
      >
        <option value="" className="bg-[#1d1420]">
          月
        </option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m} className="bg-[#1d1420]">
            {m} 月
          </option>
        ))}
      </select>
      <select
        className={selectCls}
        value={day ?? ""}
        onChange={(e) => onChange(month, parse(e.target.value))}
      >
        <option value="" className="bg-[#1d1420]">
          日
        </option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <option key={d} value={d} className="bg-[#1d1420]">
            {d} 日
          </option>
        ))}
      </select>
    </div>
  );
}

export function BirthdayInput() {
  const router = useRouter();
  const [self, setSelf] = useState<[number | null, number | null]>([null, null]);
  const [target, setTarget] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const [status, setStatus] = useState<RelationshipStatus>("crush");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const selfId = useMemo(
    () => (self[0] && self[1] ? toBirthdayId(self[0], self[1]) : ""),
    [self]
  );
  const targetId = useMemo(
    () => (target[0] && target[1] ? toBirthdayId(target[0], target[1]) : ""),
    [target]
  );

  function validate(): string | null {
    if (!self[0] || !self[1] || !target[0] || !target[1])
      return "先把两个人的生日都选好吧。";
    if (!isValidBirthday(self[0], self[1]) || !isValidBirthday(target[0], target[1]))
      return "这个日期不存在，再看一眼？";
    const missing = [selfId, targetId].filter(
      (id) => !availableIds.includes(id)
    );
    if (missing.length > 0)
      return "这个日期的生日色还没有入库，数据缺失时不会硬生成。换一天试试？";
    return null;
  }

  function submit() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    const params = new URLSearchParams({
      self: selfId,
      target: targetId,
      status,
    });
    if (text.trim()) params.set("text", text.trim().slice(0, 200));
    router.push(`/result?${params.toString()}`);
  }

  function goSingle() {
    if (!self[0] || !self[1]) {
      setError("先选好你的生日吧。");
      return;
    }
    if (!availableIds.includes(selfId)) {
      setError("这个日期的生日色还没有入库，数据缺失时不会硬生成。换一天试试？");
      return;
    }
    router.push(`/single?date=${selfId}`);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {SAMPLE_PAIRS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setSelf(p.self);
              setTarget(p.target);
              setError(null);
            }}
            className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-light text-white/60 transition hover:border-white/40 hover:text-white/90"
          >
            {p.label}
          </button>
        ))}
        <span className="self-center text-[11px] font-light text-white/35">
          ← 样本日期
        </span>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-light tracking-[0.25em] text-white/50">
          你的生日
        </div>
        <DateSelects
          month={self[0]}
          day={self[1]}
          onChange={(m, d) => {
            setSelf([m, d]);
            setError(null);
          }}
        />
      </div>

      <div>
        <div className="mb-2 text-[11px] font-light tracking-[0.25em] text-white/50">
          TA 的生日
        </div>
        <DateSelects
          month={target[0]}
          day={target[1]}
          onChange={(m, d) => {
            setTarget([m, d]);
            setError(null);
          }}
        />
      </div>

      <div>
        <div className="mb-2 text-[11px] font-light tracking-[0.25em] text-white/50">
          你们的关系
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStatus(s.value)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-light transition ${
                status === s.value
                  ? "border-white/70 bg-white/10 text-white"
                  : "border-white/15 text-white/55 hover:border-white/35"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-light tracking-[0.25em] text-white/50">
          你对 TA 的感觉（可选）
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          maxLength={200}
          placeholder="比如：我很想保护他，但他说有点怕我。可以写你为什么心动，或哪里说不清。"
          className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm font-light text-white/90 outline-none transition placeholder:text-white/30 focus:border-white/40"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-[13px] font-light leading-relaxed text-white/70">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        className="w-full rounded-xl bg-white/90 py-3 text-sm tracking-[0.2em] text-[#2a1220] transition hover:bg-white"
      >
        生成关系配色
      </button>
      <button
        type="button"
        onClick={goSingle}
        className="w-full py-1 text-center text-[13px] font-light tracking-wider text-white/50 transition hover:text-white/85"
      >
        只查我的生日色 →
      </button>
    </div>
  );
}
