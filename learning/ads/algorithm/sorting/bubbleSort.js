'use strict'
/**
 * 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
 * 针对所有的元素重复以上的步骤，除了最后一个。
 * 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 */
/**
 * @ 最差时间复杂度（反序） : O(n²)
 * @ 平均时间复杂度 : O(n²)
 * @ 最佳时间复杂度（正序） : O(n)
 * @ 稳定度 : 稳定
 * @ 空间复杂度 : O(1)
 * @ 排序方式 : In-place 
 */
const bubbleSort = arr => {
    const len = arr.length - 1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
const arr = [1, 2, 3, 4 ,8, 2, 5, 8, 7, 8, 11, 13, 17, 19, 20, 22, 5, 30, 29, 28]
const sortedArr = bubbleSort(arr)
console.log(sortedArr)