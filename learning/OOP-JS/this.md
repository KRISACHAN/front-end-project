```html
<script>
    // 浏览器正常情况下
    console.log(this === window) // true
</script>
<script>
    // 函数调用
    a = 10;
    function fn1 () {
        console.log(this.a)
    }
    fn1() // 10

    b = 2
    console.log(this.b) //2
    function fn2 () {
        this.b = 3
    }
    fn2()
    console.log(this.b) // 3
</script>
<script>
    // 方法调用
    function test () {
        console.log(this.x)
    }
    x = 2
    var o = {}
    o.x = 1
    o.m = test
    o.m() // 1
</script>
<script>
    // 构造函数调用
    x = 2
    function test () {
        this.x = 1
    }
    var o = new test()
    console.log(x) // 2
</script>
<script>
    // apply调用
    x = 0
    function test () {
        console.log(this.x)
    }
    var o = {}
    o.x = 1
    o.m = test
    o.m.apply(o) // 1
</script>
<script>
    // 函数 apply调用
    var zz = {};
    zz.a = 1000;

    a = 10;
    function fn1 () {
        console.log(this.a)
    }
    fn1.apply(zz) // 1000

    b = 2
    console.log(this.b) //2
    function fn2 () {
        this.b = 3
    }
    fn2.apply(zz)
    console.log(this.b) // 2
</script>
<script>
      // 函数 apply调用
      var qqq = {
        a: 1
      }
      var ttt = {
        a: 2
      }
      var mmm = {
        a: 3
      }
      function fq () {
        console.log(this)
      }
      fq.bind(qqq).bind(ttt).bind(mmm)() // {a: 1}
</script>
<script>
    // forEach
    var arr = [1, 2, 3, 4]
    var newarr = [5, 6, 7, 8]
    var newnewarr = [9, 10, 11, 12]

    arr.forEach(function (e, i, a) {
        console.log(this) // newarr
    }, newarr)

    arr.forEach((e, i, a) => {
        console.log(this) // window
    }, newarr)
</script>
<script>
    // 立即执行函数
    (function () {
        console.log(this) // window
    })()

    var o = {};
    o.x = 999;

    (function () {
        console.log(this) // {x:999}
    }).apply(o)

    ;(() => {
        console.log(this) // window
    })()

    ;(() => {
        console.log(this) // window
    }).apply(o)
</script>
<script>
    'use strict'
    console.log(this === window) // true
</script>
<script>
    'use strict'
    var k = {
        a: 1,
        b: 2,
        c: 3
    }
    const fn1 = function () {
        console.log(this)
    }
    fn1() // undefined
    fn1.apply(k) // {a: 1, b: 2, c: 3}
    k.m = fn1
    k.m() // {a: 1, b: 2, c: 3, m: ƒ}
</script>
<script>
    'use strict'
    const o = {
        a: 1,
        b: 2,
        c: 3
    }
    const fn2 = () => {
        console.log(this)
    }
    fn2() // window
    fn2.apply(o) // window
    o.m = fn2
    o.m() // window
</script>
<script>
    'use strict'
    const oo = {
        d: function () {
            console.log(this)
        },
        e: () => {
            console.log(this)
        }
    }
    const ooo = {
        a: 1,
        b: 2,
        c: 3
    }
    oo.d() // {d: ƒ, e: ƒ}
    oo.e() // window
    oo.d.apply(ooo) // {a: 1, b: 2, c: 3}
    oo.e.apply(ooo) // window

    var xxx = oo.d
    var yyy = oo.e

    xxx() // undefined
    yyy() // window
</script>
<script>
    'use strict'
    // forEach
    var arr = [1, 2, 3, 4]
    var newarr = [5, 6, 7, 8]
    var newnewarr = [9, 10, 11, 12]

    arr.forEach(function (e, i, a) {
        console.log(this) // newarr
    }, newarr)

    arr.forEach((e, i, a) => {
        console.log(this) // window
    }, newarr)
</script>
```
简单列了 **`window`** 下的几种情况，但其实在node下的情况也类似。
其实法则总结起来就是下面几点：
1. 无论是否在严格模式下，在全局执行环境中（在任何函数体外部） **`this`** 都指向全局对象。
2. 简单函数调用， **`this`** 在一般模式下指向全局对象；严格模式下 **`this`** 默认为 **`ndefined`** 。
3. call , bind, apply在非箭头函数下修改 **`this`** 值；箭头函数下无法修改（由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数），不管call , bind, apply多少次，函数的 **`this`** 永远由第一次的决定。
4. 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
5. 如果该方法存在于一个对象的原型链上，那么this指向的是调用这个方法的对象，就像该方法在对象上一样。
6. 当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。

在ECMA内， **`this`** 会调用 原生方法 **`ResolveThisBinding()`** 
原生方法ResolveThisBinding使用正在运行的执行上下文的LexicalEnvironment确定关键字this的绑定。 ResolveThisBinding执行以下步骤：
1. 设置 **`envRec`** 为 **`GetThisEnvironment()`**；
2. 返回 **`envRec.GetThisBinding()`** 。

原生方法GetThisEnvironment找到当前提供关键字 **`this`** 绑定的环境记录。 **`GetThisEnvironment`** 执行以下步骤：
1. 设置 **`lex`** 为​​正在运行的执行上下文的 **`LexicalEnvironment`** 。
2. 重复以下行为：
a. 设置 **`envRec`** 为 **`lex`** 的 环境记录；
b. 设置 **`exists`** 为 **`envRec.HasThisBinding()`**
c. 如果 **`exists`** 为真，返回出 **`envRec`**
d.设置  **`outer`** 为 **`lex`** 的外部环境参考值。
e. 断言： **`outer`** 不是 **`null`**
f. 设置 **`lex`** 为  **`outer`**

注意：步骤2中的循环必须终止，因为列表的环境总是以全局环境这个绑定。