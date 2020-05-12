---
title: （一）Vue中变化侦测的原理
date: 2020-04-24 19:16:26
categories:
- Vue深入理解
index: 0
tags:
- vue
- 变化侦测
- defineReactive
- Object.defineProperty
photos: /imgs/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Vue%E4%B8%AD%E5%8F%98%E5%8C%96%E4%BE%A6%E6%B5%8B%E7%9A%84%E5%8E%9F%E7%90%86.jpg
---

## 变化侦测

变化侦测是实现响应式的核心。它的作用是当数据变化时，通知视图进行相应的更新。

我们的应用程序在运行时内部的状态会不断发生变化，而变化侦测就是检测到系统哪一个部分发生了变化。

比如在Angular中的脏检测，React中的虚拟DOM，而Vue中实现变化侦测的方式是对数据的劫持（元编程）。

这种方式的好处是在状态发生变化时，我们的程序就立马知道了，然后我们就可以对绑定了这个状态的所有依赖发送通知，让它们进行更新。

在javascript中使用Object.defineProperty可以侦测到一个对象的变化，然而它并不能侦测到数组中的变化，因此我们需要分别讨论。

<!--more-->

## Object的变化侦测

我们定义一个defineReactive函数对Object.defineProperty进行封装，方便我们实现将对象中的某个数据转换成响应式的数据，每次从读取数据时会触发get函数，而每次设置数据时会触发set函数。

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
[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Vue%E4%B8%AD%E5%8F%98%E5%8C%96%E4%BE%A6%E6%B5%8B%E7%9A%84%E5%8E%9F%E7%90%861.html)

## Array的变化侦测

在对Object进行变化侦测的时候是使用getter/setter的方式来进行追踪，然而对于数组类型，虽然读取数据时依然会触发get函数，但是并不能检测到我们通过push、pop等方法操作数组带来的改变。

因此我们采用另外一种方式实现变化侦测：拦截器。就是当我们调用数组的push、pop等方法的时候，先进入我们自定义的方法这样我们就可以知道这个变化，这时候我们在对依赖进行通知，然后调用数组的原始方法。

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

首先我们创建了arrayMethods对象来保存数组的原始方法，并对（push、pop、shift、unshift、splice、sort、reverse）这7种方法进行劫持。原理依然是我们调用这些方法的时候其实也是调用了原型对象上的一个属性，所以它依然可以触发这个属性的一个getter。

在使用的时候我们只希望我们对我们需要侦测数组进行劫持，所以我们不能覆盖Array.prototype，因此我们可以通过改变数据的\__proto\__指向我们的原型方法来实现。

[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Vue%E4%B8%AD%E5%8F%98%E5%8C%96%E4%BE%A6%E6%B5%8B%E7%9A%84%E5%8E%9F%E7%90%862.html)