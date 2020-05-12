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
# Observer

我们已经知道了变化侦测的原理了，并且知道了Object和Array的不同，现在我们封装一个Observer类，将一个数据对象中的所有属性都进行追踪。

<!--more-->

``` javascript
class Observer {
  constructor(value) {
    this.value = value;

    if (!Array.isArray(value)) {
      this.walk(value);
    } else {
      value.__proto__ = arrayMethods;
    }
  }

  walk(object) {
    for (let key in object) {
      defineReactive(object, key, object[key]);
    }
  }
}

function defineReactive(data, key, value) {
  if (typeof value === 'object') {
    new Observer(value);
  }
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
      if (typeof value === 'object') {
        new Observer(value);
      }
    }
  });
}
```
[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Observer%E5%B0%86%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1%E5%8F%98%E6%88%90%E5%93%8D%E5%BA%94%E5%BC%8F.html)
