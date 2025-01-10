// https://leetcode.cn/problems/remove-linked-list-elements/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 移除链表中所有值为 val 的节点
 * 时间复杂度：O(n)，其中 n 是链表的长度，需要遍历一次链表
 * 空间复杂度：O(1)，只使用了常数个变量
 *
 * @param {ListNode} head 链表的头节点
 * @param {number} val 需要移除的值
 * @return {ListNode} 返回处理后的链表头节点
 */
var removeElements = function (head, val) {
    // 创建虚拟头节点，简化边界情况的处理
    const listNode = new ListNode(val, head);
    let currentNode = listNode;

    // 遍历链表
    while (currentNode.next) {
        // 如果下一个节点的值等于目标值，则删除该节点
        if (currentNode.next.val === val) {
            currentNode.next = currentNode.next.next;
            continue;
        }
        // 移动到下一个节点
        currentNode = currentNode.next;
    }

    // 返回虚拟头节点的下一个节点，即实际的头节点
    return listNode.next;
};
