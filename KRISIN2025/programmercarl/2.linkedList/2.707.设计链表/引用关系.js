// 创建节点类
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        console.log(`创建值为 ${val} 的新节点，它的 next 是 ${this.next}`);
    }
}

// 演示代码
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);

// 初始设置
let tail = node1;
console.log("\n1. 初始状态：");
console.log("node1.next =", node1.next);
console.log("tail.next =", tail.next);

// 连接节点2
tail.next = node2;
console.log("\n2. 连接node2后：");
console.log("node1.next =", node1.next);
console.log("node2.next =", node2.next);
console.log("tail.next =", tail.next);

// 移动tail指针
tail = node2;
console.log("\n3. 移动tail到node2后：");
console.log("node1.next =", node1.next);
console.log("node2.next =", node2.next);
console.log("tail.next =", tail.next);

// 连接节点3
tail.next = node3;
tail = node3;
console.log("\n4. 添加node3后：");
console.log("node1.next =", node1.next);
console.log("node2.next =", node2.next);
console.log("node3.next =", node3.next);
console.log("tail.next =", tail.next);
