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

Vue支持template选项写#app这样的HTML选择符，也支持直接存放模板字符串、document fragment、dom元素等等。我们这里只看看模板字符串的情况。

为什么要将字符串转换为Fragment呢？因为频繁调用DOM的API会非常耗性能，而我们使用虚拟的节点对象会减少页面渲染dom的次数，效率会明显提升。

同时使用这个浏览器自带的API可以很方便的帮我们将字符串转换成合法的DOM Tree，便于我们后续的解析。

stringToFragment
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
```

较源码省略了的地方：诸如td、option等需要嵌套的标签如果直接使用生成的fragment并不会生效，我们需要手动的拼接加上外层。

<!-- [查看DEMO](/demo/vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/%E5%A3%B0%E6%98%8E%E5%BC%8F%E5%9C%B0DOM%E7%BB%91%E5%AE%9A.html) -->

### compile阶段

``` javascript
function compile (el) {
  var nodeLinkFn = compileNode(el, options)
  var childLinkFn = el.hasChildNodes()
    ? compileNodeList(el.childNodes, options)
    : null
}

function compileNodeList (nodeList, options) {
  var linkFns = []
  var nodeLinkFn, childLinkFn, node
  for (var i = 0, l = nodeList.length; i < l; i++) {
    node = nodeList[i]
    nodeLinkFn = compileNode(node, options)
    childLinkFn = node.hasChildNodes()
      ? compileNodeList(node.childNodes, options)
      : null
    linkFns.push(nodeLinkFn, childLinkFn)
  }
  return linkFns.length
    ? makeChildLinkFn(linkFns)
    : null
}

function compileNode (node, options) {
  var type = node.nodeType
  if (type === 1) {
    return compileElement(node, options)
  } else if (type === 3 && node.data.trim()) {
    return compileTextNode(node, options)
  } else {
    return null
  }
}

function makeChildLinkFn (linkFns) {
  return function childLinkFn (vm, nodes, host, scope, frag) {
    var node, nodeLinkFn, childrenLinkFn
    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
      node = nodes[n]
      nodeLinkFn = linkFns[i++]
      childrenLinkFn = linkFns[i++]
      var childNodes = Array.prototype.slice.call(node.childNodes)
      if (nodeLinkFn) {
        nodeLinkFn(vm, node, host, scope, frag)
      }
      if (childrenLinkFn) {
        childrenLinkFn(vm, childNodes, host, scope, frag)
      }
    }
  }
}
```

我们可以看到其实compile方法就是对transclude阶段生成的fragment递归调用，遍历所有子节点对其执行compileNode,如果节点类型为1则compileElement，如果节点类型为3则compileTextNode。下面我们重点看看这两个方法。

``` javascript
function compileElement (el, options) {
  var linkFn
  var hasAttrs = el.hasAttributes()
  var attrs = hasAttrs && toArray(el.attributes)
  // check terminal directives (for & if)
  if (hasAttrs) {
    linkFn = checkTerminalDirectives(el, attrs, options)
  }
  // check element directives
  if (!linkFn) {
    linkFn = checkElementDirectives(el, options)
  }
  // check component
  if (!linkFn) {
    linkFn = checkComponent(el, options)
  }
  // normal directives
  if (!linkFn && hasAttrs) {
    linkFn = compileDirectives(attrs, options)
  }
  return linkFn
}
```

较源码省略了的地方：TEXTAREA的特殊处理。

``` javascript
function compileTextNode (node, options) {
  var tokens = parseText(node.wholeText)
  if (!tokens) {
    return null
  }

  var frag = document.createDocumentFragment()
  var el, token
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i]
    el = token.tag
      ? processTextToken(token, options)
      : document.createTextNode(token.value)
    frag.appendChild(el)
  }
  return makeTextNodeLinkFn(tokens, frag, options)
}
```

较源码省略了的地方：对IE有时候将单个文本节点分解为多个的问题的兼容处理。

``` javascript
function parseText (text) {
  var tagRE = /\{\{((?:.|\n)+?)\}\}/g

  if (!tagRE.test(text)) {
    return null
  }
  var tokens = []
  var lastIndex = tagRE.lastIndex = 0
  var match, index, html, value
  while (match = tagRE.exec(text)) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      tokens.push({
        value: text.slice(lastIndex, index)
      })
    }
    // tag token
    value = match[1]
    tokens.push({
      tag: true,
      value: value.trim(),
    })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    tokens.push({
      value: text.slice(lastIndex)
    })
  }
  return tokens
}
```

较源码省略了的地方：缓存、三重大括号显示html。

(?:.|\n)中，.匹配换行符以外的字符，因为有的系统的换行符是\r\n，所以.|\n匹配除了\r之外的任意字符，?:表示非捕获型括号，所以整个的就是匹配任意一个非\r的字符

在正则中lastIndex属性用于规定下次匹配的起始位置，因此我们每次匹配到后需要设置lastIndex为0下次才会匹配到正确的结果。
