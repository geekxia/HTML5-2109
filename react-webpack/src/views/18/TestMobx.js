import React, { PureComponent } from 'react'


// mobx、mobx-react
// 作用：你可以理解像vuex一样的状态管理，用到React技术栈的状态管理。
// 场景：一般在中小型的react架构中会用到。

// mobx是用于定义store的
// mobx-react是用于把mbox和react绑定起来的工具库（上下文、高阶组件）

// redux、react-redux
// redux也是一个React技术中的状态管理，一般用于比较大型的架构。


import { observer, inject } from 'mobx-react'
// observer这个高阶组件，把当前组件变成观察者。如果observable变量发生变化，当前组件自动更新视图。
// inject这个高阶组件，用于把上下文中的store数据注入到当前组件（相当于是上下文的消费者）


// 一、在类组件中使用mobx数据
// 先做人（观察者）再做事（使用数据做事）
// @inject(['user'])
// @observer
// class TestMobx extends PureComponent {
//   render() {
//     console.log('props', this.props)
//     const { user } = this.props
//     console.log('msg', user.msg)
//     return (
//       <div>
//         <h1>在类组件中学习Mobx</h1>
//         <h1>来自于mobx中的信息：{user.msg}</h1>
//         <button onClick={()=>user.changeMsg(Math.random())}>修改mbox中的信息</button>
//       </div>
//     )
//   }
// }
// export default TestMobx


// 二、在函数式组件中使用mobx
export default inject(['user'])(
  observer(
    ({user}) => (
      <div>
        <h1>在函数式组件中学习mobx</h1>
        <h1>来自于mobx中的信息：{user.msg}</h1>
        <button onClick={()=>user.changeMsg(Math.random())}>修改mbox中的信息</button>
      </div>
    )
  )
)
