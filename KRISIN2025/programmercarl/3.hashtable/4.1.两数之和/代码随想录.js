// https://programmercarl.com/0001.%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C.html

var twoSum = function (nums, target) {
    let hash = {};
    for (let i = 0; i < nums.length; i++) {
        // 遍历当前元素，并在map中寻找是否有匹配的key
        if (hash[target - nums[i]] !== undefined) {
            return [i, hash[target - nums[i]]];
        }
        hash[nums[i]] = i; // 如果没找到匹配对，就把访问过的元素和下标加入到map中
    }
    return [];
};
