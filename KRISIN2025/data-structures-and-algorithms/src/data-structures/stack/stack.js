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

    pop() {
        if (!this.count) {
            return;
        }
        let deletedItem = this.items[this.count - 1];
        this.count -= 1;
        this.items.length = this.count;
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
