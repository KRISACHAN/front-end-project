// https://leetcode.cn/problems/squares-of-a-sorted-array/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    const result = [];
    let start = 0;
    let end = nums.length - 1;
    let lastIndex = nums.length - 1;

    while (start <= end) {
        const head = Math.pow(nums[start], 2);
        const tail = Math.pow(nums[end], 2);

        if (tail >= head) {
            result[lastIndex] = tail;
            end -= 1;
        };

        if (tail < head) {
            result[lastIndex] = head;

            start += 1;
        };

        lastIndex -= 1;
    };

    return result;
};
