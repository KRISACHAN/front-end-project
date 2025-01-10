// https://leetcode.cn/problems/binary-search/description/

/**
 * 二分查找算法
 * 在一个有序数组中查找目标值，返回目标值的下标，如果不存在返回-1
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 *
 * @param {number[]} nums - 升序排列的整数数组
 * @param {number} target - 要查找的目标值
 * @return {number} - 目标值在数组中的下标，不存在则返回-1
 */
var search = function (nums, target) {
    // 初始化左右指针
    let left = 0;
    let right = nums.length - 1;
    let mid = 0;

    // 当左指针小于等于右指针时继续查找
    while (left <= right) {
        // 计算中间位置
        // (right - left) >> 1 等价于 Math.floor((right - left) / 2)
        // >> 1 表示向右移位1位，相当于除以2并向下取整，比除法运算更高效
        mid = left + ((right - left) >> 1);

        // 如果中间值大于目标值，在左半部分继续查找
        if (nums[mid] > target) {
            right = mid - 1;
        }
        // 如果中间值小于目标值，在右半部分继续查找
        else if (nums[mid] < target) {
            left = mid + 1;
        }
        // 找到目标值，返回其下标
        else {
            return mid;
        }
    }

    // 未找到目标值，返回-1
    return -1;
};
