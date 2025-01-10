// https://programmercarl.com/0019.%E5%88%A0%E9%99%A4%E9%93%BE%E8%A1%A8%E7%9A%84%E5%80%92%E6%95%B0%E7%AC%ACN%E4%B8%AA%E8%8A%82%E7%82%B9.html

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 创建哨兵节点，简化解题逻辑
    let dummyHead = new ListNode(0, head);
    let fast = dummyHead;
    let slow = dummyHead;
    while (n--) fast = fast.next;
    while (fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummyHead.next;
};
