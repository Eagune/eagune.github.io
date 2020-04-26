---
title: （四）Dep依赖收集
date: 2020-04-25 13:33:50
categories:
- vue深入理解
index: 3
tags:
- vue
- Dep
---
## 依赖收集的作用
我们已经具备变化侦测的能力了，也就是说当数据变化的时候我们立马就知道了。在一个应用中可能会有多个地方使用到我们的这个数据，因此我们需要将这些依赖收集起来，当数据产生变化的时候通知他们。

## Dep
我们定义一个Dep类,通过depend方法可以将依赖数据的对象收集起来，notify方法可以通知所有的依赖数据的对象进行更新。
我们通过将依赖数据的对象挂在到window.target上，当触发depend的时候将依赖数据的对象保存。
``` javascript
class Dep {
  constructor(value) {
    this.subs = [];
  }

  depend() {
    if (window.target) {
      this.subs.push(window.target);
    }
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}
```

## 在defineReactive中使用Dep
``` javascript
function defineReactive(data, key, value) {
  let dep = new Dep();
  if (typeof value === 'object') {
    new Observer(value);
  }
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.append(); //新增
      return value;
    },
    set: function(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      dep.notify(); //通知
      if (typeof value === 'object') {
        new Observer(value);
      }
    }
  });
}
```