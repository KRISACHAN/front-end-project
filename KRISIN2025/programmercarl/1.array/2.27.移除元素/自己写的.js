// https://leetcode.cn/problems/remove-element/description/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let extraIndex = 0;

    for (let index = 0; index < nums.length; ++index) {
        if (nums[index] !== val) {
            nums[extraIndex] = nums[index];

            extraIndex += 1;
        };
    };

    return extraIndex;
};
