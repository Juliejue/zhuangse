const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

/** 胶片颗粒覆盖层，铺在任意 relative 容器最上层 */
export function GrainOverlay({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      data-export-ignore="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ opacity, backgroundImage: `url("${NOISE_URI}")` }}
    />
  );
}
