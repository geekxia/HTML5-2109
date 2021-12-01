import React, { useContext } from 'react'

// 创建一个上下文
const ThemeContext = React.createContext()
// <ThemeContext.Provider> 用于向组件树中注入数据
// <ThemeContext.Consumer> 从上下文取出数据并消费

export default ThemeContext

// 自定义Hooks
// 1、所有的自定义Hooks都必须以 use* 开头。
// 2、所谓的自定义Hooks本质上就是useState、useEffect、useContext这三个基础API的灵活使用。

// 上下文
const Provider = ThemeContext.Provider
// 高阶组件
function theme(W) {
  return props=><W {...props} />
}
// Hooks
function useTheme() {
  return useContext(ThemeContext)
}

export { Provider, theme, useTheme }
