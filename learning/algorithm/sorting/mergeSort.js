'use strict'
/**
 * 算法步骤：
 * 1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
 * 2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
 * 3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
 * 4. 重复步骤 3 直到某一指针达到序列尾；
 * 5. 将另一序列剩下的所有元素直接复制到合并序列尾。
 */
/**
 * @ 最差时间复杂度 : O(n log n)
 * @ 平均时间复杂度 : O(n log n)
 * @ 最佳时间复杂度 : O(n log n)
 * @ 稳定度 : 稳定
 * @ 空间复杂度 : O(n)
 * @ 排序方式 : Out-place 
 */
const randomList = require('./randomList')
const mergeSort = arr => {
    const merge = (left, right) => {
        let resArr = []
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                resArr.push(left.shift())
            } else {
                resArr.push(right.shift())
            }
        }
        while (left.length) {
            resArr.push(left.shift())
        }
        while (right.length) {
            resArr.push(right.shift())
        }
        return resArr
    }
    let len = arr.length
    if (len < 2) {
        return arr
    }
    let middle = Math.floor(len / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}
console.time('mergeSort')
const sortedArr = mergeSort(randomList)
console.log(sortedArr)
console.timeEnd('mergeSort')