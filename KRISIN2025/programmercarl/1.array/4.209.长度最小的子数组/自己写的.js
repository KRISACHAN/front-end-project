// https://leetcode.cn/problems/minimum-size-subarray-sum/description/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 *
 * 时间复杂度：O(n)，其中 n 为数组长度
 * - 虽然有双层循环，但每个元素最多被访问两次
 * - fastIndex 遍历整个数组一次
 * - lastIndex 最多移动 n 次
 *
 * 空间复杂度：O(1)
 * - 只使用了常数个变量来存储状态
 */
var minSubArrayLen = function (target, nums) {
    // 初始化双指针，fastIndex 为右边界，lastIndex 为左边界
    let fastIndex = 0;
    let lastIndex = 0;
    // 初始化结果为无穷大，用于记录最小子数组长度
    let result = Infinity;
    // 记录当前窗口内的元素和
    let total = 0;
    let { length } = nums;

    // 右指针遍历整个数组
    while (fastIndex < length) {
        // 将当前元素加入窗口和
        total += nums[fastIndex];

        // 当窗口内的和大于等于目标值时，尝试缩小窗口
        while (total >= target) {
            // 更新最小子数组长度
            result = Math.min(result, fastIndex - lastIndex + 1);
            // 移除窗口最左边的元素
            total -= nums[lastIndex];
            // 左边界向右移动
            lastIndex += 1;
        }

        // 右边界向右移动
        fastIndex += 1;
    }

    // 如果没有找到符合条件的子数组，返回 0；否则返回最小长度
    return result === Infinity ? 0 : result;
};
