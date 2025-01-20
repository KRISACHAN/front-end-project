// https://programmercarl.com/0202.%E5%BF%AB%E4%B9%90%E6%95%B0.html

var isHappy = function (n) {
    let m = new Map();

    const getSum = num => {
        let sum = 0;
        while (n) {
            sum += (n % 10) ** 2;
            n = Math.floor(n / 10);
        }
        return sum;
    };

    while (true) {
        // n出现过，证明已陷入无限循环
        if (m.has(n)) return false;
        if (n === 1) return true;
        m.set(n, 1);
        n = getSum(n);
    }
};

// 方法二：使用环形链表的思想 说明出现闭环 退出循环
var isHappy = function (n) {
    if (getN(n) == 1) return true;
    let a = getN(n),
        b = getN(getN(n));
    // 如果 a === b
    while (b !== 1 && getN(b) !== 1 && a !== b) {
        a = getN(a);
        b = getN(getN(b));
    }
    return b === 1 || getN(b) === 1;
};

// 方法三：使用Set()更简洁
/**
 * @param {number} n
 * @return {boolean}
 */

var getSum = function (n) {
    let sum = 0;
    while (n) {
        sum += (n % 10) ** 2;
        n = Math.floor(n / 10);
    }
    return sum;
};
var isHappy = function (n) {
    let set = new Set(); // Set() 里的数是惟一的
    // 如果在循环中某个值重复出现，说明此时陷入死循环，也就说明这个值不是快乐数
    while (n !== 1 && !set.has(n)) {
        set.add(n);
        n = getSum(n);
    }
    return n === 1;
};

// 方法四：使用Set()，求和用reduce
var isHappy = function (n) {
    let set = new Set();
    let totalCount;
    while (totalCount !== 1) {
        let arr = ('' + (totalCount || n)).split('');
        totalCount = arr.reduce((total, num) => {
            return total + num * num;
        }, 0);
        if (set.has(totalCount)) {
            return false;
        }
        set.add(totalCount);
    }
    return true;
};
