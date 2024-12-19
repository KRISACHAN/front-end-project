// https://github.com/KRISACHAN/ying-datastructures-algorithms/blob/master/src/core/datastructures/stack/stack.ts
// https://www.youtube.com/watch?v=wtynhUwS5hI
'use strict';

class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    push(element) {
        this.items[this.count] = element;
        this.count += 1;
        return this.count - 1;
    }

    /**
     * 从栈顶移除并返回元素
     * @returns {*} deletedItem - 被删除的栈顶元素，如果栈为空则返回 undefined
     */
    pop() {
        // 检查栈是否为空
        if (!this.count) {
            return;
        }
        // 获取栈顶元素（最后一个元素）
        let deletedItem = this.items[this.count - 1];
        // 减少栈的大小计数
        this.count -= 1;
        // 通过修改数组长度来移除最后一个元素
        this.items.length = this.count;
        // 返回被删除的元素
        return deletedItem;
    }

    peek() {
        return this.items[this.count - 1];
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    print() {
        let str = '';
        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' ';
        }
        return str;
    }

    clear() {
        this.items = [];
        this.count = 0;
    }
}

const stack = new Stack();

stack.push(100);
stack.push(200);
console.log(stack.peek());
stack.push(300);
stack.pop();
stack.clear();

console.log(stack.print());
