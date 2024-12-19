// https://leetcode.cn/problems/binary-search/description/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let mid = 0;

    while (left <= right) {
        mid = left + ((right - left) >> 1);

        if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    };

    return -1;
};
