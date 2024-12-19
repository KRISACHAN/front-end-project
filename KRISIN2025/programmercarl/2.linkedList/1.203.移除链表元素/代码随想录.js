// https://programmercarl.com/0203.%E7%A7%BB%E9%99%A4%E9%93%BE%E8%A1%A8%E5%85%83%E7%B4%A0.html

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    const ret = new ListNode(0, head);
    let cur = ret;
    while(cur.next) {
        if(cur.next.val === val) {
            cur.next =  cur.next.next;
            continue;
        }
        cur = cur.next;
    }
    return ret.next;
};
