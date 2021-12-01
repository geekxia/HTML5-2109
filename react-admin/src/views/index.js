
// import React from 'react'
import loadable from "@loadable/component"
import {
  AppleOutlined,
  GiftOutlined
} from '@ant-design/icons'

// 数据统计
const TestEchart = loadable(()=>import('@/views/charts/TestEchart'))

// 代码分割
const TestRedux1 = loadable(()=>import('@/views/study/TestRedux1'))
const TestRedux2 = loadable(()=>import('@/views/study/TestRedux2'))

// 商品管理
const GoodList = loadable(()=>import('@/views/good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('@/views/good/GoodAddOrEdit'))

// 示例：两种角色 admin(系统管理员)  editor(编辑)
// 需求：如果登录的用户是系统管理只能看到“状态管理”，如果登录用户是编辑只能看到“商品管理”

export default [
  {
    id: 9, text: '数据分析', icon: <AppleOutlined />,
    permission: ['admin', 'editor'],
    children: [
      { id: 901, text: '订单数据', path: '/charts', component: TestEchart, permission: ['admin', 'editor'] }
    ]
  },
  {
    id: 10, text: '状态管理', icon: <AppleOutlined />,
    permission: ['admin', 'editor'],
    children: [
      { id: 1001, text: 'REDUX1', path: '/redux1', component: TestRedux1, permission: ['admin'] },
      { id: 1002, text: 'REDUX2', path: '/redux2', component: TestRedux2, permission: ['editor'] }
    ]
  },
  {
    id: 11, text: '商品管理', icon: <GiftOutlined />,
    permission: ['editor'],
    children: [
      {
        id: 1101,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        permission: ['editor'],
        children: [
          { id: 110101, text: '商品编辑', path: '/good/edit/:id', component: GoodAddOrEdit, permission: ['editor'] },
          { id: 110102, text: '商品新增', path: '/good/add', component: GoodAddOrEdit, permission: ['editor'] }
        ]
      },
    ]
  }
]
