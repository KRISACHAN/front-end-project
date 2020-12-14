(function(){
  'use strict'
  var clientList = {},
      listen,
      trigger,
      remove
  listen = function (key, fn) { /* 监听事件 */
    !clientList[key] && (clientList[key] = [])
    clientList[key].push(fn)
  }
  trigger = function () { /* 分发事件 */
    var key = Array.prototype.shift.call(arguments),
        fns = clientList[key]
    if (fns && fns.length > 0) {
      for (var i = 0, len = fns.length; i < len; ++i) {
        fns[i].apply(this, arguments)
      }
    }
  }
  remove = function (key, fn) { /* 移除事件 */
    var fns = clientList[key]
    if (!fns){
      return false
    }
    if (!fn){
      fns && (fns.length = 0)
    } else {
      for (var i = fns.length - 1; i >= 0; --i) {
        fns[i] === fn && fns.splice(i, 1)
      }
    }
  }

  var observer = {
    version: '1.2.1',
    author: 'kris',
    date: '2020-06-06',
    listen: listen,
    trigger: trigger,
    remove: remove
  }

  var _global = (function () {
    /* 严格模式下的匿名函数this为undefined */
    return this || (0, eval)('this')
  })()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = observer
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return observer
    })
  } else {
    !('observer' in _global) && (_global.observer = observer)
  }
})()