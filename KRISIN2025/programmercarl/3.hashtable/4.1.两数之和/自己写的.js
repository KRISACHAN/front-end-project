// https://leetcode.cn/problems/two-sum/description/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 *
 * 时间复杂度: O(n) - 只需要遍历一次数组，哈希表的查找和插入操作的时间复杂度都是 O(1)
 * 空间复杂度: O(n) - 需要额外存储哈希表，空间复杂度为 O(n)
 */
var twoSum = function(nums, target) {
    // 创建一个哈希表用于存储遍历过的数字
    const targetObject = {};
    let index = 0;

    while (index < nums.length) {
        // 当前遍历到的数
        const currentData = nums[index];
        // 需要寻找的配对数
        const restData = target - currentData;

        // 检查配对数是否已经在哈希表中
        if (restData in targetObject) {
            return [targetObject[restData], index];
        };

        // 将当前数及其索引存入哈希表
        targetObject[currentData] = index;
        index += 1;
    };

    return [];
};
