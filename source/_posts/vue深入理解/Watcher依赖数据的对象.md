---
title: （三）Watcher依赖数据的对象
date: 2020-04-26 09:58:52
categories:
- vue深入理解
index: 2
tags:
- vue
- Watcher
---
## Watcher
当我们侦测到数据变化的时候，需要对不同的情况进行不同的处理，显然我们不能都放在setter中，因此我们需要抽象出一个能集中处理这种情况的类。
``` javascript
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    
    window.target = this;
    this.value = this.vm[this.key];
    window.target = undefined;
    
    this.cb.call(this.vm, this.value);
  }

  update() {
    const oldValue = this.value;
    this.value = this.vm[this.key];
    this.cb.call(this.vm, this.value, oldValue);
  }
}
```
由于我们在getter中无法获取到调用它的对象，因此我们通过将Watcher挂载到全局对象的方法，在建立依赖关系的时候我们先将Watcher挂载到全局对象上，然后取值触发getter方法，这样在getter方法中就能将依赖的对象收集起来。
``` javascript
function defineReactive(data, key, value) {
  let deps = [];
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if(window.target) {
        deps.push(window.target);
      }
      return value;
    },
    set: function(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      for (let i = 0; i < deps.length; i++) {
        deps[i].update();
      }
    }
  });
}
```
[查看DEMO](https://eagune.github.io/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Watcher%E4%BE%9D%E8%B5%96%E6%95%B0%E6%8D%AE%E7%9A%84%E5%AF%B9%E8%B1%A11.html)

## parsePath让Watcher支持复杂的层级
当对于更复杂的层级属性进行监听时（比如我们想侦测到data.a.b.c的时候），上面的方法显然是不够用的。因此我们需要对上面的方法进行升级。
``` javascript
function parsePath(path) {
  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}

class Watcher {
  constructor(vm, expression, cb) {
    this.vm = vm;
    this.getter = parsePath(expression);
    this.cb = cb;
    
    window.target = this;
    this.value = this.getter.call(this.vm);
    window.target = undefined;
    
    this.cb.call(this.vm, this.value);
  }

  update() {
    const oldValue = this.value;
    this.value = this.vm[this.key];
    this.cb.call(this.vm, this.value, oldValue);
  }
}
```
[查看DEMO](https://eagune.github.io/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Watcher%E4%BE%9D%E8%B5%96%E6%95%B0%E6%8D%AE%E7%9A%84%E5%AF%B9%E8%B1%A12.html)
