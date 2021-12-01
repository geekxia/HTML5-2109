import { useState, useEffect } from 'react'
import { Layout } from 'antd'
import QfAside from './QfAside'
import QfHeader from './QfHeader'
import QfContent from './QfContent'
import './style.scss'
const { Header, Sider, Content } = Layout

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  const resize = (ev) => {
    console.log('屏幕尺寸发生了变化', ev.target.innerWidth)
    const w = ev.target.innerWidth
    if (w>=850 && w<=900) {
      setCollapsed(true)
    } else if (w>900) {
      setCollapsed(false)
    }
  }
  useEffect(()=>{
    window.addEventListener('resize', resize, false)
    return ()=>{
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className='qf-layout'>
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
    </div>
  )
}
