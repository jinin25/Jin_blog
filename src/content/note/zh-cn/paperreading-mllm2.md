---
title: "PaperReading: MLLM2 - Foundation Models"
timestamp: 2026-01-31 00:00:00+08:00
series: PaperReading
tags: [MLLM, Paper]
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

## GPT-4o

> [!IMPORTANT] GPT-4o
> **发布** OpenAI
>
> **链接** [Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)

## GPT-4V

> [!IMPORTANT] GPT-4V
> **发布** OpenAI
>
> **PDF** [GPT-4V System Card](https://cdn.openai.com/papers/GPTV_System_Card.pdf)

## GPT-5

> [!IMPORTANT] GPT-5
> **发布** OpenAI
>
> **链接** [Introducing GPT-5](https://openai.com/index/introducing-gpt-5/)

# LLAMA 系列

## Llama 3.2

> [!IMPORTANT] Llama 3.2
> **发布** Meta
>
> **链接** [Llama 3.2 Blog](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/)
>
> **Demo** [Demo](https://huggingface.co/meta-llama/Llama-3.2-11B-Vision-Instruct)

## Llama 3 Herd

> [!IMPORTANT] Llama 3
> **Arxiv** [2407.21783](https://arxiv.org/abs/2407.21783)
>
> **翻译** [2407.21783](https://hjfy.top/arxiv/2407.21783)

## VideoLLaMA 3

> [!NOTE] VideoLLaMA 3
> **Arxiv** [2501.13106](https://arxiv.org/abs/2501.13106)
>
> **翻译** [2501.13106](https://hjfy.top/arxiv/2501.13106)
>
> **代码** [Github](https://github.com/DAMO-NLP-SG/VideoLLaMA3)
>
> **Demo** [Demo](https://huggingface.co/spaces/lixin4ever/VideoLLaMA3)

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



# LLAVA系列


## LLaVA

> [!IMPORTANT] LLaVA
> **Arxiv**[2304.08485](https://arxiv.org/abs/2304.08485)
>
> **翻译**[2304.08485](https://hjfy.top/arxiv/2304.08485)
>
> ==🔆linear连接==

![LLAVA](/image/LLAVA.png){.center style="width:85%;"}

一种有别于Flamingo的Q-former的范式，架构非常简单，就是在视觉和怨言模型之间直接用线性层连接。具体来说，训练分为两阶段，第一阶段pretrain，冻结语言模型和视觉模型，训练一个线性层，让线性层学会翻译，第二阶段finetune，解冻线性层和LLM，数据来源于GPT-4生成好的视觉描述。证明了视觉和语言的对齐不需要复杂的模块，或者说不应该将更多的注意力放在对齐视觉输出和语言输入上，而后的mllm模型大多用的都是这种范式。

## LLaVA-1.5

> [!NOTE] LLaVA-1.5
> **Arxiv** [2310.03744](https://arxiv.org/abs/2310.03744)
>
> **翻译** [2310.03744](https://hjfy.top/arxiv/2310.03744)
>
> ==🔆Linear -> mlp，适应高分辨率图片==
>
 ![LLAVA-1.5](/image/LLAVA_1_5_HD.png){.center style="width:85%;"}

在LLAVa上的改进工作，首先在架构上，将linear层改成了mlp层，引入了非线性。另外，在HD模型中，尝试了高分辨率图片输入，作者给出的方案是，一方面，将图片先split，对于每个patch做encode，然后展开，传入LLM，另一方面，直接将高分辨率图片压缩至低分标绿输入LLM，保证了全局性，是对高分辨率图像的一种好的处理方法。



## LLaVA-OneVision

> [!NOTE] LLaVA-OneVision
>
>  **Blog** [LLaVA-NeXT Blog](https://llava-vl.github.io/blog/)
> 
> **Arxiv** [2408.03326](https://arxiv.org/abs/2408.03326)
>
> **翻译**[2408.03326](https://hjfy.top/arxiv/2408.03326)
>
> ==🔆multi-patch，unified，适用于image/video/3D==


这是一篇对NeXT不同版本的总结，作者把注意力了放在了怎么处理其他模态的输入以及怎么实现一个unified模型。在架构上，首先，Anyres模块将视频的每一帧视为图片，先split再encode，为了handle more frams，使用了linear scaling ，这是一种类似于RoPE的旋转缩放的方式。另外，还增加了DPO的训练阶段，由于人工偏好很贵，所以这里作者使用LLM生成reward，先做 detailed caption（相当于把视频压缩成文本证据），再用文本 LLM 在“证据”上做评审/打分/偏好对生成，再做 DPO。

并且，实现了一个unified MLLM，可以支持多图像、 多帧（视频）、多视图（3D），并且，作者在实验中发现，将图片视频混合输入模型训练，效果是最好的。这篇最新的工作还提出了一个M4-Instruct的dataset，多图像，多模态数据集，是可以用于SFT的训练微调。

另外，LLaVA系列的blog里面，笔者最喜欢这篇[LLaVA-NeXT: What Else Influences Visual Instruction Tuning Beyond Data?](https://llava-vl.github.io/blog/2024-05-25-llava-next-ablations/)，数据对于MLLM的训练重要性毋庸置疑，但是在数据之外，架构训练策略之类因素不应该被忽略，作者通过消融实验，说明LLM 的模型尺寸扩展比图像编码器更能有效地提升性能。后者的性能提升更多地取决于其视觉输入配置（分辨率、标记数），而非模型尺寸。
视觉信号的表示与原始像素空间的分辨率和特征空间中的标记数量均相关，且缩放分辨率比缩放标记数量更有效，因此推荐使用带有池化的 AnyRes 策略。并且在学习策略上，引入一个专注于从高质量知识中学习的阶段至关重要，而非使用网络规模的低质量数据。也就是说，数据质量比数据量重要得多。


# Qwen 系列

## Qwen-VL

> [!IMPORTANT] Qwen-VL
> **Arxiv** [2308.12966](https://arxiv.org/abs/2308.12966)
>
> **翻译**[2308.12966](https://hjfy.top/arxiv/2308.12966)
>
> ==🔆Projecter：CrossAttn，box定位==

![Qwen-VL](/image/Qwen-vl.png){.center style="width:85%;"}

Qwen-vl主要把注意力放在了视觉编码器上，之前的工作在视觉上的编码都太过于粗糙，这篇工作主要就是对image做了一个更精细化的处理。首先
，在视觉与语言对齐上的Visual Resampler，使用的是corss-attn，和Flamingo 模型中的 Perceiver Resampler原理差不多，都是用一个可以学习的query与image_token产生的kv做cross-attn，这种做法对全局的学习能力更强，并且相比于llava中的mlp有一个好处，就是无论token多大，经过attn后，传入llm的都是query长度的token，不会造成token过多，但是也有可能造成一定信息丢失的问题，所以后续Qwen2-vl就直接抛弃了这种固定token传入llm的做法。

在数据的处理上，Qwen-VL还增加了对边界框的处理，对数据进一步格式化，具体来说，先将图像坐标缩放到 $[0, 1000)$ 的区间，让坐标变成一组标准化的数字，不受原始图片分辨率大小的影响。随后直接把坐标写成字符串，例如 (123,456),(789,999)。模型像读写普通文本一样处理这些数字。在数据中加入了<box> 和 </box>，中间插入表示边界框坐标，<ref> 和 </ref>，中间插入描述边界框内内容的文本。这种对数据的格式化处理，主要在第二阶段参与训练，也就是主要是为了让LLM学习到精细的坐标定位和视觉特征。

在训练上，主要三个阶段，第一阶段为视觉语言预训练，用大规模的图片文本对，让模型学会识别基础特征，第二阶段转向多任务的预训练，数据为大量高质量的 Grounding 数据（即带有坐标框的数据）、OCR 数据和高分辨率图片，为了学习细粒度的视觉感知和坐标定位
，最后一个阶段主要就是为了chat的模型，运用SFT让模型听得懂复杂的人类指令。前两个阶段的训练和llava不同,这里放开了视觉编码器，实现了双向微调，也就是用llm的定位能力去让视觉编码器更关注有效信息，相对而言，是回归了视觉。


## Qwen2-VL

> [!NOTE] Qwen2-VL
> **Arxiv** [2409.12191](https://arxiv.org/abs/2409.12191)
>
> **翻译**[2409.12191](https://hjfy.top/arxiv/2409.12191)
>
> ==🔆Naive Dynamic Resolution，M-RoPE ==
>

![Qwen2-VL架构](/image/Qwen2-VL_1.png){.center style="width:85%;"}

在架构上，Qwen2-VL并没有延续之前cross-attn的做法，这个在总结Qwen-VL的时候也提到，这种类似visual resampler的cross attn，会造成输出token数量固定，一方面会对于高分辨率图片，会造成信息丢失，另一方面，在处理多图输入时，每张图片都要占用固定token数量，很浪费上下文窗口的空间，所以Qwen2-vl采用了Naive Dynamic Resolution将图片转化为token，具体来说，在vit的卷积处理时，将图片切割为patch_size * patch_size的patch，然后flatten并经过一个mlp压缩，这样可以实现不同的分辨率占用不同长度的token，可以处理更高分辨率的图片了。

![M-RoPE](/image/Qwen2-VL_2.png){.center style="width:85%;"}

另外，在vision encoder中，我们采取切割patch的方法之后，原来的位置编码就失效了，所以作者引入了M-RoPE，简单来说，将维度分配了三个方向，时间、长度、宽度，在每个方向上做RoPE的旋转编码，这样一方面实现了对某个坐标的精准定位，另一方面，也是一种unified的模式，引入时间上的编码，对video很友好，作者在paper中也提到，模型可以理解20分钟的长视频。在这个unified的思想上，卷积使用的也是3D卷积，也就是对于视频，一次采取两帧，一起进行卷积处理（图片就copy一份，两张一起处理），可以处理更多的视频帧而不增加序列长度。

## Qwen2.5-VL

> [!NOTE] Qwen2.5-VL
> **Arxiv** [2502.13923](https://arxiv.org/abs/2502.13923)
>
> **翻译**[2502.13923](https://hjfy.top/arxiv/2502.13923)
>
> ==🔆绝对时间对齐，vision encoder改进，dpo后训练 ==
>
![Qwen2.5-VL](/image/Qwen2.5-VL.png){.center style="width:85%;"}

Qwen2.5-VL在很多细节上做了改进，先说架构上的，首先，不对图像坐标进行归一化了，而是直接使用图像的原始像素尺寸，使用绝对像素坐标，对物体真实的位置和大小有了很好的感知，对微小物体的精度有很大提升。另外，对M-RoPE进行改进，原来的时间轴衡量的是相对变化，也就是说对于10s的视频一帧会跨越1.0 秒，而对于1s的视频一帧只跨越了 0.1 秒，但这两种情况对于改进前的编码方式而言，T轴索引是相同的，所以这里做的改进就是用绝对的时间去编码时间，t = T/T单位，直接和绝对的时间成比例了。另外在工程上改进vision encoder，将视觉编码器的注意力改为窗口注意力，将视觉特征提取的复杂度降至线性，并将vision encoder尽可能向llm的架构靠拢，增加RMSNorm、SiLU激活等，并且还按 Token 总量而非样本数量分配任务，充分利用gpu

在训练方面，整体和原来的阶段差不多，只不过在第二阶段后增加长序列与复杂推理的训练，将上下文窗口长度增加到32K，并且在原来微调的第三阶段，运用大模型中的训练方式（SFT+DPO），SFT阶段使用的数据是通过用最强的模型（72B 版本）去当“考官”进行DAta Filtering之后的高质量数据，并在SFT阶段注入CoT，通过拒绝采样提纯数据，并且在SFT后用DPO对齐人类偏好


## Qwen3-VL

>[!NOTE] Qwen3-VL
>**Arxiv** [2511.21631](https://arxiv.org/abs/2511.21631)
>
>**翻译** [2511.21631](https://hjfy.top/arxiv/2511.21631)
>
>==🔆DeepStack 跨层融合机制，Interleaved MRoPE，训练阶段改进==

![Qwen3-VL](/image/Qwen3-VL.png){.center style="width:85%;"}

架构升级：

1.引入 Interleaved-MRoPE 以解决长视频理解中的频谱偏差问题。原有设计会将维度强行分配到三个方向，导致频率谱不平衡，也就是不同维度分配到的信息频率差异太大，所以Interleaved-MRoPE引入交错式设计交错分配t，w，h，提升了模型对长距离时空依赖的建模能力。

2.采用 DeepStack 机制将多层视觉特征注入 LLM 层以增强细粒度感知。传统的 VLM 通常仅将视觉编码器的**最终层**输出作为 LLM 的输入，这种方式可能丢失视觉编码器中间层包含的低级或细粒度视觉信息，所以这里让模型从视觉编码器的不同层级提取特征。这些多级特征经过专用的适配器投影后，通过轻量级的残差连接注入到 LLM 的前三层隐藏状态中。

3.视频时间对齐从绝对位置编码转变为基于文本的时间戳（Text-based Video Timestamps）。原有的Qwen2.5-VL使用绝对时间编码，这样对于长视频，绝对时间位置 ID 会变得非常大且稀疏，影响长上下文外推，同时需要对不同帧率（FPS）进行广泛采样以学习时间对应关系，增加了数据构建成本。所以在 Qwen3-VL 中，移除了基于位置编码的绝对时间对齐，转而采用显式文本时间戳 token。
每个视频时间片段前会插入格式化的文本字符串，例如 <3.0 seconds>。训练过程中，同时使用秒（Seconds）和时分秒（HMS）格式，以增强模型对不同时间表示的鲁棒性。
虽然这略微增加了上下文长度（Text tokens），但它提供了更直接的时间语义，有助于视频定位（Grounding）和密集描述（Dense Captioning）任务

在训练上，增加思考模式，Agentic模式，本质还是SFT+RL，只是数据不同，这篇工作构建的数据非常精细，很大一部分成功原因可以说归功于如此精细的数据工程





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


# Intern-VL

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
