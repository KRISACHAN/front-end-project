(function (wid, dcm) {
  'use strict'
  /*
   * @throttle: 函数节流
   * @params: {fn: function, interval: timerInterval}
   */
  var win = wid
  var doc = dcm
  var throttle = function (fn, interval) {
    var _FN = fn
    var timer = null
    var work = true
    return function () {
      var args = arguments,
         _THIS = this
      if (work) {
        _FN.apply(_THIS, args)
        return work = false
      };
      if (timer) {
        return false
      }
      timer = setTimeout(function () {
        clearTimeout(timer)
        timer = null
        _FN.apply(_THIS, args)
      }, interval || 500)
    }
  }
  var _global = (function () {
    return this || (0, eval)('this')
  })()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = throttle
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return throttle
    })
  } else {
    !('throttle' in _global) && (_global.throttle = throttle)
  }
})(window, document)
