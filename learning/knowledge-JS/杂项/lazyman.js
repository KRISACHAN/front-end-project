(function(){
  'use strict'
  const LAZYMAN = function (name) {
    this.name = name
    this.timeoutId = null
    this._taskQueue = []
    this._taskIsRunning = false

    function _task (name) {
      console.log(`Hi! This is ${name}!`)
    }
    this._taskQueue.push(_task.bind(this, name))
    this.run()
  }

  LAZYMAN.prototype.eat = function (food) {
    const _task = food => {
      console.log('Eat ' + food + '~')
    }
    this._taskQueue.push(_task.bind(this, food))
    this.run()
    return this
  }

  LAZYMAN.prototype.sleep = function (time) {
    const _task = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        resolve()
      }, time * 1000)
    })
    this._taskQueue.push(_task)
    this.run()
    return this
  }

  LAZYMAN.prototype.sleepFirst = function (time) {
    const _task = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        resolve()
      }, time * 1000)
    })
    this._taskQueue.unshift(_task)
    this.run()
    return this
  }

  LAZYMAN.prototype.run = function () {
    if (this._taskIsRunning) {
      return
    }
    this._taskIsRunning = true
    const _next = () => {
      if (this._taskQueue.length) {
        let _task = this._taskQueue.shift()
        if (_task.then) {
          _task.then(() => {
            _next()
          })
        } else {
          _task()
          _next()
        }
      } else {
        this._taskIsRunning = false
      }
    }
    Promise.resolve().then(() => {
      _next()
    })
  }



  var _global = (function () {
    /* 严格模式下的匿名函数this为undefined */
    return this || (0, eval)('this')
  })()
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LAZYMAN
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return LAZYMAN
    })
  } else {
    !('LAZYMAN' in _global) && (_global.LAZYMAN = LAZYMAN)
  }
})()

const person = name => new LAZYMAN(name)