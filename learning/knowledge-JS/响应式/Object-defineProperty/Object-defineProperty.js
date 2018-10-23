'use strict'
var Watcher = function (vm, node, name, nodeType) {
  Dep.target = this
  this.name = name
  this.node = node
  this.vm = vm
  this.nodeType = nodeType
  this.update()
  Dep.target = null
}
Watcher.prototype = {
  get: function () {
    this.value = this.vm[this.name]
  },
  update: function () {
    console.log(Dep.target)
    this.get()
    var __self = this
    var nodeTypeObj = {
      text: function () {
        __self.node.nodeValue = __self.value
      },
      input: function () {
        __self.node.value = __self.value
      }
    }
    try {
      nodeTypeObj[this.nodeType]()
    } catch (err) {}
  }
}

var Dep = function () {
  this.subs = []
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  }
}

var defineReactive = function (obj, key, val) {
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    get: function () {
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set: function (newVal) {
      var dataHasModify = function () {
        val = newVal
        dep.notify()
      }
      newVal !== val && dataHasModify()
    }
  })
}

var observer = function (obj, vm) {
  for (var item in obj) {
    defineReactive(vm, item, obj[item])
  }
}

var compile = function (node, vm) {
  var reg = /\{\{(.*)\}\}/
  if (node.childNodes && node.childNodes.length > 0) {
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
      compile(node.childNodes[i], vm)
    }
  }
  var nodeTypeObj = {
    1: function () {
      var attr = node.attributes
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName === 'v-model') {
          var name = attr[i].nodeValue
          node.addEventListener('input', function (e) {
            vm[name] = e.target.value
          })
          node.value = vm[name]
          node.removeAttribute('v-model')
        }
      }
      new Watcher(vm, node, name, 'input')
    },
    3: function () {
      var isText = function () {
        var name = RegExp.$1
        name = name.trim()
        new Watcher(vm, node, name, 'text')
      }
      reg.test(node.nodeValue) && isText()
    }
  }
  nodeTypeObj[node.nodeType]()
}

var nodeToFragment = function (node, vm) {
  var flag = document.createDocumentFragment()
  var child
  while (child = node.firstChild) {
    compile(child, vm)
    flag.appendChild(child)
  }
  return flag
}

function Vue (options) {
  this.data = options.data
  var data = this.data
  observer(data, this)
  var id = options.el
  var dom = nodeToFragment(document.getElementById(id), this)
  document.getElementById(id).appendChild(dom)
}