// https://leetcode.cn/problems/remove-element/description/

/**
 * @param {number[]} nums 输入数组
 * @param {number} val 需要移除的目标值
 * @return {number} 返回移除元素后数组的新长度
 *
 * 时间复杂度：O(n)，其中 n 是数组的长度。需要遍历一次数组。
 * 空间复杂度：O(1)，只使用了常数个变量，没有使用额外的数组空间。
 * 算法采用双指针（快慢指针）思想，extraIndex 作为慢指针，index 作为快指针。
 */
var removeElement = function (nums, val) {
    // extraIndex 用于记录新数组的位置，同时也代表新数组的长度
    let extraIndex = 0;

    // 遍历原数组
    for (let index = 0; index < nums.length; ++index) {
        // 当前元素不等于目标值时
        if (nums[index] !== val) {
            // 将当前元素移动到新数组的位置
            nums[extraIndex] = nums[index];
            // 新数组位置后移
            extraIndex += 1;
        }
        // 如果当前元素等于val，则跳过，不做任何操作
    }

    // 返回新数组的长度
    return extraIndex;
};
