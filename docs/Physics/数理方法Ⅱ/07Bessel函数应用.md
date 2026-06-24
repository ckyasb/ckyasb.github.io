# 07 Bessel 函数应用

> Bessel 函数在波动、热传导、电磁波导和衍射等物理问题中大量出现。本章聚焦于圆形区域的物理问题求解，以及 Bessel 函数的高级分析工具。

## 1. 圆形膜振动

### 1.1 波动方程与分离变量

半径为 $a$ 的圆形膜满足二维波动方程 $\partial_t^2 u = c^2 \nabla^2 u$。设驻波解 $u(\rho,\phi,t) = R(\rho) e^{\pm im\phi} e^{i\omega t}$，径向方程：

$$
\rho^2 R'' + \rho R' + \left(\frac{\omega^2}{c^2}\rho^2 - m^2\right)R = 0
$$

这正是 $m$ 阶 Bessel 方程，解为 $R(\rho) = J_m(k\rho)$，其中 $k = \omega/c$。

### 1.2 本征频率

固定边界 $R(a) = J_m(ka) = 0$ 给出本征值条件：

$$
k_{mn} = \frac{\alpha_{mn}}{a}
$$

其中 $\alpha_{mn}$ 为 $J_m(x)=0$ 的第 $n$ 个正根。本征频率：

$$
\boxed{\omega_{mn} = c \frac{\alpha_{mn}}{a}}
$$

?? note "最低频率模式"
    $J_0$ 的第一个零点 $\alpha_{01} \approx 2.4048$，对应基频：
    $$
    \omega_{01} = c \cdot \frac{2.4048}{a}
    $$
    此即圆形鼓面的基音频率。较高模式对应 $m \ge 1$ 的节线模式。

### 1.3 初值问题通解

$$
u(\rho,\phi,t) = \sum_{m=-\infty}^{\infty} \sum_{n=1}^{\infty} J_m(k_{mn}\rho) e^{im\phi} [A_{mn}\cos(\omega_{mn}t) + B_{mn}\sin(\omega_{mn}t)]
$$

---

## 2. 柱形热传导

### 2.1 热方程求解

柱体 $0 \le \rho \le a$ 中的热方程 $\partial_t u = \kappa \nabla^2 u$。柱面保持 $0^\circ$，初始温度 $u_0(\rho,\phi)$：

$$
u(\rho,\phi,t) = \sum_{m,n} A_{mn} J_m\!\left(\alpha_{mn}\frac{\rho}{a}\right) e^{im\phi} e^{-\kappa (\alpha_{mn}/a)^2 t}
$$

?? note "系数确定"
    利用 Fourier-Bessel 展开确定系数：
    $$
    A_{mn} = \frac{\int_0^a \int_0^{2\pi} u_0(\rho,\phi) J_m(\alpha_{mn}\rho/a) e^{-im\phi} \rho d\phi d\rho}{\pi a^2 [J_{m+1}(\alpha_{mn})]^2}
    $$

### 2.2 长时间行为

长时间后，最低模式 $m=0, n=1$ 占主导：

$$
u \sim A_{01} J_0\!\left(\alpha_{01}\frac{\rho}{a}\right) e^{-\kappa t (\alpha_{01}/a)^2}
$$

---

## 3. 波导模式

### 3.1 圆波导

圆形截面波导中 TE 和 TM 模式的截止波数：

- **TE 模**：$J'_m(k_c a) = 0$，截止波数 $k_c = \beta'_{mn}/a$
- **TM 模**：$J_m(k_c a) = 0$，截止波数 $k_c = \alpha_{mn}/a$

最低 TE 模式是 $m=1$（$J'_1$ 的第一个根），最低 TM 模式是 $m=0$（$\alpha_{01}$）。

---

## 4. 衍射与 Airy 斑

### 4.1 圆孔 Fraunhofer 衍射

平面波通过半径为 $a$ 的圆孔，远场衍射强度：

$$
I(\theta) = I_0 \left[ \frac{2 J_1(ka\sin\theta)}{ka\sin\theta} \right]^2
$$

其中 $k = 2\pi/\lambda$。这就是**Airy 斑**公式。

### 4.2 角分辨极限

第一暗环满足 $ka\sin\theta = \alpha_{11} \approx 3.8317$，因此：

$$
\boxed{\sin\theta_{\text{min}} = 1.22 \frac{\lambda}{D}},\quad D = 2a
$$

这是 Rayleigh 判据的基础，决定了光学系统的分辨极限。

---

## 5. 高级专题

### 5.1 加法公式

Graf 加法定理：

$$
J_0\!\left(\sqrt{R^2 + r^2 - 2Rr\cos\phi}\right) = \sum_{m=-\infty}^{\infty} J_m(R) J_m(r) e^{im\phi}
$$

### 5.2 Sommerfeld 积分表示

$$
J_\nu(x) = \frac{1}{2\pi} \int_{-\pi}^{\pi} e^{i(x\sin\theta - \nu\theta)} d\theta - \frac{\sin(\nu\pi)}{\pi} \int_0^{\infty} e^{-x\sinh t - \nu t} dt
$$

### 5.3 Hankel 函数与行波

定义第一、二类 Hankel 函数：

$$
H_\nu^{(1)}(x) = J_\nu(x) + iY_\nu(x),\quad H_\nu^{(2)}(x) = J_\nu(x) - iY_\nu(x)
$$

对时间因子 $e^{-i\omega t}$，$H_m^{(1)}(k\rho)$ 表示向内汇聚柱面波，$H_m^{(2)}(k\rho)$ 表示向外传播柱面波。

---

## 本章小结

| 应用领域 | 物理问题 | 关键公式 |
|---------|---------|---------|
| 圆形膜 | 振动本征频率 | $\omega_{mn} = c\,\alpha_{mn}/a$ |
| 柱体热传导 | 冷却过程 | $u \propto e^{-\kappa(\alpha_{01}/a)^2 t}$ |
| 圆波导 | 截止波数 | $J_m(k_c a)=0$ (TM), $J'_m(k_c a)=0$ (TE) |
| 圆孔衍射 | Airy 斑 | $I \propto [J_1(x)/x]^2$ |
| 柱面波 | 辐射条件 | 向外 $H_m^{(1)}(k\rho)e^{-i\omega t}$ |
