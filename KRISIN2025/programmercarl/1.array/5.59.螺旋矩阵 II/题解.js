// https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html
// https://leetcode.com/problems/spiral-matrix-ii/description/

/**
 * @param {number} n
 * @return {number[][]}
 *
 * runtime complexity: O(n^2)
 * space complexity: O(1)
 */
var generateMatrix = function (n) {
    // Define a dyadic / daɪˈædɪk / array for result
    const res = new Array(n).fill(0).map(() => new Array(n).fill(0));
    // Define a value for saving current row value
    let x = 0;
    // Define a value for saving current col value
    let y = 0;
    // Define a value for accumulating the actual value
    let count = 1;
    // Define a value for move forward
    let offset = 1;
    // If n is odd, the latest value should be set independently
    let mid = Math.floor(n / 2);
    // Define a value for setting loop boundary
    let loopTimes = Math.floor(n / 2);

    while (loopTimes >= 0) {
        // Define the values of current loop body
        // row means x-axis / ˈæksɪs /
        let row = x;
        // col means y-axis
        let col = y;

        // Set value for the top from left to right
        for (; col < n - offset; ++col) {
            res[row][col] = count;
            count += 1;
        };

        // Set value for the right from top to bottom
        for (; row < n - offset; ++row) {
            res[row][col] = count;
            count += 1;
        };

        // Set value for the bottom from right to left
        for (; col > y; --col) {
            res[row][col] = count;
            count += 1;
        };

        // Set value for the bottom from left to right
        for (; row > x; --row) {
            res[row][col] = count;
            count += 1;
        };

        // move forward
        x += 1;
        y += 1;
        offset += 1;
        loopTimes -= 1;
    };

    // if n is odd, that means we can't set the middle value from the above steps
    // so, we should do it independently
    if (n % 2 === 1) {
        res[mid][mid] = count;
    };

    return res;
};

console.log(generateMatrix(3)); // [[1,2,3],[8,9,4],[7,6,5]]
console.log(generateMatrix(1)); // [[1]]
