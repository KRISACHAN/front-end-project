// https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/description/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 获取链表长度的辅助函数
 * 时间复杂度: O(n), n为链表长度
 * 空间复杂度: O(1)
 */
function getListLen(head) {
    let len = 0;
    let cur = head;

    while (cur) {
        len++;
        cur = cur.next;
    }

    return len;
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 *
 * 时间复杂度: O(m + n), m和n分别为两个链表的长度
 *  计算长度需要 O(m) + O(n)
 *  对齐操作需要 O(|m-n|)
 *  同时前进需要 O(min(m,n))
 *  总体仍是 O(m + n)
 *
 * 空间复杂度: O(1), 只使用了几个指针和变量，是常数级空间
 */

function getIntersectionNode(headA, headB) {
    // 获取两个链表的指针和长度
    let curA = headA;
    let curB = headB;
    let lenA = getListLen(headA);
    let lenB = getListLen(headB);

    // 确保curA指向较长的链表
    if (lenA < lenB) {
        [curA, curB] = [curB, curA];
        [lenA, lenB] = [lenB, lenA];
    }

    // 让较长的链表先走完差值步数
    let i = lenA - lenB;
    while (i-- > 0) {
        curA = curA.next;
    }

    // 两个指针同时前进，直到找到相交点或到达末尾
    // 循环继续的条件：curA 不为空 且 curA 和 curB 不指向同一个节点
    // 对齐后的状态：
    // curA: 1 -> 2 -> [8] -> 4 -> 5
    // curB: 3 -> 7 -> [8] -> 4 -> 5
    //
    // 循环过程：
    // 第一次循环：
    //    curA: 1 -> [2] -> 8 -> 4 -> 5
    //    curB: 3 -> [7] -> 8 -> 4 -> 5
    // 比较：1 ≠ 3，继续
    //
    // 第二次循环：
    //    curA: 1 -> 2 -> [8] -> 4 -> 5
    //    curB: 3 -> 7 -> [8] -> 4 -> 5
    // 比较：2 ≠ 7，继续
    //
    // 第三次循环：
    //    curA: 1 -> 2 -> 8 -> 4 -> 5
    //    curB: 3 -> 7 -> 8 -> 4 -> 5
    // 比较：8 = 8，找到相交点！退出循环
    //
    // 找到相交点：curA === curB，退出循环
    // 没有相交点：curA === null，退出循环
    while (curA && curA !== curB) {
        curA = curA.next;
        curB = curB.next;
    }

    return curA; // 如果不相交，会返回null
}
