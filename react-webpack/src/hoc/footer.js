import React, { PureComponent } from 'react'

// 高阶组件：本质上就是一个“纯函数”，它接受一个React组件作为入参，返回一个新的React组件。
  // 把这个入参的React组件，称之为"UI组件"
  // 把这个纯函数，称之为“容器组件”，实际上是一种“装饰”作用

// 什么是“纯函数”？
// 1、唯一输入，永远得到相同的输出。
// 2、在纯函数中我们不能修改入参。

// 封装高阶组件时，一定要使用“属性继承”保留所有来自其它父组件的props。
// 属性继承的语法： <C {...props} />

export default function footer(WrappedComponent) {
  return class extends PureComponent {
    render() {
      return (
        <>
          <WrappedComponent {...this.props} msg='hello' />
          <footer>我是footer这个高阶组件给我的底部</footer>
        </>
      )
    }
  }
}
