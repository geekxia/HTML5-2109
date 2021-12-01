import React from 'react'

// 两种组件的对比：
// 一、函数式组件：有props，没有state，没有this，没有上下文，没有生命周期，没有ref。所以函数式组件渲染速度快、性能好。
// 二、类组件，什么都有。所以类组件渲染速度慢，性能较差。

// 结论：目前市场中较新的React，几乎只用函数式组件，不用类组件。


// 【props】

// 地位：非常重要（它比state）。
// 类比：在任何组件中都有props，它相当于DNA，是父子组件之间通信纽带，在react路由、状态管理等等都要用到props，甚至React组件化也要用到props。
// 场景：在什么场景下要使用props？父子组件通信、路由、状态管理等。
// 问题：props可以传递哪些数据类型呢？基本类型数据、数组、对象、函数（事件）、React元素（JSX元素）。
  // 如果使用props传递一个函数时，约定属性名命名格式“onMyEvent”
  // 当我们在自定义React元素内部嵌套子元素时，在子组件中使用props.children可以接收它们。

// 应用：使用props实现父子组件之间的通信。
  // 父组件向子组件传递数据，使用自定义属性（props是基本数据类型、数据、对象、JSX元素）。
  // 子组件向父组件传递数据，使用自定义事件（props是函数）。

// 扩展：React组件化的基础就是props（render props、props children）。


// 一、函数式组件（一直都有，与16.8没有关系）
// 函数式组件的函数的第一个参数就是props
// props验证：要么使用prop-types来验证，要么使用TS来验证。
const ChildA = props => {
  console.log('a props', props)
  const { x, y, lang, onChange } = props
  const handle = (val) => {
    console.log('lang changed', val)
    // 我要把当前的值，告诉父组件
    onChange(val)
  }
  return (
    <div>
      <h2>我是大儿子</h2>
      <h2>{ x }</h2>
      <h2>{ y }</h2>
      <div className='lang'>
        <span className={lang==='zh'?'on':''} onClick={()=>handle('zh')}>中文</span>
        <span className={lang==='en'?'on':''} onClick={()=>handle('en')}>英文</span>
        <span className={lang==='ge'?'on':''} onClick={()=>handle('ge')}>德语</span>
      </div>
    </div>
  )
}

// 二、类组件（目前市场中用得越来越少）
// 使用this.props来接受props
class ChildB extends React.Component {
  render() {
    console.log('b props', this.props)
    const { x, y, head, children } = this.props
    return (
      <div>
        <h2>我是小儿子</h2>
        <h2>{ x }</h2>
        <h2>{ y }</h2>
        <div>{ head }</div>
        <div>{ children }</div>
      </div>
    )
  }
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      msg1: 'hello child a',
      msg2: 'hello child b',
      lang: 'zh'
    }
  }
  
  // 这个lang形参，是子组件回传回来的数据
  langChange (lang) {
    console.log('changed')
    this.setState({lang})
  }

  render () {
    const { msg1, msg2, lang } = this.state
    return (
      <div>
        <h1>学习props</h1>
        <hr/>

        {/* 自定义属性，下面这个x是静态传值, 下面这个y是动态传值 */}
        <ChildA
          x={1}
          y={msg1}
          z={[1,2,3,4]}
          lang={lang}
          onChange={this.langChange.bind(this)}
        />
        <hr/>

        <ChildB
          x={2}
          y={msg2}
          z={{a:1,b:2,c:3}}
          head={<header>你的头</header>}
        >
          <div>我是一行文字</div>
          <div>我是二行文字</div>
          <div>我是三行文字</div>
        </ChildB>
      </div>
    )
  }
}
