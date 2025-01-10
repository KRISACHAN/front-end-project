// https://leetcode.cn/problems/swap-nodes-in-pairs/description/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 两两交换链表中的节点
 * @param {ListNode} head 链表的头节点
 * @return {ListNode} 交换后的链表头节点
 *
 * 时间复杂度: O(n)，其中 n 是链表的节点数，需要遍历一次链表
 * 空间复杂度: O(1)，只使用了常数个变量
 */
var swapPairs = function (head) {
    // 创建虚拟头节点，简化边界情况的处理
    let res = new ListNode(0, head);
    let temp = res;

    // 确保后面有两个节点可以交换
    while (temp.next && temp.next.next) {
        // cur 指向待交换的第二个节点
        let cur = temp.next.next;
        // pre 指向待交换的第一个节点
        let pre = temp.next;

        // 交换节点的过程：
        // 1. 将第一个节点指向第二个节点的下一个
        pre.next = cur.next;
        // 2. 将第二个节点指向第一个节点
        cur.next = pre;
        // 3. 将前一个节点指向交换后的第一个节点（原第二个节点）
        temp.next = cur;
        // 移动 temp 到下一组待交换节点的前一个位置
        temp = pre;
    }
    // 返回虚拟头节点的下一个节点，即实际的头节点
    return res.next;
};
