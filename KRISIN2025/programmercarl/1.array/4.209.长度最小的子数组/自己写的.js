// https://leetcode.cn/problems/minimum-size-subarray-sum/description/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let fastIndex = 0;
    let lastIndex = 0;
    let result = Infinity;
    let total = 0;
    let { length } = nums;

    while (fastIndex < length) {
        total += nums[fastIndex];

        while (total >= target) {
            result = Math.min(result, fastIndex - lastIndex + 1);
            total -= nums[lastIndex];
            lastIndex += 1;
        };

        fastIndex += 1;
    };

    return result === Infinity ? 0 : result;
};
