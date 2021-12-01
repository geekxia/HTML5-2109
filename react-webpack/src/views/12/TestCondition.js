import React from 'react'

// 对单个元素执行条件渲染，使用 { isShow && <jsx> }
// 对两个元素执行条件渲染，使用 { isBol ? <jsx1> : <jsx2> }
// 对三个以下的元素执行条件渲染，建议使用自定义渲染函数。

// 结论：以上做法都相当于是vue中的v-if/v-else-if/v-else

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      isDate: true,
      curIdx: 1
    }
  }

  // 封装自定义的渲染函数来参与视图的渲染
  rowRender() {
    const { curIdx } = this.state
    let result = null
    switch (curIdx) {
      case 1:
        result = <h2>第一行文字</h2>
        break
      case 2:
        result = <h2>第二行文字</h2>
        break
      case 3:
        result = <h2>第三行文字</h2>
        break
      case 4:
        result = <h2>第四行文字</h2>
        break
      default:
    }
    return result
  }

  render () {
    const { isLogin, isDate, curIdx } = this.state
    return (
      <div>
        <h1>条件渲染</h1>

        { !isLogin && <h2 onClick={()=>this.setState({isLogin:true})}>请登录</h2> }
        <hr/>

        {
          isDate
          ? <h2>白天</h2>
          : <h2>黑夜</h2>
        }
        <hr/>

        { curIdx===1 && <h2>第一文字</h2> }
        { curIdx===2 && <h2>第二文字</h2> }
        { curIdx===3 && <h2>第三文字</h2> }
        { curIdx===4 && <h2>第四文字</h2> }
        <hr/>
        { this.rowRender() }
        <button onClick={()=>this.setState(s=>({curIdx: s.curIdx===4?1:s.curIdx+1}))}>切换</button>
      </div>
    )
  }
}
