import { BirthdayInput } from "@/components/BirthdayInput";
import { GrainOverlay } from "@/components/GrainOverlay";
import { DISCLAIMER } from "@/content/casting";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center px-5 py-12">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 18%, rgba(179,62,92,0.28), transparent 52%), radial-gradient(circle at 80% 78%, rgba(0,96,105,0.3), transparent 50%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0">
        <GrainOverlay opacity={0.3} />
      </div>

      <div className="relative w-full max-w-md">
        <header className="reveal mb-10 mt-6">
          <div className="mb-6 text-[11px] font-light tracking-[0.45em] text-white/40">
            撞色 · 366 DAYS
          </div>
          <h1 className="text-5xl font-extralight tracking-[0.12em] text-white/95">
            撞色
          </h1>
          <div className="mt-2 text-[13px] font-light tracking-[0.3em] text-white/45">
            生日色关系小游戏
          </div>
          <p className="mt-5 text-[15px] font-light leading-[2] text-white/70">
            输入你和 TA 的生日，看你们撞出什么颜色。
            <br />
            不是看你们配不配，
            <br />
            而是看这段心动照见了你什么。
          </p>
        </header>

        <section
          className="reveal rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm"
          style={{ animationDelay: "0.15s" }}
        >
          <BirthdayInput />
        </section>

        <footer
          className="reveal mt-8 pb-6 text-center text-[11px] font-light leading-relaxed text-white/30"
          style={{ animationDelay: "0.3s" }}
        >
          {DISCLAIMER}
        </footer>
      </div>
    </main>
  );
}
