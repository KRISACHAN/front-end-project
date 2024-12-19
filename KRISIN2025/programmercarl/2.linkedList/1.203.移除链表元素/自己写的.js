// https://leetcode.cn/problems/remove-linked-list-elements/

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    const listNode = new ListNode(val, head);
    let currentNode = listNode;
    while (currentNode.next) {
        if (currentNode.next.val === val) {
            currentNode.next = currentNode.next.next;
            continue;
        };
        currentNode = currentNode.next
    }
    return listNode.next;
};
