"use strict";
/*
 * @types: 获取元素类型
 * @params: Boolean | Number | String | Function | Array | Date | RegExp | Undefined | Null | Object | Arguments | Error | Window | HTMLDocument | Map | Set | WeakMap
 */
Object.prototype.types = function() {
    var toString = Object.prototype.toString;
    var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
        "[object Arguments]": "arguments",
        "[object Error]": "error",
        "[object Window]": "window",
        "[object HTMLDocument]": "document",
        "[object Map]": "map",
        "[object Set]": "set",
        "[object WeakMap]": "weakMap"
    };
    var el = this instanceof Element ? "element" : map[toString.call(this)];
    return el;
};

/*
 * @aFn: ES5数组API简单封装
 * @params: Array, String, Function
 */
var aFn = function(array, type, fn) {
    return !fn ? array : Array.prototype[type]["call"](array, fn);
};

/*
 * @css: 获取CSS的值
 * @params: {attr: String, value: String}
 */
Object.prototype.css = function(attr, value) {
    var GROUP = function() {
        for (var prop in attr) {
            if (attr.hasOwnProperty(prop)) {
                if (this.length > 1) {
                    aFn(this, "forEach", function(e, i, a) {
                        e.style[prop] = attr[prop];
                    });
                } else {
                    this.style[prop] = attr[prop];
                }
            }
        }
    }.bind(this);
    if (this.length > 1) {
        if (value) {
            aFn(this, "forEach", function(e, i, a) {
                e.style[attr] = value;
            });
        }
    } else {
        this.style[attr] = value;
    }
    if (attr.types() === "object") {
        GROUP();
    }
    if (attr.types() === "string") {
        if (this.length > 1) {
            aFn(this, "map", function(e, i, a) {
                return getComputedStyle(e, false)[attr];
            });
        } else {
            getComputedStyle(this, false)[attr];
        }
    }
    if (!value) {
        return getComputedStyle(this, false)[attr];
    } else {
        return this;
    }
};

/*
 * @siblings: 获取兄弟节点
 * @param: Function
 */
Object.prototype.siblings = function(fn) {
    var DomArr = [];
    var __self = this;
    var MATCHED = aFn(this.parentNode.childNodes, "filter", function(e, i, a) {
        return e !== __self && e.nodeType === 1 && e.nodeName !== "SCRIPT";
    });
    fn && aFn(MATCHED, "forEach", fn);
    return MATCHED;
};

/*
 * @offset: 获取dom节点偏移距离
 */
Object.prototype.getOffset = function() {
    var scrollTop =
        this.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    var scrollLeft =
        this.getBoundingClientRect().left +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
    return {
        top: scrollTop,
        left: scrollLeft
    };
};

/*
 * @hasClass: 判断是否有类名
 * @params: String
 */
Object.prototype.hasClass = function(cls) {
    if (this.types() === "array" || this.length > 0) {
        return aFn(this, "map", function(e, i, a) {
            return e.classList
                ? e.classList.contains(cls)
                : new RegExp("(^| )" + cls + "( |$)", "gi").test(e.className);
        });
    } else {
        return this.classList
            ? this.classList.contains(cls)
            : new RegExp("(^| )" + cls + "( |$)", "gi").test(this.className);
    }
};

/*
 * @addClass: 添加类名
 * @params: String
 */
Object.prototype.addClass = function(cls) {
    if (this.types() === "array" || this.length > 0) {
        aFn(this, "forEach", function(e, i, a) {
            e.classList ? e.classList.add(cls) : (e.className += " " + cls);
        });
    } else {
        this.classList
            ? this.classList.add(cls)
            : (this.className += " " + cls);
    }
    return this;
};

/*
 * @removeClass: 添加类名
 * @params: String
 */
Object.prototype.removeClass = function(cls) {
    if (this.types() === "array" || this.length > 0) {
        aFn(this, "forEach", function(e, i, a) {
            e.classList
                ? e.classList.remove(cls)
                : className.replace(
                      new RegExp(
                          "(^|\\b)" + cls.split(" ").join("|") + "(\\b|$)",
                          "gi"
                      ),
                      " "
                  );
        });
    } else {
        this.classList
            ? this.classList.remove(cls)
            : className.replace(
                  new RegExp(
                      "(^|\\b)" + cls.split(" ").join("|") + "(\\b|$)",
                      "gi"
                  ),
                  " "
              );
    }
    return this;
};

/*
 *
 *
 */
Object.prototype.animate = function(attr, target, timer, fn) {
    var __timer = null;
    clearInterval(__timer);
    __timer = setInterval(function() {
        var stop = true;
        var cur = this.css(attr);
        var speed = (target - cur) / 8;
        if (speed > 0) {
            speed = Math.ceil(speed);
        } else {
            speed = Math.floor(speed);
        }
        if (cur !== target) {
            stop = false;
            obj.style[attr] = cur + speed + "px";
        }
        if (stop) {
            clearInterval(__timer);
            __timer = null;
            if (fn) {
                fn();
            }
        }
    }, timer);
};

/*
 * @dom: 获取dom节点
 * @param: String
 */
var dom = function(el) {
    var __dom;
    var types = {
        document: function() {
            return el;
        },
        window: function() {
            return el;
        },
        element: function() {
            return el;
        },
        string: function() {
            var ISROOT = el === "body" || el === "html";
            var ISTAG = document.getElementsByTagName(el).length > 0;
            var ISARR = document.querySelectorAll(el).length > 1;
            return ISROOT
                ? document.getElementsByTagName(el)[0]
                : ISTAG
                ? document.getElementsByTagName(el)
                : ISARR
                ? document.querySelectorAll(el)
                : document.querySelector(el);
        }
    };
    return types[el.types()]();
};

var fadeIn = function (el) {
    el.style.opacity = 0
    var last = +new Date()
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400
        last = +new Date()
        if (+el.style.opacity < 1) {
            requestAnimationFrame(tick))
        }
    }
    tick()
}

var fadeOut = function (el) {
    el.style.opacity = 1
    var last = +new Date()
    var tick = function() {
        el.style.opacity = +el.style.opacity - (new Date() - last) / 400
        last = +new Date()
        if (+el.style.opacity > 0) {
            requestAnimationFrame(tick)
        }
    }
    tick()
}