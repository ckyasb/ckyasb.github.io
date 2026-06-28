# 04 Einstein 场方程

## 1. 从牛顿引力到爱因斯坦方程

### 1.1 牛顿引力的泊松方程

??? note "自测"
    **Q**: 牛顿引力理论中，引力势由什么方程决定？自由落体加速度又如何由引力势给出？

    ??? note "答案"
        $\nabla^2\Phi = 4\pi G\rho$（泊松方程），$\mathbf{a} = -\nabla\Phi$。

牛顿引力理论由两部分构成：

1. **运动学**：自由落体加速度由引力势的梯度给出 $\mathbf{a} = -\nabla\Phi$
2. **动力学**：引力势由物质分布通过泊松方程决定 $\nabla^2\Phi = 4\pi G\rho$

在 GR 中，运动学部分被测地线方程取代，而动力学部分则需要一个**广义协变的场方程**——这就是爱因斯坦方程。

### 1.2 爱因斯坦的物理直觉

??? note "自测"
    **Q**: 构建爱因斯坦场方程的四个基本原则是什么？

    ??? note "答案"
        广义协变性、牛顿极限、能量-动量守恒（$\nabla_\mu T^{\mu\nu}=0$）、度规 $g_{\mu\nu}$ 是基本变量。

爱因斯坦通过深刻的物理思考，确立了构建场方程的基本原则：

1. **广义协变性**：方程必须是张量方程，在任意坐标变换下形式不变
2. **牛顿极限**：在弱场低速下，方程必须回归到泊松方程
3. **能量-动量守恒**：方程必须自动保证 $\nabla_\mu T^{\mu\nu} = 0$
4. **度规是基本变量**：引力由度规张量 $g_{\mu\nu}$ 描述

### 1.3 寻找几何侧

??? note "自测"
    **Q**: 场方程左侧需由度规构成且满足什么条件？最一般的候选张量是什么？

    ??? note "答案"
        必须是二阶张量且协变守恒；最一般形式为 $G_{\mu\nu}+\Lambda g_{\mu\nu}$。

方程左侧必须是由度规及其导数构成的张量，且应为二阶（以匹配物质侧 $T_{\mu\nu}$ 的指标结构）。

??? note "可能的候选张量"
    由度规可构造的二阶张量包括：
    
    - 度规本身 $g_{\mu\nu}$
    - 里奇张量 $R_{\mu\nu}$
    - 爱因斯坦张量 $G_{\mu\nu} = R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu}$
    
    更一般的组合为 $G_{\mu\nu} + \Lambda g_{\mu\nu}$。

!!! important "量纲分析"
    黎曼张量的量纲为 $[L^{-2}]$，$R_{\mu\nu}$ 和 $R$ 也是如此。而能量-动量张量的量纲为 $[E L^{-3}] = [M L^{-1} T^{-2}]$。因此比例系数必须包含 $G$ 和 $c$ 以匹配量纲。

---

## 2. 能量-动量张量

### 2.1 定义与性质

??? note "自测"
    **Q**: 能量-动量张量 $T_{\mu\nu}$ 各分量的物理意义是什么？满足什么守恒律？

    ??? note "答案"
        $T_{00}$ 为能量密度，$T_{0i}$ 为动量密度，$T_{ij}$ 为应力；满足 $\nabla_\mu T^{\mu\nu}=0$。

能量-动量张量 $T_{\mu\nu}$ 描述了物质和能量在时空中的分布与流动。其分量具有明确的物理意义：

- $T_{00}$：能量密度
- $T_{0i}$：动量密度（能量流）
- $T_{ij}$：应力（动量流）

在弯曲时空中，$T_{\mu\nu}$ 满足协变守恒律：

$$
\nabla_\mu T^{\mu\nu} = 0
$$

### 2.2 理想流体

??? note "自测"
    **Q**: 理想流体的能量-动量张量是什么形式？静止系中如何简化？

    ??? note "答案"
        $T_{\mu\nu}=(\rho+p)u_\mu u_\nu+p\,g_{\mu\nu}$；静止系中退化为对角矩阵 $\mathrm{diag}(\rho,p,p,p)$。

宇宙学中最重要的物质模型是**理想流体**，其能量-动量张量为：

$$
T_{\mu\nu} = (\rho + p) u_\mu u_\nu + p\, g_{\mu\nu}
$$

其中：
- $\rho$：能量密度（静止系中）
- $p$：各向同性压强
- $u^\mu$：流体的四速度（$u^\mu u_\mu = -1$）

在流体静止系（$u^i = 0$）中：

$$
T_{\mu\nu} = \begin{pmatrix}
\rho & 0 & 0 & 0 \\
0 & p & 0 & 0 \\
0 & 0 & p & 0 \\
0 & 0 & 0 & p
\end{pmatrix}
$$

### 2.3 尘埃与电磁场

??? note "自测"
    **Q**: 尘埃（无压流体）的能量-动量张量是什么？

    ??? note "答案"
        $T_{\mu\nu}=\rho\,u_\mu u_\nu$（$p=0$）。

**尘埃**（无压流体，$p = 0$）：

$$
T_{\mu\nu} = \rho\, u_\mu u_\nu
$$

**电磁场**：

$$
T_{\mu\nu} = F_{\mu\lambda}F_\nu^{\ \lambda} - \frac{1}{4}g_{\mu\nu}F_{\lambda\sigma}F^{\lambda\sigma}
$$

其中 $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\nu$ 是电磁场张量。

### 2.4 从变分原理定义

??? note "自测"
    **Q**: 如何由变分原理定义 $T_{\mu\nu}$？这一定义有何优点？

    ??? note "答案"
        $T_{\mu\nu}=-\frac{2}{\sqrt{-g}}\frac{\delta S_{\text{matter}}}{\delta g^{\mu\nu}}$；天然对称，且作用量广义协变时由诺特定理保证 $\nabla_\mu T^{\mu\nu}=0$。

在 GR 中，能量-动量张量可以通过物质作用量对度规的变分来定义：

$$
T_{\mu\nu} = -\frac{2}{\sqrt{-g}}\frac{\delta S_{\text{matter}}}{\delta g^{\mu\nu}}
$$

这个定义自动保证了 $T_{\mu\nu}$ 是对称的，且当物质作用量是广义协变时，诺特定理给出 $\nabla_\mu T^{\mu\nu} = 0$。

---

## 3. Bianchi 恒等式与爱因斯坦张量

### 3.1 黎曼张量的 Bianchi 恒等式

??? note "自测"
    **Q**: 第二 Bianchi 恒等式是什么形式？它在证明中常取哪种坐标系？

    ??? note "答案"
        $\nabla_{[\lambda}R_{\rho\sigma]\mu\nu}=0$；在局部惯性系（$\Gamma=0$）中证明，由于是张量方程即对所有系成立。

黎曼曲率张量满足重要的微分恒等式——**第二 Bianchi 恒等式**：

$$
\nabla_{[\lambda} R_{\rho\sigma]\mu\nu} = 0
$$

即协变导数的循环求和为零：

$$
\nabla_\lambda R_{\rho\sigma\mu\nu} + \nabla_\rho R_{\sigma\lambda\mu\nu} + \nabla_\sigma R_{\lambda\rho\mu\nu} = 0
$$

??? note "Bianchi 恒等式的证明"
    在局部惯性系（$\Gamma^\mu_{\rho\sigma}(p) = 0$）中，协变导数退化为普通导数，黎曼张量简化为：
    
    $$
    R_{\rho\sigma\mu\nu} = \frac{1}{2}(\partial_\sigma\partial_\mu g_{\rho\nu} + \partial_\rho\partial_\nu g_{\sigma\mu} - \partial_\sigma\partial_\nu g_{\rho\mu} - \partial_\rho\partial_\mu g_{\sigma\nu})
    $$
    
    直接计算 $\partial_\lambda R_{\rho\sigma\mu\nu} + \partial_\rho R_{\sigma\lambda\mu\nu} + \partial_\sigma R_{\lambda\rho\mu\nu}$，各项抵消，结果为零。由于该式是张量方程，在局部惯性系中成立即意味着在所有坐标系中成立。

### 3.2 缩并的 Bianchi 恒等式

??? note "自测"
    **Q**: 缩并 Bianchi 恒等式得到什么关键结论？为何这在物理上重要？

    ??? note "答案"
        $\nabla^\mu G_{\mu\nu}=0$（$G_{\mu\nu}=R_{\mu\nu}-\frac12 Rg_{\mu\nu}$）；它与 $\nabla^\mu T_{\mu\nu}=0$ 匹配，使能量-动量守恒成为场方程的推论而非额外假设。

对第二 Bianchi 恒等式进行缩并，可以得到极其重要的结果。用 $\eta^{\lambda\sigma}$ 缩并（或用度规 $g^{\lambda\sigma}$）：

$$
\nabla^\sigma R_{\rho\sigma\mu\nu} + \nabla_\rho R_{\sigma\ \ \mu\nu}^{\ \sigma} - \nabla_\sigma R_{\rho\ \mu\nu}^{\ \sigma} = 0
$$

整理得：

$$
\nabla^\sigma R_{\rho\sigma\mu\nu} = \nabla_\rho R_{\nu\mu} - \nabla_\nu R_{\rho\mu}
$$

再缩并 $\mu, \rho$（或等价地用 $g^{\mu\rho}$ 缩并）：

$$
\nabla^\mu R_{\mu\nu} = \frac{1}{2}\nabla_\nu R
$$

即：

$$
\boxed{\nabla^\mu\left(R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu}\right) = 0}
$$

这正是**爱因斯坦张量**协变导数恒为零的条件：

$$
\boxed{G_{\mu\nu} = R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu}},\quad \nabla^\mu G_{\mu\nu} = 0
$$

!!! important "Bianchi 恒等式的物理意义"
    $\nabla^\mu G_{\mu\nu} = 0$ 与物质侧的 $\nabla^\mu T_{\mu\nu} = 0$ 完美匹配——这意味着爱因斯坦方程的形式确保了能量-动量守恒是场方程的推论，而不是额外的假设。

---

## 4. 爱因斯坦场方程

### 4.1 完整形式

??? note "自测"
    **Q**: 写出含宇宙学常数的爱因斯坦场方程，比例系数中为何含 $c^4$？

    ??? note "答案"
        $G_{\mu\nu}+\Lambda g_{\mu\nu}=\frac{8\pi G}{c^4}T_{\mu\nu}$；$c^4$ 由量纲匹配（$G_{\mu\nu}$ 量纲 $L^{-2}$，$T_{\mu\nu}$ 量纲 $ML^{-1}T^{-2}$）定出。

综合以上讨论，爱因斯坦场方程（含宇宙学常数）为：

$$
\boxed{G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}}
$$

或等价地：

$$
\boxed{R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}}
$$

其中：
- $G_{\mu\nu}$：爱因斯坦张量，描述时空曲率
- $\Lambda$：宇宙学常数
- $T_{\mu\nu}$：能量-动量张量
- $G$：牛顿引力常数
- $c$：光速

### 4.2 从 Einstein-Hilbert 作用量推导

??? note "自测"
    **Q**: Einstein-Hilbert 作用量是什么？变分中哪一项被当作边界项丢弃？

    ??? note "答案"
        $S_{\text{EH}}=\frac{1}{16\pi G}\int R\sqrt{-g}\,d^4x$；$g^{\mu\nu}\delta R_{\mu\nu}$ 为全导数项（边界项），变分中忽略。

爱因斯坦场方程可以通过变分原理从**爱因斯坦-希尔伯特作用量**推出：

$$
S = S_{\text{EH}} + S_{\text{matter}} = \frac{1}{16\pi G}\int R\sqrt{-g}\,d^4x + S_{\text{matter}}
$$

对度规 $g^{\mu\nu}$ 做变分，令 $\delta S = 0$：

??? note "变分推导的详细步骤"
    **第一步：变分 $\sqrt{-g}$**
    
    利用矩阵恒等式 $\delta\log\det g = \text{tr}(g^{-1}\delta g)$，可得：
    
    $$
    \delta\sqrt{-g} = -\frac{1}{2}\sqrt{-g}\, g_{\mu\nu}\,\delta g^{\mu\nu}
    $$
    
    **第二步：变分标量曲率 $R = g^{\mu\nu}R_{\mu\nu}$**
    
    $$
    \delta R = \delta(g^{\mu\nu}R_{\mu\nu}) = R_{\mu\nu}\delta g^{\mu\nu} + g^{\mu\nu}\delta R_{\mu\nu}
    $$
    
    其中 $\delta R_{\mu\nu}$ 的计算需要在局部惯性系中进行（因为 $R_{\mu\nu}$ 是张量，$\delta R_{\mu\nu}$ 也是张量）：
    
    $$
    \delta R_{\mu\nu} = \nabla_\lambda(\delta\Gamma^\lambda_{\mu\nu}) - \nabla_\nu(\delta\Gamma^\lambda_{\mu\lambda})
    $$
    
    因此 $g^{\mu\nu}\delta R_{\mu\nu}$ 是一个全导数项（边界项），在变分中忽略。
    
    **第三步：合并结果**
    
    $$
    \delta S_{\text{EH}} = \frac{1}{16\pi G}\int\left(R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu}\right)\delta g^{\mu\nu}\sqrt{-g}\,d^4x
    $$
    
    加上物质部分的变分 $\delta S_{\text{matter}} = \frac{1}{2}\int T_{\mu\nu}\delta g^{\mu\nu}\sqrt{-g}\,d^4x$，令总变分为零，即得爱因斯坦方程。

### 4.3 场方程的另一种形式

??? note "自测"
    **Q**: 真空（$T_{\mu\nu}=0$，$\Lambda=0$）下爱因斯坦方程简化为什么？等价几何条件是什么？

    ??? note "答案"
        $R_{\mu\nu}=0$（里奇张量为零）。

对爱因斯坦方程取迹：

$$
R - \frac{1}{2}R\cdot 4 + 4\Lambda = \frac{8\pi G}{c^4} T
$$

即 $-R + 4\Lambda = \dfrac{8\pi G}{c^4} T$，解出 $R$ 代入原方程，可得等价形式：

$$
R_{\mu\nu} = \frac{8\pi G}{c^4}\left(T_{\mu\nu} - \frac{1}{2}T g_{\mu\nu}\right) + \Lambda g_{\mu\nu}
$$

在真空中（$T_{\mu\nu} = 0$）且 $\Lambda = 0$ 时，方程简化为：

$$
R_{\mu\nu} = 0
$$

这意味着**真空中的爱因斯坦方程等价于里奇张量为零**。

---

## 5. 宇宙学常数

### 5.1 历史

??? note "自测"
    **Q**: 爱因斯坦为何引入宇宙学常数？后又为何称其为"一生最大的错误"？现代为何重新引入？

    ??? note "答案"
        为得到静态宇宙解引入；哈勃发现宇宙膨胀后撤回；1998 年 Ia 型超新星观测表明宇宙加速膨胀，$\Lambda$（暗能量）被重新引入。

爱因斯坦在1915年提出场方程后，将其应用于宇宙学，却发现无法得到静态宇宙解。为了得到一个静态宇宙，他于1917年引入了宇宙学常数 $\Lambda$ 项。

当哈勃在1929年发现宇宙膨胀后，爱因斯坦撤回了这一项，称其为"一生最大的错误"。

然而，1998年的 Ia 型超新星观测表明宇宙正在**加速膨胀**，宇宙学常数（或类似暗能量的成分）被重新引入，成为 $\Lambda$CDM 标准宇宙学模型的核心组成部分。

### 5.2 作为真空能量

??? note "自测"
    **Q**: 宇宙学常数可解释为真空能动张量，其状态方程 $p_{\text{vac}}$ 与 $\rho_{\text{vac}}$ 关系如何？

    ??? note "答案"
        $T^{(\text{vac})}_{\mu\nu}=-\frac{\Lambda}{8\pi G}g_{\mu\nu}$，$p_{\text{vac}}=-\rho_{\text{vac}}$（$\rho_{\text{vac}}=\Lambda/8\pi G$），即负压强。

宇宙学常数项可以解释为真空的能量-动量张量：

$$
T_{\mu\nu}^{(\text{vac})} = -\frac{\Lambda}{8\pi G}\,g_{\mu\nu}
$$

对应于 $p_{\text{vac}} = -\rho_{\text{vac}}$，其中 $\rho_{\text{vac}} = \Lambda/8\pi G$。

---

## 6. 牛顿极限

### 6.1 弱场近似

??? note "自测"
    **Q**: 牛顿极限的度规近似与物质假设分别是什么？

    ??? note "答案"
        $g_{\mu\nu}=\eta_{\mu\nu}+h_{\mu\nu}$（$|h|\ll1$），静态场（$\partial_0 h=0$），非相对论物质 $T_{00}=\rho c^2$ 主导。

要验证爱因斯坦方程在牛顿极限下回归到泊松方程，考虑弱引力场：

$$
g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu},\quad |h_{\mu\nu}| \ll 1
$$

取非相对论物质（$T_{00} = \rho c^2$ 占主导），且假设场是静态的（$\partial_0 h_{\mu\nu} = 0$）。

### 6.2 推导牛顿引力势

??? note "自测"
    **Q**: 牛顿极限下 $g_{00}$ 与引力势 $\Phi$ 的关系是什么？由此定出方程的比例系数。

    ??? note "答案"
        $g_{00}=-(1+2\Phi/c^2)$；与泊松方程 $\nabla^2\Phi=4\pi G\rho$ 对比定出系数 $8\pi G/c^4$。

??? note "牛顿极限的详细推导"
    **步骤1：计算克里斯托费尔符号**
    
    在线性阶：
    
    $$
    \Gamma^\mu_{\rho\sigma} = \frac{1}{2}\eta^{\mu\lambda}(\partial_\rho h_{\lambda\sigma} + \partial_\sigma h_{\rho\lambda} - \partial_\lambda h_{\rho\sigma})
    $$
    
    **步骤2：计算里奇张量**
    
    主要贡献来自 $\Gamma^\mu_{00}$：
    
    $$
    \Gamma^\mu_{00} = \frac{1}{2}\eta^{\mu\lambda}(2\partial_0 h_{\lambda 0} - \partial_\lambda h_{00}) = -\frac{1}{2}\eta^{\mu\lambda}\partial_\lambda h_{00}
    $$
    
    由于静态假设，$\partial_0 h_{\mu\nu} = 0$。因此：
    
    $$
    \Gamma^i_{00} = -\frac{1}{2}\partial^i h_{00},\quad \Gamma^0_{00} = 0
    $$
    
    **步骤3：计算 $R_{00}$**
    
    $$
    R_{00} = \partial_\mu\Gamma^\mu_{00} - \partial_0\Gamma^\mu_{0\mu} + \Gamma^\mu_{\mu\lambda}\Gamma^\lambda_{00} - \Gamma^\mu_{0\lambda}\Gamma^\lambda_{0\mu}
    $$
    
    在线性阶，忽略 $\Gamma\Gamma$ 项（二阶小量），且 $\partial_0 \Gamma = 0$：
    
    $$
    R_{00} = \partial_i\Gamma^i_{00} = -\frac{1}{2}\partial_i\partial^i h_{00} = -\frac{1}{2}\nabla^2 h_{00}
    $$
    
    **步骤4：联系到牛顿势**
    
    爱因斯坦方程的 $00$ 分量：
    
    $$
    R_{00} - \frac{1}{2}R g_{00} = \frac{8\pi G}{c^4} T_{00}
    $$
    
    对非相对论物质，$T_{00} = \rho c^2$。取迹 $R = -R_{00} + O(h^2)$（因为 $R \approx -R_{00}$ 在弱场下），可得：
    
    $$
    \nabla^2 h_{00} = \frac{8\pi G}{c^2}\rho
    $$
    
    与泊松方程 $\nabla^2\Phi = 4\pi G\rho$ 对比，得到 $h_{00} = 2\Phi/c^2$，因此：
    
    $$
    g_{00} = -\left(1 + \frac{2\Phi}{c^2}\right)
    $$

这个推导确认了爱因斯坦方程在牛顿极限下的正确行为，也定出了比例系数 $8\pi G/c^4$。

---

## 7. 关键公式速览

| 公式 | 名称 | 意义 |
|------|------|------|
| $G_{\mu\nu} = R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu}$ | 爱因斯坦张量 | 描述时空曲率 |
| $G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$ | 爱因斯坦场方程 | 物质弯曲时空 |
| $\nabla_{[\lambda}R_{\rho\sigma]\mu\nu} = 0$ | 第二 Bianchi 恒等式 | 黎曼张量的微分恒等式 |
| $\nabla^\mu G_{\mu\nu} = 0$ | 缩并 Bianchi | 保证能量-动量守恒 |
| $\nabla_\mu T^{\mu\nu} = 0$ | 协变守恒律 | 能量-动量守恒 |
| $S_{\text{EH}} = \frac{1}{16\pi G}\int R\sqrt{-g}\,d^4x$ | Einstein-Hilbert 作用量 | 引力场的作用量原理 |
| $g_{00} = -\left(1 + \frac{2\Phi}{c^2}\right)$ | 牛顿极限 | 弱场下回归牛顿引力 |

---

## 8. 场方程总结：对称性、守恒律和自由度

### 8.1 场方程的结构

??? note "自测"
    **Q**: 爱因斯坦场方程在四维有几个独立分量？对应几个引力自由度？

    ??? note "答案"
        对称张量 $G_{\mu\nu}$ 有 10 分量，Bianchi 恒等式给出 4 约束，独立方程数 $10-4=6$；对应 2 个引力波偏振自由度。

爱因斯坦场方程是10个非线性的二阶偏微分方程（因为 $G_{\mu\nu}$ 和 $T_{\mu\nu}$ 是对称的，各有10个独立分量）。但这些方程并非全部独立——由于 $\nabla^\mu G_{\mu\nu} = 0$，存在4个恒等式联系它们，因此真正独立方程的个数是：

$$
10 - 4 = 6
$$

这对应于引力自由度的个数：在四维时空中，引力有两个独立极化模式（对应引力波的两种偏振）。

### 8.2 爱因斯坦方程的意义

??? note "自测"
    **Q**: 用一句话概括爱因斯坦方程表达的物质与时空关系。

    ??? note "答案"
        时空告诉物质如何运动（测地线方程），物质告诉时空如何弯曲（爱因斯坦方程）。

> 时空告诉物质如何运动（测地线方程）；物质告诉时空如何弯曲（爱因斯坦方程）。

这句格言精准概括了 GR 的核心思想——物质与时空之间存在动态的双向耦合。爱因斯坦方程是这个耦合的定量表达，它将几何量（左侧）与物质量（右侧）通过一个普适常数联系起来。

---

## 9. 三种能动张量：Noether → Belinfante → Hilbert

这是本章一个容易被忽略但课堂重点强调的内容——同一个物理系统可以定义三种能动张量，它们在 on-shell 意义下等价，但形式上差异很大。理解这条线索，才能明白为什么 GR 中**必须**用 Hilbert 定义。

### 9.1 Noether 能动张量（平直时空，从平移对称性来）

??? note "自测"
    **Q**: Noether 能动张量从什么对称性导出？它有何主要缺陷？

    ??? note "答案"
        从平直时空平移对称性 $x^\mu\to x^\mu+a^\mu$ 导出，满足 $\partial_\mu T^{\mu}_{\ \nu}=0$；缺陷是不一定对称（电磁场情形尤为"糟糕"，还显含 $\partial_\mu$，不明显协变）。

在平直时空中，作用量 $S=\int d^4x\,\mathcal{L}(\phi,\partial\phi)$ 在平移 $x^\mu\to x^\mu+a^\mu$ 下不变，由 Noether 定理给出守恒流 $\partial_\mu T^{\mu}_{\ \nu}=0$。

**问题**：$T^{(N)}_{\mu\nu}$ **不一定对称**——电磁场的 Noether 张量尤其"糟糕"，不仅不对称，还显含 $\partial_\mu$，不是明显协变的。这给搬到弯曲时空带来障碍。

### 9.2 Belinfante 改进（加上一个散度为零的"超势"）

??? note "自测"
    **Q**: Belinfante 改进如何使能动张量对称化？为何守恒律不变？

    ??? note "答案"
        加散度为零的修正 $T^{(B)}_{\mu\nu}=T^{(N)}_{\mu\nu}+\partial_\rho B^{\rho\mu\nu}$（$B^{\rho\mu\nu}=-B^{\mu\rho\nu}$）；因 $\partial_\mu\partial_\rho$ 对称而 $B^{\rho\mu}$ 反称，故 $\partial_\mu\partial_\rho B^{\rho\mu\nu}=0$。

通过加一个散度为零的修正项使能动张量对称化：

$$
T^{(B)}_{\mu\nu} = T^{(N)}_{\mu\nu} + \partial_\rho B^{\rho\mu\nu},\qquad B^{\rho\mu\nu}=-B^{\mu\rho\nu}\ (\text{前两指标反对称})
$$

**守恒律不变**：$\partial_\mu\partial_\rho B^{\rho\mu\nu}=0$（因 $\partial_\mu\partial_\rho$ 对称而 $B^{\rho\mu}$ 反称）。利用 $B$ 的自由度（$\mu\nu$ 无对称性要求），可选 $B$ 使 $T^{(B)}_{\mu\nu}=T^{(B)}_{\nu\mu}$。

### 9.3 Hilbert 能动张量（弯曲时空，从度规变分来）

??? note "自测"
    **Q**: Hilbert 能动张量的定义式是什么？为什么含负号？

    ??? note "答案"
        $T_{\mu\nu}=-\frac{2}{\sqrt{-g}}\frac{\delta S_m}{\delta g^{\mu\nu}}$；负号来自 $\delta g_{\mu\nu}=-g_{\mu\alpha}g_{\nu\beta}\delta g^{\alpha\beta}$（上下指标度规变差一负号）。

对弯曲时空物质作用量 $S_m=\int d^4x\,\sqrt{-g}\,\mathcal{L}_m$ 关于**逆度规** $g^{\mu\nu}$ 变分：

$$
\boxed{T_{\mu\nu} = -\frac{2}{\sqrt{-g}}\frac{\delta(\sqrt{-g}\,\mathcal{L}_m)}{\delta g^{\mu\nu}} = -\frac{2}{\sqrt{-g}}\frac{\delta S_m}{\delta g^{\mu\nu}}}
$$

这里负号来自一个关键恒等式：由 $g_{\mu\alpha}g^{\alpha\nu}=\delta^\nu_\mu$ 取变分得

$$
\delta g_{\mu\nu} = -g_{\mu\alpha}g_{\nu\beta}\,\delta g^{\alpha\beta}
$$

即**上指标度规变分与下指标差一个负号**。Hilbert 定义天然给出对称的 $T_{\mu\nu}$，且由作用量的广义协变性自动保证 $\nabla_\mu T^{\mu\nu}=0$。

### 9.4 三者的关系

??? note "自测"
    **Q**: Noether、Belinfante、Hilbert 三种能动张量之间有何关系？

    ??? note "答案"
        $T^{(H)}_{\mu\nu}=T^{(B)}_{\mu\nu}\big|_{\partial\to\nabla}$；将 Belinfante 改进 Noether 张量中普通偏导 $\partial$ 换成协变导数 $\nabla$ 即得 Hilbert 张量，根源是李导数不依赖联络。

$$
\boxed{T^{(H)}_{\mu\nu} = T^{(B)}_{\mu\nu}\Big|_{\partial\to\nabla}}
$$

即：把 Belinfante 改进 Noether 张量中所有普通偏导数 $\partial$ 换成协变导数 $\nabla$，就得到 Hilbert 能动张量。这个"替换合法"的根源是李导数的一个性质——

??? note "为什么 $\partial\to\nabla$ 是合法的：李导数不依赖联络"
    李导数 $\mathcal{L}_V$ 的定义里**完全不出现联络**，只用微分同胚。对一般张量，它的坐标表达式里上指标"减"、下指标"加"的形式中出现的都是 $\partial$，但如果**整体地把 $\partial$ 换成 $\nabla$，联络项会完全抵消**（因为它们关于被微分的指标对称，而在李导数里这些指标以反对称组合出现）。

    因此李导数既可写成 $\partial$ 形式也可写成 $\nabla$ 形式——这正是"最小耦合 $\partial\to\nabla$"操作合法性的来源，也是从平直能动张量过渡到弯曲能动张量的桥梁。

??? note "课堂原话"
    > "你现在看到我们事实上得到了三种能动量张量……你把在弯曲时空做的得到的那个能动量张量，然后做了改进，使得它两个对称之后得到的这个结果，我把我的所有的偏导数……都化成协变导数，你就可以得到我的……弯曲时空里面的这个能动量张量。"

### 9.5 例题（HW2-5）：电磁场的 Noether vs Hilbert 能动张量

**题目**：电磁场弯曲时空作用量 $S=-\tfrac14\int d^4x\sqrt{-g}\,(g^{\alpha\rho}g^{\beta\sigma}F_{\alpha\beta}F_{\rho\sigma})$。

1. 平直时空中由 Noether 定理算 $T^{(N)}_{\mu\nu}$；
2. 弯曲时空中算 Hilbert 能动张量 $T^{(H)}_{\mu\nu}$；
3. 检验 $T^{(H)}_{\mu\nu}=T^{(N)}_{\mu\nu}+\partial_\rho B^{\rho\mu\nu}$，其中 $B^{\rho\mu\nu}=-B^{\mu\rho\nu}$。

??? note "答案要点"
    **(1) Noether**（用平移对称性）：

    $$
    T^{(N)}_{\mu\nu} = -F_{\mu\sigma}\partial_\nu A^\sigma + \tfrac14\eta_{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}
    $$

    注意它含 $\partial_\nu A^\sigma$，不对称也不明显协变。

    **(2) Hilbert**（用 $\delta\sqrt{-g}/\delta g^{\mu\nu}=-\tfrac12\sqrt{-g}\,g_{\mu\nu}$，且 $F_{\alpha\beta}$ 不显含 $g$）：

    $$
    T^{(H)}_{\mu\nu} = -F_{\mu\sigma}F_\nu{}^\sigma + \tfrac14 g_{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}
    $$

    天然对称、明显协变。

    **(3) 等价性**：展开 $F_\nu{}^\sigma=\partial_\nu A^\sigma-\partial^\sigma A_\nu$，

    $$
    T^{(H)}_{\mu\nu}-T^{(N)}_{\mu\nu}=F_{\mu\sigma}\partial^\sigma A_\nu=-\partial_\rho(F^\rho{}_\mu\,A_\nu)
    $$

    最后等号用到麦克斯韦运动方程 $\partial_\rho F^{\rho\mu}=0$。故 $B^{\rho\mu\nu}=-F^{\rho\mu}A^\nu$，它满足 $B^{\rho\mu\nu}=-B^{\mu\rho\nu}$（来自 $F^{\rho\mu}=-F^{\mu\rho}$），从而 $\partial_\mu\partial_\rho B^{\rho\mu\nu}=0$，两能动张量在 on-shell 意义下给出**相同的物理守恒荷**。

### 9.6 例题（HW3-1）：$f(R)$ 引力的场方程

**题目**：作用量 $S=\int d^4x\sqrt{-g}\,f(R)$（$f$ 是 Ricci 标量 $R$ 的光滑函数），对度规变分证明

$$
\boxed{f'(R)R_{\mu\nu}-\tfrac12 f(R)g_{\mu\nu}+(g_{\mu\nu}\nabla_\rho\nabla^\rho-\nabla_\mu\nabla_\nu)f'(R)=0}
$$

??? note "思路与答案"
    1. 变分 $\delta S=\int d^4x\,[\delta\sqrt{-g}\,f(R)+\sqrt{-g}\,f'(R)\,\delta R]$。
    2. 用 $\delta\sqrt{-g}=-\tfrac12\sqrt{-g}\,g_{\mu\nu}\delta g^{\mu\nu}$。
    3. **Palatini 恒等式**：$\delta R^\rho{}_{\mu\lambda\nu}=\nabla_\lambda(\delta\Gamma^\rho_{\mu\nu})-\nabla_\nu(\delta\Gamma^\rho_{\mu\lambda})$，其中 $\delta\Gamma$ 是张量（两联络之差按张量变换），故可在正则坐标算。
    4. 缩并得 $g^{\mu\nu}\delta R_{\mu\nu}=\nabla_\sigma(g^{\mu\nu}\nabla^\sigma\delta g_{\mu\nu}-\nabla_\lambda\delta g^{\sigma\lambda})$。
    5. 把 $f'(R)$ 乘进去，**两次分部积分**（无边界假设），将 $\nabla_\sigma f'$ 从 $\nabla^\sigma\delta g_{\mu\nu}$ 移到 $\delta g_{\mu\nu}$，产生 $\nabla^2 f'$ 与 $\nabla_\mu\nabla_\nu f'$ 两项。

    整理即得题给方程。**讨论**：

    - $f(R)=R$ 时 $f'=1,\ f''=0$，退化为标准真空 Einstein 方程 $R_{\mu\nu}-\tfrac12 g_{\mu\nu}R=0$。
    - 取迹（4 维）：$f'R-2f+3\nabla^2 f'=0$。可见 $R$ 不再由物质代数确定，而是**动力学自由度**——这是 $f(R)$ 比标准 GR 多出的一个标量自由度，方程升至四阶，可重写为带标量场 $\phi=f'(R)$ 的标量-张量理论。

---

## 10. Lovelock 定理：为什么作用量只能是 $\Lambda + R$

老师在课堂上用 Lovelock 定理论证了 Einstein-Hilbert 作用量的**唯一性**——这是"为什么 GR 长这样"的深层回答。

按量纲展开作用量密度（$[d^4x]=L^4$，作用量无量纲）：

| 项 | 量纲 | 四维地位 |
|---|---|---|
| $\Lambda$（常数项） | $L^0$ | 保留 — 宇宙学常数 |
| $R$ | $L^{-2}$ | 保留 — Einstein-Hilbert |
| $R^2,\ R_{\mu\nu}R^{\mu\nu},\ R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma}$ | $L^{-4}$ | **拓扑项**（Gauss-Bonnet = $R^2-4R_{\mu\nu}R^{\mu\nu}+R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma}$，积分 $=32\pi^2\chi$，$\chi$ 为欧拉示性数） |
| 更高阶 | $L^{-6},\ldots$ | 四维恒等于零 |

即四维中只有 $\Lambda$ 项和 $R$ 项给出非平庸场方程，第三阶是纯拓扑项（变分为零），更高阶恒为零。这是从对称性与量纲出发推导 GR 作用量形式的最强约束。

---

## 11. 带宇宙学常数的真空解：de Sitter 与 anti-de Sitter

真空 trace-reversed 方程 $R_{\mu\nu}=\Lambda g_{\mu\nu}$ 下，球对称 ansatz 求解得到两个最大对称解：

**de Sitter（$\Lambda>0$）**：

$$
\boxed{ds^2_{\text{dS}}=-(1-\tfrac{r^2}{R^2})dt^2+(1-\tfrac{r^2}{R^2})^{-1}dr^2+r^2d\Omega^2,\quad R^2=\frac{3}{\Lambda}}
$$

**anti-de Sitter（$\Lambda<0$）**（解析延拓 $R^2\to -R^2$）：

$$
\boxed{ds^2_{\text{AdS}}=-(1+\tfrac{r^2}{R^2})dt^2+(1+\tfrac{r^2}{R^2})^{-1}dr^2+r^2d\Omega^2,\quad R^2=\frac{-3}{\Lambda}}
$$

二者仅差 $r^2/R^2$ 前的符号。dS 可嵌入 5D Minkowski：$-X_0^2+X_1^2+X_2^2+X_3^2+X_4^2=R^2$。这两个解是第 6、8 章黑洞与宇宙学的基础时空。

??? note "课堂原话"
    > "在四维你没有更多的贡献……第三项在四维就是一个拓扑项……做完这个积分的话，他得到的是这个四维空间的那个欧拉示性数。"

---

## 12. 例题（HW3-2）：AdS$_2$ 时空——二维引力的特殊性

这道题揭示了**二维引力与四维的本质区别**：二维下 Einstein 张量恒等于零，标准 Einstein 方程没有动力学自由度，真空方程必须修改。

### 题目

取三维平直伪黎曼流形 $\mathbb{R}^{2,1}$，度规 $ds^2_{\mathbb{R}^{2,1}}=-(dX^0)^2+(dX^1)^2-(dX^2)^2$。二维 Anti-de Sitter 时空（AdS$_2$）作为双曲面嵌入其中：

$$
-(X^0)^2+(X^1)^2-(X^2)^2=-L^2
$$

参数化 $X^0=L\cosh\rho\cos\tau$，$X^1=L\sinh\rho$，$X^2=L\cosh\rho\sin\tau$（$\rho\in(-\infty,+\infty)$，$\tau\in[0,2\pi)$；为避免封闭类时曲线将 $\tau$ 拓展到 $(-\infty,+\infty)$）。

### (1) 验证诱导度规

??? note "答案"
    算微分 $dX^0=L(\sinh\rho\cos\tau\,d\rho-\cosh\rho\sin\tau\,d\tau)$ 等，代入嵌入度规：

    $$
    \boxed{ds^2_{\text{AdS}_2}=L^2(-\cosh^2\rho\,d\tau^2+d\rho^2)}
    $$

### (2) 二维引力的特殊性：$\Lambda$ 与 $L$ 的关系

**关键论证链**（HW3 审计发现笔记此前缺失，现补全）：

??? note "为何二维 Einstein 张量恒为零"
    二维下 Riemann 张量只有 $N^2(N^2-1)/12=1$ 个独立分量，故 Riemann 完全由 Ricci 标量 $R$ 决定：

    $$
    R_{\rho\sigma\mu\nu}=\frac{R}{2}(g_{\rho\mu}g_{\sigma\nu}-g_{\rho\nu}g_{\sigma\mu})
    $$

    缩并两次得 $R_{\mu\nu}=\frac12 Rg_{\mu\nu}$，故 **Einstein 张量** $G_{\mu\nu}=R_{\mu\nu}-\frac12 Rg_{\mu\nu}\equiv\mathbf{0}$（恒等，与度规无关）。

    因此标准的真空 Einstein 方程 $G_{\mu\nu}+\Lambda g_{\mu\nu}=0$ 在二维退化为 $\Lambda g_{\mu\nu}=0$，即 $\Lambda=0$——但 AdS 物理上应有 $\Lambda<0$，矛盾！

    **修正**：二维真空 Einstein 方程应改为

    $$
    \boxed{R=2\Lambda}
    $$

    直接对曲率标量给出真空条件（绕过恒为零的 $G_{\mu\nu}$）。

??? note "答案"
    AdS$_2$ 全套曲率（度规对角，$g_{\tau\tau}=-L^2\cosh^2\rho$，$g_{\rho\rho}=L^2$）：

    - 非零联络：$\Gamma^\rho_{\tau\tau}=\cosh\rho\sinh\rho$，$\Gamma^\tau_{\rho\tau}=\Gamma^\tau_{\tau\rho}=\tanh\rho$
    - Riemann 唯一独立分量：$R^\rho{}_{\tau\rho\tau}=\cosh^2\rho$
    - Ricci：$R_{\rho\rho}=-1$，$R_{\tau\tau}=\cosh^2\rho$
    - **Ricci 标量**：$R=-2/L^2$

    满足 $R_{\mu\nu}-\frac12 Rg_{\mu\nu}=0$（二维恒等），并由修正方程 $R=2\Lambda$ 定出

    $$
    \boxed{\Lambda=\frac12 R=-\frac{1}{L^2}}
    $$

    与 AdS 负宇宙学常数一致。

### (3) 共形变换到条带

??? note "答案"
    引入 $\theta\in(-\pi/2,\pi/2)$ 使 $\tan\theta=\sinh\rho$（故 $\cosh\rho=1/\cos\theta$，$d\rho=d\theta/\cos\theta$），代入度规：

    $$
    ds^2_{\text{AdS}_2}=\frac{L^2}{\cos^2\theta}(-d\tau^2+d\theta^2)
    $$

    这是闵可夫斯基度规乘共形因子 $\Omega^2=L^2/\cos^2\theta$——共形等价于平直条带 $\tau\in(-\infty,+\infty)$，$\theta\in(-\pi/2,\pi/2)$。

### (4) Penrose 图：无限高竖直条带，边界类时

??? note "答案"
    共形紧致化后 Penrose 图是**无限高的竖直条带**：$\tau$ 轴方向无限延伸，$\theta\in(-\pi/2,\pi/2)$ 为有限宽度。无穷远边界 $\theta=\pm\pi/2$（$\rho\to\pm\infty$）是**类时**的（边界法向是类空的）——这与渐近平坦时空边界类光的 dS/黑洞不同，是 AdS 的标志特征（"盒子"性质：信号可在有限时间内从边界反射回来）。

### (5) 类时测地线：左右边界间反射的"之"字形

??? note "答案"
    在 $(\tau,\theta)$ 坐标求解类时测地线。由共形时间下度规为闵可夫斯基形式（乘共形因子），测地线方程简化。解得

    $$
    \tau=t_0+\arcsin(C\sin(\theta-\theta_0))
    $$

    其中常数 $C>1$。在 Penrose 图中类时测地线表现为在左右边界 $\theta=\pm\pi/2$ 间**来回反射的折线**（之字形轨迹）——粒子在 AdS"盒子"内来回弹跳，无法逃逸到无穷远。这正是 AdS 边界类时导致的物理后果（第 5 章 Schw-AdS 有效势反弹的 2D 对应）。
