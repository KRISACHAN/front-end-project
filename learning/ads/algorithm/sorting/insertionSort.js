'use strict'
/**
 * 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
 * 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。
 * （如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
 */
/*
 * @ 最差时间复杂度 : O(n²)
 * @ 平均时间复杂度 : O(n²)
 * @ 最佳时间复杂度 : O(n)
 * @ 稳定度 : 稳定
 * @ 空间复杂度 : O(1)
 * @ 排序方式 : In-place 
 */
const insertionSort = arr => {
    const len = arr.length
    let preIndex
    for (let i = 1; i < len; ++i) {
        preIndex = i - 1
        while (preIndex >= 0 && arr[preIndex] > arr[i]) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = arr[i]
    }
    return arr
}
const arr = [1, 2, 3, 4 ,8, 2, 5, 8, 7, 8, 11, 13, 17, 19, 20, 22, 5, 30, 29, 28]
const sortedArr = insertionSort(arr)
console.log(sortedArr)