import React from 'react'

// 类组件中，事件绑定的两种方式

// 1、ES5的方式绑定，要使用.bind(this)来修改“事件处理器”中的this的指向。事件对象永远都是事件处理器的最后一个参数。
  // 语法： <div onMyEvent={this.handle.bind(this, '自定义传参')}></div>

// 2、ES6的方式绑定，使用箭头函数来绑定事件（不存在this指向问题）。如何使用事件对象呢？需要我们手动传递事件对象。
  // 语法： <div onMyEvent={(ev)=>this.handle(ev, '自定义传参')}></div>

// 小结：（1）会使用ES6箭头函数来绑定事件；（2）要知道如何拿到事件对象；（3）如何阻止冒泡，如何阻止默认事件，如何监听键盘Enter键？（4）会自定义传参。

export default class extends React.Component {

  constructor(props) {
    super(props)
    // this.xxx = this.enterHanlde.bind(this)
  }

  // 事件处理器
  enterHanlde(arg, ev) {
    // 阻止冒泡
    ev.stopPropagation()
    // console.log('mouse enter', arg, ev)
    // console.log('this', this)
    console.log('mouse enter inner')
  }
  enterHanldeOut() {
    console.log('mouse enter outer')
  }
  checkHandle(ev) {
    // 阻止默认事件
    ev.preventDefault()
    console.log('checkbox clicked')
  }
  searchHandle(ev) {
    if(ev.keyCode===13) {
      console.log('开始搜索')
    }
  }
  
  render () {
    return (
      <div>
        <h1>学习事件绑定</h1>

        <div style={styles.box2} onClick={()=>this.enterHanldeOut()}>
          <div
            style={styles.box1}
            onClick={this.enterHanlde.bind(this, 'box1')}
          />

          <div
            style={styles.box1}
            onClick={(ev)=>this.enterHanlde('box1', ev)}
          />
        </div>

        <input type="checkbox" onClick={(ev)=>this.checkHandle(ev)}/>
        <br/>

        <input type="text" onKeyUp={(ev)=>this.searchHandle(ev)} />

      </div>
    )
  }
}

const styles = {
  box1: {
    width: '200px',
    height: '200px',
    border: '1px solid red'
  },
  box2: {
    width: '300px',
    height: '400px',
    border: '1px solid blue'
  }
}
