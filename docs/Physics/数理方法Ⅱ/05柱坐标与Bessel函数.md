# 05 柱坐标与 Bessel 函数

> 柱坐标下分离变量导出 Bessel 微分方程，其解为 Bessel 函数。Bessel 函数在圆形膜振动、柱形热传导、波导和衍射问题中扮演核心角色。

## 1. 柱坐标分离变量

### 1.1 Laplace 算符

柱坐标 $(\rho, \phi, z)$ 中的 Laplace 方程：

$$
\nabla^2 \psi = \frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial\psi}{\partial\rho}\right) + \frac{1}{\rho^2}\frac{\partial^2\psi}{\partial\phi^2} + \frac{\partial^2\psi}{\partial z^2} = 0
$$

### 1.2 分离变量

设 $\psi(\rho,\phi,z) = R(\rho)\Phi(\phi)Z(z)$，代入得：

$$
\frac{1}{R}\frac{d}{d\rho}\left(\rho\frac{dR}{d\rho}\right) + \frac{1}{\Phi}\frac{1}{\rho^2}\frac{d^2\Phi}{d\phi^2} + \frac{1}{Z}\frac{d^2Z}{dz^2} = 0
$$

分离常数给出三个 ODE：

- $Z'' - k^2 Z = 0$（$z$ 方向：指数或三角函数）
- $\Phi'' + m^2 \Phi = 0$（$\phi$ 方向：$e^{\pm im\phi}$，$m$ 整数）
- $\rho^2 R'' + \rho R' + (k^2\rho^2 - m^2)R = 0$（径向 Bessel 方程）

---

## 2. Bessel 方程与 Bessel 函数

### 2.1 Bessel 微分方程

$$
\boxed{x^2 \frac{d^2 y}{dx^2} + x \frac{dy}{dx} + (x^2 - \nu^2) y = 0}
$$

方程有两个线性无关解：

- **第一类 Bessel 函数** $J_\nu(x)$（在 $x=0$ 处有限）
- **第二类 Bessel 函数** $Y_\nu(x)$（在 $x=0$ 处发散，亦称 Neumann 函数）

### 2.2 级数表示

$$
\boxed{J_\nu(x) = \sum_{k=0}^{\infty} \frac{(-1)^k}{k! \,\Gamma(k+\nu+1)} \left(\frac{x}{2}\right)^{2k+\nu}}
$$

对于整数阶 $n$，$J_{-n}(x) = (-1)^n J_n(x)$。

---

## 3. 主要性质

### 3.1 生成函数与积分表示

整数阶 Bessel 函数的生成函数：

$$
\boxed{e^{\frac{x}{2}(t - 1/t)} = \sum_{n=-\infty}^{\infty} J_n(x) t^n}
$$

积分表示：

$$
J_n(x) = \frac{1}{\pi} \int_0^{\pi} \cos(x\sin\theta - n\theta) d\theta
$$

### 3.2 递推关系

$$
\begin{aligned}
J_{\nu-1}(x) + J_{\nu+1}(x) &= \frac{2\nu}{x} J_\nu(x) \\
J_{\nu-1}(x) - J_{\nu+1}(x) &= 2 J'_\nu(x) \\
\frac{d}{dx}[x^\nu J_\nu(x)] &= x^\nu J_{\nu-1}(x)
\end{aligned}
$$

### 3.3 渐近行为

| 区域 | $J_\nu(x)$ | $Y_\nu(x)$ |
|------|-----------|-----------|
| $x \to 0$ | $\sim \frac{x^\nu}{2^\nu \Gamma(\nu+1)}$ | $\sim \frac{2^\nu \Gamma(\nu)}{\pi x^\nu}$ |
| $x \to \infty$ | $\sim \sqrt{\frac{2}{\pi x}} \cos\!\left(x - \frac{\nu\pi}{2} - \frac{\pi}{4}\right)$ | $\sim \sqrt{\frac{2}{\pi x}} \sin\!\left(x - \frac{\nu\pi}{2} - \frac{\pi}{4}\right)$ |

---

## 4. 正交性与 Fourier-Bessel 级数

### 4.1 正交性

Bessel 函数在区间 $[0,a]$ 上关于权重 $x$ 正交：

$$
\boxed{\int_0^a J_\nu(\alpha_{\nu n} \rho/a) J_\nu(\alpha_{\nu m} \rho/a) \, \rho \, d\rho = \frac{a^2}{2} [J_{\nu+1}(\alpha_{\nu n})]^2 \delta_{nm}}
$$

其中 $\alpha_{\nu n}$ 是 $J_\nu(x) = 0$ 的第 $n$ 个正根。

### 4.2 Fourier-Bessel 级数

给定函数 $f(\rho)$ 在 $[0,a]$ 上展开：

$$
\boxed{f(\rho) = \sum_{n=1}^{\infty} A_n J_\nu(\alpha_{\nu n} \rho/a)}
$$

系数：

$$
A_n = \frac{2}{a^2 [J_{\nu+1}(\alpha_{\nu n})]^2} \int_0^a f(\rho) J_\nu(\alpha_{\nu n} \rho/a) \, \rho \, d\rho
$$

---

## 5. 修正 Bessel 函数

当分离常数反号（$k^2 \to -k^2$），得到修正 Bessel 方程：

$$
x^2 y'' + x y' - (x^2 + \nu^2) y = 0
$$

解为 $I_\nu(x)$ 和 $K_\nu(x)$，分别对应增长和衰减行为。

---

## 6. Sturm-Liouville 理论概述

Bessel 方程是 Sturm-Liouville 型：

$$
-\frac{d}{dx}\left[x \frac{dy}{dx}\right] + \frac{\nu^2}{x} y = \lambda x y,\quad \lambda = k^2
$$

权重函数 $\omega(x) = x$，本征值 $\lambda_n$ 对应零点的平方。

---

## 6. 课堂典型例题（来自转写）

### 6.1 例题（03-30 课堂）：柱坐标分离变量导出 Bessel 方程

**题目**：在柱坐标 $(r,\varphi,z)$ 下对 Laplace/Helmholtz 方程分离变量，导出径向方程。

??? note "答案要点（板书推导）"
    Laplace 方程 $\nabla^2 u=0$ 在柱坐标展开为

    $$
    \frac{1}{r}\frac{\partial}{\partial r}\!\left(r\frac{\partial u}{\partial r}\right)+\frac{1}{r^2}\frac{\partial^2 u}{\partial\varphi^2}+\frac{\partial^2 u}{\partial z^2}=0
    $$

    设 $u(r,\varphi,z)=R(r)\Phi(\varphi)Z(z)$，分离变量：
    - $\Phi''+m^2\Phi=0$ → $\Phi=e^{im\varphi}$（周期性要求 $m$ 整数）
    - $Z''-\mu^2 Z=0$（或 $Z''+k^2 Z=0$）→ $Z=e^{\pm\mu z}$ 或 $e^{\pm ikz}$
    - 径向方程（**Bessel 方程**）：

      $$
      \frac{1}{r}\frac{d}{dr}\!\left(r\frac{dR}{dr}\right)+\!\left(k^2-\frac{m^2}{r^2}\right)R=0
      $$

      即 $r^2 R''+rR'+(k^2 r^2-m^2)R=0$，令 $x=kr$ 得标准 Bessel 方程 $x^2 y''+xy'+(x^2-m^2)y=0$。

    解 $J_m(kr)$（第一类，$r=0$ 有限）、$Y_m(kr)$（第二类，$r=0$ 发散，圆柱内部问题弃之）。

### 6.2 例题（03-25 课堂）：圆形膜的横振动

**题目**：半径 $a$ 的圆形膜边缘固定，求其本征振动模式。

??? note "答案要点"
    波动方程 $\nabla^2 u=\frac{1}{v^2}\frac{\partial^2 u}{\partial t^2}$。分离时间 $u=T(t)u_0(r,\varphi)$ 得 $T=e^{-i\omega t}$，空间满足 **Helmholtz 方程** $\nabla^2 u_0+k^2 u_0=0$（$k=\omega/v$）。

    柱坐标分离变量（如 §6.1），径向 Bessel 函数 $J_m(kr)$。边缘固定边界条件 $u(a,\varphi)=0$ 要求 $J_m(ka)=0$，即 $ka$ 是 $J_m$ 的第 $n$ 个零点 $\alpha_{mn}$：

    $$
    k_{mn}=\frac{\alpha_{mn}}{a},\qquad \omega_{mn}=v\frac{\alpha_{mn}}{a}
    $$

    本征模式 $u_{mn}\propto J_m(k_{mn}r)\cos(m\varphi)$（或 $\sin$）。振动频率由 Bessel 函数零点决定——这是 Bessel 函数最典型的物理应用。

    **考点**：边界条件 → Bessel 零点 → 本征值，与 Sturm-Liouville 理论一致。

### 6.3 例题（04-01 课堂）：Bessel 函数的递推公式

**题目**：推导并应用 Bessel 函数的递推关系。

??? note "答案要点"
    由 Bessel 函数的积分/级数表示可推得：

    $$
    \frac{d}{dx}[x^\nu J_\nu(x)]=x^\nu J_{\nu-1}(x),\qquad \frac{d}{dx}[x^{-\nu}J_\nu(x)]=-x^{-\nu}J_{\nu+1}(x)
    $$

    展开：

    $$
    xJ_\nu'(x)+\nu J_\nu(x)=xJ_{\nu-1}(x),\qquad xJ_\nu'(x)-\nu J_\nu(x)=-xJ_{\nu+1}(x)
    $$

    两式相加/减得：

    $$
    J_{\nu-1}(x)+J_{\nu+1}(x)=\frac{2\nu}{x}J_\nu(x),\qquad J_{\nu-1}(x)-J_{\nu+1}(x)=2J_\nu'(x)
    $$

    **应用**：(1) 用 $J_0$、$J_1$ 生成所有整数阶 $J_m$；(2) 计算含 $J$ 的积分，如 $\int x^{\nu+1}J_\nu(x)\,dx=x^{\nu+1}J_{\nu+1}(x)+C$。

    **考点**：递推公式是 Bessel 函数计算的基础，避免每次都查表。

---

## 本章小结

| 概念 | 公式 / 说明 |
|------|------------|
| Bessel 方程 | $x^2 y'' + x y' + (x^2 - \nu^2)y = 0$ |
| 第一类解 | $J_\nu(x)$，$x=0$ 处有限 |
| 第二类解 | $Y_\nu(x)$，$x=0$ 处发散 |
| 正交性 | 权重 $x$，零点 $\alpha_{\nu n}$ 决定本征值 |
| 渐近 | 大 $x$ 时呈 $\sim 1/\sqrt{x}$ 振荡衰减 |
