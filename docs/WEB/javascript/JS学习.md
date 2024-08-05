---
title: JS学习
index: 1
---
# 简洁判断

```javascript
let loginStatus = false

loginStatus && login()

if (loginStatus) login()

if (loginStatus) {
  login()
}
```

使用 `&&` 的短路特性

少量判断条件时很方便，而且阅读性也不差，但一旦判断条件多或者执行语句多就不太合适了。

# 交换数组元素位置

```javascript
let a = [1, 2, 3, 4, 5]

[a[3], a[1]] = [a[1], a[3]]

console.log(a) // [ 1, 4, 3, 2, 5 ]
```

# ES6标签模板字符串

在JavaScript中，我们一般是通过 函数名() 方式来调用函数，其实函数还有另外一种调用方式：

ES6标签模板字符串是一种 JavaScript 中的高级字符串处理技术，它允许你使用自定义标签函数来处理模板字符串中的内容。

标签函数是一个普通的 JavaScript 函数，它可以在模板字符串中的文本和占位符之间进行自定义处理。标签模板字符串的语法如下：

```javascript
function myTag(strings, ...values) {
  // strings 是一个数组，包含模板字符串中的文本部分
  // values 是一个包含所有占位符值的数组
  // 在标签函数中，你可以自定义处理这些值，并返回最终的结果
}

// 使用标签模板字符串
const result = myTag`Hello, ${name}!`;
```

在标签函数中，你可以自定义处理模板字符串中的文本和占位符值，然后返回一个最终的字符串或其他数据结构。

这允许你执行各种高级字符串操作，如字符串插值、HTML 转义、国际化处理等。

# JS标记

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label

可使用一个标签来唯一标记一个循环，然后使用 `break` 或 `continue` 语句来指示程序是否中断循环或继续执行。

需要注意的是，JavaScript 没有 `goto` 语句，标记只能和 `break` 或 `continue` 一起使用。

```javascript
out: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    for (let k = 0; k < 10; k++) {
      break out;
    }
  }
}
```





   

