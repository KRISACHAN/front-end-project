// https://leetcode.cn/problems/reverse-linked-list/description/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // 处理边界情况：如果链表为空或只有一个节点，直接返回
    if (!head || !head.next) {
        return head;
    }

    // 定义三个指针
    let temp = null, // 临时指针，用于保存下一个节点
        pre = null, // 前驱节点
        cur = head; // 当前节点

    // 遍历链表进行反转
    while (cur) {
        temp = cur.next; // 1. 保存下一个节点
        cur.next = pre; // 2. 反转当前节点的指针
        pre = cur; // 3. 移动前驱指针
        cur = temp; // 4. 移动当前指针
    }

    return pre; // 返回新的头节点
};
