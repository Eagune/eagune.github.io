---
title: （五）模板字符串转换成DOM
date: 2020-05-09 17:55:06
categories:
- Vue深入理解
index: 5
tags:
- vue
- 模板
- 转换
- Fragment
photos: /imgs/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E6%88%90DOM.jpg
---
## 模板

在前面的章节中我们已经知道了通过对数据进行劫持的方式可以让我们以这种通过数据驱动的方式去开发一个应用程序。但是如果全部在Watcher中做控制这样需要写很多重复性的控制视图的代码。

这样显然是很麻烦的，MVVM的核心是在MVC的基础上将view的状态行为抽象化。

在Vue中模板就是用来声明我们应用程序的数据与界面的绑定关系。

在Vue中模板不仅可以做到绑定数据还可以做到诸如循环判断等复杂功能，因此一定是一个图灵完备的语言去实现而不是html，它只是一种接近html的写法。

在Javascript中模板本质上也就是字符串，因此在Vue的运行过程中还需要将我们的模板字符串转换成DOM节点，并在这个过程中实现与我们数据的绑定。

<!--more-->

## stringToFragment

为什么要将字符串转换为Fragment呢？因为频繁调用DOM的API会非常耗性能，而我们使用虚拟的节点对象会减少页面渲染dom的次数，效率会明显提升。

同时使用innerHTML让浏览器自行解析可以很方便的帮我们将字符串转换成合法的DOM节点，为我们后续的操作提供便利。

``` javascript
const tagRE = /<([\w:-]+)/
const entityRE = /&#?\w+?;/
const commentRE = /<!--/

function stringToFragment (templateString) {
  var frag = document.createDocumentFragment()
  var tagMatch = templateString.match(tagRE)
  var entityMatch = entityRE.test(templateString)
  var commentMatch = commentRE.test(templateString)

  if (!tagMatch && !entityMatch && !commentMatch) {
    // text only, return a single text node.
    frag.appendChild(
      document.createTextNode(templateString)
    )
  } else {
    var node = document.createElement('div')
    node.innerHTML = templateString
    frag.appendChild(node)
  }
  return frag
}

// 较源码省略了的地方：诸如td、option等需要嵌套的标签如果直接使用生成的fragment并不会生效，我们需要手动的拼接加上外层。
```

## transclude

我们将根节点的各种属性复制到根据模板生成的节点上，并替换掉html上的根节点。

``` javascript
function init (el, template) {
  var origin = el
  el = transcludeTemplate(el, template)
  replace(origin, el)
  return el
}

function replace (target, el) {
  var parent = target.parentNode
  if (parent) {
    parent.replaceChild(el, target)
  }
}

function transcludeTemplate (el, template) {
  var frag = stringToFragment(template)
  var replacer = frag.firstChild
  var attrs = el.attributes
  var i = attrs.length
  var name, value
  while (i--) {
    name = attrs[i].name
    value = attrs[i].value
    if (!replacer.hasAttribute(name)) {
      replacer.setAttribute(name, value)
    }
  }
  return replacer
}
```
[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E6%88%90DOM.html)