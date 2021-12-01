import React from 'react'

// 动态样式：在className和style这两个属性使用jsx语法。

// 1、动态className语法：className={`由多个类名拼接而成的字符串`}
  // 语法参考：<div className={'c1 c2 c3'}></div>
// 2、动态style语法：style={ 由css“属性-属性值”键值对对象 }
  // 语法参考：<div style={{color:'red',fontSize:'30px'}}></div>

// 总结：只要写出不报错的动态样式语法、并且能实现需求，都对的。

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      c: 1,
      show: true,
      f: 16,
      show2: true,
      ss: {
        opacity: 0.5,
        padding: '20px'
      }
    }
  }
  render() {
    const { c, show, f, show2, ss } = this.state
    console.log('ss', ss)
    return(
      <div>
        <h1>动态样式</h1>

        <h2 className={`c${c} f1 ${!show?'no':''}`}>测试动态的ClassName</h2>
        <button onClick={()=>this.setState(s=>({c:s.c===3?1:s.c+1}))}>切换样式</button>
        <button onClick={()=>this.setState(s=>({show:!s.show}))}>显示/隐藏</button>
        <hr/>

        <h2 style={
          {
            color: 'red',
            fontSize: `${f}px`,
            display: (show2?'block':'none')
          }
        }>测试动态的style</h2>
        <button onClick={()=>this.setState(s=>({f:s.f+2}))}>字体变大</button>
        <button onClick={()=>this.setState(s=>({show2:!s.show2}))}>显示/隐藏</button>
      </div>
    )
  }
}
