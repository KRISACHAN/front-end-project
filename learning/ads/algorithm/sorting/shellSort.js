'use strict'
/**
 * 算法步骤：
 * 1. 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
 * 2. 按增量序列个数 k，对序列进行 k 趟排序；
 * 3. 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 */
/**
 * @ 最差时间复杂度 : O(n log²n)
 * @ 平均时间复杂度 : O(n logn)
 * @ 最佳时间复杂度 : O(n log²n)
 * @ 稳定度 : 不稳定
 * @ 空间复杂度 : O(1)
 * @ 排序方式 : In-place 
 */
const randomList = require('./randomList')
const shellSort = arr => {
    let len = arr.length
    let i, j, temp
    let gap = 1
    while (gap < len / 2) {
        gap = gap * 2 + 1
    }
    for (gap; gap > 0; gap = Math.floor(gap / 2)) {
        for (i = gap; i < len; ++i) {
            temp = arr[i]
            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = temp
        }
    }
    return arr
}
console.time('shellSort')
const sortedArr = shellSort(randomList)
console.log(sortedArr)
console.timeEnd('shellSort')