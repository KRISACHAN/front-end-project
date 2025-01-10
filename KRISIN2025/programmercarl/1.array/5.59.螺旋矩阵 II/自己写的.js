// https://leetcode.cn/problems/spiral-matrix-ii/description/

/**
 * @param {number} n
 * @return {number[][]}
 *
 * 时间复杂度：O(n^2) - 需要填充 n×n 个格子
 * 空间复杂度：O(1) - 除了返回的矩阵外，只使用了常数级别的额外空间
 *
 * 这个算法的核心思想是：
 *  按照顺时针方向，从外到内一圈一圈地填充数字
 *  每一圈都遵循"左→右→下→左→上"的顺序填充
 *  对于奇数阶矩阵，最后需要单独填充中心点
 */
var generateMatrix = function (n) {
    // 定义起始位置坐标
    let startX = 0;
    let startY = 0;
    // 需要循环的圈数
    let loop = Math.floor(n / 2);
    // 矩阵中心点位置（奇数阶矩阵才有）
    let mid = Math.floor(n / 2);
    // 每圈遍历的偏移量
    let offset = 1;
    // 要填充的数字
    let count = 1;
    // 结果矩阵
    // 初始化一个 n x n 的二维数组，填充为 0
    let res = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    // 按圈数循环
    while (loop--) {
        let row = startX;
        let col = startY;

        // 1. 从左到右填充上边
        for (; col < n - offset; col++) {
            res[row][col] = count++;
        }

        // 2. 从上到下填充右边
        for (; row < n - offset; row++) {
            res[row][col] = count++;
        }

        // 3. 从右到左填充下边
        for (; col > startY; col--) {
            res[row][col] = count++;
        }

        // 4. 从下到上填充左边
        for (; row > startX; row--) {
            res[row][col] = count++;
        }

        // 进入内层循环
        startX++;
        startY++;
        // 每进入一层偏移量加1
        offset++;
    }

    // 如果n为奇数，单独填充最中心的数
    if (n % 2 === 1) {
        res[mid][mid] = count;
    }

    return res;
};
