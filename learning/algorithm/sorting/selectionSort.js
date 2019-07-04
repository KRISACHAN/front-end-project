'use strict'
/**
 * 算法步骤：
 * 1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置；
 * 2. 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾；
 * 3. 重复第二步，直到所有元素均排序完毕。
 */
/**
 * @ 最差时间复杂度 : O(n²)
 * @ 平均时间复杂度 : O(n²)
 * @ 最佳时间复杂度 : O(n²)
 * @ 稳定度 : 不稳定
 * @ 空间复杂度 : O(1)
 * @ 排序方式 : In-place 
 */
const randomList = require('./randomList')
const selectionSort = arr => {
    const len = arr.length
    let min, i, j
    for (i = 0; i < len - 1; ++i) {
        min = i
        for (j = i + 1; j < len; ++j) {
            if (arr[j] < arr[min]) {
                min = j
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]]
    }
    return arr
}
console.time('selectionSort')
const sortedArr = selectionSort(randomList)
console.log(sortedArr)
console.timeEnd('selectionSort')