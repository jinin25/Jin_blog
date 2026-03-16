---
title: Coding-Algorithm
timestamp: 2026-03-07 18:08:03+08:00
series: Algorithm
tags: [Algorithm]
description: 对算法学习时的一些记录，便于日后复习回顾
---

# 大纲
基础算法 ：
排序
~~二分~~
高精度
前缀和与差分
双指针算法
位运算
离散化
区间合并

数据结构：
链表与邻接表：树与图的存储
栈与队列：单调队列、单调栈
kmp
Trie
并查集
堆
Hash表

搜索与图论 ：
~~DFS~~
BFS
树与图的遍历：拓扑排序
最短路
最小生成树
二分图：染色法、匈牙利算法

动态规划：
背包问题
线性DP
区间DP
计数类DP
数位统计DP
状态压缩DP
树形DP
记忆化搜索
贪心

来自：[acwing](https://www.acwing.com/activity/content/11/)

## 二分

二分查找适用于有序数组，时间复杂度 O(log n)，空间复杂度 O(1)。通过不断将搜索范围缩小一半来快速定位目标元素的位置。

把数组分成红蓝分析,蓝色满足条件，红色不满足条件，找到红蓝边界线。具体可看下图以及五点七边的视频
![binary scearch](/image/binarysearch.png)

“最大值最小” / “最小值最大” -> 二分答案！
代码模板：

```python

    left, right = -1, len(arr) + 1
    while left+1 != right:
        mid = (left + right) / 2
        if (isBlue(arr[mid])):
            left = mid
        else:
            right = mid
    
bool isBlue(int x) {
    // 判断x是否满足条件
    if (x满足条件) {
        return true; // 蓝色
    } else {
        return false; // 红色
    }
}
```

## dfs / bfs

DFS：像走迷宫，一条路走到黑，走不通就回头（回溯），换另一条路继续走。适合 **“遍历所有可能”“找所有解”“找一条可行解”**。

BFS：像水漫迷宫，从起点开始，一层一层向外扩散，所有距离起点 1 步的位置先搜，再搜 2 步的，以此类推。适合 **“找最短 / 最优解”** **“层级遍历”**。

dfs模板：

```python
（题目为给定一个整数n，求所有由1、2、3 组成的长度为10的序列中，和为n的序列个数）
void dfs(int x,int sum)
{
    if(sum>n) return ;
    if(x>10){
        if(sum==n){
            res++;
            for(int i=1;i<=10;i++){
                mem[res][i]=arr[i];
            }
        }
        return ;
    }
    for(int i=1;i<=3;i++){
        arr[x]=i;
        dfs(x+1,sum+i);   //important!
        arr[x]=0;
    }
    
}           

```


### python skills
1. 一行两个输入
```python
a, b = map(int, input().split())
``` 
2. 一行输入变成list
```python
arr = list(map(int, input().split()))
```
3. sort：reverse=True降序，默认升序。

若列表元素是元组（eg：[(1, 'a'), (2, 'b')])，则默认按照第一个元素排序。可以通过key参数指定排序依据，如key=lambda x: x[1]按照第二个元素排序。

4. 需要些多个print但还要在一行输出，用空格隔开的话
```python
print("啦啦啦啦", end=" ")
```

5. 保留两位小数
```python
print(f"{value:.2f}")
```