---
title: Vue中的变化侦测的原理
---
变化侦测是Vue中实现响应式的核心。它的作用是当数据变化时，通知视图进行相应的更新。

## Object的变化侦测
在javascript中有两种方法可以侦测到一个对象的变化：Object.defineProperty和ES6的Proxy。
``` javascript
function defineReactive(obj, property, value) {
  Object.defineProperty(obj, property, {
    enumerable: true,
    configurable: true,
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) return
      value = newValue;
    },
  })
}
```

## Array的变化侦测
在对Object进行变化侦测的时候是使用getter/setter的方式来进行追踪。而用push等方法来改变数组中的内容时并不会出发setter。
因此我们采用拦截器的方式覆盖Array.prototype来对数组进行追踪。
``` javascript
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
[
  'push'
].forEach(function(method) {

})
```