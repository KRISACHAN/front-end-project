# 快慢指针（Two Pointers）详解

## 什么是快慢指针？

快慢指针是一种算法思想，使用两个指针在数组或链表上进行操作：

- **快指针**：通常用于探索/遍历
- **慢指针**：通常用于记录结果位置

## 主要作用

1. **数组原地修改**
2. **链表环检测**
3. **寻找链表中点**
4. **删除重复元素**

## 常见应用场景

### 1. 数组原地修改

#### a) 移除指定元素

```javascript
const nums = [3, 2, 2, 3]; // 移除值为3的元素
const val = 3;

// 快指针i遍历数组，慢指针slow记录新数组位置
let slow = 0;
for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
        nums[slow] = nums[i];
        slow++;
    }
}
// 结果：nums = [2,2,?,?], 返回长度 2
```

#### b) 移动零到数组末尾

```javascript
function moveZeroes(nums) {
    let slow = 0; // 慢指针记录非零元素应该放置的位置

    // 第一步：将所有非零元素移到前面
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }

    // 第二步：将剩余位置填充为0
    for (let i = slow; i < nums.length; i++) {
        nums[i] = 0;
    }
}
```

### 2. 链表环检测

#### a) 检测是否有环

```javascript
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next; // 慢指针每次走1步
        fast = fast.next.next; // 快指针每次走2步

        if (slow === fast) {
            // 如果有环，快慢指针终会相遇
            return true;
        }
    }
    return false;
}
```

#### b) 找到环的起始点

```javascript
function detectCycle(head) {
    let slow = head;
    let fast = head;

    // 第一步：找到相遇点
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            // 第二步：从头节点和相遇点同时出发，相遇点即为环的起点
            let start = head;
            while (start !== slow) {
                start = start.next;
                slow = slow.next;
            }
            return start;
        }
    }
    return null;
}
```

### 3. 寻找链表中点

```javascript
function findMiddle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next; // 慢指针每次走1步
        fast = fast.next.next; // 快指针每次走2步
    }
    // 当快指针到达末尾时，慢指针正好在中点
    return slow;
}
```

### 4. 删除重复元素

#### a) 有序数组去重

```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let slow = 0; // 慢指针指向当前无重复数组的末尾

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }

    return slow + 1; // 返回新数组的长度
}
```

#### b) 有序链表去重

```javascript
function deleteDuplicates(head) {
    if (!head) return head;

    let slow = head;
    let fast = head.next;

    while (fast) {
        if (fast.val !== slow.val) {
            slow.next = fast;
            slow = slow.next;
        }
        fast = fast.next;
    }
    slow.next = null; // 断开与后续重复元素的连接

    return head;
}
```

## 优点

1. 空间复杂度低，通常为 O(1)
2. 只需一次遍历即可完成操作
3. 代码简洁易懂

## 使用场景判断

当遇到以下情况时，可以考虑使用快慢指针：

- 需要原地修改数组
- 需要检测链表是否有环
- 需要找到链表的中点
- 需要删除重复元素
- 需要在一次遍历中完成两个位置的操作

## 注意事项

1. 在处理链表时，要注意检查空指针
2. 在处理数组时，要注意边界条件
3. 在使用快慢指针时，要明确两个指针的移动规则
4. 有时可能需要额外的指针来保存特定位置

记住：快慢指针通常用于**线性数据结构**（如数组、链表），且经常用于原地修改或需要同时操作两个位置的场景。
