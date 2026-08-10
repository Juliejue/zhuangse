import type { ArchetypeKey } from "./archetypes";
import type { RelationTypeKey } from "@/lib/types";

/**
 * 组合式关系文案（产品解读，仅供自我观察与娱乐）。
 * 关系类型由两人的能量原型配对决定；文案把 TA 的具体颜色名、双方能量织进段落，
 * 所以同一关系类型、不同的人，读到的也不一样。温泉蛋语感，不用破折号。
 */

// TA 在被吸引者眼里的样子（按 TA 的原型）
const APPEAR: Record<ArchetypeKey, string> = {
  intense: "浓，有存在感，走进来空气都会变一下",
  soft: "轻，干净，好像一碰就会怕",
  steady: "稳，话不多，却让人莫名踏实",
  expressive: "亮，藏不住，站在哪都会被看见",
  aesthetic: "讲究，对美很敏感，眼睛很挑",
  mystic: "深，安静，像揣着说不完的心事",
  grounded: "实在，不玩虚的，让人安心",
};

// 你的能量（按你的原型）
const SELF: Record<ArchetypeKey, string> = {
  intense: "你的浓和直觉",
  soft: "你的轻和敏感",
  steady: "你的稳和深",
  expressive: "你的表达欲",
  aesthetic: "你的审美和讲究",
  mystic: "你的深和沉默",
  grounded: "你的踏实",
};

// 关系类型矩阵：行=你的原型，列=TA 的原型。永远命中，不落兜底。
const MATRIX: Record<ArchetypeKey, Record<ArchetypeKey, RelationTypeKey>> = {
  intense: { intense: "strong", soft: "protective", steady: "held", expressive: "strong", aesthetic: "aesthetic", mystic: "spiritual", grounded: "grounding" },
  soft: { intense: "flame", soft: "fragile", steady: "held", expressive: "flame", aesthetic: "aesthetic", mystic: "spiritual", grounded: "held" },
  steady: { intense: "flame", soft: "protective", steady: "kindred", expressive: "flame", aesthetic: "aesthetic", mystic: "spiritual", grounded: "support" },
  expressive: { intense: "strong", soft: "protective", steady: "held", expressive: "strong", aesthetic: "aesthetic", mystic: "spiritual", grounded: "grounding" },
  aesthetic: { intense: "aesthetic", soft: "protective", steady: "held", expressive: "aesthetic", aesthetic: "aesthetic", mystic: "spiritual", grounded: "grounding" },
  mystic: { intense: "spiritual", soft: "spiritual", steady: "held", expressive: "spiritual", aesthetic: "spiritual", mystic: "spiritual", grounded: "grounding" },
  grounded: { intense: "grounding", soft: "protective", steady: "support", expressive: "grounding", aesthetic: "aesthetic", mystic: "spiritual", grounded: "support" },
};

export function pickRelationByArchetype(
  self: ArchetypeKey,
  target: ArchetypeKey
): RelationTypeKey {
  return MATRIX[self][target];
}

interface Ctx {
  T: string; // TA 的颜色名
  self: ArchetypeKey;
  target: ArchetypeKey;
}

type Block = (c: Ctx) => string;

const attraction: Record<RelationTypeKey, Block> = {
  protective: (c) =>
    `${c.T}身上有种${APPEAR[c.target]}的感觉，你大概是先心软的那个。你会想放轻脚步，小心靠近，想告诉 TA 别怕。这种心动里有很深的温柔，也有一点你自己没发现的用力。`,
  held: (c) =>
    `${c.T}是那种${APPEAR[c.target]}的人。TA 不急着评价，能听你把话说完。你会发现${SELF[c.self]}，在 TA 面前是慢慢松下来的。`,
  flame: (c) =>
    `${c.T}身上有种${APPEAR[c.target]}的浓度，你有点不敢直视，又想靠近取暖。TA 点燃的，是你心里那部分一直没敢烧起来的东西。`,
  strong: (c) =>
    `你们是两种都很浓的颜色。${c.T}的那股${APPEAR[c.target]}，和${SELF[c.self]}，谁也不肯给谁让位。火花是真的。`,
  aesthetic: (c) =>
    `你们的吸引大概发生在某个具体的瞬间：${c.T}说了一句话，或者递来一样东西，你心里咯噔一下，想，这个人懂。`,
  spiritual: (c) =>
    `你和${c.T}的连接发生在很深的地方。聊到某个够深的地方，你才觉得终于喘上一口气。这种被懂，接近一种安静的震动。`,
  grounding: (c) =>
    `${c.T}是那种${APPEAR[c.target]}的人。TA 不一定让你上头，但和 TA 在一起，事情会真的做完。`,
  fragile: (c) =>
    `${c.T}和你一样轻，一样容易被打动。你想伸手，又怕碰坏。`,
  support: (c) =>
    `${c.T}像一种不抢戏的颜色，放在你旁边，你的浓反而更好看了。日子被安排得有质感，情绪也有地方落。`,
  kindred: (c) =>
    `你和${c.T}是很接近的颜色，很多东西不用解释，看一眼就知道。这种省力的舒服，很多关系求不来。`,
};

const risk: Record<RelationTypeKey, Block> = {
  protective: (c) =>
    `要留意的是，为了不吓到 TA，你可能会把${SELF[c.self]}一点点收起来。刚开始只是收锋利，后来连认真也一起收了。`,
  held: () =>
    `唯一的风险是你可能会误判它。习惯了心脏被揪住的人，会把这种平静错当成不够心动。给它一点时间。`,
  flame: () =>
    `要留意你是不是在 TA 面前越来越小声。被强光照久了，人容易忘记自己也有光。`,
  strong: () =>
    `两个都想发光的人，容易抢同一盏灯。你们可以一起亮，但卧室里要留一盏小灯。`,
  aesthetic: () =>
    `两个都爱美、爱做梦的人在一起，屋子会很好看，米有时候会忘记买。看你们中间有没有人愿意管一管现实。`,
  spiritual: () => `精神世界住久了，记得偶尔一起下楼吃饭。`,
  grounding: (c) =>
    `别把 TA 的稳当成理所当然，也别让${SELF[c.self]}，变成 TA 一个人要扛的负担。`,
  fragile: () =>
    `两个都软的人，容易在同一个地方一起碎，最后谁都没被接住。`,
  support: () => `别把不抢戏误读成没有自己。托底的人也有自己的重量，值得被看见。`,
  kindred: () =>
    `太像的两个人，容易在同一个地方一起卡住。你们的盲区，也是重叠的。`,
};

const userPattern: Record<RelationTypeKey, Block> = {
  protective: () =>
    `这段吸引照见的，也许是你习惯用被需要来确认自己的位置。心疼一个人，和适合一个人，摸起来很像。`,
  held: () =>
    `如果你在 TA 面前好像不用表演了，这个感觉本身，就是答案的一部分。`,
  flame: () => `你想借 TA 的火，其实是想点燃你自己。`,
  strong: () => `你在找一个不需要你收敛的人。这个需求本身没有错。`,
  aesthetic: () => `你在找的不只是恋人，是一个能一起看世界的同类。`,
  spiritual: () => `你要的理解是深水区的，浅的热闹满足不了你。`,
  grounding: () => `你在找一个能让你落地的人。落地不是妥协，是让想法活下来。`,
  fragile: () => `留意一下，你是不是把 TA 需要我，悄悄当成了 TA 适合我。`,
  support: () => `你适合的，可能不是另一团火，是一张能放东西的桌面。`,
  kindred: () =>
    `在 TA 身上，你大概看到了自己。喜欢这个镜像，也是一种和自己和解的方式。`,
};

export function composeBlocks(
  key: RelationTypeKey,
  ctx: Ctx
): { attraction: string; risk: string; userPattern: string } {
  return {
    attraction: attraction[key](ctx),
    risk: risk[key](ctx),
    userPattern: userPattern[key](ctx),
  };
}
