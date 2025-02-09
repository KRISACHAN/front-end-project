// https://www.greatfrontend.com/interviews/study/blind75/questions/algo/array-find-missing-number-in-sequence
/**
 * Given an array numbers of size n storing n different integers which fall within the range [0, n],
 * implement a function to identify the missing element in the array.
 * All numbers except one are present in the array.
 * Find the missing number.
 *
 * Input
 *  numbers: number[]: An array of integers
 *
 * Examples
 *  Input: numbers = [1,3,0]
 *  Output: 2
 *  Explanation: The array has a size of 3,
 *               and within the range from 0 to 3,
 *               the number 2 is missing from the array
 *
 *  Input: numbers = [1]
 *  Output: 0
 *  Explanation: The array has a size of 1,
 *               and within the range from 0 to 1,
 *               the number 0 is missing from the array
 *
 *  Input: numbers = [3,0,4,2,1]
 *  Output: 5
 *  Explanation: The array has a size of 5,
 *               and within the range from 0 to 5,
 *               the number 5 is missing from the array
 */

/**
 * @param {number[]} numbers
 * @return {number}
 */
function findMissingNumberInSequence(numbers) {
    // Using Arithmetic Sequence Sum Formula
    // For sequence 0 + 1 + 2 + ... + n, the sum is: n(n+1)/2
    const n = numbers.length;
    const expectedSum = (n * (n + 1)) / 2;
    const realSum = numbers.reduce((total, current) => total + current, 0);
    return expectedSum - realSum;
}

console.log(findMissingNumberInSequence([1, 3, 0]));
console.log(findMissingNumberInSequence([1]));
console.log(findMissingNumberInSequence([3, 0, 4, 2, 1]));
