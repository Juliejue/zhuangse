"use client";

import { useRef, useState } from "react";
import { exportNodeToPng } from "@/lib/exportImage";

export function ShareablePoster({
  children,
  filename,
  shareText,
}: {
  children: React.ReactNode;
  filename: string;
  shareText: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState(false);

  async function save() {
    if (!ref.current || busy) return;
    setBusy(true);
    setErr(false);
    // 导出时暂停浮动动画，避免定格在动画中途
    ref.current.classList.add("exporting");
    try {
      await exportNodeToPng(ref.current, filename);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch {
      setErr(true);
    } finally {
      ref.current.classList.remove("exporting");
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setErr(true);
    }
  }

  return (
    <div>
      <div ref={ref}>{children}</div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="flex-1 rounded-xl bg-white/90 py-2.5 text-[13px] tracking-[0.15em] text-[#2a1220] transition hover:bg-white disabled:opacity-60"
        >
          {busy ? "生成中…" : saved ? "已保存" : "保存分享卡"}
        </button>
        <button
          type="button"
          onClick={copy}
          className="flex-1 rounded-xl border border-white/25 py-2.5 text-[13px] tracking-[0.15em] text-white/80 transition hover:border-white/50 hover:text-white"
        >
          {copied ? "已复制" : "复制文案"}
        </button>
      </div>
      {err && (
        <p className="mt-2 text-center text-[12px] font-light text-white/50">
          这一步没成功，换个浏览器或稍后再试。
        </p>
      )}
    </div>
  );
}
