/**
 * 页脚三件套（作战手册通用铁律）：作者一句话 + 主页链接 + 账号名。
 * ACCOUNT / HOMEPAGE 待珏确认后改这里一处即可。
 */
const AUTHOR_LINE = "Jue，把向内看做成可以用的工具";
const ACCOUNT = "小红书 @紫海盐"; // 待确认：用紫海盐还是爱吃温泉蛋
const HOMEPAGE: string | null = null; // 个人主页上线后填 URL

export function SiteFooter() {
  return (
    <footer className="relative px-6 pb-10 pt-2 text-center text-[11px] font-light leading-[2] tracking-wider text-white/50">
      <p>
        {AUTHOR_LINE}
        <span className="mx-2 opacity-50">·</span>
        {HOMEPAGE ? (
          <a
            href={HOMEPAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/30 underline-offset-2 hover:text-white/70"
          >
            个人主页
          </a>
        ) : null}
        {HOMEPAGE && <span className="mx-2 opacity-50">·</span>}
        {ACCOUNT}
      </p>
      <p className="text-white/35">
        我还做了一个读歌单的，在做了，关注不错过。
      </p>
    </footer>
  );
}
