# Lecture on Derivatives

## Introduction
- Derivatives measure how fast a function changes at a specific point.
- They give us the slope of the curve at that point.
- Derivatives are essential in solving many real-world problems, such as finding rates of change or maximum and minimum values of functions.

## Methods to Find Derivatives
### Power Rule
- If we have a function of the form $f(x) = x^n$, then its derivative is $n\times x^{n-1}$.
    - Example: If we have the function $f(x)=x^3$, its derivative is $3\times x^2$.

### Chain Rule
- Helps us find the derivative of composite functions.
    - If we have a function $g(x)$ inside another function $f(x)$, we can use the chain rule to find the derivative. 
    - The chain rule can be expressed as follows: $\frac{d}{dx} f(g(x))= \frac{df}{dg}\times\frac{dg}{dx}$.

#### Example:
Suppose we have the function  $$f(x)=(x^2+1)^3$$ We can think of this as a composite function where  $$g(x)=x^2+1$$ Using the chain rule, we can find that:

$\begin{aligned}
\frac{d}{dx} f(g(x))&=\frac{d}{dg}(g^3)\times\frac{d}{dx}(x^2+1)\\ &=3g^2(2x) \\ &=6x (x^2 + 1)^2 \\
\end {aligned}$

In summary, derivatives are crucial for solving many real-world problems and different methods like power rule and chain rules help us calculate them.