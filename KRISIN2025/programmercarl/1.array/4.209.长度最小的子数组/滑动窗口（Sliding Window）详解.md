# 滑动窗口（Sliding Window）详解

## 什么是滑动窗口？

滑动窗口是一种算法思想，维护一个可变大小的窗口，通过移动窗口的左右边界来解决数组/字符串的子序列问题：

- **右边界**：主要负责扩大窗口，探索新的元素
- **左边界**：主要负责缩小窗口，剔除不满足条件的元素

## 主要作用

1. **求解子数组/子字符串问题**
2. **处理连续元素的统计**
3. **优化暴力解的时间复杂度**

## 常见应用场景

### 1. 定长窗口

#### a) 找出所有长度为k的子数组平均值

```javascript
function findAverages(k, arr) {
    const result = [];
    let windowSum = 0;

    // 初始化第一个窗口
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    result.push(windowSum / k);

    // 滑动窗口
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i]; // 减去窗口最左边的值，加上新的值
        result.push(windowSum / k);
    }

    return result;
}
```

### 2. 可变长度窗口

#### a) 最小子数组长度（和大于等于目标值）

```javascript
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}
```

#### b) 最长无重复字符子串

```javascript
function lengthOfLongestSubstring(s) {
    let left = 0;
    let maxLength = 0;
    const seen = new Map();

    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right])) {
            left = Math.max(left, seen.get(s[right]) + 1);
        }
        seen.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

### 3. 计数类问题

#### a) 含有k个不同字符的最长子串

```javascript
function lengthOfLongestSubstringKDistinct(s, k) {
    let left = 0;
    let maxLength = 0;
    const charCount = new Map();

    for (let right = 0; right < s.length; right++) {
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);

        while (charCount.size > k) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

## 滑动窗口模板

```javascript
function slidingWindowTemplate(arr) {
    let left = 0;
    let right = 0;
    let result = 0;

    // 初始化需要维护的变量
    let windowVars = initializeWindow();

    // 扩大窗口
    while (right < arr.length) {
        // 添加右边元素到窗口
        windowVars = addToWindow(arr[right]);
        right++;

        // 根据条件收缩窗口
        while (windowNeedsContraction()) {
            // 从窗口移除左边元素
            windowVars = removeFromWindow(arr[left]);
            left++;
        }

        // 更新结果
        result = updateResult(result, windowVars);
    }

    return result;
}
```

## 优点

1. 时间复杂度通常为 O(n)
2. 空间复杂度通常为 O(1) 或 O(k)
3. 可以有效解决子序列问题

## 使用场景判断

当遇到以下情况时，可以考虑使用滑动窗口：

- 需要查找满足某些条件的连续子序列
- 需要计算连续元素的统计值
- 需要在线性时间内解决子序列问题
- 题目中暗示了连续性质

## 注意事项

1. 确定窗口的定义和维护的变量
2. 注意窗口收缩的条件
3. 处理边界情况
4. 注意更新结果的时机
5. 考虑窗口为空的情况

记住：滑动窗口通常用于处理**连续子序列**的问题，且通常可以将暴力解法的 O(n²) 优化到 O(n)。
