---
title: "PaperReading: MLLM_3 - Think-With-Image"
timestamp: 2026-04-18 19:55:31+08:00
series: PaperReading
tags: [MLLM, Paper, Reasoning]
description: Think-With-Image 相关论文阅读。

---

### Description

> [!NOTE] 普通论文
> 标准论文记录，蓝色

> [!TIP] 推荐阅读
> 特别推荐的经典论文，绿色

> [!IMPORTANT] 重要突破
> 里程碑式的重要论文，紫色

> [!WARNING] 需注意
> 有争议或需要特别注意的论文，橙色
>
> <br>

## Thinking with Images for Multimodal Reasoning: Foundations, Methods, and Future Frontiers

> [!NOTE] Survey 
> **Arxiv** : [2506.23918](https://arxiv.org/pdf/2506.23918)
>
> **翻译：**[2506.23918](https://hjfy.top/arxiv/2506.23918)
>

![Three Stage](/image/think-with-image.png)

作者主要总结的是对于一个多模态模型，think with image的几种方式，而对Agent没有太多涉猎

对于这种讲image作为动态推理过程一部分的方向，作者总结三种主要的思路：

第一阶段：工具驱动的视觉探索（Tool-Driven Visual Exploration）


模型来决定调用某种外部视觉工具，然后根据工具的输出，帮助下一步推理，主要的tool有三种，一种是提取image中的特定信息（OCR之类），第二种增加对image的感知能力，比如对图像进行crop/zoom，第三种为引导思考工具，比如遮盖某一部分或者突出关键区域，也就是把思考过程用具体对图像的操作表示。感觉这种方法对推理能力的提升，很大程度取决于调用的工具，模型学会调用什么样的工具，怎样调用工具，在什么时候调用工具，感觉才是真正用tool辅助推理了

第二阶段：程序化视觉操作（Programmatic Visual Manipulation）

模型作为“视觉程序员”，生成代码来执行复杂的几何、逻辑操作（如画辅助线解决几何题、坐标变换），实现对视觉信息的结构化重组，更加灵活也具有可解释性。通过生成代码，模型可以从基本操作中构建定制化的算法，从而解决那些固定工具集难以处理的广泛复杂视觉问题。两个想法也随之产生，一个是模型的推理跟代码表示之间的对齐问题，用另外一个程序处理图像是否有益于模型本身的推理；另一个是如果用代码解释图像可行的话，在这个过程中加入工具的调用，按道理能力会进一步提升。

第三阶段：内在视觉想象（Intrinsic Visual Imagination）

模型作为“视觉思考者”，直接生成中间视觉模态（如草图、关键帧或潜空间表示）作为“视觉思维导图”，主要三种方式，第一种，显示将每一步的推理生成图像，感觉是一种视觉的cot，这种方式就主要关注生成理解的统一了。第二种构建隐式的推理，认为推理隐含在这些内部特征的变换中。第三种交错式的推理，模型的思维过程成为一种与自身的多模态的对话，它可能首先生成文本以形成假设，接着生成图像以检验该假设，然后再生成更多文本以反思视觉证据。


读下来感觉think-with-image如果想有agentic能力的话，perception还是很重要的，怎么让视觉感知真正应用到推理过程，而不是embed之后就作为文本调用了，真正在推理的时候应用了视觉信息很重。另外，cot到底能不能帮助理解视觉，这又是个问题



## DeepEyes: Incentivizing "Thinking with Images" via Reinforcement Learning

> [!IMPORTANT] DeepEyes
> **Arxiv** : [2505.14362](https://arxiv.org/pdf/2505.14362)
>
> **翻译：**[2505.14362](https://hjfy.top/arxiv/2505.14362)
>
> **代码** : [Github Search](https://github.com/Visual-Agent/DeepEyes）
>
>==🔆只通过RL实现将zoom-in操作加入cot==


![DeepEyes](/image/DeepEyes.png)

总结来说，就是把图片加入了思考过程，并且可以在cot中进行zoom-in的操作。输入是question，输出是interleaved cot和final answer，然后没有 SFT 阶段，只做了一次 GRPO ，reward可以从算法图中看出，三个部分，acc用来奖励正确的答案，format在格式正确时被奖励，tool项仅在调用了工具且做对题时才会被奖励。

![DeepEyes-dynamics](/image/Deepeyes_dynamics.png)

作者同时还分析了在训练阶段中的变化，总结出三个阶段，最开始学习调用工具，在s1后期可见响应长度迅速下降，模型学会最基本工具使用，开始精简回答内容，第二阶段开始大量调用工具，且调用工具和回答准确程度开始上升，第三阶段反而调用工具次数减少，说明模型也是真正学习到了调用工具的轨迹，而非单纯工具调用

这篇工作idea很简单，在高分辨率的任务上，提升非常大，主要还是zoom-in的效果，获取了更细粒度的感知



## VISUAL PLANNING: LET’S THINK ONLY WITH IMAGES

>[!NOTE] 
>
>**Arxiv** [2505.11409](https://arxiv.org/pdf/2505.11409)
>
>**翻译**：[2505.11409](https://hjfy.top/arxiv/2505.11409)
>

![Visual Planning](/image/Visual-Planning.png)


一篇偏向于用RL做视觉规划的任务，主要注意力集中在如何改造视觉，可以实现一步一步搜索的能力（类似cot），感觉初衷是正确的，我也认为mllm对视觉的利用不是很充分，并且视觉会是很重要的一部分，可惜这篇工作没有完美解答我的困惑，更多的RL和仅限vision上的改进，其实我觉得它本质上不太属于think with image的讨论范畴，感觉对具身领域会有挺大的启发的，但是一些insight比较好，还是把它放在这里了。

作者规划了两个阶段，Exploration & Exploitation，为了训练RL（GRPO），就必须有一个Valid的中间阶段，这里作者并没有让模型去学习正确的trajectory的分布，而是让模型学习随机探索，这样一个类似于学习world model的过程，反而效果更好，这对RL的设计会是很大的启发。所以，也能猜测出了，这种思想主要对于类似需要视觉上的搜索一类的任务，表现很好，比如搜索迷宫之类的，感觉还是有挺大启发的，总之，很好的工作。


## Thyme: Think Beyond Images

>[!NOTE] Thyme
>
>**Arxiv** [2508.11630](https://arxiv.org/pdf/2508.11630)
>
>**翻译**：[2508.11630](https://hjfy.top/arxiv/2508.11630)
>
>**代码**：[Github](https://github.com/yfzhang114/Thyme)
>


