// https://leetcode.cn/problems/design-linked-list/

/**
 * @param {numberumber} val
 * @param {ListNode} next
 * @desc 初始化 ListNode 对象。
 * @return {void}
 */
var ListNode = function (val, next) {
    this.val = val;
    this.next = next;
};

/**
 * 初始化 MyLinkedList 对象。
 * @return {void}
 */
var MyLinkedList = function () {
    this.size = 0;
    this.tail = null;
    this.head = null;
};

/**
 * 获取指定位置的节点
 * @param {number} index - 节点索引
 * @return {ListNode | null} 返回找到的节点，如果索引无效则返回null
 */
MyLinkedList.prototype.getNode = function (index) {
    if (index < 0 || index >= this.size) {
        return null;
    }
    // 使用虚拟头节点简化操作
    let virtualNode = new ListNode(0, this.head);
    let virtualIndex = index;
    // 遍历到目标位置
    while (virtualIndex >= 0) {
        virtualNode = virtualNode.next;
        virtualIndex -= 1;
    }
    return virtualNode;
};

/**
 * 获取指定位置节点的值
 * @param {number} index - 节点索引
 * @return {number} 节点值，如果索引无效则返回-1
 */
MyLinkedList.prototype.get = function (index) {
    const currentNode = this.getNode(index);
    return currentNode ? currentNode.val : -1;
};

/**
 * 在链表头部添加新节点
 * @param {number} val - 要添加的值
 */
MyLinkedList.prototype.addAtHead = function (val) {
    // 新节点的next指向原head
    const currentNode = new ListNode(val, this.head);
    this.head = currentNode;
    this.size += 1;
    // 如果是第一个节点，需要更新tail
    if (!this.tail) {
        this.tail = currentNode;
    }
};

/**
 * 在链表尾部添加新节点
 * @param {number} val - 要添加的值
 */
MyLinkedList.prototype.addAtTail = function (val) {
    const currentNode = new ListNode(val, null);
    this.size += 1;
    // 如果链表不为空，更新原tail的next和tail指针
    if (this.tail) {
        // 此处顺序不能调换
        // // 假设当前链表：head -> [1] -> [2] <- tail
        // 先连接：[2] -> [3]
        this.tail.next = currentNode;
        // 再更新：[2] -> [3] -> [4]
        this.tail = currentNode;
        // 如果顺序反了
        // tail 指针已经指向新节点了
        // 再设置 this.tail.next 就变成了新节点指向自己
        // 这样就会形成环，破坏链表结构
        // 所以顺序必须是：先连接，再移动指针！
        return;
    }
    // 如果链表为空，head和tail都指向新节点
    this.tail = currentNode;
    this.head = currentNode;
};

/**
 * 在指定位置之前添加新节点
 * @param {number} index - 目标位置
 * @param {number} val - 要添加的值
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    // 处理特殊情况
    if (index > this.size) return;
    if (index <= 0) {
        this.addAtHead(val);
        return;
    }
    if (index === this.size) {
        this.addAtTail(val);
        return;
    }
    // 获取目标位置的前一个节点
    const prevNode = this.getNode(index - 1);
    // 创建新节点，并维护next指针
    prevNode.next = new ListNode(val, prevNode.next);
    this.size += 1;
};

/**
 * 删除指定位置的节点
 * @param {number} index - 要删除的节点位置
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.size) return;

    // 处理删除头节点的情况
    if (index === 0) {
        this.head = this.head.next;
        this.size -= 1;
        // 如果删除后链表为空，需要更新 tail
        if (this.size === 0) {
            this.tail = null;
        }
        return;
    }

    // 获取要删除节点的前一个节点
    const prevNode = this.getNode(index - 1);
    prevNode.next = prevNode.next.next;
    // 如果删除的是尾节点，需要更新tail
    if (index === this.size - 1) {
        this.tail = prevNode;
    }
    this.size -= 1;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
