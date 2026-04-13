---
title: "PaperReading: LLM_1 - Reasoning"
timestamp: 2026-04-06 00:00:00+08:00
series: PaperReading
tags: [LLM, Paper, Reasoning]
description: 推理阶段，prompt工程
---

### Description

> [!NOTE] 普通论文
> 标准论文记录,蓝色

> [!TIP] 推荐阅读
> 特别推荐的经典论文,绿色

> [!IMPORTANT] 重要突破
> 里程碑式的重要论文,紫色

> [!WARNING] 需注意
> 有争议或需要特别注意的论文,橙色

<br>

## Chain-of-Thought Prompting

> [!IMPORTANT] Chain-of-Thought (Wei et al.)
> **Arxiv** [2201.11903](https://arxiv.org/abs/2201.11903)
>
> **翻译** [2201.11903](https://hjfy.top/arxiv/2201.11903)
>
> ==🔆在prompt中增加CoT提示==
>
> ![CoT](/image/CoT.png)

非常经典的一篇工作，在推理时构建推理过程prompt，也就是说，我们提供的prompt是问题 + 推理步骤 + 答案，让模型可以逐步回答并输出推理过程，一方面便于精确定位在哪里出错，另一方面对模型输出答案的准确率也有提升，尤其是在数学逻辑任务上表现更好。

另外，值得注意的一点是，对于参数量较小的模型来说，仅在推理中加入 CoT 提示反而可能降低性能，这种简单构建prompt的形式是随着模型参数规模增加而涌现的。

## Self-Consistency

> [!IMPORTANT] Self-Consistency (Wang et al.)
> **Arxiv** [2203.11171](https://arxiv.org/abs/2203.11171)
>
> **翻译** [2203.11171](https://hjfy.top/arxiv/2203.11171)
>
> ==🔆采样多个推理路径，投票选出最好的==
>
> ![Self-Consistency](/image/Self-consistency.png)

CoT 只是给模型叠了一个“思考”的 Buff，而 Self-consistency 则是让模型通过“投票”来排除偶然的错误。直观理解，不同的思考路径最终得出的答案应该一致，所以这篇文章的思路是，先生成N个推理和回答，然后通过投票选出真正的答案。对于这个投票策略，一种是直接选出次数最多的答案，另一种是对推理过程的概率进行计算，也就是计算每一个 token生成的对数概率，然后做归一化。

值得注意的是，Self-consistency 这种做法只局限于固定答案集的推理任务，对于开放任务就不能简单采样+投票了，在此之后，有一些工作将这种思路拓展至开放任务，将生成的答案转成高维向量，计算不同向量之间的余弦相似度，整体的思路是一样的。

## Least-to-Most Prompting

> [!TIP] Least-to-Most (Zhou et al.)
> **Arxiv** [2205.10625](https://arxiv.org/abs/2205.10625)
>
> **翻译** [2205.10625](https://hjfy.top/arxiv/2205.10625)
>
> ==🔆拆解，顺序解决==

![L2M](/image/L2M.png)

L2M的核心思想为复杂的推理任务往往可以拆解为一系列更简单的子问题。第一阶段，先输入原始问题 + 几个展示如何拆分问题的示例，让模型输出一系列有序的子问题列表。随后，模型按照“由简到难”的顺序依次解决子问题，并且前一个子问题的答案会被当作后面子问题的Prompt的一部分。

这种方法有很好的长度泛化能力，也就是说对于问题长度超过训练集的例子，L2M仍能保持很好的性能，本质上来说，长度的增加对于这种方法而言，只是增加了推理数目，而对每一步推理的难度并没有增加，这也是这种方法区别于简单的CoT的地方，后续Agent的规划能力也是受他的启发。

## PAL

> [!IMPORTANT] PAL (Gao et al.)
> **Arxiv** [2211.10435](https://arxiv.org/abs/2211.10435)
>
> **翻译** [2211.10435](https://hjfy.top/arxiv/2211.10435)
>
> **代码** [Github](https://github.com/reasoning-machines/pal)
>
> ==🔆将程序作为推理步骤=


![PAL](/image/PAL.png){.center style="width:85%;"}


PAL侧重于将 LLM 作为**“规划器”**。 它的逻辑是“自然语言描述 + 代码块”。它认为 LLM 应该用文字理清思路，但把涉及变量赋值和计算的部分写成程序。结构是文字与代码交织，代码在这里只是一个辅助作用，后续的PoT则是将程序认定为LLM的思考方式了。



## Program of Thoughts

> [!TIP] Program-of-Thoughts (Chen et al.)
> **Arxiv** [2211.12588](https://arxiv.org/abs/2211.12588)
>
> **翻译** [2211.12588](https://hjfy.top/arxiv/2211.12588)
>
> **代码** [Github](https://github.com/wenhuchen/Program-of-Thoughts)
>
> ==🔆“思维程序” prompt==


![PoT](/image/PoT.png){.center style="width:85%;"}


简单来说，就是把推理过程完全用代码表示，相比于CoT的自然语言描述，PoT将计算和推理拆解开来，生成的描述只是推理过程，而具体的计算交给代码执行器来完成，因此，在数值推理任务上表现良好，用于需要高度符号推理技能的问题。而对于一些常识推理问题，表现不如CoT，并且泛化性也没有CoT好。




## Tree of Thoughts

> [!IMPORTANT] Tree-of-Thoughts (Yao et al.)
> **Arxiv** [2305.10601](https://arxiv.org/abs/2305.10601)
>
> **翻译** [2305.10601](https://hjfy.top/arxiv/2305.10601)
>
> **代码** [Github](https://github.com/princeton-nlp/tree-of-thought-llm)
>
> **方法类别** 检索/搜索
>
> **核心贡献** 将线性推理扩展为树状搜索,支持多路径探索与回溯,显著提升复杂推理任务成功率。
>
> **优点** 对高难组合推理任务效果突出。
>
> **局限** 搜索空间增长快,推理时延和成本较高。

## Auto-CoT

> [!TIP] Auto-CoT (Zhang et al.)
> **Arxiv** [2210.03493](https://arxiv.org/abs/2210.03493)
>
> **翻译** [2210.03493](https://hjfy.top/arxiv/2210.03493)
>
> **代码** [Github](https://github.com/amazon-science/auto-cot)
>
> **方法类别** 提示/示例自动化
>
> **核心贡献** 使用 LLM 自动构建多样化 CoT 示例,减轻人工示例编写负担并保持性能。
>
> **优点** 自动化程度高,工程落地成本低。
>
> **局限** 自动生成推理链可能包含噪声或错误步骤。

## Toolformer

> [!NOTE] Toolformer (Schick et al.)
> **Arxiv** [2302.04761](https://arxiv.org/abs/2302.04761)
>
> **翻译** [2302.04761](https://hjfy.top/arxiv/2302.04761)
>
> **方法类别** 训练策略
>
> **核心贡献** 通过自监督生成工具调用标记,让模型学习在推理过程中自主插入 API 调用。
>
> **优点** 无需大规模人工标注工具调用轨迹。
>
> **局限** 训练与数据规模要求高,工具可用性限制模型上限。
>
> **代码/数据** Meta 公开论文与实验设定,官方完整训练代码有限。

## VeriCoT

> [!WARNING] VeriCoT (2025)
> **Arxiv** [2511.04662](https://arxiv.org/abs/2511.04662)
>
> **翻译** [2511.04662](https://hjfy.top/arxiv/2511.04662)
>
> **方法类别** 验证/融合
>
> **核心贡献** 将 CoT 推理轨迹转换为逻辑形式并用符号方法校验一致性,增强推理可验证性。
>
> **优点** 提升可解释性与可信度。
>
> **局限** 依赖外部知识库与证明器,系统构建复杂。
>
> **代码/数据** 暂无公开代码。






