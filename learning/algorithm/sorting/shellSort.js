'use strict'
const randomList = require('./randomList')
const shellSort = arr => {
    let gaps = [5, 3, 1] // 定义步长以及分割次数
    let len = arr.length
    for (let g = 0, gLen = gaps.length; g < gaps.length; ++g) {
        for (let i = gaps[g]; i < len; ++i) {
            let j
            for (j = i; j >= gaps[g] && arr[j - gaps[g]] > arr[i]; j -= gaps[g]) {
                arr[j] = arr[j - gaps[g]]
            }
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    return arr
}
console.time('shellSort')
const sortedArr = shellSort(randomList)
console.log(sortedArr)
console.timeEnd('shellSort')