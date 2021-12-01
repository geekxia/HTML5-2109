import { Component } from 'react'
// 这是Taro官方提供的内置组件
import { View, Button, Text } from '@tarojs/components'

import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}


class Index extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        首页
      </View>
    )
  }
}

export default Index
