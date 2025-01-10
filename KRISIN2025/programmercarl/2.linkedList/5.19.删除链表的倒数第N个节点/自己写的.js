// https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/

// 题目：删除链表的倒数第 n 个结点，并返回链表的头结点
// 示例：
// 输入：head = [1,2,3,4,5], n = 2  输出：[1,2,3,5]
// 输入：head = [1], n = 1          输出：[]
// 输入：head = [1,2], n = 1        输出：[1]

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head - 链表的头节点
 * @param {number} n - 需要删除的倒数第n个节点
 * @return {ListNode} - 返回删除节点后的链表头节点
 *
 * 【使用 fast.next !== null 作为循环条件】
 *
 * 初始状态（n=2）：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 * s            f
 *
 * 第一次同时移动：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *               s         f
 *
 * 第二次同时移动：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *                    s         f
 *                             ↑
 *                     停在最后节点，perfect！
 * 结果：slow 在 3，正好是要删除的 4 的前一个节点
 *
 *
 * 【如果使用 fast !== null 作为循环条件】
 *
 * 初始状态（n=2）：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 * s            f
 *
 * 第一次同时移动：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *               s         f
 *
 * 第二次同时移动：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *                    s         f
 *
 * 第三次同时移动（多走了一步！）：
 * dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *                         s         f
 *                                  ↑
 *                           跑到null了，糟糕！
 * 结果：slow 跑过头了，不在正确位置上
 *
 * 时间复杂度: O(n)，其中 n 为链表长度，只需遍历一次链表
 * 空间复杂度: O(1)，只使用了常数个变量
 */
var removeNthFromEnd = function (head, n) {
    // 创建虚拟头节点，统一处理逻辑，防止删除头节点的特殊情况
    let dummyHead = new ListNode(0, head);

    // 初始化快慢指针，都指向虚拟头节点
    let fast = dummyHead;
    let slow = dummyHead;

    // 先让快指针移动n步，创造出快慢指针之间的距离
    while (n--) {
        fast = fast.next;
    }

    // 快慢指针同时移动，保持 n 的距离
    // fast.next !== null 确保 fast 停在最后一个节点，而不是 null
    while (fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // 此时 slow 在待删除节点的前一个位置
    // 执行删除操作：让 slow 的 next 跳过一个节点指向下下个节点
    slow.next = slow.next.next;

    // 返回真实的头节点（去掉虚拟头节点）
    return dummyHead.next;
};
