import React, { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'

import { View, ScrollView, Text, Button, Map } from '@tarojs/components'
import './style.scss'

export default () => {
  const [navId, setNavId] = useState(1)
  const [hasLoc, setHasLoc] = useState(false)
  const [latLng, setLatLng] = useState({})
  const scrollHandle = e => console.log('scroll', e)
  const navTap = ele => {
    console.log('nav ele', ele)
    setNavId(ele.id)
  }
  const navs = [
    { id: 1, text: '热点' },
    { id: 2, text: '体育' },
    { id: 3, text: '视频' },
    { id: 4, text: '游戏' },
    { id: 5, text: '汽车' },
    { id: 6, text: '教育' },
    { id: 7, text: '科技' },
    { id: 8, text: '金融' }
  ]

  // 演示地理定位与地图相关功能
  useDidShow(()=>{
    Taro.getLocation().then(res=>{
      console.log('当前位置', res)
      setLatLng(res)
      setHasLoc(true)
    }).catch(err=>{
      setHasLoc(false)
    })
  })

  const open = () => {
    Taro.openSetting()
  }

  // 实现导航功能
  const goTo = () => {
    Taro.openLocation({
      latitude: latLng.latitude,
      longitude: latLng.longitude,
      scale: 18,
      name: '千锋教育',
      address: '深圳宝安西部硅谷'
    })
  }

  const getInfo = e => {
    // console.log('用户信息', e)
    Taro.getUserInfo().then(res=>console.log('用户信息', res))
    // 已经不能直接拿到用户信息了
    // 要把res中encryptedData、iv、rawData、signature发送给后端，后端再结合appid和appserect才能拿到当前用户真正的用户信息。
  }

  return (
    <View className='page'>
      <ScrollView
        className='navs'
        scrollX
        scrollWithAnimation
        onScroll={scrollHandle}
        scroll-into-view={'n'+(navId-1)}
      >
        {
          navs.map(ele=>(
            <Text
              id={'n'+ele.id}
              key={ele.id}
              onTap={()=>navTap(ele)}
              className={navId===ele.id?'on':''}
            >
              {ele.text}
            </Text>))
        }
      </ScrollView>

      {
        !hasLoc && <Button onTap={open}>请求地理授权</Button>
      }

      {
        latLng.latitude
        && <Map scale='18' style={{width:'100%',height:'400rpx'}} {...latLng} />
      }
      <Button onTap={goTo}>导航去千锋</Button>

      <View>演示button的开放能力</View>
      {/*<Button openType='getUserInfo' onGetuserinfo={getInfo}>登录（实际上获取你的头像等）</Button>*/}
      <Button onTap={getInfo}>登录（实际上获取你的头像等）</Button>
      <Button openType='share'>拼团</Button>

    </View>
  )
}
