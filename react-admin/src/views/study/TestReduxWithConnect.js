import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { changeCount } from '@/store/actions'

// 语法：connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)

class TestReduxWithConnect extends PureComponent {
  render () {
    console.log('props', this.props)
    const { count, changeCount } = this.props
    return (
      <div>
        <h1>在类组件中使用Redux数据</h1>
        <h1>{count}</h1>
        <button onClick={()=>changeCount(100)}>自增</button>
        <button onClick={()=>changeCount(-10)}>自减</button>
      </div>
    )
  }
}

export default connect(
  store => ({
    count: store.study.count
  }),
  dispatch => ({
    changeCount: payload=>dispatch(changeCount(payload)),
  })
)(TestReduxWithConnect)



// function mapStateToProps(state) {
//   return {}
// }
// function mapDispatchToProps(dispatch) {
//   return {}
// }
// export default connect(mapStateToProps, mapDispatchToProps)(TestRedux1)


// function connect(fn1,fn2){
//   const state = fn1()
//   const action = fn2()
//   return function (W) {
//     return class extends PureComponent {
//       render () {
//         return (
//           <W {...this.props} {...state} {...action}></W>
//         )
//       }
//     }
//   }
// }
