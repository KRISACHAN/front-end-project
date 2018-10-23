/**
 * @Created by kris on 2018/06/06.
 */
((wid, dcm) => {
  'use strict'
  const win = wid
  const doc = dcm

  const version = '1.1.2'
  const author = 'kris'

  /*
   * @forEach: 循环数组
   */
  const forEach = (array, fn) => {
    for (let i = 0, len = array.length;i < len; ++i) {
      fn(array[i], i, array)
    }
  }

  /*
   * @forEachObject: 循环对象
   */
  const forEachObject = (obj, fn) => {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        fn(property, obj[property], obj)
      }
    }
  }

  /*
   * @unless: 断言predicate, 错误时执行函数
   */
  const unless = (predicate, fn) => {
    !predicate && fn()
  }

  /*
   * @times: 接受number，并循环相应数量的次数
   */
  const times = (times, fn) => {
    for (let i = 0;i < times; ++i) {
      fn(i, times)
    }
  }

  /*
   * @every: 判断数组的元素是否全部符合回调函数里的条件
   */
  const every = (arr, fn) => {
    let res = true
    for (let val of arr) {
      res = res && fn(val)
    }
    return res
  }

  /*
   * @some: 判断数组的元素是否部分符合回调函数里的条件
   */
  const some = (arr, fn) => {
    let res = true
    for (let val of arr) {
      res = res || fn(val)
    }
    return res
  }

  const sortBy = property => {
    return (a, b) => {
      const res = (a[property] < b[property] ? -1 : ((a[property] > b[property]) ? 1 : 0))
      return res
    }
  }

  const tap = val => fn => {
    Object.prototype.toString.call(fn) === '[object Function]' && fn(val)
  }

  const unary = fn => fn.length === 1 ? fn : arg => fn(arg)

  const once = fn => {
    let done = false
    return function () {
      !done && ((done = true), fn.apply(this, arguments))
    }
  }

  const memoized = fn => {
    const lookupTable = {}
    return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg))
  }

  const map = (array, fn) => {
    let res = []
    for (let val of array) {
      res.push(fn(val))
    }
    return res
  }

  const filter = (array, fn) => {
    let res = []
    for (let val of array) {
      fn(val) && res.push(val)
    }
    return res
  }

  const concatAll = (array, fn) => {
    let res = []
    for (let val of array) {
      res.push.apply(res, val)
    }
    return res
  }

  const reduce = (array, fn, initialValue) => {
    let acc = initialValue || array[0]
    for (let val of array) {
      acc = fn(acc, val)
    }
    return [acc]
  }

  const zip = (leftArr, rightArr, fn) => {
    let resArr = []
    for (let i = 0; i < Math.min(leftArr.length, rightArr.length); ++i) {
      resArr.push(fn(leftArr[i], rightArr[i]))
    }
    return resArr
  }

  const arrayUtils = {
    map,
    filter,
    concatAll,
    flatten: concatAll,
    reduce,
    zip
  }

  const curry = binaryFn => firstArg => secondArg => binaryFn(firstArg, secondArg)

  const curryN = fn => {
    if (typeof fn !== 'function') {
      throw Error('No function provided')
    }
    return function curriedFn(...args){
      if (args.length < fn.length) {
        return function () {
          return curriedFn.apply(null, args.concat([].slice.call(arguments)))
        }
      }
      return fn.apply(null, args)
    }
  }

  const partial = (fn, ...partialArgs) => {
    let args = partialArgs.slice(0)
    return function (...fullArguments) {
      let arg = 0
      for (let i = 0; i < args.length && arg < fullArguments.length; ++i) {
        !args[i] && (args[i] = fullArguments[arg++])
      }
      return fn.apply(this, args)
    }
  }

  const composeN = (...fns) => value => reduce(fns.reverse(), (acc, fn) => fn(acc), value)

  const pipe = (...fns) => value => reduce(fns, (acc, fn) => fn(acc), value)

  const Container = function (val) {
    this.value = val
  }

  Container.of = function (value) {
    return new Container(value)
  }

  Container.prototype.map = function (fn) {
    return Container.of(fn(this.value))
  }

  const MayBe = function (val) {
    this.value = val
  }

  MayBe.of = function (val) {
    return new MayBe(val)
  }

  MayBe.prototype.isNothing = function () {
    return !this.value
  }

  MayBe.prototype.map = function (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
  }

  MayBe.prototype.join = function () {
    return this.isNothing() ? MayBe.of(null) : this.value
  }

  MayBe.prototype.chain = function (f) {
    return this.map(f).join()
  }

  const Nothing = function (val) {
    this.value = val
  }

  Nothing.of = function (val) {
    return new Nothing(val)
  }

  Nothing.prototype.map = function (f) {
    return this
  }

  const Some = function (val) {
    this.value = val
  }

  Some.of = function (val) {
    return new Some(val)
  }

  Some.prototype.map = function (fn) {
    return Some.of(fn(this.value))
  }

  const Either = {
    Some,
    Nothing
  }

  const functional = {
    version,
    author,
    forEach,
    forEachObject,
    unless,
    times,
    sortBy,
    every,
    some,
    tap,
    unary,
    once,
    memoized,
    arrayUtils,
    curry,
    curryN,
    partial,
    composeN,
    pipe,
    Container,
    MayBe,
    Some,
    Nothing,
    Either
  }
  const _global = (() => {
    return this || (0, eval)('this')
  })()

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = functional
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return functional
    })
  } else {
    !('functional' in _global) && (_global.functional = functional)
  }
})(window, document)
