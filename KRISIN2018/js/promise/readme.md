# Promises/A+规范

## 术语

1. promise : 一个拥有then方法的对象或函数，其行为符合本规范;
2. thenable : 是一个定义了then方法的对象或函数
3. value : 指任何Javascript的合法值 ( 包括undefined , thenable , promise )
4. exception : 是使用throw语句抛出的一个值
5. reason : 表示一个promise的拒绝原因



## 要求

### Promise的状态

Pending、Fulfilled、Rejected

1. Pending
   In Pending , Promise需要满足的条件 : 可转移至Fulfilled or Rejected

2. Fulfilled
   In Fulfilled , Promise需要满足的条件 : 

   不可转移至其他状态 ;

   必须拥有一个不可变的值。

3. Rejected
   In Rejected , Promise需要满足的条件 : 

   不可转移至其他状态 ;

   必须拥有一个不可变的reason。




### Then方法

一个Promise必须提供一个then方法以访问当前值 , 终值 , reason。

```
promise.then(onFulfilled, onRejected)
```

1. 参数特性 : 

​   如果onFulfilled or onRejected不是函数，其必须被忽略

​   当promise执行结束后其必须被调用，其第一个参数为promise的终值

​   在promise执行结束前其不可被调用

​   其调用次数不可超过一次

1. 调用时机 : 

   只有在执行环境堆栈仅包含引擎、环境以及 promise 的实施代码时才可被调用

2. 调用要求 : 

   onFulfilled 和 onRejected 必须被作为函数调用

3. 多次调用 : 

   then 方法可以被同一个 promise 调用多次

   promise 无论成功或拒绝 , 所有的状态都需要按注册顺序依次回调

4. return : 

   then方法必须return一个promise对象

   ```
   promise2 = promise1.then(onFulfilled, onRejected);
   ```

   如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行 [[Resolve]](promise2, x)

   如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回reason e

   如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的value

   如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的reason




### Promise解决过程

[[Resolve]](promise, x)

运行需要遵循以下步骤 : 

1. 如果x 和 promise 指向同一对象 ，以TypeError为reason


2. 如果x为 Promise ，则使 promise 接受 x 的状态 


3. x 为对象或函数
   then = x.then
   如果x.then的值为Error(e) ，则e为reason
   如果then是函数，将x作为函数的作用域this调用之，传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise

4. 如果一个 promise 被一个循环的 thenable 链中的对象解决，而 [[Resolve]](promise, thenable) 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为据因来拒绝 promise
