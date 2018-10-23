'use strict';
/*
 * @types: 获取元素类型
 * @params: Boolean | Number | String | Function | Array | Date | RegExp | Undefined | Null | Object | Arguments | Error | Window | HTMLDocument | Map | Set | WeakMap
 */
Object.prototype.types = function () {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]'          : 'boolean',
    '[object Number]'           : 'number',
    '[object String]'           : 'string',
    '[object Function]'         : 'function',
    '[object Array]'            : 'array',
    '[object Date]'             : 'date',
    '[object RegExp]'           : 'regExp',
    '[object Undefined]'        : 'undefined',
    '[object Null]'             : 'null',
    '[object Object]'           : 'object',
    '[object Arguments]'        : 'arguments',
    '[object Error]'            : 'error',
    '[object Window]'           : 'window',
    '[object HTMLDocument]'     : 'document',
    '[object Map]'              : 'map',
    '[object Set]'              : 'set',
    '[object WeakMap]'          : 'weakMap'
  };
  var el = this instanceof Element ? 'element' : map[toString.call(this)];
  return el;
};

/*
 * @css: 获取CSS的值
 * @params: {attr: String, value: String}
 */
Object.prototype.css = function (attr, value) {
  var GROUP = function () {
    for (var prop in attr) {
      if (attr.hasOwnProperty(prop)) {
        if (this.length > 1) {
          Array.prototype.forEach.call(
            this, 
            function (e, i, a) { 
              e.style[prop] = attr[prop] 
            }
          );
        } else {
          this.style[prop] = attr[prop]
        }
      }
    }
  }.bind(this);
  if (this.length > 1) {
    if (value) {
      Array.prototype.forEach.call(
        this, 
        function (e, i, a) { 
          e.style[attr] = value 
        }
      )
    }
  } else {
    this.style[attr] = value
  };
  if (attr.types() === 'object') {
    GROUP();
  };
  if (attr.types() === 'string') {
    if (this.length > 1) {
      Array.prototype.map.call(
        this, 
        function (e, i, a) { 
          return getComputedStyle(e, false)[attr];
        }
      );
    } else {
      getComputedStyle(this, false)[attr]
    };
  };
  if (!value) {
    return getComputedStyle(this, false)[attr];
  } else {
    return this;
  };
};

/*
 * @siblings: 获取兄弟节点
 * @param: Function
 */
Object.prototype.siblings = function (fn) {
  var DomArr = [];
  var MATCHED =  Array.prototype.filter.call(
    this.parentNode.childNodes,
    function (e, i, a) {
      return (e !== this) && (e.nodeType === 1) && (e.nodeName !== 'SCRIPT')
    },
    this
  );
  fn && Array.prototype.forEach.call(MATCHED, fn);
  return MATCHED;
};

/*
 * @offset: 获取dom节点偏移距离
 */
Object.prototype.offset = function () {
  var scrollTop = this.getBoundingClientRect().top + document.body.scrollTop + document.documentElement.scrollTop;
  var scrollLeft = this.getBoundingClientRect().left + document.body.scrollLeft + document.documentElement.scrollLeft;
  return {
    top: scrollTop,
    left: scrollLeft
  };
};

/*
 * @hasClass: 判断是否有类名
 * @params: String
 */
Object.prototype.hasClass = function (cls) {
  if (Object.prototype.toString.call(this) === '[object Array]' || this.length > 0) {
    return Array.prototype.map.call(
      this,
      function (e, i, a) {
        return e.classList ? e.classList.contains(cls) : new RegExp('(^| )' + cls + '( |$)', 'gi').test(e.className);
      }
    );
  } else {
    return this.classList ? this.classList.contains(cls) : new RegExp('(^| )' + cls + '( |$)', 'gi').test(this.className);
  };
};

/*
 * @addClass: 添加类名
 * @params: String
 */
Object.prototype.addClass = function (cls) {
  if (Object.prototype.toString.call(this) === '[object Array]' || this.length > 0) {
    Array.prototype.forEach.call(
      this,
      function (e, i, a) {
        e.classList ? e.classList.add(cls) : e.className += ' ' + cls;
      }
    );
  } else {
    this.classList ? this.classList.add(cls) : this.className += ' ' + cls;
  };
  return this;
};

/*
 * @removeClass: 添加类名
 * @params: String
 */
Object.prototype.removeClass = function (cls) {
  if (Object.prototype.toString.call(this) === '[object Array]' || this.length > 0) {
    Array.prototype.forEach.call(
      this,
      function (e, i, a) {
        e.classList ? e.classList.remove(cls) : className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    );
  } else {
    this.classList ? this.classList.remove(cls) : className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  };
  return this;
};

/*
 * @print: 打印JS信息
 * @params: 所有类型
 */
var print = console.log.bind(console);

/*
 * @dom: 获取dom节点
 * @param: String
 */
var dom = function (el) {
  var DOM;
  el.types() === 'document' ? DOM = el : '';
  el.types() === 'window' ? DOM = el : '';
  el.types() === 'element' ? DOM = el : '';
  el.types() === 'string' && document.getElementsByTagName(el).length > 0 ? DOM = document.getElementsByTagName(el) : '';
  el.types() === 'string' && document.querySelectorAll(el).length > 1 ? DOM = document.querySelectorAll(el) : '';
  el.types() === 'string' && document.querySelectorAll(el).length <= 1 ? DOM = document.querySelector(el) : '';
  return DOM;
};

/*
 * @aFn: ES5数组API简单封装
 * @params: Array, String, Function
 */
var aFn = function (array, type, fn) {
  if (!fn) {
    return array;
  };
  return Array.prototype[type]['call'](array, fn);
};

/*
 * @RAF: 如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
 * param: Function
 */
var RAF = (function () {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function () {
           window.setTimeout(cb, 1000 / 60);
         };
})();
