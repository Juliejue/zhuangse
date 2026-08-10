import { AnimalGlyph } from "@/components/AnimalFigure";
import { GrainOverlay } from "@/components/GrainOverlay";
import { PairPoster } from "@/components/PairPoster";
import { ShareablePoster } from "@/components/ShareablePoster";
import { ARCHETYPES } from "@/content/archetypes";
import { getBirthdayColor } from "@/lib/birthday";
import { analyzePair } from "@/lib/compatibility";
import { fieldGradient, figureColorOn } from "@/lib/colorMath";

/**
 * 宣传长图页（不在导航里，仅 /promo 直达）。
 * 5 页 9:16 竖版，逐页导出 1080×1920 PNG，拼起来就是一条 H5 式长图。
 */

const WINE = "#b33e5c";
const ASAGI = "#00a3af";

function Slide({
  index,
  children,
  background,
}: {
  index: number;
  children: React.ReactNode;
  background?: React.ReactNode;
}) {
  // 有双色底时，右上角页码落在浅色域上，用深玫瑰色
  const pageNumColor = background ? "#7a3450" : "rgba(255,255,255,0.45)";
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-[#1b1220]">
      {background}
      <GrainOverlay opacity={0.4} />
      <div className="absolute inset-0 flex flex-col p-8">
        <div className="flex items-start justify-between text-[11px] font-light tracking-[0.25em]">
          <span className="text-white/45">撞色</span>
          <span style={{ color: pageNumColor }}>0{index} / 05</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function SplitBg() {
  const [wineDeep, wineBase] = fieldGradient(WINE);
  const [asagiDeep, asagiBase] = fieldGradient(ASAGI);
  return (
    <svg
      viewBox="0 0 360 640"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="pw" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={wineDeep} />
          <stop offset="1" stopColor={wineBase} />
        </linearGradient>
        <linearGradient id="ps" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={asagiDeep} />
          <stop offset="1" stopColor={asagiBase} />
        </linearGradient>
        <filter id="pseam" x="-80%" y="-20%" width="260%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="360" height="640" fill="url(#pw)" />
      <polygon points="290,0 360,0 360,640 268,640" fill="url(#ps)" />
      <line
        x1="290"
        y1="0"
        x2="268"
        y2="640"
        stroke="#74cbd2"
        strokeWidth="34"
        opacity="0.5"
        filter="url(#pseam)"
      />
    </svg>
  );
}

export default function PromoPage() {
  const self = getBirthdayColor("0325")!;
  const target = getBirthdayColor("0122")!;
  const analysis = analyzePair(self, target, "crush", "");

  const animals = Object.values(ARCHETYPES);

  return (
    <main className="relative flex flex-1 flex-col items-center px-5 py-10">
      <div className="pointer-events-none fixed inset-0">
        <GrainOverlay opacity={0.25} />
      </div>
      <div className="relative w-full max-w-md space-y-8">
        <p className="text-center text-[12px] font-light tracking-widest text-white/40">
          宣传长图 · 每页可单独保存 · 拼起来是一条
        </p>

        {/* 01 封面 */}
        <ShareablePoster filename="zhuangse-promo-01.png" shareText="撞色｜生日色关系小游戏">
          <Slide index={1} background={<SplitBg />}>
            <div className="flex-1" />
            <div className="float-slow mb-6 flex items-end gap-10">
              <AnimalGlyph animal="fox" fill={figureColorOn(WINE, WINE)} className="w-24" />
              <AnimalGlyph
                animal="crane"
                fill={figureColorOn(WINE, ASAGI)}
                className="w-24"
              />
            </div>
            <h2
              className="text-6xl font-extralight tracking-[0.2em]"
              style={{ color: "rgba(255,252,250,0.95)" }}
            >
              撞色
            </h2>
            <div className="mt-3 text-[14px] font-light tracking-[0.35em] text-white/60">
              生日色关系小游戏
            </div>
            <p className="mt-6 text-[15px] font-light leading-[2.1] text-white/80">
              输入你和 TA 的生日，
              <br />
              看你们撞出什么颜色。
            </p>
          </Slide>
        </ShareablePoster>

        {/* 02 理念 */}
        <ShareablePoster filename="zhuangse-promo-02.png" shareText="不是测你们配不配">
          <Slide index={2}>
            <div className="flex-1" />
            <p className="text-[26px] font-extralight leading-[1.9] text-white/90">
              不是测你们配不配。
            </p>
            <p className="mt-4 text-[17px] font-light leading-[2.1] text-white/70">
              是看这段心动照见了你什么，
              <br />
              以及你适合被什么样的能量接住。
            </p>
            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: WINE }}
                />
                <span className="text-[15px] font-light text-white/85">
                  心动型，点燃你的人
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full border border-white/40"
                  style={{ background: "#006069" }}
                />
                <span className="text-[15px] font-light text-white/85">
                  承接型，接住你的人
                </span>
              </div>
            </div>
            <p className="mt-10 text-[14px] font-light leading-[2] text-white/50">
              很多人分不清这两种人。
              <br />
              这个小游戏帮你分清。
            </p>
            <div className="flex-1" />
          </Slide>
        </ShareablePoster>

        {/* 03 玩法 + 真实结果卡 */}
        <ShareablePoster filename="zhuangse-promo-03.png" shareText="三步玩法">
          <Slide index={3}>
            <div className="mt-8 space-y-2 text-[15px] font-light leading-[2] text-white/80">
              <p>
                <span className="mr-3 text-white/40">01</span>选你和 TA 的生日
              </p>
              <p>
                <span className="mr-3 text-white/40">02</span>生成你们的关系配色
              </p>
              <p>
                <span className="mr-3 text-white/40">03</span>保存一张只属于你们的卡
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center">
              {/* 海报按固定宽渲染保证内部排版，再整体缩放放进页里；外层高度对齐视觉高度 */}
              <div style={{ height: 336 * 1.25 * 0.66 }} className="overflow-visible">
                <div
                  style={{
                    width: 336,
                    transform: "scale(0.66) translateX(-50%)",
                    transformOrigin: "top left",
                    marginLeft: "50%",
                  }}
                >
                  <PairPoster self={self} target={target} analysis={analysis} />
                </div>
              </div>
            </div>
            <p className="text-center text-[12px] font-light tracking-wider text-white/45">
              每一对生日，都有一张不一样的卡
            </p>
          </Slide>
        </ShareablePoster>

        {/* 04 你会得到 */}
        <ShareablePoster filename="zhuangse-promo-04.png" shareText="七种能量原型">
          <Slide index={4}>
            <div className="mt-10">
              <p className="text-[22px] font-extralight leading-relaxed text-white/90">
                366 天官方生日色
              </p>
              <p className="mt-1 text-[13px] font-light tracking-wider text-white/50">
                色彩事实来自 birthday-color.cafein.jp
              </p>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-y-7">
              {animals.map((a) => (
                <div key={a.key} className="flex flex-col items-center justify-end gap-2.5">
                  <AnimalGlyph
                    animal={a.animal}
                    fill="rgba(255,252,250,0.85)"
                    className="h-11 w-auto"
                  />
                  <span className="text-[11px] font-light tracking-widest text-white/55">
                    {a.animalZh}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] font-light tracking-wider text-white/50">
              七种能量原型，你是其中一种
            </p>
            <div className="flex-1" />
            <blockquote
              className="border-l pl-4 text-[15px] font-light leading-[2.1] text-white/85"
              style={{
                borderColor: WINE,
                fontFamily: "'Songti SC', 'Noto Serif SC', serif",
              }}
            >
              不要把自己稀释成粉红色，
              <br />
              只为了不压弯一朵花。
            </blockquote>
            <p className="mt-3 text-[12px] font-light text-white/40">
              每张卡都会给你一句这样的话
            </p>
          </Slide>
        </ShareablePoster>

        {/* 05 尾页 */}
        <ShareablePoster filename="zhuangse-promo-05.png" shareText="现在就去撞一下">
          <Slide index={5} background={<SplitBg />}>
            <div className="flex-1" />
            <h2
              className="text-5xl font-extralight tracking-[0.2em]"
              style={{ color: "rgba(255,252,250,0.95)" }}
            >
              撞色
            </h2>
            <p className="mt-6 text-[16px] font-light leading-[2.1] text-white/85">
              现在就去撞一下。
            </p>
            <div className="mt-8 self-start rounded-xl border border-white/25 px-5 py-3.5">
              <span className="text-[15px] font-light tracking-[0.08em] text-white/95">
                birthcolor-mirror.vercel.app
              </span>
            </div>
            <p className="mt-6 max-w-[70%] text-[12px] font-light tracking-wider text-white/55">
              免费 · 无广告 · 不收集任何数据
            </p>
            <p className="mt-8 max-w-[70%] text-[11px] font-light leading-relaxed text-white/40">
              生日色事实来自 birthday-color.cafein.jp
              <br />
              关系解读由产品生成，仅供自我观察与娱乐
            </p>
          </Slide>
        </ShareablePoster>
      </div>
    </main>
  );
}
