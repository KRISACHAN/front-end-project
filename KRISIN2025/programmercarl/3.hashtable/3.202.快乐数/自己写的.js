// https://leetcode.cn/problems/happy-number/description/

/**
 * 计算一个数字各个位数的平方和
 * 例如：19 -> 1² + 9² = 82
 * @param {number} n - 输入的正整数
 * @return {number} - 各位数字的平方和
 */
var getSum = function (n) {
    let sum = 0;
    while (n) {
        sum += (n % 10) ** 2; // 取最后一位数的平方
        n = Math.floor(n / 10); // 去掉最后一位数
    }
    return sum;
};

/**
 * @param {number} n - 输入的正整数 (1 <= n <= 2³¹ - 1)
 * @return {boolean} - 如果是快乐数返回 true，否则返回 false
 *
 * 判断一个数是否为快乐数
 * 快乐数定义：
 * 1. 对于一个正整数，将该数替换为它每个位置上的数字的平方和
 * 2. 重复这个过程直到数字变为 1（快乐数）或陷入循环（不是快乐数）
 *
 * 解题思路：
 * 1. 使用 Set 存储出现过的数字，用于检测循环
 * 2. 不断计算平方和，直到得到 1 或出现重复数字
 *
 * 时间复杂度：O(logn) - 对于数字 n，计算位数平方和的时间是 O(logn)
 * 空间复杂度：O(logn) - Set 存储的数字个数是有限的
 */
var isHappy = function (n) {
    // 用于存储出现过的数字
    const set = new Set();
    while (n !== 1 && !set.has(n)) {
        // 将当前数字加入集合
        set.add(n);
        // 计算各位数字的平方和
        n = getSum(n);
    }
    // 如果最终数字为 1，则是快乐数
    return n === 1;
};
