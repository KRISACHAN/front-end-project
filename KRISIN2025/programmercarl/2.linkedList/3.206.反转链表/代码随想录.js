// https://programmercarl.com/0206.%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.html

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 双指针：
var reverseList = function (head) {
    if (!head || !head.next) return head;
    let temp = null,
        pre = null,
        cur = head;
    while (cur) {
        temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    // temp = cur = null;
    return pre;
};

// 递归：
var reverse = function (pre, head) {
    if (!head) return pre;
    const temp = head.next;
    head.next = pre;
    pre = head;
    return reverse(pre, temp);
};

var reverseList = function (head) {
    return reverse(null, head);
};

// 递归2
var reverse = function (head) {
    if (!head || !head.next) return head;
    // 从后往前翻
    const pre = reverse(head.next);
    head.next = pre.next;
    pre.next = head;
    return head;
};

var reverseList = function (head) {
    let cur = head;
    while (cur && cur.next) {
        cur = cur.next;
    }
    reverse(head);
    return cur;
};
