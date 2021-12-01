// 1、找到react-router-dom文档、了解常用的组件和api
// 2、会配置路由规则，<HashRouter>、<Route>、<NavLink>....
// 3、实现“代码分割”（类似vue-router的路由懒加载）
  // 安装两个包：@babel/plugin-syntax-dynamic-import、@loadable/component

import React from 'react'
import loadable from "@loadable/component"
import {
  AppleOutlined,
  MailOutlined
} from '@ant-design/icons'

// 代码分割
const TestJsx = loadable(()=>import('@/views/12/TestJsx'))

import TestState from '@/views/12/TestState'
// import TestProps from '@/views/12/TestProps'
// import TestEvent from '@/views/12/TestEvent'
// import TestCondition from '@/views/12/TestCondition'
// import TestStyle from '@/views/12/TestStyle'
// import TestList from '@/views/12/TestList'
// import TestForm from '@/views/12/TestForm'
// import TestLife from '@/views/12/TestLife'
// import TestLift from '@/views/14/TestLift'
// import TestCompose from '@/views/14/TestCompose'
// import TestContext from '@/views/16/TestContext'
import TestHoc from '@/views/16/TestHoc'
const TestHooks = loadable(()=>import('@/views/16/TestHooks'))

const TestMobx = loadable(()=>import('@/views/18/TestMobx'))
const TestMusic = loadable(()=>import('@/views/18/TestMusic'))




export default [
  {
    id: 1001, text: '就业12K', icon: <AppleOutlined />,
    children: [
      { id: 1, text: '学习JSX', path: '/jsx', component: TestJsx },
      { id: 2, text: '学习State', path: '/state', component: TestState }
    ]
  },
  {
    id: 1003, text: '就业16K', icon: <MailOutlined />,
    children: [
      { id: 4, text: '高阶组件', path: '/hoc', component: TestHoc },
      { id: 3, text: '学习Hooks', path: '/hooks', component: TestHooks }
    ]
  },
  {
    id: 1002, text: '就业18K', icon: <MailOutlined />,
    children: [
      { id: 5, text: '状态管理', path: '/mobx', component: TestMobx },
      { id: 6, text: '音乐列表', path: '/music', component: TestMusic }
    ]
  }
]
