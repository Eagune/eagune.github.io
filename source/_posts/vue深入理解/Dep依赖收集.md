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
## 封装Dep
我们可以将defineReactive中收集依赖，通知依赖的命令式代码封装一下。
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
  if (typeof value === 'object') {
    new Observer(value);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.depend(); //新增
      return value;
    },
    set: function(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      if (typeof value === 'object') {
        new Observer(value);
      }
      dep.notify(); //通知
    }
  });
}
```
[查看DEMO](https://eagune.github.io/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Watcher%E4%BE%9D%E8%B5%96%E6%95%B0%E6%8D%AE%E7%9A%84%E5%AF%B9%E8%B1%A11.html)