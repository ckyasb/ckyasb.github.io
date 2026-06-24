# 02 Fourier 级数与积分变换

> Fourier 分析是处理周期现象和信号的核心工具。本章从 Fourier 级数出发，推广到 Fourier 变换和 Laplace 变换，并应用于偏微分方程的求解。

## 1. Fourier 级数

### 1.1 三角级数形式

周期为 $T$ 的函数 $f(t)$ 可展开为：

$$
f(t) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left[ a_n \cos\left(\frac{2\pi nt}{T}\right) + b_n \sin\left(\frac{2\pi nt}{T}\right) \right]
$$

系数由正交性确定：

$$
\boxed{a_n = \frac{2}{T} \int_{-T/2}^{T/2} f(t) \cos\left(\frac{2\pi nt}{T}\right) dt,\quad b_n = \frac{2}{T} \int_{-T/2}^{T/2} f(t) \sin\left(\frac{2\pi nt}{T}\right) dt}
$$

### 1.2 复数形式

利用 Euler 公式 $e^{i\theta} = \cos\theta + i\sin\theta$，得到紧凑的复数形式：

$$
\boxed{f(t) = \sum_{n=-\infty}^{\infty} c_n e^{i\omega_n t},\quad \omega_n = \frac{2\pi n}{T}}
$$

其中系数：

$$
c_n = \frac{1}{T} \int_{-T/2}^{T/2} f(t) e^{-i\omega_n t} dt
$$

?? note "系数关系"
    三角函数与复指数系数的关系：
    $$
    c_0 = \frac{a_0}{2},\quad c_n = \frac{a_n - i b_n}{2},\quad c_{-n} = \frac{a_n + i b_n}{2}
    $$

### 1.3 Gibbs 现象

在函数的间断点处，Fourier 级数存在过冲，约为此处跳变的 $9\%$。增加项数不会消除过冲，仅使过冲区域收缩。

### 1.4 Parseval 定理

周期函数的均方值与频谱能量关系：

$$
\boxed{\frac{1}{T} \int_{-T/2}^{T/2} |f(t)|^2 dt = \sum_{n=-\infty}^{\infty} |c_n|^2 = \frac{a_0^2}{4} + \frac{1}{2}\sum_{n=1}^{\infty} (a_n^2 + b_n^2)}
$$

---

## 2. Fourier 变换

### 2.1 定义

非周期函数（$T \to \infty$）的频谱连续化，得到 Fourier 变换对：

$$
\begin{aligned}
\hat{f}(\omega) &= \mathcal{F}[f(t)] = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt \\
f(t) &= \mathcal{F}^{-1}[\hat{f}(\omega)] = \frac{1}{2\pi} \int_{-\infty}^{\infty} \hat{f}(\omega) e^{i\omega t} d\omega
\end{aligned}
$$

### 2.2 重要性质

| 性质 | 时域 $f(t)$ | 频域 $\hat{f}(\omega)$ |
|------|------------|----------------------|
| 线性 | $\alpha f + \beta g$ | $\alpha\hat{f} + \beta\hat{g}$ |
| 时移 | $f(t - t_0)$ | $e^{-i\omega t_0}\hat{f}(\omega)$ |
| 频移 | $e^{i\omega_0 t}f(t)$ | $\hat{f}(\omega - \omega_0)$ |
| 尺度 | $f(at)$ | $\frac{1}{|a|}\hat{f}(\omega/a)$ |
| 卷积 | $(f * g)(t)$ | $\hat{f}(\omega)\hat{g}(\omega)$ |

### 2.3 Dirac $\delta$ 函数

定义为满足筛选性的广义函数：

$$
\boxed{\int_{-\infty}^{\infty} f(t) \delta(t - t_0) dt = f(t_0)}
$$

Fourier 表示：$\displaystyle \delta(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{i\omega t} d\omega$

---

## 3. Laplace 变换

### 3.1 定义与收敛域

对因果信号 $f(t)$（$t<0$ 时 $f(t)=0$）：

$$
\boxed{F(s) = \mathcal{L}[f(t)] = \int_0^{\infty} f(t) e^{-st} dt},\quad s = \sigma + i\omega
$$

Laplace 变换将微分方程转化为代数方程。

### 3.2 基本性质

| 性质 | 公式 |
|------|------|
| 微分 | $\mathcal{L}[f'(t)] = sF(s) - f(0)$ |
| 积分 | $\mathcal{L}\left[\int_0^t f(\tau)d\tau\right] = \frac{F(s)}{s}$ |
| 卷积 | $\mathcal{L}[f * g] = F(s)G(s)$ |

### 3.3 反演公式

$$
f(t) = \frac{1}{2\pi i} \int_{\sigma - i\infty}^{\sigma + i\infty} F(s) e^{st} ds
$$

通常利用留数定理计算。

---

## 4. 在 PDE 中的应用

### 4.1 热传导方程

一维热方程 $\partial_t u = \alpha \partial_x^2 u$：

- 对 $x$ 作 Fourier 变换：$\partial_t \hat{u}(k,t) = -\alpha k^2 \hat{u}(k,t)$
- 解得 $\hat{u}(k,t) = \hat{u}(k,0) e^{-\alpha k^2 t}$
- 反演得热核（Gaussian 卷积核）

### 4.2 波动方程

对 $t$ 作 Laplace 变换可将波动方程 $\partial_t^2 u = c^2 \partial_x^2 u$ 化为关于 $x$ 的 ODE。

---

## 本章小结

- **Fourier 级数**：周期函数的正交展开，系数由内积确定
- **Fourier 变换**：非周期函数的连续谱表示
- **Laplace 变换**：因果信号的指数衰减变换，适合初值问题
- $\delta$ 函数是广义函数，其 Fourier 表示贯穿整个积分变换理论
