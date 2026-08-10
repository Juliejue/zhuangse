import type { AnimalKey } from "@/content/casting";

interface AnimalShape {
  w: number;
  h: number;
  paths: Array<{ d: string; stroke?: boolean; strokeWidth?: number }>;
}

/**
 * 动物剪影路径库（初版手绘草稿，阶段四逐只精修）。
 * 全部为扁平剪影，不带五官，贴合 ethereal 参考图的气质。
 */
export const ANIMAL_SHAPES: Record<AnimalKey, AnimalShape> = {
  fox: {
    w: 92,
    h: 146,
    paths: [
      {
        d: "M4,30 C10,22 16,18 22,16 L26,2 C27,0 29,0 30,2 L33,14 C36,12 40,12 43,14 L46,2 C47,0 49,0 50,2 L52,16 C60,24 66,34 68,44 C76,58 84,78 86,96 C90,116 84,132 68,138 C50,144 26,144 10,138 C2,136 0,128 5,124 C9,121 15,123 17,128 C18,114 16,84 12,64 C8,50 4,38 4,30 Z",
      },
    ],
  },
  butterfly: {
    w: 116,
    h: 80,
    paths: [
      { d: "M55,32 C40,12 16,5 8,20 C2,33 20,48 52,37 Z" },
      { d: "M61,32 C76,10 100,3 108,18 C114,31 96,48 64,37 Z" },
      { d: "M53,41 C39,52 31,67 42,73 C51,77 57,60 57,43 Z" },
      { d: "M63,41 C77,52 85,67 74,73 C65,77 59,60 59,43 Z" },
      { d: "M58,25 a3.2,13 0 1,0 0.01,26 a3.2,13 0 1,0 -0.01,-26 Z" },
    ],
  },
  whale: {
    w: 162,
    h: 86,
    paths: [
      {
        d: "M12,46 C12,30 36,22 68,24 C104,26 128,32 142,42 C149,36 157,32 161,34 C157,41 156,48 160,55 C152,58 145,54 139,47 C126,58 102,64 68,64 C36,64 12,60 12,46 Z",
      },
      { d: "M58,62 C54,74 44,80 38,78 C45,70 51,64 55,60 Z" },
      { d: "M15,50 C24,53 34,53 42,50", stroke: true, strokeWidth: 2 },
    ],
  },
  crane: {
    w: 120,
    h: 160,
    paths: [
      {
        d: "M46,84 C50,66 68,58 84,62 C100,66 106,80 102,96 C98,112 82,120 64,116 C50,113 43,98 46,84 Z",
      },
      {
        d: "M50,80 C42,64 38,48 36,34 C35,24 32,16 26,12 C24,10 24,8 27,8 C33,8 39,12 42,20 C46,32 50,48 56,62 Z",
      },
      { d: "M26,12 L12,16 L26,17 Z" },
      { d: "M100,94 C108,92 114,96 118,104 C110,104 104,102 100,100 Z" },
      { d: "M64,116 L60,150", stroke: true, strokeWidth: 2.5 },
      { d: "M78,114 L76,150", stroke: true, strokeWidth: 2.5 },
    ],
  },
  moth: {
    // 停歇姿态的三角翼蛾（delta 形）+ 羽状触角，与蝶的四瓣圆翅明确区分
    w: 124,
    h: 92,
    paths: [
      { d: "M60,26 C48,30 26,48 14,72 C10,80 16,86 24,80 C38,68 52,54 60,48 Z" },
      { d: "M64,26 C76,30 98,48 110,72 C114,80 108,86 100,80 C86,68 72,54 64,48 Z" },
      {
        d: "M62,20 C68,22 70,36 68,54 C66,70 64,80 62,84 C60,80 58,70 56,54 C54,36 56,22 62,20 Z",
      },
      { d: "M58,22 C52,12 44,6 36,7", stroke: true, strokeWidth: 2.5 },
      { d: "M66,22 C72,12 80,6 88,7", stroke: true, strokeWidth: 2.5 },
    ],
  },
  cat: {
    w: 96,
    h: 134,
    paths: [
      {
        d: "M38,66 C22,72 20,102 27,120 C31,128 63,128 67,120 C74,102 72,72 56,66 Z",
      },
      { d: "M47,30 a20,20 0 1,0 0.01,0 Z" },
      { d: "M30,36 L25,12 L45,30 Z" },
      { d: "M64,36 L69,12 L49,30 Z" },
      {
        d: "M66,118 C84,120 90,104 82,94 C77,88 71,92 74,99 C77,106 70,110 62,108 Z",
      },
    ],
  },
  deer: {
    w: 132,
    h: 128,
    paths: [
      {
        d: "M24,58 C28,49 44,46 62,47 C80,48 88,51 90,59 C92,69 82,74 60,74 C40,74 20,69 24,60 Z",
      },
      {
        d: "M82,52 C90,45 97,40 104,37 C109,35 114,35 118,38 C121,40 120,45 115,46 C112,46 109,45 106,46 C99,50 93,55 88,58 Z",
      },
      { d: "M116,37 C123,35 127,38 126,43 C125,47 119,47 114,44 Z" },
      { d: "M104,38 C101,29 103,23 107,26 C109,28 108,35 105,39 Z" },
      { d: "M111,37 C115,29 120,27 121,32 C121,37 116,38 113,40 Z" },
      { d: "M25,56 C21,57 20,64 23,66 C25,65 26,59 28,58 Z" },
      { d: "M82,72 L81,122", stroke: true, strokeWidth: 4 },
      { d: "M72,73 L71,122", stroke: true, strokeWidth: 4 },
      { d: "M40,72 L38,122", stroke: true, strokeWidth: 4 },
      { d: "M50,73 L49,122", stroke: true, strokeWidth: 4 },
    ],
  },
};

/** 嵌进海报 SVG 里的动物 <g>，按目标宽度缩放，锚点为图形中心 */
export function AnimalGroup({
  animal,
  fill,
  cx,
  cy,
  width,
  className,
  opacity = 1,
}: {
  animal: AnimalKey;
  fill: string;
  cx: number;
  cy: number;
  width: number;
  className?: string;
  opacity?: number;
}) {
  const shape = ANIMAL_SHAPES[animal];
  const s = width / shape.w;
  const tx = cx - (shape.w * s) / 2;
  const ty = cy - (shape.h * s) / 2;
  // 定位 transform 放外层属性，浮动动画放内层 class，
  // 避免 CSS transform 覆盖 SVG 属性 transform
  return (
    <g transform={`translate(${tx},${ty}) scale(${s})`} opacity={opacity}>
      <g className={className}>
        {shape.paths.map((p, i) =>
          p.stroke ? (
            <path
              key={i}
              d={p.d}
              fill="none"
              stroke={fill}
              strokeWidth={p.strokeWidth ?? 2}
              strokeLinecap="round"
            />
          ) : (
            <path key={i} d={p.d} fill={fill} />
          )
        )}
      </g>
    </g>
  );
}

/** 独立使用的动物剪影 SVG（单人页） */
export function AnimalGlyph({
  animal,
  fill,
  className,
}: {
  animal: AnimalKey;
  fill: string;
  className?: string;
}) {
  const shape = ANIMAL_SHAPES[animal];
  return (
    <svg
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      className={className}
      aria-hidden
    >
      {shape.paths.map((p, i) =>
        p.stroke ? (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={fill}
            strokeWidth={p.strokeWidth ?? 2}
            strokeLinecap="round"
          />
        ) : (
          <path key={i} d={p.d} fill={fill} />
        )
      )}
    </svg>
  );
}
