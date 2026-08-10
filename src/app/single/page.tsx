import Link from "next/link";
import { AnimalGlyph } from "@/components/AnimalFigure";
import { ColorCard } from "@/components/ColorCard";
import { GrainOverlay } from "@/components/GrainOverlay";
import { DISCLAIMER, resolveCasting } from "@/content/casting";
import { ShareablePoster } from "@/components/ShareablePoster";
import { getBirthdayColor, dateLabelShort } from "@/lib/birthday";
import {
  fieldGradient,
  figureColorOn,
  relativeLuminance,
  shade,
  tint,
} from "@/lib/colorMath";

export default async function SinglePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const id = typeof params.date === "string" ? params.date : "";
  const color = getBirthdayColor(id);

  if (!color) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-[15px] font-light leading-loose text-white/70">
          这个日期的生日色还没有入库。
          <br />
          数据缺失时不会硬生成，这是这个产品的原则。
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full border border-white/25 px-6 py-2 text-[13px] font-light tracking-widest text-white/70 transition hover:border-white/60 hover:text-white"
        >
          ← 换一个日期
        </Link>
      </main>
    );
  }

  const cast = resolveCasting(color);
  const [deep, base] = fieldGradient(color.hex);
  const light = relativeLuminance(color.hex) > 0.55;
  const posterText = light ? shade(color.hex, 0.68) : tint(color.hex, 0.9);
  const posterTextDim = light ? shade(color.hex, 0.5) : tint(color.hex, 0.62);

  const profileRows = cast
    ? ([
        ["你容易被吸引的能量", cast.attractedTo],
        ["你容易进入的位置", cast.relationshipRole],
        ["你的关系盲点", cast.blindSpot],
        ["你适合被什么接住", cast.holdingEnergy],
        ["你不需要再缩小的部分", cast.noNeedToShrink],
      ] as const)
    : [];

  const shareText = [
    `${color.month}.${color.day} ${color.colorNameZh ?? color.colorNameJa}`,
    cast ? cast.energyTitle : "",
    cast ? `适合被接住的方式：${cast.holdingEnergy}` : "",
    "",
    DISCLAIMER,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <main className="relative flex flex-1 flex-col items-center px-5 py-10">
      <div className="pointer-events-none fixed inset-0">
        <GrainOverlay opacity={0.25} />
      </div>
      <div className="relative w-full max-w-md space-y-4">
        <ShareablePoster
          filename={`birthcolor-${color.id}.png`}
          shareText={shareText}
        >
        <div
          className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-lg"
          style={{
            background: `linear-gradient(168deg, ${deep} 0%, ${base} 100%)`,
          }}
        >
          {cast && (
            <div className="absolute left-1/2 top-[38%] w-[42%] -translate-x-1/2 -translate-y-1/2">
              <div className="float-slow">
                <AnimalGlyph
                  animal={cast.animal}
                  fill={figureColorOn(color.hex, color.hex)}
                  className="w-full"
                />
              </div>
            </div>
          )}
          <GrainOverlay opacity={0.45} />
          <div className="absolute inset-0 flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div
                className="text-xs font-light leading-relaxed"
                style={{ color: posterText, letterSpacing: "0.3em" }}
              >
                撞色
              </div>
              <div
                className="text-right text-[11px] font-normal leading-[1.8]"
                style={{ color: posterTextDim, letterSpacing: "0.08em" }}
              >
                NO. {color.id}
                {cast && (
                  <>
                    <br />
                    FIG : {cast.animalZh}
                  </>
                )}
              </div>
            </div>
            <div className="flex-1" />
            <div
              className="text-3xl font-extralight"
              style={{ color: posterText, letterSpacing: "0.1em" }}
            >
              {dateLabelShort(color.month, color.day)}
            </div>
            <div
              className="mt-2 text-lg font-light"
              style={{ color: posterText, letterSpacing: "0.15em" }}
            >
              {color.colorNameZh ?? color.colorNameJa}
            </div>
            <div
              className="mt-1 text-[11px] font-light"
              style={{ color: posterTextDim, letterSpacing: "0.12em" }}
            >
              {color.colorNameJa}
              {color.colorNameEn && ` · ${color.colorNameEn.toUpperCase()}`} ·{" "}
              {color.hex}
            </div>
            {cast && (
              <div
                className="mt-4 border-t pt-3 text-[13px] font-light"
                style={{ color: posterText, borderColor: posterTextDim }}
              >
                {cast.energyTitle}
              </div>
            )}
            <div
              className="mt-2 text-[10px] font-light"
              style={{ color: posterTextDim, letterSpacing: "0.14em" }}
            >
              撞色 · birthcolor-mirror.vercel.app
            </div>
          </div>
        </div>
        </ShareablePoster>

        {cast && (
          <section
            className="reveal rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            style={{ animationDelay: "0.12s" }}
          >
            <div className="mb-1 text-[10px] font-light tracking-[0.35em] text-white/35">
              ENERGY PROFILE
            </div>
            <h2 className="mb-3 text-[15px] font-normal tracking-wide text-white/90">
              {cast.energyTitle}
            </h2>
            <p className="mb-4 text-[14px] font-light leading-[1.95] text-white/75">
              {cast.energyDesc}
            </p>
            <dl className="space-y-3">
              {profileRows.map(([k, v]) => (
                <div key={k}>
                  <dt className="mb-0.5 text-[11px] tracking-[0.2em] text-white/40">
                    {k}
                  </dt>
                  <dd className="text-[14px] font-light leading-relaxed text-white/80">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className="reveal" style={{ animationDelay: "0.2s" }}>
          <ColorCard color={color} />
        </div>

        <footer
          className="reveal pb-6 pt-2 text-center text-[11px] font-light leading-relaxed text-white/30"
          style={{ animationDelay: "0.28s" }}
        >
          {DISCLAIMER}
          <div className="mt-5">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-6 py-2 text-[12px] tracking-widest text-white/60 transition hover:border-white/50 hover:text-white/90"
            >
              生成我和 TA 的关系配色 →
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
