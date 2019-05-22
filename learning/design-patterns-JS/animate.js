(function(){
  'use strict'
  var linear = function (t, b, c, d) {
    return c * t / d + b
  }

  var easeIn = function (t, b, c, d) {
    return c * (t /= d) * t + b
  }

  var strongEaseIn = function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  }

  var strongEaseOut = function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t *t * t + 1) + b
  }

  var sineaseIn = function (t, b, c, d) {
    return c * (t /= d) * t * t + b
  }

  var sineaseOut = function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }

  var tween = {
    linear: linear,
    easeIn: easeIn,
    strongEaseIn: strongEaseIn,
    strongEaseOut: strongEaseOut,
    sineaseIn: sineaseIn,
    sineaseOut: sineaseOut,
  }

  var Animate = function (dom) {
    this.dom = dom                   // 进行运动的dom节点
    this.startTime = 0               // 动画开始时间
    this.startPos = 0                // 动画开始时，dom节点的位置，即dom的初始位置
    this.endPos = 0                  // 动画结束时，dom节点的位置，即dom的目标位置
    this.propertyName = null         // dom节点需要被改变的css属性名
    this.easing = null               // 缓动算法
    this.duration = null             // 动画持续时间
  }

  Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    this.startTime = +new Date        // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]  // dom节点初始位置
    this.propertyName = propertyName  // dom节点需要被改变的CSS属性名
    this.endPos = endPos  // dom节点目标位置
    this.duration = duration   // 动画持续事件
    this.easing = tween[easing]  // 缓动算法

    var self = this
    var timeId = setInterval(function(){      // 启动定时器，开始执行动画
      if (self.step() === false) {         // 如果动画已结束，则清除定时器
        clearInterval(timeId)
      }
    }, 19)
  }

  Animate.prototype.step = function () {
    var t = +new Date        // 取得当前时间
    if (t >= this.startTime + this.duration){       // (1)
      this.update(this.endPos)   // 更新小球的CSS属性值
      return false
    }
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration) // pos为小球当前位置
    this.update(pos)    // 更新小球的CSS属性值
  }

  Animate.prototype.update = function(pos) {
     this.dom.style[this.propertyName] = pos + 'px'
  };

  var _global = (function () {
    /* 严格模式下的匿名函数this为undefined */
    return this || (0, eval)('this')
  })()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animate
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Animate
    })
  } else {
    !('Animate' in _global) && (_global.Animate = Animate)
  }
})()