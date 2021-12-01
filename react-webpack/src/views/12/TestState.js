// React两种组件
  // 一、函数式组件（没有state），但hooks可以拯救函数式组件
  // 二、class类组件（有state）

// 前提：以类组件为例来讲解state及其特性

// 1、知道如何定义state、使用state。
// 2、知道state的特点：使用this.setState()修改state，这会触发render()执行，视图自动更新。切忌直接修改state，因为这不会触发render()运行，结果是视图不更新。

// 3、this.setState()的用法
// 语法1：this.setState({}, callback)  声明式变量的新值与旧值无关时（新值不是由旧值计算而来），使用语法1。
// 语法2：this.setState((state,props)=>({}), callback)  声明式变量的新值与旧值有关时（新值由旧值计算而来），使用语法2。
  // 思考：什么时候使用语法1？什么时候使用语法2？

// 特点1：this.setState()改变state，会触发render运行，所以自动更新视图。
// 特点2：this.setState()在合成事件中是异步的，但非合成事件（比如定时器）中是同步的。
  // 思考1：什么是合成事件？在react中，on*系列事件、生命周期函数，都是合成事件。
  // 思考2：为什么要封装合成事件？为什么合成事件中this.setState()是异步的？在合成事件把this.setState()变成异步的，这是一种react内置的性能优化方案，目的是把当前合成事件分开写的多个this.setState()合并成一个this.setState()，减少了render()运行、减少diff运算。
  // 思考3：为什么在非合成事件（比如定时器）中this.setState()是同步的呢？因为定时器是宏任务，隶属于浏览的进程管理，react管不了。

import React, { Component } from 'react'

// 类组件，必须要有render()函数（否则会报错）
export default class extends Component {
  constructor(props) {
    super(props)
    // 定义state
    this.state = {
      count: 1,
      num: 200,
      name: 'zhangsan',
      n: 1
    }
  }
  changeCount() {
    // 直接修改state，这不会触发render
    // this.state.count++

    // 语法1：当新值与旧值无关时，用这种语法
    // this.setState({
    //   count: 1000
    // }, ()=>console.log('done'))

    // 语法2：当新值由旧state计算而来，用这种语法
    // this.setState(function(state){
    //   // do something
    //   return {
    //     count: state.count+1
    //   }
    // }, ()=>console.log('done'))

    // this.setState((state)=>{
    //   // do something
    //   return {
    //     count: state.count+1
    //   }
    // }, ()=>console.log('done'))

    // this.setState(state=>({count:state.count+1}), ()=>console.log('done'))

    // this.setState(s=>({count:s.count+1}))
    this.setState(_=>({count:_.count+1}))
    // this.setState(_=>({count:++_.count}))
    // this.setState(_=>({count:_.count++}))
  }

  changeSomeThing() {
    // this.setState({num: 300})
    // this.setState({name: 'lisi'})
    this.setState({
      num: 300,
      name: 'lisi'
    })
  }

  componentDidMount() {
    // 开一个定时器（宏任务），实现自增
    setInterval(()=>{
      // 在定时器中，this.setState()是同步的
      // this.setState(_=>({n:_.n+1}))
      // console.log('n', this.state.n)
    }, 3000)

    // 扩展思考：不使用on*系列的合成事件时，那么事件处理器中的this.setState()是同步的。
    document.getElementById('btn').addEventListener('click', ()=>{
      // 这个this.setState()是同步的
      this.setState({n: 10000})
      console.log('n', this.state.n)
    })
  }

  render() {
    console.log('rendering')
    const { count, num, name, n } = this.state
    // do something
    return (
      <div>
        <h1>学习state</h1>
        <div>{count}</div>
        <button onClick={this.changeCount.bind(this)}>自增</button>
        <hr/>

        <div>{num}</div>
        <div>{name}</div>
        <button onClick={this.changeSomeThing.bind(this)}>改变视图</button>
        <hr/>

        <div>{n}</div>

        <button id='btn'>点击</button>
      </div>
    )
  }
}
