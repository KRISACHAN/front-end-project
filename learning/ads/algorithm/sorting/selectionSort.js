'use strict'
/**
 * 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
 * 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 重复第二步，直到所有元素均排序完毕。
 */
/**
 * @ 最差时间复杂度 : O(n²)
 * @ 平均时间复杂度 : O(n²)
 * @ 最佳时间复杂度 : O(n²)
 * @ 稳定度 : 不稳定
 * @ 空间复杂度 : O(1)
 * @ 排序方式 : In-place 
 */
const selectionSort = arr => {
    const len = arr.length
    let minIndex
    for (let i = 0; i < len - 1; ++i) {
        minIndex = i
        for (let j = i + 1; j < len; ++j) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}
const arr = [1, 2, 3, 4 ,8, 2, 5, 8, 7, 8, 11, 13, 17, 19, 20, 22, 5, 30, 29, 28]
const sortedArr = selectionSort(arr)
console.log(sortedArr)