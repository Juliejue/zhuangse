import Link from "next/link";
import { ColorCard } from "@/components/ColorCard";
import { GrainOverlay } from "@/components/GrainOverlay";
import { PairPoster } from "@/components/PairPoster";
import { ShareablePoster } from "@/components/ShareablePoster";
import { getBirthdayColor } from "@/lib/birthday";
import { analyzePair } from "@/lib/compatibility";
import type { RelationshipStatus } from "@/lib/types";

const BAND_WIDTH: Record<string, string> = {
  低: "18%",
  中低: "34%",
  中: "52%",
  中高: "72%",
  高: "90%",
};

function Section({
  label,
  title,
  children,
  delay = 0,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section
      className="reveal rounded-2xl border border-white/10 bg-white/[0.035] p-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-1 text-[10px] font-light tracking-[0.35em] text-white/35">
        {label}
      </div>
      <h2 className="mb-3 text-[15px] font-normal tracking-wide text-white/90">
        {title}
      </h2>
      <div className="text-[14px] font-light leading-[1.95] text-white/75">
        {children}
      </div>
    </section>
  );
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const selfId = typeof params.self === "string" ? params.self : "";
  const targetId = typeof params.target === "string" ? params.target : "";
  const status = (
    typeof params.status === "string" ? params.status : "crush"
  ) as RelationshipStatus;
  const userText = typeof params.text === "string" ? params.text : "";

  const self = getBirthdayColor(selfId);
  const target = getBirthdayColor(targetId);

  if (!self || !target) {
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

  const analysis = analyzePair(self, target, status, userText);
  const holdingRank = ["低", "中低", "中", "中高", "高"].indexOf(
    analysis.holdingBand
  );
  const heartbeatRank = ["低", "中低", "中", "中高", "高"].indexOf(
    analysis.heartbeatBand
  );
  const heartVsHold =
    holdingRank >= 3
      ? heartbeatRank >= 3
        ? "TA 既点燃你，也接得住你。这种组合不常见，值得认真对待。"
        : "TA 更接近你的承接型。也许不是最让你上头的人，但可能是让你身体松开的人。"
      : "TA 更接近你的心动型。点燃你的部分是真的，能不能接住你，需要再观察。";

  const selfName = self.colorNameZh ?? self.colorNameJa;
  const targetName = target.colorNameZh ?? target.colorNameJa;
  const shareText = [
    `${analysis.relationshipTitle}｜${analysis.relationshipType}`,
    `你 ${self.month}.${self.day} ${selfName} × TA ${target.month}.${target.day} ${targetName}`,
    `心动 ${analysis.heartbeatBand} · 承接 ${analysis.holdingBand}`,
    "",
    `「${analysis.quote}」`,
    "",
    analysis.disclaimer,
  ].join("\n");

  return (
    <main className="relative flex flex-1 flex-col items-center px-5 py-10">
      <div className="pointer-events-none fixed inset-0">
        <GrainOverlay opacity={0.25} />
      </div>
      <div className="relative w-full max-w-md space-y-4">
        <div className="reveal">
          <ShareablePoster
            filename={`birthcolor-${self.id}x${target.id}.png`}
            shareText={shareText}
          >
            <PairPoster self={self} target={target} analysis={analysis} />
          </ShareablePoster>
        </div>

        <Section label="RELATION" title={analysis.relationshipType} delay={0.1}>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[12px] text-white/60">
              {analysis.tagline}
            </span>
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[12px] text-white/60">
              色相差 {analysis.colorRelation.hueDifference}°
            </span>
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[12px] text-white/60">
              明度差 {analysis.colorRelation.lightnessDifference}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {(
              [
                ["心动指数", analysis.heartbeatBand],
                ["承接指数", analysis.holdingBand],
              ] as const
            ).map(([name, band]) => (
              <div key={name}>
                <div className="mb-1.5 flex justify-between text-[12px] text-white/55">
                  <span>{name}</span>
                  <span className="text-white/85">{band}</span>
                </div>
                <div className="h-px w-full bg-white/10">
                  <div
                    className="h-px bg-white/70"
                    style={{ width: BAND_WIDTH[band] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="ATTRACTION" title="为什么会心动" delay={0.16}>
          <p>{analysis.attraction}</p>
        </Section>

        <Section label="HEARTBEAT / HOLDING" title="心动型，还是承接型" delay={0.22}>
          <p className="mb-2 text-white/90">{heartVsHold}</p>
          <p>{analysis.risk}</p>
        </Section>

        <Section label="MIRROR" title="这段吸引照见了你什么" delay={0.28}>
          <p>{analysis.userPattern}</p>
        </Section>

        <Section
          label="HOLDING ENERGY"
          title={
            analysis.holdingAlreadyMet
              ? "你需要的那种能量，TA 身上就有"
              : "你真正适合被什么样的能量接住"
          }
          delay={0.34}
        >
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-[15px] text-white/90">
              {analysis.holdingFamily.colorFamilyName}
            </span>
            {analysis.holdingFamily.sampleColorNames.map((n) => (
              <span
                key={n}
                className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] tracking-wider text-white/55"
              >
                {n}
              </span>
            ))}
          </div>
          {analysis.holdingAlreadyMet && (
            <p className="mb-3 text-white/90">
              这段关系的承接感是够的。TA 大概率已经在用这种方式接住你。你不用再去别处找一种“更适合”的能量，把注意力放回你们本身就好。
            </p>
          )}
          <p className="mb-3">{analysis.holdingFamily.whyFitsUser}</p>
          <p className="mb-3">{analysis.holdingFamily.relationshipFeeling}</p>
          <div className="mb-1 text-[11px] tracking-[0.3em] text-white/35">
            {analysis.holdingAlreadyMet ? "可以留意 TA 身上有没有这些" : "现实中的信号"}
          </div>
          <ul className="mb-3 space-y-1">
            {analysis.holdingFamily.realLifeSignals.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-white/35">·</span>
                {s}
              </li>
            ))}
          </ul>
          {!analysis.holdingAlreadyMet && (
            <p className="text-white/55">
              容易误读的地方：{analysis.holdingFamily.commonMisread}
            </p>
          )}
        </Section>

        <Section label="TAKEAWAY" title="带走这一句" delay={0.4}>
          <p className="mb-4">{analysis.takeaway}</p>
          <blockquote
            className="border-l pl-4 text-[15px] leading-[2] text-white/90"
            style={{ borderColor: self.hex }}
          >
            {analysis.quote}
          </blockquote>
        </Section>

        <div className="reveal space-y-4" style={{ animationDelay: "0.46s" }}>
          <ColorCard color={self} label="你" />
          <ColorCard color={target} label="TA" />
        </div>

        <footer
          className="reveal pb-6 pt-2 text-center text-[11px] font-light leading-relaxed text-white/30"
          style={{ animationDelay: "0.5s" }}
        >
          {analysis.disclaimer}
          <div className="mt-5">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-6 py-2 text-[12px] tracking-widest text-white/60 transition hover:border-white/50 hover:text-white/90"
            >
              ← 再照一次
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
