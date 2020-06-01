title: 从0到1实现Vue
speaker: Eagune
prismTheme: solarizedlight


<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# 从0到1实现Vue {.text-landing.text-shadow}

By Eagune {.text-intro}

[:fa-newspaper-o: 博客](https://eagune.github.io/categories/Vue%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3){.button.ghost}

[:fa-github: Github](https://github.com/Eagune/eagune.github.io){.button.ghost}

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# mvc和mvvm的区别 {.text-landing.text-shadow}

:::column {.build.fadeIn.animated.slow}
![](/MVC.webp)

---
![](/MVC.webp)
:::

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# 变化侦测 {.text-landing.text-shadow}

<slide :class="size-50">

## **Javascript中如何检测一个对象的变化?**

` `

1. Object.defineProperty
2. Proxy
{.text-intro.build.moveIn}
