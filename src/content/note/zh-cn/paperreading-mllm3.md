---
title: "PaperReading: MLLM_3 - Cross-Modal Reasoning"
timestamp: 2026-04-14 00:00:00+08:00
series: PaperReading
tags: [MLLM, Paper, Reasoning]
description: Cross-Modal Reasoning 相关论文阅读。
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

## IdealGPT

> [!NOTE] IdealGPT (2023)
> **Arxiv** [2305.14985](https://arxiv.org/abs/2305.14985)
>
> **翻译** [2305.14985](https://hjfy.top/arxiv/2305.14985)
>
> **代码** [Github Search](https://github.com/search?q=IdealGPT&type=repositories)
>
> **模态** T, I
>
> **推理方式** 通过 GPT 迭代分解图像问题并回答子问题
>
> **任务** VQA, Text Entailment

## AssistGPT

> [!NOTE] AssistGPT (2023)
> **Arxiv** [2306.08640](https://arxiv.org/abs/2306.08640)
>
> **翻译** [2306.08640](https://hjfy.top/arxiv/2306.08640)
>
> **代码** [Github](https://github.com/showlab/assistgpt)
>
> **模态** T, I, V
>
> **推理方式** Plan-Execute-Inspect + 外部工具协同
>
> **任务** VQA, Causal Reasoning

## ProViQ

> [!NOTE] ProViQ (2024)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=ProViQ&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=ProViQ&type=repositories)
>
> **模态** T, V
>
> **推理方式** 生成并执行 Python 程序处理视频子任务
>
> **任务** VideoVQA

## MM-REACT

> [!NOTE] MM-REACT (2023)
> **Arxiv** [2303.11381](https://arxiv.org/abs/2303.11381)
>
> **翻译** [2303.11381](https://hjfy.top/arxiv/2303.11381)
>
> **代码** [Github Search](https://github.com/search?q=MM-REACT&type=repositories)
>
> **模态** T, I, V
>
> **推理方式** 调用 CV 工具处理图像/视频子任务
>
> **任务** VQA, VideoVQA

## VisualReasoner

> [!NOTE] VisualReasoner (2024a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=VisualReasoner&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=VisualReasoner&type=repositories)
>
> **模态** T, I
>
> **推理方式** Least-to-Most 多步视觉推理 + 外部 CV 工具 + 数据合成
>
> **任务** GQA, VQA

## Multi-model thought

> [!NOTE] Multi-model thought (2025a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Multi-model%20thought&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Multi-model%20thought&type=repositories)
>
> **模态** T, I
>
> **推理方式** 外部工具 (Visual Sketchpad)
>
> **任务** Geometry, Math, VQA

## FaST

> [!NOTE] FaST (2024a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=FaST&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=FaST&type=repositories)
>
> **模态** T, I
>
> **推理方式** 系统切换适配器 (快思考/慢思考机制)
>
> **任务** VQA

## ICoT

> [!NOTE] ICoT (2024a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=ICoT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=ICoT&type=repositories)
>
> **模态** T, I
>
> **推理方式** ADS 生成交错视觉-文本推理链
>
> **任务** VQA

## Image-of-Thought

> [!NOTE] Image-of-Thought (2024b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Image-of-Thought&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Image-of-Thought&type=repositories)
>
> **模态** T, I
>
> **推理方式** IoT Prompting 分步提取视觉 rationale
>
> **任务** VQA

## CoTDiffusion

> [!NOTE] CoTDiffusion (2024a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=CoTDiffusion&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=CoTDiffusion&type=repositories)
>
> **模态** T, I
>
> **推理方式** 外部算法生成子目标图像后执行动作
>
> **任务** Robotics

## T-SciQ

> [!NOTE] T-SciQ (2024e)
> **Arxiv** [2305.03453](https://arxiv.org/abs/2305.03453)
>
> **翻译** [2305.03453](https://hjfy.top/arxiv/2305.03453)
>
> **代码** [Github Search](https://github.com/search?q=T-SciQ&type=repositories)
>
> **模态** T, I
>
> **推理方式** 模型内生推理能力 (Model-Intrinsic)
>
> **任务** ScienceQA

## Visual-CoT

> [!NOTE] Visual-CoT (2023)
> **Arxiv** [2403.16999](https://arxiv.org/abs/2403.16999)
>
> **翻译** [2403.16999](https://hjfy.top/arxiv/2403.16999)
>
> **代码** [Github](https://github.com/deepcs233/Visual-CoT)
>
> **模态** T, I
>
> **推理方式** 模型内生推理能力 (Model-Intrinsic)
>
> **任务** VQA, DocQA, ChartQA

## VoCoT

> [!NOTE] VoCoT (2024m)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=VoCoT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=VoCoT&type=repositories)
>
> **模态** T, I
>
> **推理方式** 模型内生推理能力 (Model-Intrinsic)
>
> **任务** VQA

## MVoT

> [!NOTE] MVoT (2025b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=MVoT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=MVoT&type=repositories)
>
> **模态** T, I
>
> **推理方式** 模型内生推理能力 (Model-Intrinsic)
>
> **任务** Spatial Reasoning
