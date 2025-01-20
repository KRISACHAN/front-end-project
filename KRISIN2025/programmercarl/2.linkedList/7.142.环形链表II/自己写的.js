// https://leetcode.cn/problems/linked-list-cycle-ii/description/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 *
 * 时间复杂度: O(n) - n为链表长度
 * 空间复杂度: O(1) - 只使用了几个指针变量
 */
var detectCycle = function (head) {
    // 处理边界情况：空链表或只有一个节点
    if (!head || !head.next) {
        return null;
    }

    // 初始化快慢指针
    // 慢指针每次移动一步，快指针每次移动两步
    let slow = head.next;
    let fast = head.next.next;

    // 第一阶段：检测是否存在环
    // 当快指针能够追上慢指针时，说明存在环
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        // 快慢指针相遇，说明存在环
        if (fast == slow) {
            // 第二阶段：找到环的入口
            // 将慢指针重置到头节点，快指针保持在相遇点
            // 两个指针每次都移动一步，相遇点即为环的入口
            slow = head;

            while (fast !== slow) {
                slow = slow.next;
                fast = fast.next;
            }

            return slow; // 返回环的入口节点
        }
    }

    // 如果快指针到达链表末尾，说明没有环
    return null;
};
