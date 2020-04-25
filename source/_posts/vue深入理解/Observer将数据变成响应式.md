---
title: Observer将数据变成响应式
date: 2020-04-25 09:43:39
categories:
- vue深入理解
tags:
- vue
- Observer
---
我们已经知道了变化侦测的原理了，并且知道了Object和Array的不同，现在我们封装一个Observer类，将一个数据对象中的所有属性都进行追踪。

``` javascript
class Observer {
  constructor(value) {
    this.value = value;

    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  walk(object) {
    for (let key in object) {

    }
  }
}

function defineReactive(data, key, value) {
  if (typeof value === 'object') {
    new Observer(value);
  }
  
}
```