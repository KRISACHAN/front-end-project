// https://leetcode.com/problems/remove-element/description/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // set a slow pointer to update the pre-replaced location
    let slowPointer = 0;
    // use for loop to represent a fast pointer routing
    for (let fastPointer = 0, len = nums.length; fastPointer < len; ++fastPointer) {
        // the main thinking is moving fastPointer step by step to get current target
        // and if we find the matched target is not equal to val
        // we can move slowPointer at the same time
        // on the contrary, if  the matched target is equal to val
        // we only need to stop moving slowPointer
        // if so, in next step, we can remove the equalled target
        // and make the next value moved forward
        if (nums[fastPointer] !== val) {
            nums[slowPointer++] = nums[fastPointer];
        };
    };
    return slowPointer;
};

console.log(removeElement([3,2,2,3], 2)) // 2
console.log(removeElement([0,1,2,2,3,0,4,2], 2)) // 5
