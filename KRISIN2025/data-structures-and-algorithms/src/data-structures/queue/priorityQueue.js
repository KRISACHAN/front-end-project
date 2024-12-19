// https://github.com/KRISACHAN/ying-datastructures-algorithms/blob/master/src/core/datastructures/queue/priorityQueueArray.ts
// https://www.youtube.com/watch?v=7jUzhPHCKAU
// https://github.com/beforesemicolon/tutorials-files/blob/master/priority-queue.js

class PriorityQueue {
    #list = [];
    #capacity;

    constructor(capacity) {
        this.#capacity = Math.max(Number(capacity), 0) || null;
    }

    get size() {
        return this.#list.length;
    }

    get isFull() {
        return this.#capacity !== null && this.size === this.#capacity;
    }

    get isEmpty() {
      return this.size === 0;
    }

    /**
     * 向优先队列中添加元素
     * @param {*} item - 要添加的元素
     * @param {number} priority - 元素的优先级，默认为0，数值越大优先级越高
     * @returns {number} - 返回队列的当前长度
     */
    enqueue(item, priority = 0) {
        // 确保优先级是非负数，如果输入负数则转换为0
        priority = Math.max(Number(priority), 0);

        // 创建包含元素和优先级的对象
        const element = { item, priority };

        // 情况1: 如果队列为空或新元素优先级小于等于队尾元素的优先级
        // 直接将元素添加到队列末尾
        if (this.isEmpty || element.priority <= this.#list[this.size - 1].priority) {
            this.#list.push(element);
        } else {
            // 情况2: 新元素优先级较高，需要找到合适的插入位置
            // 遍历队列，找到第一个优先级小于新元素的位置
            for (let index in this.#list) {
                if (element.priority > this.#list[index].priority) {
                    // 在找到的位置插入新元素
                    // splice(index, 0, element) 表示在 index 位置插入 element，不删除任何元素
                    this.#list.splice(index, 0, element);
                    break;
                }
            }
        }

        // 返回更新后的队列长度
        return this.size;
    }

    dequeue() {
        return this.isEmpty ? null : this.#list.shift().item;
    }

    toString() {
        return this.#list.map((el) => el.item).toString();
    }
}
