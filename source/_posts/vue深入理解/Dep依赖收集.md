---
title: （四）Dep依赖收集
date: 2020-04-26 09:58:52
categories:
- Vue深入理解
index: 3
tags:
- vue
- Dep
- 依赖收集
photos: /imgs/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Dep%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.jpg
---

通过Watcher我们可以定义一个数据和回调函数的关系，当我们的数据变化的时候执行对应的回调函数。

有的时候一个数据可能会对应很多的回调函数（即程序中很多地方都用到了某个数据），这时候我们就需要将这些依赖关系收集起来，当数据变化的时候统一执行回调函数。

## Dep的定义

Dep就是这样一个专门帮助我们管理依赖的类，它主要实现了依赖的收集、删除以及向依赖发送通知。同时我们可以将之前挂载到全局对象上的方法改为挂载到Dep上，避免污染全局作用域。

<!--more-->

``` javascript
function Dep () {
  this.subs = []
}

Dep.target = null

Dep.prototype.depend = function () {
  if (Dep.target) {
    if (this.subs.indexOf(Dep.target) > -1) {
      this.subs.push(Dep.target)
    }
  }
}

Dep.prototype.notify = function () {
  var subs = this.subs
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```

## Dep的使用

我们只需要将之前的Observer、defineReactive、mutator改造一下就可以实现依赖的收集和通知。我们给每一个属性构造一个Dep对象，当该属性触发取值的时候调用depend方法将依赖收集起来。同时如果这个属性的值是object或array的时候我们让子对象的Observer也把依赖添加进去，这很重要，因为数组的依赖就是在这里收集的，我们的mutator方法并不会触发defineReactive这里的依赖，而是触发在Observer收集的依赖。

``` javascript
function Observer (value) {
  this.value = value
  this.dep = new Dep()
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
    value.__proto__ = arrayMethods;
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}

function defineReactive(data, key, value) {
  var dep = new Dep()
  var childOb = observe(value)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          for (var e, i = 0, l = value.length; i < l; i++) {
            e = value[i]
            e && e.__ob__ && e.__ob__.dep.depend()
          }
        }
      }
      return value;
    },
    set: function(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      childOb = observe(newVal)
      dep.notify()
    }
  });
}

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method) {
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var i = arguments.length
    var args = new Array(i)
    while (i--) {
      args[i] = arguments[i]
    }
    var result = original.apply(this, args)
    var ob = this.__ob__
    var inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    ob.dep.notify()
    return result
  })
})
```

[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Dep%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.html)