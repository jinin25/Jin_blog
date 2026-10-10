---
title: RL-Basic
timestamp: 2026-07-12 01:52:12+08:00
series: Studying
tags: [Studying,RL]
description: 初步学习RL的一些记录，一些最基础的算法
---

# Policy Gradient

强化学习是什么？我们可以理解为是一个actor，environment，reward的交互过程。actor在环境中采取动作，环境根据动作给出奖励，actor根据奖励调整策略。调整策略的过程其实就是更新模型参数的过程，更新参数也仿照深度学习中的范式，使用经典的SGD，所以就有了我们这里要提到的Policy Gradient方法。

具体来说，普通的监督学习要做的是最小化损失，也就是$\theta \leftarrow \theta - \alpha \nabla_\theta \mathcal{L}$，但是对于强化学习而言，我们的metric应该是reward，也就是说我们进行参数更新的目标应该是最大化reward，所以就有$ \theta \leftarrow \theta + \eta \cdot \nabla \bar{R}_\theta$，最大化累积奖励

接下来让我们分析怎样对$E[R(τ)]$求梯度。

$$
\begin{aligned}
\nabla_\theta \mathbb{E}_{\tau\sim\pi_\theta}\big[R(\tau)\big]
&= \nabla_\theta \sum_{\tau} R(\tau) P_\theta(\tau) \\
&= \sum_{\tau} R(\tau) \cdot \nabla_\theta P_\theta(\tau) \\
&= \sum_{\tau} P_\theta(\tau) \cdot \nabla_\theta \log P_\theta(\tau) \cdot R(\tau) \\
&\approx \frac{1}{N}\sum_{n=1}^N \nabla_\theta \log P_\theta\big(\tau^{(n)}\big) \cdot R\big(\tau^{(n)}\big) \\
&= \frac{1}{N}\sum_{n=1}^N \left[ \sum_{t=1}^{T_n} \nabla_\theta \log \pi_\theta\big(a_t^{(n)} \mid s_t^{(n)}\big) \right] \cdot R\big(\tau^{(n)}\big)
\end{aligned}
$$

但实际上，直接使用我们推导出来的公式更新参数会有下面几个问题： 

1. 如果reward都是正数，那么所有动作的梯度都会被正向放大，且只要reward小于0，就会全部打压。
这就会导致哪怕某一步动作很差，只要整局赢了（R>0），依然会加强这个坏动作；哪怕某一步动作极好，只要整局输了（R<0），依然会削弱这个好动作。

2. 我们的reward在时间上的累计是从1开始的，也就是全局reward相加平均，但我们直观想一下，每一步的reward应该从我目前做的动作开始累计，而跟之前的动作不应该有关系，并应该随着时间的推移，影响越来越小

所以针对这两个问题，我们给出的解决方案是：

1. 增加baseline，构造优势函数计算相对大小：$A_t^{(n)} = G_t^{(n)} - b\big(s_t^{(n)}\big)$

1. 让reward从当前动作开始累计，增加衰减因子$\gamma$($\gamma < 1$) ：$G_t^{(n)} = \sum_{k=t}^{T_n} \gamma^{k-t} r_k^{(n)}$

最后我们得到最终梯度式：

$$
\nabla_\theta \mathbb{E}_{\tau\sim\pi_\theta}\big[R(\tau)\big]
\approx \frac{1}{N}\sum_{n=1}^N \sum_{t=1}^{T_n} \nabla_\theta \log \pi_\theta\big(a_t^{(n)} \mid s_t^{(n)}\big) \cdot \Big(G_t^{(n)} - b\big(s_t^{(n)}\big)\Big)
$$


# From On-Policy to Off-Policy

首先先介绍一下On-Policy和Off-Policy的区别：

- On-Policy：在训练过程中，actor的策略和环境交互的策略是一样的。
- Off-Policy：在训练过程中，actor的策略和环境交互的策略是不一样的，会另外有一个策略来和环境交互。

不难看出，我们刚才的分析就是On-Policy的策略，但这种方法有一个弊端，就是我们每次更新参数的时候都需要重新和环境交互，采样新的数据，这样的效率是很低的。所以就有了Off-Policy的产生，这里我们有一个$\theta'$执行$\pi_{\theta'}$策略与环境交互产生数据，这个策略记为行为策略，然后我们使用这个数据来更新$\theta$，这个策略$\pi_{\theta}$记为目标策略，也就是用$\theta'$的分布去估计$\theta$的梯度。

所以这里先介绍一下Importance Sampling这个概念，简单来说就是如何用$q(x)$的样本去估计$p(x)$的期望值，假设我们有一个函数$f(x)$，我们想要计算$p(x)$下的期望值：
$$
\begin{aligned}
\mathbb{E}_{x\sim p(x)}[f(x)] &= \int f(x)p(x)dx \\
&= \int f(x)\frac{p(x)}{q(x)}q(x)dx = \mathbb{E}_{x\sim q(x)}\left[f(x)\frac{p(x)}{q(x)}\right]
\end{aligned}
$$

那么方差：

直接从目标分布 $p$ 采样的方差
$$
\mathrm{Var}_{x\sim p}\big[f(x)\big] = \mathbb{E}_{p}\left[f(x)^2\right] - \left(\mathbb{E}_{p}\left[f(x)\right]\right)^2
$$

行为分布 $q$估计量的方差
$$
\begin{aligned}
\mathrm{Var}_{x\sim q}\left[f(x)\frac{p(x)}{q(x)}\right]
&= \mathbb{E}_{q}\left[\left(f(x)\frac{p(x)}{q(x)}\right)^2\right] - \left(\mathbb{E}_{q}\left[f(x)\frac{p(x)}{q(x)}\right]\right)^2 \\
&= \mathbb{E}_{q}\left[f(x)^2 \frac{p^2(x)}{q^2(x)}\right] - \left(\mathbb{E}_{p}\left[f(x)\right]\right)^2
\end{aligned}
$$

可见，两者期望一致，方差却不同，那这会带来什么问题呢？显然，若目标分布 p 与行为分布 q 差距较大，且可用采样样本数量不足时，重要性采样的估计方差会急剧增大，样本均值会严重偏离真实期望，导致估计结果不可靠。

分析完重要性采样后，我们要把这个公式应用到Off-Policy中了。我们之前用On-Policy得到的$E[R(τ)]$梯度式为：
$$
\begin{aligned}
\nabla \bar{R}_\theta 
&= \mathbb{E}_{\tau \sim p_\theta(\tau)} \big[ R(\tau) \nabla \log p_\theta(\tau) \big] \\
&= \mathbb{E}_{(s_t,a_t)\sim \pi_\theta}\big[ A^\theta(s_t,a_t) \nabla \log p_\theta(a_t^n | s_t^n) \big]
\end{aligned}
$$

那么Off-Policy就应该是：
$$
\begin{aligned}
\nabla \bar{R}_\theta 
&= \mathbb{E}_{\tau \sim p_{\theta'}(\tau)} \left[ \frac{p_\theta(\tau)}{p_{\theta'}(\tau)} R(\tau) \nabla \log p_\theta(\tau) \right]\\
&= \mathbb{E}_{(s_t,a_t)\sim \pi_{\theta'}} \left[ \frac{P_\theta(s_t,a_t)}{P_{\theta'}(s_t,a_t)} A^\theta(s_t,a_t) \nabla \log p_\theta(a_t^n | s_t^n) \right] \\
&= = \mathbb{E}_{(s_t,a_t)\sim \pi_{\theta'}} \left[ \frac{p_\theta(a_t|s_t)}{p_{\theta'}(a_t|s_t)} \frac{p_\theta(s_t)}{p_{\theta'}(s_t)} A^{\theta'}(s_t,a_t) \nabla \log p_\theta(a_t^n | s_t^n) \right]\\
\end{aligned}
$$
由于MDP环境状态转移与策略无关，状态分布比值 $\dfrac{p_\theta(s_t)}{p_{\theta'}(s_t)}\approx1$，因此该项可直接忽略。所以最后得到Off-Policy的目标函数为：
$$
J^{\theta'}(\theta) = \mathbb{E}_{(s_t,a_t)\sim \pi_{\theta'}} \left[ \frac{p_\theta(a_t|s_t)}{p_{\theta'}(a_t|s_t)} A^{\theta'}(s_t,a_t) \right]
$$
# PPO

经过刚才的分析，我们知道了，Off-Policy想要成功的关键就是我们的$\theta$和$\theta'$不能差距太大，否则效果就一般了。那么这里我们要介绍的PPO就是通过增加constrain来解决这个事情的。

具体来说，PPO的目标函数会增加KL项进行约束：

$$
\begin{aligned}
J_{\text{PPO}}^{\theta'}(\theta) 
&= J^{\theta'}(\theta) - \beta \operatorname{KL}(\theta, \theta')\\
&= \mathbb{E}_{(s_t,a_t)\sim \pi_{\theta'}} \left[ \frac{p_\theta(a_t|s_t)}{p_{\theta'}(a_t|s_t)} A^{\theta'}(s_t,a_t) \right] - \beta \operatorname{KL}(\theta, \theta')\\
\end{aligned}
$$

并且对$\beta$的选取，遵守：
- If $\operatorname{KL}(\theta, \theta^k) > \operatorname{KL}_{max}$, increase $\beta$
- If $\operatorname{KL}(\theta, \theta^k) < \operatorname{KL}_{min}$, decrease $\beta$

除了这种KL的约束方式，还有一种PPO（PPO2）是通过clip的方式来约束的：
$$
J_{\text{PPO2}}^{\theta^k}(\theta) \approx \sum_{(s_t,a_t)} \min\left(
\frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)} A^{\theta^k}(s_t,a_t),\;
\operatorname{clip}\left( \frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)},\;1-\varepsilon,\;1+\varepsilon \right) A^{\theta^k}(s_t,a_t)
\right)
$$

![PPO2](image-5.png)

这里可以被理解为：如果A>0，意味着我们当前的action应该得到正的收益，也就是希望$\frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)}$尽可能大，但如果大于1+ε，就不再增加收益；如果A<0，意味着我们当前的action应该得到负的收益，也就是希望$\frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)}$尽可能小，但如果小于1-ε，就不再减少收益。


最后总结一下：

**PPO algorithm**
$$
J_{\text{PPO}}^{\theta^k}(\theta) = J^{\theta^k}(\theta) - \beta \operatorname{KL}(\theta, \theta^k)
$$
$$
J^{\theta^k}(\theta) \approx \sum_{(s_t,a_t)} \frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)} A^{\theta^k}(s_t,a_t)
$$

**PPO2 algorithm**
$$
J_{\text{PPO2}}^{\theta^k}(\theta) \approx \sum_{(s_t,a_t)} \min\left(
\frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)} A^{\theta^k}(s_t,a_t),\;
\operatorname{clip}\left( \frac{p_\theta(a_t|s_t)}{p_{\theta^k}(a_t|s_t)},\;1-\varepsilon,\;1+\varepsilon \right) A^{\theta^k}(s_t,a_t)
\right)
$$

# Q-learning


## 为什么需要critic？

我们回看PPO中的公式，可以发现主要是通过优势函数A来进行参数更新的，而前面我们提到，$A_t^{(n)} = G_t^{(n)} - b\big(s_t^{(n)}\big)$，但这时baseline的值我们是不知道的，所以需要训练一个价值函数，这就是 Critic。

所以，Critic的作用在这里更多是评价一个策略$\pi$的好坏，我们通常记为$V^\pi(s)$，相当于提供了一个“正常发挥水平”，也就是说，在PPO中，一般是Critic 帮助计算 advantage，再让 Actor 更新，这也就是我们后面要介绍的actor-critic方法。

那既然critic能给每个动作打分，那我们可不可以直接训练这个Critic，把他训练得足够强然后直接用他选动作，这样就不再需要再去训练actor了呢？由此，就引出了我们下面要介绍的Q-learning方法。

## MC or TD

在正式介绍Q-learning之前，我们先来了解一下评估$V^\pi(s)$的两种方法：MC和TD。

MC，蒙特卡洛方法，核心思想就是一条轨迹完整跑完之后，用实际获得的累计奖励作为价值目标。我们可以想象有一个Critic观察某一个策略$\pi$的行为，记录后续所有的奖励。他的目标是$V(s_t) \leftarrow G_t$

TD，时序差分方法，它不需要等待整条轨迹结束，而是每走一步就根据当前信息修正，认为当前状态的价值，应该约等于当前奖励，加上下一个状态的价值，即目标为$V(s_t) \leftarrow V(s_t) + \alpha \left[ r_t + \gamma V(s_{t+1}) - V(s_t) \right]$

![MC vs TD](image-6.png)

比较这两种方法，MC得到的评估会更加真实，因为是在真实追踪reward，不依赖当前价值网络自己的预测，但是方差会很大，因为同一个状态后续可能会有很多的随机结果；而TD只是对当前的一步就进行更新，所以方差很小，但由于我们使用了自己的预测，所以会带来一定的偏差。

## Q-learning Basic

### 从 $V(s)$ 变成 $Q(s,a)$

我们前面说到，Q-learning的主要思想就是：当 Critic 评价的是每个动作时，我们可以直接根据它的评价生成策略，不再需要单独训练 Actor。

所以，这里定义动作价值函数：
$$
Q_\pi(s,a) = \mathbb{E}_\pi\left[\sum_{t=0}^{\infty} \gamma^t r_t \mid s_0 = s,\, a_0 = a\right]
$$

它回答：在状态 s 下，先执行动作 a，之后继续按照策略 π 行动，未来总回报是多少

因此，如果 Critic 能准确估计每个动作的 Q 值，策略其实可以直接写成：
$$
\pi(s) = \arg\max_{a} Q(s,a)
$$
也就是每一步选择Q值最大的动作。

因此，一个动作的价值应该等于当前奖励+未来价值，那么我们就有了Q-learning训练的目标：

$$
Q(s_t,a_t) = r + \gamma \max_{a_{t+1}} Q(s_{t+1},a_{t+1})
$$

### Target Network

观察上一个式子，我们可以发现，其实当前预测 $Q_\theta(s_t,a_t)$在变，目标值 $Q_\theta(s_{t+1},a')$也在变，这样的话目标不确定，会造成训练非常不稳定。

所以，Target Network 的做法是，先把评分标准固定一段时间，让你朝这个固定目标学习；过一段时间，再更新一次评分标准。

大概流程可以总结为：固定 Target→Online 学习若干步→同步 Target→继续学习
![TN](image-7.png)

### Exploration

分析了这么多，可能到这里会有第一个疑惑了，每一步选择Q值最大的动作的话，那么在一开始Q不稳定的时候，如果某一个Q值非常大，选择它之后，后面可能就会一直重复这个动作，这显然不是我们想要的，所以这里就需要平衡exploration 和 exploitation了。

常见的一种叫做 $\epsilon$-greedy：

$$
a=
\begin{cases}
\text{随机动作}, & \text{概率 } \epsilon \\
\arg\max_{a'} Q(s,a), & \text{概率 } 1-\epsilon
\end{cases}
$$

例如，$\epsilon=0.1$意味着：90% 概率选择目前 $Q$ 值最大的动作，10% 概率随机尝试其他动作。（$\epsilon$会随着学习不断衰减）

所以，我们在这里可以给出一个结论了，Q-learning是一种off-policy的算法，因为我们的exploration决定了，实际执行的策略不一定是Q值最大的目标策略。

### Algorithm

最后总结一下Q-learning的算法，其实在实现上是用了一个buffer把智能体与环境交互产生的数据先存起来，之后再反复抽样训练

![算法](image-8.png)


