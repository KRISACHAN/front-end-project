// https://programmercarl.com/0242.%E6%9C%89%E6%95%88%E7%9A%84%E5%AD%97%E6%AF%8D%E5%BC%82%E4%BD%8D%E8%AF%8D.html

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    const resSet = new Array(26).fill(0);
    const base = "a".charCodeAt();
    for(const i of s) {
        resSet[i.charCodeAt() - base]++;
    }
    for(const i of t) {
        if(!resSet[i.charCodeAt() - base]) return false;
        resSet[i.charCodeAt() - base]--;
    }
    return true;
};

var isAnagram = function(s, t) {
  if(s.length !== t.length) return false;
  let char_count = new Map();
  for(let item of s) {
    char_count.set(item, (char_count.get(item) || 0) + 1) ;
  }
  for(let item of t) {
    if(!char_count.get(item)) return false;
    char_count.set(item, char_count.get(item)-1);
  }
  return true;
};
