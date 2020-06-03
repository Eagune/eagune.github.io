title: 从0到1实现Vue
speaker: Eagune
prismTheme: solarizedlight



<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# 从0到1实现Vue {.text-landing.text-shadow}

By Eagune {.text-intro}

[:fa-newspaper-o: 博客](https://eagune.github.io/categories/Vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3){.button.ghost}

[:fa-github: Github](https://github.com/Eagune/eagune.github.io){.button.ghost}

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# mvc与mvvm {.text-landing.text-shadow}

:::column {.build.fadeIn.animated.slow}
![](/ppt/dist/从0到1实现Vue/MVC.jpg)

---
![](/ppt/dist/从0到1实现Vue/ember_archi.jpg)
:::

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# mvc与mvvm {.text-landing.text-shadow}

!![](/ppt/dist/从0到1实现Vue/mvvm.png .size-50)

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# 变化侦测 {.text-landing.text-shadow}

<slide :class="size-50">

## **Javascript中如何检测一个对象的变化?**

` `

1. Object.defineProperty
2. Proxy
{.text-intro.build.moveIn}

<slide :class="size-50">

## **Object.defineProperty**

``` javascript
function defineReactive(obj, property, value) {
  Object.defineProperty(obj, property, {
    enumerable: true,
    configurable: true,
    get: function() {
      return value;
    },
    set: function(newValue) {
      if (newValue === value) return
      value = newValue;
    },
  })
}
```

[Demo](https://eagune.github.io/demo/vue深入理解/Vue中变化侦测的原理1.html){.button}

<slide :class="size-50">

# 对于数组：

``` javascript
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift',
'splice', 'sort', 'reverse'].forEach(function(method) {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {//使用rest参数可以避免将argumesnts对象转换为数组
      return original.apply(this, args)
    },
    enumerable: false, //不让方法出现在枚举属性中
    writable: true,
    configurable: true,
  })
})
```

[Demo](https://eagune.github.io/demo/vue深入理解/Vue中变化侦测的原理2.html){.button}

<slide :class="size-50">

## Observer

` `

1. 对每个属性defineReactive过于麻烦
2. 对象中嵌套对象或数组
{.text-intro.tobuild.moveIn}

` `

[代码](https://eagune.github.io/vue深入理解/Observer将数据对象变成响应式){.button.tobuild}
[Demo](https://eagune.github.io/demo/vue深入理解/Observer将数据对象变成响应式.html){.button.tobuild}

<slide :class="size-50">

## Watcher

` `

1. 没有将对应的方法暴露出来
2. 通知谁去更新
{.text-intro.tobuild.moveIn}

` `

[代码](https://eagune.github.io/vue深入理解/Watcher依赖数据的对象){.button.tobuild}
[Demo](https://eagune.github.io/demo/vue深入理解/Watcher依赖数据的对象.html){.button.tobuild}

<slide :class="size-50">

## Dep

` `

1. 一个数据可能会对应很多依赖
2. 挂载到全局对象的变量污染
{.text-intro.tobuild.moveIn}

` `

[代码](https://eagune.github.io/vue深入理解/Dep依赖收集){.button.tobuild}
[Demo](https://eagune.github.io/demo/vue深入理解/Dep依赖收集.html){.button.tobuild}

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

## Observer、Dep、Watcher关系

!![](/ppt/dist/从0到1实现Vue/关系图.jpg .size-80)