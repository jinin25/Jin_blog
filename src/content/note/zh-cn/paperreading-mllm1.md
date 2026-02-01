---
title: "PaperReading: MLLM_1"
timestamp: 2026-01-24 02:22:48+08:00
series: PaperReading
tags: [MLLM, Paper]
description: MLLM相关基本论文的阅读和思考。
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

## Vision Transformer（ViT）

> [!IMPORTANT] ViT
> **Arxiv** : [2010.11929](https://arxiv.org/pdf/2010.11929)
>
> **翻译：**[2010.11929](https://hjfy.top/arxiv/2010.11929)
>
> **代码：**[https://github.com/lucidrains/vit-pytorch](https://github.com/lucidrains/vit-pytorch)
>
> ==🔆将图片直接切割为 patch，对每个 patch 展平传入 transformer==
>
> _将 Transformer 用于视觉领域，将图像分为一系列图像块，由于不加入归纳偏置，在中小数据集（ImageNet）上效果不如 Resnet，但在大数据集上有很好的效果，一篇非常 solid 的工作，实验非常详细。_
>
> ![ViT架构图](/images/Pasted%20image%2020251008212240.png)

首先，提出了将图片（比如 224×224×3）直接切割为一定数量的 patch（比如 196 个 16×16 ），解决了图片直接拉平成向量之后数量太多无法传入 transformer 的问题，将每个 patch 中的向量展平并通过一个线性层进行 embed（变成 196 个 16×16×3=768），在 add 一个位置编码并在最前面concat 一个 class token，这里的 class token 在后面的自注意力层可以与图片向量交互，学习到图片的全局特征，在最后的分类任务中也是直接仅仅使用了这个 token 即可。将得到的 197 \* 768 传入 transformer，这里注意残差和归一化，经过 tranformer 层后该模型的预训练部分就结束了，后面的下游操作就可以根据需要微调了。

论文中还尝试了一维二维和相对位置编码，效果类似；class token 与 GAP 效果也类似，另外在自注意力方面使用行自注意力加 MLP，然后是列自注意力加 MLP，更好的处理二维向量。

这篇经典的论文主要就是挖了一个坑，对于下游的具体可以实现什么功能没有做太多的论述，主要还是提出了一个将 transformer 用于 cv 领域的思路。

<br>

## 视觉语言模型 CLIP

> [!IMPORTANT] CLIP
> **Arxiv：**[2103.00020](https://arxiv.org/pdf/2103.00020)
>
> **翻译**：[2103.00020](https://hjfy.top/arxiv/2103.00020)
>
> **代码：**[https://github.com/openai/CLIP](https://github.com/openai/CLIP)
>
> ==🔆双编码器，两个 Encoder 将图片与文本对应，对比学习==
>
> 一种 zero-shot预训练模型，自然语言监督
>
> ![CLIP架构图](/images/Pasted%20image%2020251010221331.png)

训练的就是两个 Encoder，image_encoder - ResNet or Vision Transformer ，text_encoder - CBOW or Text Transformer，将图片和文本编码到一个维度上，对角线上的即为正样本，进行 L2 归一化以计算余弦相似度，通过对比学习分别计算两个loss，总loss 就是 image 和 text 的 loss 的平均值，这里比较有意思的点就是可以直接通过余弦相似度将多模态映射到同一纬度计算，测试的时候比较有意思的是将每个单独的类别单词加描述该数据集的 prompt，因为在 textEncoder 学习的时候就是一个描述性句子，所以传入的时候用 prompt 包裹更接近训练分布，最后计算和图片的余弦相似度，在测试阶段可以实现 zero-shot。

论文中还提到对于一些复杂的数据集，zero-shot 效果不好，于是作者尝试了Few-shot 方法，一种是Linear porbe，把两个 encoder冻住，不让他们学习内容，仅提取特征后传入一个线性层，最后只学习一层线性层；而finetuning 方法则是端到端，在下游任务下微调模型，最后还是选择了 linear probe。

<br>

## ViLT

> [!NOTE] ViLT
> **Arxiv** [2102.03334](https://arxiv.org/abs/2102.03334)
>
> **翻译** [2102.03334](https://hjfy.top/arxiv/2102.03334)
>
> ==🔆实现轻量化，视觉与语言对称编码，抛弃图像上的 CNN==
>
> ![ViLT架构图](/images/Pasted%20image%2020251011214348.png)

预训练模型，在图像部分上作了改进，原来的图像部分都是用的目标检测模型，先通过 CNN 提取特征，再通过 RPN 网络抽取一些 Roi，接着用 NMS 对 Roi 减少数量， Roi 的数量就是序列的长度，最后在通过一个 roi head，这种方法也就是dual-stream approaches。而 ViLt 使用的是 single-stream，也就是只有一个模型，将视觉与语言对称编码，使用相同的方法，与 ViT 在图像上的处理方法相同，将 patch 当作 token，之后加深了交互功能，模型思路很简单，在分类和检索上都有很强泛化性。

另外还运用了 nlp 中的整词编码; 并运用了数据增强 RandAugment，但去掉了 color inversion 和 cutout，否则无法匹配到文本，这也是一个很大的进步。

把视觉语言模型分类，其中 Clip 属于图 b，对于交互上仅仅使用了点乘，ViLT 属于图 d。

![视觉语言模型分类](/images/Pasted%20image%2020251011214403.png)

## ALBEF

> [!NOTE] ALBEF
> **Arxiv** [2107.07651](https://arxiv.org/abs/2107.07651)
>
> **翻译**[2107.07651](https://hjfy.top/arxiv/2107.07651)
>
> ==🔆在 fusion 前的 ITC loss+动态蒸馏==
>
> ![ALBEF架构图](/images/Pasted%20image%2020251013205402.png)

ALBEF 的 loss 分为三块，ITC loss 在 embed 但是没有 fusion 的 image 和 text 上计算 loss，同时得出一些负样本，这个负样本可以用于后面 ITM 的 hard-negtive，之后 fusion 后做的 ITM 就是图片文本配对，但是通过传统的配对太简单，这里每个样本采一个 hard negative，增加难度，MLM loss 就是 BERT 里面经典的 mask。

另一个 idea 就是动态蒸馏了，作者观察到，对于 ITC 和 MLM 任务，在负样本上也有一些比 gt 更好的匹配，但在计算loss 时都被忽略了，所以就增加了一个 Momentum Model，这个model 的结构和主干是一样的，但是增长变化的慢一些，在这个 model 上，再计算一次在相似度，之后与原相似度做 KL 散度，得出在 mod 上的 ITC 和 MLM loss（把动量模型得到的预测/概率分布作为soft target），最后与原模型的loss做加权和，这样模型既能学习到正确的 gt，也能学习到被标记为负样本上的一些有用的特征。

## VLMO

> [!NOTE] VLMO
> **Arxiv**[2111.02358](https://arxiv.org/abs/2111.02358)
>
> **翻译**[2111.02358](https://hjfy.top/arxiv/2111.02358)
>
> ==🔆分阶段预训练策略，参数共享==
>
> ![VLMO架构图](/images/Pasted%20image%2020251013215939.png)

## BLIP

> [!NOTE] BLIP
> **Arxiv**[2201.12086](https://arxiv.org/abs/2201.12086)
>
> **翻译**[2201.12086](https://hjfy.top/arxiv/2201.12086)

## BLIP2

> [!NOTE] BLIP2
> **Arxiv** [2301.12597](https://arxiv.org/abs/2301.12597)
>
> **翻译**[2301.12597](https://hjfy.top/arxiv/2301.12597)

## CoCa

> [!NOTE] CoCa
> **Arxiv** [2205.01917](https://arxiv.org/abs/2205.01917)
>
> **翻译**[2205.01917](https://hjfy.top/arxiv/2205.01917)

## BEiT V3

> [!NOTE] BEiT V 3
> **Arxiv** [2208.10442](https://arxiv.org/abs/2208.10442)
>
> **翻译**[2208.10442](https://hjfy.top/arxiv/2208.10442)

## LLaVA

> [!NOTE] LLaVA
> **Arxiv**[2304.08485](https://arxiv.org/abs/2304.08485)
>
> **翻译**[2304.08485](https://hjfy.top/arxiv/2304.08485)

## Flamingo

> [!NOTE] Flamingo
> **Arxiv** [2204.14198](https://arxiv.org/abs/2204.14198)
>
> **翻译**[2204.14198](https://hjfy.top/arxiv/2204.14198)

## Visual Instruction Tuning

> [!NOTE] Visual Instruction Tuning
> **Arxiv** [2304.08485](https://arxiv.org/abs/2304.08485)
>
> **翻译**[2304.08485](https://hjfy.top/arxiv/2304.08485)

## Qwen-VL

> [!NOTE] Qwen-VL
> **Arxiv** [2308.12966](https://arxiv.org/abs/2308.12966)
>
> **翻译**[2308.12966](https://hjfy.top/arxiv/2308.12966)

## Gemini

> [!NOTE] Gemini
> **Arxiv** gemini_1_report.pdf

## GPT-4V

> [!NOTE] GPT-4V
> **Arxiv** GPTV_System_Card.pdf

## LISA

> [!NOTE] LISA
> **Arxiv** [2308.00692](https://arxiv.org/abs/2308.00692)
>
> **翻译**[2308.00692](https://hjfy.top/arxiv/2308.00692)

## Cambrian-1

> [!NOTE] Cambrian-1
> **Arxiv** [2406.16860](https://arxiv.org/abs/2406.16860)
>
> **翻译**[2406.16860](https://hjfy.top/arxiv/2406.16860)

## Qwen2-VL

> [!NOTE] Qwen2-VL
> **Arxiv** [2409.12191](https://arxiv.org/abs/2409.12191)
>
> **翻译**[2409.12191](https://hjfy.top/arxiv/2409.12191)

## Qwen2.5-VL

> [!NOTE] Qwen2.5-VL
> **Arxiv** [2502.13923](https://arxiv.org/abs/2502.13923)
>
> **翻译**[2502.13923](https://hjfy.top/arxiv/2502.13923)

## InstructBLIP

> [!NOTE] InstructBLIP
> **Arxiv** [2305.06500](https://arxiv.org/abs/2305.06500)
>
> **翻译**[2305.06500](https://hjfy.top/arxiv/2305.06500)

## LLaMA-Adapter

> [!NOTE] LLaMA-Adapter
> **Arxiv** [2303.16199](https://arxiv.org/abs/2303.16199)
>
> **翻译**[2303.16199](https://hjfy.top/arxiv/2303.16199)

## VisionLLM

> [!NOTE] VisionLLM
> **Arxiv** [2305.11175](https://arxiv.org/abs/2305.11175)
>
> **翻译**[2305.11175](https://hjfy.top/arxiv/2305.11175)

## SigLIP

> [!NOTE] SigLIP
> **Arxiv** [2303.15343](https://arxiv.org/abs/2303.15343)
>
> **翻译**[2303.15343](https://hjfy.top/arxiv/2303.15343)

## SigLIP 2

> [!NOTE] SigLIP 2
> **Arxiv** [2502.14786](https://arxiv.org/abs/2502.14786)
>
> **翻译**[2502.14786](https://hjfy.top/arxiv/2502.14786)

## LLaVA-OneVision

> [!NOTE] LLaVA-OneVision
> **Arxiv** [2408.03326](https://arxiv.org/abs/2408.03326)
>
> **翻译**[2408.03326](https://hjfy.top/arxiv/2408.03326)

## GPT 5

> [!NOTE] GPT 5
> **Arxiv** gpt5-system-card-aug7.pdf

> [!IMPORTANT] 笔者碎碎念
> 这篇笔记更完之后，后面还会继续更新关于RLHF应用在llm上相关的paper以及后续一些RL/LLM的学习笔记
>
> 笔者现在对RL很是感兴趣 😊
>
> 哦对，最近还会更新一个关于minimind的项目，小小期待一下 :) ！！（年前必更）
>
> 年前：minimind项目/mllm论文阅读/rl学习（cs224r）/目前手头卡住的ood项目推进
>
> Really a long way to go, anyway, keep healthy ,early sleep, early wake!
