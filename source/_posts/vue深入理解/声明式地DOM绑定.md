---
title: （五）声明式地DOM绑定
date: 2020-04-28 11:03:50
categories:
- vue深入理解
index: 5
tags:
- vue
---
## 模板

在前面的章节中我们已经知道了通过对数据进行劫持的方式可以让我们以这种通过数据驱动的方式去开发一个应用程序。但是如果全部在Watcher中做控制这样需要写很多重复性的控制视图的代码。

这样显然是很麻烦的，MVVM的核心是在MVC的基础上将view的状态行为抽象化。

在Vue中模板就是用来声明我们应用程序的数据与界面的绑定关系。

## 模板的编译

在Vue中模板不仅可以做到绑定数据还可以做到诸如循环判断等复杂功能，因此一定是一个图灵完备的语言去实现而不是html，它只是一种接近html的写法。

在Javascript中模板本质上也就是字符串，因此在Vue的运行过程中还需要将我们的模板字符串转换成DOM节点，并在这个过程中实现与我们数据的绑定。

模板的编译分为三个阶段：transclude阶段、compile阶段、linker阶段

### transclude阶段

#### stringToFragment
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
    var tag = tagMatch && tagMatch[1]
    var node = document.createElement('div')
    node.innerHTML = templateString
    frag.appendChild(child)
  }
  return frag
}
```
[查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/%E5%A3%B0%E6%98%8E%E5%BC%8F%E5%9C%B0DOM%E7%BB%91%E5%AE%9A.html)

### compile阶段
