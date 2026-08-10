import { getReadableTextColor } from "@/lib/colorMath";
import type { BirthdayColor } from "@/lib/types";

/** 官方生日色事实卡：只展示来自源站的数据，中文名标注为产品译 */
export function ColorCard({
  color,
  label,
}: {
  color: BirthdayColor;
  label?: string;
}) {
  const textOnSwatch = getReadableTextColor(color.hex);
  const zhIsTranslation =
    !!color.colorNameZh && color.colorNameZh !== color.colorNameJa;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div
        className="flex h-28 flex-col justify-end p-4"
        style={{ background: color.hex, color: textOnSwatch }}
      >
        <div className="flex items-end justify-between">
          <div>
            {label && (
              <div className="mb-1 text-[11px] font-light tracking-[0.2em] opacity-70">
                {label}
              </div>
            )}
            <div className="text-2xl font-light tracking-wide">
              {color.colorNameZh ?? color.colorNameJa}
              {zhIsTranslation && (
                <span className="ml-1.5 align-top text-[10px] font-normal opacity-60">
                  产品译
                </span>
              )}
            </div>
            <div className="mt-0.5 text-[11px] font-light tracking-wider opacity-75">
              {color.colorNameJa}
              {color.colorNameKana && ` · ${color.colorNameKana}`}
              {color.colorNameEn && ` · ${color.colorNameEn}`}
            </div>
          </div>
          <div className="text-right text-[11px] font-light tracking-widest opacity-80">
            {color.dateLabelJa}
            <br />
            {color.hex}
          </div>
        </div>
      </div>
      <div className="space-y-3 p-4 text-sm font-light text-white/85">
        <div>
          <div className="mb-1.5 text-[11px] tracking-[0.25em] text-white/45">
            色言葉{color.colorWordsZh && " · 产品译"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(color.colorWordsZh ?? color.colorWordsJa).map((w) => (
              <span
                key={w}
                className="rounded-full border border-white/15 px-2.5 py-0.5 text-[12px] text-white/80"
              >
                {w}
              </span>
            ))}
          </div>
          {color.colorWordsZh && (
            <div className="mt-1.5 text-[11px] text-white/35">
              原文：{color.colorWordsJa.join("・")}
            </div>
          )}
        </div>
        <div>
          <div className="mb-1 text-[11px] tracking-[0.25em] text-white/45">
            特徴{color.featureZh && " · 产品译"}
          </div>
          <p className="leading-relaxed">{color.featureZh ?? color.featureJa}</p>
          {color.featureZh && (
            <p className="mt-0.5 text-[11px] text-white/35">
              原文：{color.featureJa}
            </p>
          )}
        </div>
        <details className="group">
          <summary className="cursor-pointer list-none text-[11px] tracking-[0.25em] text-white/45 transition group-open:mb-1.5 hover:text-white/70">
            色值详情 +
          </summary>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-white/65">
            <span>
              RGB {color.rgb.r} / {color.rgb.g} / {color.rgb.b}
            </span>
            {color.hsb && (
              <span>
                HSB {color.hsb.h} / {color.hsb.s} / {color.hsb.b}
              </span>
            )}
            {color.lab && (
              <span>
                Lab {color.lab.l} / {color.lab.a} / {color.lab.b}
              </span>
            )}
            {color.cmyk && (
              <span>
                CMYK {color.cmyk.c} / {color.cmyk.m} / {color.cmyk.y} /{" "}
                {color.cmyk.k}
              </span>
            )}
          </div>
        </details>
        <div className="border-t border-white/10 pt-2.5 text-[11px] text-white/40">
          来源{" "}
          <a
            href={color.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/30 underline-offset-2 hover:text-white/70"
          >
            birthday-color.cafein.jp
          </a>
          　核验于 {color.verifiedAt}
          {color.sourceNote && (
            <span className="mt-1 block text-white/35">{color.sourceNote}</span>
          )}
        </div>
      </div>
    </div>
  );
}
