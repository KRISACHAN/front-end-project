/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 *
 * 时间复杂度：O(n²) - 使用两个双重循环
 * 空间复杂度：O(n²) - 哈希表在最坏情况下需要存储 n² 个不同的和
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    // 创建哈希表，用于存储 nums1 和 nums2 中任意两个数的和及其出现次数
    const twoSumMap = new Map();
    let count = 0;

    // 第一步：统计 nums1 和 nums2 中任意两个数的和出现的次数
    for (const n1 of nums1) {
        for (const n2 of nums2) {
            const sum = n1 + n2;
            // 将和存入哈希表，如果已存在则次数+1，不存在则初始化为1
            twoSumMap.set(sum, (twoSumMap.get(sum) || 0) + 1);
        };
    };

    // 第二步：查找 nums3 和 nums4 中任意两个数的和的相反数是否在哈希表中
    for (const n3 of nums3) {
        for (const n4 of nums4) {
            const sum = n3 + n4;
            // 如果 -(n3+n4) 在哈希表中存在，说明找到了符合条件的四元组
            // 将对应的次数累加到结果中
            count += (twoSumMap.get(0 - sum) || 0);
        };
    };

    return count;
};
