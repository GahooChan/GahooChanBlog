---
icon: book-open
title: 向量运算
tags: [数学计算]
category: 编程学习
date: 2025-09-17
---
# 向量运算

向量是数学和计算机科学中一个非常重要的概念，它在图形学、物理学模拟、机器学习等领域都有广泛的应用。今天我们就来学习向量的基本概念和运算规则！

## 一、什么是向量？

向量是一个既有大小又有方向的量。在几何中，我们可以用有向线段来表示向量，线段的长度表示向量的大小，线段的方向表示向量的方向。

在计算机科学中，向量通常用一组有序的数字来表示，这些数字称为向量的分量或坐标。

例如，在二维空间中，向量可以表示为 `(x, y)`；在三维空间中，可以表示为 `(x, y, z)`。

## 二、向量的表示方法

### 2.1 几何表示

在几何中，我们可以用一个带箭头的线段来表示向量。线段的起点称为向量的始点，终点称为向量的终点。

### 2.2 代数表示

在代数中，我们通常用以下几种方式表示向量：

1. **行向量**：例如 `[1, 2, 3]`
2. **列向量**：例如 
   ```
   |1|
   |2|
   |3|
   ```
3. **带箭头的字母**：例如 `→v`
4. **粗体字母**：例如 `v`

## 三、向量的基本运算

### 3.1 向量的加法

向量的加法满足平行四边形法则或三角形法则。在代数中，向量的加法就是对应分量相加。

例如，对于向量 `a = (a₁, a₂, a₃)` 和 `b = (b₁, b₂, b₃)`，它们的和为：
```
a + b = (a₁ + b₁, a₂ + b₂, a₃ + b₃)
```

### 3.2 向量的减法

向量的减法可以看作是加上一个负向量。在代数中，向量的减法就是对应分量相减。

例如，对于向量 `a = (a₁, a₂, a₃)` 和 `b = (b₁, b₂, b₃)`，它们的差为：
```
a - b = (a₁ - b₁, a₂ - b₂, a₃ - b₃)
```

### 3.3 向量的数乘

向量与标量（一个普通的数字）相乘，结果仍然是一个向量，其方向与原向量相同或相反（取决于标量的正负），其长度是原向量长度乘以标量的绝对值。

在代数中，向量的数乘就是将标量与向量的每个分量相乘。

例如，对于向量 `a = (a₁, a₂, a₃)` 和标量 `k`，它们的乘积为：
```
k × a = (k × a₁, k × a₂, k × a₃)
```

### 3.4 向量的点积（数量积）

向量的点积是一个标量，表示两个向量之间的夹角关系。

在代数中，向量的点积就是对应分量相乘后相加。

对于向量 `a = (a₁, a₂, a₃)` 和 `b = (b₁, b₂, b₃)`，它们的点积为：
```
a · b = a₁×b₁ + a₂×b₂ + a₃×b₃
```

在几何中，点积也可以表示为：
```
a · b = |a| × |b| × cosθ
```
其中，`|a|` 和 `|b|` 分别表示向量 `a` 和 `b` 的长度，`θ` 是它们之间的夹角。

### 3.5 向量的叉积（向量积）

向量的叉积仅在三维空间中有定义，结果是一个垂直于原两个向量的新向量。

对于向量 `a = (a₁, a₂, a₃)` 和 `b = (b₁, b₂, b₃)`，它们的叉积为：
```
a × b = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)
```

在几何中，叉积的长度也可以表示为：
```
|a × b| = |a| × |b| × sinθ
```
其中，`θ` 是两个向量之间的夹角。

## 四、向量的长度（模）

向量的长度（也称为模或范数）是指向量的大小。对于向量 `a = (a₁, a₂, a₃)`，其长度为：
```
|a| = √(a₁² + a₂² + a₃²)
```

## 五、单位向量

单位向量是长度为1的向量。对于任意非零向量，我们都可以通过将其除以它的长度来得到同方向的单位向量：
```
â = a / |a|
```
其中，`â` 表示向量 `a` 的单位向量。

## 六、向量运算的代码实现

### 6.1 使用Python实现向量运算

下面是使用Python实现向量的基本运算：

```python
import math

class Vector:
    def __init__(self, components):
        """初始化向量"""
        self.components = components
        self.dimension = len(components)
    
    def __add__(self, other):
        """向量加法"""
        if self.dimension != other.dimension:
            raise ValueError("向量维度必须相同")
        return Vector([self.components[i] + other.components[i] for i in range(self.dimension)])
    
    def __sub__(self, other):
        """向量减法"""
        if self.dimension != other.dimension:
            raise ValueError("向量维度必须相同")
        return Vector([self.components[i] - other.components[i] for i in range(self.dimension)])
    
    def __mul__(self, scalar):
        """向量的数乘"""
        return Vector([self.components[i] * scalar for i in range(self.dimension)])
    
    def dot(self, other):
        """向量的点积"""
        if self.dimension != other.dimension:
            raise ValueError("向量维度必须相同")
        return sum(self.components[i] * other.components[i] for i in range(self.dimension))
    
    def cross(self, other):
        """向量的叉积（仅适用于三维向量）"""
        if self.dimension != 3 or other.dimension != 3:
            raise ValueError("叉积仅适用于三维向量")
        return Vector([
            self.components[1] * other.components[2] - self.components[2] * other.components[1],
            self.components[2] * other.components[0] - self.components[0] * other.components[2],
            self.components[0] * other.components[1] - self.components[1] * other.components[0]
        ])
    
    def magnitude(self):
        """计算向量的长度"""
        return math.sqrt(sum(comp ** 2 for comp in self.components))
    
    def normalize(self):
        """计算单位向量"""
        mag = self.magnitude()
        if mag == 0:
            raise ValueError("零向量无法归一化")
        return Vector([comp / mag for comp in self.components])
    
    def __str__(self):
        """向量的字符串表示"""
        return f"Vector({self.components})"

# 示例用法
if __name__ == "__main__":
    v1 = Vector([1, 2, 3])
    v2 = Vector([4, 5, 6])
    
    print(f"v1 = {v1}")
    print(f"v2 = {v2}")
    print(f"v1 + v2 = {v1 + v2}")
    print(f"v1 - v2 = {v1 - v2}")
    print(f"v1 * 2 = {v1 * 2}")
    print(f"v1 · v2 = {v1.dot(v2)}")
    print(f"v1 × v2 = {v1.cross(v2)}")
    print(f"|v1| = {v1.magnitude()}")
    print(f"v1的单位向量 = {v1.normalize()}")
```

## 七、向量在计算机科学中的应用

### 7.1 计算机图形学

在计算机图形学中，向量被广泛用于表示点、方向、颜色等。例如：
- 用向量表示三维空间中的点和方向
- 用向量进行坐标变换、旋转、缩放等操作
- 用向量计算光照效果

### 7.2 物理模拟

在物理模拟中，向量被用于表示各种物理量：
- 用向量表示物体的位置、速度、加速度
- 用向量表示力、力矩等
- 用向量进行碰撞检测和响应

### 7.3 机器学习

在机器学习中，向量是数据的基本表示形式：
- 用向量表示样本特征
- 用向量进行特征提取和降维
- 用向量计算相似度和距离

### 7.4 游戏开发

在游戏开发中，向量被广泛用于：
- 角色移动和碰撞检测
- 武器弹道和物理效果
- AI路径规划

## 八、向量运算的有趣应用

### 8.1 向量投影

向量投影是指将一个向量投影到另一个向量上，这在计算机图形学和物理模拟中有广泛的应用。

对于向量 `a` 和 `b`，`a` 在 `b` 上的投影长度为：
```
proj_b(a) = (a · b) / |b|
```

投影向量为：
```
proj_b(a) = ((a · b) / |b|²) × b
```

### 8.2 向量的线性组合

向量的线性组合是指向量通过加法和数乘运算组合而成的新向量。线性组合在计算机图形学、动画和机器学习中有广泛的应用。

对于向量 `v₁, v₂, ..., vₙ` 和标量 `k₁, k₂, ..., kₙ`，它们的线性组合为：
```
k₁×v₁ + k₂×v₂ + ... + kₙ×vₙ
```

## 九、小结

向量是数学和计算机科学中一个非常重要的概念，它在多个领域都有广泛的应用。通过学习向量的基本概念和运算规则，我们可以更好地理解和应用各种算法和技术。

希望这篇文章能够帮助你理解向量的基本概念和运算规则，为你的编程学习和应用提供帮助！