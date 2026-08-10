import { toBlob } from "html-to-image";

/**
 * 把一个 DOM 节点导出成 PNG 下载。
 * 默认按 1080 宽输出（海报是 4:5，即 1080×1350，小红书竖版）。
 */
export async function exportNodeToPng(
  node: HTMLElement,
  filename: string,
  targetWidth = 1080
): Promise<void> {
  const scale = targetWidth / node.offsetWidth;
  const blob = await toBlob(node, {
    pixelRatio: scale,
    cacheBust: true,
    skipFonts: false,
    // html-to-image 会把纹理 SVG 内部的 url(#n) 误当成网络资源。
    // 页面仍保留颗粒效果；导出时跳过覆盖层，避免微信/线上环境出现 404。
    filter: (child) =>
      !(child instanceof HTMLElement && child.dataset.exportIgnore === "true"),
  });

  if (!blob) throw new Error("海报图片生成失败");

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = objectUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
}
