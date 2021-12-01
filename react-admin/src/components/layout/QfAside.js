import { Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'

import { Link } from 'react-router-dom'
import routes from '@/views'
import { logo } from '@/utils/img'

import { useSelector } from 'react-redux'
import hasAuthority from './permission'

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

  const { roles } = useSelector(store=>store.user.userinfo)

  // 渲染Menu菜单
  const renderMenu = ()=> {
    return routes.map(ele=>(
      hasAuthority(ele.permission, roles)
      && <SubMenu key={ele.id} icon={ele.icon} title={ele.text}>
        {
          ele.children.map(ele=>(
            hasAuthority(ele.permission, roles)
            && <Menu.Item key={ele.id}>
              <Link to={ele.path}>{ele.text}</Link>
            </Menu.Item>
          ))
        }
      </SubMenu>
    ))
  }

  return (
    <div className='qf-aside'>

      <div className='logo'>
        <img
          src={logo}
          style={props.value?styles.mini:styles.small}
          alt="logo"
        />
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      { renderMenu() }
      </Menu>

      { /* 把props直接传递给子组件 */}
      <Toggle {...props} />
    </div>
  )
}

const styles = {
  small: {
    width: '60px',
    height: '60px'
  },
  mini: {
    width: '30px',
    height: '30px'
  }
}
