// https://leetcode.cn/problems/intersection-of-two-arrays/description/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * 时间复杂度：O(n + m)，其中 n 和 m 分别是两个数组的长度
 * - 创建 Set 需要 O(n) 或 O(m)
 * - 遍历较大数组需要 O(max(n,m))
 * - Set 的 has 操作是 O(1)
 *
 * 空间复杂度：O(n + m)
 * - numsSet 需要 O(min(n,m)) 空间
 * - res 需要 O(min(n,m)) 空间，最坏情况下两个数组完全相同
 *
 * 使用 Set 的优势：
 * 1. Set.has() 的查找时间复杂度是 O(1)，比数组的 includes() 的 O(n) 要快
 * 2. Set 自动去重，确保结果中不会有重复元素
 * 3. 代码更简洁，可读性更好
 */
var intersection = function (nums1, nums2) {
    // 选择较短的数组创建 Set，可以减少空间使用
    const [nums, target] =
        nums1.length < nums2.length ? [nums1, nums2] : [nums2, nums1];

    // 用于存储最终的交集结果
    const res = new Set();
    // 将较短数组转换为 Set，用于 O(1) 时间复杂度的查找
    const numsSet = new Set(nums);

    // 遍历较长的数组，检查元素是否在 numsSet 中存在
    for (const item of target) {
        if (numsSet.has(item)) {
            res.add(item);
        }
    }

    // 将 Set 转换回数组并返回
    return Array.from(res);
};
