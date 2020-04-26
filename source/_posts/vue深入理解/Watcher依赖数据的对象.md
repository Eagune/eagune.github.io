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
[查看DEMO]()
