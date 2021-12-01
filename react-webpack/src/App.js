// 定义根组件
import React from 'react'
import { HashRouter } from 'react-router-dom'
import Layout from '@/layout'
import { Provider } from 'mobx-react'
import store from '@/store'

export default function App() {
  return (
    <HashRouter>
      <Provider {...store}>
        <Layout />
      </Provider>
    </HashRouter>
  )
}
