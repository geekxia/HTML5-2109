// React学习方向：Facebook、阿里系

// 组件封装的两种方式：类组件（有state）、函数式组件（没有state）
  // 但是从react 16.8开始，我们可以使用hooks来模拟函数式组件的state

import React, { useState } from 'react'

// 类组件的初体验
export class TestJsx1 extends React.Component {
  constructor(props) {
    super(props)
    // 定义声明式变量
    this.state = {
      count: 1000
    }
  }
  componentDidMount() {
    console.log('mounted')
  }
  changeCount() {
    this.setState({
      count: this.state.count+1
    })
  }
  render() {
    // 返回当前组件的视图结构
    return <div onClick={this.changeCount.bind(this)}>{this.state.count}</div>
  }
}

// 函数式组件的初体验
export function TestJsx2 () {
  const [count, setCount] = useState(2000)
  return <div onClick={()=>setCount(count+1)}>{count}</div>
}

// 学习JSX语法

// 1、什么jsx？jsx=javascript xml，是facebook官方提供一种语法糖，作用是方便我们编写React组件。
// 2、jsx在浏览器中是不支持，要使用@babel/preset-react进行编译，编译结果是React.createElement()。
// 3、在React开发，jsx语法不必须的，你可以不用。但是，使用jsx有助于代码的可维护性，我们一般都必须用。
  // 思考：在React开发中，为什么要使用jsx？

// 4、jsx是一种语法，用jsx编写的视图代码叫做React元素（也叫做jsx元素），jsx元素是变量、是Object对象。

// 使用jsx，视图代码易阅读、易维护；但是需要babel编译。
// const ele = <div>hello jsx</div>
// 不使用jsx，视图代码不易阅读、不易维护；但不需要jsx编译。
// const ele = React.createElement('div', {}, ['hello jsx'])

// const ele = <div>
//   <h1 title='react'>hello react</h1>
//   <span><span>点击</span></span>
//   <a className='bd' href="http://baicu.com">百度</a>
// </div>

// const ele = React.createElement('div', {}, [
//   React.createElement('h1', {title:'react'}, ['hello react']),
//   React.createElement('span', {}, [React.createElement('span', {}, ['点击'])]),
//   React.createElement('a', {class: 'bd', href: 'http://baicu.com'}, ['百度'])
// ])

// 5、jsx元素可随意嵌套，看上去就像写html代码那样的嵌套。
// 6、jsx元素有两类：一类html元素，一类自定义jsx元素（由React组件实例化而来）。
// 7、React组件、JSX元素有什么区别？React组件也叫做React类，jsx元素也叫react元素。jsx元素是React组件实例化的结果。一个React组件，可以实例化多个jsx元素（这就是组件的复用）。

// 这是React组件（React类）
// const Child = () => <div>我的孩子</div>
// 这是React元素（jsx元素）
// const c1 = <Child />
// const c2 = <Child></Child>

// 8、在jsx元素中使用变量，但一定要用{}包裹起来。（这个{}不是vue中文本插值，它是专门用于包裹变量的）在{}中可放置基本数据类型、数组、函数调用、表达式、jsx元素。如果在{}中放置的是布尔值、null、undefined这三种数据，不报错，但视图不显示。

// 9、如果jsx元素的属性是动态的，也要使用{}包裹。另外，在jsx元素中有三个特殊属性需要注意：className、tabIndex、htmlFor，分别对应html元素的class、tabindex、for属性。

// 10、jsx元素有三个新增属性：key、ref、dangerouslySetInnerHTML（相当于vue中的v-html）。
// 11、jsx元素中的事件绑定要用React的合成事件（onClick、onKeyUp、onMouseMove、onChange），不要使用html原生事件。

// 12、在jsx中写注释也要用 {} 包起来。
// 13、jsx中默认有防注入攻击（XSS）的功能。

// 14、动态style，语法 style = { {color:'red', fonsSize:'20px'} }。在jsx语法中经常见到类似的{{}}语法，外部{}是jsx要求的，内部{}是Object对象。

// 15、在jsx中，这种 {} 语法可以无限嵌套。只需要记住一点，{} 内部的东西都是变量。

// 16、jsx语法的{}可以使用多维数据，相当于嵌套的多重循环。

// 17、jsx是变量、是对象，还是“不可变对象”。怎么理解？每次发生声明式变量变化时，都会触发render()方法重新运行、返回一个新的jsx对象，此时程序内存中就有了两个jsx对象，然后React使用“协调”对两个jsx对象（Fiber数据）进行对比，找出最小差异，再使用DOM将其更新到视图上。

// 18、React组件（React类）命名，要使用“大驼峰命名法”，即组件名的首字母也要大写。

// 学vue，有一种查字典
// 学react，鉴赏文学作品


import ouwen from '@/assets/ouwen.png'

const Qf = {
  QfButton: ()=><div>qf button</div>,
  QfModal: ()=><div>qf modal</div>
}

export default class TestJsx extends React.Component {
  constructor(props) {
    super(props)
    // 声明式变量：当声明式变量发生变化时，视图会自动更新。
    this.state = {
      count: 1
    }
  }
  componentDidMount() {
    this.timer = setInterval(()=>{
      // this.setState()会改变count这个声明式变量，这会触发render()重新执行。
      this.setState({count: this.state.count+1})
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    // do something
    console.log('render方法执行了')
    const a = 1000
    const fn = arg => {
      // do something
      return Math.random()*arg
    }

    return (
      <div>
        <h1>hello react</h1>
        <h1>{ a }</h1>
        <div>{ a + 200 }</div>
        <div>{ null }</div>
        <div>{ undefined }</div>
        <div>{ true }</div>
        <div>{ 'hello string' }</div>
        <div>{ 2000 }</div>
        <hr/>

        <div>
        {
          [
            <div key='11'>{a}</div>,
            <div key='22'>{'xiaowang'}</div>,
            <div key='33'>哥哥</div>
          ]
        }
        </div>
        <hr/>

        <div>{ fn(100) }</div>
        <hr/>

        <div>{ a>3 ? <div>好人</div> : <div>坏人</div> }</div>
        <hr/>

        <div title={a}>测试动态属性</div>
        <img src={ouwen} alt='欧文' />
        <hr/>

        <input className='ipt' tabIndex='1' htmlFor='user' />
        <hr/>

        <button onClick={()=>console.log('clicked')}>点击</button>
        {/*
          <div>1234</div>
          这是jsx中的注释
        */}
        <div style={{color:'red', fonsSize:'20px'}}>动态style样式</div>
        <div {...{title:'tt',id:'box',className:'box'}}>测试动态属性</div>
        <hr/>

        <div>{<div>{<div>{<div>{500}</div>}</div>}</div>}</div>

        <div>{[<div key={10}>{a}</div>]}</div>
        <hr/>

        <div>
        {/*
          [
            [1,1,1,1],
            <br/>,
            [2,2,2,2],
            <br/>,
            [3,3,3,3]
          ]
        */}
        </div>
        <hr/>

        <div className='grid'>
        {
          [
            <div key='111'>{[
              <span key='1'/>,
              <span key='2'/>,
              <span key='3'/>
            ]}</div>,
            <div key='222'>{[
              <span key='4'/>,
              <span key='5'/>,
              <span key='6'/>
            ]}</div>,
            <div key='333'>{[
              <span key='7'/>,
              <span key='8'/>,
              <span key='9'/>
            ]}</div>,
          ]
        }
        </div>
        <hr/>

        <div>{this.state.count}</div>
        <hr/>

        <Qf.QfButton />
        <Qf.QfModal />

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}
