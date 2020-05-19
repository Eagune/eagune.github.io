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
photos: /imgs/vue深入理解/Directives行为预设.jpg
---

Directive我们通常叫它指令，在我的理解里Directives就是它是一组行为预设。前面我们不是有讲到Watcher嘛，Watcher作为中介者连接了数据和回调函数，但是我们的回调函数还是都是需要自己写一些操作的，实际上我们开发过程中有很多的重复性的操作，我们就将这一部分操作提取出来这就是Directive。现在这样是不是觉得指令这个名称很贴切呢，我们定义了指令告诉程序要做什么，而不是具体的谁要去做什么，这是一种抽象。

<!--more-->

## Directive

构造Directive需要一个descriptor对象，descriptor对象是我们在解析模板的时候根据相应的语法生成的一个描述对象，而Directive根据这个对象确定自己的具体类型。

descriptor对象中的def属性是定义的一些操作，通常都包括bind绑定以及update更新。Vue中默认提供了几种指令，同时我们也可以自定义指令。

加了下划线的(_bind、_update)是Directive类的抽象绑定方法，而没下划线(bind、update)的是由descriptor复制过来的具体的操作。

``` javascript
function Directive (descriptor, vm, el) {
  this.vm = vm
  this.el = el
  this.descriptor = descriptor
  this.name = descriptor.name
  this.expression = descriptor.expression
  this.arg = descriptor.arg
}

Directive.prototype._bind = function () {
  var def = this.descriptor.def
  var attr = this.descriptor.attr || ('v-' + this.name)
  this.el.removeAttribute(attr)
  extend(this, def)
  if (this.bind) {
    this.bind()
  }
  if (this.expression && this.update) {
    var dir = this
    this._update = function (val, oldVal) {
      dir.update(val, oldVal)
    }
    this._watcher = new Watcher(this.vm, this.expression, this._update)
  }
}
```

## Demo

比如我们之前的表达式解析，我们就可以用指令去实现。

``` javascript
var publicDirectives = {
  text: {
    bind () {
      this.attr = this.el.nodeType === 3 ? 'data' : 'textContent'
    },
    update (value) {
      this.el[this.attr] = value == null ? '' : value.toString()
    }
  }
}

function compileTextNode (node) {
  var tokens = parseText(node.wholeText)
  if (!tokens) {
    return null
  }
  var frag = document.createDocumentFragment()
  var el, token
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i]
    if (token.tag) {
      el = document.createTextNode(' ')
      token.descriptor = {
        name: 'text',
        def: publicDirectives['text'],
        expression: token.value,
      }
      new Directive(token.descriptor, data, el);
    } else {
      el = document.createTextNode(token.value)
    }
    frag.appendChild(el)
  }
  replace(node, frag)
}
```

[查看DEMO](/demo/vue深入理解/Directives行为预设.html)