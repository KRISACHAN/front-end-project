// https://programmercarl.com/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4.html

var getListLen = function (head) {
    let len = 0,
        cur = head;
    while (cur) {
        len++;
        cur = cur.next;
    }
    return len;
};
var getIntersectionNode = function (headA, headB) {
    let curA = headA,
        curB = headB,
        lenA = getListLen(headA), // 求链表A的长度
        lenB = getListLen(headB);
    if (lenA < lenB) {
        // 让curA为最长链表的头，lenA为其长度

        // 交换变量注意加 “分号” ，两个数组交换变量在同一个作用域下时
        // 如果不加分号，下面两条代码等同于一条代码: [curA, curB] = [lenB, lenA]

        [curA, curB] = [curB, curA];
        [lenA, lenB] = [lenB, lenA];
    }
    let i = lenA - lenB; // 求长度差
    while (i-- > 0) {
        // 让curA和curB在同一起点上（末尾位置对齐）
        curA = curA.next;
    }
    while (curA && curA !== curB) {
        // 遍历curA 和 curB，遇到相同则直接返回
        curA = curA.next;
        curB = curB.next;
    }
    return curA;
};
