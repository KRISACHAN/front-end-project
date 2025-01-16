// https://leetcode.cn/problems/valid-anagram/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    };

    const map = new Map();

    for (const item of s) {
        map.set(item, (map.get(item) || 0) + 1);
    };

    for (const item of t) {
        if (!map.get(item)) {
            return false;
        };
        map.set(item, map.get(item) - 1);
    };

    return true;
};
