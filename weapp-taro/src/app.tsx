import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'

import { Provider } from 'mobx-react'
import store from './store'

import './app.scss'

export default props => {

  // 整个小程序启动时的第一行业务代码
  useEffect(()=>{
    // 微信小程序登录
    Taro.login().then(res=>{
      console.log('code', res.code)
      // Taro.request({code}).then(res=>res.token)
      // Taro.setStorage('token', )
    })
    // 请求用户授权地理定位
    Taro.getSetting().then(res=>{
      console.log('授权列表', res)
      if (!res.authSetting['scope.userLocation']) {
        Taro.authorize({
          scope: 'scope.userLocation'
        }).then(res=>{
          console.log('用户同意了地理定位授权', res)
        }).catch(err=>{
          console.log('用户拒绝了地理定位授权', err)
          // 如果用户拒绝了，这将是永久的，除非用户在微信上移除当前小程序，再访问时才能再弹框。
          // 所以一般当用户拒绝，在后面的业务页面中想办法让用户手动打开微信内置授权页面。
        })
      }
    })
  }, [])
  return (
    <Provider {...store}>
      {props.children}
    </Provider>
  )
}
