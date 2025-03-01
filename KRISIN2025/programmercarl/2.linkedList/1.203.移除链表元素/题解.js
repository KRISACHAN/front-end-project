// https://programmercarl.com/0203.%E7%A7%BB%E9%99%A4%E9%93%BE%E8%A1%A8%E5%85%83%E7%B4%A0.html
// https://leetcode.com/problems/remove-linked-list-elements/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 *
 * runtime complexity: O(n)
 * space complexity: O(1)
 */
var removeElements = function (head, val) {
    // Use dummy head node to make handling approach consistently
    const dummyNode = new ListNode(0, head);
    // Set a value for looping head node deeply
    let currentNode = dummyNode;
    while (currentNode.next) {
        // If the next value is equal to the val
        // That means next value is pre-deleted value
        if (currentNode.next.val === val) {
            currentNode.next = currentNode.next.next;
            continue;
        };
        // Move forward
        currentNode = currentNode.next;
    };
    // After looping, dummyNode.next has became the result
    return dummyNode.next;
};

console.log(removeElements([1,2,6,3,4,5,6], 6)); // [1,2,3,4,5]
console.log(removeElements([], 1)); // []
console.log(removeElements([7,7,7,7], 7)); // []
