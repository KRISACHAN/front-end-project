// https://programmercarl.com/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.html

// 两种循环实现方式
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 先判断是否是环形链表
var detectCycle = function(head) {
    if(!head || !head.next) return null;
    let slow =head.next, fast = head.next.next;
    while(fast && fast.next && fast!== slow) {
        slow = slow.next;
        fast = fast.next.next;
    }
    if(!fast || !fast.next ) return null;
    slow = head;
    while (fast !== slow) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
};

var detectCycle = function(head) {
    if(!head || !head.next) return null;
    let slow =head.next, fast = head.next.next;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(fast == slow) {
            slow = head;
            while (fast !== slow) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
};
