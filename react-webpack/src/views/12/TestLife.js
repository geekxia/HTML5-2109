import React, { Component } from 'react'

// 生命周期：定义了组件的一生（从生到死）

// 装载阶段（3）：constructor、render、componentDidMount
// 更新阶段（2）：shouldComponentUpdate/render、componentDidUpdate
// 卸载阶段（1）：componentWillUnmount

// 注：如果想更加优雅地实现shouldComponentUpdate()的优化功能，我们建议使用PureComponent
export default class extends Component {
  // constructor()
  // 这个类组件的构造器函数，当React类组件被实例化，变成React元素时调用该构造函数
  // props表示使用组件实例时由父作用域传递过来的自定义属性
  // super(props)表示调用React.Component这个类的构造器函数，这一行代码必须当前构造器函数的第一行代码。
  // 在构造器函数中对state进行声明，最好不要再做其它业务逻辑。
  // 坑：在构造器函数中，一定不能对props和state进行交叉赋值。务必保证props和state是分别独立的。
  // 在构造器函数中，也不能使用this.setState()，不要做dom操作、ref操作、开定时器。
  constructor(props) {
    super(props)
    console.log('-------constructor')
    // 从界面渲染的角度，我们可以把state变量分成两大类：一类用于视图渲染，一类不用于视图渲染。
    this.state = {
      count: 2,
      a: 100,
      b: 200,
      c: 300,
      d: 400  // 假设d不参与视图渲染。如果在某个业务逻辑中，我们用this.setState修改了d，这将触发render()和diff运算，这明显是一种性能的损耗。
    }
  }

  // componentDidMount()
  // 相当于是vue中的mounted()，表示react视图第一次渲染完成。
  // 一般在这里，我们可以调接口、开定时器、DOM操作、ref操作等。。。
  // 在这里，可以放心地使用this.setState()，通常使用this.setState()把后端数据更新到state上。
  componentDidMount() {
    console.log('-------componentDidMount')
  }

  // shouldComponentUpdate()
  // 相当于一个控制更新的“开关”，如果这个生命周期返回true，React将完成正常的更新流程；如果这个生命周期返回false，更新流程到这儿就终止了。
  // 作用：这是React老版本中遗留下来的一种性能优化方案。
  shouldComponentUpdate(props, state) {
    console.log('-------shouldComponentUpdate')
    console.log('props', props)
    console.log('state', state)

    // 如何实现该生命周期的性能呢？伪代码如下：
    // if (如果变化的变量是不参与视图渲染的) {
    //   return false
    // }else{
    //   return true
    // }

    // 挑战：在实际开发中state变量很多，我们自己都区分不清楚哪些变量不参与渲染，所以我们经常不做这个优化。
    // 方案：所以随着react发展，React官方推荐使用 PureComponent 来实现这样的优化。在PureComponent中无须再使用shouldComponentUpdate()来做优化了，因为PureComponent会自动做这种优化。
    return true
  }

  // componentDidUpdate()
  // 相当于是vue中的updated()，表示当前这次更新已完成
  // 这个生命周期中，可以使用this.setState()，但是必须给“终止条件”
  // 建议不要在这里随便this.setState()。
  componentDidUpdate() {
    console.log('-------componentDidUpdate')
    const { count } = this.state
    if(count<=10) this.setState(s=>({count:s.count+1}))
  }

  // componentWillUnmount()
  // 相当于vue中的beforeDestory()，表示组件即将被销毁
  // 在这里一般用于关闭定时器、关闭长连接、清除缓存
  componentWillUnmount() {
    console.log('-------componentWillUnmount')
  }

  wrongRender() {
    this.setState(state=>({count:state.count+1}))
    return <div>错误的嵌套setState</div>
  }

  // render()
  // 是所有生命周期中唯一的必须的，也就是任何一个类组件都必须有render()
  // render()必须有return，要么返回null，要返回jsx元素。
  // 在render()方法的return之前，可以编写业务逻辑、数据处理，但是不能使用this.setState()
  // 坑：那些参与视图渲染的函数封装和render()中，都不能使用this.setState()
  render() {
    console.log('-------render')
    const { count } = this.state
    // do something
    return (
      <div>
        <h1>生命周期</h1>
        <h1>{count}</h1>
        { /* this.wrongRender() */ }
        <button onClick={()=>this.setState(s=>({count:s.count+1}))}>自增</button>
      </div>
    )
  }
}
