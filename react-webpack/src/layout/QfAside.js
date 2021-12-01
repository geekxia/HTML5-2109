import React, { useState } from 'react'

import { Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'

import { Link } from 'react-router-dom'
import routes from '@/views'
const { SubMenu } = Menu

// 这是一个组件
const Toggle = ({value, onChange}) => (
  <div
    className='trigger'
    onClick={()=>onChange(!value)}
  >
  {
    value
    ? <MenuUnfoldOutlined />
    : <MenuFoldOutlined />
  }
  </div>
)


export default props => {

  // 渲染Menu菜单
  const renderMenu = ()=> {
    return routes.map(ele=>(
      <SubMenu key={ele.id} icon={ele.icon} title={ele.text}>
        {
          ele.children.map(ele=>(
            <Menu.Item key={ele.id}>
              <Link to={ele.path}>{ele.text}</Link>
            </Menu.Item>
          ))
        }
      </SubMenu>
    ))
  }

  return (
    <div>
      <div className="logo" />

      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      { renderMenu() }
      </Menu>

      { /* 把props直接传递给子组件 */}
      <Toggle {...props} />
    </div>
  )
}
