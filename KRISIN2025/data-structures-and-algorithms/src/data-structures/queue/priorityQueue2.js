// https://github.com/KRISACHAN/ying-datastructures-algorithms/blob/master/src/core/datastructures/queue/priorityQueueArray.ts
// https://www.youtube.com/watch?v=7jUzhPHCKAU
// https://github.com/beforesemicolon/tutorials-files/blob/master/priority-queue2.js

class PriorityQueue {
    #firstItem = null;
    #lastItem = null;
    #size = 0;
    #capacity = null;

    constructor(capacity = null) {
      this.#capacity = capacity;
    }

    get size() {
      return this.#size;
    }

    get isEmpty() {
      return this.size === 0;
    }

    get isFull() {
      return this.#capacity ? this.size === this.#capacity : false;
    }

    #createItem(value, priority) {
      return {
        next: null,
        value,
        priority
      }
    }

    /**
     * 向优先队列中添加元素
     * @param {*} item - 要添加的元素
     * @param {number} priority - 元素的优先级，默认为0，数值越大优先级越高
     * @returns {number} - 返回队列的当前长度
     */
    enqueue(item, priority = 0) {
        // 确保优先级是非负数
        priority = Math.max(Number(priority), 0);

        // 检查队列是否已满
        if(!this.isFull) {
            // 创建新的节点对象
            const newItem = this.#createItem(item, priority);

            // 情况1: 空队列 - 新节点既是头节点也是尾节点
            if(this.isEmpty) {
                this.#firstItem = newItem;
                this.#lastItem = newItem;
            }
            // 情况2: 新节点优先级 <= 尾节点优先级
            // 直接添加到队列尾部，保持FIFO顺序
            else if(newItem.priority <= this.#lastItem.priority) {
                this.#lastItem.next = newItem;  // 当前尾节点指向新节点
                this.#lastItem = newItem;       // 更新尾节点为新节点
            }
            // 情况3: 新节点优先级 > 头节点优先级
            // 将新节点插入到队列头部
            else if(newItem.priority > this.#firstItem.priority) {
                newItem.next = this.#firstItem; // 新节点指向当前头节点
                this.#firstItem = newItem;      // 更新头节点为新节点
            }
            // 情况4: 新节点优先级介于头尾节点之间
            // 需要遍历找到合适的插入位置
            else {
                let current = this.#firstItem;  // 从头节点开始遍历

                while(current) {
                    // 找到第一个优先级小于新节点的位置
                    if(newItem.priority > current.next.priority) {
                        // 执行链表插入操作
                        newItem.next = current.next;    // 新节点指向当前节点的下一个节点
                        current.next = newItem;         // 当前节点指向新节点
                        break;
                    }
                    current = current.next;  // 继续遍历下一个节点
                }
            }

            // 更新队列大小
            this.#size += 1;
        }

        // 返回更新后的队列大小
        return this.size;
    }

    /**
     * 从优先队列中移除并返回最高优先级的元素
     * @returns {*} removedItem - 被移除的元素，队列为空时返回 null
     */
    dequeue() {
        let removedItem = null;

        // 检查队列是否为空
        if(!this.isEmpty) {
            // 获取头节点的值（最高优先级的元素）
            removedItem = this.#firstItem.value;
            // 将头节点指向下一个节点
            this.#firstItem = this.#firstItem.next;
            // 减少队列大小
            this.#size -= 1;
        }

        return removedItem;
    }

    peek() {
        if(this.isEmpty) {
            return null;
        }

        return this.#firstItem.value;
    }

    toString() {
        if(this.isEmpty) {
            return '';
        }

        let current = this.#firstItem;
        let str = `${current.value}`;

        while(current.next) {
            current = current.next;
            str = `${str},${current.value}`;
        }

        return str;
    }
}
