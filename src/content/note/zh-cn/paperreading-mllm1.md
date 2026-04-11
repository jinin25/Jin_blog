---
title: "PaperReading: MLLM_1"
timestamp: 2026-01-24 02:22:48+08:00
updated: 2026-02-04 19:19:00+08:00
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

![ViT架构图](/image/Pasted-image-20251008212240.png)

首先，提出了将图片（比如 224×224×3）直接切割为一定数量的 patch（比如 196 个 16×16 ），解决了图片直接拉平成向量之后数量太多无法传入 transformer 的问题，将每个 patch 中的向量展平并通过一个线性层进行 embed（变成 196 个 16×16×3=768），在 add 一个位置编码并在最前面concat 一个 class token，这里的 class token 在后面的自注意力层可以与图片向量交互，学习到图片的全局特征，在最后的分类任务中也是直接仅仅使用了这个 token 即可。将得到的 197 \* 768 传入 transformer，这里注意残差和归一化，经过 tranformer 层后该模型的预训练部分就结束了，后面的下游操作就可以根据需要微调了。

论文中还尝试了一维二维和相对位置编码，效果类似；class token 与 GAP 效果也类似，另外在自注意力方面使用行自注意力加 MLP，然后是列自注意力加 MLP，更好的处理二维向量。

这篇经典的论文主要就是挖了一个坑，对于下游的具体可以实现什么功能没有做太多的论述，主要还是提出了一个将 transformer 用于 cv 领域的思路。

<br>

## CLIP

> [!IMPORTANT] CLIP
> **Arxiv：**[2103.00020](https://arxiv.org/pdf/2103.00020)
>
> **翻译**：[2103.00020](https://hjfy.top/arxiv/2103.00020)
>
> **代码：**[https://github.com/openai/CLIP](https://github.com/openai/CLIP)
>
> ==🔆双编码器，两个 Encoder 将图片与文本对应，对比学习==
>
> _一种 zero-shot预训练模型，自然语言监督_

![CLIP架构图](/image/Pasted-image-20251010221331.png)

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

![ViLT架构图](/image/Pasted-image-20251011214348.png)

预训练模型，在图像部分上作了改进，原来的图像部分都是用的目标检测模型，先通过 CNN 提取特征，再通过 RPN 网络抽取一些 Roi，接着用 NMS 对 Roi 减少数量， Roi 的数量就是序列的长度，最后在通过一个 roi head，这种方法也就是dual-stream approaches。而 ViLt 使用的是 single-stream，也就是只有一个模型，将视觉与语言对称编码，使用相同的方法，与 ViT 在图像上的处理方法相同，将 patch 当作 token，之后加深了交互功能，模型思路很简单，在分类和检索上都有很强泛化性。

另外还运用了 nlp 中的整词编码; 并运用了数据增强 RandAugment，但去掉了 color inversion 和 cutout，否则无法匹配到文本，这也是一个很大的进步。

把视觉语言模型分类，其中 Clip 属于图 b，对于交互上仅仅使用了点乘，ViLT 属于图 d。

![视觉语言模型分类](/image/Pasted-image-20251011214403.png)

## ALBEF

> [!TIP] ALBEF
> **Arxiv** [2107.07651](https://arxiv.org/abs/2107.07651)
>
> **翻译**[2107.07651](https://hjfy.top/arxiv/2107.07651)
>
> ==🔆在 fusion 前的 ITC loss+动态蒸馏==

![ALBEF架构图](/image/Pasted-image-20251013205402.png){.center style="width:85%;"}

ALBEF 的 loss 分为三块，ITC loss 在 embed 但是没有 fusion 的 image 和 text 上计算 loss，同时得出一些负样本，这个负样本可以用于后面 ITM 的 hard-negtive，之后 fusion 后做的 ITM 就是图片文本配对，但是通过传统的配对太简单，这里每个样本采一个 hard negative，增加难度，MLM loss 就是 BERT 里面经典的 mask。

另一个 idea 就是动态蒸馏了，作者观察到，对于 ITC 和 MLM 任务，在负样本上也有一些比 gt 更好的匹配，但在计算loss 时都被忽略了，所以就增加了一个 Momentum Model，这个model 的结构和主干是一样的，但是增长变化的慢一些，在这个 model 上，再计算一次在相似度，之后与原相似度做 KL 散度，得出在 mod 上的 ITC 和 MLM loss（把动量模型得到的预测/概率分布作为soft target），最后与原模型的loss做加权和，这样模型既能学习到正确的 gt，也能学习到被标记为负样本上的一些有用的特征。

## VLMO

> [!NOTE] VLMO
> **Arxiv**[2111.02358](https://arxiv.org/abs/2111.02358)
>
> **翻译**[2111.02358](https://hjfy.top/arxiv/2111.02358)
>
> ==🔆参数共享, 分阶段预训练策略, Unified框架==

![VLMO架构图](/image/Pasted-image-20251013215939.png){.center style="width:80%;"}

MOME Transformer主要思路就是把image /text /text+image 的ffn彻底分割，但**共享同一个底层的self attention**，非常灵活，这也说明了transformer底层参数有很大的利用价值，后续的工作受到这点启发后，大大减少了参数量。

另外，分阶段预训练的思想也很有意思，对于文本和图片分别用他们的数据集单独训练，之后再联合起来训练VL-FFN（这里在L-FFN的训练上使用的是V-FFN的transformer参数并冻结，这个现象比较有趣），这种隔离各个部分的思想其实还是受到clip之类的启发，显存需求大但比较灵活

![分阶段预训练](/image/vlmo.png)

## BLIP

> [!NOTE] BLIP
> **Arxiv**[2201.12086](https://arxiv.org/abs/2201.12086)
>
> **翻译**[2201.12086](https://hjfy.top/arxiv/2201.12086)
>
> ==🔆MED模型，CapFilt数据清洗==

![BLIP架构图](/image/BLip1_1.png)

BLIP出现前，只使用encoder架构的mllm模型无法直接转移到生成任务上，使用encoder-decoder的模型对decoder的挖掘又不够充分，而BLIP则实现了将encoder生成的内容直接用于生成任务，并首次用于检索任务。

在架构上，BLIP和ALBEF类似，计算ITC和ITM的部分相同，但借鉴VLMO共享参数的思想并扩展，将相同场景下的SA/FFN部分共享参数，另外，为了更好适应生成任务，在decoder部分使用LM loss, 而非MLM loss，和VLMO一样，追求的也是一种unified模型，也就是用一个模型实现多种任务。

![CapFilt数据处理](/image/Blip1_2.png)

在数据清理上，Blip提出了CapFilt方法，由于MLLM的训练需要的好的数据量越大越好，所以如何充分利用质量一般的数据就是一个难点，而Blip本身就可以对图像生成文字描述，那么为什么不能将这些描述替换质量一般的描述呢？所以作者就另外增加了cap和filt模块，初始化来自前面的MED模型，并用人工标注的数据集微调，cap使用LM loss生成描述，随后模型生成的描述和原本质量一般的描述一起传入filt，filt使用ITM ITC loss判断描述与图片是否匹配并过滤不匹配的样本，最后留下质量高的一批数据，按照paper中的说法，是一种自举法，当然这种自我过滤的方法生成text的质量也确实很高。

## Flamingo

> [!NOTE] Flamingo
> **Arxiv** [2204.14198](https://arxiv.org/abs/2204.14198)
>
> **翻译**[2204.14198](https://hjfy.top/arxiv/2204.14198)
>
> ==🔆few-shot, perceiver，Attn门控==

![Flamingo架构](/image/Flamingo_1.png){.center style="width:85%;"}

Flamingo主要解决的问题就是如何在适应few-shot任务时减少训练成本，又能具有生成能力，可以适应开放任务，所以主要创新在对齐视觉文字中间。

对于视觉模型输出的image_token，要先经过perceiver模块，perceiver模块直观理解，就是训练一定量的可以提取视觉特征的query token，在最开始，随机初始化的这些query与image token通过cross attention进行交互，不断训练，最后输出query。这些query随后被传入GAted XATTN层，这里和Blip2有所不同，Blip2的Q-Former是一个单独的模块，而Flamingo的GAted XATTN则是与冻结的LM拼接作为语言理解部分，tanh(α)从 0 逐渐变大，新层的贡献也慢慢增强，视觉信息逐步融入 LM。但缺点也很明显，这种做法，对数据集的规范要求很高，很依赖prompt质量。

![perceiver attn](/image/Flamingo_2.png){.center style="width:85%;"}

## BLIP2

> [!NOTE] BLIP2
> **Arxiv** [2301.12597](https://arxiv.org/abs/2301.12597)
>
> **翻译**[2301.12597](https://hjfy.top/arxiv/2301.12597)
>
> ==🔆Q-Former对其多模态==

![Blip2架构](/image/Blip2.png)

由于大模型的语言视觉预训练需要成本很高，所以这个工作主要解决的就是怎样在减少成本的同时，不损失性能，提出了一个Q-Former的模块，可以把它理解为连接视觉和语言的桥梁，在训练的时候完全冻结image和llm的模块，只训练这个Q-Former。

直观理解，这个模块通过与图片的交互，不断学习到如何向llm提问，从而可以让llm生成更好的描述。所以需要传入一些随机的learnable query token，通过self-attention进行掩码，随后经过cross-attention与图片模型（如vit）传出的image_token进行交互，训练ITC损失，以及另外还需要grouded text用于ITG ITM loss训练，最后输出的有image特征的query就可以直接传入llm，大大减小了训练成本。但同时由于模型学到的只是单独的一组组的QA，所以在上下文交互上表现一般。

## CoCa

> [!NOTE] CoCa
> **Arxiv** [2205.01917](https://arxiv.org/abs/2205.01917)
>
> **翻译**[2205.01917](https://hjfy.top/arxiv/2205.01917)
>
> ==🔆对比损失，multi-attn polling==
>
 ![CoCa架构](/image/CoCa.png){.center style="width:90%;"}

这篇工作是在ALBEF的基础上进行的，可以看出，基本架构和ALBEF类似，但是主要特点在于计算量少以及性能好。首先，CoCa仅使用两个loss，一个是image encoder输出和text decoder输出的对比损失，随后image encoder的输出经过attentional pooling，在于text进行cross-attention，最后计算Captioning loss，也就是GPT之类用的完全挡住后文的方式。由于这两种loss都可以通过一次forward传播得到（decoder承担了两种任务），但ALBEF中的ITM loss还需要显示构建图像文本对，所以CoCa相比于ALBEF，自然的减少了一次反向传播，也就提升了效率。

![ALBEF_vs_CoCa.png](/image/ALBEF_vs_CoCa.png){.center style="width:85%;"}

## BEiT V3

> [!NOTE] BEiT V 3
> **Arxiv** [2208.10442](https://arxiv.org/abs/2208.10442)
>
> **翻译**[2208.10442](https://hjfy.top/arxiv/2208.10442)
>
> ==🔆Unified框架, Image->Imglish(Only one loss)==

![BEiT V3架构](/image/BeiTv3.png){.center style="width:85%;"}

这个工作提出了一个Unified的框架，框架上和VLMO非常类似，都是共享SA，之后不同任务适配不同的FFN。主要的贡献在于，以往的工作都在堆叠不同的loss，来实现对不同目标的优化，但是BEiT v3提出，可以把图片当成外来文本来用，因为image和text在经过encoder后，都是一样的token，那么直接把图片和文本的token拼接到一起，不就变成了传统的nlp任务了么，所以作者用的loss也很简单，就是mask and predict（作者原文，很形象了），就是类似Bert之类的nlp任务中的完形填空，也是开创了一个新的看待图像文本融合的角度。



## InstructBLIP

> [!NOTE] InstructBLIP
> **Arxiv** [2305.06500](https://arxiv.org/abs/2305.06500)
>
> **翻译**[2305.06500](https://hjfy.top/arxiv/2305.06500)



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
>
> ==🔆sigmoid loss做对比学习==

作为预训练经典工作之一，这篇文章不是在架构上的改进，而是设计了一个新的loss。之前的工作中，图文匹配的ITC loss都是softmax对比损失，也就是$$L_{i} = -\log \frac{e^{s_{ii}/\tau}}{\sum_{j=1}^{|B|} e^{s_{ij}/\tau}}$$, 注意到，计算每个样本时，都要先对整个batch的所有样本求和，而这里提出的sigmoid损失为$$L = \sum_{i,j} \log(1 + e^{-y_{ij} \cdot s_{ij}})$$，这里将图文匹配看作一系列独立的二分类问题，也就是说每个样本对是独立的，这样避免了对整个batch的求和，大大减少计算量

另外，由于loss不依赖全局的batch求和了，所以作者就想到可以把loss的计算拆分到不同设备上，像 CLIP 这种，需要在显存里存一个巨大的 $|B| \times |B|$ 矩阵，而这里将整个batch分到D个设备上，并通过环形传递数据块，每一个设备接收到的负样本来自上一个设备，不断循环，把内存占用从全局 Batch 的平方降到了单卡 Batch 的平方，从而可以实现大batch训练。

![SigLIP的循环传递](/image/Siglip.png){.center style="width:85%;"}



## SigLIP 2

> [!NOTE] SigLIP 2
> **Arxiv** [2502.14786](https://arxiv.org/abs/2502.14786)
>
> **翻译**[2502.14786](https://hjfy.top/arxiv/2502.14786)


