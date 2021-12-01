import React, { useState, useEffect } from 'react'

import Taro from '@tarojs/taro'
import { View, Input, Swiper, SwiperItem, Image, Text } from '@tarojs/components'

import './style.scss'

// TS默认类型：Number, Boolean, String, Array, Object, any, void, ...

// 自定义类型
type ImageItem = {
  id: Number,
  img: String,
  name: String,
  hidden?: Boolean
}

// 接口：形状
interface DotProps {
  list: Array<ImageItem>,
  current: Number
}

const IndicatorDots = (props: DotProps) => {
  const { list, current } = props
  return (
    <View className='dots'>
    {
      list.map((_,idx)=>(<Text className={current===idx?'on':''} />))
    }
  </View>
  )
}

export default () => {
  // 根据手机型号信息，动态计算paddingTop距离
  const [top] = useState(Taro.getWindowInfo().statusBarHeight+8)
  const [current, setCurrent] = useState(0)
  const [text, setText] = useState('')

  const imgs = [
    {id: 1, name:'双11', img: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/200480/40/4734/120121/6125f4abE0d3b10c8/b4710995d9745ddb.jpg!cr_1053x420_4_0!q70.jpg.dpg' },
    { id: 2, name:'双12', img: '//imgcps.jd.com/ling4/10039397773289/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5c131e9282acdd181da661a1/f881d527/cr_1125x449_0_166/s/q70.jpg' }
  ]

  const searchHandle = () => {
    console.log('调接口', text)
  }


  return (
    <View className='page'>
      <View className='search' style={{paddingTop:top+'px' }}>
        <Input
          value={text}
          type='text'
          onInput={e=>setText(e.detail.value)}
          onConfirm={searchHandle}
        />
      </View>
      <View>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          onChange={e=>setCurrent(e.detail.current)}
          autoplay>
          {
            imgs.map(ele=>(
              <SwiperItem key={ele.id}>
                <Image src={ele.img} />
              </SwiperItem>
            ))
          }

        </Swiper>
        <IndicatorDots list={imgs} current={current} />
      </View>
    </View>
  )
}
