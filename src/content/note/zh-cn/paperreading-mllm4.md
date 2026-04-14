---
title: "PaperReading: MLLM_4 - Multimodal o1 and R1"
timestamp: 2026-04-14 00:00:00+08:00
series: PaperReading
tags: [MLLM, Paper, Reasoning]
description: 多模态 o1 与 R1 路线论文阅读。
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

# Approaches of Multimodal-o1

## Macro-O1

> [!NOTE] Macro-O1 (2024c)
> **Arxiv** [2411.14405](https://arxiv.org/abs/2411.14405)
>
> **翻译** [2411.14405](https://hjfy.top/arxiv/2411.14405)
>
> **代码** [
>
> **Backbone** Qwen2-7B-Instruct
>
> **模态** T
>
> **推理范式** MCTS-guided Thinking
>
> **任务** Math, Translate

## llamaberry

> [!NOTE] llamaberry (2024b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=llamaberry&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=llamaberry&type=repositories)
>
> **Backbone** LLaMA-3.1-8B
>
> **模态** T
>
> **推理范式** MCTS-guided Thinking
>
> **任务** Math

## LLaVA CoT

> [!NOTE] LLaVA CoT (2024a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=LLaVA%20CoT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=LLaVA%20CoT&type=repositories)
>
> **Backbone** Llama-3.2V-11B-cot
>
> **模态** T, I
>
> **推理范式** Summary, Caption, Thinking
>
> **任务** Science, General

## LlamaV-o1

> [!NOTE] LlamaV-o1 (2025)
> **Arxiv** [2501.06186](https://arxiv.org/pdf/2501.06186)
>
> **翻译** [2501.06186](https://hjfy.top/arxiv/2501.06186)
>
> **代码** [Github Search](https://github.com/search?q=LlamaV-o1&type=repositories)
>
> **Backbone** Llama-3.2V-11B-cot
>
> **模态** T, I
>
> **推理范式** Summary, Caption, Thinking
>
> **任务** Science, General

## Mulberry

> [!NOTE] Mulberry (2024a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Mulberry&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Mulberry&type=repositories)
>
> **Backbone** Llama-3.2V-11B-cot / LLaVA-Next-8B / Qwen2-VL-7B
>
> **模态** T, I
>
> **推理范式** Caption, Rationales, Thinking
>
> **任务** Math, General

## RedStar Geo

> [!NOTE] RedStar Geo (2025a)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=RedStar%20Geo&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=RedStar%20Geo&type=repositories)
>
> **Backbone** InternVL2-8B
>
> **模态** T, I
>
> **推理范式** Long-Thinking
>
> **任务** Math

## RBF++

> [!NOTE] RBF++ (2025d)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=RBF%2B%2B&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=RBF%2B%2B&type=repositories)
>
> **Backbone** LLaMA3-8B-Instruct
>
> **模态** T
>
> **推理范式** SR-MCTS + PPRM
>
> **任务** Math

<br>

# Approaches of Multimodal-R1

## RLHF-V

> [!NOTE] RLHF-V (2024a)
> **Arxiv** [2312.00849](https://arxiv.org/abs/2312.00849)
>
> **翻译** [2312.00849](https://hjfy.top/arxiv/2312.00849)
>
> **代码** [Github Search](https://github.com/search?q=RLHF-V&type=repositories)
>
> **Backbone** LLaVA-13B
>
> **RL算法** DPO
>
> **模态** T, I
>
> **任务** VQA

## InternVL2.5

> [!NOTE] InternVL2.5 (2024g)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=InternVL2.5&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=InternVL2.5&type=repositories)
>
> **Backbone** InternVL
>
> **RL算法** MPO(DPO)
>
> **模态** T, I
>
> **任务** VQA

## Insight-V

> [!NOTE] Insight-V (2024b)
> **Arxiv** [2411.14432](https://arxiv.org/abs/2411.14432)
>
> **翻译** [2411.14432](https://hjfy.top/arxiv/2411.14432)
>
> **代码** [Github](https://github.com/dongyh20/Insight-V)
>
> **Backbone** LLaMA3-LLaVA Next-DPO
>
> **RL算法** DPO
>
> **模态** T, I
>
> **任务** VQA

## LLaVA-Reasoner DPO

> [!NOTE] LLaVA-Reasoner DPO (2024e)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=LLaVA-Reasoner%20DPO&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=LLaVA-Reasoner%20DPO&type=repositories)
>
> **Backbone** LLaMA3-LLaVA Next
>
> **RL算法** DPO
>
> **模态** T, I
>
> **任务** VQA

## VLM-R1

> [!NOTE] VLM-R1 (2025b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=VLM-R1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=VLM-R1&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Grounding, Math, Open Vocabulary Detection

## R1-V

> [!NOTE] R1-V (2025c)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=R1-V&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=R1-V&type=repositories)
>
> **Backbone** Qwen2-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Counting, Math

## MM-EUREKA

> [!NOTE] MM-EUREKA (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=MM-EUREKA&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=MM-EUREKA&type=repositories)
>
> **Backbone** InternVL2.5
>
> **RL算法** RLOO
>
> **模态** T, I
>
> **任务** Math

## MM-EUREKA Qwen

> [!NOTE] MM-EUREKA Qwen (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=MM-EUREKA%20Qwen&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=MM-EUREKA%20Qwen&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Math

## Video-R1

> [!NOTE] Video-R1 (2025b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Video-R1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Video-R1&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I, V
>
> **任务** VideoVQA

## LMM-R1

> [!NOTE] LMM-R1 (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=LMM-R1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=LMM-R1&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** PPO
>
> **模态** T, I
>
> **任务** Math

## Vision-R1

> [!NOTE] Vision-R1 (2025c)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Vision-R1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Vision-R1&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Math

## Visual-RFT

> [!NOTE] Visual-RFT (2025l)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Visual-RFT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Visual-RFT&type=repositories)
>
> **Backbone** Qwen2-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Detection, Classification

## R1-OneVision

> [!NOTE] R1-OneVision (2025g)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=R1-OneVision&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=R1-OneVision&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Math, Science, General, Doc

## Seg-Zero

> [!NOTE] Seg-Zero (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Seg-Zero&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Seg-Zero&type=repositories)
>
> **Backbone** Qwen2.5-VL, SAM2
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Grounding

## VisualThinker-R1 Zero

> [!NOTE] VisualThinker-R1 Zero (2025b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=VisualThinker-R1%20Zero&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=VisualThinker-R1%20Zero&type=repositories)
>
> **Backbone** Qwen2-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Spatial Reasoning

## STAR-R1

> [!NOTE] STAR-R1 (2025q)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=STAR-R1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=STAR-R1&type=repositories)
>
> **Backbone** Qwen2.5-VL-7B
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Spatial Reasoning

## R1-Omni

> [!NOTE] R1-Omni (2025d)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=R1-Omni&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=R1-Omni&type=repositories)
>
> **Backbone** HumanOmni
>
> **RL算法** GRPO
>
> **模态** T, I, A, V
>
> **任务** emotion recognition

## OThink-MR1

> [!NOTE] OThink-MR1 (2025k)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=OThink-MR1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=OThink-MR1&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Counting, Math

## Multimodal-Open R1

> [!NOTE] Multimodal-Open R1 (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Multimodal-Open%20R1&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Multimodal-Open%20R1&type=repositories)
>
> **Backbone** Qwen2-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Math

## Reason-RFT

> [!NOTE] Reason-RFT (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Reason-RFT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Reason-RFT&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Counting, Structure Perception, Spatial Transformation

## VL-Rethinker

> [!NOTE] VL-Rethinker (2025i)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=VL-Rethinker&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=VL-Rethinker&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO + SSR
>
> **模态** T, I
>
> **任务** Mathematical, Scientific, Real-world Reasoning

## Curr-ReFT

> [!NOTE] Curr-ReFT (2025b)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Curr-ReFT&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Curr-ReFT&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** GRPO
>
> **模态** T, I
>
> **任务** Detection, Classification, Math

## Open-R1-Video

> [!NOTE] Open-R1-Video (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=Open-R1-Video&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=Open-R1-Video&type=repositories)
>
> **Backbone** Qwen2-VL
>
> **RL算法** GRPO
>
> **模态** T, I, V
>
> **任务** VideoVQA

## VisRL

> [!NOTE] VisRL (2025l)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=VisRL&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=VisRL&type=repositories)
>
> **Backbone** Qwen2.5-VL
>
> **RL算法** DPO
>
> **模态** T, I
>
> **任务** VQA

## R1-VL

> [!NOTE] R1-VL (2025g)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=R1-VL&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=R1-VL&type=repositories)
>
> **Backbone** Qwen2-VL
>
> **RL算法** StepGRPO
>
> **模态** T, I
>
> **任务** Math, ChartQA

## SARI

> [!NOTE] SARI (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=SARI&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=SARI&type=repositories)
>
> **Backbone** Qwen2-Audio-7B-Instruct
>
> **RL算法** GRPO
>
> **模态** A, T
>
> **任务** MCQA

## SpaceR

> [!NOTE] SpaceR (2025)
> **Arxiv** [Arxiv Search](https://arxiv.org/search/?query=SpaceR&searchtype=all&source=header)
>
> **翻译** 待补充
>
> **代码** [Github Search](https://github.com/search?q=SpaceR&type=repositories)
>
> **Backbone** Qwen2.5-VL-7B
>
> **RL算法** SG RLVR(GRPO)
>
> **模态** T, I, V
>
> **任务** Video Spatial Reasoning
