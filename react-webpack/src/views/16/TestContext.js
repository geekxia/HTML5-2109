import React, { PureComponent } from 'react'
import ThemeContext from '@/utils/theme'

// 上下文
// 作用：用于在组件树之间传递数据。
// 说明：只能从根组件向下后代组件传递，不能倒着来。

// 在类组件中，默认就有“上下文”这个特性
// 在函数式组件中，默认没有“上下文”这个特性，以后我们用useContext这样的Hooks才能实现。

// 一、在类组件中使用上下文的第一种语法
// class TestContext extends PureComponent {
//   render () {
//     const theme = this.context
//     return (
//       <div style={theme}>
//         <h1>学习上下文</h1>
//       </div>
//     )
//   }
// }
// TestContext.contextType = ThemeContext
// export default TestContext


// 二、在类组件中使用上下文的第二种语法
export default class extends PureComponent {
  render () {
    return (
      <ThemeContext.Consumer>
      {
        (theme)=>(
          <div style={theme}>
            <h1>学习上下文</h1>
          </div>
        )
      }
      </ThemeContext.Consumer>
    )
  }
}
