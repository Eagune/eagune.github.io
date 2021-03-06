---
title: 【HTTP协议】URI
date: 2020-05-20 10:11:24
categories:
- 网络协议
index: 1001
tags:
- 网络协议
- HTTP协议
- URI
photos: /imgs/网络协议/URI.jpg
---

## 什么是URI

URI是URL和URN的超集

`URL（Uniform Resource Locator）`：表示资源的位置，期望提供查找资源的方法，我们日常在浏览器中使用的URI其实也是URL。

`URN（Uniform Resource Name）`：表示资源的名字标识，比如磁力链接，期待用一个中心化的服务去解析这个名字标识然后解析到一个资源位置。

<!--more-->

## URI的组成

URI的组成：**schema**，**user information**，**host**，**port**，**path**，**query**，**fragment**

![URI的组成](/imgs/网络协议/URI/URI的组成.jpg)

## URI的格式

> `URI` = `schema` ":" `hier-part` ["?" `query`] ["#" `fragment`]

`schema` = ALPHA *(ALPHA/DIGIT/"+"/"-"/".")

`hier-part` = "//" `authority` `path`

`authority` = [userinfo "@"]`host`[":" `port`]

`host` = IP-literal/IPv4address/reg-name

`port` = *DIGIT

`path` = path-abempty/path-absolute/path-noscheme/path-rootless/path-empty

`query` = *(pchar/"/"/"?")

`fragment` = *(pchar/"/"/"?")

## URI的编码

为什么要进行URI编码：可能存在做分隔符的保留字符，可能出现会产生歧义的数据编码。

编码方式：百分号编码方式