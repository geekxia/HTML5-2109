import React, { PureComponent } from 'react'

// 状态提升：是解决组件之间数据通信的一种思想。
// 问题：当两个未知关系的组件之间需要共享同一个state变量，怎么办？
// 做法：想办法找到这两个组件的最近的父组件，然后这个需要共享的state变量定义这个父组件中。

// 状态提升的语法基础：props、父子组件通信

const ChildA = props => (
  <div>
    当前的华氏温度：{props.temper}
  </div>
)

class ChildB extends PureComponent {
  change(ev) {
    // 在这里能够拿到受控表单的最新值
    // 需求：要改变视图，也就是要改变value所对应的state变量
    // 做法：通过“自定义事件”向父组件通信
    this.props.onChange(ev.target.value)
  }
  render() {
    const { value } = this.props
    return (
      <div>
        请输入摄氏温度：
        <input type="number" value={value} onChange={ev=>this.change(ev)} />
      </div>
    )
  }
}

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      temper: 0
    }
  }
  render() {
    const { temper } = this.state
    return (
      <div>
        <h1>状态提升</h1>
        <ChildA temper={temper} />
        <hr/>
        <ChildB value={temper} onChange={temper=>this.setState({temper})} />
      </div>
    )
  }
}
