---
title: （三）Watcher依赖数据的对象
date: 2020-04-25 13:33:50
categories:
- Vue深入理解
index: 2
tags:
- vue
- Watcher
- 依赖
photos: /imgs/vue深入理解/Watcher依赖数据的对象.jpg
---

## 如何利用变化侦测

我们在前面已经做到了将一个对象上所有属性进行侦测，也就是说任何值改变我们都能知道。但是并没有将对应的方法暴露出来，也就是说不管更新在setter或者mutator中触发了，我们并不能再外部去调用方法去更新。

同时虽然取值的时候可以会触发getter，而在setter或者mutator中赋值的时候可以通知改变，但是有个问题是我们并不知道getter中是哪个方法或者对象调用的，因此我们就不知道去通知谁去更新。

为了解决这两个问题，我们需要定义一个依赖对象，这个对象有一个取值get方法，和一个update更新方法。当调用取值方法时可以触发getter，在取值前我们将这个对象挂载到一个全局的对象中，这样在触发getter方法时我们就可以通过全局对象获取到我们的依赖对象并将其收集起来，当触发setter或者mutator的时候我们就调用依赖对象的update方法实现更新操作。

<!--more-->

## Watcher

Watcher就是这样的一个依赖对象，它就像一个中介的角色，连接了最终的数据和回调函数。它的数据可以是一段路径表达式也可以是一个函数（expOrFn），我们将其定义成getter方法。

同时我们定义了一个get方法，在取值前先将Watcher对象挂载到全局对象上，调用它让依赖能被收集起来。

``` javascript
function Watcher (vm, expOrFn, cb, options) {
  if (options) {
    extend(this, options)
  }
  this.vm = vm
  this.expression = expOrFn
  this.cb = cb
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  } else {
    this.getter = parsePath(expOrFn)
  }
  this.value = this.get()
  this.shallow = false
}

Watcher.prototype.get = function () {
  window.target = this
  var value = this.getter.call(this.vm, this.vm)
  window.target = null
  return value
}

Watcher.prototype.update = function () {
  var value = this.get()
  if (
    value !== this.value ||
    ((isObject(value) || this.deep) && !this.shallow)
  ) {
    var oldValue = this.value
    this.value = value
    this.cb.call(this.vm, value, oldValue)
  }
}
```

## 工具方法

``` javascript
function parsePath(path) {
  const segments = path.split('.') //闭包保存层级数组
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function extend (to, from) {
  var keys = Object.keys(from)
  var i = keys.length
  while (i--) {
    to[keys[i]] = from[keys[i]]
  }
  return to
}
```

1. parsePath： 使我们可以对更复杂的层级属性进行监听时（比如我们想侦测到data.a.b.c的时候）。
2. isObject： 检测一个值是否为对象。
3. extend： 可以将一个对象的属性拷贝到另一个对象上。

## Demo

[查看DEMO](/demo/vue深入理解/Watcher依赖数据的对象.html)
