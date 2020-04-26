---
title: （一）Vue中的变化侦测的原理
date: 2020-04-24 19:16:26
categories:
- vue深入理解
index: 0
tags:
- vue
- 变化侦测
---
变化侦测是Vue中实现响应式的核心。它的作用是当数据变化时，通知视图进行相应的更新。

## Object的变化侦测
在javascript中有两种方法可以侦测到一个对象的变化：Object.defineProperty和ES6的Proxy。
``` javascript
function defineReactive(obj, property, value) {
  Object.defineProperty(obj, property, {
    enumerable: true,
    configurable: true,
    get: function() {
      return value;
    },
    set: function(newValue) {
      if (newValue === value) return
      value = newValue;
    },
  })
}
```
[查看DEMO](https://eagune.github.io/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Vue%E4%B8%AD%E7%9A%84%E5%8F%98%E5%8C%96%E4%BE%A6%E6%B5%8B%E7%9A%84%E5%8E%9F%E7%90%861.html)

## Array的变化侦测
在对Object进行变化侦测的时候是使用getter/setter的方式来进行追踪。而用push等方法来改变数组中的内容时并不会出发setter。
因此我们采用拦截器的方式覆盖Array.prototype来对数组进行追踪。
``` javascript
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
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
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {//使用rest参数可以避免将argumesnts对象转换为数组
      return original.apply(this, args)
    },
    enumerable: false, //不让方法出现在枚举属性中
    writable: true,
    configurable: true,
  })
})
```
[查看DEMO](https://eagune.github.io/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Vue%E4%B8%AD%E7%9A%84%E5%8F%98%E5%8C%96%E4%BE%A6%E6%B5%8B%E7%9A%84%E5%8E%9F%E7%90%862.html)