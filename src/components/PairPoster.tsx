import { resolveCasting } from "@/content/casting";
import {
  archivalTextOn,
  fieldGradient,
  figureColorOn,
  mix,
  relativeLuminance,
  shade,
  tint,
} from "@/lib/colorMath";
import { dateLabelShort } from "@/lib/birthday";
import type { BirthdayColor, PairAnalysis } from "@/lib/types";
import { AnimalGlyph } from "./AnimalFigure";
import { GrainOverlay } from "./GrainOverlay";

/**
 * 双联关系海报：左域是你的颜色，右域是 TA 的颜色。
 * 你的动物出现在 TA 的色域里，TA 的动物出现在你的色域里。
 */
export function PairPoster({
  self,
  target,
  analysis,
}: {
  self: BirthdayColor;
  target: BirthdayColor;
  analysis: PairAnalysis;
}) {
  const gid = `${self.id}-${target.id}`;
  const [selfDeep, selfBase] = fieldGradient(self.hex);
  const [targetDeep, targetBase] = fieldGradient(target.hex);
  const seamColor = mix(self.hex, target.hex, 0.5);

  const castSelf = resolveCasting(self);
  const castTarget = resolveCasting(target);

  // 所有文字色都从双方主题色派生，不用纯黑白
  const leftLight = relativeLuminance(self.hex) > 0.55;
  const leftText = leftLight ? shade(self.hex, 0.68) : tint(self.hex, 0.9);
  const leftTextDim = leftLight ? shade(self.hex, 0.5) : tint(self.hex, 0.62);
  const metaText = archivalTextOn(target.hex);


  const swatchNameEn = (c: BirthdayColor) =>
    (c.colorNameEn ?? c.colorNameJa).toUpperCase();


  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
      <svg
        viewBox="0 0 372 465"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`fa-${gid}`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor={selfDeep} />
            <stop offset="1" stopColor={selfBase} />
          </linearGradient>
          <linearGradient id={`fb-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={targetDeep} />
            <stop offset="1" stopColor={targetBase} />
          </linearGradient>
          <filter id={`seam-${gid}`} x="-80%" y="-20%" width="260%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <rect width="372" height="465" fill={`url(#fa-${gid})`} />
        <polygon
          points="214,0 372,0 372,465 196,465"
          fill={`url(#fb-${gid})`}
        />
        <line
          x1="214"
          y1="0"
          x2="196"
          y2="465"
          stroke={seamColor}
          strokeWidth="34"
          opacity="0.55"
          filter={`url(#seam-${gid})`}
        />
      </svg>
      <GrainOverlay opacity={0.45} />
      <div className="absolute inset-0 flex flex-col p-6">
        <div className="flex items-start justify-between">
          <div
            className="text-xs font-light leading-relaxed"
            style={{ color: leftText, letterSpacing: "0.3em" }}
          >
            撞色
          </div>
          <div
            className="text-right text-[11px] font-normal leading-[1.8]"
            style={{ color: metaText, letterSpacing: "0.08em" }}
          >
            TITLE : {analysis.relationshipTitle}
            <br />
            TYPE : {analysis.relationshipType}
            {analysis.figLabel && (
              <>
                <br />
                FIG : {analysis.figLabel}
              </>
            )}
            <br />
            NO. {self.id} × {target.id}
          </div>
        </div>
        {/* 中间弹性带：两只动物填满可用高度并按比例内缩，永远不越出、不压字 */}
        <div className="flex min-h-0 flex-1 items-stretch justify-between overflow-hidden px-1 py-3">
          <div className="float-slow flex w-[40%] items-center justify-center">
            <AnimalGlyph
              animal={castSelf.animal}
              fill={figureColorOn(self.hex, self.hex)}
              className="h-full w-full"
            />
          </div>
          <div className="float-slower flex w-[36%] items-center justify-center">
            <AnimalGlyph
              animal={castTarget.animal}
              fill={figureColorOn(target.hex, target.hex)}
              className="h-full w-full"
            />
          </div>
        </div>
        <div
          className="text-3xl font-extralight"
          style={{ color: leftText, letterSpacing: "0.1em" }}
        >
          {dateLabelShort(self.month, self.day)}{" "}
          <span className="text-xl opacity-50">×</span>{" "}
          {dateLabelShort(target.month, target.day)}
        </div>
        <div
          className="mt-2.5 space-y-1 text-[11px] font-light leading-relaxed"
          style={{ color: leftText, letterSpacing: "0.1em" }}
        >
          <div>
            <span className="opacity-55">你</span>
            <span
              className="mx-1.5 inline-block h-2.5 w-2.5 rounded-[2px] align-[-1px]"
              style={{
                background: self.hex,
                border: "0.5px solid rgba(255,255,255,0.55)",
              }}
            />
            {swatchNameEn(self)}
          </div>
          <div>
            <span className="opacity-55">TA</span>
            <span
              className="mx-1.5 inline-block h-2.5 w-2.5 rounded-[2px] align-[-1px]"
              style={{
                background: target.hex,
                border: "0.5px solid rgba(255,255,255,0.55)",
              }}
            />
            {swatchNameEn(target)}
          </div>
        </div>
        <div
          className="mt-3.5 w-40 border-t"
          style={{ borderColor: leftTextDim }}
        />
        <p
          className="mt-3 max-w-[52%] pl-3 text-[13.5px] font-light leading-[2]"
          style={{
            color: leftText,
            letterSpacing: "0.05em",
            fontFamily: "'Songti SC', 'Noto Serif SC', serif",
            borderLeft: `2px solid ${target.hex}cc`,
            borderRadius: 0,
          }}
        >
          {analysis.quote}
        </p>
        <div
          className="mt-2.5 flex items-center justify-between text-[11px] font-light"
          style={{ color: leftTextDim, letterSpacing: "0.08em" }}
        >
          <span>
            心动 {analysis.heartbeatBand} · 承接 {analysis.holdingBand}
          </span>
          <span style={{ color: metaText, opacity: 0.75 }}>
            birthday-color.cafein.jp
          </span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 text-[9.5px] font-light">
          <span
            style={{ color: leftTextDim, letterSpacing: "0.14em", opacity: 0.9 }}
          >
            撞色
          </span>
          <span
            className="text-right"
            style={{ color: metaText, letterSpacing: "0.03em", opacity: 0.82 }}
          >
            birthcolor-mirror.vercel.app
          </span>
        </div>
      </div>
    </div>
  );
}
