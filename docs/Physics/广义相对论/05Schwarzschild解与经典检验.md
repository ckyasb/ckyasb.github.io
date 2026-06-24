# 05 Schwarzschild 解与经典检验

## 1. 球对称静态真空解

### 1.1 最对称的真空解

爱因斯坦场方程的最重要精确解之一——**Schwarzschild 解**——描述了一个球对称、静态、真空（$T_{\mu\nu} = 0$）时空。这是 Karl Schwarzschild 在1915年（爱因斯坦提出场方程仅数月后）发现的。

"静态"意味着：
- 存在一个类时 Killing 矢量 $\xi^\mu = (1, 0, 0, 0)$，即度规不依赖于时间坐标 $t$
- 在时间反演 $t \to -t$ 变换下度规不变（无 $dt\,dx^i$ 交叉项）

"球对称"意味着：
- 存在 $SO(3)$ 旋转对称性
- 度规可分解为径向部分和角向部分

### 1.2 球对称静态度规的一般形式

综合对称性要求，最一般的球对称静态度规可写为：

$$
ds^2 = -e^{2\alpha(r)}dt^2 + e^{2\beta(r)}dr^2 + r^2 d\Omega^2
$$

其中 $d\Omega^2 = d\theta^2 + \sin^2\theta\,d\phi^2$ 是单位二维球面的度规，$\alpha(r)$ 和 $\beta(r)$ 是待定函数。

??? note "度规形式的推导"
    球对称意味着在空间旋转下度规形式不变。三维空间的最大对称性要求度规可写为：
    
    $$
    dl^2 = A(r)dr^2 + B(r)r^2(d\theta^2 + \sin^2\theta\,d\phi^2)
    $$
    
    通过重新定义径向坐标 $r' = r\sqrt{B(r)}$，可将角向部分标准化为 $r'^2 d\Omega^2$。同时，时间部分由于静态性可写为 $-e^{2\alpha(r)}dt^2$。

### 1.3 求解真空爱因斯坦方程

真空爱因斯坦方程 $R_{\mu\nu} = 0$ 给出关于 $\alpha(r)$ 和 $\beta(r)$ 的微分方程。

??? note "Schwarzschild 解的详细推导"
    **步骤1：计算克里斯托费尔符号**
    
    度规分量为：
    
    $$
    g_{tt} = -e^{2\alpha(r)},\quad g_{rr} = e^{2\beta(r)},\quad g_{\theta\theta} = r^2,\quad g_{\phi\phi} = r^2\sin^2\theta
    $$
    
    非零的克里斯托费尔符号（使用 $\Gamma^\rho_{\mu\nu} = \frac{1}{2}g^{\rho\sigma}(\partial_\mu g_{\nu\sigma} + \partial_\nu g_{\mu\sigma} - \partial_\sigma g_{\mu\nu})$）：
    
    $$
    \Gamma^t_{tr} = \alpha',\quad \Gamma^r_{tt} = \alpha' e^{2\alpha-2\beta},\quad \Gamma^r_{rr} = \beta'
    $$
    $$
    \Gamma^r_{\theta\theta} = -r e^{-2\beta},\quad \Gamma^r_{\phi\phi} = -r\sin^2\theta\, e^{-2\beta}
    $$
    $$
    \Gamma^\theta_{r\theta} = \frac{1}{r},\quad \Gamma^\theta_{\phi\phi} = -\sin\theta\cos\theta,\quad \Gamma^\phi_{r\phi} = \frac{1}{r},\quad \Gamma^\phi_{\theta\phi} = \cot\theta
    $$
    
    **步骤2：计算里奇张量的分量**
    
    $R_{rr}$ 分量：
    
    $$
    R_{rr} = \partial_r\Gamma^\mu_{r\mu} - \partial_\mu\Gamma^\mu_{rr} + \Gamma^\nu_{r\mu}\Gamma^\mu_{r\nu} - \Gamma^\nu_{rr}\Gamma^\mu_{\mu\nu}
    $$
    
    经过系统计算：
    
    $$
    R_{rr} = -\alpha'' + \alpha'\beta' - \alpha'^2 - \frac{2\beta'}{r}
    $$
    
    $R_{tt}$ 分量：
    
    $$
    R_{tt} = e^{2\alpha-2\beta}(\alpha'' - \alpha'\beta' + \alpha'^2 + \frac{2\alpha'}{r})
    $$
    
    $R_{\theta\theta}$ 分量：
    
    $$
    R_{\theta\theta} = e^{-2\beta}(r(\beta' - \alpha') - 1) + 1
    $$
    
    **步骤3：令 $R_{\mu\nu} = 0$**
    
    由 $R_{rr} = 0$ 和 $R_{tt} = 0$ 可得 $\alpha' + \beta' = 0$，即 $\alpha + \beta = \text{常数}$。在无穷远处闵可夫斯基边界条件要求 $\alpha, \beta \to 0$，因此 $\beta = -\alpha$。
    
    代入 $R_{\theta\theta} = 0$：
    
    $$
    e^{2\alpha}(1 + 2r\alpha') = 1
    $$
    
    令 $A(r) = e^{2\alpha(r)}$，则 $\alpha' = A'/2A$，代入上式：
    
    $$
    A + rA' = 1 \implies \frac{d}{dr}(rA) = 1
    $$
    
    积分得 $rA = r - 2GM$（积分常数由牛顿极限确定），因此：
    
    $$
    e^{2\alpha} = 1 - \frac{2GM}{r},\quad e^{2\beta} = \left(1 - \frac{2GM}{r}\right)^{-1}
    $$

最终得到**Schwarzschild 度规**：

$$
\boxed{ds^2 = -\left(1 - \frac{2GM}{r}\right)dt^2 + \left(1 - \frac{2GM}{r}\right)^{-1}dr^2 + r^2 d\Omega^2}
$$

其中 $M$ 是中心天体的质量，$r_s = 2GM$ 称为**Schwarzschild 半径**。

### 1.4 Birkhoff 定理

!!! important "Birkhoff 定理"
    **Birkhoff 定理**：真空球对称爱因斯坦方程的任何解都必须是静态的，且渐近平坦时一定是 Schwarzschild 解。
    
    换言之，即使中心天体在径向脉动（保持球对称），其外部引力场也是静态的，由 Schwarzschild 度规描述。这意味着球对称天体不会发射引力波——引力波需要四极矩或更高阶多极矩的变化。

Birkhoff 定理的重要意义：
- 确认了 Schwarzschild 解是外部球对称引力场的唯一解
- 解释了牛顿引力中球对称物体外部场只依赖于总质量的结论在 GR 中仍然成立
- 表明径向脉动不会产生引力辐射

---

## 2. Schwarzschild 时空中的测地线

### 2.1 守恒量与有效势

Schwarzschild 度规具有两个 Killing 矢量：时间平移 $\xi^\mu = (1,0,0,0)$ 和旋转 $\eta^\mu = (0,0,0,1)$，对应两个守恒量：

- **能量（单位质量）**：$E = -g_{tt}\frac{dt}{d\tau} = \left(1 - \frac{2GM}{r}\right)\frac{dt}{d\tau}$
- **角动量（单位质量）**：$L = g_{\phi\phi}\frac{d\phi}{d\tau} = r^2\sin^2\theta\frac{d\phi}{d\tau}$

不失一般性，可取轨道平面为 $\theta = \pi/2$。

由四速度归一化条件 $g_{\mu\nu}u^\mu u^\nu = -\epsilon$（$\epsilon = 1$ 有质量粒子，$\epsilon = 0$ 光子）可得：

$$
\frac{1}{2}\left(\frac{dr}{d\tau}\right)^2 + V_{\text{eff}}(r) = \frac{1}{2}E^2
$$

其中有效势为：

$$
\boxed{V_{\text{eff}}(r) = \frac{1}{2}\epsilon - \epsilon\frac{GM}{r} + \frac{L^2}{2r^2} - \frac{GML^2}{r^3}}
$$

与牛顿力学的有效势相比，多出了一项 $-\dfrac{GML^2}{r^3}$，这是**广义相对论特有的引力修正**。

### 2.2 轨道的分类

有效势的形式决定了可能的轨道类型：

- **束缚轨道**（$E < V_{\text{eff}}^{\text{max}}$）：近日点和远日点之间的椭圆状轨道
- **散射轨道**（$E > V_{\text{eff}}^{\text{max}}$）：从无穷远来，绕过后飞向无穷远
- **俘获轨道**：落入中心黑洞

有效势的极值点由 $dV_{\text{eff}}/dr = 0$ 给出：

$$
\frac{GM}{r^2} - \frac{L^2}{r^3} + \frac{3GML^2}{r^4} = 0
$$

解出圆轨道半径 $r$。对于有质量粒子，存在**最小稳定圆轨道**（ISCO）：

$$
r_{\text{ISCO}} = 6GM
$$

对于 Schwarzschild 黑洞，这是物质在落入黑洞前能维持稳定圆轨道的最内半径。

---

## 3. 经典检验

### 3.1 水星近日点进动

这是 GR 的第一个成功预言。在牛顿力学中，在平方反比引力下，行星轨道是闭合的椭圆。GR 的 $1/r^3$ 修正导致轨道每转一圈发生微小进动。

??? note "进动角的计算"
    由径向运动方程和角动量守恒，可将轨道方程改写为对 $\phi$ 的微分方程。令 $u = 1/r$：
    
    $$
    \left(\frac{du}{d\phi}\right)^2 = \frac{E^2 - 1}{L^2} + \frac{2GM}{L^2}u - u^2 + 2GM u^3
    $$
    
    对 $\phi$ 求导得：
    
    $$
    \frac{d^2u}{d\phi^2} + u = \frac{GM}{L^2} + 3GM u^2
    $$
    
    牛顿项（$GM/L^2$）给出闭合椭圆轨道。GR 修正项 $3GM u^2$ 是微扰，导致轨道进动。
    
    使用微扰法，设 $u = u_0 + u_1$，其中 $u_0$ 是牛顿椭圆解。将 $u_0 = (GM/L^2)(1 + e\cos\phi)$ 代入，求解 $u_1$ 得：
    
    $$
    \Delta\phi = \frac{6\pi GM}{a(1 - e^2)}
    $$
    
    其中 $a$ 是半长轴，$e$ 是偏心率。

对水星：$a = 5.79 \times 10^7$ km，$e = 0.2056$，$M_\odot = 1.99 \times 10^{30}$ kg，计算得：

$$
\Delta\phi_{\text{水星}} = 43.0\ \text{角秒/世纪}
$$

与观测值完全吻合！

### 3.2 光线在太阳引力场中的偏折

光子的测地线满足 $g_{\mu\nu}u^\mu u^\nu = 0$。在 Schwarzschild 时空中，光子的有效势为：

$$
V_{\text{eff}}^{\text{(光)}}(r) = \frac{L^2}{2r^2}\left(1 - \frac{2GM}{r}\right)
$$

??? note "偏折角的计算"
    对于光子，$\epsilon = 0$，轨道方程变为：
    
    $$
    \frac{d^2u}{d\phi^2} + u = 3GM u^2
    $$
    
    零阶近似（无引力）给出直线 $u_0 = \frac{\cos\phi}{b}$，其中 $b$ 是碰撞参数（光线到引力中心的最短距离）。
    
    一阶修正计算偏折角：
    
    $$
    \Delta\phi = \frac{4GM}{b}
    $$
    
    恢复 $c$ 因子后：
    
    $$
    \boxed{\Delta\phi = \frac{4GM}{c^2b}}
    $$

对太阳表面掠过的光线（$b = R_\odot$）：

$$
\Delta\phi_{\text{太阳}} = \frac{4GM_\odot}{c^2R_\odot} \approx 1.75\ \text{角秒}
$$

1919年，Eddington 在日食期间观测到星光偏折 $1.61 \pm 0.30$ 角秒，与 GR 预言一致，使爱因斯坦一夜成名。

### 3.3 引力红移

在 Schwarzschild 时空中，从 $r_1$ 处发射频率为 $\nu_1$ 的光，在 $r_2$ 处接收到的频率为：

$$
\frac{\nu_2}{\nu_1} = \sqrt{\frac{g_{00}(r_1)}{g_{00}(r_2)}} = \sqrt{\frac{1 - 2GM/r_1}{1 - 2GM/r_2}}
$$

当 $r_2 \gg r_1$ 时：

$$
z = \frac{\lambda_2 - \lambda_1}{\lambda_1} \approx \frac{GM}{r_1}
$$

**Pound-Rebka 实验**（1959）：在哈佛大学杰斐逊塔中，利用 Mössbauer 效应测量了 $^{57}$Fe 在高度差 $22.5$ m 的引力红移，实验结果与 GR 预言相符（精度约 1%）。

### 3.4 Shapiro 时间延迟

雷达信号在太阳引力场中往返传播时，由于时空弯曲，往返时间会比牛顿理论预言的要长。对于从地球到水星的雷达回波：

$$
\Delta t \approx \frac{4GM_\odot}{c^3}\ln\left(\frac{4r_E r_M}{b^2}\right)
$$

其中 $r_E$、$r_M$ 分别是地球和水星的轨道半径，$b$ 是雷达波到太阳的最短距离。这个效应由 Irwin Shapiro 于1964年提出，随后通过行星雷达实验得到验证。

---

## 4. 经典检验总结

| 检验 | GR 预言 | 实验验证 | 时间 |
|------|---------|----------|------|
| 水星近日点进动 | $43.0''$/世纪 | $43.1 \pm 0.5''$/世纪 | 1915-至今 |
| 光线偏折 | $1.75''$（太阳边缘） | $1.61 \pm 0.30''$（Eddington） | 1919 |
| 引力红移 | $z \approx GM/r$ | 1% 精度（Pound-Rebka） | 1959 |
| Shapiro 时间延迟 | $\Delta t \propto \ln(4r_E r_M/b^2)$ | 0.1% 精度（Cassini） | 1970s-至今 |

---

## 5. 关键公式速览

| 公式 | 名称 | 意义 |
|------|------|------|
| $ds^2 = -(1-\frac{2GM}{r})dt^2 + (1-\frac{2GM}{r})^{-1}dr^2 + r^2d\Omega^2$ | Schwarzschild 度规 | 球对称真空解 |
| $r_s = 2GM$ | Schwarzschild 半径 | 事件视界位置 |
| $V_{\text{eff}} = \frac{1}{2}\epsilon - \frac{\epsilon GM}{r} + \frac{L^2}{2r^2} - \frac{GML^2}{r^3}$ | 有效势 | 测地线运动方程 |
| $r_{\text{ISCO}} = 6GM$ | 最小稳定圆轨道 | 最内层稳定轨道 |
| $\Delta\phi = \frac{6\pi GM}{a(1-e^2)}$ | 近日点进动 | 水星进动 $43''$/世纪 |
| $\Delta\phi = \frac{4GM}{b}$ | 光线偏折 | 太阳边缘 $1.75''$ |
| $\frac{\nu_2}{\nu_1} = \sqrt{\frac{g_{00}(r_1)}{g_{00}(r_2)}}$ | 引力红移 | 频率比的几何解释 |

---

## 6. 参数化后牛顿（PPN）框架与修改引力（HW4 全题）

老师强调这章的核心不仅是"GR 对了"，更是"如何系统地把 GR 与实验比较、并刻画对 GR 的偏离"。**参数化后牛顿框架（PPN）** 就是为此设计的统一语言。它是必考重点。

### 6.1 PPN 度规

在静态球对称假设下，把度规按牛顿势 $U=GM/r$ 展开：

$$
ds^2 = -B(r)dt^2 + A(r)dr^2 + r^2 d\Omega_2^2
$$

其中

$$
B(r) = 1 - 2\alpha U + 2(\beta-\gamma)U^2 + \cdots,\qquad A(r) = 1 + 2\gamma U + \cdots
$$

三个 PPN 参数 $\alpha, \beta, \gamma$ 在 GR 中**都取 1**：$\alpha=\beta=\gamma=1$。若实验测出偏离 1，就意味 GR 需要修正或发现了新物理。这样三大经典检验就被统一在 $\alpha,\beta,\gamma$ 三个数字之下。

### 6.2 例题（HW4）：从 PPN 推导四大检验

利用 Schwarzschild 测地线的两个守恒量 $E=B(r)\,dt/d\tau$、$L=r^2\,d\varphi/d\tau$，以及归一化 $-B\dot t^2+A\dot r^2+r^2\dot\varphi^2=-\epsilon$（$\epsilon=-1$ 类时，$\epsilon=0$ 类光），引入无量纲变量 $\xi=L^2/(GMr)$，可统一推导四个检验。

??? note "答案要点（含中间步骤）"
    **通用设置**：守恒量 $E=B(r)\dot t$、$L=r^2\dot\varphi$，归一化 $-B\dot t^2+A\dot r^2+r^2\dot\varphi^2=-\epsilon$（$\epsilon=-1$ 类时，$\epsilon=0$ 类光）。引入无量纲变量 $\xi=L^2/(GMr)$，把 $A(r),B(r)$ 改写为 $\xi$ 的函数：

    $$
    A(\xi)=1+2\gamma\frac{G^2M^2}{L^2}\xi+\cdots,\quad B(\xi)=1-2\alpha\frac{G^2M^2}{L^2}\xi+2(\beta-\gamma)\!\left(\frac{G^2M^2}{L^2}\xi\right)^2+\cdots
    $$

    由归一化解出 $(d\xi/d\varphi)^2$，对 $\varphi$ 求导得轨道方程。

    **(1) 水星近日点进动**（类时 $\epsilon=-1$，取 $E^2=1$）：

    $$
    \frac{d^2\xi}{d\varphi^2}+\xi-\alpha+(1-\gamma-\alpha)E^2 = \frac{G^2M^2}{L^2}\!\left[3\gamma\xi^2+\big(E^2(4\alpha\gamma-2(\beta-\gamma)+4(\alpha-\gamma)^2)-4\gamma^2\big)\xi\right]
    $$

    对 $\alpha,\beta,\gamma$ 在 1 附近展开，$E^2=1$ 时简化为

    $$
    \frac{d^2\xi}{d\varphi^2}+\xi-\alpha = \frac{G^2M^2}{L^2}\!\left[3\gamma\xi^2+(4\alpha-2\beta-2\gamma)\xi\right]
    $$

    **零阶解**（右边为零）：$\frac{d^2\xi_0}{d\varphi^2}+\xi_0-\alpha=0$，要求 $\alpha=1$（否则无闭合轨道），解 $\xi_0=1+e\cos\varphi$（牛顿椭圆）。

    **一阶微扰**（进动来源）：右边两项分别贡献

    - $\Delta\varphi_1=6\pi\gamma\,\frac{G^2M^2}{L^2}$（来自 $3\gamma\xi^2$，GR 的 $1/r^3$ 修正）
    - $\Delta\varphi_2=2\pi(2-\beta-\gamma)\,\frac{G^2M^2}{L^2}$（来自 $(4\alpha-2\beta-2\gamma)\xi$ 的线性修正）

    相加并代入 $L^2/(GM)=a(1-e^2)$（椭圆轨道半通径）：

    $$
    \boxed{\Delta\varphi=\frac{2+2\gamma-\beta}{3}\cdot\frac{6\pi GM}{a(1-e^2)}}
    $$

    GR（$\beta=\gamma=1$）给 $\Delta\varphi=6\pi GM/[a(1-e^2)]=43''$/世纪。

    **(2) 光线偏折**（类光 $\epsilon=0$，$E:=1$）：保留到最低阶，

    $$
    \frac{d^2\xi}{d\varphi^2}+\xi+\gamma-1=3\gamma\frac{G^2M^2}{L^2}\xi^2
    $$

    先忽略右边 $\xi^2$（零阶）：$\frac{d^2\xi_0}{d\varphi^2}+\xi_0+\gamma-1=0$，解

    $$
    \xi_0=1-\gamma+\left(\frac{L}{GM}+\gamma-1\right)\sin\varphi
    $$

    代入右边求一阶修正 $\frac{d^2\xi_1}{d\varphi^2}+\xi_1=3\gamma\frac{G^2M^2}{L^2}\xi_0^2$，解得

    $$
    \xi_1\approx 3\gamma\!\left(\frac12+\frac16\cos 2\varphi\right)
    $$

    （**关键中间结果**：常数项 $1/2$ 与 $\cos2\varphi$ 的出现，正是审计发现笔记此前缺失的——它使无穷远处 $\xi=0$ 不再发生在 $\varphi=0$，而是偏移。）无穷远处 $\xi=\xi_0+\xi_1=0$ 给 $\varphi_{r=\infty}=-(1+\gamma)GM/L=-(1+\gamma)GM/b$（$b$ 为碰撞参数），偏折角

    $$
    \boxed{\Delta=2|\varphi_{r=\infty}|=\frac{1+\gamma}{2}\cdot\frac{4GM}{b}}
    $$

    GR（$\gamma=1$）给 $4GM/b=1.75''$。

    **(3) 雷达回波延迟**：由 $dt=d\lambda/B(r)$ 与 $dr/d\varphi$ 关系，转折点条件 $d\xi/d\varphi|_{r=R_0}=0$ 给出 $L^2=R_0^2/B(R_0)$。积分

    $$
    t\approx 2\!\left(\int_{R_0}^{r_R}+\int_{R_0}^{r_E}\right)\!\frac{A(r)B(r)^{-1/2}}{\sqrt{1-\frac{B(r)}{B(R_0)}\!\left(\frac{R_0}{r}\right)^2}}\,dr
    $$

    展开 $A(r)B(r)\approx 1+(1+\gamma)2GM/r+\cdots$，被积函数展开后逐项积分（对数项来自 $1/r$ 积分），最终

    $$
    \boxed{\Delta t=4GM\!\left[\frac{1+\gamma}{2}\ln\!\left(\frac{4r_Er_R}{R_0^2}\right)+1\right]}
    $$

    其中 $r_E,r_R\gg R_0$ 为地球与雷达反射星到太阳的距离。GR（$\gamma=1$）还原 Shapiro 公式。**审计要点**：转折点条件 $L^2=R_0^2/B(R_0)$ 与对数积分结构此前缺失，现补全。

    **(4) 引力红移**：光子频率 $\omega=U_\mu dx^\mu/d\lambda=B(r)^{-1/2}E$，故

    $$
    z=\frac{\omega_2-\omega_1}{\omega_1}\approx GM\!\left(\frac1{r_2}-\frac1{r_1}\right)+O\!\left(\frac{G^2M^2}{r^2}\right)
    $$

    领头阶与 PPN 参数无关（纯等效原理结果），PPN 修正出现在 $O((GM/r)^2)$ 阶（含 $\beta-\gamma$ 等）。

    领头阶与 PPN 参数无关（纯等效原理结果），PPN 修正出现在 $O((GM/r)^2)$ 阶（含 $\beta-\gamma$ 等）。

    **总结**：四大检验通过 $\alpha,\beta,\gamma$ 统一表达——任何一项实验偏离 GR 预言，就指明该参数≠1，从而约束修改引力理论。这是"实验物理如何刻画理论偏差"的范式。

### 6.3 例题（HW3-3）：Schwarzschild-AdS 解与有效势反弹

**题目**：求带宇宙学常数 $\Lambda<0$ 的球对称真空解（形式 $ds^2=-e^{2\alpha(r)}dt^2+e^{2\beta(r)}dr^2+r^2d\Omega^2$），验证 $\Lambda=0$ 回到标准 Schwarzschild 解；并求径向测地线有效势，解释为何有质量粒子无法逃逸到无穷远而会"反弹"。

??? note "答案要点"
    从度规形式出发算 Ricci 分量，Einstein 方程 $tt, rr$ 分量给出 $\partial_r(\alpha+\beta)=0\Rightarrow\alpha=-\beta$（吸收积分常数到 $t$ 重新标定），及 $e^{2\alpha}(2r\partial_r\alpha+1)=1-r^2\Lambda$，解得

    $$
    \boxed{ds^2=-\!\left(1-\frac{2GM}{r}-\frac{r^2}{3}\Lambda\right)dt^2+\!\left(1-\frac{2GM}{r}-\frac{r^2}{3}\Lambda\right)^{-1}dr^2+r^2d\Omega^2}
    $$

    $\Lambda=0$ 回到标准 Schwarzschild。

    代入守恒量 $E=(1-\tfrac{2GM}{r}-\tfrac{r^2}{3}\Lambda)\dot t$、$L=r^2\dot\varphi$ 和归一化条件，得径向运动方程 $\tfrac12\dot r^2+V(r)=\tfrac12 E^2$，有效势

    $$
    V(r)=\frac12\!\left(\epsilon+\frac{L^2}{r^2}\right)\!\left(1-\frac{2GM}{r}-\frac{r^2}{3}\Lambda\right)
    $$

    对有质量粒子 $\epsilon>0$、$\Lambda<0$，当 $r\to\infty$ 时 $V(r)\sim -\tfrac16\epsilon\Lambda r^2\to+\infty$（因 $\Lambda<0,\epsilon>0$ 使系数为正）——**有效势在无穷远发散为正无穷**，粒子无法逃逸到无穷远，必然在某个有限 $r$ 处反弹回来。这是 AdS 空间"盒子"性质的经典体现。

---

## 7. Birkhoff 定理的强调

老师在本章反复强调 **Birkhoff 定理**：球对称真空解**必为静态**（与时间无关），且必为 Schwarzschild 形式——即便物质在作球对称脉动（如径向坍缩的星体），其外部真空度规仍是 Schwarzschild。

??? note "课堂意义"
    这意味着外部观测者无法通过引力探测到球对称物质的径向运动——只有**非球对称**的运动（如双星互绕）才会辐射引力波（第 7 章）。Birkhoff 定理是 GR 中"球对称 = 静态"这一强结论的根源，也是引力波必须来自四极矩以上变化的伏笔。
