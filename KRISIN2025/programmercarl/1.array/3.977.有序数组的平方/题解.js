// https://programmercarl.com/0977.%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.html
// https://leetcode.com/problems/squares-of-a-sorted-array/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    // We can use two pointer thinking to solve this question
    let startedPointer = 0;
    let endedPointer = nums.length - 1;
    // For ensure the position in array is correct.
    let actualIndex = nums.length - 1;
    const result = [];

    // From the start to the end,
    // step by step to narrow the array
    while (startedPointer <= endedPointer) {
        const startedSquare = nums[startedPointer] * nums[startedPointer];
        const endedSquare = nums[endedPointer] * nums[endedPointer];

        // As a non-decreasing array, the bigger is only in the start or the end.
        if (startedSquare < endedSquare) {
            // If the last one is bigger than the start one
            // The last one would be added in the array
            // So we should move the endedPointer
            result[actualIndex] = endedSquare;
            endedPointer -= 1;
        };
        if (startedSquare >= endedSquare) {
            // if the start on is bigger than or equal to the end
            // We shoul move foraward the startedPointer
            result[actualIndex] = startedSquare;
            startedPointer += 1;
        };

        actualIndex -= 1;
    };

    return result;
};

console.log(sortedSquares([-4,-1,0,3,10])) // [0,1,9,16,100]
console.log(sortedSquares([-7,-3,2,3,11])) // [4,9,9,49,121]
