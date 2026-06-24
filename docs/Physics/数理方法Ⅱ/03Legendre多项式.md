# 03 Legendre 多项式

> 在球坐标中对 Laplace 方程 $\nabla^2 \phi = 0$ 分离变量，径向上的 $r^{l}$ 与 $r^{-(l+1)}$ 因子已熟知；角向部分则导出 Legendre 微分方程。本章系统讨论 Legendre 多项式的性质与应用。

## 1. Legendre 微分方程

### 1.1 球坐标分离变量

球坐标 $(r,\theta,\varphi)$ 下 Laplace 方程：$\nabla^2 \phi = 0$。设 $\phi(r,\theta,\varphi) = R(r) \Theta(\theta) \Phi(\varphi)$，角向部分给出 Legendre 方程：

$$
\boxed{(1 - x^2) \frac{d^2 y}{dx^2} - 2x \frac{dy}{dx} + l(l+1) y = 0},\quad x = \cos\theta
$$

其中 $l$ 为整数，解为 Legendre 多项式 $P_l(x)$。

### 1.2 Rodrigues 公式

$$
\boxed{P_l(x) = \frac{1}{2^l l!} \frac{d^l}{dx^l} (x^2 - 1)^l}
$$

| $l$ | $P_l(x)$ |
|-----|----------|
| 0 | $P_0 = 1$ |
| 1 | $P_1(x) = x$ |
| 2 | $P_2(x) = \frac{1}{2}(3x^2 - 1)$ |
| 3 | $P_3(x) = \frac{1}{2}(5x^3 - 3x)$ |
| 4 | $P_4(x) = \frac{1}{8}(35x^4 - 30x^2 + 3)$ |

---

## 2. 生成函数与递推关系

### 2.1 生成函数

Legendre 多项式的**生成函数**：

$$
\boxed{\frac{1}{\sqrt{1 - 2xt + t^2}} = \sum_{l=0}^{\infty} P_l(x) t^l},\quad |t| < 1
$$

?? note "生成函数的物理意义"
    这是点电荷势 $1/|r - r'|$ 的展开系数：
    $$
    \frac{1}{|r - r'|} = \sum_{l=0}^{\infty} \frac{r_<^l}{r_>^{l+1}} P_l(\cos\gamma)
    $$
    其中 $r_<$ 和 $r_>$ 分别是 $\min(r,r')$ 和 $\max(r,r')$，$\gamma$ 为两矢量夹角。

### 2.2 递推关系

常用的递推关系：

$$
\begin{aligned}
(l+1)P_{l+1}(x) &= (2l+1)x P_l(x) - l P_{l-1}(x) \\
(2l+1)P_l(x) &= P'_{l+1}(x) - P'_{l-1}(x) \\
xP'_l(x) - P'_{l-1}(x) &= l P_l(x)
\end{aligned}
$$

### 2.3 正交归一性

在区间 $[-1,1]$ 上，Legendre 多项式满足正交关系：

$$
\boxed{\int_{-1}^{1} P_l(x) P_{l'}(x) \, dx = \frac{2}{2l+1} \delta_{ll'}}
$$

---

## 3. Legendre 展开

任意函数 $f(x)$ 在 $[-1,1]$ 上可按 Legendre 多项式展开：

$$
\boxed{f(x) = \sum_{l=0}^{\infty} A_l P_l(x)},\quad A_l = \frac{2l+1}{2} \int_{-1}^{1} f(x) P_l(x) dx
$$

---

## 4. 缔合 Legendre 函数

解含 $\varphi$ 依赖的 Laplace 方程时，出现**缔合 Legendre 函数**：

$$
\boxed{P_l^m(x) = (1 - x^2)^{m/2} \frac{d^m}{dx^m} P_l(x)},\quad m = 0,1,\dots,l
$$

正交性：

$$
\int_{-1}^{1} P_l^m(x) P_{l'}^m(x) \, dx = \frac{2}{2l+1} \frac{(l+m)!}{(l-m)!} \delta_{ll'}
$$

---

## 5. 物理应用

### 5.1 均匀外场中的导体球

半径为 $a$ 的接地导体球置于均匀外场 $\mathbf{E}_0 = E_0 \hat{z}$ 中。电势解为：

$$
\phi(r,\theta) = -E_0 r \cos\theta + E_0 \frac{a^3}{r^2} \cos\theta,\quad r > a
$$

这是 $l=1$ 项的 Legendre 展开。

### 5.2 半球边界温度分布

半径为 $a$ 的半球保持 $u(a,\theta) = V_0$（$0 \le \theta < \pi/2$），下半球接地 $0$。展开为：

$$
u(r,\theta) = V_0 \sum_{l\ \text{odd}} \left(\frac{r}{a}\right)^l \frac{2l+1}{2} \left[\int_0^1 P_l(x) dx\right] P_l(\cos\theta)
$$

---

## 6. 课堂典型例题（来自转写）

### 6.1 例题（03-09 课堂）：古罗马酒杯金属颗粒散射——轴对称球函数引入

**题目**：古罗马 Lycurgus 杯从反射光方向与透射光方向看呈现不同颜色。电子显微镜分析发现其含有几十至百纳米级金属颗粒。研究真空中球形金属颗粒在外加电磁场中的电势分布。

??? note "答案要点（课堂板书推导）"
    金属颗粒尺寸远小于电磁波波长，故颗粒内电磁场近似均匀，电势满足 **Laplace 方程** $\nabla^2\phi=0$。

    **边界条件**：(1) 球心处电势有限；(2) 无穷远处电势对应匀强电场 $\phi\to-E_0 r\cos\theta$（颗粒影响可忽略）。

    因体系球对称，采用球坐标分离变量：
    - 径向 $r$：Euler 型方程，解 $A_l r^l+B_l r^{-(l+1)}$
    - 方位角 $\varphi$：周期性边界 $\phi(\varphi+2\pi)=\phi(\varphi)$，要求 $m$ 整数
    - 极角 $\theta$：**Legendre 方程**

    本题考虑最简单的轴对称（$m=0$），极角方程解为 Legendre 函数。在端点 $\theta=0,\pi$ 处一般 Legendre 函数发散，**物理上要求有限**，故 $l$ 必须取整数 → Legendre 函数截断为 **Legendre 多项式** $P_l(\cos\theta)$。

    球内（含原点，去 $r^{-(l+1)}$ 发散解）：$\phi_{\text{in}}=\sum A_l r^l P_l(\cos\theta)$

    球外（去 $r^l$ 发散解，保留无穷远匀强场）：$\phi_{\text{out}}=-E_0 r\cos\theta+\sum B_l r^{-(l+1)}P_l(\cos\theta)$

    由球面边界条件（电势连续 + 电位移法向连续）定 $A_l,B_l$。

    **课堂原话**：
    > "我们就猜想这个杯子的变色秘密可能跟这些金属颗粒对我们电磁波的散射有关系……因为物理上要求我们的电势本身在球心处应该是有限的，这给了我们第一个边界条件。"

    **考点**：分离变量法的完整流程——物理问题 → 定解条件 → 分离变量 → 特殊函数 → 边界条件定系数。

### 6.2 例题（03-11 课堂）：Legendre 多项式的母函数

**题目**：用母函数法生成 Legendre 多项式并证明正交性。

??? note "答案要点"
    **母函数**：

    $$
    \frac{1}{\sqrt{1-2xt+t^2}}=\sum_{l=0}^\infty P_l(x)t^l,\quad |t|<1
    $$

    令 $t\to0$ 展开可逐项读出 $P_0=1$、$P_1=x$、$P_2=\frac12(3x^2-1)$ 等。

    **正交性**（用母函数证）：令

    $$
    g(x,t)=\frac{1}{\sqrt{1-2xt+t^2}}=\sum_l P_l(x)t^l
    $$

    计算 $\int_{-1}^1 g(x,t)g(x,s)\,dx=\sum_{l,l'}P_lP_{l'}t^l s^{l'}\int_{-1}^1 P_lP_{l'}dx$，左侧积分得 $\frac{1}{\sqrt{ts}}\ln\frac{1+\sqrt{ts}}{1-\sqrt{ts}}=\sum_l\frac{2}{2l+1}(ts)^l$，比较 $(ts)^l$ 系数即得

    $$
    \int_{-1}^1 P_l(x)P_{l'}(x)\,dx=\frac{2}{2l+1}\delta_{ll'}
    $$

    **考点**：母函数是生成与证明 Legendre 性质的核心工具。

### 6.3 例题（03-16 课堂）：一般球函数（$m\neq0$）

**题目**：当物理问题非轴对称（$m\neq0$）时，极角方程如何求解？

??? note "答案要点"
    一般情况极角方程为**连带 Legendre 方程**：

    $$
    \frac{1}{\sin\theta}\frac{d}{d\theta}\!\left(\sin\theta\frac{d\Theta}{d\theta}\right)+\!\left[l(l+1)-\frac{m^2}{\sin^2\theta}\right]\Theta=0
    $$

    解为**连带 Legendre 函数** $P_l^m(\cos\theta)$（$|m|\le l$）。结合方位角 $e^{im\varphi}$，得**球谐函数** $Y_l^m(\theta,\varphi)\propto P_l^m(\cos\theta)e^{im\varphi}$（第 4 章详述）。

    $m\neq0$ 对应物理量随方位角变化的问题（如非轴对称电荷分布、量子力学角动量 $z$ 分量）。

### 6.4 例题（03-09 课堂完整）：金属纳米颗粒的等离激元共振——Legendre 展开的完整应用

**题目**：古罗马 Lycurgus 杯在反射光与透射光下呈现不同颜色。电子显微镜显示含几十~100nm 金属颗粒。求真空中半径 $a$ 的球形金属颗粒在匀强外场 $E_0$ 中的电势，并解释变色。

??? note "完整板书答案"
    **建模**：$a\ll\lambda$（颗粒尺寸远小于光波长），颗粒内场近似均匀，球内外电势满足 Laplace 方程 $\nabla^2 u=0$。定解条件：(1) $r\to0$ 有限；(2) $r\to\infty$ 对应匀强场 $u\to-E_0 r\cos\theta$。

    **分离变量**（球坐标，轴对称 $m=0$）：
    - $r$ 方向 Euler 型：$R=A r^l+B r^{-(l+1)}$
    - $\theta$ 方向：Legendre 方程，端点有限要求 $l$ 整数 → $P_l(\cos\theta)$

    **一般解**：$u=\sum_l[A_l r^l+B_l r^{-(l+1)}]P_l(\cos\theta)$

    **边界条件定系数**：
    - 球内（$r\to0$ 有限，去 $r^{-(l+1)}$）：$u_{\text{in}}=\sum A_l r^l P_l(\cos\theta)$
    - 球外（$r\to\infty$ 匹配匀强场 $-E_0 r\cos\theta=-E_0 r P_1$，只有 $l=0,1$ 存活）：

      $$
      u_{\text{out}}=C+(-E_0 r+D/r^2)\cos\theta
      $$

    **界面边界条件**（$r=a$ 处）：
    - 电势连续：$A\cdot a=-E_0\cdot a+D/a^2$
    - 电位移法向连续：$\varepsilon\,\partial_r u_{\text{in}}|_a=\varepsilon_0\,\partial_r u_{\text{out}}|_a$（金属视为电介质，$\varepsilon=\varepsilon_0\varepsilon_r$）

    解出：

    $$
    A=-\frac{3E_0}{\varepsilon_r+2},\qquad D=a^3 E_0\frac{\varepsilon_r-1}{\varepsilon_r+2}
    $$

    球外偶极项 $\propto1/r^2$ 对应等效偶极矩 $p=4\pi\varepsilon_0 D=4\pi\varepsilon_0 a^3 E_0\frac{\varepsilon_r-1}{\varepsilon_r+2}$。

    **金属介电函数（Drude 模型）**：自由电子 $m\ddot{x}=-eE_0 e^{-i\omega t}$，解 $x_0=eE_0/(m\omega^2)$。极化 $P=-nex=-\frac{ne^2}{m\omega^2}E$，故

    $$
    \varepsilon(\omega)=1-\frac{\omega_p^2}{\omega^2},\qquad \omega_p^2=\frac{ne^2}{m\varepsilon_0}\text{（等离子体频率）}
    $$

    **等离激元共振**：偶极系数 $\frac{\varepsilon_r-1}{\varepsilon_r+2}$ 在 $\varepsilon_r=-2$ 时发散 → 共振。代入 $\varepsilon(\omega)=-2$ 得 $\omega=\omega_p/\sqrt{3}$（**局域表面等离激元共振**）。

    **变色机制**：对金，共振频率对应波长 $\approx550$ nm（绿光）。白光入射 → 绿光被强烈散射 → 反射方向见绿色；透射光中绿光被消耗，剩红光 → 透射方向见红色。

    **课堂原话**：
    > "我们就猜想这个杯子的变色秘密可能跟这些金属颗粒对我们电磁波的散射有关系……因为物理上要求我们的电势本身在球心处应该是有限的，这给了我们第一个边界条件。"

    **考点**：这是分离变量法 + Legendre 展开的**完整闭环**应用——从物理建模到 Drude 介电函数到等离激元共振，串起整章知识点。

---

## 本章小结

| 性质 | Legendre 多项式 $P_l(x)$ | 缔合 Legendre 函数 $P_l^m(x)$ |
|------|-------------------------|------------------------------|
| 微分方程 | $(1-x^2)P_l'' - 2xP_l' + l(l+1)P_l = 0$ | $(1-x^2)y'' - 2xy' + [l(l+1) - \frac{m^2}{1-x^2}]y = 0$ |
| 正交归一 | $\int_{-1}^1 P_l P_{l'} = \frac{2}{2l+1}\delta_{ll'}$ | $\int_{-1}^1 P_l^m P_{l'}^m = \frac{2}{2l+1}\frac{(l+m)!}{(l-m)!}\delta_{ll'}$ |
| 生成函数 | $(1 - 2xt + t^2)^{-1/2}$ | 无简单封闭形式 |
