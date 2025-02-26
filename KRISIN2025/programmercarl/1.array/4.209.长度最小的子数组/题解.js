// https://programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html
// https://leetcode.com/problems/minimum-size-subarray-sum/description/

/**
 * runtime complexity: O(n)
 * space complexity: O(1)
 *
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let start = 0;
    let end = 0;
    let len = nums.length;
    // Accumulated value, for ensuring the minimum value;
    let total = 0;
    // Accumulated value, for calculating the length of the result;
    let result = Infinity;

    // In this case, we do accumulate the ranged value
    while (end < len) {
        // Current accumulated value
        total += nums[end];

        // If total is bigger than target
        // That means we get the subarray
        while (total >= target) {
            // Subtract previous value
            // Compare old and current value to get the minimal length of a subarray
            result = Math.min(result, end - start + 1);
            // For restarting accumulating value
            total -= nums[start];
            // Move pointer to next position
            start += 1;

        };

        // Move pointer to next position
        end += 1;
    };

    return result === Infinity ? 0 : result;
};

console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2
console.log(minSubArrayLen(11, [1,4,4])); // 0

