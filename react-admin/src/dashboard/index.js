import { Layout, Login } from '@/components'
import { useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '@/store/actions'

const Loading = () => <div>刷新中。。。。</div>

export default () => {
  const dispatch = useDispatch()

  const token = useSelector(store=>store.user.token)
  const userinfo = useSelector(store=>store.user.userinfo)

  useEffect(()=>{
    // 获取userinfo
    if(token) dispatch(getUserInfo())
  }, [token])


  return (
    <Switch>
    {/*
      如果token不存在，只能看到Login页面；
      如果token存在，但userinfo还没有请求完成，用户看到“加载中。。。”
      如果token存在，且userinfo已经请求成功了，用户可以进入Layout了。
    */}
    {
      token
      ? <Route key='1' path='/' render={()=>userinfo.roles?<Layout/>:<Loading/>} />
      : [
          <Route key='2' path='/login' component={Login} />,
          <Redirect key='3' from='/*' to='/login' />
        ]
    }
    </Switch>
  )
}

// 借鉴思考: vue-element-admin

// 登录流程: 执行登录-->后端返回token(用户基本信息)-->前端拿到token存储起来(redux、localStorage)->立即马上使用token再调接口获取用户完整信息（最重要的是角色信息）->使用角色信息动态地生成路由规则和菜单->跳转进入系统首页。

// 刷新流程：从localStorage中取出token并放进redux中-->立即马上使用token调接口获取用户完整信息-->使用用户角色信息动态生成路由规则和菜单-->根据url显示用户想看到的视图。

// 权限设计总结：

// 技术点：token鉴权、redux数据（token、userinfo）、路由权限设计（自定义权限字段、动态生成菜单和Route规则）

// 从前端的角度实现权限设计：
  // 1、获取token（登录接口、在redux中从localStorage得到token）(Login)
  // 2、每次在进入管理系统内页（Layout）之前，都要使用token调接口获取当前用户信息。（Dishboard）
  // 3、有了用户信息之后，根据“角色信息”+“自定义的路由信息”动态生成菜单和Route规则。(Layout)

// 从后端的角度实现权限设计：
  // 1、获取token（登录接口、在redux中从localStorage得到token）(Login)
  // 2、每次在进入管理系统内页（Layout）之前，都要使用token换取当前用户有权访问的菜单。
  //   userinfo: {
  //     name: '',
  //     role: 'admin',
  //     mobile: '',
  //     role_name: '运维工程师',
  //     navs: [
  //       { id: 1, pid: 0, url: '/redux1', text: '学习Redux', icon: 'abc', ...},
  //       { id: 2, pid: 1, url: '/redux12', text: '学习Redux', icon: 'abc', ...}
  //     ]
  //   }
  // 3、根据用户信息中的菜单信息（数据）+前端自定义的路由数据，生成当前用户可访问的路由规则和菜单。
