---
title: "PaperReading: MLLM2 - Foundation Models"
timestamp: 2026-01-31 00:00:00+08:00
series: PaperReading
tags: [MLLM, Paper, Foundation]
description: 多模态基础模型相关论文阅读。
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

# GPT系列

## GPT-4

> [!IMPORTANT] GPT-4
> **Arxiv** [2303.08774](https://arxiv.org/abs/2303.08774)
>
> **翻译** [2303.08774](https://hjfy.top/arxiv/2303.08774)
>

## GPT-4o

> [!IMPORTANT] GPT-4o
> **发布** OpenAI
>
> **链接** [Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)
>

## GPT-4V

> [!IMPORTANT] GPT-4V
> **发布** OpenAI
>
> **PDF** [GPT-4V System Card](https://cdn.openai.com/papers/GPTV_System_Card.pdf)
>

## GPT-5

> [!IMPORTANT] GPT-5
> **发布** OpenAI
>
> **链接** [Introducing GPT-5](https://openai.com/index/introducing-gpt-5/)

# LLAMA LLAVA系列

## Llama 3.2

> [!IMPORTANT] Llama 3.2
> **发布** Meta
>
> **链接** [Llama 3.2 Blog](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/)
>
> **Demo** [Demo](https://huggingface.co/meta-llama/Llama-3.2-11B-Vision-Instruct)
>

## Llama 3 Herd

> [!IMPORTANT] Llama 3
> **Arxiv** [2407.21783](https://arxiv.org/abs/2407.21783)
>
> **翻译** [2407.21783](https://hjfy.top/arxiv/2407.21783)
>

## VideoLLaMA 3

> [!NOTE] VideoLLaMA 3
> **Arxiv** [2501.13106](https://arxiv.org/abs/2501.13106)
>
> **翻译** [2501.13106](https://hjfy.top/arxiv/2501.13106)
>
> **代码** [Github](https://github.com/DAMO-NLP-SG/VideoLLaMA3)
>
> **Demo** [Demo](https://huggingface.co/spaces/lixin4ever/VideoLLaMA3)


## LLaVA

> [!NOTE] LLaVA
> **Arxiv**[2304.08485](https://arxiv.org/abs/2304.08485)
>
> **翻译**[2304.08485](https://hjfy.top/arxiv/2304.08485)
> 
> ==🔆==

## LLaVA-OneVision

> [!NOTE] LLaVA-OneVision
> **Arxiv** [2408.03326](https://arxiv.org/abs/2408.03326)
>
> **翻译**[2408.03326](https://hjfy.top/arxiv/2408.03326)

## LLaMA-Adapter

> [!NOTE] LLaMA-Adapter
> **Arxiv** [2303.16199](https://arxiv.org/abs/2303.16199)
>
> **翻译**[2303.16199](https://hjfy.top/arxiv/2303.16199)
>
> ==🔆prompt Adapter, 对注意力分数进行门控==

![LLAMA-Adapter](/image/LLAMA_Adapter.png){.center style="width:85%;"}

这是一篇在Alpaca之后的工作，在微调上，Alpaca主要做的就是对LLAMA全量进行微调，而这篇Adapter的工作对LLAMA本身参数冻结，在中后期的Transformer，每层增加一个Adapter从0开始进行提示词微调，具体来说，用最后一个预测的token做Q，prompt+text+token做KV，之后Adapter，原model分别softmax，并用gate控制Adapter的权重，最后相加得到Attention 分数，公式如下：$$S_g^l = \left[ \text{softmax}(S_l^K) \cdot \tanh(g_l);\ \text{softmax}(S_l^{M+1}) \right]^T$$，实现了轻量化微调，并且把gate机制融入了attention，这是Flamingo没有做到的。

另外，在多模态上，作者只是将不同尺度image作为token，拼接转化维度和prompt相加拼接，相当于把image当成prompt传入模型了，也是充分利用了Adapter的优势，是一个很好的角度，在提示词工程的多模态扩展中，可以把图片信息融入提示词中。


# Qwen 系列
## Qwen-VL

> [!NOTE] Qwen-VL
> **Arxiv** [2308.12966](https://arxiv.org/abs/2308.12966)
>
> **翻译**[2308.12966](https://hjfy.top/arxiv/2308.12966)

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

# Claude
## Claude 3

> [!IMPORTANT] Claude 3
> **发布** Anthropic
>
> **PDF** [Claude 3 Model Card](https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf)

# Gemini系列

## Gemini

> [!IMPORTANT] Gemini
> **发布** Google
>
> **PDF** [Gemini 1 Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf)


## Gemini 1.5

> [!IMPORTANT] Gemini 1.5
> **发布** Google
>
> **PDF** [Gemini 1.5 Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf)


# Deepseek
Coming Soon~


# Others
## Emu3

> [!NOTE] Emu3
> **Arxiv** [2409.18869](https://arxiv.org/abs/2409.18869)
>
> **翻译** [2409.18869](https://hjfy.top/arxiv/2409.18869)
>
> **代码** [Github](https://github.com/baaivision/Emu3)



## Pixtral-12B

> [!NOTE] Pixtral-12B
> **发布** Mistral
>
> **链接** [Pixtral-12B](https://mistral.ai/news/pixtral-12b/)

## xGen-MM (BLIP-3)

> [!NOTE] BLIP-3
> **Arxiv** [2408.08872](https://arxiv.org/abs/2408.08872)
>
> **翻译** [2408.08872](https://hjfy.top/arxiv/2408.08872)
>
> **代码** [Github](https://github.com/salesforce/LAVIS/tree/xgen-mm)



## Chameleon

> [!NOTE] Chameleon
> **Arxiv** [2405.09818](https://arxiv.org/abs/2405.09818)
>
> **翻译** [2405.09818](https://hjfy.top/arxiv/2405.09818)







## Fuyu-8B

> [!NOTE] Fuyu-8B
> **发布** Adept
>
> **链接** [Fuyu-8B Blog](https://www.adept.ai/blog/fuyu-8b)
>
> **模型** [Huggingface](https://huggingface.co/adept/fuyu-8b)
>
> **Demo** [Demo](https://huggingface.co/adept/fuyu-8b)

## UnIVAL

> [!NOTE] UnIVAL
> **Arxiv** [2307.16184](https://arxiv.org/abs/2307.16184)
>
> **翻译** [2307.16184](https://hjfy.top/arxiv/2307.16184)
>
> **代码** [Github](https://github.com/mshukor/UnIVAL)
>
> **Demo** [Demo](https://huggingface.co/spaces/mshukor/UnIVAL)

## PaLI-3

> [!NOTE] PaLI-3
> **Arxiv** [2310.09199](https://arxiv.org/abs/2310.09199)
>
> **翻译** [2310.09199](https://hjfy.top/arxiv/2310.09199)



## LaVIT

> [!NOTE] LaVIT
> **Arxiv** [2309.04669](https://arxiv.org/abs/2309.04669)
>
> **翻译** [2309.04669](https://hjfy.top/arxiv/2309.04669)
>
> **代码** [Github](https://github.com/jy0205/LaVIT)

## Multimodal Foundation Models Survey

> [!TIP] Survey
> **Arxiv** [2309.10020](https://arxiv.org/abs/2309.10020)
>
> **翻译** [2309.10020](https://hjfy.top/arxiv/2309.10020)

## BLIText

> [!NOTE] BLIText
> **Arxiv** [2307.07063](https://arxiv.org/abs/2307.07063)
>
> **翻译** [2307.07063](https://hjfy.top/arxiv/2307.07063)
>
> **代码** [Github](https://github.com/yiren-jian/BLIText)

## Kosmos-2

> [!NOTE] Kosmos-2
> **Arxiv** [2306.14824](https://arxiv.org/abs/2306.14824)
>
> **翻译** [2306.14824](https://hjfy.top/arxiv/2306.14824)
>
> **代码** [Github](https://github.com/microsoft/unilm/tree/master/kosmos-2)
>
> **Demo** [Demo](https://aka.ms/kosmos-2-demo)

## VPGTrans

> [!NOTE] VPGTrans
> **Arxiv** [2305.01278](https://arxiv.org/abs/2305.01278)
>
> **翻译** [2305.01278](https://hjfy.top/arxiv/2305.01278)
>
> **代码** [Github](https://github.com/VPGTrans/VPGTrans)
>
> **Demo** [Demo](https://3fc7715dbc44234a7f.gradio.live/)



## PaLM-E

> [!NOTE] PaLM-E
> **Arxiv** [2303.03378](https://arxiv.org/abs/2303.03378)
>
> **翻译** [2303.03378](https://hjfy.top/arxiv/2303.03378)
>
> **Demo** [Demo](https://palm-e.github.io/#demo)

## Prismer

> [!NOTE] Prismer
> **Arxiv** [2303.02506](https://arxiv.org/abs/2303.02506)
>
> **翻译** [2303.02506](https://hjfy.top/arxiv/2303.02506)
>
> **代码** [Github](https://github.com/NVlabs/prismer)
>
> **Demo** [Demo](https://huggingface.co/spaces/lorenmt/prismer)

## Kosmos-1

> [!NOTE] Kosmos-1
> **Arxiv** [2302.14045](https://arxiv.org/abs/2302.14045)
>
> **翻译** [2302.14045](https://hjfy.top/arxiv/2302.14045)
>
> **代码** [Github](https://github.com/microsoft/unilm)

## VIMA

> [!NOTE] VIMA
> **Arxiv** [2210.03094](https://arxiv.org/abs/2210.03094)
>
> **翻译** [2210.03094](https://hjfy.top/arxiv/2210.03094)
>
> **代码** [Github](https://github.com/vimalabs/VIMA)

## MineDojo

> [!NOTE] MineDojo
> **Arxiv** [2206.08853](https://arxiv.org/abs/2206.08853)
>
> **翻译** [2206.08853](https://hjfy.top/arxiv/2206.08853)
>
> **代码** [Github](https://github.com/MineDojo/MineDojo)

## DaVinci

> [!NOTE] DaVinci
> **Arxiv** [2206.07699](https://arxiv.org/abs/2206.07699)
>
> **翻译** [2206.07699](https://hjfy.top/arxiv/2206.07699)
>
> **代码** [Github](https://github.com/shizhediao/DaVinci)

## MetaLM

> [!NOTE] MetaLM
> **Arxiv** [2206.06336](https://arxiv.org/abs/2206.06336)
>
> **翻译** [2206.06336](https://hjfy.top/arxiv/2206.06336)
>
> **代码** [Github](https://github.com/microsoft/unilm)

