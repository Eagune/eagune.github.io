---
title: （二）Observer将数据对象变成响应式
date: 2020-04-25 09:43:39
categories:
- Vue深入理解
index: 1
tags:
- vue
- Observer
- 响应式
photos: /imgs/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Observer%E5%B0%86%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1%E5%8F%98%E6%88%90%E5%93%8D%E5%BA%94%E5%BC%8F.jpg
---

通过前面的方法我们已经可以实现变化侦测的功能了，但是只做到了对数据对象中的某一个属性进行侦测，而我们希望对这个数据对象中的所有属性进行侦测，因此我们需要封装一个Observer类。

## Observer

``` javascript
function Observer (value) {
  this.value = value
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
    value.__proto__ = arrayMethods;
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}

function observe (value) {
  if (!value || typeof value !== 'object') {
    return
  }
  var ob
  if (
    Object.prototype.hasOwnProperty.call(value, '__ob__') &&
    value.__ob__ instanceof Observer
  ) {
    ob = value.__ob__
  } else if (
    (Array.isArray(value) || isPlainObject(value))
    && Object.isExtensible(value)
  ) {
    ob = new Observer(value)
  }
  return ob
}
```

首先我们在构造Observer的时候会给我们要观测对象添加一个\__ob\__属性，这个属性指向这个Observer。通过检查对象上的这个属性我们可以知道这个对象是否已经被观测过，从而避免重复的观测。

<!--more-->

``` javascript
Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i])
  }
}

Observer.prototype.walk = function (obj) {
  var keys = Object.keys(obj)
  for (var i = 0, l = keys.length; i < l; i++) {
    defineReactive(this.value, keys[i], obj[keys[i]])
  }
}

function defineReactive(data, key, value) {
  var childOb = observe(value)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return value;
    },
    set: function(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      childOb = observe(newVal)
    }
  });
}
```

然后我们判断这个值是数组还是对象。如果是数组那么给它应用上拦截器，并用observe方法遍历数组中的每一个值。如果是对象，我们就遍历这个对象上的每一个属性，将其转换为响应式的对象属性。

不管是数组还是对象属性在遍历的时候我们都对它的值进行了观测observe，如果这个值也是一个数组或对象，我们就继续构造一个Observer对象，通过这种递归调用的形式，我们就可以将对象上的所有属性包括子属性、数组中的值都侦测到。

## 工具方法

``` javascript
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```

def方法可以给对象添加一个属性，默认是不可枚举的。

isPlainObject则是用来严格检验一个对象是否是一个简单的JavaScript对象。

## Demo

[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Observer%E5%B0%86%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1%E5%8F%98%E6%88%90%E5%93%8D%E5%BA%94%E5%BC%8F.html)
