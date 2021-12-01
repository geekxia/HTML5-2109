import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { changeCount } from '@/store/actions'

// 使用装饰器语法
@connect(
  store => ({
    count: store.study.count
  }),
  dispatch => ({
    changeCount: payload=>dispatch(changeCount(payload)),
  })
)
class TestReduxWithDecorator extends PureComponent {
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

export default TestReduxWithDecorator
