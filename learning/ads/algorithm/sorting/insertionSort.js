'use strict'
/**
 * 算法步骤：
 * 1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列；
 * 2. 从头到尾依次扫描未排序序列，如果扫描到的元素与有序序列中的某个元素相等，则将扫描到的元素插入到相等元素的后面。
 */
/*
 * @ 最差时间复杂度 : O(n²)
 * @ 平均时间复杂度 : O(n²)
 * @ 最佳时间复杂度 : O(n)
 * @ 稳定度 : 稳定
 * @ 空间复杂度 : O(1)
 * @ 排序方式 : In-place 
 */
const randomList = require('./randomList')
const insertionSort = arr => {
    const len = arr.length
    let prePos, i, j
    for (i = 1; i < len; ++i) {
        prePos = i - 1
        while (prePos >= 0 && arr[prePos] > arr[i]) {
            arr[prePos + 1] = arr[prePos]
            prePos--
        }
        arr[prePos + 1] = arr[i]
    }
    return arr
}
console.time('insertionSort')
const sortedArr = insertionSort(randomList)
console.log(sortedArr)
console.timeEnd('insertionSort')