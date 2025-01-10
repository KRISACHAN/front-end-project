// https://programmercarl.com/0024.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9.html

// 迭代版本
var swapPairs = function (head) {
    let ret = new ListNode(0, head),
        temp = ret;
    while (temp.next && temp.next.next) {
        let cur = temp.next.next,
            pre = temp.next;
        pre.next = cur.next;
        cur.next = pre;
        temp.next = cur;
        temp = pre;
    }
    return ret.next;
};

// 递归版本
var swapPairs = function (head) {
    if (head == null || head.next == null) {
        return head;
    }

    let after = head.next;
    head.next = swapPairs(after.next);
    after.next = head;

    return after;
};
