// https://www.greatfrontend.com/interviews/study/blind75/questions/algo/count-ones-in-binary
/**
 * Given a positive integer num,
 * determine the number of set bits (1s) present in the binary representation of the given number,
 * commonly referred to as the Hamming weight.
 *
 * Input
 *  num: number: A positive integer
 *
 * Examples
 *  Input: num = 8
 *  Output: 1
 *  Explanation: The given number in binary (1000) has a total of one set bit
 *
 *  Input: num = 9
 *  Output: 2
 *  Explanation: The given number in binary (1001) has a total of two set bit
 *
 *  Input: num = 123
 *  Output: 6
 *  Explanation: The given number in binary (1111011) has a total of six set bit
 */

function countOnesInBinary(num) {
    let count = 0;
    while (num !== 0) {
        num = num & (num - 1);
        count++;
    }
    return count;
}

console.log(countOnesInBinary(8));
console.log(countOnesInBinary(9));
console.log(countOnesInBinary(123));
