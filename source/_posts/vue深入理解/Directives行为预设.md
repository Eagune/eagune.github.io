---
title: （七）Directives行为预设
date: 2020-05-15 22:59:43
categories:
- Vue深入理解
index: 7
tags:
- vue
- Directives
- 指令
- 行为预设
photos: /imgs/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/Directives%E8%A1%8C%E4%B8%BA%E9%A2%84%E8%AE%BE.jpg
---

Directive我们通常叫它指令，在我的理解里Directives就是它是一组行为预设。前面我们不是有讲到Watcher嘛，Watcher作为中介者连接了数据和回调函数，但是我们的回调函数还是都是需要自己写一些操作的，实际上我们开发过程中有很多的重复性的操作，我们就将这一部分操作提取出来这就是Directive。现在这样是不是觉得指令这个名称很贴切呢，我们定义了指令告诉程序要做什么，而不是具体的谁要去做什么，这是一种抽象。

<!--more-->

Vue中默认提供了几种指令(text, html, for, if, show, model, on, bind, el, ref, cloak)，同时我们也可以自定义指令。

## descriptor对象

descriptor是我们在解析模板的时候根据相应的语法生成的一个描述对象。

## Directive

这里面两个bind比较容易弄混，_bind是Directive类的抽象绑定方法，而bind是由descriptor复制过来的具体的操作。

``` javascript
function Directive (descriptor, vm, el, host, scope, frag) {
  this.vm = vm
  this.el = el
  // copy descriptor properties
  this.descriptor = descriptor
  this.name = descriptor.name
  this.expression = descriptor.expression
  this.arg = descriptor.arg
  this.modifiers = descriptor.modifiers
  this.filters = descriptor.filters
}

function noop () {}
Directive.prototype._bind = function () {
  var name = this.name
  var descriptor = this.descriptor

  var def = descriptor.def
  if (typeof def === 'function') {
    this.update = def
  } else {
    extend(this, def)
  }

  if (this.bind) {
    this.bind()
  }
  this._bound = true

  if (
    (this.expression || this.modifiers) &&
    (this.update || this.twoWay) &&
    !this._checkStatement()
  ) {
    var dir = this
    if (this.update) {
      this._update = function (val, oldVal) {
        dir.update(val, oldVal)
      }
    } else {
      this._update = noop
    }
    this._watcher = new Watcher(
      this.vm,
      this.expression,
      this._update,
      {
        filters: this.filters,
        twoWay: this.twoWay,
        deep: this.deep,
        preProcess: preProcess,
        postProcess: postProcess,
        scope: this._scope
      }
    )
  }
}
```

## Demo