'use strict'
const randomList = require('./randomList')
const insertionSort = arr => {
    const len = arr.length
    let j, temp
    for (let i = 0; i < len; ++i) {
        j = i /* 存储当前索引，便于后续与数组其他元素对比 */
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1]
            j--
        }
        [arr[j], arr[i]] = [arr[i], arr[i]]
    }
    return arr
}
console.time('insertionSort')
const sortedArr = insertionSort(randomList)
console.log(sortedArr)
console.timeEnd('insertionSort')