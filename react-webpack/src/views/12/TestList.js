import React from 'react'

// 列表渲染：对数组进行循环渲染

// React建议使用map循环来实现列表渲染。为什么呢？

// 给如何优雅地进行列表渲染？
// 原则1：当列表结构复杂、业务逻辑复杂时，建议封装渲染函数。反之，如果结构不复杂，建议直接写在render的jsx中。
// 原则2：如果需要做数据处理、逻辑操作，list.map(()=>{ return() })。反之，list.map(ele=>())。

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { id: 1, name: 'zhang san', age: 10 },
        { id: 2, name: 'zhang san', age: 30 },
        { id: 3, name: 'zhang san', age: 50 },
        { id: 4, name: 'zhang san', age: 70 }
      ],
      list2: [
        [1,2,3],
        [4,5,6],
        [7,8,9]
      ]
    }
  }

  renderList1 () {
    const { list } = this.state
    // return list.map(ele=>(
    //   <div key={ele.id}>
    //     <span>{ele.id}</span>-
    //     <span>{ele.name}</span>-
    //     <span>{ele.age}</span>
    //   </div>))

    return list.map(ele=>{
      // do something
      return (
        <div key={ele.id}>
          <span>{ele.id}</span>-
          <span>{ele.name}</span>-
          <span>{ele.age}</span>
        </div>
      )
    })
  }

  renderList2 () {
    // map循环只是react推荐的做法
    const result = []
    const { list } = this.state
    // 注意：只是演示非map方法也可实现，但推荐使用map()方法。
    list.forEach(ele=>{
      result.push(
        <div key={ele.id}>
          <span>{ele.id}</span>-
          <span>{ele.name}</span>-
          <span>{ele.age}</span>
        </div>
      )
    })
    return result
  }

  render9() {
    const { list2 } = this.state
    return list2.map((ele,idx)=>(
      <div style={styles.row} key={idx}>
      {
        ele.map(ele=>(
          <span key={ele} style={styles.col}>{ele}</span>
        ))
      }
      </div>
    ))
  }

  render () {
    const { list } = this.state
    return (
      <div>
        <h1>列表渲染</h1>

        {
          list.map(ele=>(
            <div key={ele.id}>
              <span>{ele.id}</span>-
              <span>{ele.name}</span>-
              <span>{ele.age}</span>
            </div>
          ))
        }
        <hr/>

        {
          list.map(ele=>{
            // do something
            const id = ele.id*100
            return (
              <div key={id}>
                <input type="checkbox"/>
                <span>{id}</span>-
                <span>{ele.name}</span>-
                <span>{ele.age}</span>
              </div>
            )
          })
        }
        <hr/>

        { this.renderList1() }
        <hr/>

        { this.renderList2() }
        <hr/>

        { this.render9() }
      </div>
    )
  }
}

const styles = {
  row: {
    width: '300px',
    lineHeight: '100px',
    display: 'flex'
  },
  col: {
    flex: 1,
    textAlign: 'center',
    border: '1px solid #ccc'
  }
}

// [1,2,3,4]  => map(机器) => [<div>1</div>,<div>2</div>,<div>3</div>,<div>4</div>]
