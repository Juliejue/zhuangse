# BirthColor Mirror / BirthColor Chemistry

> 基于生日色事实的关系配色镜子  
> 不是问“你和谁最配”，而是看见：你适合被什么样的能量接住。

---

## 0. 文档用途

这份文档用于交给 Codex / Claude Code / 开发者，开发一个可运行的 MVP 网页产品。

产品暂定名：

- **BirthColor Mirror**：更偏“关系镜子”，适合最终产品名。
- **BirthColor Chemistry**：更偏“关系配色实验室”，适合功能模块名。

一句话定位：

> 基于 birthday-color.cafein.jp 的 366 日生日色官方事实，结合色彩心理学、情绪维度模型、关系心理学和叙事生成，帮助用户理解自己的情感能量、心动模式，以及自己适合被什么样的关系能量接住。

核心 slogan：

> **输入你和 TA 的生日，不是为了算你们配不配。  
> 而是看见：你为什么心动，以及你适合被什么样的能量接住。**

---

## 1. 产品核心洞察

### 1.1 普通生日色产品的问题

大多数生日色 / 星座 / 人格测试产品停留在两个层面：

1. **我是什么？**  
   例如：你的生日色是 Wine Red。

2. **我们配不配？**  
   例如：你和 TA 匹配度 82%。

但这类产品容易变得廉价，因为用户看完之后只得到一个结论，却没有获得一个可以迁移到现实关系里的识人框架。

### 1.2 本产品的独特之处

BirthColor Mirror 不鼓励用户按生日找对象。

它真正要做的是：

> **通过生日色提炼用户的情感能量画像，帮助用户理解自己适合被什么样的人、关系、气质与互动方式接住。**

生日色只是入口，不是终点。

真正的价值不是：

> 3月25日和7月30日最配。

而是：

> 3月25日 Wine Red 这种浓烈、直觉、有主角感的能量，不适合被迫变淡；它需要的是能承接浓度、给出稳定回声、既温柔又不逃的人。

### 1.3 产品要回答的核心问题

用户真正想知道的不是“哪个生日的人适合我”，而是：

- 我是什么样的情感能量？
- 我为什么总被某一种人吸引？
- 我在喜欢一个人时，会变成保护者、追逐者，还是被安放者？
- 我现在的心动是适合，还是只是心疼？
- 什么样的人会让我上头但不一定适合？
- 什么样的人能让我不用变淡，也能被稳定接住？
- 我不需要再为谁缩小自己的哪一部分？

### 1.4 核心产品表达

首页主文案可以是：

> **输入你和 TA 的生日，生成你们的关系配色。  
> 看见你为什么心动，也看见你适合被什么样的能量接住。**

更锋利一点的传播文案：

> **不是找一个生日。  
> 是找到一种能接住你的关系质地。**

更情绪向的结果页文案：

> **你不需要按生日找人，  
> 你需要知道自己不该再被什么样的爱消耗。**

---

## 2. 理论基础与产品边界

本产品不是“颜色决定命运”，也不是“AI 玄学配对”。

它的理论结构是：

> **官方生日色事实层 + 色彩心理隐喻层 + 情绪维度模型层 + 关系模式层 + 叙事生成层。**

### 2.1 官方生日色事实层 / Birthday Color Database

产品基础数据来自：

- birthday-color.cafein.jp
- URL 格式：`http://birthday-color.cafein.jp/html/MMDD.html`
- 例：`http://birthday-color.cafein.jp/html/0325.html`

birthday-color.cafein.jp 提供 366 日生日色查询。每个日期页通常包含：

- 日期
- 颜色名（日文 / 英文）
- HEX
- RGB
- HSB
- Lab
- CMYK
- 特徴
- 色言葉

例如 3月25日：

```json
{
  "id": "0325",
  "month": 3,
  "day": 25,
  "dateLabelJa": "3月25日",
  "colorNameJa": "ワインレッド",
  "colorNameEn": "Wine Red",
  "colorNameZh": "酒红色",
  "hex": "#b33e5c",
  "rgb": { "r": 179, "g": 62, "b": 92 },
  "hsb": { "h": 345, "s": 65, "b": 70 },
  "lab": { "l": 48.95, "a": 59.77, "b": 18.31 },
  "cmyk": { "c": 0, "m": 65, "y": 49, "k": 30 },
  "featureJa": "直観力と威厳で名を馳せる芸術家",
  "colorWordsJa": ["主役の風格", "個性", "自信"],
  "sourceUrl": "http://birthday-color.cafein.jp/html/0325.html"
}
```

#### 数据铁律

产品必须遵守：

- 不能自己发明某个日期的生日色。
- 不能自己改颜色名。
- 不能自己改 HEX / RGB / HSB / Lab / CMYK。
- 不能自己创造官方色言葉和特徴。
- 不能把产品生成的关系解读说成 birthday-color.cafein.jp 官方结论。
- 数据缺失时，不允许硬生成。

正确表达：

> 生日色事实来自 birthday-color.cafein.jp；以下关系解读由产品基于颜色、色言葉和你的描述生成，仅供自我观察与娱乐。

错误表达：

> 官网说你们最配。  
> 你们注定在一起。  
> 这个生日的人一定会逃避。  
> 这个颜色证明你有某种人格问题。

### 2.2 色彩心理学层 / Color Psychology as Metaphor

产品可以借鉴色彩心理学，但必须谨慎。

颜色确实会引发情绪联想，例如明亮色、深色、红色、蓝色、绿色在不同文化里常被关联到不同情绪。但颜色与心理的关系不是绝对的，会受到文化、语境、个人经验、屏幕显示、设计环境影响。

因此，本产品不把颜色当作人格诊断，而把它当作：

> **一种帮助用户理解自己情绪和关系模式的隐喻语言。**

产品可分析的颜色维度：

- 色相 Hue：偏红、偏蓝、偏绿、偏紫等。
- 明度 Lightness / Brightness：颜色是轻、亮、清透，还是暗、深、沉。
- 饱和度 Saturation：颜色是强烈、浓郁，还是灰、淡、克制。
- 冷暖 Warm / Cool：颜色给人的温度感。
- 对比度 Contrast：两种颜色并排时的视觉张力。
- Lab 距离：两种颜色在感知空间里的差异程度。

产品语言示例：

- 高饱和 + 低明度：浓烈、成熟、有重量。
- 低饱和 + 高明度：轻、柔、易碎、干净。
- 冷色 + 深色：稳定、边界、深水感。
- 中性色 + 低饱和：克制、托底、生活质感。
- 强冷暖对比：吸引力强，也可能张力高。

### 2.3 情绪维度模型层 / Affective Model

产品可以借鉴情绪维度模型，把情绪从“具体词”拆成几个基础维度。

典型模型是 Russell 的 Circumplex Model of Affect。它把情绪理解为两个核心轴：

- Valence：愉悦度，从不愉快到愉快。
- Arousal：唤醒度，从低唤醒到高唤醒。

在产品里，不需要学术化展示，但可以转译成用户能懂的语言：

- 情绪浓度：低 / 中 / 高
- 关系唤醒度：安心 / 微张力 / 上头 / 拉扯
- 靠近倾向：想保护 / 想追逐 / 想共建 / 想被安放
- 身体感：松弛 / 紧张 / 心疼 / 被点燃 / 被接住

这样可以避免只说“你们很配”，而是说：

> 这段关系对你的心动指数很高，因为 TA 激发了你的心疼和保护欲；但承接指数不一定高，因为对方可能无法稳定接住你的强烈感受。

### 2.4 关系心理学层 / Relationship Pattern

产品可以借鉴关系心理学与成人依恋理论里的概念，例如：

- 安全感
- 回避
- 焦虑
- 追逐
- 退缩
- 承接
- 边界
- 共建
- 情绪调节

但产品不能做临床判断，不能给用户或 TA 贴医学标签。

正确用法：

> TA 在这段关系里可能更像“容易后退的一方”；你可能更容易进入“读懂者 / 保护者”的位置。

错误用法：

> TA 是回避型依恋，所以你们没救。

产品核心不是诊断别人，而是帮助用户观察：

- 我在这个人面前更像自己，还是更想证明自己？
- 我是被安放，还是被激发保护欲？
- 我喜欢的是 TA 本人，还是“我可以拯救 / 安抚 / 引导 TA”的感觉？
- 这段关系让我变得更松弛，还是更紧绷？

### 2.5 叙事身份层 / Narrative Identity

这个产品最打动人的地方，不是算法，而是帮用户把自己的心事说清楚。

用户输入：

> 我很想保护他，但他说有点怕我。

产品不应该只回答：

> 你们匹配度 62%。

而应该翻译成：

> 你被激发的是保护欲型心动。你很容易把“他需要我”误认成“他适合我”。但你真正需要的，不是一个让你一直小心对待的人，而是温柔但不脆、细腻但不逃、被你打动也不被你吓跑的人。

这就是产品的灵魂：

> **把模糊的喜欢、心疼、拉扯和安全感，翻译成颜色、语言和可分享的卡片。**

---

## 3. 用户研究：从当前对话提炼的真实需求

### 3.1 用户问题路径

用户一路问的问题，其实已经构成了一个完整产品路径。

#### 阶段 1：看不懂日文

用户最初问题：

> 看不懂日文。

对应需求：

- 翻译生日色页面。
- 解释颜色名、色号、色言葉、特徴。
- 把日文信息转成中文可理解的人格描述。

产品功能：

- 单人生日色查询。
- 自动翻译与解释。

#### 阶段 2：我和哪些天比较配

用户问题：

> 3.25 和哪些天的比较配？

对应需求：

- 用户不只想知道自己是什么颜色。
- 用户开始关心“我的颜色适合什么颜色 / 什么人 / 什么能量”。

产品功能：

- 双人关系配色。
- 颜色相性分析。
- 适配颜色推荐。

#### 阶段 3：除却我问的这些呢

用户问题：

> 除却我问的这些捏。

对应需求：

- 用户不是只想测眼前几个人。
- 用户想从全量生日色里获得一个更大的关系地图。
- 用户想知道“现实里如果没有这些生日的人，我还能带走什么？”

产品功能：

- 推荐“承接型颜色谱系”，而不是只推荐日期。
- 输出“你适合的关系能量类型”。

#### 阶段 4：有什么我现在能 take away 的吗

用户问题：

> 有什么我现在能 take away 的吗？

对应需求：

这是产品关键转折。

用户真正想要的不是日期列表，而是可迁移的识人框架：

- 我该找什么样的人？
- 我该避开什么样的关系模式？
- 我以后怎么判断一个人是不是适合我？

产品功能：

- Takeaway 模块。
- “心动型 vs 承接型”模块。
- 现实识人建议。

#### 阶段 5：我之前喜欢的是 3.6，他说有点怕我

用户问题：

> 我之前喜欢的是 3.6，他确实会说有点怕我，我可伤心了。

对应痛点：

- 用户担心自己太强烈、太浓、太敏锐。
- 用户会因为对方“怕我”而怀疑自己是不是太多了。
- 用户喜欢柔软、干净、易碎的人，并且会进入保护者位置。

产品要做的不是让用户自责，而是帮她分辨：

- 对方怕你，不等于你可怕。
- 可能是你的情感浓度对 TA 来说太强，TA 接不住。
- 你不需要为了不吓到对方，把自己调淡。
- 真正适合你的人会被你打动，但不会被你吓跑。

产品功能：

- 关系风险分析。
- “你在这段关系里变成了谁”分析。
- “你不需要缩小的部分”模块。

#### 阶段 6：我只知道对 3.6 那种人的心动，适合的感觉是什么

用户问题：

> 我只知道对 3.6 那种人的心动是什么感觉……但是你说我适合的，那是种什么感觉？

对应核心需求：

用户熟悉“心疼型心动”，但不熟悉“被安放型适合”。

她知道：

- 心疼
- 保护
- 引导
- 看穿对方
- 告诉对方“我不会欺负你”

但她不知道：

- 被稳定接住是什么感觉
- 不用照顾对方也能被爱是什么感觉
- 不用把自己变轻也能靠近是什么感觉

产品功能：

- 心动型 vs 承接型解释。
- 适合感教育。
- 关系身体感判断。

#### 阶段 7：我适合什么歌 / 酒红色的歌

用户问题：

> 我适合什么歌？  
> 酒红色的歌。

对应取悦点：

用户需要的不只是分析，而是审美转译。

她想把：

- 颜色
- 关系
- 人格
- 歌
- 氛围
- 台词

统一成一个能被感受到的系统。

产品功能：

- 颜色歌单模块，后续版本可做。
- 关系台词模块。
- 情绪卡片模块。

#### 阶段 8：可以 vibe coding 什么产品

用户问题：

> 我对这个感兴趣的话，可以 vibe coding 什么产品出来啊？

对应产品机会：

用户不只是自己想玩，也看到它作为产品的可能性。

产品应具备：

- 官方数据锚点。
- 私人化情绪解读。
- 可截图传播。
- 小而美的 MVP。
- 适合小红书传播。

---

## 4. 用户画像、痛点与取悦点

### 4.1 核心用户画像

核心用户：

- 18–35 岁。
- 喜欢生日色、星座、MBTI、人设测试、歌单人格、关系分析。
- 经常用小红书、朋友圈、Instagram 分享截图。
- 对“我为什么会这样喜欢一个人”高度敏感。
- 喜欢审美化地理解自己，不喜欢冷冰冰的心理报告。
- 常在 crush / 暧昧 / 前任 / 关系反思中寻找解释。

典型用户心理：

> 我不是真的要按生日找对象。  
> 我是想知道，为什么我会被某一种人吸引，为什么我会在关系里变成这样，以及有没有一种关系能让我不用那么累。

### 4.2 用户痛点

#### 痛点 1：官方信息看不懂

birthday-color.cafein.jp 是日文网站，信息有语言门槛。

用户需要：

- 中文翻译。
- 日文色言葉解释。
- 更自然的中文人格描述。

#### 痛点 2：单个生日色太静态

生日色页面只能告诉用户：

> 你是什么颜色。

但不能告诉用户：

> 你为什么会被某种人吸引。  
> 你和 TA 的关系气质是什么。  
> 你从这段吸引里能学到什么。

#### 痛点 3：用户容易把“心疼”误认为“适合”

很多用户会被柔软、脆弱、易碎、需要安抚的人吸引。

她会产生：

- 保护欲
- 心疼
- 想证明自己不会伤害对方
- 想引导对方
- 想被对方需要

但这不一定等于长期适合。

产品要帮助用户区分：

> **心动型：点燃你的人。  
> 承接型：接住你的人。**

#### 痛点 4：用户害怕自己太浓、太强烈、太敏锐

当对方说“我有点怕你”，用户会受伤。

她可能会开始怀疑：

- 是不是我太多了？
- 是不是我太强烈了？
- 是不是我应该更轻一点？
- 是不是我不该看穿别人？

产品要传递的核心价值：

> 你不需要把自己变淡。  
> 你需要找到能盛住你的人。

#### 痛点 5：用户不知道“适合”是什么感觉

很多用户很熟悉：

- 上头
- 拉扯
- 心疼
- 暧昧
- 追逐
- 证明自己

但不熟悉：

- 安心
- 被安放
- 稳定回声
- 不用缩小自己
- 不用过度照顾对方
- 不用变得很乖也不会被丢下

产品要把“适合感”具象化。

### 4.3 用户取悦点

#### 取悦点 1：被精准命名

用户会被这样的表达打中：

- 保护欲型心动
- 红酒与樱花
- 心动型 vs 承接型
- 温柔但不脆，细腻但不逃
- 不是让你变淡的人，而是能盛住你的人
- 你容易把“他需要我”误认成“他适合我”

#### 取悦点 2：审美化理解自己

用户喜欢的不只是解释，而是有画面感的解释：

- 酒红色人格
- 樱花感
- 深水型
- 亚麻色长期主义
- 灰紫托底
- 孔雀蓝式承接

#### 取悦点 3：半官方锚点 + 私人解读

生日色来自官方网站，让产品有“事实入口”。

产品解读是私人化生成，让用户有“被懂”的感觉。

两者结合，形成一种独特体验：

> 不是 AI 瞎编，但又不止于资料查询。

#### 取悦点 4：适合截图分享

结果必须有分享欲：

- 短句。
- 高级配色。
- 一句话戳心。
- 标题有记忆点。
- 可以发给朋友说“救命好准”。

#### 取悦点 5：温柔但不讨好

产品不能只说：

> 你值得最好的。  
> 你们很配。  
> 你没有错。

它要敢说：

> 你可能把“被需要”误认成“被选择”。

但语气必须温柔，不审判，不居高临下。

---

## 5. 产品定位与功能总览

### 5.1 产品定位

BirthColor Mirror 是一个：

> **用生日色作为入口的关系自我认识产品。**

它不是：

- 严肃心理测评。
- 医疗诊断。
- 算命工具。
- 纯生日配对。
- dating app。

它是：

- 生日色查询器。
- 关系配色镜子。
- 情绪翻译器。
- 心动模式解释器。
- 小红书式审美卡片生成器。

### 5.2 核心模块

MVP 包含 6 个核心模块：

1. **单人生日色查询**
2. **我的情感能量画像**
3. **双人关系配色镜子**
4. **心动型 vs 承接型分析**
5. **适配颜色 / 能量推荐，并解释为什么**
6. **分享卡生成**

---

## 6. 功能模块详述

## 6.1 单人生日色查询

### 功能说明

用户输入生日，系统返回该日期的官方生日色信息。

### 输入

- 月
- 日

### 输出

- 日期
- 颜色名（日文 / 英文 / 中文）
- HEX
- RGB
- HSB / Lab / CMYK，可折叠
- 色言葉
- 特徴
- 来源链接
- 中文解释

### 页面示例

```text
3月25日
Wine Red / ワインレッド / 酒红色
#b33e5c

色言葉：
主役の風格・個性・自信

特徴：
直観力と威厳で名を馳せる芸術家

产品解读：
这是一种浓郁、直觉性强、带主角气质的颜色。它更像一种有存在感的表达力，不是轻飘飘的温柔，而是有重量、有风格、有自信的吸引力。

来源：birthday-color.cafein.jp
```

---

## 6.2 我的情感能量画像

### 功能说明

单人生日色不只展示“你是什么颜色”，还要输出：

> 你是什么样的情感能量。

### 输出字段

```ts
interface EnergyProfile {
  energyTitle: string;          // 例如：高浓度直觉型
  emotionalDensity: string;     // 情绪浓度：低/中/高
  expressionStyle: string;      // 表达风格
  attractionTrigger: string[];  // 容易被什么吸引
  relationshipRole: string;     // 容易进入的关系角色
  blindSpot: string;            // 关系盲点
  holdingEnergy: string;        // 适合被什么能量接住
  noNeedToShrink: string;       // 不需要再缩小的部分
}
```

### 示例：3月25日 Wine Red

```text
你的生日色：Wine Red 酒红色
你的情感能量：高浓度直觉型

你是一种浓烈、敏锐、有主角感的情感能量。你容易把喜欢变成一种很深的凝视：你会看见对方没说出口的部分，也会想认真对待关系里的每一个细节。

你容易被吸引的能量：
柔软、干净、有脆弱感、让你想小心靠近的人。

你容易进入的位置：
保护者 / 引导者 / 读懂者。

你的关系盲点：
你可能会把“我想保护他”误认成“他适合我”。

你真正适合被什么接住：
深水型能量。温柔但不脆，细腻但不逃，能被你打动，也能反过来看见你。

你不需要再缩小的部分：
你的敏锐、强烈、认真和表达欲。
```

---

## 6.3 双人关系配色镜子

### 功能说明

用户输入自己和 TA 的生日，选择关系状态，并可补充一句关系描述。产品生成关系配色解读。

### 输入

```ts
interface PairInput {
  selfBirthday: string; // MMDD
  targetBirthday: string; // MMDD
  relationshipStatus: "crush" | "situationship" | "ex" | "friend" | "partner" | "unknown";
  userText?: string;
}
```

### 输出

```ts
interface PairAnalysis {
  relationshipTitle: string;
  colorRelationType: string;
  emotionalPattern: string;
  heartbeatIndex: number;     // 心动指数 0-100
  holdingIndex: number;       // 承接指数 0-100
  growthIndex?: number;       // 成长提示强度，可选
  attraction: string;
  risk: string;
  takeaway: string;
  quote: string;
  recommendedHoldingColors?: HoldingColorRecommendation[];
  disclaimer: string;
}
```

### 关键原则

结果页不要只说：

> 你们匹配度 78%。

而要说：

- 这段吸引为什么发生。
- 你在这段关系里变成了谁。
- TA 更像你的心动型，还是承接型。
- 这段关系的美感是什么。
- 这段关系的风险是什么。
- 你能从中带走什么。

---

## 6.4 心动型 vs 承接型分析

这是产品的杀手级模块。

### 设计原因

很多用户会混淆：

- 让我上头的人
- 让我心疼的人
- 让我想保护的人
- 真正适合我的人

产品要帮助用户建立一个重要区分：

> **心动型：点燃你的人。  
> 承接型：接住你的人。**

### 输出结构

```ts
interface HeartbeatVsHolding {
  isHeartbeatType: boolean;
  isHoldingType: boolean;
  heartbeatReason: string;
  holdingReason: string;
  userPattern: string;
  growthPrompt: string;
}
```

### 示例：3月25日 Wine Red × 3月6日 Sakura

```text
TA 更像你的「心动型」。

TA 的柔软、轻、干净和易被打动，容易激发你的保护欲。你会想小心靠近，想告诉 TA：“别怕，我不会欺负你，我会好好对待你。”

但 TA 不一定是你的「承接型」。

如果 TA 会因为你的认真、敏锐和强烈而后退，你可能会为了不吓到 TA，把自己变得越来越轻。

这段关系给你的提醒是：
你不需要把自己稀释成粉红色，只为了不压弯一朵花。
```

### 结果页固定字段

每组关系都输出：

- TA 更像你的心动型 / 承接型 / 镜像型 / 共建型 / 高张力型。
- 为什么。
- 你在这段关系里的典型反应。
- 你需要观察的现实信号。

---

## 6.5 适配颜色 / 能量推荐，并解释为什么

### 功能说明

产品不仅要说用户适合匹配什么颜色，还要说清楚为什么。

不能只输出：

> 你适合 Deep Teal。

要输出：

> 你适合 Deep Teal 这一类深水型冷色调，因为你的 Wine Red 情感浓度高、表达强、直觉强，需要的不是另一个同样失控的强烈，也不是一碰就碎的柔软，而是一种有边界、有深度、能稳定回应你的能量。

### 输出结构

```ts
interface HoldingColorRecommendation {
  colorFamilyName: string;     // 例如：深水型冷色调
  sampleColors: string[];      // 例如：Deep Teal, Peacock Blue, Azure Blue
  whyFitsUser: string;         // 为什么适合用户
  relationshipFeeling: string; // 和这种人相处是什么感觉
  watchFor: string;            // 现实中怎么识别
  notThis: string;             // 容易误认但不是的类型
}
```

### 推荐逻辑

产品应先推荐“颜色能量类型”，再给具体日期样本。

这样避免用户误以为要按生日找人。

例如对 Wine Red 用户：

#### 1. 深水型冷色调

适合颜色家族：

- Deep Teal
- Peacock Blue
- Azure Blue
- Light Turquoise
- Deep Aqua

为什么适合：

- Wine Red 浓烈、直觉强、主角感强。
- 深水型冷色调有稳定、边界、冷静、承接感。
- 它不会要求 Wine Red 变淡，而是能给它容器。

相处感觉：

> 不是立刻被揪住心脏的心疼，而是身体慢慢松开。你会发现自己可以强烈、敏锐、有表达欲，但关系没有因此崩掉。

现实识别：

- 回复稳定。
- 能听你说完，不急着评价。
- 不用羞辱式玩笑压你。
- 不因你认真而后退。
- 有自己的边界，也尊重你的边界。

#### 2. 亚麻 / 灰紫型中性色

适合颜色家族：

- Linen Beige
- Lilac Hazy
- Taupe
- Greyish Purple

为什么适合：

- 中性色能托住 Wine Red 的浓度。
- 它不抢舞台，但能增加生活质感和长期稳定性。
- 适合把情绪和灵感落到日常。

相处感觉：

> 你不会一直上头，但会越来越觉得这个人让生活变得有质感。你们可以一起看展、散步、整理房间、做作品，把日子过得慢慢漂亮。

现实识别：

- 审美稳定。
- 不浮夸。
- 能把生活安排好。
- 有长期主义。
- 不拿冷淡冒充高级。

#### 3. 审美同频型深紫 / 红紫

适合颜色家族：

- Deep Purple
- Claret
- Burgundy
- Violet

为什么适合：

- 和 Wine Red 有灵魂同频和审美共振。
- 适合创作、深聊、精神世界连接。
- 但可能不一定最稳定。

相处感觉：

> 你会觉得“这个人懂我的戏剧性和精神世界”。但两个人如果都太沉浸，容易一起做梦，现实执行力不足。

现实识别：

- 你们有很强的精神吸引。
- 但要观察对方是否有行动力、稳定性和责任感。

---

## 7. 关系类型体系

### 7.1 类型一：保护欲型心动

典型组合：高强度颜色 × 柔软浅色。

特征：

- 一方浓烈、敏锐、有表达欲。
- 一方轻、柔、易碎、容易被打动。
- 浓烈方容易想保护柔软方。

用户感受：

> 我会心疼 TA，想小心对待 TA，想告诉 TA 我不会伤害你。

风险：

> 你可能会为了不吓到 TA，把自己变轻。TA 也可能被你的浓度压到。

提示：

> 心疼不等于适合，被需要不等于被选择。

### 7.2 类型二：被安放型适合

典型组合：高强度颜色 × 深水型稳定冷色 / 稳定中性色。

特征：

- 一方强烈、直觉、表达欲高。
- 一方稳定、清澈、有边界，能回应。

用户感受：

> 我好像不用那么快照顾 TA，也不用把自己调淡。我可以做自己，关系也不会崩掉。

风险：

> 一开始可能没有那么上头，用户可能误以为“不够心动”。

提示：

> 真正适合的关系，有时候不是让你心脏被揪住，而是让你的身体慢慢松开。

### 7.3 类型三：审美同频型

典型组合：艺术性强的颜色 × 艺术性强的颜色。

特征：

- 双方都有审美、表达、想象力。
- 容易精神吸引。
- 适合创作、深聊、共同做项目。

风险：

- 两个人都可能太沉浸情绪。
- 现实执行和稳定性可能不足。

提示：

> 灵魂同频很珍贵，但长期关系还需要现实节奏。

### 7.4 类型四：强强吸引型

典型组合：高强度颜色 × 高强度颜色。

特征：

- 火花强。
- 互相欣赏。
- 都有主张和存在感。

风险：

- 容易较劲。
- 容易互相抢节奏。
- 情绪浓度过高。

提示：

> 你们可以一起发光，但要有人愿意关灯休息。

### 7.5 类型五：灵感落地型

典型组合：表达型颜色 × grounded 稳定型颜色。

特征：

- 一方提供灵感、情绪、想象力。
- 一方提供路线、计划、执行力。

用户感受：

> TA 不一定最会让我上头，但 TA 能让我真的把事情做出来。

提示：

> 这类关系适合长期队友、事业搭子、稳定伴侣。

---

## 8. 关键页面与产品原型

## 8.1 首页

### 目标

让用户 10 秒内知道这个产品是什么，并立刻开始输入。

### 页面文案

```text
BirthColor Mirror

输入你和 TA 的生日，
生成你们的关系配色。

不是看你们配不配，
而是看这段心动照见了你什么，
以及你适合被什么样的能量接住。

基于 birthday-color.cafein.jp 的 366 日生日色数据。
关系解读由产品生成，仅供自我观察与娱乐。
```

### 输入区

```text
你的生日：月 / 日
TA 的生日：月 / 日
你们的关系：crush / 暧昧 / 前任 / 朋友 / 伴侣 / 不确定
你对 TA 的感觉：自由输入，可选

按钮：生成关系配色

次级入口：只查我的生日色
```

### 交互细节

- 月份、日期用 dropdown 或滚轮。
- 日期合法性校验，含 2月29日。
- 如果对应数据缺失，提示不可生成。

---

## 8.2 单人生日色页

### 结构

```text
[大色块背景]

3月25日
Wine Red / ワインレッド / 酒红色
#b33e5c

色言葉：
主役の風格・個性・自信

特徴：
直観力と威厳で名を馳せる芸術家

你的情感能量画像：
高浓度直觉型

你是一种浓烈、敏锐、有主角感的情感能量……

你容易被吸引的能量：
柔软、干净、让你心疼的人。

你真正适合被什么接住：
深水型能量。温柔但不脆，细腻但不逃。

来源：birthday-color.cafein.jp
```

### 按钮

```text
生成我和 TA 的关系配色
保存图片
复制结果
```

---

## 8.3 关系结果页

### 结构

```text
[顶部：关系标题]
红酒与樱花

[双方颜色卡]
你：3月25日 Wine Red #b33e5c
TA：3月6日 Sakura #fef4f4

[关系类型]
保护欲型心动
浓烈 × 柔软
心动指数：高
承接指数：中低

[为什么会心动]
你容易被 TA 的柔软、干净、易被打动吸引。TA 会激发你的保护欲和引导欲。

[为什么不一定适合]
如果 TA 会因为你的认真、敏锐和强烈而后退，你可能会为了不吓到 TA，把自己调得越来越轻。

[TA 是你的心动型，还是承接型？]
TA 更像你的心动型。他点燃的是你的心疼和保护欲，但不一定能稳定承接你的情感浓度。

[你真正适合被什么接住]
你适合深水型能量：温柔但不脆，细腻但不逃，能被你打动，也能反过来看见你。

[一句 take away]
你不需要把自己稀释成粉红色，只为了不压弯一朵花。

[按钮]
生成分享卡
重新生成
复制文字
```

---

## 8.4 分享卡页

### 尺寸

- 1080 × 1350
- 适配小红书竖版图

### 卡片结构

```text
┌────────────────────────┐
│ BirthColor Mirror      │
│                        │
│ 红酒与樱花              │
│ Wine Red × Sakura      │
│                        │
│ [酒红色块] [樱花粉色块] │
│                        │
│ 你：3.25 Wine Red       │
│ TA：3.6 Sakura          │
│                        │
│ 保护欲型心动            │
│ 心动指数：高            │
│ 承接指数：中低          │
│                        │
│ “不要把自己稀释成粉红色，│
│  只为了不压弯一朵花。”  │
│                        │
│ Based on birthday-color │
│ Relationship analysis  │
│ generated by product.  │
└────────────────────────┘
```

### 按钮

```text
下载 PNG
复制文案
返回编辑
```

---

## 9. 数据结构设计

## 9.1 BirthdayColor

```ts
export interface BirthdayColor {
  id: string; // MMDD
  month: number;
  day: number;
  dateLabelJa: string;
  colorNameJa: string;
  colorNameEn?: string;
  colorNameZh?: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsb?: { h: number; s: number; b: number };
  lab?: { l: number; a: number; b: number };
  cmyk?: { c: number; m: number; y: number; k: number };
  featureJa: string;
  featureZh?: string;
  colorWordsJa: string[];
  colorWordsZh?: string[];
  sourceUrl: string;
  verifiedAt: string;
}
```

## 9.2 ColorRelation

```ts
export interface ColorRelation {
  hueDifference: number;
  lightnessDifference: number;
  saturationDifference: number;
  colorDistanceLab?: number;
  relationType:
    | "tonal"
    | "analogous"
    | "softContrast"
    | "complementary"
    | "deepContrast"
    | "neutralSupport";
}
```

## 9.3 SemanticProfile

```ts
export interface SemanticProfile {
  expression: number; // 表达力
  stability: number;  // 稳定感
  softness: number;   // 柔软感
  intensity: number;  // 情绪浓度
  social: number;     // 关系性
  artistic: number;   // 艺术/审美
  grounded: number;   // 现实/秩序
  mystery: number;    // 神秘/精神性
}
```

## 9.4 PairAnalysis

```ts
export interface PairAnalysis {
  relationshipTitle: string;
  relationshipType: string;
  tags: string[];
  heartbeatIndex: number;
  holdingIndex: number;
  attraction: string;
  holdingAnalysis: string;
  risk: string;
  takeaway: string;
  quote: string;
  recommendedHoldingColors: HoldingColorRecommendation[];
  disclaimer: string;
}
```

## 9.5 HoldingColorRecommendation

```ts
export interface HoldingColorRecommendation {
  colorFamilyName: string;
  sampleColorNames: string[];
  sampleDateIds?: string[];
  whyFitsUser: string;
  relationshipFeeling: string;
  realLifeSignals: string[];
  commonMisread: string;
}
```

---

## 10. 算法规则

## 10.1 生日 ID 生成

```ts
function toBirthdayId(month: number, day: number): string {
  return `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
}
```

## 10.2 色彩关系判断

### Hue Difference

```text
0–25：同频 / 镜像 / 同色系
25–70：温和差异 / 可互补
70–140：明显差异 / 互相打开
140–220：强互补 / 高吸引也高张力
```

### Lightness Difference

```text
明度差大：一方更浓，一方更轻
明度差小：相似能量
```

### Saturation Difference

```text
饱和度差大：一方表达强，一方表达弱
饱和度差小：表达强度接近
```

### Relation Type

```ts
function getRelationType(colorA, colorB): ColorRelation["relationType"] {
  // 伪代码
  if (hueDiff <= 25 && saturationDiff <= 25) return "tonal";
  if (hueDiff <= 70) return "analogous";
  if (hueDiff <= 140 && lightnessDiff > 35) return "softContrast";
  if (hueDiff >= 140 && hueDiff <= 220) return "complementary";
  if (bothDark && hueDiff > 80) return "deepContrast";
  if (oneNeutral) return "neutralSupport";
  return "softContrast";
}
```

## 10.3 语义关键词映射

从官方色言葉和特徴中提取语义维度。

```text
芸術家 / 表現 / 個性 / 色彩 / 美 / 才能 → artistic + expression
自信 / 主役 / 威厳 / 情熱 / リーダー → intensity + expression
思いやり / 愛 / 友情 / 優しさ / 幸福 → softness + social
努力家 / 規律 / 現実 / 慎重 / 秩序 → stability + grounded
神秘 / 哲学 / 夢 / 感性 / 精神 → artistic + mystery + intensity
自然 / 温和 / 生活 / 育てる → grounded + softness
工芸 / 技術 / 仕事 / 誇り → grounded + stability + expression
```

## 10.4 关系类型生成

```text
高 intensity + 高 softness：保护欲型心动
高 intensity + 高 stability：被安放型适合
高 artistic + 高 artistic：审美同频型
高 intensity + 高 intensity：强强吸引型
高 softness + 低 stability：心疼但易碎型
高 expression + 高 grounded：灵感落地型
高 mystery + 高 artistic：精神世界吸引型
neutralSupport + highIntensity：托底型适合
```

## 10.5 心动指数与承接指数

### 心动指数 Heartbeat Index

受以下因素影响：

- 色彩对比度高。
- 一方强烈，一方柔软。
- 用户输入出现：心疼、保护、怕我、看穿、想靠近、上头。
- 双方艺术性 / 神秘性高。

### 承接指数 Holding Index

受以下因素影响：

- 目标方稳定性高。
- 目标方 grounded 高。
- 色彩关系不是过度尖锐。
- 用户输入出现：安心、稳定、能听我说、被理解、不逃、日常。
- 如果目标方 softness 高但 stability 低，承接指数下降。

### 输出规则

```text
高心动 + 低承接：高吸引拉扯型
高心动 + 高承接：强吸引且可共建
低心动 + 高承接：慢热稳定型
低心动 + 低承接：弱连接型
```

---

## 11. LLM 生成规范

LLM 只负责生成自然语言，不负责创造事实。

## 11.1 LLM 输入

```json
{
  "self": {
    "birthday": "3月25日",
    "colorNameJa": "ワインレッド",
    "colorNameEn": "Wine Red",
    "colorNameZh": "酒红色",
    "hex": "#b33e5c",
    "featureJa": "直観力と威厳で名を馳せる芸術家",
    "colorWordsJa": ["主役の風格", "個性", "自信"]
  },
  "target": {
    "birthday": "3月6日",
    "colorNameJa": "桜色",
    "colorNameZh": "樱色",
    "hex": "#fef4f4",
    "featureJa": "内に人の心を動かす力を秘めた人",
    "colorWordsJa": ["愛情", "思いやり", "健全"]
  },
  "colorRelation": {
    "hueDifference": 15,
    "lightnessDifference": 48,
    "saturationDifference": 62,
    "relationType": "softContrast"
  },
  "semanticProfiles": {
    "self": {
      "intensity": 9,
      "expression": 8,
      "artistic": 8,
      "softness": 4,
      "stability": 5
    },
    "target": {
      "intensity": 3,
      "expression": 4,
      "artistic": 5,
      "softness": 9,
      "stability": 4
    }
  },
  "relationshipStatus": "crush",
  "userText": "我很想保护他，但他说有点怕我"
}
```

## 11.2 LLM System Prompt

```text
你是一个中文关系配色解读助手。

你必须遵守：
1. 生日色事实只能使用输入 JSON 里的字段。
2. 不得创造新的生日色、色号、色言葉、特徴。
3. 不得声称关系解读来自 birthday-color.cafein.jp 官方。
4. 你可以基于颜色关系、官方色言葉、用户关系描述，生成“产品解读”。
5. 不要使用绝对化语言，例如“注定”“一定”“永远”。
6. 不要给用户或 TA 贴临床诊断标签。
7. 输出要温柔、有审美、有洞察，但不要油腻。
8. 语言适合小红书用户截图分享。
9. 必须解释“为什么”：不仅说适合什么颜色/能量，还要说它如何承接用户。
10. 输出 JSON，不要输出 markdown。
```

## 11.3 LLM 输出格式

```json
{
  "relationshipTitle": "红酒与樱花",
  "relationshipType": "保护欲型心动",
  "tags": ["浓烈×柔软", "高心动", "承接感不足"],
  "heartbeatIndex": 88,
  "holdingIndex": 46,
  "attraction": "你容易被对方的柔软、干净、易被打动吸引。对方会激发你的保护欲和引导欲。",
  "holdingAnalysis": "TA 更像你的心动型，而不是承接型。他点燃的是你想保护人的部分，但不一定能稳定接住你的情感浓度。",
  "risk": "你可能会为了不吓到对方，把自己调得太轻；对方也可能被你的强烈和认真感压到。",
  "takeaway": "真正适合你的，不是需要你一直保护的人，而是温柔但不脆、细腻但不逃、被你打动但不被你吓跑的人。",
  "quote": "不要把自己稀释成粉红色，只为了不压弯一朵花。",
  "recommendedHoldingColors": [
    {
      "colorFamilyName": "深水型冷色调",
      "sampleColorNames": ["Deep Teal", "Peacock Blue", "Azure Blue"],
      "whyFitsUser": "你的生日色情感浓度高、表达强、直觉强，因此需要的不是另一个同样失控的强烈，也不是一碰就碎的柔软，而是一种有边界、有深度、能稳定回应你的能量。",
      "relationshipFeeling": "和这种人在一起，你不一定第一秒被揪住心脏，但身体会慢慢松开。你会发现自己可以强烈、敏锐、有表达欲，关系也不会因此崩掉。",
      "realLifeSignals": ["回复稳定", "能听你说完", "不因你的认真而后退", "有边界但不冷漠"],
      "commonMisread": "它可能一开始不如易碎型对象让你心疼，所以你可能误以为不够心动。"
    }
  ],
  "disclaimer": "生日色事实来自 birthday-color.cafein.jp；关系分析为产品生成，仅供自我观察与娱乐。"
}
```

---

## 12. UI 风格

### 12.1 关键词

- 高级
- 留白
- 色块
- 杂志感
- 轻占卜
- 小红书卡片
- 审美型心理镜子
- 不要廉价星座网站感

### 12.2 视觉建议

- 背景根据双方颜色生成柔和渐变。
- 卡片圆角 24px。
- 大面积色块展示。
- 中文字体用系统默认或 Noto Sans SC。
- 英文标题可用 serif。
- 结果页用短段落，适合截图。

### 12.3 自适应文字颜色

根据背景颜色自动判断文字颜色。

```ts
function getReadableTextColor(hex: string): "#000000" | "#ffffff" {
  const luminance = getRelativeLuminance(hex);
  return luminance > 0.55 ? "#000000" : "#ffffff";
}
```

### 12.4 视觉不要做成

- 大量星座符号。
- 霓虹廉价渐变。
- 过度玄学图标。
- 俗气桃心。
- 大红大紫的恋爱测试风。

---

## 13. 技术方案

### 13.1 推荐技术栈

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui 可选
Framer Motion 可选
html-to-image 或 dom-to-image-more
OpenAI API 可选
Vercel 部署
```

### 13.2 文件结构

```text
birthcolor-mirror/
  src/
    app/
      page.tsx
      single/page.tsx
      result/page.tsx
      share/page.tsx
      api/analyze/route.ts
    components/
      BirthdayInput.tsx
      ColorCard.tsx
      PairColorCard.tsx
      EnergyProfileCard.tsx
      HeartbeatHoldingCard.tsx
      HoldingColorRecommendation.tsx
      ShareCard.tsx
      SourceBadge.tsx
    data/
      birthdayColors.json
    lib/
      birthday.ts
      colorMath.ts
      compatibility.ts
      semanticProfile.ts
      generatePrompt.ts
      exportImage.ts
    scripts/
      fetchBirthdayColors.ts
      validateBirthdayColors.ts
```

### 13.3 数据抓取脚本

创建脚本：

```text
scripts/fetchBirthdayColors.ts
```

功能：

- 循环生成 0101–1231，包括 0229。
- 访问 `http://birthday-color.cafein.jp/html/MMDD.html`。
- 解析日期、颜色名、HEX、RGB、HSB、Lab、CMYK、特徴、色言葉。
- 生成 `src/data/birthdayColors.json`。
- 每次请求间隔 500ms–1000ms。
- 抓取失败写入 `failed.json`。
- 解析不到字段时标记为 null，不能 invent。

### 13.4 数据校验脚本

创建脚本：

```text
scripts/validateBirthdayColors.ts
```

校验：

- 是否正好 366 条。
- 是否每条都有 id、month、day、hex、colorNameJa、sourceUrl。
- hex 是否合法。
- RGB 是否与 hex 一致。
- 是否有重复日期。
- 缺失字段输出 warnings。
- 严重错误阻断 build。

---

## 14. MVP 开发范围

### 必做

- 首页输入。
- 单人生日色查询。
- 双人关系配色结果页。
- 心动型 vs 承接型分析。
- 适配颜色 / 承接能量推荐，并解释为什么。
- 分享卡 PNG 导出。
- 数据来源 disclaimer。
- 移动端适配。

### 暂不做

- 用户账号。
- 历史记录。
- 社交匹配。
- 付费。
- Spotify / 网易云歌单接口。
- 复杂后台。
- 每日运势。
- 真正的 dating app。

---

## 15. MVP 开发计划

### Day 1

- 初始化 Next.js 项目。
- 完成首页。
- 完成 BirthdayInput。
- 手动放入 3–5 条测试数据。
- 完成单人生日色页面。

注意：测试数据也必须来自官方页面或用户手动核验，不能 invent。

### Day 2

- 完成生日色抓取脚本。
- 完成数据校验脚本。
- 生成完整 birthdayColors.json。
- 完成 colorMath.ts。

### Day 3

- 完成 semanticProfile.ts。
- 完成 compatibility.ts。
- 完成关系结果页。
- 先用规则模板生成结果，不接 LLM。

### Day 4

- 完成分享卡。
- 完成 PNG 导出。
- 完成移动端适配。
- 加入 source / disclaimer。

### Day 5

- 可选接 OpenAI API。
- 打磨 UI。
- 测试 20 组生日。
- 部署到 Vercel。

---

## 16. 成功指标

MVP 先看分享欲，不看复杂商业化。

核心指标：

- 生成完成率 > 60%。
- 分享卡下载率 > 30%。
- 用户平均停留 > 60 秒。
- 用户愿意拿它测 crush / 前任 / 朋友 / 伴侣。
- 小红书截图能被看懂，并引发评论。

定性判断：

用户看到结果后说：

> 救命，好准。  
> 我终于知道我为什么会喜欢 TA 了。  
> 原来我不是要找这个生日的人，而是要找这种能量。  
> 原来我把心疼误认成适合了。  
> 原来我不用把自己变淡。

产品就成立。

---

## 17. Codex 开发 Prompt

下面这段可以直接复制给 Codex。

```text
请帮我开发一个 MVP 网页产品，产品名暂定为 BirthColor Mirror。

产品目标：
基于 birthday-color.cafein.jp 的 366 日生日色数据，用户输入自己和 TA 的生日后，生成双方官方生日色卡，以及一张“关系配色镜子”。这个产品不是简单判断“配不配”，而是帮助用户理解：这段心动照见了什么，以及用户适合被什么样的能量接住。

核心定位：
不是找一个生日，而是找到一种能接住你的关系质地。

重要原则：
1. 生日色事实必须来自 birthday-color.cafein.jp。
2. 不得自行创造生日色、色号、色言葉、特徴。
3. 关系分析可以由产品生成，但必须明确标注为“产品解读”，不是 birthday-color.cafein.jp 官方结论。
4. 产品不仅要说用户适合匹配什么颜色/能量，还要解释为什么。
5. 产品要区分“心动型”和“承接型”：心动型点燃用户，承接型接住用户。

技术栈：
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui 可选
- html-to-image 或 dom-to-image-more 用于导出分享卡
- OpenAI API 暂时可选，先用规则模板实现

页面：

1. 首页
标题：BirthColor Mirror
文案：
输入你和 TA 的生日，生成你们的关系配色。
不是看你们配不配，而是看这段心动照见了你什么，以及你适合被什么样的能量接住。

输入：
- 你的生日（月/日）
- TA 的生日（月/日）
- 关系状态：crush / 暧昧 / 前任 / 朋友 / 伴侣 / 不确定
- 自由输入：你对 TA 的感觉，可选
按钮：生成关系配色
次级入口：只查我的生日色

2. 单人生日色页
展示：
- 日期
- 颜色名（日文/英文/中文）
- HEX
- RGB
- 色言葉
- 特徴
- 来源链接
- 中文产品解读
- 我的情感能量画像
- 我容易被什么吸引
- 我适合被什么能量接住

3. 关系结果页
展示：
- 双方颜色卡
- 关系标题
- 关系类型
- 心动指数
- 承接指数
- 为什么会心动
- 为什么不一定适合 / 或为什么适合
- TA 更像你的心动型还是承接型
- 你真正适合被什么颜色/能量接住，以及为什么
- 一句 takeaway
- 一句 quote
- disclaimer：生日色事实来自 birthday-color.cafein.jp；关系解读由产品生成，仅供自我观察与娱乐。

4. 分享卡页
生成 1080x1350 的小红书竖版卡。
包含：
- 双方颜色块
- 生日
- 颜色名
- 关系标题
- 心动指数 / 承接指数
- 一句话 quote
- source/disclaimer
支持下载 PNG。

数据结构：
请创建 src/data/birthdayColors.json，格式如下：

{
  "0325": {
    "id": "0325",
    "month": 3,
    "day": 25,
    "dateLabelJa": "3月25日",
    "colorNameJa": "ワインレッド",
    "colorNameEn": "Wine Red",
    "colorNameZh": "酒红色",
    "hex": "#b33e5c",
    "rgb": { "r": 179, "g": 62, "b": 92 },
    "hsb": { "h": 345, "s": 65, "b": 70 },
    "lab": { "l": 48.95, "a": 59.77, "b": 18.31 },
    "cmyk": { "c": 0, "m": 65, "y": 49, "k": 30 },
    "featureJa": "直観力と威厳で名を馳せる芸術家",
    "colorWordsJa": ["主役の風格", "個性", "自信"],
    "sourceUrl": "http://birthday-color.cafein.jp/html/0325.html",
    "verifiedAt": "2026-07-06"
  }
}

请创建核心文件：
- src/lib/birthday.ts：生日转 MMDD id，日期合法性校验
- src/lib/colorMath.ts：hex/rgb/hsl/lab 色彩计算
- src/lib/semanticProfile.ts：从色言葉和特徴提取语义维度
- src/lib/compatibility.ts：生成关系类型、心动指数、承接指数
- src/lib/generatePrompt.ts：未来接 LLM 的 prompt 生成
- src/lib/exportImage.ts：导出分享卡
- src/components/BirthdayInput.tsx
- src/components/ColorCard.tsx
- src/components/PairColorCard.tsx
- src/components/EnergyProfileCard.tsx
- src/components/HeartbeatHoldingCard.tsx
- src/components/HoldingColorRecommendation.tsx
- src/components/ShareCard.tsx
- src/components/SourceBadge.tsx

关系算法第一版：

1. 根据 hueDifference 判断色彩关系：
- 0–25：同频/镜像
- 25–70：温和差异
- 70–140：互相打开
- 140–220：强互补/高张力

2. 根据明度差判断：
- 明度差大：一方更浓，一方更轻
- 明度差小：相似能量

3. 根据色言葉关键词提取语义：
- 芸術家/表現/個性/色彩/美 → artistic/expression
- 自信/主役/威厳/情熱 → intensity/expression
- 思いやり/愛/友情/優しさ → softness/social
- 努力家/規律/現実/慎重 → stability/grounded
- 神秘/哲学/夢/感性 → artistic/intensity/mystery

4. 根据语义组合生成关系类型：
- 高 intensity + 高 softness：保护欲型心动
- 高 intensity + 高 stability：被安放型适合
- 高 artistic + 高 artistic：审美同频型
- 高 intensity + 高 intensity：强强吸引型
- 高 softness + 低 stability：心疼但易碎型
- 高 expression + 高 grounded：灵感落地型

5. 心动指数 Heartbeat Index：
由色彩张力、柔软/强烈差异、用户输入中的心疼/保护/上头等词提升。

6. 承接指数 Holding Index：
由对方稳定性、grounded、边界感、低逃避风险等提升。

7. 必须输出“为什么适合某种颜色/能量”：
例如，不只说 Wine Red 适合 Deep Teal，而要解释：Wine Red 情感浓度高、表达强、直觉强，因此需要的不是一碰就碎的柔软，而是一种有边界、有深度、能稳定回应的深水型能量。

请先实现一个漂亮、可运行、移动端友好的 MVP。UI 要高级、留白、卡片感、小红书分享感。不要做成廉价星座网站。
```

---

## 18. 参考资料

> 注：产品内不需要展示这些学术来源；PRD 中用于说明产品为什么可以合理使用“颜色作为情绪隐喻”“关系模式作为自我观察框架”。

1. birthday-color.cafein.jp：366 日生日色官方查询。  
   URL: http://birthday-color.cafein.jp/

2. 3月25日生日色官方页面：Wine Red / #b33e5c / 色言葉「主役の風格・個性・自信」。  
   URL: http://birthday-color.cafein.jp/html/0325.html

3. Russell, J. A. 的 Circumplex Model of Affect：情绪可被放在 valence 与 arousal 两个维度中理解。  
   可参考综述：Posner et al., The circumplex model of affect: An integrative approach to affective neuroscience, cognitive development, and psychopathology.

4. 色彩与情绪关联研究：颜色与情绪存在系统性联想，但受文化与语境影响，适合用作隐喻而非绝对人格判断。  
   可参考：Do we feel colours? A systematic review of 128 years of psychological research on colour-emotion associations.

5. 成人依恋与关系模式：亲密关系中的安全、焦虑、回避、承接等模式可作为自我观察框架，但产品不做临床诊断。  
   可参考：Attachment styles and adult relationships overview.

---

## 19. 最终产品哲学

BirthColor Mirror 的核心不是“算准”。

它真正要做的是：

> **让用户通过颜色，看见自己在爱里变成了什么样的人。**

用户输入生日，得到的不应该只是：

> 你是 Wine Red。  
> 你和 TA 匹配度 72%。

而应该是：

> 你是一种浓烈、敏锐、有主角感的情感能量。  
> 你容易被柔软、易碎、让你心疼的人点燃。  
> 但真正适合你的，不是需要你一直保护的人，  
> 而是温柔但不脆、细腻但不逃、被你打动也不被你吓跑的人。  
> 你不需要把自己变淡。  
> 你需要找到能盛住你的人。

这就是产品最独特的地方：

> **不是告诉用户该找哪个生日的人。  
> 而是帮用户找到一种能接住自己的关系质地。**
