// https://leetcode.cn/problems/spiral-matrix-ii/description/

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
   let startX = 0;
   let startY = 0;
   let loop = Math.floor(n / 2);
   let mid = Math.floor(n / 2);
   let offset = 1;
   let count = 1;
   let res = [];

   while (loop--) {
        let row = startX;
        let col = startY;

        for (; col < n - offset; col++) {
            res[row][col] = count++;
        };

        // for (; row < n)
   };
};
