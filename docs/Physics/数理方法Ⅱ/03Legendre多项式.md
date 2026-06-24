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

## 本章小结

| 性质 | Legendre 多项式 $P_l(x)$ | 缔合 Legendre 函数 $P_l^m(x)$ |
|------|-------------------------|------------------------------|
| 微分方程 | $(1-x^2)P_l'' - 2xP_l' + l(l+1)P_l = 0$ | $(1-x^2)y'' - 2xy' + [l(l+1) - \frac{m^2}{1-x^2}]y = 0$ |
| 正交归一 | $\int_{-1}^1 P_l P_{l'} = \frac{2}{2l+1}\delta_{ll'}$ | $\int_{-1}^1 P_l^m P_{l'}^m = \frac{2}{2l+1}\frac{(l+m)!}{(l-m)!}\delta_{ll'}$ |
| 生成函数 | $(1 - 2xt + t^2)^{-1/2}$ | 无简单封闭形式 |
