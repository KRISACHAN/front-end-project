# PriorityQueue 与 CircularQueue 的 enqueue 方法比较

## 实现方式对比

### 数据结构差异

- **PriorityQueue**: 使用数组（`#list`）存储元素，每个元素包含值和优先级
- **CircularQueue**: 使用固定大小的数组（`items`），通过指针（`front` 和 `rear`）管理循环结构

### 存储元素形式

- **PriorityQueue**:

  ```javascript
  const element = { item, priority };
  ```

- **CircularQueue**:

  ```javascript
  this.items[this.rear] = element;
  ```

## 功能特点对比

### 容量处理

- **PriorityQueue**:
  - 通过 `#capacity` 可选限制容量
  - 使用 `isFull` getter 检查容量
- **CircularQueue**:
  - 必须指定固定容量
  - 使用 `isFull()` 方法检查容量
  - 通过取模运算实现循环利用空间

### 元素排序

- **PriorityQueue**:
  - 根据优先级排序
  - 优先级相同时遵循 FIFO
  - 需要在插入时找到正确的位置
- **CircularQueue**:
  - 严格遵循 FIFO
  - 插入位置由 rear 指针决定
  - 通过取模运算实现循环

### 插入操作复杂度

- **PriorityQueue**:
  - 最好情况：O(1)（插入到队尾）
  - 最坏情况：O(n)（需要遍历查找插入位置）
- **CircularQueue**:
  - 固定为 O(1)
  - 不需要元素移动或重排

## 代码实现对比

### PriorityQueue enqueue

```javascript
enqueue(item, priority = 0) {
    priority = Math.max(Number(priority), 0);
    const element = { item, priority };

    if (this.isEmpty || element.priority <= this.#list[this.size - 1].priority) {
        this.#list.push(element);
    } else {
        for (let index in this.#list) {
            if (element.priority > this.#list[index].priority) {
                this.#list.splice(index, 0, element);
                break;
            }
        }
    }
    return this.size;
}
```

### CircularQueue enqueue

```javascript
enqueue(element) {
    if (!this.isFull()) {
        this.rear = (this.rear + 1) % this.capacity;
        this.items[this.rear] = element;
        this.currentLength += 1;
        if (this.front === -1) {
            this.front = this.rear;
        }
    }
}
```

## 使用场景对比

### PriorityQueue 适用场景

- 任务调度系统
- 事件处理系统
- 需要按优先级处理的消息队列
- 医院急诊室病人排队系统

### CircularQueue 适用场景

- 固定大小的缓冲区
- 流媒体数据缓冲
- 操作系统的进程调度
- 交通信号灯控制系统

## 总结

1. **实现复杂度**：
   - PriorityQueue 实现较复杂，需要处理优先级和元素排序
   - CircularQueue 实现相对简单，主要处理循环逻辑

2. **性能特点**：
   - PriorityQueue 插入操作性能可变（O(1) 到 O(n)）
   - CircularQueue 具有稳定的 O(1) 插入性能

3. **空间利用**：
   - PriorityQueue 空间可动态增长
   - CircularQueue 空间固定但可循环利用

4. **使用灵活性**：
   - PriorityQueue 支持优先级排序，使用更灵活
   - CircularQueue 实现简单，适合固定大小的循环缓冲场景
