// https://github.com/KRISACHAN/ying-datastructures-algorithms/blob/master/src/core/datastructures/queue/circularQueue.ts
// https://www.youtube.com/watch?v=oIR_DOOOACk&list=PLC3y8-rFHvwg6nsAOfC5Is18KB2DrVOJy&index=12

class CircularQueue {
    constructor(capacity) {
        this.items = new Array(capacity);
        this.capacity = capacity;
        this.currentLength = 0;
        this.rear = -1;
        this.front = -1;
    }

    isFull() {
        return this.currentLength === this.capacity;
    }

    isEmpty() {
        return this.currentLength === 0;
    }

    /**
     * 向循环队列尾部添加元素
     * @param {*} element - 要添加的元素
     * @returns {void}
     */
    enqueue(element) {
        // 检查队列是否已满
        if (!this.isFull()) {
            // 使用取模运算更新 rear 指针，实现循环
            this.rear = (this.rear + 1) % this.capacity;
            // 在 rear 位置存储新元素
            this.items[this.rear] = element;
            // 增加队列当前长度
            this.currentLength += 1;

            // 如果这是第一个元素（front 为 -1），则设置 front 指向它
            if (this.front === -1) {
                this.front = this.rear;
            };
        }
    }

    /**
     * 从循环队列头部移除并返回元素
     * @returns {*} item - 被移除的元素，队列为空时返回 null
     */
    dequeue() {
        // 检查队列是否为空
        if (this.isEmpty()) {
            return null;
        }
        // 获取 front 位置的元素
        const item = this.items[this.front];
        // 将该位置设为 null（可选，用于垃圾回收）
        this.items[this.front] = null;
        // 使用取模运算更新 front 指针，实现循环
        this.front = (this.front + 1) % this.capacity;
        // 减少队列当前长度
        this.currentLength -= 1;

        // 如果队列变空，重置 front 和 rear 指针
        if (this.isEmpty()) {
            this.front = -1;
            this.rear = -1;
        }
        return item;
    }

    peek() {
        if (!this.isEmpty()) {
            return this.items[this.front];
        }
        return null;
    }

    print() {
        if (this.isEmpty()) {
            console.log('Queue is empty')
            return;
        };
        let i
        let str = '';
        for (i = this.front; i !== this.rear; i = (i + 1) % this.capacity) {
            str += this.items[i] + ' ';
        }
        str += this.items[i];
        console.log(str);
    }
}

const queue = new CircularQueue(5);
console.log(queue.isEmpty());


queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);

console.log(queue.isFull());
queue.print();

console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue);
