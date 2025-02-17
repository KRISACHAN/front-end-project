// https://leetcode.com/problems/binary-search/description/

/**
 * binary / ˈbaɪnəri / search
 * runtime complexity / kəmˈpleksəti /：O(log n)
 * space complexity：O(1)
 *
 * @param {number[]} nums - sorted array in ascending order
 * @param {number} target - value to search for
 * @return {number} - index of target if found, -1 otherwise
 */
var search = function (nums, target) {
    // set the left, right boundaries
    let left = 0, right = nums.length - 1;

    // use while loop to narrow the range of the result
    while (left <= right) {
        // ensure the pivot / ˈpɪvət / point
        let mid = left + ((right - left) >> 1);
        // if target is bigger that nums[mid]
        // it means the result is in the right side of nums
        if (nums[mid] > target) {
            right = mid - 1;
        // if target is smaller that nums[mid]
        // it means the result is in the left side of nums
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            // if not the above two cases
            // it means mid is the result
            return mid;
        }
    }

    // if target isn't in nums, return -1
    return -1;
};

var nums = [-1,0,3,5,9,12];

console.log(search(nums, 9)) // 4
console.log(search(nums, 2)) // -1
