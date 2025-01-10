// https://leetcode.cn/problems/squares-of-a-sorted-array/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 *
 * 时间复杂度：O(n)，其中 n 是数组的长度。只需要遍历一次数组。
 * 空间复杂度：O(n)，需要一个新数组存储结果。
 * 算法采用双指针思想，从数组两端向中间移动，比较两端的平方值大小，
 * 将较大的值放入结果数组的末尾，保证结果数组的有序性。
 */
var sortedSquares = function (nums) {
    // 创建结果数组
    const result = [];

    // 定义双指针，start指向开头，end指向末尾
    let start = 0;
    let end = nums.length - 1;

    // lastIndex 用于追踪结果数组的填充位置，从后向前填充
    let lastIndex = nums.length - 1;

    while (start <= end) {
        // 计算两端数字的平方值
        const head = Math.pow(nums[start], 2); // 头部数字的平方
        const tail = Math.pow(nums[end], 2); // 尾部数字的平方

        // 如果尾部的平方值更大，就把它放在结果数组的当前位置
        if (tail >= head) {
            result[lastIndex] = tail;
            end -= 1; // 尾指针向左移动
        }

        // 如果头部的平方值更大，就把它放在结果数组的当前位置
        if (tail < head) {
            result[lastIndex] = head;
            start += 1; // 头指针向右移动
        }

        // 结果数组的填充位置向前移动
        lastIndex -= 1;
    }

    return result;
};
