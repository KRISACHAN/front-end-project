// https://programmercarl.com/0383.%E8%B5%8E%E9%87%91%E4%BF%A1.html

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    const strArr = new Array(26).fill(0),
        base = 'a'.charCodeAt();
    for (const s of magazine) {
        // 记录 magazine里各个字符出现次数
        strArr[s.charCodeAt() - base]++;
    }
    for (const s of ransomNote) {
        // 对应的字符个数做--操作
        const index = s.charCodeAt() - base;
        if (!strArr[index]) return false; // 如果没记录过直接返回false
        strArr[index]--;
    }
    return true;
};
