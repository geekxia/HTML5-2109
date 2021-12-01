import React from 'react'
import { footer, role, global } from '@/hoc'

// 高阶组件，不是新的API和语法，它也是一种设计模式（React组件化的一种经验）
// 作用：是为了实现代码的复用。
// 本质：高阶组件不是“组件”，是函数，是纯函数，是一种代码复用的技巧。

// 如何使用高阶组件呢？

// 一、如果当前组件是类组件，要么使用“装饰器”语法，要么“函数调用”语法
// 二、如果当前组件是函数式组件，只能使用“函数调用”语法

// 坑：我们在使用高阶组件时，是有先后顺序的，后起作用的高阶组件会覆盖前面高阶组件的props。为了解决这个问题，我们使用“属性继承”来解决这个问题。

// 总结：
// 1、理解什么高阶组件？（纯函数？容器组件？UI组件？）
// 2、如何封装高阶组件？（基本语法、注意“属性继承”）
// 3、如何使用高阶组件？（在类组件中怎么使用？在函数式组件中怎么使用？）
// 4、高阶组件能解决哪些问题？（代码逻辑的复用）
//   很多第三库都用到了高阶组件 withRouter、inject、observer、connect
//   使用高阶组件把一些全局的公共方法放在props上，供给业务组件使用。
//   使用高阶组件给业务组件添加相同的视图结构。
//   使用高阶组件可实现“细粒度的权限管理（精确元素级别）”，比如在同一个页面不同用户看到的视图微有差别。

// @role
// @footer
// @global('api')
// class TestHoc extends PureComponent {
//   render () {
//     console.log('---props', this.props)
//     const { role } = this.props
//     return (
//       <div>
//         <h1>学习高阶组件</h1>
//         { role==='ceo' && <button>开除员工</button> }
//       </div>
//     )
//   }
// }
// export default TestHoc

// 在函数式组件中，只能这么使用高阶组件，不能装饰器语法。
export default role(
  footer(
    global('tip')(
      ({role})=>(
        <div>
          <h1>学习高阶组件</h1>
          { role==='ceo' && <button>开工员工</button> }
        </div>
      )
    )
  )
)
