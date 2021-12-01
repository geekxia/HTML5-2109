import React from 'react'

// 表单绑定

// 受控表单 vs. 非受控表单
// 受控表单：表单value/checked值由state控制着。
// 非受控表单：表单value/checked值与state无关。

// 结论：React官方推荐我们一致使用受控表单（除文件上传表单外）

// 如何正确地使用React表单？
// 1、除文件上传表单以外，其它表单都必须是受控表单（即表单的value或checked属性由state控制着）。
// 2、使用受控表单，就是给表单添加 value+onChange 或者 checked+onChange。其中onChange事件处理器用于我们“手动取出表单的值”。（注：这就是React表单的单向绑定）
// 3、当一个页面中有很多表单时，我们建议通过自定义传参，实现onChange事件处理器的复用。

// 特殊：<input type="file"/> 这是React中唯一的一个允许非受控的表单。

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addr: 'shenzhen',
      name2: '',
      pass2: '',
      level2: '',
      gender2: 'man',
      fav2: []
    }
  }

  // 一、非受控表单
  ageInput(ev) {
    console.log('ev age', ev.target.value)
    window.age = ev.target.value
  }
  addrInput(ev) {
    // this.setState({addr: ev.target.value})
    this.state.addr = ev.target.value
  }
  submit1() {
    const data = {
      name: document.getElementById('name').value,
      // 在react类组件中默认就支持ref，ref是一种快捷的DOM访问方式
      pass: this.refs.pass.value,
      age: window.age,
      addr: this.state.addr
    }
    console.log('提交', data)
  }

  // 二、受控表单
  // 受控表单的手动取值
  change(ev, k){
    // console.log('new value', ev.target.value)
    if (k==='fav2') {
      console.log(ev.target.checked)
      console.log(ev.target.value)
      // 如果checked=true，表示用户正在勾选，我们要向fav2中添加当前value
      // 如果checked=false，表示用户正在取消勾选，我们要从fav2中删除当前value
      if (ev.target.checked) {
        this.setState(s=>({[k]:[...s.fav2,ev.target.value]}))
      } else {
        this.setState(s=>({[k]:s.fav2.filter(ele=>ele!==ev.target.value)}))
      }
    } else {
      this.setState({
        [k]: ev.target.value
      })
    }

  }
  submit2() {
    const data = {
      name2: this.state.name2,
      pass2: this.state.pass2,
      level2: this.state.level2,
      gender2: this.state.gender2,
      fav2: this.state.fav2
    }
    console.log('提交', data)
  }

  render () {
    const { name2, pass2, level2, gender2, fav2 } = this.state
    return (
      <div>
        <h1>表单绑定</h1>

        {/* 以下四种写法，都是非受控表单，当作没学过 */}
        姓名：<input id='name' type="text"/><br/>
        密码：<input ref='pass' type="password"/><br/>
        年龄：<input type="text" onInput={ev=>this.ageInput(ev)} /><br/>
        地址：<input type="text" defaultValue={this.state.addr} onInput={ev=>this.addrInput(ev)}/>

        <br/>
        <button onClick={()=>this.submit1()}>提交非受控表单</button>
        <hr/>


        姓名：<input type="text" value={name2} onChange={ev=>this.change(ev, 'name2')} /><br/>
        密码：<input type="password" value={pass2} onChange={ev=>this.change(ev, 'pass2')}/><br/>

        学历：<select value={level2} onChange={ev=>this.change(ev, 'level2')}>
        {
          [
            {id:1,value:'shuoshi',label:'硕士'},
            {id:2,value:'benke',label:'本科'}
          ].map(ele=>(
            <option key={ele.id} value={ele.value}>{ele.label}</option>
          ))
        }
        </select><br/>

        性别：
        {
          [
            {id:1,value:'man',label:'男'},
            {id:2,value:'female',label:'女'}
          ].map(ele=>(
            <span key={ele.id}>
              <input
                type="radio"
                value={ele.value}
                checked={gender2===ele.value}
                onChange={ev=>this.change(ev, 'gender2')}
              />
              <span>{ele.label}</span>
            </span>
          ))
        }
        <br/>

        爱好：{
          [
            {id:1,value:'book',label:'读书'},
            {id:2,value:'running',label:'跑步'},
            {id:3,value:'football',label:'足球'},
            {id:4,value:'coding',label:'编程'}
          ].map(ele=>(
            <span key={ele.id}>
              <input
                type="checkbox"
                value={ele.value}
                checked={fav2.includes(ele.value)}
                onChange={ev=>this.change(ev,'fav2')}
              />
              <span>{ele.label}</span>
            </span>
          ))
        }
        <br/>

        <button onClick={()=>this.submit2()}>提交受控表单</button>
      </div>
    )
  }
}
