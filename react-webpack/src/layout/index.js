import React, { useState } from 'react'
import { Layout } from 'antd'
import QfAside from './QfAside'
import QfHeader from './QfHeader'
import QfContent from './QfContent'
import './style.scss'
const { Header, Sider, Content } = Layout

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <QfAside
          value={collapsed}
          onChange={setCollapsed}
        />
      </Sider>

      <Layout>
        <Header>
          <QfHeader />
        </Header>
        <Content>
          <QfContent />
        </Content>
      </Layout>
    </Layout>
  )
}
